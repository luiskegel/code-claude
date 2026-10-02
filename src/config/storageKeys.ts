/**
 * LocalStorage-Schlüssel. Bewusst unabhängig vom Produktnamen,
 * damit eine Umbenennung keine gespeicherten Daten verwirft.
 */
export const STORAGE_KEYS = {
  settings: 'typeflow:settings',
  progress: 'typeflow:progress',
} as const;
