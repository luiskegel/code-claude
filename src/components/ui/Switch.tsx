import { cn } from '../../lib/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** ID des sichtbaren Labels */
  labelledBy: string;
  describedBy?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, labelledBy, describedBy, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-[30px] w-[50px] shrink-0 items-center rounded-full border transition-colors duration-200',
        checked ? 'border-accent bg-accent' : 'border-line-strong bg-surface-3',
        'disabled:opacity-50',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-[2px] left-[2px] size-6 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.25)] transition-transform duration-200 ease-out',
          checked && 'translate-x-5',
        )}
      />
      <span className="sr-only">{checked ? 'An' : 'Aus'}</span>
    </button>
  );
}
