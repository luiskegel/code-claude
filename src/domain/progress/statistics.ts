import { getCharMap, statKeyForChar } from '../keyboard/keyMap';
import type { KeyboardLayout } from '../keyboard/layouts';
import { ALL_COURSE_CHARS, getAllowedChars, getLessonIndex } from '../lessons/catalog';
import { LESSONS } from '../lessons/curriculum';
import { MODULES } from '../lessons/modules';
import type { LessonModule } from '../lessons/types';
import type { CharStat } from '../typing/engine';
import { average, calculateAccuracy } from '../typing/metrics';
import type { ExerciseResult, ProgressState } from './types';

/** Anzahl der letzten Übungen für „aktuelle“ Durchschnittswerte. */
export const RECENT_WINDOW = 10;
/** Anzahl der letzten Übungen für Fehleranalyse und Tastenbeherrschung. */
export const KEY_STATS_WINDOW = 20;

export const MASTERED_MIN_ATTEMPTS = 20;
export const MASTERED_MIN_ACCURACY = 95;
export const WEAK_MIN_ATTEMPTS = 10;
export const WEAK_MAX_ACCURACY = 90;

const WEAK_CHAR_MIN_MISSES = 2;
const ADAPTIVE_MIN_ATTEMPTS = 8;
const ADAPTIVE_MIN_ERROR_RATE = 0.03;
const ADAPTIVE_MASTERED_MIN_ATTEMPTS = 30;
const ADAPTIVE_MASTERED_MAX_ERROR_RATE = 0.01;
const ADAPTIVE_MASTERED_WEIGHT = 0.7;
const ADAPTIVE_ERROR_FACTOR = 15;
const ADAPTIVE_MAX_BOOST = 2;

// ── Durchschnitte und Zusammenfassungen ─────────────────────────────────

export function getAverageWpm(progress: ProgressState): number | null {
  const { exercises, wpmSum } = progress.totals;
  return exercises > 0 ? wpmSum / exercises : null;
}

export function getAverageAccuracy(progress: ProgressState): number | null {
  const { exercises, accuracySum } = progress.totals;
  return exercises > 0 ? accuracySum / exercises : null;
}

export function getRecentAverage(
  history: readonly ExerciseResult[],
  field: 'wpm' | 'accuracy',
  count = RECENT_WINDOW,
): number | null {
  return average(history.slice(-count).map((result) => result[field]));
}

export function getLastResult(progress: ProgressState): ExerciseResult | undefined {
  return progress.history.at(-1);
}

export function getPassedLessonCount(progress: ProgressState): number {
  return LESSONS.filter((lesson) => progress.lessons[lesson.id]?.passed).length;
}

export interface ModuleProgress {
  module: LessonModule;
  passed: number;
  total: number;
}

export function getModuleProgress(progress: ProgressState): ModuleProgress[] {
  return MODULES.map((module) => {
    const lessons = LESSONS.filter((lesson) => lesson.moduleId === module.id);
    return {
      module,
      passed: lessons.filter((lesson) => progress.lessons[lesson.id]?.passed).length,
      total: lessons.length,
    };
  });
}

// ── Zeichen- und Tastenstatistik ────────────────────────────────────────

export function aggregateCharStats(
  history: readonly ExerciseResult[],
  window = KEY_STATS_WINDOW,
): Map<string, CharStat> {
  const totals = new Map<string, CharStat>();
  for (const result of history.slice(-window)) {
    for (const [char, stat] of Object.entries(result.charStats)) {
      const key = statKeyForChar(char);
      const current = totals.get(key) ?? { hits: 0, misses: 0 };
      totals.set(key, { hits: current.hits + stat.hits, misses: current.misses + stat.misses });
    }
  }
  return totals;
}

export interface WeakChar {
  char: string;
  misses: number;
  attempts: number;
  errorRate: number;
}

/** Zeichen mit den meisten Fehlern in den letzten Übungen. */
export function getWeakChars(
  history: readonly ExerciseResult[],
  limit = 6,
  window = KEY_STATS_WINDOW,
): WeakChar[] {
  return [...aggregateCharStats(history, window)]
    .map(([char, stat]) => {
      const attempts = stat.hits + stat.misses;
      return {
        char,
        misses: stat.misses,
        attempts,
        errorRate: attempts > 0 ? stat.misses / attempts : 0,
      };
    })
    .filter((entry) => entry.misses >= WEAK_CHAR_MIN_MISSES)
    .sort(
      (a, b) => b.misses - a.misses || b.errorRate - a.errorRate || a.char.localeCompare(b.char),
    )
    .slice(0, limit);
}

