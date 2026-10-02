import type { CharStat } from '../typing/engine';

export type ExerciseOrigin = 'lesson' | 'review';

/** Ergebnis einer abgeschlossenen Übung – so wird es gespeichert. */
export interface ExerciseResult {
  id: string;
  /** Lektions-ID oder „wiederholen“ */
  lessonId: string;
  origin: ExerciseOrigin;
  /** ISO-Zeitstempel des Abschlusses */
  completedAt: string;
  /** Lokaler Kalendertag des Abschlusses (JJJJ-MM-TT) – Grundlage für den Streak */
  localDate: string;
  durationMs: number;
  textLength: number;
  typedChars: number;
  correctChars: number;
  keystrokes: number;
  correctKeystrokes: number;
  errors: number;
  wpm: number;
  accuracy: number;
  passed: boolean;
  timed: boolean;
  /** Treffer und Fehler je Zeichen (Kleinbuchstaben-normalisiert) */
  charStats: Record<string, CharStat>;
}

export interface LessonProgress {
  attempts: number;
  passed: boolean;
  bestWpm: number | null;
  bestAccuracy: number | null;
  lastPracticedAt: string | null;
  passedAt: string | null;
}

/** Summen über alle Übungen – bleiben erhalten, auch wenn der Verlauf gekürzt wird. */
export interface ProgressTotals {
  exercises: number;
  practiceMs: number;
  keystrokes: number;
  correctKeystrokes: number;
  wpmSum: number;
  accuracySum: number;
}

export interface Records {
  bestWpm: number | null;
  bestAccuracy: number | null;
}

export interface StreakState {
  current: number;
  longest: number;
  lastPracticeDate: string | null;
}

export const PROGRESS_VERSION = 1;

export interface ProgressState {
  version: typeof PROGRESS_VERSION;
  lessons: Record<string, LessonProgress>;
  /** Älteste zuerst, begrenzt auf MAX_HISTORY Einträge */
  history: ExerciseResult[];
  totals: ProgressTotals;
  records: Records;
  streak: StreakState;
  lastLessonId: string | null;
}
