// Reine Depot-Logik für das virtuelle Depot (Paper Trading).
// Es wird KEIN echtes Geld bewegt – alle Funktionen arbeiten nur mit lokalem Zustand.

import type { PortfolioState, Position, Transaction } from '@/types';
import { SIM_STOCKS, simDividendOn, simPrice } from './market/simulatedMarket';

export const START_CAPITAL = 10000;
export const DEFAULT_FEE = 1;

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const r2 = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;

export const MAX_TRANSACTIONS = 400;

/** Kürzt die Transaktionsliste; Summen der entfernten Einträge bleiben erhalten. */
export function trimTransactions(state: PortfolioState): PortfolioState {
  if (state.transactions.length <= MAX_TRANSACTIONS) return state;
  const keep = state.transactions.slice(0, MAX_TRANSACTIONS);
  const drop = state.transactions.slice(MAX_TRANSACTIONS);
  return {
    ...state,
    transactions: keep,
    archivedRealized: r2((state.archivedRealized ?? 0) + drop.reduce((s, t) => s + (t.realizedPnL ?? 0), 0)),
    archivedDividends: r2((state.archivedDividends ?? 0) + drop.filter((t) => t.type === 'DIVIDEND').reduce((s, t) => s + t.amount, 0)),
  };
}

export function createPortfolio(startCapital = START_CAPITAL, feePerTrade = DEFAULT_FEE): PortfolioState {
  return {
    cash: startCapital,
    startCapital,
    day: 0,
    positions: [],
    transactions: [],
    history: [{ day: 0, value: startCapital, cash: startCapital }],
    feePerTrade,
  };
}

export type PriceFn = (symbol: string, day: number) => number;

export class TradeError extends Error {}

export function buy(state: PortfolioState, symbol: string, shares: number, price: PriceFn = simPrice): PortfolioState {
  if (!Number.isInteger(shares) || shares <= 0) throw new TradeError('Bitte eine ganze Stückzahl größer als 0 eingeben.');
  const p = price(symbol, state.day);
  const cost = r2(p * shares + state.feePerTrade);
  if (cost > state.cash + 1e-9) {
    throw new TradeError(
      `Nicht genug virtuelles Guthaben. Benötigt: ${cost.toFixed(2)} €, verfügbar: ${state.cash.toFixed(2)} €.`,
    );
  }
  const existing = state.positions.find((x) => x.symbol === symbol);
  let positions: Position[];
  if (existing) {
    const totalShares = existing.shares + shares;
    const avg = (existing.avgPrice * existing.shares + p * shares + state.feePerTrade) / totalShares;
    positions = state.positions.map((x) => (x.symbol === symbol ? { ...x, shares: totalShares, avgPrice: avg } : x));
  } else {
    positions = [...state.positions, { symbol, shares, avgPrice: (p * shares + state.feePerTrade) / shares }];
  }
  const tx: Transaction = {
    id: uid(),
    day: state.day,
    at: new Date().toISOString(),
    type: 'BUY',
    symbol,
    shares,
    price: p,
    fee: state.feePerTrade,
    amount: -cost,
  };
  return trimTransactions({ ...state, cash: r2(state.cash - cost), positions, transactions: [tx, ...state.transactions] });
}

export function sell(state: PortfolioState, symbol: string, shares: number, price: PriceFn = simPrice): PortfolioState {
  if (!Number.isInteger(shares) || shares <= 0) throw new TradeError('Bitte eine ganze Stückzahl größer als 0 eingeben.');
  const pos = state.positions.find((x) => x.symbol === symbol);
  if (!pos) throw new TradeError('Diese Aktie befindet sich nicht in deinem Depot.');
  if (shares > pos.shares) throw new TradeError(`Du besitzt nur ${pos.shares} Stück.`);
  const p = price(symbol, state.day);
  const proceeds = r2(p * shares - state.feePerTrade);
  const realized = r2(proceeds - pos.avgPrice * shares);
  const remaining = pos.shares - shares;
  const positions =
    remaining === 0
      ? state.positions.filter((x) => x.symbol !== symbol)
      : state.positions.map((x) => (x.symbol === symbol ? { ...x, shares: remaining } : x));
  const tx: Transaction = {
    id: uid(),
    day: state.day,
    at: new Date().toISOString(),
    type: 'SELL',
    symbol,
    shares,
    price: p,
    fee: state.feePerTrade,
    amount: proceeds,
    realizedPnL: realized,
  };
  return trimTransactions({ ...state, cash: r2(state.cash + proceeds), positions, transactions: [tx, ...state.transactions] });
}

export function positionValue(pos: Position, day: number, price: PriceFn = simPrice) {
  const current = price(pos.symbol, day);
  const value = current * pos.shares;
  const cost = pos.avgPrice * pos.shares;
  return { current, value: r2(value), cost: r2(cost), pnl: r2(value - cost), pnlPct: cost > 0 ? ((value - cost) / cost) * 100 : 0 };
}

export function totalValue(state: PortfolioState, price: PriceFn = simPrice, day = state.day): number {
  return r2(state.cash + state.positions.reduce((s, p) => s + price(p.symbol, day) * p.shares, 0));
}

export function realizedPnL(state: PortfolioState): number {
  return r2((state.archivedRealized ?? 0) + state.transactions.reduce((s, t) => s + (t.realizedPnL ?? 0), 0));
}

export function dividendsReceived(state: PortfolioState): number {
  return r2((state.archivedDividends ?? 0) + state.transactions.filter((t) => t.type === 'DIVIDEND').reduce((s, t) => s + t.amount, 0));
}

/**
 * Lässt die Simulation um `days` Handelstage weiterlaufen.
 * Dividenden für gehaltene Positionen werden am jeweiligen Zahltag gutgeschrieben.
 */
export function advanceDays(
  state: PortfolioState,
  days: number,
  price: PriceFn = simPrice,
  dividendOn: (symbol: string, day: number) => number = simDividendOn,
): PortfolioState {
  if (days <= 0) return state;
  let s = { ...state, transactions: [...state.transactions], history: [...state.history] };
  for (let i = 0; i < days; i++) {
    const day = s.day + 1;
    let cash = s.cash;
    for (const pos of s.positions) {
      const dps = dividendOn(pos.symbol, day);
      if (dps > 0) {
        const amount = r2(dps * pos.shares);
        cash = r2(cash + amount);
        s.transactions.unshift({
          id: uid(),
          day,
          at: new Date().toISOString(),
          type: 'DIVIDEND',
          symbol: pos.symbol,
          shares: pos.shares,
          price: dps,
          amount,
          note: 'Simulierte Dividende (vor Steuern)',
        });
      }
    }
    s = { ...s, day, cash };
    s.history.push({ day, value: totalValue(s, price, day), cash });
  }
  // Historie begrenzen, damit der Speicher klein bleibt
  while (s.history.length > 1200) s.history = s.history.filter((_, i, a) => i % 2 === 0 || i === a.length - 1);
  return trimTransactions(s);
}

export function knownSymbols(): string[] {
  return SIM_STOCKS.map((s) => s.symbol);
}
