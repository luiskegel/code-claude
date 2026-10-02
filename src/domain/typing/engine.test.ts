import { describe, expect, it } from 'vitest';
import {
  createSession,
  deleteBackward,
  finishSession,
  getAccuracy,
  getDurationMs,
  getLiveWpm,
  getRemainingMs,
  isTimeUp,
  pauseSession,
  summarizeSession,
  typeChar,
  type TypingSessionState,
} from './engine';
import { IDLE_CAP_MS } from './metrics';

/** Tippt einen Text mit festem Abstand zwischen den Anschlägen. */
function typeAll(state: TypingSessionState, text: string, start = 0, step = 200) {
  let current = state;
  let time = start;
  for (const char of text) {
    current = typeChar(current, char, time);
    time += step;
  }
  return { state: current, time };
}

describe('Tipp-Engine – Grundlagen', () => {
  it('startet bereit und beginnt die Zeitmessung erst beim ersten Anschlag', () => {
    const session = createSession('asdf', { mode: 'correct' });
    expect(session.status).toBe('ready');
    expect(session.startedAt).toBeNull();
    const next = typeChar(session, 'a', 5000);
    expect(next.status).toBe('running');
    expect(next.startedAt).toBe(5000);
    expect(next.activeMs).toBe(0);
  });

  it('schließt die Übung nach dem letzten korrekten Zeichen ab', () => {
    const { state } = typeAll(createSession('fj jf', { mode: 'correct' }), 'fj jf');
    expect(state.status).toBe('finished');
    expect(state.cursor).toBe(5);
    expect(state.statuses.every((status) => status === 'correct')).toBe(true);
    expect(getAccuracy(state)).toBe(100);
    expect(state.errorCount).toBe(0);
  });

  it('ignoriert Eingaben nach dem Abschluss', () => {
    const { state } = typeAll(createSession('ab', { mode: 'correct' }), 'ab');
    const after = typeChar(state, 'x', 9999);
    expect(after).toBe(state);
  });

  it('unterscheidet Groß- und Kleinschreibung sowie Umlaute', () => {
    let state = createSession('Äö', { mode: 'correct' });
    state = typeChar(state, 'ä', 0);
    expect(state.errorCount).toBe(1);
    expect(state.cursor).toBe(0);
    state = typeChar(state, 'Ä', 100);
    state = typeChar(state, 'ö', 200);
    expect(state.status).toBe('finished');
    expect(state.statuses).toEqual(['corrected', 'correct']);
  });

  it('verarbeitet Leerzeichen und Zeilenumbrüche', () => {
    const { state } = typeAll(createSession('a b\nc', { mode: 'correct' }), 'a b\nc');
    expect(state.status).toBe('finished');
    expect(state.correctChars).toBe(5);
  });
});

describe('Modus „Fehler korrigieren“', () => {
  it('zählt den Fehler, markiert die Position und lässt den Cursor stehen', () => {
    let state = createSession('asdf', { mode: 'correct' });
    state = typeChar(state, 's', 0);
    expect(state.cursor).toBe(0);
    expect(state.errorCount).toBe(1);
    expect(state.statuses[0]).toBe('incorrect');
    expect(state.lastError).toEqual({ expected: 'a', typed: 's', index: 0 });
    expect(state.charStats.a).toEqual({ hits: 0, misses: 1 });
  });

  it('markiert korrigierte Zeichen und entfernt den Fehlerhinweis', () => {
    let state = createSession('asdf', { mode: 'correct' });
    state = typeChar(state, 's', 0);
    state = typeChar(state, 'a', 100);
    expect(state.cursor).toBe(1);
    expect(state.statuses[0]).toBe('corrected');
    expect(state.lastError).toBeNull();
    expect(state.charStats.a).toEqual({ hits: 1, misses: 1 });
  });

  it('zählt jeden falschen Anschlag einzeln', () => {
    let state = createSession('a', { mode: 'correct' });
    state = typeChar(state, 'x', 0);
    state = typeChar(state, 'y', 100);
    state = typeChar(state, 'a', 200);
    expect(state.errorCount).toBe(2);
    expect(state.keystrokes).toBe(3);
    expect(getAccuracy(state)).toBeCloseTo(33.33, 1);
    expect(state.correctChars).toBe(1);
  });

  it('ignoriert die Rücktaste', () => {
    let state = createSession('asdf', { mode: 'correct' });
    state = typeChar(state, 'a', 0);
    const after = deleteBackward(state, 100);
    expect(after).toBe(state);
  });
});

