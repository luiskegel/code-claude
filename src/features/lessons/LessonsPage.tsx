import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { PageHeader } from '../../components/ui/PageHeader';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { keyLabelForChar } from '../../domain/keyboard/keyMap';
import { getKeyboardLayout } from '../../domain/keyboard/layouts';
import { getModulesWithLessons, TOTAL_LESSONS } from '../../domain/lessons/catalog';
import {
  getBlockingLesson,
  getRecommendedLesson,
  isLessonUnlocked,
} from '../../domain/lessons/unlock';
import { getPassedLessonCount, getWeakChars } from '../../domain/progress/statistics';
import { usePageTitle } from '../../lib/hooks';
import { useProgress, useSettings } from '../../state/hooks';
import { LessonCard, type LessonCardStatus } from './LessonCard';

const MODULES_WITH_LESSONS = getModulesWithLessons();

export function LessonsPage() {
  usePageTitle('Lernen');
  const settings = useSettings();
  const progress = useProgress();
  const location = useLocation();
  const layout = getKeyboardLayout(settings.keyboardLayout);
  const recommended = getRecommendedLesson(progress.lessons, settings.freeLessonChoice);
  const passedCount = getPassedLessonCount(progress);
  const weakChars = useMemo(() => getWeakChars(progress.history), [progress.history]);

  // Sprunganker wie /lernen#modul-obere-reihe vom Dashboard aus.
  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ block: 'start' });
  }, [location.hash]);

  return (
    <>
      <PageHeader
        title="Lernen"
        description={`${TOTAL_LESSONS} Lektionen in ${MODULES_WITH_LESSONS.length} Modulen – von der Grundstellung bis zu ganzen Texten. Genauigkeit geht vor Tempo.`}
      />

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <Card padding="sm" className="flex items-center gap-4 px-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink">
              {passedCount} von {TOTAL_LESSONS} Lektionen abgeschlossen
            </p>
            <ProgressBar
              className="mt-2.5"
              value={passedCount / TOTAL_LESSONS}
              label="Gesamtfortschritt"
              valueText={`${passedCount} von ${TOTAL_LESSONS} Lektionen abgeschlossen`}
            />
          </div>
        </Card>
        <Link
          to="/wiederholen"
          className="group flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-line-strong"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning-soft text-warning-ink">
            <Icon name="repeat" size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-ink">Fehler wiederholen</span>
            <span className="block truncate text-sm text-ink-muted">
              {weakChars.length > 0
                ? `Deine häufigsten Fehler: ${weakChars
                    .slice(0, 3)
                    .map((entry) => keyLabelForChar(entry.char))
                    .join(', ')}`
                : 'Gezielt die Tasten üben, die dir schwerfallen.'}
            </span>
          </span>
          <Icon
            name="chevron-right"
            size={18}
            className="text-ink-subtle transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {settings.freeLessonChoice && (
        <p className="-mt-6 mb-8 flex items-center gap-2 text-sm text-ink-muted">
          <Icon name="info" size={16} />
          Freie Lektionswahl ist aktiv – alle Lektionen sind geöffnet.{' '}
          <Link to="/einstellungen" className="font-medium text-accent-ink hover:underline">
            Ändern
          </Link>
        </p>
      )}

      <div className="space-y-12">
        {MODULES_WITH_LESSONS.map(({ module, lessons }) => {
          const modulePassed = lessons.filter(
            (lesson) => progress.lessons[lesson.id]?.passed,
          ).length;
          return (
            <section
              key={module.id}
              id={`modul-${module.id}`}
              aria-labelledby={`titel-${module.id}`}
              className="scroll-mt-24"
            >
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink-muted">Modul {module.number}</p>
                  <h2
                    id={`titel-${module.id}`}
                    className="mt-0.5 text-xl font-semibold tracking-tight text-ink"
                  >
                    {module.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">{module.description}</p>
                </div>
                <span className="text-sm font-medium text-ink-muted tabular-nums">
                  {modulePassed}/{lessons.length} abgeschlossen
                </span>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {lessons.map((lesson) => {
                  const lessonProgress = progress.lessons[lesson.id];
                  const unlocked = isLessonUnlocked(
                    lesson.id,
                    progress.lessons,
                    settings.freeLessonChoice,
                  );
                  const status: LessonCardStatus = lessonProgress?.passed
                    ? 'passed'
                    : !unlocked
                      ? 'locked'
                      : recommended?.id === lesson.id
                        ? 'next'
                        : 'open';
                  return (
                    <li key={lesson.id}>
                      <LessonCard
                        lesson={lesson}
                        status={status}
                        progress={lessonProgress}
                        layout={layout}
                        blockingNumber={
                          status === 'locked'
                            ? getBlockingLesson(
                                lesson.id,
                                progress.lessons,
                                settings.freeLessonChoice,
                              )?.number
                            : undefined
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
