import { Link } from 'react-router-dom'
import { getLesson } from '../content'
import { getPrompt } from '../content/prompts'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PromptBlock } from '../components/blocks'
import { Md } from '../lib/markdown'
import { toggleFavorite } from '../lib/storage'
import { useAppState } from '../lib/useStore'
import { IconStar } from '../components/Icons'

export default function Favorites() {
  const state = useAppState()

  const lessons = state.favorites
    .filter((f) => f.startsWith('lesson:'))
    .map((f) => getLesson(f.slice('lesson:'.length)))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))

  const prompts = state.favorites
    .filter((f) => f.startsWith('prompt:'))
    .map((f) => getPrompt(f.slice('prompt:'.length)))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const empty = lessons.length === 0 && prompts.length === 0

  return (
    <Layout width="wide">
      <Seo
        title="Meine Favoriten"
        description="Deine gespeicherten Lektionen und Prompts – lokal in deinem Browser."
        path="/favoriten"
      />

      <div className="prose" style={{ maxWidth: '900px' }}>
        <h1>Meine Favoriten</h1>
        <p className="lesson__desc">
          Alles, was du mit dem Stern gespeichert hast. Die Liste liegt nur in deinem Browser – keine
          Anmeldung, keine Übertragung.
        </p>

        {empty && (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>
            <p style={{ fontSize: 'var(--step-1)', fontWeight: 620 }}>Noch nichts gespeichert</p>
            <p style={{ color: 'var(--text-muted)' }}>
              Klick in einer Lektion oder in der Prompt-Bibliothek auf <IconStar size={14} />{' '}
              <strong>Favorit</strong>, um etwas hier abzulegen.
            </p>
            <p style={{ marginTop: 'var(--sp-4)' }}>
              <Link to="/lernpfad" className="btn btn--primary">
                Zum Lernpfad
              </Link>{' '}
              <Link to="/prompts" className="btn">
                Zur Prompt-Bibliothek
              </Link>
            </p>
          </div>
        )}

        {lessons.length > 0 && (
          <section className="section" style={{ marginTop: 'var(--sp-5)' }}>
            <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
              Lektionen ({lessons.length})
            </h2>
            <div className="grid grid--2">
              {lessons.map((lesson) => (
                <div key={lesson.slug} className="card">
                  <p className="card__title">
                    <Link to={`/lektion/${lesson.slug}`}>{lesson.title}</Link>
                  </p>
                  <p className="card__desc">{lesson.description}</p>
                  <div className="card__meta">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => toggleFavorite(`lesson:${lesson.slug}`)}
                    >
                      <IconStar size={14} filled /> Entfernen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {prompts.length > 0 && (
          <section className="section">
            <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
              Prompts ({prompts.length})
            </h2>
            {prompts.map((p) => (
              <article key={p.id} className="promptcard">
                <header className="promptcard__head">
                  <h3 className="promptcard__title">
                    {p.name}
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => toggleFavorite(`prompt:${p.id}`)}
                      style={{ marginLeft: 'auto' }}
                    >
                      <IconStar size={14} filled /> Entfernen
                    </button>
                  </h3>
                  <p className="promptcard__purpose">{p.purpose}</p>
                </header>
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
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </Layout>
  )
}
