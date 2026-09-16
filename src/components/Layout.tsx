import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LESSONS, TRACKS, lessonsOfTrack } from '../content'
import { getTheme, setTheme, type Theme } from '../lib/storage'
import { useAppState } from '../lib/useStore'
import { SearchDialog } from './SearchDialog'
import { IconMenu, IconMoon, IconSearch, IconSun } from './Icons'

/* --------------------------------------------------------------- Header */

function Header({
  onMenu,
  onSearch,
}: {
  onMenu: () => void
  onSearch: () => void
}) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => setThemeState(getTheme()), [])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

  return (
    <header className="header">
      <button type="button" className="icon-btn menu-btn" onClick={onMenu} aria-label="Menü öffnen">
        <IconMenu size={18} />
      </button>

      <Link to="/" className="header__brand">
        <span className="header__mark" aria-hidden="true">
          C
        </span>
        <span className="header__brand-text">Claude Academy</span>
      </Link>

      <div className="header__spacer" />

      <button type="button" className="header__search" onClick={onSearch}>
        <IconSearch size={15} />
        <span>Was möchtest du lernen?</span>
        <kbd>/</kbd>
      </button>

      <div className="header__actions">
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
          title={theme === 'dark' ? 'Helles Design' : 'Dunkles Design'}
        >
          {theme === 'dark' ? <IconSun size={17} /> : <IconMoon size={17} />}
        </button>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------- Sidebar */

const NAV_PAGES = [
  { to: '/lernpfad', label: 'Lernpfad', icon: '◎' },
  { to: '/schnellstart', label: 'Claude in 15 Minuten', icon: '⚡' },
  { to: '/30-tage', label: '30-Tage-Plan', icon: '▦' },
]

const NAV_TOOLS = [
  { to: '/prompts', label: 'Prompt-Bibliothek', icon: '❝' },
  { to: '/prompt-verbessern', label: 'Prompt verbessern', icon: '✦' },
  { to: '/uebungen', label: 'Übungen & Quiz', icon: '✎' },
  { to: '/glossar', label: 'Glossar', icon: 'A' },
  { to: '/favoriten', label: 'Meine Favoriten', icon: '★' },
  { to: '/fortschritt', label: 'Fortschritt', icon: '◑' },
]

function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const location = useLocation()
  const state = useAppState()

  const activeSlug = location.pathname.startsWith('/lektion/')
    ? location.pathname.slice('/lektion/'.length)
    : null
  const activeLesson = activeSlug ? LESSONS.find((l) => l.slug === activeSlug) : undefined

  return (
    <nav
      className={`sidebar${open ? ' sidebar--open' : ''}`}
      aria-label="Hauptnavigation"
      id="sidebar"
    >
      <div className="sidebar__group">
        <p className="sidebar__title">Lernen</p>
        {NAV_PAGES.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="sidebar__group">
        <p className="sidebar__title">Themen</p>
        {TRACKS.map((track) => {
          const lessons = lessonsOfTrack(track.id)
          const done = lessons.filter((l) => state.lessons[l.slug] === 'done').length
          const isOpen = activeLesson?.track === track.id

          return (
            <div key={track.id}>
              <NavLink
                to={`/thema/${track.id}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `sidebar__link${isActive || isOpen ? ' sidebar__link--active' : ''}`
                }
              >
                <span className="sidebar__icon" aria-hidden="true">
                  {track.icon}
                </span>
                {track.title}
                <span className="sidebar__count">
                  {done}/{lessons.length}
                </span>
              </NavLink>

              {isOpen && (
                <ul className="sidebar__lessons">
                  {lessons.map((lesson) => {
                    const status = state.lessons[lesson.slug]
                    return (
                      <li key={lesson.slug}>
                        <NavLink
                          to={`/lektion/${lesson.slug}`}
                          onClick={onNavigate}
                          className={({ isActive }) =>
                            `sidebar__sublink${isActive ? ' sidebar__sublink--active' : ''}`
                          }
                        >
                          <span className="sidebar__status" aria-hidden="true">
                            {status === 'done' ? '✓' : status === 'started' ? '·' : ''}
                          </span>
                          <span>{lesson.title}</span>
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      <div className="sidebar__group">
        <p className="sidebar__title">Werkzeuge</p>
        {NAV_TOOLS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

/* --------------------------------------------------------------- Footer */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p style={{ margin: 0, maxWidth: '38ch' }}>
          <strong>Claude Academy</strong> – eine Lernplattform, die Claude von null an erklärt.
          Fortschritt und Favoriten werden nur lokal in deinem Browser gespeichert.
        </p>
        <nav className="footer__links" aria-label="Fußzeile">
          <Link to="/lernpfad">Lernpfad</Link>
          <Link to="/prompts">Prompts</Link>
          <Link to="/glossar">Glossar</Link>
          <Link to="/uebungen">Übungen</Link>
          <Link to="/fortschritt">Fortschritt</Link>
        </nav>
      </div>
      <p
        style={{
          maxWidth: 1440,
          margin: 'var(--sp-4) auto 0',
          fontSize: '0.78rem',
          color: 'var(--text-subtle)',
        }}
      >
        Angaben zu Modellen, Funktionen und Preisen ändern sich laufend. Maßgeblich ist immer die
        offizielle Dokumentation von Anthropic.
      </p>
    </footer>
  )
}

/* ---------------------------------------------------------------- Shell */

export type ShellWidth = 'default' | 'wide' | 'full'

export function Layout({
  children,
  aside,
  width = 'default',
}: {
  children: React.ReactNode
  aside?: React.ReactNode
  width?: ShellWidth
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  // Globale Tastenkürzel: "/" und Cmd/Ctrl+K öffnen die Suche.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Beim Seitenwechsel: mobiles Menü schließen und nach oben scrollen.
  useEffect(() => {
    setMenuOpen(false)
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.hash])

  const shellClass =
    width === 'full' ? 'shell shell--full' : width === 'wide' ? 'shell shell--wide' : 'shell'

  return (
    <div className="app">
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>

      <Header onMenu={() => setMenuOpen((o) => !o)} onSearch={() => setSearchOpen(true)} />

      <div className={width === 'full' ? 'shell shell--full' : shellClass}>
        {width !== 'full' && <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />}

        <main className="main" id="inhalt">
          {children}
        </main>

        {width === 'default' && aside}
      </div>

      {menuOpen && width !== 'full' && (
        <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Menü schließen" />
      )}

      <Footer />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
