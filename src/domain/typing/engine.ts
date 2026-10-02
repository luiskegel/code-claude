import { statKeyForChar } from '../keyboard/keyMap';
import {
  calculateAccuracy,
  calculateWpm,
  IDLE_CAP_MS,
  MIN_LIVE_WPM_CHARS,
  MIN_LIVE_WPM_MS,
} from './metrics';

/**
 * Fehlerverhalten:
 * - correct:  Bei einem Fehler bleibt der Cursor stehen, bis die richtige Taste gedrückt wird.
 * - continue: Der Fehler wird markiert, der Cursor läuft weiter; Korrektur per Rücktaste möglich.
 */
export type ErrorMode = 'correct' | 'continue';

export type CharStatus = 'pending' | 'correct' | 'corrected' | 'incorrect';

export type SessionStatus = 'ready' | 'running' | 'paused' | 'finished';

export interface CharStat {
  hits: number;
  misses: number;
}

export interface TypingError {
  expected: string;
  typed: string;
  index: number;
}

export interface TypingSessionState {
  text: string;
  chars: readonly string[];
  mode: ErrorMode;
  /** Zeitlimit in ms (Geschwindigkeitsübungen) oder null */
  timeLimitMs: number | null;
  cursor: number;
  statuses: readonly CharStatus[];
  /** Tatsächlich getipptes Zeichen je Position (Weiterschreiben-Modus) */
  typed: readonly (string | null)[];
  /** Ob an einer Position jemals ein Fehler passiert ist */
  hadError: readonly boolean[];
  keystrokes: number;
  correctKeystrokes: number;
  errorCount: number;
  /** Anzahl der Positionen, die aktuell korrekt sind (für WPM) */
  correctChars: number;
  charStats: Readonly<Record<string, CharStat>>;
  lastError: TypingError | null;
  status: SessionStatus;
  startedAt: number | null;
  /** Zeitpunkt der letzten Eingabe – Basis für die pausenbereinigte Zeit */
  lastInputAt: number | null;
  /** Pausenbereinigte aktive Zeit (Lücken > IDLE_CAP_MS zählen gedeckelt) */
  activeMs: number;
  /** Beginn des aktuell laufenden Abschnitts (Wanduhr, ohne Pausen) */
  runningSince: number | null;
  /** Summe der abgeschlossenen Abschnitte (Wanduhr, ohne Pausen) */
  wallMs: number;
  finishedAt: number | null;
}

export interface SessionOptions {
  mode: ErrorMode;
  timeLimitMs?: number | null;
}

export function createSession(text: string, options: SessionOptions): TypingSessionState {
  const chars = Array.from(text);
  return {
    text,
    chars,
    mode: options.mode,
    timeLimitMs: options.timeLimitMs ?? null,
    cursor: 0,
    statuses: chars.map(() => 'pending'),
    typed: chars.map(() => null),
    hadError: chars.map(() => false),
    keystrokes: 0,
    correctKeystrokes: 0,
    errorCount: 0,
    correctChars: 0,
    charStats: {},
    lastError: null,
    status: chars.length === 0 ? 'finished' : 'ready',
    startedAt: null,
    lastInputAt: null,
    activeMs: 0,
    runningSince: null,
    wallMs: 0,
    finishedAt: null,
  };
}

// ── Zeit ────────────────────────────────────────────────────────────────

/** Vergangene Zeit ohne Pausen (Wanduhr). */
export function getWallElapsedMs(state: TypingSessionState, now: number): number {
  const running = state.runningSince !== null ? Math.max(0, now - state.runningSince) : 0;
  return state.wallMs + running;
}

export function getRemainingMs(state: TypingSessionState, now: number): number | null {
  if (state.timeLimitMs === null) return null;
  return Math.max(0, state.timeLimitMs - getWallElapsedMs(state, now));
}

