// Lernstufen, Punkte und Auswertungen des Lernfortschritts.
import type { ProgressState } from '@/types';

export const POINTS = {
  lesson: 20,
  lessonQuizPerCorrect: 5,
  moduleQuizPerCorrect: 10,
  exercise: 10,
  passBonus: 50,
} as const;

export const PASS_THRESHOLD = 0.7;

export interface Level {
  level: number;
  title: string;
  description: string;
  /** Anteil abgeschlossener Lektionen (0..1) */
  minLessonShare: number;
  /** bestandene Modultests */
  minPassedTests: number;
}

export const LEVELS: Level[] = [
  {
    level: 1,
    title: 'Börsen-Anfänger',
    description: 'Du startest deine Reise. Ziel: die Grundbegriffe der Börse kennenlernen.',
    minLessonShare: 0,
    minPassedTests: 0,
  },
  {
    level: 2,
    title: 'Aktien-Grundlagen verstanden',
    description: 'Du weißt, was Aktien, Börsen und Orders sind, und hast erste Tests bestanden.',
    minLessonShare: 0.2,
    minPassedTests: 2,
  },
  {
    level: 3,
    title: 'Aktien-Analyst',
    description: 'Du kannst Geschäftsberichte lesen und Kennzahlen einordnen.',
    minLessonShare: 0.45,
    minPassedTests: 5,
  },
  {
    level: 4,
    title: 'Fortgeschrittener Investor',
    description: 'Du kennst Strategien, Risiken und deine eigene Psychologie.',
    minLessonShare: 0.7,
    minPassedTests: 10,
  },
  {
    level: 5,
    title: 'Professionelles Börsenverständnis',
    description: 'Du hast alle Module abgeschlossen und alle Modultests bestanden.',
    minLessonShare: 1,
    minPassedTests: 15,
  },
];

export function passedTests(progress: ProgressState): number {
  return Object.values(progress.quizResults).filter((r) => r.passed).length;
}

export function currentLevel(progress: ProgressState, totalLessons: number, totalModules = 15) {
  const done = Object.keys(progress.completedLessons).length;
  const share = totalLessons > 0 ? done / totalLessons : 0;
  const passed = passedTests(progress);
  let current = LEVELS[0];
  for (const l of LEVELS) {
    const needTests = Math.min(l.minPassedTests, totalModules);
    if (share >= l.minLessonShare - 1e-9 && passed >= needTests) current = l;
  }
  const next = LEVELS.find((l) => l.level === current.level + 1);
  let toNext = 1;
  if (next) {
    const lessonPart = next.minLessonShare > 0 ? Math.min(1, share / next.minLessonShare) : 1;
    const testPart = next.minPassedTests > 0 ? Math.min(1, passed / next.minPassedTests) : 1;
    toNext = (lessonPart + testPart) / 2;
  }
  return { current, next, toNext, done, share, passed };
}

const dayKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const todayKey = () => dayKey(new Date());

/** Lernserie: aufeinanderfolgende Tage mit Aktivität bis heute (oder gestern). */
export function streak(studyDays: string[], today = new Date()): number {
  const set = new Set(studyDays);
  const d = new Date(today);
  if (!set.has(dayKey(d))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(dayKey(d))) return 0;
  }
  let count = 0;
  while (set.has(dayKey(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export function addStudyDay(days: string[], key = todayKey()): string[] {
  if (days.includes(key)) return days;
  return [...days, key].slice(-400);
}

export function emptyProgress(): ProgressState {
  return {
    completedLessons: {},
    lessonQuiz: {},
    exercisesDone: {},
    quizResults: {},
    points: 0,
    activity: [],
    studyDays: [],
    studySeconds: 0,
    checklist: {},
    investmentPlan: {},
  };
}
