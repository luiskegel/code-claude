// Interaktive Lern-Widgets zu Börse, Orders, Kosten und Bilanz
import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART, NumberField, ResultRow, Badge, cx } from '@/components/ui/ui';
import { fmtEur, fmtNum, fmtPct } from '@/lib/format';
import { breakEven, equityRatio, debtToEquity, pbRatio, peRatio, psRatio } from '@/lib/calculations';
import { SIM_STOCKS, simPrice } from '@/lib/market/simulatedMarket';
import { mulberry32 } from '@/lib/market/simulatedMarket';

const axis = { stroke: CHART.axis, fontSize: 11, tickLine: false, axisLine: false } as const;

/** Angebot und Nachfrage: Preis passt sich an, bis sich Käufer und Verkäufer treffen. */
export function SupplyDemandWidget() {
  const [buyers, setBuyers] = useState(60);
  const [sellers, setSellers] = useState(40);
  const [news, setNews] = useState<'none' | 'good' | 'bad'>('none');
  const data = useMemo(() => {
    const rand = mulberry32(buyers * 1000 + sellers + (news === 'good' ? 7 : news === 'bad' ? 13 : 0));
    let price = 50;
    const out = [{ t: 0, price }];
    for (let t = 1; t <= 30; t++) {
      const b = buyers * (news === 'good' && t > 10 ? 1.4 : 1) * (news === 'bad' && t > 10 ? 0.6 : 1);
      const imbalance = (b - sellers) / (b + sellers);
      price = price * (1 + imbalance * 0.02 + (rand() - 0.5) * 0.01);
      out.push({ t, price: Math.round(price * 100) / 100 });
    }
    return out;
  }, [buyers, sellers, news]);
  const end = data[data.length - 1].price;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Stelle ein, wie viel Kauf- und Verkaufsinteresse es gibt. Der Simulator zeigt, wie sich der Preis über 30 Handelsrunden entwickelt (vereinfachtes Modell).</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label">Kaufinteresse: {buyers}</span>
          <input type="range" min={10} max={100} value={buyers} onChange={(e) => setBuyers(+e.target.value)} className="w-full accent-green-500" />
        </label>
        <label className="block">
          <span className="label">Verkaufsinteresse: {sellers}</span>
          <input type="range" min={10} max={100} value={sellers} onChange={(e) => setSellers(+e.target.value)} className="w-full accent-rose-500" />
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {(['none', 'good', 'bad'] as const).map((k) => (
          <button key={k} className={cx('btn-secondary py-1.5', news === k && '!border-accent/50 !text-accent-glow')} onClick={() => setNews(k)}>
            {k === 'none' ? 'Keine Nachricht' : k === 'good' ? 'Gute Nachricht ab Runde 10' : 'Schlechte Nachricht ab Runde 10'}
          </button>
        ))}
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="t" {...axis} />
            <YAxis {...axis} domain={['auto', 'auto']} width={44} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Runde ${l}`} />
            <ReferenceLine y={50} stroke={CHART.axis} strokeDasharray="3 3" />
            <Line type="monotone" dataKey="price" name="Preis" stroke={end >= 50 ? CHART.green : CHART.red} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm">
        Startpreis 50,00 € → Endpreis <strong className={end >= 50 ? 'text-accent-glow' : 'text-rose-300'}>{fmtEur(end)}</strong> ({fmtPct((end / 50 - 1) * 100, 1, true)}).
        {buyers > sellers ? ' Mehr Käufer als Verkäufer: Der Preis steigt.' : buyers < sellers ? ' Mehr Verkäufer als Käufer: Der Preis fällt.' : ' Gleichgewicht: Der Preis schwankt nur zufällig.'}
      </p>
    </div>
  );
}

/** Index-Gewichtung: Einfluss großer und kleiner Unternehmen auf den Index. */
export function IndexWeightsWidget() {
  const base = [
    { name: 'Großkonzern A', cap: 60 },
    { name: 'Mittelstand B', cap: 30 },
    { name: 'Kleinfirma C', cap: 10 },
  ];
  const [moves, setMoves] = useState([2, -1, 15]);
  const total = base.reduce((s, b) => s + b.cap, 0);
  const contributions = base.map((b, i) => ({ name: b.name, weight: (b.cap / total) * 100, move: moves[i], contribution: (b.cap / total) * moves[i] }));
  const indexMove = contributions.reduce((s, c) => s + c.contribution, 0);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Ein Mini-Index aus drei Firmen, gewichtet nach Börsenwert. Verändere die Tagesbewegung jeder Aktie.</p>
      <div className="space-y-3">
        {contributions.map((c, i) => (
          <div key={c.name} className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[12rem_1fr_6rem]">
            <span className="text-sm text-slate-200">
              {c.name} <span className="text-slate-500">({fmtNum(c.weight, 0)} %)</span>
            </span>
            <input
              aria-label={`Kursbewegung ${c.name}`}
              type="range"
              min={-20}
              max={20}
              step={0.5}
              value={moves[i]}
              onChange={(e) => setMoves((m) => m.map((x, j) => (j === i ? +e.target.value : x)))}
              className="order-3 col-span-2 w-full accent-green-500 sm:order-none sm:col-span-1"
            />
            <span className={cx('num text-right text-sm', c.move >= 0 ? 'text-accent-glow' : 'text-rose-300')}>{fmtPct(c.move, 1, true)}</span>
          </div>
        ))}
      </div>
      <div className="h-48">
        <ResponsiveContainer>
          <BarChart data={contributions}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="name" {...axis} />
            <YAxis {...axis} width={40} tickFormatter={(v) => `${v}%`} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtPct(v, 2, true)} />
            <ReferenceLine y={0} stroke={CHART.axis} />
            <Bar dataKey="contribution" name="Beitrag zum Index">
              {contributions.map((c, i) => (
                <Cell key={i} fill={c.contribution >= 0 ? CHART.green : CHART.red} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm">
        Indexveränderung: <strong className={indexMove >= 0 ? 'text-accent-glow' : 'text-rose-300'}>{fmtPct(indexMove, 2, true)}</strong>
      </p>
    </div>
  );
}

/** Ordertypen-Simulator: Welche Order wird bei einem Kursverlauf wann ausgeführt? */
export function OrderTypesWidget() {
  const [scenario, setScenario] = useState<'dip' | 'gap' | 'rally'>('dip');
  const [limitBuy, setLimitBuy] = useState<number | ''>(96);
  const [stop, setStop] = useState<number | ''>(92);
  const [limitSell, setLimitSell] = useState<number | ''>(106);
  const path = useMemo(() => {
    const p =
      scenario === 'dip'
        ? [100, 99, 97, 95.5, 94, 95, 97, 99, 101, 103, 104]
        : scenario === 'gap'
          ? [100, 99.5, 99, 98.5, 86, 85, 86.5, 88, 89, 88.5, 90]
          : [100, 101, 102.5, 101.5, 103, 105, 107, 106, 108, 109, 110];
    return p.map((price, t) => ({ t, price }));
  }, [scenario]);
  const exec = (cond: (p: number, prev: number) => boolean, priceFn: (p: number) => number) => {
    for (let i = 1; i < path.length; i++) if (cond(path[i].price, path[i - 1].price)) return { t: i, price: priceFn(path[i].price) };
    return null;
  };
  const lb = limitBuy === '' ? null : exec((p) => p <= +limitBuy, (p) => Math.min(p, +limitBuy));
  const sl = stop === '' ? null : exec((p) => p <= +stop, (p) => p); // wird zur Market Order → Ausführung zum nächsten Kurs
  const ls = limitSell === '' ? null : exec((p) => p >= +limitSell, (p) => Math.max(p, +limitSell));
  const market = path[1].price;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Startkurs 100 €. Wähle einen Kursverlauf und lege deine Orders fest. Der Simulator zeigt, ob und zu welchem Kurs sie ausgeführt würden (vereinfacht, ohne Spread).</p>
      <div className="flex flex-wrap gap-2">
        {([
          ['dip', 'Rücksetzer & Erholung'],
          ['gap', 'Kurslücke nach schlechter Nachricht'],
          ['rally', 'Starker Anstieg'],
        ] as const).map(([k, l]) => (
          <button key={k} className={cx('btn-secondary py-1.5', scenario === k && '!border-accent/50 !text-accent-glow')} onClick={() => setScenario(k)}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberField label="Kauf-Limit" suffix="€" value={limitBuy} onChange={setLimitBuy} />
        <NumberField label="Stop-Loss (Verkauf)" suffix="€" value={stop} onChange={setStop} />
        <NumberField label="Verkauf-Limit" suffix="€" value={limitSell} onChange={setLimitSell} />
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={path}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="t" {...axis} />
            <YAxis {...axis} domain={[80, 115]} width={36} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Zeitpunkt ${l}`} />
            {limitBuy !== '' && <ReferenceLine y={+limitBuy} stroke={CHART.blue} strokeDasharray="4 4" label={{ value: 'Kauf-Limit', fill: CHART.blue, fontSize: 10, position: 'insideLeft' }} />}
            {stop !== '' && <ReferenceLine y={+stop} stroke={CHART.red} strokeDasharray="4 4" label={{ value: 'Stop-Loss', fill: CHART.red, fontSize: 10, position: 'insideLeft' }} />}
            {limitSell !== '' && <ReferenceLine y={+limitSell} stroke={CHART.green} strokeDasharray="4 4" label={{ value: 'Verkauf-Limit', fill: CHART.green, fontSize: 10, position: 'insideLeft' }} />}
            <Line type="linear" dataKey="price" name="Kurs" stroke="#e2e8f0" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-xl border border-white/[0.06] p-3">
        <ResultRow label="Market Order (sofort)" value={`ausgeführt zu ${fmtEur(market)}`} />
        <ResultRow label="Kauf-Limit" value={lb ? `ausgeführt zu ${fmtEur(lb.price)} (Zeitpunkt ${lb.t})` : 'nicht ausgeführt'} />
        <ResultRow label="Stop-Loss" value={sl ? `ausgelöst, Verkauf zu ca. ${fmtEur(sl.price)} (Zeitpunkt ${sl.t})` : 'nicht ausgelöst'} tone={sl && stop !== '' && sl.price < +stop - 0.5 ? 'down' : undefined} />
        <ResultRow label="Verkauf-Limit" value={ls ? `ausgeführt zu ${fmtEur(ls.price)} (Zeitpunkt ${ls.t})` : 'nicht ausgeführt'} />
      </div>
      {sl && stop !== '' && sl.price < +stop - 0.5 && (
        <p className="text-sm text-rose-200">Achtung: Durch die Kurslücke wurde der Stop-Loss deutlich unter dem Stoppkurs ausgeführt ({fmtEur(sl.price)} statt {fmtEur(+stop)}).</p>
      )}
    </div>
  );
}

