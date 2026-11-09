import { describe, expect, it } from 'vitest';
import {
  advanceDays,
  buy,
  createPortfolio,
  dividendsReceived,
  positionValue,
  realizedPnL,
  sell,
  totalValue,
  TradeError,
} from './portfolio';
import { simCandles, simDividendOn, simPrice, SIM_STOCKS } from './market/simulatedMarket';

// Feste Testpreise: Kurs hängt nur vom Tag ab
const fixed = (prices: Record<number, number>) => (_s: string, day: number) => prices[day] ?? prices[0];

describe('Virtuelles Depot', () => {
  it('startet mit 10.000 € virtuellem Guthaben', () => {
    const p = createPortfolio();
    expect(p.cash).toBe(10000);
    expect(p.positions).toHaveLength(0);
  });

  it('kauft Aktien und zieht Kosten + Gebühr ab', () => {
    const p = buy(createPortfolio(10000, 1), 'NWE', 10, fixed({ 0: 50 }));
    expect(p.cash).toBe(10000 - 500 - 1);
    expect(p.positions[0]).toMatchObject({ symbol: 'NWE', shares: 10 });
    expect(p.positions[0].avgPrice).toBeCloseTo(50.1);
    expect(p.transactions[0].type).toBe('BUY');
  });

  it('berechnet den durchschnittlichen Kaufpreis über Nachkäufe', () => {
    let p = createPortfolio(10000, 0);
    p = buy(p, 'NWE', 10, fixed({ 0: 100 }));
    p = buy(p, 'NWE', 10, fixed({ 0: 50 }));
    expect(p.positions[0].shares).toBe(20);
    expect(p.positions[0].avgPrice).toBeCloseTo(75);
  });

  it('verhindert Käufe ohne ausreichendes Guthaben', () => {
    expect(() => buy(createPortfolio(100, 1), 'NWE', 10, fixed({ 0: 50 }))).toThrow(TradeError);
  });

  it('verhindert ungültige Stückzahlen', () => {
    expect(() => buy(createPortfolio(), 'NWE', 0, fixed({ 0: 50 }))).toThrow(TradeError);
    expect(() => buy(createPortfolio(), 'NWE', 1.5, fixed({ 0: 50 }))).toThrow(TradeError);
  });

  it('verkauft mit realisiertem Gewinn', () => {
    let p = createPortfolio(10000, 0);
    p = buy(p, 'NWE', 10, fixed({ 0: 50 }));
    p = sell(p, 'NWE', 4, fixed({ 0: 60 }));
    expect(p.positions[0].shares).toBe(6);
    expect(p.cash).toBeCloseTo(10000 - 500 + 240);
    expect(realizedPnL(p)).toBeCloseTo(40);
  });

  it('entfernt die Position beim vollständigen Verkauf', () => {
    let p = createPortfolio(10000, 0);
    p = buy(p, 'NWE', 5, fixed({ 0: 50 }));
    p = sell(p, 'NWE', 5, fixed({ 0: 40 }));
    expect(p.positions).toHaveLength(0);
    expect(realizedPnL(p)).toBeCloseTo(-50);
  });

  it('verhindert Verkauf von mehr Stücken als vorhanden', () => {
    const p = buy(createPortfolio(10000, 0), 'NWE', 5, fixed({ 0: 50 }));
    expect(() => sell(p, 'NWE', 6, fixed({ 0: 50 }))).toThrow(TradeError);
    expect(() => sell(p, 'ALS', 1, fixed({ 0: 50 }))).toThrow(TradeError);
  });

  it('berechnet Positionswert und Gesamtwert', () => {
    const p = buy(createPortfolio(10000, 0), 'NWE', 10, fixed({ 0: 50 }));
    const v = positionValue(p.positions[0], 0, fixed({ 0: 55 }));
    expect(v.pnl).toBeCloseTo(50);
    expect(v.pnlPct).toBeCloseTo(10);
    expect(totalValue(p, fixed({ 0: 55 }))).toBeCloseTo(10050);
  });

  it('simuliert Tage und schreibt Dividenden gut', () => {
    let p = buy(createPortfolio(10000, 0), 'NWE', 10, fixed({ 0: 50 }));
    p = advanceDays(p, 3, fixed({ 0: 50 }), (_s, day) => (day === 2 ? 1.5 : 0));
    expect(p.day).toBe(3);
    expect(dividendsReceived(p)).toBeCloseTo(15);
    expect(p.history).toHaveLength(4);
  });
});

describe('Simulierter Markt', () => {
  it('liefert reproduzierbare Kurse', () => {
    expect(simPrice('NWE', 10)).toBe(simPrice('NWE', 10));
    expect(simPrice('NWE', 600)).toBeGreaterThan(0);
  });
  it('liefert Kerzen mit high >= max(open, close) und low <= min(open, close)', () => {
    for (const c of simCandles('RHS', 30, 60)) {
      expect(c.high).toBeGreaterThanOrEqual(Math.max(c.open, c.close) - 0.01);
      expect(c.low).toBeLessThanOrEqual(Math.min(c.open, c.close) + 0.01);
    }
  });
  it('zahlt Dividenden nur bei dividendenzahlenden Werten', () => {
    const payers = SIM_STOCKS.filter((s) => s.payoutsPerYear > 0);
    const any = payers.some((s) => Array.from({ length: 260 }, (_, i) => simDividendOn(s.symbol, i + 1)).some((d) => d > 0));
    expect(any).toBe(true);
    expect(Array.from({ length: 300 }, (_, i) => simDividendOn('WLD', i + 1)).every((d) => d === 0)).toBe(true);
  });
});