export function isTimeUp(state: TypingSessionState, now: number): boolean {
  return state.timeLimitMs !== null && getWallElapsedMs(state, now) >= state.timeLimitMs;
}

/**
 * Maßgebliche Dauer:
 * - mit Zeitlimit: Wanduhr (ohne Pausen), höchstens das Limit
 * - ohne Zeitlimit: aktive Tippzeit mit gedeckelten Pausen
 */
export function getDurationMs(state: TypingSessionState, now: number): number {
  if (state.timeLimitMs !== null) {
    return Math.min(getWallElapsedMs(state, now), state.timeLimitMs);
  }
  return state.activeMs;
}

/** Registriert Aktivität und startet bzw. setzt die Zeitmessung fort. */
function touch(state: TypingSessionState, now: number): TypingSessionState {
  if (state.status === 'ready') {
    return { ...state, status: 'running', startedAt: now, runningSince: now, lastInputAt: now };
  }
  if (state.status === 'paused') {
    return { ...state, status: 'running', runningSince: now, lastInputAt: now };
  }
  const gap = state.lastInputAt === null ? 0 : Math.max(0, now - state.lastInputAt);
  return { ...state, activeMs: state.activeMs + Math.min(gap, IDLE_CAP_MS), lastInputAt: now };
}

function closeRunningSegment(state: TypingSessionState, now: number): TypingSessionState {
  if (state.runningSince === null) return state;
  return {
    ...state,
    wallMs: state.wallMs + Math.max(0, now - state.runningSince),
    runningSince: null,
  };
}

// ── Aktionen ────────────────────────────────────────────────────────────

/** Beendet die Sitzung (z. B. wenn das Zeitlimit erreicht ist). */
export function finishSession(state: TypingSessionState, now: number): TypingSessionState {
  if (state.status === 'finished') return state;
  let finishAt = now;
  // Bei abgelaufenem Limit exakt zum Limit beenden, nicht zum späteren Prüfzeitpunkt.
  if (state.timeLimitMs !== null && state.runningSince !== null) {
    const limitReachedAt = state.runningSince + (state.timeLimitMs - state.wallMs);
    finishAt = Math.min(now, Math.max(state.runningSince, limitReachedAt));
  }
  const closed = closeRunningSegment(state, finishAt);
  return { ...closed, status: 'finished', finishedAt: finishAt, lastError: null };
}

export function pauseSession(state: TypingSessionState, now: number): TypingSessionState {
  if (state.status !== 'running') return state;
  const closed = closeRunningSegment(state, now);
  return { ...closed, status: 'paused', lastInputAt: null };
}

function withStat(
  stats: Readonly<Record<string, CharStat>>,
  char: string,
  hit: boolean,
): Record<string, CharStat> {
  const key = statKeyForChar(char);
  const current = stats[key] ?? { hits: 0, misses: 0 };
  return {
    ...stats,
    [key]: hit
      ? { hits: current.hits + 1, misses: current.misses }
      : { hits: current.hits, misses: current.misses + 1 },
  };
}

function replaceAt<T>(items: readonly T[], index: number, value: T): T[] {
  const copy = items.slice();
  copy[index] = value;
  return copy;
}

/** Verarbeitet ein getipptes Zeichen. */
export function typeChar(state: TypingSessionState, char: string, now: number): TypingSessionState {
  if (state.status === 'finished') return state;
  if (isTimeUp(state, now)) return finishSession(state, now);

  const expected = state.chars[state.cursor];
  if (expected === undefined) return finishSession(state, now);

  const active = touch(state, now);
  const index = active.cursor;
  const isCorrect = char === expected;
  const hadError = active.hadError[index] === true;

  let next: TypingSessionState;
  if (isCorrect) {
    next = {
      ...active,
      cursor: index + 1,
      statuses: replaceAt(active.statuses, index, hadError ? 'corrected' : 'correct'),
      typed: replaceAt(active.typed, index, char),
      keystrokes: active.keystrokes + 1,
      correctKeystrokes: active.correctKeystrokes + 1,
      correctChars: active.correctChars + 1,
      charStats: withStat(active.charStats, expected, true),
      lastError: null,
    };
  } else {
    const advance = active.mode === 'continue';
    next = {
      ...active,
      cursor: advance ? index + 1 : index,
      statuses: replaceAt(active.statuses, index, 'incorrect'),
      typed: advance ? replaceAt(active.typed, index, char) : active.typed,
      hadError: replaceAt(active.hadError, index, true),
      keystrokes: active.keystrokes + 1,
      errorCount: active.errorCount + 1,
      charStats: withStat(active.charStats, expected, false),
      lastError: { expected, typed: char, index },
    };
  }

  return next.cursor >= next.chars.length ? finishSession(next, now) : next;
}

