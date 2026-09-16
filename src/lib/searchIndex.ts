/**
 * Aufbau des Suchindex.
 *
 * Diese Datei zieht sämtliche Inhalte heran (Lektionen, Prompts, Glossar,
 * Lernpläne) und wird deshalb erst beim ersten Öffnen der Suche geladen.
 */
import { TRACKS } from '../content'
import { loadAllLessons } from '../content/loader'
import { PROMPTS } from '../content/prompts'
import { GLOSSARY } from '../content/glossary'
import { QUICKSTART, PLAN_30 } from '../content/plans'
import { stripMd } from './markdown'
import { slugifyTerm, type SearchDoc } from './search'
import type { Block, Lesson } from '../content/types'

function blockText(block: Block): string {
  switch (block.type) {
    case 'text':
    case 'lead':
      return block.md
    case 'callout':
      return `${block.title ?? ''} ${block.md}`
    case 'list':
      return block.items.join(' ')
    case 'steps':
      return block.items.map((s) => `${s.title} ${s.md}`).join(' ')
    case 'table':
      return `${block.head.join(' ')} ${block.rows.flat().join(' ')} ${block.caption ?? ''}`
    case 'prompt':
      return `${block.title ?? ''} ${block.prompt} ${block.note ?? ''}`
    case 'code':
      return `${block.caption ?? ''} ${block.code}`
    case 'compare':
      return `${block.badMd} ${block.goodMd} ${block.why}`
    case 'simple':
      return block.levels.map((l) => `${l.label} ${l.md}`).join(' ')
    case 'example':
      return [
        block.title ?? '',
        block.example.task,
        block.example.bad,
        block.example.good,
        block.example.why,
        block.example.result,
      ].join(' ')
    case 'accordion':
      return `${block.title} ${block.blocks.map(blockText).join(' ')}`
    case 'quote':
      return `${block.md} ${block.source ?? ''}`
    case 'source':
      return block.md
    default:
      return ''
  }
}

function lessonText(lesson: Lesson): string {
  const parts: string[] = [lesson.title, lesson.description]
  for (const s of lesson.sections) {
    if (s.title) parts.push(s.title)
    parts.push(...s.blocks.map(blockText))
  }
  if (lesson.mistakes) parts.push(...lesson.mistakes)
  if (lesson.proTip) parts.push(lesson.proTip)
  if (lesson.task) parts.push(lesson.task.md, lesson.task.solution ?? '')
  if (lesson.exercise) {
    parts.push(lesson.exercise.question, lesson.exercise.scenario ?? '')
    parts.push(...lesson.exercise.options.map((o) => `${o.label} ${o.explain}`))
  }
  if (lesson.quiz) {
    for (const q of lesson.quiz) {
      parts.push(q.q, ...q.options.map((o) => `${o.label} ${o.explain}`))
    }
  }
  return stripMd(parts.join(' '))
}

const STATIC_PAGES: Omit<SearchDoc, 'haystack' | 'titleLc'>[] = [
  {
    id: 'page:lernpfad',
    type: 'seite',
    title: 'Lernpfad',
    desc: 'Alle Lektionen in der empfohlenen Reihenfolge, von Level 1 bis Level 5.',
    url: '/lernpfad',
    keywords: ['übersicht', 'kurs', 'reihenfolge', 'level', 'alle lektionen'],
    weight: 1.1,
  },
  {
    id: 'page:schnellstart',
    type: 'seite',
    title: 'Claude in 15 Minuten',
    desc: 'Der Schnellstart: in sieben Schritten zu den ersten echten Ergebnissen.',
    url: '/schnellstart',
    keywords: ['schnellstart', 'quickstart', '15 minuten', 'sofort', 'einstieg', 'anfangen'],
    weight: 1.2,
  },
  {
    id: 'page:prompts',
    type: 'seite',
    title: 'Prompt-Bibliothek',
    desc: 'Fertige Prompts zum Kopieren und Anpassen – nach Thema sortiert.',
    url: '/prompts',
    keywords: ['prompts', 'vorlagen', 'kopieren', 'bibliothek', 'sammlung'],
    weight: 1.1,
  },
  {
    id: 'page:verbessern',
    type: 'seite',
    title: 'Prompt verbessern',
    desc: 'Eigenen Prompt einfügen und eine strukturierte Fassung mit Erklärung erhalten.',
    url: '/prompt-verbessern',
    keywords: ['prompt verbessern', 'optimieren', 'besser', 'werkzeug', 'tool'],
    weight: 1.2,
  },
  {
    id: 'page:uebungen',
    type: 'übung',
    title: 'Übungen & Quiz',
    desc: 'Alle interaktiven Übungen und Wissenstests an einem Ort.',
    url: '/uebungen',
    keywords: ['übung', 'quiz', 'test', 'aufgaben', 'praxis', 'wissenstest'],
    weight: 1.1,
  },
  {
    id: 'page:glossar',
    type: 'seite',
    title: 'Glossar',
    desc: 'Alle Fachbegriffe einfach erklärt, mit Beispielen.',
    url: '/glossar',
    keywords: ['begriffe', 'lexikon', 'wörterbuch', 'erklärung', 'fachbegriff'],
    weight: 1,
  },
  {
    id: 'page:plan',
    type: 'seite',
    title: '30-Tage-Lernplan',
    desc: 'Claude in 30 Tagen lernen – 5 bis 15 Minuten pro Tag.',
    url: '/30-tage',
    keywords: ['30 tage', 'plan', 'täglich', 'routine', 'kurs'],
    weight: 1.1,
  },
  {
    id: 'page:fortschritt',
    type: 'seite',
    title: 'Fortschritt',
    desc: 'Dein Lernstand, Quiz-Ergebnisse und abgeschlossene Lektionen.',
    url: '/fortschritt',
    keywords: ['fortschritt', 'statistik', 'stand', 'erledigt'],
    weight: 1,
  },
  {
    id: 'page:favoriten',
    type: 'seite',
    title: 'Meine Favoriten',
    desc: 'Gespeicherte Lektionen und Prompts.',
    url: '/favoriten',
    keywords: ['favoriten', 'gespeichert', 'merkliste', 'lesezeichen'],
    weight: 1,
  },
]

