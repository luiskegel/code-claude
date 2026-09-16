/**
 * Anbindung an ChatGPT (OpenAI, Chat-Completions-Schnittstelle).
 *
 * Der API-Schlüssel wird hier – und nur hier – verwendet. Er verlässt den Server nie.
 */

import { buildSystemPrompt, buildUserPrompt } from '../../public/js/services/aiModes.js';
import { ProviderError } from './errors.js';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const TIMEOUT_MS = 60_000;

export async function askOpenAi(payload, { apiKey, model }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 2000,
        messages: [
          { role: 'system', content: buildSystemPrompt(payload.mode) },
          { role: 'user', content: buildContent(payload) },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const details = await response.text().catch(() => '');
      throw new ProviderError(messageForStatus(response.status, 'OpenAI'), response.status, details.slice(0, 500));
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) throw new ProviderError('ChatGPT hat keine verwertbare Antwort geliefert.', 502);

    return { content, provider: 'openai', model: data.model ?? model };
  } catch (error) {
    if (error instanceof ProviderError) throw error;
    if (error?.name === 'AbortError') {
      throw new ProviderError('Zeitüberschreitung bei der Anfrage an ChatGPT.', 504);
    }
    throw new ProviderError('ChatGPT ist momentan nicht erreichbar.', 502, String(error?.message ?? error));
  } finally {
    clearTimeout(timeout);
  }
}

/** Text plus Fotos; Bilder werden als Data-URL übergeben. */
function buildContent(payload) {
  const text = buildUserPrompt(payload);
  const images = Array.isArray(payload.images) ? payload.images : [];

  if (!images.length) return text;

  return [
    ...images.map((image) => ({
      type: 'image_url',
      image_url: { url: `data:${image.mediaType};base64,${image.data}` },
    })),
    { type: 'text', text },
  ];
}

function messageForStatus(status, label) {
  if (status === 401 || status === 403) {
    return `Der hinterlegte ${label}-Schlüssel wurde abgelehnt. Bitte den Schlüssel in der .env-Datei prüfen.`;
  }
  if (status === 404) {
    return `Das eingestellte Modell kennt ${label} nicht. Setze AI_MODEL auf ein verfügbares Modell.`;
  }
  if (status === 429) return `Das Anfragelimit oder Guthaben bei ${label} ist erreicht.`;
  if (status === 400) return `Die Anfrage wurde von ${label} abgelehnt (ungültige Eingabe).`;
  if (status >= 500) return `${label} meldet eine Störung. Bitte später erneut versuchen.`;
  return `${label} hat mit Status ${status} geantwortet.`;
}
