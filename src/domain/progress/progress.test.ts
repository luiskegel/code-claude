import { describe, expect, it } from 'vitest';
import { makeSummary } from '../../test/factories';
import { MAX_PLAUSIBLE_WPM } from '../typing/metrics';
import {
  applyExerciseResult,
  buildExerciseResult,
  createEmptyProgress,
  MAX_HISTORY,
} from './progress';
import type { ProgressState } from './types';

function complete(
  progress: ProgressState,
  lessonId: string,
  summaryOverrides = {},
  completedAt = new Date(2026, 4, 1, 18, 30),
) {
  const built = buildExerciseResult({
    exercise: { id: `${lessonId}-x`, lessonId },
    summary: makeSummary(summaryOverrides),
    completedAt,
  });
  return applyExerciseResult(progress, built);
}

describe('Übungsabschluss', () => {
  it('speichert ein vollständiges Ergebnis mit lokalem Kalendertag', () => {
    const { result } = buildExerciseResult({
      exercise: { id: 'asdf-1', lessonId: 'asdf' },
      summary: makeSummary({ wpm: 21.456, accuracy: 96.1538 }),
      completedAt: new Date(2026, 4, 1, 23, 59),
    });
    expect(result.localDate).toBe('2026-05-01');
    expect(result.wpm).toBe(21.46);
    expect(result.accuracy).toBe(96.15);
    expect(result.passed).toBe(true);
    expect(result.origin).toBe('lesson');
  });

  it('markiert die Lektion als abgeschlossen und schaltet die nächste frei', () => {
    const { progress, outcome } = complete(createEmptyProgress(), 'grundstellung', {
      accuracy: 85,
    });
    expect(progress.lessons.grundstellung?.passed).toBe(true);
    expect(progress.lessons.grundstellung?.attempts).toBe(1);
    expect(outcome.newlyPassed).toBe(true);
    expect(outcome.unlockedLessonId).toBe('f-j');
    expect(progress.lastLessonId).toBe('grundstellung');
  });

  it('bleibt bei zu geringer Genauigkeit offen, zählt aber den Versuch', () => {
    const { progress, outcome } = complete(createEmptyProgress(), 'asdf', { accuracy: 80 });
    expect(progress.lessons.asdf?.passed).toBe(false);
    expect(progress.lessons.asdf?.attempts).toBe(1);
    expect(outcome.newlyPassed).toBe(false);
    expect(outcome.unlockedLessonId).toBeNull();
    expect(outcome.evaluation?.failures).toEqual(['accuracy']);
  });

  it('verliert den Abschluss durch einen schlechteren Versuch nicht', () => {
    let state = complete(createEmptyProgress(), 'asdf', { accuracy: 98 }).progress;
    state = complete(state, 'asdf', { accuracy: 50 }).progress;
    expect(state.lessons.asdf?.passed).toBe(true);
    expect(state.lessons.asdf?.attempts).toBe(2);
    expect(state.lessons.asdf?.bestAccuracy).toBe(98);
  });

  it('aktualisiert Summen, Durchschnittsbasis und Übungszeit', () => {
    let state = complete(createEmptyProgress(), 'asdf', {
      wpm: 20,
      accuracy: 90,
      durationMs: 30_000,
    }).progress;
    state = complete(state, 'asdf', { wpm: 30, accuracy: 100, durationMs: 45_000 }).progress;
    expect(state.totals.exercises).toBe(2);
    expect(state.totals.practiceMs).toBe(75_000);
    expect(state.totals.wpmSum).toBe(50);
    expect(state.totals.accuracySum).toBe(190);
  });

  it('setzt Bestwerte nur bei ausreichend langen Übungen', () => {
    const short = complete(createEmptyProgress(), 'grundstellung', { typedChars: 31, wpm: 90 });
    expect(short.progress.records.bestWpm).toBeNull();
    expect(short.outcome.isNewBestWpm).toBe(false);

    const long = complete(short.progress, 'asdf', { typedChars: 92, wpm: 25 });
    expect(long.progress.records.bestWpm).toBe(25);
    expect(long.outcome.isNewBestWpm).toBe(true);

    const slower = complete(long.progress, 'asdf', { typedChars: 92, wpm: 20 });
    expect(slower.progress.records.bestWpm).toBe(25);
    expect(slower.outcome.isNewBestWpm).toBe(false);
  });

  it('lässt unmögliche Geschwindigkeiten keine Bestwerte setzen', () => {
    const real = complete(createEmptyProgress(), 'asdf', { typedChars: 92, wpm: 48 });
    const impossible = complete(real.progress, 'asdf', { typedChars: 92, wpm: 1800 });
    expect(impossible.outcome.isNewBestWpm).toBe(false);
    expect(impossible.progress.records.bestWpm).toBe(48);
    expect(impossible.progress.lessons.asdf?.bestWpm).toBe(48);
    // Das Ergebnis selbst bleibt nachvollziehbar im Verlauf.
    expect(impossible.progress.history.at(-1)?.wpm).toBe(1800);

    const fastHuman = complete(real.progress, 'asdf', { typedChars: 92, wpm: MAX_PLAUSIBLE_WPM });
    expect(fastHuman.outcome.isNewBestWpm).toBe(true);
  });

  it('aktualisiert den Streak beim Abschluss', () => {
    let { progress } = complete(createEmptyProgress(), 'asdf', {}, new Date(2026, 4, 1, 12));
    progress = complete(progress, 'asdf', {}, new Date(2026, 4, 2, 0, 5)).progress;
    expect(progress.streak.current).toBe(2);
    expect(progress.streak.lastPracticeDate).toBe('2026-05-02');
  });

  it('speichert Wiederholungsübungen ohne Lektionsfortschritt', () => {
    const { progress, outcome } = complete(createEmptyProgress(), 'wiederholen');
    expect(outcome.result.origin).toBe('review');
    expect(outcome.result.passed).toBe(false);
    expect(progress.lessons).toEqual({});
    expect(progress.history).toHaveLength(1);
    expect(progress.totals.exercises).toBe(1);
  });

  it('begrenzt den Verlauf, behält aber die Summen', () => {
    let state = createEmptyProgress();
    for (let index = 0; index < MAX_HISTORY + 5; index++) {
      state = complete(state, 'asdf').progress;
    }
    expect(state.history).toHaveLength(MAX_HISTORY);
    expect(state.totals.exercises).toBe(MAX_HISTORY + 5);
  });
});
