import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'lange-aufgaben',
  track: 'projects',
  title: 'Längere Aufgaben bewältigen',
  description:
    'Große Vorhaben in Etappen zerlegen, Zwischenstände sichern und verhindern, dass ein langes Gespräch abdriftet.',
  minutes: 7,
  keywords: ['groß', 'lang', 'zerlegen', 'etappen', 'übergabe', 'zwischenstand', 'abdriften'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Große Aufgaben scheitern fast nie an der Schwierigkeit, sondern an **fehlender Zerlegung** und **verlorenem Zwischenstand**.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Zerlegen', md: 'Die Aufgabe in Etappen aufteilen, die je für sich abgeschlossen werden können.' },
            { title: 'Reihenfolge festlegen', md: 'Was baut worauf auf? Womit fängt man an?' },
            { title: 'Etappe für Etappe abarbeiten', md: 'Pro Etappe ein eigener Abschnitt im Gespräch – oder ein eigenes Gespräch.' },
            { title: 'Zwischenstand sichern', md: 'Nach jeder Etappe: „Fasse zusammen, was jetzt feststeht."' },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'warn',
          title: 'Warum lange Gespräche abdriften',
          md: 'Je länger ein Gespräch, desto mehr Material steht darin. Frühe Vorgaben konkurrieren dann mit allem, was seitdem geschrieben wurde. Das Ergebnis: Regeln aus Nachricht 3 werden in Nachricht 60 unschärfer befolgt.',
        },
        {
          type: 'text',
          md: 'Die Lösung ist nicht, weniger zu besprechen – sondern **Zwischenstände zu verdichten** und mit einer sauberen Übergabe neu zu starten.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Schritt 1 – Aufgabe zerlegen lassen',
          prompt: `Ich habe ein größeres Vorhaben: [BESCHREIBUNG]

Ziel: [WAS SOLL AM ENDE FERTIG SEIN?]
Rahmen: [ZEIT, PERSONEN, MITTEL]

Aufgabe – noch nichts umsetzen:
1. Zerlege das Vorhaben in Etappen, die je für sich abschließbar sind.
2. Sag zu jeder Etappe: Was ist das konkrete Ergebnis? Woran erkenne ich, dass sie fertig ist?
3. Welche Etappe hängt von welcher ab?
4. Womit sollte ich anfangen und warum?
5. Welche Etappe wird erfahrungsgemäß unterschätzt?

Format: Tabelle plus kurze Begründung zu Punkt 4 und 5.`,
          note: 'Punkt 2 („Woran erkenne ich, dass sie fertig ist?") ist der wichtigste – ohne Abschlusskriterium zieht sich jede Etappe endlos.',
        },
        {
          type: 'prompt',
          title: 'Zwischenstand sichern',
          prompt: `Wir haben Etappe [X] abgeschlossen. Sichere den Stand.

Fasse zusammen:
1. Was ist jetzt festgelegt und gilt als entschieden?
2. Welche Regeln und Vorgaben gelten weiterhin?
3. Was ist das Ergebnis dieser Etappe?
4. Was ist noch offen?
5. Was ist der nächste Schritt?

Format: kompakt genug, dass ich es als Startpunkt in ein neues Gespräch kopieren kann.
Keine Nacherzählung des Gesprächsverlaufs.`,
          note: 'Diese Zusammenfassung ist dein „Speicherstand". Sie ersetzt das gesamte bisherige Gespräch – ohne dessen Ballast.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wann neu starten?',
          blocks: [
            {
              type: 'list',
              items: [
                '**Wenn frühe Regeln nicht mehr befolgt werden** und eine kurze Erinnerung nicht hilft.',
                '**Wenn eine Etappe abgeschlossen ist** und die nächste ein anderes Thema hat.',
                '**Wenn das Gespräch in eine Sackgasse geraten ist** – dreimal korrigiert, derselbe Fehler.',
                '**Wenn du andere Personen einbeziehst**, die den Verlauf nicht brauchen, nur den Stand.',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              md: 'Nie ohne Übergabe neu starten. Der Speicherstand-Prompt oben dauert 20 Sekunden und rettet die gesamte Vorarbeit.',
            },
          ],
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Neue Website-Texte für 12 Seiten',
          example: {
            task: 'Alle Texte einer Firmenwebsite sollen neu geschrieben werden.',
            bad: '`Schreib mir die Texte für unsere Website.`\n→ Seite 1 wird gut, Seite 8 wird beliebig, und der Ton stimmt nirgends durchgehend.',
            good: `**Etappe 1 – Fundament:** Zielgruppe, Tonfall, Kernbotschaften, verbotene Begriffe festlegen. → Speicherstand sichern.

**Etappe 2 – Struktur:** Für jede der 12 Seiten festlegen: Zweck, Zielgruppe, gewünschte Handlung. → Speicherstand sichern.

**Etappe 3 – Texte:** Pro Seite ein Prompt, jeweils mit dem Speicherstand als Kontext.

**Etappe 4 – Abgleich:** Alle Texte zusammen prüfen auf Wiederholungen, uneinheitliche Begriffe und Brüche im Ton.`,
            why: 'Etappe 1 und 2 sind reine Vorarbeit – und genau deshalb funktioniert Etappe 3 auch noch bei Seite 12 gleich gut.',
            result:
              'Zwölf Texte, die zusammenpassen. Etappe 4 findet trotzdem noch drei bis fünf Unstimmigkeiten – die dann schnell behoben sind.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Abdriften korrigieren',
          prompt: `Kurze Zwischenkontrolle.

Nenne mir:
1. Welche Regeln und Vorgaben gelten in diesem Gespräch aktuell?
2. Welche davon hast du in deiner letzten Antwort nicht vollständig eingehalten?
3. Was ist die ursprüngliche Aufgabe – in einem Satz?

Danach: Wiederhole deine letzte Antwort, diesmal unter Einhaltung aller Vorgaben.`,
          note: 'Punkt 2 ist überraschend wirksam: Claude erkennt eigene Abweichungen zuverlässig, wenn man ausdrücklich danach fragt.',
        },
      ],
    },
  ],
  mistakes: [
    'Eine große Aufgabe als einen einzigen Prompt formulieren.',
    'Keine Abschlusskriterien je Etappe festlegen – dann wird nichts richtig fertig.',
    'Ohne Übergabe neu starten und die gesamte Vorarbeit verlieren.',
    'Im selben Gespräch 150 Nachrichten sammeln und sich über nachlassende Qualität wundern.',
  ],
  proTip:
    'Leg dir für große Vorhaben eine Datei mit dem aktuellen Speicherstand an. Bei jedem neuen Gespräch fügst du sie oben ein. Das ist die einfachste Form von Projektgedächtnis – und funktioniert überall.',
  task: {
    md: 'Nimm ein größeres Vorhaben und lass es in Etappen zerlegen – inklusive Abschlusskriterien. Arbeite die erste Etappe ab und sichere den Speicherstand. Starte die zweite Etappe in einem **neuen** Gespräch, nur mit dem Speicherstand.',
    solution:
      'Wenn die zweite Etappe im neuen Gespräch gut funktioniert, war dein Speicherstand vollständig. Falls nicht: Meist fehlen die **Regeln** (Punkt 2) – Ergebnisse allein reichen als Übergabe nicht.',
  },
  exercise: {
    scenario:
      'Nach 60 Nachrichten hält Claude eine Formatvorgabe aus Nachricht 4 nicht mehr ein.',
    question: 'Was ist der beste nächste Schritt?',
    options: [
      {
        label: 'Sich ärgern und die Aufgabe abbrechen',
        correct: false,
        explain: 'Das Problem ist normal und leicht zu beheben.',
      },
      {
        label: 'Vorgabe kurz wiederholen – und wenn das nicht reicht, Speicherstand sichern und neu starten',
        correct: true,
        explain:
          'Genau die richtige Reihenfolge: erst die billige Lösung, dann die gründliche.',
      },
      {
        label: 'Ohne Übergabe einen neuen Chat öffnen',
        correct: false,
        explain: 'Dann verlierst du alle Festlegungen aus 60 Nachrichten.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist das wichtigste Merkmal einer guten Etappe?',
      options: [
        {
          label: 'Ein klares Abschlusskriterium',
          correct: true,
          explain: 'Ohne „woran erkenne ich, dass es fertig ist" zieht sich jede Etappe endlos.',
        },
        { label: 'Möglichst kurze Dauer', correct: false, explain: 'Nicht entscheidend.' },
        { label: 'Möglichst viele Teilschritte', correct: false, explain: 'Menge ist kein Qualitätsmerkmal.' },
      ],
    },
    {
      q: 'Was gehört in einen Speicherstand?',
      options: [
        { label: 'Der komplette Gesprächsverlauf', correct: false, explain: 'Genau der Ballast, den du loswerden willst.' },
        {
          label: 'Festlegungen, geltende Regeln, Ergebnis, Offenes, nächster Schritt',
          correct: true,
          explain: 'Fünf Punkte, die das ganze Gespräch ersetzen.',
        },
        { label: 'Nur das Ergebnis', correct: false, explain: 'Dann gehen die Regeln verloren.' },
      ],
    },
    {
      q: 'Warum lässt die Qualität in sehr langen Gesprächen nach?',
      options: [
        { label: 'Claude wird müde', correct: false, explain: 'Kein zutreffendes Bild.' },
        {
          label: 'Frühe Vorgaben konkurrieren mit sehr viel späterem Material',
          correct: true,
          explain: 'Deshalb hilft Verdichten und Neustarten.',
        },
        { label: 'Die Internetverbindung', correct: false, explain: 'Hat damit nichts zu tun.' },
      ],
    },
  ],
  related: ['planung', 'projekte-wissenskontext', 'komplexe-prompts'],
}
