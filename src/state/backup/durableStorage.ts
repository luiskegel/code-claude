import type { KeyValueStorage } from '../../domain/storage/storage';
import type { BackupBackend, BackupSnapshot } from './snapshot';

export interface BackupTarget {
  backend: BackupBackend;
  /** Wartezeit nach einer Änderung, bevor geschrieben wird (bündelt schnelle Folgen). 0 = sofort. */
  delayMs: number;
  /**
   * Sicherung auf diesem Gerät: Sie kann nur von dieser App hier stammen und ist daher auch neuer
   * als LocalStorage-Daten ohne Zeitstempel (deren Zeitstempel bei einem Absturz verloren ging).
   */
  sameDevice?: boolean;
}

export interface DurableStorageOptions {
  /** Der schnelle, synchrone Speicher der App (LocalStorage oder Arbeitsspeicher) */
  primary: KeyValueStorage;
  settingsKey: string;
  progressKey: string;
  /** Schlüssel für den Zeitpunkt der letzten Änderung im primären Speicher */
  savedAtKey: string;
  targets: readonly BackupTarget[];
  now?: () => number;
}

export interface DurableStorage {
  /** Für den App-Store: liest und schreibt den primären Speicher und hält die Sicherungen aktuell. */
  storage: KeyValueStorage;
  /**
   * Vergleicht beim Start alle Sicherungen mit dem primären Speicher. Ist eine Sicherung neuer
   * (z. B. weil der Browser die letzte Änderung bei einem Absturz verloren hat), wird sie
   * übernommen und `true` zurückgegeben. Veraltete Sicherungen werden aktualisiert.
   */
  restore(): Promise<boolean>;
  /** Schreibt ausstehende Änderungen sofort, z. B. wenn die Seite in den Hintergrund geht. */
  flush(): Promise<void>;
}

interface Writer {
  schedule(): void;
  flush(): Promise<void>;
}

/** Je Sicherung höchstens ein Schreibvorgang gleichzeitig; Änderungen währenddessen werden nachgeholt. */
function createWriter(target: BackupTarget, snapshot: () => BackupSnapshot): Writer {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let inFlight: Promise<void> | null = null;
  let dirty = false;

  const writeLoop = async () => {
    while (dirty) {
      dirty = false;
      try {
        await target.backend.write(snapshot());
      } catch {
        // Sicherung gerade nicht verfügbar – der primäre Speicher bleibt maßgeblich.
      }
    }
  };

  const start = (): Promise<void> => {
    inFlight ??= writeLoop().finally(() => {
      inFlight = null;
    });
    return inFlight;
  };

  return {
    schedule() {
      dirty = true;
      clearTimeout(timer);
      if (target.delayMs <= 0) void start();
      else timer = setTimeout(() => void start(), target.delayMs);
    },
    flush() {
      clearTimeout(timer);
      return dirty || inFlight ? start() : Promise.resolve();
    },
  };
}

export function createDurableStorage({
  primary,
  settingsKey,
  progressKey,
  savedAtKey,
  targets,
  now = Date.now,
}: DurableStorageOptions): DurableStorage {
  const synced = new Set([settingsKey, progressKey]);

  const safeGet = (key: string): string | null => {
    try {
      return primary.getItem(key);
    } catch {
      return null;
    }
  };

  const readSavedAt = (): number | null => {
    const raw = safeGet(savedAtKey);
    const value = raw === null ? Number.NaN : Number(raw);
    return Number.isFinite(value) ? value : null;
  };

  let lastSavedAt = readSavedAt() ?? 0;

  const markSaved = (savedAt: number) => {
    lastSavedAt = savedAt;
    try {
      primary.setItem(savedAtKey, String(savedAt));
    } catch {
      // Ohne Zeitstempel arbeiten die Sicherungen trotzdem (siehe lastSavedAt).
    }
  };

  const snapshot = (): BackupSnapshot => ({
    v: 1,
    savedAt: Math.max(readSavedAt() ?? 0, lastSavedAt),
    settings: safeGet(settingsKey),
    progress: safeGet(progressKey),
  });

  const writers = targets.map((target) => createWriter(target, snapshot));

  /** Neue Änderung: streng steigender Zeitstempel, dann alle Sicherungen anstoßen. */
  const touch = () => {
    markSaved(Math.max(now(), (readSavedAt() ?? 0) + 1, lastSavedAt + 1));
    for (const writer of writers) writer.schedule();
  };

  const storage: KeyValueStorage = {
    getItem: (key) => primary.getItem(key),
    setItem(key, value) {
      primary.setItem(key, value);
      if (synced.has(key)) touch();
    },
    removeItem(key) {
      primary.removeItem(key);
      if (synced.has(key)) touch();
    },
  };

  /** Übernimmt eine Sicherung in den primären Speicher, ohne neue Sicherungen auszulösen. */
  const apply = (backup: BackupSnapshot): boolean => {
    try {
      for (const [key, value] of [
        [settingsKey, backup.settings],
        [progressKey, backup.progress],
      ] as const) {
        if (value === null) primary.removeItem(key);
        else primary.setItem(key, value);
      }
      markSaved(backup.savedAt);
      return true;
    } catch {
      return false;
    }
  };

  return {
    storage,

    async restore() {
      const backups = await Promise.all(
        targets.map((target) => target.backend.read().catch(() => null)),
      );
      // Erst nach dem Lesen vergleichen: Eine Änderung in der Zwischenzeit ist neuer als jede Sicherung.
      const localSavedAt = readSavedAt();
      const localHasData = safeGet(settingsKey) !== null || safeGet(progressKey) !== null;
      const unstamped = localSavedAt === null && localHasData;

      let newest: BackupSnapshot | null = null;
      for (const [index, backup] of backups.entries()) {
        // Gegenüber Daten ohne Zeitstempel zählen nur Sicherungen dieses Geräts.
        if (!backup || (unstamped && !targets[index]?.sameDevice)) continue;
        if (!newest || backup.savedAt > newest.savedAt) newest = backup;
      }

      if (unstamped && newest === null) {
        // Daten aus der Zeit vor den Sicherungen: Sie sind der aktuelle Stand dieses Geräts.
        touch();
        return false;
      }

      const isNewer =
        newest !== null &&
        (unstamped || newest.savedAt > (localSavedAt ?? Number.NEGATIVE_INFINITY));
      const restored = isNewer && newest !== null ? apply(newest) : false;

      // Hat dieses Gerät einen datierten Stand (auch einen gelöschten), holen veraltete Sicherungen ihn nach.
      const current = readSavedAt();
      if ((restored || localSavedAt !== null) && current !== null) {
        backups.forEach((backup, index) => {
          if (!backup || backup.savedAt < current) writers[index]?.schedule();
        });
      }
      return restored;
    },

    async flush() {
      await Promise.all(writers.map((writer) => writer.flush()));
    },
  };
}
