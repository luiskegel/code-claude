import { REVIEW_EXERCISE_ID } from '../../domain/exercise/generator';
import { getLessonById } from '../../domain/lessons/catalog';
import type { ExerciseKind, Lesson } from '../../domain/lessons/types';

/** Lesbarer Name einer Übung im Verlauf. */
export function exerciseLabel(lessonId: string): string {
  if (lessonId === REVIEW_EXERCISE_ID) return 'Fehler wiederholen';
  const lesson = getLessonById(lessonId);
  return lesson ? `Lektion ${lesson.number} · ${lesson.title}` : 'Übung';
}

const KIND_LABELS: Record<ExerciseKind, string> = {
  fixed: 'Einstieg',
  keys: 'Tasten',
  phrases: 'Satzzeichen',
  combinations: 'Kombinationen',
  words: 'Wörter',
  sentences: 'Sätze',
  text: 'Texte',
};

/** Kurzbeschreibung der Übungsart, z. B. „Wörter“ oder „60 Sekunden“. */
export function lessonKindLabel(lesson: Lesson): string {
  if (lesson.timeLimitSec) return `${lesson.timeLimitSec} Sekunden`;
  return KIND_LABELS[lesson.exercise.kind];
}
