import {
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { HandsGuide } from '../../components/keyboard/HandsGuide';
import { VirtualKeyboard, type PressedKey } from '../../components/keyboard/VirtualKeyboard';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { ProgressBar } from '../../components/ui/ProgressBar';
import type { Exercise } from '../../domain/exercise/generator';
import type { Finger } from '../../domain/keyboard/fingers';
import { getKeyStroke } from '../../domain/keyboard/keyMap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import {
  getAccuracy,
  getLiveWpm,
  getProgress,
  getRemainingMs,
  type ErrorMode,
  type SessionSummary,
} from '../../domain/typing/engine';
import { cn } from '../../lib/cn';
import { formatAccuracy, formatCountdown, formatWpm } from '../../lib/format';
import { useMediaQuery } from '../../lib/hooks';
import { playSound } from '../../lib/sound';
import { FingerHint } from './FingerHint';
import { describeError, describeTarget, spokenTarget } from './hints';
import { interpretKey, isForeignInput } from './keyInput';
import { TextDisplay } from './TextDisplay';
import { keyIdsForChars } from './usePracticeEnvironment';
import { useTypingSession, type KeystrokeFeedback } from './useTypingSession';

const PRESSED_FEEDBACK_MS = 170;

interface TypingSessionProps {
  exercise: Exercise;
  layout: KeyboardLayout;
  eyebrow: string;
  heading: string;
  errorMode: ErrorMode;
  showErrorHints: boolean;
  showLiveWpm: boolean;
  showHands: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  /** Bereits gelernte Zeichen – andere Tasten werden abgeblendet */
  activeChars: ReadonlySet<string>;
  onFinish: (summary: SessionSummary) => void;
  onRestart: () => void;
  onExit: () => void;
}

