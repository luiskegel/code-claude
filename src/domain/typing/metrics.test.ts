import { describe, expect, it } from 'vitest';
import { average, calculateAccuracy, calculateWpm, displayAccuracy, displayWpm } from './metrics';

describe('calculateWpm', () => {
  it('rechnet korrekte Zeichen / 5 / Minuten', () => {
    expect(calculateWpm(250, 60_000)).toBe(50);
    expect(calculateWpm(50, 30_000)).toBe(20);
    expect(calculateWpm(5, 12_000)).toBe(5);
  });

  it('liefert 0 ohne Zeichen oder ohne Zeit statt Unendlich', () => {
    expect(calculateWpm(0, 60_000)).toBe(0);
    expect(calculateWpm(100, 0)).toBe(0);
    expect(calculateWpm(100, -5)).toBe(0);
    expect(calculateWpm(Number.NaN, 1000)).toBe(0);
  });
});

describe('calculateAccuracy', () => {
  it('rechnet korrekte Eingaben / alle Eingaben × 100', () => {
    expect(calculateAccuracy(96, 100)).toBe(96);
    expect(calculateAccuracy(1, 3)).toBeCloseTo(33.333, 2);
    expect(calculateAccuracy(10, 10)).toBe(100);
  });

  it('liefert 0 ohne Eingaben und begrenzt auf 0–100', () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
    expect(calculateAccuracy(12, 10)).toBe(100);
    expect(calculateAccuracy(-1, 10)).toBe(0);
  });
});

describe('Anzeige', () => {
  it('rundet die Genauigkeit ab, damit 89,6 % nicht als bestanden erscheinen', () => {
    expect(displayAccuracy(89.6)).toBe(89);
    expect(displayAccuracy(99.99)).toBe(99);
    expect(displayAccuracy(100)).toBe(100);
    expect(displayAccuracy(90)).toBe(90);
  });

  it('rundet WPM kaufmännisch', () => {
    expect(displayWpm(41.5)).toBe(42);
    expect(displayWpm(41.4)).toBe(41);
  });

  it('berechnet Durchschnitte', () => {
    expect(average([])).toBeNull();
    expect(average([10, 20, 30])).toBe(20);
  });
});
