import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryStorage, type KeyValueStorage } from '../../domain/storage/storage';
import { createDurableStorage, type BackupTarget } from './durableStorage';
import type { BackupBackend, BackupSnapshot } from './snapshot';

const KEYS = { settingsKey: 's', progressKey: 'p', savedAtKey: 't' } as const;

/** Sicherung im Arbeitsspeicher, die jeden Schreibvorgang mitschreibt. */
function fakeBackend(initial: BackupSnapshot | null = null) {
  let stored = initial;
  const writes: BackupSnapshot[] = [];
  let failing = false;
  const backend: BackupBackend = {
    read: async () => stored,
    write: async (snapshot) => {
      if (failing) throw new Error('offline');
      writes.push(snapshot);
      stored = snapshot;
    },
  };
  return {
    backend,
    writes,
    get stored() {
      return stored;
    },
    fail() {
      failing = true;
    },
  };
}

function setup(targets: BackupTarget[], primary: KeyValueStorage = createMemoryStorage()) {
  let clock = 1_000;
  const durable = createDurableStorage({ primary, targets, now: () => clock, ...KEYS });
  return {
    primary,
    durable,
    advance(ms: number) {
      clock += ms;
    },
  };
}

const snapshot = (savedAt: number, progress: string | null, settings = '{"theme":"dark"}') =>
  ({ v: 1, savedAt, settings, progress }) as const;

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('Absturzsichere Speicherung', () => {
  it('sichert Änderungen sofort auf dem Gerät und gebündelt im Konto', async () => {
    const device = fakeBackend();
    const cloud = fakeBackend();
    const { durable, primary } = setup([
      { backend: device.backend, delayMs: 0 },
      { backend: cloud.backend, delayMs: 1500 },
    ]);

    durable.storage.setItem('p', '{"n":1}');
    durable.storage.setItem('p', '{"n":2}');
    await vi.advanceTimersByTimeAsync(0);
    expect(device.stored?.progress).toBe('{"n":2}');
    expect(cloud.writes).toHaveLength(0);

    await vi.advanceTimersByTimeAsync(1500);
    expect(cloud.writes).toHaveLength(1);
    expect(cloud.stored?.progress).toBe('{"n":2}');
    expect(Number(primary.getItem('t'))).toBe(cloud.stored?.savedAt);
  });

  it('übernimmt beim Start eine neuere Gerätesicherung, etwa nach einem Absturz', async () => {
    const primary = createMemoryStorage({ s: '{"theme":"dark"}', p: '{"n":1}', t: '1000' });
    const device = fakeBackend(snapshot(5000, '{"n":2}'));
    const { durable } = setup([{ backend: device.backend, delayMs: 0 }], primary);

    await expect(durable.restore()).resolves.toBe(true);
    expect(primary.getItem('p')).toBe('{"n":2}');
    expect(primary.getItem('t')).toBe('5000');
  });

  it('holt auf einem neuen Gerät den Stand aus dem Konto und aktualisiert die Gerätesicherung', async () => {
    const device = fakeBackend();
    const cloud = fakeBackend(snapshot(7000, '{"n":9}'));
    const { durable, primary } = setup([
      { backend: device.backend, delayMs: 0 },
      { backend: cloud.backend, delayMs: 1500 },
    ]);

    await expect(durable.restore()).resolves.toBe(true);
    expect(primary.getItem('p')).toBe('{"n":9}');
    await vi.advanceTimersByTimeAsync(0);
    expect(device.stored?.savedAt).toBe(7000);
    expect(cloud.writes).toHaveLength(0);
  });

  it('behält neuere lokale Daten und bringt veraltete Sicherungen auf den Stand', async () => {
    const primary = createMemoryStorage({ s: '{}', p: '{"n":3}', t: '9000' });
    const cloud = fakeBackend(snapshot(4000, '{"n":1}'));
    const { durable } = setup([{ backend: cloud.backend, delayMs: 1500 }], primary);

    await expect(durable.restore()).resolves.toBe(false);
    expect(primary.getItem('p')).toBe('{"n":3}');
    await vi.advanceTimersByTimeAsync(1500);
    expect(cloud.stored?.progress).toBe('{"n":3}');
    expect(cloud.stored?.savedAt).toBe(9000);
  });

  it('versieht Daten aus der Zeit vor den Sicherungen mit einem Zeitstempel und sichert sie', async () => {
    const primary = createMemoryStorage({ s: '{}', p: '{"n":4}' });
    const device = fakeBackend();
    // Eine Konto-Sicherung von einem anderen Gerät verdrängt die Daten dieses Geräts nicht.
    const cloud = fakeBackend(snapshot(500, '{"n":0}'));
    const { durable } = setup(
      [
        { backend: device.backend, delayMs: 0, sameDevice: true },
        { backend: cloud.backend, delayMs: 0 },
      ],
      primary,
    );

    await expect(durable.restore()).resolves.toBe(false);
    await vi.advanceTimersByTimeAsync(0);
    expect(primary.getItem('p')).toBe('{"n":4}');
    expect(device.stored?.progress).toBe('{"n":4}');
    expect(cloud.stored?.progress).toBe('{"n":4}');
    expect(primary.getItem('t')).not.toBeNull();
  });

  it('vertraut der Gerätesicherung, wenn der Zeitstempel bei einem Absturz verloren ging', async () => {
    // Auf der Platte: Einstellungen ohne Zeitstempel. Die Übung danach steht nur in der Gerätesicherung.
    const primary = createMemoryStorage({ s: '{}' });
    const device = fakeBackend(snapshot(3000, '{"n":1}', '{}'));
    const { durable } = setup([{ backend: device.backend, delayMs: 0, sameDevice: true }], primary);

    await expect(durable.restore()).resolves.toBe(true);
    expect(primary.getItem('p')).toBe('{"n":1}');
    expect(primary.getItem('t')).toBe('3000');
  });

  it('überträgt Löschen als leere Werte, damit es nicht zurückkommt', async () => {
    const primary = createMemoryStorage({ s: '{}', p: '{"n":5}', t: '2000' });
    const cloud = fakeBackend();
    const { durable, advance } = setup([{ backend: cloud.backend, delayMs: 1500 }], primary);

    advance(10_000);
    durable.storage.removeItem('p');
    durable.storage.removeItem('s');
    await vi.advanceTimersByTimeAsync(1500);
    expect(cloud.stored).toMatchObject({ settings: null, progress: null });

    // Ein späterer Start übernimmt den alten Stand nicht wieder.
    const second = createDurableStorage({
      primary,
      targets: [{ backend: fakeBackend(snapshot(3000, '{"n":5}')).backend, delayMs: 0 }],
      ...KEYS,
    });
    await expect(second.restore()).resolves.toBe(false);
    expect(primary.getItem('p')).toBeNull();
  });

  it('schreibt je Sicherung nacheinander und holt Änderungen währenddessen nach', async () => {
    let release: () => void = () => undefined;
    const written: (string | null)[] = [];
    const slow: BackupBackend = {
      read: async () => null,
      write: (snap) =>
        new Promise<void>((resolve) => {
          written.push(snap.progress);
          release = resolve;
        }),
    };
    const { durable } = setup([{ backend: slow, delayMs: 0 }]);

    durable.storage.setItem('p', 'a');
    durable.storage.setItem('p', 'b');
    durable.storage.setItem('p', 'c');
    await vi.advanceTimersByTimeAsync(0);
    expect(written).toEqual(['a']);
    release();
    await vi.advanceTimersByTimeAsync(0);
    expect(written).toEqual(['a', 'c']);
    release();
    await vi.advanceTimersByTimeAsync(0);
    expect(written).toEqual(['a', 'c']);
  });

  it('arbeitet weiter, wenn eine Sicherung ausfällt', async () => {
    const device = fakeBackend();
    device.fail();
    const broken: BackupBackend = {
      read: () => Promise.reject(new Error('kaputt')),
      write: () => Promise.reject(new Error('kaputt')),
    };
    const { durable, primary } = setup([
      { backend: device.backend, delayMs: 0 },
      { backend: broken, delayMs: 0 },
    ]);

    await expect(durable.restore()).resolves.toBe(false);
    durable.storage.setItem('s', '{"theme":"light"}');
    await vi.advanceTimersByTimeAsync(0);
    expect(primary.getItem('s')).toBe('{"theme":"light"}');
  });

  it('schreibt Ausstehendes beim Verlassen der Seite sofort', async () => {
    const cloud = fakeBackend();
    const { durable } = setup([{ backend: cloud.backend, delayMs: 1500 }]);

    durable.storage.setItem('p', '{"n":6}');
    await durable.flush();
    expect(cloud.stored?.progress).toBe('{"n":6}');
  });

  it('ignoriert Schlüssel, die nicht zum Lernstand gehören', async () => {
    const device = fakeBackend();
    const { durable } = setup([{ backend: device.backend, delayMs: 0 }]);

    durable.storage.setItem('p:backup', 'kaputt');
    await vi.advanceTimersByTimeAsync(0);
    expect(device.writes).toHaveLength(0);
  });
});
