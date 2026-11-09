import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Eye, FastForward, FlaskConical, RotateCcw, ShoppingCart, Wallet } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { SIM_STOCKS, simCandles, simPrice } from '@/lib/market/simulatedMarket';
import { dividendsReceived, positionValue, realizedPnL, totalValue, TradeError } from '@/lib/portfolio';
import { maxDrawdown } from '@/lib/calculations';
import { Badge, Callout, Card, CardHeader, CHART, DataBadge, NumberField, PageHeader, Stat, Tabs, cx } from '@/components/ui/ui';
import { fmtEur, fmtNum, fmtPct, fmtDateTime } from '@/lib/format';

const TX_LABEL = { BUY: 'Kauf', SELL: 'Verkauf', DIVIDEND: 'Dividende', FEE: 'Gebühr', RESET: 'Reset' } as const;

export function DepotPage() {
  const { state, actions } = useStore();
  const pf = state.portfolio;
  const [selected, setSelected] = useState(SIM_STOCKS[0].symbol);
  const [qty, setQty] = useState<number | ''>(10);
  const [message, setMessage] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);
  const [tab, setTab] = useState<'positions' | 'market' | 'history'>('market');
  const [confirmReset, setConfirmReset] = useState(false);

  const total = totalValue(pf);
  const invested = pf.positions.reduce((s, p) => s + p.avgPrice * p.shares, 0);
  const marketValue = total - pf.cash;
  const unrealized = marketValue - invested;
  const realized = realizedPnL(pf);
  const divs = dividendsReceived(pf);
  const perf = (total / pf.startCapital - 1) * 100;
  const mdd = maxDrawdown(pf.history.map((h) => h.value));

  const stock = SIM_STOCKS.find((s) => s.symbol === selected)!;
  const price = simPrice(selected, pf.day);
  const prev = simPrice(selected, pf.day - 1);
  const holding = pf.positions.find((p) => p.symbol === selected);
  const chart = useMemo(() => simCandles(selected, pf.day, 120).map((c) => ({ day: c.day, close: c.close })), [selected, pf.day]);
  const cost = typeof qty === 'number' ? qty * price + pf.feePerTrade : 0;

  const trade = (side: 'buy' | 'sell') => {
    try {
      if (qty === '') throw new TradeError('Bitte eine Stückzahl eingeben.');
      if (side === 'buy') actions.buyStock(selected, qty);
      else actions.sellStock(selected, qty);
      setMessage({ tone: 'ok', text: `Simulation: ${qty} × ${stock.name} ${side === 'buy' ? 'gekauft' : 'verkauft'} zu ${fmtEur(price)} (Gebühr ${fmtEur(pf.feePerTrade)}).` });
    } catch (e) {
      setMessage({ tone: 'err', text: e instanceof TradeError ? e.message : 'Die Order konnte nicht ausgeführt werden.' });
    }
  };

  const advance = (days: number, label: string) => {
    actions.advance(days);
    setMessage({ tone: 'ok', text: `Die Simulation ist ${label} weitergelaufen.` });
  };

  const inWatchlist = state.watchlist.some((w) => w.simulatedSymbol === selected);

  return (
    <>
      <PageHeader
        icon={<Wallet className="h-6 w-6" />}
        title="Virtuelles Depot"
        subtitle="Übe das Investieren mit 10.000 € virtuellem Spielgeld. Es wird kein echtes Geld bewegt – alle Kurse sind simuliert und gehören zu fiktiven Unternehmen."
        actions={
          <>
            <Badge tone="violet">SIMULATION · kein echtes Geld</Badge>
            <Badge>Simulierter Handelstag {pf.day}</Badge>
          </>
        }
      />
      <div className="mb-6">
        <Callout tone="warn" title="Paper Trading">
          Alle Transaktionen sind Simulationen. Die Kurse werden von einem Zufallsmodell erzeugt und haben nichts mit realen Börsenkursen zu tun. Ziel ist das Üben von Abläufen, Positionsgrößen und Disziplin – nicht das Vorhersagen echter Märkte.
        </Callout>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Depotgesamtwert" value={fmtEur(total)} tone={perf > 0.005 ? 'up' : perf < -0.005 ? 'down' : undefined} hint={`${fmtPct(perf, 2, true)} seit Start (${fmtEur(pf.startCapital, true)})`} />
        <Stat label="Bargeld (virtuell)" value={fmtEur(pf.cash)} hint={`Wertpapiere: ${fmtEur(marketValue)}`} />
        <Stat label="Unrealisierter G/V" value={fmtEur(unrealized)} tone={unrealized > 0.005 ? 'up' : unrealized < -0.005 ? 'down' : undefined} hint={`Realisiert: ${fmtEur(realized)}`} />
        <Stat label="Dividenden (simuliert)" value={fmtEur(divs)} hint={`Max. Drawdown: ${fmtPct(mdd, 1)}`} />
      </div>

      <Card className="mb-6">
        <CardHeader
          title="Simulation steuern"
          subtitle="Lass die Zeit im simulierten Markt vergehen. Dividenden werden an den simulierten Zahltagen automatisch gutgeschrieben."
          icon={<FastForward className="h-4 w-4" />}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary" onClick={() => advance(1, 'einen Handelstag')}>
            +1 Tag
          </button>
          <button className="btn-secondary" onClick={() => advance(5, 'eine Woche')}>
            +1 Woche
          </button>
          <button className="btn-secondary" onClick={() => advance(21, 'einen Monat')}>
            +1 Monat
          </button>
          <button className="btn-secondary" onClick={() => advance(250, 'ein Jahr')}>
            +1 Jahr
          </button>
          <div className="ml-auto flex items-end gap-2">
            <div className="w-36">
              <NumberField label="Gebühr je Order" suffix="€" value={pf.feePerTrade} min={0} step={0.1} onChange={(v) => actions.setFee(v === '' ? 0 : v)} />
            </div>
            {confirmReset ? (
              <div className="flex gap-2">
                <button
                  className="btn-danger"
                  onClick={() => {
                    actions.resetPortfolio();
                    setConfirmReset(false);
                    setMessage({ tone: 'ok', text: 'Das virtuelle Depot wurde auf 10.000 € zurückgesetzt.' });
                  }}
                >
                  Wirklich zurücksetzen
                </button>
                <button className="btn-ghost" onClick={() => setConfirmReset(false)}>
                  Abbrechen
                </button>
              </div>
            ) : (
              <button className="btn-ghost" onClick={() => setConfirmReset(true)}>
                <RotateCcw className="h-4 w-4" /> Depot zurücksetzen
              </button>
            )}
          </div>
        </div>
        {message && (
          <p role="status" className={cx('mt-3 rounded-lg px-3 py-2 text-sm', message.tone === 'ok' ? 'bg-accent/10 text-accent-glow' : 'bg-loss/10 text-rose-200')}>
            {message.text}
          </p>
        )}
      </Card>

      <div className="mb-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">{stock.name}</h2>
              <p className="text-xs text-slate-500">
                {stock.symbol} · {stock.sector} · {stock.exchange} · {stock.country}
              </p>
            </div>
            <DataBadge quality="simulated" detail="Fiktives Unternehmen." />
          </div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="num text-3xl font-semibold text-white">{fmtEur(price)}</span>
            <span className={cx('num text-sm', price >= prev ? 'text-accent-glow' : 'text-rose-300')}>{fmtPct((price / prev - 1) * 100, 2, true)} heute</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={chart}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="day" stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} width={48} tickFormatter={(v) => fmtNum(v, v < 10 ? 2 : 0)} />
                <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Simulierter Tag ${l}`} />
                <Line dataKey="close" name="Kurs" stroke={chart[chart.length - 1]?.close >= chart[0]?.close ? CHART.green : CHART.red} dot={false} strokeWidth={2} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm text-slate-400">{stock.description}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400 sm:grid-cols-4">
            <span>EPS (fiktiv): {fmtEur(stock.fundamentals.eps)}</span>
            <span>KGV: {stock.fundamentals.eps > 0 ? fmtNum(price / stock.fundamentals.eps, 1) : 'n. a.'}</span>
            <span>Dividende p. a.: {fmtEur(stock.annualDividend)}</span>
            <span>Volatilität (Modell): {fmtPct(stock.volatility * 100, 0)}</span>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Order aufgeben (Simulation)" icon={<ShoppingCart className="h-4 w-4" />} />
          <label className="label" htmlFor="stock-select">
            Wertpapier
          </label>
          <select id="stock-select" className="input mb-3" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {SIM_STOCKS.map((s) => (
              <option key={s.symbol} value={s.symbol}>
                {s.name} ({s.symbol})
              </option>
            ))}
          </select>
          <NumberField label="Stückzahl" value={qty} min={1} step={1} onChange={(v) => setQty(v === '' ? '' : Math.floor(v))} />
          <div className="mt-3 space-y-1 text-sm">
            <p className="flex justify-between text-slate-400">
              <span>Kurs (Market Order)</span>
              <span className="num text-slate-200">{fmtEur(price)}</span>
            </p>
            <p className="flex justify-between text-slate-400">
              <span>Ordergebühr</span>
              <span className="num text-slate-200">{fmtEur(pf.feePerTrade)}</span>
            </p>
            <p className="flex justify-between text-slate-400">
              <span>Kaufbetrag inkl. Gebühr</span>
              <span className="num font-semibold text-white">{fmtEur(cost)}</span>
            </p>
            <p className="flex justify-between text-slate-400">
              <span>Im Depot</span>
              <span className="num text-slate-200">{holding ? `${holding.shares} Stk. · Ø ${fmtEur(holding.avgPrice)}` : '–'}</span>
            </p>
            {typeof qty === 'number' && total > 0 && (
              <p className={cx('flex justify-between', cost / total > 0.2 ? 'text-amber-300' : 'text-slate-400')}>
                <span>Anteil am Depot</span>
                <span className="num">{fmtPct((cost / total) * 100, 1)}</span>
              </p>
            )}
          </div>
          {typeof qty === 'number' && cost / total > 0.2 && <p className="mt-2 text-xs text-amber-300">Hinweis: Diese Position wäre größer als 20 % deines Depots (Klumpenrisiko).</p>}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="btn-primary" onClick={() => trade('buy')}>
              Kaufen
            </button>
            <button className="btn-secondary" onClick={() => trade('sell')} disabled={!holding}>
              Verkaufen
            </button>
          </div>
          <button
            className="btn-ghost mt-2 w-full"
            disabled={inWatchlist}
            onClick={() =>
              actions.addWatch({
                name: stock.name,
                symbol: stock.symbol,
                sector: stock.sector,
                exchange: stock.exchange,
                simulatedSymbol: stock.symbol,
                notes: '',
                thesis: '',
              })
            }
          >
            <Eye className="h-4 w-4" /> {inWatchlist ? 'Bereits auf der Watchlist' : 'Zur Watchlist hinzufügen'}
          </button>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader title="Portfolioentwicklung" subtitle="Gesamtwert deines virtuellen Depots je simuliertem Handelstag" />
        {pf.history.length < 2 ? (
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <FlaskConical className="h-4 w-4" /> Kaufe Wertpapiere und lass die Simulation laufen, um die Entwicklung zu sehen.
          </p>
        ) : (
          <div className="h-60">
            <ResponsiveContainer>
              <AreaChart data={pf.history}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="day" stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} width={56} tickFormatter={(v) => fmtNum(v, 0)} />
                <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtEur(v)} labelFormatter={(l) => `Simulierter Tag ${l}`} />
                <Area dataKey="value" name="Depotwert" stroke={CHART.green} fill={CHART.greenSoft} strokeWidth={2} isAnimationActive={false} />
                <Area dataKey="cash" name="Bargeld" stroke={CHART.blue} fill="transparent" strokeDasharray="4 4" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <Card>
        <div className="mb-4">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'market', label: `Markt (${SIM_STOCKS.length})` },
              { id: 'positions', label: `Positionen (${pf.positions.length})` },
              { id: 'history', label: `Transaktionen (${pf.transactions.length})` },
            ]}
          />
        </div>
        {tab === 'market' && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Unternehmen (fiktiv)</th>
                  <th className="py-2 pr-3">Branche</th>
                  <th className="py-2 pr-3 text-right">Kurs</th>
                  <th className="py-2 pr-3 text-right">Heute</th>
                  <th className="py-2 text-right">Seit Start</th>
                </tr>
              </thead>
              <tbody>
                {SIM_STOCKS.map((s) => {
                  const p = simPrice(s.symbol, pf.day);
                  const d = simPrice(s.symbol, pf.day - 1);
                  const s0 = simPrice(s.symbol, 0);
                  return (
                    <tr key={s.symbol} className={cx('cursor-pointer border-t border-white/[0.05] hover:bg-white/[0.02]', selected === s.symbol && 'bg-accent/[0.04]')} onClick={() => setSelected(s.symbol)}>
                      <td className="py-2 pr-3">
                        <button className="text-left text-slate-100 hover:text-accent-glow" onClick={() => setSelected(s.symbol)}>
                          {s.name}
                        </button>
                        <span className="block text-xs text-slate-500">{s.symbol}</span>
                      </td>
                      <td className="py-2 pr-3 text-slate-400">{s.sector}</td>
                      <td className="num py-2 pr-3 text-right">{fmtEur(p)}</td>
                      <td className={cx('num py-2 pr-3 text-right', p >= d ? 'text-accent-glow' : 'text-rose-300')}>{fmtPct((p / d - 1) * 100, 2, true)}</td>
                      <td className={cx('num py-2 text-right', p >= s0 ? 'text-accent-glow' : 'text-rose-300')}>{fmtPct((p / s0 - 1) * 100, 1, true)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'positions' &&
          (pf.positions.length === 0 ? (
            <p className="text-sm text-slate-400">Noch keine Positionen. Wähle ein Unternehmen und kaufe deine erste virtuelle Aktie.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Wertpapier</th>
                    <th className="py-2 pr-3 text-right">Stück</th>
                    <th className="py-2 pr-3 text-right">Ø Kaufpreis</th>
                    <th className="py-2 pr-3 text-right">Kurs</th>
                    <th className="py-2 pr-3 text-right">Wert</th>
                    <th className="py-2 pr-3 text-right">Anteil</th>
                    <th className="py-2 text-right">G/V</th>
                  </tr>
                </thead>
                <tbody>
                  {pf.positions.map((p) => {
                    const v = positionValue(p, pf.day);
                    const s = SIM_STOCKS.find((x) => x.symbol === p.symbol);
                    return (
                      <tr key={p.symbol} className="cursor-pointer border-t border-white/[0.05] hover:bg-white/[0.02]" onClick={() => setSelected(p.symbol)}>
                        <td className="py-2 pr-3 text-slate-100">{s?.name ?? p.symbol}</td>
                        <td className="num py-2 pr-3 text-right">{p.shares}</td>
                        <td className="num py-2 pr-3 text-right">{fmtEur(p.avgPrice)}</td>
                        <td className="num py-2 pr-3 text-right">{fmtEur(v.current)}</td>
                        <td className="num py-2 pr-3 text-right">{fmtEur(v.value)}</td>
                        <td className="num py-2 pr-3 text-right">{fmtPct((v.value / total) * 100, 1)}</td>
                        <td className={cx('num py-2 text-right', v.pnl >= 0 ? 'text-accent-glow' : 'text-rose-300')}>
                          {fmtEur(v.pnl)} ({fmtPct(v.pnlPct, 1, true)})
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        {tab === 'history' &&
          (pf.transactions.length === 0 ? (
            <p className="text-sm text-slate-400">Noch keine Transaktionen.</p>
          ) : (
            <div className="max-h-[28rem] overflow-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="sticky top-0 bg-ink-900 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Sim-Tag</th>
                    <th className="py-2 pr-3">Art</th>
                    <th className="py-2 pr-3">Wertpapier</th>
                    <th className="py-2 pr-3 text-right">Stück</th>
                    <th className="py-2 pr-3 text-right">Kurs / je Aktie</th>
                    <th className="py-2 pr-3 text-right">Betrag</th>
                    <th className="py-2 text-right">Realisiert</th>
                  </tr>
                </thead>
                <tbody>
                  {pf.transactions.map((t) => (
                    <tr key={t.id} className="border-t border-white/[0.05]" title={fmtDateTime(t.at)}>
                      <td className="num py-2 pr-3 text-slate-400">{t.day}</td>
                      <td className="py-2 pr-3">
                        <Badge tone={t.type === 'BUY' ? 'blue' : t.type === 'SELL' ? 'amber' : 'green'}>{TX_LABEL[t.type]}</Badge>
                      </td>
                      <td className="py-2 pr-3 text-slate-200">{t.symbol}</td>
                      <td className="num py-2 pr-3 text-right">{t.shares ?? '–'}</td>
                      <td className="num py-2 pr-3 text-right">{t.price !== undefined ? fmtEur(t.price) : '–'}</td>
                      <td className={cx('num py-2 pr-3 text-right', t.amount >= 0 ? 'text-accent-glow' : 'text-slate-200')}>{fmtEur(t.amount)}</td>
                      <td className={cx('num py-2 text-right', (t.realizedPnL ?? 0) >= 0 ? 'text-accent-glow' : 'text-rose-300')}>{t.realizedPnL !== undefined ? fmtEur(t.realizedPnL) : '–'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </Card>
      <p className="mt-4 text-xs text-slate-500">
        Vereinfachungen der Simulation: Ausführung zum Schlusskurs des simulierten Tages, keine Spreads, keine Steuern, Dividenden brutto. Mehr zu realen Kosten in{' '}
        <Link to="/kurs/m03/m03-l2" className="underline">
          Modul 3
        </Link>{' '}
        und zu Steuern im Bereich{' '}
        <Link to="/steuern" className="underline">
          Steuern
        </Link>
        .
      </p>
    </>
  );
}
