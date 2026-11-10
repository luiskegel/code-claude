import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { CalendarCheck, Eye, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import type { WatchlistItem } from '@/types';
import { ProxyProvider, SimulatedProvider, type Quote } from '@/lib/market/provider';
import { SIM_STOCKS } from '@/lib/market/simulatedMarket';
import { Callout, Card, CHART, DataBadge, NumberField, PageHeader, TextField, cx } from '@/components/ui/ui';
import { fmtDate, fmtEur, fmtPct } from '@/lib/format';
import { IS_ARTIFACT } from '@/lib/env';

type QuoteState = { status: 'idle' | 'loading' | 'ok' | 'error'; quote?: Quote; history?: { label: string; close: number }[]; error?: string };

function useQuote(item: WatchlistItem): QuoteState {
  const { state } = useStore();
  const day = state.portfolio.day;
  const { dataProvider, proxyBaseUrl } = state.settings;
  const [s, setS] = useState<QuoteState>({ status: 'idle' });
  useEffect(() => {
    let cancelled = false;
    const provider = item.simulatedSymbol
      ? new SimulatedProvider(() => day)
      : !IS_ARTIFACT && dataProvider === 'proxy' && proxyBaseUrl
        ? new ProxyProvider(proxyBaseUrl)
        : null;
    const symbol = item.simulatedSymbol ?? item.symbol;
    if (!provider) {
      setS({ status: 'idle' });
      return;
    }
    setS({ status: 'loading' });
    Promise.all([provider.getQuote(symbol), provider.getHistory(symbol, 60).catch(() => [])])
      .then(([quote, history]) => !cancelled && setS({ status: 'ok', quote, history }))
      .catch((e: Error) => !cancelled && setS({ status: 'error', error: e.message }));
    return () => {
      cancelled = true;
    };
  }, [item.simulatedSymbol, item.symbol, day, dataProvider, proxyBaseUrl]);
  return s;
}

function WatchCard({ item }: { item: WatchlistItem }) {
  const { actions } = useStore();
  const q = useQuote(item);
  const [confirm, setConfirm] = useState(false);
  const up = q.quote ? q.quote.changePct >= 0 : true;
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-slate-500">
            {item.symbol} · {item.sector || 'Branche offen'} · {item.exchange || 'Börsenplatz offen'}
          </p>
        </div>
        <div className="text-right">
          {q.status === 'ok' && q.quote ? (
            <>
              <p className="num text-xl font-semibold text-white">{fmtEur(q.quote.price)}</p>
              <p className={cx('num text-xs', up ? 'text-accent-glow' : 'text-rose-300')}>{fmtPct(q.quote.changePct, 2, true)}</p>
              <div className="mt-1">
                <DataBadge quality={q.quote.quality} detail={`Quelle: ${q.quote.source}, Stand: ${q.quote.asOf}`} />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Stand: {q.quote.asOf}</p>
            </>
          ) : q.status === 'loading' ? (
            <p className="text-sm text-slate-400">Lade Kurs …</p>
          ) : q.status === 'error' ? (
            <p className="max-w-[16rem] text-xs text-rose-300">Kurs nicht verfügbar: {q.error}</p>
          ) : item.manualPrice !== undefined ? (
            <>
              <p className="num text-xl font-semibold text-white">{fmtEur(item.manualPrice)}</p>
              <DataBadge quality="manual" detail={item.manualPriceDate ? `Eingetragen am ${fmtDate(item.manualPriceDate)}` : undefined} />
              {item.manualPriceDate && <p className="mt-1 text-[11px] text-slate-500">Stand: {fmtDate(item.manualPriceDate)}</p>}
            </>
          ) : (
            <p className="text-xs text-slate-500">Kein Kurs hinterlegt</p>
          )}
        </div>
      </div>
      {q.history && q.history.length > 1 && (
        <div className="mt-3 h-16">
          <ResponsiveContainer>
            <LineChart data={q.history}>
              <YAxis hide domain={['auto', 'auto']} />
              <Line dataKey="close" stroke={q.history[q.history.length - 1].close >= q.history[0].close ? CHART.green : CHART.red} dot={false} strokeWidth={1.5} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-slate-500">Kursentwicklung (letzte 60 Handelstage)</p>
        </div>
      )}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <TextField label="Eigene Notizen" multiline value={item.notes} onChange={(v) => actions.updateWatch(item.id, { notes: v })} placeholder="Beobachtungen, offene Fragen, Termine …" />
        <TextField label="Eigene Investmentthese" multiline value={item.thesis} onChange={(v) => actions.updateWatch(item.id, { thesis: v })} placeholder="Warum interessant? Risiken? Wann wäre die These falsch?" />
      </div>
      {!item.simulatedSymbol && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Manueller Kurs (eigene Recherche)"
            suffix="€"
            value={item.manualPrice ?? ''}
            min={0}
            onChange={(v) => actions.updateWatch(item.id, { manualPrice: v === '' ? undefined : v, manualPriceDate: v === '' ? undefined : new Date().toISOString() })}
            help="Wird als „manuell“ mit Datum gekennzeichnet."
          />
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          Hinzugefügt: {fmtDate(item.addedAt)} · Letzte Analyse: {item.lastAnalysis ? fmtDate(item.lastAnalysis) : 'noch keine'}
        </span>
        <div className="flex gap-2">
          <button className="btn-secondary py-1.5 text-xs" onClick={() => actions.updateWatch(item.id, { lastAnalysis: new Date().toISOString() })}>
            <CalendarCheck className="h-3.5 w-3.5" /> Analyse heute durchgeführt
          </button>
          {confirm ? (
            <>
              <button className="btn-danger py-1.5 text-xs" onClick={() => actions.removeWatch(item.id)}>
                Wirklich entfernen
              </button>
              <button className="btn-ghost py-1.5 text-xs" onClick={() => setConfirm(false)}>
                Abbrechen
              </button>
            </>
          ) : (
            <button className="btn-ghost py-1.5 text-xs" onClick={() => setConfirm(true)} aria-label={`${item.name} entfernen`}>
              <Trash2 className="h-3.5 w-3.5" /> Entfernen
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

const EMPTY = { name: '', symbol: '', sector: '', exchange: '' };

export function WatchlistPage() {
  const { state, actions } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [price, setPrice] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [simPick, setSimPick] = useState('');
  const available = useMemo(() => SIM_STOCKS.filter((s) => !state.watchlist.some((w) => w.simulatedSymbol === s.symbol)), [state.watchlist]);

  const add = () => {
    if (form.name.trim().length < 2) return setError('Bitte einen Unternehmensnamen eingeben.');
    if (!/^[A-Za-z0-9.\-:]{1,15}$/.test(form.symbol.trim())) return setError('Bitte ein gültiges Börsenkürzel eingeben (1–15 Zeichen, z. B. SAP oder SAP.DE).');
    if (price !== '' && price < 0) return setError('Der Kurs darf nicht negativ sein.');
    actions.addWatch({
      name: form.name.trim(),
      symbol: form.symbol.trim().toUpperCase(),
      sector: form.sector.trim(),
      exchange: form.exchange.trim(),
      manualPrice: price === '' ? undefined : price,
      manualPriceDate: price === '' ? undefined : new Date().toISOString(),
      notes: '',
      thesis: '',
    });
    setForm(EMPTY);
    setPrice('');
    setError(null);
  };

  return (
    <>
      <PageHeader
        icon={<Eye className="h-6 w-6" />}
        title="Watchlist & Recherche"
        subtitle="Beobachte Unternehmen, halte Notizen und Investmentthesen fest und dokumentiere, wann du sie zuletzt analysiert hast."
      />
      <div className="mb-6">
        <Callout tone="info" title="Woher kommen die Kurse?">
          Fiktive Unternehmen aus dem virtuellen Depot zeigen <strong>simulierte</strong> Kurse. Für reale Unternehmen kannst du einen Kurs aus eigener Recherche eintragen (gekennzeichnet als <strong>manuell</strong> mit Datum) oder in den{' '}
          <Link to="/einstellungen" className="underline">
            Einstellungen
          </Link>{' '}
          einen eigenen Marktdaten-Proxy verbinden (meist <strong>verzögerte</strong> Daten). API-Schlüssel werden niemals im Browser gespeichert. Aktueller Datenanbieter:{' '}
          <strong>{state.settings.dataProvider === 'proxy' && state.settings.proxyBaseUrl ? `Proxy (${state.settings.proxyBaseUrl})` : 'nur Simulation / manuell'}</strong>.
        </Callout>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">Unternehmen hinzufügen</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Unternehmensname" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="z. B. Siemens AG" />
            <TextField label="Börsenkürzel" value={form.symbol} onChange={(v) => setForm((f) => ({ ...f, symbol: v }))} placeholder="z. B. SIE.DE" />
            <TextField label="Branche" value={form.sector} onChange={(v) => setForm((f) => ({ ...f, sector: v }))} placeholder="z. B. Industrie" />
            <TextField label="Börsenplatz" value={form.exchange} onChange={(v) => setForm((f) => ({ ...f, exchange: v }))} placeholder="z. B. Xetra" />
            <NumberField label="Kurs aus eigener Recherche (optional)" suffix="€" value={price} onChange={setPrice} min={0} />
          </div>
          {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
          <button className="btn-primary mt-4" onClick={add}>
            <Plus className="h-4 w-4" /> Zur Watchlist hinzufügen
          </button>
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">Fiktives Unternehmen aus der Simulation beobachten</h2>
          <p className="mb-3 text-sm text-slate-400">Diese Unternehmen haben simulierte Kurse, die sich mit dem virtuellen Depot weiterentwickeln.</p>
          <select className="input" value={simPick} onChange={(e) => setSimPick(e.target.value)} aria-label="Simuliertes Unternehmen wählen">
            <option value="">Bitte wählen …</option>
            {available.map((s) => (
              <option key={s.symbol} value={s.symbol}>
                {s.name} ({s.symbol})
              </option>
            ))}
          </select>
          <button
            className="btn-secondary mt-4"
            disabled={!simPick}
            onClick={() => {
              const s = SIM_STOCKS.find((x) => x.symbol === simPick);
              if (!s) return;
              actions.addWatch({ name: s.name, symbol: s.symbol, sector: s.sector, exchange: s.exchange, simulatedSymbol: s.symbol, notes: '', thesis: '' });
              setSimPick('');
            }}
          >
            <Plus className="h-4 w-4" /> Hinzufügen
          </button>
        </Card>
      </div>
      {state.watchlist.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">Deine Watchlist ist noch leer. Füge oben ein Unternehmen hinzu.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {state.watchlist.map((w) => (
            <WatchCard key={w.id} item={w} />
          ))}
        </div>
      )}
    </>
  );
}
