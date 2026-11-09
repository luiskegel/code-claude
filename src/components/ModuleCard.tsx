import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import type { Module } from '@/types';
import { useStore } from '@/store/AppStore';
import { Badge, ProgressBar } from '@/components/ui/ui';
import { ModuleIcon } from '@/components/ui/ModuleIcon';

export function ModuleCard({ module }: { module: Module }) {
  const { state } = useStore();
  const done = module.lessons.filter((l) => state.progress.completedLessons[l.id]).length;
  const quiz = state.progress.quizResults[module.id];
  const minutes = module.lessons.reduce((s, l) => s + l.minutes, 0);
  return (
    <Link
      to={`/kurs/${module.id}`}
      className="card card-pad group flex animate-fade-up flex-col gap-4 transition hover:border-accent/30 hover:bg-ink-850"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-accent/10 p-2.5 text-accent">
            <ModuleIcon name={module.icon} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Modul {module.number}</p>
            <h3 className="font-semibold leading-snug">{module.title}</h3>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 flex-none text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
      </div>
      <p className="line-clamp-2 text-sm text-slate-400">{module.subtitle}</p>
      <div className="mt-auto space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> ca. {minutes} Min.
          </span>
          <span>·</span>
          <span>
            {done}/{module.lessons.length} Lektionen
          </span>
          {quiz?.passed && (
            <Badge tone="green">
              <CheckCircle2 className="h-3 w-3" /> Test bestanden
            </Badge>
          )}
        </div>
        <ProgressBar value={done / module.lessons.length} label={`Fortschritt Modul ${module.number}`} />
      </div>
    </Link>
  );
}
