import { expect, test } from '@playwright/test';
import { exerciseText, seedSettings, startLesson, typeExercise } from './helpers';

test.describe('Dauerhafte Speicherung', () => {
  test('holt die letzte Übung aus der Gerätesicherung zurück, wenn der Browser sie verloren hat', async ({
    page,
  }) => {
    await seedSettings(page);
    await page.goto('/');
    await expect(page.getByText('0 von 29 Lektionen abgeschlossen')).toBeVisible();
    // So sah der Browserspeicher vor der Übung aus.
    const before = await page.evaluate(() => ({ ...window.localStorage }));

    await startLesson(page, 'grundstellung');
    await typeExercise(page, await exerciseText(page));
    await expect(page.getByText('Lektion 2 freigeschaltet')).toBeVisible();

    // Absturz simulieren: Der Browser hat die letzten Änderungen nicht mehr festgeschrieben.
    await page.evaluate((stored) => {
      window.localStorage.clear();
      for (const [key, value] of Object.entries(stored)) window.localStorage.setItem(key, value);
    }, before);
    await page.goto('/');

    await expect(page.getByText('1 von 29 Lektionen abgeschlossen')).toBeVisible();
    await page.goto('/statistiken');
    await expect(
      page.getByRole('region', { name: 'Letzte Übungen' }).getByRole('cell', {
        name: 'Lektion 1 · Grundstellung',
      }),
    ).toBeVisible();
  });

  test('übersteht das vollständige Leeren des LocalStorage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Überspringen' }).click();
    await startLesson(page, 'grundstellung');
    await typeExercise(page, await exerciseText(page));
    await expect(page.getByText('Lektion 2 freigeschaltet')).toBeVisible();

    await page.evaluate(() => window.localStorage.clear());
    await page.goto('/');
    // Keine Einführung, der Fortschritt ist da.
    await expect(page.getByText('1 von 29 Lektionen abgeschlossen')).toBeVisible();
  });

  test('„Alle Daten löschen“ löscht auch die Gerätesicherung', async ({ page }) => {
    // Ohne seedSettings: Das Testskript würde gelöschte Einstellungen sonst neu anlegen.
    await page.goto('/');
    await page.getByRole('button', { name: 'Überspringen' }).click();
    await startLesson(page, 'grundstellung');
    await typeExercise(page, await exerciseText(page));
    await expect(page.getByText('Lektion 2 freigeschaltet')).toBeVisible();

    await page.goto('/einstellungen');
    await page.getByRole('button', { name: 'Alles löschen …' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Alles löschen' }).click();
    await expect(
      page.getByRole('heading', { name: 'Willkommen beim Zehn-Finger-Training.' }),
    ).toBeVisible();

    await page.reload();
    await expect(
      page.getByRole('heading', { name: 'Willkommen beim Zehn-Finger-Training.' }),
    ).toBeVisible();
  });
});
