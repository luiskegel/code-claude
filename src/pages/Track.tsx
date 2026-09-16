import { Link, Navigate, useParams } from 'react-router-dom'
import { TRACKS, getTrack, lessonsOfTrack } from '../content'
import type { TrackId } from '../content/types'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { useAppState } from '../lib/useStore'
import { IconClock } from '../components/Icons'

export default function Track() {
  const { id = '' } = useParams()
  const track = TRACKS.some((t) => t.id === id) ? getTrack(id as TrackId) : undefined
  const state = useAppState()

  if (!track) return <Navigate to="/404" replace />

  const lessons = lessonsOfTrack(track.id)
  const done = lessons.filter((l) => state.lessons[l.slug] === 'done').length
  const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0
  const firstOpen = lessons.find((l) => state.lessons[l.slug] !== 'done') ?? lessons[0]

  return (
    <Layout width="wide">
      <Seo
        title={track.title}
        description={`${track.tagline} – ${lessons.length} Lektionen in der Claude Academy.`}
        path={`/thema/${track.id}`}
      />

      <div className="prose" style={{ maxWidth: '900px' }}>
        <nav className="breadcrumb" aria-label="Sie befinden sich hier">
          <Link to="/lernpfad">Lernpfad</Link>
          <span aria-hidden="true">→</span>
          <span>{track.title}</span>
        </nav>

        <h1>
          <span aria-hidden="true" style={{ opacity: 0.6, marginRight: '0.3em' }}>
            {track.icon}
          </span>
          {track.title}
        </h1>
        <p className="lesson__desc">{track.tagline}</p>

        <div className="lesson__meta" style={{ marginBottom: 'var(--sp-5)' }}>
          <span className="badge badge--accent">{track.levelLabel}</span>
          <span className="badge">{lessons.length} Lektionen</span>
          <span className="badge">
            <IconClock size={12} /> {lessons.reduce((a, l) => a + l.minutes, 0)} Min gesamt
          </span>
          {done > 0 && (
            <span className="badge badge--done">
              {done}/{lessons.length} abgeschlossen
            </span>
          )}
        </div>

        {done > 0 && done < lessons.length && (
          <div style={{ marginBottom: 'var(--sp-5)' }}>
            <div className="progressbar">
              <div className="progressbar__fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}

        {firstOpen && (
          <p style={{ marginBottom: 'var(--sp-5)' }}>
            <Link to={`/lektion/${firstOpen.slug}`} className="btn btn--primary btn--lg">
              {done === 0 ? 'Mit der ersten Lektion starten' : 'Hier weitermachen'} →
            </Link>
          </p>
        )}

        <ul className="pathlist">
          {lessons.map((lesson, i) => {
            const status = state.lessons[lesson.slug]
            return (
              <li key={lesson.slug}>
                <Link to={`/lektion/${lesson.slug}`} className="pathitem">
                  <span
                    className={`pathitem__num${
                      status === 'done'
                        ? ' pathitem__num--done'
                        : status === 'started'
                          ? ' pathitem__num--started'
                          : ''
                    }`}
                    aria-hidden="true"
                  >
                    {status === 'done' ? '✓' : i + 1}
                  </span>
                  <span className="pathitem__body">
                    <span className="pathitem__title">{lesson.title}</span>
                    <span className="pathitem__desc">{lesson.description}</span>
                  </span>
                  <span className="pathitem__meta">
                    <IconClock size={12} />
                    {lesson.minutes}′
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <section className="section">
          <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
            Andere Themen
          </h2>
          <div className="grid grid--3">
            {TRACKS.filter((t) => t.id !== track.id).map((t) => (
              <Link key={t.id} to={`/thema/${t.id}`} className="card">
                <p className="card__title">
                  <span aria-hidden="true" style={{ opacity: 0.6, marginRight: '0.35em' }}>
                    {t.icon}
                  </span>
                  {t.title}
                </p>
                <p className="card__desc">{t.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
