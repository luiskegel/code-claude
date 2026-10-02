import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Badge } from '../../components/ui/Badge';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import { keyLabelForChar } from '../../domain/keyboard/keyMap';
import type { Lesson } from '../../domain/lessons/types';
import { TIMED_MIN_WPM } from '../../domain/lessons/unlock';
import type { ResultOutcome } from '../../domain/progress/progress';
import { displayAccuracy } from '../../domain/typing/metrics';
import { cn } from '../../lib/cn';
import { formatAccuracy, formatDays, formatDuration, formatWpm } from '../../lib/format';

interface ResultsScreenProps {
  outcome: ResultOutcome;
  /** Fehlt bei „Fehler wiederholen“ */
  lesson?: Lesson;
  nextLesson?: Lesson;
  /** Ob die nächste Lektion geöffnet werden darf */
  nextUnlocked: boolean;
  onRetry: () => void;
  onNext?: () => void;
  /** Zusätzliche Aktion, z. B. „Zur Übersicht“ im Wiederholungsmodus */
  secondaryAction?: { label: string; onClick: () => void };
}

function headline(
  outcome: ResultOutcome,
  lesson: Lesson | undefined,
): { title: string; message: string } {
  const { result, evaluation } = outcome;
  const accuracy = displayAccuracy(result.accuracy);
  if (lesson && evaluation && !evaluation.passed) {
    if (evaluation.failures.includes('accuracy')) {
      return {
        title: 'Fast geschafft.',
        message: `Für den Abschluss brauchst du mindestens ${lesson.passAccuracy} % Genauigkeit – diesmal waren es ${accuracy} %. Lass dir Zeit: Genauigkeit geht vor Tempo.`,
      };
    }
    if (evaluation.failures.includes('speed')) {
      return {
        title: 'Noch ein bisschen flotter.',
        message: `Für den Abschluss dieser Zeitübung brauchst du mindestens ${TIMED_MIN_WPM} WPM. Tippe gleichmäßig weiter, auch wenn mal ein Fehler passiert.`,
      };
    }
    return {
      title: 'Übung unvollständig.',
      message: 'Tippe den Text bis zum Ende, um die Lektion abzuschließen.',
    };
  }
  if (accuracy >= 98) {
    return {
      title: 'Sauber.',
      message: `Du hast die Übung mit ${accuracy} % Genauigkeit abgeschlossen.`,
    };
  }
  if (accuracy >= 95) {
    return {
      title: 'Sehr gut!',
      message: `Du hast die Übung abgeschlossen – mit sehr guter Genauigkeit.`,
    };
  }
  return {
    title: 'Geschafft.',
    message:
      'Du hast die Übung abgeschlossen. Achte beim nächsten Mal besonders auf saubere Anschläge.',
  };
}

export function ResultsScreen({
  outcome,
  lesson,
  nextLesson,
  nextUnlocked,
  onRetry,
  onNext,
  secondaryAction,
}: ResultsScreenProps) {
  const { result } = outcome;
  const passed = lesson ? result.passed : true;
  const { title, message } = headline(outcome, lesson);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const canGoNext = Boolean(lesson && nextLesson && nextUnlocked && onNext);

  useEffect(() => {
    primaryRef.current?.focus({ preventScroll: true });
  }, []);

  const errorKeys = Object.entries(result.charStats)
    .filter(([, stat]) => stat.misses > 0)
    .sort((a, b) => b[1].misses - a[1].misses)
    .slice(0, 5);

  const streakGrew =
    outcome.streakAfter.current > outcome.streakBefore.current ||
    outcome.streakBefore.lastPracticeDate === null;

  return (
    <div className="mx-auto max-w-3xl">
      <section
        className="rounded-3xl border border-line bg-surface p-6 text-center shadow-card sm:p-10"
        aria-labelledby="ergebnis-titel"
      >
        <span
          className={cn(
            'mx-auto flex size-16 animate-pop items-center justify-center rounded-full',
            passed ? 'bg-success-soft text-success-ink' : 'bg-warning-soft text-warning-ink',
          )}
        >
          <Icon name={passed ? 'check' : 'target'} size={30} />
        </span>
        <h1
          id="ergebnis-titel"
          className="mt-5 text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]"
        >
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-ink-muted">
          {message}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Geschwindigkeit', value: formatWpm(result.wpm), unit: 'WPM' },
            { label: 'Genauigkeit', value: formatAccuracy(result.accuracy), unit: '%' },
            { label: 'Fehler', value: String(result.errors), unit: '' },
            { label: 'Zeit', value: formatDuration(result.durationMs), unit: 'Min.' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-surface-2 px-4 py-4">
              <dt className="text-xs font-medium text-ink-muted">{item.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink tabular-nums">
                {item.value}
                {item.unit && (
                  <span className="ml-1 text-sm font-medium text-ink-muted">{item.unit}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {outcome.isNewBestWpm && (
            <Badge tone="accent" icon="trophy">
              Neue Bestleistung: {formatWpm(result.wpm)} WPM
            </Badge>
          )}
          {outcome.isNewBestAccuracy && !outcome.isNewBestWpm && (
            <Badge tone="accent" icon="target">
              Neue Bestleistung bei der Genauigkeit
            </Badge>
          )}
          {outcome.unlockedLessonId && nextLesson && (
            <Badge tone="success" icon="check">
              Lektion {nextLesson.number} freigeschaltet
            </Badge>
          )}
          {streakGrew && outcome.streakAfter.current > 0 && (
            <Badge tone="streak" icon="flame">
              Serie: {formatDays(outcome.streakAfter.current)}
            </Badge>
          )}
        </div>

        {lesson && outcome.previousLessonBestWpm !== null && (
          <p className="mt-5 text-sm text-ink-muted">
            Bisher beste Leistung in dieser Lektion: {formatWpm(outcome.previousLessonBestWpm)} WPM
            · {formatAccuracy(outcome.previousLessonBestAccuracy)} %
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse justify-center gap-2 sm:flex-row">
          <ButtonLink to="/" variant="ghost">
            Zum Dashboard
          </ButtonLink>
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          <Button
            ref={canGoNext ? undefined : primaryRef}
            variant={canGoNext ? 'secondary' : 'primary'}
            icon="restart"
            onClick={onRetry}
          >
            Nochmal üben
          </Button>
          {canGoNext && (
            <Button ref={primaryRef} iconEnd="arrow-right" onClick={onNext}>
              Nächste Lektion
            </Button>
          )}
        </div>
      </section>

      {errorKeys.length > 0 && (
        <section
          className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
          aria-labelledby="fehler-titel"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="fehler-titel" className="text-[15px] font-semibold text-ink">
              Tasten mit Fehlern in dieser Übung
            </h2>
            <Link to="/wiederholen" className="text-sm font-medium text-accent-ink hover:underline">
              Fehler gezielt wiederholen
            </Link>
          </div>
          <ul className="mt-4 flex flex-wrap gap-3">
            {errorKeys.map(([char, stat]) => (
              <li
                key={char}
                className="flex items-center gap-2 rounded-xl bg-surface-2 py-1.5 pr-3 pl-1.5"
              >
                <KeyCap size="sm">{keyLabelForChar(char)}</KeyCap>
                <span className="text-sm text-ink-muted">{stat.misses} Fehler</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
