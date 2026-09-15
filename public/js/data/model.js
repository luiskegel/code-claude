/** Datenmodell: Prioritäten, Fächer, Aufgaben – inklusive Validierung und Normalisierung. */

import { isValidISODate, isValidTime, todayISO, daysBetween } from '../lib/date.js';

export const PRIORITIES = [
  { id: 'low', label: 'Niedrig', weight: 0 },
  { id: 'normal', label: 'Normal', weight: 1 },
  { id: 'high', label: 'Hoch', weight: 2 },
  { id: 'urgent', label: 'Dringend', weight: 3 },
];

const PRIORITY_IDS = PRIORITIES.map((priority) => priority.id);

export function priorityLabel(id) {
  return PRIORITIES.find((priority) => priority.id === id)?.label ?? 'Normal';
}

export function priorityWeight(id) {
  return PRIORITIES.find((priority) => priority.id === id)?.weight ?? 1;
}

export const SUBJECT_COLORS = [
  '#4f46e5',
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#64748b',
  '#84cc16',
];

export const DEFAULT_SUBJECTS = [
  { name: 'Mathematik', color: '#4f46e5' },
  { name: 'Deutsch', color: '#ef4444' },
  { name: 'Englisch', color: '#0ea5e9' },
  { name: 'Biologie', color: '#10b981' },
  { name: 'Physik', color: '#8b5cf6' },
  { name: 'Geschichte', color: '#f59e0b' },
];

