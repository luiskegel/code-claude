// Simulierter Markt mit FIKTIVEN Unternehmen.
// Die Kurse werden deterministisch aus einem Zufallsgenerator mit festem Startwert erzeugt
// (geometrische Brownsche Bewegung). Es handelt sich ausdrücklich NICHT um echte Börsenkurse.

export interface SimStock {
  symbol: string;
  name: string;
  sector: string;
  exchange: string;
  country: string;
  description: string;
  startPrice: number;
  /** erwartete Jahresrendite (Drift) als Dezimalzahl */
  drift: number;
  /** jährliche Volatilität als Dezimalzahl */
  volatility: number;
  /** jährliche Dividende je Aktie in € (bezogen auf Startpreis-Niveau) */
  annualDividend: number;
  /** Ausschüttungen pro Jahr (1 = jährlich, 4 = quartalsweise) */
  payoutsPerYear: number;
  /** fiktive Fundamentaldaten zu Lernzwecken */
  fundamentals: { eps: number; bookValuePerShare: number; revenuePerShare: number; sharesMio: number };
}

export const TRADING_DAYS_PER_YEAR = 250;
export const HISTORY_DAYS = 260;

export const SIM_STOCKS: SimStock[] = [
  {
    symbol: 'NWE',
    name: 'Nordwind Energie AG',
    sector: 'Versorger / Erneuerbare Energien',
    exchange: 'Sim-Xetra',
    country: 'Deutschland (fiktiv)',
    description: 'Fiktiver Betreiber von Windparks an Nord- und Ostsee. Stabile Einnahmen durch langfristige Stromabnahmeverträge, hohe Investitionen.',
    startPrice: 42.5,
    drift: 0.05,
    volatility: 0.22,
    annualDividend: 1.6,
    payoutsPerYear: 1,
    fundamentals: { eps: 2.4, bookValuePerShare: 28, revenuePerShare: 21, sharesMio: 310 },
  },
  {
    symbol: 'ALS',
    name: 'Alpenstahl Industrie AG',
    sector: 'Industrie / Stahl',
    exchange: 'Sim-Xetra',
    country: 'Österreich (fiktiv)',
    description: 'Fiktiver Stahlhersteller – stark konjunkturabhängig (zyklisch). Gewinne schwanken mit der Nachfrage aus Bau und Autoindustrie.',
    startPrice: 18.2,
    drift: 0.03,
    volatility: 0.34,
    annualDividend: 0.7,
    payoutsPerYear: 1,
    fundamentals: { eps: 1.9, bookValuePerShare: 24, revenuePerShare: 55, sharesMio: 180 },
  },
  {
    symbol: 'RHS',
    name: 'Rheinsoft Systems SE',
    sector: 'Technologie / Software',
    exchange: 'Sim-Xetra',
    country: 'Deutschland (fiktiv)',
    description: 'Fiktiver Anbieter von Unternehmenssoftware im Abo-Modell. Wachstumsunternehmen mit hoher Bewertung und niedriger Dividende.',
    startPrice: 128.0,
    drift: 0.11,
    volatility: 0.32,
    annualDividend: 0.5,
    payoutsPerYear: 1,
    fundamentals: { eps: 3.2, bookValuePerShare: 19, revenuePerShare: 14, sharesMio: 95 },
  },
  {
    symbol: 'HVB',
    name: 'Hanse Versicherungsgruppe AG',
    sector: 'Finanzen / Versicherungen',
    exchange: 'Sim-Xetra',
    country: 'Deutschland (fiktiv)',
    description: 'Fiktiver Versicherer mit Sach- und Lebensversicherungen. Typischer Dividendenwert mit moderaten Schwankungen.',
    startPrice: 210.0,
    drift: 0.06,
    volatility: 0.18,
    annualDividend: 11.0,
    payoutsPerYear: 1,
    fundamentals: { eps: 18.5, bookValuePerShare: 150, revenuePerShare: 260, sharesMio: 400 },
  },
  {
    symbol: 'MFL',
    name: 'Meridian Food & Life NV',
    sector: 'Basiskonsum / Lebensmittel',
    exchange: 'Sim-Euronext',
    country: 'Niederlande (fiktiv)',
    description: 'Fiktiver Lebensmittel- und Haushaltswarenkonzern. Defensiv: Produkte werden auch in Krisen gekauft.',
    startPrice: 64.0,
    drift: 0.05,
    volatility: 0.15,
    annualDividend: 2.2,
    payoutsPerYear: 4,
    fundamentals: { eps: 3.4, bookValuePerShare: 22, revenuePerShare: 38, sharesMio: 820 },
  },
  {
    symbol: 'VLX',
    name: 'Volaris Biotech AG',
    sector: 'Gesundheit / Biotechnologie',
    exchange: 'Sim-Xetra',
    country: 'Deutschland (fiktiv)',
    description: 'Fiktives Biotech-Unternehmen ohne Gewinne. Hohe Chancen, aber auch hohes Risiko bis zum Totalverlust (Studienergebnisse!).',
    startPrice: 9.8,
    drift: 0.04,
    volatility: 0.6,
    annualDividend: 0,
    payoutsPerYear: 0,
    fundamentals: { eps: -1.2, bookValuePerShare: 3.1, revenuePerShare: 0.8, sharesMio: 60 },
  },
  {
    symbol: 'BMO',
    name: 'Bavaria Mobility AG',
    sector: 'Automobil',
    exchange: 'Sim-Xetra',
    country: 'Deutschland (fiktiv)',
    description: 'Fiktiver Automobilhersteller im Umbruch zur Elektromobilität. Niedriges KGV, aber hohe Investitionen und Wettbewerbsdruck.',
    startPrice: 74.0,
    drift: 0.04,
    volatility: 0.28,
    annualDividend: 4.5,
    payoutsPerYear: 1,
    fundamentals: { eps: 11.2, bookValuePerShare: 120, revenuePerShare: 230, sharesMio: 600 },
  },
  {
    symbol: 'LMC',
    name: 'Lumen Chips Corp.',
    sector: 'Technologie / Halbleiter',
    exchange: 'Sim-Nasdaq (in €)',
    country: 'USA (fiktiv)',
    description: 'Fiktiver Chip-Entwickler. Sehr wachstumsstark, aber stark schwankend. Kurse hier zur Vereinfachung in Euro.',
    startPrice: 310.0,
    drift: 0.14,
    volatility: 0.42,
    annualDividend: 0.4,
    payoutsPerYear: 4,
    fundamentals: { eps: 7.8, bookValuePerShare: 30, revenuePerShare: 40, sharesMio: 2400 },
  },
  {
    symbol: 'TLK',
    name: 'Telkonet Europa AG',
    sector: 'Telekommunikation',
    exchange: 'Sim-Xetra',
    country: 'Deutschland (fiktiv)',
    description: 'Fiktiver Telekommunikationsanbieter mit hohen Schulden, aber planbaren Abo-Einnahmen.',
    startPrice: 21.0,
    drift: 0.04,
    volatility: 0.17,
    annualDividend: 0.9,
    payoutsPerYear: 1,
    fundamentals: { eps: 1.5, bookValuePerShare: 9, revenuePerShare: 22, sharesMio: 5000 },
  },
  {
    symbol: 'WLD',
    name: 'Sim-Welt-ETF (thesaurierend)',
    sector: 'ETF / Aktien weltweit',
    exchange: 'Sim-Xetra',
    country: 'Global (fiktiv)',
    description: 'Fiktiver ETF auf einen breiten Welt-Aktienindex mit ca. 1.500 Unternehmen. Thesaurierend: keine Ausschüttung, Erträge werden reinvestiert.',
    startPrice: 95.0,
    drift: 0.07,
    volatility: 0.15,
    annualDividend: 0,
    payoutsPerYear: 0,
    fundamentals: { eps: 5.2, bookValuePerShare: 30, revenuePerShare: 50, sharesMio: 0 },
  },
  {
    symbol: 'EUD',
    name: 'Sim-Europa-Dividenden-ETF (ausschüttend)',
    sector: 'ETF / Aktien Europa',
    exchange: 'Sim-Xetra',
    country: 'Europa (fiktiv)',
    description: 'Fiktiver ausschüttender ETF auf dividendenstarke europäische Unternehmen.',
    startPrice: 30.0,
    drift: 0.05,
    volatility: 0.16,
    annualDividend: 1.2,
    payoutsPerYear: 4,
    fundamentals: { eps: 2.3, bookValuePerShare: 16, revenuePerShare: 22, sharesMio: 0 },
  },
  {
    symbol: 'PNY',
    name: 'Pennyrock Mining Ltd.',
    sector: 'Rohstoffe / Penny Stock',
    exchange: 'Sim-Freiverkehr',
    country: 'Kanada (fiktiv)',
    description: 'Fiktiver Rohstoff-Explorer ohne Umsatz. Beispiel für einen Penny Stock: geringe Liquidität, extreme Schwankungen, hohes Totalverlustrisiko.',
    startPrice: 0.42,
    drift: -0.05,
    volatility: 0.9,
    annualDividend: 0,
    payoutsPerYear: 0,
    fundamentals: { eps: -0.08, bookValuePerShare: 0.1, revenuePerShare: 0, sharesMio: 400 },
  },
];

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Mulberry32 – kleiner, deterministischer Pseudo-Zufallsgenerator. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

