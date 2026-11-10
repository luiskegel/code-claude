import { useRef, useState } from 'react';
import { Download, Lock, Plug, Settings, Trash2, Upload } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { exportState, parseImport } from '@/lib/storage';
import { IS_ARTIFACT } from '@/lib/env';
import { SyncBadge } from '@/components/SyncBadge';
import { ProxyProvider } from '@/lib/market/provider';
import { Callout, Card, NumberField, PageHeader, TextField, cx } from '@/components/ui/ui';

function Danger({ label, confirmLabel, onConfirm }: { label: string; confirmLabel: string; onConfirm: () => void }) {
  const [ask, setAsk] = useState(false);
  return ask ? (
    <div className="flex flex-wrap gap-2">
      <button
        className="btn-danger"
        onClick={() => {
          onConfirm();
          setAsk(false);
        }}
      >
        {confirmLabel}
      </button>
      <button className="btn-ghost" onClick={() => setAsk(false)}>
        Abbrechen
      </button>
    </div>
  ) : (
    <button className="btn-danger" onClick={() => setAsk(true)}>
      <Trash2 className="h-4 w-4" /> {label}
    </button>
  );
}

export function SettingsPage() {
  const { state, actions } = useStore();
  const s = state.settings;
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [testMsg, setTestMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [exportText, setExportText] = useState<string | null>(null);

  const copyExport = async () => {
    const text = exportState(state);
    setExportText(text);
    try {
      await navigator.clipboard.writeText(text);
      setMsg({ ok: true, text: 'Sicherung in die Zwischenablage kopiert. Füge sie in eine Textdatei ein und speichere sie als .json.' });
    } catch {
      setMsg({ ok: true, text: 'Markiere den Text unten und kopiere ihn (Strg/Cmd + C) in eine Textdatei.' });
    }
  };

  const download = () => {
    const blob = new Blob([exportState(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-stock-academy-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg({ ok: true, text: 'Sicherung wurde heruntergeladen.' });
  };

  const onImport = async (file: File) => {
    try {
      if (file.size > 5_000_000) throw new Error('Die Datei ist zu groß.');
      const next = parseImport(await file.text());
      actions.replaceState(next);
      setMsg({ ok: true, text: 'Sicherung erfolgreich wiederhergestellt.' });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof SyntaxError ? 'Die Datei enthält kein gültiges JSON.' : (e as Error).message });
    }
  };

  const validUrl = (u: string) => {
    if (!u) return true;
    try {
      const url = new URL(u, window.location.origin);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  };

  const testProxy = async () => {
    setTesting(true);
    setTestMsg(null);
    try {
      const q = await new ProxyProvider(s.proxyBaseUrl || window.location.origin).getQuote('SAP.DE');
      setTestMsg({ ok: true, text: `Verbindung erfolgreich. Beispielkurs SAP.DE: ${q.price} ${q.currency} (Datenqualität: ${q.quality}, Quelle: ${q.source}).` });
    } catch (e) {
      setTestMsg({ ok: false, text: `Keine Verbindung: ${(e as Error).message}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <>
      <PageHeader icon={<Settings className="h-6 w-6" />} title="Einstellungen" subtitle="Persönliche Angaben, Darstellung, Datenanbieter, Datensicherung und Datenschutz." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-semibold">Profil & Lernziel</h2>
          <div className="space-y-4">
            <TextField label="Dein Vorname (für die Begrüßung)" value={s.name} onChange={(v) => actions.updateSettings({ name: v.slice(0, 40) })} placeholder="optional" />
            <NumberField label="Tägliches Lernziel" suffix="Min." value={s.dailyGoalMinutes} min={5} max={240} onChange={(v) => actions.updateSettings({ dailyGoalMinutes: v === '' ? 15 : Math.max(5, Math.min(240, v)) })} />
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input type="checkbox" className="h-4 w-4 accent-green-500" checked={s.reduceMotion} onChange={(e) => actions.updateSettings({ reduceMotion: e.target.checked })} />
              Animationen reduzieren (Barrierefreiheit)
            </label>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 flex items-center gap-2 font-semibold">
            <Plug className="h-4 w-4 text-accent" /> Marktdaten-Anbieter
          </h2>
          <p className="mb-4 text-sm text-slate-400">Standard ist der simulierte Markt. Optional kannst du einen eigenen Backend-Proxy anbinden (siehe README, Ordner „server“).</p>
          <div className="space-y-3">
            {(
              [
                ['simulated', 'Nur Simulation und manuelle Kurse', 'Keine externen Abrufe. Empfohlen zum Lernen.'],
                ['proxy', 'Eigener Marktdaten-Proxy', 'Der Server hält den API-Schlüssel – der Browser nie.'],
              ] as const
            ).map(([id, label, hint]) => (
              <label key={id} className={cx('flex cursor-pointer gap-3 rounded-xl border p-3', s.dataProvider === id ? 'border-accent/40 bg-accent/[0.05]' : 'border-white/[0.06]')}>
                <input type="radio" name="provider" className="mt-1 accent-green-500" disabled={IS_ARTIFACT && id === 'proxy'} checked={s.dataProvider === id} onChange={() => actions.updateSettings({ dataProvider: id })} />
                <span>
                  <span className="text-sm text-white">{label}</span>
                  <span className="block text-xs text-slate-500">{hint}</span>
                </span>
              </label>
            ))}
            {IS_ARTIFACT && (
              <Callout tone="info">In der Claude-Artefakt-Version sind Abrufe externer Server gesperrt. Der Marktdaten-Proxy ist nur in der lokal installierten Version nutzbar (siehe README).</Callout>
            )}
            {s.dataProvider === 'proxy' && !IS_ARTIFACT && (
              <>
                <TextField label="Proxy-Adresse" value={s.proxyBaseUrl} onChange={(v) => actions.updateSettings({ proxyBaseUrl: v.trim() })} placeholder="leer = gleiche Adresse (/api), z. B. http://localhost:8787" />
                {!validUrl(s.proxyBaseUrl) && <p className="text-xs text-rose-300">Bitte eine gültige http(s)-Adresse eingeben.</p>}
                <button className="btn-secondary" onClick={testProxy} disabled={testing || !validUrl(s.proxyBaseUrl)}>
                  {testing ? 'Teste …' : 'Verbindung testen'}
                </button>
                {testMsg && <p className={cx('text-sm', testMsg.ok ? 'text-accent-glow' : 'text-rose-300')}>{testMsg.text}</p>}
                <Callout tone="info">Gib hier niemals einen API-Schlüssel ein. Der Schlüssel gehört in die Datei server/.env auf dem Server.</Callout>
              </>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 font-semibold">Datensicherung</h2>
          {IS_ARTIFACT ? (
            <div className="mb-4 space-y-2 text-sm text-slate-400">
              <SyncBadge detailed />
              <p>Lektionen, Tests, Punkte, Lernzeit, Depot, Watchlist, Notizen und Einstellungen werden automatisch privat in deinem Claude-Konto gespeichert und sind auf allen Geräten verfügbar, auf denen du dieses Artefakt öffnest. Zusätzlich kannst du eine Sicherung kopieren.</p>
            </div>
          ) : (
            <p className="mb-4 text-sm text-slate-400">Dein Fortschritt liegt nur in diesem Browser. Sichere ihn als Datei, um ihn auf ein anderes Gerät zu übertragen.</p>
          )}
          <div className="flex flex-wrap gap-2">
            {IS_ARTIFACT ? (
              <button className="btn-secondary" onClick={copyExport}>
                <Download className="h-4 w-4" /> Sicherung kopieren
              </button>
            ) : (
              <button className="btn-secondary" onClick={download}>
                <Download className="h-4 w-4" /> Sicherung herunterladen
              </button>
            )}
            <button className="btn-secondary" onClick={() => fileRef.current?.click()}>
              <Upload className="h-4 w-4" /> Sicherung wiederherstellen
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onImport(f);
                e.target.value = '';
              }}
            />
          </div>
          {msg && <p className={cx('mt-3 text-sm', msg.ok ? 'text-accent-glow' : 'text-rose-300')}>{msg.text}</p>}
          {exportText && (
            <textarea id="export-json" readOnly className="input mt-3 font-mono text-xs" rows={6} value={exportText} onFocus={(e) => e.target.select()} aria-label="Sicherung als Text" />
          )}
        </Card>

        <Card>
          <h2 className="mb-1 font-semibold">Zurücksetzen</h2>
          <p className="mb-4 text-sm text-slate-400">Diese Aktionen können nicht rückgängig gemacht werden. Erstelle vorher eine Sicherung.</p>
          <div className="space-y-3">
            <Danger label="Lernfortschritt zurücksetzen" confirmLabel="Ja, Lernfortschritt löschen" onConfirm={actions.resetProgress} />
            <Danger label="Virtuelles Depot zurücksetzen" confirmLabel="Ja, Depot auf 10.000 € zurücksetzen" onConfirm={() => actions.resetPortfolio()} />
            <Danger label="Alle Daten löschen" confirmLabel="Ja, alles löschen" onConfirm={actions.resetAll} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="mb-2 flex items-center gap-2 font-semibold">
            <Lock className="h-4 w-4 text-accent" /> Datenschutz & Verantwortung
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-400">
            {IS_ARTIFACT ? (
              <li>Alle Daten (Fortschritt, Depot, Watchlist, Notizen) werden in einem privaten Bereich der Artefakt-Datenbank deines Claude-Kontos gespeichert. Nur du kannst sie lesen – auch Personen, mit denen du das Artefakt teilst, sehen deinen Stand nicht. Eine Kopie liegt zusätzlich im Browser.</li>
            ) : (
              <li>Alle Daten (Fortschritt, Depot, Watchlist, Notizen) werden ausschließlich lokal in deinem Browser (LocalStorage) gespeichert. Es gibt kein Konto und keine Übertragung an Dritte.</li>
            )}
            <li>Es werden keine Tracking- oder Analyse-Dienste verwendet.</li>
            <li>Externe Links öffnen Webseiten Dritter (z. B. BaFin, EZB, Deutsche Börse). Dort gelten deren Datenschutzbestimmungen.</li>
            <li>MY STOCK ACADEMY ist keine Anlageberatung, führt keine echten Handelsaufträge aus und verspricht keine Gewinne.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
