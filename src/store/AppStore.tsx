import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react';
import { CloudSync, type SyncStatus } from '@/lib/cloudSync';
import { IS_ARTIFACT } from '@/lib/env';
import type { ActivityEntry, AppState, PortfolioState, Settings, WatchlistItem } from '@/types';
import { defaultState, loadState, saveState } from '@/lib/storage';

const hasLocalData = (s: AppState) =>
  Object.keys(s.progress.completedLessons).length > 0 || s.progress.activity.length > 0 || s.portfolio.transactions.length > 0 || s.watchlist.length > 0 || !!s.settings.name;
import { addStudyDay, PASS_THRESHOLD, POINTS } from '@/lib/progress';
import { advanceDays, buy, createPortfolio, sell, totalValue } from '@/lib/portfolio';

type Action =
  | { type: 'replace'; state: AppState }
  | { type: 'settings'; patch: Partial<Settings> }
  | { type: 'progress'; update: (p: AppState['progress']) => AppState['progress'] }
  | { type: 'portfolio'; portfolio: PortfolioState; activity?: Omit<ActivityEntry, 'id' | 'at'> }
  | { type: 'watchlist'; items: WatchlistItem[] };

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

function withActivity(p: AppState['progress'], entry: Omit<ActivityEntry, 'id' | 'at'>): AppState['progress'] {
  const e: ActivityEntry = { ...entry, id: newId(), at: new Date().toISOString() };
  return {
    ...p,
    points: p.points + entry.points,
    activity: [e, ...p.activity].slice(0, 200),
    studyDays: addStudyDay(p.studyDays),
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'replace':
      return action.state;
    case 'settings':
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case 'progress':
      return { ...state, progress: action.update(state.progress) };
    case 'portfolio':
      return {
        ...state,
        portfolio: action.portfolio,
        progress: action.activity ? withActivity(state.progress, action.activity) : state.progress,
      };
    case 'watchlist':
      return { ...state, watchlist: action.items };
    default:
      return state;
  }
}

/** Aktualisiert den Depotwert des aktuellen Tages in der Historie (z. B. nach einem Trade). */
function snapshot(p: PortfolioState): PortfolioState {
  const value = totalValue(p);
  const history = [...p.history];
  const last = history[history.length - 1];
  if (last && last.day === p.day) history[history.length - 1] = { day: p.day, value, cash: p.cash };
  else history.push({ day: p.day, value, cash: p.cash });
  return { ...p, history };
}

