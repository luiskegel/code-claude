/**
 * Persistenz über localStorage.
 * Alle Zugriffe sind gekapselt und fehlertolerant: Ist der Speicher blockiert
 * (Privater Modus, volles Kontingent), läuft die App weiter – nur ohne Speichern.
 */

const STORAGE_KEY = 'shm:data:v1';
const SCHEMA_VERSION = 1;

let available = null;
let lastError = null;

export function isStorageAvailable() {
  if (available !== null) return available;
  try {
    const probe = '__shm_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    available = true;
  } catch (error) {
    lastError = error;
    available = false;
  }
  return available;
}

export function getStorageError() {
  return lastError;
}

/** Liest den gespeicherten Zustand. Bei defekten Daten wird null geliefert. */
export function loadRawState() {
  if (!isStorageAvailable()) return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch (error) {
    lastError = error;
    console.warn('Gespeicherte Daten konnten nicht gelesen werden – starte mit leerem Stand.', error);
    backupCorruptData();
    return null;
  }
}

/** Schreibt den Zustand. Liefert true bei Erfolg. */
export function saveRawState(state) {
  if (!isStorageAvailable()) return false;
  try {
    const payload = JSON.stringify({ version: SCHEMA_VERSION, ...state });
    window.localStorage.setItem(STORAGE_KEY, payload);
    return true;
  } catch (error) {
    lastError = error;
    console.error('Speichern fehlgeschlagen.', error);
    return false;
  }
}

export function clearState() {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    lastError = error;
    return false;
  }
}

/** Defekte Daten nicht einfach überschreiben, sondern beiseitelegen. */
function backupCorruptData() {
  try {
    const broken = window.localStorage.getItem(STORAGE_KEY);
    if (broken) window.localStorage.setItem(`${STORAGE_KEY}:backup:${Date.now()}`, broken);
  } catch {
    /* Backup ist optional – Fehler hier dürfen die App nicht stoppen. */
  }
}