export function createId(prefix = 'id') {
  const random =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}_${random}`;
}

/* ---------------- Fächer ---------------- */

export function createSubject(name, color) {
  return {
    id: createId('sub'),
    name: String(name).trim(),
    color: color || SUBJECT_COLORS[0],
  };
}

export function normalizeSubject(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (!name) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : createId('sub'),
    name,
    color: /^#[0-9a-f]{6}$/i.test(raw.color) ? raw.color : SUBJECT_COLORS[0],
  };
}

export function findSubject(subjects, name) {
  if (!name) return null;
  const needle = String(name).trim().toLowerCase();
  return subjects.find((subject) => subject.name.toLowerCase() === needle) ?? null;
}

export function subjectColor(subjects, name) {
  return findSubject(subjects, name)?.color ?? '#64748b';
}

/* ---------------- Aufgaben ---------------- */

const MAX_TITLE = 120;
const MAX_DESCRIPTION = 2000;
const MAX_MINUTES = 24 * 60;

/**
 * Prüft Formulareingaben und liefert einen sauberen Aufgaben-Datensatz.
 * @returns {{valid: boolean, errors: Record<string,string>, value: object}}
 */
export function validateTaskInput(input) {
  const errors = {};

  const title = String(input.title ?? '').trim();
  if (!title) {
    errors.title = 'Bitte gib einen Titel ein.';
  } else if (title.length > MAX_TITLE) {
    errors.title = `Höchstens ${MAX_TITLE} Zeichen.`;
  }

  const subject = String(input.subject ?? '').trim();
  if (!subject) {
    errors.subject = 'Bitte wähle ein Fach.';
  }

  const description = String(input.description ?? '').trim().slice(0, MAX_DESCRIPTION);

  const dueDate = String(input.dueDate ?? '').trim();
  if (dueDate && !isValidISODate(dueDate)) {
    errors.dueDate = 'Bitte gib ein gültiges Datum an.';
  }

  const dueTime = String(input.dueTime ?? '').trim();
  if (dueTime && !isValidTime(dueTime)) {
    errors.dueTime = 'Ungültige Uhrzeit (Format HH:MM).';
  }
  if (dueTime && !dueDate) {
    errors.dueDate = 'Für eine Uhrzeit wird auch ein Datum gebraucht.';
  }

  const priority = PRIORITY_IDS.includes(input.priority) ? input.priority : 'normal';

  let estimatedMinutes = null;
  if (input.estimatedMinutes !== '' && input.estimatedMinutes !== null && input.estimatedMinutes !== undefined) {
    const minutes = Number(input.estimatedMinutes);
    if (!Number.isFinite(minutes) || minutes < 0) {
      errors.estimatedMinutes = 'Bitte eine Zahl in Minuten angeben.';
    } else if (minutes > MAX_MINUTES) {
      errors.estimatedMinutes = 'Maximal 1440 Minuten (24 Stunden).';
    } else {
      estimatedMinutes = Math.round(minutes) || null;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: { title, subject, description, dueDate, dueTime, priority, estimatedMinutes },
  };
}

export function createTask(value) {
  const now = new Date().toISOString();
  return {
    id: createId('task'),
    title: value.title,
    subject: value.subject,
    description: value.description ?? '',
    dueDate: value.dueDate ?? '',
    dueTime: value.dueTime ?? '',
    priority: value.priority ?? 'normal',
    estimatedMinutes: value.estimatedMinutes ?? null,
    completed: false,
    completedAt: null,
    aiRequested: Boolean(value.aiRequested),
    dueFromLesson: Boolean(value.dueFromLesson),
    createdAt: now,
    updatedAt: now,
  };
}

/** Repariert Datensätze aus dem localStorage (z.B. nach manuellen Änderungen). */
export function normalizeTask(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const title = typeof raw.title === 'string' ? raw.title.trim().slice(0, MAX_TITLE) : '';
  if (!title) return null;

  const minutes = Number(raw.estimatedMinutes);
  const createdAt = typeof raw.createdAt === 'string' ? raw.createdAt : new Date().toISOString();

  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : createId('task'),
    title,
    subject: typeof raw.subject === 'string' ? raw.subject.trim() : '',
    description: typeof raw.description === 'string' ? raw.description.slice(0, MAX_DESCRIPTION) : '',
    dueDate: isValidISODate(raw.dueDate) ? raw.dueDate : '',
    dueTime: isValidTime(raw.dueTime) && raw.dueTime ? raw.dueTime : '',
    priority: PRIORITY_IDS.includes(raw.priority) ? raw.priority : 'normal',
    estimatedMinutes: Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes) : null,
    completed: Boolean(raw.completed),
    completedAt: typeof raw.completedAt === 'string' ? raw.completedAt : null,
    aiRequested: Boolean(raw.aiRequested),
    dueFromLesson: Boolean(raw.dueFromLesson),
    createdAt,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : createdAt,
  };
}

/* ---------------- Abgeleitete Zustände ---------------- */

export function isOverdue(task) {
  if (task.completed || !task.dueDate) return false;
  const delta = daysBetween(todayISO(), task.dueDate);
  return delta !== null && delta < 0;
}

export function isDueToday(task) {
  if (task.completed || !task.dueDate) return false;
  return task.dueDate === todayISO();
}

export function isDueWithin(task, days) {
  if (task.completed || !task.dueDate) return false;
  const delta = daysBetween(todayISO(), task.dueDate);
  return delta !== null && delta >= 0 && delta <= days;
}

export function taskState(task) {
  if (task.completed) return 'done';
  if (isOverdue(task)) return 'overdue';
  if (isDueToday(task)) return 'today';
  return 'open';
}

/** Sortierung: überfällig zuerst, dann nach Termin, dann nach Priorität. */
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    if (a.completed && b.completed) {
      return String(b.completedAt ?? '').localeCompare(String(a.completedAt ?? ''));
    }

    const dateA = a.dueDate || '9999-12-31';
    const dateB = b.dueDate || '9999-12-31';
    if (dateA !== dateB) return dateA < dateB ? -1 : 1;

    const timeA = a.dueTime || '99:99';
    const timeB = b.dueTime || '99:99';
    if (timeA !== timeB) return timeA < timeB ? -1 : 1;

    const weightDiff = priorityWeight(b.priority) - priorityWeight(a.priority);
    if (weightDiff !== 0) return weightDiff;

    return String(a.createdAt).localeCompare(String(b.createdAt));
  });
}
