import { Link } from 'react-router-dom'
import { LESSONS, lessonsOfTrack, tracksByLevel } from '../content'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { useAppState } from '../lib/useStore'
import { IconClock } from '../components/Icons'

export default function Path() {
  const state = useAppState()
  const doneCount = Object.values(state.lessons).filter((s) => s === 'done').length
  const percent = Math.round((doneCount / LESSONS.length) * 100)

  let counter = 0

  return (
    <Layout width="wide">
      <Seo
        title="Lernpfad"
        description="Alle Lektionen der Claude Academy in der empfohlenen Reihenfolge – von den Grundlagen bis zu den Profi-Themen."
        path="/lernpfad"
      />

      <div className="prose" style={{ maxWidth: '900px' }}>
        <h1>Lernpfad</h1>
        <p className="lesson__desc">
          {LESSONS.length} Lektionen in fünf Levels. Du kannst der Reihenfolge folgen oder direkt
          zum Thema springen, das dich gerade betrifft.
        </p>

        <div style={{ margin: 'var(--sp-5) 0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--step--1)',
              marginBottom: 'var(--sp-2)',
            }}
          >
            <span style={{ fontWeight: 600 }}>Dein Fortschritt</span>
            <span style={{ color: 'var(--text-muted)' }}>
              {doneCount} von {LESSONS.length} · {percent} %
            </span>
          </div>
          <div className="progressbar">
            <div className="progressbar__fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        {tracksByLevel().map((group) => (
          <section key={group.level} className="level">
            <div className="level__head">
              <span className="level__num">Level {group.level}</span>
              <h2 style={{ fontSize: 'var(--step-1)' }}>
                {group.tracks.map((t) => t.title).join(' · ')}
              </h2>
            </div>

            {group.tracks.map((track) => {
              const lessons = lessonsOfTrack(track.id)
              return (
                <div key={track.id} style={{ marginBottom: 'var(--sp-4)' }}>
                  {group.tracks.length > 1 && (
                    <p
                      style={{
                        fontSize: 'var(--step--1)',
                        fontWeight: 650,
                        marginBottom: 'var(--sp-2)',
                      }}
                    >
                      <Link to={`/thema/${track.id}`}>
                        {track.icon} {track.title}
                      </Link>{' '}
                      <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>
                        – {track.tagline}
                      </span>
                    </p>
                  )}

                  <ul className="pathlist">
                    {lessons.map((lesson) => {
                      counter += 1
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
                              {status === 'done' ? '✓' : counter}
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
                </div>
              )
            })}
          </section>
        ))}
      </div>
    </Layout>
  )
}
