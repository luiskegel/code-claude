import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Icon, type IconName } from './Icon';

interface StatTileProps {
  label: string;
  value: string;
  unit?: string;
  hint?: ReactNode;
  icon?: IconName;
  iconClassName?: string;
  className?: string;
}

/** Kennzahl als Begriff/Wert-Paar – muss in einem <dl> stehen. */
export function StatTile({
  label,
  value,
  unit,
  hint,
  icon,
  iconClassName,
  className,
}: StatTileProps) {
  return (
    <div className={cn('rounded-2xl border border-line bg-surface p-5 shadow-card', className)}>
      <dt className="flex items-center gap-2 text-sm font-medium text-ink-muted">
        {icon && <Icon name={icon} size={17} className={cn('shrink-0', iconClassName)} />}
        {label}
      </dt>
      <dd className="mt-3">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[28px] leading-none font-semibold tracking-tight text-ink tabular-nums">
            {value}
          </span>
          {unit && <span className="text-sm font-medium text-ink-muted">{unit}</span>}
        </span>
        {hint && <span className="mt-2 block text-xs text-ink-muted">{hint}</span>}
      </dd>
    </div>
  );
}
