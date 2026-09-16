import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'ergebnisse-strukturieren',
  track: 'prompting',
  title: 'Ergebnisse strukturieren',
  description:
    'Tabelle, Liste, Fließtext oder Vorlage? Wie du das Ausgabeformat festlegst und damit Nacharbeit sparst.',
  minutes: 6,
  keywords: ['format', 'tabelle', 'liste', 'struktur', 'ausgabe', 'vorlage', 'json'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Das **Format** entscheidet, ob du das Ergebnis direkt weiterverwenden kannst – oder erst umbauen musst.',
        },
        {
          type: 'table',
          head: ['Format', 'Wann es passt', 'So forderst du es an'],
          rows: [
            ['**Fließtext**', 'E-Mails, Aushänge, alles zum Lesen', '„Fließtext, maximal 120 Wörter."'],
            ['**Stichpunkte**', 'Zum Überfliegen, für Notizen', '„Maximal 7 Stichpunkte, je eine Zeile."'],
            ['**Tabelle**', 'Vergleiche, Übersichten', '„Tabelle mit Spalten: Option | Vorteil | Nachteil | Kosten."'],
            ['**Nummerierte Schritte**', 'Anleitungen, Abläufe', '„Nummerierte Schritte, jeder Schritt eine Handlung."'],
            ['**Vorlage**', 'Wenn es immer gleich aussehen soll', '„Halte dich exakt an diese Vorlage: …"'],
            ['**Daten (JSON/CSV)**', 'Zum Weiterverarbeiten in Software', '„Nur gültiges JSON, keine Erklärung drumherum."'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Ohne Formatangabe bekommst du fast immer Fließtext mit Zwischenüberschriften. Das ist für vieles okay – aber nicht, wenn du vergleichen, sortieren oder weiterverarbeiten willst.',
        },
        {
          type: 'compare',
          badTitle: 'Ohne Format',
          badMd:
            '`Vergleiche die drei Angebote.`\n\n→ Drei Absätze Fließtext. Zum Vergleichen musst du selbst hin- und herspringen.',
          goodTitle: 'Mit Format',
          goodMd:
            '`Vergleiche die drei Angebote.\n\nFormat: Tabelle mit den Spalten Anbieter | Preis | Lieferzeit | Garantie | Auffälligkeit.\nDanach: 3 Sätze Empfehlung mit Begründung.`',
          why: 'Die Tabelle macht Unterschiede auf einen Blick sichtbar. Die drei Sätze danach geben dir die Entscheidung.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Überleg dir, was du mit dem Ergebnis machst',
              md: 'Lesen? → Fließtext. Vergleichen? → Tabelle. Abarbeiten? → Checkliste. Einfügen in ein System? → Datenformat.',
            },
            {
              title: 'Nenne die Struktur konkret',
              md: 'Nicht „strukturiert", sondern „Tabelle mit diesen vier Spalten".',
            },
            {
              title: 'Begrenze den Umfang',
              md: '„Maximal 7 Punkte", „höchstens 120 Wörter". Ohne Grenze wird es fast immer zu lang.',
            },
            {
              title: 'Gib eine Vorlage vor, wenn es sich wiederholt',
              md: 'Vorlagen sorgen dafür, dass 20 Ergebnisse gleich aussehen – wichtig für Berichte und Protokolle.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Vorlage vorgeben',
          prompt: `Halte dich exakt an diese Vorlage. Keine zusätzlichen Abschnitte, keine Einleitung.

## Kurzfassung
[2 Sätze]

## Wichtigste Punkte
- [Punkt 1]
- [Punkt 2]
- [Punkt 3]

## Offene Fragen
- [Frage 1]

## Nächster Schritt
[1 Satz, mit konkreter Handlung]`,
          note: 'Diese Vorlage funktioniert für Protokolle, Analysen und Zusammenfassungen gleichermaßen. „Keine Einleitung" spart dir jedes Mal drei Zeilen Aufräumen.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wenn Software das Ergebnis weiterverarbeiten soll',
          blocks: [
            {
              type: 'text',
              md: 'Wenn du das Ergebnis in ein Programm einlesen willst, brauchst du ein maschinenlesbares Format – meist JSON. Dann gilt: **Nur die Daten, nichts drumherum.**',
            },
            {
              type: 'code',
              lang: 'text',
              caption: 'Prompt-Zusatz für Datenausgabe',
              code: `Format:
Antworte ausschließlich mit gültigem JSON nach diesem Schema.
Keine Erklärung, kein Text davor oder danach, keine Code-Markierung.

{
  "thema": string,
  "prioritaet": "hoch" | "mittel" | "niedrig",
  "punkte": string[]
}`,
            },
            {
              type: 'callout',
              variant: 'info',
              md: 'Über die API gibt es dafür zusätzlich technische Mittel, die ein gültiges Format erzwingen. Für die Arbeit im Chat reicht die klare Anweisung oben.',
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
          title: 'Beispiel anzeigen: Meeting-Protokoll',
          example: {
            task: 'Aus einem chaotischen Mitschrieb soll ein verwertbares Protokoll werden.',
            bad: '`Mach ein Protokoll aus meinen Notizen.`\n\n→ Ein Fließtext, aus dem niemand die Aufgaben herausliest.',
            good: `\`Erstelle aus meinen Notizen ein Protokoll.

Format (exakt einhalten):

## Entscheidungen
| Entscheidung | Begründung |

## Aufgaben
| Aufgabe | Wer | Bis wann |

## Offene Punkte
- [Punkt]

Regeln:
- Wenn eine Zuständigkeit oder Frist in den Notizen fehlt, schreib "offen" statt zu raten.
- Keine Einleitung, keine Zusammenfassung am Ende.

Notizen:
[DEINE NOTIZEN]\``,
            why: 'Die Regel „schreib offen statt zu raten" ist entscheidend – sonst erfindet jedes Protokoll plausible Fristen, die nie vereinbart wurden.',
            result:
              'Ein Protokoll, das du direkt verschicken kannst, mit klar sichtbaren Lücken statt erfundener Details.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Vergleichstabelle',
          prompt: `Vergleiche die folgenden Optionen.

Format:
Tabelle mit den Spalten: [SPALTE 1] | [SPALTE 2] | [SPALTE 3] | [SPALTE 4]
Eine Zeile pro Option, maximal 12 Wörter pro Zelle.

Danach:
- Klare Empfehlung in 2 Sätzen.
- Eine Bedingung, unter der du anders entscheiden würdest.

Optionen:
[DEINE OPTIONEN]`,
          note: 'Die „Bedingung, unter der ich anders entscheiden würde" ist der nützlichste Teil – sie macht die Empfehlung überprüfbar.',
        },
      ],
    },
  ],
  mistakes: [
    'Format offenlassen und sich über Textwüsten wundern.',
    '"Strukturiert" verlangen, ohne zu sagen, welche Struktur gemeint ist.',
    'Keine Obergrenze nennen – Länge wächst dann fast immer über das Nützliche hinaus.',
    'Bei Datenausgaben vergessen zu sagen, dass wirklich nur die Daten kommen sollen.',
  ],
  proTip:
    'Bei Tabellen: Begrenze die Zellenlänge („maximal 12 Wörter pro Zelle"). Sonst entstehen Tabellen mit Absätzen in den Zellen – und die sind unleserlicher als Fließtext.',
  task: {
    md: 'Nimm eine Aufgabe, deren Ergebnis du bisher immer nachbearbeitet hast. Schreib eine Vorlage dafür und teste sie. Halte fest, wie viel Nacharbeit übrig bleibt.',
    solution:
      'Bei Protokollen, Berichten und Zusammenfassungen sinkt die Nacharbeit mit einer festen Vorlage typischerweise drastisch – vor allem wegen der Regel „fehlende Angaben als *offen* markieren statt raten".',
  },
  exercise: {
    scenario:
      'Du brauchst eine Übersicht über fünf Lieferanten, um im Meeting schnell zu entscheiden.',
    question: 'Welches Format forderst du an?',
    options: [
      {
        label: 'Fließtext mit ausführlicher Beschreibung jedes Lieferanten',
        correct: false,
        explain: 'Zum schnellen Vergleichen im Meeting ungeeignet – du müsstest springen und suchen.',
      },
      {
        label: 'Tabelle mit festen Spalten, danach eine kurze Empfehlung',
        correct: true,
        explain:
          'Die Tabelle macht Unterschiede sichtbar, die Empfehlung gibt die Richtung. Genau das Richtige für eine Entscheidung.',
      },
      {
        label: 'Eine lange Stichpunktliste ohne Struktur',
        correct: false,
        explain: 'Besser als Fließtext, aber Vergleiche zwischen Lieferanten bleiben mühsam.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was bekommst du ohne Formatangabe meistens?',
      options: [
        { label: 'Eine Tabelle', correct: false, explain: 'Nur wenn du danach fragst.' },
        {
          label: 'Fließtext mit Zwischenüberschriften',
          correct: true,
          explain: 'Das ist die Standardform – oft brauchbar, aber selten optimal.',
        },
        { label: 'JSON', correct: false, explain: 'Nur auf ausdrückliche Anforderung.' },
      ],
    },
    {
      q: 'Wie verhinderst du erfundene Angaben in Protokollen?',
      options: [
        {
          label: 'Mit der Regel „fehlende Angaben als offen markieren"',
          correct: true,
          explain: 'Der wichtigste Satz für jedes Protokoll.',
        },
        { label: 'Durch ein kürzeres Format', correct: false, explain: 'Die Länge ändert daran nichts.' },
        { label: 'Gar nicht', correct: false, explain: 'Doch – die Anweisung wirkt sehr zuverlässig.' },
      ],
    },
    {
      q: 'Worauf solltest du bei Tabellen zusätzlich achten?',
      options: [
        { label: 'Auf die Farbe', correct: false, explain: 'Spielt hier keine Rolle.' },
        {
          label: 'Auf eine Begrenzung der Zellenlänge',
          correct: true,
          explain: 'Sonst entstehen Tabellen mit ganzen Absätzen in den Zellen.',
        },
        { label: 'Auf möglichst viele Spalten', correct: false, explain: 'Viele Spalten machen die Tabelle unleserlich.' },
      ],
    },
  ],
  related: ['gute-prompts', 'tabellen-analysieren', 'dokumente-erstellen'],
}
