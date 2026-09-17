/**
 * Wandelt Lerninhalte in Text zum Vorlesen um.
 *
 * Bewusst getrennt vom Suchindex: Die Suche will alles flach und vollständig,
 * die Sprachausgabe will lesbare Sätze in sinnvoller Reihenfolge. Code wird
 * nur angekündigt, Zeichen wie Pfeile und Haken fliegen raus – vorgelesen
 * ergeben sie keinen Sinn.
 */
// Mit Dateiendung, damit dieses Modul auch direkt in Node läuft – die
// Inhaltsprüfung testet den Vorlesetext ohne Browser.
import { FENCE_RE, stripMd } from './text.ts'
import type { Block, Lesson, Section, SectionKind } from '../content/types'

const SECTION_TITLE: Record<SectionKind, string> = {
  what: 'Was ist das?',
  why: 'Wofür brauche ich das?',
  how: 'So funktioniert es',
  example: 'Beispiel',
  try: 'Direkt ausprobieren',
  mistakes: 'Häufige Fehler',
  pro: 'Profi-Tipp',
  task: 'Mini-Aufgabe',
  quiz: 'Verstanden?',
  extra: 'Mehr dazu',
}

/** Entfernt Auszeichnung und Zeichen, die gesprochen nur stören. */
function clean(input: string | undefined): string {
  if (!input) return ''
  return stripMd(
    // Befehle und Code vorzulesen hilft niemandem – nur ankündigen.
    input.replace(FENCE_RE, ' Codebeispiel. ')
  )
    .replace(/[[\]]/g, '') // Platzhalter-Klammern
    .replace(/[→←↑↓✓✗✦⚠ℹ•▶◐◑◒◓◔◕]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Hängt einen Punkt an, damit die Stimme eine Pause macht. */
function sentence(input: string): string {
  const text = input.trim()
  if (!text) return ''
  return /[.!?:]$/.test(text) ? text : text + '.'
}

function blockSpeech(block: Block): string[] {
  switch (block.type) {
    case 'lead':
    case 'text':
      return [clean(block.md)]

    case 'callout':
      return [sentence(clean(block.title)), clean(block.md)]

    case 'list':
      return block.items.map((item) => sentence(clean(item)))

    case 'steps':
      return block.items.map(
        (item, i) => `${i + 1}. ${sentence(clean(item.title))} ${clean(item.md)}`
      )

    case 'table': {
      const heads = block.head.map(clean)
      const rows = block.rows.map((row) =>
        row
          .map((cell, i) => {
            const value = clean(cell)
            if (!value) return ''
            return heads[i] ? `${heads[i]}: ${value}` : value
          })
          .filter(Boolean)
          .join(', ')
      )
      return ['Tabelle.', ...rows.map(sentence)]
    }

    case 'prompt':
      return [
        sentence(clean(block.title) || 'Prompt zum Kopieren'),
        clean(block.prompt),
        clean(block.note),
      ]

    case 'code':
      // Code vorzulesen hilft niemandem – nur ankündigen.
      return [sentence(`Codebeispiel${block.caption ? ': ' + clean(block.caption) : ''}`)]

    case 'compare':
      return [
        sentence(clean(block.badTitle) || 'Schlechter Ansatz'),
        clean(block.badMd),
        sentence(clean(block.goodTitle) || 'Besserer Ansatz'),
        clean(block.goodMd),
        'Warum?',
        clean(block.why),
      ]

    case 'simple':
      // Nur die Stufe, die auf der Seite zuerst sichtbar ist.
      return [sentence(clean(block.levels[0]?.label)), clean(block.levels[0]?.md)]

    case 'example':
      return [
        sentence(clean(block.title) || 'Beispiel'),
        'Aufgabe:',
        clean(block.example.task),
        'Schlechter Ansatz:',
        clean(block.example.bad),
        'Besserer Ansatz:',
        clean(block.example.good),
        'Warum:',
        clean(block.example.why),
        'Ergebnis:',
        clean(block.example.result),
      ]

    case 'accordion':
      return [sentence(clean(block.title)), ...block.blocks.flatMap(blockSpeech)]

    case 'quote':
      return [clean(block.md), block.source ? sentence(`Quelle: ${clean(block.source)}`) : '']

    case 'source':
      return [sentence(`Quelle: ${clean(block.md)}`)]

    default:
      return []
  }
}

function join(parts: string[]): string {
  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Ein Abschnitt einer Lektion. */
export function sectionSpeech(section: Section): string {
  const title = section.title ?? SECTION_TITLE[section.kind]
  return join([sentence(clean(title)), ...section.blocks.flatMap(blockSpeech)])
}

/**
 * Die ganze Lektion. Übung und Quiz bleiben außen vor – die sind zum
 * Mitmachen da, und vorgelesene Antwortmöglichkeiten verraten die Lösung.
 */
export function lessonSpeech(lesson: Lesson): string {
  const parts: string[] = [sentence(clean(lesson.title)), clean(lesson.description)]

  for (const section of lesson.sections) parts.push(sectionSpeech(section))

  if (lesson.mistakes?.length) {
    parts.push('Häufige Fehler.')
    parts.push(...lesson.mistakes.map((m, i) => `${i + 1}. ${sentence(clean(m))}`))
  }

  if (lesson.proTip) {
    parts.push('Profi-Tipp.', clean(lesson.proTip))
  }

  if (lesson.task) {
    parts.push('Mini-Aufgabe.', clean(lesson.task.md))
  }

  return join(parts)
}

/** Ein Glossareintrag. */
export function glossarySpeech(term: string, short: string, simple: string, example?: string): string {
  return join([
    sentence(clean(term)),
    sentence(clean(short)),
    clean(simple),
    example ? sentence(`Beispiel: ${clean(example)}`) : '',
  ])
}
