import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TRACKS } from '../content'
import { loadAllLessons } from '../content/loader'
import type { Lesson } from '../content/types'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { ExerciseCard, Quiz } from '../components/Quiz'
import { MdBlock } from '../lib/markdown'
import { useAppState } from '../lib/useStore'

type Filter = 'uebungen' | 'quiz' | 'aufgaben'

export default function Exercises() {
  const [filter, setFilter] = useState<Filter>('uebungen')
  const [lessons, setLessons] = useState<Lesson[] | null>(null)
  const state = useAppState()

  // Übungen, Quiz und Aufgaben stecken im vollständigen Lektionstext –
  // deshalb werden die Inhalte hier einmalig nachgeladen.
  useEffect(() => {
    let cancelled = false
    loadAllLessons().then((all) => {
      if (!cancelled) setLessons(all)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const withExercise = (lessons ?? []).filter((l) => l.exercise)
  const withQuiz = (lessons ?? []).filter((l) => l.quiz && l.quiz.length > 0)
  const withTask = (lessons ?? []).filter((l) => l.task)

  const quizDone = withQuiz.filter((l) => state.quiz[l.slug]).length

  return (
    <Layout width="wide">
      <Seo
        title="Übungen & Quiz"
        description="Alle interaktiven Übungen, Wissenstests und Mini-Aufgaben der Claude Academy an einem Ort."
        path="/uebungen"
      />

      <div className="prose" style={{ maxWidth: '900px' }}>
        <h1>Übungen &amp; Quiz</h1>
        <p className="lesson__desc">
          Alles zum Mitmachen an einem Ort. Kein Leistungsdruck – nach jeder Antwort bekommst du
          eine Erklärung, auch bei den falschen Optionen.
        </p>

        <div className="grid grid--3" style={{ margin: 'var(--sp-5) 0' }}>
          <div className="stat">
            <p className="stat__value">{withExercise.length}</p>
            <p className="stat__label">Interaktive Übungen</p>
          </div>
          <div className="stat">
            <p className="stat__value">
              {quizDone}/{withQuiz.length}
            </p>
            <p className="stat__label">Quiz bearbeitet</p>
          </div>
          <div className="stat">
            <p className="stat__value">{withTask.length}</p>
            <p className="stat__label">Mini-Aufgaben</p>
          </div>
        </div>

        {!lessons && (
          <p style={{ color: 'var(--text-muted)' }}>Übungen werden geladen …</p>
        )}

        <div className="filterbar">
          <button
            type="button"
            className={`chip${filter === 'uebungen' ? ' chip--active' : ''}`}
            onClick={() => setFilter('uebungen')}
          >
            Übungen ({withExercise.length})
          </button>
          <button
            type="button"
            className={`chip${filter === 'quiz' ? ' chip--active' : ''}`}
            onClick={() => setFilter('quiz')}
          >
            Quiz ({withQuiz.length})
          </button>
          <button
            type="button"
            className={`chip${filter === 'aufgaben' ? ' chip--active' : ''}`}
            onClick={() => setFilter('aufgaben')}
          >
            Mini-Aufgaben ({withTask.length})
          </button>
        </div>

        {filter === 'uebungen' &&
          withExercise.map((lesson) => (
            <section key={lesson.slug} style={{ marginBottom: 'var(--sp-6)' }}>
              <h2 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--sp-2)' }}>
                <Link to={`/lektion/${lesson.slug}`}>{lesson.title}</Link>
              </h2>
              <p
                style={{
                  color: 'var(--text-subtle)',
                  fontSize: '0.8rem',
                  marginBottom: 'var(--sp-3)',
                }}
              >
                {TRACKS.find((t) => t.id === lesson.track)?.title}
              </p>
              <ExerciseCard exercise={lesson.exercise!} />
            </section>
          ))}

        {filter === 'quiz' &&
          withQuiz.map((lesson) => {
            const last = state.quiz[lesson.slug]
            return (
              <section key={lesson.slug} style={{ marginBottom: 'var(--sp-6)' }}>
                <h2 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--sp-2)' }}>
                  <Link to={`/lektion/${lesson.slug}`}>{lesson.title}</Link>
                </h2>
                <div className="lesson__meta" style={{ marginBottom: 'var(--sp-3)' }}>
                  <span className="badge">{lesson.quiz!.length} Fragen</span>
                  {last && (
                    <span className="badge badge--done">
                      Zuletzt: {last.correct}/{last.total}
                    </span>
                  )}
                </div>
                <Quiz questions={lesson.quiz!} slug={lesson.slug} />
              </section>
            )
          })}

        {filter === 'aufgaben' &&
          withTask.map((lesson) => (
            <section key={lesson.slug} style={{ marginBottom: 'var(--sp-5)' }}>
              <h2 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--sp-2)' }}>
                <Link to={`/lektion/${lesson.slug}`}>{lesson.title}</Link>
              </h2>
              <div className="card">
                <MdBlock>{lesson.task!.md}</MdBlock>
                {lesson.task!.solution && (
                  <details className="accordion" style={{ marginTop: 'var(--sp-3)', marginBottom: 0 }}>
                    <summary>Lösung anzeigen</summary>
                    <div className="accordion__body">
                      <MdBlock>{lesson.task!.solution}</MdBlock>
                    </div>
                  </details>
                )}
              </div>
            </section>
          ))}
      </div>
    </Layout>
  )
}
