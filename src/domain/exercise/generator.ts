import { FINGER_INFO } from '../keyboard/fingers';
import { getKeyStroke, statKeyForChar } from '../keyboard/keyMap';
import { KEYBOARD_LAYOUTS } from '../keyboard/layouts';
import { getAllowedChars, getLessonIndex } from '../lessons/catalog';
import type { CaseMode, ExerciseSpec, Lesson, SentenceSource, WordSource } from '../lessons/types';
import { BIGRAMS, SYLLABLES } from './content/combinations';
import {
  LONG_SENTENCES,
  PRECISE_SENTENCES,
  QUESTION_SENTENCES,
  SHORT_SENTENCES,
} from './content/sentences';
import { LETTERS, PARAGRAPHS } from './content/texts';
import {
  COMMON_WORDS,
  CONFUSABLE_PAIRS,
  ESZETT_WORDS,
  FIRST_WORDS,
  LONG_WORDS,
  NOUNS,
  PUNCTUATION_PHRASES,
} from './content/words';
import { createRng, type Rng } from './random';

/** Eine konkrete, generierte Übung. */
export interface Exercise {
  id: string;
  /** Lektions-ID oder REVIEW_EXERCISE_ID */
  lessonId: string;
  seed: number;
  text: string;
  timeLimitSec?: number;
  /** Zeichen, die wegen häufiger Fehler bevorzugt eingebaut wurden. */
  adaptiveChars: string[];
}

/**
 * Gewichte pro Zeichen (normalisiert über statKeyForChar):
 * > 1 = häufige Fehler (öfter üben), < 1 = sicher beherrscht (seltener isoliert üben).
 */
export type CharWeights = ReadonlyMap<string, number>;

export const REVIEW_EXERCISE_ID = 'wiederholen';

/** Ab diesem Gewicht gilt ein Zeichen als „bewusst häufiger eingebaut“. */
export const ADAPTIVE_HIGHLIGHT_WEIGHT = 1.4;

const MAX_TOKEN_WEIGHT = 4;
const MIN_TOKEN_WEIGHT = 0.4;
const MAX_ITERATIONS = 5000;
const FOCUS_SHARE_IN_MIX = 0.6;
const MAX_ANCHOR_PAIRS = 6;
const REVIEW_TARGET_LENGTH = 150;
const REVIEW_MIN_LETTERS_FOR_WORDS = 15;

const REFERENCE_LAYOUT = KEYBOARD_LAYOUTS['standard-de'];

// ── Hilfsfunktionen ─────────────────────────────────────────────────────

function unique<T>(items: Iterable<T>): T[] {
  return [...new Set(items)];
}

function lower(text: string): string {
  return text.toLocaleLowerCase('de-DE');
}

function isLetter(char: string): boolean {
  return lower(char) !== char.toLocaleUpperCase('de-DE') || char === 'ß';
}