/** Spread- und Gebührenwirkung je nach Ordergröße. */
export function SpreadWidget() {
  const [amount, setAmount] = useState<number | ''>(500);
  const [fee, setFee] = useState<number | ''>(4.9);
  const [spread, setSpread] = useState<number | ''>(0.5);
  const valid = +amount > 0 && +fee >= 0 && +spread >= 0 && +spread < 50;
  const hurdle = (a: number) => (breakEven(100, a / 100, +fee, +fee, +spread) / 100 - 1) * 100;
  const data = valid ? [100, 250, 500, 1000, 2500, 5000].map((a) => ({ name: `${a} €`, hurdle: hurdle(a) })) : [];
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Wie viel muss eine Aktie steigen, damit Kauf- und Verkaufsgebühr plus Spread wieder hereingeholt sind?</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberField label="Ordervolumen" suffix="€" value={amount} onChange={setAmount} min={1} />
        <NumberField label="Gebühr je Order" suffix="€" value={fee} onChange={setFee} min={0} step={0.1} />
        <NumberField label="Spread" suffix="%" value={spread} onChange={setSpread} min={0} step={0.05} />
      </div>
      {valid ? (
        <>
          <ResultRow label={`Kostenhürde bei ${fmtEur(+amount)}`} value={fmtPct(hurdle(+amount), 2, true)} strong />
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="name" {...axis} />
                <YAxis {...axis} width={44} tickFormatter={(v) => `${fmtNum(v, 1)}%`} />
                <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtPct(v, 2, true)} />
                <Bar dataKey="hurdle" name="Nötiger Anstieg" fill={CHART.amber} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p className="text-sm text-amber-200">Bitte gültige Werte eingeben (Volumen &gt; 0, Spread unter 50 %).</p>
      )}
    </div>
  );
}

