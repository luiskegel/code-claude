import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Icon, type IconName } from './Icon';
import { ToastContext, type ToastApi, type ToastInput, type ToastTone } from './toastContext';

interface ToastItem extends Required<Pick<ToastInput, 'title'>> {
  id: number;
  description?: string;
  tone: ToastTone;
}

const TOAST_DURATION_MS = 4500;

const TONE_ICON: Record<ToastTone, IconName> = {
  success: 'check-circle',
  info: 'info',
  warning: 'alert',
};

const TONE_CLASS: Record<ToastTone, string> = {
  success: 'text-success-ink',
  info: 'text-accent-ink',
  warning: 'text-warning-ink',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, number>());

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer !== undefined) window.clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      show(input) {
        const id = nextId.current++;
        const toast: ToastItem = {
          id,
          title: input.title,
          tone: input.tone ?? 'success',
          ...(input.description ? { description: input.description } : {}),
        };
        setToasts((list) => [...list.slice(-2), toast]);
        timers.current.set(
          id,
          window.setTimeout(() => dismiss(id), TOAST_DURATION_MS),
        );
      },
    }),
    [dismiss],
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      for (const timer of activeTimers.values()) window.clearTimeout(timer);
      activeTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-center gap-2 px-4 lg:inset-x-auto lg:right-6 lg:bottom-6 lg:items-end"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-raised"
          >
            <Icon
              name={TONE_ICON[toast.tone]}
              size={20}
              className={cn('mt-0.5 shrink-0', TONE_CLASS[toast.tone])}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-sm text-ink-muted">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="-m-1 rounded-lg p-1 text-ink-muted hover:bg-surface-2 hover:text-ink"
              aria-label="Hinweis schließen"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
