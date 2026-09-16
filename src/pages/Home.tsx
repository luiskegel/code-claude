import { Link } from 'react-router-dom'
import { LESSONS, getLesson, lessonsOfTrack, tracksByLevel } from '../content'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { useAppState } from '../lib/useStore'
import { IconChevronRight, IconClock } from '../components/Icons'

const START_PATHS = [
  {
    to: '/lektion/was-ist-claude',
    icon: '◐',
    title: 'Ich kenne die Grundlagen',
    desc: 'Starte mit Level 1 und arbeite dich durch den Lernpfad.',
  },
  {
    to: '/thema/prompting',
    icon: '◑',
    title: 'Ich möchte bessere Prompts schreiben',
    desc: 'Kontext, Rollen, Beispiele, Formate – Level 2.',
  },
  {
    to: '/thema/work',
    icon: '◒',
    title: 'Ich möchte Claude für meine Arbeit nutzen',
    desc: 'Texte, Analysen, Recherche, Planung – Level 3.',
  },
  {
    to: '/thema/claude-code',
    icon: '▶',
    title: 'Ich möchte Claude Code lernen',
    desc: 'Von „Was ist ein Terminal?" bis zur veröffentlichten Website.',
  },
  {
    to: '/thema/advanced',
    icon: '◕',
    title: 'Ich möchte fortgeschrittene Funktionen lernen',
    desc: 'Modelle, Kontextfenster, API, Agenten, Sicherheit – Level 5.',
  },
]

