import { describe, expect, it } from 'vitest';
import { createEmptyLessonProgress } from '../progress/progress';
import type { LessonProgress } from '../progress/types';
import type { SessionSummary } from '../typing/engine';
import { getLessonById } from './catalog';
import { LESSONS } from './curriculum';
import {
  evaluateLessonPass,
  getBlockingLesson,
  getRecommendedLesson,
  isLessonUnlocked,
} from './unlock';

function passed(...ids: string[]): Record<string, LessonProgress> {
  return Object.fromEntries(
    ids.map((id) => [id, { ...createEmptyLessonProgress(), attempts: 1, passed: true }]),
  );
}

function summary(overrides: Partial<SessionSummary> = {}): SessionSummary {
  return {
    textLength: 100,
    typedChars: 100,
    correctChars: 98,
    keystrokes: 100,
    correctKeystrokes: 95,
    errors: 5,
    durationMs: 60_000,
    wpm: 19.6,
    accuracy: 95,
    charStats: {},
    ...overrides,
  };
}

describe('Freischaltung', () => {
  it('öffnet nur die erste Lektion für neue Nutzer', () => {
    expect(isLessonUnlocked('grundstellung', {}, false)).toBe(true);
    expect(isLessonUnlocked('f-j', {}, false)).toBe(false);
    expect(isLessonUnlocked('briefe', {}, false)).toBe(false);
  });

  it('schaltet die nächste Lektion nach dem Abschluss frei', () => {
    const lessons = passed('grundstellung');
    expect(isLessonUnlocked('f-j', lessons, false)).toBe(true);
    expect(isLessonUnlocked('asdf', lessons, false)).toBe(false);
  });

  it('lässt abgeschlossene Lektionen jederzeit wiederholen', () => {
    const lessons = passed('grundstellung', 'f-j', 'asdf');
    expect(isLessonUnlocked('grundstellung', lessons, false)).toBe(true);
    expect(isLessonUnlocked('f-j', lessons, false)).toBe(true);
  });

  it('öffnet mit freier Lektionswahl alles', () => {
    for (const lesson of LESSONS) expect(isLessonUnlocked(lesson.id, {}, true)).toBe(true);
  });

  it('nennt die blockierende Lektion', () => {
    expect(getBlockingLesson('asdf', passed('grundstellung'), false)?.id).toBe('f-j');
    expect(getBlockingLesson('f-j', passed('grundstellung'), false)).toBeUndefined();
  });

  it('lehnt unbekannte Lektionen ab', () => {
    expect(isLessonUnlocked('gibt-es-nicht', {}, true)).toBe(false);
  });

  it('empfiehlt die erste offene, nicht abgeschlossene Lektion', () => {
    expect(getRecommendedLesson({}, false)?.id).toBe('grundstellung');
    expect(getRecommendedLesson(passed('grundstellung', 'f-j'), false)?.id).toBe('asdf');
    const all = passed(...LESSONS.map((lesson) => lesson.id));
    expect(getRecommendedLesson(all, false)).toBeUndefined();
  });
});

describe('Bestehen einer Lektion', () => {
  const asdf = getLessonById('asdf')!;
  const sprint = getLessonById('tempo-sprint')!;
  const precise = getLessonById('praezise-saetze')!;

  it('besteht mit ausreichender Genauigkeit', () => {
    expect(evaluateLessonPass(asdf, summary({ accuracy: 90 }))).toEqual({
      passed: true,
      failures: [],
    });
  });

  it('fällt knapp unter der Grenze durch (89,9 % < 90 %)', () => {
    expect(evaluateLessonPass(asdf, summary({ accuracy: 89.9 })).failures).toEqual(['accuracy']);
  });

  it('verlangt in Genauigkeitslektionen höhere Werte', () => {
    expect(evaluateLessonPass(precise, summary({ accuracy: 96 })).passed).toBe(false);
    expect(evaluateLessonPass(precise, summary({ accuracy: 97 })).passed).toBe(true);
  });

  it('verlangt bei Zeitübungen die volle Zeit und ein Mindesttempo', () => {
    expect(
      evaluateLessonPass(sprint, summary({ durationMs: 60_000, correctChars: 200 })).passed,
    ).toBe(true);
    expect(
      evaluateLessonPass(sprint, summary({ durationMs: 30_000, typedChars: 50 })).failures,
    ).toContain('incomplete');
    expect(
      evaluateLessonPass(sprint, summary({ durationMs: 60_000, correctChars: 20 })).failures,
    ).toContain('speed');
  });
});
