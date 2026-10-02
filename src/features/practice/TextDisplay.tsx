import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import type { CharStatus } from '../../domain/typing/engine';
import { cn } from '../../lib/cn';

interface Unit {
  start: number;
  end: number;
  lineBreak: boolean;
}

/** Zerlegt den Text in Wörter inklusive folgendem Leerzeichen – Umbrüche nur zwischen Wörtern. */
function buildUnits(chars: readonly string[]): Unit[] {
  const units: Unit[] = [];
  let start = 0;
  chars.forEach((char, index) => {
    if (char === ' ' || char === '\n') {
      units.push({ start, end: index + 1, lineBreak: char === '\n' });
      start = index + 1;
    }
  });
  if (start < chars.length) units.push({ start, end: chars.length, lineBreak: false });
  return units;
}

const STATUS_CODE: Record<CharStatus, string> = {
  pending: 'p',
  correct: 'c',
  corrected: 'r',
  incorrect: 'i',
};
const CODE_STATUS: Record<string, CharStatus> = {
  p: 'pending',
  c: 'correct',
  r: 'corrected',
  i: 'incorrect',
};

interface WordProps {
  text: string;
  start: number;
  /** Ein Buchstabe je Zeichen: p/c/r/i – kompakt, damit memo() effektiv vergleicht */
  statusCode: string;
  /** Position des Cursors innerhalb des Worts oder -1 */
  cursorOffset: number;
  lineBreak: boolean;
}

function renderChar(char: string, status: CharStatus) {
  if (char === '\n') return <span className="tt-glyph">↵</span>;
  if (char === ' ' && status === 'incorrect') return '·';
  return char;
}

const Word = memo(function Word({ text, start, statusCode, cursorOffset, lineBreak }: WordProps) {
  const chars = Array.from(text);
  return (
    <>
      <span className="inline-block whitespace-pre">
        {chars.map((char, offset) => {
          const status = CODE_STATUS[statusCode[offset] ?? 'p'] ?? 'pending';
          return (
            <span
              key={start + offset}
              className="tt-char"
              data-status={status}
              data-current={offset === cursorOffset ? 'true' : undefined}
            >
              {renderChar(char, status)}
            </span>
          );
        })}
      </span>
      {lineBreak && <br />}
    </>
  );
});

interface TextDisplayProps {
  chars: readonly string[];
  statuses: readonly CharStatus[];
  cursor: number;
  reducedMotion: boolean;
  className?: string;
}

/** Übungstext mit drei sichtbaren Zeilen – die aktuelle Zeile scrollt automatisch mit. */
export function TextDisplay({
  chars,
  statuses,
  cursor,
  reducedMotion,
  className,
}: TextDisplayProps) {
  const units = useMemo(() => buildUnits(chars), [chars]);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const update = () => {
      const current = inner.querySelector<HTMLElement>('[data-current="true"]');
      if (!current) return;
      const lineHeight = parseFloat(getComputedStyle(inner).lineHeight) || current.offsetHeight;
      const line = Math.round(current.offsetTop / lineHeight);
      // Die aktuelle Zeile bleibt die zweite sichtbare – die vorherige gibt Kontext.
      inner.style.transform = `translateY(${-Math.max(0, line - 1) * lineHeight}px)`;
    };
    update();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : null;
    observer?.observe(inner);
    return () => observer?.disconnect();
  }, [cursor, units]);

  return (
    <div className={cn('relative overflow-hidden', className)} style={{ height: '5.25em' }}>
      <div
        ref={innerRef}
        className={cn(
          'relative leading-[1.75]',
          !reducedMotion && 'transition-transform duration-200 ease-out',
        )}
      >
        {units.map((unit) => {
          let statusCode = '';
          for (let index = unit.start; index < unit.end; index++) {
            statusCode += STATUS_CODE[statuses[index] ?? 'pending'];
          }
          const cursorOffset = cursor >= unit.start && cursor < unit.end ? cursor - unit.start : -1;
          return (
            <Word
              key={unit.start}
              text={chars.slice(unit.start, unit.end).join('')}
              start={unit.start}
              statusCode={statusCode}
              cursorOffset={cursorOffset}
              lineBreak={unit.lineBreak}
            />
          );
        })}
      </div>
    </div>
  );
}
