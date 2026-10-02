import { isKeyboardLayoutId } from '../keyboard/layouts';
import { isValidDateKey } from '../progress/dates';
import { createEmptyProgress, MAX_HISTORY } from '../progress/progress';
import {
  PROGRESS_VERSION,
  type ExerciseResult,
  type LessonProgress,
  type ProgressState,
  type StreakState,
} from '../progress/types';
import {
  DEFAULT_SETTINGS,
  ERROR_MODES,
  LEARNING_GOALS,
  SETTINGS_VERSION,
  THEME_PREFERENCES,
  type UserSettings,
} from '../settings/settings';
import type { CharStat } from '../typing/engine';

/**
 * Gespeicherte Daten werden nie blind übernommen: Jedes Feld wird geprüft,
 * ungültige Werte fallen auf sichere Standardwerte zurück.
 */

type UnknownRecord = Record<string, unknown>;

export function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readBoolean(source: UnknownRecord, key: string, fallback: boolean): boolean {
  const value = source[key];
  return typeof value === 'boolean' ? value : fallback;
}

function readEnum<T extends string>(
  source: UnknownRecord,
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  const value = source[key];
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function readNonNegative(source: UnknownRecord, key: string, fallback = 0): number {
  const value = source[key];
  return isFiniteNumber(value) && value >= 0 ? value : fallback;
}

function readNonNegativeInt(source: UnknownRecord, key: string, fallback = 0): number {
  const value = source[key];
  return isFiniteNumber(value) && value >= 0 ? Math.floor(value) : fallback;
}

function readNullableNumber(
  source: UnknownRecord,
  key: string,
  max = Number.POSITIVE_INFINITY,
): number | null {
  const value = source[key];
  return isFiniteNumber(value) && value >= 0 && value <= max ? value : null;
}

function isIsoTimestamp(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 40 && !Number.isNaN(Date.parse(value));
}

function readNullableTimestamp(source: UnknownRecord, key: string): string | null {
  const value = source[key];
  return isIsoTimestamp(value) ? value : null;
}

function isSafeId(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= 80;
}

// ── Migration ───────────────────────────────────────────────────────────

export type Migration = (data: UnknownRecord) => UnknownRecord;

/**
 * Führt Migrationen schrittweise bis zur aktuellen Version aus.
 * Gibt null zurück, wenn die Daten unbrauchbar sind oder keine Migration existiert.
 * Daten aus einer neueren Version werden bestmöglich übernommen.
 */
export function runMigrations(
  raw: unknown,
  currentVersion: number,
  migrations: Readonly<Record<number, Migration>>,
): UnknownRecord | null {
  if (!isRecord(raw)) return null;
  let version = isFiniteNumber(raw.version) ? Math.floor(raw.version) : 0;
  let data: UnknownRecord = raw;
  if (version >= currentVersion) return data;
  while (version < currentVersion) {
    const migrate = migrations[version];
    if (!migrate) return null;
    data = migrate(data);
    version += 1;
  }
  return { ...data, version: currentVersion };
}

/** Version 0: Daten ohne Versionsfeld (Vorabversion) – Struktur ist identisch. */
export const SETTINGS_MIGRATIONS: Readonly<Record<number, Migration>> = {
  0: (data) => ({ ...data, version: 1 }),
};

export const PROGRESS_MIGRATIONS: Readonly<Record<number, Migration>> = {
  0: (data) => ({ ...data, version: 1 }),
};

// ── Einstellungen ───────────────────────────────────────────────────────

export function parseSettings(raw: unknown): UserSettings {
  const data = runMigrations(raw, SETTINGS_VERSION, SETTINGS_MIGRATIONS);
  if (!data) return { ...DEFAULT_SETTINGS };
  const d = DEFAULT_SETTINGS;
  return {
    version: SETTINGS_VERSION,
    onboardingCompleted: readBoolean(data, 'onboardingCompleted', d.onboardingCompleted),
    theme: readEnum(data, 'theme', THEME_PREFERENCES, d.theme),
    keyboardLayout: isKeyboardLayoutId(data.keyboardLayout)
      ? data.keyboardLayout
      : d.keyboardLayout,
    goal: readEnum(data, 'goal', LEARNING_GOALS, d.goal),
    soundEnabled: readBoolean(data, 'soundEnabled', d.soundEnabled),
    animationsEnabled: readBoolean(data, 'animationsEnabled', d.animationsEnabled),
    showErrorHints: readBoolean(data, 'showErrorHints', d.showErrorHints),
    showLiveWpm: readBoolean(data, 'showLiveWpm', d.showLiveWpm),
    showHands: readBoolean(data, 'showHands', d.showHands),
    errorMode: readEnum(data, 'errorMode', ERROR_MODES, d.errorMode),
    freeLessonChoice: readBoolean(data, 'freeLessonChoice', d.freeLessonChoice),
  };
}

// ── Fortschritt ─────────────────────────────────────────────────────────

function parseCharStats(raw: unknown): Record<string, CharStat> {
  const result: Record<string, CharStat> = {};
  if (!isRecord(raw)) return result;
  for (const [char, value] of Object.entries(raw)) {
    if (char.length === 0 || char.length > 2 || !isRecord(value)) continue;
    const hits = readNonNegativeInt(value, 'hits');
    const misses = readNonNegativeInt(value, 'misses');
    if (hits + misses > 0) result[char] = { hits, misses };
  }
  return result;
}

export function parseExerciseResult(raw: unknown): ExerciseResult | null {
  if (!isRecord(raw)) return null;
  if (!isSafeId(raw.id) || !isSafeId(raw.lessonId)) return null;
  if (!isIsoTimestamp(raw.completedAt) || !isValidDateKey(raw.localDate)) return null;
  const wpm = raw.wpm;
  const accuracy = raw.accuracy;
  if (!isFiniteNumber(wpm) || wpm < 0 || wpm > 1000) return null;
  if (!isFiniteNumber(accuracy) || accuracy < 0 || accuracy > 100) return null;
  return {
    id: raw.id,
    lessonId: raw.lessonId,
    origin: readEnum(raw, 'origin', ['lesson', 'review'] as const, 'lesson'),
    completedAt: raw.completedAt,
    localDate: raw.localDate,
    durationMs: readNonNegative(raw, 'durationMs'),
    textLength: readNonNegativeInt(raw, 'textLength'),
    typedChars: readNonNegativeInt(raw, 'typedChars'),
    correctChars: readNonNegativeInt(raw, 'correctChars'),
    keystrokes: readNonNegativeInt(raw, 'keystrokes'),
    correctKeystrokes: readNonNegativeInt(raw, 'correctKeystrokes'),
    errors: readNonNegativeInt(raw, 'errors'),
    wpm,
    accuracy,
    passed: readBoolean(raw, 'passed', false),
    timed: readBoolean(raw, 'timed', false),
    charStats: parseCharStats(raw.charStats),
  };
}

function parseLessonProgress(raw: unknown): LessonProgress | null {
  if (!isRecord(raw)) return null;
  return {
    attempts: readNonNegativeInt(raw, 'attempts'),
    passed: readBoolean(raw, 'passed', false),
    bestWpm: readNullableNumber(raw, 'bestWpm', 1000),
    bestAccuracy: readNullableNumber(raw, 'bestAccuracy', 100),
    lastPracticedAt: readNullableTimestamp(raw, 'lastPracticedAt'),
    passedAt: readNullableTimestamp(raw, 'passedAt'),
  };
}

function parseStreak(raw: unknown): StreakState {
  if (!isRecord(raw)) return { current: 0, longest: 0, lastPracticeDate: null };
  const lastPracticeDate = isValidDateKey(raw.lastPracticeDate) ? raw.lastPracticeDate : null;
  const current = lastPracticeDate ? readNonNegativeInt(raw, 'current') : 0;
  return {
    current,
    longest: Math.max(readNonNegativeInt(raw, 'longest'), current),
    lastPracticeDate,
  };
}

export function parseProgress(raw: unknown): ProgressState {
  const data = runMigrations(raw, PROGRESS_VERSION, PROGRESS_MIGRATIONS);
  const empty = createEmptyProgress();
  if (!data) return empty;

  const lessons: Record<string, LessonProgress> = {};
  if (isRecord(data.lessons)) {
    for (const [id, value] of Object.entries(data.lessons)) {
      const parsed = isSafeId(id) ? parseLessonProgress(value) : null;
      if (parsed) lessons[id] = parsed;
    }
  }

  const history = (Array.isArray(data.history) ? data.history : [])
    .map(parseExerciseResult)
    .filter((result): result is ExerciseResult => result !== null)
    .slice(-MAX_HISTORY);

  const totalsRaw = isRecord(data.totals) ? data.totals : {};
  const exercises = Math.max(readNonNegativeInt(totalsRaw, 'exercises'), history.length);
  const recordsRaw = isRecord(data.records) ? data.records : {};

  return {
    version: PROGRESS_VERSION,
    lessons,
    history,
    totals: {
      exercises,
      practiceMs: readNonNegative(totalsRaw, 'practiceMs'),
      keystrokes: readNonNegativeInt(totalsRaw, 'keystrokes'),
      correctKeystrokes: readNonNegativeInt(totalsRaw, 'correctKeystrokes'),
      wpmSum: readNonNegative(totalsRaw, 'wpmSum'),
      accuracySum: readNonNegative(totalsRaw, 'accuracySum'),
    },
    records: {
      bestWpm: readNullableNumber(recordsRaw, 'bestWpm', 1000),
      bestAccuracy: readNullableNumber(recordsRaw, 'bestAccuracy', 100),
    },
    streak: parseStreak(data.streak),
    lastLessonId: isSafeId(data.lastLessonId) ? data.lastLessonId : null,
  };
}
