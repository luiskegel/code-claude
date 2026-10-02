import { useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { StatTile } from '../../components/ui/StatTile';
import { getKeyboardLayout } from '../../domain/keyboard/layouts';
import { TOTAL_LESSONS } from '../../domain/lessons/catalog';
import { getRecommendedLesson, isLessonUnlocked } from '../../domain/lessons/unlock';
import {
  getLastResult,
  getModuleProgress,
  getPassedLessonCount,
  getRecentAverage,
  getWeakChars,
  RECENT_WINDOW,
} from '../../domain/progress/statistics';
import { getActiveStreak, hasPracticedToday } from '../../domain/progress/streak';
import {
  formatAccuracy,
  formatDays,
  formatPercent,
  formatPracticeTime,
  formatWpm,
  pluralize,
} from '../../lib/format';
import { useGreeting, usePageTitle, useToday } from '../../lib/hooks';
import { useProgress, useSettings } from '../../state/hooks';
import { ModuleProgressCard } from './ModuleProgressCard';
import { NextLessonCard } from './NextLessonCard';
import { GoalFocusCard, LastExerciseCard, WeakKeysCard } from './SideCards';

export function DashboardPage() {
  usePageTitle('Übersicht');
  const settings = useSettings();
  const progress = useProgress();
  const greeting = useGreeting();
  const today = useToday();
  const layout = getKeyboardLayout(settings.keyboardLayout);

  const nextLesson = getRecommendedLesson(progress.lessons, settings.freeLessonChoice);
  const passedCount = getPassedLessonCount(progress);
  const modules = useMemo(() => getModuleProgress(progress), [progress]);
  const weakChars = useMemo(() => getWeakChars(progress.history), [progress.history]);
  const recentWpm = getRecentAverage(progress.history, 'wpm');
  const recentAccuracy = getRecentAverage(progress.history, 'accuracy');
  const streakDays = getActiveStreak(progress.streak, today);
  const practicedToday = hasPracticedToday(progress.streak, today);
  const hasHistory = progress.history.length > 0;
  const recentHint = hasHistory
    ? `Ø der letzten ${Math.min(RECENT_WINDOW, progress.history.length)} Übungen`
    : 'Noch keine Übung';

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="text-[30px] leading-tight font-semibold tracking-tight text-ink sm:text-[36px]">
          {greeting} <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-2 text-[17px] text-ink-muted">
          {nextLesson
            ? 'Bereit für deine nächste Übung?'
            : 'Alle Lektionen geschafft – bleib in Übung.'}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NextLessonCard
            lesson={nextLesson}
            lessonProgress={nextLesson ? progress.lessons[nextLesson.id] : undefined}
            layout={layout}
          />
        </div>
        <Card aria-labelledby="fortschritt-titel" className="flex flex-col">
          <h2 id="fortschritt-titel" className="text-[17px] font-semibold tracking-tight text-ink">
            Dein Fortschritt
          </h2>
          <p className="mt-4 text-[44px] leading-none font-semibold tracking-tight text-ink tabular-nums">
            {formatPercent(passedCount / TOTAL_LESSONS)}
          </p>
          <ProgressBar
            className="mt-5"
            size="md"
            value={passedCount / TOTAL_LESSONS}
            label="Abgeschlossene Lektionen"
            valueText={`${passedCount} von ${TOTAL_LESSONS} Lektionen abgeschlossen`}
          />
          <p className="mt-3 text-sm text-ink-muted">
            {passedCount} von {TOTAL_LESSONS} Lektionen abgeschlossen
          </p>
          <p className="mt-auto pt-5 text-sm leading-relaxed text-ink-muted">
            {passedCount === 0
              ? 'Jede abgeschlossene Lektion schaltet die nächste frei.'
              : 'Abgeschlossene Lektionen kannst du jederzeit wiederholen.'}
          </p>
        </Card>
      </div>

      <section aria-labelledby="statistik-titel">
        <h2 id="statistik-titel" className="sr-only">
          Statistiken
        </h2>
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatTile
            label="Geschwindigkeit"
            icon="zap"
            value={formatWpm(recentWpm)}
            unit={recentWpm !== null ? 'WPM' : undefined}
            hint={recentHint}
          />
          <StatTile
            label="Genauigkeit"
            icon="target"
            value={formatAccuracy(recentAccuracy)}
            unit={recentAccuracy !== null ? '%' : undefined}
            hint={recentHint}
          />
          <StatTile
            label="Übungszeit"
            icon="clock"
            value={formatPracticeTime(progress.totals.practiceMs)}
            hint={pluralize(progress.totals.exercises, 'Übung', 'Übungen')}
          />
          <StatTile
            label="Serie"
            icon="flame"
            iconClassName={streakDays > 0 ? 'text-streak' : undefined}
            value={formatDays(streakDays)}
            hint={
              streakDays === 0
                ? 'Übe heute, um eine Serie zu starten'
                : practicedToday
                  ? 'Heute schon geübt'
                  : 'Heute üben, um die Serie zu halten'
            }
          />
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ModuleProgressCard modules={modules} />
        </div>
        <div className="space-y-6">
          <GoalFocusCard
            goal={settings.goal}
            nextLesson={nextLesson}
            sprintUnlocked={isLessonUnlocked(
              'tempo-sprint',
              progress.lessons,
              settings.freeLessonChoice,
            )}
          />
          <WeakKeysCard weakChars={weakChars} />
          <LastExerciseCard result={getLastResult(progress)} />
        </div>
      </div>
    </div>
  );
}
