import type { ExerciseResult } from '../domain/progress/types';
import type { SessionSummary } from '../domain/typing/engine';

/** Testdaten-Fabriken für Ergebnisse und Zusammenfassungen. */

export function makeSummary(overrides: Partial<SessionSummary> = {}): SessionSummary {
  return {
    textLength: 100,
    typedChars: 100,
    correctChars: 100,
    keystrokes: 104,
    correctKeystrokes: 100,
    errors: 4,
    durationMs: 60_000,
    wpm: 20,
    accuracy: (100 / 104) * 100,
    charStats: { a: { hits: 20, misses: 2 }, s: { hits: 15, misses: 2 } },
    ...overrides,
  };
}

let counter = 0;

export function makeResult(overrides: Partial<ExerciseResult> = {}): ExerciseResult {
  counter += 1;
  return {
    id: `result-${counter}`,
    lessonId: 'asdf',
    origin: 'lesson',
    completedAt: '2026-05-01T10:00:00.000Z',
    localDate: '2026-05-01',
    durationMs: 60_000,
    textLength: 100,
    typedChars: 100,
    correctChars: 100,
    keystrokes: 104,
    correctKeystrokes: 100,
    errors: 4,
    wpm: 20,
    accuracy: 96.15,
    passed: true,
    timed: false,
    charStats: {},
    ...overrides,
  };
}
