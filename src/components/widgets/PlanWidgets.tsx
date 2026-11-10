// Analyse-Checkliste (Modul 13) und Investmentplan-Assistent (Modul 15)
import { Printer } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { NumberField, ProgressBar, ResultRow, TextField, Callout, cx } from '@/components/ui/ui';
import { fmtEur, fmtPct } from '@/lib/format';
import { IS_ARTIFACT } from '@/lib/env';

export const ANALYSIS_STEPS = [
  { id: 's1', title: 'Unternehmen auswählen', hint: 'Welches Unternehmen? Warum interessiert es dich? Ausgangsfrage?' },
  { id: 's2', title: 'Geschäftsmodell verstehen', hint: 'Was wird an wen verkauft? Erlösmodell? Segmente?' },
  { id: 's3', title: 'Marktposition untersuchen', hint: 'Marktanteil, Wettbewerbsvorteile, Porters fünf Kräfte.' },
  { id: 's4', title: 'Umsatzentwicklung analysieren', hint: 'Umsatz 5–10 Jahre, CAGR, organisch vs. Übernahmen.' },
  { id: 's5', title: 'Gewinnentwicklung untersuchen', hint: 'Nettogewinn, EBIT, EPS, Margen, Sondereffekte.' },
  { id: 's6', title: 'Verschuldung überprüfen', hint: 'Nettoverschuldung, EK-Quote, Nettoverschuldung/EBITDA, Fälligkeiten.' },
  { id: 's7', title: 'Cashflow untersuchen', hint: 'Operativer Cashflow, Free Cashflow, Cash Conversion.' },
  { id: 's8', title: 'Kennzahlen berechnen', hint: 'KGV, KBV, KUV, FCF-Rendite, Dividendenrendite, ROE.' },
  { id: 's9', title: 'Konkurrenz vergleichen', hint: '2–4 Wettbewerber mit denselben Kennzahlen.' },
  { id: 's10', title: 'Risiken erkennen', hint: 'Risikobericht, Geschäfts-, Finanz-, Rechts-, ESG-Risiken.' },
  { id: 's11', title: 'Unternehmensbewertung durchführen', hint: 'Szenarien: pessimistisch, Basis, optimistisch. Sicherheitsmarge?' },
  { id: 's12', title: 'Eigene Investmentthese formulieren', hint: 'Gründe, Erwartung, Risiken, wann ist die These falsch?' },
];

