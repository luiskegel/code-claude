/**
 * Suche über alle Inhalte der Academy.
 *
 * Dieses Modul bleibt bewusst klein: Es enthält nur Typen, die Bewertung der
 * Treffer und die Verwaltung des Index. Der Index selbst wird aus
 * `searchIndex.ts` nachgeladen, sobald die Suche zum ersten Mal geöffnet wird.
 */
export type DocType = 'lektion' | 'prompt' | 'glossar' | 'seite' | 'übung'

export interface SearchDoc {
  id: string
  type: DocType
  title: string
  desc: string
  url: string
  /** Vorberechneter, kleingeschriebener Suchtext. */
  haystack: string
  /** Titel klein – für schnelle Präfix-Treffer. */
  titleLc: string
  keywords: string[]
  /** Grundgewicht des Dokumenttyps. */
  weight: number
}

/** Erzeugt aus einem Begriff eine Anker-taugliche Kennung (z. B. für das Glossar). */
export function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

let INDEX: SearchDoc[] | null = null
let indexPromise: Promise<SearchDoc[]> | null = null

/**
 * Baut den Suchindex. Die Lektionstexte werden dafür nachgeladen – deshalb
 * asynchron. Der Aufbau passiert einmal, beim ersten Öffnen der Suche.
 */
export function loadSearchIndex(): Promise<SearchDoc[]> {
  if (!indexPromise) {
    indexPromise = import('./searchIndex')
      .then((m) => m.buildIndex())
      .then((docs) => {
        INDEX = docs
        return docs
      })
  }
  return indexPromise
}

/** Der bereits aufgebaute Index – leer, solange er noch geladen wird. */
export function getIndex(): SearchDoc[] {
  return INDEX ?? []
}

export function isIndexReady(): boolean {
  return INDEX !== null
}

/* --------------------------------------------------------------- Suche */

export interface SearchHit {
  doc: SearchDoc
  score: number
}

/** Einfache Normalisierung: klein, Umlaute vereinheitlicht. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
}

export function search(query: string, limit = 12): SearchHit[] {
  const q = query.trim()
  if (q.length < 2) return []

  const terms = norm(q).split(/\s+/).filter(Boolean)
  const hits: SearchHit[] = []

  for (const doc of getIndex()) {
    const title = norm(doc.titleLc)
    const hay = norm(doc.haystack)
    const keys = norm(doc.keywords.join(' '))

    let score = 0
    let matchedAll = true

    for (const term of terms) {
      let termScore = 0

      if (title === term) termScore += 120
      else if (title.startsWith(term)) termScore += 70
      else if (title.includes(term)) termScore += 45

      if (keys.includes(term)) termScore += 30

      if (hay.includes(term)) {
        termScore += 12
        // Häufigkeit leicht belohnen, aber gedeckelt.
        const count = hay.split(term).length - 1
        termScore += Math.min(count, 6) * 1.5
      }

      if (termScore === 0) matchedAll = false
      score += termScore
    }

    // Alle Begriffe getroffen → deutlicher Bonus (AND-Verhalten bevorzugt).
    if (matchedAll && terms.length > 1) score *= 1.6
    if (!matchedAll && terms.length > 1) score *= 0.4

    if (score > 0) hits.push({ doc, score: score * doc.weight })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

/** Vorschläge, wenn das Suchfeld noch leer ist. */
export const SEARCH_SUGGESTIONS = [
  'PDF analysieren',
  'bessere Prompts',
  'Claude Code',
  'E-Mail schreiben',
  'Tabelle auswerten',
  'Halluzination',
]
