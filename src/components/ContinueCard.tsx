import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { getLesson, lessonPath, recommendedLesson } from '@/data/curriculum';
import { Callout, Card } from '@/components/ui/ui';

export function ContinueCard() {
  const { state } = useStore();
  const last = state.progress.lastLessonId ? getLesson(state.progress.lastLessonId) : undefined;
  const rec = recommendedLesson(state.progress.completedLessons);
  const target = last && !state.progress.completedLessons[last.lesson.id] ? last : rec;
  if (!target)
    return (
      <Callout tone="info" title="Alle Lektionen abgeschlossen!">
        Herzlichen Glückwunsch. Wiederhole Module mit schwachen Testergebnissen oder übe im virtuellen Depot.
      </Callout>
    );
  return (
    <Card className="flex flex-col gap-4 border-accent/20 bg-gradient-to-br from-accent/[0.08] to-transparent sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-accent-glow">{target === last ? 'Weiterlernen, wo du aufgehört hast' : 'Nächste empfohlene Lektion'}</p>
        <p className="mt-1 text-lg font-semibold text-white">{target.lesson.title}</p>
        <p className="text-sm text-slate-400">
          Modul {target.module.number}: {target.module.title} · ca. {target.lesson.minutes} Min.
        </p>
      </div>
      <Link to={lessonPath(target.lesson.id)} className="btn-primary flex-none">
        <Play className="h-4 w-4" /> Lektion starten
      </Link>
    </Card>
  );
}

