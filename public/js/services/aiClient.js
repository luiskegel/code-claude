/**
 * Anbindung an die KI – in drei Stufen, je nachdem, wo die App läuft:
 *
 *  1. **Claude direkt** (App läuft als Artifact auf claude.ai): Die Anfrage geht
 *     über das Claude-Konto der Person, die die App geöffnet hat. Kein
 *     API-Schlüssel nötig, Fotos werden mitgeschickt.
 *  2. **Eigenes Backend** (`/api/ai`, lokal per `npm start`): Der Server hält den
 *     API-Schlüssel. Im Browser steht er nie.
 *  3. **Demo-Tutor** im Browser, wenn keins von beidem erreichbar ist.
 */

import { generateMockAnswer } from './mockAi.js';
import { askClaude, getSampleApi, SampleError } from './sampleAi.js';
import { getAttachmentBase64 } from '../data/attachments.js';
import { isImageType } from '../data/attachments.js';

const ENDPOINT = '/api/ai';
const STATUS_ENDPOINT = '/api/ai/status';
const TIMEOUT_MS = 60000;

/**
 * @param {{mode:string, question:string, subject?:string, taskTitle?:string,
 *          userSolution?:string, attachments?:Array}} payload
 * @param {{onText?: Function, signal?: AbortSignal}} [options]
 * @returns {Promise<{content:string, provider:string, notice?:string}>}
 */
export async function requestAiAnswer(payload, options = {}) {
  const question = String(payload.question ?? '').trim();
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];
  const hasImages = attachments.some((entry) => isImageType(entry.type));

  if (!question && !hasImages) {
    throw new AiError('Bitte gib zuerst eine Aufgabe ein oder hänge ein Foto an.');
  }
  if (question.length > 4000) {
    throw new AiError('Die Aufgabe ist zu lang (maximal 4000 Zeichen).');
  }

  const request = { ...payload, question, attachments };

  // 1. Claude über die Plattform – der Normalfall in der veröffentlichten App.
  if (await getSampleApi()) {
    try {
      return await askClaude(request, options);
    } catch (error) {
      if (error instanceof SampleError) throw new AiError(error.message, error.code);
      console.warn('Claude über die Plattform nicht nutzbar:', error);
    }
  }

  // 2. Eigenes Backend mit hinterlegtem API-Schlüssel.
  return requestFromBackend(request, options);
}

async function requestFromBackend(payload, { signal } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  signal?.addEventListener('abort', () => controller.abort(), { once: true });

  try {
    const images = await collectBase64Images(payload.attachments);

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, attachments: undefined, images }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    // Eine echte Fehlermeldung des eigenen Backends wird angezeigt …
    if (!response.ok && data?.message) {
      throw new AiError(serverErrorMessage(response.status, data));
    }

    // … antwortet dagegen gar kein Backend (statisches Hosting liefert dann
    // z.B. die index.html oder einen 404 ohne JSON), übernimmt der Demo-Tutor.
    if (!data?.content) return localFallback(payload, images);

    return {
      content: data.content,
      provider: data.label ?? data.provider ?? 'unbekannt',
      notice: data.notice,
    };
  } catch (error) {
    if (error instanceof AiError) throw error;

    if (error?.name === 'AbortError') {
      if (signal?.aborted) throw new AiError('Die Anfrage wurde abgebrochen.', 'cancelled');
      throw new AiError('Die KI hat zu lange gebraucht (Zeitüberschreitung). Bitte versuch es noch einmal.');
    }

    // Netzwerkfehler -> Demo-Tutor im Browser.
    return localFallback(payload, []);
  } finally {
    clearTimeout(timeout);
  }
}

/** Fotos als Base64 – so erwartet es das eigene Backend. */
async function collectBase64Images(attachments = []) {
  const images = [];

  for (const attachment of attachments.filter((entry) => isImageType(entry.type)).slice(0, 4)) {
    const image = await getAttachmentBase64(attachment);
    if (image) images.push(image);
  }
  return images;
}

/** Antwort des lokalen Demo-Tutors, wenn keine echte KI erreichbar ist. */
function localFallback(payload, images) {
  const fallback = generateMockAnswer({ ...payload, images });
  return {
    content: fallback.content,
    provider: 'mock',
    notice: 'Ohne KI-Anbindung: Die Antwort kommt vom lokalen Demo-Tutor im Browser.',
  };
}

/** Welche KI steht zur Verfügung? Für den Hinweis in der Oberfläche. */
export async function fetchAiStatus() {
  if (await getSampleApi()) {
    return { provider: 'Claude', configured: true, viaPlatform: true };
  }

  try {
    const response = await fetch(STATUS_ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('status not ok');
    const data = await response.json();
    return {
      provider: data.provider ?? 'mock',
      label: data.label ?? data.provider ?? 'KI',
      configured: Boolean(data.configured),
      model: data.model ?? null,
    };
  } catch {
    return { provider: 'mock', configured: false, offline: true };
  }
}

export class AiError extends Error {
  constructor(message, code = null) {
    super(message);
    this.name = 'AiError';
    this.code = code;
  }
}

function serverErrorMessage(status, data) {
  if (data?.message) return data.message;
  if (status === 400) return 'Die Anfrage war unvollständig. Bitte prüfe deine Eingabe.';
  if (status === 413) return 'Die angehängten Fotos sind zusammen zu gross. Nimm weniger oder kleinere Bilder.';
  if (status === 429) return 'Zu viele Anfragen in kurzer Zeit. Warte einen Moment und versuch es erneut.';
  if (status === 502) return 'Der KI-Anbieter ist gerade nicht erreichbar. Bitte später erneut versuchen.';
  if (status >= 500) return 'Auf dem Server ist ein Fehler aufgetreten. Bitte später erneut versuchen.';
  return `Unerwarteter Fehler (Status ${status}).`;
}
