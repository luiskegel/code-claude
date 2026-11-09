import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import {
  averagePrice,
  breakEven,
  cagr,
  compoundInterest,
  diversification,
  dividendProjection,
  eps as epsFn,
  lossCalc,
  peRatio,
  recoveryNeeded,
  savingsPlan,
  simpleReturn,
} from '@/lib/calculations';
import { fmtEur, fmtNum, fmtPct } from '@/lib/format';
import { CHART, Disclaimer, NumberField, ResultRow, Badge } from '@/components/ui/ui';
import { CalcShell, n, useCalcForm, validate } from './shared';

const axisProps = { stroke: CHART.axis, fontSize: 11, tickLine: false, axisLine: false } as const;
const eurTick = (v: number) => (Math.abs(v) >= 1000 ? `${fmtNum(v / 1000, 0)}k` : fmtNum(v, 0));
const PIE_COLORS = ['#22c55e', '#38bdf8', '#a78bfa', '#f59e0b', '#f43f5e', '#14b8a6', '#eab308', '#64748b', '#ec4899', '#84cc16'];

type P = { compact?: boolean };

// 1. Renditerechner -------------------------------------------------------
export function ReturnCalc({ compact }: P) {
  const f = useCalcForm({ start: 1000, end: 1250, income: 60, years: 3 }, { start: 5000, end: 6400, income: 300, years: 5 });
  const { start, end, income, years } = f.values;
  const error = validate([
    [n(start) > 0, 'Der Anfangswert muss größer als 0 sein.'],
    [n(end) >= 0, 'Der Endwert darf nicht negativ sein.'],
    [n(income) >= 0 || income === '', 'Ausschüttungen dürfen nicht negativ sein.'],
    [n(years) > 0, 'Die Anlagedauer muss größer als 0 sein.'],
  ]);
  const res = useMemo(() => {
    if (error) return null;
    const total = simpleReturn(+start, +end, +(income || 0));
    const p = cagr(+start, +end + +(income || 0), +years);
    return { total, p, gain: +end - +start + +(income || 0) };
  }, [error, start, end, income, years]);
  return (
    <CalcShell
      compact={compact}
      title="Renditerechner"
      description="Berechnet die Gesamtrendite und die durchschnittliche jährliche Rendite einer Anlage."
      formula="Gesamtrendite = (Endwert − Anfangswert + Ausschüttungen) / Anfangswert   |   p. a. = (Endwert inkl. Ausschüttungen / Anfangswert)^(1/Jahre) − 1"
      explanation={<p>Die Gesamtrendite zeigt den gesamten Zuwachs. Die jährliche Rendite (CAGR) rechnet diesen Zuwachs auf ein Jahr um – so lassen sich Anlagen mit unterschiedlicher Dauer vergleichen. Ausschüttungen werden vereinfacht dem Endwert zugeschlagen.</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Anfangswert" suffix="€" value={start} onChange={f.set('start')} min={0} />
          <NumberField label="Endwert" suffix="€" value={end} onChange={f.set('end')} min={0} />
          <NumberField label="Erhaltene Dividenden/Ausschüttungen" suffix="€" value={income} onChange={f.set('income')} min={0} />
          <NumberField label="Anlagedauer" suffix="Jahre" value={years} onChange={f.set('years')} min={0} />
        </>
      }
      results={
        res && (
          <div>
            <ResultRow label="Gewinn / Verlust" value={fmtEur(res.gain)} tone={res.gain >= 0 ? 'up' : 'down'} />
            <ResultRow label="Gesamtrendite" value={fmtPct(res.total, 2, true)} strong tone={res.total >= 0 ? 'up' : 'down'} />
            <ResultRow label="Durchschnittliche Rendite pro Jahr" value={fmtPct(res.p, 2, true)} />
          </div>
        )
      }
      chart={
        res && (
          <ResponsiveContainer>
            <BarChart data={[{ name: 'Anfangswert', v: +start }, { name: 'Endwert', v: +end }, { name: 'inkl. Ausschüttung', v: +end + +(income || 0) }]}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="name" {...axisProps} />
              <YAxis {...axisProps} tickFormatter={eurTick} width={48} />
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} />
              <Bar dataKey="v" name="Wert" radius={[6, 6, 0, 0]}>
                {[0, 1, 2].map((i) => (
                  <Cell key={i} fill={i === 0 ? CHART.blue : CHART.green} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )
      }
    />
  );
}

// 2. Zinseszinsrechner ----------------------------------------------------
export function CompoundCalc({ compact }: P) {
  const f = useCalcForm({ principal: 10000, rate: 6, years: 30 }, { principal: 5000, rate: 7, years: 20 });
  const { principal, rate, years } = f.values;
  const error = validate([
    [n(principal) > 0, 'Der Anlagebetrag muss größer als 0 sein.'],
    [n(rate) > -100 && n(rate) <= 50, 'Bitte eine Rendite zwischen −99 % und 50 % eingeben.'],
    [n(years) >= 1 && n(years) <= 80 && Number.isInteger(n(years)), 'Bitte eine ganze Zahl von Jahren zwischen 1 und 80 eingeben.'],
  ]);
  const data = useMemo(() => {
    if (error) return [];
    const withC = compoundInterest(+principal, +rate, +years);
    return withC.map((p) => ({ ...p, simple: +principal * (1 + (+rate / 100) * p.year) }));
  }, [error, principal, rate, years]);
  const last = data[data.length - 1];
  return (
    <CalcShell
      compact={compact}
      title="Zinseszinsrechner"
      description="Zeigt, wie ein einmaliger Betrag wächst, wenn Erträge jedes Jahr wieder angelegt werden – im Vergleich zur Entnahme der Erträge."
      formula="Endwert = Anfangswert × (1 + Rendite)^Jahre"
      explanation={<p>Beim Zinseszins werden Erträge reinvestiert und bringen selbst Erträge. Die graue Linie zeigt zum Vergleich die Entwicklung, wenn die Erträge jedes Jahr entnommen würden (einfache Verzinsung). Faustformel: Verdopplung nach ca. 72 / Rendite Jahren.</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Anlagebetrag" suffix="€" value={principal} onChange={f.set('principal')} min={0} />
          <NumberField label="Angenommene Rendite pro Jahr" suffix="%" value={rate} onChange={f.set('rate')} step={0.1} />
          <NumberField label="Anlagedauer" suffix="Jahre" value={years} onChange={f.set('years')} min={1} step={1} />
        </>
      }
      results={
        last && (
          <div className="space-y-3">
            <div>
              <ResultRow label="Endwert mit Zinseszins" value={fmtEur(last.value)} strong tone="up" />
              <ResultRow label="Endwert ohne Zinseszins" value={fmtEur(last.simple)} />
              <ResultRow label="Zinseszins-Effekt" value={fmtEur(last.value - last.simple)} />
              <ResultRow label="Verdopplung nach ca. (72er-Regel)" value={+rate > 0 ? `${fmtNum(72 / +rate, 1)} Jahren` : '–'} />
            </div>
            <Disclaimer />
          </div>
        )
      }
      chart={
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gcomp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART.green} stopOpacity={0.35} />
                <stop offset="100%" stopColor={CHART.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="year" {...axisProps} />
            <YAxis {...axisProps} tickFormatter={eurTick} width={48} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Jahr ${l}`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="value" name="Mit Zinseszins" stroke={CHART.green} fill="url(#gcomp)" strokeWidth={2} />
            <Area type="monotone" dataKey="simple" name="Ohne Zinseszins" stroke={CHART.axis} fill="transparent" strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
}

// 3. Dividendenrechner ----------------------------------------------------
export function DividendCalc({ compact }: P) {
  const f = useCalcForm(
    { investment: 5000, price: 50, shares: '', dps: 2, growth: 5, years: 15, tax: 0 },
    { investment: 10000, price: 64, shares: '', dps: 2.2, growth: 6, years: 20, tax: 26.375 },
  );
  const [reinvest, setReinvest] = useState(false);
  const { investment, price, shares, dps, growth, years, tax } = f.values;
  const error = validate([
    [n(price) > 0, 'Der Aktienkurs muss größer als 0 sein.'],
    [n(investment) > 0 || n(shares) > 0, 'Bitte eine Investitionssumme oder eine Anzahl Aktien eingeben.'],
    [shares === '' || n(shares) >= 0, 'Die Anzahl der Aktien darf nicht negativ sein.'],
    [n(dps) >= 0, 'Die Dividende je Aktie darf nicht negativ sein.'],
    [n(growth) >= -50 && n(growth) <= 50, 'Bitte eine Dividendensteigerung zwischen −50 % und 50 % eingeben.'],
    [n(years) >= 1 && n(years) <= 60 && Number.isInteger(n(years)), 'Bitte eine ganze Zahl von Jahren zwischen 1 und 60 eingeben.'],
    [tax === '' || (n(tax) >= 0 && n(tax) < 100), 'Der Steuersatz muss zwischen 0 und 100 % liegen.'],
  ]);
  const data = useMemo(
    () =>
      error
        ? []
        : dividendProjection({
            investment: +(investment || 0),
            price: +price,
            shares: shares === '' ? undefined : +shares,
            dividendPerShare: +dps,
            growthPct: +growth,
            years: +years,
            reinvest,
            taxPct: +(tax || 0),
          }),
    [error, investment, price, shares, dps, growth, years, reinvest, tax],
  );
  const first = data[0];
  const last = data[data.length - 1];
  return (
    <CalcShell
      compact={compact}
      title="Dividendenrechner"
      description="Modellrechnung: Welche Dividenden ergeben sich aus deinen Annahmen über Kurs, Dividende und Dividendenwachstum?"
      formula="Dividende Jahr n = Stückzahl × Dividende je Aktie × (1 + Steigerung)^(n−1) × (1 − Steuersatz)"
      explanation={
        <>
          <p>Die Stückzahl ergibt sich aus der Investitionssumme geteilt durch den Kurs – oder aus deiner direkten Eingabe (hat Vorrang). Die Dividende wächst jedes Jahr um die angenommene Steigerung. Bei Reinvestition werden die Netto-Dividenden zum gleichbleibenden Kurs in neue Aktien angelegt (vereinfachte Annahme).</p>
          <p>Wichtig: Dividenden können jederzeit gekürzt oder gestrichen werden. Kursveränderungen sind hier nicht berücksichtigt.</p>
        </>
      }
      onReset={() => {
        f.reset();
        setReinvest(false);
      }}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Investitionssumme" suffix="€" value={investment} onChange={f.set('investment')} min={0} />
          <NumberField label="Aktienkurs" suffix="€" value={price} onChange={f.set('price')} min={0} />
          <NumberField label="Anzahl der Aktien (optional)" suffix="Stk." value={shares} onChange={f.set('shares')} min={0} help="Leer lassen, um aus der Investitionssumme zu rechnen." />
          <NumberField label="Dividende je Aktie (jährlich)" suffix="€" value={dps} onChange={f.set('dps')} min={0} step={0.01} />
          <NumberField label="Jährliche Dividendensteigerung" suffix="%" value={growth} onChange={f.set('growth')} step={0.5} />
          <NumberField label="Zeitraum" suffix="Jahre" value={years} onChange={f.set('years')} min={1} step={1} />
          <NumberField label="Steuersatz (optional)" suffix="%" value={tax} onChange={f.set('tax')} min={0} step={0.001} help="Z. B. 26,375 % Abgeltungsteuer inkl. Soli – vereinfachend ohne Pauschbetrag." />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" className="h-4 w-4 accent-green-500" checked={reinvest} onChange={(e) => setReinvest(e.target.checked)} />
            Dividenden reinvestieren
          </label>
        </>
      }
      results={
        last && (
          <div className="space-y-3">
            <Badge tone="amber">Modellrechnung – keine garantierten Einnahmen</Badge>
            <div>
              <ResultRow label="Anfängliche Dividendenrendite" value={fmtPct((+dps / +price) * 100)} />
              <ResultRow label="Dividende im 1. Jahr" value={fmtEur(first.payout)} />
              <ResultRow label={`Dividende im ${last.year}. Jahr`} value={fmtEur(last.payout)} />
              <ResultRow label="Rendite auf Einstand im letzten Jahr" value={fmtPct(last.yieldOnCost)} />
              <ResultRow label="Summe aller Dividenden" value={fmtEur(last.cumulative)} strong tone="up" />
              {reinvest && <ResultRow label="Stückzahl am Ende" value={fmtNum(last.shares, 2)} />}
            </div>
          </div>
        )
      }
      chart={
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="year" {...axisProps} />
            <YAxis {...axisProps} tickFormatter={eurTick} width={48} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Jahr ${l}`} />
            <Bar dataKey="payout" name="Dividende im Jahr" fill={CHART.green} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      }
    />
  );
}

// 4. Sparplanrechner ------------------------------------------------------
export function SavingsCalc({ compact }: P) {
  const f = useCalcForm({ initial: 0, monthly: 150, rate: 6, years: 25, cost: 0.2 }, { initial: 2000, monthly: 250, rate: 5, years: 30, cost: 0.2 });
  const { initial, monthly, rate, years, cost } = f.values;
  const error = validate([
    [n(initial) >= 0, 'Die Einmalanlage darf nicht negativ sein.'],
    [n(monthly) >= 0, 'Die Sparrate darf nicht negativ sein.'],
    [n(initial) + n(monthly) > 0, 'Bitte eine Einmalanlage oder Sparrate eingeben.'],
    [n(rate) > -50 && n(rate) <= 30, 'Bitte eine Rendite zwischen −50 % und 30 % eingeben.'],
    [n(years) >= 1 && n(years) <= 60 && Number.isInteger(n(years)), 'Bitte eine ganze Zahl von Jahren zwischen 1 und 60 eingeben.'],
    [n(cost) >= 0 && n(cost) < 10, 'Die Kosten müssen zwischen 0 und 10 % liegen.'],
  ]);
  const data = useMemo(() => (error ? [] : savingsPlan(+initial, +monthly, +rate, +years, +cost)), [error, initial, monthly, rate, years, cost]);
  const last = data[data.length - 1];
  return (
    <CalcShell
      compact={compact}
      title="Sparplanrechner"
      description="Wie entwickelt sich ein monatlicher Sparplan bei einer angenommenen Rendite und laufenden Kosten?"
      formula="Monatlich: Wert = Wert × (1 + r_m) + Sparrate,  mit r_m = (1 + Rendite − Kosten)^(1/12) − 1"
      explanation={<p>Die Sparrate wird jeweils am Monatsende eingezahlt, der Bestand wächst monatlich mit der um die Kosten (z. B. TER) verminderten Rendite. In der Realität schwanken die Renditen stark – es gibt auch Jahre mit Verlusten. Steuern sind nicht berücksichtigt.</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Einmalanlage zu Beginn" suffix="€" value={initial} onChange={f.set('initial')} min={0} />
          <NumberField label="Monatliche Sparrate" suffix="€" value={monthly} onChange={f.set('monthly')} min={0} />
          <NumberField label="Angenommene Rendite p. a." suffix="%" value={rate} onChange={f.set('rate')} step={0.1} />
          <NumberField label="Laufende Kosten p. a. (z. B. TER)" suffix="%" value={cost} onChange={f.set('cost')} step={0.05} min={0} />
          <NumberField label="Laufzeit" suffix="Jahre" value={years} onChange={f.set('years')} step={1} min={1} />
        </>
      }
      results={
        last && (
          <div className="space-y-3">
            <div>
              <ResultRow label="Eingezahlt" value={fmtEur(last.invested)} />
              <ResultRow label="Wertzuwachs (Modell)" value={fmtEur(last.gain)} tone={last.gain >= 0 ? 'up' : 'down'} />
              <ResultRow label="Endwert (Modell)" value={fmtEur(last.value)} strong />
            </div>
            <Disclaimer />
          </div>
        )
      }
      chart={
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="year" {...axisProps} />
            <YAxis {...axisProps} tickFormatter={eurTick} width={48} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Jahr ${l}`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="invested" name="Eingezahlt" stroke={CHART.blue} fill="rgba(56,189,248,0.15)" />
            <Area type="monotone" dataKey="value" name="Depotwert (Modell)" stroke={CHART.green} fill={CHART.greenSoft} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
}

// 5. KGV-Rechner ----------------------------------------------------------
export function PECalc({ compact }: P) {
  const f = useCalcForm({ price: 42.5, eps: 2.4, sector: 16 }, { price: 128, eps: 3.2, sector: 30 });
  const { price, eps, sector } = f.values;
  const error = validate([
    [n(price) > 0, 'Der Aktienkurs muss größer als 0 sein.'],
    [!Number.isNaN(n(eps)), 'Bitte den Gewinn je Aktie eingeben.'],
  ]);
  const pe = error ? null : peRatio(+price, +eps);
  const data = pe ? [{ name: 'Aktie', v: pe }, ...(n(sector) > 0 ? [{ name: 'Branche', v: +sector }] : [])] : [];
  return (
    <CalcShell
      compact={compact}
      title="KGV-Rechner"
      description="Berechnet das Kurs-Gewinn-Verhältnis und vergleicht es mit einem Branchenwert."
      formula="KGV = Aktienkurs / Gewinn je Aktie   |   Gewinnrendite = 1 / KGV"
      explanation={<p>Das KGV zeigt, wie viele aktuelle Jahresgewinne du für eine Aktie bezahlst. Die Gewinnrendite (Kehrwert) lässt sich mit Zinsen vergleichen. Bei Verlusten (negativer Gewinn) ist das KGV nicht sinnvoll interpretierbar. Vergleiche das KGV immer mit der Branche und der eigenen Historie.</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Aktienkurs" suffix="€" value={price} onChange={f.set('price')} min={0} />
          <NumberField label="Gewinn je Aktie (EPS)" suffix="€" value={eps} onChange={f.set('eps')} step={0.01} />
          <NumberField label="Branchen-KGV zum Vergleich (optional)" value={sector} onChange={f.set('sector')} min={0} />
        </>
      }
      results={
        pe === null ? (
          <div className="rounded-xl border border-warn/30 bg-warn/[0.06] p-4 text-sm text-amber-100">
            Das Unternehmen macht Verlust (EPS ≤ 0). Ein KGV ist hier nicht aussagekräftig – nutze z. B. das KUV.
          </div>
        ) : (
          <div>
            <ResultRow label="KGV" value={fmtNum(pe, 1)} strong />
            <ResultRow label="Gewinnrendite" value={fmtPct(100 / pe)} />
            {n(sector) > 0 && (
              <ResultRow
                label="Im Vergleich zur Branche"
                value={pe < +sector ? `${fmtPct((1 - pe / +sector) * 100, 0)} niedriger` : `${fmtPct((pe / +sector - 1) * 100, 0)} höher`}
              />
            )}
            <p className="mt-3 text-xs text-slate-500">Ein niedrigeres KGV ist kein automatisches Kaufsignal – prüfe Wachstum, Schulden und Gewinnqualität.</p>
          </div>
        )
      }
      chart={
        data.length > 0 && (
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical">
              <CartesianGrid stroke={CHART.grid} horizontal={false} />
              <XAxis type="number" {...axisProps} />
              <YAxis type="category" dataKey="name" {...axisProps} width={60} />
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtNum(v, 1)} />
              <Bar dataKey="v" name="KGV" radius={[0, 6, 6, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? CHART.green : CHART.blue} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )
      }
    />
  );
}

// 6. Gewinn-je-Aktie-Rechner ---------------------------------------------
export function EPSCalc({ compact }: P) {
  const f = useCalcForm({ income: 744, shares: 310, prevIncome: 700, prevShares: 320 }, { income: 500, shares: 90, prevIncome: 500, prevShares: 100 });
  const { income, shares, prevIncome, prevShares } = f.values;
  const error = validate([
    [!Number.isNaN(n(income)), 'Bitte den Nettogewinn eingeben.'],
    [n(shares) > 0, 'Die Anzahl der Aktien muss größer als 0 sein.'],
  ]);
  const cur = error ? 0 : epsFn(+income, +shares);
  const hasPrev = n(prevShares) > 0 && !Number.isNaN(n(prevIncome));
  const prev = hasPrev ? epsFn(+prevIncome, +prevShares) : null;
  const incomeGrowth = hasPrev && +prevIncome !== 0 ? (+income / +prevIncome - 1) * 100 : null;
  const epsGrowth = prev && prev !== 0 ? (cur / prev - 1) * 100 : null;
  return (
    <CalcShell
      compact={compact}
      title="Gewinn-je-Aktie-Rechner"
      description="Berechnet den Gewinn je Aktie (EPS) und zeigt, wie sich Gewinn und Aktienzahl auf das EPS-Wachstum auswirken."
      formula="EPS = Nettogewinn / Anzahl Aktien"
      explanation={<p>Der EPS kann auf zwei Wegen steigen: durch höheren Gewinn oder durch weniger Aktien (Aktienrückkäufe). Vergleichst du Vorjahr und aktuelles Jahr, erkennst du, welcher Effekt überwiegt. Gewinn und Aktienzahl in derselben Einheit eingeben (z. B. Mio. € und Mio. Stück).</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Nettogewinn (aktuell)" suffix="Mio. €" value={income} onChange={f.set('income')} />
          <NumberField label="Anzahl Aktien (aktuell)" suffix="Mio." value={shares} onChange={f.set('shares')} min={0} />
          <NumberField label="Nettogewinn (Vorjahr, optional)" suffix="Mio. €" value={prevIncome} onChange={f.set('prevIncome')} />
          <NumberField label="Anzahl Aktien (Vorjahr, optional)" suffix="Mio." value={prevShares} onChange={f.set('prevShares')} min={0} />
        </>
      }
      results={
        <div>
          <ResultRow label="Gewinn je Aktie (aktuell)" value={fmtEur(cur)} strong />
          {prev !== null && <ResultRow label="Gewinn je Aktie (Vorjahr)" value={fmtEur(prev)} />}
          {incomeGrowth !== null && <ResultRow label="Wachstum des Gesamtgewinns" value={fmtPct(incomeGrowth, 1, true)} />}
          {epsGrowth !== null && <ResultRow label="Wachstum des EPS" value={fmtPct(epsGrowth, 1, true)} tone={epsGrowth >= 0 ? 'up' : 'down'} />}
          {incomeGrowth !== null && epsGrowth !== null && Math.abs(epsGrowth - incomeGrowth) > 0.5 && (
            <p className="mt-3 text-xs text-slate-400">
              Der Unterschied von {fmtNum(epsGrowth - incomeGrowth, 1)} Prozentpunkten entsteht durch die veränderte Aktienzahl (z. B. Rückkäufe oder Kapitalerhöhungen).
            </p>
          )}
        </div>
      }
      chart={
        prev !== null && (
          <ResponsiveContainer>
            <BarChart data={[{ name: 'Vorjahr', v: prev }, { name: 'Aktuell', v: cur }]}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="name" {...axisProps} />
              <YAxis {...axisProps} width={40} />
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} />
              <Bar dataKey="v" name="EPS" fill={CHART.green} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    />
  );
}

// 7. Durchschnittlicher Kaufpreis ----------------------------------------
interface Purchase {
  shares: number | '';
  price: number | '';
  fee: number | '';
}
const DEFAULT_PURCHASES: Purchase[] = [
  { shares: 10, price: 100, fee: 1 },
  { shares: 10, price: 80, fee: 1 },
];
const EXAMPLE_PURCHASES: Purchase[] = [
  { shares: 3, price: 40, fee: 0 },
  { shares: 4, price: 30, fee: 0 },
  { shares: 5, price: 24, fee: 0 },
  { shares: 3, price: 40, fee: 0 },
];

export function AveragePriceCalc({ compact }: P) {
  const [rows, setRows] = useState<Purchase[]>(DEFAULT_PURCHASES);
  const [current, setCurrent] = useState<number | ''>(90);
  const update = (i: number, key: keyof Purchase) => (v: number | '') => setRows((r) => r.map((x, j) => (j === i ? { ...x, [key]: v } : x)));
  const invalid = rows.some((r) => n(r.shares) <= 0 || n(r.price) < 0 || Number.isNaN(n(r.price)) || (r.fee !== '' && n(r.fee) < 0));
  const error = invalid ? 'Bitte für jeden Kauf eine Stückzahl > 0, einen Kurs ≥ 0 und eine nicht negative Gebühr eingeben.' : null;
  const res = error ? null : averagePrice(rows.map((r) => ({ shares: +r.shares, price: +r.price, fee: +(r.fee || 0) })));
  const value = res && n(current) >= 0 ? res.totalShares * +current : null;
  return (
    <CalcShell
      compact={compact}
      title="Durchschnittlicher Kaufpreis"
      description="Berechnet deinen durchschnittlichen Einstandskurs über mehrere Käufe (Nachkäufe, Sparplan) inklusive Gebühren."
      formula="Durchschnittspreis = (Σ Stückzahl × Kurs + Σ Gebühren) / Σ Stückzahl"
      explanation={<p>Der Durchschnittspreis ist dein Einstandskurs. Erst darüber machst du Gewinn. Vorsicht: Nachkaufen bei fallenden Kursen („Verbilligen“) senkt zwar den Durchschnittspreis, erhöht aber auch dein Risiko in dieser einen Aktie.</p>}
      onReset={() => {
        setRows(DEFAULT_PURCHASES);
        setCurrent(90);
      }}
      onExample={() => {
        setRows(EXAMPLE_PURCHASES);
        setCurrent(40);
      }}
      error={error}
      inputs={
        <>
          {rows.map((r, i) => (
            <fieldset key={i} className="rounded-xl border border-white/[0.06] p-3">
              <legend className="px-1 text-xs text-slate-400">Kauf {i + 1}</legend>
              <div className="grid grid-cols-3 gap-2">
                <NumberField label="Stück" value={r.shares} onChange={update(i, 'shares')} min={0} />
                <NumberField label="Kurs €" value={r.price} onChange={update(i, 'price')} min={0} />
                <NumberField label="Gebühr €" value={r.fee} onChange={update(i, 'fee')} min={0} />
              </div>
              {rows.length > 1 && (
                <button type="button" className="btn-ghost mt-2 px-2 py-1 text-xs" onClick={() => setRows((x) => x.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" /> Entfernen
                </button>
              )}
            </fieldset>
          ))}
          {rows.length < 12 && (
            <button type="button" className="btn-secondary w-full" onClick={() => setRows((x) => [...x, { shares: 1, price: 50, fee: 0 }])}>
              <Plus className="h-4 w-4" /> Kauf hinzufügen
            </button>
          )}
          <NumberField label="Aktueller Kurs (optional)" suffix="€" value={current} onChange={setCurrent} min={0} />
        </>
      }
      results={
        res && (
          <div>
            <ResultRow label="Stückzahl gesamt" value={fmtNum(res.totalShares, 0)} />
            <ResultRow label="Investiert inkl. Gebühren" value={fmtEur(res.totalCost)} />
            <ResultRow label="Durchschnittlicher Kaufpreis" value={fmtEur(res.average)} strong />
            {value !== null && (
              <>
                <ResultRow label="Aktueller Wert" value={fmtEur(value)} />
                <ResultRow label="Gewinn / Verlust" value={`${fmtEur(value - res.totalCost)} (${fmtPct(((value - res.totalCost) / res.totalCost) * 100, 1, true)})`} tone={value >= res.totalCost ? 'up' : 'down'} />
              </>
            )}
          </div>
        )
      }
      chart={
        res && (
          <ResponsiveContainer>
            <BarChart data={rows.map((r, i) => ({ name: `Kauf ${i + 1}`, Kurs: +r.price }))}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="name" {...axisProps} />
              <YAxis {...axisProps} width={40} />
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} />
              <ReferenceLine y={res.average} stroke={CHART.amber} strokeDasharray="4 4" label={{ value: 'Ø Kaufpreis', fill: CHART.amber, fontSize: 11, position: 'insideTopRight' }} />
              <Bar dataKey="Kurs" fill={CHART.blue} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    />
  );
}

// 8. Verlustrechner -------------------------------------------------------
export function LossCalc({ compact }: P) {
  const f = useCalcForm({ buy: 100, current: 70, shares: 10 }, { buy: 50, current: 20, shares: 40 });
  const { buy, current, shares } = f.values;
  const error = validate([
    [n(buy) > 0, 'Der Kaufkurs muss größer als 0 sein.'],
    [n(current) >= 0, 'Der aktuelle Kurs darf nicht negativ sein.'],
    [n(shares) > 0, 'Die Stückzahl muss größer als 0 sein.'],
  ]);
  const res = error ? null : lossCalc(+buy, +current, +shares);
  const table = [10, 20, 30, 50, 70, 90].map((l) => ({ loss: `−${l} %`, needed: recoveryNeeded(l) }));
  return (
    <CalcShell
      compact={compact}
      title="Verlustrechner"
      description="Wie hoch ist dein Verlust – und wie stark muss die Aktie steigen, um ihn wieder auszugleichen?"
      formula="Benötigter Anstieg = 1 / (1 − Verlust) − 1"
      explanation={<p>Verluste wirken asymmetrisch: Nach −50 % braucht es +100 %, um den Ausgangswert zu erreichen. Das Diagramm zeigt den benötigten Anstieg für typische Verlusthöhen. Ob eine Aktie sich erholt, hängt vom Unternehmen ab – nicht vom Kaufkurs.</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Kaufkurs" suffix="€" value={buy} onChange={f.set('buy')} min={0} />
          <NumberField label="Aktueller Kurs" suffix="€" value={current} onChange={f.set('current')} min={0} />
          <NumberField label="Stückzahl" value={shares} onChange={f.set('shares')} min={0} />
        </>
      }
      results={
        res && (
          <div>
            <ResultRow label="Investiert" value={fmtEur(res.invested)} />
            <ResultRow label="Aktueller Wert" value={fmtEur(res.current)} />
            <ResultRow label="Gewinn / Verlust" value={`${fmtEur(res.diff)} (${fmtPct(res.pct, 1, true)})`} strong tone={res.diff >= 0 ? 'up' : 'down'} />
            {res.pct < 0 && <ResultRow label="Nötiger Anstieg zur Erholung" value={Number.isFinite(res.recovery) ? fmtPct(res.recovery, 1, true) : 'nicht möglich (Totalverlust)'} />}
          </div>
        )
      }
      chart={
        <ResponsiveContainer>
          <BarChart data={table}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="loss" {...axisProps} />
            <YAxis {...axisProps} width={44} tickFormatter={(v) => `${v} %`} scale="sqrt" />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtPct(v, 0, true)} />
            <Bar dataKey="needed" name="Benötigter Anstieg" fill={CHART.red} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      }
    />
  );
}

// 9. Break-even-Rechner ---------------------------------------------------
export function BreakEvenCalc({ compact }: P) {
  const f = useCalcForm({ price: 50, shares: 20, buyFee: 4.9, sellFee: 4.9, spread: 0.2 }, { price: 10, shares: 30, buyFee: 4.9, sellFee: 4.9, spread: 2 });
  const { price, shares, buyFee, sellFee, spread } = f.values;
  const error = validate([
    [n(price) > 0, 'Der Kaufkurs muss größer als 0 sein.'],
    [n(shares) > 0, 'Die Stückzahl muss größer als 0 sein.'],
    [n(buyFee) >= 0 && n(sellFee) >= 0, 'Gebühren dürfen nicht negativ sein.'],
    [n(spread) >= 0 && n(spread) < 50, 'Der Spread muss zwischen 0 und 50 % liegen.'],
  ]);
  const be = error ? 0 : breakEven(+price, +shares, +buyFee, +sellFee, +spread);
  const hurdle = error ? 0 : (be / +price - 1) * 100;
  const sensitivity = error
    ? []
    : [1, 5, 10, 20, 50].map((k) => ({ shares: `${k * +shares} Stk.`, hurdle: (breakEven(+price, k * +shares, +buyFee, +sellFee, +spread) / +price - 1) * 100 }));
  return (
    <CalcShell
      compact={compact}
      title="Break-even-Rechner"
      description="Ab welchem Verkaufskurs bist du nach Gebühren und Spread bei plus/minus null?"
      formula="Break-even = (Kaufkurs × Stück + Kaufgebühr + Verkaufsgebühr) / Stück / (1 − Spread)"
      explanation={<p>Kosten sind eine Hürde, die die Aktie erst überspringen muss. Der Spread wird beim Verkauf berücksichtigt (du erhältst den niedrigeren Geldkurs). Steuern sind nicht enthalten. Das Diagramm zeigt: Je größer die Order, desto weniger fallen feste Gebühren ins Gewicht.</p>}
      onReset={f.reset}
      onExample={f.loadExample}
      error={error}
      inputs={
        <>
          <NumberField label="Kaufkurs (Brief)" suffix="€" value={price} onChange={f.set('price')} min={0} />
          <NumberField label="Stückzahl" value={shares} onChange={f.set('shares')} min={0} />
          <NumberField label="Kaufgebühr" suffix="€" value={buyFee} onChange={f.set('buyFee')} min={0} step={0.01} />
          <NumberField label="Verkaufsgebühr" suffix="€" value={sellFee} onChange={f.set('sellFee')} min={0} step={0.01} />
          <NumberField label="Spread" suffix="%" value={spread} onChange={f.set('spread')} min={0} step={0.05} />
        </>
      }
      results={
        !error && (
          <div>
            <ResultRow label="Gesamtkosten" value={fmtEur(+price * +shares + +buyFee + +sellFee)} />
            <ResultRow label="Break-even-Kurs" value={fmtEur(be)} strong />
            <ResultRow label="Nötiger Kursanstieg" value={fmtPct(hurdle, 2, true)} />
          </div>
        )
      }
      chart={
        <ResponsiveContainer>
          <BarChart data={sensitivity}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="shares" {...axisProps} />
            <YAxis {...axisProps} width={44} tickFormatter={(v) => `${fmtNum(v, 1)} %`} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtPct(v, 2, true)} />
            <Bar dataKey="hurdle" name="Kostenhürde" fill={CHART.amber} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      }
    />
  );
}

// 10. Portfolio-Diversifikationsrechner ----------------------------------
interface Holding {
  name: string;
  value: number | '';
}
const DEFAULT_HOLDINGS: Holding[] = [
  { name: 'Welt-ETF', value: 6000 },
  { name: 'Einzelaktie A', value: 1500 },
  { name: 'Einzelaktie B', value: 1000 },
  { name: 'Tagesgeld', value: 1500 },
];
const EXAMPLE_HOLDINGS: Holding[] = [
  { name: 'Arbeitgeberaktie', value: 12000 },
  { name: 'Tech-ETF', value: 3000 },
  { name: 'Aktie C', value: 1000 },
  { name: 'Aktie D', value: 500 },
  { name: 'Aktie E', value: 500 },
];

export function DiversificationCalc({ compact }: P) {
  const [rows, setRows] = useState<Holding[]>(DEFAULT_HOLDINGS);
  const valid = rows.every((r) => r.value === '' || n(r.value) >= 0) && rows.some((r) => n(r.value) > 0);
  const error = valid ? null : 'Bitte mindestens eine Position mit positivem Wert eingeben (keine negativen Werte).';
  const res = error ? null : diversification(rows.map((r, i) => ({ name: r.name || `Position ${i + 1}`, value: +(r.value || 0) })));
  const rating = !res ? null : res.largest > 40 || res.effectiveN < 3 ? 'red' : res.largest > 20 || res.effectiveN < 6 ? 'amber' : 'green';
  return (
    <CalcShell
      compact={compact}
      title="Portfolio-Diversifikationsrechner"
      description="Zeigt die Gewichtung deiner Positionen, die größte Einzelposition und die „effektive Anzahl“ gleich großer Positionen."
      formula="Gewicht = Wert / Gesamtwert   |   HHI = Σ Gewicht²   |   effektive Anzahl = 1 / HHI"
      explanation={
        <p>
          Der Herfindahl-Index (HHI) misst die Konzentration. Die effektive Anzahl sagt, wie vielen gleich großen Positionen dein Depot entspricht. Hinweis: Ein Welt-ETF enthält selbst tausende Unternehmen – diese innere Streuung berücksichtigt der Rechner nicht. Er misst nur die Verteilung zwischen deinen Positionen. Die Ampel ist eine grobe Lernhilfe.
        </p>
      }
      onReset={() => setRows(DEFAULT_HOLDINGS)}
      onExample={() => setRows(EXAMPLE_HOLDINGS)}
      error={error}
      inputs={
        <>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_7rem_auto] items-end gap-2">
              <div>
                <label className="label" htmlFor={`h-${i}`}>
                  Position
                </label>
                <input id={`h-${i}`} className="input" value={r.name} onChange={(e) => setRows((x) => x.map((y, j) => (j === i ? { ...y, name: e.target.value } : y)))} />
              </div>
              <NumberField label="Wert €" value={r.value} min={0} onChange={(v) => setRows((x) => x.map((y, j) => (j === i ? { ...y, value: v } : y)))} />
              <button type="button" className="btn-ghost mb-0.5 px-2" aria-label={`Position ${i + 1} entfernen`} disabled={rows.length <= 1} onClick={() => setRows((x) => x.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {rows.length < 12 && (
            <button type="button" className="btn-secondary w-full" onClick={() => setRows((x) => [...x, { name: `Position ${x.length + 1}`, value: 1000 }])}>
              <Plus className="h-4 w-4" /> Position hinzufügen
            </button>
          )}
        </>
      }
      results={
        res && (
          <div className="space-y-3">
            <div>
              <ResultRow label="Gesamtwert" value={fmtEur(res.total)} />
              <ResultRow label="Größte Einzelposition" value={fmtPct(res.largest, 1)} />
              <ResultRow label="Herfindahl-Index" value={fmtNum(res.hhi, 3)} />
              <ResultRow label="Effektive Anzahl Positionen" value={fmtNum(res.effectiveN, 1)} strong />
            </div>
            <Badge tone={rating as 'red' | 'amber' | 'green'}>
              {rating === 'red' ? 'Starkes Klumpenrisiko' : rating === 'amber' ? 'Mäßig konzentriert' : 'Gut verteilt'}
            </Badge>
          </div>
        )
      }
      chart={
        res && (
          <ResponsiveContainer>
            <PieChart>
              <Pie data={res.shares} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2} stroke="none">
                {res.shares.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        )
      }
    />
  );
}

export const CALCULATORS = [
  { id: 'rendite', title: 'Renditerechner', Component: ReturnCalc },
  { id: 'zinseszins', title: 'Zinseszinsrechner', Component: CompoundCalc },
  { id: 'dividende', title: 'Dividendenrechner', Component: DividendCalc },
  { id: 'sparplan', title: 'Sparplanrechner', Component: SavingsCalc },
  { id: 'kgv', title: 'KGV-Rechner', Component: PECalc },
  { id: 'eps', title: 'Gewinn je Aktie', Component: EPSCalc },
  { id: 'durchschnitt', title: 'Durchschnittlicher Kaufpreis', Component: AveragePriceCalc },
  { id: 'verlust', title: 'Verlustrechner', Component: LossCalc },
  { id: 'breakeven', title: 'Break-even-Rechner', Component: BreakEvenCalc },
  { id: 'diversifikation', title: 'Diversifikationsrechner', Component: DiversificationCalc },
] as const;
