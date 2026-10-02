import type { Exercise } from '../exercise/generator';
import { getLessonById, getNextLesson } from '../lessons/catalog';
import { evaluateLessonPass, type PassEvaluation } from '../lessons/unlock';
import type { SessionSummary } from '../typing/engine';
import { RECORD_MIN_CHARS } from '../typing/metrics';
import { toLocalDateKey } from './dates';
import { EMPTY_STREAK, recordPracticeDay } from './streak';
import {
  PROGRESS_VERSION,
  type ExerciseResult,
  type LessonProgress,
  type ProgressState,
  type StreakState,
} from './types';

/** Maximale Länge des gespeicherten Verlaufs. Summen und Rekorde bleiben trotzdem vollständig. */
export const MAX_HISTORY = 300;

export function createEmptyProgress(): ProgressState {
  return {
    version: PROGRESS_VERSION,
    lessons: {},
    history: [],
    totals: {
      exercises: 0,
      practiceMs: 0,
      keystrokes: 0,
      correctKeystrokes: 0,
      wpmSum: 0,
      accuracySum: 0,
    },
    records: { bestWpm: null, bestAccuracy: null },
    streak: EMPTY_STREAK,
    lastLessonId: null,
  };
}

export function createEmptyLessonProgress(): LessonProgress {
  return {
    attempts: 0,
    passed: false,
    bestWpm: null,
    bestAccuracy: null,
    lastPracticedAt: null,
    passedAt: null,
  };
}

/** Zählt die Übung für Bestwerte? Sehr kurze Übungen würden Rekorde verzerren. */
export function qualifiesForRecords(result: Pick<ExerciseResult, 'typedChars'>): boolean {
  return result.typedChars >= RECORD_MIN_CHARS;
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export interface CompletedExercise {
  exercise: Pick<Exercise, 'id' | 'lessonId' | 'timeLimitSec'>;
  summary: SessionSummary;
  completedAt: Date;
}

export interface BuiltResult {
  result: ExerciseResult;
  evaluation: PassEvaluation | null;
}

/** Erstellt den speicherbaren Datensatz und bewertet, ob die Lektion bestanden ist. */
export function buildExerciseResult({
  exercise,
  summary,
  completedAt,
}: CompletedExercise): BuiltResult {
  const lesson = getLessonById(exercise.lessonId);
  const evaluation = lesson ? evaluateLessonPass(lesson, summary) : null;
  const result: ExerciseResult = {
    id: `${exercise.id}-${completedAt.getTime().toString(36)}`,
    lessonId: exercise.lessonId,
    origin: lesson ? 'lesson' : 'review',
    completedAt: completedAt.toISOString(),
    localDate: toLocalDateKey(completedAt),
    durationMs: Math.round(summary.durationMs),
    textLength: summary.textLength,
    typedChars: summary.typedChars,
    correctChars: summary.correctChars,
    keystrokes: summary.keystrokes,
    correctKeystrokes: summary.correctKeystrokes,
    errors: summary.errors,
    wpm: round(summary.wpm, 2),
    accuracy: round(summary.accuracy, 2),
    passed: evaluation?.passed ?? false,
    timed: exercise.timeLimitSec !== undefined,
    charStats: summary.charStats,
  };
  return { result, evaluation };
}

export interface ResultOutcome {
  result: ExerciseResult;
  evaluation: PassEvaluation | null;
  isNewBestWpm: boolean;
  isNewBestAccuracy: boolean;
  previousLessonBestWpm: number | null;
  previousLessonBestAccuracy: number | null;
  newlyPassed: boolean;
  /** Lektion, die durch dieses Ergebnis neu freigeschaltet wurde */
  unlockedLessonId: string | null;
  streakBefore: StreakState;
  streakAfter: StreakState;
}

function maxOrNull(current: number | null, candidate: number, allowed: boolean): number | null {
  if (!allowed) return current;
  return current === null ? candidate : Math.max(current, candidate);
}

/** Wendet ein Ergebnis auf den Fortschritt an (rein funktional). */
export function applyExerciseResult(
  progress: ProgressState,
  built: BuiltResult,
): { progress: ProgressState; outcome: ResultOutcome } {
  const { result, evaluation } = built;
  const qualifies = qualifiesForRecords(result);
  const lesson = getLessonById(result.lessonId);

  let lessons = progress.lessons;
  let previousLessonBestWpm: number | null = null;
  let previousLessonBestAccuracy: number | null = null;
  let newlyPassed = false;
  let unlockedLessonId: string | null = null;

  if (lesson) {
    const before = progress.lessons[lesson.id] ?? createEmptyLessonProgress();
    previousLessonBestWpm = before.bestWpm;
    previousLessonBestAccuracy = before.bestAccuracy;
    newlyPassed = result.passed && !before.passed;
    const after: LessonProgress = {
      attempts: before.attempts + 1,
      passed: before.passed || result.passed,
      bestWpm: maxOrNull(before.bestWpm, result.wpm, true),
      bestAccuracy: maxOrNull(before.bestAccuracy, result.accuracy, true),
      lastPracticedAt: result.completedAt,
      passedAt: before.passedAt ?? (result.passed ? result.completedAt : null),
    };
    lessons = { ...progress.lessons, [lesson.id]: after };
    if (newlyPassed) {
      const next = getNextLesson(lesson.id);
      if (next && !progress.lessons[next.id]?.passed) unlockedLessonId = next.id;
    }
  }

  const isNewBestWpm =
    qualifies && (progress.records.bestWpm === null || result.wpm > progress.records.bestWpm);
  const isNewBestAccuracy =
    qualifies &&
    (progress.records.bestAccuracy === null || result.accuracy > progress.records.bestAccuracy);

  const streakAfter = recordPracticeDay(progress.streak, result.localDate);
  const history = [...progress.history, result].slice(-MAX_HISTORY);

  const next: ProgressState = {
    ...progress,
    lessons,
    history,
    totals: {
      exercises: progress.totals.exercises + 1,
      practiceMs: progress.totals.practiceMs + result.durationMs,
      keystrokes: progress.totals.keystrokes + result.keystrokes,
      correctKeystrokes: progress.totals.correctKeystrokes + result.correctKeystrokes,
      wpmSum: progress.totals.wpmSum + result.wpm,
      accuracySum: progress.totals.accuracySum + result.accuracy,
    },
    records: {
      bestWpm: maxOrNull(progress.records.bestWpm, result.wpm, qualifies),
      bestAccuracy: maxOrNull(progress.records.bestAccuracy, result.accuracy, qualifies),
    },
    streak: streakAfter,
    lastLessonId: lesson ? lesson.id : progress.lastLessonId,
  };

  return {
    progress: next,
    outcome: {
      result,
      evaluation,
      isNewBestWpm,
      isNewBestAccuracy,
      previousLessonBestWpm,
      previousLessonBestAccuracy,
      newlyPassed,
      unlockedLessonId,
      streakBefore: progress.streak,
      streakAfter,
    },
  };
}