/**
 * Gewichte für adaptive Übungen: Fehlerzeichen kommen häufiger vor,
 * sicher beherrschte Zeichen werden seltener isoliert geübt.
 */
export function computeCharWeights(history: readonly ExerciseResult[]): Map<string, number> {
  const weights = new Map<string, number>();
  for (const [char, stat] of aggregateCharStats(history)) {
    const attempts = stat.hits + stat.misses;
    if (attempts < ADAPTIVE_MIN_ATTEMPTS || char === ' ') continue;
    const errorRate = stat.misses / attempts;
    if (errorRate >= ADAPTIVE_MIN_ERROR_RATE) {
      weights.set(char, 1 + Math.min(ADAPTIVE_MAX_BOOST, errorRate * ADAPTIVE_ERROR_FACTOR));
    } else if (
      attempts >= ADAPTIVE_MASTERED_MIN_ATTEMPTS &&
      errorRate <= ADAPTIVE_MASTERED_MAX_ERROR_RATE
    ) {
      weights.set(char, ADAPTIVE_MASTERED_WEIGHT);
    }
  }
  return weights;
}

/**
 * Bereits eingeführte Zeichen: alle Zeichen bis zur weitesten geübten Lektion.
 * (Der Lehrplan baut kumulativ auf.)
 */
export function getLearnedChars(progress: ProgressState): Set<string> {
  let furthest = -1;
  for (const [lessonId, lessonProgress] of Object.entries(progress.lessons)) {
    if (lessonProgress.attempts <= 0) continue;
    furthest = Math.max(furthest, getLessonIndex(lessonId));
  }
  return furthest === -1 ? new Set() : new Set(getAllowedChars(furthest));
}

export type MasteryLevel = 'locked' | 'learning' | 'weak' | 'mastered';

export interface KeyMastery {
  keyId: string;
  /** Normalisierte Zeichen dieser Taste, z. B. ["ß", "?"] */
  chars: string[];
  level: MasteryLevel;
  attempts: number;
  accuracy: number | null;
}

/** Beherrschungsgrad je Taste – verbindet Statistik mit der virtuellen Tastatur. */
export function getKeyMastery(progress: ProgressState, layout: KeyboardLayout): KeyMastery[] {
  const charMap = getCharMap(layout);
  const stats = aggregateCharStats(progress.history);
  const learned = new Set([...getLearnedChars(progress)].map(statKeyForChar));

  const charsByKey = new Map<string, Set<string>>();
  for (const char of ALL_COURSE_CHARS) {
    const stroke = charMap.get(char);
    if (!stroke) continue;
    const set = charsByKey.get(stroke.key.id) ?? new Set<string>();
    set.add(statKeyForChar(char));
    charsByKey.set(stroke.key.id, set);
  }

  return [...charsByKey].map(([keyId, charSet]) => {
    const chars = [...charSet];
    let hits = 0;
    let misses = 0;
    for (const char of chars) {
      const stat = stats.get(char);
      if (stat) {
        hits += stat.hits;
        misses += stat.misses;
      }
    }
    const attempts = hits + misses;
    const accuracy = attempts > 0 ? calculateAccuracy(hits, attempts) : null;
    let level: MasteryLevel = 'locked';
    if (
      accuracy !== null &&
      attempts >= MASTERED_MIN_ATTEMPTS &&
      accuracy >= MASTERED_MIN_ACCURACY
    ) {
      level = 'mastered';
    } else if (accuracy !== null && attempts >= WEAK_MIN_ATTEMPTS && accuracy < WEAK_MAX_ACCURACY) {
      level = 'weak';
    } else if (attempts > 0 || chars.some((char) => learned.has(char))) {
      level = 'learning';
    }
    return { keyId, chars, level, attempts, accuracy };
  });
}

export interface ChartPoint {
  index: number;
  resultId: string;
  lessonId: string;
  completedAt: string;
  wpm: number;
  accuracy: number;
}

export function getChartSeries(history: readonly ExerciseResult[], count = 30): ChartPoint[] {
  return history.slice(-count).map((result, index) => ({
    index,
    resultId: result.id,
    lessonId: result.lessonId,
    completedAt: result.completedAt,
    wpm: result.wpm,
    accuracy: result.accuracy,
  }));
}
