import { describe, expect, it } from 'vitest';
import { makeResult } from '../../test/factories';
import { KEYBOARD_LAYOUTS } from '../keyboard/layouts';
import { createEmptyLessonProgress, createEmptyProgress } from './progress';
import {
  computeCharWeights,
  getAverageWpm,
  getKeyMastery,
  getLearnedChars,
  getModuleProgress,
  getPassedLessonCount,
  getRecentAverage,
  getWeakChars,
} from './statistics';
import type { ProgressState } from './types';

function progressWith(overrides: Partial<ProgressState>): ProgressState {
  return { ...createEmptyProgress(), ...overrides };
}

describe('Durchschnitte', () => {
  it('liefert null ohne Übungen', () => {
    const progress = createEmptyProgress();
    expect(getAverageWpm(progress)).toBeNull();
    expect(getRecentAverage(progress.history, 'wpm')).toBeNull();
  });

  it('berechnet Gesamt- und Kurzzeitdurchschnitt', () => {
    const history = [10, 20, 30, 40].map((wpm) => makeResult({ wpm }));
    const progress = progressWith({
      history,
      totals: { ...createEmptyProgress().totals, exercises: 4, wpmSum: 100 },
    });
    expect(getAverageWpm(progress)).toBe(25);
    expect(getRecentAverage(history, 'wpm', 2)).toBe(35);
  });
});

describe('Fehleranalyse', () => {
  const history = [
    makeResult({ charStats: { s: { hits: 30, misses: 5 }, k: { hits: 10, misses: 3 } } }),
    makeResult({
      charStats: {
        s: { hits: 30, misses: 3 },
        ü: { hits: 4, misses: 4 },
        a: { hits: 40, misses: 1 },
      },
    }),
  ];

  it('listet die häufigsten Fehler absteigend', () => {
    const weak = getWeakChars(history);
    expect(weak.map((entry) => [entry.char, entry.misses])).toEqual([
      ['s', 8],
      ['ü', 4],
      ['k', 3],
    ]);
    expect(weak[1]?.errorRate).toBe(0.5);
  });

  it('gewichtet Fehlerzeichen stärker und sichere Zeichen schwächer', () => {
    // „a“: 1 Fehler bei 141 Anschlägen (< 1 %) → gilt als sicher
    const weights = computeCharWeights([
      ...history,
      makeResult({ charStats: { a: { hits: 100, misses: 0 } } }),
    ]);
    expect(weights.get('ü')).toBe(3);
    expect(weights.get('s')).toBeGreaterThan(1);
    expect(weights.get('a')).toBeLessThan(1);
  });

  it('berücksichtigt nur die letzten Übungen', () => {
    const old = makeResult({ charStats: { x: { hits: 0, misses: 9 } } });
    const recent = Array.from({ length: 20 }, () =>
      makeResult({ charStats: { a: { hits: 5, misses: 0 } } }),
    );
    expect(getWeakChars([old, ...recent])).toEqual([]);
  });
});

describe('Lernstand', () => {
  it('zählt abgeschlossene Lektionen und Module', () => {
    const progress = progressWith({
      lessons: {
        grundstellung: { ...createEmptyLessonProgress(), attempts: 1, passed: true },
        'f-j': { ...createEmptyLessonProgress(), attempts: 2, passed: true },
        asdf: { ...createEmptyLessonProgress(), attempts: 1, passed: false },
      },
    });
    expect(getPassedLessonCount(progress)).toBe(2);
    const basics = getModuleProgress(progress)[0];
    expect(basics).toMatchObject({ passed: 2, total: 6 });
  });

  it('leitet gelernte Zeichen aus der weitesten geübten Lektion ab', () => {
    expect(getLearnedChars(createEmptyProgress()).size).toBe(0);
    const progress = progressWith({
      lessons: { asdf: { ...createEmptyLessonProgress(), attempts: 1 } },
    });
    expect([...getLearnedChars(progress)].sort()).toEqual([' ', 'a', 'd', 'f', 'j', 's']);
  });

  it('bestimmt die Beherrschung je Taste', () => {
    const progress = progressWith({
      lessons: { 'g-h': { ...createEmptyLessonProgress(), attempts: 1 } },
      history: [
        makeResult({
          charStats: {
            a: { hits: 40, misses: 1 },
            s: { hits: 12, misses: 4 },
            d: { hits: 3, misses: 0 },
          },
        }),
      ],
    });
    const mastery = new Map(
      getKeyMastery(progress, KEYBOARD_LAYOUTS['apple-de']).map((entry) => [entry.keyId, entry]),
    );
    expect(mastery.get('KeyA')?.level).toBe('mastered');
    expect(mastery.get('KeyS')?.level).toBe('weak');
    expect(mastery.get('KeyD')?.level).toBe('learning');
    expect(mastery.get('KeyH')?.level).toBe('learning');
    expect(mastery.get('KeyQ')?.level).toBe('locked');
    expect(mastery.get('Minus')?.chars.sort()).toEqual(['?', 'ß']);
  });
});
