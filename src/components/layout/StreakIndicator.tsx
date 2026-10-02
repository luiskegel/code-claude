import { Link } from 'react-router';
import { getActiveStreak, hasPracticedToday } from '../../domain/progress/streak';
import { cn } from '../../lib/cn';
import { formatDays } from '../../lib/format';
import { useToday } from '../../lib/hooks';
import { useProgress } from '../../state/hooks';
import { Icon } from '../ui/Icon';

export function StreakIndicator({ compact = false }: { compact?: boolean }) {
  const { streak } = useProgress();
  const today = useToday();
  const days = getActiveStreak(streak, today);
  const doneToday = hasPracticedToday(streak, today);
  const label =
    days === 0
      ? 'Noch keine Serie'
      : `${formatDays(days)} Serie${doneToday ? ', heute schon geübt' : ', heute noch nicht geübt'}`;

  return (
    <Link
      to="/statistiken"
      className={cn(
        'flex items-center gap-2 rounded-xl text-sm font-medium transition-colors hover:bg-surface-2',
        compact ? 'h-9 px-2.5' : 'px-3 py-2.5',
      )}
      aria-label={`Lernserie: ${label}`}
      title={label}
    >
      <Icon
        name="flame"
        size={18}
        filled={days > 0}
        className={days > 0 ? 'text-streak' : 'text-ink-subtle'}
      />
      <span className={days > 0 ? 'text-ink' : 'text-ink-muted'}>
        {compact ? days : days > 0 ? `${formatDays(days)} Serie` : 'Noch keine Serie'}
      </span>
    </Link>
  );
}
