/**
 * Anhänge (Fotos, Scans, PDFs) einer Aufgabe.
 *
 * Die Dateien selbst liegen in IndexedDB – localStorage wäre dafür viel zu klein.
 * Im Aufgaben-Datensatz stehen nur die Metadaten (Name, Typ, Grösse, Id).
 * Fotos werden vor dem Speichern verkleinert, damit der Speicher nicht vollläuft
 * und die KI-Anfrage nicht unnötig gross wird.
 */

import { createId } from '../lib/id.js';
import { assetUrl, getCloudAssets } from './cloud.js';

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

/** Entfernt einen Anhang überall – lokal und im Server-Speicher. */
export async function removeAttachment(attachment) {
  await deleteAttachmentBlob(attachment?.id ?? attachment);

  if (attachment?.assetId) {
    const assets = await getCloudAssets();
    try {
      await assets?.delete(attachment.assetId);
    } catch (error) {
      console.warn('Foto konnte im Server-Speicher nicht gelöscht werden:', error);
    }
  }
}

/**
 * Anzeigbare URL eines Anhangs.
 * @returns {Promise<{url: string, revoke: boolean}|null>} `revoke` sagt, ob der
 * Aufrufer die URL nach Gebrauch mit revokeObjectURL freigeben muss.
 */
export async function getAttachmentUrl(attachment) {
  // Aus dem Server-Speicher lässt sich direkt anzeigen.
  if (attachment?.assetId) return { url: assetUrl(attachment.assetId), revoke: false };

  const blob = await getAttachmentBlob(attachment?.id ?? attachment);
  return blob ? { url: URL.createObjectURL(blob), revoke: true } : null;
}

/** Bild oder Dokument als Base64 – für die KI-Anfrage. */
export async function getAttachmentBase64(attachment) {
  const blob = await resolveBlob(attachment);
  if (!blob) return null;

  const dataUrl = await blobToDataUrl(blob);
  const [, data] = dataUrl.split(',');
  return { mediaType: blob.type || 'application/octet-stream', data };
}

/**
 * Die Bytes eines Anhangs als Datei – bevorzugt lokal, sonst vom Server.
 * Wird gebraucht, um Fotos direkt an Claude zu schicken.
 */
export async function getAttachmentFile(attachment) {
  const blob = await resolveBlob(attachment);
  if (!blob) return null;

  const name = attachment?.name ?? 'foto.jpg';
  const type = blob.type || attachment?.type || 'image/jpeg';
  return typeof File === 'function' ? new File([blob], name, { type }) : blob;
}

/** Holt die Bytes – bevorzugt lokal, sonst aus dem Server-Speicher. */
async function resolveBlob(attachment) {
  const local = await getAttachmentBlob(attachment?.id ?? attachment);
  if (local) return local;

  if (attachment?.assetId) {
    try {
      const response = await fetch(assetUrl(attachment.assetId));
      if (response.ok) return await response.blob();
    } catch (error) {
      console.warn('Anhang konnte nicht vom Server geladen werden:', error);
    }
  }
  return null;
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
  if (file.size > MAX_FILE_BYTES) {
    throw new AttachmentError(`„${file.name}" ist zu gross (maximal 15 MB).`);
  }

  const prepared = isImageType(file.type) ? await shrinkImage(file) : file;
  const meta = {
    id: createId('att'),
    name: String(file.name ?? 'Datei').slice(0, 120),
    type: prepared.type || file.type || 'application/octet-stream',
    size: prepared.size,
    isImage: isImageType(prepared.type || file.type),
    assetId: null,
  };

  // Erste Wahl: der Server-Speicher der Plattform – dort bleibt das Foto
  // dauerhaft und ist auch auf anderen Geräten sichtbar.
  const assets = await getCloudAssets();
  if (assets) {
    try {
      const uploaded = await assets.upload(prepared, { type: meta.type });
      meta.assetId = uploaded.id;
      meta.size = uploaded.sizeBytes ?? meta.size;
      // Zusätzlich lokal ablegen, damit das Bild auch offline sofort da ist.
      putAttachmentBlob(meta.id, prepared).catch(() => {});
      return meta;
    } catch (error) {
      console.warn('Upload in den Server-Speicher fehlgeschlagen:', error);
      const message = uploadErrorMessage(error);
      if (message) throw new AttachmentError(message);
    }
  }

  // Zweite Wahl: IndexedDB im Browser.
  if (!isAttachmentStorageAvailable()) {
    throw new AttachmentError('Dieser Browser kann keine Anhänge speichern.');
  }

  try {
    await putAttachmentBlob(meta.id, prepared);
  } catch (error) {
    console.error('Anhang konnte nicht gespeichert werden:', error);
    throw new AttachmentError('Der Anhang konnte nicht gespeichert werden (Speicher voll?).');
  }

  return meta;
}

