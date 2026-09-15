/** Schnelleingabe: Freitext -> erkannte Felder -> Bestätigung im Formular. */

import { el, icon, render } from '../lib/dom.js';
import { parseQuickInput } from '../lib/quickAdd.js';
import { getState } from '../state/store.js';
import { openQuickAddConfirm } from './taskForm.js';
import { showToast } from './toast.js';
import { formatMediumDate } from '../lib/date.js';
import { priorityLabel } from '../data/model.js';

const EXAMPLE = 'Mathe: Bis Freitag Aufgaben 3–8 auf Seite 124';

export function quickAdd() {
  const input = el('input', {
    class: 'input',
    type: 'text',
    name: 'quick',
    placeholder: `${EXAMPLE} …`,
    'aria-label': 'Aufgabe schnell hinzufügen',
    autocomplete: 'off',
    maxLength: 300,
  });

  const preview = el('div', { class: 'quick-add-preview' });

  const updatePreview = () => {
    const text = input.value.trim();
    if (!text) {
      render(preview, el('span', { text: 'Tipp: Fach, Termin, Uhrzeit und Dauer werden automatisch erkannt.' }));
      return;
    }

    const parsed = parseQuickInput(text, getState().subjects);
    const chips = [];
    if (parsed.subject) chips.push(chip('Fach', parsed.subject));
    chips.push(chip('Aufgabe', parsed.title || '—'));
    if (parsed.dueDate) chips.push(chip('Termin', formatMediumDate(parsed.dueDate)));
    if (parsed.dueTime) chips.push(chip('Uhrzeit', `${parsed.dueTime} Uhr`));
    if (parsed.estimatedMinutes) chips.push(chip('Dauer', `${parsed.estimatedMinutes} min`));
    if (parsed.priority !== 'normal') chips.push(chip('Priorität', priorityLabel(parsed.priority)));

    render(preview, chips);
  };

  const submit = () => {
    const text = input.value.trim();
    if (!text) {
      showToast('Bitte gib zuerst eine Aufgabe ein.', { tone: 'error' });
      input.focus();
      return;
    }

    const parsed = parseQuickInput(text, getState().subjects);
    if (!parsed.title) {
      showToast('Daraus konnte kein Titel erkannt werden. Bitte etwas ausführlicher formulieren.', { tone: 'error' });
      return;
    }

    openQuickAddConfirm(parsed);
    input.value = '';
    updatePreview();
  };

  input.addEventListener('input', updatePreview);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

  updatePreview();

  return el('section', { class: 'quick-add', 'aria-label': 'Aufgabe schnell hinzufügen' }, [
    el('div', { class: 'row' }, [
      el('strong', { text: 'Aufgabe schnell hinzufügen' }),
      el('span', { class: 'field-hint', text: 'Einfach so tippen, wie es im Unterricht gesagt wurde.' }),
    ]),
    el('div', { class: 'quick-add-row' }, [
      input,
      el('button', { class: 'btn btn-primary', type: 'button', on: { click: submit } }, [
        icon('sparkles', 18),
        'Erkennen',
      ]),
    ]),
    preview,
  ]);
}

function chip(label, value) {
  return el('span', { class: 'badge' }, [el('strong', { text: `${label}: ` }), value]);
}
