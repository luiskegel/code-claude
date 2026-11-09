import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AlertTriangle, Clock, Flame, Repeat, Star, TrendingUp, Trophy } from 'lucide-react';
import { useStore } from '@/store/AppStore';
import { MODULES, TOTAL_LESSONS, lessonPath } from '@/data/curriculum';
import { currentLevel, PASS_THRESHOLD, streak } from '@/lib/progress';
import { Card, CardHeader, CHART, PageHeader, ProgressBar, Stat, Badge } from '@/components/ui/ui';
import { fmtDuration } from '@/lib/format';
import { ContinueCard } from '@/components/ContinueCard';

export function ProgressPage() {
  const { state } = useStore();
  const p = state.progress;
  const lvl = currentLevel(p, TOTAL_LESSONS);
  const rows = MODULES.map((m) => {
    const done = m.lessons.filter((l) => p.completedLessons[l.id]).length;
    const quiz = p.quizResults[m.id];
    const lessonQuizScores = m.lessons.map((l) => p.lessonQuiz[l.id]).filter((x): x is number => x !== undefined);
    const lessonQuizAvg = lessonQuizScores.length ? lessonQuizScores.reduce((a, b) => a + b, 0) / lessonQuizScores.length : undefined;
    const score = quiz?.bestScore ?? lessonQuizAvg;
    return { m, done, quiz, score, share: done / m.lessons.length };
  });
  const chartData = rows.map((r) => ({ name: `M${r.m.number}`, title: r.m.title, lektionen: Math.round(r.share * 100), test: r.quiz ? Math.round(r.quiz.bestScore * 100) : 0 }));
  const tested = rows.filter((r) => r.score !== undefined);
  const strengths = tested.filter((r) => (r.score ?? 0) >= 0.85).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const weaknesses = tested.filter((r) => (r.score ?? 0) < PASS_THRESHOLD).sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
  const repeat = rows.filter((r) => r.quiz && r.quiz.wrongIds.length > 0);
  return (
    <>
      <PageHeader icon={<TrendingUp className="h-6 w-6" />} title="Mein Lernfortschritt" subtitle="Alle deine Lektionen, Testergebnisse, Stärken, Schwächen und dein Wiederholungsbedarf auf einen Blick." />
      <div className="mb-6">
        <ContinueCard />
      </div>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Lernstufe" value={`Stufe ${lvl.current.level}`} hint={lvl.current.title} icon={<Trophy className="h-4 w-4" />} />
        <Stat label="Gesamtpunkte" value={p.points.toLocaleString('de-DE')} hint={`${Object.keys(p.exercisesDone).length} Übungen erledigt`} icon={<Star className="h-4 w-4" />} />
        <Stat label="Lernzeit" value={fmtDuration(p.studySeconds)} hint={`${p.studyDays.length} Lerntage`} icon={<Clock className="h-4 w-4" />} />
        <Stat label="Lernserie" value={`${streak(p.studyDays)} Tage`} hint="aufeinanderfolgende Lerntage" icon={<Flame className="h-4 w-4" />} />
      </div>
      <Card className="mb-6">
        <CardHeader title="Fortschritt je Modul" subtitle="Grün: abgeschlossene Lektionen in % · Blau: bestes Testergebnis in %" />
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="name" stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={CHART.axis} fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} width={36} />
              <Tooltip {...CHART.tooltip} labelFormatter={(_, pl) => (pl?.[0]?.payload as { title?: string })?.title ?? ''} formatter={(v: number) => `${v} %`} />
              <Bar dataKey="lektionen" name="Lektionen" fill={CHART.green} radius={[4, 4, 0, 0]} />
              <Bar dataKey="test" name="Test" radius={[4, 4, 0, 0]}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.test >= PASS_THRESHOLD * 100 ? CHART.blue : 'rgba(56,189,248,0.4)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Stärken" icon={<Star className="h-4 w-4" />} subtitle="Module mit mindestens 85 %" />
          {strengths.length === 0 ? (
            <p className="text-sm text-slate-400">Noch keine Daten. Absolviere Tests, um deine Stärken zu sehen.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {strengths.map((r) => (
                <li key={r.m.id} className="flex justify-between gap-2">
                  <span className="text-slate-200">{r.m.title}</span>
                  <Badge tone="green">{Math.round((r.score ?? 0) * 100)} %</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Schwächen" icon={<AlertTriangle className="h-4 w-4" />} subtitle={`Module unter ${Math.round(PASS_THRESHOLD * 100)} %`} />
          {weaknesses.length === 0 ? (
            <p className="text-sm text-slate-400">Keine Schwächen erkannt – oder noch zu wenige Tests absolviert.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {weaknesses.map((r) => (
                <li key={r.m.id} className="flex items-center justify-between gap-2">
                  <Link to={`/kurs/${r.m.id}`} className="text-slate-200 hover:text-accent-glow">
                    {r.m.title}
                  </Link>
                  <Badge tone="amber">{Math.round((r.score ?? 0) * 100)} %</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Wiederholungsbedarf" icon={<Repeat className="h-4 w-4" />} subtitle="Falsch beantwortete Testfragen" />
          {repeat.length === 0 ? (
            <p className="text-sm text-slate-400">Aktuell kein Wiederholungsbedarf.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {repeat.map((r) => (
                <li key={r.m.id} className="flex items-center justify-between gap-2">
                  <Link to={`/tests/${r.m.id}`} className="text-slate-200 hover:text-accent-glow">
                    {r.m.title}
                  </Link>
                  <Badge tone="red">{r.quiz!.wrongIds.length} Fragen</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <Card>
        <CardHeader title="Alle Module im Detail" />
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.m.id}>
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-sm">
                <Link to={`/kurs/${r.m.id}`} className="text-slate-200 hover:text-accent-glow">
                  Modul {r.m.number}: {r.m.title}
                </Link>
                <span className="flex items-center gap-2 text-xs text-slate-400">
                  {r.done}/{r.m.lessons.length} Lektionen
                  {r.quiz && <Badge tone={r.quiz.passed ? 'green' : 'amber'}>Test {Math.round(r.quiz.bestScore * 100)} %</Badge>}
                </span>
              </div>
              <ProgressBar value={r.share} label={`Modul ${r.m.number}`} />
              {r.done < r.m.lessons.length && (
                <Link to={lessonPath(r.m.lessons.find((l) => !p.completedLessons[l.id])!.id)} className="mt-1 inline-block text-xs text-accent-glow hover:underline">
                  Nächste offene Lektion →
                </Link>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
