/** Wochenansicht: sieben Tage mit ihren Aufgaben, vor- und zurückblätterbar. */

import { el, icon } from '../lib/dom.js';
import { getState, setWeekOffset } from '../state/store.js';
import { tasksForDate, tasksWithoutDate } from '../state/selectors.js';
import {
  addDays,
  formatDuration,
  formatRange,
  isoWeekNumber,
  startOfWeek,
  today,
  toISODate,
  weekdayShort,
} from '../lib/date.js';
import { openTaskDialog } from '../components/taskForm.js';
import { taskCard } from '../components/taskCard.js';

export function calendarView() {
  const state = getState();
  const offset = state.ui.weekOffset ?? 0;
  const weekStart = addDays(startOfWeek(today()), offset * 7);
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const todayIso = toISODate(today());
  const undated = tasksWithoutDate(state.tasks);

  return el('div', { class: 'view' }, [
    el('section', { class: 'section' }, [
      el('div', { class: 'calendar-head' }, [
        el('h2', { text: `KW ${isoWeekNumber(weekStart)}` }),
        el('span', { class: 'calendar-range muted', text: formatRange(weekStart, addDays(weekStart, 6)) }),
        el('div', { class: 'section-actions' }, [
          el(
            'button',
            {
              class: 'btn btn-secondary btn-sm btn-icon',
              type: 'button',
              'aria-label': 'Vorherige Woche',
              on: { click: () => setWeekOffset(offset - 1) },
            },
            [icon('chevronLeft', 16)],
          ),
          el(
            'button',
            {
              class: 'btn btn-secondary btn-sm',
              type: 'button',
              text: 'Diese Woche',
              disabled: offset === 0,
              on: { click: () => setWeekOffset(0) },
            },
          ),
          el(
            'button',
            {
              class: 'btn btn-secondary btn-sm btn-icon',
              type: 'button',
              'aria-label': 'Nächste Woche',
              on: { click: () => setWeekOffset(offset + 1) },
            },
            [icon('chevronRight', 16)],
          ),
        ]),
      ]),
      el(
        'div',
        { class: 'calendar-grid' },
        days.map((day) => calendarDay(day, state, todayIso)),
      ),
    ]),

    undated.length
      ? el('section', { class: 'section' }, [
          el('div', { class: 'section-head' }, [
            el('h2', { text: 'Ohne Termin' }),
            el('span', { class: 'muted', text: `${undated.length} Aufgabe(n)` }),
          ]),
          el('div', { class: 'task-grid' }, undated.map(taskCard)),
        ])
      : null,
  ]);
}

function calendarDay(date, state, todayIso) {
  const iso = toISODate(date);
  const tasks = tasksForDate(state.tasks, iso);
  const isWeekend = [0, 6].includes(date.getDay());
  const openMinutes = tasks
    .filter((task) => !task.completed)
    .reduce((sum, task) => sum + (task.estimatedMinutes ?? 0), 0);

  return el(
    'div',
    {
      class: 'calendar-day',
      data: { today: String(iso === todayIso), weekend: String(isWeekend), hasTasks: String(tasks.length > 0) },
    },
    [
      el('div', { class: 'calendar-day-head' }, [
        el('span', { class: 'calendar-day-name', text: weekdayShort(date) }),
        el('span', { class: 'calendar-day-number', text: String(date.getDate()) }),
        tasks.length
          ? el('span', {
              class: 'calendar-day-count',
              text: formatDuration(openMinutes) ?? `${tasks.length}`,
            })
          : null,
      ]),
      ...tasks.map((task) =>
        el(
          'button',
          {
            class: 'calendar-entry',
            type: 'button',
            data: { priority: task.priority, done: String(task.completed) },
            title: `${task.subject}: ${task.title}`,
            on: { click: () => openTaskDialog({ task }) },
          },
          [
            el('span', { class: 'calendar-entry-title', text: task.title }),
            el('span', {
              class: 'calendar-entry-sub',
              text: [task.subject, task.dueTime ? `${task.dueTime} Uhr` : null].filter(Boolean).join(' · '),
            }),
          ],
        ),
      ),
      tasks.length
        ? null
        : el(
            'button',
            {
              class: 'btn btn-ghost btn-sm',
              type: 'button',
              on: { click: () => openTaskDialog({ preset: { dueDate: iso } }) },
            },
            ['+ Aufgabe'],
          ),
    ],
  );
}
