import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createCloudBackend,
  fitSnapshot,
  resolveClaudeDocument,
  type CloudDocument,
  type CloudStatus,
} from './cloudBackend';
import type { BackupSnapshot } from './snapshot';

function fakeDocument(initial?: Record<string, unknown>) {
  let body = initial;
  const sets: Record<string, unknown>[] = [];
  const failures: unknown[] = [];
  const cloudDocument: CloudDocument = {
    get: async () => ({ exists: body !== undefined, data: () => body }),
    set: async (data) => {
      const failure = failures.shift();
      if (failure) throw failure;
      sets.push(data);
      body = data;
    },
  };
  return { cloudDocument, sets, failures };
}

const snapshot: BackupSnapshot = { v: 1, savedAt: 42, settings: '{}', progress: '{"history":[]}' };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Sicherung im Claude-Konto', () => {
  it('meldet „on“, sobald gesichert wurde', async () => {
    const statuses: CloudStatus[] = [];
    const { cloudDocument, sets } = fakeDocument();
    const backend = createCloudBackend({
      resolveDocument: async () => cloudDocument,
      onStatus: (status) => statuses.push(status),
    });

    await expect(backend.read()).resolves.toBeNull();
    expect(statuses).toEqual(['connecting']);
    await backend.write(snapshot);
    expect(sets).toEqual([snapshot]);
    expect(statuses.at(-1)).toBe('on');
    await expect(backend.read()).resolves.toEqual(snapshot);
  });

  it('gibt bei fehlender Schreibberechtigung auf und meldet „failed“', async () => {
    const statuses: CloudStatus[] = [];
    const { cloudDocument, sets, failures } = fakeDocument();
    failures.push({ code: 'invalid_argument', message: 'nur Leserecht' });
    const backend = createCloudBackend({
      resolveDocument: async () => cloudDocument,
      onStatus: (status) => statuses.push(status),
    });

    await expect(backend.write(snapshot)).rejects.toMatchObject({ code: 'invalid_argument' });
    expect(statuses.at(-1)).toBe('failed');
    await expect(backend.write(snapshot)).rejects.toThrow();
    expect(sets).toHaveLength(0);
  });

  it('wiederholt einen vorübergehenden Fehler einmal', async () => {
    const { cloudDocument, sets, failures } = fakeDocument();
    failures.push({ code: 'unavailable', message: 'kurz weg' });
    const backend = createCloudBackend({
      resolveDocument: async () => cloudDocument,
      onStatus: () => undefined,
      retryDelayMs: 1,
    });

    await backend.write(snapshot);
    expect(sets).toHaveLength(1);
  });

  it('ist ohne Claude-Umgebung ausgeschaltet', async () => {
    const statuses: CloudStatus[] = [];
    const backend = createCloudBackend({
      resolveDocument: () => resolveClaudeDocument('typeflow'),
      onStatus: (status) => statuses.push(status),
    });

    await expect(backend.read()).resolves.toBeNull();
    await expect(backend.write(snapshot)).rejects.toThrow();
    expect(statuses).toEqual(['connecting', 'off']);
  });

  it('verwendet den privaten Bereich der Person', async () => {
    const doc = vi.fn((path: string) => ({ path, ...fakeDocument().cloudDocument }));
    vi.stubGlobal('claude', {
      use: async (name: string) =>
        name === 'db' ? { doc } : name === 'user' ? { id: async () => 'u_abc' } : null,
    });

    await expect(resolveClaudeDocument('typeflow')).resolves.toMatchObject({
      path: 'data/users/u_abc/typeflow',
    });
  });

  it('verzichtet ohne eigene Kennung (z. B. nicht angemeldet) auf die Sicherung', async () => {
    vi.stubGlobal('claude', {
      use: async (name: string) =>
        name === 'db' ? { doc: () => fakeDocument().cloudDocument } : { id: async () => null },
    });

    await expect(resolveClaudeDocument('typeflow')).resolves.toBeNull();
  });
});

describe('Größengrenze', () => {
  const history = Array.from({ length: 300 }, (_, index) => ({
    id: `r${index}`,
    note: 'x'.repeat(900),
  }));
  const big: BackupSnapshot = {
    v: 1,
    savedAt: 1,
    settings: '{}',
    progress: JSON.stringify({ totals: { exercises: 300 }, history }),
  };

  it('kürzt den Verlauf von den ältesten Übungen her, bis das Dokument passt', () => {
    const fitted = fitSnapshot(big, 100_000);
    expect(new TextEncoder().encode(JSON.stringify(fitted)).length).toBeLessThanOrEqual(100_000);
    const progress = JSON.parse(fitted.progress ?? '{}') as {
      totals: unknown;
      history: { id: string }[];
    };
    expect(progress.totals).toEqual({ exercises: 300 });
    expect(progress.history.length).toBeGreaterThan(0);
    expect(progress.history.at(-1)?.id).toBe('r299');
  });

  it('lässt kleine Sicherungen unverändert', () => {
    expect(fitSnapshot(snapshot, 100_000)).toBe(snapshot);
  });
});
