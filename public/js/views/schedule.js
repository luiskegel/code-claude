/** Stundenplan: Wochenraster, Bearbeiten der Stunden, Automatik für Abgabetermine. */

import { el, icon, render } from '../lib/dom.js';
import {
  DAY_END,
  DAY_START,
  PERIODS,
  WEEKDAYS,
  lessonPosition,
  lessonsForDay,
  minutesOf,
  nextLessonFor,
  validateLessonInput,
} from '../data/schedule.js';
import { subjectColor } from '../data/model.js';
import {
  addLesson,
  deleteLesson,
  getState,
  toggleTaskCompleted,
  resetSchedule,
  restoreLesson,
  setAutoDueFromSchedule,
  setView,
  updateLesson,
} from '../state/store.js';
import { openDialog, confirmDialog } from '../components/dialog.js';
import { renderMarkdown } from '../lib/markdown.js';
import { attachmentThumb } from '../components/attachments.js';
import { describeDueDate } from '../lib/date.js';
import { showToast } from '../components/toast.js';
import { emptyState } from '../components/emptyState.js';
import { openTaskDialog } from '../components/taskForm.js';
import { subjectPicker } from '../components/subjectPicker.js';

export function scheduleView() {
  const state = getState();
  const today = new Date().getDay();

  return el('div', { class: 'view' }, [
    el('section', { class: 'section' }, [
      el('div', { class: 'section-head' }, [
        el('h2', { text: 'Stundenplan' }),
        el('div', { class: 'section-actions' }, [
          el(
            'button',
            { class: 'btn btn-ghost btn-sm', type: 'button', on: { click: () => setView('subjects') } },
            ['Fächer verwalten'],
          ),
          el(
            'button',
            { class: 'btn btn-secondary btn-sm', type: 'button', on: { click: handleReset } },
            ['Plan zurücksetzen'],
          ),
          el(
            'button',
            { class: 'btn btn-primary btn-sm', type: 'button', on: { click: () => openLessonDialog() } },
            [icon('plus', 16), 'Stunde'],
          ),
        ]),
      ]),

      autoDueSwitch(state),

      state.schedule.length
        ? el('div', { class: 'schedule' }, [timeColumn(), ...WEEKDAYS.map((entry) => dayColumn(entry, state, today))])
        : emptyState({
            icon: '🗓️',
            title: 'Noch kein Stundenplan',
            text: 'Trage deine Stunden ein – danach werden Hausaufgaben automatisch bis zur nächsten Stunde des Fachs terminiert.',
            action: { label: 'Erste Stunde eintragen', onClick: () => openLessonDialog() },
          }),
    ]),

    state.schedule.length ? nextLessonsCard(state) : null,
  ]);
}

function autoDueSwitch(state) {
  const checkbox = el('input', {
    type: 'checkbox',
    id: 'auto-due',
    checked: state.settings.autoDueFromSchedule,
  });
  checkbox.addEventListener('change', () => {
    setAutoDueFromSchedule(checkbox.checked);
    showToast(
      checkbox.checked
        ? 'Neue Aufgaben werden automatisch bis zur nächsten Stunde terminiert.'
        : 'Automatische Termine ausgeschaltet.',
      { tone: 'success' },
    );
  });

  return el('label', { class: 'switch-row', for: 'auto-due' }, [
    checkbox,
    el('span', { class: 'switch-text' }, [
      'Abgabetermin automatisch aus dem Stundenplan',
      el('small', {
        text: 'Eine neue Mathe-Aufgabe ist dann bis zum Beginn der nächsten Mathestunde fällig.',
      }),
    ]),
  ]);
}

function timeColumn() {
  const total = minutesOf(DAY_END) - minutesOf(DAY_START);

  return el(
    'div',
    { class: 'schedule-times', 'aria-hidden': 'true' },
    PERIODS.map((period) =>
      el('span', {
        class: 'schedule-time',
        text: period.start,
        style: { top: `${((minutesOf(period.start) - minutesOf(DAY_START)) / total) * 100}%` },
      }),
    ),
  );
}

function dayColumn(entry, state, today) {
  const lessons = lessonsForDay(state.schedule, entry.day);

  return el('div', { class: 'schedule-day', data: { today: String(entry.day === today) } }, [
    el('div', { class: 'schedule-day-head' }, [
      el('span', { class: 'schedule-day-name', text: entry.short }),
      el('span', { class: 'schedule-day-full', text: entry.long }),
    ]),
    el(
      'div',
      { class: 'schedule-track' },
      lessons.length
        ? lessons.map((lesson) => lessonBlock(lesson, state))
        : [el('p', { class: 'schedule-free', text: 'frei' })],
    ),
  ]);
}

