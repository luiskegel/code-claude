// Reine Finanz-Rechenfunktionen. Alle Ergebnisse sind Modellrechnungen.
// Diese Funktionen sind bewusst frei von UI-Logik und werden in src/lib/calculations.test.ts getestet.

export const round = (v: number, digits = 2): number => {
  const f = 10 ** digits;
  return Math.round((v + Number.EPSILON) * f) / f;
};

/** Einfache Rendite in Prozent: (Ende - Anfang + Ausschüttungen) / Anfang */
export function simpleReturn(start: number, end: number, income = 0): number {
  if (start <= 0) throw new Error('Der Anfangswert muss größer als 0 sein.');
  return ((end - start + income) / start) * 100;
}

/** Annualisierte Rendite (CAGR) in Prozent. */
export function cagr(start: number, end: number, years: number): number {
  if (start <= 0 || years <= 0) throw new Error('Anfangswert und Jahre müssen größer als 0 sein.');
  if (end <= 0) return -100;
  return (Math.pow(end / start, 1 / years) - 1) * 100;
}

export interface YearPoint {
  year: number;
  value: number;
  invested: number;
  gain: number;
}

/** Zinseszins mit jährlicher Verzinsung. rate in Prozent p. a. */
export function compoundInterest(principal: number, ratePct: number, years: number): YearPoint[] {
  const r = ratePct / 100;
  const out: YearPoint[] = [];
  for (let y = 0; y <= years; y++) {
    const value = principal * Math.pow(1 + r, y);
    out.push({ year: y, value: round(value), invested: round(principal), gain: round(value - principal) });
  }
  return out;
}

/**
 * Sparplan mit monatlicher Einzahlung (am Monatsende) und monatlicher Verzinsung.
 * ratePct = erwartete jährliche Rendite in Prozent (Annahme!).
 */
export function savingsPlan(
  initial: number,
  monthly: number,
  ratePct: number,
  years: number,
  costPct = 0,
): YearPoint[] {
  const net = (ratePct - costPct) / 100;
  const rm = Math.pow(1 + net, 1 / 12) - 1;
  let value = initial;
  let invested = initial;
  const out: YearPoint[] = [{ year: 0, value: round(value), invested: round(invested), gain: 0 }];
  for (let m = 1; m <= years * 12; m++) {
    value = value * (1 + rm) + monthly;
    invested += monthly;
    if (m % 12 === 0) {
      out.push({ year: m / 12, value: round(value), invested: round(invested), gain: round(value - invested) });
    }
  }
  return out;
}

export interface DividendYear {
  year: number;
  dividendPerShare: number;
  shares: number;
  payout: number;
  cumulative: number;
  yieldOnCost: number;
}

/**
 * Dividenden-Modellrechnung.
 * - investment und price bestimmen die Stückzahl, falls shares nicht angegeben (0) ist.
 * - growthPct: angenommene jährliche Dividendensteigerung.
 * - reinvest: Dividenden werden zum (konstant angenommenen) Kurs reinvestiert.
 */
export function dividendProjection(params: {
  investment: number;
  price: number;
  shares?: number;
  dividendPerShare: number;
  growthPct: number;
  years: number;
  reinvest?: boolean;
  taxPct?: number;
}): DividendYear[] {
  const { investment, price, dividendPerShare, growthPct, years, reinvest = false, taxPct = 0 } = params;
  if (price <= 0) throw new Error('Der Aktienkurs muss größer als 0 sein.');
  let shares = params.shares && params.shares > 0 ? params.shares : investment / price;
  const costBasis = params.shares && params.shares > 0 ? params.shares * price : investment;
  const out: DividendYear[] = [];
  let cumulative = 0;
  let dps = dividendPerShare;
  for (let y = 1; y <= years; y++) {
    const gross = shares * dps;
    const payout = gross * (1 - taxPct / 100);
    cumulative += payout;
    out.push({
      year: y,
      dividendPerShare: round(dps, 4),
      shares: round(shares, 4),
      payout: round(payout),
      cumulative: round(cumulative),
      yieldOnCost: costBasis > 0 ? round((payout / costBasis) * 100, 2) : 0,
    });
    if (reinvest) shares += payout / price;
    dps = dps * (1 + growthPct / 100);
  }
  return out;
}

