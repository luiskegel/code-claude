import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadSearchIndex, search, SEARCH_SUGGESTIONS, type SearchHit } from '../lib/search'
import { IconClose, IconSearch } from './Icons'

const TYPE_LABEL: Record<string, string> = {
  lektion: 'Lektion',
  prompt: 'Prompt',
  glossar: 'Glossar',
  seite: 'Seite',
  übung: 'Übung',
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // `ready` hängt mit im Abhängigkeitsfeld, damit die Treffer nach dem
  // Laden des Index neu berechnet werden.
  const hits: SearchHit[] = useMemo(
    () => (ready && query.trim() ? search(query, 14) : []),
    [query, ready]
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // Der Suchindex enthält die vollständigen Lektionstexte und wird
      // deshalb erst beim ersten Öffnen der Suche geladen.
      let cancelled = false
      loadSearchIndex().then(() => {
        if (!cancelled) setReady(true)
      })
      // Fokus erst nach dem Rendern setzen.
      const id = window.setTimeout(() => inputRef.current?.focus(), 30)
      return () => {
        cancelled = true
        window.clearTimeout(id)
      }
    }
    return undefined
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  if (!open) return null

  function go(hit: SearchHit) {
    onClose()
    navigate(hit.doc.url)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, hits.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && hits[active]) {
      e.preventDefault()
      go(hits[active])
    }
  }

  return (
    <div
      className="searchdlg"
      role="dialog"
      aria-modal="true"
      aria-label="Suche"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="searchdlg__panel" onKeyDown={onKeyDown}>
        <div className="searchdlg__inputrow">
          <IconSearch size={19} />
          <input
            ref={inputRef}
            className="searchdlg__input"
            type="search"
            placeholder="Was möchtest du lernen?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Suchbegriff"
            autoComplete="off"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Suche schließen">
            <IconClose size={16} />
          </button>
        </div>

        <div className="searchdlg__results">
          {!query.trim() && (
            <div style={{ padding: 'var(--sp-3)' }}>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-subtle)',
                  marginBottom: 'var(--sp-2)',
                }}
              >
                Beliebte Suchen
              </p>
              <div className="filterbar">
                {SEARCH_SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && !ready && <p className="searchdlg__empty">Suche wird vorbereitet …</p>}

          {query.trim() && ready && hits.length === 0 && (
            <p className="searchdlg__empty">
              Nichts gefunden für „{query}". Versuch es mit einem anderen Wort – zum Beispiel
              „Prompt", „PDF", „Tabelle" oder „Claude Code".
            </p>
          )}

          {hits.map((hit, i) => (
            <button
              key={hit.doc.id}
              type="button"
              className={`searchres${i === active ? ' searchres--active' : ''}`}
              onClick={() => go(hit)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="searchres__top">
                <span className="badge">{TYPE_LABEL[hit.doc.type] ?? hit.doc.type}</span>
                <span className="searchres__title">{hit.doc.title}</span>
              </span>
              <span className="searchres__desc">{hit.doc.desc}</span>
            </button>
          ))}
        </div>

        <div className="searchdlg__hint">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigieren
          </span>
          <span>
            <kbd>↵</kbd> öffnen
          </span>
          <span>
            <kbd>Esc</kbd> schließen
          </span>
        </div>
      </div>
    </div>
  )
}
