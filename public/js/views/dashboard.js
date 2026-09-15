/** Dashboard: Statistik, Schnelleingabe, nächste Aufgaben, Fortschritt. */

import { el, icon } from '../lib/dom.js';
import { getState, setView } from '../state/store.js';
import { getStats, upcomingTasks, filterTasks } from '../state/selectors.js';
import { taskCard } from '../components/taskCard.js';
import { quickAdd } from '../components/quickAdd.js';
import { openTaskDialog } from '../components/taskForm.js';
import { emptyState } from '../components/emptyState.js';
import { formatDuration } from '../lib/date.js';
import { subjectColor } from '../data/model.js';

export function dashboardView() {
  const state = getState();
  const stats = getStats(state.tasks);
  const next = upcomingTasks(state.tasks, 6);

  return el('div', { class: 'view' }, [
    quickAdd(),
    statGrid(stats),
    el('div', { class: 'two-col' }, [
      el('section', { class: 'section' }, [
        el('div', { class: 'section-head' }, [
          el('h2', { text: 'Als Nächstes' }),
          el('div', { class: 'section-actions' }, [
            el(
              'button',
              {
                class: 'btn btn-secondary btn-sm',
                type: 'button',
                on: { click: () => setView('tasks', { filter: 'all' }) },
              },
              ['Alle Aufgaben'],
            ),
            el(
              'button',
              {
                class: 'btn btn-primary btn-sm desktop-only',
                type: 'button',
                on: { click: () => openTaskDialog() },
              },
              [icon('plus', 16), 'Aufgabe hinzufügen'],
            ),
          ]),
        ]),
        next.length
          ? el('div', { class: 'task-grid' }, next.map(taskCard))
          : emptyState({
              icon: '🎉',
              title: 'Keine offenen Aufgaben',
              text: 'Alles abgearbeitet. Neue Hausaufgaben trägst du oben in einem Satz ein.',
              action: { label: 'Aufgabe hinzufügen', onClick: () => openTaskDialog() },
            }),
      ]),
      el('aside', { class: 'section' }, [progressCard(stats), subjectCard(state)]),
    ]),
  ]);
}

function statGrid(stats) {
  const items = [
    { tone: 'open', label: 'Offene Aufgaben', value: stats.open, hint: hintForOpen(stats) },
    { tone: 'today', label: 'Heute fällig', value: stats.today, hint: stats.today ? 'Heute erledigen' : 'Nichts für heute' },
    {
      tone: 'overdue',
      label: 'Überfällig',
      value: stats.overdue,
      hint: stats.overdue ? 'Bitte zuerst nachholen' : 'Nichts überfällig',
    },
    { tone: 'done', label: 'Erledigt', value: stats.done, hint: `${stats.completionRate}% aller Aufgaben` },
  ];

  return el(
    'section',
    { class: 'stat-grid', 'aria-label': 'Statistik' },
    items.map((item) =>
      el('article', { class: 'stat-card', data: { tone: item.tone } }, [
        el('div', { class: 'stat-label' }, [el('span', { class: 'stat-dot' }), item.label]),
        el('div', { class: 'stat-value', text: String(item.value) }),
        el('div', { class: 'stat-hint', text: item.hint }),
      ]),
    ),
  );
}

function hintForOpen(stats) {
  const duration = formatDuration(stats.openMinutes);
  return duration ? `ca. ${duration} Arbeitszeit` : 'Keine Zeitschätzung hinterlegt';
}

function progressCard(stats) {
  return el('section', { class: 'card stack' }, [
    el('div', { class: 'row' }, [
      el('h3', { text: 'Fortschritt' }),
      el('span', { class: 'muted', style: { marginLeft: 'auto' }, text: `${stats.completionRate}%` }),
    ]),
    el('div', { class: 'progress', role: 'progressbar', 'aria-valuenow': String(stats.completionRate), 'aria-valuemin': '0', 'aria-valuemax': '100' }, [
      el('div', { class: 'progress-bar', style: { width: `${stats.completionRate}%` } }),
    ]),
    el('p', {
      class: 'muted',
      text: stats.total
        ? `${stats.done} von ${stats.total} Aufgaben erledigt.`
        : 'Noch keine Aufgaben erfasst.',
    }),
  ]);
}

function subjectCard(state) {
  const open = filterTasks(state.tasks, 'open');
  const counts = new Map();
  for (const task of open) {
    counts.set(task.subject, (counts.get(task.subject) ?? 0) + 1);
  }

  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  return el('section', { class: 'card stack' }, [
    el('div', { class: 'row' }, [
      el('h3', { text: 'Offen nach Fach' }),
      el(
        'button',
        {
          class: 'btn btn-ghost btn-sm',
          type: 'button',
          style: { marginLeft: 'auto' },
          on: { click: () => setView('subjects') },
        },
        ['Verwalten'],
      ),
    ]),
    rows.length
      ? el(
          'ul',
          { class: 'subject-list' },
          rows.map(([name, count]) =>
            el('li', { class: 'subject-row' }, [
              el('span', { class: 'subject-swatch', style: { background: subjectColor(state.subjects, name) } }),
              el('span', { class: 'subject-name', text: name || 'Ohne Fach' }),
              el('span', { class: 'subject-count', text: `${count} offen` }),
            ]),
          ),
        )
      : el('p', { class: 'muted', text: 'Aktuell ist in keinem Fach etwas offen.' }),
  ]);
}
