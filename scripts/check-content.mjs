/**
 * Inhaltsprüfung: findet kaputte interne Links, falsche Verweise und
 * inkonsistente Übungen/Quiz – bevor sie jemand auf der Website entdeckt.
 *
 * Ausführen mit:  npm run test:content
 */
import { readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const lessonsDir = resolve(root, 'src/content/lessons')

const load = (rel) => import(pathToFileURL(resolve(root, rel)).href)

const { LESSON_ORDER } = await load('src/content/order.ts')
const { PROMPTS, PROMPT_CATEGORIES } = await load('src/content/prompts.ts')
const { GLOSSARY } = await load('src/content/glossary.ts')
const { QUICKSTART, PLAN_30 } = await load('src/content/plans.ts')

/* --------------------------------------------------- Lektionen einlesen */

const lessons = []
for (const track of readdirSync(lessonsDir, { withFileTypes: true })) {
  if (!track.isDirectory()) continue
  for (const file of readdirSync(join(lessonsDir, track.name))) {
    if (!file.endsWith('.ts')) continue
    const mod = await import(pathToFileURL(join(lessonsDir, track.name, file)).href)
    lessons.push(mod.lesson)
  }
}

const slugs = new Set(lessons.map((l) => l.slug))

/** Alle Adressen, die die Anwendung kennt (siehe src/App.tsx). */
const STATIC_ROUTES = new Set([
  '/',
  '/lernpfad',
  '/prompts',
  '/prompt-verbessern',
  '/uebungen',
  '/glossar',
  '/favoriten',
  '/fortschritt',
  '/schnellstart',
  '/30-tage',
  '/404',
])

const TRACK_IDS = new Set([
  'basics',
  'prompting',
  'work',
  'files',
  'projects',
  'claude-code',
  'advanced',
])

const errors = []
const warnings = []

function fail(msg) {
  errors.push(msg)
}

function warn(msg) {
  warnings.push(msg)
}

/* -------------------------------------------------- Interne Links prüfen */

function checkLink(href, where) {
  const path = href.split('#')[0]
  if (path === '') return // reiner Anker
  if (STATIC_ROUTES.has(path)) return
  if (path.startsWith('/lektion/')) {
    const slug = path.slice('/lektion/'.length)
    if (!slugs.has(slug)) fail(`${where}: Link auf unbekannte Lektion "${slug}"`)
    return
  }
  if (path.startsWith('/thema/')) {
    const id = path.slice('/thema/'.length)
    if (!TRACK_IDS.has(id)) fail(`${where}: Link auf unbekanntes Thema "${id}"`)
    return
  }
  fail(`${where}: Link auf unbekannte Adresse "${href}"`)
}

const LINK_RE = /\[[^\]]+\]\((\/[^)\s]*)\)/g

function scanText(text, where) {
  if (typeof text !== 'string') return
  for (const m of text.matchAll(LINK_RE)) checkLink(m[1], where)
}

function scanBlock(block, where) {
  for (const [key, value] of Object.entries(block)) {
    if (typeof value === 'string') scanText(value, `${where}.${key}`)
    else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === 'string') scanText(item, `${where}.${key}[${i}]`)
        else if (item && typeof item === 'object') scanBlock(item, `${where}.${key}[${i}]`)
      })
    } else if (value && typeof value === 'object') {
      scanBlock(value, `${where}.${key}`)
    }
  }
}

/* ---------------------------------------------------- Lektionen prüfen */

const REQUIRED_SECTIONS = ['what', 'why', 'how', 'try']

for (const lesson of lessons) {
  const where = `Lektion ${lesson.slug}`

  if (!LESSON_ORDER.includes(lesson.slug)) fail(`${where}: fehlt in order.ts`)
  if (lesson.description.length > 200) {
    warn(`${where}: Beschreibung ist ${lesson.description.length} Zeichen (empfohlen: < 200)`)
  }

  const kinds = lesson.sections.map((s) => s.kind)
  for (const req of REQUIRED_SECTIONS) {
    if (!kinds.includes(req)) warn(`${where}: Abschnitt "${req}" fehlt`)
  }

  if (!lesson.quiz || lesson.quiz.length === 0) warn(`${where}: kein Quiz`)
  if (!lesson.exercise) warn(`${where}: keine Übung`)
  if (!lesson.task) warn(`${where}: keine Mini-Aufgabe`)
  if (!lesson.proTip) warn(`${where}: kein Profi-Tipp`)
  if (!lesson.mistakes?.length) warn(`${where}: keine "Häufige Fehler"`)

  lesson.sections.forEach((s, i) => scanBlock(s, `${where}.sections[${i}]`))
  ;(lesson.mistakes ?? []).forEach((m, i) => scanText(m, `${where}.mistakes[${i}]`))
  scanText(lesson.proTip, `${where}.proTip`)
  if (lesson.task) {
    scanText(lesson.task.md, `${where}.task`)
    scanText(lesson.task.solution, `${where}.task.solution`)
  }

  for (const ref of lesson.related ?? []) {
    if (!slugs.has(ref)) fail(`${where}: related verweist auf unbekannte Lektion "${ref}"`)
    if (ref === lesson.slug) fail(`${where}: related verweist auf sich selbst`)
  }

  /* Übung: genau eine richtige Antwort, jede Option mit Erklärung. */
  if (lesson.exercise) {
    const correct = lesson.exercise.options.filter((o) => o.correct).length
    if (correct !== 1) {
      fail(`${where}: Übung hat ${correct} richtige Antworten (erwartet: genau 1)`)
    }
    lesson.exercise.options.forEach((o, i) => {
      if (!o.explain?.trim()) fail(`${where}: Übung, Option ${i + 1} ohne Erklärung`)
    })
    if (lesson.exercise.options.length < 2) fail(`${where}: Übung mit weniger als 2 Optionen`)
  }

  /* Quiz: dieselben Regeln pro Frage. */
  for (const [qi, q] of (lesson.quiz ?? []).entries()) {
    const correct = q.options.filter((o) => o.correct).length
    if (correct !== 1) {
      fail(`${where}: Quizfrage ${qi + 1} hat ${correct} richtige Antworten (erwartet: genau 1)`)
    }
    if (q.options.length < 2) fail(`${where}: Quizfrage ${qi + 1} mit weniger als 2 Optionen`)
    q.options.forEach((o, i) => {
      if (!o.explain?.trim()) fail(`${where}: Quizfrage ${qi + 1}, Option ${i + 1} ohne Erklärung`)
    })
  }
}