export const dividendYield = (dividendPerShare: number, price: number): number => {
  if (price <= 0) throw new Error('Der Kurs muss größer als 0 sein.');
  return (dividendPerShare / price) * 100;
};

export const eps = (netIncome: number, sharesOutstanding: number): number => {
  if (sharesOutstanding <= 0) throw new Error('Die Aktienanzahl muss größer als 0 sein.');
  return netIncome / sharesOutstanding;
};

export const peRatio = (price: number, earningsPerShare: number): number | null => {
  if (earningsPerShare <= 0) return null; // Bei Verlust ist das KGV nicht sinnvoll interpretierbar
  return price / earningsPerShare;
};

export const pbRatio = (price: number, bookValuePerShare: number): number | null =>
  bookValuePerShare <= 0 ? null : price / bookValuePerShare;

export const psRatio = (marketCap: number, revenue: number): number | null =>
  revenue <= 0 ? null : marketCap / revenue;

export const marketCap = (price: number, shares: number): number => price * shares;

export const returnOnEquity = (netIncome: number, equity: number): number | null =>
  equity <= 0 ? null : (netIncome / equity) * 100;

export const debtToEquity = (debt: number, equity: number): number | null =>
  equity <= 0 ? null : debt / equity;

export const freeCashflow = (operatingCashflow: number, capex: number): number => operatingCashflow - Math.abs(capex);

export const equityRatio = (equity: number, totalAssets: number): number | null =>
  totalAssets <= 0 ? null : (equity / totalAssets) * 100;

export const margin = (profit: number, revenue: number): number | null => (revenue <= 0 ? null : (profit / revenue) * 100);

/** Durchschnittlicher Kaufpreis über mehrere Käufe (inkl. Gebühren). */
export function averagePrice(purchases: { shares: number; price: number; fee?: number }[]): {
  totalShares: number;
  totalCost: number;
  average: number;
} {
  const valid = purchases.filter((p) => p.shares > 0 && p.price >= 0);
  const totalShares = valid.reduce((s, p) => s + p.shares, 0);
  const totalCost = valid.reduce((s, p) => s + p.shares * p.price + (p.fee ?? 0), 0);
  return { totalShares, totalCost: round(totalCost), average: totalShares > 0 ? totalCost / totalShares : 0 };
}

/** Benötigter Gewinn in %, um einen Verlust in % wieder auszugleichen. */
export function recoveryNeeded(lossPct: number): number {
  if (lossPct >= 100) return Infinity;
  if (lossPct <= 0) return 0;
  return (1 / (1 - lossPct / 100) - 1) * 100;
}

/** Verlust-Rechner: absolute und relative Wertveränderung. */
export function lossCalc(buyPrice: number, currentPrice: number, shares: number) {
  const invested = buyPrice * shares;
  const current = currentPrice * shares;
  const diff = current - invested;
  const pct = invested > 0 ? (diff / invested) * 100 : 0;
  return {
    invested: round(invested),
    current: round(current),
    diff: round(diff),
    pct: round(pct),
    recovery: pct < 0 ? round(recoveryNeeded(-pct)) : 0,
  };
}

/**
 * Break-even-Kurs: ab welchem Verkaufskurs ist man nach Gebühren (und optional Steuern ignoriert) bei null?
 * buyFee und sellFee in Euro, spreadPct als Prozent des Kurses beim Verkauf.
 */
export function breakEven(buyPrice: number, shares: number, buyFee: number, sellFee: number, spreadPct = 0): number {
  if (shares <= 0) throw new Error('Die Stückzahl muss größer als 0 sein.');
  const totalCost = buyPrice * shares + buyFee + sellFee;
  return totalCost / shares / (1 - spreadPct / 100);
}

/** Herfindahl-Index-basierte Diversifikationsauswertung. weights in beliebiger Einheit (z. B. Euro). */
export function diversification(weights: { name: string; value: number }[]) {
  const total = weights.reduce((s, w) => s + Math.max(0, w.value), 0);
  if (total <= 0) return { total: 0, shares: [], hhi: 0, effectiveN: 0, largest: 0 };
  const shares = weights
    .filter((w) => w.value > 0)
    .map((w) => ({ name: w.name, value: w.value, pct: (w.value / total) * 100 }));
  const hhi = shares.reduce((s, w) => s + (w.pct / 100) ** 2, 0);
  const largest = Math.max(...shares.map((s) => s.pct));
  return { total, shares, hhi: round(hhi, 4), effectiveN: round(1 / hhi, 2), largest: round(largest, 2) };
}

