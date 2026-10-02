/**
 * LocalStorage-Schlüssel. Bewusst unabhängig vom Produktnamen,
 * damit eine Umbenennung keine gespeicherten Daten verwirft.
 */
export const STORAGE_KEYS = {
  settings: 'typeflow:settings',
  progress: 'typeflow:progress',
} as const;

/** Namen der Sicherungen (siehe src/state/backup). */
export const BACKUP_NAMES = {
  /** Zeitpunkt der letzten Änderung im LocalStorage – Vergleichsmaßstab für die Sicherungen */
  savedAtKey: 'typeflow:saved-at',
  /** IndexedDB-Datenbank der Gerätesicherung */
  indexedDb: 'typeflow',
  /** Dokument im privaten Bereich der Person (nur als Claude-Artefakt) */
  cloudDocument: 'typeflow',
} as const;
