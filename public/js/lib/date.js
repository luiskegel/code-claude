/** Datums-Helfer. Termine werden durchgängig als lokales "YYYY-MM-DD" gespeichert. */

const LOCALE = 'de-DE';

const longDateFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const mediumDateFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
});

const rangeFormat = new Intl.DateTimeFormat(LOCALE, { day: '2-digit', month: 'short' });
const weekdayLongFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long' });
const weekdayShortFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' });

/** Wandelt ein Date in "YYYY-MM-DD" (lokale Zeitzone) um. */
export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** "YYYY-MM-DD" -> Date (lokale Mitternacht) oder null bei ungültiger Eingabe. */
export function parseISODate(value) {
  if (typeof value !== 'string') return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

export function isValidISODate(value) {
  return parseISODate(value) !== null;
}

export function isValidTime(value) {
  if (!value) return true;
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value).trim());
}

export function today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function todayISO() {
  return toISODate(today());
}

export function addDays(date, amount) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() + amount);
  return copy;
}

/** Wochenbeginn (Montag). */
export function startOfWeek(date) {
  const day = date.getDay(); // 0 = Sonntag
  const offset = day === 0 ? -6 : 1 - day;
  return addDays(date, offset);
}

/** Differenz in ganzen Tagen zwischen zwei ISO-Daten (b - a). */
export function daysBetween(fromISO, toISOValue) {
  const from = parseISODate(fromISO);
  const to = parseISODate(toISOValue);
  if (!from || !to) return null;
  return Math.round((to.getTime() - from.getTime()) / 86400000);
}

export function formatLongDate(date = today()) {
  return longDateFormat.format(date);
}

export function formatMediumDate(iso) {
  const date = parseISODate(iso);
  return date ? mediumDateFormat.format(date) : 'Kein Termin';
}

export function formatRange(startDate, endDate) {
  return `${rangeFormat.format(startDate)} – ${rangeFormat.format(endDate)} ${endDate.getFullYear()}`;
}

export function weekdayLong(date) {
  return weekdayLongFormat.format(date);
}

export function weekdayShort(date) {
  return weekdayShortFormat.format(date).replace('.', '');
}

/**
 * Lesbares Fälligkeits-Label, z.B. "Heute, 15:00" oder "Überfällig (2 Tage)".
 * @returns {{label: string, tone: 'overdue'|'today'|'soon'|'normal'|'none'}}
 */
export function describeDueDate(dueDate, dueTime) {
  if (!dueDate) return { label: 'Kein Termin', tone: 'none' };

  const delta = daysBetween(todayISO(), dueDate);
  if (delta === null) return { label: 'Kein Termin', tone: 'none' };

  const time = dueTime ? `, ${dueTime} Uhr` : '';

  if (delta < 0) {
    const days = Math.abs(delta);
    return { label: days === 1 ? 'Seit gestern überfällig' : `Überfällig (${days} Tage)`, tone: 'overdue' };
  }
  if (delta === 0) return { label: `Heute${time}`, tone: 'today' };
  if (delta === 1) return { label: `Morgen${time}`, tone: 'soon' };
  if (delta <= 6) {
    const date = parseISODate(dueDate);
    return { label: `${weekdayLong(date)}${time}`, tone: 'soon' };
  }
  return { label: `${formatMediumDate(dueDate)}${time}`, tone: 'normal' };
}

/** Minuten als "45 min" oder "1 h 30 min". */
export function formatDuration(minutes) {
  const value = Number(minutes);
  if (!Number.isFinite(value) || value <= 0) return null;
  const hours = Math.floor(value / 60);
  const rest = value % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

/** Kalenderwoche (ISO 8601). */
export function isoWeekNumber(date) {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7));
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 86400000));
}
