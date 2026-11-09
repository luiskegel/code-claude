// Austauschbare Datenanbieter-Schnittstelle für Kursdaten.
//
// Sicherheitsprinzip: Das Frontend kennt NIEMALS einen API-Schlüssel.
// Echte Kursdaten werden ausschließlich über einen eigenen Backend-Proxy (siehe /server) abgefragt,
// der den Schlüssel aus einer Umgebungsvariable liest.

import type { DataQuality } from '@/types';
import { getSimStock, simCandles, simPrice } from './simulatedMarket';

export interface Quote {
  symbol: string;
  price: number;
  currency: string;
  changePct: number;
  asOf: string;
  quality: DataQuality;
  source: string;
}

export interface MarketDataProvider {
  readonly id: string;
  readonly label: string;
  readonly quality: DataQuality;
  getQuote(symbol: string): Promise<Quote>;
  getHistory(symbol: string, days: number): Promise<{ label: string; close: number }[]>;
}

export class SimulatedProvider implements MarketDataProvider {
  readonly id = 'simulated';
  readonly label = 'Simulierter Markt (fiktive Unternehmen)';
  readonly quality: DataQuality = 'simulated';
  constructor(private readonly getDay: () => number) {}

  async getQuote(symbol: string): Promise<Quote> {
    if (!getSimStock(symbol)) throw new Error(`Für „${symbol}“ gibt es keine simulierten Daten.`);
    const day = this.getDay();
    const price = simPrice(symbol, day);
    const prev = simPrice(symbol, day - 1);
    return {
      symbol,
      price,
      currency: 'EUR',
      changePct: ((price - prev) / prev) * 100,
      asOf: `Simulierter Handelstag ${day}`,
      quality: 'simulated',
      source: 'MY STOCK ACADEMY Simulation',
    };
  }

  async getHistory(symbol: string, days: number) {
    return simCandles(symbol, this.getDay(), days).map((c) => ({ label: `T${c.day}`, close: c.close }));
  }
}

/**
 * Provider für einen eigenen Backend-Proxy. Erwartete Endpunkte:
 *   GET {base}/api/quote?symbol=SAP.DE   -> Quote-JSON
 *   GET {base}/api/history?symbol=SAP.DE&days=90 -> [{ label, close }]
 * Die Datenqualität (z. B. 'delayed') liefert der Server mit.
 */
export class ProxyProvider implements MarketDataProvider {
  readonly id = 'proxy';
  readonly label = 'Eigener Marktdaten-Proxy';
  readonly quality: DataQuality = 'delayed';
  constructor(private readonly baseUrl: string) {}

  private async request<T>(path: string): Promise<T> {
    const base = this.baseUrl.replace(/\/$/, '');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(`${base}${path}`, { signal: controller.signal });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Datenanbieter antwortet mit Status ${res.status}${text ? `: ${text.slice(0, 120)}` : ''}`);
      }
      return (await res.json()) as T;
    } catch (e) {
      if ((e as Error).name === 'AbortError') throw new Error('Zeitüberschreitung beim Abruf der Kursdaten.');
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }

  getQuote(symbol: string) {
    return this.request<Quote>(`/api/quote?symbol=${encodeURIComponent(symbol)}`);
  }

  getHistory(symbol: string, days: number) {
    return this.request<{ label: string; close: number }[]>(
      `/api/history?symbol=${encodeURIComponent(symbol)}&days=${days}`,
    );
  }
}

export const QUALITY_LABEL: Record<DataQuality, { label: string; description: string; tone: 'green' | 'amber' | 'blue' | 'violet' | 'gray' }> = {
  realtime: { label: 'Echtzeit', description: 'Aktuelle Kursdaten eines lizenzierten Anbieters.', tone: 'green' },
  delayed: { label: 'Verzögert', description: 'Kursdaten mit zeitlicher Verzögerung (meist 15–20 Minuten).', tone: 'amber' },
  historical: { label: 'Historisch', description: 'Vergangene Kursdaten, nicht aktuell.', tone: 'blue' },
  simulated: { label: 'Simuliert', description: 'Fiktive, computergenerierte Kurse zu Lernzwecken – keine echten Marktdaten.', tone: 'violet' },
  manual: { label: 'Manuell', description: 'Von dir selbst eingetragener Wert – Stand siehe Datum.', tone: 'gray' },
};
