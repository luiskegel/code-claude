/** Deterministischer Zufallsgenerator (mulberry32) – reproduzierbare Übungen und Tests. */
export interface Rng {
  /** Gleichverteilte Zahl in [0, 1) */
  next(): number;
  /** Ganze Zahl in [min, max] (beide inklusive) */
  int(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
  weightedPick<T>(items: readonly T[], weightOf: (item: T) => number): T;
  shuffle<T>(items: readonly T[]): T[];
}

export function createRng(seed: number): Rng {
  let state = seed >>> 0;

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number): number => min + Math.floor(next() * (max - min + 1));

  const pick = <T>(items: readonly T[]): T => {
    if (items.length === 0) throw new Error('pick() auf leerer Liste');
    return items[Math.floor(next() * items.length)] as T;
  };

  const weightedPick = <T>(items: readonly T[], weightOf: (item: T) => number): T => {
    if (items.length === 0) throw new Error('weightedPick() auf leerer Liste');
    const weights = items.map((item) => Math.max(0, weightOf(item)));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    if (total <= 0) return pick(items);
    let threshold = next() * total;
    for (let index = 0; index < items.length; index++) {
      threshold -= weights[index] ?? 0;
      if (threshold < 0) return items[index] as T;
    }
    return items[items.length - 1] as T;
  };

  const shuffle = <T>(items: readonly T[]): T[] => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
      const swap = Math.floor(next() * (index + 1));
      [result[index], result[swap]] = [result[swap] as T, result[index] as T];
    }
    return result;
  };

  return { next, int, pick, weightedPick, shuffle };
}

/** Neuer Startwert für eine Übung. */
export function randomSeed(): number {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    return crypto.getRandomValues(new Uint32Array(1))[0] ?? 1;
  }
  return Math.floor(Math.random() * 2 ** 32);
}