describe('Modus „Einfach weiterschreiben“', () => {
  it('markiert den Fehler und läuft weiter', () => {
    let state = createSession('asdf', { mode: 'continue' });
    state = typeChar(state, 's', 0);
    expect(state.cursor).toBe(1);
    expect(state.statuses[0]).toBe('incorrect');
    expect(state.typed[0]).toBe('s');
    expect(state.correctChars).toBe(0);
  });

  it('erlaubt Korrekturen per Rücktaste; der Fehler bleibt gezählt', () => {
    let state = createSession('asdf', { mode: 'continue' });
    state = typeChar(state, 's', 0);
    state = deleteBackward(state, 100);
    expect(state.cursor).toBe(0);
    expect(state.statuses[0]).toBe('pending');
    state = typeChar(state, 'a', 200);
    expect(state.statuses[0]).toBe('corrected');
    expect(state.errorCount).toBe(1);
    expect(state.keystrokes).toBe(2);
    expect(state.correctChars).toBe(1);
  });

  it('zieht beim Löschen korrekter Zeichen die korrekten Zeichen ab', () => {
    let state = createSession('abc', { mode: 'continue' });
    state = typeChar(state, 'a', 0);
    state = typeChar(state, 'b', 100);
    expect(state.correctChars).toBe(2);
    state = deleteBackward(state, 200);
    expect(state.correctChars).toBe(1);
    expect(state.cursor).toBe(1);
  });

  it('löscht mit wholeWord bis zum Wortanfang', () => {
    let { state } = typeAll(createSession('das ist gut', { mode: 'continue' }), 'das ist');
    expect(state.cursor).toBe(7);
    state = deleteBackward(state, 5000, true);
    expect(state.cursor).toBe(4);
    expect(state.statuses.slice(4, 7)).toEqual(['pending', 'pending', 'pending']);
    expect(state.correctChars).toBe(4);
  });

  it('ignoriert die Rücktaste am Anfang', () => {
    const state = createSession('abc', { mode: 'continue' });
    expect(deleteBackward(state, 0)).toBe(state);
  });

  it('beendet die Übung auch mit unkorrigierten Fehlern am Ende', () => {
    let state = createSession('ab', { mode: 'continue' });
    state = typeChar(state, 'a', 0);
    state = typeChar(state, 'x', 100);
    expect(state.status).toBe('finished');
    const summary = summarizeSession(state, 100);
    expect(summary.correctChars).toBe(1);
    expect(summary.errors).toBe(1);
    expect(summary.accuracy).toBe(50);
  });
});

describe('Zeitmessung', () => {
  it('deckelt lange Pausen, damit die Geschwindigkeit realistisch bleibt', () => {
    let state = createSession('abc', { mode: 'correct' });
    state = typeChar(state, 'a', 0);
    state = typeChar(state, 'b', 1000);
    state = typeChar(state, 'c', 1000 + 120_000); // zwei Minuten Pause
    expect(state.activeMs).toBe(1000 + IDLE_CAP_MS);
    expect(getDurationMs(state, 999_999)).toBe(1000 + IDLE_CAP_MS);
  });

  it('zählt pausierte Zeit nicht', () => {
    let state = createSession('abcd', { mode: 'correct' });
    state = typeChar(state, 'a', 0);
    state = typeChar(state, 'b', 500);
    state = pauseSession(state, 800);
    expect(state.status).toBe('paused');
    state = typeChar(state, 'c', 60_000);
    expect(state.status).toBe('running');
    state = typeChar(state, 'd', 60_400);
    expect(state.activeMs).toBe(900);
  });

  it('berechnet die WPM einer abgeschlossenen Übung korrekt', () => {
    // 10 Zeichen, 9 Abstände à 600 ms = 5,4 s → 10 / 5 / 0,09 min ≈ 22,2 WPM
    const { state } = typeAll(
      createSession('asdf jklöa', { mode: 'correct' }),
      'asdf jklöa',
      0,
      600,
    );
    const summary = summarizeSession(state, 0);
    expect(summary.durationMs).toBe(5400);
    expect(summary.wpm).toBeCloseTo(22.22, 1);
    expect(summary.accuracy).toBe(100);
  });

  it('zeigt Live-WPM erst mit genug Daten', () => {
    let state = createSession('asdfjklö asdf', { mode: 'correct' });
    state = typeChar(state, 'a', 0);
    state = typeChar(state, 's', 100);
    expect(getLiveWpm(state, 100)).toBeNull();
    ({ state } = typeAll(state, 'dfjklö', 600, 500));
    expect(getLiveWpm(state, 3600)).not.toBeNull();
  });

  it('verarbeitet sehr schnelle Eingaben im selben Millisekunden-Takt ohne Verluste', () => {
    const text = 'schnell tippen ohne fehler';
    const { state } = typeAll(createSession(text, { mode: 'correct' }), text, 0, 0);
    expect(state.status).toBe('finished');
    expect(state.correctChars).toBe(text.length);
    expect(state.keystrokes).toBe(text.length);
  });
});

describe('Zeitlimit', () => {
  it('läuft ab dem ersten Anschlag und pausiert bei Unterbrechungen', () => {
    let state = createSession('a'.repeat(100), { mode: 'correct', timeLimitMs: 10_000 });
    expect(getRemainingMs(state, 50_000)).toBe(10_000);
    state = typeChar(state, 'a', 1000);
    expect(getRemainingMs(state, 4000)).toBe(7000);
    state = pauseSession(state, 4000);
    expect(getRemainingMs(state, 50_000)).toBe(7000);
    state = typeChar(state, 'a', 60_000);
    expect(isTimeUp(state, 66_999)).toBe(false);
    expect(isTimeUp(state, 67_000)).toBe(true);
  });

  it('beendet die Übung exakt beim Limit und nimmt danach keine Zeichen mehr an', () => {
    let state = createSession('a'.repeat(100), { mode: 'correct', timeLimitMs: 5000 });
    state = typeChar(state, 'a', 0);
    state = typeChar(state, 'a', 1000);
    const late = typeChar(state, 'a', 7000);
    expect(late.status).toBe('finished');
    expect(late.keystrokes).toBe(2);
    expect(getDurationMs(late, 99_999)).toBe(5000);

    const finished = finishSession(state, 9000);
    expect(finished.finishedAt).toBe(5000);
    expect(summarizeSession(finished, 9000).durationMs).toBe(5000);
  });
});
