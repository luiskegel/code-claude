/**
 * Lädt vollständige Lektionen bei Bedarf nach.
 *
 * Jede Lektion ist ein eigenes Paket. Beim Öffnen einer Lektion wird genau
 * diese eine Datei geholt – nicht alle 54. Für Suche und Übungsübersicht gibt
 * es `loadAllLessons()`, das alle Pakete parallel lädt.
 */
import { LESSONS } from './index'
import type { Lesson } from './types'

const modules = import.meta.glob<{ lesson: Lesson }>('./lessons/*/*.ts')

const cache = new Map<string, Lesson>()
let allPromise: Promise<Lesson[]> | null = null

function pathFor(track: string, slug: string): string {
  return `./lessons/${track}/${slug}.ts`
}

export async function loadLesson(slug: string): Promise<Lesson | undefined> {
  const cached = cache.get(slug)
  if (cached) return cached

  const meta = LESSONS.find((l) => l.slug === slug)
  if (!meta) return undefined

  const load = modules[pathFor(meta.track, meta.slug)]
  if (!load) return undefined

  const mod = await load()
  cache.set(slug, mod.lesson)
  return mod.lesson
}

/** Alle Lektionen – in der Reihenfolge des Lernpfads. */
export async function loadAllLessons(): Promise<Lesson[]> {
  if (!allPromise) {
    allPromise = Promise.all(LESSONS.map((meta) => loadLesson(meta.slug))).then(
      (list) => list.filter((l): l is Lesson => Boolean(l))
    )
  }
  return allPromise
}
