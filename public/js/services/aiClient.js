/**
 * Anbindung an die KI.
 *
 * WICHTIG: Hier steht bewusst KEIN API-Schlüssel. Der Browser spricht ausschliesslich
 * mit dem eigenen Backend (`/api/ai`); der Schlüssel liegt nur dort in einer
 * Umgebungsvariable. Antwortet das Backend nicht (z.B. weil die Dateien ohne Server
 * geöffnet wurden), wird auf den lokalen Demo-Tutor zurückgefallen.
 */

import { generateMockAnswer } from './mockAi.js';

const ENDPOINT = '/api/ai';
const STATUS_ENDPOINT = '/api/ai/status';
const TIMEOUT_MS = 30000;

/**
 * @param {{mode:string, question:string, subject?:string, taskTitle?:string, userSolution?:string}} payload
 * @returns {Promise<{content:string, provider:string, notice?:string}>}
 */
export async function requestAiAnswer(payload) {
  const question = String(payload.question ?? '').trim();
  if (!question) {
    throw new AiError('Bitte gib zuerst eine Aufgabe ein.');
  }
  if (question.length > 4000) {
    throw new AiError('Die Aufgabe ist zu lang (maximal 4000 Zeichen).');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, question }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new AiError(serverErrorMessage(response.status, data));
    }
    if (!data?.content) {
      throw new AiError('Die Antwort des Servers war unvollständig. Bitte versuch es erneut.');
    }

    return { content: data.content, provider: data.provider ?? 'unbekannt', notice: data.notice };
  } catch (error) {
    if (error instanceof AiError) throw error;

    if (error?.name === 'AbortError') {
      throw new AiError('Die KI hat zu lange gebraucht (Zeitüberschreitung). Bitte versuch es noch einmal.');
    }

    // Kein erreichbares Backend -> Demo-Tutor im Browser.
    const fallback = generateMockAnswer(payload);
    return {
      content: fallback.content,
      provider: 'mock',
      notice: 'Kein Server erreichbar – Antwort kommt vom lokalen Demo-Tutor.',
    };
  } finally {
    clearTimeout(timeout);
  }
}

/** Fragt ab, welcher Anbieter serverseitig aktiv ist (für den Hinweis in der Oberfläche). */
export async function fetchAiStatus() {
  try {
    const response = await fetch(STATUS_ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('status not ok');
    const data = await response.json();
    return { provider: data.provider ?? 'mock', configured: Boolean(data.configured), model: data.model ?? null };
  } catch {
    return { provider: 'mock', configured: false, model: null, offline: true };
  }
}

export class AiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AiError';
  }
}

function serverErrorMessage(status, data) {
  if (data?.message) return data.message;
  if (status === 400) return 'Die Anfrage war unvollständig. Bitte prüfe deine Eingabe.';
  if (status === 429) return 'Zu viele Anfragen in kurzer Zeit. Warte einen Moment und versuch es erneut.';
  if (status === 502) return 'Der KI-Anbieter ist gerade nicht erreichbar. Bitte später erneut versuchen.';
  if (status >= 500) return 'Auf dem Server ist ein Fehler aufgetreten. Bitte später erneut versuchen.';
  return `Unerwarteter Fehler (Status ${status}).`;
}
