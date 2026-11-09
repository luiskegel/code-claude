import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ListChecks } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { getModule, MODULES } from '@/data/curriculum';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui/ui';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { PASS_THRESHOLD } from '@/lib/progress';
import { NotFound } from './NotFound';
import { fmtDate } from '@/lib/format';

export function QuizOverview() {
  const { state } = useStore();
  const passed = Object.values(state.progress.quizResults).filter((r) => r.passed).length;
  return (
    <>
      <PageHeader
        icon={<ListChecks className="h-6 w-6" />}
        title="Wissenstests"
        subtitle={`Zu jedem Modul gibt es einen Test mit mindestens 10 Fragen: Multiple Choice, Richtig/Falsch, Rechenaufgaben und Praxisfälle. Ab ${Math.round(PASS_THRESHOLD * 100)} % gilt ein Test als bestanden.`}
      />
      <Card className="mb-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-300">Bestandene Modultests</span>
          <span className="num text-slate-400">
            {passed} / {MODULES.length}
          </span>
        </div>
        <ProgressBar value={passed / MODULES.length} label="Bestandene Tests" />
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {MODULES.map((m) => {
          const r = state.progress.quizResults[m.id];
          return (
            <Link key={m.id} to={`/tests/${m.id}`} className="card card-pad flex items-center justify-between gap-4 transition hover:border-accent/30">
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Modul {m.number}</p>
                <p className="truncate font-medium text-white">{m.title}</p>
                <p className="text-xs text-slate-500">
                  {m.quiz.length} Fragen{r ? ` · ${r.attempts} Versuch${r.attempts === 1 ? '' : 'e'} · zuletzt ${fmtDate(r.lastAttemptAt)}` : ''}
                </p>
              </div>
              {r ? <Badge tone={r.passed ? 'green' : 'amber'}>{Math.round(r.bestScore * 100)} %</Badge> : <Badge>offen</Badge>}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export function QuizPage() {
  const { moduleId } = useParams();
  const module = moduleId ? getModule(moduleId) : undefined;
  const { state, actions } = useStore();
  if (!module) return <NotFound />;
  const r = state.progress.quizResults[module.id];
  const wrong = r?.wrongIds?.length ? module.quiz.filter((q) => r.wrongIds.includes(q.id)) : [];
  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/tests" className="mb-3 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Alle Wissenstests
      </Link>
      <PageHeader
        title={`Wissenstest: ${module.title}`}
        subtitle={`Modul ${module.number} · ${module.quiz.length} Fragen · Jede Antwort wird sofort ausgewertet und erklärt.`}
        actions={r && <Badge tone={r.passed ? 'green' : 'amber'}>Bestes Ergebnis {Math.round(r.bestScore * 100)} %</Badge>}
      />
      <Card>
        <QuizRunner
          key={module.id}
          questions={module.quiz}
          showPassInfo
          onFinish={(res) => actions.recordModuleQuiz(module.id, module.title, res.correct, res.total, res.wrongIds)}
        />
      </Card>
      {wrong.length > 0 && (
        <Card className="mt-6">
          <p className="mb-3 text-sm font-semibold text-white">Wiederholungsbedarf aus deinem letzten Versuch ({wrong.length} Fragen)</p>
          <QuizRunner key={`${module.id}-wrong-${r?.lastAttemptAt}`} questions={wrong} title="Wiederholung" />
        </Card>
      )}
      <p className="mt-4 text-sm text-slate-500">
        Noch unsicher? Zurück zu den <Link className="text-accent-glow underline" to={`/kurs/${module.id}`}>Lektionen von Modul {module.number}</Link>.
      </p>
    </div>
  );
}
