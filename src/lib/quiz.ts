// Hilfsfunktionen für Wissenstests.
import type { QuizQuestion } from '@/types';

export const optionsOf = (q: QuizQuestion) => (q.type === 'tf' ? ['Richtig', 'Falsch'] : q.options ?? []);

export interface ShuffledQuestion {
  question: QuizQuestion;
  options: string[];
  /** Index der richtigen Antwort in `options` (nach dem Mischen). */
  answer: number;
}

/**
 * Mischt die Antwortmöglichkeiten einer Frage (Fisher-Yates).
 * Richtig/Falsch-Fragen behalten ihre feste Reihenfolge.
 */
export function shuffleQuestion(q: QuizQuestion, rand: () => number = Math.random): ShuffledQuestion {
  const opts = optionsOf(q);
  if (q.type === 'tf') return { question: q, options: opts, answer: q.answer };
  const idx = opts.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { question: q, options: idx.map((i) => opts[i]), answer: idx.indexOf(q.answer) };
}

/** Mischt zusätzlich die Reihenfolge der Fragen. */
export function shuffleQuiz(questions: QuizQuestion[], rand: () => number = Math.random): ShuffledQuestion[] {
  const qs = [...questions];
  for (let i = qs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [qs[i], qs[j]] = [qs[j], qs[i]];
  }
  return qs.map((q) => shuffleQuestion(q, rand));
}
