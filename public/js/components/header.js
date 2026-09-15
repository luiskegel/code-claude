/** Kopfbereich: App-Name, aktuelles Datum, Speicherstatus, Theme, Aktionsbutton. */

import { el, icon, render } from '../lib/dom.js';
import { formatLongDate } from '../lib/date.js';
import { setTheme } from '../state/store.js';
import { getSyncState } from '../data/persistence.js';
import { cloudPossible } from '../data/cloud.js';
import { openTaskDialog } from './taskForm.js';

export function renderHeader(container, { effectiveTheme }) {
  const isDark = effectiveTheme === 'dark';

  render(container, [
    el('div', { class: 'header-inner' }, [
      el('div', { class: 'brand' }, [
        el('div', { class: 'brand-mark', 'aria-hidden': 'true', text: '📚' }),
        el('div', { class: 'brand-text' }, [
          el('p', { class: 'brand-title', text: 'Smart Homework Manager' }),
          el('p', { class: 'brand-date', text: formatLongDate() }),
        ]),
      ]),
      el('div', { class: 'header-actions' }, [
        syncBadge(),
        el(
          'button',
          {
            class: 'btn btn-ghost btn-icon',
            type: 'button',
            'aria-label': isDark ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren',
            title: isDark ? 'Helles Design' : 'Dunkles Design',
            on: { click: () => setTheme(isDark ? 'light' : 'dark') },
          },
          [icon(isDark ? 'sun' : 'moon', 20)],
        ),
        el(
          'button',
          {
            class: 'btn btn-primary desktop-only',
            type: 'button',
            on: { click: () => openTaskDialog() },
          },
          [icon('plus', 18), el('span', { class: 'btn-label', text: 'Aufgabe hinzufügen' })],
        ),
      ]),
    ]),
  ]);

  // Statusfarbe der Browserleiste an das Theme anpassen.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? '#0e1118' : '#ffffff');
}

/** Zeigt, wo die Aufgaben liegen: dauerhaft auf dem Server oder nur lokal. */
function syncBadge() {
  const { state, error } = getSyncState();

  const variants = {
    connecting: { text: '⏳ Verbinde …', tone: null, title: 'Verbindung zum dauerhaften Speicher wird aufgebaut.' },
    synced: { text: '☁️ Gespeichert', tone: 'done', title: 'Aufgaben liegen dauerhaft auf dem Server und sind auf jedem Gerät verfügbar.' },
    error: { text: '⚠️ Nur lokal', tone: 'overdue', title: error ?? 'Der Server-Speicher ist nicht erreichbar.' },
    local: {
      text: '💾 Dieses Gerät',
      tone: null,
      title: cloudPossible()
        ? 'Kein Server-Speicher verfügbar – die Aufgaben liegen nur in diesem Browser.'
        : 'Lokale Installation: Die Aufgaben liegen in diesem Browser.',
    },
  };

  const variant = variants[state] ?? variants.local;

  return el('span', {
    class: 'badge sync-badge',
    data: variant.tone ? { tone: variant.tone } : {},
    text: variant.text,
    title: variant.title,
  });
}
