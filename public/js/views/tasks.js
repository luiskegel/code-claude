/** Aufgabenliste mit den Filtern Heute / Woche / Alle / Erledigt. */

import { el, icon } from '../lib/dom.js';
import { getState, setFilter } from '../state/store.js';
import { FILTERS, countForFilter, filterTasks } from '../state/selectors.js';
import { taskCard } from '../components/taskCard.js';
import { openTaskDialog } from '../components/taskForm.js';
import { emptyState } from '../components/emptyState.js';

const EMPTY_TEXTS = {
  today: {
    icon: '☀️',
    title: 'Heute ist nichts offen',
    text: 'Für heute steht nichts an – vielleicht schon etwas für morgen vorarbeiten?',
  },
  week: {
    icon: '🗓️',
    title: 'Diese Woche ist frei',
    text: 'In den nächsten sieben Tagen ist keine Aufgabe fällig.',
  },
  all: {
    icon: '📚',
    title: 'Noch keine Aufgaben',
    text: 'Lege deine erste Hausaufgabe an – manuell oder per Schnelleingabe auf dem Dashboard.',
  },
  done: {
    icon: '✅',
    title: 'Noch nichts erledigt',
    text: 'Sobald du eine Aufgabe abhakst, taucht sie hier auf.',
  },
};

export function tasksView() {
  const state = getState();
  const filter = state.ui.filter ?? 'today';
  const tasks = filterTasks(state.tasks, filter);

  return el('div', { class: 'view' }, [
    el('section', { class: 'section' }, [
      el('div', { class: 'section-head' }, [
        el('h2', { text: 'Aufgaben' }),
        el('div', { class: 'section-actions' }, [
          el('button', { class: 'btn btn-primary btn-sm desktop-only', type: 'button', on: { click: () => openTaskDialog() } }, [
            icon('plus', 16),
            'Aufgabe hinzufügen',
          ]),
        ]),
      ]),
      el(
        'div',
        { class: 'chip-row', role: 'group', 'aria-label': 'Filter' },
        FILTERS.map((entry) =>
          el('button', {
            class: 'chip',
            type: 'button',
            'aria-pressed': String(entry.id === filter),
            on: { click: () => setFilter(entry.id) },
          }, [
            entry.label,
            el('span', { class: 'chip-count', text: String(countForFilter(state.tasks, entry.id)) }),
          ]),
        ),
      ),
      tasks.length
        ? el('div', { class: 'task-grid' }, tasks.map(taskCard))
        : emptyState({
            ...EMPTY_TEXTS[filter],
            action:
              filter === 'done'
                ? null
                : { label: 'Aufgabe hinzufügen', onClick: () => openTaskDialog() },
          }),
    ]),
  ]);
}
