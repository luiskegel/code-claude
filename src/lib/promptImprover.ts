/**
 * "Prompt verbessern" – Lernsimulation.
 *
 * Diese Funktion ruft **kein** Modell auf. Sie arbeitet mit denselben Regeln,
 * die in den Lektionen erklärt werden, und macht sichtbar, was einem Prompt
 * fehlt. Genau darum geht es beim Lernen: die Lücke selbst zu erkennen.
 *
 * Die Schnittstelle `PromptImprover` ist bewusst asynchron, damit später eine
 * echte API-Anbindung eingehängt werden kann, ohne die Oberfläche zu ändern:
 *
 *   const improver: PromptImprover = apiKeyVorhanden ? apiImprover : localImprover
 */

export type Goal = 'text' | 'analyse' | 'lernen' | 'ideen' | 'plan' | 'code' | 'allgemein'

export interface ImproveOptions {
  goal: Goal
  audience?: string
  /** Ton/Stil, falls bekannt. */
  tone?: string
  /** Rolle ergänzen? */
  withRole: boolean
  /** Anti-Halluzinations-Regeln anhängen? */
  withGuards: boolean
}

export interface Finding {
  /** Kurzer Name der Lücke. */
  title: string
  /** Was das im Ergebnis bewirkt. */
  effect: string
  /** Was ergänzt wurde. */
  fix: string
  /** Passende Lektion. */
  lesson?: string
  severity: 'hoch' | 'mittel' | 'niedrig'
}

export interface ImproveResult {
  original: string
  improved: string
  findings: Finding[]
  /** Was bereits gut war. */
  strengths: string[]
}

export interface PromptImprover {
  (input: string, options: ImproveOptions): Promise<ImproveResult>
}

/* ----------------------------------------------------------- Heuristik */

const VERBS = [
  'schreib',
  'erstell',
  'fass',
  'erklär',
  'analysier',
  'prüf',
  'vergleich',
  'formulier',
  'plan',
  'entwirf',
  'übersetz',
  'bewert',
  'strukturier',
  'korrigier',
  'kürz',
  'nenne',
  'liste',
  'gib',
  'zeig',
  'finde',
  'sortier',
  'ordne',
  'beschreib',
]

const FORMAT_HINTS = [
  'maximal',
  'höchstens',
  'sätze',
  'wörter',
  'stichpunkte',
  'tabelle',
  'liste',
  'absätze',
  'format',
  'zeichen',
  'seiten',
  'punkte',
  'spalten',
]

const AUDIENCE_HINTS = [
  'zielgruppe',
  'für kunden',
  'für einsteiger',
  'für anfänger',
  'für mein',
  'für meine',
  'für unser',
  'leser',
  'empfänger',
  'chef',
  'kollegen',
  'vorstand',
  'team',
]

const CONTEXT_HINTS = [
  'kontext',
  'hintergrund',
  'situation',
  'wir sind',
  'ich bin',
  'unser',
  'unsere',
  'es geht um',
  'bisher',
  'weil',
  'nachdem',
  'seit',
]

const CONSTRAINT_HINTS = [
  'keine',
  'kein ',
  'nicht ',
  'vermeide',
  'ohne ',
  'darf nicht',
  'verzichte',
]

const GOAL_HINTS = ['ziel', 'damit', 'um zu', 'ich brauche das', 'wofür', 'zweck']

const FILLER = ['bitte', 'danke', 'könntest du', 'kannst du', 'wärst du so nett', 'hallo']

const GOAL_LABEL: Record<Goal, string> = {
  text: 'Text schreiben oder umformulieren',
  analyse: 'Etwas analysieren oder prüfen',
  lernen: 'Etwas erklärt bekommen oder lernen',
  ideen: 'Ideen sammeln',
  plan: 'Etwas planen',
  code: 'Programmieren oder Fehler suchen',
  allgemein: 'Allgemein',
}

