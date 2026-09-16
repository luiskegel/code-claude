import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { SearchDialog } from '../components/SearchDialog'
import { LESSONS } from '../content'

export default function NotFound() {
  const [searchOpen, setSearchOpen] = useState(false)
  const suggestions = LESSONS.slice(0, 4)

  return (
    <Layout width="full">
      <Seo
        title="Seite nicht gefunden"
        description="Diese Lektion wurde nicht gefunden. Zurück zum Lernpfad oder Suche öffnen."
        path="/404"
      />

      <div className="notfound">
        <p className="notfound__code">404</p>
        <h1 style={{ marginBottom: 'var(--sp-3)' }}>Diese Lektion wurde nicht gefunden.</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--sp-5)' }}>
          Vielleicht hat sich die Adresse geändert oder du hast dich vertippt. Beides ist kein
          Problem – hier geht es weiter.
        </p>

        <div className="hero__cta">
          <Link to="/lernpfad" className="btn btn--primary btn--lg">
            Zurück zum Lernpfad
          </Link>
          <button type="button" className="btn btn--lg" onClick={() => setSearchOpen(true)}>
            Suche öffnen
          </button>
        </div>

        <section className="section" style={{ textAlign: 'left' }}>
          <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
            Beliebte Startpunkte
          </h2>
          <div className="grid grid--2">
            {suggestions.map((l) => (
              <Link key={l.slug} to={`/lektion/${l.slug}`} className="card">
                <p className="card__title">{l.title}</p>
                <p className="card__desc">{l.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </Layout>
  )
}
