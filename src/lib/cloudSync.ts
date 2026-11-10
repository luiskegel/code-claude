// Speicherung im Claude-Konto (nur in der Artefakt-Version).
// Der Stand liegt im privaten Bereich `data/users/<id>/` der Artefakt-Datenbank:
// Nur die angemeldete Person selbst kann ihn lesen und schreiben – auch der Besitzer
// des Artefakts sieht ihn nicht. Ohne Datenbank (lokale Version, abgemeldet) bleibt
// es bei LocalStorage.
import type { AppState } from '@/types';
import { mergeState } from './storage';

type Snap = { exists: boolean; data(): Record<string, unknown> | undefined };
interface DocRef {
  get(): Promise<Snap>;
  set(data: Record<string, unknown>): Promise<void>;
}
interface DB {
  doc(path: string): DocRef;
}
interface UserNS {
  id(): Promise<string | null>;
}
interface ClaudeRuntime {
  use(name: 'db'): Promise<DB | null>;
  use(name: 'user'): Promise<UserNS | null>;
}

export type SyncStatus = 'local' | 'connecting' | 'synced' | 'saving' | 'error' | 'readonly';

const PARTS = ['settings', 'progress', 'portfolio', 'watchlist'] as const;
type Part = (typeof PARTS)[number];
const MAX_DOC_BYTES = 240 * 1024; // Grenze der Datenbank: 256 KiB pro Dokument

function runtime(): ClaudeRuntime | null {
  const c = (window as unknown as { claude?: ClaudeRuntime }).claude;
  return c && typeof c.use === 'function' ? c : null;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = window.setTimeout(() => reject(new Error('timeout')), ms);
    p.then(
      (v) => {
        window.clearTimeout(t);
        resolve(v);
      },
      (e) => {
        window.clearTimeout(t);
        reject(e);
      },
    );
  });
}

export class CloudSync {
  private refs: Record<Part, DocRef> | null = null;
  private lastWritten: Partial<Record<Part, string>> = {};
  private pending: AppState | null = null;
  private writing = false;
  private disabled = false;

  constructor(private readonly onStatus: (s: SyncStatus, detail?: string) => void) {}

  /** Verbindet sich mit der Datenbank und lädt den gespeicherten Stand (oder null). */
  async connect(): Promise<AppState | null> {
    const c = runtime();
    if (!c) {
      this.onStatus('local');
      return null;
    }
    this.onStatus('connecting');
    try {
      const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
      const id = db && user ? await user.id() : null;
      if (!db || !id) {
        this.onStatus('local', 'Nicht angemeldet oder Speicher nicht verfügbar – Speicherung nur in diesem Browser.');
        return null;
      }
      const base = `data/users/${id}/`;
      this.refs = Object.fromEntries(PARTS.map((p) => [p, db.doc(base + `academy-${p}`)])) as Record<Part, DocRef>;
      const snaps = await withTimeout(Promise.all(PARTS.map((p) => this.refs![p].get())), 10000);
      const found: Record<string, unknown> = {};
      snaps.forEach((s, i) => {
        const body = s.exists ? s.data() : undefined;
        if (body && 'data' in body) {
          found[PARTS[i]] = body.data;
          this.lastWritten[PARTS[i]] = JSON.stringify(body.data);
        }
      });
      this.onStatus('synced');
      return Object.keys(found).length ? mergeState(found) : null;
    } catch (e) {
      this.refs = null;
      const msg = (e as Error)?.message === 'timeout' ? 'Der Speicher antwortet nicht – Speicherung vorerst nur in diesem Browser.' : 'Verbindung zum Speicher fehlgeschlagen – Speicherung nur in diesem Browser.';
      this.onStatus('error', msg);
      return null;
    }
  }

  get connected() {
    return !!this.refs && !this.disabled;
  }

  /** Merkt den Stand zum Speichern vor; geschrieben werden nur geänderte Teile, nacheinander. */
  save(state: AppState) {
    if (!this.connected) return;
    this.pending = state;
    void this.flush();
  }

  private async flush() {
    if (this.writing || !this.refs) return;
    this.writing = true;
    try {
      while (this.pending && !this.disabled) {
        const state = this.pending;
        this.pending = null;
        const changed = PARTS.filter((p) => JSON.stringify(state[p]) !== this.lastWritten[p]);
        if (!changed.length) continue;
        this.onStatus('saving');
        for (const p of changed) {
          const json = JSON.stringify(state[p]);
          if (json.length > MAX_DOC_BYTES) {
            this.onStatus('error', `Der Bereich „${p}“ ist zu groß zum Speichern. Setze z. B. das virtuelle Depot zurück.`);
            continue;
          }
          try {
            await this.refs[p].set({ v: 1, savedAt: new Date().toISOString(), data: JSON.parse(json) });
            this.lastWritten[p] = json;
          } catch (e) {
            const code = (e as { code?: string })?.code;
            if (code === 'invalid_argument' || code === 'not_granted' || code === 'revoked') {
              this.disabled = true;
              this.onStatus('readonly', 'Du hast für dieses Artefakt keine Schreibrechte – Speicherung nur in diesem Browser.');
              return;
            }
            if (code === 'quota_exceeded') {
              this.onStatus('error', 'Der Speicher des Artefakts ist voll.');
              return;
            }
            // vorübergehender Fehler: später erneut versuchen
            this.pending = this.pending ?? state;
            this.onStatus('error', 'Speichern fehlgeschlagen – neuer Versuch folgt.');
            await new Promise((r) => setTimeout(r, 3000 + Math.random() * 2000));
          }
        }
        if (!this.pending && !this.disabled) this.onStatus('synced');
      }
    } finally {
      this.writing = false;
    }
  }
}
