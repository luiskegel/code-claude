import { expect, test } from '@playwright/test';
import { seedSettings } from './helpers';

const PAGES = [
  '/',
  '/lernen',
  '/lernen/asdf',
  '/tasten',
  '/statistiken',
  '/einstellungen',
  '/wiederholen',
];

test.describe('Smartphone', () => {
  test('Einführung ist auf kleinen Bildschirmen bedienbar', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'Willkommen beim Zehn-Finger-Training.' }),
    ).toBeVisible();
    for (let step = 0; step < 3; step++) await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Lektion 1 starten' }).click();
    await expect(page).toHaveURL(/\/lernen\/grundstellung$/);
  });

  test('kompakte Navigation funktioniert und zeigt die aktive Seite', async ({ page }) => {
    await seedSettings(page);
    await page.goto('/');
    const tabs = page.getByRole('navigation', { name: 'Hauptnavigation' });
    await expect(tabs).toBeVisible();
    await tabs.getByRole('link', { name: 'Statistik' }).click();
    await expect(page.getByRole('heading', { name: 'Statistiken' })).toBeVisible();
    await expect(tabs.getByRole('link', { name: 'Statistik' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  for (const path of PAGES) {
    test(`kein horizontales Scrollen auf ${path}`, async ({ page }) => {
      await seedSettings(page, { freeLessonChoice: true });
      await page.goto(path);
      await expect(page.locator('main')).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
