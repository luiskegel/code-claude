/** Einheitlicher Leerzustand für Listen und Ansichten. */

import { el } from '../lib/dom.js';

export function emptyState({ icon: iconText = '📋', title, text, action = null }) {
  return el('div', { class: 'empty-state' }, [
    el('div', { class: 'empty-icon', text: iconText, 'aria-hidden': 'true' }),
    el('p', { class: 'empty-title', text: title }),
    text ? el('p', { text }) : null,
    action
      ? el('button', {
          class: 'btn btn-primary',
          type: 'button',
          text: action.label,
          on: { click: action.onClick },
        })
      : null,
  ]);
}
