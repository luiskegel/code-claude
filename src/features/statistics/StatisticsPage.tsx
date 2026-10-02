import { useMemo, useState } from 'react';
import { ButtonLink } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { KeyCap } from '../../components/ui/KeyCap';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatTile } from '../../components/ui/StatTile';
import { keyLabelForChar } from '../../domain/keyboard/keyMap';
import { getKeyboardLayout } from '../../domain/keyboard/layouts';
import { getRecommendedLesson } from '../../domain/lessons/unlock';
import {
  getAverageAccuracy,
  getAverageWpm,
  getChartSeries,
  getKeyMastery,
  getWeakChars,
  KEY_STATS_WINDOW,
} from '../../domain/progress/statistics';
import { getActiveStreak } from '../../domain/progress/streak';
import { displayAccuracy, displayWpm, RECORD_MIN_CHARS } from '../../domain/typing/metrics';
import {
  formatAccuracy,
  formatDate,
  formatDateTime,
  formatDays,
  formatDuration,
  formatPracticeTime,
  formatTime,
  formatWpm,
} from '../../lib/format';
import { usePageTitle, useToday } from '../../lib/hooks';
import { useProgress, useSettings } from '../../state/hooks';
import { exerciseLabel } from '../shared/labels';
import { LineChart, type LinePoint } from './LineChart';

const CHART_POINTS = 30;
const RECENT_ROWS = 10;

