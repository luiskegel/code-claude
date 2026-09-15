/**
 * Zentraler Zustand der App.
 * Views lesen nur `getState()` und lösen Änderungen über die Aktionen aus;
 * jede Änderung schreibt automatisch in den localStorage und benachrichtigt die Views.
 */

import { isStorageAvailable } from '../data/storage.js';
import { connectCloud, loadLocalState, persist } from '../data/persistence.js';
import {
  DEFAULT_SUBJECTS,
  SUBJECT_COLORS,
  createSubject,
  createTask,
  findSubject,
  normalizeSubject,
  normalizeTask,
} from '../data/model.js';
import {
  DEFAULT_SCHEDULE,
  createLesson,
  normalizeLesson,
  scheduleSubjects,
} from '../data/schedule.js';

const listeners = new Set();

const state = {
  tasks: [],
  subjects: [],
  schedule: [],
  settings: { theme: 'system', autoDueFromSchedule: true },
  ui: {
    view: 'dashboard',
    filter: 'today',
    weekOffset: 0,
    aiTaskId: null,
  },
  storageOk: true,
};

/* ---------------- Initialisierung ---------------- */

let changedSinceStart = false;

export function initStore() {
  applyRawState(loadLocalState());
  state.storageOk = isStorageAvailable();
}

/**
 * Verbindet mit dem Server-Speicher der Plattform. Liegt dort ein Stand,
 * ersetzt er den lokalen – so sind die Aufgaben nach dem Schliessen der App
 * und auf anderen Geräten wieder da.
 */
export async function connectPersistence() {
  const remote = await connectCloud({
    hasLocalChanges: () => changedSinceStart,
    getState: () => state,
  });

  if (remote) {
    applyRawState(remote);
    // Der Serverstand gilt jetzt als gespeichert – kein erneutes Hochladen.
    for (const listener of listeners) listener(state);
  }
  return remote;
}

function applyRawState(raw) {

  const subjects = Array.isArray(raw?.subjects)
    ? raw.subjects.map(normalizeSubject).filter(Boolean)
    : [];

  state.subjects = subjects.length ? subjects : DEFAULT_SUBJECTS.map((s) => createSubject(s.name, s.color));
  state.tasks = Array.isArray(raw?.tasks) ? raw.tasks.map(normalizeTask).filter(Boolean) : [];

  // Beim ersten Start wird der mitgelieferte Wochenplan übernommen.
  state.schedule = Array.isArray(raw?.schedule)
    ? raw.schedule.map(normalizeLesson).filter(Boolean)
    : DEFAULT_SCHEDULE.map(createLesson);

  const theme = raw?.settings?.theme;
  state.settings.theme = ['light', 'dark', 'system'].includes(theme) ? theme : 'system';
  state.settings.autoDueFromSchedule = raw?.settings?.autoDueFromSchedule !== false;

  // Fächer aus Aufgaben und Stundenplan ergänzen, falls sie fehlen.
  for (const name of [...state.tasks.map((task) => task.subject), ...scheduleSubjects(state.schedule)]) {
    if (name && !findSubject(state.subjects, name)) {
      state.subjects.push(createSubject(name, nextSubjectColor()));
    }
  }
}

