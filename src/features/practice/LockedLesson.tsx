import { Link } from 'react-router';
import { ButtonLink } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import type { Lesson } from '../../domain/lessons/types';

interface LockedLessonProps {
  lesson: Lesson;
  blocking?: Lesson;
}

export function LockedLesson({ lesson, blocking }: LockedLessonProps) {
  return (
    <Card padding="lg" className="mx-auto max-w-xl text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-surface-2 text-ink-muted">
        <Icon name="lock" size={26} />
      </span>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
        Lektion {lesson.number} ist noch gesperrt
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {blocking
          ? `Schließe zuerst Lektion ${blocking.number} „${blocking.title}“ mit mindestens ${blocking.passAccuracy} % Genauigkeit ab. Danach geht es hier weiter.`
          : 'Schließe zuerst die vorherige Lektion ab.'}
      </p>
      <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
        {blocking && (
          <ButtonLink to={`/lernen/${blocking.id}`} iconEnd="arrow-right">
            Zu Lektion {blocking.number}
          </ButtonLink>
        )}
        <ButtonLink to="/lernen" variant="secondary">
          Alle Lektionen
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-ink-muted">
        Du kannst schon tippen? In den{' '}
        <Link to="/einstellungen" className="font-medium text-accent-ink hover:underline">
          Einstellungen
        </Link>{' '}
        lässt sich die freie Lektionswahl aktivieren.
      </p>
    </Card>
  );
}
