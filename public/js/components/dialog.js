/** Modale Dialoge auf Basis des nativen <dialog>-Elements. */

import { el, icon, render } from '../lib/dom.js';

/**
 * Öffnet einen Dialog.
 * @param {{title: string, body: Node|Node[], footer?: Node|Node[], onClose?: Function, size?: string}} options
 * @returns {{close: Function, element: HTMLDialogElement}}
 */
export function openDialog({ title, body, footer, onClose }) {
  const root = document.getElementById('dialog-root') ?? document.body;

  const dialog = el('dialog', { class: 'dialog', 'aria-label': title });

  const close = (reason) => {
    if (!dialog.open) return;
    dialog.close(reason ?? 'dismiss');
  };

  const head = el('div', { class: 'dialog-head' }, [
    el('h2', { text: title }),
    el(
      'button',
      {
        class: 'btn btn-ghost btn-icon',
        type: 'button',
        'aria-label': 'Dialog schliessen',
        on: { click: () => close('cancel') },
      },
      [icon('close', 20)],
    ),
  ]);

  const bodyWrap = el('div', { class: 'dialog-body' });
  render(bodyWrap, body);

  const children = [head, bodyWrap];
  if (footer) {
    const footWrap = el('div', { class: 'dialog-foot' });
    render(footWrap, footer);
    children.push(footWrap);
  }

  render(dialog, children);

  dialog.addEventListener('close', () => {
    onClose?.(dialog.returnValue);
    dialog.remove();
  });

  // Klick auf den Hintergrund schliesst den Dialog.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close('cancel');
  });

  root.append(dialog);
  dialog.showModal();

  const firstField = dialog.querySelector('input, textarea, select, button:not([aria-label])');
  firstField?.focus();

  return { close, element: dialog };
}

/**
 * Dialog mit einem einzelnen Eingabefeld (z.B. Umbenennen).
 * @returns {Promise<string|null>} null bei Abbruch
 */
export function promptDialog({ title, label, value = '', confirmLabel = 'Speichern', maxLength = 120 }) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    const input = el('input', {
      class: 'input',
      type: 'text',
      id: 'prompt-field',
      value,
      maxLength,
      autocomplete: 'off',
    });

    const form = el('form', { id: 'prompt-form' }, [
      el('div', { class: 'field' }, [
        el('label', { class: 'field-label', for: 'prompt-field', text: label }),
        input,
      ]),
    ]);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      finish(input.value);
      close('save');
    });

    const { close } = openDialog({
      title,
      body: form,
      footer: [
        el('button', {
          class: 'btn btn-secondary',
          type: 'button',
          text: 'Abbrechen',
          on: { click: () => { finish(null); close('cancel'); } },
        }),
        el('button', { class: 'btn btn-primary', type: 'submit', form: 'prompt-form', text: confirmLabel }),
      ],
      onClose: () => finish(null),
    });

    input.focus();
    input.select();
  });
}

/**
 * Bestätigungsdialog, z.B. vor dem Löschen.
 * @returns {Promise<boolean>}
 */
export function confirmDialog({ title, message, confirmLabel = 'Bestätigen', tone = 'danger' }) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const { close } = openDialog({
      title,
      body: el('p', { class: 'muted', text: message }),
      footer: [
        el('button', {
          class: 'btn btn-secondary',
          type: 'button',
          text: 'Abbrechen',
          on: { click: () => { finish(false); close('cancel'); } },
        }),
        el('button', {
          class: `btn ${tone === 'danger' ? 'btn-danger' : 'btn-primary'}`,
          type: 'button',
          text: confirmLabel,
          on: { click: () => { finish(true); close('confirm'); } },
        }),
      ],
      onClose: () => finish(false),
    });
  });
}