/** Positionsgröße nach dem Risikobudget-Prinzip. */
export function positionSize(capital: number, riskPct: number, entry: number, stop: number) {
  const riskAmount = capital * (riskPct / 100);
  const perShare = entry - stop;
  if (perShare <= 0) throw new Error('Der Stop-Kurs muss unter dem Einstiegskurs liegen.');
  const shares = Math.floor(riskAmount / perShare);
  return { riskAmount: round(riskAmount), perShare: round(perShare), shares, positionValue: round(shares * entry) };
}

/** Wirkung eines Hebels auf eine Kursbewegung (vereinfachte Tagesbetrachtung). */
export function leveragedPath(dailyMovesPct: number[], leverage: number) {
  let base = 100;
  let lev = 100;
  const out = [{ step: 0, base, lev }];
  dailyMovesPct.forEach((m, i) => {
    base = base * (1 + m / 100);
    lev = Math.max(0, lev * (1 + (leverage * m) / 100));
    out.push({ step: i + 1, base: round(base), lev: round(lev) });
  });
  return out;
}

/** Inflations-Kaufkraft: Was sind X € in n Jahren real noch wert? */
export function purchasingPower(amount: number, inflationPct: number, years: number): number {
  return amount / Math.pow(1 + inflationPct / 100, years);
}

/** Maximaler Drawdown einer Wertreihe in Prozent (negativ). */
export function maxDrawdown(values: number[]): number {
  let peak = -Infinity;
  let mdd = 0;
  for (const v of values) {
    if (v > peak) peak = v;
    if (peak > 0) mdd = Math.min(mdd, (v - peak) / peak);
  }
  return mdd * 100;
}

/** Gleitender Durchschnitt. Gibt für die ersten (n-1) Werte null zurück. */
export function sma(values: number[], period: number): (number | null)[] {
  return values.map((_, i) => {
    if (i < period - 1) return null;
    let s = 0;
    for (let j = i - period + 1; j <= i; j++) s += values[j];
    return s / period;
  });
}

export function ema(values: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const out: number[] = [];
  values.forEach((v, i) => {
    out.push(i === 0 ? v : v * k + out[i - 1] * (1 - k));
  });
  return out;
}

/** RSI nach Wilder. Gibt für die ersten `period` Werte null zurück. */
export function rsi(values: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = values.map(() => null);
  if (values.length <= period) return out;
  let gain = 0;
  let loss = 0;
  for (let i = 1; i <= period; i++) {
    const d = values[i] - values[i - 1];
    if (d >= 0) gain += d;
    else loss -= d;
  }
  let avgGain = gain / period;
  let avgLoss = loss / period;
  out[period] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  for (let i = period + 1; i < values.length; i++) {
    const d = values[i] - values[i - 1];
    avgGain = (avgGain * (period - 1) + Math.max(d, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-d, 0)) / period;
    out[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  }
  return out;
}

export function macd(values: number[], fast = 12, slow = 26, signal = 9) {
  const ef = ema(values, fast);
  const es = ema(values, slow);
  const line = values.map((_, i) => ef[i] - es[i]);
  const sig = ema(line, signal);
  return line.map((m, i) => ({ macd: m, signal: sig[i], hist: m - sig[i] }));
}

/** Deutsche Abgeltungsteuer (vereinfacht): 25 % + 5,5 % Soli, optional Kirchensteuer 8 oder 9 %. */
export function germanCapitalGainsTax(gain: number, allowance: number, churchPct: 0 | 8 | 9 = 0) {
  const taxable = Math.max(0, gain - allowance);
  // Formel nach § 32d EStG bei Kirchensteuer: (e) / (4 + k)
  const k = churchPct / 100;
  const kapest = churchPct ? taxable / (4 + k) : taxable * 0.25;
  const soli = kapest * 0.055;
  const kist = kapest * k;
  return {
    taxable: round(taxable),
    kapest: round(kapest),
    soli: round(soli),
    kist: round(kist),
    total: round(kapest + soli + kist),
    effectivePct: taxable > 0 ? round(((kapest + soli + kist) / taxable) * 100, 3) : 0,
  };
}
