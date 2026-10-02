import { KeyCap } from '../../components/ui/KeyCap';
import type { TargetInfo } from './hints';

/** Beantwortet: Welche Taste – und mit welchem Finger? */
export function FingerHint({ target }: { target: TargetInfo | null }) {
  if (!target) {
    return <p className="text-sm text-ink-muted">Geschafft – alle Zeichen getippt.</p>;
  }
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-hidden="true">
      <span className="text-sm font-medium text-ink-muted">Nächste Taste</span>
      <span className="flex items-center gap-1.5">
        {target.shift && (
          <>
            <KeyCap fingerKind={target.shift.fingerKind} size="md" decorative>
              {`⇧ ${target.shift.label.replace('Umschalt ', '')}`}
            </KeyCap>
            <span className="text-ink-subtle">+</span>
          </>
        )}
        <KeyCap fingerKind={target.fingerKind} size="md" decorative>
          {target.keyLabel}
        </KeyCap>
      </span>
      <span className="text-sm font-medium text-ink">
        {target.fingerLabel}
        {target.shift && (
          <span className="font-normal text-ink-muted">
            {' '}
            · Umschalttaste: {target.shift.finger === 'left-pinky' ? 'linker' : 'rechter'} kleiner
            Finger
          </span>
        )}
      </span>
    </div>
  );
}
