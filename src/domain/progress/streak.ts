import { daysBetween } from './dates';
import type { StreakState } from './types';

export const EMPTY_STREAK: StreakState = { current: 0, longest: 0, lastPracticeDate: null };

/**
 * Aktualisiert den Streak nach einer abgeschlossenen Übung am Kalendertag `date`.
 * - gleicher Tag: unverändert
 * - Folgetag: +1
 * - Lücke: Neustart bei 1
 * - Datum in der Vergangenheit (z. B. Uhr zurückgestellt): unverändert
 */
export function recordPracticeDay(streak: StreakState, date: string): StreakState {
  if (streak.lastPracticeDate === null) {
    return { current: 1, longest: Math.max(streak.longest, 1), lastPracticeDate: date };
  }
  const diff = daysBetween(streak.lastPracticeDate, date);
  if (diff <= 0) return streak;
  const current = diff === 1 ? streak.current + 1 : 1;
  return { current, longest: Math.max(streak.longest, current), lastPracticeDate: date };
}

/** Der Streak, wie er heute gilt: Er bleibt bis zum Ende des Folgetags erhalten. */
export function getActiveStreak(streak: StreakState, today: string): number {
  if (streak.lastPracticeDate === null) return 0;
  const diff = daysBetween(streak.lastPracticeDate, today);
  if (diff < 0) return streak.current;
  return diff <= 1 ? streak.current : 0;
}

/** Wurde heute bereits geübt? */
export function hasPracticedToday(streak: StreakState, today: string): boolean {
  return streak.lastPracticeDate !== null && daysBetween(streak.lastPracticeDate, today) <= 0;
}
