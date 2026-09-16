import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  LESSONS,
  getLesson,
  getTrack,
  lessonIndex,
  nextLesson,
  prevLesson,
} from '../content'
import { loadLesson } from '../content/loader'
import type { Lesson, SectionKind } from '../content/types'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Blocks } from '../components/blocks'
import { ExerciseCard, Quiz } from '../components/Quiz'
import { Md, MdBlock, stripMd } from '../lib/markdown'
import { markDone, markStarted, toggleFavorite, unmarkDone } from '../lib/storage'
import { useAppState } from '../lib/useStore'
import {
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconStar,
} from '../components/Icons'

const SECTION_TITLE: Record<SectionKind, string> = {
  what: 'Was ist das?',
  why: 'Wofür brauche ich das?',
  how: 'So funktioniert es',
  example: 'Beispiel',
  try: 'Direkt ausprobieren',
  mistakes: 'Häufige Fehler',
  pro: 'Profi-Tipp',
  task: 'Mini-Aufgabe',
  quiz: 'Verstanden?',
  extra: 'Mehr dazu',
}

const SECTION_ID: Record<SectionKind, string> = {
  what: 'was',
  why: 'wofuer',
  how: 'wie',
  example: 'beispiel',
  try: 'ausprobieren',
  mistakes: 'fehler',
  pro: 'profi-tipp',
  task: 'aufgabe',
  quiz: 'quiz',
  extra: 'mehr',
}

type Mode = 'lernen' | 'praxis'