interface Series {
  closes: number[];
  opens: number[];
  highs: number[];
  lows: number[];
  volumes: number[];
}

const cache = new Map<string, Series>();

function ensureSeries(stock: SimStock, upToDay: number): Series {
  const needed = upToDay + HISTORY_DAYS + 1;
  let s = cache.get(stock.symbol);
  if (s && s.closes.length >= needed) return s;
  // komplett neu erzeugen (deterministisch), damit Ergebnisse reproduzierbar bleiben
  const rand = mulberry32(hashString(stock.symbol));
  const dt = 1 / TRADING_DAYS_PER_YEAR;
  const len = Math.max(needed, (s?.closes.length ?? 0) * 2, HISTORY_DAYS + 520);
  s = { closes: [], opens: [], highs: [], lows: [], volumes: [] };
  let price = stock.startPrice;
  for (let i = 0; i < len; i++) {
    const z = gaussian(rand);
    const ret = (stock.drift - 0.5 * stock.volatility ** 2) * dt + stock.volatility * Math.sqrt(dt) * z;
    const open = price;
    const close = Math.max(0.01, price * Math.exp(ret));
    const intraday = stock.volatility * Math.sqrt(dt) * 0.6;
    const high = Math.max(open, close) * (1 + Math.abs(gaussian(rand)) * intraday);
    const low = Math.min(open, close) * (1 - Math.abs(gaussian(rand)) * intraday);
    const volume = Math.round((200000 + rand() * 800000) * (1 + Math.abs(z)));
    s.opens.push(open);
    s.closes.push(close);
    s.highs.push(high);
    s.lows.push(Math.max(0.005, low));
    s.volumes.push(volume);
    price = close;
  }
  cache.set(stock.symbol, s);
  return s;
}

