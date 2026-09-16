/**
 * Leichtgewichtiger Einstiegspunkt der Lerninhalte.
 *
 * Hier liegen nur die Kopfdaten aller Lektionen (Titel, Beschreibung, Dauer,
 * Thema). Damit rendern Navigation, Startseite und Lernpfad sofort. Der
 * eigentliche Lektionstext wird über `loader.ts` nachgeladen, wenn er
 * gebraucht wird.
 */
import { LESSON_META } from './meta.generated'
import type { LessonMeta, Track, TrackId } from './types'

export const TRACKS: Track[] = [
  {
    id: 'basics',
    title: 'Grundlagen',
    tagline: 'Was Claude ist, was er kann – und dein erster Prompt.',
    level: 1,
    levelLabel: 'Level 1 – Start',
    icon: '◐',
  },
  {
    id: 'prompting',
    title: 'Prompting',
    tagline: 'Wie du Aufträge formulierst, die gute Ergebnisse liefern.',
    level: 2,
    levelLabel: 'Level 2 – Prompting',
    icon: '◑',
  },
  {
    id: 'work',
    title: 'Arbeiten mit Claude',
    tagline: 'Texte, Analysen, Recherche, Planung, Lernen.',
    level: 3,
    levelLabel: 'Level 3 – Arbeiten',
    icon: '◒',
  },
  {
    id: 'files',
    title: 'Dateien & Dokumente',
    tagline: 'PDFs, Tabellen und Bilder auswerten, Dokumente erstellen.',
    level: 3,
    levelLabel: 'Level 3 – Arbeiten',
    icon: '◓',
  },
  {
    id: 'projects',
    title: 'Projekte & Workflows',
    tagline: 'Wissen dauerhaft hinterlegen, große Aufgaben strukturieren.',
    level: 4,
    levelLabel: 'Level 4 – Fortgeschritten',
    icon: '◔',
  },
  {
    id: 'claude-code',
    title: 'Claude Code',
    tagline: 'Von „Was ist ein Terminal?" bis zur veröffentlichten Website.',
    level: 4,
    levelLabel: 'Level 4 – Fortgeschritten',
    icon: '▶',
  },
  {
    id: 'advanced',
    title: 'Fortgeschritten & Profi',
    tagline: 'Komplexe Prompts, Automatisierung, API, Sicherheit.',
    level: 5,
    levelLabel: 'Level 5 – Profi',
    icon: '◕',
  },
]

/** Alle Lektionen als Kopfdaten, in der Reihenfolge des Lernpfads. */
export const LESSONS: LessonMeta[] = LESSON_META

const bySlug = new Map(LESSONS.map((l) => [l.slug, l]))

export function getLesson(slug: string): LessonMeta | undefined {
  return bySlug.get(slug)
}

export function getTrack(id: TrackId): Track | undefined {
  return TRACKS.find((t) => t.id === id)
}

export function lessonsOfTrack(id: TrackId): LessonMeta[] {
  return LESSONS.filter((l) => l.track === id)
}

export function lessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug)
}

export function nextLesson(slug: string): LessonMeta | undefined {
  const i = lessonIndex(slug)
  return i >= 0 ? LESSONS[i + 1] : undefined
}

export function prevLesson(slug: string): LessonMeta | undefined {
  const i = lessonIndex(slug)
  return i > 0 ? LESSONS[i - 1] : undefined
}

/** Themen gruppiert nach Level – für die Lernpfad-Ansicht. */
export function tracksByLevel(): { level: number; label: string; tracks: Track[] }[] {
  const levels = [...new Set(TRACKS.map((t) => t.level))].sort((a, b) => a - b)
  return levels.map((level) => {
    const tracks = TRACKS.filter((t) => t.level === level)
    return { level, label: tracks[0].levelLabel, tracks }
  })
}

export * from './types'
