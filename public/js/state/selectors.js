/** Abgeleitete Daten: Statistiken, Filter, Gruppierungen. */

import { isDueToday, isDueWithin, isOverdue, sortTasks } from '../data/model.js';
import { todayISO } from '../lib/date.js';

export const FILTERS = [
  { id: 'today', label: 'Heute' },
  { id: 'week', label: 'Woche' },
  { id: 'all', label: 'Alle Aufgaben' },
  { id: 'done', label: 'Erledigt' },
];

export function getStats(tasks) {
  const open = tasks.filter((task) => !task.completed);
  const done = tasks.filter((task) => task.completed);
  return {
    open: open.length,
    today: open.filter(isDueToday).length,
    overdue: open.filter(isOverdue).length,
    done: done.length,
    total: tasks.length,
    completionRate: tasks.length ? Math.round((done.length / tasks.length) * 100) : 0,
    openMinutes: open.reduce((sum, task) => sum + (task.estimatedMinutes ?? 0), 0),
  };
}

export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'today':
      return sortTasks(tasks.filter((task) => !task.completed && (isDueToday(task) || isOverdue(task))));
    case 'week':
      return sortTasks(tasks.filter((task) => !task.completed && (isOverdue(task) || isDueWithin(task, 7))));
    case 'done':
      return sortTasks(tasks.filter((task) => task.completed));
    case 'open':
      return sortTasks(tasks.filter((task) => !task.completed));
    case 'all':
    default:
      return sortTasks(tasks);
  }
}

export function countForFilter(tasks, filter) {
  return filterTasks(tasks, filter).length;
}

/** Die nächsten offenen Aufgaben – für das Dashboard. */
export function upcomingTasks(tasks, limit = 6) {
  return filterTasks(tasks, 'open').slice(0, limit);
}

/** Aufgaben eines bestimmten Tages ("YYYY-MM-DD"). */
export function tasksForDate(tasks, isoDate) {
  return sortTasks(tasks.filter((task) => task.dueDate === isoDate));
}

/** Offene Aufgaben ohne Termin. */
export function tasksWithoutDate(tasks) {
  return sortTasks(tasks.filter((task) => !task.dueDate && !task.completed));
}

export function todaysTasks(tasks) {
  return tasksForDate(tasks, todayISO());
}
