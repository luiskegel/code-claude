/**
 * Entscheidet, welche Anhänge tatsächlich an die KI gehen – und sagt, was
 * zurückbleibt.
 *
 * Vorher wurden PDFs und überzählige Bilder stillschweigend verworfen: Die
 * Aufgabe hing als Dokument an der Hausaufgabe, die KI bekam sie nie zu sehen
 * und antwortete trotzdem. Alles, was hier aussortiert wird, landet in
 * `skipped` und wird der Person genannt.
 */

/** Bildformate, die alle Anbieter lesen können. */
export const AI_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const PDF_TYPE = 'application/pdf';

/**
 * @param {Array} attachments Anhänge der Aufgabe
 * @param {{maxCount?: number, imageTypes?: string[], allowPdf?: boolean}} limits
 * @returns {{images: Array, documents: Array, skipped: Array<{name: string, reason: string}>}}
 */
export function planAttachments(attachments = [], limits = {}) {
  const { maxCount = 4, imageTypes = AI_IMAGE_TYPES, allowPdf = false } = limits;

  const images = [];
  const documents = [];
  const skipped = [];

  for (const attachment of attachments) {
    const type = String(attachment.type ?? '').toLowerCase();
    const name = attachment.name ?? 'Anhang';

    if (images.length + documents.length >= maxCount) {
      skipped.push({ name, reason: `nur ${maxCount} Anhänge pro Anfrage möglich` });
      continue;
    }

    if (imageTypes.includes(type)) {
      images.push(attachment);
      continue;
    }

    if (type === PDF_TYPE) {
      if (allowPdf) documents.push(attachment);
      else skipped.push({ name, reason: 'PDFs kann diese KI nicht lesen – mach ein Foto der Seite' });
      continue;
    }

    if (type.startsWith('image/')) {
      // z.B. HEIC, das nicht umgewandelt werden konnte.
      skipped.push({ name, reason: 'Bildformat wird nicht unterstützt – speichere es als JPG' });
      continue;
    }

    skipped.push({ name, reason: 'Dateityp wird nicht unterstützt' });
  }

  return { images, documents, skipped };
}

/** Ein Satz darüber, was nicht mitgeschickt wurde – oder null. */
export function describeSkipped(skipped = [], failedToLoad = []) {
  const parts = skipped.map((entry) => `„${entry.name}" (${entry.reason})`);

  for (const name of failedToLoad) {
    parts.push(`„${name}" (Datei konnte nicht geladen werden)`);
  }

  if (!parts.length) return null;

  return parts.length === 1
    ? `Nicht mitgeschickt: ${parts[0]}.`
    : `Nicht mitgeschickt: ${parts.join(', ')}.`;
}
