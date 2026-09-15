/**
 * Stundenplan: Zeitraster, Wochenplan und die Frage „Wann ist die nächste
 * Stunde in diesem Fach?" – die Grundlage für automatische Abgabetermine.
 *
 * Der Plan gilt für jede Woche gleich (keine A/B-Wochen, keine Ferien).
 */

import { addDays, toISODate, weekdayLong } from '../lib/date.js';
import { createId } from '../lib/id.js';

export const WEEKDAYS = [
  { day: 1, short: 'Mo', long: 'Montag' },
  { day: 2, short: 'Di', long: 'Dienstag' },
  { day: 3, short: 'Mi', long: 'Mittwoch' },
  { day: 4, short: 'Do', long: 'Donnerstag' },
  { day: 5, short: 'Fr', long: 'Freitag' },
];

/** Zeitraster der Einzelstunden (45 Minuten). */
export const PERIODS = [
  { number: 1, start: '08:00', end: '08:45' },
  { number: 2, start: '08:45', end: '09:30' },
  { number: 3, start: '09:50', end: '10:35' },
  { number: 4, start: '10:35', end: '11:20' },
  { number: 5, start: '11:40', end: '12:25' },
  { number: 6, start: '12:25', end: '13:10' },
  { number: 7, start: '13:15', end: '14:00' },
  { number: 8, start: '14:00', end: '14:45' },
  { number: 9, start: '14:45', end: '15:30' },
  { number: 10, start: '15:30', end: '16:15' },
];

export const DAY_START = '08:00';
export const DAY_END = '16:15';

/**
 * Wochenplan aus dem Vertretungsplan-Screenshot (KW 39).
 * `course` ist das Kurskürzel, `subject` der ausgeschriebene Fachname –
 * beides lässt sich in der Stundenplan-Ansicht ändern.
 */
export const DEFAULT_SCHEDULE = [
  // Montag
  { day: 1, start: '08:00', end: '09:30', subject: 'Religion', course: 'RE-GK1', teacher: 'HAGE', room: 'B306' },
  { day: 1, start: '09:50', end: '11:20', subject: 'Englisch', course: 'E-GK1', teacher: 'BREU', room: 'C303' },
  { day: 1, start: '11:40', end: '12:25', subject: 'Erdkunde', course: 'EKL-LK1', teacher: 'MATE', room: '' },
  { day: 1, start: '12:25', end: '13:10', subject: 'Sport', course: 'SP-GK4', teacher: 'KLIN', room: '' },
  { day: 1, start: '13:15', end: '14:00', subject: 'Kunst', course: 'KU-GK1', teacher: 'HÜTT', room: '' },

  // Dienstag
  { day: 2, start: '08:00', end: '09:30', subject: 'Physik', course: 'PH-GK1', teacher: 'EKIC', room: 'B202' },
  { day: 2, start: '09:50', end: '11:20', subject: 'Deutsch', course: 'DL-LK1', teacher: 'ZÖLL', room: 'B103' },
  { day: 2, start: '11:40', end: '12:25', subject: 'Biologie', course: 'BI-GK1', teacher: 'HOHM', room: '' },
  { day: 2, start: '12:25', end: '14:00', subject: 'Kunst', course: 'KU-GK1', teacher: 'HÜTT', room: 'KU1/A302' },
  { day: 2, start: '14:00', end: '14:45', subject: 'Englisch', course: 'E-GK1', teacher: 'BREU', room: '' },

  // Mittwoch
  { day: 3, start: '08:00', end: '09:30', subject: 'Sport', course: 'SP-GK4', teacher: 'KLIN', room: 'SP3' },
  { day: 3, start: '09:50', end: '11:20', subject: 'Erdkunde', course: 'EKL-LK1', teacher: 'MATE', room: 'C301' },
  { day: 3, start: '11:40', end: '12:25', subject: 'Deutsch', course: 'DL-LK1', teacher: 'ZÖLL', room: '' },
  { day: 3, start: '12:25', end: '13:10', subject: 'Physik', course: 'PH-GK1', teacher: 'EKIC', room: '' },

  // Donnerstag
  { day: 4, start: '08:00', end: '09:30', subject: 'Mathematik', course: 'M-GK2', teacher: 'HÖRN', room: 'B305' },
  { day: 4, start: '09:50', end: '11:20', subject: 'Deutsch', course: 'DL-LK1', teacher: 'ZÖLL', room: 'B103' },
  { day: 4, start: '11:40', end: '12:25', subject: 'Religion', course: 'RE-GK1', teacher: 'HAGE', room: '' },
  { day: 4, start: '12:25', end: '13:10', subject: 'Biologie', course: 'BI-GK1', teacher: 'HOHM', room: 'B210' },
  { day: 4, start: '14:00', end: '15:30', subject: 'Sozialwissenschaften', course: 'SW-GK2', teacher: 'ZÖLL', room: 'A106' },

  // Freitag
  { day: 5, start: '09:50', end: '11:20', subject: 'Erdkunde', course: 'EKL-LK1', teacher: 'MATE', room: 'C301' },
  { day: 5, start: '11:40', end: '12:25', subject: 'Mathematik', course: 'M-GK2', teacher: 'HÖRN', room: '' },
  { day: 5, start: '12:25', end: '13:10', subject: 'Sozialwissenschaften', course: 'SW-GK2', teacher: 'ZÖLL', room: '' },
];

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function createLesson(value) {
  return {
    id: createId('les'),
    day: Number(value.day) || 1,
    start: value.start || '08:00',
    end: value.end || '08:45',
    subject: String(value.subject ?? '').trim(),
    course: String(value.course ?? '').trim(),
    teacher: String(value.teacher ?? '').trim(),
    room: String(value.room ?? '').trim(),
  };
}

