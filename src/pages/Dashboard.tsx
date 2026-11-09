import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Award, BookOpen, CheckCircle2, Clock, Flame, Lock, Sparkles, Trophy, Wallet } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { currentLevel, LEVELS, streak } from '@/lib/progress';
import { TOTAL_LESSONS } from '@/data/curriculum';
import { Card, CardHeader, CHART, ProgressBar, Stat, cx } from '@/components/ui/ui';
import { ContinueCard } from '@/components/ContinueCard';
import { fmtDateTime, fmtDuration, fmtEur, fmtPct } from '@/lib/format';
import { totalValue } from '@/lib/portfolio';

function greeting(name: string) {
  const h = new Date().getHours();
  const g = h < 11 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend';
  return name ? `${g}, ${name}!` : `${g}!`;
}

/** Punkteverlauf der letzten 30 Tage aus dem Aktivitätsprotokoll. */
function pointsSeries(activity: { at: string; points: number }[], total: number) {
  const days = 30;
  const byDay = new Map<string, number>();
  activity.forEach((a) => {
    const k = a.at.slice(0, 10);
    byDay.set(k, (byDay.get(k) ?? 0) + a.points);
  });
  const out: { day: string; points: number }[] = [];
  let running = total;
  const d = new Date();
  const keys: string[] = [];
  for (let i = 0; i < days; i++) {
    keys.unshift(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() - 1);
  }
  // rückwärts aufbauen: Punktestand am Ende jedes Tages
  const values: number[] = [];
  for (let i = keys.length - 1; i >= 0; i--) {
    values.unshift(running);
    running -= byDay.get(keys[i]) ?? 0;
  }
  keys.forEach((k, i) => out.push({ day: `${k.slice(8, 10)}.${k.slice(5, 7)}.`, points: Math.max(0, values[i]) }));
  return out;
}

export function Dashboard() {
  const { state } = useStore();
  const p = state.progress;
  const lvl = currentLevel(p, TOTAL_LESSONS);
  const s = streak(p.studyDays);
  const series = pointsSeries(p.activity, p.points);
  const depot = totalValue(state.portfolio);
  const depotPct = (depot / state.portfolio.startCapital - 1) * 100;
  return (
    <>
      <header className="mb-6">
        <p className="text-sm text-slate-400">Willkommen in deiner Aktien-Akademie</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{greeting(state.settings.name)}</h1>
        {!state.settings.name && (
          <p className="mt-1 text-sm text-slate-500">
            Tipp: Trage in den <Link className="text-accent-glow underline" to="/einstellungen">Einstellungen</Link> deinen Namen ein.
          </p>
        )}
      </header>

      <div className="mb-6">
        <ContinueCard />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Lernfortschritt" value={fmtPct(lvl.share * 100, 0)} hint={`${lvl.done} abgeschlossen · ${TOTAL_LESSONS - lvl.done} offen`} icon={<BookOpen className="h-4 w-4" />} />
        <Stat label="Punkte" value={p.points.toLocaleString('de-DE')} hint={`${lvl.passed} Modultests bestanden`} icon={<Trophy className="h-4 w-4" />} />
        <Stat label="Lernserie" value={`${s} ${s === 1 ? 'Tag' : 'Tage'}`} hint={`Lernzeit gesamt: ${fmtDuration(p.studySeconds)}`} icon={<Flame className="h-4 w-4" />} />
        <Stat
          label="Virtuelles Depot"
          value={fmtEur(depot, true)}
          tone={depotPct > 0.005 ? 'up' : depotPct < -0.005 ? 'down' : undefined}
          hint={`${fmtPct(depotPct, 2, true)} seit Start · Simulation`}
          icon={<Wallet className="h-4 w-4" />}
        />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Fortschrittsdiagramm" subtitle="Punktestand der letzten 30 Tage" icon={<Sparkles className="h-4 w-4" />} />
          <div className="h-60">
            <ResponsiveContainer>
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="gpts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.green} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={CHART.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="day" stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} minTickGap={20} />
                <YAxis stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} width={40} allowDecimals={false} />
                <Tooltip {...CHART.tooltip} />
                <Area type="monotone" dataKey="points" name="Punkte" stroke={CHART.green} fill="url(#gpts)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Aktuelle Lernstufe" icon={<Award className="h-4 w-4" />} />
          <p className="text-xs uppercase tracking-wide text-accent-glow">Stufe {lvl.current.level}</p>
          <p className="text-xl font-semibold text-white">{lvl.current.title}</p>
          <p className="mt-1 text-sm text-slate-400">{lvl.current.description}</p>
          {lvl.next && (
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-slate-400">
                <span>Nächste Stufe: {lvl.next.title}</span>
                <span>{Math.round(lvl.toNext * 100)} %</span>
              </div>
              <ProgressBar value={lvl.toNext} label="Fortschritt zur nächsten Stufe" />
              <p className="mt-2 text-xs text-slate-500">
                Benötigt: {Math.round(lvl.next.minLessonShare * 100)} % der Lektionen und {lvl.next.minPassedTests} bestandene Modultests.
              </p>
            </div>
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Lernstufen" subtitle="Steige durch Lektionen und bestandene Tests auf." icon={<Trophy className="h-4 w-4" />} />
          <ol className="space-y-2">
            {LEVELS.map((l) => {
              const reached = l.level <= lvl.current.level;
              return (
                <li key={l.level} className={cx('flex items-center gap-3 rounded-xl border p-3', reached ? 'border-accent/25 bg-accent/[0.05]' : 'border-white/[0.06]')}>
                  <span className={cx('grid h-8 w-8 flex-none place-items-center rounded-lg text-sm font-semibold', reached ? 'bg-accent text-ink-950' : 'bg-white/5 text-slate-500')}>{l.level}</span>
                  <div className="min-w-0 flex-1">
                    <p className={cx('text-sm font-medium', reached ? 'text-white' : 'text-slate-400')}>{l.title}</p>
                    <p className="truncate text-xs text-slate-500">
                      {l.level === 1 ? 'Startstufe' : `${Math.round(l.minLessonShare * 100)} % der Lektionen · ${l.minPassedTests} Tests bestanden`}
                    </p>
                  </div>
                  {reached ? <CheckCircle2 className="h-5 w-5 text-accent" aria-label="erreicht" /> : <Lock className="h-4 w-4 text-slate-600" aria-label="noch nicht erreicht" />}
                </li>
              );
            })}
          </ol>
        </Card>
        <Card>
          <CardHeader title="Letzte Aktivitäten" icon={<Clock className="h-4 w-4" />} />
          {p.activity.length === 0 ? (
            <p className="text-sm text-slate-400">Noch keine Aktivitäten. Starte mit deiner ersten Lektion!</p>
          ) : (
            <ul className="divide-y divide-white/[0.05]">
              {p.activity.slice(0, 8).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-slate-200">{a.text}</p>
                    <p className="text-xs text-slate-500">{fmtDateTime(a.at)}</p>
                  </div>
                  {a.points > 0 && <span className="num flex-none text-xs text-accent-glow">+{a.points}</span>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
