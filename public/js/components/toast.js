/** Kurze Rückmeldungen am Bildschirmrand, optional mit Aktion ("Rückgängig"). */

import { el } from '../lib/dom.js';

const ICONS = { success: '✓', error: '!', info: 'i' };

/**
 * @param {string} message
 * @param {{tone?: 'success'|'error'|'info', action?: {label: string, onClick: Function}, duration?: number}} [options]
 */
export function showToast(message, options = {}) {
  const stack = document.getElementById('toast-stack');
  if (!stack) return;

  const { tone = 'info', action, duration = action ? 7000 : 3800 } = options;

  const toast = el('div', { class: 'toast', data: { tone } }, [
    el('span', { class: 'toast-icon', text: ICONS[tone] ?? ICONS.info, 'aria-hidden': 'true' }),
    el('span', { class: 'toast-text', text: message }),
  ]);

  if (action) {
    toast.append(
      el('button', {
        class: 'toast-action',
        type: 'button',
        text: action.label,
        on: {
          click: () => {
            action.onClick();
            dismiss();
          },
        },
      }),
    );
  }

  const dismiss = () => {
    clearTimeout(timer);
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 180);
  };

  toast.style.transition = 'opacity 180ms ease, transform 180ms ease';
  const timer = setTimeout(dismiss, duration);

  stack.append(toast);
}
