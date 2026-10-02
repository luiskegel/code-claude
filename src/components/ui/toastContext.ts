import { createContext, useContext } from 'react';

export type ToastTone = 'success' | 'info' | 'warning';

export interface ToastInput {
  title: string;
  description?: string;
  tone?: ToastTone;
}

export interface ToastApi {
  show(toast: ToastInput): void;
}

export const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast() muss innerhalb von <ToastProvider> verwendet werden.');
  return api;
}
