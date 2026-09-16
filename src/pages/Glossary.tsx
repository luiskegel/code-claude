import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GLOSSARY } from '../content/glossary'
import { getLesson } from '../content'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { MdBlock } from '../lib/markdown'
import { slugifyTerm } from '../lib/search'
import { IconSearch } from '../components/Icons'

export default function Glossary() {
  const [query, setQuery] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) window.setTimeout(() => el.scrollIntoView({ block: 'start' }), 60)
  }, [location.hash])

  const sorted = useMemo(
    () => [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, 'de')),
    []
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.short.toLowerCase().includes(q) ||
        g.simple.toLowerCase().includes(q)
    )
  }, [query, sorted])

  const letters = useMemo(
    () => [...new Set(sorted.map((g) => g.term[0].toUpperCase()))],
    [sorted]
  )

  return (
    <Layout width="wide">
      <Seo
        title="Glossar"
        description="Alle Fachbegriffe rund um Claude einfach erklärt: Prompt, Kontext, Token, Halluzination, Git, API, Agent und mehr."
        path="/glossar"
      />

      <div className="prose" style={{ maxWidth: '860px' }}>
        <h1>Glossar</h1>
        <p className="lesson__desc">
          {GLOSSARY.length} Begriffe, die in dieser Academy vorkommen – jeder in einem Satz erklärt,
          mit Beispiel und Verweisen.
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
            placeholder="Begriff suchen …"
            aria-label="Glossar durchsuchen"
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

        {!query && (
          <nav className="alphabar" aria-label="Nach Anfangsbuchstabe springen">
            {letters.map((l) => (
              <a key={l} href={`#buchstabe-${l}`}>
                {l}
              </a>
            ))}
          </nav>
        )}

        {visible.length === 0 && (
          <p className="searchdlg__empty">Kein Begriff gefunden für „{query}".</p>
        )}

        {visible.map((entry, i) => {
          const prevLetter = i > 0 ? visible[i - 1].term[0].toUpperCase() : ''
          const letter = entry.term[0].toUpperCase()
          const lesson = entry.lesson ? getLesson(entry.lesson) : undefined

          return (
            <div key={entry.term}>
              {!query && letter !== prevLetter && (
                <h2
                  id={`buchstabe-${letter}`}
                  style={{
                    fontSize: 'var(--step-1)',
                    margin: 'var(--sp-5) 0 var(--sp-3)',
                    color: 'var(--accent)',
                    scrollMarginTop: '80px',
                  }}
                >
                  {letter}
                </h2>
              )}

              <article className="glossary__entry" id={slugifyTerm(entry.term)}>
                <h3 className="glossary__term">{entry.term}</h3>
                <p className="glossary__short">{entry.short}</p>

                <div className="glossary__block">
                  <p className="glossary__label">Ganz einfach erklärt</p>
                  <MdBlock>{entry.simple}</MdBlock>
                </div>

                {entry.example && (
                  <div className="glossary__block">
                    <p className="glossary__label">Beispiel</p>
                    <MdBlock>{entry.example}</MdBlock>
                  </div>
                )}

                {(entry.seeAlso?.length || lesson) && (
                  <div className="glossary__block">
                    <p className="glossary__label">Siehe auch</p>
                    <p style={{ margin: 0, fontSize: 'var(--step--1)' }}>
                      {entry.seeAlso?.map((term, j) => (
                        <span key={term}>
                          {j > 0 && ' · '}
                          <a href={`#${slugifyTerm(term)}`}>{term}</a>
                        </span>
                      ))}
                      {lesson && (
                        <>
                          {entry.seeAlso?.length ? ' · ' : ''}
                          <Link to={`/lektion/${lesson.slug}`}>Lektion: {lesson.title}</Link>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </article>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
