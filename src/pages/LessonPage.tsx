import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookA,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lightbulb,
  ListChecks,
  PenLine,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { getLesson, lessonPath, nextLessonAfter, prevLessonBefore } from '@/data/curriculum';
import { Badge, Callout, Card, Rich, cx } from '@/components/ui/ui';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { LessonWidgetView, WIDGET_TITLES } from '@/components/widgets/LessonWidget';
import { NotFound } from './NotFound';
import { LessonReaderPanel, ReadFromButton, useReaderForLesson, type Reader } from '@/components/LessonReader';

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
      <span className="text-accent">{icon}</span>
      {children}
    </h2>
  );
}

/** Markiert einen Abschnitt für das Vorlesen (Hervorhebung + Sprungziel). */
function Readable({ reader, id, children }: { reader: Reader; id: string; children: React.ReactNode }) {
  return (
    <div data-read-id={id} className={cx('scroll-mt-24 rounded-2xl transition-shadow', reader.isReading(id) && 'ring-2 ring-accent/50 ring-offset-2 ring-offset-ink-950')}>
      {children}
    </div>
  );
}

/** Zählt Lernzeit, solange die Seite sichtbar ist. */
function useStudyTimer(active: boolean) {
  const { actions } = useStore();
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') actions.addStudySeconds(30);
    }, 30000);
    return () => window.clearInterval(id);
  }, [active, actions]);
}

export function LessonPage() {
  const { lessonId } = useParams();
  const found = lessonId ? getLesson(lessonId) : undefined;
  const { actions } = useStore();
  const [showSolution, setShowSolution] = useState(false);
  useStudyTimer(!!found);

  useEffect(() => {
    if (found) actions.setLastLesson(found.lesson.id);
    setShowSolution(false);
  }, [found, actions]);

  if (!found) return <NotFound />;
  return <LessonView key={found.lesson.id} found={found} showSolution={showSolution} setShowSolution={setShowSolution} />;
}

