import { expect, test } from '@playwright/test';
import {
  collectConsoleProblems,
  exerciseText,
  PROGRESS_KEY,
  readStorage,
  seedSettings,
  startLesson,
  typeExercise,
  type StoredProgress,
} from './helpers';

const RESULT_HEADING = /Sehr gut!|Sauber\.|Geschafft\.|Fast geschafft\./;

test('„Fehler wiederholen“ baut eine Übung aus echten Fehlern', async ({ page }) => {
  const problems = collectConsoleProblems(page);
  await seedSettings(page);

  await test.step('Lektion mit absichtlichen Fehlern auf F abschließen', async () => {
    await startLesson(page, 'grundstellung');
    const text = await exerciseText(page);
    let misses = 0;
    for (const char of text) {
      if (char === 'f' && misses < 3) {
        await page.keyboard.press('d');
        misses++;
      }
      await page.keyboard.press(char === ' ' ? 'Space' : char);
    }
    await expect(page.getByRole('heading', { level: 1, name: RESULT_HEADING })).toBeVisible();
  });

  await test.step('Fehlertaste wird erkannt und vorausgewählt', async () => {
    await page
      .getByRole('navigation', { name: 'Hauptnavigation' })
      .getByRole('link', { name: 'Fehler wiederholen' })
      .click();
    await expect(page.getByRole('heading', { name: 'Deine häufigsten Fehler' })).toBeVisible();
    const options = page.getByRole('checkbox');
    await expect(options).toHaveCount(1);
    await expect(options.first()).toBeChecked();
    await expect(page.getByText('3 Fehler', { exact: true })).toBeVisible();
  });

  await test.step('Abwahl deaktiviert den Start, erneute Auswahl aktiviert ihn', async () => {
    const start = page.getByRole('button', { name: 'Diese Tasten trainieren' });
    await page.getByRole('checkbox').first().uncheck();
    await expect(start).toBeDisabled();
    await expect(page.getByText('Wähle mindestens eine Taste aus.')).toBeVisible();
    await page.getByRole('checkbox').first().check();
    await expect(start).toBeEnabled();
  });

  await test.step('Wiederholungsübung durchführen', async () => {
    await page.getByRole('button', { name: 'Diese Tasten trainieren' }).click();
    await expect(page.getByRole('heading', { name: 'Training: F' })).toBeVisible();
    const text = await exerciseText(page);
    expect(text).toContain('f');
    await typeExercise(page, text);
    await expect(page.getByRole('heading', { level: 1, name: RESULT_HEADING })).toBeVisible();
    await page.getByRole('button', { name: 'Zur Fehlerübersicht' }).click();
    await expect(page.getByRole('heading', { name: 'Fehler wiederholen', level: 1 })).toBeVisible();
  });

  await test.step('Ergebnis wird gespeichert, ohne Lektionen zu verändern', async () => {
    const progress = await readStorage<StoredProgress>(page, PROGRESS_KEY);
    expect(progress?.history.map((entry) => entry.lessonId)).toEqual([
      'grundstellung',
      'wiederholen',
    ]);
    expect(progress?.history[1]?.accuracy).toBe(100);
    expect(Object.keys(progress?.lessons ?? {})).toEqual(['grundstellung']);
  });

  expect(problems).toEqual([]);
});
