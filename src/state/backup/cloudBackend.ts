import { parseSnapshot, type BackupBackend, type BackupSnapshot } from './snapshot';

/**
 * Sicherung im Claude-Konto (nur als Claude-Artefakt): ein Dokument im privaten Bereich
 * `data/users/<id>/` der Person – unsichtbar für alle anderen, auch für die Person, die das
 * Artefakt geteilt hat.
 *
 * - off: keine Claude-Umgebung, nicht angemeldet oder ohne eigene Kennung
 * - connecting: verbunden, aber noch nichts bestätigt gesichert
 * - on: die Sicherung ist auf dem aktuellen Stand
 * - failed: Sichern nicht möglich (z. B. nur Leserecht am Artefakt)
 */
export type CloudStatus = 'off' | 'connecting' | 'on' | 'failed';

/** Der Ausschnitt eines db-Dokuments, den die Sicherung braucht. */
export interface CloudDocument {
  get(): Promise<{ exists: boolean; data(): Record<string, unknown> | undefined }>;
  set(data: Record<string, unknown>): Promise<void>;
}

export interface CloudBackendOptions {
  resolveDocument: () => Promise<CloudDocument | null>;
  onStatus: (status: CloudStatus) => void;
  /** Dokumente dürfen höchstens 256 KiB groß sein – mit Sicherheitsabstand. */
  maxBytes?: number;
  retryDelayMs?: number;
}

/** Fehlercodes, nach denen weitere Versuche in dieser Sitzung nichts ändern. */
const FINAL_ERRORS = new Set([
  'invalid_argument',
  'quota_exceeded',
  'revoked',
  'not_granted',
  'capability_disabled',
  'capability_removed',
  'transform_error',
]);

function errorCode(error: unknown): string {
  const code = (error as { code?: unknown } | null)?.code;
  return typeof code === 'string' ? code : 'unavailable';
}

function byteSize(value: unknown): number {
  return new TextEncoder().encode(JSON.stringify(value)).length;
}

/**
 * Passt die Sicherung in ein Dokument: Notfalls wird der Verlauf von den ältesten Übungen her
 * gekürzt. Summen, Bestwerte, Lektionen und Lernserie bleiben vollständig erhalten.
 */
export function fitSnapshot(snapshot: BackupSnapshot, maxBytes: number): BackupSnapshot {
  if (snapshot.progress === null || byteSize(snapshot) <= maxBytes) return snapshot;
  let parsed: unknown;
  try {
    parsed = JSON.parse(snapshot.progress);
  } catch {
    return snapshot;
  }
  const history = (parsed as { history?: unknown } | null)?.history;
  if (!Array.isArray(history)) return snapshot;
  const progress = parsed as Record<string, unknown>;
  let kept: unknown[] = history;
  while (kept.length > 0) {
    kept = kept.slice(Math.ceil(kept.length * 0.2));
    const candidate = { ...snapshot, progress: JSON.stringify({ ...progress, history: kept }) };
    if (byteSize(candidate) <= maxBytes) return candidate;
  }
  return { ...snapshot, progress: JSON.stringify({ ...progress, history: [] }) };
}

export function createCloudBackend({
  resolveDocument,
  onStatus,
  maxBytes = 250_000,
  retryDelayMs = 1500,
}: CloudBackendOptions): BackupBackend {
  let resolving: Promise<CloudDocument | null> | null = null;
  let stopped = false;

  const getDocument = () => {
    resolving ??= (async () => {
      onStatus('connecting');
      const cloudDocument = await resolveDocument().catch(() => null);
      if (!cloudDocument) onStatus('off');
      return cloudDocument;
    })();
    return resolving;
  };

  const fail = (error: unknown) => {
    if (FINAL_ERRORS.has(errorCode(error))) stopped = true;
    onStatus('failed');
  };

  return {
    async read() {
      const cloudDocument = await getDocument();
      if (!cloudDocument) return null;
      try {
        const snapshot = await cloudDocument.get();
        const backup = snapshot.exists ? parseSnapshot(snapshot.data()) : null;
        // Eine vorhandene Sicherung zeigt, dass Sichern für diese Person funktioniert.
        if (backup) onStatus('on');
        return backup;
      } catch (error) {
        fail(error);
        return null;
      }
    },

    async write(snapshot) {
      if (stopped) throw new Error('Sicherung im Claude-Konto nicht verfügbar');
      const cloudDocument = await getDocument();
      if (!cloudDocument) throw new Error('Keine Claude-Umgebung');
      const body = { ...fitSnapshot(snapshot, maxBytes) };
      try {
        await cloudDocument.set(body);
      } catch (error) {
        if (errorCode(error) !== 'unavailable') {
          fail(error);
          throw error;
        }
        // Vorübergehende Störung: einmal nach kurzer, zufälliger Pause wiederholen.
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs * (1 + Math.random())));
        try {
          await cloudDocument.set(body);
        } catch (retryError) {
          fail(retryError);
          throw retryError;
        }
      }
      onStatus('on');
    },
  };
}

interface ClaudeRuntime {
  use(name: string): Promise<unknown>;
}

interface DbNamespace {
  doc(path: string): CloudDocument;
}

interface UserNamespace {
  id(): Promise<string | null>;
}

const hasFunction = <T>(value: unknown, name: string): value is T =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Record<string, unknown>)[name] === 'function';

/** Das private Dokument der Person – oder null, wenn die Seite nicht als Claude-Artefakt läuft. */
export async function resolveClaudeDocument(name: string): Promise<CloudDocument | null> {
  const claude: unknown = (globalThis as { claude?: unknown }).claude;
  if (!hasFunction<ClaudeRuntime>(claude, 'use')) return null;
  const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
  if (!hasFunction<DbNamespace>(db, 'doc') || !hasFunction<UserNamespace>(user, 'id')) return null;
  const id = await user.id();
  if (!id) return null;
  try {
    return db.doc(`data/users/${id}/${name}`);
  } catch {
    return null;
  }
}
