// Optionaler Marktdaten-Proxy für MY STOCK ACADEMY
// --------------------------------------------------
// Zweck: Das Frontend darf niemals einen API-Schlüssel kennen. Dieser kleine Server
// liest den Schlüssel aus einer Umgebungsvariable und leitet nur die benötigten Daten weiter.
//
// Start:  ALPHA_VANTAGE_API_KEY=dein_schluessel node server/index.mjs
//    oder Werte in server/.env eintragen (siehe server/.env.example) und `npm run server`.
//
// Endpunkte (passend zu src/lib/market/provider.ts → ProxyProvider):
//   GET /api/quote?symbol=SAP.DE           → { symbol, price, currency, changePct, asOf, quality, source }
//   GET /api/history?symbol=SAP.DE&days=60 → [{ label, close }]
//   GET /api/health                        → { ok: true, provider }
//
// Hinweis: Kostenlose Datenanbieter liefern i. d. R. VERZÖGERTE oder Tagesschlusskurse.
// Prüfe die Nutzungsbedingungen deines Anbieters (z. B. nur private, nicht-kommerzielle Nutzung).
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(dir, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const PORT = Number(process.env.PORT ?? 8787);
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY ?? '';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? 'http://localhost:5173';
const CACHE_SECONDS = Number(process.env.CACHE_SECONDS ?? 300);

/** Austauschbarer Anbieter-Adapter. Weitere Anbieter können nach demselben Muster ergänzt werden. */
const alphaVantage = {
  id: 'alphavantage',
  source: 'Alpha Vantage (verzögert / Tagesdaten)',
  async quote(symbol) {
    const data = await getJson(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`);
    const q = data['Global Quote'];
    if (!q || !q['05. price']) throw new HttpError(404, 'Für dieses Symbol liegen keine Kursdaten vor (oder das Abruflimit ist erreicht).');
    return {
      symbol,
      price: Number(q['05. price']),
      currency: process.env.QUOTE_CURRENCY ?? 'lokal',
      changePct: Number(String(q['10. change percent'] ?? '0').replace('%', '')),
      asOf: `Handelstag ${q['07. latest trading day']}`,
      quality: 'delayed',
      source: this.source,
    };
  },
  async history(symbol, days) {
    const data = await getJson(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`);
    const series = data['Time Series (Daily)'];
    if (!series) throw new HttpError(404, 'Keine historischen Daten verfügbar.');
    return Object.entries(series)
      .slice(0, days)
      .reverse()
      .map(([date, v]) => ({ label: date, close: Number(v['4. close']) }));
  },
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function getJson(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new HttpError(502, `Datenanbieter antwortet mit Status ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

const cache = new Map();
async function cached(key, fn) {
  const hit = cache.get(key);
  if (hit && hit.until > Date.now()) return hit.value;
  const value = await fn();
  cache.set(key, { value, until: Date.now() + CACHE_SECONDS * 1000 });
  return value;
}

const SYMBOL_RE = /^[A-Za-z0-9.\-:]{1,15}$/;

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (origin && origin === ALLOWED_ORIGIN) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const send = (status, body) => {
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };
  if (req.method === 'OPTIONS') return send(204, {});
  if (req.method !== 'GET') return send(405, { error: 'Nur GET ist erlaubt.' });

  const url = new URL(req.url ?? '/', 'http://localhost');
  try {
    if (url.pathname === '/api/health') return send(200, { ok: true, provider: alphaVantage.id, configured: !!API_KEY });
    if (!API_KEY) throw new HttpError(503, 'Kein API-Schlüssel konfiguriert (ALPHA_VANTAGE_API_KEY in server/.env).');
    const symbol = url.searchParams.get('symbol') ?? '';
    if (!SYMBOL_RE.test(symbol)) throw new HttpError(400, 'Ungültiges Symbol.');
    if (url.pathname === '/api/quote') return send(200, await cached(`q:${symbol}`, () => alphaVantage.quote(symbol)));
    if (url.pathname === '/api/history') {
      const days = Math.min(365, Math.max(5, Number(url.searchParams.get('days') ?? 60) || 60));
      return send(200, await cached(`h:${symbol}:${days}`, () => alphaVantage.history(symbol, days)));
    }
    throw new HttpError(404, 'Unbekannter Endpunkt.');
  } catch (e) {
    const status = e instanceof HttpError ? e.status : e?.name === 'AbortError' ? 504 : 500;
    send(status, { error: e instanceof HttpError ? e.message : 'Interner Fehler beim Abruf der Marktdaten.' });
  }
});

server.listen(PORT, () => {
  console.log(`Marktdaten-Proxy läuft auf http://localhost:${PORT} (Anbieter: ${alphaVantage.id}, Schlüssel ${API_KEY ? 'gesetzt' : 'FEHLT'})`);
});
