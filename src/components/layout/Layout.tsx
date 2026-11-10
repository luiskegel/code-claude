import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BookA,
  Brain,
  Calculator,
  Eye,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  LineChart,
  ListChecks,
  Menu,
  PieChart,
  Receipt,
  Search,
  Settings,
  ShieldAlert,
  Compass,
  Globe2,
  TrendingUp,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { currentLevel } from '@/lib/progress';
import { TOTAL_LESSONS } from '@/data/curriculum';
import { ProgressBar, cx } from '@/components/ui/ui';
import { SyncBadge } from '@/components/SyncBadge';
import { IS_ARTIFACT } from '@/lib/env';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/kurs', label: 'Mein Aktienkurs', icon: GraduationCap },
  { to: '/grundlagen', label: 'Grundlagen', icon: Landmark },
  { to: '/aktien-verstehen', label: 'Aktien verstehen', icon: PieChart },
  { to: '/aktien-analysieren', label: 'Aktien analysieren', icon: LineChart },
  { to: '/boersenwissen', label: 'Börsenwissen', icon: Globe2 },
  { to: '/strategien', label: 'Investmentstrategien', icon: Compass },
  { to: '/risiko', label: 'Risikomanagement', icon: ShieldAlert },
  { to: '/depot', label: 'Virtuelles Depot', icon: Wallet },
  { to: '/lexikon', label: 'Aktien-Lexikon', icon: BookA },
  { to: '/tests', label: 'Wissenstests', icon: ListChecks },
  { to: '/fortschritt', label: 'Mein Lernfortschritt', icon: TrendingUp },
  { to: '/einstellungen', label: 'Einstellungen', icon: Settings },
];

export const TOOL_NAV: NavItem[] = [
  { to: '/rechner', label: 'Aktien-Rechner', icon: Calculator },
  { to: '/watchlist', label: 'Watchlist & Recherche', icon: Eye },
  { to: '/steuern', label: 'Steuern in Deutschland', icon: Receipt },
];

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <ul className="space-y-0.5">
      {items.map(({ to, label, icon: Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cx(
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
                isActive ? 'bg-accent/10 text-accent-glow' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white',
              )
            }
          >
            <Icon className="h-[18px] w-[18px] flex-none" aria-hidden />
            <span className="truncate">{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { state } = useStore();
  const lvl = currentLevel(state.progress, TOTAL_LESSONS);
  return (
    <div className="flex h-full flex-col">
      <NavLink to="/" onClick={onNavigate} className="flex items-center gap-3 px-3 pb-6 pt-1">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-emerald-700 shadow-lg shadow-accent/20">
          <TrendingUp className="h-5 w-5 text-ink-950" aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-wide text-white">MY STOCK ACADEMY</p>
          <p className="text-[11px] text-slate-500">Meine persönliche Aktien-Akademie</p>
        </div>
      </NavLink>
      <nav aria-label="Hauptnavigation" className="flex-1 overflow-y-auto pr-1">
        <NavList items={MAIN_NAV} onNavigate={onNavigate} />
        <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">Werkzeuge</p>
        <NavList items={TOOL_NAV} onNavigate={onNavigate} />
      </nav>
      <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
          <Brain className="h-4 w-4 text-accent" aria-hidden />
          <span>
            Stufe {lvl.current.level}: <span className="text-slate-200">{lvl.current.title}</span>
          </span>
        </div>
        <ProgressBar value={lvl.share} label="Kursfortschritt" />
        <p className="mt-1.5 text-[11px] text-slate-500">
          {lvl.done} von {TOTAL_LESSONS} Lektionen · {state.progress.points} Punkte
        </p>
        <div className="mt-2 border-t border-white/[0.06] pt-2">
          <SyncBadge />
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-ink-950">
        Zum Inhalt springen
      </a>
      {/* Desktop-Sidebar */}
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/[0.05] bg-ink-900/70 px-3 py-5 backdrop-blur lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile-Topbar */}
      <div style={{ top: 'env(safe-area-inset-top, 0px)' }} className="no-print sticky z-30 flex items-center justify-between border-b border-white/[0.05] bg-ink-900/90 px-4 py-3 backdrop-blur lg:hidden">
        <button className="btn-ghost -ml-2 px-2" onClick={() => setOpen(true)} aria-label="Menü öffnen" aria-expanded={open}>
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-bold tracking-wide">MY STOCK ACADEMY</span>
        <NavLink to="/lexikon" className="btn-ghost -mr-2 px-2" aria-label="Lexikon durchsuchen">
          <Search className="h-5 w-5" />
        </NavLink>
      </div>

      {/* Mobile-Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs animate-fade-up border-r border-white/10 bg-ink-900 px-3 py-5">
            <button className="btn-ghost absolute right-2 top-3 px-2" onClick={() => setOpen(false)} aria-label="Menü schließen">
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main id="main" className="px-4 pb-16 pt-6 sm:px-6 lg:ml-72 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-6xl">{children}</div>
        <footer className="mx-auto mt-16 max-w-6xl border-t border-white/[0.05] pt-6 text-xs leading-relaxed text-slate-500">
          MY STOCK ACADEMY ist eine Lernplattform und <strong className="text-slate-400">keine Anlageberatung</strong>. Es werden keine
          Kauf- oder Verkaufsempfehlungen gegeben und keine echten Handelsaufträge ausgeführt. Alle Kurse im virtuellen Depot sind
          simuliert und beziehen sich auf fiktive Unternehmen. Geldanlagen in Wertpapiere sind mit Risiken bis hin zum Totalverlust
          verbunden. {IS_ARTIFACT ? 'Dein Lernfortschritt wird privat in deinem Claude-Konto gespeichert – nur du kannst ihn sehen.' : 'Dein Lernfortschritt wird ausschließlich lokal in deinem Browser gespeichert.'}
        </footer>
      </main>
    </div>
  );
}