export function getSimStock(symbol: string): SimStock | undefined {
  return SIM_STOCKS.find((s) => s.symbol === symbol);
}

/** Schlusskurs am simulierten Tag `day` (Tag 0 = Start der Simulation, negative Tage = Vorgeschichte). */
export function simPrice(symbol: string, day: number): number {
  const stock = getSimStock(symbol);
  if (!stock) throw new Error(`Unbekanntes Symbol: ${symbol}`);
  const d = Math.max(-HISTORY_DAYS, day);
  const s = ensureSeries(stock, Math.max(0, d));
  return Math.round(s.closes[d + HISTORY_DAYS] * 100) / 100;
}

export interface Candle {
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function simCandles(symbol: string, endDay: number, count: number): Candle[] {
  const stock = getSimStock(symbol);
  if (!stock) return [];
  const s = ensureSeries(stock, Math.max(0, endDay));
  const out: Candle[] = [];
  for (let d = Math.max(-HISTORY_DAYS, endDay - count + 1); d <= endDay; d++) {
    const i = d + HISTORY_DAYS;
    out.push({
      day: d,
      open: round2(s.opens[i]),
      high: round2(s.highs[i]),
      low: round2(s.lows[i]),
      close: round2(s.closes[i]),
      volume: s.volumes[i],
    });
  }
  return out;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

/** Dividende je Aktie, die am simulierten Tag `day` ausgeschüttet wird (0, wenn kein Zahltag). */
export function simDividendOn(symbol: string, day: number): number {
  const stock = getSimStock(symbol);
  if (!stock || stock.payoutsPerYear === 0 || day <= 0) return 0;
  const interval = Math.round(TRADING_DAYS_PER_YEAR / stock.payoutsPerYear);
  // Versatz je Symbol, damit nicht alle am gleichen Tag zahlen
  const offset = (hashString(stock.symbol) % interval) + 1;
  if ((day - offset) % interval !== 0 || day < offset) return 0;
  // Dividende wächst mit dem Kursniveau leicht mit (Modellannahme)
  const factor = Math.sqrt(simPrice(symbol, day) / stock.startPrice);
  return Math.round((stock.annualDividend / stock.payoutsPerYear) * factor * 10000) / 10000;
}

/** Datum-Label für einen simulierten Handelstag (rein zur Orientierung). */
export function simDayLabel(day: number): string {
  if (day === 0) return 'Start';
  return `Tag ${day}`;
}
