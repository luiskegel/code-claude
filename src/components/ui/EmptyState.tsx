import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Icon, type IconName } from './Icon';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)}>
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
        <Icon name={icon} size={26} />
      </span>
      <h2 className="mt-5 text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
