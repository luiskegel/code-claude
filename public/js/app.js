/**
 * Einstiegspunkt: Zustand laden, Theme setzen, Ansichten zeichnen.
 * Jede Zustandsänderung löst genau ein Neuzeichnen von Kopfbereich,
 * Navigation und aktueller Ansicht aus.
 */

import { el, icon, render } from './lib/dom.js';
import { getState, initStore, setView, subscribe } from './state/store.js';
import { renderHeader } from './components/header.js';
import { renderNav } from './components/nav.js';
import { openTaskDialog } from './components/taskForm.js';
import { showToast } from './components/toast.js';
import { dashboardView } from './views/dashboard.js';
import { tasksView } from './views/tasks.js';
import { calendarView } from './views/calendar.js';
import { aiView, loadAiStatus } from './views/ai.js';
import { subjectsView } from './views/subjects.js';

const VIEWS = {
  dashboard: dashboardView,
  tasks: tasksView,
  calendar: calendarView,
  ai: aiView,
  subjects: subjectsView,
};

const elements = {
  header: document.getElementById('app-header'),
  nav: document.getElementById('app-nav'),
  main: document.getElementById('main'),
};

const media = window.matchMedia('(prefers-color-scheme: dark)');
let storageWarningShown = false;

// Manche Host-Umgebungen (z.B. eingebettete Vorschauen) setzen vorab ein
// data-theme auf <html>. Das gilt als Systemvorgabe, solange der Benutzer
// im Kopfbereich nichts anderes gewählt hat.
const hostTheme = document.documentElement.dataset.theme;

function effectiveTheme() {
  const theme = getState().settings.theme;
  if (theme === 'light' || theme === 'dark') return theme;
  if (hostTheme === 'light' || hostTheme === 'dark') return hostTheme;
  return media.matches ? 'dark' : 'light';
}

function renderApp() {
  const state = getState();
  const theme = effectiveTheme();
  document.documentElement.dataset.theme = theme;

  try {
    renderHeader(elements.header, { effectiveTheme: theme });
    renderNav(elements.nav);

    const view = VIEWS[state.ui.view] ?? dashboardView;
    render(elements.main, [storageWarning(state), view(), mobileFab()]);
  } catch (error) {
    console.error('Ansicht konnte nicht gezeichnet werden:', error);
    render(elements.main, [
      el('div', { class: 'alert', data: { tone: 'error' } }, [
        el('span', {}, [
          el('strong', { text: 'Diese Ansicht konnte nicht geladen werden. ' }),
          'Deine Aufgaben sind weiterhin gespeichert.',
        ]),
      ]),
      el('button', {
        class: 'btn btn-secondary',
        type: 'button',
        text: 'Zurück zum Dashboard',
        on: { click: () => setView('dashboard') },
      }),
    ]);
  }
}

function storageWarning(state) {
  if (state.storageOk) return null;

  if (!storageWarningShown) {
    storageWarningShown = true;
    showToast('Speichern ist in diesem Browser nicht möglich.', { tone: 'error' });
  }

  return el('div', { class: 'alert', data: { tone: 'warning' } }, [
    el('span', { 'aria-hidden': 'true', text: '⚠️' }),
    el('span', {}, [
      el('strong', { text: 'Ohne lokalen Speicher: ' }),
      'Deine Aufgaben bleiben nur bis zum Neuladen erhalten. Prüfe die Browser-Einstellungen (privater Modus oder blockierte Website-Daten).',
    ]),
  ]);
}

function mobileFab() {
  return el(
    'button',
    {
      class: 'fab',
      type: 'button',
      'aria-label': 'Aufgabe hinzufügen',
      on: { click: () => openTaskDialog() },
    },
    [icon('plus', 20), 'Aufgabe'],
  );
}

function setupGlobalErrorHandling() {
  window.addEventListener('error', (event) => {
    console.error('Unerwarteter Fehler:', event.error ?? event.message);
    showToast('Es ist ein unerwarteter Fehler aufgetreten.', { tone: 'error' });
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unbehandelte Promise-Ablehnung:', event.reason);
    showToast('Eine Aktion konnte nicht abgeschlossen werden.', { tone: 'error' });
  });
}

function setupShortcuts() {
  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping =
      target instanceof HTMLElement &&
      (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

    if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === 'n') {
      event.preventDefault();
      openTaskDialog();
    }
  });
}

function start() {
  initStore();
  setupGlobalErrorHandling();
  setupShortcuts();

  subscribe(renderApp);
  media.addEventListener('change', () => {
    if (getState().settings.theme === 'system') renderApp();
  });

  renderApp();

  // Status des KI-Backends nachladen und Anzeige aktualisieren.
  loadAiStatus()
    .then(() => renderApp())
    .catch((error) => console.warn('KI-Status konnte nicht geladen werden:', error));
}

start();
