import type { QuizQuestion } from '@/types';

// Die richtige Antwort steht beim Schreiben immer zuerst – im Test wird gemischt.
const make =
  (type: 'mc' | 'calc' | 'case') =>
  (id: string, lesson: number, question: string, correct: string, wrong: string[], explanation: string): QuizQuestion => ({
    id,
    type,
    lesson,
    question,
    options: [correct, ...wrong],
    answer: 0,
    explanation,
  });

export const mc = make('mc');
export const calc = make('calc');
export const kase = make('case');

/** Richtig-oder-falsch-Aussage. */
export const tf = (id: string, lesson: number, statement: string, isTrue: boolean, explanation: string): QuizQuestion => ({
  id,
  type: 'tf',
  lesson,
  question: statement,
  answer: isTrue ? 0 : 1,
  explanation,
});
