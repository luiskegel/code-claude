/**
 * Erkennt aus einem Freitext wie
 *   "Mathe: Bis Freitag Aufgaben 3–8 auf Seite 124"
 * strukturierte Aufgabendaten (Fach, Titel, Termin, Uhrzeit, Priorität, Dauer).
 *
 * Die Erkennung ist bewusst konservativ – der Benutzer bestätigt das Ergebnis
 * anschliessend im Formular.
 */

import { addDays, today, toISODate, isoWeekNumber } from './date.js';
import { findSubject } from '../data/model.js';

const WEEKDAYS = {
  montag: 1,
  mo: 1,
  dienstag: 2,
  di: 2,
  mittwoch: 3,
  mi: 3,
  donnerstag: 4,
  do: 4,
  freitag: 5,
  fr: 5,
  samstag: 6,
  sa: 6,
  sonnabend: 6,
  sonntag: 0,
  so: 0,
};

const SUBJECT_ALIASES = {
  mathe: 'Mathematik',
  mathematik: 'Mathematik',
  deutsch: 'Deutsch',
  englisch: 'Englisch',
  english: 'Englisch',
  bio: 'Biologie',
  biologie: 'Biologie',
  chemie: 'Chemie',
  physik: 'Physik',
  info: 'Informatik',
  informatik: 'Informatik',
  geschichte: 'Geschichte',
  geo: 'Geografie',
  geografie: 'Geografie',
  erdkunde: 'Erdkunde',
  franz: 'Französisch',
  französisch: 'Französisch',
  latein: 'Latein',
  spanisch: 'Spanisch',
  sport: 'Sport',
  kunst: 'Kunst',
  musik: 'Musik',
  religion: 'Religion',
  ethik: 'Ethik',
  philosophie: 'Philosophie',
  politik: 'Politik',
  wirtschaft: 'Wirtschaft',
  sowi: 'Sozialwissenschaften',
  psychologie: 'Psychologie',
};

const MONTHS = {
  januar: 1, jan: 1,
  februar: 2, feb: 2,
  märz: 3, maerz: 3, mrz: 3,
  april: 4, apr: 4,
  mai: 5,
  juni: 6, jun: 6,
  juli: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  oktober: 10, okt: 10,
  november: 11, nov: 11,
  dezember: 12, dez: 12,
};

/**
 * @param {string} rawText Freitext
 * @param {Array<{name:string}>} subjects vorhandene Fächer
 * @returns {{title:string, subject:string, dueDate:string, dueTime:string, priority:string,
 *            estimatedMinutes:number|null, description:string, detected:string[]}}
 */
