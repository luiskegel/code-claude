import { describe, expect, it } from 'vitest';
import { getAllowedChars, getLessonById, getLessonIndex } from '../lessons/catalog';
import { generateLessonExercise, generateReviewExercise, REVIEW_EXERCISE_ID } from './generator';
import { createRng } from './random';

function lesson(id: string) {
  const found = getLessonById(id);
  if (!found) throw new Error(id);
  return found;
}

function countChar(text: string, char: string): number {
  return [...text.toLocaleLowerCase('de-DE')].filter((c) => c === char).length;
}

describe('Zufallsgenerator', () => {
  it('ist mit gleichem Startwert reproduzierbar', () => {
    const a = createRng(123);
    const b = createRng(123);
    const valuesA = Array.from({ length: 5 }, () => a.next());
    const valuesB = Array.from({ length: 5 }, () => b.next());
    expect(valuesA).toEqual(valuesB);
    for (const value of valuesA) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('wählt gewichtet aus und ignoriert Gewicht 0', () => {
    const rng = createRng(7);
    const picks = Array.from({ length: 200 }, () =>
      rng.weightedPick(['a', 'b'], (item) => (item === 'a' ? 1 : 0)),
    );
    expect(picks.every((pick) => pick === 'a')).toBe(true);
  });

  it('mischt, ohne Elemente zu verlieren', () => {
    const shuffled = createRng(5).shuffle([1, 2, 3, 4, 5]);
    expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('Lektionsübungen', () => {
  it('erzeugt mit gleichem Startwert denselben Text', () => {
    const a = generateLessonExercise({ lesson: lesson('asdf'), seed: 99 });
    const b = generateLessonExercise({ lesson: lesson('asdf'), seed: 99 });
    expect(a.text).toBe(b.text);
    expect(a.id).toBe(b.id);
  });

  it('variiert bei neuem Startwert („Nochmal üben“)', () => {
    const texts = new Set(
      [1, 2, 3, 4, 5].map((seed) => generateLessonExercise({ lesson: lesson('qwert'), seed }).text),
    );
    expect(texts.size).toBeGreaterThan(1);
  });

  it('übernimmt das Zeitlimit von Geschwindigkeitslektionen', () => {
    const exercise = generateLessonExercise({ lesson: lesson('tempo-sprint'), seed: 3 });
    expect(exercise.timeLimitSec).toBe(60);
  });

  it('baut Fehlerzeichen adaptiv häufiger ein und meldet sie transparent', () => {
    const weak = new Map([['ü', 3]]);
    let baseline = 0;
    let adaptive = 0;
    for (let seed = 1; seed <= 30; seed++) {
      baseline += countChar(
        generateLessonExercise({ lesson: lesson('alltagswoerter'), seed }).text,
        'ü',
      );
      const exercise = generateLessonExercise({
        lesson: lesson('alltagswoerter'),
        seed,
        charWeights: weak,
      });
      adaptive += countChar(exercise.text, 'ü');
      if (exercise.text.includes('ü')) expect(exercise.adaptiveChars).toContain('ü');
    }
    expect(adaptive).toBeGreaterThan(baseline * 1.5);
  });

  it('ignoriert Gewichte für Zeichen, die noch nicht gelernt sind', () => {
    const exercise = generateLessonExercise({
      lesson: lesson('asdf'),
      seed: 4,
      charWeights: new Map([['q', 3]]),
    });
    expect(exercise.text).not.toContain('q');
    expect(exercise.adaptiveChars).toEqual([]);
  });

  it('übt sicher beherrschte Tasten seltener isoliert', () => {
    const mastered = new Map([['a', 0.4]]);
    let baseline = 0;
    let reduced = 0;
    for (let seed = 1; seed <= 30; seed++) {
      baseline += countChar(generateLessonExercise({ lesson: lesson('g-h'), seed }).text, 'a');
      reduced += countChar(
        generateLessonExercise({ lesson: lesson('g-h'), seed, charWeights: mastered }).text,
        'a',
      );
    }
    expect(reduced).toBeLessThan(baseline);
  });
});

describe('Fehler wiederholen', () => {
  const allLearned = getAllowedChars(getLessonIndex('briefe'));

  it('erzeugt echte Wörter mit den Problemzeichen', () => {
    const exercise = generateReviewExercise({
      focusChars: ['s', 'k'],
      learnedChars: allLearned,
      seed: 11,
    });
    expect(exercise.lessonId).toBe(REVIEW_EXERCISE_ID);
    expect(exercise.text.length).toBeGreaterThan(100);
    const tokens = exercise.text.split(' ');
    const withFocus = tokens.filter((token) => /[sk]/i.test(token));
    expect(withFocus.length / tokens.length).toBeGreaterThan(0.6);
    expect(exercise.adaptiveChars).toEqual(expect.arrayContaining(['s', 'k']));
  });

  it('nutzt nur gelernte Zeichen – auch am Anfang des Kurses', () => {
    const learned = getAllowedChars(getLessonIndex('jkloe'));
    const exercise = generateReviewExercise({
      focusChars: ['k', 'q'],
      learnedChars: learned,
      seed: 5,
    });
    for (const char of exercise.text) expect(learned.has(char)).toBe(true);
    expect(exercise.text).toContain('k');
  });

  it('übt Satzzeichen in ganzen Sätzen', () => {
    const exercise = generateReviewExercise({
      focusChars: ['?'],
      learnedChars: allLearned,
      seed: 2,
    });
    expect(exercise.text).toContain('?');
  });

  it('übt die Leertaste mit kurzen Wörtern', () => {
    const exercise = generateReviewExercise({
      focusChars: [' '],
      learnedChars: allLearned,
      seed: 8,
    });
    expect(exercise.text.split(' ').length).toBeGreaterThan(20);
  });

  it('funktioniert auch ohne gelernte Zeichen', () => {
    const exercise = generateReviewExercise({ focusChars: [], learnedChars: new Set(), seed: 1 });
    expect(exercise.text.length).toBeGreaterThan(0);
    for (const char of exercise.text) expect('fj '.includes(char)).toBe(true);
  });
});