/** Besteht der Text nur aus erlaubten Zeichen? */
export function isComposedOf(text: string, allowed: ReadonlySet<string>): boolean {
  for (const char of text) {
    if (!allowed.has(char)) return false;
  }
  return true;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Gewicht eines Tokens: Produkt der Gewichte seiner (verschiedenen) Zeichen. */
function tokenWeight(token: string, weights: CharWeights | undefined): number {
  if (!weights || weights.size === 0) return 1;
  let weight = 1;
  for (const char of new Set(token)) {
    const charWeight = weights.get(statKeyForChar(char));
    if (charWeight !== undefined) weight *= charWeight;
  }
  return clamp(weight, MIN_TOKEN_WEIGHT, MAX_TOKEN_WEIGHT);
}

/** Wählt Tokens gewichtet aus, vermeidet direkte Wiederholungen und zu häufige Dopplungen. */
class TokenPicker {
  private readonly counts = new Map<string, number>();
  private last: string | undefined;
  private readonly tokens: readonly string[];
  private readonly rng: Rng;
  private readonly weightOf: (token: string) => number;
  private readonly maxRepeats: number;

  constructor(
    tokens: readonly string[],
    rng: Rng,
    weightOf: (token: string) => number,
    maxRepeats: number,
  ) {
    if (tokens.length === 0) throw new Error('TokenPicker benötigt mindestens ein Token');
    this.tokens = tokens;
    this.rng = rng;
    this.weightOf = weightOf;
    this.maxRepeats = maxRepeats;
  }

  next(): string {
    let candidates = this.tokens.filter(
      (token) => token !== this.last && (this.counts.get(token) ?? 0) < this.maxRepeats,
    );
    if (candidates.length === 0) {
      this.counts.clear();
      candidates = this.tokens.filter((token) => token !== this.last);
    }
    if (candidates.length === 0) candidates = [...this.tokens];
    const token = this.rng.weightedPick(candidates, this.weightOf);
    this.counts.set(token, (this.counts.get(token) ?? 0) + 1);
    this.last = token;
    return token;
  }
}

/** Hängt Tokens an, bis die Ziellänge erreicht ist. Bricht nie mitten in einem Token ab. */
function fillToLength(
  target: number,
  nextToken: () => string,
  initial: readonly string[] = [],
  separator = ' ',
): string {
  const parts = [...initial];
  let length = parts.join(separator).length;
  let iterations = 0;
  while (length < target && iterations < MAX_ITERATIONS) {
    iterations++;
    const token = nextToken();
    if (!token) continue;
    length += token.length + (parts.length > 0 ? separator.length : 0);
    parts.push(token);
  }
  return parts.join(separator);
}

// ── Wortquellen ─────────────────────────────────────────────────────────

/** Alle Wörter in Kleinschreibung – Grundlage für frühe Lektionen und Kombinationen. */
const LOWERCASE_DICTIONARY: readonly string[] = unique([
  ...FIRST_WORDS,
  ...COMMON_WORDS,
  ...NOUNS.map(([, noun]) => lower(noun)),
  ...LONG_WORDS.map(lower),
  ...ESZETT_WORDS.map(lower),
]);

function wordsForSource(source: WordSource, caseMode: CaseMode): string[] {
  const applyCase = (word: string) => (caseMode === 'lower' ? lower(word) : word);
  switch (source) {
    case 'first':
      return unique(FIRST_WORDS.map(applyCase));
    case 'common':
      return unique([...COMMON_WORDS, ...NOUNS.map(([, noun]) => noun)].map(applyCase));
    case 'nouns-with-article':
      return unique(NOUNS.map(([article, noun]) => applyCase(`${article} ${noun}`)));
    case 'eszett':
      return unique(ESZETT_WORDS.map(applyCase));
    case 'long':
      return unique(LONG_WORDS.map(applyCase));
    case 'confusable':
      return unique(CONFUSABLE_PAIRS.map(([a, b]) => applyCase(`${a} ${b}`)));
  }
}

function sentencesForSource(source: SentenceSource): readonly string[] {
  switch (source) {
    case 'short':
      return SHORT_SENTENCES;
    case 'questions':
      return QUESTION_SENTENCES;
    case 'long':
      return LONG_SENTENCES;
    case 'precise':
      return PRECISE_SENTENCES;
    case 'mixed':
      return [...SHORT_SENTENCES, ...QUESTION_SENTENCES, ...LONG_SENTENCES];
  }
}

// ── Generatoren ─────────────────────────────────────────────────────────

interface GenerationContext {
  allowed: ReadonlySet<string>;
  focus: readonly string[];
  rng: Rng;
  weights: CharWeights | undefined;
}

function anchorFor(char: string): string | undefined {
  const stroke = getKeyStroke(REFERENCE_LAYOUT, char);
  if (!stroke) return undefined;
  const hand = FINGER_INFO[stroke.finger].hand;
  if (hand === 'left') return 'f';
  if (hand === 'right') return 'j';
  return undefined;
}

/** Einstiegsübung: neue Tasten einzeln, als Folge und mit dem Ankerfinger der Hand. */
function buildDrill(focus: readonly string[], allowed: ReadonlySet<string>, rng: Rng): string[] {
  const tokens: string[] = focus.map((char) => char + char);
  if (focus.length >= 2) {
    const sequence = focus.join('');
    tokens.push(sequence, [...sequence].reverse().join(''));
  }
  const pairs: string[] = [];
  for (const char of focus) {
    const anchor = anchorFor(char);
    if (!anchor || anchor === char || !allowed.has(anchor)) continue;
    pairs.push(anchor + char, char + anchor);
  }
  tokens.push(...rng.shuffle(pairs).slice(0, MAX_ANCHOR_PAIRS));
  return tokens;
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'ä', 'ö', 'ü']);
/** Buchstaben, die in künstlichen Silben ungewohnt wirken – nur als Fokuszeichen verwendet. */
const AWKWARD_IN_SYLLABLES = new Set(['q', 'x', 'y', 'c']);
const SYLLABLE_PATTERNS = ['CV', 'CV', 'VC', 'CVC', 'CVC', 'CVC'] as const;