export function parseQuickInput(rawText, subjects = []) {
  const original = String(rawText ?? '').trim();
  const result = {
    title: '',
    subject: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'normal',
    estimatedMinutes: null,
    detected: [],
  };

  if (!original) return result;

  let text = original;

  // 1) Fach: entweder "Fach: Rest" oder ein bekanntes Fachwort im Text.
  const colonMatch = /^\s*([\p{L}\d .\-/]{2,30}?)\s*[:–-]\s*(.+)$/u.exec(text);
  if (colonMatch) {
    const candidate = colonMatch[1].trim();
    const resolved = resolveSubject(candidate, subjects);
    if (resolved) {
      result.subject = resolved;
      result.detected.push('Fach');
      text = colonMatch[2];
    }
  }

  if (!result.subject) {
    for (const word of text.split(/[\s,.;:]+/)) {
      const resolved = resolveSubject(word, subjects, { strict: true });
      if (resolved) {
        result.subject = resolved;
        result.detected.push('Fach');
        text = removeFirst(text, word);
        break;
      }
    }
  }

  // 2) Uhrzeit
  const timeMatch = /\b(?:um\s+)?([01]?\d|2[0-3])[:.]([0-5]\d)\s*(?:uhr)?\b/i.exec(text);
  const hourMatch = /\b(?:um\s+)?([01]?\d|2[0-3])\s*uhr\b/i.exec(text);
  if (timeMatch) {
    result.dueTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
    result.detected.push('Uhrzeit');
    text = removeMatch(text, timeMatch);
  } else if (hourMatch) {
    result.dueTime = `${hourMatch[1].padStart(2, '0')}:00`;
    result.detected.push('Uhrzeit');
    text = removeMatch(text, hourMatch);
  }

  // 3) Termin
  const dateResult = extractDate(text);
  if (dateResult) {
    result.dueDate = dateResult.iso;
    result.detected.push('Termin');
    text = dateResult.rest;
  }

  // 4) Dauer
  const durationMatch =
    /\b(?:ca\.?\s*|etwa\s*|ungefähr\s*)?(\d{1,3})\s*(min|minuten|minute|std|stunde|stunden|h)\b/i.exec(text);
  if (durationMatch) {
    const amount = Number(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();
    const minutes = unit.startsWith('h') || unit.startsWith('std') || unit.startsWith('stunde') ? amount * 60 : amount;
    if (minutes > 0 && minutes <= 1440) {
      result.estimatedMinutes = minutes;
      result.detected.push('Dauer');
      text = removeMatch(text, durationMatch);
    }
  }

  // 5) Priorität
  const priorityMatch = /\b(dringend|sehr wichtig|wichtig|eilig|klausur|test|prüfung|unwichtig|optional)\b/i.exec(text);
  if (priorityMatch) {
    const word = priorityMatch[1].toLowerCase();
    if (['dringend', 'eilig', 'sehr wichtig'].includes(word)) result.priority = 'urgent';
    else if (['unwichtig', 'optional'].includes(word)) result.priority = 'low';
    else result.priority = 'high';
    result.detected.push('Priorität');
    // Prioritätswort bleibt im Titel stehen – es trägt oft Bedeutung ("Klausur").
  }

  // 6) Rest aufräumen -> Titel
  result.title = cleanTitle(text);
  if (!result.title) result.title = cleanTitle(original);

  return result;
}

function resolveSubject(candidate, subjects, { strict = false } = {}) {
  const clean = String(candidate ?? '').trim().replace(/[.,;:]$/, '');
  if (clean.length < 2) return null;

  const existing = findSubject(subjects, clean);
  if (existing) return existing.name;

  const alias = SUBJECT_ALIASES[clean.toLowerCase()];
  if (alias) {
    const known = findSubject(subjects, alias);
    return known ? known.name : alias;
  }

  // Ohne Doppelpunkt nur bekannte Fächer akzeptieren, sonst entstehen Fantasie-Fächer.
  if (strict) return null;
  return /^[\p{L}][\p{L}\d .\-/]{1,29}$/u.test(clean) ? clean : null;
}

function extractDate(text) {
  const base = today();

  // "heute" / "morgen" / "übermorgen"
  const relative = /\b(heute|morgen|übermorgen|uebermorgen)\b/i.exec(text);
  if (relative) {
    const word = relative[1].toLowerCase();
    const offset = word === 'heute' ? 0 : word === 'morgen' ? 1 : 2;
    return { iso: toISODate(addDays(base, offset)), rest: removeMatch(text, relative) };
  }

  // "in 3 Tagen" / "in einer Woche"
  const inDays = /\bin\s+(\d{1,2})\s*(tag|tagen|woche|wochen)\b/i.exec(text);
  if (inDays) {
    const amount = Number(inDays[1]);
    const days = inDays[2].toLowerCase().startsWith('woche') ? amount * 7 : amount;
    return { iso: toISODate(addDays(base, days)), rest: removeMatch(text, inDays) };
  }

  // "12.09.2026" / "12.9." / "12. September"
  const numericDate = /\b(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{2,4})?/.exec(text);
  if (numericDate) {
    const day = Number(numericDate[1]);
    const month = Number(numericDate[2]);
    const year = numericDate[3] ? normalizeYear(Number(numericDate[3])) : guessYear(day, month, base);
    const iso = buildISO(year, month, day);
    if (iso) return { iso, rest: removeMatch(text, numericDate) };
  }

  const namedDate = new RegExp(`\\b(\\d{1,2})\\.?\\s+(${Object.keys(MONTHS).join('|')})\\b`, 'i').exec(text);
  if (namedDate) {
    const day = Number(namedDate[1]);
    const month = MONTHS[namedDate[2].toLowerCase()];
    const iso = buildISO(guessYear(day, month, base), month, day);
    if (iso) return { iso, rest: removeMatch(text, namedDate) };
  }

  // Wochentage, optional mit "nächsten"
  const weekdayPattern = new RegExp(
    `\\b(bis\\s+|am\\s+|nächsten?\\s+|naechsten?\\s+|kommenden?\\s+)?(${Object.keys(WEEKDAYS).join('|')})\\b`,
    'i',
  );
  const weekday = weekdayPattern.exec(text);
  if (weekday) {
    const modifier = (weekday[1] ?? '').toLowerCase();
    const targetDay = WEEKDAYS[weekday[2].toLowerCase()];
    let date = nextWeekday(base, targetDay);
    if (/nächst|naechst|kommend/.test(modifier) && isoWeekNumber(date) === isoWeekNumber(base)) {
      date = addDays(date, 7);
    }
    return { iso: toISODate(date), rest: removeMatch(text, weekday) };
  }

  // "nächste Woche"
  const nextWeek = /\b(nächste|naechste|kommende)\s+woche\b/i.exec(text);
  if (nextWeek) {
    return { iso: toISODate(addDays(base, 7)), rest: removeMatch(text, nextWeek) };
  }

  return null;
}

function nextWeekday(from, targetDay) {
  const diff = (targetDay - from.getDay() + 7) % 7;
  return addDays(from, diff);
}

function normalizeYear(year) {
  return year < 100 ? 2000 + year : year;
}

/** Ohne Jahresangabe: das nächste Auftreten des Datums wählen. */
function guessYear(day, month, base) {
  const candidate = new Date(base.getFullYear(), month - 1, day);
  return candidate.getTime() < base.getTime() ? base.getFullYear() + 1 : base.getFullYear();
}

function buildISO(year, month, day) {
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return toISODate(date);
}

function removeMatch(text, match) {
  return `${text.slice(0, match.index)} ${text.slice(match.index + match[0].length)}`;
}

function removeFirst(text, word) {
  const index = text.toLowerCase().indexOf(word.toLowerCase());
  if (index === -1) return text;
  return `${text.slice(0, index)} ${text.slice(index + word.length)}`;
}

function cleanTitle(text) {
  return String(text)
    .replace(/\s+/g, ' ')
    .replace(/^[\s,.;:–-]+/, '')
    .replace(/[\s,;:–-]+$/, '')
    .replace(/^(bis|am|für|fuer|zum|zur|auf)\s+/i, '')
    .replace(/\s+(bis|am)\s*$/i, '')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}
