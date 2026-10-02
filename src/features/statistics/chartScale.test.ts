import { describe, expect, it } from 'vitest';
import { niceScale } from './chartScale';

describe('Achsenskala', () => {
  it('umschließt die Daten mit runden Schritten', () => {
    const scale = niceScale(0, 438);
    expect(scale.min).toBe(0);
    expect(scale.max).toBeGreaterThanOrEqual(438);
    expect(scale.ticks[0]).toBe(0);
    expect(scale.ticks.at(-1)).toBe(scale.max);
  });

  it('liefert bei ganzzahliger Anzeige nur ganze, eindeutige Werte', () => {
    for (const [min, max] of [
      [98, 100],
      [90, 100],
      [0, 10],
      [0, 3],
      [87, 97],
      [0, 438],
      [42, 42],
    ] as const) {
      const { ticks } = niceScale(min, max, { integer: true });
      expect(ticks.every((tick) => Number.isInteger(tick))).toBe(true);
      expect(new Set(ticks.map(String)).size).toBe(ticks.length);
      expect(ticks[0]).toBeLessThanOrEqual(min);
      expect(ticks.at(-1)).toBeGreaterThanOrEqual(max);
    }
  });

  it('wählt bei ganzzahliger Anzeige 5 statt 2,5 als Schritt', () => {
    expect(niceScale(90, 100, { integer: true }).ticks).toEqual([90, 95, 100]);
    expect(niceScale(90, 100).ticks).toEqual([90, 92.5, 95, 97.5, 100]);
  });

  it('kommt mit einer einzigen Messung (keine Spannweite) zurecht', () => {
    const scale = niceScale(100, 100, { integer: true });
    expect(scale.max).toBeGreaterThan(scale.min);
    expect(scale.ticks).toContain(100);
  });
});