/** Kurze Buchstabengruppe aus den neuen Tasten – für Lektionen ganz ohne Vokale (F und J). */
function mixToken(ctx: GenerationContext, letters: readonly string[]): string {
  const { focus, rng, weights } = ctx;
  const length = rng.int(2, 4);
  let token = '';
  for (let index = 0; index < length; index++) {
    const pool = focus.length > 0 && rng.next() < FOCUS_SHARE_IN_MIX ? focus : letters;
    let char = rng.weightedPick(pool, (c) => weights?.get(c) ?? 1);
    if (token.length >= 2 && token.at(-1) === char && token.at(-2) === char) {
      const others = pool.filter((c) => c !== char);
      char = rng.pick(others.length > 0 ? others : pool);
    }
    token += char;
  }
  return token;
}

/**
 * Aussprechbare Silbe (z. B. „we“, „ret“, „ak“), die immer ein Fokuszeichen enthält.
 * Gibt null zurück, wenn noch keine Vokale oder Konsonanten gelernt sind.
 */
function syllableToken(ctx: GenerationContext, letters: readonly string[]): string | null {
  const { focus, rng, weights } = ctx;
  const vowels = letters.filter((char) => VOWELS.has(char));
  const consonants = letters.filter((char) => !VOWELS.has(char) && !AWKWARD_IN_SYLLABLES.has(char));
  if (vowels.length === 0 || consonants.length === 0 || focus.length === 0) return null;

  const weightOf = (char: string) => weights?.get(char) ?? 1;
  const focusChar = rng.weightedPick(focus, weightOf);
  const focusSlot = VOWELS.has(focusChar) ? 'V' : 'C';
  const slots = [...rng.pick(SYLLABLE_PATTERNS)];
  const candidates = slots.flatMap((slot, index) => (slot === focusSlot ? [index] : []));
  const focusIndex = rng.pick(candidates);
  return slots
    .map((slot, index) => {
      if (index === focusIndex) return focusChar;
      return rng.weightedPick(slot === 'V' ? vowels : consonants, weightOf);
    })
    .join('');
}

/**
 * Tastenlektion in drei Blöcken – einzelne Tasten, Silben, echte Wörter.
 * So entsteht eine nachvollziehbare Steigerung statt eines Buchstabensalats.
 */
function generateKeys(ctx: GenerationContext, targetLength: number): string {
  const learnedLetters = [...ctx.allowed].filter(isLetter);
  // Sicherheitsnetz: Ohne gelernte Buchstaben wird mit den Ankertasten geübt.
  const letters = learnedLetters.length > 0 ? learnedLetters : ['f', 'j'];
  const focus = ctx.focus.filter((char) => isLetter(char) && ctx.allowed.has(char));
  const keyCtx: GenerationContext = { ...ctx, focus: focus.length > 0 ? focus : letters };
  const allowedLetters = new Set([...letters, ' ']);

  const words = LOWERCASE_DICTIONARY.filter(
    (word) =>
      word.length <= 8 &&
      isComposedOf(word, allowedLetters) &&
      [...word].some((char) => keyCtx.focus.includes(char)),
  );
  const wordShare = words.length >= 20 ? 0.5 : words.length >= 4 ? 0.35 : 0;
  const wordPicker =
    wordShare > 0
      ? new TokenPicker(words, ctx.rng, (word) => tokenWeight(word, ctx.weights), 2)
      : undefined;

  const nextGroup = () => syllableToken(keyCtx, letters) ?? mixToken(keyCtx, letters);
  const drill = buildDrill(keyCtx.focus, ctx.allowed, ctx.rng);
  const withGroups = fillToLength(targetLength * (1 - wordShare), nextGroup, drill);
  if (!wordPicker) return fillToLength(targetLength, nextGroup, [withGroups]);
  return fillToLength(targetLength, () => wordPicker.next(), [withGroups]);
}

function generatePhrases(ctx: GenerationContext, targetLength: number): string {
  const phrases = PUNCTUATION_PHRASES.filter((phrase) => isComposedOf(phrase, ctx.allowed));
  if (phrases.length === 0) return generateKeys(ctx, targetLength);
  const picker = new TokenPicker(phrases, ctx.rng, (p) => tokenWeight(p, ctx.weights), 1);
  return fillToLength(targetLength, () => picker.next());
}

