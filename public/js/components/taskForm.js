/** Formular zum Anlegen und Bearbeiten einer Aufgabe (im Dialog). */

import { el, render } from '../lib/dom.js';
import { openDialog } from './dialog.js';
import { showToast } from './toast.js';
import { PRIORITIES, validateTaskInput } from '../data/model.js';
import { addTask, getState, setView, updateTask } from '../state/store.js';
import { todayISO } from '../lib/date.js';
import { describeNextLesson, nextLessonFor } from '../data/schedule.js';
import { attachmentField } from './attachments.js';
import { subjectPicker } from './subjectPicker.js';

/**
 * @param {{task?: object, preset?: object, detected?: string[]}} [options]
 */
export function openTaskDialog({ task = null, preset = null, detected = [] } = {}) {
  const isEdit = Boolean(task);
  const initial = {
    title: '',
    subject: '',
    description: '',
    dueDate: todayISO(),
    dueTime: '',
    priority: 'normal',
    estimatedMinutes: '',
    aiRequested: false,
    ...(task ?? {}),
    ...(preset ?? {}),
  };

  const state = getState();
  const subjects = state.subjects;
  const fields = {};
  const errorNodes = {};

  // Solange der Termin nicht von Hand angefasst wurde, darf er dem Stundenplan folgen.
  let dueTouched = isEdit || Boolean(preset?.dueDate);
  let dueFromLesson = Boolean(task?.dueFromLesson);
  let lessonId = task?.lessonId ?? null;

  const makeField = (name, label, control, { hint = null, span = false } = {}) => {
    const errorNode = el('p', { class: 'field-error', hidden: true });
    errorNodes[name] = errorNode;
    return el('div', { class: `field${span ? ' span-2' : ''}`, data: { field: name } }, [
      el('label', { class: 'field-label', for: `field-${name}`, text: label }),
      control,
      hint instanceof Node ? hint : hint ? el('p', { class: 'field-hint', text: hint }) : null,
      errorNode,
    ]);
  };

  fields.title = el('input', {
    class: 'input',
    id: 'field-title',
    type: 'text',
    name: 'title',
    value: initial.title ?? '',
    maxLength: 120,
    placeholder: 'z.B. Aufgaben 3–8 auf Seite 124',
    required: true,
    autocomplete: 'off',
  });

  // Echtes Auswahlmenü statt <datalist>: Das funktioniert auf allen Geräten,
  // besonders auf iPad und iPhone, wo datalist keine Liste anzeigt.
  const subject = subjectPicker({
    id: 'field-subject',
    subjects,
    value: initial.subject ?? '',
    onChange: () => handleSubjectChange(),
  });
  fields.subject = subject.control;

  fields.description = el('textarea', {
    class: 'textarea',
    id: 'field-description',
    name: 'description',
    placeholder: 'Details, Seitenzahlen, Hinweise der Lehrkraft …',
    text: initial.description ?? '',
  });

  fields.dueDate = el('input', {
    class: 'input',
    id: 'field-dueDate',
    type: 'date',
    name: 'dueDate',
    value: initial.dueDate ?? '',
  });

  fields.dueTime = el('input', {
    class: 'input',
    id: 'field-dueTime',
    type: 'time',
    name: 'dueTime',
    value: initial.dueTime ?? '',
  });

  fields.priority = el(
    'select',
    { class: 'select', id: 'field-priority', name: 'priority' },
    PRIORITIES.map((priority) =>
      el('option', {
        value: priority.id,
        text: priority.label,
        selected: priority.id === (initial.priority ?? 'normal'),
      }),
    ),
  );

  fields.estimatedMinutes = el('input', {
    class: 'input',
    id: 'field-estimatedMinutes',
    type: 'number',
    name: 'estimatedMinutes',
    min: '0',
    max: '1440',
    step: '5',
    inputmode: 'numeric',
    value: initial.estimatedMinutes ?? '',
    placeholder: 'z.B. 45',
  });

  fields.aiRequested = el('input', {
    type: 'checkbox',
    id: 'field-ai',
    name: 'aiRequested',
    checked: Boolean(initial.aiRequested),
  });

  const attachments = attachmentField({ id: 'field-attachments', initial: initial.attachments ?? [] });

  /* --- Abgabetermin aus dem Stundenplan --- */

  const lessonHint = el('p', { class: 'field-hint' });

  const applyNextLesson = (next) => {
    fields.dueDate.value = next.date;
    fields.dueTime.value = next.time;
    dueFromLesson = true;
    lessonId = next.lesson.id;
    showErrors({});
  };

  const refreshLessonHint = () => {
    const subjectName = subject.getValue();
    const next = subjectName ? nextLessonFor(state.schedule, subjectName) : null;

    if (!next) {
      render(lessonHint, 'Leer lassen, wenn es keinen festen Termin gibt.');
      return;
    }

    render(lessonHint, [
      `Nächste ${subjectName}-Stunde: ${describeNextLesson(next)}. `,
      el('button', {
        class: 'link-button',
        type: 'button',
        text: 'Als Termin übernehmen',
        on: {
          click: () => {
            applyNextLesson(next);
            dueTouched = true;
            refreshLessonHint();
          },
        },
      }),
    ]);
  };

  // Fachwechsel zieht den Termin nach, solange er nicht von Hand gesetzt wurde.
  function handleSubjectChange() {
    if (state.settings.autoDueFromSchedule && !dueTouched) {
      const next = nextLessonFor(state.schedule, subject.getValue());
      if (next) applyNextLesson(next);
    }
    refreshLessonHint();
  }

  for (const field of [fields.dueDate, fields.dueTime]) {
    field.addEventListener('input', () => {
      dueTouched = true;
      dueFromLesson = false;
      lessonId = null;
    });
  }

  const form = el('form', { class: 'dialog-form', id: 'task-form', novalidate: true }, [
    el('div', { class: 'form-grid' }, [
      makeField('title', 'Titel *', fields.title, { span: true }),
      makeField('subject', 'Fach *', subject.element, { hint: 'Neue Fächer werden automatisch angelegt.' }),
      makeField('priority', 'Priorität', fields.priority),
      makeField('dueDate', 'Abgabetermin', fields.dueDate, { hint: lessonHint }),
      makeField('dueTime', 'Uhrzeit (optional)', fields.dueTime),
      makeField('estimatedMinutes', 'Geschätzte Dauer (Minuten)', fields.estimatedMinutes),
      el('div', { class: 'field span-2' }, [
        el('label', { class: 'switch-row', for: 'field-ai' }, [
          fields.aiRequested,
          el('span', { class: 'switch-text' }, [
            'Diese Aufgabe mit KI bearbeiten',
            el('small', { text: 'Öffnet die Aufgabe nach dem Speichern direkt im KI-Lernassistenten.' }),
          ]),
        ]),
      ]),
      makeField('description', 'Beschreibung', fields.description, { span: true }),
      attachments.element,
    ]),
  ]);

  const detectedHint = detected.length
    ? el('div', { class: 'alert', data: { tone: 'info' } }, [
        el('span', {}, [
          el('strong', { text: 'Automatisch erkannt: ' }),
          detected.join(', '),
          ' – bitte kurz prüfen und bei Bedarf anpassen.',
        ]),
      ])
    : null;

  const submit = () => {
    const input = {
      title: fields.title.value,
      subject: subject.getValue(),
      description: fields.description.value,
      dueDate: fields.dueDate.value,
      dueTime: fields.dueTime.value,
      priority: fields.priority.value,
      estimatedMinutes: fields.estimatedMinutes.value,
    };

    const { valid, errors, value } = validateTaskInput(input);
    showErrors(errors);

    if (!valid) {
      const firstError = Object.keys(errors)[0];
      fields[firstError]?.focus();
      showToast('Bitte korrigiere die markierten Felder.', { tone: 'error' });
      return;
    }

    const wantsAi = fields.aiRequested.checked;
    const extra = {
      aiRequested: wantsAi,
      dueFromLesson: dueFromLesson && Boolean(value.dueDate),
      lessonId: dueFromLesson ? lessonId : null,
      attachments: attachments.getAttachments(),
    };
    const saved = isEdit ? updateTask(task.id, { ...value, ...extra }) : addTask({ ...value, ...extra });

    close('save');
    showToast(isEdit ? 'Aufgabe aktualisiert.' : 'Aufgabe gespeichert.', { tone: 'success' });

    if (wantsAi && saved) setView('ai', { aiTaskId: saved.id });
  };

  const showErrors = (errors) => {
    for (const [name, node] of Object.entries(errorNodes)) {
      const message = errors[name];
      node.hidden = !message;
      node.textContent = message ?? '';
      node.closest('.field')?.setAttribute('data-invalid', message ? 'true' : 'false');
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submit();
  });

  const { close } = openDialog({
    title: isEdit ? 'Aufgabe bearbeiten' : 'Neue Aufgabe',
    body: [detectedHint, form].filter(Boolean),
    footer: [
      el('button', {
        class: 'btn btn-secondary',
        type: 'button',
        text: 'Abbrechen',
        on: { click: () => close('cancel') },
      }),
      el('button', {
        class: 'btn btn-primary',
        type: 'submit',
        form: 'task-form',
        text: isEdit ? 'Änderungen speichern' : 'Aufgabe speichern',
      }),
    ],
  });

  // Ist das Fach schon bekannt (z.B. aus der Schnelleingabe), gleich terminieren.
  if (!isEdit && state.settings.autoDueFromSchedule && !dueTouched) {
    const next = nextLessonFor(state.schedule, subject.getValue());
    if (next) applyNextLesson(next);
  }
  refreshLessonHint();

  fields.title.focus();
  return { close };
}

/** Bestätigungsdialog für die Schnelleingabe: erkannte Daten vorbelegen. */
export function openQuickAddConfirm(parsed) {
  return openTaskDialog({
    preset: {
      title: parsed.title,
      subject: parsed.subject,
      description: parsed.description ?? '',
      dueDate: parsed.dueDate ?? '',
      dueTime: parsed.dueTime ?? '',
      priority: parsed.priority ?? 'normal',
      estimatedMinutes: parsed.estimatedMinutes ?? '',
    },
    detected: parsed.detected ?? [],
  });
}

/** Für Tests im Browser praktisch: Formularwerte neu setzen. */
export function resetDialogRoot() {
  const root = document.getElementById('dialog-root');
  if (root) render(root, []);
}
