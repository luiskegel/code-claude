import { useMemo, useState } from 'react';
import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { BRAND } from '../../config/brand';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { KeyCap } from '../../components/ui/KeyCap';
import { PageHeader } from '../../components/ui/PageHeader';
import { generateReviewExercise, type Exercise } from '../../domain/exercise/generator';
import { randomSeed } from '../../domain/exercise/random';
import { keyLabelForChar } from '../../domain/keyboard/keyMap';
import { getRecommendedLesson } from '../../domain/lessons/unlock';
import type { ResultOutcome } from '../../domain/progress/progress';
import {
  getLearnedChars,
  getWeakChars,
  KEY_STATS_WINDOW,
  type WeakChar,
} from '../../domain/progress/statistics';
import type { SessionSummary } from '../../domain/typing/engine';
import { cn } from '../../lib/cn';
import { usePageTitle, useScrollToTop } from '../../lib/hooks';
import { playSound } from '../../lib/sound';
import { useActions } from '../../state/hooks';
import { ResultsScreen } from '../practice/ResultsScreen';
import { TypingSession } from '../practice/TypingSession';
import { keyIdsForChars, usePracticeEnvironment } from '../practice/usePracticeEnvironment';

type Phase =
  | { name: 'overview' }
  | { name: 'practice'; exercise: Exercise; attempt: number; focus: string[] }
  | { name: 'results'; outcome: ResultOutcome; focus: string[] };

const DEFAULT_SELECTION = 3;
const MAX_SELECTION = 5;

