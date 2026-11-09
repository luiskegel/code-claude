import { describe, expect, it } from 'vitest';
import { addStudyDay, currentLevel, emptyProgress, streak } from './progress';

describe('Lernstufen', () => {
  it('startet bei Stufe 1', () => {
    expect(currentLevel(emptyProgress(), 45).current.level).toBe(1);
  });
  it('steigt mit Lektionen UND Tests auf', () => {
    const p = emptyProgress();
    for (let i = 0; i < 10; i++) p.completedLessons[`l${i}`] = '2026-01-01';
    expect(currentLevel(p, 45).current.level).toBe(1); // noch keine Tests
    p.quizResults.m1 = { bestScore: 0.8, lastScore: 0.8, attempts: 1, passed: true, wrongIds: [], lastAttemptAt: '' };
    p.quizResults.m2 = { bestScore: 0.9, lastScore: 0.9, attempts: 1, passed: true, wrongIds: [], lastAttemptAt: '' };
    expect(currentLevel(p, 45).current.level).toBe(2);
  });
  it('Stufe 5 erst bei allem', () => {
    const p = emptyProgress();
    for (let i = 0; i < 45; i++) p.completedLessons[`l${i}`] = '2026-01-01';
    for (let i = 0; i < 15; i++)
      p.quizResults[`m${i}`] = { bestScore: 1, lastScore: 1, attempts: 1, passed: true, wrongIds: [], lastAttemptAt: '' };
    expect(currentLevel(p, 45).current.level).toBe(5);
  });
});

describe('Lernserie', () => {
  it('zählt aufeinanderfolgende Tage', () => {
    const today = new Date(2026, 10, 9);
    expect(streak(['2026-11-07', '2026-11-08', '2026-11-09'], today)).toBe(3);
    expect(streak(['2026-11-07', '2026-11-08'], today)).toBe(2); // gestern zählt noch
    expect(streak(['2026-11-05'], today)).toBe(0);
  });
  it('fügt Tage ohne Duplikate hinzu', () => {
    expect(addStudyDay(['2026-11-09'], '2026-11-09')).toEqual(['2026-11-09']);
  });
});
