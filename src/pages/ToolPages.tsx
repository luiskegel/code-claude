import { useState } from 'react';
import { Calculator, ExternalLink, Receipt } from 'lucide-react';
import { CALCULATORS } from '@/components/calculators/Calculators';
import { Callout, Card, NumberField, PageHeader, ResultRow, cx, Rich } from '@/components/ui/ui';
import { TAX_LAST_UPDATED, TAX_LEGAL_STATUS, TAX_SOURCES, TAX_TOPICS } from '@/data/tax';
import { germanCapitalGainsTax } from '@/lib/calculations';
import { fmtEur, fmtPct } from '@/lib/format';

export function CalculatorsPage() {
  const [active, setActive] = useState<(typeof CALCULATORS)[number]['id']>('rendite');
  const C = CALCULATORS.find((c) => c.id === active)!;
  return (
    <>
      <PageHeader icon={<Calculator className="h-6 w-6" />} title="Aktien-Rechner" subtitle="Zehn Rechner mit automatischer Berechnung, Diagrammen, Erklärungen und Beispielwerten. Alle Ergebnisse sind Modellrechnungen." />
      <div className="mb-5 flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Rechner auswählen">
        {CALCULATORS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={cx('flex-none rounded-xl px-3 py-2 text-sm ring-1 ring-inset transition', active === c.id ? 'bg-accent/15 text-accent-glow ring-accent/30' : 'text-slate-400 ring-white/10 hover:text-white')}
          >
            {i + 1}. {c.title}
          </button>
        ))}
      </div>
      <Card key={active}>
        <C.Component />
      </Card>
    </>
  );
}

function TaxCalculator() {
  const [gain, setGain] = useState<number | ''>(2500);
  const [allowance, setAllowance] = useState<number | ''>(1000);
  const [church, setChurch] = useState<0 | 8 | 9>(0);
  const valid = gain !== '' && +gain >= 0 && allowance !== '' && +allowance >= 0;
  const t = valid ? germanCapitalGainsTax(+gain, +allowance, church) : null;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-3">
        <NumberField label="Kapitalerträge im Jahr" suffix="€" value={gain} onChange={setGain} min={0} />
        <NumberField label="Genutzter Sparer-Pauschbetrag" suffix="€" value={allowance} onChange={setAllowance} min={0} help="1.000 € für Ledige, 2.000 € für zusammen Veranlagte." />
        <div>
          <span className="label">Kirchensteuer</span>
          <div className="flex gap-2">
            {([0, 8, 9] as const).map((k) => (
              <button key={k} className={cx('btn-secondary py-1.5', church === k && '!border-accent/50 !text-accent-glow')} onClick={() => setChurch(k)} aria-pressed={church === k}>
                {k === 0 ? 'keine' : `${k} %`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        {t ? (
          <>
            <ResultRow label="Steuerpflichtiger Betrag" value={fmtEur(t.taxable)} />
            <ResultRow label="Kapitalertragsteuer" value={fmtEur(t.kapest)} />
            <ResultRow label="Solidaritätszuschlag" value={fmtEur(t.soli)} />
            {church > 0 && <ResultRow label="Kirchensteuer" value={fmtEur(t.kist)} />}
            <ResultRow label="Steuern gesamt" value={fmtEur(t.total)} strong />
            <ResultRow label="Effektiver Steuersatz auf den steuerpflichtigen Betrag" value={fmtPct(t.effectivePct, 3)} />
            <ResultRow label="Netto nach Steuern" value={fmtEur(+gain - t.total)} tone="up" />
          </>
        ) : (
          <p className="text-sm text-amber-200">Bitte nicht negative Werte eingeben.</p>
        )}
        <p className="mt-3 text-xs text-slate-500">Vereinfachtes Modell ohne Teilfreistellung, Quellensteuer, Verlustverrechnung und Günstigerprüfung.</p>
      </div>
    </div>
  );
}

export function TaxPage() {
  return (
    <>
      <PageHeader icon={<Receipt className="h-6 w-6" />} title="Steuern in Deutschland" subtitle="Grundlagenwissen für deutsche Privatanleger: Wie werden Dividenden, Kursgewinne und ETFs besteuert?" />
      <div className="mb-6 space-y-3">
        <Callout tone="warn" title="Allgemeine Bildungsinformation – keine Steuerberatung">
          Die Inhalte erklären die Grundregeln vereinfacht. Steuerliche Regelungen können sich ändern und hängen von deiner persönlichen Situation ab. Bei konkreten Fragen wende dich an das Finanzamt, offizielle Informationen des Bundesfinanzministeriums oder an eine Steuerberaterin bzw. einen Steuerberater oder Lohnsteuerhilfeverein.
        </Callout>
        <p className="text-xs text-slate-500">
          Letzte inhaltliche Aktualisierung: <strong className="text-slate-300">{TAX_LAST_UPDATED}</strong> · {TAX_LEGAL_STATUS}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {TAX_TOPICS.map((t) => (
          <Card key={t.id} as="section">
            <h2 className="mb-2 text-base font-semibold">{t.title}</h2>
            <div className="space-y-2 text-sm leading-relaxed text-slate-300">
              {t.paragraphs.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
            {t.example && (
              <p className="mt-3 rounded-lg bg-accent/[0.06] p-3 text-sm text-slate-200">
                <span className="font-medium text-accent-glow">Beispiel: </span>
                {t.example}
              </p>
            )}
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <h2 className="mb-3 text-base font-semibold">Steuer-Rechner Kapitalerträge (vereinfacht)</h2>
        <TaxCalculator />
      </Card>
      <Card className="mt-6">
        <h2 className="mb-3 text-base font-semibold">Offizielle Quellen</h2>
        <ul className="space-y-2 text-sm">
          {TAX_SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-accent-glow">
                <ExternalLink className="h-3.5 w-3.5" /> {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