function LessonView({
  found,
  showSolution,
  setShowSolution,
}: {
  found: NonNullable<ReturnType<typeof getLesson>>;
  showSolution: boolean;
  setShowSolution: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { state, actions } = useStore();
  const { lesson, module, index } = found;
  const reader = useReaderForLesson(lesson);
  const readerActive = reader.state === 'starting' || reader.state === 'speaking' || reader.state === 'paused';
  const done = !!state.progress.completedLessons[lesson.id];
  const exerciseDone = !!state.progress.exercisesDone[lesson.id];
  const miniQuiz = module.quiz.filter((q) => q.lesson === index);
  const prev = prevLessonBefore(lesson.id);
  const next = nextLessonAfter(lesson.id);
  const bestQuiz = state.progress.lessonQuiz[lesson.id];

  return (
    <article className={cx('mx-auto max-w-4xl', readerActive && 'pb-24')}>
      <nav className="mb-3 flex flex-wrap gap-1 text-sm text-slate-500" aria-label="Brotkrümel">
        <Link to="/kurs" className="hover:text-white">
          Mein Aktienkurs
        </Link>
        <span>/</span>
        <Link to={`/kurs/${module.id}`} className="hover:text-white">
          Modul {module.number}: {module.title}
        </Link>
      </nav>
      <header className="mb-6 scroll-mt-24" data-read-id="intro">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="blue">
            Lektion {index + 1} von {module.lessons.length}
          </Badge>
          <Badge>
            <Clock className="h-3 w-3" /> ca. {lesson.minutes} Min.
          </Badge>
          {done && (
            <Badge tone="green">
              <CheckCircle2 className="h-3 w-3" /> Abgeschlossen
            </Badge>
          )}
        </div>
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{lesson.title}</h1>
        <p className={cx('mt-3 rounded-lg text-base leading-relaxed text-slate-300 transition sm:text-lg', reader.isReading('intro') && 'bg-accent/[0.06]')}>{lesson.intro}</p>
      </header>

      <LessonReaderPanel lesson={lesson} reader={reader} />

      {lesson.riskNote && (
        <div className="mb-6">
          <Callout tone="risk" title="Besonders riskante Produkte">
            {lesson.riskNote}
          </Callout>
        </div>
      )}

      <div className="space-y-6">
        <Card as="section">
          <SectionTitle icon={<BookA className="h-5 w-5" />}>Verständliche Erklärung</SectionTitle>
          <div className="space-y-6">
            {lesson.sections.map((s, si) => (
              <section
                key={s.heading}
                data-read-id={`s${si}`}
                className={cx('prose-lesson -mx-3 scroll-mt-24 rounded-xl px-3 py-1 transition-colors', reader.isReading(`s${si}`) && 'bg-accent/[0.06]')}
              >
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                  {s.heading}
                  <ReadFromButton reader={reader} id={`s${si}`} label={s.heading} />
                </h3>
                <div className="space-y-3">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
                {s.formula && <p className="mt-3 overflow-x-auto rounded-lg border border-accent/20 bg-accent/[0.05] px-3 py-2 font-mono text-xs text-accent-glow sm:text-sm">{s.formula}</p>}
                {s.bullets && (
                  <ul className="mt-3 space-y-1.5 text-slate-300">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                        <span className="leading-relaxed">
                          <Rich text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Card>

        <Readable reader={reader} id="examples">
        <Card as="section">
          <SectionTitle icon={<Lightbulb className="h-5 w-5" />}>Ausführliche Beispiele</SectionTitle>
          <div className="grid gap-3">
            {lesson.examples.map((e) => (
              <div key={e.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-1 font-medium text-white">{e.title}</p>
                <p className="text-sm leading-relaxed text-slate-300">{e.text}</p>
              </div>
            ))}
          </div>
        </Card>
        </Readable>

        {lesson.widget && (
          <Card as="section">
            <SectionTitle icon={<Sparkles className="h-5 w-5" />}>Interaktiv: {WIDGET_TITLES[lesson.widget]}</SectionTitle>
            <LessonWidgetView id={lesson.widget} />
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Readable reader={reader} id="practice">
          <Card as="section">
            <SectionTitle icon={<Wrench className="h-5 w-5" />}>Praktische Anwendung</SectionTitle>
            <ul className="space-y-2 text-sm text-slate-300">
              {lesson.practice.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="num mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-[11px] text-accent-glow">{i + 1}</span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </Card>
          </Readable>
          <Readable reader={reader} id="mistakes">
          <Card as="section">
            <SectionTitle icon={<AlertTriangle className="h-5 w-5" />}>Typische Anfängerfehler</SectionTitle>
            <ul className="space-y-2 text-sm text-slate-300">
              {lesson.mistakes.map((m, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-loss" />
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </Card>
          </Readable>
        </div>

        <Readable reader={reader} id="terms">
        <Card as="section">
          <SectionTitle icon={<BookA className="h-5 w-5" />}>Wichtige Fachbegriffe</SectionTitle>
          <dl className="grid gap-3 sm:grid-cols-2">
            {lesson.terms.map((t) => (
              <div key={t.term} className="rounded-xl border border-white/[0.06] p-3">
                <dt className="text-sm font-semibold text-white">{t.term}</dt>
                <dd className="mt-0.5 text-sm text-slate-400">{t.definition}</dd>
              </div>
            ))}
          </dl>
          <Link to="/lexikon" className="mt-3 inline-flex items-center gap-1 text-sm text-accent-glow hover:underline">
            Alle Begriffe im Aktien-Lexikon <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>
        </Readable>

        <Readable reader={reader} id="summary">
        <Card as="section" className="border-accent/15">
          <SectionTitle icon={<Target className="h-5 w-5" />}>Zusammenfassung</SectionTitle>
          <ul className="space-y-2 text-sm text-slate-200">
            {lesson.summary.map((s, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>
        </Readable>

        <Readable reader={reader} id="exercise">
        <Card as="section">
          <SectionTitle icon={<PenLine className="h-5 w-5" />}>Praktische Übung: {lesson.exercise.title}</SectionTitle>
          <p className="text-sm leading-relaxed text-slate-300">{lesson.exercise.task}</p>
          {lesson.exercise.steps && showSolution && (
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-400">
              {lesson.exercise.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
          {showSolution ? (
            <div className="mt-3 rounded-xl border border-accent/25 bg-accent/[0.05] p-4 text-sm text-slate-200">
              <p className="mb-1 font-semibold text-accent-glow">Lösung</p>
              {lesson.exercise.solution}
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500">Versuche die Aufgabe zuerst selbst (Papier, Taschenrechner oder ein Rechner der App) und vergleiche dann mit der Lösung.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-secondary" onClick={() => setShowSolution((s) => !s)} aria-expanded={showSolution}>
              {showSolution ? 'Lösung ausblenden' : 'Lösung anzeigen'}
            </button>
            <button className={cx(exerciseDone ? 'btn-ghost' : 'btn-secondary')} disabled={exerciseDone} onClick={() => actions.completeExercise(lesson.id, lesson.exercise.title)}>
              <CheckCircle2 className="h-4 w-4" /> {exerciseDone ? 'Übung erledigt' : 'Übung als erledigt markieren (+10 Punkte)'}
            </button>
          </div>
        </Card>
        </Readable>

        <Card as="section">
          <SectionTitle icon={<ListChecks className="h-5 w-5" />}>Kleiner Wissenstest</SectionTitle>
          {bestQuiz !== undefined && <p className="mb-3 text-xs text-slate-400">Bisher bestes Ergebnis: {Math.round(bestQuiz * 100)} %</p>}
          <QuizRunner key={lesson.id} questions={miniQuiz} onFinish={(r) => actions.recordLessonQuiz(lesson.id, lesson.title, r.correct, r.total)} />
        </Card>

        <Card as="section">
          <p className="mb-2 text-sm font-semibold text-white">Quellen & weiterführende Links</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {module.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-400 hover:text-accent-glow">
                  <ExternalLink className="h-3.5 w-3.5" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-ink-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          {done ? (
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="green">
                <CheckCircle2 className="h-3 w-3" /> Lektion abgeschlossen
              </Badge>
              <button className="btn-ghost text-xs" onClick={() => actions.uncompleteLesson(lesson.id)}>
                Als offen markieren
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => actions.completeLesson(lesson.id, lesson.title)}>
              <CheckCircle2 className="h-4 w-4" /> Lektion abschließen (+20 Punkte)
            </button>
          )}
          <div className="flex gap-2">
            {prev && (
              <Link to={lessonPath(prev.lesson.id)} className="btn-secondary" aria-label="Vorherige Lektion">
                <ArrowLeft className="h-4 w-4" /> Zurück
              </Link>
            )}
            {next ? (
              <Link to={lessonPath(next.lesson.id)} className="btn-secondary" onClick={() => !done && actions.completeLesson(lesson.id, lesson.title)}>
                Weiter <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/tests" className="btn-secondary">
                Zu den Wissenstests <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
        {next && next.module.id !== module.id && (
          <Callout tone="info" title={`Modul ${module.number} geschafft?`}>
            Bevor du mit Modul {next.module.number} weitermachst, teste dein Wissen im <Link className="underline" to={`/tests/${module.id}`}>Wissenstest zu Modul {module.number}</Link>.
          </Callout>
        )}
      </div>
    </article>
  );
}
