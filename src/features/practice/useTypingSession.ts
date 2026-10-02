import { useEffect, useEffectEvent, useState, useSyncExternalStore } from 'react';
import type { Exercise } from '../../domain/exercise/generator';
import {
  createSession,
  deleteBackward,
  finishSession,
  isTimeUp,
  pauseSession,
  summarizeSession,
  typeChar,
  type ErrorMode,
  type SessionSummary,
  type TypingSessionState,
} from '../../domain/typing/engine';

/** Kleiner, synchroner Store je Übung: Jeder Anschlag wird sofort verarbeitet – auch bei sehr schnellem Tippen. */
interface SessionStore {
  get(): TypingSessionState;
  set(next: TypingSessionState): void;
  subscribe(listener: () => void): () => void;
}

function createSessionStore(initial: TypingSessionState): SessionStore {
  let state = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    set(next) {
      if (next === state) return;
      state = next;
      for (const listener of listeners) listener();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export interface KeystrokeFeedback {
  char: string;
  correct: boolean;
}

interface UseTypingSessionOptions {
  exercise: Exercise;
  errorMode: ErrorMode;
  onFinish: (summary: SessionSummary) => void;
  onKeystroke?: (feedback: KeystrokeFeedback) => void;
}

const TICK_MS = 200;

function now(): number {
  return performance.now();
}

export function useTypingSession({
  exercise,
  errorMode,
  onFinish,
  onKeystroke,
}: UseTypingSessionOptions) {
  const [store] = useState(() =>
    createSessionStore(
      createSession(exercise.text, {
        mode: errorMode,
        timeLimitMs: exercise.timeLimitSec !== undefined ? exercise.timeLimitSec * 1000 : null,
      }),
    ),
  );
  const state = useSyncExternalStore(store.subscribe, store.get, store.get);
  const [clock, setClock] = useState(0);

  /** Übernimmt einen neuen Zustand und löst bei Abschluss genau einmal onFinish aus. */
  const commit = (next: TypingSessionState, time: number) => {
    const previous = store.get();
    store.set(next);
    if (next.keystrokes > previous.keystrokes && onKeystroke) {
      onKeystroke({
        char: next.lastError?.typed ?? next.chars[next.cursor - 1] ?? '',
        correct: next.lastError === null,
      });
    }
    if (previous.status !== 'finished' && next.status === 'finished') {
      onFinish(summarizeSession(next, time));
    }
  };

  const typeCharacter = (char: string) => {
    const time = now();
    commit(typeChar(store.get(), char, time), time);
  };

  const backspace = (wholeWord: boolean) => {
    const time = now();
    commit(deleteBackward(store.get(), time, wholeWord), time);
  };

  const pause = () => {
    store.set(pauseSession(store.get(), now()));
  };

  const onTick = useEffectEvent(() => {
    const time = now();
    const current = store.get();
    setClock(time);
    if (isTimeUp(current, time)) commit(finishSession(current, time), time);
  });

  const onHidden = useEffectEvent(() => {
    if (document.visibilityState === 'hidden') store.set(pauseSession(store.get(), now()));
  });

  // Countdown für Zeitübungen – nur solange die Übung läuft.
  const timed = state.timeLimitMs !== null;
  const running = state.status === 'running';
  useEffect(() => {
    if (!timed || !running) return;
    const interval = window.setInterval(() => onTick(), TICK_MS);
    return () => window.clearInterval(interval);
  }, [timed, running]);

  // Tab im Hintergrund → Pause, damit die Zeit nicht weiterläuft.
  useEffect(() => {
    const handler = () => onHidden();
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  return { state, clock, typeCharacter, backspace, pause };
}
