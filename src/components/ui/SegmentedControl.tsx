import { cn } from '../../lib/cn';
import { Icon, type IconName } from './Icon';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
}

interface SegmentedControlProps<T extends string> {
  name: string;
  /** Beschriftung der Gruppe für Screenreader */
  label: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

/** Auswahl mit nativen Radio-Buttons – Pfeiltasten und Screenreader funktionieren von selbst. */
export function SegmentedControl<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'inline-flex max-w-full rounded-xl border border-line bg-surface-2 p-1',
        className,
      )}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              'relative flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-[9px] px-3 text-sm font-medium whitespace-nowrap transition-colors duration-150',
              'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-(--tf-focus)',
              checked
                ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_1px_var(--tf-line)]'
                : 'cursor-pointer text-ink-muted hover:text-ink',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.icon && <Icon name={option.icon} size={16} />}
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