export default function Home() {
  const state = useAppState()
  const doneCount = Object.values(state.lessons).filter((s) => s === 'done').length
  const percent = Math.round((doneCount / LESSONS.length) * 100)
  const last = state.lastLesson ? getLesson(state.lastLesson) : undefined

  return (
    <Layout width="full">
      <Seo
        title="Claude Academy"
        description="Lerne Claude Schritt für Schritt – verständlich erklärt, mit echten Beispielen, kopierbaren Prompts, Übungen und Quiz. Für komplette Anfänger."
        path="/"
      />

      <section className="hero">
        <p className="hero__eyebrow">
          {LESSONS.length} Lektionen · 5 Level · keine Vorkenntnisse nötig
        </p>
        <h1 className="hero__title">Claude lernen – von 0 auf sicher</h1>
        <p className="hero__sub">
          Lerne Claude Schritt für Schritt: verständlich erklärt, mit echten Beispielen und direkt
          anwendbaren Übungen. Ohne Fachchinesisch, ohne 100 Seiten Dokumentation.
        </p>
        <div className="hero__cta">
          <Link to="/lektion/was-ist-claude" className="btn btn--primary btn--lg">
            Ich bin kompletter Anfänger
          </Link>
          <Link to="/schnellstart" className="btn btn--lg">
            Claude in 15 Minuten
          </Link>
        </div>
      </section>

      {last && (
        <section className="section" aria-labelledby="weiterlernen">
          <div className="continue">
            <div style={{ minWidth: 0 }}>
              <p className="continue__label" id="weiterlernen">
                Weiterlernen
              </p>
              <p className="continue__title">{last.title}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--step--1)', margin: 0 }}>
                {doneCount} von {LESSONS.length} Lektionen abgeschlossen · {percent} %
              </p>
            </div>
            <Link
              to={`/lektion/${last.slug}`}
              className="btn btn--primary"
              style={{ marginLeft: 'auto' }}
            >
              Weiterlernen <IconChevronRight size={16} />
            </Link>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="wo-anfangen">
        <div className="section__head">
          <h2 className="section__title" id="wo-anfangen">
            Wo soll ich anfangen?
          </h2>
          <p className="section__sub">
            Such dir den Einstieg, der zu dir passt. Du kannst jederzeit wechseln.
          </p>
        </div>

        <div className="grid grid--start">
          {START_PATHS.map((p) => (
            <Link key={p.to} to={p.to} className="startcard">
              <span className="startcard__icon" aria-hidden="true">
                {p.icon}
              </span>
              <span className="startcard__body">
                <span className="startcard__title">{p.title}</span>
                <span className="startcard__desc">{p.desc}</span>
              </span>
              <IconChevronRight size={17} className="startcard__arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="lernpfad">
        <div className="section__head">
          <h2 className="section__title" id="lernpfad">
            Der Lernpfad
          </h2>
          <p className="section__sub">
            Fünf Level, die aufeinander aufbauen. Jede Lektion folgt demselben Aufbau: verstehen →
            Beispiel → ausprobieren → Übung → Quiz.
          </p>
        </div>

        <div className="grid grid--2">
          {tracksByLevel().map((group) =>
            group.tracks.map((track) => {
              const lessons = lessonsOfTrack(track.id)
              const done = lessons.filter((l) => state.lessons[l.slug] === 'done').length
              return (
                <Link key={track.id} to={`/thema/${track.id}`} className="card">
                  <div className="card__meta" style={{ marginTop: 0, marginBottom: 'var(--sp-2)' }}>
                    <span className="badge badge--accent">{track.levelLabel}</span>
                    {done > 0 && (
                      <span className="badge badge--done">
                        {done}/{lessons.length}
                      </span>
                    )}
                  </div>
                  <p className="card__title">
                    <span aria-hidden="true" style={{ marginRight: '0.4em', opacity: 0.6 }}>
                      {track.icon}
                    </span>
                    {track.title}
                  </p>
                  <p className="card__desc">{track.tagline}</p>
                  <div className="card__meta">
                    <span className="badge">
                      <IconClock size={12} /> {lessons.reduce((a, l) => a + l.minutes, 0)} Min
                    </span>
                    <span className="badge">{lessons.length} Lektionen</span>
                  </div>
                </Link>
              )
            })
          )}
        </div>

        <p style={{ marginTop: 'var(--sp-4)' }}>
          <Link to="/lernpfad" className="btn">
            Kompletten Lernpfad ansehen <IconChevronRight size={15} />
          </Link>
        </p>
      </section>

      <section className="section" aria-labelledby="werkzeuge">
        <div className="section__head">
          <h2 className="section__title" id="werkzeuge">
            Werkzeuge zum Mitmachen
          </h2>
          <p className="section__sub">
            Nicht nur lesen – ausprobieren. Alles funktioniert ohne Anmeldung.
          </p>
        </div>

        <div className="grid grid--3">
          <Link to="/prompts" className="card">
            <p className="card__title">❝ Prompt-Bibliothek</p>
            <p className="card__desc">
              Fertige Prompts zum Kopieren, jeder mit Erklärung „So passt du ihn an".
            </p>
          </Link>
          <Link to="/prompt-verbessern" className="card">
            <p className="card__title">✦ Prompt verbessern</p>
            <p className="card__desc">
              Eigenen Prompt einfügen und sehen, was fehlt – mit Begründung zu jeder Änderung.
            </p>
          </Link>
          <Link to="/uebungen" className="card">
            <p className="card__title">✎ Übungen &amp; Quiz</p>
            <p className="card__desc">
              Alle interaktiven Aufgaben an einem Ort. Ohne Leistungsdruck.
            </p>
          </Link>
          <Link to="/glossar" className="card">
            <p className="card__title">A Glossar</p>
            <p className="card__desc">
              Jeder Fachbegriff in einem Satz erklärt – mit Beispiel.
            </p>
          </Link>
          <Link to="/30-tage" className="card">
            <p className="card__title">▦ 30-Tage-Plan</p>
            <p className="card__desc">
              5 bis 15 Minuten am Tag. Nach 30 Tagen bist du sicher unterwegs.
            </p>
          </Link>
          <Link to="/fortschritt" className="card">
            <p className="card__title">◑ Fortschritt</p>
            <p className="card__desc">
              Was du schon kannst und was als Nächstes dran ist. Lokal gespeichert.
            </p>
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="aufbau">
        <div className="card" style={{ padding: 'var(--sp-5)' }}>
          <h2 className="section__title" id="aufbau" style={{ fontSize: 'var(--step-1)' }}>
            So ist jede Lektion aufgebaut
          </h2>
          <ol className="steps" style={{ marginTop: 'var(--sp-4)', marginBottom: 0 }}>
            <li>
              <div className="steps__title">Was ist das? Wofür brauche ich das?</div>
              <div className="steps__body">
                In einfacher Sprache, mit einem „Noch einfacher erklären"-Schalter für schwierige
                Stellen.
              </div>
            </li>
            <li>
              <div className="steps__title">So funktioniert es – und ein echtes Beispiel</div>
              <div className="steps__body">
                Schritt für Schritt, plus ein ausklappbares Beispiel mit schlechtem und besserem
                Ansatz.
              </div>
            </li>
            <li>
              <div className="steps__title">Direkt ausprobieren</div>
              <div className="steps__body">
                Ein kopierbarer Prompt, den du sofort in Claude einfügen kannst.
              </div>
            </li>
            <li>
              <div className="steps__title">Fehler, Profi-Tipp, Mini-Aufgabe</div>
              <div className="steps__body">
                Was Anfänger falsch machen, ein Tipp mit sofortiger Wirkung und eine Aufgabe zum
                Selbstlösen.
              </div>
            </li>
            <li>
              <div className="steps__title">Verstanden? – und weiter</div>
              <div className="steps__body">
                Ein kurzer Wissenstest mit Erklärung zu jeder Antwort, dann die nächste Lektion.
              </div>
            </li>
          </ol>
        </div>
      </section>
    </Layout>
  )
}
