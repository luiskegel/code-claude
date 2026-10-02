import { HandsGuide } from '../../components/keyboard/HandsGuide';
import { VirtualKeyboard } from '../../components/keyboard/VirtualKeyboard';
import { Icon, type IconName } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import type { TheoryStep } from '../../domain/lessons/types';
import { FingerLegend } from './FingerLegend';

const POSTURE_TIPS: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'person',
    title: 'Rücken gerade',
    text: 'Setz dich aufrecht hin, die Füße stehen flach auf dem Boden.',
  },
  {
    icon: 'shoulders',
    title: 'Schultern entspannt',
    text: 'Lass die Schultern locker hängen, die Ellenbogen sind ungefähr rechtwinklig.',
  },
  {
    icon: 'hand',
    title: 'Handgelenke gerade',
    text: 'Knicke die Handgelenke nicht stark nach oben oder unten ab.',
  },
  {
    icon: 'monitor',
    title: 'Blick auf den Bildschirm',
    text: 'Der Bildschirm steht etwa auf Augenhöhe und eine Armlänge entfernt.',
  },
  {
    icon: 'eye-off',
    title: 'Nicht auf die Tastatur schauen',
    text: 'Am Anfang ist das ungewohnt – genau das trainierst du hier.',
  },
  {
    icon: 'feather',
    title: 'Finger locker',
    text: 'Die Finger sind leicht gekrümmt und tippen mit sanftem Druck.',
  },
];

function PostureStep() {
  return (
    <div>
      <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
        Bevor es losgeht: Eine bequeme Haltung hilft dir, länger konzentriert und entspannt zu
        tippen.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POSTURE_TIPS.map((tip) => (
          <li key={tip.title} className="flex gap-3 rounded-2xl bg-surface-2 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-accent-ink shadow-card">
              <Icon name={tip.icon} size={20} />
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-ink">{tip.title}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                {tip.text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const HOME_KEYS = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Space'];

function HomePositionStep({ layout }: { layout: KeyboardLayout }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="space-y-4 text-[15px] leading-relaxed text-ink-muted">
          <p className="text-lg font-medium text-ink">
            Lege deine Zeigefinger auf{' '}
            <KeyCap fingerKind="index" size="sm">
              F
            </KeyCap>{' '}
            und{' '}
            <KeyCap fingerKind="index" size="sm">
              J
            </KeyCap>
            . Diese beiden Tasten helfen dir, deine Hände ohne Hinsehen zu orientieren.
          </p>
          <p>
            Auf F und J sitzen kleine, fühlbare Erhebungen. Daran findest du die Grundstellung
            jederzeit blind wieder.
          </p>
          <p>
            Die übrigen Finger liegen nebeneinander: links auf A, S, D – rechts auf K, L, Ö. Die
            Daumen ruhen über der Leertaste.
          </p>
          <p>
            <strong className="font-semibold text-ink">Warum?</strong> Jeder Finger ist für eine
            eigene Spalte von Tasten zuständig. Von der Grundstellung aus sind alle Wege kurz –
            deshalb kehren die Finger nach jedem Anschlag hierher zurück.
          </p>
        </div>
        <HandsGuide activeFingers={[]} tint />
      </div>
      <VirtualKeyboard
        layout={layout}
        label="Grundstellung: A, S, D, F für die linke Hand, J, K, L, Ö für die rechte Hand, Daumen auf der Leertaste."
        introKeyIds={HOME_KEYS}
        tint={false}
        showHandDivider
      />
      <FingerLegend />
    </div>
  );
}

const HOW_IT_WORKS: readonly { icon: IconName; text: string }[] = [
  {
    icon: 'keyboard',
    text: 'Die nächste Taste leuchtet auf der Bildschirmtastatur – in der Farbe des Fingers, der sie drückt.',
  },
  {
    icon: 'target',
    text: 'Tippfehler werden dezent markiert. Im Modus „Fehler korrigieren“ geht es erst mit der richtigen Taste weiter.',
  },
  {
    icon: 'clock',
    text: 'Die Zeit startet mit deinem ersten Anschlag. Lange Pausen verfälschen die Geschwindigkeit nicht.',
  },
  {
    icon: 'check-circle',
    text: 'Mit ausreichender Genauigkeit schließt du eine Lektion ab und schaltest die nächste frei.',
  },
];

function HowItWorksStep() {
  return (
    <div>
      <ul className="space-y-3">
        {HOW_IT_WORKS.map((item) => (
          <li key={item.text} className="flex items-start gap-3 rounded-2xl bg-surface-2 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface text-accent-ink shadow-card">
              <Icon name={item.icon} size={18} />
            </span>
            <span className="pt-1.5 text-[15px] leading-relaxed text-ink">{item.text}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 rounded-2xl border border-accent/25 bg-accent-soft p-4 text-[15px] leading-relaxed text-accent-ink">
        <strong className="font-semibold">
          Genauigkeit ist zunächst wichtiger als Geschwindigkeit.
        </strong>{' '}
        Das Tempo kommt mit der Übung ganz von selbst.
      </p>
    </div>
  );
}

export function TheoryStepView({ step, layout }: { step: TheoryStep; layout: KeyboardLayout }) {
  switch (step) {
    case 'posture':
      return <PostureStep />;
    case 'home-position':
      return <HomePositionStep layout={layout} />;
    case 'how-it-works':
      return <HowItWorksStep />;
  }
}
