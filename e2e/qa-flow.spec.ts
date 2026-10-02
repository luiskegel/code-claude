import { expect, test } from '@playwright/test';
import {
  collectConsoleProblems,
  exerciseText,
  PROGRESS_KEY,
  readStorage,
  SETTINGS_KEY,
  typeExercise,
  type StoredProgress,
} from './helpers';

/**
 * Der vollständige QA-Ablauf aus der Anforderung (Punkt 50), Schritt für Schritt.
 */
test('kompletter Lernablauf von der ersten Öffnung bis zum Zurücksetzen', async ({ page }) => {
  const problems = collectConsoleProblems(page);

  await test.step('1. Website öffnen', async () => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/willkommen$/);
    await expect(
      page.getByRole('heading', { name: 'Willkommen beim Zehn-Finger-Training.' }),
    ).toBeVisible();
  });

  await test.step('2. Onboarding durchführen', async () => {
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('heading', { name: 'Tastatur auswählen' })).toBeVisible();
    await page.getByText('Apple Magic Keyboard / QWERTZ').click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('heading', { name: 'Dein Ziel' })).toBeVisible();
    await page.getByText('Ich bin kompletter Anfänger').click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('heading', { name: 'Los geht’s' })).toBeVisible();
    await page.getByRole('button', { name: 'Lektion 1 starten' }).click();
    await expect(page).toHaveURL(/\/lernen\/grundstellung$/);
  });

  await test.step('3. erste Lektion starten', async () => {
    await expect(page.getByRole('heading', { name: 'Die richtige Haltung' })).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('heading', { name: 'Die Grundstellung' })).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Übung starten' }).click();
    await expect(page.getByLabel('Übungstext abtippen')).toBeFocused();
    await expect(page.getByText('Nächste Taste')).toBeVisible();
  });

  await test.step('4. korrekte Taste drücken', async () => {
    await page.keyboard.press('f');
    await expect(
      page.getByText('Fehler', { exact: true }).locator('..').getByText('0'),
    ).toBeVisible();
  });

  await test.step('5. falsche Taste drücken', async () => {
    await page.keyboard.press('Space');
    await page.keyboard.press('k');
    await expect(page.getByText(/Du hast „k“ getippt\. Richtig ist „j“/)).toBeVisible();
    await expect(
      page.getByText('Fehler', { exact: true }).locator('..').getByText('1'),
    ).toBeVisible();
  });

  await test.step('6. weiter tippen', async () => {
    const text = await exerciseText(page);
    expect(text).toBe('f j f j fj jf fj jf ff jj fj jf');
    await typeExercise(page, text.slice(2, 10));
    await expect(page.getByText(/Du hast „k“ getippt/)).toHaveCount(0);
  });

  await test.step('7. Lektion abschließen', async () => {
    const text = await exerciseText(page);
    await typeExercise(page, text.slice(10));
    await expect(
      page.getByRole('heading', { level: 1, name: /Sehr gut!|Sauber\.|Geschafft\./ }),
    ).toBeVisible();
  });

  await test.step('8. Ergebnis überprüfen', async () => {
    await expect(page.getByText('Lektion 2 freigeschaltet')).toBeVisible();
    const results = page.getByRole('region', { name: /Sehr gut!|Sauber\.|Geschafft\./ });
    await expect(results.getByText('Fehler', { exact: true }).locator('..')).toContainText('1');
    await expect(results.getByText('Genauigkeit', { exact: true }).locator('..')).toContainText(
      '96',
    );
    const progress = await readStorage<StoredProgress>(page, PROGRESS_KEY);
    expect(progress?.lessons.grundstellung?.passed).toBe(true);
    expect(progress?.history).toHaveLength(1);
    expect(progress?.history[0]?.errors).toBe(1);
  });

  await test.step('9. nächste Lektion öffnen', async () => {
    await page.getByRole('button', { name: 'Nächste Lektion' }).click();
    await expect(page).toHaveURL(/\/lernen\/f-j$/);
    await expect(page.getByRole('heading', { name: 'Lektion 2 · F und J' })).toBeVisible();
  });

  await test.step('10. Seite neu laden', async () => {
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Lektion 2 · F und J' })).toBeVisible();
  });

  await test.step('11. prüfen, ob Fortschritt vorhanden ist', async () => {
    await page.goto('/');
    await expect(page.getByText('1 von 29 Lektionen abgeschlossen')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Lektion 2 · F und J' })).toBeVisible();
    await page.goto('/lernen');
    await expect(page.getByRole('link', { name: /Lektion 1.*Grundstellung/ })).toContainText(
      'Abgeschlossen',
    );
  });

  await test.step('12. Statistik öffnen', async () => {
    await page
      .getByRole('navigation', { name: 'Hauptnavigation' })
      .getByRole('link', { name: 'Statistiken' })
      .click();
    await expect(page.getByRole('heading', { name: 'Statistiken' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Deine Entwicklung' })).toBeVisible();
    const recent = page.getByRole('region', { name: 'Letzte Übungen' });
    await expect(recent.getByRole('cell', { name: 'Lektion 1 · Grundstellung' })).toBeVisible();
  });

  await test.step('13. Einstellungen öffnen', async () => {
    await page
      .getByRole('navigation', { name: 'Hauptnavigation' })
      .getByRole('link', { name: 'Einstellungen' })
      .click();
    await expect(page.getByRole('heading', { name: 'Einstellungen', level: 1 })).toBeVisible();
    await expect(
      page.getByText('Deine Lerndaten werden lokal in deinem Browser gespeichert.'),
    ).toBeVisible();
  });

  await test.step('14. Dark Mode aktivieren', async () => {
    await page.getByRole('radiogroup', { name: 'Farbschema' }).getByText('Dunkel').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const settings = await readStorage<{ theme: string }>(page, SETTINGS_KEY);
    expect(settings?.theme).toBe('dark');
  });

  await test.step('15. zurück zum Training', async () => {
    await page
      .getByRole('navigation', { name: 'Hauptnavigation' })
      .getByRole('link', { name: 'Übersicht' })
      .click();
    await page.getByRole('link', { name: 'Weiterlernen' }).click();
    await expect(page).toHaveURL(/\/lernen\/f-j$/);
  });

  await test.step('16. Training durchführen', async () => {
    await page.getByRole('button', { name: 'Übung starten' }).click();
    await typeExercise(page, await exerciseText(page));
    await expect(page.getByText('Lektion 3 freigeschaltet')).toBeVisible();
  });

  await test.step('17. Seite erneut laden', async () => {
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  await test.step('18. prüfen, ob Daten korrekt bleiben', async () => {
    await page.goto('/statistiken');
    const exercisesTile = page.getByText('Übungen', { exact: true }).locator('..');
    await expect(exercisesTile.locator('dd')).toContainText('2');
    const progress = await readStorage<StoredProgress>(page, PROGRESS_KEY);
    expect(progress?.totals.exercises).toBe(2);
    expect(Object.values(progress?.lessons ?? {}).filter((lesson) => lesson.passed)).toHaveLength(
      2,
    );
    expect(progress?.streak.current).toBe(1);
  });

  await test.step('19. Fortschritt zurücksetzen', async () => {
    await page.goto('/einstellungen');
    await page.getByRole('button', { name: 'Zurücksetzen …' }).click();
    const dialog = page.getByRole('dialog', { name: 'Lernfortschritt zurücksetzen?' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Fortschritt löschen' }).click();
    await expect(page.getByText('Lernfortschritt zurückgesetzt')).toBeVisible();
  });

  await test.step('20. prüfen, ob wirklich alles sauber zurückgesetzt wurde', async () => {
    const progress = await readStorage<StoredProgress>(page, PROGRESS_KEY);
    expect(progress?.history).toEqual([]);
    expect(progress?.lessons).toEqual({});
    expect(progress?.totals.exercises).toBe(0);
    expect(progress?.streak.current).toBe(0);
    await page.reload();
    await page.goto('/');
    await expect(page.getByText('0 von 29 Lektionen abgeschlossen')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Lektion 1 · Grundstellung' })).toBeVisible();
    await page.goto('/statistiken');
    await expect(page.getByText('Du hast noch keine Übungen abgeschlossen.')).toBeVisible();
    await page.goto('/lernen/f-j');
    await expect(page.getByRole('heading', { name: 'Lektion 2 ist noch gesperrt' })).toBeVisible();
    // Einstellungen bleiben erhalten.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  expect(problems, 'keine Fehler oder Warnungen in der Browser-Konsole').toEqual([]);
});
