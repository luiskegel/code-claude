/** Vollständiger Stand von Einstellungen und Fortschritt, wie er gesichert wird. */
export interface BackupSnapshot {
  v: 1;
  /** Zeitpunkt der Änderung (ms seit 1970) – der neueste Stand gewinnt */
  savedAt: number;
  /** Rohtext wie im LocalStorage; null, wenn nicht vorhanden */
  settings: string | null;
  progress: string | null;
}

/** Eine Sicherung neben dem LocalStorage (Gerät oder Claude-Konto). */
export interface BackupBackend {
  /** Liest die Sicherung; null, wenn keine existiert oder der Speicher nicht verfügbar ist. */
  read(): Promise<BackupSnapshot | null>;
  /** Ersetzt die Sicherung vollständig. Wirft, wenn das nicht möglich ist. */
  write(snapshot: BackupSnapshot): Promise<void>;
}

/** Prüft gelesene Sicherungen – fremde oder beschädigte Werte werden ignoriert. */
export function parseSnapshot(value: unknown): BackupSnapshot | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const { savedAt } = record;
  if (record.v !== 1 || typeof savedAt !== 'number' || !Number.isFinite(savedAt) || savedAt < 0) {
    return null;
  }
  const text = (field: unknown) => (typeof field === 'string' ? field : null);
  return { v: 1, savedAt, settings: text(record.settings), progress: text(record.progress) };
}
