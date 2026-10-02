import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { HandsGuide } from '../../components/keyboard/HandsGuide';
import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { BrandMark } from '../../components/layout/BrandMark';
import { Button } from '../../components/ui/Button';
import { Icon, type IconName } from '../../components/ui/Icon';
import { BRAND } from '../../config/brand';
import { getKeyboardLayout, type KeyboardLayoutId } from '../../domain/keyboard/layouts';
import { TOTAL_LESSONS } from '../../domain/lessons/catalog';
import { LESSONS } from '../../domain/lessons/curriculum';
import { GOAL_OPTIONS, settingsForGoal, type LearningGoal } from '../../domain/settings/settings';
import { cn } from '../../lib/cn';
import { usePageTitle } from '../../lib/hooks';
import { useActions, useSettings } from '../../state/hooks';
import { ONBOARDING_PRIVACY } from '../shared/privacy';

type KeyboardChoice = 'apple-de' | 'standard-de' | 'other';

const KEYBOARD_CHOICES: readonly {
  id: KeyboardChoice;
  title: string;
  description: string;
  layout: KeyboardLayoutId;
}[] = [
  {
    id: 'apple-de',
    title: 'Apple Magic Keyboard / QWERTZ',
    description: 'Deutsche Mac-Tastatur mit cmd- und alt-Taste.',
    layout: 'apple-de',
  },
  {
    id: 'standard-de',
    title: 'Standard QWERTZ',
    description: 'Deutsche PC-Tastatur mit Strg- und Windows-Taste.',
    layout: 'standard-de',
  },
  {
    id: 'other',
    title: 'Andere Tastatur',
    description: 'Zum Beispiel eine Laptop- oder Kompakttastatur.',
    layout: 'standard-de',
  },
];

const FEATURES: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'layers',
    title: 'Schritt für Schritt',
    text: `${TOTAL_LESSONS} aufeinander aufbauende Lektionen – von der Grundstellung bis zu ganzen Texten.`,
  },
  {
    icon: 'target',
    title: 'Genau statt hektisch',
    text: 'Du lernst zuerst, sauber zu tippen. Das Tempo kommt dann von selbst.',
  },
  {
    icon: 'shield',
    title: 'Ganz privat',
    text: ONBOARDING_PRIVACY,
  },
];

const STEP_COUNT = 4;
const FIRST_LESSON_ID = LESSONS[0]?.id ?? 'grundstellung';

interface ChoiceCardProps {
  name: string;
  checked: boolean;
  onSelect: () => void;
  title: string;
  description: string;
}

function ChoiceCard({ name, checked, onSelect, title, description }: ChoiceCardProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-colors',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--tf-focus)',
        checked ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:bg-surface-2',
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="mt-1 size-4 accent-(--tf-accent)"
      />
      <span>
        <span className="block text-[15px] font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">{description}</span>
      </span>
    </label>
  );
}