/* ------------------------------------------------------ Prompts prüfen */

const categories = new Set(PROMPT_CATEGORIES.map((c) => c.id))
const promptIds = new Set()

for (const p of PROMPTS) {
  const where = `Prompt ${p.id}`
  if (promptIds.has(p.id)) fail(`${where}: doppelte Kennung`)
  promptIds.add(p.id)

  if (!categories.has(p.category)) fail(`${where}: unbekannte Kategorie "${p.category}"`)
  if (p.lesson && !slugs.has(p.lesson)) {
    fail(`${where}: verweist auf unbekannte Lektion "${p.lesson}"`)
  }
  if (!p.prompt.trim()) fail(`${where}: leerer Prompt-Text`)
  if (!p.howToAdapt?.length) warn(`${where}: keine Hinweise unter "So passt du ihn an"`)
  p.howToAdapt?.forEach((t, i) => scanText(t, `${where}.howToAdapt[${i}]`))
  scanText(p.when, `${where}.when`)
}

/* ------------------------------------------------------ Glossar prüfen */

const terms = new Set(GLOSSARY.map((g) => g.term))
for (const g of GLOSSARY) {
  const where = `Glossar "${g.term}"`
  if (g.lesson && !slugs.has(g.lesson)) {
    fail(`${where}: verweist auf unbekannte Lektion "${g.lesson}"`)
  }
  for (const ref of g.seeAlso ?? []) {
    if (!terms.has(ref)) fail(`${where}: "Siehe auch" verweist auf unbekannten Begriff "${ref}"`)
  }
  scanText(g.simple, `${where}.simple`)
  scanText(g.example, `${where}.example`)
}

/* -------------------------------------------------- Lernpläne prüfen */

QUICKSTART.forEach((step, i) => {
  const where = `Schnellstart Schritt ${i + 1}`
  if (step.lesson && !slugs.has(step.lesson)) {
    fail(`${where}: verweist auf unbekannte Lektion "${step.lesson}"`)
  }
  scanText(step.md, where)
})

const days = new Set()
PLAN_30.forEach((day) => {
  const where = `30-Tage-Plan, Tag ${day.day}`
  if (days.has(day.day)) fail(`${where}: doppelter Tag`)
  days.add(day.day)
  if (day.lesson && !slugs.has(day.lesson)) {
    fail(`${where}: verweist auf unbekannte Lektion "${day.lesson}"`)
  }
  scanText(day.focus, where)
  scanText(day.task, `${where}.task`)
})

for (let d = 1; d <= 30; d++) {
  if (!days.has(d)) fail(`30-Tage-Plan: Tag ${d} fehlt`)
}

/* ---------------------------------------------------------- Ergebnis */

const stats = {
  Lektionen: lessons.length,
  Prompts: PROMPTS.length,
  Glossarbegriffe: GLOSSARY.length,
  Quizfragen: lessons.reduce((a, l) => a + (l.quiz?.length ?? 0), 0),
  Übungen: lessons.filter((l) => l.exercise).length,
  'Minuten Lernzeit': lessons.reduce((a, l) => a + l.minutes, 0),
}

console.log('Inhalt geprüft:')
for (const [k, v] of Object.entries(stats)) console.log(`  ${k}: ${v}`)

if (warnings.length > 0) {
  console.log(`\n${warnings.length} Hinweis(e):`)
  warnings.forEach((w) => console.log(`  • ${w}`))
}

if (errors.length > 0) {
  console.error(`\n${errors.length} Fehler:`)
  errors.forEach((e) => console.error(`  ✗ ${e}`))
  process.exit(1)
}

console.log('\n✓ Keine Fehler gefunden.')
