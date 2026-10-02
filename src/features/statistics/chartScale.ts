export interface NiceScale {
  min: number;
  max: number;
  ticks: number[];
}

export interface NiceScaleOptions {
  targetTicks?: number;
  /** Nur ganzzahlige Achsenwerte – für Größen, die ganzzahlig angezeigt werden (WPM, %). */
  integer?: boolean;
}

/** Rundet auf „schöne“ Schrittweiten (1, 2, 2,5, 5, 10 …), damit die Achse saubere Werte zeigt. */
function niceStep(range: number, targetTicks: number, integer: boolean): number {
  const rough = range / Math.max(1, targetTicks);
  if (integer && rough <= 1) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  for (const factor of [1, 2, 2.5, 5]) {
    const step = factor * magnitude;
    // 2,5 ergäbe bei ganzzahliger Anzeige doppelte Beschriftungen (z. B. 92,5 → „92“).
    if (residual <= factor && (!integer || Number.isInteger(step))) return step;
  }
  return 10 * magnitude;
}

export function niceScale(
  dataMin: number,
  dataMax: number,
  { targetTicks = 4, integer = false }: NiceScaleOptions = {},
): NiceScale {
  const low = Math.min(dataMin, dataMax);
  const high = Math.max(dataMin, dataMax);
  const range = high - low || Math.max(1, Math.abs(high) * 0.2);
  const step = niceStep(range, targetTicks, integer);
  const min = Math.floor(low / step) * step;
  let max = Math.ceil(high / step) * step;
  if (max === min) max = min + step;
  const ticks: number[] = [];
  for (let value = min; value <= max + step / 2; value += step) {
    ticks.push(Math.round(value * 1000) / 1000);
  }
  return { min, max, ticks };
}
