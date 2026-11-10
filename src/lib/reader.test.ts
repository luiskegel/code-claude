import { describe, expect, it } from 'vitest';
import { chunkText, lessonToLines } from './reader';
import { ALL_LESSONS } from '@/data/curriculum';

describe('Vorlesetext', () => {
  it('teilt langen Text an Satzgrenzen', () => {
    const parts = chunkText('Satz eins. Satz zwei! Satz drei?', 15);
    expect(parts).toEqual(['Satz eins.', 'Satz zwei!', 'Satz drei?']);
  });

  it('erfüllt für jede Lektion die Grenzen der Claude-Sprachausgabe', () => {
    ALL_LESSONS.forEach(({ lesson }) => {
      const lines = lessonToLines(lesson);
      expect(lines.length, lesson.id).toBeLessThanOrEqual(100);
      expect(lines[0].id).toBe('intro');
      lines.forEach((l) => {
        expect(l.text.length, lesson.id).toBeGreaterThan(0);
        expect(l.text.length, lesson.id).toBeLessThanOrEqual(2000);
        expect(l.text).not.toContain('**');
      });
      lesson.sections.forEach((_, i) => expect(lines.some((l) => l.id === `s${i}`)).toBe(true));
    });
  });
});
