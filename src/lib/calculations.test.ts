import { describe, expect, it } from 'vitest';
import {
  averagePrice,
  breakEven,
  cagr,
  compoundInterest,
  debtToEquity,
  diversification,
  dividendProjection,
  dividendYield,
  eps,
  germanCapitalGainsTax,
  leveragedPath,
  lossCalc,
  macd,
  maxDrawdown,
  peRatio,
  positionSize,
  recoveryNeeded,
  returnOnEquity,
  rsi,
  savingsPlan,
  simpleReturn,
  sma,
} from './calculations';

describe('Renditen', () => {
  it('berechnet die einfache Rendite inkl. Dividenden', () => {
    expect(simpleReturn(100, 110)).toBeCloseTo(10);
    expect(simpleReturn(100, 110, 5)).toBeCloseTo(15);
    expect(simpleReturn(200, 150)).toBeCloseTo(-25);
  });
  it('wirft bei Anfangswert 0', () => {
    expect(() => simpleReturn(0, 10)).toThrow();
  });
  it('berechnet die jährliche Durchschnittsrendite (CAGR)', () => {
    expect(cagr(1000, 2000, 10)).toBeCloseTo(7.177, 2);
    expect(cagr(100, 100, 5)).toBeCloseTo(0);
  });
});

describe('Zinseszins und Sparplan', () => {
  it('verzinst jährlich', () => {
    const r = compoundInterest(1000, 5, 2);
    expect(r).toHaveLength(3);
    expect(r[2].value).toBeCloseTo(1102.5, 2);
  });
  it('Sparplan ohne Rendite entspricht der Summe der Einzahlungen', () => {
    const r = savingsPlan(0, 100, 0, 10);
    expect(r[10].value).toBeCloseTo(12000, 2);
    expect(r[10].invested).toBe(12000);
  });
  it('Sparplan mit Rendite liegt über den Einzahlungen', () => {
    const r = savingsPlan(1000, 100, 6, 20);
    expect(r[20].value).toBeGreaterThan(r[20].invested);
  });
  it('Kosten reduzieren das Endergebnis', () => {
    const a = savingsPlan(0, 100, 6, 20, 0);
    const b = savingsPlan(0, 100, 6, 20, 1);
    expect(b[20].value).toBeLessThan(a[20].value);
  });
});

describe('Dividenden', () => {
  it('berechnet die Dividendenrendite', () => {
    expect(dividendYield(2, 50)).toBeCloseTo(4);
  });
  it('projiziert Dividenden mit Wachstum', () => {
    const r = dividendProjection({ investment: 1000, price: 50, dividendPerShare: 2, growthPct: 10, years: 2 });
    expect(r[0].shares).toBeCloseTo(20);
    expect(r[0].payout).toBeCloseTo(40);
    expect(r[1].payout).toBeCloseTo(44);
    expect(r[1].cumulative).toBeCloseTo(84);
  });
  it('Reinvestition erhöht die Stückzahl', () => {
    const r = dividendProjection({ investment: 1000, price: 50, dividendPerShare: 2, growthPct: 0, years: 3, reinvest: true });
    expect(r[2].shares).toBeGreaterThan(r[0].shares);
  });
  it('nutzt die angegebene Stückzahl vor der Investitionssumme', () => {
    const r = dividendProjection({ investment: 999, price: 10, shares: 5, dividendPerShare: 1, growthPct: 0, years: 1 });
    expect(r[0].payout).toBe(5);
  });
});

describe('Kennzahlen', () => {
  it('EPS und KGV', () => {
    expect(eps(1_000_000, 500_000)).toBe(2);
    expect(peRatio(30, 2)).toBe(15);
    expect(peRatio(30, -1)).toBeNull();
  });
  it('Eigenkapitalrendite und Verschuldungsgrad', () => {
    expect(returnOnEquity(10, 100)).toBeCloseTo(10);
    expect(debtToEquity(150, 100)).toBeCloseTo(1.5);
    expect(debtToEquity(1, 0)).toBeNull();
  });
});

