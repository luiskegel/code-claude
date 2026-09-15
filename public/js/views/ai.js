/**
 * KI-Lernassistent: Aufgabe eingeben oder übernehmen, Modus wählen, Antwort erhalten.
 * Der lokale Zustand (Eingaben, Antwort) lebt im Modul, damit er beim Neuzeichnen
 * der Ansicht erhalten bleibt.
 */

import { el, icon, render } from '../lib/dom.js';
import { renderMarkdown } from '../lib/markdown.js';
import { AI_MODES, getMode } from '../services/aiModes.js';
import { AiError, fetchAiStatus, requestAiAnswer } from '../services/aiClient.js';
import { getState, setView, toggleTaskCompleted } from '../state/store.js';
import { confirmDialog } from '../components/dialog.js';
import { showToast } from '../components/toast.js';
import { emptyState } from '../components/emptyState.js';

const aiState = {
  taskId: null,
  question: '',
  userSolution: '',
  mode: 'hint',
  answer: null,
  answerMode: null,
  provider: null,
  notice: null,
  error: null,
  loading: false,
};

let status = { provider: 'mock', configured: false };

/** Einmalig beim Start: welcher Anbieter läuft serverseitig? */
export async function loadAiStatus() {
  status = await fetchAiStatus();
  return status;
}

export function aiView() {
  const state = getState();
  const requestedId = state.ui.aiTaskId;

  // Aufgabe aus dem Dashboard übernehmen, wenn eine neue ausgewählt wurde.
  if (requestedId && requestedId !== aiState.taskId) {
    const task = state.tasks.find((entry) => entry.id === requestedId);
    if (task) {
      aiState.taskId = task.id;
      aiState.question = [task.title, task.description].filter(Boolean).join('\n');
      aiState.answer = null;
      aiState.error = null;
      aiState.userSolution = '';
    }
  }

  const linkedTask = state.tasks.find((entry) => entry.id === aiState.taskId) ?? null;

  const answerPanel = el('section', { class: 'card card-pad-lg ai-answer', 'aria-live': 'polite' });
  const modeGrid = el('div', { class: 'ai-modes', role: 'group', 'aria-label': 'Antwortmodus' });

  const refresh = () => {
    renderModes(modeGrid, run);
    renderAnswer(answerPanel);
  };

  const questionField = el('textarea', {
    class: 'textarea',
    id: 'ai-question',
    placeholder: 'z.B. Berechne die Nullstellen der Funktion f(x)=x²-5x+6.',
    text: aiState.question,
    maxLength: 4000,
  });
  questionField.addEventListener('input', () => {
    aiState.question = questionField.value;
  });

  const solutionField = el('textarea', {
    class: 'textarea',
    id: 'ai-solution',
    placeholder: 'Optional – für den Modus „Lösung überprüfen".',
    text: aiState.userSolution,
    maxLength: 2000,
    style: { minHeight: '84px' },
  });
  solutionField.addEventListener('input', () => {
    aiState.userSolution = solutionField.value;
  });

  async function run(modeId) {
    aiState.mode = modeId;

    if (!questionField.value.trim()) {
      aiState.error = 'Bitte gib zuerst eine Aufgabe ein oder übernimm eine Hausaufgabe.';
      refresh();
      questionField.focus();
      return;
    }

    if (modeId === 'solution') {
      const confirmed = await confirmDialog({
        title: 'Vollständige Lösung anzeigen?',
        message:
          'Du lernst mehr, wenn du es zuerst mit „Hinweis" oder „Schritt für Schritt" versuchst. Trotzdem die komplette Lösung anzeigen?',
        confirmLabel: 'Lösung anzeigen',
        tone: 'primary',
      });
      if (!confirmed) return;
    }

    if (modeId === 'check' && !solutionField.value.trim()) {
      aiState.error = 'Für die Überprüfung brauche ich deine eigene Lösung im Feld darunter.';
      refresh();
      solutionField.focus();
      return;
    }

    aiState.loading = true;
    aiState.error = null;
    aiState.answer = null;
    refresh();

    try {
      const result = await requestAiAnswer({
        mode: modeId,
        question: questionField.value.trim(),
        userSolution: solutionField.value.trim(),
        subject: linkedTask?.subject ?? '',
        taskTitle: linkedTask?.title ?? '',
      });
      aiState.answer = result.content;
      aiState.answerMode = modeId;
      aiState.provider = result.provider;
      aiState.notice = result.notice ?? null;
    } catch (error) {
      aiState.error =
        error instanceof AiError ? error.message : 'Unbekannter Fehler bei der KI-Anfrage. Bitte erneut versuchen.';
      console.error('KI-Anfrage fehlgeschlagen:', error);
    } finally {
      aiState.loading = false;
      refresh();
    }
  }

  refresh();

  return el('div', { class: 'view' }, [
    el('div', { class: 'section-head' }, [
      el('h2', { text: 'KI-Lernassistent' }),
      providerBadge(),
    ]),

    el('div', { class: 'ai-layout' }, [
      el('section', { class: 'card card-pad-lg stack' }, [
        taskPicker(state, linkedTask, questionField),
        el('div', { class: 'field' }, [
          el('label', { class: 'field-label', for: 'ai-question', text: 'Aufgabe' }),
          questionField,
          el('p', {
            class: 'field-hint',
            text: 'Tipp: Schreib die Aufgabe so ab, wie sie im Buch steht – inklusive Formeln.',
          }),
        ]),
        el('div', { class: 'field' }, [
          el('label', { class: 'field-label', for: 'ai-solution', text: 'Deine Lösung (optional)' }),
          solutionField,
        ]),
        el('div', { class: 'field' }, [
          el('span', { class: 'field-label', text: 'Wie soll dir geholfen werden?' }),
          modeGrid,
        ]),
        linkedTask
          ? el('div', { class: 'row' }, [
              el(
                'button',
                {
                  class: 'btn btn-secondary btn-sm',
                  type: 'button',
                  on: {
                    click: () => {
                      toggleTaskCompleted(linkedTask.id);
                      showToast(
                        linkedTask.completed ? 'Aufgabe wieder geöffnet.' : 'Aufgabe als erledigt markiert.',
                        { tone: 'success' },
                      );
                    },
                  },
                },
                [icon('check', 16), linkedTask.completed ? 'Doch nicht erledigt' : 'Aufgabe erledigt'],
              ),
              el(
                'button',
                {
                  class: 'btn btn-ghost btn-sm',
                  type: 'button',
                  text: 'Zur Aufgabenliste',
                  on: { click: () => setView('tasks', { filter: 'all' }) },
                },
              ),
            ])
          : null,
      ]),
      answerPanel,
    ]),
  ]);
}

