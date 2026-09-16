import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PROMPTS, PROMPT_CATEGORIES } from '../content/prompts'
import { getLesson } from '../content'
import type { PromptCategory } from '../content/types'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PromptBlock } from '../components/blocks'
import { Md } from '../lib/markdown'
import { toggleFavorite } from '../lib/storage'
import { useAppState } from '../lib/useStore'
import { IconSearch, IconStar } from '../components/Icons'

export default function PromptLibrary() {
  const [category, setCategory] = useState<PromptCategory | 'alle'>('alle')
  const [query, setQuery] = useState('')
  const state = useAppState()
  const location = useLocation()

  // Anker aus der Suche (z. B. /prompts#analyse-universal) anspringen.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      setCategory('alle')
      setQuery('')
      window.setTimeout(() => el.scrollIntoView({ block: 'start' }), 60)
    }
  }, [location.hash])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROMPTS.filter((p) => {
      if (category !== 'alle' && p.category !== category) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.when.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  return (
    <Layout width="wide">
      <Seo
        title="Prompt-Bibliothek"
        description="Fertige Prompts zum Kopieren und Anpassen: Schreiben, Analysieren, Lernen, Planung und Claude Code – jeder mit Erklärung."
        path="/prompts"
      />

      <div className="prose" style={{ maxWidth: '900px' }}>
        <h1>Prompt-Bibliothek</h1>
        <p className="lesson__desc">
          {PROMPTS.length} erprobte Prompts aus den Lektionen dieser Academy. Jeder mit Zweck,
          Einsatzmoment, Kopier-Schaltfläche und der Erklärung „So passt du ihn an".
        </p>

        <div
          className="header__search"
          style={{ maxWidth: 'none', marginBottom: 'var(--sp-4)', cursor: 'text' }}
        >
          <IconSearch size={15} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Prompt suchen …"
            aria-label="Prompts durchsuchen"
            style={{
              border: 0,
              background: 'transparent',
              outline: 'none',
              flex: 1,
              minWidth: 0,
              font: 'inherit',
              color: 'var(--text)',
            }}
          />
        </div>

        <div className="filterbar">
          <button
            type="button"
            className={`chip${category === 'alle' ? ' chip--active' : ''}`}
            onClick={() => setCategory('alle')}
          >
            Alle ({PROMPTS.length})
          </button>
          {PROMPT_CATEGORIES.map((cat) => {
            const count = PROMPTS.filter((p) => p.category === cat.id).length
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                type="button"
                className={`chip${category === cat.id ? ' chip--active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label} ({count})
              </button>
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="searchdlg__empty">
            Kein Prompt gefunden. Versuch einen anderen Begriff oder wähle „Alle".
          </p>
        )}

        {visible.map((p) => {
          const favId = `prompt:${p.id}`
          const fav = state.favorites.includes(favId)
          const lesson = p.lesson ? getLesson(p.lesson) : undefined

          return (
            <article key={p.id} id={p.id} className="promptcard" style={{ scrollMarginTop: '80px' }}>
              <header className="promptcard__head">
                <h2 className="promptcard__title">
                  {p.name}
                  <span className="badge">{p.level}</span>
                  <button
                    type="button"
                    className={`btn btn--ghost${fav ? ' btn--active' : ''}`}
                    onClick={() => toggleFavorite(favId)}
                    aria-label={fav ? 'Favorit entfernen' : 'Als Favorit speichern'}
                    style={{ marginLeft: 'auto', padding: '0.3rem 0.6rem' }}
                  >
                    <IconStar size={15} filled={fav} />
                  </button>
                </h2>
                <p className="promptcard__purpose">{p.purpose}</p>
              </header>

              <div className="promptcard__section">
                <p className="promptcard__label">Wann verwenden?</p>
                <p style={{ margin: 0, fontSize: 'var(--step--1)' }}>
                  <Md>{p.when}</Md>
                </p>
              </div>

              <div className="promptcard__section">
                <PromptBlock prompt={p.prompt} title="Prompt" />
              </div>

              <div className="promptcard__section">
                <p className="promptcard__label">So passt du ihn an</p>
                <ul style={{ marginBottom: 0, fontSize: 'var(--step--1)' }}>
                  {p.howToAdapt.map((tip, i) => (
                    <li key={i}>
                      <Md>{tip}</Md>
                    </li>
                  ))}
                </ul>
                {lesson && (
                  <p style={{ marginTop: 'var(--sp-3)', marginBottom: 0 }}>
                    <Link to={`/lektion/${lesson.slug}`} className="btn btn--ghost">
                      Zugehörige Lektion: {lesson.title} →
                    </Link>
                  </p>
                )}
              </div>
            </article>
          )
        })}

        <aside className="callout callout--info" style={{ marginTop: 'var(--sp-6)' }}>
          <p className="callout__title">
            <span aria-hidden="true">ℹ</span> Platzhalter erkennen
          </p>
          <p style={{ margin: 0 }}>
            Alles in <code>[ECKIGEN KLAMMERN]</code> ist ein Platzhalter, den du ersetzen musst.
            Sie sind farblich hervorgehoben. Wenn du einen Platzhalter stehen lässt, fragt Claude in
            der Regel nach – das ist kein Fehler, kostet aber eine Runde.
          </p>
        </aside>
      </div>
    </Layout>
  )
}
