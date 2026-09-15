/**
 * Konfiguration des Servers.
 *
 * Alle Geheimnisse kommen ausschliesslich aus Umgebungsvariablen bzw. aus einer
 * lokalen .env-Datei (die per .gitignore ausgeschlossen ist). Sie werden niemals
 * an den Browser ausgeliefert – /api/ai/status meldet nur, OB ein Schlüssel
 * vorhanden ist, nie den Schlüssel selbst.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const projectRoot = resolve(here, '..');
export const publicDir = resolve(projectRoot, 'public');

loadDotEnv(resolve(projectRoot, '.env'));

const apiKey = (process.env.ANTHROPIC_API_KEY ?? '').trim();
const requestedProvider = (process.env.AI_PROVIDER ?? '').trim().toLowerCase();

export const config = {
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? '0.0.0.0',
  provider: resolveProvider(requestedProvider, apiKey),
  apiKey,
  model: (process.env.AI_MODEL ?? 'claude-sonnet-5').trim(),
  maxQuestionLength: 4000,
  rateLimit: { windowMs: 60_000, max: 20 },
};

function resolveProvider(requested, key) {
  if (requested === 'anthropic' && key) return 'anthropic';
  if (requested === 'anthropic' && !key) {
    console.warn('[Konfiguration] AI_PROVIDER=anthropic, aber ANTHROPIC_API_KEY fehlt – nutze den Demo-Modus.');
    return 'mock';
  }
  if (!requested && key) return 'anthropic';
  return 'mock';
}

/** Sehr einfacher .env-Parser (KEY=VALUE, # als Kommentar). */
function loadDotEnv(path) {
  let content;
  try {
    content = readFileSync(path, 'utf8');
  } catch {
    return; // .env ist optional
  }

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const index = trimmed.indexOf('=');
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}
