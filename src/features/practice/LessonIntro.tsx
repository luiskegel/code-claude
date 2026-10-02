import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import { keyLabelForChar } from '../../domain/keyboard/keyMap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import { getIntroKeyIds, TOTAL_LESSONS } from '../../domain/lessons/catalog';
import type { Lesson, LessonModule } from '../../domain/lessons/types';
import { TIMED_MIN_WPM } from '../../domain/lessons/unlock';
import type { LessonProgress } from '../../domain/progress/types';
import { formatAccuracy, formatWpm } from '../../lib/format';
import { getLessonKeyBadges } from '../shared/lessonKeys';
import { FingerLegend } from './FingerLegend';
import { TheoryStepView } from './TheorySteps';
import { THEORY_TITLES } from './theoryTitles';

interface LessonIntroProps {
  lesson: Lesson;
  module: LessonModule;
  layout: KeyboardLayout;
  lessonProgress?: LessonProgress;
  /** Zeichen, die wegen häufiger Fehler bevorzugt eingebaut werden */
  adaptiveChars: readonly string[];
  activeKeyIds: ReadonlySet<string>;
  onStart: () => void;
}

export function LessonIntro({
  lesson,
  module,
  layout,
  lessonProgress,
  adaptiveChars,
  activeKeyIds,
  onStart,
}: LessonIntroProps) {
  const theory = lesson.intro.theory ?? [];
  const [step, setStep] = useState(0);
  const onTheoryStep = step < theory.length;
  const currentTheory = theory[step];
  const startRef = useRef<HTMLButtonElement>(null);
  const introKeyIds = getIntroKeyIds(lesson, layout);
  const badges = getLessonKeyBadges(lesson, layout);
  const passed = lessonProgress?.passed ?? false;

  useEffect(() => {
    if (!onTheoryStep) startRef.current?.focus({ preventScroll: true });
  }, [onTheoryStep]);

  const goal = [
    `mindestens ${lesson.passAccuracy} % Genauigkeit`,
    ...(lesson.timeLimitSec
      ? [`${lesson.timeLimitSec} Sekunden Zeit`, `mindestens ${TIMED_MIN_WPM} WPM`]
      : []),
  ].join(' · ');

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/lernen"
          className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-ink-muted hover:text-ink"
        >
          <Icon name="chevron-left" size={16} />
          Alle Lektionen
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-ink-muted">
            Modul {module.number} · {module.title}
          </span>
          <Badge tone={passed ? 'success' : 'neutral'} icon={passed ? 'check' : undefined}>
            {passed ? 'Abgeschlossen' : `Lektion ${lesson.number} von ${TOTAL_LESSONS}`}
          </Badge>
        </div>
        <h1 className="mt-2 text-[28px] leading-tight font-semibold tracking-tight text-ink sm:text-[34px]">
          Lektion {lesson.number} · {lesson.title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          {lesson.summary}
        </p>
      </div>

      {onTheoryStep && currentTheory ? (
        <Card padding="lg" aria-labelledby="theorie-titel">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 id="theorie-titel" className="text-xl font-semibold tracking-tight text-ink">
              {THEORY_TITLES[currentTheory]}
            </h2>
            <span className="text-sm text-ink-muted">
              Schritt {step + 1} von {theory.length + 1}
            </span>
          </div>
          <TheoryStepView step={currentTheory} layout={layout} />
          <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={() => setStep(theory.length)}>
              Direkt zur Übung
            </Button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              {step > 0 && (
                <Button variant="secondary" icon="arrow-left" onClick={() => setStep(step - 1)}>
                  Zurück
                </Button>
              )}
              <Button iconEnd="arrow-right" onClick={() => setStep(step + 1)} autoFocus>
                Weiter
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <Card padding="lg">
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">
              {lesson.newChars.length > 0 || lesson.introKeyIds
                ? 'Neue Tasten'
                : 'Deine Fingerzuordnung'}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {lesson.newChars.length > 0 || lesson.introKeyIds
                ? 'Die farbige Markierung zeigt, welcher Finger die Taste drückt.'
                : 'Jeder Finger bleibt in seiner Farbe – so wie in den bisherigen Lektionen.'}
            </p>
            <div className="mt-5">
              <VirtualKeyboard
                layout={layout}
                label={`Tastatur mit den Tasten dieser Lektion: ${badges.map((badge) => badge.name).join(', ')}`}
                introKeyIds={introKeyIds}
                activeKeyIds={activeKeyIds}
                tint={introKeyIds.length === 0}
                showHandDivider
              />
            </div>
            {badges.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <li
                    key={badge.id}
                    className="flex items-center gap-2.5 rounded-xl bg-surface-2 py-2 pr-3.5 pl-2"
                  >
                    <KeyCap fingerKind={badge.fingerKind} size="md">
                      {badge.label}
                    </KeyCap>
                    <span className="text-sm font-medium text-ink">
                      {badge.name !== badge.label && (
                        <span className="sr-only">{badge.name}: </span>
                      )}
                      {badge.fingerLabel}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {introKeyIds.length === 0 && <FingerLegend className="mt-5" />}
          </Card>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card padding="lg">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink">
                Warum diese Lektion?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{lesson.intro.why}</p>
              <h3 className="mt-6 text-[15px] font-semibold text-ink">So gehst du vor</h3>
              <ul className="mt-3 space-y-2.5">
                {lesson.intro.tips.map((tip) => (
                  <li key={tip} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-muted">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-success-ink" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="lg" className="flex flex-col">
              <h2 className="text-[17px] font-semibold tracking-tight text-ink">Dein Ziel</h2>
              <p className="mt-2 flex items-start gap-2 text-[15px] leading-relaxed text-ink">
                <Icon name="target" size={18} className="mt-0.5 shrink-0 text-accent-ink" />
                {goal}
              </p>
              {lessonProgress && lessonProgress.attempts > 0 && (
                <p className="mt-3 text-sm text-ink-muted">
                  Deine Bestleistung: {formatWpm(lessonProgress.bestWpm)} WPM ·{' '}
                  {formatAccuracy(lessonProgress.bestAccuracy)} % ({lessonProgress.attempts}{' '}
                  {lessonProgress.attempts === 1 ? 'Versuch' : 'Versuche'})
                </p>
              )}
              {adaptiveChars.length > 0 && (
                <p className="mt-3 flex items-start gap-2 rounded-xl bg-accent-soft p-3 text-sm leading-relaxed text-accent-ink">
                  <Icon name="sparkles" size={16} className="mt-0.5 shrink-0" />
                  <span>
                    Angepasst an dich: Die Übung enthält öfter{' '}
                    {adaptiveChars.map((char) => keyLabelForChar(char)).join(', ')} – dort hattest
                    du zuletzt die meisten Fehler.
                  </span>
                </p>
              )}
              <div className="mt-auto pt-6">
                <Button
                  ref={startRef}
                  size="lg"
                  iconEnd="arrow-right"
                  className="w-full"
                  onClick={onStart}
                >
                  Übung starten
                </Button>
                {theory.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-3 w-full rounded-lg py-1 text-sm font-medium text-ink-muted hover:text-ink"
                  >
                    Einführung noch einmal ansehen
                  </button>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
