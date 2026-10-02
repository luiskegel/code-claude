import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { STORAGE_KEYS } from '../config/storageKeys';
import { DEFAULT_SETTINGS } from '../domain/settings/settings';
import { createMemoryStorage, type KeyValueStorage } from '../domain/storage/storage';
import { renderApp } from '../test/renderApp';

const ONBOARDED = { onboardingCompleted: true };

function typeText(text: string) {
  const input = screen.getByLabelText('Übungstext abtippen');
  for (const char of text) fireEvent.keyDown(input, { key: char });
}

describe('App', () => {
  it('leitet neue Nutzer zum Onboarding und öffnet danach Lektion 1', async () => {
    const user = userEvent.setup();
    const { store } = renderApp();
    expect(
      await screen.findByRole('heading', { name: 'Willkommen beim Zehn-Finger-Training.' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Weiter' }));
    await user.click(screen.getByLabelText(/Standard QWERTZ/));
    await user.click(screen.getByRole('button', { name: 'Weiter' }));
    await user.click(screen.getByLabelText(/Ich möchte genauer schreiben/));
    await user.click(screen.getByRole('button', { name: 'Weiter' }));
    expect(screen.getByText('Fehler sofort korrigieren')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Lektion 1 starten' }));

    expect(
      await screen.findByRole('heading', { name: 'Lektion 1 · Grundstellung' }),
    ).toBeInTheDocument();
    const { settings } = store.getState();
    expect(settings.onboardingCompleted).toBe(true);
    expect(settings.keyboardLayout).toBe('standard-de');
    expect(settings.goal).toBe('accuracy');
  });

  it('schließt eine Lektion ab, speichert das Ergebnis und schaltet die nächste frei', async () => {
    const user = userEvent.setup();
    const storage = createMemoryStorage();
    const { store } = renderApp({ path: '/lernen/grundstellung', settings: ONBOARDED, storage });

    await user.click(await screen.findByRole('button', { name: 'Direkt zur Übung' }));
    await user.click(screen.getByRole('button', { name: 'Übung starten' }));
    typeText('f j f j fj jf fj jf ff jj fj jf');

    expect(await screen.findByText('Lektion 2 freigeschaltet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nächste Lektion' })).toBeInTheDocument();
    expect(store.getState().progress.lessons.grundstellung?.passed).toBe(true);

    const saved = JSON.parse(storage.getItem(STORAGE_KEYS.progress) ?? '{}') as {
      history: unknown[];
      lessons: Record<string, { passed: boolean }>;
    };
    expect(saved.history).toHaveLength(1);
    expect(saved.lessons.grundstellung?.passed).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Nächste Lektion' }));
    expect(await screen.findByRole('heading', { name: 'Lektion 2 · F und J' })).toBeInTheDocument();
  });

  it('sperrt Lektionen, deren Vorgänger noch offen ist', async () => {
    renderApp({ path: '/lernen/asdf', settings: ONBOARDED });
    expect(
      await screen.findByRole('heading', { name: 'Lektion 3 ist noch gesperrt' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zu Lektion 2/ })).toBeInTheDocument();
  });

  it('öffnet mit freier Lektionswahl jede Lektion', async () => {
    renderApp({ path: '/lernen/asdf', settings: { ...ONBOARDED, freeLessonChoice: true } });
    expect(await screen.findByRole('heading', { name: 'Lektion 3 · A S D F' })).toBeInTheDocument();
  });

  it('zeigt für unbekannte Adressen eine 404-Seite', async () => {
    renderApp({ path: '/gibt-es-nicht', settings: ONBOARDED });
    expect(
      await screen.findByRole('heading', { name: 'Seite nicht gefunden' }),
    ).toBeInTheDocument();
    renderApp({ path: '/lernen/unbekannt', settings: ONBOARDED });
    expect(
      await screen.findByRole('heading', { name: 'Lektion nicht gefunden' }),
    ).toBeInTheDocument();
  });

  it('zeigt leere Zustände ohne Übungen', async () => {
    renderApp({ path: '/statistiken', settings: ONBOARDED });
    expect(
      await screen.findByText('Du hast noch keine Übungen abgeschlossen.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Erste Lektion starten/ })).toBeInTheDocument();
  });

  it('setzt den Fortschritt nur nach Bestätigung zurück', async () => {
    const user = userEvent.setup();
    const storage = createMemoryStorage();
    const { store } = renderApp({ path: '/lernen/grundstellung', settings: ONBOARDED, storage });
    await user.click(await screen.findByRole('button', { name: 'Direkt zur Übung' }));
    await user.click(screen.getByRole('button', { name: 'Übung starten' }));
    typeText('f j f j fj jf fj jf ff jj fj jf');
    await screen.findByText('Lektion 2 freigeschaltet');

    // Sidebar und mobile Tab-Leiste sind beide im DOM (CSS blendet je nach Breite eine aus).
    await user.click(screen.getAllByRole('link', { name: 'Einstellungen' })[0]!);
    await user.click(await screen.findByRole('button', { name: 'Zurücksetzen …' }));
    const dialog = screen.getByRole('dialog', { name: 'Lernfortschritt zurücksetzen?' });
    await user.click(within(dialog).getByRole('button', { name: 'Abbrechen' }));
    expect(store.getState().progress.history).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Zurücksetzen …' }));
    await user.click(
      within(screen.getByRole('dialog', { name: 'Lernfortschritt zurücksetzen?' })).getByRole(
        'button',
        {
          name: 'Fortschritt löschen',
        },
      ),
    );
    await waitFor(() => expect(store.getState().progress.history).toHaveLength(0));
    expect(store.getState().progress.lessons).toEqual({});
    expect(store.getState().settings.onboardingCompleted).toBe(true);
    expect(await screen.findByText('Lernfortschritt zurückgesetzt')).toBeInTheDocument();
  });

  it('weist auf jeder Seite darauf hin, wenn nicht dauerhaft gespeichert werden kann', async () => {
    renderApp({ path: '/', settings: ONBOARDED, persistent: false });
    expect(await screen.findByText(/kein dauerhaftes Speichern/)).toBeInTheDocument();
  });

  it('verzichtet auf die Warnung, sobald die Sicherung im Claude-Konto greift', async () => {
    const { store } = renderApp({ path: '/einstellungen', settings: ONBOARDED, persistent: false });
    expect(await screen.findByText(/kein dauerhaftes Speichern/)).toBeInTheDocument();
    expect(screen.getByText(/Es gibt kein Konto, keine Anmeldung/)).toBeInTheDocument();

    act(() => store.setCloudStatus('on'));
    expect(screen.queryByText(/kein dauerhaftes Speichern/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/zusätzlich privat in deinem Claude-Konto gesichert/),
    ).toBeInTheDocument();
  });

  it('meldet fehlgeschlagene Speichervorgänge, ohne die App zu blockieren', async () => {
    const user = userEvent.setup();
    const base = createMemoryStorage({
      [STORAGE_KEYS.settings]: JSON.stringify({
        ...DEFAULT_SETTINGS,
        ...ONBOARDED,
        theme: 'light',
      }),
    });
    const fullStorage: KeyValueStorage = {
      getItem: (key) => base.getItem(key),
      setItem: () => {
        throw new DOMException('Speicher voll', 'QuotaExceededError');
      },
      removeItem: (key) => base.removeItem(key),
    };
    const { store } = renderApp({ path: '/', storage: fullStorage });
    expect(screen.queryByText(/konnte zuletzt nicht gespeichert werden/)).not.toBeInTheDocument();

    // Sidebar und mobiler Kopfbereich enthalten beide einen Umschalter.
    const [themeToggle] = await screen.findAllByRole('button', { name: /Darstellung: Hell/ });
    await user.click(themeToggle!);
    expect(store.getState().settings.theme).toBe('dark');
    expect(await screen.findByText(/konnte zuletzt nicht gespeichert werden/)).toBeInTheDocument();
  });

  it('übernimmt das Farbschema auf das Dokument', async () => {
    const user = userEvent.setup();
    renderApp({ path: '/einstellungen', settings: { ...ONBOARDED, theme: 'light' } });
    await user.click(await screen.findByText('Dunkel', { selector: 'label *, label' }));
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'));
  });

  it('überlässt das Farbschema bei „System“ dem Gerät oder der einbettenden Seite', async () => {
    const user = userEvent.setup();
    // Eine einbettende Seite (z. B. ein Claude-Artefakt) hat das Attribut bereits gesetzt.
    document.documentElement.dataset.theme = 'dark';
    renderApp({ path: '/einstellungen', settings: { ...ONBOARDED, theme: 'system' } });
    const label = (name: string) => screen.findByText(name, { selector: 'label *, label' });

    await label('System');
    expect(document.documentElement.dataset.theme).toBe('dark');

    await user.click(await label('Hell'));
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'));

    // Zurück auf „System“: Die App entfernt ihr eigenes Attribut wieder.
    await user.click(await label('System'));
    await waitFor(() => expect(document.documentElement.dataset.theme).toBeUndefined());
  });
});