/** Bilanz-Baukasten: Vermögen = Eigenkapital + Schulden. */
export function BalanceSheetWidget() {
  const [assets, setAssets] = useState({ fixed: 1200, inventory: 200, receivables: 250, cash: 150 });
  const [debt, setDebt] = useState({ longTerm: 700, shortTerm: 380 });
  const total = Object.values(assets).reduce((s, v) => s + v, 0);
  const liabilities = debt.longTerm + debt.shortTerm;
  const equity = total - liabilities;
  const ratio = equityRatio(equity, total);
  const de = debtToEquity(liabilities, equity);
  const slider = (label: string, value: number, onChange: (v: number) => void, max = 2000) => (
    <label className="block">
      <span className="flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="num text-slate-200">{fmtNum(value, 0)} Mio. €</span>
      </span>
      <input type="range" min={0} max={max} step={10} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-green-500" />
    </label>
  );
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Beispielbilanz der fiktiven Beispiel AG (Beispieldaten). Das Eigenkapital ergibt sich automatisch: Vermögen minus Schulden.</p>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-white/[0.06] p-3">
          <p className="text-sm font-semibold text-white">Aktiva (Vermögen)</p>
          {slider('Anlagevermögen', assets.fixed, (v) => setAssets((a) => ({ ...a, fixed: v })), 3000)}
          {slider('Vorräte', assets.inventory, (v) => setAssets((a) => ({ ...a, inventory: v })))}
          {slider('Forderungen', assets.receivables, (v) => setAssets((a) => ({ ...a, receivables: v })))}
          {slider('Liquide Mittel', assets.cash, (v) => setAssets((a) => ({ ...a, cash: v })))}
          <ResultRow label="Bilanzsumme" value={`${fmtNum(total, 0)} Mio. €`} strong />
        </div>
        <div className="space-y-2 rounded-xl border border-white/[0.06] p-3">
          <p className="text-sm font-semibold text-white">Passiva (Finanzierung)</p>
          {slider('Langfristige Schulden', debt.longTerm, (v) => setDebt((d) => ({ ...d, longTerm: v })), 3000)}
          {slider('Kurzfristige Schulden', debt.shortTerm, (v) => setDebt((d) => ({ ...d, shortTerm: v })))}
          <ResultRow label="Eigenkapital" value={`${fmtNum(equity, 0)} Mio. €`} tone={equity >= 0 ? 'up' : 'down'} strong />
          <ResultRow label="Eigenkapitalquote" value={ratio === null ? '–' : fmtPct(ratio, 1)} />
          <ResultRow label="Verschuldungsgrad" value={de === null ? 'nicht berechenbar' : fmtNum(de, 2)} />
        </div>
      </div>
      {equity < 0 ? (
        <Badge tone="red">Negatives Eigenkapital: bilanzielle Überschuldung – ein ernstes Warnsignal!</Badge>
      ) : ratio !== null && ratio < 20 ? (
        <Badge tone="amber">Dünnes Eigenkapitalpolster – für ein Industrieunternehmen eher riskant.</Badge>
      ) : (
        <Badge tone="green">Solides Eigenkapitalpolster für ein Industrieunternehmen.</Badge>
      )}
    </div>
  );
}