export default function LessonPage() {
  const { slug = '' } = useParams()
  const meta = getLesson(slug)
  const state = useAppState()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [mode, setMode] = useState<Mode>('lernen')
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (!slug || !meta) return undefined
    markStarted(slug)
    setMode('lernen')
    setLesson(null)

    let cancelled = false
    loadLesson(slug).then((full) => {
      if (!cancelled && full) setLesson(full)
    })
    return () => {
      cancelled = true
    }
  }, [slug, meta])

  // Beobachtet, welcher Abschnitt gerade sichtbar ist (für die Schnellnavigation).
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('.lesson__section[id]')
    )
    if (headings.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [slug, mode])

  const sections = useMemo(() => {
    if (!lesson) return []
    const list: { kind: SectionKind; id: string; title: string }[] = lesson.sections.map((s) => ({
      kind: s.kind,
      id: SECTION_ID[s.kind],
      title: s.title ?? SECTION_TITLE[s.kind],
    }))
    if (lesson.mistakes?.length) list.push({ kind: 'mistakes', id: 'fehler', title: SECTION_TITLE.mistakes })
    if (lesson.proTip) list.push({ kind: 'pro', id: 'profi-tipp', title: SECTION_TITLE.pro })
    if (lesson.task) list.push({ kind: 'task', id: 'aufgabe', title: SECTION_TITLE.task })
    if (lesson.exercise) list.push({ kind: 'extra', id: 'uebung', title: 'Übung' })
    if (lesson.quiz?.length) list.push({ kind: 'quiz', id: 'quiz', title: SECTION_TITLE.quiz })
    return list
  }, [lesson])

  if (!meta) return <Navigate to="/404" replace />

  const track = getTrack(meta.track)
  const index = lessonIndex(slug)
  const next = nextLesson(slug)
  const prev = prevLesson(slug)
  const status = state.lessons[slug]
  const favId = `lesson:${slug}`
  const fav = state.favorites.includes(favId)
  const lastQuiz = state.quiz[slug]

  const practiceSections =
    lesson?.sections.filter((s) => s.kind === 'try' || s.kind === 'example') ?? []

  const aside = (
    <nav className="toc" aria-label="Schnellnavigation">
      <p className="toc__title">Schnellnavigation</p>
      <ul className="toc__list">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`toc__link${activeSection === s.id ? ' toc__link--active' : ''}`}
            >
              {s.title}
            </a>
          </li>
        ))}
        {next && (
          <li>
            <a href="#weiter" className="toc__link">
              Nächstes Thema
            </a>
          </li>
        )}
      </ul>

      <div className="toc__actions">
        <button
          type="button"
          className={`btn${status === 'done' ? ' btn--active' : ''}`}
          onClick={() => (status === 'done' ? unmarkDone(slug) : markDone(slug))}
        >
          {status === 'done' ? '✓ Abgeschlossen' : '✓ Als abgeschlossen markieren'}
        </button>
        <button
          type="button"
          className={`btn${fav ? ' btn--active' : ''}`}
          onClick={() => toggleFavorite(favId)}
        >
          <IconStar size={14} filled={fav} />
          {fav ? 'Favorit' : 'Favorit speichern'}
        </button>
      </div>
    </nav>
  )

  return (
    <Layout aside={aside}>
      <Seo title={meta.title} description={meta.description} path={`/lektion/${meta.slug}`} />

      <article className="prose">
        <header className="lesson__header">
          <nav className="breadcrumb" aria-label="Sie befinden sich hier">
            <Link to="/lernpfad">Lernpfad</Link>
            <span aria-hidden="true">→</span>
            {track && (
              <>
                <Link to={`/thema/${track.id}`}>{track.title}</Link>
                <span aria-hidden="true">→</span>
              </>
            )}
            <span>{meta.title}</span>
          </nav>

          <h1 className="lesson__title">{meta.title}</h1>
          <p className="lesson__desc">{meta.description}</p>

          <div className="lesson__meta">
            {track && <span className="badge badge--accent">{track.levelLabel}</span>}
            <span className="badge">
              <IconClock size={12} /> {meta.minutes} Min
            </span>
            <span className="badge">
              Lektion {index + 1} von {LESSONS.length}
            </span>
            {status === 'done' && <span className="badge badge--done">✓ Abgeschlossen</span>}
            {status === 'started' && <span className="badge badge--started">angefangen</span>}
            {lastQuiz && (
              <span className="badge">
                Quiz: {lastQuiz.correct}/{lastQuiz.total}
              </span>
            )}
          </div>
        </header>

        {practiceSections.length > 0 && (
          <div className="modebar" role="tablist" aria-label="Ansicht wählen">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'lernen'}
              className={`modebar__btn${mode === 'lernen' ? ' modebar__btn--active' : ''}`}
              onClick={() => setMode('lernen')}
            >
              Lernen
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'praxis'}
              className={`modebar__btn${mode === 'praxis' ? ' modebar__btn--active' : ''}`}
              onClick={() => setMode('praxis')}
            >
              Ausprobieren
            </button>
          </div>
        )}

        {!lesson ? (
          <p style={{ color: 'var(--text-muted)' }}>Lektion wird geladen …</p>
        ) : mode === 'praxis' ? (
          <>
            <section className="lesson__section" id="ausprobieren">
              <h2 className="lesson__section-title">Praxis</h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Nur Beispiel, Prompt, Übung und Lösung – ohne Theorie. Zum Lesen der Erklärungen
                wechsle zurück auf <strong>Lernen</strong>.
              </p>
              {practiceSections.map((s, i) => (
                <Blocks key={i} blocks={s.blocks} />
              ))}
            </section>

            {lesson.task && (
              <section className="lesson__section" id="aufgabe">
                <h2 className="lesson__section-title">{SECTION_TITLE.task}</h2>
                <MdBlock>{lesson.task.md}</MdBlock>
                {lesson.task.solution && (
                  <details className="accordion">
                    <summary>Lösung anzeigen</summary>
                    <div className="accordion__body">
                      <MdBlock>{lesson.task.solution}</MdBlock>
                    </div>
                  </details>
                )}
              </section>
            )}

            {lesson.exercise && (
              <section className="lesson__section" id="uebung">
                <h2 className="lesson__section-title">Übung</h2>
                <ExerciseCard exercise={lesson.exercise} />
              </section>
            )}
          </>
        ) : (
          <>
            {lesson.sections.map((section, i) => (
              <section key={i} className="lesson__section" id={SECTION_ID[section.kind]}>
                <h2 className="lesson__section-title">
                  {section.title ?? SECTION_TITLE[section.kind]}
                </h2>
                <Blocks blocks={section.blocks} />
              </section>
            ))}

            {lesson.mistakes && lesson.mistakes.length > 0 && (
              <section className="lesson__section" id="fehler">
                <h2 className="lesson__section-title">{SECTION_TITLE.mistakes}</h2>
                <ul className="mistakes">
                  {lesson.mistakes.map((m, i) => (
                    <li key={i}>
                      <Md>{m}</Md>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {lesson.proTip && (
              <section className="lesson__section" id="profi-tipp">
                <h2 className="lesson__section-title">{SECTION_TITLE.pro}</h2>
                <aside className="callout callout--tip">
                  <p className="callout__title">
                    <span aria-hidden="true">✦</span> Profi-Tipp
                  </p>
                  <MdBlock>{lesson.proTip}</MdBlock>
                </aside>
              </section>
            )}

            {lesson.task && (
              <section className="lesson__section" id="aufgabe">
                <h2 className="lesson__section-title">{SECTION_TITLE.task}</h2>
                <MdBlock>{lesson.task.md}</MdBlock>
                {lesson.task.solution && (
                  <details className="accordion">
                    <summary>Lösung anzeigen</summary>
                    <div className="accordion__body">
                      <MdBlock>{lesson.task.solution}</MdBlock>
                    </div>
                  </details>
                )}
              </section>
            )}

            {lesson.exercise && (
              <section className="lesson__section" id="uebung">
                <h2 className="lesson__section-title">Übung</h2>
                <ExerciseCard exercise={lesson.exercise} />
              </section>
            )}

            {lesson.quiz && lesson.quiz.length > 0 && (
              <section className="lesson__section" id="quiz">
                <h2 className="lesson__section-title">{SECTION_TITLE.quiz}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>
                  {lesson.quiz.length} kurze Fragen. Kein Leistungsdruck – nach jeder Antwort
                  bekommst du eine Erklärung.
                </p>
                <Quiz questions={lesson.quiz} slug={slug} />
              </section>
            )}
          </>
        )}

        {lesson?.related && lesson.related.length > 0 && (
          <section className="lesson__section" id="verwandt">
            <h2 className="lesson__section-title">Verwandte Themen</h2>
            <div className="grid grid--2">
              {lesson.related
                .map((r) => getLesson(r))
                .filter((l): l is NonNullable<typeof l> => Boolean(l))
                .map((l) => (
                  <Link key={l.slug} to={`/lektion/${l.slug}`} className="card">
                    <p className="card__title">{l.title}</p>
                    <p className="card__desc">{stripMd(l.description)}</p>
                  </Link>
                ))}
            </div>
          </section>
        )}

        <div className="lesson__meta" style={{ marginTop: 'var(--sp-6)' }}>
          <button
            type="button"
            className={`btn${status === 'done' ? ' btn--active' : ' btn--primary'}`}
            onClick={() => (status === 'done' ? unmarkDone(slug) : markDone(slug))}
          >
            {status === 'done' ? '✓ Abgeschlossen' : '✓ Als abgeschlossen markieren'}
          </button>
          <button
            type="button"
            className={`btn${fav ? ' btn--active' : ''}`}
            onClick={() => toggleFavorite(favId)}
          >
            <IconStar size={14} filled={fav} />
            {fav ? 'Als Favorit gespeichert' : 'Favorit speichern'}
          </button>
        </div>

        <nav className="lesson__nav" id="weiter" aria-label="Lektionen-Navigation">
          {prev ? (
            <Link to={`/lektion/${prev.slug}`} className="navcard">
              <p className="navcard__label">
                <IconChevronLeft size={12} /> Vorheriges Thema
              </p>
              <p className="navcard__title">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/lektion/${next.slug}`} className="navcard navcard--next">
              <p className="navcard__label">
                Nächstes Thema <IconChevronRight size={12} />
              </p>
              <p className="navcard__title">{next.title}</p>
            </Link>
          ) : (
            <Link to="/fortschritt" className="navcard navcard--next">
              <p className="navcard__label">Geschafft</p>
              <p className="navcard__title">Zu deinem Fortschritt</p>
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  )
}