function renderModes(container, run) {
  render(
    container,
    AI_MODES.map((mode) =>
      el(
        'button',
        {
          class: 'mode-btn',
          type: 'button',
          'aria-pressed': String(aiState.mode === mode.id),
          disabled: aiState.loading,
          on: { click: () => run(mode.id) },
        },
        [
          el('span', { class: 'mode-name', text: `${mode.icon} ${mode.name}` }),
          el('span', { class: 'mode-desc', text: mode.description }),
        ],
      ),
    ),
  );
}

function renderAnswer(container) {
  if (aiState.loading) {
    render(container, [
      el('div', { class: 'ai-loading' }, [
        el('span', { class: 'spinner' }),
        `„${getMode(aiState.mode).name}" wird vorbereitet …`,
      ]),
    ]);
    return;
  }

  if (aiState.error) {
    render(container, [
      el('div', { class: 'alert', data: { tone: 'error' } }, [
        el('span', { 'aria-hidden': 'true', text: '⚠️' }),
        el('span', { text: aiState.error }),
      ]),
      el('p', {
        class: 'muted',
        text: 'Du kannst es direkt erneut versuchen – deine Eingaben bleiben erhalten.',
      }),
    ]);
    return;
  }

  if (!aiState.answer) {
    render(container, [
      emptyState({
        icon: '✨',
        title: 'Noch keine Antwort',
        text: 'Gib links eine Aufgabe ein und wähle, wie dir geholfen werden soll. Der Hinweis-Modus verrät die Lösung bewusst nicht.',
      }),
    ]);
    return;
  }

  const mode = getMode(aiState.answerMode ?? aiState.mode);

  render(container, [
    el('div', { class: 'ai-answer-head' }, [
      el('span', { class: 'badge', text: `${mode.icon} ${mode.name}` }),
      aiState.provider === 'mock'
        ? el('span', { class: 'badge', data: { tone: 'today' }, text: 'Demo-Tutor' })
        : el('span', { class: 'badge', data: { tone: 'done' }, text: `KI: ${aiState.provider}` }),
    ]),
    aiState.notice
      ? el('div', { class: 'alert', data: { tone: 'warning' } }, [el('span', { text: aiState.notice })])
      : null,
    el('div', { class: 'ai-content' }, [renderMarkdown(aiState.answer)]),
  ]);
}

function taskPicker(state, linkedTask, questionField) {
  const openTasks = state.tasks.filter((task) => !task.completed);

  const select = el('select', { class: 'select', id: 'ai-task', 'aria-label': 'Hausaufgabe übernehmen' }, [
    el('option', { value: '', text: openTasks.length ? 'Aufgabe auswählen …' : 'Keine offenen Aufgaben' }),
    ...openTasks.map((task) =>
      el('option', {
        value: task.id,
        text: `${task.subject ? `${task.subject}: ` : ''}${task.title}`,
        selected: task.id === linkedTask?.id,
      }),
    ),
  ]);

  select.addEventListener('change', () => {
    const task = state.tasks.find((entry) => entry.id === select.value);
    if (!task) return;
    aiState.taskId = task.id;
    aiState.question = [task.title, task.description].filter(Boolean).join('\n');
    questionField.value = aiState.question;
    setView('ai', { aiTaskId: task.id });
  });

  return el('div', { class: 'field' }, [
    el('label', { class: 'field-label', for: 'ai-task', text: 'Aus Hausaufgabe übernehmen' }),
    select,
  ]);
}

function providerBadge() {
  const text = status.configured
    ? `KI aktiv: ${status.provider}${status.model ? ` (${status.model})` : ''}`
    : 'Demo-Modus – kein KI-Schlüssel hinterlegt';

  return el('span', {
    class: 'badge',
    data: { tone: status.configured ? 'done' : 'today' },
    style: { marginLeft: 'auto' },
    text,
  });
}
