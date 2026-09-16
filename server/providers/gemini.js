/**
 * Anbindung an Gemini (Google, Generative-Language-Schnittstelle).
 *
 * Der API-Schlüssel wird hier – und nur hier – verwendet. Er verlässt den Server nie.
 */

import { buildSystemPrompt, buildUserPrompt } from '../../public/js/services/aiModes.js';
import { ProviderError } from './errors.js';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const TIMEOUT_MS = 60_000;

export async function askGemini(payload, { apiKey, model }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Der Schlüssel gehört in den Header, nicht in die URL – so landet er
        // nicht in Server-Logs oder Proxys.
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(payload.mode) }] },
        contents: [{ role: 'user', parts: buildParts(payload) }],
        generationConfig: { maxOutputTokens: 2000 },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const details = await response.text().catch(() => '');
      throw new ProviderError(messageForStatus(response.status), response.status, details.slice(0, 500));
    }

    const data = await response.json();
    const content = (data.candidates?.[0]?.content?.parts ?? [])
      .map((part) => part.text ?? '')
      .join('')
      .trim();

    if (!content) {
      const reason = data.candidates?.[0]?.finishReason;
      throw new ProviderError(
        reason === 'SAFETY'
          ? 'Gemini hat die Antwort aus Sicherheitsgründen zurückgehalten. Formuliere die Aufgabe anders.'
          : 'Gemini hat keine verwertbare Antwort geliefert.',
        502,
      );
    }

    return { content, provider: 'gemini', model };
  } catch (error) {
    if (error instanceof ProviderError) throw error;
    if (error?.name === 'AbortError') {
      throw new ProviderError('Zeitüberschreitung bei der Anfrage an Gemini.', 504);
    }
    throw new ProviderError('Gemini ist momentan nicht erreichbar.', 502, String(error?.message ?? error));
  } finally {
    clearTimeout(timeout);
  }
}

/** Fotos zuerst, danach der Text der Aufgabe. */
function buildParts(payload) {
  const images = Array.isArray(payload.images) ? payload.images : [];

  return [
    ...images.map((image) => ({
      inline_data: { mime_type: image.mediaType, data: image.data },
    })),
    { text: buildUserPrompt(payload) },
  ];
}

function messageForStatus(status) {
  if (status === 400) return 'Die Anfrage wurde von Gemini abgelehnt. Prüfe den Schlüssel und das eingestellte Modell.';
  if (status === 401 || status === 403) {
    return 'Der hinterlegte Google-Schlüssel wurde abgelehnt. Bitte den Schlüssel in der .env-Datei prüfen.';
  }
  if (status === 404) return 'Das eingestellte Modell kennt Gemini nicht. Setze AI_MODEL auf ein verfügbares Modell.';
  if (status === 429) return 'Das Anfragelimit bei Gemini ist erreicht. Bitte kurz warten.';
  if (status >= 500) return 'Gemini meldet eine Störung. Bitte später erneut versuchen.';
  return `Gemini hat mit Status ${status} geantwortet.`;
}
