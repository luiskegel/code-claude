import { describe, expect, it } from 'vitest';
import { STORAGE_KEYS } from '../config/storageKeys';
import { createEmptyProgress } from '../domain/progress/progress';
import { DEFAULT_SETTINGS } from '../domain/settings/settings';
import { createMemoryStorage, type KeyValueStorage } from '../domain/storage/storage';
import { makeSummary } from '../test/factories';
import { createAppStore } from './store';

function finishLesson(store: ReturnType<typeof createAppStore>, lessonId: string, accuracy = 96) {
  return store.recordExercise({
    exercise: { id: `${lessonId}-1`, lessonId },
    summary: makeSummary({ accuracy }),
    completedAt: new Date(2026, 4, 1, 12),
  });
}

describe('App-Store', () => {
  it('startet ohne Daten mit Standardwerten', () => {
    const store = createAppStore(createMemoryStorage(), true);
    expect(store.getState().settings).toEqual(DEFAULT_SETTINGS);
    expect(store.getState().progress).toEqual(createEmptyProgress());
  });

  it('speichert den Fortschritt und lädt ihn nach einem Neustart wieder', () => {
    const storage = createMemoryStorage();
    const store = createAppStore(storage, true);
    finishLesson(store, 'grundstellung');
    store.updateSettings({ theme: 'dark' });

    const reloaded = createAppStore(storage, true);
    expect(reloaded.getState().progress.lessons.grundstellung?.passed).toBe(true);
    expect(reloaded.getState().progress.history).toHaveLength(1);
    expect(reloaded.getState().settings.theme).toBe('dark');
  });

  it('übernimmt beim Onboarding Tastatur und Lernziel', () => {
    const store = createAppStore(createMemoryStorage(), true);
    store.completeOnboarding({ keyboardLayout: 'standard-de', goal: 'speed' });
    const { settings } = store.getState();
    expect(settings.onboardingCompleted).toBe(true);
    expect(settings.keyboardLayout).toBe('standard-de');
    expect(settings.goal).toBe('speed');
    expect(settings.freeLessonChoice).toBe(true);
    expect(settings.errorMode).toBe('continue');
  });

  it('benachrichtigt Abonnenten bei Änderungen', () => {
    const store = createAppStore(createMemoryStorage(), true);
    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      calls += 1;
    });
    store.updateSettings({ soundEnabled: true });
    unsubscribe();
    store.updateSettings({ soundEnabled: false });
    expect(calls).toBe(1);
  });

  it('setzt den Lernfortschritt zurück, behält aber die Einstellungen', () => {
    const storage = createMemoryStorage();
    const store = createAppStore(storage, true);
    store.completeOnboarding({ keyboardLayout: 'apple-de', goal: 'beginner' });
    finishLesson(store, 'grundstellung');
    finishLesson(store, 'f-j');
    store.resetProgress();

    expect(store.getState().progress).toEqual(createEmptyProgress());
    expect(store.getState().settings.onboardingCompleted).toBe(true);
    const reloaded = createAppStore(storage, true);
    expect(reloaded.getState().progress).toEqual(createEmptyProgress());
    expect(reloaded.getState().settings.onboardingCompleted).toBe(true);
  });

  it('löscht bei „Alles zurücksetzen“ auch Einstellungen und Onboarding', () => {
    const storage = createMemoryStorage();
    const store = createAppStore(storage, true);
    store.completeOnboarding({ keyboardLayout: 'standard-de', goal: 'accuracy' });
    finishLesson(store, 'grundstellung');
    store.resetAll();

    expect(store.getState().settings).toEqual(DEFAULT_SETTINGS);
    expect(storage.getItem(STORAGE_KEYS.settings)).toBeNull();
    expect(storage.getItem(STORAGE_KEYS.progress)).toBeNull();
    const reloaded = createAppStore(storage, true);
    expect(reloaded.getState().settings.onboardingCompleted).toBe(false);
    expect(reloaded.getState().progress.history).toHaveLength(0);
  });

  it('übersteht beschädigte Daten und sichert sie vorher', () => {
    const storage = createMemoryStorage({ [STORAGE_KEYS.progress]: '{"version":1,"lessons":' });
    const store = createAppStore(storage, true);
    expect(store.getState().progress).toEqual(createEmptyProgress());
    expect(store.getState().storage.recoveredFromCorruption).toBe(true);
    expect(storage.getItem(`${STORAGE_KEYS.progress}:backup`)).toContain('"version":1');
  });

  it('meldet fehlgeschlagenes Speichern, ohne Daten im Speicher zu verlieren', () => {
    const memory = createMemoryStorage();
    let failWrites = false;
    const flaky: KeyValueStorage = {
      getItem: (key) => memory.getItem(key),
      removeItem: (key) => memory.removeItem(key),
      setItem: (key, value) => {
        if (failWrites) throw new Error('QuotaExceededError');
        memory.setItem(key, value);
      },
    };
    const store = createAppStore(flaky, true);
    failWrites = true;
    finishLesson(store, 'grundstellung');
    expect(store.getState().storage.lastWriteFailed).toBe(true);
    expect(store.getState().progress.lessons.grundstellung?.passed).toBe(true);
    failWrites = false;
    store.updateSettings({ soundEnabled: true });
    expect(store.getState().storage.lastWriteFailed).toBe(false);
  });

  it('kürzt bei vollem Speicher den Verlauf statt gar nicht zu speichern', () => {
    const memory = createMemoryStorage();
    const limited: KeyValueStorage = {
      getItem: (key) => memory.getItem(key),
      removeItem: (key) => memory.removeItem(key),
      setItem: (key, value) => {
        if (value.length > 6000) throw new Error('QuotaExceededError');
        memory.setItem(key, value);
      },
    };
    const store = createAppStore(limited, true);
    for (let index = 0; index < 30; index++) finishLesson(store, 'asdf');
    expect(store.getState().storage.lastWriteFailed).toBe(false);
    const saved = JSON.parse(memory.getItem(STORAGE_KEYS.progress) ?? '{}') as {
      history: unknown[];
      totals: { exercises: number };
    };
    expect(saved.history.length).toBeLessThan(30);
    expect(saved.totals.exercises).toBe(30);
  });

  it('lädt Änderungen aus anderen Tabs nach', () => {
    const storage = createMemoryStorage();
    const tabA = createAppStore(storage, true);
    const tabB = createAppStore(storage, true);
    finishLesson(tabA, 'grundstellung');
    tabB.reloadFromStorage();
    expect(tabB.getState().progress.lessons.grundstellung?.passed).toBe(true);
  });

  it('behält den Status der Konto-Sicherung beim Nachladen und Zurücksetzen', () => {
    const store = createAppStore(createMemoryStorage(), true);
    expect(store.getState().storage.cloud).toBe('off');
    store.setCloudStatus('on');
    store.reloadFromStorage();
    expect(store.getState().storage.cloud).toBe('on');
    store.resetAll();
    expect(store.getState().storage.cloud).toBe('on');
  });
});
