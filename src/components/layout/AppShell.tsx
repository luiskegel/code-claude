import { useEffect, useRef } from 'react';
import { Navigate, Outlet, ScrollRestoration, useLocation } from 'react-router';
import { useSettings } from '../../state/hooks';
import { MobileHeader, MobileTabBar } from './MobileNav';
import { Sidebar } from './Sidebar';
import { StorageNotice } from './StorageNotice';

/** Grundgerüst aller Seiten: Navigation, Hauptbereich und Fokusführung. */
export function AppShell() {
  const { onboardingCompleted } = useSettings();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lastPathname = useRef(location.pathname);

  // Nach einem Seitenwechsel landet der Tastaturfokus im Inhalt – außer eine Seite
  // hat ihn bereits bewusst gesetzt (z. B. auf „Übung starten“). Beim ersten Laden bleibt
  // der Fokus am Dokumentanfang, damit der Skip-Link als Erstes erreichbar ist.
  useEffect(() => {
    if (lastPathname.current === location.pathname) return;
    lastPathname.current = location.pathname;
    const main = mainRef.current;
    if (main && !main.contains(document.activeElement)) main.focus({ preventScroll: true });
  }, [location.pathname]);

  if (!onboardingCompleted) return <Navigate to="/willkommen" replace />;

  return (
    <div className="min-h-dvh">
      <a
        href="#inhalt"
        className="sr-only z-50 rounded-xl bg-accent px-4 py-2 font-medium text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Zum Inhalt springen
      </a>
      <Sidebar />
      <MobileHeader />
      <main ref={mainRef} id="inhalt" tabIndex={-1} className="outline-none lg:pl-64">
        <div
          key={location.pathname}
          className="mx-auto w-full max-w-6xl animate-fade-up px-4 pt-6 pb-28 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10 lg:pb-14"
        >
          <StorageNotice />
          <Outlet />
        </div>
      </main>
      <MobileTabBar />
      <ScrollRestoration />
    </div>
  );
}
