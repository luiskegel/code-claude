import type { KeyDefinition, KeyboardLayout } from '../../domain/keyboard/layouts';

/** Virtuelle Maße der SVG-Tastatur (skaliert per viewBox). */
export const UNIT = 60;
export const GAP = 6;
export const PADDING = 12;

export interface KeyRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function keyboardSize(layout: KeyboardLayout): { width: number; height: number } {
  return { width: layout.width * UNIT + PADDING * 2, height: layout.rows * UNIT + PADDING * 2 };
}

export function keyRect(key: KeyDefinition): KeyRect {
  return {
    x: PADDING + key.x * UNIT + GAP / 2,
    y: PADDING + (key.row + (key.yOffset ?? 0)) * UNIT + GAP / 2,
    width: key.width * UNIT - GAP,
    height: (key.height ?? 1) * UNIT - GAP,
  };
}

type Point = readonly [number, number];

/** Polygon mit abgerundeten Ecken (auch für die einspringende Ecke der ISO-Enter-Taste). */
export function roundedPolygonPath(points: readonly Point[], radius: number): string {
  const count = points.length;
  let path = '';
  for (let index = 0; index < count; index++) {
    const previous = points[(index - 1 + count) % count] as Point;
    const current = points[index] as Point;
    const next = points[(index + 1) % count] as Point;
    const toPrevious = [previous[0] - current[0], previous[1] - current[1]] as const;
    const toNext = [next[0] - current[0], next[1] - current[1]] as const;
    const lengthPrevious = Math.hypot(...toPrevious);
    const lengthNext = Math.hypot(...toNext);
    const r = Math.min(radius, lengthPrevious / 2, lengthNext / 2);
    const start = [
      current[0] + (toPrevious[0] / lengthPrevious) * r,
      current[1] + (toPrevious[1] / lengthPrevious) * r,
    ];
    const end = [
      current[0] + (toNext[0] / lengthNext) * r,
      current[1] + (toNext[1] / lengthNext) * r,
    ];
    path += `${index === 0 ? 'M' : 'L'}${start[0]} ${start[1]} Q${current[0]} ${current[1]} ${end[0]} ${end[1]} `;
  }
  return `${path}Z`;
}

/** Umriss der ISO-Enter-Taste (oberer, breiterer Teil + schmaler unterer Teil). */
export function isoEnterPath(key: KeyDefinition, radius: number): string {
  if (!key.isoEnter) throw new Error('Keine ISO-Enter-Taste');
  const left = PADDING + key.x * UNIT + GAP / 2;
  const right = PADDING + (key.x + key.width) * UNIT - GAP / 2;
  const top = PADDING + key.row * UNIT + GAP / 2;
  const step = PADDING + (key.row + 1) * UNIT - GAP / 2;
  const bottom = PADDING + (key.row + 2) * UNIT - GAP / 2;
  const lowerLeft = PADDING + key.isoEnter.lowerX * UNIT + GAP / 2;
  return roundedPolygonPath(
    [
      [left, top],
      [right, top],
      [right, bottom],
      [lowerLeft, bottom],
      [lowerLeft, step],
      [left, step],
    ],
    radius,
  );
}

/** Mittelpunkt für die Beschriftung (bei ISO-Enter im oberen Teil). */
export function labelCenter(key: KeyDefinition): { x: number; y: number } {
  const rect = keyRect(key);
  if (key.isoEnter) {
    return { x: rect.x + rect.width / 2, y: rect.y + (UNIT - GAP) / 2 + 6 };
  }
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

/** Treppenlinie zwischen linker und rechter Hand (5|6, T|Z, G|H, B|N). */
export function handDividerPath(): string {
  const boundaries = [6, 6.5, 6.75, 7.25];
  // Senkrechte Linien verlaufen in den Fugen zwischen den Tasten,
  // waagerechte Stufen genau in der Fuge zwischen zwei Reihen.
  let path = `M${PADDING + (boundaries[0] ?? 0) * UNIT} ${PADDING + GAP}`;
  boundaries.forEach((boundary, row) => {
    const x = PADDING + boundary * UNIT;
    const rowTop = PADDING + row * UNIT;
    const rowBottom = PADDING + (row + 1) * UNIT;
    path += ` L${x} ${row === 0 ? PADDING + GAP : rowTop}`;
    path += ` L${x} ${row === boundaries.length - 1 ? rowBottom - GAP : rowBottom}`;
  });
  return path;
}
