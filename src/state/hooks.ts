import { useContext, useSyncExternalStore } from 'react';
import type { ProgressState } from '../domain/progress/types';
import type { UserSettings } from '../domain/settings/settings';
import type { AppActions, AppState, AppStore, StorageStatus } from './store';
import { StoreContext } from './storeContext';

export function useStore(): AppStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore() muss innerhalb von <StoreProvider> verwendet werden.');
  return store;
}

/**
 * Liest einen Ausschnitt des App-Zustands. Der Selektor muss eine stabile Referenz
 * zurückgeben (z. B. state.settings) – abgeleitete Werte bitte mit useMemo berechnen.
 */
export function useAppState<T>(selector: (state: AppState) => T): T {
  const store = useStore();
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  );
}

export function useSettings(): UserSettings {
  return useAppState((state) => state.settings);
}

export function useProgress(): ProgressState {
  return useAppState((state) => state.progress);
}

export function useStorageStatus(): StorageStatus {
  return useAppState((state) => state.storage);
}

/** Die Aktionen des Stores – stabile Funktionsreferenzen. */
export function useActions(): AppActions {
  return useStore();
}