function lessonBlock(lesson, state) {
  const { top, height } = lessonPosition(lesson);
  const color = subjectColor(state.subjects, lesson.subject);
  // In einer Einzelstunde ist kein Platz für Kurs und Raum – die stehen im Tooltip.
  const isShort = minutesOf(lesson.end) - minutesOf(lesson.start) <= 50;
  const openTaskCount = tasksForLesson(state, lesson).filter((task) => !task.completed).length;

  return el(
    'button',
    {
      class: `lesson${isShort ? ' lesson-short' : ''}`,
      type: 'button',
      style: {
        '--lesson-color': color,
        '--lesson-soft': `${color}1f`,
        top: `${top}%`,
        height: `${Math.max(height, 6)}%`,
      },
      title: `${lesson.subject} · ${lesson.start}–${lesson.end}${lesson.room ? ` · ${lesson.room}` : ''}`,
      on: { click: () => openLessonDetail(lesson) },
    },
    [
      openTaskCount
        ? el('span', {
            class: 'lesson-badge',
            text: String(openTaskCount),
            title: `${openTaskCount} Hausaufgabe(n) für diese Stunde`,
          })
        : null,
      el('span', { class: 'lesson-subject', text: lesson.subject }),
      el('span', { class: 'lesson-meta', text: `${lesson.start}–${lesson.end}` }),
      !isShort && (lesson.course || lesson.room)
        ? el('span', {
            class: 'lesson-meta',
            text: [lesson.course, lesson.room].filter(Boolean).join(' · '),
          })
        : null,
    ],
  );
}

/** Übersicht: Wann ist die nächste Stunde in welchem Fach? */
function nextLessonsCard(state) {
  const now = new Date();
  const rows = [...new Set(state.schedule.map((lesson) => lesson.subject))]
    .map((subject) => ({ subject, next: nextLessonFor(state.schedule, subject, now) }))
    .filter((row) => row.next)
    .sort((a, b) => `${a.next.date}${a.next.time}`.localeCompare(`${b.next.date}${b.next.time}`));

  return el('section', { class: 'section' }, [
    el('div', { class: 'section-head' }, [
      el('h2', { text: 'Nächste Stunden' }),
      el('span', { class: 'muted', text: 'Bis dahin sind neue Aufgaben des Fachs fällig.' }),
    ]),
    el(
      'ul',
      { class: 'subject-list subject-list-grid' },
      rows.map((row) =>
        el('li', { class: 'subject-row' }, [
          el('span', { class: 'subject-swatch', style: { background: subjectColor(state.subjects, row.subject) } }),
          el('span', { class: 'subject-name', text: row.subject }),
          el('span', {
            class: 'subject-count',
            text: `${WEEKDAYS.find((day) => day.day === new Date(`${row.next.date}T00:00:00`).getDay())?.short ?? ''}, ${
              row.next.time
            } Uhr`,
          }),
          el(
            'button',
            {
              class: 'btn btn-ghost btn-sm',
              type: 'button',
              title: `Aufgabe für ${row.subject} anlegen`,
              'aria-label': `Aufgabe für ${row.subject} anlegen`,
              on: { click: () => openTaskDialog({ preset: { subject: row.subject } }) },
            },
            [icon('plus', 16)],
          ),
        ]),
      ),
    ),
  ]);
}

/* ---------------- Hausaufgaben einer Stunde ---------------- */

/**
 * Aufgaben, die zu dieser Stunde gehören: entweder direkt zugeordnet
 * (automatischer Termin) oder im selben Fach am Tag der Stunde fällig.
 */
export function tasksForLesson(state, lesson) {
  const next = nextLessonFor(state.schedule, lesson.subject);
  const nextDateForThisLesson = next?.lesson.id === lesson.id ? next.date : null;

  return state.tasks
    .filter((task) => {
      if (task.lessonId === lesson.id) return true;
      if (!nextDateForThisLesson) return false;
      return (
        task.subject.toLowerCase() === lesson.subject.toLowerCase() && task.dueDate === nextDateForThisLesson
      );
    })
    .sort((a, b) => Number(a.completed) - Number(b.completed) || a.dueDate.localeCompare(b.dueDate));
}

