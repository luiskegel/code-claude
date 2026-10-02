import { Link } from 'react-router';
import { Badge } from '../../components/ui/Badge';
import { Icon } from '../../components/ui/Icon';
import { KeyCap } from '../../components/ui/KeyCap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import type { Lesson } from '../../domain/lessons/types';
import type { LessonProgress } from '../../domain/progress/types';
import { cn } from '../../lib/cn';
import { formatAccuracy, formatWpm } from '../../lib/format';
import { lessonKindLabel } from '../shared/labels';
import { getLessonKeyBadges } from '../shared/lessonKeys';

export type LessonCardStatus = 'passed' | 'next' | 'open' | 'locked';

interface LessonCardProps {
  lesson: Lesson;
  status: LessonCardStatus;
  progress?: LessonProgress;
  layout: KeyboardLayout;
  /** Lektion, die zuerst abgeschlossen werden muss */
  blockingNumber?: number;
}

const MAX_KEYCAPS = 5;

function StatusBadge({ status, attempted }: { status: LessonCardStatus; attempted: boolean }) {
  switch (status) {
    case 'passed':
      return (
        <Badge tone="success" icon="check">
          Abgeschlossen
        </Badge>
      );
    case 'next':
      return (
        <Badge tone="accent" icon="arrow-right">
          {attempted ? 'In Arbeit' : 'Als Nächstes'}
        </Badge>
      );
    case 'open':
      return <Badge tone="neutral">{attempted ? 'In Arbeit' : 'Offen'}</Badge>;
    case 'locked':
      return (
        <Badge tone="neutral" icon="lock">
          Gesperrt
        </Badge>
      );
  }
}

export function LessonCard({ lesson, status, progress, layout, blockingNumber }: LessonCardProps) {
  const locked = status === 'locked';
  const attempted = (progress?.attempts ?? 0) > 0;
  const badges =
    lesson.exercise.kind === 'keys' || lesson.newChars.length > 0 || lesson.introKeyIds
      ? getLessonKeyBadges(lesson, layout)
      : [];

  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink-muted">Lektion {lesson.number}</span>
        <StatusBadge status={status} attempted={attempted} />
      </div>
      <h3 className="mt-3 text-[17px] leading-snug font-semibold tracking-tight text-ink">
        {lesson.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-muted">{lesson.summary}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
        {badges.length > 0 ? (
          <span className="flex flex-wrap gap-1" aria-hidden="true">
            {badges.slice(0, MAX_KEYCAPS).map((badge) => (
              <KeyCap key={badge.id} size="sm" fingerKind={locked ? undefined : badge.fingerKind}>
                {badge.label}
              </KeyCap>
            ))}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
            <Icon name={lesson.timeLimitSec ? 'clock' : 'book'} size={14} />
            {lessonKindLabel(lesson)}
          </span>
        )}
        {status === 'passed' && progress && (
          <span className="text-xs text-ink-muted tabular-nums">
            Beste: {formatWpm(progress.bestWpm)} WPM · {formatAccuracy(progress.bestAccuracy)} %
          </span>
        )}
        {locked && blockingNumber !== undefined && (
          <span className="text-xs text-ink-muted">Nach Lektion {blockingNumber}</span>
        )}
      </div>
    </>
  );

  const base =
    'flex h-full flex-col rounded-2xl border p-5 transition-[border-color,box-shadow,transform] duration-200';

  if (locked) {
    return (
      <div
        className={cn(base, 'border-line bg-surface-2/60')}
        aria-label={`Lektion ${lesson.number}: ${lesson.title} – gesperrt. Schließe zuerst Lektion ${blockingNumber ?? lesson.number - 1} ab.`}
        role="group"
      >
        {body}
      </div>
    );
  }

  return (
    <Link
      to={`/lernen/${lesson.id}`}
      className={cn(
        base,
        'bg-surface shadow-card hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised',
        status === 'next' ? 'border-accent/40 ring-1 ring-accent/20' : 'border-line',
      )}
    >
      {body}
    </Link>
  );
}
