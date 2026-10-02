import { describe, expect, it } from 'vitest';
import { BIGRAMS, SYLLABLES } from '../exercise/content/combinations';
import {
  LONG_SENTENCES,
  PRECISE_SENTENCES,
  QUESTION_SENTENCES,
  SHORT_SENTENCES,
} from '../exercise/content/sentences';
import { LETTERS, PARAGRAPHS } from '../exercise/content/texts';
import {
  COMMON_WORDS,
  CONFUSABLE_PAIRS,
  ESZETT_WORDS,
  FIRST_WORDS,
  LONG_WORDS,
  NOUNS,
  PUNCTUATION_PHRASES,
} from '../exercise/content/words';
import { generateLessonExercise } from '../exercise/generator';
import { isTypeable } from '../keyboard/keyMap';
import { KEYBOARD_LAYOUTS, KEYBOARD_LAYOUT_IDS } from '../keyboard/layouts';
import { ALL_COURSE_CHARS, getAllowedChars, getIntroKeyIds, getLessonIndex } from './catalog';
import { LESSONS } from './curriculum';
import { MODULES } from './modules';

const SEEDS = Array.from({ length: 25 }, (_, index) => index * 7919 + 13);

describe('Lehrplan-Struktur', () => {
  it('hat eindeutige IDs und fortlaufende Nummern', () => {
    const ids = LESSONS.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    LESSONS.forEach((lesson, index) => expect(lesson.number).toBe(index + 1));
  });

  it('ordnet jede Lektion einem bekannten Modul zu und jedes Modul hat Lektionen', () => {
    const moduleIds = new Set(MODULES.map((module) => module.id));
    for (const lesson of LESSONS) expect(moduleIds.has(lesson.moduleId)).toBe(true);
    for (const module of MODULES) {
      expect(LESSONS.some((lesson) => lesson.moduleId === module.id)).toBe(true);
    }
  });

  it('hält die Module in aufsteigender Reihenfolge', () => {
    const order = LESSONS.map((lesson) => MODULES.findIndex((m) => m.id === lesson.moduleId));
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('beginnt mit Grundstellung und F/J und führt die geforderten Tastengruppen ein', () => {
    expect(LESSONS[0]?.id).toBe('grundstellung');
    expect(LESSONS[1]?.title).toBe('F und J');
    const titles = LESSONS.map((lesson) => lesson.title);
    for (const title of [
      'A S D F',
      'J K L Ö',
      'Leertaste',
      'Q W E R T',
      'Z U I O P',
      'Y X C V',
      'B N M',
    ]) {
      expect(titles).toContain(title);
    }
  });

  it('hat sinnvolle Bestehensgrenzen', () => {
    for (const lesson of LESSONS) {
      expect(lesson.passAccuracy).toBeGreaterThanOrEqual(80);
      expect(lesson.passAccuracy).toBeLessThanOrEqual(100);
    }
  });

  it('führt nur Zeichen ein, die auf allen Layouts direkt tippbar sind', () => {
    for (const lesson of LESSONS) {
      for (const char of lesson.newChars) {
        for (const id of KEYBOARD_LAYOUT_IDS) {
          expect(isTypeable(KEYBOARD_LAYOUTS[id], char), `${lesson.id}: ${char}`).toBe(true);
        }
      }
    }
  });

  it('zeigt in jeder Einführung mindestens eine Taste', () => {
    for (const lesson of LESSONS) {
      if (lesson.exercise.kind === 'keys' || lesson.newChars.length > 0) {
        expect(getIntroKeyIds(lesson, KEYBOARD_LAYOUTS['apple-de']).length).toBeGreaterThan(0);
      }
    }
  });
});

describe('Übungsmaterial', () => {
  const allContent = [
    ...FIRST_WORDS,
    ...COMMON_WORDS,
    ...NOUNS.map(([article, noun]) => `${article} ${noun}`),
    ...LONG_WORDS,
    ...ESZETT_WORDS,
    ...CONFUSABLE_PAIRS.map(([a, b]) => `${a} ${b}`),
    ...PUNCTUATION_PHRASES,
    ...BIGRAMS,
    ...SYLLABLES,
    ...SHORT_SENTENCES,
    ...QUESTION_SENTENCES,
    ...LONG_SENTENCES,
    ...PRECISE_SENTENCES,
    ...PARAGRAPHS,
    ...LETTERS,
  ];

  it('enthält ausschließlich Zeichen, die im Kurs gelehrt werden', () => {
    for (const text of allContent) {
      for (const char of text) {
        expect(ALL_COURSE_CHARS.has(char), `„${char}“ in „${text}“`).toBe(true);
      }
    }
  });

  it('enthält keine doppelten Leerzeichen und keine Leerzeichen am Rand', () => {
    for (const text of allContent) {
      expect(text).not.toMatch(/ {2}/);
      expect(text).toBe(text.trim());
    }
  });

  it('schreibt Nomen groß und Artikel klein', () => {
    for (const [article, noun] of NOUNS) {
      expect(['der', 'die', 'das']).toContain(article);
      expect(noun[0]).toBe(noun[0]?.toLocaleUpperCase('de-DE'));
    }
  });

  it('beendet jeden Satz mit einem Satzzeichen', () => {
    for (const sentence of [
      ...SHORT_SENTENCES,
      ...QUESTION_SENTENCES,
      ...LONG_SENTENCES,
      ...PRECISE_SENTENCES,
    ]) {
      expect(sentence).toMatch(/[.?]$/);
    }
  });

  it('verwendet in kurzen Sätzen noch kein Fragezeichen', () => {
    for (const sentence of SHORT_SENTENCES) expect(sentence).not.toContain('?');
  });
});

describe('Generierte Übungen je Lektion', () => {
  it.each(LESSONS.map((lesson) => [lesson.id, lesson] as const))(
    '%s nutzt nur bereits gelernte Zeichen und hat eine passende Länge',
    (_id, lesson) => {
      const allowed = getAllowedChars(getLessonIndex(lesson.id));
      for (const seed of SEEDS) {
        const exercise = generateLessonExercise({ lesson, seed });
        expect(exercise.text.length).toBeGreaterThan(0);
        for (const char of exercise.text) {
          expect(allowed.has(char), `${lesson.id}: „${char}“`).toBe(true);
        }
        expect(exercise.text).toBe(exercise.text.trim());
        expect(exercise.text).not.toMatch(/ {2}/);
        if (lesson.exercise.kind !== 'fixed') {
          expect(exercise.text.length).toBeGreaterThanOrEqual(lesson.exercise.targetLength * 0.7);
        }
        if (lesson.timeLimitSec) {
          // Genug Text, damit auch sehr schnelle Tipper nicht vor Ablauf der Zeit fertig werden.
          expect(exercise.text.length).toBeGreaterThanOrEqual(lesson.timeLimitSec * 15);
          expect(exercise.timeLimitSec).toBe(lesson.timeLimitSec);
        }
      }
    },
  );

  it('baut die neuen Tasten einer Tastenlektion häufig ein', () => {
    for (const lesson of LESSONS.filter((l) => l.exercise.kind === 'keys')) {
      const exercise = generateLessonExercise({ lesson, seed: 42 });
      const letters = [...exercise.text].filter((char) => char !== ' ');
      const focusCount = letters.filter((char) => lesson.focusChars.includes(char)).length;
      expect(focusCount / letters.length, lesson.id).toBeGreaterThan(0.3);
    }
  });

  it('beginnt mit der sehr einfachen ersten Lektion', () => {
    const exercise = generateLessonExercise({ lesson: LESSONS[0]!, seed: 1 });
    expect(exercise.text).toBe('f j f j fj jf fj jf ff jj fj jf');
  });

  it('erzeugt in Wortlektionen nur echte Wörter – keine Buchstabensalate', () => {
    const vocabulary = new Set(
      [
        ...FIRST_WORDS,
        ...COMMON_WORDS,
        ...NOUNS.flatMap(([article, noun]) => [article, noun]),
        ...LONG_WORDS,
        ...ESZETT_WORDS,
        ...CONFUSABLE_PAIRS.flat(),
      ].flatMap((word) => [word, word.toLocaleLowerCase('de-DE')]),
    );
    for (const lesson of LESSONS.filter((l) => l.exercise.kind === 'words')) {
      for (const seed of SEEDS.slice(0, 5)) {
        const tokens = generateLessonExercise({ lesson, seed }).text.split(' ');
        for (const token of tokens) {
          expect(vocabulary.has(token), `${lesson.id}: „${token}“`).toBe(true);
        }
      }
    }
  });
});
