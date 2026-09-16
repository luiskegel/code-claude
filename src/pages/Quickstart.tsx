import { Link } from 'react-router-dom'
import { QUICKSTART } from '../content/plans'
import { getLesson } from '../content'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PromptBlock } from '../components/blocks'
import { MdBlock } from '../lib/markdown'
import { toggleQuickstart } from '../lib/storage'
import { useAppState } from '../lib/useStore'
import { IconClock } from '../components/Icons'

export default function Quickstart() {
  const state = useAppState()
  const total = QUICKSTART.reduce((a, s) => a + s.minutes, 0)
  const doneCount = state.quickstart.length
  const percent = Math.round((doneCount / QUICKSTART.length) * 100)

  return (
    <Layout width="wide">
      <Seo
        title="Claude in 15 Minuten"
        description="Der Schnellstart: In sieben Schritten von null zu den ersten praktischen Ergebnissen mit Claude."
        path="/schnellstart"
      />

      <div className="prose" style={{ maxWidth: '860px' }}>
        <h1>Claude in 15 Minuten</h1>
        <p className="lesson__desc">
          Der kürzeste Weg zu ersten echten Ergebnissen. Nach diesen sieben Schritten kannst du
          Claude praktisch einsetzen – die Vertiefung kommt danach im Lernpfad.
        </p>

        <div className="lesson__meta" style={{ marginBottom: 'var(--sp-4)' }}>
          <span className="badge badge--accent">
            <IconClock size={12} /> {total} Minuten gesamt
          </span>
          <span className="badge">{QUICKSTART.length} Schritte</span>
          {doneCount > 0 && (
            <span className="badge badge--done">
              {doneCount}/{QUICKSTART.length} erledigt
            </span>
          )}
        </div>

        {doneCount > 0 && (
          <div className="progressbar" style={{ marginBottom: 'var(--sp-5)' }}>
            <div className="progressbar__fill" style={{ width: `${percent}%` }} />
          </div>
        )}

        <aside className="callout callout--tip">
          <p className="callout__title">
            <span aria-hidden="true">✦</span> So nutzt du diese Seite
          </p>
          <p style={{ margin: 0 }}>
            Öffne Claude in einem zweiten Fenster. Kopiere die Prompts hier heraus und probiere sie
            direkt aus. Lesen allein bringt wenig – der Effekt entsteht beim Ausprobieren.
          </p>
        </aside>

        {QUICKSTART.map((step, i) => {
          const lesson = step.lesson ? getLesson(step.lesson) : undefined
          const isDone = state.quickstart.includes(i)

          return (
            <section
              key={i}
              id={`schritt-${i + 1}`}
              className="lesson__section"
              style={{ scrollMarginTop: '80px' }}
            >
              <h2 className="lesson__section-title">
                <span style={{ color: 'var(--accent)' }}>{i + 1}.</span> {step.title}
              </h2>

              <div className="lesson__meta" style={{ marginBottom: 'var(--sp-3)' }}>
                <span className="badge">
                  <IconClock size={12} /> {step.minutes} Min
                </span>
                {isDone && <span className="badge badge--done">✓ erledigt</span>}
              </div>

              <MdBlock>{step.md}</MdBlock>

              {step.prompt && <PromptBlock prompt={step.prompt} title="Zum Ausprobieren" />}

              <div className="lesson__meta">
                <button
                  type="button"
                  className={`btn${isDone ? ' btn--active' : ''}`}
                  onClick={() => toggleQuickstart(i)}
                >
                  {isDone ? '✓ Erledigt' : 'Als erledigt markieren'}
                </button>
                {lesson && (
                  <Link to={`/lektion/${lesson.slug}`} className="btn btn--ghost">
                    Ausführliche Lektion: {lesson.title} →
                  </Link>
                )}
              </div>
            </section>
          )
        })}

        <section className="section">
          <div className="card" style={{ padding: 'var(--sp-5)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--step-2)', marginBottom: 'var(--sp-3)' }}>
              Und jetzt?
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '46ch', margin: '0 auto var(--sp-4)' }}>
              Du hast die Grundlagen. Der Lernpfad vertieft jeden dieser Punkte – mit Übungen,
              Beispielen und einem Quiz pro Lektion.
            </p>
            <div className="hero__cta">
              <Link to="/lektion/was-ist-claude" className="btn btn--primary btn--lg">
                Mit Lektion 1 starten
              </Link>
              <Link to="/30-tage" className="btn btn--lg">
                30-Tage-Plan ansehen
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
