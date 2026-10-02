import { parseSnapshot, type BackupBackend, type BackupSnapshot } from './snapshot';

const STORE_NAME = 'backup';
const RECORD_KEY = 'snapshot';

/**
 * Gerätesicherung in IndexedDB. Anders als LocalStorage, das Chromium erst nach einigen Sekunden
 * auf die Festplatte schreibt, ist eine Transaktion mit `durability: 'strict'` bei ihrem Abschluss
 * festgeschrieben – die letzte Übung übersteht so auch einen Absturz oder das Wegwischen der App.
 */
export function createIndexedDbBackend(databaseName: string): BackupBackend {
  let opening: Promise<IDBDatabase> | null = null;

  const open = (): Promise<IDBDatabase> => {
    opening ??= new Promise<IDBDatabase>((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        reject(new Error('IndexedDB nicht verfügbar'));
        return;
      }
      // Wirft in abgeschotteten Rahmen synchron – das Promise wird dann abgelehnt.
      const request = indexedDB.open(databaseName, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
      request.onsuccess = () => {
        const database = request.result;
        database.onversionchange = () => database.close();
        resolve(database);
      };
      request.onerror = () => reject(request.error ?? new Error('IndexedDB nicht verfügbar'));
      request.onblocked = () => reject(new Error('IndexedDB blockiert'));
    });
    return opening;
  };

  return {
    async read() {
      const database = await open();
      return new Promise<BackupSnapshot | null>((resolve, reject) => {
        const request = database
          .transaction(STORE_NAME, 'readonly')
          .objectStore(STORE_NAME)
          .get(RECORD_KEY);
        request.onsuccess = () => resolve(parseSnapshot(request.result));
        request.onerror = () => reject(request.error ?? new Error('Lesen fehlgeschlagen'));
      });
    },

    async write(snapshot) {
      const database = await open();
      await new Promise<void>((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, 'readwrite', { durability: 'strict' });
        transaction.objectStore(STORE_NAME).put(snapshot, RECORD_KEY);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
          reject(transaction.error ?? new Error('Schreiben fehlgeschlagen'));
        transaction.onabort = () => reject(transaction.error ?? new Error('Schreiben abgebrochen'));
      });
    },
  };
}
