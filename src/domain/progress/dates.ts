/**
 * Kalendertage als Schlüssel „JJJJ-MM-TT“ in lokaler Zeit.
 * Differenzen werden über UTC-Mitternacht berechnet – dadurch sind
 * Sommer-/Winterzeitwechsel und Mitternacht kein Problem.
 */

const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function toLocalDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toUtcMidnight(key: string): number | null {
  const match = DATE_KEY_PATTERN.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const time = Date.UTC(year, month - 1, day);
  const check = new Date(time);
  // Ungültige Daten wie 2026-02-31 abweisen.
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return time;
}

export function isValidDateKey(value: unknown): value is string {
  return typeof value === 'string' && toUtcMidnight(value) !== null;
}

/** Anzahl Kalendertage von `from` bis `to` (negativ, wenn `to` früher liegt). */
export function daysBetween(from: string, to: string): number {
  const start = toUtcMidnight(from);
  const end = toUtcMidnight(to);
  if (start === null || end === null) throw new Error(`Ungültiges Datum: ${from} / ${to}`);
  return Math.round((end - start) / MS_PER_DAY);
}

export function addDays(key: string, days: number): string {
  const start = toUtcMidnight(key);
  if (start === null) throw new Error(`Ungültiges Datum: ${key}`);
  const date = new Date(start + days * MS_PER_DAY);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}
