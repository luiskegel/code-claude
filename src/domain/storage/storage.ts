/** Minimales Speicher-Interface – erfüllt von localStorage und dem In-Memory-Ersatz. */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function createMemoryStorage(initial: Record<string, string> = {}): KeyValueStorage {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
    removeItem: (key) => {
      data.delete(key);
    },
  };
}

export interface StorageHandle {
  storage: KeyValueStorage;
  /** false, wenn nur im Arbeitsspeicher gespeichert werden kann */
  persistent: boolean;
}

const PROBE_KEY = 'typeflow:probe';

/**
 * Prüft, ob localStorage nutzbar ist. In privaten Fenstern, bei blockierten Cookies
 * oder vollem Speicher wird auf einen flüchtigen In-Memory-Speicher ausgewichen.
 */
export function detectStorage(): StorageHandle {
  try {
    const storage = window.localStorage;
    storage.setItem(PROBE_KEY, '1');
    storage.removeItem(PROBE_KEY);
    return { storage, persistent: true };
  } catch {
    return { storage: createMemoryStorage(), persistent: false };
  }
}

export type ReadResult =
  | { status: 'ok'; value: unknown }
  | { status: 'missing' }
  | { status: 'corrupt'; raw: string }
  | { status: 'unavailable' };

export function readJson(storage: KeyValueStorage, key: string): ReadResult {
  let raw: string | null;
  try {
    raw = storage.getItem(key);
  } catch {
    return { status: 'unavailable' };
  }
  if (raw === null) return { status: 'missing' };
  try {
    return { status: 'ok', value: JSON.parse(raw) as unknown };
  } catch {
    return { status: 'corrupt', raw };
  }
}

/** Schreibt JSON; gibt false zurück, wenn das Speichern fehlschlägt (z. B. Speicher voll). */
export function writeJson(storage: KeyValueStorage, key: string, value: unknown): boolean {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Schreibt einen Text unverändert (z. B. zur Sicherung beschädigter Rohdaten). */
export function writeRaw(storage: KeyValueStorage, key: string, value: string): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeKey(storage: KeyValueStorage, key: string): boolean {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
