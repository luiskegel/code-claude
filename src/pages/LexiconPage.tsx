import { useMemo, useState } from 'react';
import { BookA, Search } from 'lucide-react';
import { GLOSSARY, GLOSSARY_CATEGORIES } from '@/data/glossary';
import type { GlossaryCategory } from '@/types';
import { Badge, Card, PageHeader, cx } from '@/components/ui/ui';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function LexiconPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<GlossaryCategory | 'alle'>('alle');
  const [open, setOpen] = useState<string | null>(null);
  const results = useMemo(() => {
    const q = normalize(query.trim());
    return GLOSSARY.filter(
      (g) => (cat === 'alle' || g.category === cat) && (!q || normalize(g.term).includes(q) || normalize(g.short).includes(q) || normalize(g.long).includes(q)),
    );
  }, [query, cat]);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    GLOSSARY.forEach((g) => m.set(g.category, (m.get(g.category) ?? 0) + 1));
    return m;
  }, []);
  return (
    <>
      <PageHeader icon={<BookA className="h-6 w-6" />} title="Aktien-Lexikon" subtitle={`${GLOSSARY.length} Börsenbegriffe einfach und ausführlich erklärt – mit Praxisbeispielen.`} />
      <div className="sticky top-14 z-10 -mx-4 mb-5 space-y-3 bg-ink-950/90 px-4 py-3 backdrop-blur lg:top-0">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input type="search" className="input pl-9" placeholder="Begriff suchen, z. B. KGV, Dividende, Spread …" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Lexikon durchsuchen" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Nach Kategorie filtern">
          <button className={cx('flex-none rounded-full px-3 py-1 text-xs ring-1 ring-inset transition', cat === 'alle' ? 'bg-accent/15 text-accent-glow ring-accent/30' : 'text-slate-400 ring-white/10 hover:text-white')} onClick={() => setCat('alle')} aria-pressed={cat === 'alle'}>
            Alle ({GLOSSARY.length})
          </button>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button key={c} className={cx('flex-none rounded-full px-3 py-1 text-xs ring-1 ring-inset transition', cat === c ? 'bg-accent/15 text-accent-glow ring-accent/30' : 'text-slate-400 ring-white/10 hover:text-white')} onClick={() => setCat(c)} aria-pressed={cat === c}>
              {c} ({counts.get(c) ?? 0})
            </button>
          ))}
        </div>
      </div>
      <p className="mb-3 text-sm text-slate-500" aria-live="polite">
        {results.length} {results.length === 1 ? 'Begriff' : 'Begriffe'} gefunden
      </p>
      {results.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">Kein Begriff gefunden. Versuche eine andere Schreibweise oder wähle „Alle“.</p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {results.map((g) => {
            const isOpen = open === g.term;
            return (
              <div key={g.term} className="card overflow-hidden">
                <button className="flex w-full items-start justify-between gap-3 p-4 text-left" onClick={() => setOpen(isOpen ? null : g.term)} aria-expanded={isOpen}>
                  <div>
                    <p className="font-semibold text-white">{g.term}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{g.short}</p>
                  </div>
                  <Badge className="flex-none">{g.category}</Badge>
                </button>
                {isOpen && (
                  <div className="space-y-3 border-t border-white/[0.05] px-4 pb-4 pt-3 text-sm">
                    <p className="leading-relaxed text-slate-300">{g.long}</p>
                    <div className="rounded-lg bg-accent/[0.06] p-3 text-slate-200">
                      <span className="font-medium text-accent-glow">Beispiel: </span>
                      {g.example}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