/**
 * Rücktaste (nur im Modus „Weiterschreiben“). Mit wholeWord wird bis zum Wortanfang gelöscht.
 * Bereits gezählte Fehler bleiben gezählt – die Genauigkeit spiegelt jeden Anschlag wider.
 */
export function deleteBackward(
  state: TypingSessionState,
  now: number,
  wholeWord = false,
): TypingSessionState {
  if (state.status === 'finished' || state.mode !== 'continue' || state.cursor === 0) return state;
  if (isTimeUp(state, now)) return finishSession(state, now);

  let target = state.cursor - 1;
  if (wholeWord) {
    while (target > 0 && state.chars[target] === ' ') target--;
    while (target > 0 && state.chars[target - 1] !== ' ') target--;
  }

  const active = touch(state, now);
  const statuses = active.statuses.slice();
  const typed = active.typed.slice();
  let correctChars = active.correctChars;
  for (let index = target; index < active.cursor; index++) {
    if (statuses[index] === 'correct' || statuses[index] === 'corrected') correctChars--;
    statuses[index] = 'pending';
    typed[index] = null;
  }
  return { ...active, cursor: target, statuses, typed, correctChars, lastError: null };
}

// ── Auswertung ──────────────────────────────────────────────────────────

export function getAccuracy(state: TypingSessionState): number | null {
  if (state.keystrokes === 0) return null;
  return calculateAccuracy(state.correctKeystrokes, state.keystrokes);
}

/** Live-Geschwindigkeit – erst sinnvoll, wenn genug getippt wurde. */
export function getLiveWpm(state: TypingSessionState, now: number): number | null {
  const duration = getDurationMs(state, now);
  if (state.correctChars < MIN_LIVE_WPM_CHARS || duration < MIN_LIVE_WPM_MS) return null;
  return calculateWpm(state.correctChars, duration);
}

export function getProgress(state: TypingSessionState, now: number): number {
  if (state.timeLimitMs !== null) {
    return Math.min(1, getWallElapsedMs(state, now) / state.timeLimitMs);
  }
  return state.chars.length === 0 ? 1 : state.cursor / state.chars.length;
}

export interface SessionSummary {
  textLength: number;
  /** Bis zum Ende bearbeitete Zeichen (Cursorposition) */
  typedChars: number;
  correctChars: number;
  keystrokes: number;
  correctKeystrokes: number;
  errors: number;
  durationMs: number;
  wpm: number;
  accuracy: number;
  charStats: Record<string, CharStat>;
}

export function summarizeSession(state: TypingSessionState, now: number): SessionSummary {
  const endTime = state.finishedAt ?? now;
  const durationMs = getDurationMs(state, endTime);
  return {
    textLength: state.chars.length,
    typedChars: state.cursor,
    correctChars: state.correctChars,
    keystrokes: state.keystrokes,
    correctKeystrokes: state.correctKeystrokes,
    errors: state.errorCount,
    durationMs,
    wpm: calculateWpm(state.correctChars, durationMs),
    accuracy: calculateAccuracy(state.correctKeystrokes, state.keystrokes),
    charStats: { ...state.charStats },
  };
}
