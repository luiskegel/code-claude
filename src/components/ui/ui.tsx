import { Fragment, useId, type ReactNode } from 'react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import type { DataQuality } from '@/types';
import { QUALITY_LABEL } from '@/lib/market/provider';

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article' }) {
  return <Tag className={cx('card card-pad animate-fade-up', className)}>{children}</Tag>;
}

export function CardHeader({ title, subtitle, icon, action }: { title: ReactNode; subtitle?: ReactNode; icon?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent">{icon}</div>}
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, subtitle, icon, actions }: { title: string; subtitle?: ReactNode; icon?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && <div className="rounded-xl bg-accent/10 p-2.5 text-accent">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 max-w-3xl text-sm text-slate-400 sm:text-base">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

type Tone = 'green' | 'red' | 'amber' | 'blue' | 'violet' | 'gray';
const toneClass: Record<Tone, string> = {
  green: 'bg-accent/10 text-accent-glow ring-accent/20',
  red: 'bg-loss/10 text-rose-300 ring-loss/20',
  amber: 'bg-warn/10 text-amber-300 ring-warn/20',
  blue: 'bg-sky-500/10 text-sky-300 ring-sky-500/20',
  violet: 'bg-violet-500/10 text-violet-300 ring-violet-500/20',
  gray: 'bg-white/5 text-slate-300 ring-white/10',
};

export function Badge({ children, tone = 'gray', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', toneClass[tone], className)}>
      {children}
    </span>
  );
}

export function DataBadge({ quality, detail }: { quality: DataQuality; detail?: string }) {
  const q = QUALITY_LABEL[quality];
  return (
    <span title={`${q.description}${detail ? ` ${detail}` : ''}`}>
      <Badge tone={q.tone}>Daten: {q.label}</Badge>
    </span>
  );
}

export function ProgressBar({ value, className, label }: { value: number; className?: string; label?: string }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div
      className={cx('h-2 w-full overflow-hidden rounded-full bg-white/[0.06]', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-label={label}
    >
      <div className="h-full rounded-full bg-gradient-to-r from-accent-soft to-accent-glow transition-all duration-500" style={{ width: `${v * 100}%` }} />
    </div>
  );
}

export function Stat({ label, value, hint, tone, icon }: { label: string; value: ReactNode; hint?: ReactNode; tone?: 'up' | 'down'; icon?: ReactNode }) {
  return (
    <div className="card card-pad animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="truncate pr-2 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
        {icon && <span className="text-slate-500">{icon}</span>}
      </div>
      <p className={cx('num mt-2 text-2xl font-semibold', tone === 'up' && 'text-accent-glow', tone === 'down' && 'text-rose-300', !tone && 'text-white')}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 'any',
  suffix,
  help,
  error,
}: {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  min?: number;
  max?: number;
  step?: number | 'any';
  suffix?: string;
  help?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className={cx('input num', suffix && 'pr-12', error && 'border-loss/60')}
          value={value}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          aria-describedby={error || help ? `${id}-d` : undefined}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
        {suffix && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-500">{suffix}</span>}
      </div>
      {(error || help) && (
        <p id={`${id}-d`} className={cx('mt-1 text-xs', error ? 'text-rose-300' : 'text-slate-500')}>
          {error ?? help}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} className="input" rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function Callout({ tone = 'info', title, children }: { tone?: 'info' | 'warn' | 'risk'; title?: string; children: ReactNode }) {
  const styles = {
    info: 'border-sky-500/20 bg-sky-500/[0.06] text-sky-100',
    warn: 'border-warn/25 bg-warn/[0.07] text-amber-100',
    risk: 'border-loss/30 bg-loss/[0.08] text-rose-100',
  }[tone];
  const Icon = tone === 'info' ? Info : tone === 'warn' ? AlertTriangle : ShieldAlert;
  return (
    <div className={cx('flex gap-3 rounded-xl border p-4 text-sm', styles)} role={tone === 'risk' ? 'alert' : 'note'}>
      <Icon className="mt-0.5 h-5 w-5 flex-none" aria-hidden />
      <div>
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <Callout tone="warn" title="Hinweis">
      {children ?? 'Modellrechnung zu Lernzwecken – keine Prognose, keine Garantie und keine Anlageberatung. Tatsächliche Ergebnisse können deutlich abweichen; Verluste sind möglich.'}
    </Callout>
  );
}

/** Rendert Text mit **fett**-Markierungen sicher (ohne innerHTML). */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className="font-semibold text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1 rounded-xl border border-white/[0.06] bg-ink-950/50 p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            'rounded-lg px-3 py-1.5 text-sm transition',
            value === t.id ? 'bg-accent/15 text-accent-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function ResultRow({ label, value, strong, tone }: { label: string; value: ReactNode; strong?: boolean; tone?: 'up' | 'down' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-2 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={cx('num text-right', strong ? 'text-lg font-semibold text-white' : 'text-sm text-slate-100', tone === 'up' && '!text-accent-glow', tone === 'down' && '!text-rose-300')}>
        {value}
      </span>
    </div>
  );
}

export const CHART = {
  grid: 'rgba(255,255,255,0.06)',
  axis: '#64748b',
  green: '#22c55e',
  greenSoft: 'rgba(34,197,94,0.25)',
  red: '#f43f5e',
  blue: '#38bdf8',
  violet: '#a78bfa',
  amber: '#f59e0b',
  tooltip: {
    contentStyle: { background: '#0f1729', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 },
    labelStyle: { color: '#cbd5e1' },
    itemStyle: { color: '#e2e8f0' },
  },
};
