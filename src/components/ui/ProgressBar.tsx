import { cn } from '../../lib/cn';

interface ProgressBarProps {
  /** Wert zwischen 0 und 1 */
  value: number;
  label: string;
  /** Zusätzliche Beschreibung für Screenreader, z. B. „12 von 29“ */
  valueText?: string;
  size?: 'xs' | 'sm' | 'md';
  tone?: 'accent' | 'success' | 'warning';
  className?: string;
}

const HEIGHTS = { xs: 'h-1', sm: 'h-1.5', md: 'h-2.5' };
const TONES = { accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning' };

export function ProgressBar({
  value,
  label,
  valueText,
  size = 'sm',
  tone = 'accent',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  const percent = Math.round(clamped * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={valueText ?? `${percent} %`}
      className={cn('w-full overflow-hidden rounded-full bg-surface-3', HEIGHTS[size], className)}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500 ease-out', TONES[tone])}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
