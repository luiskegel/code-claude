import { memo } from 'react';
import { FINGER_INFO, type Finger, type FingerKind } from '../../domain/keyboard/fingers';
import { cn } from '../../lib/cn';

interface FingerShape {
  kind: Exclude<FingerKind, 'thumb'>;
  x: number;
  y: number;
  height: number;
}

const FINGER_WIDTH = 34;

/** Finger der linken Hand (von links nach rechts); die rechte Hand wird gespiegelt. */
const FINGERS: readonly FingerShape[] = [
  { kind: 'pinky', x: 30, y: 60, height: 96 },
  { kind: 'ring', x: 70, y: 26, height: 130 },
  { kind: 'middle', x: 110, y: 12, height: 144 },
  { kind: 'index', x: 150, y: 28, height: 128 },
];

const THUMB = { baseX: 184, baseY: 188, angle: 50, length: 74 };

interface HandProps {
  side: 'left' | 'right';
  active: ReadonlySet<Finger>;
  tint: boolean;
}

function Hand({ side, active, tint }: HandProps) {
  const fingerId = (kind: FingerKind): Finger =>
    kind === 'thumb' ? 'thumb' : (`${side}-${kind}` as Finger);
  const isActive = (kind: FingerKind) => active.has(fingerId(kind));

  return (
    <g transform={side === 'left' ? 'translate(18 6)' : 'translate(542 6) scale(-1 1)'}>
      {FINGERS.map((finger) => (
        <g
          key={finger.kind}
          className="hand-finger"
          data-finger-kind={finger.kind}
          data-active={isActive(finger.kind) ? 'true' : undefined}
          data-tint={tint ? 'true' : undefined}
        >
          <rect
            className="hand-part"
            x={finger.x}
            y={finger.y}
            width={FINGER_WIDTH}
            height={finger.height}
            rx={FINGER_WIDTH / 2}
          />
          <rect
            className="hand-nail"
            x={finger.x + 8}
            y={finger.y + 8}
            width={18}
            height={15}
            rx={7}
          />
        </g>
      ))}
      <g
        className="hand-finger"
        data-finger-kind="thumb"
        data-active={isActive('thumb') ? 'true' : undefined}
        data-tint={tint ? 'true' : undefined}
        transform={`translate(${THUMB.baseX} ${THUMB.baseY}) rotate(${THUMB.angle}) translate(${-FINGER_WIDTH / 2} ${-THUMB.length})`}
      >
        <rect
          className="hand-part"
          x={0}
          y={0}
          width={FINGER_WIDTH}
          height={THUMB.length + 10}
          rx={FINGER_WIDTH / 2}
        />
        <rect className="hand-nail" x={8} y={8} width={18} height={15} rx={7} />
      </g>
      <path
        className="hand-palm"
        d="M26 128 C26 112 40 104 58 106 L176 106 C192 106 200 116 200 132 L200 170 C200 200 176 214 146 214 L72 214 C44 214 26 196 26 170 Z"
      />
    </g>
  );
}

interface HandsGuideProps {
  activeFingers: readonly Finger[];
  /** Alle Finger in ihrer Farbe einfärben (Legende) */
  tint?: boolean;
  className?: string;
}

function HandsGuideComponent({ activeFingers, tint = true, className }: HandsGuideProps) {
  const active = new Set(activeFingers);
  const description =
    activeFingers.length > 0
      ? `Hände mit hervorgehobenem Finger: ${activeFingers.map((finger) => FINGER_INFO[finger].label).join(' und ')}`
      : 'Hände in Grundstellung';
  return (
    <svg
      viewBox="0 0 560 226"
      role="img"
      aria-label={description}
      className={cn('block h-auto w-full', className)}
    >
      <Hand side="left" active={active} tint={tint} />
      <Hand side="right" active={active} tint={tint} />
    </svg>
  );
}

export const HandsGuide = memo(HandsGuideComponent);
