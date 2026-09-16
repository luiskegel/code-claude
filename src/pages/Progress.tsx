import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LESSONS, TRACKS, getLesson, lessonsOfTrack } from '../content'
import { PLAN_30, QUICKSTART } from '../content/plans'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { resetAll } from '../lib/storage'
import { useAppState } from '../lib/useStore'

export default function Progress() {
  const state = useAppState()
  const [confirmReset, setConfirmReset] = useState(false)

  const done = LESSONS.filter((l) => state.lessons[l.slug] === 'done')
  const started = LESSONS.filter((l) => state.lessons[l.slug] === 'started')
  const percent = Math.round((done.length / LESSONS.length) * 100)

  const quizEntries = Object.entries(state.quiz)
  const quizCorrect = quizEntries.reduce((a, [, r]) => a + r.correct, 0)
  const quizTotal = quizEntries.reduce((a, [, r]) => a + r.total, 0)

  const next = LESSONS.find((l) => state.lessons[l.slug] !== 'done')
  const last = state.lastLesson ? getLesson(state.lastLesson) : undefined

  return (
    <Layout width="wide">
      <Seo
        title="Fortschritt"
        description="Dein Lernstand in der Claude Academy: abgeschlossene Lektionen, Quiz-Ergebnisse und was als Nächstes dran ist."
        path="/fortschritt"
      />

      <div className="prose" style={{ maxWidth: '900px' }}>
        <h1>Dein Fortschritt</h1>
        <p className="lesson__desc">
          Alles wird nur lokal in deinem Browser gespeichert. Es gibt keine Anmeldung und keine
          Übertragung – wenn du den Browser-Speicher löschst, ist der Stand weg.
        </p>

        <div className="grid grid--3" style={{ margin: 'var(--sp-5) 0' }}>
          <div className="stat">
            <p className="stat__value">{percent} %</p>
            <p className="stat__label">Lernpfad abgeschlossen</p>
          </div>
          <div className="stat">
            <p className="stat__value">
              {done.length}
              <span style={{ fontSize: 'var(--step-0)', color: 'var(--text-subtle)' }}>
                /{LESSONS.length}
              </span>
            </p>
            <p className="stat__label">Lektionen fertig</p>
          </div>
          <div className="stat">
            <p className="stat__value">
              {quizTotal > 0 ? `${quizCorrect}/${quizTotal}` : '–'}
            </p>
            <p className="stat__label">Quizfragen richtig</p>
          </div>
        </div>

        <div className="progressbar" style={{ marginBottom: 'var(--sp-6)' }}>
          <div className="progressbar__fill" style={{ width: `${percent}%` }} />
        </div>

        {(last || next) && (
          <div className="continue" style={{ marginBottom: 'var(--sp-6)' }}>
            <div style={{ minWidth: 0 }}>
              <p className="continue__label">{last ? 'Zuletzt' : 'Empfehlung'}</p>
              <p className="continue__title">{(last ?? next)?.title}</p>
              {next && last && next.slug !== last.slug && (
                <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
                  Als Nächstes offen: {next.title}
                </p>
              )}
            </div>
            <Link
              to={`/lektion/${(last ?? next)!.slug}`}
              className="btn btn--primary"
              style={{ marginLeft: 'auto' }}
            >
              Weiterlernen →
            </Link>
          </div>
        )}

        <section className="section" style={{ marginTop: 0 }}>
          <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
            Nach Themen
          </h2>
          <div className="grid grid--2">
            {TRACKS.map((track) => {
              const lessons = lessonsOfTrack(track.id)
              const trackDone = lessons.filter((l) => state.lessons[l.slug] === 'done').length
              const trackPercent = Math.round((trackDone / lessons.length) * 100)
              return (
                <Link key={track.id} to={`/thema/${track.id}`} className="card">
                  <p className="card__title">
                    <span aria-hidden="true" style={{ opacity: 0.6, marginRight: '0.35em' }}>
                      {track.icon}
                    </span>
                    {track.title}
                  </p>
                  <p className="card__desc" style={{ marginBottom: 'var(--sp-3)' }}>
                    {trackDone} von {lessons.length} Lektionen
                  </p>
                  <div className="progressbar">
                    <div className="progressbar__fill" style={{ width: `${trackPercent}%` }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {quizEntries.length > 0 && (
          <section className="section">
            <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
              Quiz-Ergebnisse
            </h2>
            <div className="tablewrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Lektion</th>
                    <th scope="col">Ergebnis</th>
                  </tr>
                </thead>
                <tbody>
                  {quizEntries
                    .sort((a, b) => b[1].at - a[1].at)
                    .map(([slug, result]) => {
                      const lesson = getLesson(slug)
                      if (!lesson) return null
                      return (
                        <tr key={slug}>
                          <td>
                            <Link to={`/lektion/${slug}`}>{lesson.title}</Link>
                          </td>
                          <td>
                            <span
                              className={`badge${
                                result.correct === result.total ? ' badge--done' : ''
                              }`}
                            >
                              {result.correct}/{result.total}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {started.length > 0 && (
          <section className="section">
            <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
              Angefangen, aber nicht abgeschlossen ({started.length})
            </h2>
            <ul className="pathlist">
              {started.map((lesson) => (
                <li key={lesson.slug}>
                  <Link to={`/lektion/${lesson.slug}`} className="pathitem">
                    <span className="pathitem__num pathitem__num--started" aria-hidden="true">
                      ·
                    </span>
                    <span className="pathitem__body">
                      <span className="pathitem__title">{lesson.title}</span>
                      <span className="pathitem__desc">{lesson.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="section">
          <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
            Lernpläne
          </h2>
          <div className="grid grid--2">
            <Link to="/schnellstart" className="card">
              <p className="card__title">Claude in 15 Minuten</p>
              <p className="card__desc">
                {state.quickstart.length} von {QUICKSTART.length} Schritten erledigt
              </p>
            </Link>
            <Link to="/30-tage" className="card">
              <p className="card__title">30-Tage-Lernplan</p>
              <p className="card__desc">
                {state.planDays.length} von {PLAN_30.length} Tagen abgehakt
              </p>
            </Link>
          </div>
        </section>

        <section className="section">
          <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
            Fortschritt zurücksetzen
          </h2>
          <div className="callout callout--warn">
            <p style={{ marginBottom: 'var(--sp-3)' }}>
              Setzt alle abgeschlossenen Lektionen, Quiz-Ergebnisse, Favoriten und Lernpläne
              zurück. Das lässt sich nicht rückgängig machen.
            </p>
            {confirmReset ? (
              <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    resetAll()
                    setConfirmReset(false)
                  }}
                >
                  Ja, alles zurücksetzen
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => setConfirmReset(false)}>
                  Abbrechen
                </button>
              </div>
            ) : (
              <button type="button" className="btn" onClick={() => setConfirmReset(true)}>
                Fortschritt zurücksetzen
              </button>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}
