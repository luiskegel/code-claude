/**
 * Kleiner Node-Server ohne externe Abhängigkeiten.
 *
 * Aufgaben:
 *  1. Ausliefern der statischen Dateien aus /public
 *  2. Bereitstellen der KI-Schnittstelle unter /api/ai – nur hier wird der
 *     API-Schlüssel gelesen, der Browser bekommt ihn nie zu sehen.
 */

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

import { config, publicDir } from './config.js';
import { askAnthropic, ProviderError } from './providers/anthropic.js';
import { generateMockAnswer } from '../public/js/services/mockAi.js';
import { MODE_IDS } from '../public/js/services/aiModes.js';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

// Fotos von Aufgaben werden mitgeschickt – daher deutlich grösser als reiner Text.
const MAX_BODY_BYTES = 12 * 1024 * 1024;
const MAX_IMAGES = 4;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const rateLimitBuckets = new Map();

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);

    if (url.pathname === '/api/health') {
      return sendJson(response, 200, { status: 'ok' });
    }
    if (url.pathname === '/api/ai/status') {
      return sendJson(response, 200, {
        provider: config.provider,
        configured: config.provider !== 'mock',
        model: config.provider === 'anthropic' ? config.model : null,
      });
    }
    if (url.pathname === '/api/ai') {
      if (request.method !== 'POST') {
        return sendJson(response, 405, { message: 'Nur POST wird unterstützt.' });
      }
      return await handleAiRequest(request, response);
    }
    if (url.pathname.startsWith('/api/')) {
      return sendJson(response, 404, { message: 'Unbekannter Endpunkt.' });
    }

    return await serveStatic(url.pathname, request, response);
  } catch (error) {
    console.error('Unerwarteter Serverfehler:', error);
    if (!response.headersSent) sendJson(response, 500, { message: 'Interner Serverfehler.' });
    else response.end();
  }
});

/* ---------------- KI-Endpunkt ---------------- */

async function handleAiRequest(request, response) {
  if (isRateLimited(request)) {
    return sendJson(response, 429, {
      message: 'Zu viele Anfragen in kurzer Zeit. Bitte warte einen Moment.',
    });
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(request));
  } catch (error) {
    const status = error?.code === 'BODY_TOO_LARGE' ? 413 : 400;
    return sendJson(response, status, {
      message: status === 413 ? 'Die Anfrage ist zu gross.' : 'Die Anfrage konnte nicht gelesen werden.',
    });
  }

  const mode = MODE_IDS.includes(payload?.mode) ? payload.mode : 'hint';
  const question = String(payload?.question ?? '').trim();
  const userSolution = String(payload?.userSolution ?? '').trim().slice(0, 2000);
  const subject = String(payload?.subject ?? '').trim().slice(0, 80);
  const taskTitle = String(payload?.taskTitle ?? '').trim().slice(0, 200);

  const images = sanitizeImages(payload?.images);

  if (!question && !images.length) {
    return sendJson(response, 400, { message: 'Es wurde weder eine Aufgabe noch ein Foto übermittelt.' });
  }
  if (question.length > config.maxQuestionLength) {
    return sendJson(response, 400, {
      message: `Die Aufgabe ist zu lang (maximal ${config.maxQuestionLength} Zeichen).`,
    });
  }

  const request_ = { mode, question, userSolution, subject, taskTitle, images };

  if (config.provider === 'anthropic') {
    try {
      const result = await askAnthropic(request_, { apiKey: config.apiKey, model: config.model });
      return sendJson(response, 200, { content: result.content, provider: 'anthropic', mode });
    } catch (error) {
      const status = error instanceof ProviderError ? error.status : 502;
      console.error('KI-Anbieter-Fehler:', error.message, error.details ?? '');
      return sendJson(response, status, {
        message: error.message ?? 'Die KI-Anfrage ist fehlgeschlagen.',
      });
    }
  }

  const result = generateMockAnswer(request_);
  return sendJson(response, 200, {
    content: result.content,
    provider: 'mock',
    mode,
    notice: 'Demo-Modus: Es ist kein KI-Schlüssel hinterlegt (siehe README).',
  });
}

/** Nur erlaubte Bildtypen in vernünftiger Anzahl und Grösse an den Anbieter geben. */
function sanitizeImages(raw) {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (image) =>
        image &&
        typeof image.data === 'string' &&
        image.data.length > 0 &&
        image.data.length < 8 * 1024 * 1024 &&
        ALLOWED_IMAGE_TYPES.includes(String(image.mediaType).toLowerCase()),
    )
    .slice(0, MAX_IMAGES)
    .map((image) => ({ mediaType: String(image.mediaType).toLowerCase(), data: image.data }));
}

/* ---------------- Statische Dateien ---------------- */

async function serveStatic(pathname, request, response) {
  const decoded = decodeURIComponent(pathname);
  const relative = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  let filePath = resolve(join(publicDir, relative));

  // Verzeichniswechsel nach oben verhindern.
  if (!filePath.startsWith(publicDir + sep) && filePath !== publicDir) {
    return sendJson(response, 403, { message: 'Zugriff verweigert.' });
  }

  let info = await stat(filePath).catch(() => null);
  if (info?.isDirectory()) {
    filePath = join(filePath, 'index.html');
    info = await stat(filePath).catch(() => null);
  }

  // Single-Page-Fallback: unbekannte Pfade liefern die App aus.
  if (!info) {
    filePath = join(publicDir, 'index.html');
    info = await stat(filePath).catch(() => null);
    if (!info) return sendText(response, 404, 'Nicht gefunden');
  }

  const type = MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': info.size,
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  });

  if (request.method === 'HEAD') return response.end();

  const stream = createReadStream(filePath);
  stream.on('error', () => {
    if (!response.headersSent) response.writeHead(500);
    response.end();
  });
  stream.pipe(response);
}

/* ---------------- Hilfsfunktionen ---------------- */

function readBody(request) {
  return new Promise((resolve_, reject) => {
    let size = 0;
    const chunks = [];

    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        const error = new Error('Body zu gross');
        error.code = 'BODY_TOO_LARGE';
        request.destroy();
        reject(error);
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => resolve_(Buffer.concat(chunks).toString('utf8')));
    request.on('error', reject);
  });
}

function isRateLimited(request) {
  const key = request.socket.remoteAddress ?? 'unknown';
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key) ?? { count: 0, resetAt: now + config.rateLimit.windowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + config.rateLimit.windowMs;
  }

  bucket.count += 1;
  rateLimitBuckets.set(key, bucket);

  // Alte Einträge gelegentlich aufräumen.
  if (rateLimitBuckets.size > 500) {
    for (const [entryKey, entry] of rateLimitBuckets) {
      if (now > entry.resetAt) rateLimitBuckets.delete(entryKey);
    }
  }

  return bucket.count > config.rateLimit.max;
}

function sendJson(response, status, data) {
  const body = JSON.stringify(data);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  response.end(body);
}

function sendText(response, status, text) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(text);
}

server.listen(config.port, config.host, () => {
  const mode =
    config.provider === 'anthropic'
      ? `KI-Anbieter: anthropic (${config.model})`
      : 'KI-Anbieter: Demo-Modus (kein Schlüssel hinterlegt)';
  console.log(`Smart Homework Manager läuft auf http://localhost:${config.port}`);
  console.log(mode);
});
