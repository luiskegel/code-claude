// Vorlesefunktion für Lektionen.
// Im Claude-Artefakt: Claudes eigene Stimmen über die `tts`-Fähigkeit.
// In der lokalen Version: die Sprachausgabe des Browsers (Web Speech API) als Ersatz.
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lesson } from '@/types';
import { IS_ARTIFACT } from './env';

export type VoiceId = 'buttery' | 'airy' | 'glassy' | 'rounded';
export const VOICES: { id: VoiceId; label: string; hint: string }[] = [
  { id: 'buttery', label: 'Claude (Standard)', hint: 'Warm und ruhig – die Standardstimme von Claude' },
  { id: 'airy', label: 'Hell', hint: 'Leicht und luftig' },
  { id: 'glassy', label: 'Klar', hint: 'Deutlich und präzise' },
  { id: 'rounded', label: 'Weich', hint: 'Rund und gemütlich' },
];

export interface ReadLine {
  id: string;
  text: string;
}

const clean = (s: string) => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

/** Teilt langen Text an Satzgrenzen in Stücke bis `max` Zeichen. */
export function chunkText(text: string, max: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["“”«»)]*\s*|[^.!?]+$/g) ?? [text];
  const out: string[] = [];
  let cur = '';
  for (const s of sentences) {
    if (cur && (cur + s).length > max) {
      out.push(cur.trim());
      cur = '';
    }
    if (s.length > max) {
      for (let i = 0; i < s.length; i += max) out.push(s.slice(i, i + max).trim());
    } else cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter(Boolean);
}

/**
 * Baut den Vorlesetext einer Lektion als Folge von Abschnitten.
 * Die `id` entspricht dem Abschnitt auf der Seite (zum Hervorheben).
 */
export function lessonToLines(lesson: Lesson, maxLen = 1800): ReadLine[] {
  const blocks: ReadLine[] = [];
  blocks.push({ id: 'intro', text: `${lesson.title}. ${lesson.intro}` });
  lesson.sections.forEach((s, i) => {
    const parts = [`${s.heading}.`, ...s.paragraphs];
    if (s.bullets) parts.push(...s.bullets.map((b) => (/[.!?]$/.test(b) ? b : `${b}.`)));
    blocks.push({ id: `s${i}`, text: parts.join(' ') });
  });
  blocks.push({ id: 'examples', text: `Beispiele. ${lesson.examples.map((e) => `${e.title}. ${e.text}`).join(' ')}` });
  blocks.push({ id: 'practice', text: `Praktische Anwendung. ${lesson.practice.join(' ')}` });
  blocks.push({ id: 'mistakes', text: `Typische Anfängerfehler. ${lesson.mistakes.join(' ')}` });
  blocks.push({ id: 'terms', text: `Wichtige Fachbegriffe. ${lesson.terms.map((t) => `${t.term}: ${t.definition}`).join(' ')}` });
  blocks.push({ id: 'summary', text: `Zusammenfassung. ${lesson.summary.join(' ')}` });
  blocks.push({ id: 'exercise', text: `Praktische Übung: ${lesson.exercise.title}. ${lesson.exercise.task}` });
  return blocks.flatMap((b) => chunkText(clean(b.text), maxLen).map((text) => ({ id: b.id, text })));
}

// ---------- Typen der Claude-Sprachausgabe (Ausschnitt) ----------
type TtsState = 'idle' | 'starting' | 'speaking' | 'paused';
interface TtsNS {
  speak(what: { text: string; id?: string }[], o?: { voice?: VoiceId; rate?: number; language?: string }): Promise<unknown>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  setRate?(r: number): Promise<void>;
  onState(h: (e: { state: TtsState; reason?: string }) => void): () => void;
  onLine(h: (e: { line: number; id?: string }) => void): () => void;
}

export type ReaderState = 'unavailable' | 'idle' | 'starting' | 'speaking' | 'paused';

const ERROR_TEXT: Record<string, string> = {
  no_gesture: 'Bitte tippe noch einmal auf „Vorlesen“.',
  busy: 'Gerade läuft eine Spracheingabe oder Rückfrage. Versuche es gleich noch einmal.',
  rate_limited: 'Das Vorlese-Kontingent ist im Moment ausgeschöpft. Bitte später erneut versuchen.',
  unavailable: 'Vorlesen ist gerade nicht verfügbar.',
  upstream_error: 'Die Sprachausgabe wurde unterbrochen.',
};

export function useLessonReader(rate: number) {
  const [engine, setEngine] = useState<'claude' | 'browser' | null>(null);
  const [state, setState] = useState<ReaderState>('unavailable');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const tts = useRef<TtsNS | null>(null);
  const lineIds = useRef<string[]>([]);
  const browserQueue = useRef<{ lines: ReadLine[]; index: number; voice?: SpeechSynthesisVoice } | null>(null);

  // Verfügbarkeit prüfen
  useEffect(() => {
    let cancelled = false;
    const unsubs: (() => void)[] = [];
    if (IS_ARTIFACT) {
      const c = (window as unknown as { claude?: { use(n: 'tts'): Promise<TtsNS | null> } }).claude;
      c?.use('tts')
        .then((t) => {
          if (cancelled || !t) return;
          tts.current = t;
          setEngine('claude');
          setState('idle');
          unsubs.push(
            t.onState(({ state: s, reason }) => {
              setState(s);
              if (s === 'idle') {
                setCurrentId(null);
                if (reason === 'not_granted' || reason === 'unavailable') {
                  setState('unavailable');
                  setEngine(null);
                } else if (reason && ERROR_TEXT[reason]) setMessage(ERROR_TEXT[reason]);
              }
            }),
            t.onLine(({ line, id }) => setCurrentId(id ?? lineIds.current[line] ?? null)),
          );
        })
        .catch(() => undefined);
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setEngine('browser');
      setState('idle');
    }
    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
      if (!IS_ARTIFACT && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      tts.current?.stop().catch(() => undefined);
    };
  }, []);

  // Tempo live übernehmen
  useEffect(() => {
    tts.current?.setRate?.(rate).catch(() => undefined);
  }, [rate]);

  const speakBrowser = useCallback(
    (index: number) => {
      const q = browserQueue.current;
      if (!q || index >= q.lines.length) {
        browserQueue.current = null;
        setState('idle');
        setCurrentId(null);
        return;
      }
      q.index = index;
      const line = q.lines[index];
      const u = new SpeechSynthesisUtterance(line.text);
      u.lang = 'de-DE';
      if (q.voice) u.voice = q.voice;
      u.rate = rate;
      u.onstart = () => {
        setState('speaking');
        setCurrentId(line.id);
      };
      u.onend = () => browserQueue.current === q && speakBrowser(index + 1);
      u.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') setMessage('Die Sprachausgabe des Browsers wurde unterbrochen.');
      };
      window.speechSynthesis.speak(u);
    },
    [rate],
  );

  /** Startet das Vorlesen ab Zeile `from`. Muss direkt aus einem Klick aufgerufen werden. */
  const play = useCallback(
    (lines: ReadLine[], voice: VoiceId, from = 0) => {
      setMessage(null);
      const part = lines.slice(from);
      if (!part.length) return;
      if (engine === 'claude' && tts.current) {
        lineIds.current = part.map((l) => l.id);
        setCurrentId(part[0].id);
        tts.current.speak(part.map((l) => ({ text: l.text, id: l.id })), { voice, rate, language: 'de' }).catch((e: { code?: string; reason?: string }) => {
          if (e?.code === 'not_granted') {
            setEngine(null);
            setState('unavailable');
          } else if (e?.code && e.code !== 'stopped' && ERROR_TEXT[e.code]) setMessage(ERROR_TEXT[e.code]);
        });
      } else if (engine === 'browser') {
        window.speechSynthesis.cancel();
        const browserLines = part.flatMap((l) => chunkText(l.text, 220).map((text) => ({ id: l.id, text })));
        const de = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith('de'));
        browserQueue.current = { lines: browserLines, index: 0, voice: de };
        setState('starting');
        speakBrowser(0);
      }
    },
    [engine, rate, speakBrowser],
  );

  const pause = useCallback(() => {
    if (engine === 'claude') tts.current?.pause().catch(() => undefined);
    else if (engine === 'browser') {
      window.speechSynthesis.pause();
      setState('paused');
    }
  }, [engine]);

  const resume = useCallback(() => {
    if (engine === 'claude') tts.current?.resume().catch(() => undefined);
    else if (engine === 'browser') {
      window.speechSynthesis.resume();
      setState('speaking');
    }
  }, [engine]);

  const stop = useCallback(() => {
    if (engine === 'claude') tts.current?.stop().catch(() => undefined);
    else if (engine === 'browser') {
      browserQueue.current = null;
      window.speechSynthesis.cancel();
      setState('idle');
      setCurrentId(null);
    }
  }, [engine]);

  return { engine, state, currentId, message, play, pause, resume, stop };
}
