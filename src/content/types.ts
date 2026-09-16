/**
 * Datenmodell der Lerninhalte.
 *
 * Grundidee: Inhalt und Darstellung sind getrennt. Lektionen sind reine Daten
 * (Objekte in `src/content/lessons/...`), die Komponenten in `src/components`
 * wissen, wie ein Block gerendert wird. Neue Lektionen ergänzt man, indem man
 * eine Datei anlegt und sie in `src/content/index.ts` registriert.
 */

/** Sehr kleine Markdown-Teilmenge, die der Renderer versteht:
 *  **fett**, *kursiv*, `code`, [Text](/pfad) und Zeilenumbrüche. */
export type Markdown = string

export type TrackId =
  | 'basics'
  | 'prompting'
  | 'work'
  | 'files'
  | 'projects'
  | 'claude-code'
  | 'advanced'

export interface Track {
  id: TrackId
  title: string
  /** Kurzer Satz für Übersichtskarten. */
  tagline: string
  /** Welches Level im Lernpfad: 1 = Start … 5 = Profi. */
  level: number
  levelLabel: string
  icon: string
}

/* ------------------------------------------------------------------ Blöcke */

export interface StepItem {
  title: string
  md: Markdown
}

export interface SimpleLevel {
  /** z. B. "Fachlich", "Einfach", "Ganz einfach" */
  label: string
  md: Markdown
}

export interface WorkedExample {
  task: Markdown
  bad: Markdown
  good: Markdown
  why: Markdown
  result: Markdown
}

export type Block =
  | { type: 'text'; md: Markdown }
  | { type: 'lead'; md: Markdown }
  | {
      type: 'callout'
      variant: 'info' | 'tip' | 'warn' | 'danger' | 'success'
      title?: string
      md: Markdown
    }
  | { type: 'list'; ordered?: boolean; items: Markdown[] }
  | { type: 'steps'; items: StepItem[] }
  | { type: 'table'; head: string[]; rows: Markdown[][]; caption?: string }
  | {
      type: 'prompt'
      title?: string
      prompt: string
      /** Erklärung unter dem Prompt: "So passt du ihn an". */
      note?: Markdown
    }
  | { type: 'code'; lang: CodeLang; code: string; caption?: string }
  | {
      type: 'compare'
      badTitle?: string
      badMd: Markdown
      goodTitle?: string
      goodMd: Markdown
      why: Markdown
    }
  /** "Noch einfacher erklären" – dieselbe Sache in mehreren Schwierigkeitsstufen. */
  | { type: 'simple'; levels: SimpleLevel[] }
  /** "Beispiel anzeigen" – ausklappbares, vollständiges Beispiel. */
  | { type: 'example'; title?: string; example: WorkedExample }
  /** "Mehr erfahren" – Details, die Anfänger zunächst nicht brauchen. */
  | { type: 'accordion'; title: string; blocks: Block[] }
  | { type: 'quote'; md: Markdown; source?: string }
  /** Kleine Quellenangabe, z. B. "Anthropic / Claude Dokumentation". */
  | { type: 'source'; md: Markdown }

export type CodeLang = 'bash' | 'json' | 'ts' | 'python' | 'text' | 'markdown'

/* ------------------------------------------------- Übungen, Quiz, Aufgaben */

export interface ChoiceOption {
  label: Markdown
  correct: boolean
  /** Erklärung, die nach der Auswahl erscheint – auch bei falschen Optionen. */
  explain: Markdown
}

export interface Exercise {
  question: Markdown
  /** Situationsbeschreibung über der Frage. */
  scenario?: Markdown
  options: ChoiceOption[]
}

export interface QuizQuestion {
  q: Markdown
  options: ChoiceOption[]
}

export interface MiniTask {
  md: Markdown
  /** Musterlösung – aufklappbar, damit man erst selbst denkt. */
  solution?: Markdown
}

/* ------------------------------------------------------------- Abschnitte */

export type SectionKind =
  | 'what' // Was ist das?
  | 'why' // Wofür brauche ich das?
  | 'how' // So funktioniert es
  | 'example' // Beispiel
  | 'try' // Direkt ausprobieren
  | 'mistakes' // Häufige Fehler
  | 'pro' // Profi-Tipp
  | 'task' // Mini-Aufgabe
  | 'quiz' // Verstanden?
  | 'extra' // freie Zusatzabschnitte

export interface Section {
  kind: SectionKind
  /** Überschrift überschreiben; sonst Standardtitel der Art. */
  title?: string
  blocks: Block[]
}

/* --------------------------------------------------------------- Lektion */

export interface Lesson {
  slug: string
  track: TrackId
  title: string
  /** Meta-Description und Kartentext. */
  description: string
  /** Geschätzte Lesezeit in Minuten. */
  minutes: number
  /** Suchbegriffe, die nicht wörtlich im Text stehen. */
  keywords?: string[]
  sections: Section[]
  mistakes?: Markdown[]
  proTip?: Markdown
  task?: MiniTask
  exercise?: Exercise
  quiz?: QuizQuestion[]
  /** Slugs verwandter Lektionen. */
  related?: string[]
}

/**
 * Leichtgewichtige Kopfdaten einer Lektion – alles, was Navigation, Startseite
 * und Lernpfad brauchen. Wird aus den Lektionsdateien erzeugt
 * (`npm run gen:meta`), damit der Inhalt selbst erst beim Öffnen geladen wird.
 */
export type LessonMeta = Pick<
  Lesson,
  'slug' | 'track' | 'title' | 'description' | 'minutes' | 'keywords'
>

/* -------------------------------------------------- Bibliothek & Glossar */

export interface PromptEntry {
  id: string
  name: string
  /** Zweck – ein Satz. */
  purpose: string
  /** Wann verwenden? */
  when: Markdown
  prompt: string
  /** So passt du ihn an. */
  howToAdapt: Markdown[]
  category: PromptCategory
  level: 'anfänger' | 'fortgeschritten' | 'profi'
  /** Passende Lektion. */
  lesson?: string
}

export type PromptCategory =
  | 'grundlagen'
  | 'schreiben'
  | 'analysieren'
  | 'lernen'
  | 'arbeit'
  | 'planung'
  | 'code'

export interface GlossaryEntry {
  term: string
  short: string
  simple: Markdown
  example?: Markdown
  seeAlso?: string[]
  lesson?: string
}

/* ------------------------------------------------------------ Lernpläne */

export interface QuickstartStep {
  title: string
  minutes: number
  md: Markdown
  prompt?: string
  lesson?: string
}

export interface PlanDay {
  day: number
  title: string
  minutes: number
  focus: Markdown
  task: Markdown
  lesson?: string
}
