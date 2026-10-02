import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import type { MasteryLevel } from '../../domain/progress/statistics';
import { cn } from '../../lib/cn';
import { handDividerPath, keyboardSize } from './geometry';
import { KeyboardKey, type KeyVisualState } from './KeyboardKey';

export interface PressedKey {
  keyId: string;
  correct: boolean;
}

interface VirtualKeyboardProps {
  layout: KeyboardLayout;
  /** Beschreibung für Screenreader */
  label: string;
  /** Taste, die als Nächstes gedrückt werden soll */
  targetKeyId?: string | null;
  /** Zusätzlich zu haltende Taste (Umschalttaste der anderen Hand) */
  modifierKeyId?: string | null;
  /** In einer Einführung hervorgehobene Tasten */
  introKeyIds?: readonly string[];
  /** Zuletzt gedrückte Taste – kurzes visuelles Feedback */
  pressed?: PressedKey | null;
  /** Bekannte Tasten; alle anderen werden abgeblendet */
  activeKeyIds?: ReadonlySet<string> | null;
  /** Fingerfarben auf den Tasten anzeigen */
  tint?: boolean;
  showHandDivider?: boolean;
  mastery?: ReadonlyMap<string, MasteryLevel>;
  selectedKeyId?: string | null;
  onKeySelect?: (keyId: string) => void;
  keyLabel?: (keyId: string) => string;
  className?: string;
}

/** Deutsche QWERTZ-Tastatur als skalierbare Grafik – jede Taste ist eine eigene Komponente. */
export function VirtualKeyboard({
  layout,
  label,
  targetKeyId,
  modifierKeyId,
  introKeyIds,
  pressed,
  activeKeyIds,
  tint = true,
  showHandDivider = false,
  mastery,
  selectedKeyId,
  onKeySelect,
  keyLabel,
  className,
}: VirtualKeyboardProps) {
  const { width, height } = keyboardSize(layout);
  const radius = layout.id === 'apple-de' ? 9 : 6;
  const introSet = introKeyIds ? new Set(introKeyIds) : null;
  const interactive = onKeySelect !== undefined;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('kb block h-auto w-full select-none', className)}
      data-tint={tint ? 'fingers' : 'none'}
      role={interactive ? 'group' : 'img'}
      aria-label={label}
    >
      <rect className="kb-frame" x={0} y={0} width={width} height={height} rx={18} />
      {layout.keys.map((keyDef) => {
        let state: KeyVisualState | undefined;
        if (keyDef.id === targetKeyId) state = 'target';
        else if (keyDef.id === modifierKeyId) state = 'modifier';
        else if (introSet?.has(keyDef.id)) state = 'intro';

        const isPressed = pressed?.keyId === keyDef.id;
        const keyMastery = mastery?.get(keyDef.id);
        const dimmed = activeKeyIds ? !activeKeyIds.has(keyDef.id) && state === undefined : false;
        const selectable = interactive && keyMastery !== undefined;

        return (
          <KeyboardKey
            key={keyDef.id}
            keyDef={keyDef}
            radius={radius}
            state={state}
            pressed={isPressed ? (pressed?.correct ? 'true' : 'error') : undefined}
            dimmed={dimmed}
            mastery={keyMastery}
            selected={selectedKeyId === keyDef.id}
            onSelect={selectable ? onKeySelect : undefined}
            ariaLabel={selectable ? keyLabel?.(keyDef.id) : undefined}
          />
        );
      })}
      {showHandDivider && <path className="kb-divider" d={handDividerPath()} aria-hidden="true" />}
    </svg>
  );
}