describe('Kaufpreis, Verlust und Break-even', () => {
  it('berechnet den Durchschnittspreis inkl. Gebühren', () => {
    const r = averagePrice([
      { shares: 10, price: 100, fee: 5 },
      { shares: 10, price: 80, fee: 5 },
    ]);
    expect(r.totalShares).toBe(20);
    expect(r.average).toBeCloseTo(90.5);
  });
  it('benötigte Erholung nach Verlusten', () => {
    expect(recoveryNeeded(50)).toBeCloseTo(100);
    expect(recoveryNeeded(20)).toBeCloseTo(25);
    expect(recoveryNeeded(100)).toBe(Infinity);
  });
  it('Verlustrechner', () => {
    const r = lossCalc(100, 70, 10);
    expect(r.diff).toBe(-300);
    expect(r.pct).toBe(-30);
    expect(r.recovery).toBeCloseTo(42.86, 1);
  });
  it('Break-even inkl. Gebühren', () => {
    expect(breakEven(100, 10, 5, 5)).toBeCloseTo(101);
  });
});

describe('Risiko und Diversifikation', () => {
  it('gleichgewichtetes Portfolio hat effektive Anzahl = Anzahl Positionen', () => {
    const d = diversification([
      { name: 'A', value: 100 },
      { name: 'B', value: 100 },
      { name: 'C', value: 100 },
      { name: 'D', value: 100 },
    ]);
    expect(d.effectiveN).toBeCloseTo(4);
    expect(d.largest).toBeCloseTo(25);
  });
  it('Positionsgröße nach Risikobudget', () => {
    const r = positionSize(10000, 1, 50, 45);
    expect(r.riskAmount).toBe(100);
    expect(r.shares).toBe(20);
  });
  it('Stop über Einstieg ist ungültig', () => {
    expect(() => positionSize(10000, 1, 50, 55)).toThrow();
  });
  it('maximaler Drawdown', () => {
    expect(maxDrawdown([100, 120, 60, 130])).toBeCloseTo(-50);
  });
  it('Hebel verstärkt Verluste und erholt sich nicht symmetrisch', () => {
    const p = leveragedPath([-10, 11.11], 5);
    expect(p[2].base).toBeCloseTo(100, 0);
    expect(p[2].lev).toBeLessThan(100);
  });
});

describe('Indikatoren', () => {
  it('SMA', () => {
    expect(sma([1, 2, 3, 4], 2)).toEqual([null, 1.5, 2.5, 3.5]);
  });
  it('RSI liegt zwischen 0 und 100', () => {
    const values = Array.from({ length: 40 }, (_, i) => 100 + Math.sin(i / 3) * 5 + i * 0.2);
    const r = rsi(values).filter((v): v is number => v !== null);
    expect(r.length).toBeGreaterThan(0);
    r.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
  });
  it('RSI ist 100 bei nur steigenden Kursen', () => {
    const r = rsi(Array.from({ length: 20 }, (_, i) => i + 1));
    expect(r[19]).toBe(100);
  });
  it('MACD liefert gleich viele Werte', () => {
    expect(macd([1, 2, 3, 4, 5])).toHaveLength(5);
  });
});

describe('Steuern (vereinfachtes Modell)', () => {
  it('Abgeltungsteuer ohne Kirchensteuer ≈ 26,375 %', () => {
    const t = germanCapitalGainsTax(2000, 1000);
    expect(t.taxable).toBe(1000);
    expect(t.total).toBeCloseTo(263.75, 2);
  });
  it('nichts zu versteuern unterhalb des Sparer-Pauschbetrags', () => {
    expect(germanCapitalGainsTax(800, 1000).total).toBe(0);
  });
  it('mit 9 % Kirchensteuer ≈ 27,995 %', () => {
    const t = germanCapitalGainsTax(1000, 0, 9);
    expect(t.effectivePct).toBeCloseTo(27.995, 2);
  });
});