export function StatisticsPage() {
  usePageTitle('Statistiken');
  const settings = useSettings();
  const progress = useProgress();
  const today = useToday();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const layout = getKeyboardLayout(settings.keyboardLayout);

  const series = useMemo(() => getChartSeries(progress.history, CHART_POINTS), [progress.history]);
  const weakChars = useMemo(() => getWeakChars(progress.history, 8), [progress.history]);
  const mastery = useMemo(() => getKeyMastery(progress, layout), [progress, layout]);

  const recommended = getRecommendedLesson(progress.lessons, settings.freeLessonChoice);

  if (progress.totals.exercises === 0) {
    return (
      <>
        <PageHeader title="Statistiken" />
        <Card>
          <EmptyState
            icon="chart"
            title="Du hast noch keine Übungen abgeschlossen."
            description="Starte deine erste Lektion und deine Statistiken erscheinen hier."
            action={
              <ButtonLink
                to={recommended ? `/lernen/${recommended.id}` : '/lernen'}
                iconEnd="arrow-right"
              >
                Erste Lektion starten
              </ButtonLink>
            }
          />
        </Card>
      </>
    );
  }

  // Liegen alle Übungen an einem Tag, beschriftet die Uhrzeit die x-Achse.
  const singleDay = new Set(series.map((point) => formatDate(point.completedAt))).size <= 1;
  const toPoints = (field: 'wpm' | 'accuracy'): LinePoint[] =>
    series.map((point) => ({
      id: point.resultId,
      value: point[field],
      label: exerciseLabel(point.lessonId),
      date: formatDateTime(point.completedAt),
      shortDate: singleDay ? formatTime(point.completedAt) : formatDate(point.completedAt),
    }));
  const wpmPoints = toPoints('wpm');
  const accuracyPoints = toPoints('accuracy');
  const learnedKeys = mastery.filter((entry) => entry.level !== 'locked').length;
  const maxMisses = Math.max(1, ...weakChars.map((entry) => entry.misses));
  const recent = [...progress.history].reverse().slice(0, RECENT_ROWS);

  return (
    <>
      <PageHeader
        title="Statistiken"
        description="Dein Lernfortschritt in Zahlen – berechnet aus deinen Übungen, gespeichert nur in deinem Browser."
      />

      <section aria-labelledby="kennzahlen">
        <h2 id="kennzahlen" className="sr-only">
          Kennzahlen
        </h2>
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatTile
            label="Ø Geschwindigkeit"
            icon="zap"
            value={formatWpm(getAverageWpm(progress))}
            unit="WPM"
            hint="über alle Übungen"
          />
          <StatTile
            label="Beste Geschwindigkeit"
            icon="trophy"
            value={formatWpm(progress.records.bestWpm)}
            unit={progress.records.bestWpm !== null ? 'WPM' : undefined}
            hint={`Übungen ab ${RECORD_MIN_CHARS} Zeichen`}
          />
          <StatTile
            label="Ø Genauigkeit"
            icon="target"
            value={formatAccuracy(getAverageAccuracy(progress))}
            unit="%"
            hint="über alle Übungen"
          />
          <StatTile
            label="Beste Genauigkeit"
            icon="check-circle"
            value={formatAccuracy(progress.records.bestAccuracy)}
            unit={progress.records.bestAccuracy !== null ? '%' : undefined}
            hint={`Übungen ab ${RECORD_MIN_CHARS} Zeichen`}
          />
          <StatTile
            label="Übungen"
            icon="layers"
            value={String(progress.totals.exercises)}
            hint="abgeschlossen"
          />
          <StatTile
            label="Übungszeit"
            icon="clock"
            value={formatPracticeTime(progress.totals.practiceMs)}
            hint="reine Tippzeit"
          />
          <StatTile
            label="Lernserie"
            icon="flame"
            iconClassName="text-streak"
            value={formatDays(getActiveStreak(progress.streak, today))}
            hint={`Rekord: ${formatDays(progress.streak.longest)}`}
          />
          <StatTile
            label="Gelernte Tasten"
            icon="keyboard"
            value={`${learnedKeys} von ${mastery.length}`}
            hint="eingeführt oder geübt"
          />
        </dl>
      </section>

      <Card className="mt-6" aria-labelledby="entwicklung">
        <CardHeader
          id="entwicklung"
          title="Deine Entwicklung"
          description={`Die letzten ${series.length} ${series.length === 1 ? 'Übung' : 'Übungen'} – fahre über die Linie für Details.`}
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <LineChart
            title="Geschwindigkeit"
            unit="WPM"
            points={wpmPoints}
            formatValue={(value) => String(displayWpm(value))}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
          <LineChart
            title="Genauigkeit"
            unit="%"
            points={accuracyPoints}
            formatValue={(value) => String(displayAccuracy(value))}
            floor="auto"
            ceiling={100}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
        </div>
        <details className="group mt-6 rounded-xl border border-line">
          <summary className="flex items-center justify-between px-4 py-3 text-sm font-medium text-ink select-none">
            Werte als Tabelle anzeigen
            <span
              className="text-ink-muted transition-transform group-open:rotate-90"
              aria-hidden="true"
            >
              ›
            </span>
          </summary>
          <div className="overflow-x-auto border-t border-line">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Nr.
                  </th>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Datum
                  </th>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Übung
                  </th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">
                    WPM
                  </th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">
                    Genauigkeit
                  </th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {series.map((point, index) => (
                  <tr key={point.resultId} className="border-t border-line">
                    <td className="px-4 py-2 text-ink-muted">{index + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-ink-muted">
                      {formatDateTime(point.completedAt)}
                    </td>
                    <td className="px-4 py-2 text-ink">{exerciseLabel(point.lessonId)}</td>
                    <td className="px-4 py-2 text-right text-ink">{formatWpm(point.wpm)}</td>
                    <td className="px-4 py-2 text-right text-ink">
                      {formatAccuracy(point.accuracy)} %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card aria-labelledby="haeufigste-fehler">
          <CardHeader
            id="haeufigste-fehler"
            title="Häufigste Fehler"
            description={`Aus deinen letzten ${KEY_STATS_WINDOW} Übungen.`}
            action={
              weakChars.length > 0 ? (
                <ButtonLink to="/wiederholen" variant="secondary" size="sm">
                  Üben
                </ButtonLink>
              ) : undefined
            }
          />
          {weakChars.length === 0 ? (
            <p className="text-sm leading-relaxed text-ink-muted">
              Kaum Fehler in den letzten Übungen – sehr sauber.
            </p>
          ) : (
            <ul className="space-y-3">
              {weakChars.map((entry) => (
                <li key={entry.char} className="flex items-center gap-3">
                  <KeyCap size="sm" className="w-11 shrink-0">
                    {keyLabelForChar(entry.char)}
                  </KeyCap>
                  <span
                    className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${(entry.misses / maxMisses) * 100}%` }}
                    />
                  </span>
                  <span className="w-28 shrink-0 text-right text-sm text-ink-muted tabular-nums">
                    {entry.misses} Fehler · {Math.round(entry.errorRate * 100)} %
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card aria-labelledby="letzte-uebungen" padding="none">
          <div className="p-5 pb-0 sm:p-6 sm:pb-0">
            <CardHeader id="letzte-uebungen" title="Letzte Übungen" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-ink-muted">
                <tr>
                  <th scope="col" className="px-5 py-2 font-medium sm:px-6">
                    Datum
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Übung
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-medium">
                    WPM
                  </th>
                  <th scope="col" className="px-3 py-2 text-right font-medium">
                    Genauigkeit
                  </th>
                  <th scope="col" className="hidden px-3 py-2 text-right font-medium sm:table-cell">
                    Fehler
                  </th>
                  <th
                    scope="col"
                    className="hidden px-5 py-2 text-right font-medium sm:table-cell sm:px-6"
                  >
                    Dauer
                  </th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {recent.map((result) => (
                  <tr key={result.id} className="border-t border-line">
                    <td className="px-5 py-3 whitespace-nowrap text-ink-muted sm:px-6">
                      {formatDate(result.completedAt)}
                    </td>
                    <td className="px-3 py-3 text-ink">{exerciseLabel(result.lessonId)}</td>
                    <td className="px-3 py-3 text-right text-ink">{formatWpm(result.wpm)}</td>
                    <td className="px-3 py-3 text-right text-ink">
                      {formatAccuracy(result.accuracy)} %
                    </td>
                    <td className="hidden px-3 py-3 text-right text-ink-muted sm:table-cell">
                      {result.errors}
                    </td>
                    <td className="hidden px-5 py-3 text-right text-ink-muted sm:table-cell sm:px-6">
                      {formatDuration(result.durationMs)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
