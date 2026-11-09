import type { CategoryId, Lesson, Module } from '@/types';
import { m01 } from './modules/m01';
import { m02 } from './modules/m02';
import { m03 } from './modules/m03';
import { m04 } from './modules/m04';
import { m05 } from './modules/m05';
import { m06 } from './modules/m06';
import { m07 } from './modules/m07';
import { m08 } from './modules/m08';
import { m09 } from './modules/m09';
import { m10 } from './modules/m10';
import { m11 } from './modules/m11';
import { m12 } from './modules/m12';
import { m13 } from './modules/m13';
import { m14 } from './modules/m14';
import { m15 } from './modules/m15';

export const MODULES: Module[] = [m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15];

export const ALL_LESSONS: { lesson: Lesson; module: Module; index: number }[] = MODULES.flatMap((module) =>
  module.lessons.map((lesson, index) => ({ lesson, module, index })),
);

export const TOTAL_LESSONS = ALL_LESSONS.length;

export interface Category {
  id: CategoryId;
  title: string;
  path: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'grundlagen',
    title: 'Grundlagen',
    path: '/grundlagen',
    description: 'Wie die Börse funktioniert und wie du ganz praktisch Aktien kaufst.',
  },
  {
    id: 'aktien-verstehen',
    title: 'Aktien verstehen',
    path: '/aktien-verstehen',
    description: 'Was Aktien, Dividenden und ETFs sind – und wie du mit ihnen Geld verdienen oder verlieren kannst.',
  },
  {
    id: 'aktien-analysieren',
    title: 'Aktien analysieren',
    path: '/aktien-analysieren',
    description: 'Unternehmen bewerten: Bilanz, Kennzahlen, Charts und ein vollständiger Analyseprozess.',
  },
  {
    id: 'boersenwissen',
    title: 'Börsenwissen',
    path: '/boersenwissen',
    description: 'Wirtschaft, Zinsen, Zentralbanken sowie fortgeschrittene Themen wie Derivate und Crashs.',
  },
  {
    id: 'strategien',
    title: 'Investmentstrategien',
    path: '/strategien',
    description: 'Strategien mit Vor- und Nachteilen und dein persönlicher Investmentplan.',
  },
  {
    id: 'risiko',
    title: 'Risikomanagement',
    path: '/risiko',
    description: 'Verluste verstehen und begrenzen – und die eigene Psychologie im Griff behalten.',
  },
];

export const getModule = (id: string) => MODULES.find((m) => m.id === id);

export function getLesson(lessonId: string) {
  return ALL_LESSONS.find((x) => x.lesson.id === lessonId);
}

export function nextLessonAfter(lessonId: string) {
  const i = ALL_LESSONS.findIndex((x) => x.lesson.id === lessonId);
  return i >= 0 ? ALL_LESSONS[i + 1] : undefined;
}

export function prevLessonBefore(lessonId: string) {
  const i = ALL_LESSONS.findIndex((x) => x.lesson.id === lessonId);
  return i > 0 ? ALL_LESSONS[i - 1] : undefined;
}

/** Empfohlene nächste Lektion: erste nicht abgeschlossene Lektion in Kursreihenfolge. */
export function recommendedLesson(completed: Record<string, string>) {
  return ALL_LESSONS.find((x) => !completed[x.lesson.id]);
}

export const lessonPath = (lessonId: string) => {
  const found = getLesson(lessonId);
  return found ? `/kurs/${found.module.id}/${lessonId}` : '/kurs';
};