function WeakCharOption({
  entry,
  checked,
  disabled,
  onToggle,
}: {
  entry: WeakChar;
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const label = keyLabelForChar(entry.char);
  return (
    <li>
      <label
        className={cn(
          'flex cursor-pointer items-center gap-4 rounded-2xl border p-3.5 transition-colors',
          'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--tf-focus)',
          checked ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:bg-surface-2',
          disabled && !checked && 'cursor-not-allowed opacity-60',
        )}
      >
        <input
          type="checkbox"
          className="size-4 accent-(--tf-accent)"
          checked={checked}
          disabled={disabled && !checked}
          onChange={onToggle}
        />
        <KeyCap size="md">{label}</KeyCap>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-ink">{entry.misses} Fehler</span>
          <span className="block text-sm text-ink-muted">
            {Math.round(entry.errorRate * 100)} % Fehlerquote bei {entry.attempts} Anschlägen
          </span>
        </span>
        <span
          className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-surface-3 sm:block"
          aria-hidden="true"
        >
          <span
            className="block h-full rounded-full bg-warning"
            style={{ width: `${Math.min(100, entry.errorRate * 300)}%` }}
          />
        </span>
      </label>
    </li>
  );
}

export function ReviewPage() {
  usePageTitle('Fehler wiederholen');
  const { recordExercise } = useActions();
  const { settings, progress, layout, reducedMotion } = usePracticeEnvironment();
  const [phase, setPhase] = useState<Phase>({ name: 'overview' });
  const [selection, setSelection] = useState<string[] | null>(null);
  useScrollToTop(
    phase.name === 'practice' ? `practice-${phase.exercise.id}-${phase.attempt}` : phase.name,
  );

  const weakChars = useMemo(() => getWeakChars(progress.history), [progress.history]);
  const learnedChars = useMemo(() => getLearnedChars(progress), [progress]);
  const activeKeyIds = useMemo(() => keyIdsForChars(layout, learnedChars), [layout, learnedChars]);
  const selected = selection ?? weakChars.slice(0, DEFAULT_SELECTION).map((entry) => entry.char);
  const weakKeyIds = [...keyIdsForChars(layout, selected)];

  const toggle = (char: string) => {
    setSelection(
      selected.includes(char) ? selected.filter((c) => c !== char) : [...selected, char],
    );
  };

  const start = (focus: string[]) => {
    setPhase({
      name: 'practice',
      exercise: generateReviewExercise({ focusChars: focus, learnedChars, seed: randomSeed() }),
      attempt: 0,
      focus,
    });
  };

  const handleFinish = (exercise: Exercise, summary: SessionSummary, focus: string[]) => {
    const outcome = recordExercise({ exercise, summary, completedAt: new Date() });
    if (settings.soundEnabled) playSound('complete');
    setPhase({ name: 'results', outcome, focus });
  };

  if (phase.name === 'practice') {
    const { exercise, attempt, focus } = phase;
    return (
      <TypingSession
        key={`${exercise.id}-${attempt}`}
        exercise={exercise}
        layout={layout}
        eyebrow="Fehler wiederholen"
        heading={`Training: ${focus.map((char) => keyLabelForChar(char)).join(', ')}`}
        errorMode={settings.errorMode}
        showErrorHints={settings.showErrorHints}
        showLiveWpm={settings.showLiveWpm}
        showHands={settings.showHands}
        soundEnabled={settings.soundEnabled}
        reducedMotion={reducedMotion}
        activeChars={learnedChars}
        onFinish={(summary) => handleFinish(exercise, summary, focus)}
        onRestart={() => setPhase({ ...phase, attempt: attempt + 1 })}
        onExit={() => setPhase({ name: 'overview' })}
      />
    );
  }

  if (phase.name === 'results') {
    return (
      <ResultsScreen
        outcome={phase.outcome}
        nextUnlocked={false}
        onRetry={() => start(phase.focus)}
        secondaryAction={{
          label: 'Zur Fehlerübersicht',
          onClick: () => setPhase({ name: 'overview' }),
        }}
      />
    );
  }

  const recommended = getRecommendedLesson(progress.lessons, settings.freeLessonChoice);

  return (
    <>
      <PageHeader
        title="Fehler wiederholen"
        description={`${BRAND.name} wertet deine letzten ${KEY_STATS_WINDOW} Übungen aus und findet die Tasten, bei denen du am häufigsten danebenliegst. Daraus entsteht eine Übung mit echten Wörtern.`}
      />

      {progress.history.length === 0 ? (
        <Card>
          <EmptyState
            icon="repeat"
            title="Noch keine Daten"
            description="Sobald du ein paar Übungen abgeschlossen hast, erscheinen hier die Tasten, die dir noch schwerfallen."
            action={
              <ButtonLink
                to={recommended ? `/lernen/${recommended.id}` : '/lernen'}
                iconEnd="arrow-right"
              >
                Erste Lektion starten
              </ButtonLink>
            }
          />
        </Card>
      ) : weakChars.length === 0 ? (
        <Card>
          <EmptyState
            icon="check-circle"
            title="Keine auffälligen Fehler"
            description="In deinen letzten Übungen gab es kaum Tippfehler. Sehr sauber – mach einfach mit der nächsten Lektion weiter."
            action={
              <ButtonLink
                to={recommended ? `/lernen/${recommended.id}` : '/lernen'}
                iconEnd="arrow-right"
              >
                Weiterlernen
              </ButtonLink>
            }
          />
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Card>
            <CardHeader
              title="Deine häufigsten Fehler"
              description={`Wähle bis zu ${MAX_SELECTION} Tasten für deine Übung.`}
            />
            <ul className="space-y-2.5">
              {weakChars.map((entry) => (
                <WeakCharOption
                  key={entry.char}
                  entry={entry}
                  checked={selected.includes(entry.char)}
                  disabled={selected.length >= MAX_SELECTION}
                  onToggle={() => toggle(entry.char)}
                />
              ))}
            </ul>
            <Button
              size="lg"
              className="mt-6 w-full"
              iconEnd="arrow-right"
              disabled={selected.length === 0}
              onClick={() => start(selected)}
            >
              Diese Tasten trainieren
            </Button>
            {selected.length === 0 && (
              <p className="mt-2 text-center text-sm text-ink-muted">
                Wähle mindestens eine Taste aus.
              </p>
            )}
          </Card>
          <Card>
            <CardHeader
              title="Auf der Tastatur"
              description="Die ausgewählten Tasten in der Farbe des zuständigen Fingers."
            />
            <VirtualKeyboard
              layout={layout}
              label={`Ausgewählte Tasten: ${selected.map((char) => keyLabelForChar(char)).join(', ') || 'keine'}`}
              introKeyIds={weakKeyIds}
              activeKeyIds={activeKeyIds}
              tint={false}
            />
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Die Übung besteht überwiegend aus Wörtern, in denen deine Fehlertasten vorkommen – so
              trainierst du sie im natürlichen Schreibfluss statt als Buchstabensalat.
            </p>
          </Card>
        </div>
      )}
    </>
  );
}