/** Kennzahlen-Rechner für die fiktiven Simulationsunternehmen. */
export function KpiWidget() {
  const [symbol, setSymbol] = useState(SIM_STOCKS[0].symbol);
  const stock = SIM_STOCKS.find((s) => s.symbol === symbol)!;
  const price = simPrice(symbol, 0);
  const f = stock.fundamentals;
  const pe = peRatio(price, f.eps);
  const pb = pbRatio(price, f.bookValuePerShare);
  const ps = psRatio(price, f.revenuePerShare);
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Wähle ein fiktives Unternehmen aus dem virtuellen Depot. Kurs vom simulierten Starttag, Fundamentaldaten sind Lernbeispiele.</p>
      <select className="input" value={symbol} onChange={(e) => setSymbol(e.target.value)} aria-label="Unternehmen wählen">
        {SIM_STOCKS.filter((s) => s.fundamentals.sharesMio > 0).map((s) => (
          <option key={s.symbol} value={s.symbol}>
            {s.name} ({s.symbol})
          </option>
        ))}
      </select>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <ResultRow label="Kurs (simuliert)" value={fmtEur(price)} />
          <ResultRow label="Gewinn je Aktie" value={fmtEur(f.eps)} />
          <ResultRow label="Buchwert je Aktie" value={fmtEur(f.bookValuePerShare)} />
          <ResultRow label="Umsatz je Aktie" value={fmtEur(f.revenuePerShare)} />
          <ResultRow label="Marktkapitalisierung" value={`${fmtNum((price * f.sharesMio) / 1000, 2)} Mrd. €`} />
        </div>
        <div>
          <ResultRow label="KGV" value={pe === null ? 'n. a. (Verlust)' : fmtNum(pe, 1)} strong />
          <ResultRow label="KBV" value={pb === null ? 'n. a.' : fmtNum(pb, 2)} strong />
          <ResultRow label="KUV" value={ps === null ? 'n. a. (kein Umsatz)' : fmtNum(ps, 2)} strong />
          <ResultRow label="Dividendenrendite" value={fmtPct((stock.annualDividend / price) * 100)} />
        </div>
      </div>
      <p className="text-xs text-slate-500">{stock.description}</p>
    </div>
  );
}
