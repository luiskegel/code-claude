import { FINGER_KIND_LABELS, FINGER_KINDS } from '../../domain/keyboard/fingers';
import { cn } from '../../lib/cn';

/** Farblegende der Finger – links und rechts gleiche Farbe, die Position zeigt die Hand. */
export function FingerLegend({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-5 gap-y-2', className)} aria-label="Farben der Finger">
      {FINGER_KINDS.map((kind) => (
        <li
          key={kind}
          data-finger-kind={kind}
          className="flex items-center gap-2 text-sm text-ink-muted"
        >
          <span aria-hidden="true" className="size-3 rounded-full bg-(--key-strong)" />
          {FINGER_KIND_LABELS[kind]}
        </li>
      ))}
    </ul>
  );
}
