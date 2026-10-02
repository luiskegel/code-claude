import type { LessonProgress } from '../progress/types';
import type { SessionSummary } from '../typing/engine';
import { calculateWpm } from '../typing/metrics';
import { LESSONS } from './curriculum';
import { getLessonIndex } from './catalog';
import type { Lesson } from './types';

/** Bei Zeitübungen muss mindestens dieses Tempo erreicht werden – verhindert „Bestehen“ durch Abwarten. */
export const TIMED_MIN_WPM = 10;

export type PassFailureReason = 'accuracy' | 'speed' | 'incomplete';

export interface PassEvaluation {
  passed: boolean;
  failures: PassFailureReason[];
}

/** Prüft, ob eine Übung die Bedingungen der Lektion erfüllt. */
export function evaluateLessonPass(lesson: Lesson, summary: SessionSummary): PassEvaluation {
  const failures: PassFailureReason[] = [];
  if (lesson.timeLimitSec !== undefined) {
    const limitMs = lesson.timeLimitSec * 1000;
    const finishedText = summary.typedChars >= summary.textLength;
    if (summary.durationMs < limitMs && !finishedText) failures.push('incomplete');
    if (calculateWpm(summary.correctChars, Math.max(summary.durationMs, 1)) < TIMED_MIN_WPM) {
      failures.push('speed');
    }
  } else if (summary.typedChars < summary.textLength) {
    failures.push('incomplete');
  }
  if (summary.accuracy < lesson.passAccuracy) failures.push('accuracy');
  return { passed: failures.length === 0, failures };
}

/**
 * Freischaltung: Die erste Lektion ist immer offen, jede weitere nach Abschluss der vorherigen.
 * Mit „freier Lektionswahl“ sind alle Lektionen offen. Abgeschlossene Lektionen bleiben wiederholbar.
 */
export function isLessonUnlocked(
  lessonId: string,
  lessons: Readonly<Record<string, LessonProgress>>,
  freeLessonChoice: boolean,
): boolean {
  const index = getLessonIndex(lessonId);
  if (index === -1) return false;
  if (freeLessonChoice || index === 0) return true;
  if (lessons[lessonId]?.passed) return true;
  const previous = LESSONS[index - 1];
  return previous !== undefined && lessons[previous.id]?.passed === true;
}

/** Die Lektion, die zuerst abgeschlossen werden muss, damit `lessonId` frei wird. */
export function getBlockingLesson(
  lessonId: string,
  lessons: Readonly<Record<string, LessonProgress>>,
  freeLessonChoice: boolean,
): Lesson | undefined {
  if (isLessonUnlocked(lessonId, lessons, freeLessonChoice)) return undefined;
  const index = getLessonIndex(lessonId);
  return index > 0 ? LESSONS[index - 1] : undefined;
}

/** Nächste empfohlene Lektion: die erste freigeschaltete, die noch nicht abgeschlossen ist. */
export function getRecommendedLesson(
  lessons: Readonly<Record<string, LessonProgress>>,
  freeLessonChoice: boolean,
): Lesson | undefined {
  return LESSONS.find(
    (lesson) =>
      !lessons[lesson.id]?.passed && isLessonUnlocked(lesson.id, lessons, freeLessonChoice),
  );
}