export function TypingSession({
  exercise,
  layout,
  eyebrow,
  heading,
  errorMode,
  showErrorHints,
  showLiveWpm,
  showHands,
  soundEnabled,
  reducedMotion,
  activeChars,
  onFinish,
  onRestart,
  onExit,
}: TypingSessionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pressedTimer = useRef<number | undefined>(undefined);
  const [pressed, setPressed] = useState<PressedKey | null>(null);
  const [focused, setFocused] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const coarsePointer = useMediaQuery('(pointer: coarse)');
  const descriptionId = useId();
  const statusId = useId();

  const handleKeystroke = ({ char, correct }: KeystrokeFeedback) => {
    if (soundEnabled) playSound(correct ? 'key' : 'error');
    const stroke = getKeyStroke(layout, char);
    window.clearTimeout(pressedTimer.current);
    setPressed(stroke ? { keyId: stroke.key.id, correct } : null);
    pressedTimer.current = window.setTimeout(() => setPressed(null), PRESSED_FEEDBACK_MS);
  };

  const session = useTypingSession({ exercise, errorMode, onFinish, onKeystroke: handleKeystroke });
  const { state, clock } = session;
  const finished = state.status === 'finished';

  const target = describeTarget(layout, state.chars[state.cursor]);
  const accuracy = getAccuracy(state);
  const liveWpm = getLiveWpm(state, clock);
  const remaining = getRemainingMs(state, clock);
  const progress = getProgress(state, clock);
  const errorText =
    showErrorHints && state.lastError ? describeError(layout, state.lastError, capsLock) : null;

  const activeKeyIds = useMemo(() => keyIdsForChars(layout, activeChars), [activeChars, layout]);

  // Stabiler Schlüssel, damit die Handgrafik nur bei einem Fingerwechsel neu zeichnet.
  const fingerKey = target ? [target.finger, target.shift?.finger ?? ''].join('|') : '';
  const activeFingers = useMemo(
    () => fingerKey.split('|').filter((finger): finger is Finger => finger.length > 0),
    [fingerKey],
  );

  const focusInput = () => textareaRef.current?.focus({ preventScroll: true });

  useEffect(() => {
    textareaRef.current?.focus({ preventScroll: true });
    return () => window.clearTimeout(pressedTimer.current);
  }, []);

  // Tippen funktioniert auch, wenn der Fokus kurz woanders lag (z. B. nach einem Klick ins Leere).
  const onDocumentKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const textarea = textareaRef.current;
    if (!textarea || event.target === textarea || finished) return;
    const origin = event.target instanceof Element ? event.target : null;
    if (origin?.closest('input, textarea, select, [contenteditable="true"], dialog, a, button'))
      return;
    const action = interpretKey(event);
    if (!action || action.type !== 'char' || action.char === ' ' || action.char === '\n') return;
    event.preventDefault();
    textarea.focus({ preventScroll: true });
    session.typeCharacter(action.char);
  });

  useEffect(() => {
    const handler = (event: KeyboardEvent) => onDocumentKeyDown(event);
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    const native = event.nativeEvent;
    if (typeof native.getModifierState === 'function') {
      const caps = native.getModifierState('CapsLock');
      if (caps !== capsLock) setCapsLock(caps);
    }
    const action = interpretKey(native);
    if (!action) return;
    event.preventDefault();
    if (action.type === 'escape') textareaRef.current?.blur();
    else if (action.type === 'backspace') session.backspace(action.wholeWord);
    else session.typeCharacter(action.char);
  };

  /** Rückfallebene für Bildschirmtastaturen, die keine verwertbaren Tastencodes senden. */
  const consumeTextarea = (textarea: HTMLTextAreaElement) => {
    const value = textarea.value;
    textarea.value = '';
    for (const char of Array.from(value)) session.typeCharacter(char === '\r' ? '\n' : char);
  };

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const native = event.nativeEvent as InputEvent;
    if (native.isComposing) return;
    if (native.inputType === 'deleteContentBackward') {
      event.currentTarget.value = '';
      session.backspace(false);
      return;
    }
    // Eingefügter, hineingezogener oder automatisch ersetzter Text ist kein Tippen –
    // er würde die Übung in einem Augenblick abschließen und unmögliche WPM-Werte erzeugen.
    if (isForeignInput(native.inputType)) {
      event.currentTarget.value = '';
      return;
    }
    consumeTextarea(event.currentTarget);
  };

  // Statuszeile im Textfeld – Feststelltaste vor Fehlerhinweis vor Starthinweis.
  let statusLine: ReactNode = null;
  if (capsLock) {
    statusLine = (
      <p className="flex items-center gap-2 text-sm font-medium text-warning-ink">
        <Icon name="alert" size={16} />
        Die Feststelltaste (Caps Lock) ist aktiv.
      </p>
    );
  } else if (errorText) {
    statusLine = (
      <p
        key={state.keystrokes}
        className={cn(
          'flex items-start gap-2 rounded-lg bg-warning-soft px-3 py-1.5 text-sm text-warning-ink',
          !reducedMotion && 'animate-shake-soft',
        )}
      >
        <Icon name="info" size={16} className="mt-0.5 shrink-0" />
        {errorText}
      </p>
    );
  } else if (state.status === 'ready' && focused) {
    statusLine = (
      <p className="flex items-center gap-2 text-sm text-ink-muted">
        <Icon name="info" size={16} className="shrink-0" />
        Lege die Finger auf die Grundstellung und tippe los – die Zeit startet mit dem ersten
        Anschlag.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-muted">{eyebrow}</p>
          <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{heading}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon="restart" onClick={onRestart}>
            Neu starten
          </Button>
          <Button variant="ghost" size="sm" icon="x" onClick={onExit}>
            Beenden
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-4">
        <ProgressBar
          value={progress}
          label="Fortschritt der Übung"
          valueText={remaining !== null ? `Noch ${formatCountdown(remaining)} Minuten` : undefined}
          size="sm"
        />
        <span className="w-14 shrink-0 text-right text-sm font-medium text-ink-muted tabular-nums">
          {remaining !== null ? formatCountdown(remaining) : `${Math.round(progress * 100)} %`}
        </span>
      </div>

      <section
        aria-label="Übungstext"
        className="relative rounded-3xl border border-line bg-surface px-5 pt-5 pb-3 shadow-card sm:px-8 sm:pt-7 sm:pb-4"
        onMouseDown={(event) => {
          // Klick in den Text holt den Fokus zurück, ohne die Auswahl zu verändern.
          event.preventDefault();
          focusInput();
        }}
      >
        <textarea
          ref={textareaRef}
          aria-label="Übungstext abtippen"
          aria-describedby={`${descriptionId} ${statusId}`}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
          className="absolute size-px overflow-hidden opacity-0"
          style={{ clipPath: 'inset(50%)' }}
          onKeyDown={handleKeyDown}
          onPaste={(event) => event.preventDefault()}
          onDrop={(event) => event.preventDefault()}
          onInput={handleInput}
          onCompositionEnd={(event) => consumeTextarea(event.currentTarget)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            session.pause();
          }}
        />
        <p id={descriptionId} className="sr-only">
          Übungstext: {exercise.text.replaceAll('\n', ' Zeilenumbruch ')}
        </p>

        <div
          aria-hidden="true"
          className="font-mono text-[19px] text-ink sm:text-[24px] lg:text-[27px]"
        >
          <TextDisplay
            chars={state.chars}
            statuses={state.statuses}
            cursor={state.cursor}
            reducedMotion={reducedMotion}
          />
        </div>

        <div aria-live="polite" className="mt-2 flex min-h-9 items-center">
          {statusLine}
        </div>

        {!focused && !finished && (
          <div className="absolute inset-0 flex animate-fade-in flex-col items-center justify-center gap-3 rounded-3xl bg-surface/80 text-center backdrop-blur-[3px] [animation-delay:120ms]">
            <p className="flex items-center gap-2 font-medium text-ink">
              <Icon name="pause" size={18} />
              {state.status === 'ready' ? 'Bereit, wenn du es bist' : 'Pausiert'}
            </p>
            <Button size="sm" icon="play" onClick={focusInput}>
              {state.status === 'ready' ? 'Übung beginnen' : 'Weiter tippen'}
            </Button>
            <p className="px-6 text-xs text-ink-muted">
              {coarsePointer
                ? 'Am besten übst du mit einer echten Tastatur.'
                : 'Oder einfach einen Buchstaben tippen.'}
            </p>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FingerHint target={target} />
        <dl className="flex gap-6 sm:gap-8">
          {showLiveWpm && (
            <div>
              <dt className="text-xs font-medium text-ink-muted">Geschwindigkeit</dt>
              <dd className="text-lg font-semibold text-ink tabular-nums">
                {formatWpm(liveWpm)} <span className="text-sm font-medium text-ink-muted">WPM</span>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-medium text-ink-muted">Genauigkeit</dt>
            <dd className="text-lg font-semibold text-ink tabular-nums">
              {formatAccuracy(accuracy)}{' '}
              <span className="text-sm font-medium text-ink-muted">%</span>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">Fehler</dt>
            <dd className="text-lg font-semibold text-ink tabular-nums">{state.errorCount}</dd>
          </div>
        </dl>
      </div>
      <p id={statusId} className="sr-only" aria-live="polite">
        {finished ? 'Übung abgeschlossen.' : spokenTarget(target)}
      </p>

      <div className="mx-auto max-w-3xl">
        <VirtualKeyboard
          layout={layout}
          label={
            target
              ? `Bildschirmtastatur. Nächste Taste: ${target.keyLabel}, ${target.fingerLabel}.`
              : 'Bildschirmtastatur'
          }
          targetKeyId={finished ? null : target?.keyId}
          modifierKeyId={finished ? null : target?.shift?.keyId}
          pressed={pressed}
          activeKeyIds={activeKeyIds}
          showHandDivider
        />
      </div>
      {showHands && (
        // Nur bei genug Bildschirmhöhe – Text und Tastatur haben Vorrang.
        <div className="mx-auto hidden w-full max-w-[280px] sm:[@media(min-height:880px)]:block">
          <HandsGuide activeFingers={finished ? [] : activeFingers} />
        </div>
      )}
    </div>
  );
}