/** Klick auf eine Stunde: Was ist für diese Stunde zu tun – inklusive gelöster Aufgaben. */
function openLessonDetail(lesson) {
  const state = getState();
  const tasks = tasksForLesson(state, lesson);

  const meta = [
    `${WEEKDAYS.find((day) => day.day === lesson.day)?.long ?? ''}, ${lesson.start}–${lesson.end} Uhr`,
    lesson.room ? `Raum ${lesson.room}` : null,
    lesson.teacher || null,
    lesson.course || null,
  ]
    .filter(Boolean)
    .join(' · ');

  const body = el('div', { class: 'stack' }, [
    el('p', { class: 'muted', text: meta }),
    el('h3', { text: 'Hausaufgaben für diese Stunde' }),
    tasks.length
      // close() existiert erst nach openDialog – deshalb verzögert aufrufen.
      ? el('div', { class: 'stack' }, tasks.map((task) => lessonTaskRow(task, (reason) => close(reason))))
      : el('p', { class: 'muted', text: 'Für diese Stunde ist nichts aufgegeben.' }),
  ]);

  const { close } = openDialog({
    title: lesson.subject,
    body,
    footer: [
      el('button', {
        class: 'btn btn-secondary',
        type: 'button',
        text: 'Stunde bearbeiten',
        on: {
          click: () => {
            close('edit');
            openLessonDialog(lesson);
          },
        },
      }),
      el('button', {
        class: 'btn btn-primary',
        type: 'button',
        text: '+ Hausaufgabe',
        on: {
          click: () => {
            close('add');
            openTaskDialog({
              preset: {
                subject: lesson.subject,
                dueDate: nextDateOf(state, lesson),
                dueTime: lesson.start,
              },
            });
          },
        },
      }),
    ],
  });
}

function nextDateOf(state, lesson) {
  const next = nextLessonFor(state.schedule, lesson.subject);
  return next?.lesson.id === lesson.id ? next.date : '';
}

/** Eine Aufgabe im Stunden-Dialog – mit Fotos und der gespeicherten Lösung. */
function lessonTaskRow(task, closeDialog) {
  const due = describeDueDate(task.dueDate, task.dueTime);
  const solutionBox = el('div', { class: 'solution-box', hidden: true });
  let solutionShown = false;

  const toggleSolution = () => {
    solutionShown = !solutionShown;
    solutionBox.hidden = !solutionShown;
    if (solutionShown && !solutionBox.childElementCount) {
      render(solutionBox, [
        el('div', { class: 'ai-content' }, [renderMarkdown(task.solution.content)]),
        el('p', {
          class: 'field-hint',
          text: `Gespeichert am ${new Date(task.solution.savedAt).toLocaleString('de-DE')} · ${
            task.solution.provider === 'mock' ? 'Demo-Tutor' : `KI: ${task.solution.provider}`
          }`,
        }),
      ]);
    }
  };

  return el('article', { class: 'lesson-task' }, [
    el('div', { class: 'row' }, [
      el('strong', { text: task.title }),
      el('span', {
        class: 'badge',
        data: { tone: task.completed ? 'done' : due.tone },
        text: task.completed ? 'Erledigt' : due.label,
      }),
      task.solution ? el('span', { class: 'badge', data: { tone: 'done' }, text: '✓ Lösung liegt bereit' }) : null,
    ]),
    task.description ? el('p', { class: 'muted', text: task.description }) : null,
    task.attachments?.length
      ? el('div', { class: 'attachment-list' }, task.attachments.map((attachment) => attachmentThumb(attachment)))
      : null,
    el('div', { class: 'row' }, [
      task.solution
        ? el('button', {
            class: 'btn btn-primary btn-sm',
            type: 'button',
            text: 'Lösung anzeigen',
            on: { click: toggleSolution },
          })
        : el('button', {
            class: 'btn btn-secondary btn-sm',
            type: 'button',
            text: '✨ Mit KI lösen',
            on: {
              click: () => {
                closeDialog('ai');
                setView('ai', { aiTaskId: task.id });
              },
            },
          }),
      el('button', {
        class: 'btn btn-ghost btn-sm',
        type: 'button',
        text: task.completed ? 'Doch nicht erledigt' : 'Erledigt',
        on: {
          click: () => {
            toggleTaskCompleted(task.id);
            closeDialog('done');
          },
        },
      }),
    ]),
    solutionBox,
  ]);
}

/* ---------------- Dialog zum Bearbeiten ---------------- */

