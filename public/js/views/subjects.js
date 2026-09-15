/** Fächerverwaltung: anlegen, umbenennen, Farbe ändern, löschen. */

import { el, icon } from '../lib/dom.js';
import {
  addSubject,
  deleteSubject,
  getState,
  renameSubject,
  updateSubjectColor,
} from '../state/store.js';
import { SUBJECT_COLORS } from '../data/model.js';
import { showToast } from '../components/toast.js';
import { confirmDialog, promptDialog } from '../components/dialog.js';
import { emptyState } from '../components/emptyState.js';

export function subjectsView() {
  const state = getState();

  const nameInput = el('input', {
    class: 'input',
    type: 'text',
    id: 'new-subject',
    placeholder: 'z.B. Chemie',
    maxLength: 40,
    autocomplete: 'off',
  });

  const submit = () => {
    const result = addSubject(nameInput.value);
    if (!result.ok) {
      showToast(result.error, { tone: 'error' });
      nameInput.focus();
      return;
    }
    nameInput.value = '';
    showToast(`Fach „${result.subject.name}" angelegt.`, { tone: 'success' });
  };

  nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

  return el('div', { class: 'view' }, [
    el('section', { class: 'section' }, [
      el('div', { class: 'section-head' }, [el('h2', { text: 'Fächer' })]),
      el('div', { class: 'card stack' }, [
        el('div', { class: 'quick-add-row' }, [
          nameInput,
          el('button', { class: 'btn btn-primary', type: 'button', on: { click: submit } }, [
            icon('plus', 16),
            'Fach hinzufügen',
          ]),
        ]),
        el('p', {
          class: 'field-hint',
          text: 'Fächer werden auch automatisch angelegt, sobald du sie in einer Aufgabe verwendest.',
        }),
      ]),
      state.subjects.length
        ? el(
            'ul',
            { class: 'subject-list' },
            state.subjects.map((subject) => subjectRow(subject, state)),
          )
        : emptyState({ icon: '📘', title: 'Noch keine Fächer', text: 'Lege dein erstes Fach an.' }),
    ]),
  ]);
}

function subjectRow(subject, state) {
  const taskCount = state.tasks.filter((task) => task.subject === subject.name).length;

  const colorPicker = el('input', {
    type: 'color',
    value: subject.color,
    'aria-label': `Farbe für ${subject.name}`,
    title: 'Farbe ändern',
    style: { width: '36px', height: '36px', border: 'none', background: 'none', padding: '0', cursor: 'pointer' },
    list: 'subject-colors',
  });
  colorPicker.addEventListener('change', () => updateSubjectColor(subject.id, colorPicker.value));

  return el('li', { class: 'subject-row' }, [
    el('span', { class: 'subject-swatch', style: { background: subject.color } }),
    el('span', { class: 'subject-name', text: subject.name }),
    el('span', { class: 'subject-count', text: `${taskCount} Aufgabe(n)` }),
    colorPicker,
    el(
      'button',
      {
        class: 'btn btn-ghost btn-sm btn-icon',
        type: 'button',
        'aria-label': `${subject.name} umbenennen`,
        title: 'Umbenennen',
        on: { click: () => handleRename(subject) },
      },
      [icon('edit', 16)],
    ),
    el(
      'button',
      {
        class: 'btn btn-ghost btn-sm btn-icon',
        type: 'button',
        'aria-label': `${subject.name} löschen`,
        title: 'Löschen',
        on: { click: () => handleDelete(subject, taskCount) },
      },
      [icon('trash', 16)],
    ),
    el(
      'datalist',
      { id: 'subject-colors' },
      SUBJECT_COLORS.map((color) => el('option', { value: color })),
    ),
  ]);
}

async function handleRename(subject) {
  const nextName = await promptDialog({
    title: 'Fach umbenennen',
    label: 'Neuer Name',
    value: subject.name,
    maxLength: 40,
  });
  if (nextName === null) return;

  const result = renameSubject(subject.id, nextName);
  if (!result.ok) {
    showToast(result.error, { tone: 'error' });
    return;
  }
  showToast('Fach umbenannt – die Aufgaben wurden mit angepasst.', { tone: 'success' });
}

async function handleDelete(subject, taskCount) {
  const confirmed = await confirmDialog({
    title: 'Fach löschen?',
    message: taskCount
      ? `„${subject.name}" wird aus der Fächerliste entfernt. Die ${taskCount} zugehörige(n) Aufgabe(n) bleiben erhalten.`
      : `„${subject.name}" wird aus der Fächerliste entfernt.`,
    confirmLabel: 'Löschen',
  });
  if (!confirmed) return;

  deleteSubject(subject.id);
  showToast('Fach gelöscht.', { tone: 'info' });
}
