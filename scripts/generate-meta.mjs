/**
 * Erzeugt `src/content/meta.generated.ts` aus den Lektionsdateien.
 *
 * Warum: Navigation, Startseite und Lernpfad brauchen nur Titel, Beschreibung,
 * Dauer und Thema – nicht den vollständigen Text jeder Lektion. Diese kleine
 * Datei wird beim ersten Laden geholt, die Inhalte selbst erst beim Öffnen
 * einer Lektion.
 *
 * Quelle der Wahrheit bleiben die Lektionsdateien und `src/content/order.ts`.
 * Ausführen mit:  npm run gen:meta
 */
import { readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const lessonsDir = resolve(root, 'src/content/lessons')

const { LESSON_ORDER } = await import(pathToFileURL(resolve(root, 'src/content/order.ts')).href)

/* Alle Lektionsdateien einsammeln: lessons/<track>/<slug>.ts */
const found = new Map()

for (const track of readdirSync(lessonsDir, { withFileTypes: true })) {
  if (!track.isDirectory()) continue
  for (const file of readdirSync(join(lessonsDir, track.name))) {
    if (!file.endsWith('.ts')) continue
    const slug = file.slice(0, -3)
    const mod = await import(pathToFileURL(join(lessonsDir, track.name, file)).href)
    const lesson = mod.lesson

    if (!lesson) throw new Error(`${track.name}/${file}: kein Export "lesson" gefunden`)
    if (lesson.slug !== slug) {
      throw new Error(`${track.name}/${file}: slug "${lesson.slug}" passt nicht zum Dateinamen`)
    }
    if (lesson.track !== track.name) {
      throw new Error(
        `${track.name}/${file}: track "${lesson.track}" passt nicht zum Ordner "${track.name}"`
      )
    }
    for (const key of ['title', 'description', 'minutes']) {
      if (!lesson[key]) throw new Error(`${track.name}/${file}: Feld "${key}" fehlt`)
    }
    found.set(slug, lesson)
  }
}

/* Abgleich mit der Reihenfolge – beide Richtungen prüfen. */
const missingInOrder = [...found.keys()].filter((slug) => !LESSON_ORDER.includes(slug))
if (missingInOrder.length > 0) {
  throw new Error(
    `Diese Lektionen fehlen in src/content/order.ts: ${missingInOrder.join(', ')}`
  )
}

const missingFiles = LESSON_ORDER.filter((slug) => !found.has(slug))
if (missingFiles.length > 0) {
  throw new Error(`Für diese Slugs gibt es keine Datei: ${missingFiles.join(', ')}`)
}

const duplicates = LESSON_ORDER.filter((slug, i) => LESSON_ORDER.indexOf(slug) !== i)
if (duplicates.length > 0) {
  throw new Error(`Doppelte Einträge in order.ts: ${[...new Set(duplicates)].join(', ')}`)
}

/* Verweise prüfen: related-Slugs und Lektionsangaben müssen existieren. */
const brokenRefs = []
for (const [slug, lesson] of found) {
  for (const ref of lesson.related ?? []) {
    if (!found.has(ref)) brokenRefs.push(`${slug} → related: ${ref}`)
  }
}
if (brokenRefs.length > 0) {
  throw new Error(`Verweise auf nicht vorhandene Lektionen:\n  ${brokenRefs.join('\n  ')}`)
}

const entries = LESSON_ORDER.map((slug) => {
  const l = found.get(slug)
  return {
    slug: l.slug,
    track: l.track,
    title: l.title,
    description: l.description,
    minutes: l.minutes,
    keywords: l.keywords ?? [],
  }
})

const body = entries
  .map(
    (e) => `  {
    slug: ${JSON.stringify(e.slug)},
    track: ${JSON.stringify(e.track)},
    title: ${JSON.stringify(e.title)},
    description: ${JSON.stringify(e.description)},
    minutes: ${e.minutes},
    keywords: ${JSON.stringify(e.keywords)},
  },`
  )
  .join('\n')

const out = `/* AUTOMATISCH ERZEUGT – nicht von Hand bearbeiten.
 * Quelle: src/content/lessons/**, Reihenfolge: src/content/order.ts
 * Neu erzeugen mit: npm run gen:meta
 */
import type { LessonMeta } from './types'

export const LESSON_META: LessonMeta[] = [
${body}
]
`

writeFileSync(resolve(root, 'src/content/meta.generated.ts'), out, 'utf8')
console.log(`meta.generated.ts geschrieben: ${entries.length} Lektionen, alle Verweise gültig.`)