function generateCombinations(
  ctx: GenerationContext,
  source: 'bigrams' | 'syllables',
  targetLength: number,
): string {
  const dictionary = LOWERCASE_DICTIONARY.filter((word) => isComposedOf(word, ctx.allowed));
  const units = (source === 'bigrams' ? BIGRAMS : SYLLABLES)
    .filter((unit) => isComposedOf(unit, ctx.allowed))
    .map((unit) => ({
      unit,
      examples: dictionary.filter((word) => word !== unit && word.includes(unit)),
    }))
    .filter((entry) => entry.examples.length >= 2);
  if (units.length === 0) return generateKeys(ctx, targetLength);

  const picker = new TokenPicker(
    units.map((entry) => entry.unit),
    ctx.rng,
    (unit) => tokenWeight(unit, ctx.weights),
    1,
  );
  const examplesByUnit = new Map(units.map((entry) => [entry.unit, entry.examples]));
  // Jede Gruppe bleibt vollständig: „ch ch ich doch“.
  return fillToLength(targetLength, () => {
    const unit = picker.next();
    const examples = ctx.rng.shuffle(examplesByUnit.get(unit) ?? []).slice(0, 2);
    return [unit, unit, ...examples].join(' ');
  });
}

function generateWords(
  ctx: GenerationContext,
  spec: Extract<ExerciseSpec, { kind: 'words' }>,
): string {
  const candidates = wordsForSource(spec.source, spec.caseMode).filter((token) => {
    if (!isComposedOf(token, ctx.allowed)) return false;
    const length = token.length;
    if (spec.minLength !== undefined && length < spec.minLength) return false;
    if (spec.maxLength !== undefined && length > spec.maxLength) return false;
    return true;
  });
  if (candidates.length < 3) return generateKeys(ctx, spec.targetLength);
  const picker = new TokenPicker(candidates, ctx.rng, (word) => tokenWeight(word, ctx.weights), 2);
  return fillToLength(spec.targetLength, () => picker.next());
}

function generateSentences(
  ctx: GenerationContext,
  source: SentenceSource,
  targetLength: number,
): string {
  const pool = sentencesForSource(source).filter((sentence) => isComposedOf(sentence, ctx.allowed));
  if (pool.length === 0)
    return generateWords(ctx, {
      kind: 'words',
      source: 'common',
      caseMode: 'natural',
      targetLength,
    });
  const picker = new TokenPicker(pool, ctx.rng, (s) => tokenWeight(s, ctx.weights), 1);
  return fillToLength(targetLength, () => picker.next());
}

function generateText(
  ctx: GenerationContext,
  source: 'paragraphs' | 'letters',
  targetLength: number,
): string {
  const pool = (source === 'letters' ? LETTERS : PARAGRAPHS).filter((text) =>
    isComposedOf(text, ctx.allowed),
  );
  if (pool.length === 0) return generateSentences(ctx, 'mixed', targetLength);
  const separator = source === 'letters' ? '\n' : ' ';
  const parts: string[] = [];
  let length = 0;
  let deck = ctx.rng.shuffle(pool);
  // Mindestens ein vollständiger Text; weitere nur, bis die Ziellänge annähernd erreicht ist.
  while (parts.length === 0 || length < targetLength * 0.85) {
    if (deck.length === 0) deck = ctx.rng.shuffle(pool);
    const text = deck.shift() as string;
    length += text.length + (parts.length > 0 ? separator.length : 0);
    parts.push(text);
    if (parts.length > MAX_ITERATIONS) break;
  }
  return parts.join(separator);
}

function generateFromSpec(ctx: GenerationContext, spec: ExerciseSpec): string {
  switch (spec.kind) {
    case 'fixed':
      return spec.text;
    case 'keys':
      return generateKeys(ctx, spec.targetLength);
    case 'phrases':
      return generatePhrases(ctx, spec.targetLength);
    case 'combinations':
      return generateCombinations(ctx, spec.source, spec.targetLength);
    case 'words':
      return generateWords(ctx, spec);
    case 'sentences':
      return generateSentences(ctx, spec.source, spec.targetLength);
    case 'text':
      return generateText(ctx, spec.source, spec.targetLength);
  }
}

/** Zeichen mit erhöhtem Gewicht, die tatsächlich im Text vorkommen. */
function detectAdaptiveChars(text: string, weights: CharWeights | undefined): string[] {
  if (!weights) return [];
  const present = new Set([...text].map(statKeyForChar));
  return [...weights.entries()]
    .filter(([char, weight]) => weight >= ADAPTIVE_HIGHLIGHT_WEIGHT && present.has(char))
    .sort((a, b) => b[1] - a[1])
    .map(([char]) => char);
}

function exerciseId(prefix: string, seed: number): string {
  return `${prefix}-${seed.toString(36)}`;
}

export interface GenerateLessonOptions {
  lesson: Lesson;
  seed: number;
  charWeights?: CharWeights;
}

