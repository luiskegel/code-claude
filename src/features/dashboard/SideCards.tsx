import { Link } from 'react-router';
import { ButtonLink } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { Icon, type IconName } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import { keyLabelForChar } from '../../domain/keyboard/keyMap';
import type { Lesson } from '../../domain/lessons/types';
import type { WeakChar } from '../../domain/progress/statistics';
import type { ExerciseResult } from '../../domain/progress/types';
import type { LearningGoal } from '../../domain/settings/settings';
import { formatAccuracy, formatDateTime, formatWpm } from '../../lib/format';
import { exerciseLabel } from '../shared/labels';

interface GoalFocus {
  icon: IconName;
  title: string;
  text: string;
  action: { label: string; to: string };
}

function goalFocus(
  goal: LearningGoal,
  nextLesson: Lesson | undefined,
  sprintUnlocked: boolean,
): GoalFocus {
  const next = nextLesson
    ? { label: `Lektion ${nextLesson.number} öffnen`, to: `/lernen/${nextLesson.id}` }
    : { label: 'Alle Lektionen', to: '/lernen' };
  switch (goal) {
    case 'beginner':
      return {
        icon: 'layers',
        title: 'Schritt für Schritt',
        text: 'Arbeite die Lektionen der Reihe nach durch. Genauigkeit geht vor Tempo – das Tempo kommt von selbst.',
        action: next,
      };
    case 'speed':
      return {
        icon: 'zap',
        title: 'Mehr Tempo',
        text: 'Kurze, regelmäßige Sprints bringen am meisten. Achte trotzdem auf mindestens 90 % Genauigkeit.',
        action: sprintUnlocked
          ? { label: 'Zum 1-Minuten-Sprint', to: '/lernen/tempo-sprint' }
          : next,
      };
    case 'accuracy':
      return {
        icon: 'target',
        title: 'Mehr Genauigkeit',
        text: 'Übe gezielt die Tasten, bei denen du am häufigsten danebenliegst – in echten Wörtern.',
        action: { label: 'Fehler wiederholen', to: '/wiederholen' },
      };
    case 'technique':
      return {
        icon: 'hand',
        title: 'Saubere Technik',
        text: 'Jeder Finger bleibt in seiner Spalte und kehrt zur Grundstellung zurück. Prüfe, welche Tasten schon sitzen.',
        action: { label: 'Tastenübersicht ansehen', to: '/tasten' },
      };
  }
}

interface GoalFocusCardProps {
  goal: LearningGoal;
  nextLesson: Lesson | undefined;
  sprintUnlocked: boolean;
}

export function GoalFocusCard({ goal, nextLesson, sprintUnlocked }: GoalFocusCardProps) {
  const focus = goalFocus(goal, nextLesson, sprintUnlocked);
  return (
    <Card aria-labelledby="fokus-titel">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
          <Icon name={focus.icon} size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">Dein Fokus</p>
          <h2 id="fokus-titel" className="mt-0.5 text-[17px] font-semibold tracking-tight text-ink">
            {focus.title}
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{focus.text}</p>
      <Link
        to={focus.action.to}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-accent-ink hover:underline"
      >
        {focus.action.label}
        <Icon name="arrow-right" size={16} />
      </Link>
    </Card>
  );
}

export function LastExerciseCard({ result }: { result: ExerciseResult | undefined }) {
  return (
    <Card aria-labelledby="letzte-uebung">
      <CardHeader id="letzte-uebung" title="Letzte Übung" />
      {result ? (
        <div>
          <p className="text-[15px] font-medium text-ink">{exerciseLabel(result.lessonId)}</p>
          <p className="mt-1 text-sm text-ink-muted">{formatDateTime(result.completedAt)}</p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-surface-2 px-2 py-2.5">
              <dt className="text-xs text-ink-muted">WPM</dt>
              <dd className="text-lg font-semibold text-ink tabular-nums">
                {formatWpm(result.wpm)}
              </dd>
            </div>
            <div className="rounded-xl bg-surface-2 px-2 py-2.5">
              <dt className="text-xs text-ink-muted">Genauigkeit</dt>
              <dd className="text-lg font-semibold text-ink tabular-nums">
                {formatAccuracy(result.accuracy)} %
              </dd>
            </div>
            <div className="rounded-xl bg-surface-2 px-2 py-2.5">
              <dt className="text-xs text-ink-muted">Fehler</dt>
              <dd className="text-lg font-semibold text-ink tabular-nums">{result.errors}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-ink-muted">
          Hier erscheint deine letzte Übung, sobald du sie abgeschlossen hast.
        </p>
      )}
    </Card>
  );
}

export function WeakKeysCard({ weakChars }: { weakChars: readonly WeakChar[] }) {
  if (weakChars.length === 0) return null;
  return (
    <Card aria-labelledby="fehler-teaser">
      <CardHeader
        id="fehler-teaser"
        title="Häufigste Fehler"
        description="Aus deinen letzten Übungen."
      />
      <ul className="flex flex-wrap gap-2">
        {weakChars.slice(0, 4).map((entry) => (
          <li
            key={entry.char}
            className="flex items-center gap-2 rounded-xl bg-surface-2 py-1.5 pr-3 pl-1.5"
          >
            <KeyCap size="sm">{keyLabelForChar(entry.char)}</KeyCap>
            <span className="text-sm text-ink-muted">{entry.misses} Fehler</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        to="/wiederholen"
        variant="secondary"
        size="sm"
        icon="repeat"
        className="mt-5 w-full"
      >
        Diese Tasten trainieren
      </ButtonLink>
    </Card>
  );
}
