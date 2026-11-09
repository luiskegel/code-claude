import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Circle, Clock, ExternalLink, GraduationCap, ListChecks, Play } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { ALL_LESSONS, CATEGORIES, getModule, lessonPath, MODULES, TOTAL_LESSONS } from '@/data/curriculum';
import type { CategoryId } from '@/types';
import { Badge, Card, PageHeader, ProgressBar, Callout } from '@/components/ui/ui';
import { ModuleCard } from '@/components/ModuleCard';
import { ModuleIcon } from '@/components/ui/ModuleIcon';
import { NotFound } from './NotFound';
import { ContinueCard } from '@/components/ContinueCard';

export function CoursePage() {
  const { state } = useStore();
  const done = Object.keys(state.progress.completedLessons).length;
  return (
    <>
      <PageHeader
        icon={<GraduationCap className="h-6 w-6" />}
        title="Mein Aktienkurs"
        subtitle={`Der komplette Lehrplan in ${MODULES.length} Modulen und ${TOTAL_LESSONS} Lektionen – von der ersten Aktie bis zum eigenen Investmentplan. Empfohlen ist die Bearbeitung in der Reihenfolge der Module.`}
      />
      <div className="mb-6 space-y-4">
        <ContinueCard />
        <div className="flex items-center gap-3">
          <ProgressBar value={done / TOTAL_LESSONS} label="Gesamtfortschritt" />
          <span className="num flex-none text-sm text-slate-400">{Math.round((done / TOTAL_LESSONS) * 100)} %</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
    </>
  );
}

export function CategoryPage({ category }: { category: CategoryId }) {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const modules = MODULES.filter((m) => m.category === category);
  return (
    <>
      <PageHeader icon={<BookOpen className="h-6 w-6" />} title={cat.title} subtitle={cat.description} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
      {category === 'aktien-analysieren' && (
        <Card className="mt-6">
          <p className="text-sm text-slate-300">
            Tipp: Für die praktische Analyse findest du die <Link className="text-accent-glow underline" to="/kurs/m13/m13-l1">interaktive 12-Schritte-Checkliste</Link> in Modul 13 und alle Kennzahlen-Rechner im Bereich{' '}
            <Link className="text-accent-glow underline" to="/rechner">Aktien-Rechner</Link>.
          </p>
        </Card>
      )}
      {category === 'grundlagen' && (
        <Card className="mt-6">
          <p className="text-sm text-slate-300">
            Steuern gehören auch zu den Grundlagen: Im Bereich <Link className="text-accent-glow underline" to="/steuern">Steuern in Deutschland</Link> erfährst du, wie Kapitalerträge besteuert werden.
          </p>
        </Card>
      )}
    </>
  );
}

export function ModulePage() {
  const { moduleId } = useParams();
  const module = moduleId ? getModule(moduleId) : undefined;
  const { state } = useStore();
  if (!module) return <NotFound />;
  const quiz = state.progress.quizResults[module.id];
  const firstOpen = module.lessons.find((l) => !state.progress.completedLessons[l.id]) ?? module.lessons[0];
  return (
    <>
      <nav className="mb-3 text-sm text-slate-500" aria-label="Brotkrümel">
        <Link to="/kurs" className="hover:text-white">
          Mein Aktienkurs
        </Link>{' '}
        / <span className="text-slate-300">Modul {module.number}</span>
      </nav>
      <PageHeader
        icon={<ModuleIcon name={module.icon} className="h-6 w-6" />}
        title={`Modul ${module.number}: ${module.title}`}
        subtitle={module.description}
        actions={
          <>
            <Link to={lessonPath(firstOpen.id)} className="btn-primary">
              <Play className="h-4 w-4" /> {module.lessons.some((l) => state.progress.completedLessons[l.id]) ? 'Fortsetzen' : 'Starten'}
            </Link>
            <Link to={`/tests/${module.id}`} className="btn-secondary">
              <ListChecks className="h-4 w-4" /> Wissenstest
            </Link>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {module.lessons.map((l, i) => {
            const done = !!state.progress.completedLessons[l.id];
            return (
              <Link key={l.id} to={lessonPath(l.id)} className="card card-pad flex items-center gap-4 transition hover:border-accent/30">
                {done ? <CheckCircle2 className="h-6 w-6 flex-none text-accent" aria-label="abgeschlossen" /> : <Circle className="h-6 w-6 flex-none text-slate-600" aria-label="offen" />}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">Lektion {i + 1}</p>
                  <p className="font-medium text-white">{l.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-sm text-slate-400">{l.intro}</p>
                </div>
                <span className="hidden flex-none items-center gap-1 text-xs text-slate-500 sm:flex">
                  <Clock className="h-3.5 w-3.5" /> {l.minutes} Min.
                </span>
                <ArrowRight className="h-4 w-4 flex-none text-slate-600" />
              </Link>
            );
          })}
          <Link to={`/tests/${module.id}`} className="card card-pad flex items-center gap-4 border-dashed transition hover:border-accent/30">
            <ListChecks className="h-6 w-6 flex-none text-sky-400" />
            <div className="flex-1">
              <p className="font-medium text-white">Wissenstest zu Modul {module.number}</p>
              <p className="text-sm text-slate-400">{module.quiz.length} Fragen · Multiple Choice, Richtig/Falsch, Rechenaufgaben, Praxisfälle</p>
            </div>
            {quiz && <Badge tone={quiz.passed ? 'green' : 'amber'}>Bestes Ergebnis: {Math.round(quiz.bestScore * 100)} %</Badge>}
          </Link>
        </div>
        <div className="space-y-4">
          <Card>
            <p className="mb-3 text-sm font-semibold text-white">Quellen & weiterführende Links</p>
            <ul className="space-y-2 text-sm">
              {module.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-slate-300 hover:text-accent-glow">
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-none" /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
          <Callout tone="info">Alle Inhalte dienen der Bildung und sind keine Anlageberatung. Zahlenbeispiele sind als Beispiel- oder Modelldaten gekennzeichnet.</Callout>
        </div>
      </div>
    </>
  );
}

export function useLessonCounts() {
  const { state } = useStore();
  return { done: ALL_LESSONS.filter((x) => state.progress.completedLessons[x.lesson.id]).length, total: TOTAL_LESSONS };
}
