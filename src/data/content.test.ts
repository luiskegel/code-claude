import { describe, expect, it } from 'vitest';
import { ALL_LESSONS, MODULES } from './curriculum';
import { GLOSSARY } from './glossary';

describe('Lerninhalte', () => {
  it('enthält mindestens 15 Module mit mehreren Lektionen', () => {
    expect(MODULES.length).toBeGreaterThanOrEqual(15);
    MODULES.forEach((m) => expect(m.lessons.length).toBeGreaterThanOrEqual(3));
  });

  it('jede Lektion ist vollständig', () => {
    ALL_LESSONS.forEach(({ lesson }) => {
      expect(lesson.sections.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.examples.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.practice.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.terms.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.mistakes.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.summary.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.exercise.solution.length, lesson.id).toBeGreaterThan(10);
    });
  });

  it('mindestens 10 Fragen pro Modul, gültige Antworten und Lektion-Zuordnung', () => {
    const ids = new Set<string>();
    MODULES.forEach((m) => {
      expect(m.quiz.length, m.id).toBeGreaterThanOrEqual(10);
      m.quiz.forEach((q) => {
        expect(ids.has(q.id), q.id).toBe(false);
        ids.add(q.id);
        const opts = q.type === 'tf' ? ['Richtig', 'Falsch'] : q.options ?? [];
        expect(opts.length, q.id).toBeGreaterThanOrEqual(2);
        expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
        expect(q.answer, q.id).toBeLessThan(opts.length);
        expect(q.lesson, q.id).toBeLessThan(m.lessons.length);
        if (q.type !== 'tf') expect(opts.length, q.id).toBe(4);
        expect(new Set(opts).size, q.id).toBe(opts.length);
      });
      // jede Lektion hat mindestens eine Frage für den Kurztest
      m.lessons.forEach((_, i) => expect(m.quiz.some((q) => q.lesson === i), `${m.id} Lektion ${i}`).toBe(true));
    });
  });

  it('eindeutige Lektions-IDs', () => {
    const ids = ALL_LESSONS.map((x) => x.lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Lexikon mit mindestens 150 eindeutigen Begriffen', () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(150);
    const terms = GLOSSARY.map((g) => g.term.toLowerCase());
    expect(new Set(terms).size).toBe(terms.length);
    GLOSSARY.forEach((g) => {
      expect(g.short.length).toBeGreaterThan(3);
      expect(g.long.length).toBeGreaterThan(20);
      expect(g.example.length).toBeGreaterThan(5);
    });
  });
});
