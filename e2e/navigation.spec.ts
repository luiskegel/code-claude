import { expect, test } from '@playwright/test';
import {
  PROGRESS_KEY,
  seedSettings,
  SETTINGS_KEY,
  startLesson,
  exerciseText,
  typeExercise,
} from './helpers';

test.describe('Navigation und Robustheit', () => {
  test('markiert die aktive Seite und unterstützt den Zurück-Button', async ({ page }) => {
    await seedSettings(page);
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Hauptnavigation' });
    await expect(nav.getByRole('link', { name: 'Übersicht' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await nav.getByRole('link', { name: 'Lernen' }).click();
    await expect(nav.getByRole('link', { name: 'Lernen' })).toHaveAttribute('aria-current', 'page');
    await page.getByRole('link', { name: /Lektion 1.*Grundstellung/ }).click();
    await expect(page).toHaveURL(/\/lernen\/grundstellung$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/lernen$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Guten|Hallo/);
  });

  test('Zurück während einer Übung verwirft sie sauber', async ({ page }) => {
    await seedSettings(page);
    await page.goto('/lernen');
    await startLesson(page, 'grundstellung');
    await page.keyboard.type('f j');
    await page.goBack();
    await page.goForward();
    await expect(page.getByRole('heading', { name: 'Lektion 1 · Grundstellung' })).toBeVisible();
    expect(await page.evaluate((key) => window.localStorage.getItem(key), PROGRESS_KEY)).toBeNull();
  });

  test('zeigt eine 404-Seite für unbekannte Adressen', async ({ page }) => {
    await seedSettings(page);
    await page.goto('/irgendwas/unbekanntes');
    await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeVisible();
    await page.getByRole('link', { name: 'Zur Übersicht' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('übersteht beschädigte gespeicherte Daten', async ({ page }) => {
    await page.addInitScript(
      ([settingsKey, progressKey]) => {
        window.localStorage.setItem(settingsKey, '{"onboardingCompleted":true,"theme":"neon"');
        window.localStorage.setItem(progressKey, '[kaputt');
      },
      [SETTINGS_KEY, PROGRESS_KEY] as const,
    );
    await page.goto('/');
    // Unlesbare Einstellungen → sichere Standardwerte → Einführung startet.
    await expect(
      page.getByRole('heading', { name: 'Willkommen beim Zehn-Finger-Training.' }),
    ).toBeVisible();
  });

  test('funktioniert auch ohne nutzbaren LocalStorage', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('Zugriff verweigert', 'SecurityError');
        },
      });
    });
    await page.goto('/');
    await page.getByRole('button', { name: 'Überspringen' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Guten|Hallo/);
    await expect(page.getByText(/kein dauerhaftes Speichern/)).toBeVisible();

    // Innerhalb der Sitzung funktioniert alles (nur ohne Neuladen – der Speicher lebt im Tab).
    await page.getByRole('link', { name: 'Weiterlernen' }).click();
    await page.getByRole('button', { name: 'Direkt zur Übung' }).click();
    await page.getByRole('button', { name: 'Übung starten' }).click();
    await typeExercise(page, await exerciseText(page));
    await expect(page.getByText('Lektion 2 freigeschaltet')).toBeVisible();
    await page
      .getByRole('navigation', { name: 'Hauptnavigation' })
      .getByRole('link', { name: 'Übersicht' })
      .click();
    await expect(page.getByText('1 von 29 Lektionen abgeschlossen')).toBeVisible();
  });

  test('synchronisiert den Fortschritt zwischen zwei Tabs', async ({ page, context }) => {
    await seedSettings(page);
    await page.goto('/');
    const second = await context.newPage();
    await second.goto('/');
    await expect(second.getByText('0 von 29 Lektionen abgeschlossen')).toBeVisible();
    await startLesson(page, 'grundstellung');
    await typeExercise(page, await exerciseText(page));
    await expect(page.getByText('Lektion 2 freigeschaltet')).toBeVisible();
    await expect(second.getByText('1 von 29 Lektionen abgeschlossen')).toBeVisible();
  });

  test('Theme-Schnellumschalter wechselt Hell → Dunkel → System', async ({ page }) => {
    await seedSettings(page, { theme: 'light' });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /Darstellung: Hell/ });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: /Darstellung: Dunkel/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Skip-Link führt per Tastatur zum Inhalt', async ({ page }) => {
    await seedSettings(page);
    await page.goto('/lernen');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Zum Inhalt springen' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#inhalt')).toBeFocused();
  });
});
