/**
 * Lokaler Speicher für Fortschritt, Favoriten, Quiz-Ergebnisse und Theme.
 *
 * Alles liegt im localStorage des Browsers – keine Anmeldung, kein Backend.
 * Jeder Zugriff ist gekapselt, damit die App auch dann funktioniert, wenn
 * localStorage nicht verfügbar ist (privates Fenster, blockierte Site-Daten).
 */

const KEY = 'ca:state:v1'
export const THEME_KEY = 'ca:theme'

export type LessonStatus = 'none' | 'started' | 'done'

export interface QuizResult {
  correct: number
  total: number
  at: number
}

export interface AppState {
  /** slug -> 'started' | 'done' */
  lessons: Record<string, Exclude<LessonStatus, 'none'>>
  /** slug -> letztes Quizergebnis */
  quiz: Record<string, QuizResult>
  /** Favoriten: 'lesson:<slug>' oder 'prompt:<id>' */
  favorites: string[]
  /** Zuletzt besuchte Lektion */
  lastLesson?: string
  /** Abgehakte Tage im 30-Tage-Plan */
  planDays: number[]
  /** Abgehakte Schritte im Schnellstart */
  quickstart: number[]
}

const EMPTY: AppState = {
  lessons: {},
  quiz: {},
  favorites: [],
  planDays: [],
  quickstart: [],
}

function safeRead(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      lessons: parsed.lessons ?? {},
      quiz: parsed.quiz ?? {},
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      lastLesson: parsed.lastLesson,
      planDays: Array.isArray(parsed.planDays) ? parsed.planDays : [],
      quickstart: Array.isArray(parsed.quickstart) ? parsed.quickstart : [],
    }
  } catch {
    return { ...EMPTY }
  }
}

function safeWrite(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* Speicher nicht verfügbar – die App funktioniert trotzdem. */
  }
}

/* --------------------------------------------- Abonnierbarer Zustand */

let current: AppState | null = null
const listeners = new Set<() => void>()

export function getState(): AppState {
  if (!current) current = safeRead()
  return current
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function update(mutate: (s: AppState) => AppState) {
  const next = mutate(getState())
  current = next
  safeWrite(next)
  listeners.forEach((fn) => fn())
}

/* ------------------------------------------------------------ Aktionen */

export function markStarted(slug: string) {
  update((s) => {
    if (s.lessons[slug] === 'done') return { ...s, lastLesson: slug }
    return { ...s, lessons: { ...s.lessons, [slug]: 'started' }, lastLesson: slug }
  })
}

export function markDone(slug: string) {
  update((s) => ({ ...s, lessons: { ...s.lessons, [slug]: 'done' }, lastLesson: slug }))
}

export function unmarkDone(slug: string) {
  update((s) => ({ ...s, lessons: { ...s.lessons, [slug]: 'started' } }))
}

export function lessonStatus(slug: string): LessonStatus {
  return getState().lessons[slug] ?? 'none'
}

export function saveQuiz(slug: string, correct: number, total: number) {
  update((s) => ({ ...s, quiz: { ...s.quiz, [slug]: { correct, total, at: Date.now() } } }))
}

export function toggleFavorite(id: string) {
  update((s) => ({
    ...s,
    favorites: s.favorites.includes(id)
      ? s.favorites.filter((f) => f !== id)
      : [...s.favorites, id],
  }))
}

export function isFavorite(id: string): boolean {
  return getState().favorites.includes(id)
}

export function togglePlanDay(day: number) {
  update((s) => ({
    ...s,
    planDays: s.planDays.includes(day)
      ? s.planDays.filter((d) => d !== day)
      : [...s.planDays, day],
  }))
}

export function toggleQuickstart(step: number) {
  update((s) => ({
    ...s,
    quickstart: s.quickstart.includes(step)
      ? s.quickstart.filter((d) => d !== step)
      : [...s.quickstart, step],
  }))
}

export function resetAll() {
  update(() => ({ ...EMPTY, lessons: {}, quiz: {}, favorites: [], planDays: [], quickstart: [] }))
}

/* --------------------------------------------------------------- Theme */

export type Theme = 'light' | 'dark'

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignorieren */
  }
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.dataset.theme
    if (attr === 'light' || attr === 'dark') return attr
  }
  return 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    /* ignorieren */
  }
}
