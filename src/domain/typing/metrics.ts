/** Ein „Wort“ entspricht per Konvention fünf Zeichen (inklusive Leerzeichen). */
export const CHARS_PER_WORD = 5;

/**
 * Pausen zwischen zwei Anschlägen zählen höchstens so lange.
 * So verfälschen lange Unterbrechungen die Geschwindigkeit nicht.
 */
export const IDLE_CAP_MS = 5_000;

/** Live-WPM wird erst angezeigt, wenn genug Daten vorliegen – sonst springen die Werte. */
export const MIN_LIVE_WPM_CHARS = 5;
export const MIN_LIVE_WPM_MS = 2_000;

/** Bestwerte zählen erst ab Übungen dieser Länge, damit kurze Ausreißer keine Rekorde setzen. */
export const RECORD_MIN_CHARS = 50;

/**
 * Obergrenze für Bestwerte: Selbst die schnellsten Menschen erreichen kaum 250 WPM. Höhere Werte
 * entstehen nur durch eingefügten oder diktierten Text und dürfen keine Rekorde setzen.
 */
export const MAX_PLAUSIBLE_WPM = 300;

/** WPM = korrekt getippte Zeichen / 5 / vergangene Minuten */
export function calculateWpm(correctChars: number, durationMs: number): number {
  if (!Number.isFinite(correctChars) || !Number.isFinite(durationMs)) return 0;
  if (correctChars <= 0 || durationMs <= 0) return 0;
  const minutes = durationMs / 60_000;
  return correctChars / CHARS_PER_WORD / minutes;
}

/** Genauigkeit = korrekte Eingaben / alle Eingaben × 100 (ohne Eingaben: 0). */
export function calculateAccuracy(correctInputs: number, totalInputs: number): number {
  if (!Number.isFinite(correctInputs) || !Number.isFinite(totalInputs)) return 0;
  if (totalInputs <= 0) return 0;
  const ratio = Math.min(Math.max(correctInputs / totalInputs, 0), 1);
  return ratio * 100;
}

/**
 * Für die Anzeige wird abgerundet: 89,6 % erscheinen als 89 %, nicht als 90 %.
 * So passen angezeigter Wert und Bestehensgrenze immer zusammen.
 */
export function displayAccuracy(accuracy: number): number {
  return Math.floor(accuracy + 1e-9);
}

export function displayWpm(wpm: number): number {
  return Math.round(wpm);
}

/** Durchschnitt; leere Liste → null */
export function average(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