const GOAL_REQUIREMENTS: Record<Goal, string[]> = {
  text: [
    'Ton: sachlich, keine Werbesprache',
    'Keine Floskeln wie „gerne", „selbstverständlich", „wir freuen uns"',
    'Keine Einleitungssätze, die nichts sagen',
  ],
  analyse: [
    'Zitiere zu jeder Aussage die Stelle aus dem Material',
    'Trenne klar: Fakten aus dem Text / deine Einschätzung',
    'Nenne am Ende die 3 Punkte, die ich als Erstes klären sollte',
  ],
  lernen: [
    'Erkläre in einfacher Sprache, ohne unerklärte Fachbegriffe',
    'Nutze ein Alltagsbeispiel',
    'Nenne am Ende den häufigsten Denkfehler bei diesem Thema',
  ],
  ideen: [
    'Erst sammeln, noch nicht bewerten',
    'Mische naheliegende und ungewöhnliche Vorschläge',
    'Keine Wiederholungen in anderen Worten',
  ],
  plan: [
    'Nenne Abhängigkeiten zwischen den Schritten',
    'Liste alle Annahmen auf, die du triffst',
    'Nenne die Schritte, die man typischerweise vergisst',
  ],
  code: [
    'Erkläre jede Änderung in einfacher Sprache',
    'Zeig mir zuerst den Plan, ändere noch nichts',
    'Warne mich bei allem, was Daten löscht oder überschreibt',
  ],
  allgemein: ['Bleib konkret', 'Keine Füllsätze'],
}

const GOAL_FORMAT: Record<Goal, string> = {
  text: 'Maximal [ANZAHL] Sätze. Gib mir zusätzlich 3 Varianten für den ersten Satz.',
  analyse: 'Tabelle oder Stichpunkte, maximal [ANZAHL] Punkte. Keine Einleitung.',
  lernen: 'Erst 3 Sätze für Einsteiger, dann ein Beispiel, dann die fachliche Fassung.',
  ideen: '[ANZAHL] Ideen, je maximal 1 Satz, durchnummeriert.',
  plan: 'Tabelle: Schritt | Beschreibung | Wer | Dauer | Hängt ab von',
  code: 'Erst der Plan als Stichpunkte, dann die Umsetzung.',
  allgemein: 'Maximal [ANZAHL] Sätze, Stichpunkte wo sinnvoll.',
}

const GUARDS = `Wichtig:
- Stütze dich nur auf das mitgelieferte Material.
- Wenn etwas nicht darin steht, sag es ausdrücklich, statt zu schätzen.
- Kennzeichne Vermutungen als Vermutung.
- Wenn dir Wesentliches fehlt, frag nach, statt Annahmen zu treffen.`

const ROLE_BY_GOAL: Record<Goal, string> = {
  text: 'eine erfahrene Lektorin, die sachlich und ohne Floskeln schreibt',
  analyse: 'ein gründlicher Prüfer, der Lücken und Widersprüche findet',
  lernen: 'eine Lehrerin, die komplexe Themen für Einsteiger verständlich macht',
  ideen: 'ein Moderator, der auch unbequeme und ungewöhnliche Ideen einbringt',
  plan: 'eine erfahrene Projektleiterin, die Abhängigkeiten und Risiken kennt',
  code: 'ein erfahrener Entwickler, der Anfängern alles verständlich erklärt',
  allgemein: '[ROLLE – z. B. erfahrene Fachkraft in deinem Bereich]',
}

function has(text: string, hints: string[]): boolean {
  return hints.some((h) => text.includes(h))
}

/* -------------------------------------------------------------- Analyse */