export function AnalysisChecklistWidget() {
  const { state, actions } = useStore();
  const checks = state.progress.checklist;
  const notes = state.progress.investmentPlan;
  const done = ANALYSIS_STEPS.filter((s) => checks[`analysis-${s.id}`]).length;
  return (
    <div className="space-y-4">
      <TextField label="Analysiertes Unternehmen" value={notes['analysis-company'] ?? ''} onChange={(v) => actions.setPlanField('analysis-company', v)} placeholder="z. B. ein Unternehmen aus dem DAX" />
      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-400">
          <span>Fortschritt der Analyse</span>
          <span>
            {done} / {ANALYSIS_STEPS.length} Schritte
          </span>
        </div>
        <ProgressBar value={done / ANALYSIS_STEPS.length} label="Fortschritt der Analyse" />
      </div>
      <ol className="space-y-2">
        {ANALYSIS_STEPS.map((s, i) => {
          const key = `analysis-${s.id}`;
          const checked = !!checks[key];
          return (
            <li key={s.id} className={cx('rounded-xl border p-3', checked ? 'border-accent/30 bg-accent/[0.04]' : 'border-white/[0.06]')}>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-green-500" checked={checked} onChange={(e) => actions.setChecklist(key, e.target.checked)} />
                <span>
                  <span className="text-sm font-medium text-white">
                    Schritt {i + 1}: {s.title}
                  </span>
                  <span className="block text-xs text-slate-400">{s.hint}</span>
                </span>
              </label>
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-accent-glow">Notizen</summary>
                <textarea
                  className="input mt-2"
                  rows={3}
                  aria-label={`Notizen zu Schritt ${i + 1}`}
                  value={notes[key] ?? ''}
                  onChange={(e) => actions.setPlanField(key, e.target.value)}
                />
              </details>
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-slate-500">Checkliste und Notizen werden lokal in deinem Browser gespeichert. Tipp: Übertrage die Investmentthese in deine Watchlist.</p>
    </div>
  );
}

const PLAN_TEXT_FIELDS = [
  { key: 'goals', label: 'Meine finanziellen Ziele', placeholder: 'z. B. Altersvorsorge ergänzen, Eigenkapital für Wohnung in 8 Jahren …' },
  { key: 'strategy', label: 'Meine langfristige Strategie', placeholder: 'z. B. ETF-Sparplan auf breiten Weltindex als Kern, max. 15 % Einzelaktien …' },
  { key: 'rules', label: 'Meine Anlageregeln', placeholder: 'z. B. keine Kredite, keine Hebelprodukte, max. 5 % je Einzelaktie, 48-Stunden-Regel …' },
  { key: 'crisis', label: 'Mein Krisen-Notfallplan', placeholder: 'z. B. bei −30 %: nichts verkaufen, Sparplan läuft weiter …' },
  { key: 'review', label: 'Regelmäßige Überprüfung', placeholder: 'z. B. jedes Jahr im Januar: Aufteilung, Sparrate, Freistellungsauftrag …' },
  { key: 'learning', label: 'Mein Lernplan', placeholder: 'z. B. schwache Module wiederholen, pro Quartal ein Unternehmen analysieren …' },
];

export function InvestmentPlanWidget() {
  const { state, actions } = useStore();
  const p = state.progress.investmentPlan;
  const num = (k: string, d: number): number | '' => (p[k] === undefined ? d : p[k] === '' ? '' : Number(p[k]));
  const setNum = (k: string) => (v: number | '') => actions.setPlanField(k, v === '' ? '' : String(v));
  const expenses = num('expenses', 1600);
  const income = num('income', 2400);
  const months = num('emergencyMonths', 4);
  const horizon = num('horizon', 20);
  const stockShare = num('stockShare', 60);
  const capital = num('capital', 10000);
  const crash = num('crash', 50);
  const free = +income - +expenses;
  const emergency = +expenses * +months;
  const maxLoss = (+capital * +stockShare * +crash) / 10000;
  const shortHorizon = +horizon < 7 && +stockShare > 40;
  return (
    <div className="space-y-5">
      <Callout tone="info">Dieser Assistent gibt keine Anlageempfehlung. Er hilft dir, deine eigenen Annahmen zu strukturieren und Konsequenzen sichtbar zu machen. Deine Angaben werden nur lokal gespeichert.</Callout>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-white/[0.06] p-4">
          <p className="text-sm font-semibold text-white">1. Budget & Notgroschen</p>
          <NumberField label="Monatliches Nettoeinkommen" suffix="€" value={income} onChange={setNum('income')} min={0} />
          <NumberField label="Monatliche Ausgaben" suffix="€" value={expenses} onChange={setNum('expenses')} min={0} />
          <NumberField label="Notgroschen in Monatsausgaben" suffix="Monate" value={months} onChange={setNum('emergencyMonths')} min={0} max={24} />
          <ResultRow label="Monatlich frei verfügbar" value={fmtEur(free)} tone={free >= 0 ? 'up' : 'down'} />
          <ResultRow label="Empfohlener Notgroschen (deine Annahme)" value={fmtEur(emergency)} strong />
        </div>
        <div className="space-y-3 rounded-xl border border-white/[0.06] p-4">
          <p className="text-sm font-semibold text-white">2. Horizont, Risiko & Aufteilung</p>
          <NumberField label="Anlagehorizont" suffix="Jahre" value={horizon} onChange={setNum('horizon')} min={0} />
          <NumberField label="Anlagebetrag (ohne Notgroschen)" suffix="€" value={capital} onChange={setNum('capital')} min={0} />
          <label className="block">
            <span className="label">Geplanter Aktienanteil: {stockShare} %</span>
            <input type="range" min={0} max={100} step={5} value={+stockShare} onChange={(e) => setNum('stockShare')(+e.target.value)} className="w-full accent-green-500" />
          </label>
          <NumberField label="Angenommener Einbruch der Aktien im Krisenfall" suffix="%" value={crash} onChange={setNum('crash')} min={0} max={100} />
          <ResultRow label="Möglicher Rückgang des Gesamtbetrags" value={`${fmtEur(-maxLoss)} (${fmtPct(-(+stockShare * +crash) / 100, 0)})`} tone="down" strong />
          <div className="flex h-3 overflow-hidden rounded-full" aria-hidden>
            <div className="bg-accent" style={{ width: `${stockShare}%` }} />
            <div className="bg-sky-500/60" style={{ width: `${100 - +stockShare}%` }} />
          </div>
          <p className="text-xs text-slate-500">Grün: Aktien / Aktien-ETFs · Blau: risikoarme Anlagen (Tagesgeld, Festgeld, Anleihen)</p>
        </div>
      </div>
      {free < 0 && <Callout tone="warn">Deine Ausgaben übersteigen dein Einkommen. Vor dem Investieren steht hier die Budgetplanung.</Callout>}
      {shortHorizon && <Callout tone="warn">Dein Anlagehorizont ist kurz, der Aktienanteil aber hoch. Geld, das du in wenigen Jahren brauchst, kann bei einem Crash fehlen.</Callout>}
      <div className="grid gap-4 md:grid-cols-2">
        {PLAN_TEXT_FIELDS.map((f) => (
          <TextField key={f.key} label={f.label} value={p[f.key] ?? ''} onChange={(v) => actions.setPlanField(f.key, v)} placeholder={f.placeholder} multiline />
        ))}
      </div>
      {!IS_ARTIFACT && (
        <button className="btn-secondary no-print" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> Plan drucken / als PDF speichern
        </button>
      )}
    </div>
  );
}
