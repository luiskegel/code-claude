import type { ReactNode } from 'react';

interface SettingRowProps {
  id: string;
  label: string;
  description?: ReactNode;
  children: ReactNode;
  /** Steuerelement unter statt neben der Beschriftung (für breite Auswahlen) */
  stacked?: boolean;
}

export function SettingRow({ id, label, description, children, stacked = false }: SettingRowProps) {
  return (
    <div
      className={
        stacked
          ? 'flex flex-col gap-3 py-4'
          : 'flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8'
      }
    >
      <div className="min-w-0">
        <p id={`${id}-label`} className="text-[15px] font-medium text-ink">
          {label}
        </p>
        {description && (
          <p id={`${id}-description`} className="mt-0.5 text-sm leading-relaxed text-ink-muted">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
