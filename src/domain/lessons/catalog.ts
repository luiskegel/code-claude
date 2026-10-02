import { getKeyStroke } from '../keyboard/keyMap';
import type { KeyboardLayout } from '../keyboard/layouts';
import { LESSONS } from './curriculum';
import { MODULES } from './modules';
import type { Lesson, LessonModule, ModuleId } from './types';

export const TOTAL_LESSONS = LESSONS.length;

const lessonIndexById = new Map(LESSONS.map((lesson, index) => [lesson.id, index]));

export function getLessonById(id: string): Lesson | undefined {
  const index = lessonIndexById.get(id);
  return index === undefined ? undefined : LESSONS[index];
}

/** Index im Lehrplan oder -1, wenn die ID unbekannt ist. */
export function getLessonIndex(id: string): number {
  return lessonIndexById.get(id) ?? -1;
}

export function getLessonAt(index: number): Lesson | undefined {
  return LESSONS[index];
}

export function getNextLesson(id: string): Lesson | undefined {
  const index = getLessonIndex(id);
  return index === -1 ? undefined : LESSONS[index + 1];
}

export function getPreviousLesson(id: string): Lesson | undefined {
  const index = getLessonIndex(id);
  return index <= 0 ? undefined : LESSONS[index - 1];
}

export function getLessonsByModule(moduleId: ModuleId): Lesson[] {
  return LESSONS.filter((lesson) => lesson.moduleId === moduleId);
}

export function getModulesWithLessons(): { module: LessonModule; lessons: Lesson[] }[] {
  return MODULES.map((module) => ({ module, lessons: getLessonsByModule(module.id) }));
}

/** Kumulierte Zeichen, die bis einschließlich einer Lektion eingeführt wurden. */
const allowedCharsByIndex: readonly ReadonlySet<string>[] = (() => {
  const result: Set<string>[] = [];
  const cumulative = new Set<string>();
  for (const lesson of LESSONS) {
    for (const char of lesson.newChars) cumulative.add(char);
    result.push(new Set(cumulative));
  }
  return result;
})();

export function getAllowedChars(lessonIndex: number): ReadonlySet<string> {
  const clamped = Math.min(Math.max(lessonIndex, 0), allowedCharsByIndex.length - 1);
  return allowedCharsByIndex[clamped] ?? new Set();
}

/** Alle Zeichen, die im gesamten Kurs vorkommen. */
export const ALL_COURSE_CHARS: ReadonlySet<string> = getAllowedChars(LESSONS.length - 1);

/** Tasten, die in der Einführung einer Lektion hervorgehoben werden. */
export function getIntroKeyIds(lesson: Lesson, layout: KeyboardLayout): string[] {
  if (lesson.introKeyIds) return [...lesson.introKeyIds];
  const chars = lesson.newChars.length > 0 ? lesson.newChars : lesson.focusChars;
  const ids = new Set<string>();
  for (const char of chars) {
    const stroke = getKeyStroke(layout, char);
    if (!stroke) continue;
    ids.add(stroke.key.id);
  }
  return [...ids];
}
