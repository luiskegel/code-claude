import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { BRAND } from '../config/brand';
import { toLocalDateKey } from '../domain/progress/dates';
import type { ThemePreference } from '../domain/settings/settings';
import { greetingForHour } from './format';

const CLOCK_INTERVAL_MS = 30_000;

/** Benachrichtigt bei Zeitfortschritt, Tab-Wechsel und Fokus – z. B. für Datumswechsel um Mitternacht. */
function subscribeToClock(callback: () => void): () => void {
  const interval = window.setInterval(callback, CLOCK_INTERVAL_MS);
  const onVisibility = () => {
    if (document.visibilityState === 'visible') callback();
  };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('focus', callback);
  return () => {
    window.clearInterval(interval);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('focus', callback);
  };
}

function getTodaySnapshot(): string {
  return toLocalDateKey(new Date());
}

function getGreetingSnapshot(): string {
  return greetingForHour(new Date().getHours());
}

/** Heutiges Datum als Schlüssel „JJJJ-MM-TT“ – aktualisiert sich nach Mitternacht. */
export function useToday(): string {
  return useSyncExternalStore(subscribeToClock, getTodaySnapshot, getTodaySnapshot);
}

/** Begrüßung passend zur Tageszeit. */
export function useGreeting(): string {
  return useSyncExternalStore(subscribeToClock, getGreetingSnapshot, getGreetingSnapshot);
}

function supportsMatchMedia(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (!supportsMatchMedia()) return () => {};
      const list = window.matchMedia(query);
      list.addEventListener('change', callback);
      return () => list.removeEventListener('change', callback);
    },
    [query],
  );
  const getSnapshot = () => (supportsMatchMedia() ? window.matchMedia(query).matches : false);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export type ResolvedTheme = 'light' | 'dark';

export function useResolvedTheme(preference: ThemePreference): ResolvedTheme {
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  if (preference === 'system') return systemDark ? 'dark' : 'light';
  return preference;
}

/** Animationen nur, wenn weder System noch App reduzierte Bewegung wünschen. */
export function useReducedMotion(animationsEnabled: boolean): boolean {
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return systemReduced || !animationsEnabled;
}

/**
 * Scrollt nach oben, wenn sich `key` ändert (z. B. beim Wechsel Einführung → Übung → Ergebnis).
 * Beim ersten Rendern übernimmt das die Scroll-Wiederherstellung des Routers.
 */
export function useScrollToTop(key: string): void {
  const lastKey = useRef(key);
  useEffect(() => {
    if (lastKey.current === key) return;
    lastKey.current = key;
    window.scrollTo({ top: 0, left: 0 });
  }, [key]);
}

export function usePageTitle(title: string | null): void {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND.name}` : `${BRAND.name} – ${BRAND.tagline}`;
  }, [title]);
}
