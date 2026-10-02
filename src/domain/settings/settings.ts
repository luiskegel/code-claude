import type { KeyboardLayoutId } from '../keyboard/layouts';
import type { ErrorMode } from '../typing/engine';

export type ThemePreference = 'light' | 'dark' | 'system';
export type LearningGoal = 'beginner' | 'speed' | 'accuracy' | 'technique';

export const SETTINGS_VERSION = 1;

export interface UserSettings {
  version: typeof SETTINGS_VERSION;
  onboardingCompleted: boolean;
  theme: ThemePreference;
  keyboardLayout: KeyboardLayoutId;
  goal: LearningGoal;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  /** Fehlerhinweis mit richtiger Taste und Finger direkt anzeigen */
  showErrorHints: boolean;
  /** Live-Geschwindigkeit während der Übung anzeigen */
  showLiveWpm: boolean;
  /** Handgrafik mit hervorgehobenem Finger anzeigen */
  showHands: boolean;
  errorMode: ErrorMode;
  /** Alle Lektionen unabhängig vom Fortschritt freischalten */
  freeLessonChoice: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  version: SETTINGS_VERSION,
  onboardingCompleted: false,
  theme: 'system',
  keyboardLayout: 'apple-de',
  goal: 'beginner',
  soundEnabled: false,
  animationsEnabled: true,
  showErrorHints: true,
  showLiveWpm: true,
  showHands: true,
  errorMode: 'correct',
  freeLessonChoice: false,
};

export const THEME_PREFERENCES: readonly ThemePreference[] = ['light', 'dark', 'system'];
export const LEARNING_GOALS: readonly LearningGoal[] = [
  'beginner',
  'speed',
  'accuracy',
  'technique',
];
export const ERROR_MODES: readonly ErrorMode[] = ['correct', 'continue'];

export interface GoalOption {
  id: LearningGoal;
  title: string;
  description: string;
}

export const GOAL_OPTIONS: readonly GoalOption[] = [
  {
    id: 'beginner',
    title: 'Ich bin kompletter Anfänger',
    description: 'Schritt für Schritt von der Grundstellung bis zu ganzen Texten.',
  },
  {
    id: 'speed',
    title: 'Ich möchte schneller schreiben',
    description: 'Alle Lektionen sind frei wählbar, Fehler bremsen dich nicht aus.',
  },
  {
    id: 'accuracy',
    title: 'Ich möchte genauer schreiben',
    description: 'Fehler werden direkt korrigiert, alle Lektionen sind frei wählbar.',
  },
  {
    id: 'technique',
    title: 'Ich möchte meine Technik verbessern',
    description: 'Fokus auf Fingerzuordnung und Grundstellung, alle Lektionen frei wählbar.',
  },
];

/** Sinnvolle Voreinstellungen je Lernziel (werden beim Onboarding übernommen). */
export function settingsForGoal(goal: LearningGoal): Partial<UserSettings> {
  switch (goal) {
    case 'beginner':
      return { goal, freeLessonChoice: false, errorMode: 'correct', showHands: true };
    case 'speed':
      return { goal, freeLessonChoice: true, errorMode: 'continue' };
    case 'accuracy':
      return { goal, freeLessonChoice: true, errorMode: 'correct' };
    case 'technique':
      return { goal, freeLessonChoice: true, errorMode: 'correct', showHands: true };
  }
}
