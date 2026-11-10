// Persistenz in LocalStorage mit Versionsnummer und robuster Fehlerbehandlung.
import type { AppState } from '@/types';
import { createPortfolio } from './portfolio';
import { emptyProgress } from './progress';

export const STORAGE_KEY = 'my-stock-academy:v1';
export const STATE_VERSION = 1;

export function defaultState(): AppState {
  return {
    version: STATE_VERSION,
    settings: {
      name: '',
      dailyGoalMinutes: 15,
      reduceMotion: false,
      dataProvider: 'simulated',
      proxyBaseUrl: '',
      showDisclaimers: true,
      ttsVoice: 'buttery',
      ttsRate: 1,
      ttsFollow: true,
    },
    progress: emptyProgress(),
    portfolio: createPortfolio(),
    watchlist: [],
  };
}

/** Führt gespeicherte Daten mit dem Standardzustand zusammen, damit neue Felder nicht fehlen. */
export function mergeState(raw: unknown): AppState {
  const base = defaultState();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<AppState>;
  return {
    version: STATE_VERSION,
    settings: { ...base.settings, ...(r.settings ?? {}) },
    progress: { ...base.progress, ...(r.progress ?? {}) },
    portfolio: { ...base.portfolio, ...(r.portfolio ?? {}) },
    watchlist: Array.isArray(r.watchlist) ? r.watchlist : [],
  };
}

export function loadState(): AppState {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (!text) return defaultState();
    return mergeState(JSON.parse(text));
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function exportState(state: AppState): string {
  return JSON.stringify({ app: 'my-stock-academy', exportedAt: new Date().toISOString(), state }, null, 2);
}

export function parseImport(text: string): AppState {
  const data = JSON.parse(text);
  if (!data || data.app !== 'my-stock-academy' || !data.state) {
    throw new Error('Die Datei ist kein gültiger MY STOCK ACADEMY Export.');
  }
  return mergeState(data.state);
}
