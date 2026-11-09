import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle, Trophy, ArrowRight } from 'lucide-react';
import type { QuizQuestion } from '@/types';
import { Badge, cx, ProgressBar } from '@/components/ui/ui';
import { PASS_THRESHOLD } from '@/lib/progress';

const TYPE_LABEL: Record<QuizQuestion['type'], string> = {
  mc: 'Multiple Choice',
  tf: 'Richtig oder falsch',
  calc: 'Rechenaufgabe',
  case: 'Praxisfall',
};

export const optionsOf = (q: QuizQuestion) => (q.type === 'tf' ? ['Richtig', 'Falsch'] : q.options ?? []);

export interface QuizResultData {
  correct: number;
  total: number;
  wrongIds: string[];
}

/**
 * Führt durch einen Fragensatz mit sofortiger Auswertung und Erklärung.
 * Am Ende können falsch beantwortete Fragen gezielt wiederholt werden.
 */
export function QuizRunner({
  questions,
  onFinish,
  title,
  showPassInfo = false,
}: {
  questions: QuizQuestion[];
  onFinish?: (r: QuizResultData) => void;
  title?: string;
  showPassInfo?: boolean;
}) {
  const [set, setSet] = useState<QuizQuestion[]>(questions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [isRetry, setIsRetry] = useState(false);

  const q = set[index];
  const correctCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);

  if (!q && !done) return null;

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setAnswers((a) => ({ ...a, [q.id]: i === q.answer }));
  };

  const next = () => {
    if (index + 1 < set.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setDone(true);
      const wrongIds = set.filter((x) => !answers[x.id]).map((x) => x.id);
      if (!isRetry) onFinish?.({ correct: set.length - wrongIds.length, total: set.length, wrongIds });
    }
  };

  const restart = (onlyWrong: boolean) => {
    const wrong = set.filter((x) => !answers[x.id]);
    setSet(onlyWrong ? wrong : questions);
    setIsRetry(onlyWrong);
    setIndex(0);
    setSelected(null);
    setAnswers({});
    setDone(false);
  };

  if (done) {
    const total = set.length;
    const share = total ? correctCount / total : 0;
    const passed = share >= PASS_THRESHOLD;
    const wrong = set.filter((x) => !answers[x.id]);
    return (
      <div className="space-y-5" aria-live="polite">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-ink-950/40 p-6 text-center">
          <Trophy className={cx('h-10 w-10', passed ? 'text-accent' : 'text-slate-500')} aria-hidden />
          <p className="text-3xl font-bold text-white num">
            {correctCount} / {total}
          </p>
          <p className="text-slate-400">{Math.round(share * 100)} % richtig {isRetry && '(Wiederholung)'}</p>
          {showPassInfo && !isRetry && (
            <Badge tone={passed ? 'green' : 'amber'}>
              {passed ? 'Bestanden!' : `Noch nicht bestanden – ab ${Math.round(PASS_THRESHOLD * 100)} % gilt der Test als bestanden`}
            </Badge>
          )}
        </div>
        {wrong.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-semibold text-white">Diese Fragen solltest du wiederholen:</p>
            <ul className="space-y-2">
              {wrong.map((w) => (
                <li key={w.id} className="rounded-xl border border-loss/20 bg-loss/[0.05] p-3 text-sm">
                  <p className="text-slate-200">{w.question}</p>
                  <p className="mt-1 text-slate-400">
                    Richtige Antwort: <span className="text-accent-glow">{optionsOf(w)[w.answer]}</span> – {w.explanation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {wrong.length > 0 && (
            <button className="btn-primary" onClick={() => restart(true)}>
              <RotateCcw className="h-4 w-4" /> Falsche Antworten wiederholen
            </button>
          )}
          <button className="btn-secondary" onClick={() => restart(false)}>
            <RotateCcw className="h-4 w-4" /> Test neu starten
          </button>
        </div>
      </div>
    );
  }

  const opts = optionsOf(q);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {title && <span className="text-sm font-semibold text-white">{title}</span>}
          <Badge tone="blue">{TYPE_LABEL[q.type]}</Badge>
        </div>
        <span className="num text-xs text-slate-400">
          Frage {index + 1} von {set.length}
        </span>
      </div>
      <ProgressBar value={index / set.length} label="Fortschritt im Test" />
      <p className="text-base font-medium leading-relaxed text-white sm:text-lg">{q.question}</p>
      <div className="grid gap-2" role="radiogroup" aria-label="Antwortmöglichkeiten">
        {opts.map((o, i) => {
          const isSel = selected === i;
          const isRight = selected !== null && i === q.answer;
          const isWrong = isSel && i !== q.answer;
          return (
            <button
              key={i}
              role="radio"
              aria-checked={isSel}
              disabled={selected !== null}
              onClick={() => choose(i)}
              className={cx(
                'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                selected === null && 'border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-accent/[0.04]',
                isRight && 'border-accent/50 bg-accent/10 text-white',
                isWrong && 'border-loss/50 bg-loss/10 text-white',
                selected !== null && !isRight && !isWrong && 'border-white/5 opacity-60',
              )}
            >
              <span>{o}</span>
              {isRight && <CheckCircle2 className="h-5 w-5 flex-none text-accent" aria-label="richtig" />}
              {isWrong && <XCircle className="h-5 w-5 flex-none text-loss" aria-label="falsch" />}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div
          className={cx('rounded-xl border p-4 text-sm', selected === q.answer ? 'border-accent/30 bg-accent/[0.06]' : 'border-loss/30 bg-loss/[0.06]')}
          aria-live="polite"
        >
          <p className="mb-1 font-semibold text-white">{selected === q.answer ? 'Richtig!' : 'Leider falsch.'}</p>
          <p className="text-slate-300">{q.explanation}</p>
        </div>
      )}
      <div className="flex justify-end">
        <button className="btn-primary" onClick={next} disabled={selected === null}>
          {index + 1 < set.length ? 'Nächste Frage' : 'Auswertung anzeigen'} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
