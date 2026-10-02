import { memo, type KeyboardEvent } from 'react';
import { getFingerKind } from '../../domain/keyboard/fingers';
import type { KeyDefinition } from '../../domain/keyboard/layouts';
import type { MasteryLevel } from '../../domain/progress/statistics';
import { isoEnterPath, keyRect, labelCenter } from './geometry';

export type KeyVisualState = 'target' | 'modifier' | 'intro';
export type KeyPressedState = 'true' | 'error';

interface KeyboardKeyProps {
  keyDef: KeyDefinition;
  radius: number;
  state?: KeyVisualState;
  pressed?: KeyPressedState;
  dimmed?: boolean;
  mastery?: MasteryLevel;
  selected?: boolean;
  /** Macht die Taste auswählbar (Tastenübersicht) */
  onSelect?: (keyId: string) => void;
  /** Beschreibung für Screenreader, wenn auswählbar */
  ariaLabel?: string;
}

const LETTER_FONT = 21;
const SYMBOL_FONT = 19;
const SMALL_FONT = 11;

function MasteryGlyph({ level, x, y }: { level: MasteryLevel; x: number; y: number }) {
  // Form statt nur Farbe: Haken, Ausrufezeichen, Punkt oder Schloss.
  switch (level) {
    case 'mastered':
      return (
        <path
          d={`M${x - 4.5} ${y} l3 3 l6 -6.5`}
          style={{ fill: 'none', stroke: 'var(--tf-success-ink)', pointerEvents: 'none' }}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'weak':
      return (
        <g className="kb-mastery-icon" data-level={level}>
          <rect x={x - 1.2} y={y - 6} width={2.4} height={7.5} rx={1.2} />
          <circle cx={x} cy={y + 4.5} r={1.4} />
        </g>
      );
    case 'learning':
      return <circle className="kb-mastery-icon" data-level={level} cx={x} cy={y} r={3} />;
    case 'locked':
      return (
        <g className="kb-mastery-icon" data-level={level}>
          <rect x={x - 4.5} y={y - 1} width={9} height={7} rx={1.6} />
          <path
            d={`M${x - 2.8} ${y - 1} v-2 a2.8 2.8 0 0 1 5.6 0 v2`}
            fill="none"
            style={{ stroke: 'var(--tf-ink-subtle)' }}
            strokeWidth={1.6}
          />
        </g>
      );
  }
}

function KeyLabels({ keyDef }: { keyDef: KeyDefinition }) {
  const rect = keyRect(keyDef);
  const center = labelCenter(keyDef);
  if (keyDef.kind === 'space') return null;

  if (keyDef.kind === 'arrow') {
    return (
      <text
        className="kb-label"
        x={center.x}
        y={center.y}
        fontSize={9}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {keyDef.label}
      </text>
    );
  }

  // Zahlen- und Satzzeichentasten: Umschalt-Zeichen oben, Grundzeichen unten.
  if (keyDef.kind === 'char' && keyDef.secondaryLabel) {
    return (
      <>
        <text
          className="kb-label kb-label-sub"
          x={center.x}
          y={rect.y + rect.height * 0.32}
          fontSize={14}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {keyDef.secondaryLabel}
        </text>
        <text
          className="kb-label"
          x={center.x}
          y={rect.y + rect.height * 0.7}
          fontSize={17}
          fontWeight={500}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {keyDef.label}
        </text>
      </>
    );
  }

  // Apple-Modifikatoren: Symbol oben, Text unten.
  if (keyDef.secondaryLabel) {
    return (
      <>
        <text
          className="kb-label"
          x={center.x}
          y={rect.y + rect.height * 0.36}
          fontSize={15}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {keyDef.label}
        </text>
        <text
          className="kb-label kb-label-sub"
          x={center.x}
          y={rect.y + rect.height * 0.72}
          fontSize={SMALL_FONT}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {keyDef.secondaryLabel}
        </text>
      </>
    );
  }

  const isWord = keyDef.label.length > 2;
  const isLetter = keyDef.kind === 'char';
  return (
    <text
      className="kb-label"
      x={center.x}
      y={center.y}
      fontSize={isWord ? 13 : isLetter ? LETTER_FONT : SYMBOL_FONT}
      fontWeight={isLetter ? 500 : 400}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {keyDef.label}
    </text>
  );
}

function KeyboardKeyComponent({
  keyDef,
  radius,
  state,
  pressed,
  dimmed,
  mastery,
  selected,
  onSelect,
  ariaLabel,
}: KeyboardKeyProps) {
  const rect = keyRect(keyDef);
  const fingerKind = keyDef.finger ? getFingerKind(keyDef.finger) : undefined;
  const interactive = onSelect !== undefined;

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(keyDef.id);
    }
  };

  return (
    <g
      className="kb-key"
      data-key-id={keyDef.id}
      data-finger-kind={fingerKind}
      data-state={state}
      data-pressed={pressed}
      data-dimmed={dimmed ? 'true' : undefined}
      data-mastery={mastery}
      data-selected={selected ? 'true' : undefined}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': ariaLabel,
            'aria-pressed': selected,
            onClick: () => onSelect(keyDef.id),
            onKeyDown: handleKeyDown,
            style: { cursor: 'pointer', outline: 'none' },
          }
        : {})}
    >
      {keyDef.isoEnter ? (
        <path className="kb-key-shape" d={isoEnterPath(keyDef, radius)} />
      ) : (
        <rect
          className="kb-key-shape"
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={radius}
        />
      )}
      <KeyLabels keyDef={keyDef} />
      {keyDef.bump && (
        <line
          className="kb-bump"
          x1={rect.x + rect.width / 2 - 7}
          x2={rect.x + rect.width / 2 + 7}
          y1={rect.y + rect.height - 11}
          y2={rect.y + rect.height - 11}
        />
      )}
      {mastery && <MasteryGlyph level={mastery} x={rect.x + rect.width - 11} y={rect.y + 12} />}
    </g>
  );
}

export const KeyboardKey = memo(KeyboardKeyComponent);
