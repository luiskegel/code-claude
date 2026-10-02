import type { FingerKind } from '../../domain/keyboard/fingers';
import { cn } from '../../lib/cn';

interface KeyCapProps {
  children: string;
  fingerKind?: FingerKind;
  size?: 'sm' | 'md' | 'lg';
  /** Unsichtbar für Screenreader, wenn der Text bereits anderweitig vorgelesen wird */
  decorative?: boolean;
  className?: string;
}

const SIZES = {
  sm: 'min-w-6 h-6 px-1.5 text-xs rounded-md',
  md: 'min-w-8 h-8 px-2 text-sm rounded-lg',
  lg: 'min-w-11 h-11 px-3 text-lg rounded-xl',
};

/** Darstellung einer Taste im Fließtext, optional in der Farbe des zuständigen Fingers. */
export function KeyCap({ children, fingerKind, size = 'md', decorative, className }: KeyCapProps) {
  return (
    <kbd
      data-finger-kind={fingerKind}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        'inline-flex items-center justify-center border border-b-[3px] font-sans font-semibold leading-none',
        fingerKind
          ? 'border-(--key-strong) bg-(--key-soft) text-ink'
          : 'border-line-strong bg-surface text-ink',
        SIZES[size],
        className,
      )}
    >
      {children}
    </kbd>
  );
}
