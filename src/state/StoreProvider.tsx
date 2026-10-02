import { useEffect, type ReactNode } from 'react';
import { STORAGE_KEYS } from '../config/storageKeys';
import type { AppStore } from './store';
import { StoreContext } from './storeContext';

const WATCHED_KEYS = new Set<string>(Object.values(STORAGE_KEYS));

interface StoreProviderProps {
  store: AppStore;
  children: ReactNode;
}

/** Stellt den Store bereit und synchronisiert Änderungen aus anderen Tabs. */
export function StoreProvider({ store, children }: StoreProviderProps) {
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      // key === null bedeutet: localStorage wurde komplett geleert.
      if (event.key === null || WATCHED_KEYS.has(event.key)) store.reloadFromStorage();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [store]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}