export function OnboardingPage() {
  usePageTitle('Willkommen');
  const settings = useSettings();
  const { completeOnboarding } = useActions();
  const navigate = useNavigate();
  // Nur beim ersten Öffnen umleiten – sonst kollidiert die Weiterleitung mit dem Start von Lektion 1.
  const [completedAtMount] = useState(settings.onboardingCompleted);
  const [step, setStep] = useState(0);
  const [keyboard, setKeyboard] = useState<KeyboardChoice>('apple-de');
  const [goal, setGoal] = useState<LearningGoal>('beginner');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstStepRender = useRef(true);

  useEffect(() => {
    if (firstStepRender.current) {
      firstStepRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  if (completedAtMount) return <Navigate to="/" replace />;

  const layoutId =
    KEYBOARD_CHOICES.find((choice) => choice.id === keyboard)?.layout ?? 'standard-de';
  const goalDefaults = settingsForGoal(goal);
  const goalTitle = GOAL_OPTIONS.find((option) => option.id === goal)?.title ?? '';
  const keyboardTitle = KEYBOARD_CHOICES.find((choice) => choice.id === keyboard)?.title ?? '';

  const finish = () => {
    completeOnboarding({ keyboardLayout: layoutId, goal });
    navigate(`/lernen/${FIRST_LESSON_ID}`, { replace: true });
  };

  const skip = () => {
    completeOnboarding({ keyboardLayout: 'apple-de', goal: 'beginner' });
    navigate('/', { replace: true });
  };

  const headingClass =
    'text-[26px] leading-tight font-semibold tracking-tight text-ink outline-none sm:text-[32px]';

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="mx-auto flex h-18 w-full max-w-3xl items-center justify-between px-5">
        <span className="flex items-center gap-2.5">
          <BrandMark size={30} />
          <span className="text-[17px] font-semibold tracking-tight text-ink">{BRAND.name}</span>
        </span>
        {step < STEP_COUNT - 1 && (
          <Button variant="ghost" size="sm" onClick={skip}>
            Überspringen
          </Button>
        )}
      </header>

      <main className="flex flex-1 justify-center px-4 pb-12 sm:items-center">
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex items-center justify-between px-1">
            <ol className="flex gap-1.5" aria-label="Fortschritt der Einführung">
              {Array.from({ length: STEP_COUNT }, (_, index) => (
                <li
                  key={index}
                  aria-current={index === step ? 'step' : undefined}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    index === step
                      ? 'w-8 bg-accent'
                      : index < step
                        ? 'w-4 bg-accent/50'
                        : 'w-4 bg-surface-3',
                  )}
                >
                  <span className="sr-only">Schritt {index + 1}</span>
                </li>
              ))}
            </ol>
            <span className="text-sm text-ink-muted">
              Schritt {step + 1} von {STEP_COUNT}
            </span>
          </div>

          <section
            key={step}
            className="animate-fade-up rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-9"
          >
            {step === 0 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} className={headingClass}>
                  Willkommen beim Zehn-Finger-Training.
                </h1>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
                  Du brauchst keine Vorkenntnisse. Wir bringen dir Schritt für Schritt bei, wie du
                  ohne auf die Tastatur zu schauen schreiben kannst.
                </p>
                <div className="mx-auto mt-6 max-w-sm">
                  <HandsGuide activeFingers={[]} tint />
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {FEATURES.map((feature) => (
                    <li key={feature.title} className="rounded-2xl bg-surface-2 p-4">
                      <Icon name={feature.icon} size={20} className="text-accent-ink" />
                      <p className="mt-2 text-[15px] font-semibold text-ink">{feature.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{feature.text}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {step === 1 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} className={headingClass}>
                  Tastatur auswählen
                </h1>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
                  Damit die Bildschirmtastatur so aussieht wie deine.
                </p>
                <div role="radiogroup" aria-label="Tastatur" className="mt-6 grid gap-3">
                  {KEYBOARD_CHOICES.map((choice) => (
                    <ChoiceCard
                      key={choice.id}
                      name="tastatur"
                      checked={keyboard === choice.id}
                      onSelect={() => setKeyboard(choice.id)}
                      title={choice.title}
                      description={choice.description}
                    />
                  ))}
                </div>
                {keyboard === 'other' && (
                  <p className="mt-4 flex items-start gap-2.5 rounded-2xl bg-surface-2 p-4 text-sm leading-relaxed text-ink-muted">
                    <Icon name="info" size={18} className="mt-0.5 shrink-0 text-accent-ink" />
                    Kein Problem: {BRAND.name} zeigt dann die Standard-QWERTZ-Ansicht. Wichtig ist
                    nur, dass deine Tastatur im Betriebssystem auf Deutsch eingestellt ist – die
                    Übungen erkennen, welches Zeichen du tippst.
                  </p>
                )}
                <div className="mt-5 rounded-2xl bg-surface-2 p-3">
                  <VirtualKeyboard
                    layout={getKeyboardLayout(layoutId)}
                    label={`Vorschau: ${keyboardTitle}`}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} className={headingClass}>
                  Dein Ziel
                </h1>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
                  Wir passen die Voreinstellungen daran an. Du kannst alles später ändern.
                </p>
                <div role="radiogroup" aria-label="Lernziel" className="mt-6 grid gap-3">
                  {GOAL_OPTIONS.map((option) => (
                    <ChoiceCard
                      key={option.id}
                      name="ziel"
                      checked={goal === option.id}
                      onSelect={() => setGoal(option.id)}
                      title={option.title}
                      description={option.description}
                    />
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} className={headingClass}>
                  Los geht’s
                </h1>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
                  Als Erstes lernst du die richtige Haltung und die Grundstellung deiner Finger. Das
                  dauert nur wenige Minuten.
                </p>
                <dl className="mt-6 divide-y divide-line rounded-2xl border border-line">
                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-sm text-ink-muted">Tastatur</dt>
                    <dd className="text-sm font-medium text-ink">{keyboardTitle}</dd>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-sm text-ink-muted">Ziel</dt>
                    <dd className="text-sm font-medium text-ink">{goalTitle}</dd>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-sm text-ink-muted">Lektionen</dt>
                    <dd className="text-sm font-medium text-ink">
                      {goalDefaults.freeLessonChoice
                        ? 'Alle frei wählbar'
                        : 'Werden nacheinander freigeschaltet'}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-sm text-ink-muted">Bei Tippfehlern</dt>
                    <dd className="text-sm font-medium text-ink">
                      {goalDefaults.errorMode === 'continue'
                        ? 'Einfach weiterschreiben'
                        : 'Fehler sofort korrigieren'}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-ink-muted">
                  Alles lässt sich jederzeit in den Einstellungen ändern.
                </p>
              </>
            )}

            <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              {step > 0 ? (
                <Button variant="ghost" icon="arrow-left" onClick={() => setStep(step - 1)}>
                  Zurück
                </Button>
              ) : (
                <span className="hidden sm:block" />
              )}
              {step < STEP_COUNT - 1 ? (
                <Button
                  iconEnd="arrow-right"
                  onClick={() => setStep(step + 1)}
                  autoFocus={step === 0}
                >
                  Weiter
                </Button>
              ) : (
                <Button size="lg" iconEnd="arrow-right" onClick={finish} autoFocus>
                  Lektion 1 starten
                </Button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