/** Repariert Einträge aus dem localStorage. */
export function normalizeLesson(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const day = Number(raw.day);
  const subject = typeof raw.subject === 'string' ? raw.subject.trim() : '';
  if (!subject || !Number.isInteger(day) || day < 1 || day > 7) return null;
  if (!TIME_PATTERN.test(raw.start ?? '') || !TIME_PATTERN.test(raw.end ?? '')) return null;
  if (raw.end <= raw.start) return null;

  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : createId('les'),
    day,
    start: raw.start,
    end: raw.end,
    subject,
    course: typeof raw.course === 'string' ? raw.course.trim().slice(0, 20) : '',
    teacher: typeof raw.teacher === 'string' ? raw.teacher.trim().slice(0, 20) : '',
    room: typeof raw.room === 'string' ? raw.room.trim().slice(0, 20) : '',
  };
}

export function validateLessonInput(input) {
  const errors = {};

  const subject = String(input.subject ?? '').trim();
  if (!subject) errors.subject = 'Bitte wähle ein Fach.';

  const day = Number(input.day);
  if (!Number.isInteger(day) || day < 1 || day > 7) errors.day = 'Bitte wähle einen Wochentag.';

  const start = String(input.start ?? '').trim();
  const end = String(input.end ?? '').trim();
  if (!TIME_PATTERN.test(start)) errors.start = 'Ungültige Uhrzeit (Format HH:MM).';
  if (!TIME_PATTERN.test(end)) errors.end = 'Ungültige Uhrzeit (Format HH:MM).';
  if (!errors.start && !errors.end && end <= start) errors.end = 'Das Ende muss nach dem Beginn liegen.';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: {
      day,
      start,
      end,
      subject,
      course: String(input.course ?? '').trim().slice(0, 20),
      teacher: String(input.teacher ?? '').trim().slice(0, 20),
      room: String(input.room ?? '').trim().slice(0, 20),
    },
  };
}

export function lessonsForDay(schedule, day) {
  return schedule.filter((lesson) => lesson.day === day).sort((a, b) => a.start.localeCompare(b.start));
}

/** Alle Fächer, die im Stundenplan vorkommen. */
export function scheduleSubjects(schedule) {
  return [...new Set(schedule.map((lesson) => lesson.subject).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'de'),
  );
}

/**
 * Die nächste Stunde eines Fachs ab einem Zeitpunkt.
 * @returns {{date: string, time: string, lesson: object, daysAhead: number}|null}
 */
export function nextLessonFor(schedule, subject, from = new Date()) {
  const needle = String(subject ?? '').trim().toLowerCase();
  if (!needle) return null;

  const lessons = schedule.filter((lesson) => lesson.subject.toLowerCase() === needle);
  if (!lessons.length) return null;

  for (let offset = 0; offset < 21; offset += 1) {
    const date = addDays(from, offset);
    const candidates = lessonsForDay(lessons, date.getDay());

    for (const lesson of candidates) {
      // Am heutigen Tag zählt nur, was noch nicht begonnen hat.
      if (offset === 0 && startTimestamp(date, lesson.start) <= from.getTime()) continue;
      return { date: toISODate(date), time: lesson.start, lesson, daysAhead: offset };
    }
  }

  return null;
}

/** Lesbarer Hinweis, z.B. „Do, 08:00 Uhr (in 2 Tagen)". */
export function describeNextLesson(next) {
  if (!next) return null;

  const when =
    next.daysAhead === 0
      ? 'heute'
      : next.daysAhead === 1
        ? 'morgen'
        : weekdayLong(new Date(`${next.date}T00:00:00`));
  const room = next.lesson.room ? `, Raum ${next.lesson.room}` : '';
  return `${when} um ${next.time} Uhr${room}`;
}

function startTimestamp(date, time) {
  const [hours, minutes] = time.split(':').map(Number);
  const stamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
  return stamp.getTime();
}

/** Position einer Stunde im Tagesraster in Prozent – für die Rasterdarstellung. */
export function lessonPosition(lesson) {
  const dayStart = minutesOf(DAY_START);
  const total = minutesOf(DAY_END) - dayStart;
  const top = ((minutesOf(lesson.start) - dayStart) / total) * 100;
  const height = ((minutesOf(lesson.end) - minutesOf(lesson.start)) / total) * 100;
  return { top, height };
}

export function minutesOf(time) {
  const [hours, minutes] = String(time).split(':').map(Number);
  return hours * 60 + minutes;
}