export function analyze(input: string, options: ImproveOptions): ImproveResult {
  const raw = input.trim()
  const lc = raw.toLowerCase()
  const words = raw.split(/\s+/).filter(Boolean)

  const findings: Finding[] = []
  const strengths: string[] = []

  const hasVerb = VERBS.some((v) => lc.includes(v))
  const hasFormat = has(lc, FORMAT_HINTS)
  const hasAudience = has(lc, AUDIENCE_HINTS) || Boolean(options.audience)
  const hasContext = has(lc, CONTEXT_HINTS) || words.length > 35
  const hasConstraints = has(lc, CONSTRAINT_HINTS)
  const hasGoal = has(lc, GOAL_HINTS)
  const hasFiller = FILLER.some((f) => lc.includes(f))
  const isKeywordy = words.length <= 4

  if (isKeywordy) {
    findings.push({
      title: 'Stichworte statt Auftrag',
      effect:
        'Mit wenigen Stichworten muss Claude raten, was du willst. Das Ergebnis wird eine Durchschnittsantwort, die auf niemanden richtig passt.',
      fix: 'Aus deinen Stichworten wurde ein Auftragssatz mit Verb gemacht.',
      lesson: 'claude-vs-suchmaschine',
      severity: 'hoch',
    })
  } else if (!hasVerb) {
    findings.push({
      title: 'Kein klares Aufgaben-Verb',
      effect:
        'Ohne Verb ist unklar, was passieren soll: erklären, zusammenfassen, umschreiben oder bewerten?',
      fix: 'Die Aufgabe beginnt jetzt mit einem eindeutigen Verb.',
      lesson: 'rollen-und-aufgaben',
      severity: 'hoch',
    })
  } else {
    strengths.push('Deine Aufgabe enthält bereits ein klares Verb – das ist die halbe Miete.')
  }

  if (!hasGoal) {
    findings.push({
      title: 'Zweck fehlt',
      effect:
        'Ohne „wofür brauche ich das?" wird nach Reihenfolge gekürzt statt nach Relevanz. Das ist die wirkungsvollste einzelne Angabe überhaupt.',
      fix: 'Ein Feld „Ziel" wurde ergänzt – trag dort ein, wozu du das Ergebnis brauchst.',
      lesson: 'zusammenfassungen',
      severity: 'hoch',
    })
  } else {
    strengths.push('Du nennst bereits einen Zweck – dadurch kann Claude gewichten.')
  }

  if (!hasContext) {
    findings.push({
      title: 'Kontext fehlt',
      effect:
        'Ohne Hintergrund bleibt die Antwort austauschbar. Sie könnte für jede Firma und jede Situation geschrieben sein.',
      fix: 'Ein Kontext-Block mit den fünf wichtigen Fragen wurde ergänzt.',
      lesson: 'kontext-geben',
      severity: 'hoch',
    })
  } else {
    strengths.push('Du lieferst bereits Kontext – das ist der stärkste Hebel für gute Antworten.')
  }

  if (!hasFormat) {
    findings.push({
      title: 'Format und Länge fehlen',
      effect:
        'Ohne Obergrenze wird die Antwort fast immer länger, als du brauchst – und hat nicht die Form, die du weiterverwenden kannst.',
      fix: 'Ein Format-Block mit passender Struktur für dein Ziel wurde ergänzt.',
      lesson: 'ergebnisse-strukturieren',
      severity: 'hoch',
    })
  } else {
    strengths.push('Du gibst bereits ein Format oder eine Länge vor.')
  }

  if (!hasAudience) {
    findings.push({
      title: 'Zielgruppe fehlt',
      effect:
        'Das Sprachniveau passt dann oft nicht: entweder zu fachlich oder zu einfach für die Menschen, die es lesen.',
      fix: 'Ein Zielgruppen-Feld wurde ergänzt.',
      lesson: 'gute-prompts',
      severity: 'mittel',
    })
  }

  if (!hasConstraints) {
    findings.push({
      title: 'Keine Negativ-Regeln',
      effect:
        'Typische Floskeln und Werbesprache bleiben drin. Negativ-Regeln wirken oft stärker als Positiv-Anweisungen.',
      fix: 'Passende „Nicht verwenden"-Regeln für dein Ziel wurden ergänzt.',
      lesson: 'texte-erstellen',
      severity: 'mittel',
    })
  } else {
    strengths.push('Du sagst bereits, was **nicht** passieren soll – das wirkt stark.')
  }

  if (hasFiller) {
    findings.push({
      title: 'Höflichkeitsfloskeln',
      effect:
        '„Bitte", „könntest du" und ähnliche Formeln verbessern das Ergebnis nicht. Sie kosten nur Platz.',
      fix: 'Der Auftrag ist jetzt direkt formuliert. (Höflich bleiben darfst du natürlich trotzdem.)',
      lesson: 'erster-prompt',
      severity: 'niedrig',
    })
  }

  if (words.length > 250) {
    findings.push({
      title: 'Sehr langer Prompt',
      effect:
        'Bei sehr langen Aufträgen gehen einzelne Vorgaben unter. Klare Blöcke mit Überschriften helfen mehr als Fließtext.',
      fix: 'Der Inhalt wurde in benannte Blöcke gegliedert.',
      lesson: 'komplexe-prompts',
      severity: 'niedrig',
    })
  }

  return {
    original: raw,
    improved: buildImproved(raw, options, { isKeywordy, hasVerb }),
    findings,
    strengths,
  }
}

