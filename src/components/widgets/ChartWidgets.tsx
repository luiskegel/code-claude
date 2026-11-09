// Interaktive Charts: Kerzen, Trends und Indikatoren (simulierte Daten fiktiver Unternehmen)
import { useMemo, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART, DataBadge, cx } from '@/components/ui/ui';
import { simCandles, SIM_STOCKS, type Candle } from '@/lib/market/simulatedMarket';
import { macd, rsi, sma } from '@/lib/calculations';
import { fmtEur, fmtNum } from '@/lib/format';

const axis = { stroke: CHART.axis, fontSize: 11, tickLine: false, axisLine: false } as const;

interface CandleShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: Candle;
}

export function CandleShape({ x = 0, y = 0, width = 0, height = 0, payload }: CandleShapeProps) {
  if (!payload) return null;
  const { open, close, high, low } = payload;
  const up = close >= open;
  const color = up ? CHART.green : CHART.red;
  const range = high - low || 1;
  const ppu = height / range;
  const yOpen = y + (high - open) * ppu;
  const yClose = y + (high - close) * ppu;
  const bodyTop = Math.min(yOpen, yClose);
  const bodyH = Math.max(1, Math.abs(yClose - yOpen));
  const cx_ = x + width / 2;
  const bw = Math.max(2, width * 0.7);
  return (
    <g>
      <line x1={cx_} x2={cx_} y1={y} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={cx_ - bw / 2} y={bodyTop} width={bw} height={bodyH} fill={up ? color : color} fillOpacity={up ? 0.85 : 1} rx={1} />
    </g>
  );
}

function CandleTooltip({ active, payload }: { active?: boolean; payload?: { payload: Candle & { sma20?: number | null } }[] }) {
  if (!active || !payload?.length) return null;
  const c = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/10 bg-ink-850 p-3 text-xs" style={{ background: '#0f1729' }}>
      <p className="mb-1 font-semibold text-slate-200">Simulierter Tag {c.day}</p>
      <p>Eröffnung: {fmtEur(c.open)}</p>
      <p>Hoch: {fmtEur(c.high)}</p>
      <p>Tief: {fmtEur(c.low)}</p>
      <p>Schluss: {fmtEur(c.close)}</p>
      <p className="text-slate-400">Volumen: {c.volume.toLocaleString('de-DE')}</p>
    </div>
  );
}

