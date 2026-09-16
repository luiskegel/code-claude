import { Link } from 'react-router-dom'
import { PLAN_30 } from '../content/plans'
import { getLesson } from '../content'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Md } from '../lib/markdown'
import { togglePlanDay } from '../lib/storage'
import { useAppState } from '../lib/useStore'
import { IconClock } from '../components/Icons'

const WEEKS = [
  { from: 1, to: 8, title: 'Woche 1 – Grundlagen', sub: 'Was Claude ist, was er kann, erster Prompt.' },
  { from: 9, to: 16, title: 'Woche 2 – Prompting', sub: 'Kontext, Rollen, Beispiele, Formate, Korrekturen.' },
  { from: 17, to: 25, title: 'Woche 3 – Arbeiten mit Claude', sub: 'Texte, Dateien, Recherche, Planung, Lernen.' },
  { from: 26, to: 30, title: 'Woche 4 – Struktur & Sicherheit', sub: 'Projekte, Workflows, Claude Code, Qualität.' },
]

export default function Plan30() {
  const state = useAppState()
  const doneCount = state.planDays.length
  const percent = Math.round((doneCount / PLAN_30.length) * 100)

  return (
    <Layout width="wide">
      <Seo
        title="30-Tage-Lernplan"
        description="Claude in 30 Tagen lernen: jeden Tag 5 bis 15 Minuten, mit Erklärung, Beispiel und Aufgabe."
        path="/30-tage"
      />

      <div className="prose" style={{ maxWidth: '860px' }}>
        <h1>30 Tage Claude lernen</h1>
        <p className="lesson__desc">
          Jeden Tag 5 bis 15 Minuten. Am Ende kennst du die Grundlagen, schreibst gute Prompts,
          arbeitest mit Dateien und Projekten – und weißt, wo die Grenzen liegen.
        </p>

        <div className="lesson__meta" style={{ marginBottom: 'var(--sp-4)' }}>
          <span className="badge badge--accent">30 Tage</span>
          <span className="badge">
            <IconClock size={12} /> {PLAN_30.reduce((a, d) => a + d.minutes, 0)} Minuten gesamt
          </span>
          {doneCount > 0 && (
            <span className="badge badge--done">
              {doneCount}/{PLAN_30.length} Tage erledigt
            </span>
          )}
        </div>

        {doneCount > 0 && (
          <div className="progressbar" style={{ marginBottom: 'var(--sp-5)' }}>
            <div className="progressbar__fill" style={{ width: `${percent}%` }} />
          </div>
        )}

        <aside className="callout callout--info">
          <p className="callout__title">
            <span aria-hidden="true">ℹ</span> Wie du den Plan nutzt
          </p>
          <p style={{ margin: 0 }}>
            Ein Tag = eine Lektion plus die Tagesaufgabe. Wenn du einen Tag verpasst, mach einfach
            weiter – der Plan ist eine Reihenfolge, kein Zeitdruck. Hak jeden Tag ab, dann siehst du
            deinen Stand.
          </p>
        </aside>

        {WEEKS.map((week) => (
          <section key={week.title} className="level">
            <div className="level__head">
              <span className="level__num">{week.title}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>{week.sub}</p>

            {PLAN_30.filter((d) => d.day >= week.from && d.day <= week.to).map((day) => {
              const lesson = day.lesson ? getLesson(day.lesson) : undefined
              const isDone = state.planDays.includes(day.day)

              return (
                <article key={day.day} className="dayrow" id={`tag-${day.day}`} style={{ scrollMarginTop: '80px' }}>
                  <div className="dayrow__num">
                    <p className="dayrow__daylabel">Tag</p>
                    <p className="dayrow__daynum">{day.day}</p>
                  </div>

                  <div className="dayrow__body">
                    <h3 style={{ fontSize: 'var(--step-0)', marginBottom: 'var(--sp-2)' }}>
                      {lesson ? (
                        <Link to={`/lektion/${lesson.slug}`}>{day.title}</Link>
                      ) : (
                        day.title
                      )}
                    </h3>

                    <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)', marginBottom: 'var(--sp-2)' }}>
                      <Md>{day.focus}</Md>
                    </p>

                    <p style={{ fontSize: 'var(--step--1)', marginBottom: 'var(--sp-3)' }}>
                      <strong>Aufgabe: </strong>
                      <Md>{day.task}</Md>
                    </p>

                    <div className="lesson__meta">
                      <span className="badge">
                        <IconClock size={12} /> {day.minutes} Min
                      </span>
                      <button
                        type="button"
                        className={`btn btn--ghost${isDone ? ' btn--active' : ''}`}
                        onClick={() => togglePlanDay(day.day)}
                      >
                        {isDone ? '✓ Erledigt' : 'Abhaken'}
                      </button>
                      {lesson && (
                        <Link to={`/lektion/${lesson.slug}`} className="btn btn--ghost">
                          Zur Lektion →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        ))}

        <section className="section">
          <div className="card" style={{ padding: 'var(--sp-5)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--step-2)', marginBottom: 'var(--sp-3)' }}>
              Nach 30 Tagen
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '48ch', margin: '0 auto var(--sp-4)' }}>
              Du hast die Grundlagen, das Prompting und die tägliche Arbeit abgedeckt. Was dann noch
              offen ist: der vollständige Claude-Code-Pfad und die Profi-Themen – Modelle, API,
              Agenten, Sicherheit.
            </p>
            <div className="hero__cta">
              <Link to="/thema/claude-code" className="btn btn--primary btn--lg">
                Claude Code lernen
              </Link>
              <Link to="/thema/advanced" className="btn btn--lg">
                Profi-Themen ansehen
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
