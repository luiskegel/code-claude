/** Aufgabenkarte mit allen Aktionen (erledigen, KI, bearbeiten, duplizieren, löschen). */

import { el, icon } from '../lib/dom.js';
import { describeDueDate, formatDuration } from '../lib/date.js';
import { priorityLabel, subjectColor, taskState } from '../data/model.js';
import {
  deleteTask,
  duplicateTask,
  getState,
  restoreTask,
  setView,
  toggleTaskCompleted,
} from '../state/store.js';
import { showToast } from './toast.js';
import { confirmDialog } from './dialog.js';
import { openTaskDialog } from './taskForm.js';

export function taskCard(task) {
  const state = getState();
  const due = describeDueDate(task.dueDate, task.dueTime);
  const duration = formatDuration(task.estimatedMinutes);
  const color = subjectColor(state.subjects, task.subject);

  const checkButton = el(
    'button',
    {
      class: 'task-check',
      type: 'button',
      'aria-pressed': String(task.completed),
      'aria-label': task.completed ? 'Als offen markieren' : 'Als erledigt markieren',
      title: task.completed ? 'Als offen markieren' : 'Als erledigt markieren',
      on: { click: () => handleToggle(task.id) },
    },
    [icon('check', 15)],
  );

  const badges = [
    task.subject
      ? el('span', {
          class: 'badge badge-subject',
          text: task.subject,
          style: { '--subject-color': color, '--subject-soft': `${color}22` },
        })
      : null,
    el('span', { class: 'badge', data: { priority: task.priority }, text: priorityLabel(task.priority) }),
    el('span', {
      class: 'badge',
      data: { tone: task.completed ? 'done' : due.tone },
      text: task.completed ? 'Erledigt' : due.label,
    }),
    duration ? el('span', { class: 'badge', text: `⏱ ${duration}` }) : null,
  ].filter(Boolean);

  return el(
    'article',
    {
      class: 'task-card',
      data: { priority: task.priority, state: taskState(task), taskId: task.id },
    },
    [
      el('div', { class: 'task-card-head' }, [
        checkButton,
        el('div', { class: 'task-card-headings' }, [
          el('h3', { class: 'task-title', text: task.title }),
          task.description ? el('p', { class: 'task-desc', text: task.description }) : null,
        ]),
      ]),
      el('div', { class: 'task-meta' }, badges),
      el('div', { class: 'task-actions' }, [
        el(
          'button',
          {
            class: 'btn btn-secondary btn-sm',
            type: 'button',
            on: { click: () => setView('ai', { aiTaskId: task.id }) },
          },
          ['✨ Mit KI'],
        ),
        el(
          'button',
          {
            class: 'btn btn-ghost btn-sm',
            type: 'button',
            title: 'Bearbeiten',
            'aria-label': `Aufgabe „${task.title}" bearbeiten`,
            on: { click: () => openTaskDialog({ task }) },
          },
          [icon('edit', 16)],
        ),
        el(
          'button',
          {
            class: 'btn btn-ghost btn-sm',
            type: 'button',
            title: 'Duplizieren',
            'aria-label': `Aufgabe „${task.title}" duplizieren`,
            on: {
              click: () => {
                duplicateTask(task.id);
                showToast('Aufgabe dupliziert.', { tone: 'success' });
              },
            },
          },
          [icon('copy', 16)],
        ),
        el(
          'button',
          {
            class: 'btn btn-ghost btn-sm',
            type: 'button',
            title: 'Löschen',
            'aria-label': `Aufgabe „${task.title}" löschen`,
            on: { click: () => handleDelete(task) },
          },
          [icon('trash', 16)],
        ),
      ]),
    ],
  );
}

function handleToggle(id) {
  const task = toggleTaskCompleted(id);
  if (!task) return;
  showToast(task.completed ? 'Erledigt – stark! 🎉' : 'Aufgabe wieder geöffnet.', {
    tone: task.completed ? 'success' : 'info',
  });
}

async function handleDelete(task) {
  const confirmed = await confirmDialog({
    title: 'Aufgabe löschen?',
    message: `„${task.title}" wird entfernt. Du kannst das direkt danach rückgängig machen.`,
    confirmLabel: 'Löschen',
  });
  if (!confirmed) return;

  const removed = deleteTask(task.id);
  if (!removed) return;

  showToast('Aufgabe gelöscht.', {
    tone: 'info',
    action: {
      label: 'Rückgängig',
      onClick: () => restoreTask(removed.task, removed.index),
    },
  });
}
