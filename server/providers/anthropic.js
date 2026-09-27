/**
 * Anbindung an die Claude-API.
 *
 * Der API-Schlüssel wird hier – und nur hier – verwendet. Er verlässt den Server nie.
 */

import { buildSystemPrompt, buildUserPrompt } from '../../public/js/services/aiModes.js';
import { ProviderError } from './errors.js';

const API_URL = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';
const TIMEOUT_MS = 45_000;

export async function askAnthropic(payload, { apiKey, model }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': API_VERSION,
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        system: buildSystemPrompt(payload.mode),
        messages: [
          { role: 'user', content: buildMessageContent(payload) },
          // Nachfragen wie „mach es kürzer" brauchen den bisherigen Verlauf.
          ...(Array.isArray(payload.history) ? payload.history : []),
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const details = await response.text().catch(() => '');
      throw new ProviderError(messageForStatus(response.status), response.status, details.slice(0, 500));
    }

    const data = await response.json();
    const content = (data.content ?? [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    if (!content) throw new ProviderError('Die KI hat keine verwertbare Antwort geliefert.', 502);

    return { content, provider: 'anthropic', model: data.model ?? model };
  } catch (error) {
    if (error instanceof ProviderError) throw error;
    if (error?.name === 'AbortError') {
      throw new ProviderError('Zeitüberschreitung bei der KI-Anfrage. Bitte erneut versuchen.', 504);
    }
    throw new ProviderError('Der KI-Anbieter ist momentan nicht erreichbar.', 502, String(error?.message ?? error));
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Baut den Nachrichten-Inhalt. Fotos der Aufgabe werden als Bild-Blöcke
 * vorangestellt, damit das Modell sie beim Lesen der Aufgabe vor sich hat.
 */
function buildMessageContent(payload) {
  const images = Array.isArray(payload.images) ? payload.images : [];
  const documents = Array.isArray(payload.documents) ? payload.documents : [];
  if (!images.length && !documents.length) return buildUserPrompt(payload);

  return [
    ...images.map((image) => ({
      type: 'image',
      source: { type: 'base64', media_type: image.mediaType, data: image.data },
    })),
    ...documents.map((doc) => ({
      type: 'document',
      source: { type: 'base64', media_type: doc.mediaType, data: doc.data },
      title: doc.name,
    })),
    { type: 'text', text: buildUserPrompt(payload) },
  ];
}

function messageForStatus(status) {
  if (status === 401 || status === 403) {
    return 'Der hinterlegte API-Schlüssel wurde abgelehnt. Bitte den Schlüssel in der .env-Datei prüfen.';
  }
  if (status === 429) return 'Das Anfragelimit des KI-Anbieters ist erreicht. Bitte kurz warten.';
  if (status === 400) return 'Die Anfrage wurde vom KI-Anbieter abgelehnt (ungültige Eingabe).';
  if (status >= 500) return 'Der KI-Anbieter meldet eine Störung. Bitte später erneut versuchen.';
  return `Der KI-Anbieter hat mit Status ${status} geantwortet.`;
}
