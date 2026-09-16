import { useSyncExternalStore } from 'react'
import { getState, subscribe, type AppState } from './storage'

/** Liest den lokalen Zustand reaktiv. Komponenten aktualisieren sich bei Änderungen. */
export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, getState)
}
