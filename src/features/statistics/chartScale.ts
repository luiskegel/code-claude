export interface NiceScale {
  min: number;
  max: number;
  ticks: number[];
}

/** Rundet auf „schöne“ Schrittweiten (1, 2, 2,5, 5, 10 …), damit die Achse saubere Werte zeigt. */
function niceStep(range: number, targetTicks: number): number {
  const rough = range / Math.max(1, targetTicks);
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const residual = rough / magnitude;
  const factor =
    residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 2.5 ? 2.5 : residual <= 5 ? 5 : 10;
  return factor * magnitude;
}

export function niceScale(dataMin: number, dataMax: number, targetTicks = 4): NiceScale {
  const low = Math.min(dataMin, dataMax);
  const high = Math.max(dataMin, dataMax);
  const range = high - low || Math.max(1, Math.abs(high) * 0.2);
  const step = niceStep(range, targetTicks);
  const min = Math.floor(low / step) * step;
  let max = Math.ceil(high / step) * step;
  if (max === min) max = min + step;
  const ticks: number[] = [];
  for (let value = min; value <= max + step / 2; value += step) {
    ticks.push(Math.round(value * 1000) / 1000);
  }
  return { min, max, ticks };
}
