/**
 * Anhänge (Fotos, Scans, PDFs) einer Aufgabe.
 *
 * Die Dateien selbst liegen in IndexedDB – localStorage wäre dafür viel zu klein.
 * Im Aufgaben-Datensatz stehen nur die Metadaten (Name, Typ, Grösse, Id).
 * Fotos werden vor dem Speichern verkleinert, damit der Speicher nicht vollläuft
 * und die KI-Anfrage nicht unnötig gross wird.
 */

import { createId } from '../lib/id.js';

const DB_NAME = 'shm-attachments';
const STORE = 'files';
const DB_VERSION = 1;

export const MAX_FILE_BYTES = 15 * 1024 * 1024; // vor dem Verkleinern
export const MAX_IMAGE_EDGE = 1600;
export const MAX_ATTACHMENTS = 6;

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];

let dbPromise = null;

export function isAttachmentStorageAvailable() {
  return typeof indexedDB !== 'undefined';
}

function openDatabase() {
  if (!isAttachmentStorageAvailable()) return Promise.reject(new Error('IndexedDB nicht verfügbar'));

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('IndexedDB konnte nicht geöffnet werden'));
    }).catch((error) => {
      dbPromise = null;
      throw error;
    });
  }

  return dbPromise;
}

function transaction(mode, run) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const store = tx.objectStore(STORE);
        let result;
        try {
          result = run(store);
        } catch (error) {
          reject(error);
          return;
        }
        tx.oncomplete = () => resolve(result?.result ?? result);
        tx.onerror = () => reject(tx.error ?? new Error('Speicherzugriff fehlgeschlagen'));
        tx.onabort = () => reject(tx.error ?? new Error('Speicherzugriff abgebrochen'));
      }),
  );
}

export function putAttachmentBlob(id, blob) {
  return transaction('readwrite', (store) => store.put(blob, id));
}

export async function getAttachmentBlob(id) {
  try {
    const request = await transaction('readonly', (store) => store.get(id));
    return request ?? null;
  } catch (error) {
    console.warn('Anhang konnte nicht geladen werden:', error);
    return null;
  }
}

export async function deleteAttachmentBlob(id) {
  try {
    await transaction('readwrite', (store) => store.delete(id));
  } catch (error) {
    console.warn('Anhang konnte nicht gelöscht werden:', error);
  }
}

/** Liefert eine anzeigbare URL. Der Aufrufer gibt sie mit revokeObjectURL wieder frei. */
export async function getAttachmentUrl(id) {
  const blob = await getAttachmentBlob(id);
  return blob ? URL.createObjectURL(blob) : null;
}

/** Bild oder Dokument als Base64 – für die KI-Anfrage. */
export async function getAttachmentBase64(id) {
  const blob = await getAttachmentBlob(id);
  if (!blob) return null;

  const dataUrl = await blobToDataUrl(blob);
  const [, data] = dataUrl.split(',');
  return { mediaType: blob.type || 'application/octet-stream', data };
}

export function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('Datei konnte nicht gelesen werden'));
    reader.readAsDataURL(blob);
  });
}

export function isImageType(type) {
  return SUPPORTED_IMAGE_TYPES.includes(String(type).toLowerCase());
}

/**
 * Nimmt eine Datei aus dem Datei-Dialog entgegen, verkleinert Bilder und legt sie ab.
 * @returns {Promise<{id, name, type, size, isImage}>}
 */
export async function storeFile(file) {
  if (!isAttachmentStorageAvailable()) {
    throw new AttachmentError('Dieser Browser kann keine Anhänge speichern.');
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new AttachmentError(`„${file.name}" ist zu gross (maximal 15 MB).`);
  }

  const id = createId('att');
  const prepared = isImageType(file.type) ? await shrinkImage(file) : file;

  try {
    await putAttachmentBlob(id, prepared);
  } catch (error) {
    console.error('Anhang konnte nicht gespeichert werden:', error);
    throw new AttachmentError('Der Anhang konnte nicht gespeichert werden (Speicher voll?).');
  }

  return {
    id,
    name: String(file.name ?? 'Datei').slice(0, 120),
    type: prepared.type || file.type || 'application/octet-stream',
    size: prepared.size,
    isImage: isImageType(prepared.type || file.type),
  };
}

/** Verkleinert ein Foto auf eine für die KI sinnvolle Kantenlänge. */
async function shrinkImage(file) {
  if (typeof createImageBitmap !== 'function' || typeof OffscreenCanvas === 'undefined') return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));

    // Kleine Bilder bleiben unverändert – erneutes Kodieren würde nur Qualität kosten.
    if (scale === 1 && file.size <= 1.5 * 1024 * 1024) {
      bitmap.close?.();
      return file;
    }

    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.82 });
    return blob.size < file.size ? blob : file;
  } catch (error) {
    console.warn('Bild konnte nicht verkleinert werden, nutze das Original:', error);
    return file;
  }
}

export function normalizeAttachment(raw) {
  if (!raw || typeof raw !== 'object' || typeof raw.id !== 'string') return null;
  return {
    id: raw.id,
    name: typeof raw.name === 'string' ? raw.name.slice(0, 120) : 'Datei',
    type: typeof raw.type === 'string' ? raw.type : 'application/octet-stream',
    size: Number.isFinite(Number(raw.size)) ? Number(raw.size) : 0,
    isImage: Boolean(raw.isImage),
  };
}

export function formatFileSize(bytes) {
  const value = Number(bytes);
  if (!Number.isFinite(value) || value <= 0) return '';
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}

export class AttachmentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AttachmentError';
  }
}