function useAppStoreValue() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const saveTimer = useRef<number>();

  useEffect(() => {
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => saveState(state), 250);
    return () => window.clearTimeout(saveTimer.current);
  }, [state]);

  // ---------- Speicherung im Claude-Konto (Artefakt-Version) ----------
  const [sync, setSync] = useState<{ status: SyncStatus; detail?: string }>({ status: IS_ARTIFACT ? 'connecting' : 'local' });
  const cloud = useRef<CloudSync | null>(null);
  const cloudTimer = useRef<number>();

  useEffect(() => {
    if (!IS_ARTIFACT) return;
    const c = new CloudSync((status, detail) => setSync({ status, detail }));
    cloud.current = c;
    let active = true;
    c.connect().then((saved) => {
      if (!active) return;
      if (saved) dispatch({ type: 'replace', state: saved });
      else if (c.connected && hasLocalData(stateRef.current)) c.save(stateRef.current); // vorhandenen Browser-Stand übernehmen
    });
    const flushNow = () => {
      if (document.visibilityState === 'hidden') cloud.current?.save(stateRef.current);
    };
    document.addEventListener('visibilitychange', flushNow);
    window.addEventListener('pagehide', flushNow);
    return () => {
      active = false;
      document.removeEventListener('visibilitychange', flushNow);
      window.removeEventListener('pagehide', flushNow);
    };
  }, []);

  useEffect(() => {
    if (!cloud.current?.connected) return;
    window.clearTimeout(cloudTimer.current);
    cloudTimer.current = window.setTimeout(() => cloud.current?.save(state), 1500);
    return () => window.clearTimeout(cloudTimer.current);
  }, [state, sync.status]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', state.settings.reduceMotion);
  }, [state.settings.reduceMotion]);


  const updateSettings = useCallback((patch: Partial<Settings>) => dispatch({ type: 'settings', patch }), []);

  const completeLesson = useCallback((lessonId: string, title: string) => {
    dispatch({
      type: 'progress',
      update: (p) => {
        if (p.completedLessons[lessonId]) return p;
        const next = { ...p, completedLessons: { ...p.completedLessons, [lessonId]: new Date().toISOString() } };
        return withActivity(next, { type: 'lesson', text: `Lektion abgeschlossen: ${title}`, points: POINTS.lesson });
      },
    });
  }, []);

  const uncompleteLesson = useCallback((lessonId: string) => {
    dispatch({
      type: 'progress',
      update: (p) => {
        if (!p.completedLessons[lessonId]) return p;
        const copy = { ...p.completedLessons };
        delete copy[lessonId];
        return { ...p, completedLessons: copy, points: Math.max(0, p.points - POINTS.lesson) };
      },
    });
  }, []);

  const recordLessonQuiz = useCallback((lessonId: string, title: string, correct: number, total: number) => {
    dispatch({
      type: 'progress',
      update: (p) => {
        const prevBest = Math.round((p.lessonQuiz[lessonId] ?? 0) * total);
        const gained = Math.max(0, correct - prevBest) * POINTS.lessonQuizPerCorrect;
        const share = total ? correct / total : 0;
        const next = { ...p, lessonQuiz: { ...p.lessonQuiz, [lessonId]: Math.max(p.lessonQuiz[lessonId] ?? 0, share) } };
        return withActivity(next, {
          type: 'lesson-quiz',
          text: `Kurztest „${title}“: ${correct}/${total} richtig`,
          points: gained,
        });
      },
    });
  }, []);

  const recordModuleQuiz = useCallback(
    (moduleId: string, title: string, correct: number, total: number, wrongIds: string[]) => {
      dispatch({
        type: 'progress',
        update: (p) => {
          const prev = p.quizResults[moduleId];
          const score = total ? correct / total : 0;
          const prevCorrect = prev ? Math.round(prev.bestScore * total) : 0;
          const passed = score >= PASS_THRESHOLD;
          let gained = Math.max(0, correct - prevCorrect) * POINTS.moduleQuizPerCorrect;
          if (passed && !prev?.passed) gained += POINTS.passBonus;
          const next = {
            ...p,
            quizResults: {
              ...p.quizResults,
              [moduleId]: {
                bestScore: Math.max(prev?.bestScore ?? 0, score),
                lastScore: score,
                attempts: (prev?.attempts ?? 0) + 1,
                passed: passed || !!prev?.passed,
                wrongIds,
                lastAttemptAt: new Date().toISOString(),
              },
            },
          };
          return withActivity(next, {
            type: 'quiz',
            text: `Wissenstest „${title}“: ${Math.round(score * 100)} %${passed ? ' – bestanden' : ''}`,
            points: gained,
          });
        },
      });
    },
    [],
  );

  const completeExercise = useCallback((id: string, title: string) => {
    dispatch({
      type: 'progress',
      update: (p) => {
        if (p.exercisesDone[id]) return p;
        const next = { ...p, exercisesDone: { ...p.exercisesDone, [id]: new Date().toISOString() } };
        return withActivity(next, { type: 'exercise', text: `Übung erledigt: ${title}`, points: POINTS.exercise });
      },
    });
  }, []);

  const setLastLesson = useCallback((lessonId: string) => {
    dispatch({ type: 'progress', update: (p) => (p.lastLessonId === lessonId ? p : { ...p, lastLessonId: lessonId }) });
  }, []);

  const addStudySeconds = useCallback((seconds: number) => {
    dispatch({
      type: 'progress',
      update: (p) => ({ ...p, studySeconds: p.studySeconds + seconds, studyDays: addStudyDay(p.studyDays) }),
    });
  }, []);

  const setChecklist = useCallback((key: string, value: boolean) => {
    dispatch({ type: 'progress', update: (p) => ({ ...p, checklist: { ...p.checklist, [key]: value } }) });
  }, []);

  const setPlanField = useCallback((key: string, value: string) => {
    dispatch({ type: 'progress', update: (p) => ({ ...p, investmentPlan: { ...p.investmentPlan, [key]: value } }) });
  }, []);

  // ---------- Depot (Simulation) ----------
  /** Kauft virtuelle Aktien. Wirft TradeError bei ungültiger Eingabe. */
  const buyStock = useCallback((symbol: string, shares: number) => {
    const next = snapshot(buy(stateRef.current.portfolio, symbol, shares));
    dispatch({
      type: 'portfolio',
      portfolio: next,
      activity: { type: 'trade', text: `Simulation: ${shares} × ${symbol} gekauft`, points: 0 },
    });
  }, []);

  const sellStock = useCallback((symbol: string, shares: number) => {
    const next = snapshot(sell(stateRef.current.portfolio, symbol, shares));
    dispatch({
      type: 'portfolio',
      portfolio: next,
      activity: { type: 'trade', text: `Simulation: ${shares} × ${symbol} verkauft`, points: 0 },
    });
  }, []);

  const advance = useCallback((days: number) => {
    dispatch({ type: 'portfolio', portfolio: advanceDays(stateRef.current.portfolio, days) });
  }, []);

  const resetPortfolio = useCallback((fee?: number) => {
    dispatch({ type: 'portfolio', portfolio: createPortfolio(10000, fee ?? stateRef.current.portfolio.feePerTrade) });
  }, []);

  const setFee = useCallback((fee: number) => {
    dispatch({ type: 'portfolio', portfolio: { ...stateRef.current.portfolio, feePerTrade: Math.max(0, fee) } });
  }, []);

  // ---------- Watchlist ----------
  const addWatch = useCallback((item: Omit<WatchlistItem, 'id' | 'addedAt'>) => {
    dispatch({
      type: 'watchlist',
      items: [{ ...item, id: newId(), addedAt: new Date().toISOString() }, ...stateRef.current.watchlist],
    });
  }, []);

  const updateWatch = useCallback((id: string, patch: Partial<WatchlistItem>) => {
    dispatch({ type: 'watchlist', items: stateRef.current.watchlist.map((w) => (w.id === id ? { ...w, ...patch } : w)) });
  }, []);

  const removeWatch = useCallback((id: string) => {
    dispatch({ type: 'watchlist', items: stateRef.current.watchlist.filter((w) => w.id !== id) });
  }, []);

  const replaceState = useCallback((s: AppState) => dispatch({ type: 'replace', state: s }), []);
  const resetAll = useCallback(() => dispatch({ type: 'replace', state: defaultState() }), []);
  const resetProgress = useCallback(() => dispatch({ type: 'progress', update: () => defaultState().progress }), []);

  const actions = useMemo(
    () => ({
      updateSettings,
      completeLesson,
      uncompleteLesson,
      recordLessonQuiz,
      recordModuleQuiz,
      completeExercise,
      setLastLesson,
      addStudySeconds,
      setChecklist,
      setPlanField,
      buyStock,
      sellStock,
      advance,
      resetPortfolio,
      setFee,
      addWatch,
      updateWatch,
      removeWatch,
      replaceState,
      resetAll,
      resetProgress,
    }),
    [
      updateSettings,
      completeLesson,
      uncompleteLesson,
      recordLessonQuiz,
      recordModuleQuiz,
      completeExercise,
      setLastLesson,
      addStudySeconds,
      setChecklist,
      setPlanField,
      buyStock,
      sellStock,
      advance,
      resetPortfolio,
      setFee,
      addWatch,
      updateWatch,
      removeWatch,
      replaceState,
      resetAll,
      resetProgress,
    ],
  );

  return { state, actions, sync };
}

type StoreValue = ReturnType<typeof useAppStoreValue>;
const StoreContext = createContext<StoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const value = useAppStoreValue();
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore muss innerhalb von AppStoreProvider verwendet werden.');
  return ctx;
}
