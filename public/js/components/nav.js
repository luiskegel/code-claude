/** Hauptnavigation – oben auf grossen Displays, als Tab-Leiste auf dem Smartphone. */

import { el, icon, render } from '../lib/dom.js';
import { getState, setView } from '../state/store.js';
import { getStats } from '../state/selectors.js';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'tasks', label: 'Aufgaben', icon: 'list' },
  { id: 'calendar', label: 'Kalender', icon: 'calendar' },
  { id: 'ai', label: 'KI-Hilfe', icon: 'sparkles' },
  { id: 'subjects', label: 'Fächer', icon: 'book' },
];

export function renderNav(container) {
  const state = getState();
  const stats = getStats(state.tasks);

  render(container, [
    el(
      'div',
      { class: 'nav-inner' },
      NAV_ITEMS.map((item) => {
        const badgeCount = item.id === 'tasks' ? stats.overdue + stats.today : 0;
        return el(
          'button',
          {
            class: 'nav-item',
            type: 'button',
            'aria-current': state.ui.view === item.id ? 'page' : 'false',
            on: { click: () => setView(item.id) },
          },
          [
            icon(item.icon, 18),
            el('span', { class: 'nav-label', text: item.label }),
            badgeCount
              ? el('span', {
                  class: 'nav-badge',
                  text: String(badgeCount),
                  'aria-label': `${badgeCount} Aufgaben heute oder überfällig`,
                })
              : null,
          ],
        );
      }),
    ),
  ]);
}
