/**
 * Persistenz in zwei Stufen.
 *
 *  1. localStorage – sofort verfügbar, überlebt aber in manchen Umgebungen
 *     (eingebettete Ansicht auf claude.ai, iOS mit striktem Tracking-Schutz)
 *     das Schliessen der App nicht.
 *  2. Server-Speicher der Plattform (`db`) – dauerhaft und geräteübergreifend.
 *
 * Beim Start wird zuerst der lokale Stand angezeigt, damit die App sofort
 * benutzbar ist. Parallel wird der Server gefragt; sind dort Daten, ersetzen
 * sie den lokalen Stand. Ist der Server leer, wandert der lokale Stand hoch.
 */

import { getCloudDb } from './cloud.js';
import { loadRawState, saveRawState } from './storage.js';

const META_PATH = 'meta/app';
const TASKS_COLLECTION = 'tasks';
const SYNC_DELAY_MS = 400;

const listeners = new Set();

let db = null;
let cloudReady = false;
let syncState = 'local'; // local | connecting | synced | error
let lastError = null;

// Was zuletzt hochgeladen wurde – damit nur echte Änderungen geschrieben werden.
const pushedTasks = new Map();
let pushedMeta = null;

let pending = null;
let pendingTimer = null;
let writing = false;

/* ---------------- Status ---------------- */

export function getSyncState() {
  return { state: syncState, error: lastError };
}

export function onSyncChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setSyncState(next, error = null) {
  syncState = next;
  lastError = error;
  for (const listener of listeners) listener(getSyncState());
}

/* ---------------- Laden ---------------- */

/** Sofort verfügbarer lokaler Stand (synchron). */
export function loadLocalState() {
  return loadRawState();
}

/**
 * Verbindet mit dem Server-Speicher.
 * @param {{hasLocalChanges: () => boolean, getState: () => object}} hooks
 * @returns {Promise<object|null>} Zustand vom Server, falls vorhanden
 */
export async function connectCloud({ hasLocalChanges, getState }) {
  setSyncState('connecting');
  db = await getCloudDb();

  if (!db) {
    setSyncState('local');
    return null;
  }

  cloudReady = true;

  try {
    const remote = await readRemoteState();

    // Der Server hat Daten und lokal wurde seit dem Start nichts geändert:
    // der Server gewinnt (er ist die dauerhafte Quelle).
    if (remote && !hasLocalChanges()) {
      rememberPushed(remote);
      setSyncState('synced');
      return remote;
    }

    // Sonst wandert der aktuelle Stand hoch – damit gehen lokale Eingaben
    // aus den ersten Sekunden nicht verloren.
    await pushState(getState());
    setSyncState('synced');
    return null;
  } catch (error) {
    console.error('Server-Speicher nicht erreichbar:', error);
    setSyncState('error', beschreibeFehler(error));
    return null;
  }
}

async function readRemoteState() {
  const [metaSnap, taskSnap] = await Promise.all([
    db.doc(META_PATH).get(),
    db.collection(TASKS_COLLECTION).get(),
  ]);

  const meta = metaSnap.exists ? metaSnap.data() : null;
  const tasks = taskSnap.docs.map((doc) => doc.data()).filter(Boolean);

  if (!meta && !tasks.length) return null;

  return {
    tasks,
    subjects: Array.isArray(meta?.subjects) ? meta.subjects : [],
    schedule: Array.isArray(meta?.schedule) ? meta.schedule : [],
    settings: meta?.settings && typeof meta.settings === 'object' ? meta.settings : {},
  };
}

/* ---------------- Speichern ---------------- */

/**
 * Speichert den Zustand: lokal sofort, auf dem Server gebündelt.
 * @returns {boolean} ob der lokale Speicher funktioniert hat
 */
export function persist(state) {
  const localOk = saveRawState({
    tasks: state.tasks,
    subjects: state.subjects,
    schedule: state.schedule,
    settings: state.settings,
  });

  if (cloudReady) scheduleCloudSync(state);
  return localOk;
}

function scheduleCloudSync(state) {
  // Mehrere Änderungen kurz hintereinander werden zu einem Schreibvorgang.
  pending = state;
  clearTimeout(pendingTimer);
  pendingTimer = setTimeout(runCloudSync, SYNC_DELAY_MS);
}

async function runCloudSync() {
  if (writing || !pending) return;

  const state = pending;
  pending = null;
  writing = true;

  try {
    await pushState(state);
    if (syncState !== 'synced') setSyncState('synced');
  } catch (error) {
    console.error('Speichern auf dem Server fehlgeschlagen:', error);
    setSyncState('error', beschreibeFehler(error));
  } finally {
    writing = false;
    if (pending) scheduleCloudSync(pending);
  }
}

/** Schreibt nur, was sich seit dem letzten Mal geändert hat. */
async function pushState(state) {
  if (!db) return;

  for (const task of state.tasks) {
    const serialized = JSON.stringify(task);
    if (pushedTasks.get(task.id) === serialized) continue;
    await db.doc(`${TASKS_COLLECTION}/${task.id}`).set(task);
    pushedTasks.set(task.id, serialized);
  }

  const currentIds = new Set(state.tasks.map((task) => task.id));
  for (const id of [...pushedTasks.keys()]) {
    if (currentIds.has(id)) continue;
    await db.doc(`${TASKS_COLLECTION}/${id}`).delete();
    pushedTasks.delete(id);
  }

  const meta = { subjects: state.subjects, schedule: state.schedule, settings: state.settings };
  const serializedMeta = JSON.stringify(meta);
  if (serializedMeta !== pushedMeta) {
    await db.doc(META_PATH).set(meta);
    pushedMeta = serializedMeta;
  }
}

function rememberPushed(remote) {
  pushedTasks.clear();
  for (const task of remote.tasks) pushedTasks.set(task.id, JSON.stringify(task));
  pushedMeta = JSON.stringify({
    subjects: remote.subjects,
    schedule: remote.schedule,
    settings: remote.settings,
  });
}

function beschreibeFehler(error) {
  switch (error?.code) {
    case 'not_granted':
      return 'Der Zugriff auf den Server-Speicher wurde abgelehnt.';
    case 'quota_exceeded':
      return 'Der Speicher ist voll. Lösche alte Aufgaben.';
    case 'resource_exhausted':
      return 'Zu viele Änderungen in kurzer Zeit – es wird später erneut gespeichert.';
    case 'revoked':
      return 'Die Verbindung zum Server-Speicher wurde beendet.';
    default:
      return 'Die Aufgaben liegen gerade nur auf diesem Gerät.';
  }
}
