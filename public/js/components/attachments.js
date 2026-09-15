/** Anhänge auswählen, anzeigen und entfernen – Fotos der Aufgabe, Scans, PDFs. */

import { el, icon, render } from '../lib/dom.js';
import {
  AttachmentError,
  MAX_ATTACHMENTS,
  formatFileSize,
  getAttachmentUrl,
  deleteAttachmentBlob,
  isAttachmentStorageAvailable,
  storeFile,
} from '../data/attachments.js';
import { showToast } from './toast.js';
import { openDialog } from './dialog.js';

/**
 * Eingabefeld für Anhänge.
 * @param {{initial?: Array, onChange?: Function}} options
 * @returns {{element: Node, getAttachments: Function}}
 */
export function attachmentField({ initial = [], onChange = () => {} } = {}) {
  let attachments = [...initial];

  const list = el('div', { class: 'attachment-list' });
  const input = el('input', {
    type: 'file',
    id: 'field-attachments',
    accept: 'image/*,application/pdf',
    multiple: true,
    class: 'visually-hidden',
  });

  const pickButton = el(
    'button',
    {
      class: 'btn btn-secondary btn-sm',
      type: 'button',
      on: { click: () => input.click() },
    },
    ['📎 Foto oder Datei anhängen'],
  );

  const refresh = () => {
    render(
      list,
      attachments.length
        ? attachments.map((attachment) =>
            attachmentThumb(attachment, {
              onRemove: () => {
                attachments = attachments.filter((entry) => entry.id !== attachment.id);
                deleteAttachmentBlob(attachment.id);
                refresh();
                onChange(attachments);
              },
            }),
          )
        : el('p', { class: 'field-hint', text: 'Noch nichts angehängt.' }),
    );
    pickButton.disabled = attachments.length >= MAX_ATTACHMENTS;
  };

  input.addEventListener('change', async () => {
    const files = [...input.files];
    input.value = '';

    for (const file of files) {
      if (attachments.length >= MAX_ATTACHMENTS) {
        showToast(`Maximal ${MAX_ATTACHMENTS} Anhänge pro Aufgabe.`, { tone: 'error' });
        break;
      }
      try {
        attachments.push(await storeFile(file));
      } catch (error) {
        const message =
          error instanceof AttachmentError ? error.message : 'Die Datei konnte nicht gelesen werden.';
        showToast(message, { tone: 'error' });
        console.error('Anhang fehlgeschlagen:', error);
      }
    }

    refresh();
    onChange(attachments);
  });

  refresh();

  const element = el('div', { class: 'field span-2' }, [
    el('span', { class: 'field-label', text: 'Anhänge' }),
    isAttachmentStorageAvailable()
      ? el('div', { class: 'stack' }, [
          list,
          el('div', { class: 'row' }, [pickButton, input]),
          el('p', {
            class: 'field-hint',
            text: 'Fotos der Buchseite oder des Arbeitsblatts. Die KI kann sie lesen und die Aufgabe daraus lösen.',
          }),
        ])
      : el('p', { class: 'field-hint', text: 'Dieser Browser unterstützt keine Anhänge.' }),
  ]);

  return { element, getAttachments: () => attachments };
}

/** Vorschaukachel mit Bild, Name und Entfernen-Knopf. */
export function attachmentThumb(attachment, { onRemove = null } = {}) {
  const preview = el('div', { class: 'attachment-preview' });

  if (attachment.isImage) {
    getAttachmentUrl(attachment.id).then((url) => {
      if (!url) {
        render(preview, el('span', { text: '🖼️' }));
        return;
      }
      const image = el('img', { src: url, alt: attachment.name, loading: 'lazy' });
      image.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
      render(preview, image);
    });
  } else {
    render(preview, el('span', { text: '📄' }));
  }

  return el('figure', { class: 'attachment' }, [
    el(
      'button',
      {
        class: 'attachment-open',
        type: 'button',
        title: `${attachment.name} öffnen`,
        on: { click: () => openAttachmentViewer(attachment) },
      },
      [preview],
    ),
    el('figcaption', { class: 'attachment-caption' }, [
      el('span', { class: 'attachment-name', text: attachment.name, title: attachment.name }),
      el('span', { class: 'attachment-size', text: formatFileSize(attachment.size) }),
    ]),
    onRemove
      ? el(
          'button',
          {
            class: 'attachment-remove',
            type: 'button',
            'aria-label': `${attachment.name} entfernen`,
            title: 'Entfernen',
            on: { click: onRemove },
          },
          [icon('close', 14)],
        )
      : null,
  ]);
}

/** Zeigt einen Anhang gross an. */
export async function openAttachmentViewer(attachment) {
  const url = await getAttachmentUrl(attachment.id);

  if (!url) {
    showToast('Dieser Anhang ist nicht mehr vorhanden.', { tone: 'error' });
    return;
  }

  const body = attachment.isImage
    ? el('img', { src: url, alt: attachment.name, class: 'attachment-full' })
    : el('div', { class: 'stack' }, [
        el('p', { text: attachment.name }),
        el('p', { class: 'muted', text: 'Dieser Dateityp kann hier nicht angezeigt werden.' }),
      ]);

  openDialog({
    title: attachment.name,
    body,
    onClose: () => URL.revokeObjectURL(url),
  });
}
