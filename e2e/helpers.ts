import { expect, type Page } from '@playwright/test';

export const SETTINGS_KEY = 'typeflow:settings';
export const PROGRESS_KEY = 'typeflow:progress';

/** Legt Einstellungen an, bevor die App startet (nur wenn noch keine existieren). */
export async function seedSettings(page: Page, overrides: Record<string, unknown> = {}) {
  const settings = {
    version: 1,
    onboardingCompleted: true,
    theme: 'light',
    keyboardLayout: 'apple-de',
    goal: 'beginner',
    soundEnabled: false,
    animationsEnabled: false,
    showErrorHints: true,
    showLiveWpm: true,
    showHands: true,
    errorMode: 'correct',
    freeLessonChoice: false,
    ...overrides,
  };
  await page.addInitScript(
    ([key, value]) => {
      if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, value);
    },
    [SETTINGS_KEY, JSON.stringify(settings)] as const,
  );
}

/** Der aktuelle Übungstext (aus der Beschreibung für Screenreader). */
export async function exerciseText(page: Page): Promise<string> {
  const raw = (await page.locator('p.sr-only', { hasText: 'Übungstext:' }).textContent()) ?? '';
  return raw.replace(/^Übungstext: /, '').replaceAll(' Zeilenumbruch ', '\n');
}

/** Öffnet eine Lektion und startet die Übung (überspringt die Theorie, falls vorhanden). */
export async function startLesson(page: Page, lessonId: string) {
  await page.goto(`/lernen/${lessonId}`);
  const skipTheory = page.getByRole('button', { name: 'Direkt zur Übung' });
  if (await skipTheory.isVisible().catch(() => false)) await skipTheory.click();
  await page.getByRole('button', { name: 'Übung starten' }).click();
  await expect(page.getByLabel('Übungstext abtippen')).toBeFocused();
}

export async function typeExercise(page: Page, text: string) {
  await page.keyboard.type(text, { delay: 5 });
}

/** Sammelt Konsolenfehler, -warnungen und nicht abgefangene Ausnahmen der Seite. */
export function collectConsoleProblems(page: Page): string[] {
  const problems: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      problems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
  return problems;
}

export async function readStorage<T>(page: Page, key: string): Promise<T | null> {
  const raw = await page.evaluate((storageKey) => window.localStorage.getItem(storageKey), key);
  return raw === null ? null : (JSON.parse(raw) as T);
}

export interface StoredProgress {
  lessons: Record<string, { passed: boolean; attempts: number }>;
  history: { lessonId: string; errors: number; accuracy: number; wpm: number }[];
  totals: { exercises: number };
  streak: { current: number };
}
