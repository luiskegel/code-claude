import { Link } from 'react-router';
import { Card, CardHeader } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { ProgressBar } from '../../components/ui/ProgressBar';
import type { ModuleProgress } from '../../domain/progress/statistics';

export function ModuleProgressCard({ modules }: { modules: readonly ModuleProgress[] }) {
  return (
    <Card aria-labelledby="lernfortschritt">
      <CardHeader
        id="lernfortschritt"
        title="Lernfortschritt"
        description="Deine Module im Überblick."
      />
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
        {modules.map(({ module, passed, total }) => {
          const complete = passed === total;
          return (
            <li key={module.id}>
              <Link
                to={`/lernen#modul-${module.id}`}
                className="group block rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-2"
              >
                <span className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-2 font-medium text-ink">
                    {complete && (
                      <Icon name="check-circle" size={16} className="shrink-0 text-success-ink" />
                    )}
                    <span className="truncate">{module.title}</span>
                  </span>
                  <span className="shrink-0 text-ink-muted tabular-nums">
                    {passed}/{total}
                  </span>
                </span>
                <ProgressBar
                  className="mt-2"
                  value={passed / total}
                  size="xs"
                  tone={complete ? 'success' : 'accent'}
                  label={`Modul ${module.title}`}
                  valueText={`${passed} von ${total} Lektionen abgeschlossen`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
