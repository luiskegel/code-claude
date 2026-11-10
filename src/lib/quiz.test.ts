import { describe, expect, it } from 'vitest';
import { shuffleQuestion, shuffleQuiz } from './quiz';
import { mulberry32 } from './market/simulatedMarket';
import { MODULES } from '@/data/curriculum';
import type { QuizQuestion } from '@/types';

const q: QuizQuestion = { id: 'x', type: 'mc', lesson: 0, question: '?', options: ['A', 'B', 'C', 'D'], answer: 0, explanation: '' };

describe('Antworten mischen', () => {
  it('die richtige Antwort bleibt nach dem Mischen richtig', () => {
    const rand = mulberry32(42);
    for (let i = 0; i < 200; i++) {
      const s = shuffleQuestion(q, rand);
      expect(s.options[s.answer]).toBe('A');
      expect([...s.options].sort()).toEqual(['A', 'B', 'C', 'D']);
    }
  });
  it('die richtige Antwort landet etwa gleich oft auf jeder Position', () => {
    const rand = mulberry32(7);
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < 4000; i++) counts[shuffleQuestion(q, rand).answer]++;
    counts.forEach((c) => expect(c).toBeGreaterThan(800));
  });
  it('Richtig/Falsch bleibt in fester Reihenfolge', () => {
    const tf: QuizQuestion = { ...q, type: 'tf', options: undefined, answer: 1 };
    expect(shuffleQuestion(tf)).toMatchObject({ options: ['Richtig', 'Falsch'], answer: 1 });
  });
  it('alle Fragen bleiben erhalten', () => {
    const all = MODULES.flatMap((m) => m.quiz);
    const s = shuffleQuiz(all, mulberry32(1));
    expect(s.map((x) => x.question.id).sort()).toEqual(all.map((x) => x.id).sort());
    s.forEach((x) => expect(x.options[x.answer]).toBe((x.question.type === 'tf' ? ['Richtig', 'Falsch'] : x.question.options!)[x.question.answer]));
  });
});
