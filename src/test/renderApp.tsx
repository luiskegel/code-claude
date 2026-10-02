import { render } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { App } from '../app/App';
import { routes } from '../app/routes';
import { STORAGE_KEYS } from '../config/storageKeys';
import { DEFAULT_SETTINGS, type UserSettings } from '../domain/settings/settings';
import { createMemoryStorage, type KeyValueStorage } from '../domain/storage/storage';
import { createAppStore } from '../state/store';

interface RenderAppOptions {
  path?: string;
  settings?: Partial<UserSettings>;
  storage?: KeyValueStorage;
  /** false simuliert einen Browser ohne dauerhaften Speicher */
  persistent?: boolean;
}

/** Rendert die komplette App mit Speicher im Arbeitsspeicher und Router ohne Browser-URL. */
export function renderApp({
  path = '/',
  settings,
  storage = createMemoryStorage(),
  persistent = true,
}: RenderAppOptions = {}) {
  if (settings) {
    storage.setItem(STORAGE_KEYS.settings, JSON.stringify({ ...DEFAULT_SETTINGS, ...settings }));
  }
  const store = createAppStore(storage, persistent);
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const view = render(<App store={store} router={router} />);
  return { ...view, store, router, storage };
}