export function getState() {
  return state;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit({ store = true } = {}) {
  if (store) {
    changedSinceStart = true;
    const ok = persist(state);
    if (!ok && state.storageOk) state.storageOk = false;
  }
  for (const listener of listeners) listener(state);
}

/* ---------------- UI-Aktionen ---------------- */

export function setView(view, options = {}) {
  state.ui.view = view;
  if (options.filter) state.ui.filter = options.filter;
  if (options.aiTaskId !== undefined) state.ui.aiTaskId = options.aiTaskId;
  commit({ store: false });
}

export function setFilter(filter) {
  state.ui.filter = filter;
  commit({ store: false });
}

export function setWeekOffset(offset) {
  state.ui.weekOffset = offset;
  commit({ store: false });
}

export function setTheme(theme) {
  state.settings.theme = theme;
  commit();
}

export function setAutoDueFromSchedule(enabled) {
  state.settings.autoDueFromSchedule = Boolean(enabled);
  commit();
}

/* ---------------- Stundenplan ---------------- */

export function addLesson(value) {
  ensureSubject(value.subject);
  const lesson = createLesson(value);
  state.schedule.push(lesson);
  commit();
  return lesson;
}

export function updateLesson(id, changes) {
  const lesson = state.schedule.find((entry) => entry.id === id);
  if (!lesson) return null;

  if (changes.subject) ensureSubject(changes.subject);
  Object.assign(lesson, changes);
  commit();
  return lesson;
}

export function deleteLesson(id) {
  const index = state.schedule.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  const [removed] = state.schedule.splice(index, 1);
  commit();
  return { lesson: removed, index };
}

export function restoreLesson(lesson, index) {
  if (!lesson) return;
  const position = Number.isInteger(index) ? Math.min(index, state.schedule.length) : state.schedule.length;
  state.schedule.splice(position, 0, lesson);
  commit();
}

/** Setzt den Stundenplan auf den mitgelieferten Wochenplan zurück. */
export function resetSchedule() {
  state.schedule = DEFAULT_SCHEDULE.map(createLesson);
  for (const name of scheduleSubjects(state.schedule)) {
    if (!findSubject(state.subjects, name)) state.subjects.push(createSubject(name, nextSubjectColor()));
  }
  commit();
}

/* ---------------- Aufgaben ---------------- */

export function addTask(value) {
  ensureSubject(value.subject);
  const task = createTask(value);
  state.tasks.push(task);
  commit();
  return task;
}

export function updateTask(id, changes) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return null;

  if (changes.subject) ensureSubject(changes.subject);
  Object.assign(task, changes, { updatedAt: new Date().toISOString() });
  commit();
  return task;
}

export function toggleTaskCompleted(id) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return null;

  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;
  task.updatedAt = new Date().toISOString();
  commit();
  return task;
}

export function duplicateTask(id) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return null;

  const copy = createTask({ ...task, title: `${task.title} (Kopie)` });
  const index = state.tasks.indexOf(task);
  state.tasks.splice(index + 1, 0, copy);
  commit();
  return copy;
}

/** Löscht eine Aufgabe und liefert die Daten für "Rückgängig". */
export function deleteTask(id) {
  const index = state.tasks.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  const [removed] = state.tasks.splice(index, 1);
  commit();
  return { task: removed, index };
}

export function restoreTask(task, index) {
  if (!task) return;
  const position = Number.isInteger(index) ? Math.min(index, state.tasks.length) : state.tasks.length;
  state.tasks.splice(position, 0, task);
  commit();
}

export function getTask(id) {
  return state.tasks.find((entry) => entry.id === id) ?? null;
}

/* ---------------- Fächer ---------------- */

export function ensureSubject(name) {
  const clean = String(name ?? '').trim();
  if (!clean) return null;

  const existing = findSubject(state.subjects, clean);
  if (existing) return existing;

  const subject = createSubject(clean, nextSubjectColor());
  state.subjects.push(subject);
  return subject;
}

export function addSubject(name, color) {
  const clean = String(name ?? '').trim();
  if (!clean) return { ok: false, error: 'Bitte gib einen Namen ein.' };
  if (findSubject(state.subjects, clean)) return { ok: false, error: 'Dieses Fach gibt es bereits.' };

  const subject = createSubject(clean, color || nextSubjectColor());
  state.subjects.push(subject);
  commit();
  return { ok: true, subject };
}

export function renameSubject(id, name) {
  const subject = state.subjects.find((entry) => entry.id === id);
  const clean = String(name ?? '').trim();
  if (!subject || !clean) return { ok: false, error: 'Bitte gib einen Namen ein.' };

  const duplicate = findSubject(state.subjects, clean);
  if (duplicate && duplicate.id !== id) return { ok: false, error: 'Dieses Fach gibt es bereits.' };

  const previous = subject.name;
  subject.name = clean;
  for (const task of state.tasks) {
    if (task.subject === previous) task.subject = clean;
  }
  commit();
  return { ok: true, subject };
}

export function updateSubjectColor(id, color) {
  const subject = state.subjects.find((entry) => entry.id === id);
  if (!subject) return;
  subject.color = color;
  commit();
}

/** Entfernt ein Fach. Aufgaben bleiben erhalten und behalten den Fachnamen. */
export function deleteSubject(id) {
  const index = state.subjects.findIndex((entry) => entry.id === id);
  if (index === -1) return false;
  state.subjects.splice(index, 1);
  commit();
  return true;
}

function nextSubjectColor() {
  const used = new Set(state.subjects.map((subject) => subject.color));
  return SUBJECT_COLORS.find((color) => !used.has(color)) ?? SUBJECT_COLORS[state.subjects.length % SUBJECT_COLORS.length];
}
