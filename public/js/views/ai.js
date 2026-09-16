/**
 * KI-Lernassistent: Aufgabe eingeben oder übernehmen, Modus wählen, Antwort erhalten.
 * Der lokale Zustand (Eingaben, Antwort) lebt im Modul, damit er beim Neuzeichnen
 * der Ansicht erhalten bleibt.
 */

import { el, icon, render } from '../lib/dom.js';
import { renderMarkdown } from '../lib/markdown.js';
import { AI_MODES, getMode } from '../services/aiModes.js';
import { AiError, fetchAiStatus, requestAiAnswer } from '../services/aiClient.js';
import { getState, setView, toggleTaskCompleted, updateTask } from '../state/store.js';
import { attachmentField, attachmentThumb } from '../components/attachments.js';
import { isImageType } from '../data/attachments.js';
import { describeNextLesson, nextLessonFor } from '../data/schedule.js';
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
  extraAttachments: [],
  savedFor: null,
  streaming: false,
  controller: null,
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
      aiState.extraAttachments = [];
      aiState.savedFor = null;
    }
  }

  const linkedTask = state.tasks.find((entry) => entry.id === aiState.taskId) ?? null;

  const answerPanel = el('section', { class: 'card card-pad-lg ai-answer', 'aria-live': 'polite' });
  const modeGrid = el('div', { class: 'ai-modes', role: 'group', 'aria-label': 'Antwortmodus' });

  const refresh = () => {
    renderModes(modeGrid, run);
    renderAnswer(answerPanel, linkedTask, refresh);
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

  const extraFiles = attachmentField({
    initial: aiState.extraAttachments,
    onChange: (list) => {
      aiState.extraAttachments = list;
    },
  });

  /** Fotos der Aufgabe und zusätzlich angehängte Bilder. */
  function collectAttachments() {
    return [...(linkedTask?.attachments ?? []), ...aiState.extraAttachments];
  }

  async function run(modeId) {
    aiState.mode = modeId;

    const hasImages = collectAttachments().some((entry) => isImageType(entry.type));

    if (!questionField.value.trim() && !hasImages) {
      aiState.error = 'Bitte gib zuerst eine Aufgabe ein, übernimm eine Hausaufgabe oder hänge ein Foto an.';
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
    aiState.notice = null;
    refresh();

    aiState.controller = new AbortController();

    try {
      const result = await requestAiAnswer(
        {
          mode: modeId,
          question: questionField.value.trim(),
          userSolution: solutionField.value.trim(),
          subject: linkedTask?.subject ?? '',
          taskTitle: linkedTask?.title ?? '',
          attachments: collectAttachments(),
        },
        {
          signal: aiState.controller.signal,
          // Die Antwort erscheint, während sie geschrieben wird.
          onText: ({ text }) => {
            aiState.answer = text;
            aiState.answerMode = modeId;
            aiState.streaming = true;
            renderAnswer(answerPanel, linkedTask, refresh);
          },
        },
      );

      aiState.answer = result.content;
      aiState.answerMode = modeId;
      aiState.provider = result.provider;
      aiState.notice = result.notice ?? null;
      aiState.savedFor = null;
    } catch (error) {
      if (error?.code === 'cancelled') {
        aiState.error = null;
      } else {
        aiState.error =
          error instanceof AiError ? error.message : 'Unbekannter Fehler bei der KI-Anfrage. Bitte erneut versuchen.';
        console.error('KI-Anfrage fehlgeschlagen:', error);
      }
    } finally {
      aiState.loading = false;
      aiState.streaming = false;
      aiState.controller = null;
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
        linkedTask?.attachments?.length ? taskAttachments(linkedTask) : null,
        extraFiles.element,
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

function renderAnswer(container, linkedTask, refresh) {
  // Während die Antwort geschrieben wird, ist sie schon zu sehen.
  if (aiState.loading) {
    render(container, [
      el('div', { class: 'ai-loading' }, [
        el('span', { class: 'spinner' }),
        aiState.answer ? 'Claude schreibt …' : `„${getMode(aiState.mode).name}" wird vorbereitet …`,
        el(
          'button',
          {
            class: 'btn btn-ghost btn-sm',
            type: 'button',
            style: { marginLeft: 'auto' },
            text: 'Abbrechen',
            on: { click: () => aiState.controller?.abort() },
          },
        ),
      ]),
      aiState.answer ? el('div', { class: 'ai-content' }, [renderMarkdown(aiState.answer)]) : null,
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
        : el('span', { class: 'badge', data: { tone: 'done' }, text: `✨ ${aiState.provider}` }),
    ]),
    aiState.notice
      ? el('div', { class: 'alert', data: { tone: 'warning' } }, [el('span', { text: aiState.notice })])
      : null,
    el('div', { class: 'ai-content' }, [renderMarkdown(aiState.answer)]),
    saveSolutionBar(linkedTask, refresh),
  ]);
}

/**
 * Speichert die Antwort an der Hausaufgabe. Dadurch taucht sie im Stundenplan
 * bei der Stunde auf, für die die Aufgabe fällig ist.
 */
function saveSolutionBar(linkedTask, refresh) {
  if (!linkedTask) {
    return el('p', {
      class: 'field-hint',
      text: 'Tipp: Übernimm oben eine Hausaufgabe, dann kannst du die Lösung direkt bei ihr speichern.',
    });
  }

  const state = getState();
  const lesson = state.schedule.find((entry) => entry.id === linkedTask.lessonId) ?? null;
  const next = lesson ? null : nextLessonFor(state.schedule, linkedTask.subject);
  const target = lesson
    ? `${lesson.subject} am ${WEEKDAY_NAMES[lesson.day] ?? ''} um ${lesson.start} Uhr`
    : next
      ? `${linkedTask.subject}: ${describeNextLesson(next)}`
      : null;

  const alreadySaved = aiState.savedFor === linkedTask.id;

  return el('div', { class: 'solution-save' }, [
    el(
      'button',
      {
        class: `btn ${alreadySaved ? 'btn-secondary' : 'btn-primary'} btn-sm`,
        type: 'button',
        on: {
          click: () => {
            // Erst den Zustand setzen: updateTask zeichnet die Ansicht sofort neu.
            aiState.savedFor = linkedTask.id;
            updateTask(linkedTask.id, {
              solution: {
                content: aiState.answer,
                mode: aiState.answerMode ?? aiState.mode,
                provider: aiState.provider ?? 'unbekannt',
                savedAt: new Date().toISOString(),
              },
            });
            showToast(
              target ? `Lösung gespeichert – liegt bereit für ${target}.` : 'Lösung bei der Aufgabe gespeichert.',
              { tone: 'success' },
            );
            refresh?.();
          },
        },
      },
      [alreadySaved ? '✓ Lösung gespeichert' : '💾 Lösung bei der Aufgabe speichern'],
    ),
    target
      ? el('span', { class: 'field-hint', text: `Erscheint im Stundenplan bei: ${target}` })
      : el('span', { class: 'field-hint', text: 'Die Aufgabe ist keiner Stunde zugeordnet.' }),
  ]);
}

const WEEKDAY_NAMES = { 1: 'Montag', 2: 'Dienstag', 3: 'Mittwoch', 4: 'Donnerstag', 5: 'Freitag' };

/** Fotos, die bereits an der Hausaufgabe hängen. */
function taskAttachments(task) {
  return el('div', { class: 'field' }, [
    el('span', { class: 'field-label', text: 'Fotos dieser Hausaufgabe' }),
    el('div', { class: 'attachment-list' }, task.attachments.map((attachment) => attachmentThumb(attachment))),
    el('p', { class: 'field-hint', text: 'Diese Bilder werden bei jeder Anfrage mitgeschickt.' }),
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
  const text = status.viaPlatform
    ? '✨ Claude beantwortet deine Aufgaben'
    : status.configured
      ? `✨ ${status.label ?? status.provider}${status.model ? ` · ${status.model}` : ''}`
      : 'Demo-Modus – keine KI angebunden';

  return el('span', {
    class: 'badge',
    data: { tone: status.configured ? 'done' : 'today' },
    style: { marginLeft: 'auto' },
    title: status.viaPlatform
      ? 'Die Anfragen laufen über dein Claude-Konto. Beim ersten Mal fragt Claude um Erlaubnis.'
      : undefined,
    text,
  });
}
