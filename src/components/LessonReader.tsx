import { useEffect, useMemo } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import type { Lesson } from '@/types';
import { useStore } from '@/store/AppStore';
import { lessonToLines, useLessonReader, VOICES, type VoiceId } from '@/lib/reader';
import { cx } from '@/components/ui/ui';

const SECTION_LABEL = (lesson: Lesson, id: string | null) => {
  if (!id) return '';
  if (id === 'intro') return 'Einleitung';
  if (id.startsWith('s')) return lesson.sections[Number(id.slice(1))]?.heading ?? '';
  return (
    { examples: 'Beispiele', practice: 'Praktische Anwendung', mistakes: 'Anfängerfehler', terms: 'Fachbegriffe', summary: 'Zusammenfassung', exercise: 'Übung' } as Record<string, string>
  )[id] ?? '';
};

export type Reader = ReturnType<typeof useLessonReader> & { readFrom: (id: string) => void; isReading: (id: string) => boolean };

/** Hook für die Lektionsseite: Vorleser plus Hilfen zum Hervorheben einzelner Abschnitte. */
export function useReaderForLesson(lesson: Lesson): Reader {
  const { state } = useStore();
  const rate = state.settings.ttsRate;
  const reader = useLessonReader(rate);
  const lines = useMemo(() => lessonToLines(lesson), [lesson]);
  const { stop } = reader;
  // Beim Wechsel der Lektion laufendes Vorlesen beenden
  useEffect(() => () => stop(), [lesson.id, stop]);
  // Mitlaufen: aktuellen Abschnitt in den sichtbaren Bereich holen
  useEffect(() => {
    if (!state.settings.ttsFollow || !reader.currentId) return;
    document.querySelector(`[data-read-id="${reader.currentId}"]`)?.scrollIntoView({ behavior: state.settings.reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, [reader.currentId, state.settings.ttsFollow, state.settings.reduceMotion]);
  return {
    ...reader,
    readFrom: (id: string) => {
      const i = lines.findIndex((l) => l.id === id);
      reader.play(lines, state.settings.ttsVoice as VoiceId, Math.max(0, i));
    },
    isReading: (id: string) => reader.state !== 'idle' && reader.state !== 'unavailable' && reader.currentId === id,
  };
}

/** Kleiner Knopf „Ab hier vorlesen“ neben einer Überschrift. */
export function ReadFromButton({ reader, id, label }: { reader: Reader; id: string; label: string }) {
  if (!reader.engine) return null;
  return (
    <button
      type="button"
      onClick={() => reader.readFrom(id)}
      className={cx('ml-auto rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-accent-glow', reader.isReading(id) && 'text-accent-glow')}
      aria-label={`Ab „${label}“ vorlesen`}
      title="Ab hier vorlesen"
    >
      <Volume2 className="h-4 w-4" />
    </button>
  );
}

export function LessonReaderPanel({ lesson, reader }: { lesson: Lesson; reader: Reader }) {
  const { state, actions } = useStore();
  const s = state.settings;
  if (!reader.engine) return null;
  const active = reader.state === 'starting' || reader.state === 'speaking' || reader.state === 'paused';
  const minutes = Math.max(1, Math.round(lessonToLines(lesson).reduce((n, l) => n + l.text.length, 0) / 900 / s.ttsRate));
  return (
    <>
      <section className="card card-pad mb-6 flex flex-col gap-4 border-accent/15 sm:flex-row sm:items-end sm:justify-between" aria-label="Vorlesen">
        <div className="flex items-center gap-3">
          <button type="button" className="btn-primary" onClick={() => reader.readFrom('intro')}>
            <Volume2 className="h-4 w-4" /> {active ? 'Von vorn vorlesen' : 'Lektion vorlesen'}
          </button>
          <span className="text-xs text-slate-400">
            ca. {minutes} Min. Hörzeit
            <span className="block text-slate-500">{reader.engine === 'claude' ? 'Claude-Stimme' : 'Sprachausgabe deines Browsers'}</span>
          </span>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {reader.engine === 'claude' && (
            <div>
              <label htmlFor="tts-voice" className="label">
                Stimme
              </label>
              <select id="tts-voice" className="input py-2" value={s.ttsVoice} onChange={(e) => actions.updateSettings({ ttsVoice: e.target.value as VoiceId })}>
                {VOICES.map((v) => (
                  <option key={v.id} value={v.id} title={v.hint}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="w-40">
            <label htmlFor="tts-rate" className="label">
              Tempo: {s.ttsRate.toLocaleString('de-DE')}×
            </label>
            <input
              id="tts-rate"
              type="range"
              min={0.7}
              max={1.5}
              step={0.05}
              value={s.ttsRate}
              onChange={(e) => actions.updateSettings({ ttsRate: Number(e.target.value) })}
              className="w-full accent-green-500"
            />
          </div>
          <label className="flex items-center gap-2 pb-2 text-sm text-slate-300">
            <input type="checkbox" className="h-4 w-4 accent-green-500" checked={s.ttsFollow} onChange={(e) => actions.updateSettings({ ttsFollow: e.target.checked })} />
            Text mitlaufen lassen
          </label>
        </div>
      </section>
      {reader.message && (
        <p role="status" className="mb-4 rounded-lg bg-warn/10 px-3 py-2 text-sm text-amber-200">
          {reader.message}
        </p>
      )}
      {active && (
        <div
          className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 backdrop-blur lg:left-72"
          style={{
            paddingBottom: 'max(12px, env(safe-area-inset-bottom, 0px))',
            paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))',
            paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
          }}
          role="region"
          aria-label="Vorlese-Steuerung"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3 pt-3">
            <Volume2 className={cx('h-5 w-5 flex-none text-accent', reader.state === 'speaking' && 'animate-pulse')} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-400">{reader.state === 'paused' ? 'Pausiert' : reader.state === 'starting' ? 'Startet …' : 'Liest vor'}</p>
              <p className="truncate text-sm text-white">{SECTION_LABEL(lesson, reader.currentId) || lesson.title}</p>
            </div>
            {reader.state === 'paused' ? (
              <button type="button" className="btn-primary px-3" onClick={reader.resume} aria-label="Weiterlesen">
                <Play className="h-4 w-4" /> <span className="hidden sm:inline">Weiter</span>
              </button>
            ) : (
              <button type="button" className="btn-secondary px-3" onClick={reader.pause} aria-label="Pause">
                <Pause className="h-4 w-4" /> <span className="hidden sm:inline">Pause</span>
              </button>
            )}
            <button type="button" className="btn-secondary px-3" onClick={reader.stop} aria-label="Vorlesen beenden">
              <Square className="h-4 w-4" /> <span className="hidden sm:inline">Stopp</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
