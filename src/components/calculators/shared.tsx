import { useState, type ReactNode } from 'react';
import { FlaskConical, RotateCcw, Sigma } from 'lucide-react';
import { Callout } from '@/components/ui/ui';

export type FormValues = Record<string, number | ''>;

/** Kleiner Formular-Hook mit Zurücksetzen und Beispielwerten. */
export function useCalcForm<K extends string>(defaults: Record<K, number | ''>, example: Record<K, number | ''>) {
  type T = Record<K, number | ''>;
  const [values, setValues] = useState<T>(defaults);
  const set = (key: K) => (v: number | '') => setValues((s) => ({ ...s, [key]: v }));
  return {
    values,
    set,
    reset: () => setValues(defaults),
    loadExample: () => setValues(example),
  };
}

export const n = (v: number | '') => (v === '' ? NaN : v);

export function validate(rules: [boolean, string][]): string | null {
  for (const [ok, msg] of rules) if (!ok) return msg;
  return null;
}

export function CalcShell({
  title,
  description,
  explanation,
  formula,
  inputs,
  results,
  chart,
  error,
  onReset,
  onExample,
  compact,
}: {
  title: string;
  description: string;
  explanation: ReactNode;
  formula?: string;
  inputs: ReactNode;
  results: ReactNode;
  chart?: ReactNode;
  error?: string | null;
  onReset: () => void;
  onExample: () => void;
  compact?: boolean;
}) {
  return (
    <div className="space-y-5">
      {!compact && (
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-5">
        <form className="space-y-4 lg:col-span-2" onSubmit={(e) => e.preventDefault()} aria-label={`Eingaben ${title}`}>
          {inputs}
          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" className="btn-secondary" onClick={onExample}>
              <FlaskConical className="h-4 w-4" /> Beispielwerte
            </button>
            <button type="button" className="btn-ghost" onClick={onReset}>
              <RotateCcw className="h-4 w-4" /> Zurücksetzen
            </button>
          </div>
        </form>
        <div className="space-y-4 lg:col-span-3" aria-live="polite">
          {error ? <Callout tone="warn" title="Eingabe prüfen">{error}</Callout> : results}
          {!error && chart && <div className="h-64 w-full rounded-xl border border-white/[0.05] bg-ink-950/40 p-2 sm:h-72">{chart}</div>}
        </div>
      </div>
      <details className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-slate-200">
          <Sigma className="h-4 w-4 text-accent" /> So wird gerechnet
        </summary>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-400">
          {formula && <p className="rounded-lg bg-ink-950/60 px-3 py-2 font-mono text-xs text-accent-glow">{formula}</p>}
          {explanation}
        </div>
      </details>
    </div>
  );
}
