import { describe, expect, it } from 'vitest';
import { makeResult } from '../../test/factories';
import { createEmptyProgress } from '../progress/progress';
import { DEFAULT_SETTINGS } from '../settings/settings';
import { parseProgress, parseSettings, runMigrations } from './schema';
import { createMemoryStorage, readJson, writeJson, type KeyValueStorage } from './storage';

describe('Einstellungen laden', () => {
  it('liefert Standardwerte ohne gespeicherte Daten', () => {
    expect(parseSettings(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(parseSettings('kaputt')).toEqual(DEFAULT_SETTINGS);
  });

  it('übernimmt gültige Werte', () => {
    const settings = parseSettings({
      version: 1,
      theme: 'dark',
      keyboardLayout: 'standard-de',
      soundEnabled: true,
      errorMode: 'continue',
      onboardingCompleted: true,
    });
    expect(settings.theme).toBe('dark');
    expect(settings.keyboardLayout).toBe('standard-de');
    expect(settings.soundEnabled).toBe(true);
    expect(settings.errorMode).toBe('continue');
    expect(settings.onboardingCompleted).toBe(true);
  });

  it('ersetzt ungültige Felder einzeln durch Standardwerte', () => {
    const settings = parseSettings({
      version: 1,
      theme: 'neon',
      keyboardLayout: 'dvorak',
      soundEnabled: 'ja',
      showLiveWpm: false,
    });
    expect(settings.theme).toBe(DEFAULT_SETTINGS.theme);
    expect(settings.keyboardLayout).toBe(DEFAULT_SETTINGS.keyboardLayout);
    expect(settings.soundEnabled).toBe(DEFAULT_SETTINGS.soundEnabled);
    expect(settings.showLiveWpm).toBe(false);
  });

  it('migriert Daten ohne Versionsnummer', () => {
    expect(parseSettings({ theme: 'light' }).theme).toBe('light');
  });
});

describe('Fortschritt laden', () => {
  it('liefert einen leeren Fortschritt bei fehlenden oder kaputten Daten', () => {
    expect(parseProgress(undefined)).toEqual(createEmptyProgress());
    expect(parseProgress([1, 2, 3])).toEqual(createEmptyProgress());
    expect(parseProgress(null)).toEqual(createEmptyProgress());
  });

  it('stellt einen gespeicherten Fortschritt vollständig wieder her', () => {
    const original = {
      ...createEmptyProgress(),
      lessons: {
        asdf: {
          attempts: 3,
          passed: true,
          bestWpm: 24.5,
          bestAccuracy: 97,
          lastPracticedAt: '2026-05-01T10:00:00.000Z',
          passedAt: '2026-05-01T10:00:00.000Z',
        },
      },
      history: [makeResult({ charStats: { a: { hits: 5, misses: 1 } } })],
      totals: {
        exercises: 3,
        practiceMs: 90_000,
        keystrokes: 300,
        correctKeystrokes: 290,
        wpmSum: 60,
        accuracySum: 290,
      },
      records: { bestWpm: 24.5, bestAccuracy: 97 },
      streak: { current: 2, longest: 4, lastPracticeDate: '2026-05-01' },
      lastLessonId: 'asdf',
    };
    const restored = parseProgress(JSON.parse(JSON.stringify(original)));
    expect(restored).toEqual(original);
  });

  it('verwirft ungültige Verlaufseinträge, behält aber gültige', () => {
    const restored = parseProgress({
      version: 1,
      history: [
        makeResult(),
        { id: 'kaputt' },
        makeResult({ wpm: -3 }),
        makeResult({ accuracy: 140 }),
        'x',
      ],
    });
    expect(restored.history).toHaveLength(1);
    expect(restored.totals.exercises).toBe(1);
  });

  it('korrigiert unplausible Werte', () => {
    const restored = parseProgress({
      version: 1,
      lessons: { asdf: { attempts: -4, passed: 'ja', bestWpm: 'schnell' } },
      totals: { exercises: Number.NaN, practiceMs: -10 },
      streak: { current: 5, longest: 2, lastPracticeDate: 'gestern' },
    });
    expect(restored.lessons.asdf).toMatchObject({ attempts: 0, passed: false, bestWpm: null });
    expect(restored.totals.exercises).toBe(0);
    expect(restored.totals.practiceMs).toBe(0);
    expect(restored.streak).toEqual({ current: 0, longest: 2, lastPracticeDate: null });
  });
});

describe('Migrationen', () => {
  it('führt Migrationen schrittweise aus', () => {
    const migrated = runMigrations({ version: 1, old: true }, 3, {
      1: (data) => ({ ...data, renamed: data.old }),
      2: (data) => ({ ...data, extra: 'neu' }),
    });
    expect(migrated).toEqual({ version: 3, old: true, renamed: true, extra: 'neu' });
  });

  it('gibt null zurück, wenn eine Migration fehlt', () => {
    expect(runMigrations({ version: 0 }, 2, { 0: (data) => data })).toBeNull();
  });

  it('übernimmt Daten aus einer neueren Version bestmöglich', () => {
    expect(runMigrations({ version: 9, a: 1 }, 1, {})).toEqual({ version: 9, a: 1 });
  });
});

describe('Speicherzugriff', () => {
  it('erkennt beschädigtes JSON', () => {
    const storage = createMemoryStorage({ key: '{kaputt' });
    expect(readJson(storage, 'key')).toEqual({ status: 'corrupt', raw: '{kaputt' });
    expect(readJson(storage, 'fehlt')).toEqual({ status: 'missing' });
  });

  it('meldet Fehler beim Lesen und Schreiben, statt abzustürzen', () => {
    const broken: KeyValueStorage = {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
      removeItem: () => {
        throw new Error('SecurityError');
      },
    };
    expect(readJson(broken, 'x')).toEqual({ status: 'unavailable' });
    expect(writeJson(broken, 'x', { a: 1 })).toBe(false);
  });
});