function StockPicker({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  return (
    <select className="input sm:w-72" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Unternehmen für den Chart wählen">
      {SIM_STOCKS.map((s) => (
        <option key={s.symbol} value={s.symbol}>
          {s.name}
        </option>
      ))}
    </select>
  );
}

/** Kerzenchart mit Volumen sowie markierten Hochs/Tiefs. */
export function CandlestickWidget() {
  const [symbol, setSymbol] = useState('NWE');
  const [count, setCount] = useState(60);
  const [showLevels, setShowLevels] = useState(true);
  const data = useMemo(() => simCandles(symbol, 0, count).map((c) => ({ ...c, range: [c.low, c.high] as [number, number] })), [symbol, count]);
  const lows = data.map((d) => d.low);
  const highs = data.map((d) => d.high);
  const support = Math.min(...lows);
  const resistance = Math.max(...highs);
  const first = data[0]?.close ?? 0;
  const last = data[data.length - 1]?.close ?? 0;
  const half = Math.floor(data.length / 2);
  const trendUp = Math.min(...lows.slice(half)) > Math.min(...lows.slice(0, half)) && Math.max(...highs.slice(half)) > Math.max(...highs.slice(0, half));
  const trendDown = Math.min(...lows.slice(half)) < Math.min(...lows.slice(0, half)) && Math.max(...highs.slice(half)) < Math.max(...highs.slice(0, half));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StockPicker value={symbol} onChange={setSymbol} />
        {[30, 60, 120].map((c) => (
          <button key={c} className={cx('btn-secondary py-1.5', count === c && '!border-accent/50 !text-accent-glow')} onClick={() => setCount(c)}>
            {c} Tage
          </button>
        ))}
        <label className="ml-1 flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" className="accent-green-500" checked={showLevels} onChange={(e) => setShowLevels(e.target.checked)} /> Hoch/Tief einblenden
        </label>
        <DataBadge quality="simulated" />
      </div>
      <div className="h-72 rounded-xl border border-white/[0.05] bg-ink-950/40 p-2">
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="day" {...axis} minTickGap={24} />
            <YAxis yAxisId="p" {...axis} domain={['dataMin', 'dataMax']} width={48} tickFormatter={(v) => fmtNum(v, v < 10 ? 2 : 0)} />
            <YAxis yAxisId="v" hide domain={[0, (max: number) => max * 4]} />
            <Tooltip content={<CandleTooltip />} />
            <Bar yAxisId="v" dataKey="volume" fill="rgba(148,163,184,0.18)" isAnimationActive={false} />
            <Bar yAxisId="p" dataKey="range" shape={<CandleShape />} isAnimationActive={false} />
            {showLevels && <ReferenceLine yAxisId="p" y={support} stroke={CHART.blue} strokeDasharray="4 4" label={{ value: 'Tief (mögliche Unterstützung)', fill: CHART.blue, fontSize: 10, position: 'insideBottomLeft' }} />}
            {showLevels && <ReferenceLine yAxisId="p" y={resistance} stroke={CHART.amber} strokeDasharray="4 4" label={{ value: 'Hoch (möglicher Widerstand)', fill: CHART.amber, fontSize: 10, position: 'insideTopLeft' }} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-slate-400">
        Veränderung im Zeitraum: <span className={last >= first ? 'text-accent-glow' : 'text-rose-300'}>{fmtNum((last / first - 1) * 100, 1)} %</span> ·
        Trend-Einschätzung (zweite vs. erste Hälfte):{' '}
        <strong className="text-slate-200">{trendUp ? 'Aufwärtstrend (höhere Hochs und Tiefs)' : trendDown ? 'Abwärtstrend (tiefere Hochs und Tiefs)' : 'kein eindeutiger Trend / seitwärts'}</strong>
      </p>
    </div>
  );
}

/** Indikator-Labor: gleitende Durchschnitte, RSI und MACD. */
export function IndicatorsWidget() {
  const [symbol, setSymbol] = useState('RHS');
  const [show, setShow] = useState({ sma20: true, sma50: true, rsi: true, macd: true });
  const data = useMemo(() => {
    const candles = simCandles(symbol, 0, 200);
    const closes = candles.map((c) => c.close);
    const s20 = sma(closes, 20);
    const s50 = sma(closes, 50);
    const r = rsi(closes, 14);
    const m = macd(closes);
    return candles.map((c, i) => ({ day: c.day, close: c.close, sma20: s20[i], sma50: s50[i], rsi: r[i], ...m[i] })).slice(60);
  }, [symbol]);
  const lastRsi = data[data.length - 1]?.rsi;
  const toggle = (k: keyof typeof show) => setShow((s) => ({ ...s, [k]: !s[k] }));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StockPicker value={symbol} onChange={setSymbol} />
        {(
          [
            ['sma20', 'SMA 20'],
            ['sma50', 'SMA 50'],
            ['rsi', 'RSI'],
            ['macd', 'MACD'],
          ] as const
        ).map(([k, l]) => (
          <button key={k} aria-pressed={show[k]} className={cx('btn-secondary py-1.5', show[k] && '!border-accent/50 !text-accent-glow')} onClick={() => toggle(k)}>
            {l}
          </button>
        ))}
        <DataBadge quality="simulated" />
      </div>
      <div className="h-60 rounded-xl border border-white/[0.05] bg-ink-950/40 p-2">
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="day" {...axis} minTickGap={24} />
            <YAxis {...axis} domain={['auto', 'auto']} width={48} />
            <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtNum(v, 2)} labelFormatter={(l) => `Tag ${l}`} />
            <Line dataKey="close" name="Kurs" stroke="#e2e8f0" dot={false} strokeWidth={1.5} isAnimationActive={false} />
            {show.sma20 && <Line dataKey="sma20" name="SMA 20" stroke={CHART.amber} dot={false} strokeWidth={1.5} isAnimationActive={false} />}
            {show.sma50 && <Line dataKey="sma50" name="SMA 50" stroke={CHART.violet} dot={false} strokeWidth={1.5} isAnimationActive={false} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {show.rsi && (
        <div className="h-32 rounded-xl border border-white/[0.05] bg-ink-950/40 p-2">
          <ResponsiveContainer>
            <ComposedChart data={data}>
              <XAxis dataKey="day" hide />
              <YAxis {...axis} domain={[0, 100]} ticks={[30, 70]} width={48} />
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtNum(v, 1)} labelFormatter={(l) => `Tag ${l}`} />
              <ReferenceLine y={70} stroke={CHART.red} strokeDasharray="3 3" />
              <ReferenceLine y={30} stroke={CHART.green} strokeDasharray="3 3" />
              <Line dataKey="rsi" name="RSI 14" stroke={CHART.blue} dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
      {show.macd && (
        <div className="h-32 rounded-xl border border-white/[0.05] bg-ink-950/40 p-2">
          <ResponsiveContainer>
            <ComposedChart data={data}>
              <XAxis dataKey="day" hide />
              <YAxis {...axis} width={48} tickFormatter={(v) => fmtNum(v, 1)} />
              <Tooltip {...CHART.tooltip} formatter={(v: number) => fmtNum(v, 2)} labelFormatter={(l) => `Tag ${l}`} />
              <ReferenceLine y={0} stroke={CHART.axis} />
              <Bar dataKey="hist" name="Histogramm" fill="rgba(148,163,184,0.35)" isAnimationActive={false} />
              <Line dataKey="macd" name="MACD" stroke={CHART.green} dot={false} isAnimationActive={false} />
              <Line dataKey="signal" name="Signal" stroke={CHART.red} dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
      <p className="text-sm text-slate-400">
        Aktueller RSI: <strong className="text-slate-200">{lastRsi != null ? fmtNum(lastRsi, 1) : '–'}</strong>
        {lastRsi != null && (lastRsi > 70 ? ' – „überkauft“ (kein sicheres Verkaufssignal!)' : lastRsi < 30 ? ' – „überverkauft“ (kein sicheres Kaufsignal!)' : ' – neutraler Bereich')}. Alle Indikatoren
        beruhen auf vergangenen Kursen und erzeugen auch Fehlsignale.
      </p>
    </div>
  );
}