function build(lessons: Lesson[]): SearchDoc[] {
  const docs: SearchDoc[] = []

  for (const lesson of lessons) {
    const track = TRACKS.find((t) => t.id === lesson.track)
    const keywords = [...(lesson.keywords ?? []), track?.title ?? ''].map((k) => k.toLowerCase())
    docs.push({
      id: `lesson:${lesson.slug}`,
      type: 'lektion',
      title: lesson.title,
      desc: lesson.description,
      url: `/lektion/${lesson.slug}`,
      haystack: `${lesson.title} ${keywords.join(' ')} ${lessonText(lesson)}`.toLowerCase(),
      titleLc: lesson.title.toLowerCase(),
      keywords,
      weight: 1.3,
    })
  }

  for (const p of PROMPTS) {
    docs.push({
      id: `prompt:${p.id}`,
      type: 'prompt',
      title: p.name,
      desc: p.purpose,
      url: `/prompts#${p.id}`,
      haystack: stripMd(
        `${p.name} ${p.purpose} ${p.when} ${p.prompt} ${p.howToAdapt.join(' ')}`
      ).toLowerCase(),
      titleLc: p.name.toLowerCase(),
      keywords: [p.category],
      weight: 1.15,
    })
  }

  for (const g of GLOSSARY) {
    docs.push({
      id: `glossar:${g.term}`,
      type: 'glossar',
      title: g.term,
      desc: g.short,
      url: `/glossar#${slugifyTerm(g.term)}`,
      haystack: stripMd(
        `${g.term} ${g.short} ${g.simple} ${g.example ?? ''} ${(g.seeAlso ?? []).join(' ')}`
      ).toLowerCase(),
      titleLc: g.term.toLowerCase(),
      keywords: (g.seeAlso ?? []).map((s) => s.toLowerCase()),
      weight: 1.2,
    })
  }

  for (const page of STATIC_PAGES) {
    docs.push({
      ...page,
      haystack: `${page.title} ${page.desc} ${page.keywords.join(' ')}`.toLowerCase(),
      titleLc: page.title.toLowerCase(),
    })
  }

  QUICKSTART.forEach((step, i) => {
    docs.push({
      id: `quickstart:${i}`,
      type: 'seite',
      title: `Schnellstart: ${step.title}`,
      desc: stripMd(step.md).slice(0, 140),
      url: `/schnellstart#schritt-${i + 1}`,
      haystack: stripMd(`${step.title} ${step.md} ${step.prompt ?? ''}`).toLowerCase(),
      titleLc: step.title.toLowerCase(),
      keywords: ['schnellstart'],
      weight: 0.9,
    })
  })

  PLAN_30.forEach((day) => {
    docs.push({
      id: `plan:${day.day}`,
      type: 'seite',
      title: `Tag ${day.day}: ${day.title}`,
      desc: stripMd(day.focus),
      url: `/30-tage#tag-${day.day}`,
      haystack: stripMd(`${day.title} ${day.focus} ${day.task}`).toLowerCase(),
      titleLc: day.title.toLowerCase(),
      keywords: ['30 tage', 'lernplan'],
      weight: 0.8,
    })
  })

  return docs
}

/** Lädt alle Inhalte und baut daraus den Index. */
export async function buildIndex(): Promise<SearchDoc[]> {
  const lessons = await loadAllLessons()
  return build(lessons)
}
