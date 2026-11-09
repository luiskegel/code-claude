// Interaktive Widgets zu ETFs, Risiko, Psychologie, Inflation und Hebel
import { useMemo, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { CHART, NumberField, ResultRow, Badge, cx, Disclaimer } from '@/components/ui/ui';
import { fmtEur, fmtNum, fmtPct } from '@/lib/format';
import { leveragedPath, positionSize, purchasingPower, recoveryNeeded } from '@/lib/calculations';
import { mulberry32 } from '@/lib/market/simulatedMarket';

const axis = { stroke: CHART.axis, fontSize: 11, tickLine: false, axisLine: false } as const;
const eurTick = (v: number) => (Math.abs(v) >= 1000 ? `${fmtNum(v / 1000, 0)}k` : fmtNum(v, 0));

// ---------------- ETF-Vergleich (fiktive Beispieldaten) ----------------
const ETFS = [
  { name: 'Beispiel World ETF A (Acc)', index: 'Weltindex Industrieländer', ter: 0.2, td: -0.12, volume: 9000, type: 'thesaurierend', replication: 'physisch', count: 1400 },
  { name: 'Beispiel World ETF B (Dist)', index: 'Weltindex Industrieländer', ter: 0.12, td: -0.3, volume: 450, type: 'ausschüttend', replication: 'physisch (Sampling)', count: 1400 },
  { name: 'Beispiel All-World ETF C (Acc)', index: 'Weltindex inkl. Schwellenländer', ter: 0.22, td: -0.18, volume: 6000, type: 'thesaurierend', replication: 'physisch', count: 4000 },
  { name: 'Beispiel Tech-Themen ETF D', index: 'Themenindex Technologie', ter: 0.65, td: -0.75, volume: 80, type: 'thesaurierend', replication: 'synthetisch', count: 45 },
];

export function EtfComparisonWidget() {
  const [amount, setAmount] = useState<number | ''>(10000);
  const [years, setYears] = useState<number | ''>(20);
  const [indexReturn, setIndexReturn] = useState<number | ''>(6);
  const valid = +amount > 0 && +years >= 1 && +years <= 50 && +indexReturn > -20 && +indexReturn < 20;
  const rows = ETFS.map((e) => ({ ...e, end: valid ? +amount * Math.pow(1 + (+indexReturn + e.td) / 100, +years) : 0 }));
  const best = Math.max(...rows.map((r) => r.end));
  return (
    <div className="space-y-4">
      <Badge tone="violet">Fiktive Beispieldaten – keine echten Produkte</Badge>
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberField label="Anlagebetrag" suffix="€" value={amount} onChange={setAmount} min={1} />
        <NumberField label="Anlagedauer" suffix="Jahre" value={years} onChange={setYears} min={1} />
        <NumberField label="Angenommene Indexrendite" suffix="%" value={indexReturn} onChange={setIndexReturn} step={0.5} />
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">ETF</th>
              <th className="px-3 py-2">TER</th>
              <th className="px-3 py-2">Tracking Diff.</th>
              <th className="px-3 py-2">Volumen</th>
              <th className="px-3 py-2">Positionen</th>
              <th className="px-3 py-2">Ertrag</th>
              <th className="px-3 py-2 text-right">Endwert (Modell)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-white/[0.05]">
                <td className="px-3 py-2">
                  <p className="text-slate-100">{r.name}</p>
                  <p className="text-xs text-slate-500">
                    {r.index} · {r.replication}
                  </p>
                </td>
                <td className="num px-3 py-2">{fmtPct(r.ter)}</td>
                <td className="num px-3 py-2">{fmtPct(r.td, 2, true)}</td>
                <td className="num px-3 py-2">{r.volume >= 1000 ? `${fmtNum(r.volume / 1000, 1)} Mrd. €` : `${r.volume} Mio. €`}</td>
                <td className="num px-3 py-2">{r.count.toLocaleString('de-DE')}</td>
                <td className="px-3 py-2">{r.type}</td>
                <td className={cx('num px-3 py-2 text-right', r.end === best && 'font-semibold text-accent-glow')}>{valid ? fmtEur(r.end, true) : '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-400">
        Beobachtung: ETF B hat die niedrigste TER, aber eine schlechtere Tracking Difference und ein kleines Fondsvolumen. ETF D ist ein teurer, wenig gestreuter Themen-ETF. Für den Endwert zählt die Tracking Difference – nicht die TER allein.
      </p>
      <Disclaimer />
    </div>
  );
}

// ---------------- Risikorechner ----------------
export function RiskCalculatorWidget() {
  const [capital, setCapital] = useState<number | ''>(10000);
  const [stockShare, setStockShare] = useState<number | ''>(70);
  const [riskPct, setRiskPct] = useState<number | ''>(1);
  const [entry, setEntry] = useState<number | ''>(50);
  const [stop, setStop] = useState<number | ''>(45);
  const scenarios = [
    { name: 'Korrektur', drop: 10 },
    { name: 'Bärenmarkt', drop: 25 },
    { name: 'Schwerer Crash', drop: 50 },
    { name: 'Einzelaktie Pleite', drop: 100 },
  ];
  const valid = +capital > 0 && +stockShare >= 0 && +stockShare <= 100;
  const stockPart = valid ? (+capital * +stockShare) / 100 : 0;
  const data = scenarios.map((s) => {
    const loss = s.name === 'Einzelaktie Pleite' ? Math.min(stockPart, +capital * 0.05) : (stockPart * s.drop) / 100;
    return { name: s.name, loss, remaining: +capital - loss, pct: valid ? (loss / +capital) * 100 : 0 };
  });
  let pos: ReturnType<typeof positionSize> | null = null;
  let posErr: string | null = null;
  try {
    if (+capital > 0 && +riskPct > 0 && +entry > 0 && stop !== '') pos = positionSize(+capital, +riskPct, +entry, +stop);
  } catch (e) {
    posErr = (e as Error).message;
  }
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <NumberField label="Gesamtkapital" suffix="€" value={capital} onChange={setCapital} min={0} />
        <NumberField label="Aktienanteil" suffix="%" value={stockShare} onChange={setStockShare} min={0} max={100} />
      </div>
      {valid ? (
        <>
          <p className="text-sm text-slate-400">So würden sich verschiedene Szenarien auf dein Gesamtkapital auswirken (der Rest liegt risikoarm; Einzelaktien-Szenario: eine Position mit 5 % des Kapitals fällt komplett aus).</p>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="name" {...axis} />
                <YAxis {...axis} width={48} tickFormatter={eurTick} />
                <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="remaining" stackId="a" name="Verbleibendes Kapital" fill={CHART.blue} />
                <Bar dataKey="loss" stackId="a" name="Verlust" fill={CHART.red} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.map((d) => (
              <div key={d.name} className="rounded-xl border border-white/[0.06] p-3 text-sm">
                <p className="text-slate-200">{d.name}</p>
                <p className="num text-rose-300">
                  −{fmtEur(d.loss)} ({fmtPct(-d.pct, 1)})
                </p>
                <p className="text-xs text-slate-500">Zur Erholung nötig: {fmtPct(recoveryNeeded(d.pct), 1, true)}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-amber-200">Bitte gültiges Kapital und einen Aktienanteil zwischen 0 und 100 % eingeben.</p>
      )}
      <div className="rounded-xl border border-white/[0.06] p-4">
        <p className="mb-3 text-sm font-semibold text-white">Positionsgröße nach Risikobudget</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <NumberField label="Risiko je Position" suffix="%" value={riskPct} onChange={setRiskPct} step={0.25} min={0} />
          <NumberField label="Einstiegskurs" suffix="€" value={entry} onChange={setEntry} min={0} />
          <NumberField label="Stop-Loss-Kurs" suffix="€" value={stop} onChange={setStop} min={0} />
        </div>
        {posErr && <p className="mt-2 text-sm text-amber-200">{posErr}</p>}
        {pos && (
          <div className="mt-3">
            <ResultRow label="Risikobudget" value={fmtEur(pos.riskAmount)} />
            <ResultRow label="Risiko je Aktie" value={fmtEur(pos.perShare)} />
            <ResultRow label="Maximale Stückzahl" value={`${pos.shares} Stück`} strong />
            <ResultRow label="Positionsgröße" value={`${fmtEur(pos.positionValue)} (${fmtPct((pos.positionValue / +capital) * 100, 1)} des Kapitals)`} />
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- Drawdown-Simulator ----------------
export function DrawdownWidget() {
  const [drop, setDrop] = useState(40);
  const [ret, setRet] = useState(7);
  const recovery = recoveryNeeded(drop);
  const years = ret > 0 && drop < 100 ? Math.log(1 / (1 - drop / 100)) / Math.log(1 + ret / 100) : Infinity;
  const data = useMemo(() => {
    const out: { t: string; value: number }[] = [];
    let v = 100;
    out.push({ t: 'Hoch', value: 100 });
    v = 100 * (1 - drop / 100);
    out.push({ t: 'Tief', value: v });
    const n = Number.isFinite(years) ? Math.min(40, Math.ceil(years) + 2) : 10;
    for (let y = 1; y <= n; y++) {
      v = v * (1 + ret / 100);
      out.push({ t: `J${y}`, value: Math.round(v * 10) / 10 });
    }
    return out;
  }, [drop, ret, years]);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label">Einbruch (Drawdown): −{drop} %</span>
          <input type="range" min={5} max={90} value={drop} onChange={(e) => setDrop(+e.target.value)} className="w-full accent-rose-500" />
        </label>
        <label className="block">
          <span className="label">Angenommene Rendite danach: {ret} % p. a.</span>
          <input type="range" min={1} max={15} value={ret} onChange={(e) => setRet(+e.target.value)} className="w-full accent-green-500" />
        </label>
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="t" {...axis} />
            <YAxis {...axis} width={40} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtNum(v, 1)} />
            <ReferenceLine y={100} stroke={CHART.amber} strokeDasharray="4 4" label={{ value: 'altes Hoch', fill: CHART.amber, fontSize: 10, position: 'insideTopLeft' }} />
            <Area type="monotone" dataKey="value" name="Depotwert (Index 100)" stroke={CHART.blue} fill="rgba(56,189,248,0.15)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <ResultRow label="Nötiger Anstieg zur Erholung" value={fmtPct(recovery, 1, true)} strong />
        <ResultRow label="Dauer bis zum alten Hoch (Modell)" value={Number.isFinite(years) ? `ca. ${fmtNum(years, 1)} Jahre` : '–'} />
      </div>
      <p className="text-xs text-slate-500">Modellrechnung mit konstanter Rendite. Reale Erholungen verlaufen unregelmäßig und können deutlich länger dauern – oder ausbleiben (bei Einzelaktien).</p>
    </div>
  );
}

// ---------------- Psychologie-Situationen ----------------
const SCENARIOS = [
  {
    situation: 'Eine Aktie, von der alle in sozialen Medien schwärmen, ist in einem Monat um 180 % gestiegen. Dein Freund hat schon 3.000 € Gewinn gemacht. Was tust du?',
    options: [
      { text: 'Sofort für 5.000 € kaufen, bevor es zu spät ist.', bias: 'FOMO und Herdenverhalten', good: false },
      { text: 'Die Aktie auf die Watchlist setzen, 48 Stunden warten und das Unternehmen analysieren.', bias: '', good: true },
      { text: 'Einen Kredit aufnehmen, um noch mehr zu kaufen.', bias: 'Gier und Selbstüberschätzung – zusätzlich gefährlich durch den Kredit', good: false },
    ],
    explanation: 'Starke Kursanstiege mit großer Medienaufmerksamkeit lösen FOMO aus. Wer spät in einen Hype einsteigt, kauft häufig nahe dem Höhepunkt. Eine Wartezeit und eine eigene Analyse schützen vor emotionalen Fehlkäufen.',
  },
  {
    situation: 'Dein breit gestreuter ETF-Sparplan ist in einer Krise um 30 % gefallen. Die Nachrichten sprechen vom „Crash des Jahrzehnts“. Du brauchst das Geld erst in 20 Jahren.',
    options: [
      { text: 'Alles verkaufen, um weitere Verluste zu vermeiden.', bias: 'Panikverkauf und Verlustaversion', good: false },
      { text: 'Plan prüfen: Lage unverändert, Sparplan läuft weiter.', bias: '', good: true },
      { text: 'Sparplan stoppen und warten, bis „sich alles beruhigt hat“.', bias: 'Market Timing aus Angst – man verpasst oft die Erholung', good: false },
    ],
    explanation: 'Panikverkäufe machen Buchverluste real. Breite Märkte haben sich nach Krisen in der Vergangenheit erholt – ohne Garantie. Wer einen langen Horizont und einen Notgroschen hat, muss in der Krise nicht verkaufen; der Sparplan kauft sogar günstiger.',
  },
  {
    situation: 'Du besitzt Aktie A (+45 %) und Aktie B (−40 %). Du brauchst 2.000 € für eine Reparatur. Welche Aktie verkaufst du?',
    options: [
      { text: 'Aktie A – der Gewinn ist dann wenigstens sicher.', bias: 'Dispositionseffekt (Gewinner zu früh verkaufen, Verlierer halten)', good: false },
      { text: 'Aktie B auf keinen Fall – erst verkaufen, wenn sie wieder auf dem Kaufkurs ist.', bias: 'Ankereffekt und Verlustaversion', good: false },
      { text: 'Beide Unternehmen neu bewerten und die Aktie mit den schlechteren Aussichten verkaufen (Steuern und Verluste mitbedenken).', bias: '', good: true },
    ],
    explanation: 'Der Kaufkurs ist für die Zukunft eines Unternehmens irrelevant. Entscheidend ist, welches Unternehmen die besseren Perspektiven hat. Übrigens: Ein Notgroschen hätte den Verkauf überflüssig gemacht.',
  },
  {
    situation: 'Du hast eine Aktie analysiert und bist überzeugt. Seitdem liest du fast nur noch Artikel, die deine Meinung bestätigen. Ein kritischer Analystenbericht erscheint.',
    options: [
      { text: 'Den Bericht ignorieren – der Analyst hat keine Ahnung.', bias: 'Confirmation Bias (Bestätigungsfehler)', good: false },
      { text: 'Den Bericht lesen und prüfen, ob er deine Investmentthese widerlegt.', bias: '', good: true },
      { text: 'Aus Trotz noch mehr Aktien kaufen.', bias: 'Confirmation Bias und Selbstüberschätzung', good: false },
    ],
    explanation: 'Gute Anleger suchen aktiv nach Gegenargumenten. Die Frage „Was müsste passieren, damit ich falsch liege?“ gehört in jede Investmentthese.',
  },
  {
    situation: 'Du hast im virtuellen Depot drei Trades hintereinander mit Gewinn abgeschlossen. Du hast das Gefühl, den Markt zu durchschauen.',
    options: [
      { text: 'Positionsgröße verfünffachen und täglich handeln.', bias: 'Selbstüberschätzung und Overtrading', good: false },
      { text: 'Bei den festgelegten Regeln bleiben und prüfen, ob die Gewinne auf Können oder Glück beruhen.', bias: '', good: true },
      { text: 'Auf Hebelprodukte umsteigen, um mehr herauszuholen.', bias: 'Selbstüberschätzung – Hebel vervielfacht auch Verluste', good: false },
    ],
    explanation: 'Wenige Erfolge sind statistisch meist Zufall. Selbstüberschätzung führt zu zu großen Positionen und zu häufigem Handeln – beides schadet im Durchschnitt der Rendite.',
  },
];

export function PsychologyWidget() {
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const s = SCENARIOS[i];
  const done = i >= SCENARIOS.length;
  if (done)
    return (
      <div className="space-y-3 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <p className="text-lg font-semibold text-white">
          {score} von {SCENARIOS.length} Situationen rational gelöst
        </p>
        <p className="text-sm text-slate-400">Denkfehler sind menschlich. Wichtig ist, sie zu kennen und durch Regeln abzufangen.</p>
        <button
          className="btn-secondary"
          onClick={() => {
            setI(0);
            setChoice(null);
            setScore(0);
          }}
        >
          <RotateCcw className="h-4 w-4" /> Noch einmal
        </button>
      </div>
    );
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Situation {i + 1} von {SCENARIOS.length}</span>
        <span>Rationale Entscheidungen: {score}</span>
      </div>
      <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-relaxed text-slate-100">{s.situation}</p>
      <div className="grid gap-2">
        {s.options.map((o, j) => (
          <button
            key={j}
            disabled={choice !== null}
            onClick={() => {
              setChoice(j);
              if (o.good) setScore((x) => x + 1);
            }}
            className={cx(
              'rounded-xl border px-4 py-3 text-left text-sm transition',
              choice === null && 'border-white/10 hover:border-accent/40',
              choice !== null && o.good && 'border-accent/50 bg-accent/10',
              choice === j && !o.good && 'border-loss/50 bg-loss/10',
              choice !== null && choice !== j && !o.good && 'opacity-60',
            )}
          >
            {o.text}
            {choice !== null && o.bias && <span className="mt-1 block text-xs text-rose-200">Möglicher Denkfehler: {o.bias}</span>}
          </button>
        ))}
      </div>
      {choice !== null && (
        <div className="space-y-3">
          <p className="text-sm text-slate-300">{s.explanation}</p>
          <button
            className="btn-primary"
            onClick={() => {
              setI(i + 1);
              setChoice(null);
            }}
          >
            {i + 1 < SCENARIOS.length ? 'Nächste Situation' : 'Auswertung'}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------- Inflationsrechner ----------------
export function InflationWidget() {
  const [amount, setAmount] = useState<number | ''>(10000);
  const [rate, setRate] = useState<number | ''>(2.5);
  const [interest, setInterest] = useState<number | ''>(2);
  const valid = +amount > 0 && +rate >= 0 && +rate < 30 && +interest >= 0 && +interest < 30;
  const data = valid
    ? Array.from({ length: 31 }, (_, y) => ({
        y,
        real: purchasingPower(+amount, +rate, y),
        realWithInterest: (+amount * Math.pow(1 + +interest / 100, y)) / Math.pow(1 + +rate / 100, y),
      }))
    : [];
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberField label="Betrag" suffix="€" value={amount} onChange={setAmount} min={1} />
        <NumberField label="Inflationsrate p. a." suffix="%" value={rate} onChange={setRate} step={0.1} min={0} />
        <NumberField label="Zins auf dem Konto p. a." suffix="%" value={interest} onChange={setInterest} step={0.1} min={0} />
      </div>
      {valid && (
        <>
          <div className="grid gap-2 sm:grid-cols-3">
            {[10, 20, 30].map((y) => (
              <div key={y} className="rounded-xl border border-white/[0.06] p-3 text-sm">
                <p className="text-slate-400">Kaufkraft nach {y} Jahren</p>
                <p className="num text-lg text-white">{fmtEur(data[y].real, true)}</p>
                <p className="text-xs text-slate-500">mit Zinsen: {fmtEur(data[y].realWithInterest, true)}</p>
              </div>
            ))}
          </div>
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="y" {...axis} />
                <YAxis {...axis} width={48} tickFormatter={eurTick} />
                <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Jahr ${l}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line dataKey="real" name="Ohne Zinsen (real)" stroke={CHART.red} dot={false} />
                <Line dataKey="realWithInterest" name="Mit Zinsen (real)" stroke={CHART.blue} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-400">
            Realzins: ca. {fmtPct(+interest - +rate, 1, true)} pro Jahr. {+interest < +rate ? 'Dein Geld verliert real an Kaufkraft.' : 'Dein Geld behält real seine Kaufkraft (vor Steuern).'}
          </p>
        </>
      )}
    </div>
  );
}

// ---------------- Hebel-Simulator ----------------
export function LeverageWidget() {
  const [lev, setLev] = useState(5);
  const [seed, setSeed] = useState(1);
  const moves = useMemo(() => {
    const r = mulberry32(seed * 7919);
    return Array.from({ length: 40 }, () => Math.round(((r() - 0.5) * 4 + (r() - 0.5) * 2) * 100) / 100);
  }, [seed]);
  const data = leveragedPath(moves, lev);
  const end = data[data.length - 1];
  const knocked = data.some((d) => d.lev <= 0.5);
  return (
    <div className="space-y-4">
      <Badge tone="red">Hochriskant – nur zur Veranschaulichung</Badge>
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 5, 10].map((l) => (
          <button key={l} className={cx('btn-secondary py-1.5', lev === l && '!border-loss/50 !text-rose-200')} onClick={() => setLev(l)}>
            Hebel {l}
          </button>
        ))}
        <button className="btn-ghost py-1.5" onClick={() => setSeed((s) => s + 1)}>
          <RotateCcw className="h-4 w-4" /> Neuer Kursverlauf
        </button>
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="step" {...axis} />
            <YAxis {...axis} width={40} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtNum(v, 1)} labelFormatter={(l) => `Tag ${l}`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine y={100} stroke={CHART.axis} strokeDasharray="3 3" />
            <Line dataKey="base" name="Basiswert" stroke="#e2e8f0" dot={false} />
            <Line dataKey="lev" name={`Hebelprodukt (×${lev}, täglich)`} stroke={CHART.red} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <ResultRow label="Basiswert nach 40 Tagen" value={fmtPct(end.base - 100, 1, true)} tone={end.base >= 100 ? 'up' : 'down'} />
        <ResultRow label="Hebelprodukt nach 40 Tagen" value={fmtPct(end.lev - 100, 1, true)} tone={end.lev >= 100 ? 'up' : 'down'} />
      </div>
      {knocked && <p className="text-sm text-rose-200">Das Hebelprodukt hat zwischenzeitlich (fast) seinen gesamten Wert verloren.</p>}
      <p className="text-xs text-slate-500">Simulierte Tagesbewegungen. Der tägliche Hebel erzeugt in Schwankungsphasen einen Volatilitätsverlust – auch wenn der Basiswert am Ende kaum verändert ist.</p>
    </div>
  );
}

export function ScenarioBars({ items }: { items: { name: string; value: number }[] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={items}>
          <XAxis dataKey="name" {...axis} />
          <YAxis {...axis} width={40} />
          <Bar dataKey="value">
            {items.map((x, i) => (
              <Cell key={i} fill={x.value >= 0 ? CHART.green : CHART.red} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