function uploadErrorMessage(error) {
  switch (error?.code) {
    case 'too_large':
      return 'Das Foto ist zu gross für den Server-Speicher (maximal 20 MB).';
    case 'unsupported_type':
      return 'Dieses Dateiformat wird nicht unterstützt. Nutze ein Foto (JPG, PNG) oder ein PDF.';
    case 'quota_or_state':
      return 'Der Speicher dieser App ist voll. Lösche nicht mehr benötigte Fotos.';
    case 'rate_limited':
      return 'Zu viele Uploads kurz hintereinander. Bitte einen Moment warten.';
    // Bei allen anderen Fehlern wird still auf den lokalen Speicher ausgewichen.
    default:
      return null;
  }
}

/** Typen, die die KI direkt verarbeiten kann. Alles andere wird zu JPEG. */
const AI_READY_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Verkleinert ein Foto auf eine sinnvolle Kantenlänge und wandelt Formate um,
 * die die KI nicht lesen kann (iPhone-Fotos sind oft HEIC).
 */
async function shrinkImage(file) {
  const needsConversion = !AI_READY_TYPES.includes(String(file.type).toLowerCase());

  try {
    const source = await loadImageSource(file);
    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(source.width, source.height));

    // Kleine Bilder im richtigen Format bleiben unverändert – erneutes Kodieren
    // würde nur Qualität kosten.
    if (scale === 1 && !needsConversion && file.size <= 1.5 * 1024 * 1024) {
      source.close?.();
      return file;
    }

    const width = Math.max(1, Math.round(source.width * scale));
    const height = Math.max(1, Math.round(source.height * scale));
    const blob = await drawToJpeg(source, width, height);
    source.close?.();

    if (!blob) return file;
    return needsConversion || blob.size < file.size ? blob : file;
  } catch (error) {
    console.warn('Bild konnte nicht umgewandelt werden, nutze das Original:', error);
    return file;
  }
}

/** ImageBitmap wenn möglich, sonst ein klassisches <img>. */
async function loadImageSource(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch {
      // Safari kann manche Formate nur über <img> dekodieren.
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    return image;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

function drawToJpeg(source, width, height) {
  // OffscreenCanvas gibt es erst ab Safari 16.4 – sonst ein normales Canvas.
  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(width, height);
    canvas.getContext('2d').drawImage(source, 0, 0, width, height);
    return canvas.convertToBlob({ type: 'image/jpeg', quality: 0.82 });
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(source, 0, 0, width, height);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
}

/** Entfernt Dateien, die zu keiner Aufgabe mehr gehören (z.B. nach dem Löschen). */
export async function cleanupOrphanAttachments(usedIds) {
  if (!isAttachmentStorageAvailable()) return;

  try {
    const keys = await transaction('readonly', (store) => store.getAllKeys());
    const orphans = (keys ?? []).filter((key) => !usedIds.has(key));
    for (const key of orphans) await deleteAttachmentBlob(key);
    if (orphans.length) console.info(`${orphans.length} verwaiste Anhänge entfernt.`);
  } catch (error) {
    console.warn('Aufräumen der Anhänge fehlgeschlagen:', error);
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
    assetId: typeof raw.assetId === 'string' ? raw.assetId : null,
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
