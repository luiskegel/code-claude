import { expect, test } from '@playwright/test';
import {
  exerciseText,
  PROGRESS_KEY,
  readStorage,
  seedSettings,
  startLesson,
  typeExercise,
  type StoredProgress,
} from './helpers';

test.describe('Tastatureingabe', () => {
  test('Umlaute werden über die echte Tastatur erkannt', async ({ page }) => {
    await seedSettings(page, { freeLessonChoice: true });
    await startLesson(page, 'ue-ae');
    const text = await exerciseText(page);
    expect(text).toMatch(/[üä]/);
    await typeExercise(page, text);
    await expect(
      page.getByRole('heading', { level: 1, name: /Sehr gut!|Sauber\.|Geschafft\./ }),
    ).toBeVisible();
    const progress = await readStorage<StoredProgress>(page, PROGRESS_KEY);
    expect(progress?.history[0]?.accuracy).toBe(100);
  });

  test('Großbuchstaben, Satzzeichen, ß und Enter funktionieren', async ({ page }) => {
    await seedSettings(page, { freeLessonChoice: true });
    await startLesson(page, 'briefe');
    const text = await exerciseText(page);
    expect(text).toContain('\n');
    expect(text).toMatch(/[A-ZÄÖÜ]/);
    await typeExercise(page, text);
    await expect(
      page.getByRole('heading', { level: 1, name: /Sehr gut!|Sauber\.|Geschafft\./ }),
    ).toBeVisible();
  });

  test('zeigt bei Großbuchstaben die Umschalttaste der anderen Hand', async ({ page }) => {
    await seedSettings(page, { freeLessonChoice: true });
    await startLesson(page, 'grossbuchstaben');
    const text = await exerciseText(page);
    const capitalIndex = text.search(/[A-ZÄÖÜ]/);
    await typeExercise(page, text.slice(0, capitalIndex));
    await expect(page.getByText(/Umschalttaste: (linker|rechter) kleiner Finger/)).toBeVisible();
    await expect(page.locator('.kb-key[data-state="modifier"]')).toHaveCount(1);
  });

  test('im Modus „Weiterschreiben" lassen sich Fehler mit der Rücktaste korrigieren', async ({
    page,
  }) => {
    await seedSettings(page, { errorMode: 'continue' });
    await startLesson(page, 'grundstellung');
    await page.keyboard.press('k');
    await expect(page.locator('.tt-char[data-status="incorrect"]')).toHaveCount(1);
    await page.keyboard.press('Backspace');
    await expect(page.locator('.tt-char[data-status="incorrect"]')).toHaveCount(0);
    await typeExercise(page, await exerciseText(page));
    await expect(
      page.getByRole('heading', { level: 1, name: /Sehr gut!|Sauber\.|Geschafft\./ }),
    ).toBeVisible();
    const progress = await readStorage<StoredProgress>(page, PROGRESS_KEY);
    expect(progress?.history[0]?.errors).toBe(1);
  });

  test('pausiert mit Escape und läuft beim nächsten Anschlag weiter', async ({ page }) => {
    await seedSettings(page);
    await startLesson(page, 'grundstellung');
    await page.keyboard.press('f');
    await page.keyboard.press('Escape');
    await expect(page.getByText('Pausiert')).toBeVisible();
    await page.keyboard.press('Space');
    // Die Leertaste gehört zu den Buttons – Buchstaben setzen die Übung fort.
    await page.getByRole('button', { name: 'Weiter tippen' }).click();
    await expect(page.getByText('Pausiert')).toHaveCount(0);
    await page.keyboard.type(' j');
    await expect(page.locator('.tt-char[data-status="correct"]')).toHaveCount(3);
  });

  test('ignoriert Tastenkürzel und gehaltene Tasten', async ({ page }) => {
    await seedSettings(page);
    await startLesson(page, 'grundstellung');
    await page.keyboard.press('Meta+a');
    await page.keyboard.press('Control+a');
    await expect(page.locator('.tt-char[data-status="incorrect"]')).toHaveCount(0);
    await expect(
      page.getByText('Fehler', { exact: true }).locator('..').getByText('0'),
    ).toBeVisible();
  });

  test('eingefügter Text zählt nicht als Tippen', async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL });
    await seedSettings(page);
    await startLesson(page, 'grundstellung');
    const text = await exerciseText(page);
    await page.keyboard.press('f');
    await page.evaluate((rest) => navigator.clipboard.writeText(rest), text.slice(1));
    await page.keyboard.press('ControlOrMeta+V');
    // Die Übung läuft unverändert weiter: nur das getippte „f“ zählt.
    await expect(page.getByRole('heading', { name: 'Lektion 1 · Grundstellung' })).toBeVisible();
    await expect(page.locator('.tt-char[data-status="correct"]')).toHaveCount(1);
    await expect(page.getByText('Nächste Taste')).toBeVisible();
    expect(await page.evaluate((key) => window.localStorage.getItem(key), PROGRESS_KEY)).toBeNull();
  });

  test('Neu starten setzt die Übung zurück', async ({ page }) => {
    await seedSettings(page);
    await startLesson(page, 'grundstellung');
    await page.keyboard.type('f j');
    await page.getByRole('button', { name: 'Neu starten' }).click();
    await expect(page.locator('.tt-char[data-status="correct"]')).toHaveCount(0);
    await expect(page.getByText('0 %')).toBeVisible();
  });

  test('Zeitübungen enden automatisch nach Ablauf der Zeit', async ({ page }) => {
    await page.clock.install();
    await seedSettings(page, { freeLessonChoice: true });
    await startLesson(page, 'tempo-sprint');
    const text = await exerciseText(page);
    await page.keyboard.type(text.slice(0, 40));
    const countdown = page.getByRole('progressbar', { name: 'Fortschritt der Übung' });
    await expect(countdown).toHaveAttribute('aria-valuetext', /^Noch (1:00|0:5\d) Minuten$/);
    await page.clock.runFor(61_000);
    // 40 Zeichen in einer Minute = 8 WPM → unter der Mindestgeschwindigkeit für Zeitübungen.
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Noch ein bisschen flotter.');
    const results = page.getByRole('region', { name: 'Noch ein bisschen flotter.' });
    await expect(results.getByText('Zeit', { exact: true }).locator('..')).toContainText('1:00');
    await expect(results.getByText('Geschwindigkeit', { exact: true }).locator('..')).toContainText(
      '8',
    );
  });
});
