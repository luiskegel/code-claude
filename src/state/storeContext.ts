import { createContext } from 'react';
import type { AppStore } from './store';

export const StoreContext = createContext<AppStore | null>(null);