/** Erzeugt den Übungstext für eine Lektion – nur aus bereits gelernten Zeichen. */
export function generateLessonExercise({
  lesson,
  seed,
  charWeights,
}: GenerateLessonOptions): Exercise {
  const allowed = getAllowedChars(getLessonIndex(lesson.id));
  const relevantWeights = charWeights
    ? new Map([...charWeights].filter(([char]) => allowed.has(char)))
    : undefined;
  const ctx: GenerationContext = {
    allowed,
    focus: lesson.focusChars,
    rng: createRng(seed),
    weights: relevantWeights,
  };
  const text = generateFromSpec(ctx, lesson.exercise);
  return {
    id: exerciseId(lesson.id, seed),
    lessonId: lesson.id,
    seed,
    text,
    ...(lesson.timeLimitSec !== undefined ? { timeLimitSec: lesson.timeLimitSec } : {}),
    adaptiveChars:
      lesson.exercise.kind === 'fixed' ? [] : detectAdaptiveChars(text, relevantWeights),
  };
}

export interface GenerateReviewOptions {
  /** Zeichen, die gezielt trainiert werden sollen (statKey-normalisiert). */
  focusChars: readonly string[];
  /** Bereits gelernte Zeichen. */
  learnedChars: ReadonlySet<string>;
  seed: number;
}

const SHORT_WORD_MAX_LENGTH = 5;

/** Übung „Fehler wiederholen“: echte Wörter mit den Problemzeichen – keine Buchstabensalate. */
export function generateReviewExercise({
  focusChars,
  learnedChars,
  seed,
}: GenerateReviewOptions): Exercise {
  const rng = createRng(seed);
  // Mindestens die Zeichen der ersten Lektion, damit immer eine sinnvolle Übung entsteht.
  const allowed = new Set([...getAllowedChars(0), ...learnedChars]);
  const focus = focusChars.filter((char) => allowed.has(char));
  const weights = new Map(focus.map((char) => [char, 3]));
  const letterFocus = focus.filter(isLetter);
  const punctuation = focus.filter((char) => !isLetter(char) && char !== ' ' && char !== '\n');
  const letterCount = [...allowed].filter(isLetter).length;

  let text: string;
  if (letterCount < REVIEW_MIN_LETTERS_FOR_WORDS) {
    text = generateKeys({ allowed, focus: letterFocus, rng, weights }, REVIEW_TARGET_LENGTH);
  } else {
    const caseMode: CaseMode = allowed.has('A') ? 'natural' : 'lower';
    // Die ersten Wörter enthalten kleingeschriebene Nomen – nur ohne Großschreibung passend.
    const pool = unique([
      ...wordsForSource('common', caseMode),
      ...(caseMode === 'lower' ? wordsForSource('first', caseMode) : []),
      ...wordsForSource('long', caseMode),
      ...wordsForSource('eszett', caseMode),
    ]).filter((word) => isComposedOf(word, allowed));
    // Ohne Buchstaben im Fokus (z. B. nur Leertaste): kurze Wörter mit vielen Leerzeichen.
    const focusWords =
      letterFocus.length > 0
        ? pool.filter((word) =>
            [...word].some((char) => letterFocus.includes(statKeyForChar(char))),
          )
        : pool.filter((word) => word.length <= SHORT_WORD_MAX_LENGTH);

    if (focusWords.length >= 3) {
      const picker = new TokenPicker(focusWords, rng, (word) => tokenWeight(word, weights), 2);
      const filler = new TokenPicker(pool, rng, () => 1, 2);
      text = fillToLength(REVIEW_TARGET_LENGTH, () =>
        rng.next() < 0.85 ? picker.next() : filler.next(),
      );
    } else {
      text = generateKeys({ allowed, focus: letterFocus, rng, weights }, REVIEW_TARGET_LENGTH);
    }

    // Satzzeichen lassen sich nur in Sätzen sinnvoll üben.
    if (punctuation.length > 0) {
      const sentences = sentencesForSource('mixed').filter(
        (sentence) =>
          isComposedOf(sentence, allowed) && punctuation.some((char) => sentence.includes(char)),
      );
      if (sentences.length > 0) {
        text = [text, ...rng.shuffle(sentences).slice(0, 2)].join(' ');
      }
    }

    // Enter wird mit kurzen Briefen geübt.
    if (focus.includes('\n')) {
      const letters = LETTERS.filter((letter) => isComposedOf(letter, allowed));
      if (letters.length > 0) text = [text, rng.pick(letters)].join('\n');
    }
  }

  return {
    id: exerciseId(REVIEW_EXERCISE_ID, seed),
    lessonId: REVIEW_EXERCISE_ID,
    seed,
    text,
    adaptiveChars: focus.filter((char) => [...text].some((c) => statKeyForChar(c) === char)),
  };
}
