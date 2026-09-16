/**
 * Konfiguration des Servers.
 *
 * Alle Geheimnisse kommen ausschliesslich aus Umgebungsvariablen bzw. aus einer
 * lokalen .env-Datei (die per .gitignore ausgeschlossen ist). Sie werden niemals
 * an den Browser ausgeliefert – /api/ai/status meldet nur, WELCHER Anbieter aktiv
 * ist, nie den Schlüssel selbst.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const projectRoot = resolve(here, '..');
export const publicDir = resolve(projectRoot, 'public');

loadDotEnv(resolve(projectRoot, '.env'));

/** Unterstützte Anbieter mit ihren Schlüsseln und Standardmodellen. */
const PROVIDERS = {
  anthropic: {
    label: 'Claude (Anthropic)',
    envKey: 'ANTHROPIC_API_KEY',
    defaultModel: 'claude-sonnet-5',
  },
  openai: {
    label: 'ChatGPT (OpenAI)',
    envKey: 'OPENAI_API_KEY',
    defaultModel: 'gpt-4o',
  },
  gemini: {
    label: 'Gemini (Google)',
    envKey: 'GOOGLE_API_KEY',
    defaultModel: 'gemini-2.0-flash',
  },
};

const requested = (process.env.AI_PROVIDER ?? '').trim().toLowerCase();
const provider = resolveProvider(requested);

export const config = {
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? '0.0.0.0',
  provider,
  providerLabel: PROVIDERS[provider]?.label ?? 'Demo-Tutor',
  apiKey: provider === 'mock' ? '' : keyFor(provider),
  model: modelFor(provider),
  maxQuestionLength: 4000,
  rateLimit: { windowMs: 60_000, max: 20 },
};

export const availableProviders = Object.keys(PROVIDERS);

function keyFor(name) {
  return (process.env[PROVIDERS[name].envKey] ?? '').trim();
}

function modelFor(name) {
  const override = (process.env.AI_MODEL ?? '').trim();
  if (override) return override;
  return PROVIDERS[name]?.defaultModel ?? '';
}

/**
 * Wählt den Anbieter: ausdrücklich gesetzt, sonst der erste mit hinterlegtem
 * Schlüssel. Ohne Schlüssel läuft der Demo-Tutor.
 */
function resolveProvider(name) {
  if (name && !PROVIDERS[name] && name !== 'mock') {
    console.warn(
      `[Konfiguration] Unbekannter AI_PROVIDER "${name}". Möglich: ${Object.keys(PROVIDERS).join(', ')}, mock.`,
    );
    return 'mock';
  }

  if (name === 'mock') return 'mock';

  if (name) {
    if (keyFor(name)) return name;
    console.warn(
      `[Konfiguration] AI_PROVIDER=${name}, aber ${PROVIDERS[name].envKey} fehlt – nutze den Demo-Modus.`,
    );
    return 'mock';
  }

  const withKey = Object.keys(PROVIDERS).find((entry) => keyFor(entry));
  return withKey ?? 'mock';
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