function openLessonDialog(lesson = null) {
  const state = getState();
  const isEdit = Boolean(lesson);
  const initial = {
    day: 1,
    start: '08:00',
    end: '09:30',
    subject: '',
    course: '',
    teacher: '',
    room: '',
    ...(lesson ?? {}),
  };

  const fields = {};
  const errorNodes = {};

  const makeField = (name, label, control, { span = false, hint = null } = {}) => {
    const errorNode = el('p', { class: 'field-error', hidden: true });
    errorNodes[name] = errorNode;
    return el('div', { class: `field${span ? ' span-2' : ''}` }, [
      el('label', { class: 'field-label', for: `lesson-${name}`, text: label }),
      control,
      hint ? el('p', { class: 'field-hint', text: hint }) : null,
      errorNode,
    ]);
  };

  const subject = subjectPicker({
    id: 'lesson-subject',
    subjects: state.subjects,
    value: initial.subject,
  });
  fields.subject = subject.control;

  fields.day = el(
    'select',
    { class: 'select', id: 'lesson-day' },
    WEEKDAYS.map((entry) =>
      el('option', { value: String(entry.day), text: entry.long, selected: entry.day === Number(initial.day) }),
    ),
  );

  fields.start = el('input', { class: 'input', id: 'lesson-start', type: 'time', value: initial.start });
  fields.end = el('input', { class: 'input', id: 'lesson-end', type: 'time', value: initial.end });
  fields.course = el('input', {
    class: 'input',
    id: 'lesson-course',
    type: 'text',
    value: initial.course,
    placeholder: 'z.B. M-GK2',
    maxLength: 20,
    autocomplete: 'off',
  });
  fields.teacher = el('input', {
    class: 'input',
    id: 'lesson-teacher',
    type: 'text',
    value: initial.teacher,
    placeholder: 'z.B. HÖRN',
    maxLength: 20,
    autocomplete: 'off',
  });
  fields.room = el('input', {
    class: 'input',
    id: 'lesson-room',
    type: 'text',
    value: initial.room,
    placeholder: 'z.B. B305',
    maxLength: 20,
    autocomplete: 'off',
  });

  const form = el('form', { class: 'dialog-form', id: 'lesson-form', novalidate: true }, [
    el('div', { class: 'form-grid' }, [
      makeField('subject', 'Fach *', subject.element, { span: true }),
      makeField('day', 'Wochentag', fields.day),
      makeField('course', 'Kurs', fields.course, { hint: 'Kürzel wie im Vertretungsplan.' }),
      makeField('start', 'Beginn', fields.start),
      makeField('end', 'Ende', fields.end),
      makeField('teacher', 'Lehrkraft', fields.teacher),
      makeField('room', 'Raum', fields.room),
    ]),
  ]);

  const showErrors = (errors) => {
    for (const [name, node] of Object.entries(errorNodes)) {
      const message = errors[name];
      node.hidden = !message;
      node.textContent = message ?? '';
      node.closest('.field')?.setAttribute('data-invalid', message ? 'true' : 'false');
    }
  };

  const submit = () => {
    const { valid, errors, value } = validateLessonInput({
      subject: subject.getValue(),
      day: fields.day.value,
      start: fields.start.value,
      end: fields.end.value,
      course: fields.course.value,
      teacher: fields.teacher.value,
      room: fields.room.value,
    });

    showErrors(errors);
    if (!valid) {
      fields[Object.keys(errors)[0]]?.focus();
      showToast('Bitte korrigiere die markierten Felder.', { tone: 'error' });
      return;
    }

    if (isEdit) updateLesson(lesson.id, value);
    else addLesson(value);

    close('save');
    showToast(isEdit ? 'Stunde aktualisiert.' : 'Stunde eingetragen.', { tone: 'success' });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submit();
  });

  const footer = [
    isEdit
      ? el('button', {
          class: 'btn btn-danger',
          type: 'button',
          text: 'Löschen',
          on: {
            click: () => {
              const removed = deleteLesson(lesson.id);
              close('delete');
              if (removed) {
                showToast('Stunde gelöscht.', {
                  tone: 'info',
                  action: { label: 'Rückgängig', onClick: () => restoreLesson(removed.lesson, removed.index) },
                });
              }
            },
          },
        })
      : el('button', {
          class: 'btn btn-secondary',
          type: 'button',
          text: 'Abbrechen',
          on: { click: () => close('cancel') },
        }),
    el('button', {
      class: 'btn btn-primary',
      type: 'submit',
      form: 'lesson-form',
      text: isEdit ? 'Speichern' : 'Eintragen',
    }),
  ];

  const { close } = openDialog({
    title: isEdit ? 'Stunde bearbeiten' : 'Neue Stunde',
    body: form,
    footer,
  });

  fields.subject.focus();
}

async function handleReset() {
  const confirmed = await confirmDialog({
    title: 'Stundenplan zurücksetzen?',
    message:
      'Alle eigenen Änderungen am Stundenplan gehen verloren und der mitgelieferte Wochenplan wird wiederhergestellt. Deine Aufgaben bleiben erhalten.',
    confirmLabel: 'Zurücksetzen',
  });
  if (!confirmed) return;

  resetSchedule();
  showToast('Stundenplan zurückgesetzt.', { tone: 'success' });
}