function buildImproved(
  raw: string,
  options: ImproveOptions,
  flags: { isKeywordy: boolean; hasVerb: boolean }
): string {
  const { goal } = options
  const parts: string[] = []

  if (options.withRole) {
    parts.push(`Du bist ${ROLE_BY_GOAL[goal]}.`, '')
  }

  const task = flags.isKeywordy || !flags.hasVerb ? taskFromKeywords(raw, goal) : raw

  parts.push('Aufgabe:', task, '')

  parts.push('Ziel:', '[WOFÜR BRAUCHE ICH DAS ERGEBNIS?]', '')

  parts.push(
    'Kontext:',
    '- Beteiligte: [WER?]',
    '- Vorgeschichte: [WAS IST BISHER PASSIERT?]',
    '- Was schon feststeht: [VORGABEN, ZAHLEN, MATERIAL]',
    ''
  )

  parts.push('Anforderungen:')
  for (const req of GOAL_REQUIREMENTS[goal]) parts.push(`- ${req}`)
  parts.push('- [WAS AUF KEINEN FALL PASSIEREN DARF]')
  parts.push('')

  parts.push('Format:', GOAL_FORMAT[goal], '')

  parts.push('Zielgruppe:', options.audience?.trim() || '[WER LIEST DAS, MIT WELCHEM VORWISSEN?]')

  if (options.tone?.trim()) {
    parts.push('', 'Ton:', options.tone.trim())
  }

  if (options.withGuards) {
    parts.push('', GUARDS)
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

function taskFromKeywords(raw: string, goal: Goal): string {
  const topic = raw.replace(/\s+/g, ' ').trim() || '[THEMA]'
  switch (goal) {
    case 'text':
      return `Schreib einen Text zum Thema: ${topic}`
    case 'analyse':
      return `Analysiere Folgendes: ${topic}`
    case 'lernen':
      return `Erkläre mir: ${topic}`
    case 'ideen':
      return `Sammle Ideen zu: ${topic}`
    case 'plan':
      return `Erstelle einen Plan für: ${topic}`
    case 'code':
      return `Hilf mir bei folgender technischer Aufgabe: ${topic}`
    default:
      return `Bearbeite folgende Aufgabe: ${topic}`
  }
}

/** Lokale Umsetzung der Schnittstelle – asynchron, damit eine API sie später ersetzen kann. */
export const localImprover: PromptImprover = async (input, options) => analyze(input, options)

export const GOAL_OPTIONS: { value: Goal; label: string }[] = (
  Object.keys(GOAL_LABEL) as Goal[]
).map((value) => ({ value, label: GOAL_LABEL[value] }))
