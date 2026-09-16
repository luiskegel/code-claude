import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-ordner-und-dateien',
  track: 'claude-code',
  title: 'Ordner, Dateien und Pfade',
  description:
    'Was ein Pfad ist, warum Dateiendungen zählen und welche Ordnerstruktur dir das Leben leichter macht.',
  minutes: 5,
  keywords: ['ordner', 'datei', 'pfad', 'verzeichnis', 'endung', 'struktur'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein **Pfad** ist die Adresse einer Datei. Wie eine Postanschrift: Land, Stadt, Straße, Hausnummer – nur von links nach rechts immer genauer.',
        },
        {
          type: 'code',
          lang: 'text',
          caption: 'Ein Pfad gelesen',
          code: `/Users/maria/Dokumente/website/index.html
└─┬──┘ └─┬─┘ └───┬────┘ └──┬──┘ └────┬────┘
  │      │       │         │         └─ die Datei
  │      │       │         └─ Ordner "website"
  │      │       └─ Ordner "Dokumente"
  │      └─ dein persönlicher Ordner
  └─ oberste Ebene des Computers`,
        },
        {
          type: 'table',
          head: ['Schreibweise', 'Bedeutung'],
          rows: [
            ['`/Users/maria/projekt`', 'Vollständiger Pfad – gilt immer, egal wo du stehst'],
            ['`projekt/datei.txt`', 'Relativer Pfad – ausgehend von deinem aktuellen Ordner'],
            ['`.`', 'Der Ordner, in dem du gerade bist'],
            ['`..`', 'Eine Ebene höher'],
            ['`~`', 'Dein persönlicher Ordner (Mac/Linux)'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Claude Code arbeitet immer in einem **Arbeitsordner**. Alles, was darin liegt, kann er sehen. Was außerhalb liegt, nicht. Deshalb ist die Frage „welcher Ordner?" die erste und wichtigste.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Praktische Folge',
          md: 'Starte Claude Code immer im **kleinstmöglichen sinnvollen Ordner**. Nicht im persönlichen Ordner mit allem darin, sondern im Projektordner. Das ist übersichtlicher, schneller – und sicherer.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Die **Dateiendung** (die Buchstaben nach dem letzten Punkt) sagt, um welche Art von Datei es sich handelt:',
        },
        {
          type: 'table',
          head: ['Endung', 'Was es ist'],
          rows: [
            ['`.txt`', 'Reiner Text ohne Formatierung'],
            ['`.md`', 'Markdown – Text mit einfacher Formatierung, sehr beliebt für Notizen'],
            ['`.csv`', 'Tabelle als Text, mit Kommas getrennt'],
            ['`.html`, `.css`, `.js`', 'Bausteine einer Website'],
            ['`.json`', 'Strukturierte Daten, oft Einstellungen'],
            ['`.py`, `.ts`', 'Programmdateien (Python, TypeScript)'],
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Eine Ordnerstruktur, die sich bewährt',
          blocks: [
            {
              type: 'code',
              lang: 'text',
              caption: 'Ein sauber aufgeräumter Projektordner',
              code: `meine-website/
├── README.md          ← Was ist das hier? Immer zuerst anlegen.
├── index.html         ← Startseite
├── inhalte/           ← Texte
│   ├── ueber-uns.md
│   └── leistungen.md
├── bilder/
└── alt/               ← alte Fassungen, aufgehoben`,
            },
            {
              type: 'list',
              items: [
                '**Ein Ordner pro Projekt.** Nicht alles in „Downloads".',
                '**Immer eine README.md.** Drei Sätze: Was ist das, wofür, was muss man wissen. Claude Code liest sie zuerst.',
                '**Keine Leerzeichen und Umlaute in Dateinamen.** `ueber-uns.md` statt `Über uns.md` – erspart eine ganze Klasse von Problemen.',
                '**Kleinschreibung und Bindestriche.** Einheitlich ist wichtiger als schön.',
              ],
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
          title: 'Beispiel anzeigen: Warum der Arbeitsordner wichtig ist',
          example: {
            task: 'Du bittest Claude Code: „Räum die Textdateien auf."',
            bad: 'Gestartet im persönlichen Ordner. Claude sieht Dokumente, Downloads, Desktop, Steuerunterlagen – tausende Dateien. Was „aufräumen" heißt, ist völlig unklar, und der mögliche Schaden ist groß.',
            good: 'Gestartet in `~/Dokumente/produkttexte`. Dort liegen 60 `.txt`-Dateien. „Aufräumen" ist jetzt eine eindeutige Aufgabe in einem überschaubaren Bereich.',
            why: 'Der Arbeitsordner begrenzt gleichzeitig das Missverständnis **und** den möglichen Schaden.',
            result:
              'Eine klare Aufgabe statt einer riskanten. Dieselbe Anweisung, völlig anderes Risiko.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Ordnerstruktur planen lassen',
          prompt: `Ich möchte einen Projektordner anlegen für: [PROJEKT]

Was darin liegen wird:
- [ART VON DATEIEN 1]
- [ART VON DATEIEN 2]

Aufgabe:
1. Schlage eine Ordnerstruktur vor. Nicht mehr als 2 Ebenen tief.
2. Erkläre zu jedem Ordner in einem Satz, was hineingehört.
3. Schlage Namensregeln für die Dateien vor.
4. Was sollte in die README.md?
5. Was würde man in 6 Monaten bereuen, wenn ich es jetzt falsch anlege?

Halte es einfach. Lieber zu wenig Struktur als zu viel.`,
          note: 'Punkt 5 bringt die praktischsten Hinweise – meistens geht es um Namensgebung und darum, alte Fassungen nicht zu überschreiben.',
        },
      ],
    },
  ],
  mistakes: [
    'Claude Code im persönlichen Ordner starten, statt im Projektordner.',
    'Leerzeichen und Umlaute in Dateinamen verwenden.',
    'Keine README.md anlegen – dann muss sich jeder (auch Claude) den Zweck zusammenreimen.',
    'Alte Fassungen überschreiben statt in einen `alt/`-Ordner zu verschieben.',
  ],
  proTip:
    'Leg in jedem Projektordner als Allererstes eine `README.md` mit drei Sätzen an: Was ist das? Wofür? Was muss man wissen? Claude Code liest sie zuerst und arbeitet dadurch deutlich zielgerichteter.',
  task: {
    md: 'Sieh dir einen echten Projektordner an. Prüfe: Gibt es eine README? Sind die Namen einheitlich? Wäre der Ordner für jemand Fremdes verständlich? Behebe den auffälligsten Punkt.',
    solution:
      'Der häufigste Befund ist die fehlende README – und sie ist gleichzeitig der Punkt mit dem besten Aufwand-Nutzen-Verhältnis. Drei Sätze reichen.',
  },
  exercise: {
    scenario: 'Du willst mit Claude Code an deinen Website-Texten arbeiten.',
    question: 'Wo startest du?',
    options: [
      {
        label: 'Im persönlichen Ordner, dann findet Claude alles',
        correct: false,
        explain:
          'Zu groß. Mehr Missverständnisse, langsamer, und ein Fehler wirkt sich auf viel mehr aus.',
      },
      {
        label: 'Im Projektordner der Website',
        correct: true,
        explain:
          'Kleinstmöglicher sinnvoller Bereich – die Grundregel aus dieser Lektion.',
      },
      {
        label: 'Im Downloads-Ordner',
        correct: false,
        explain: 'Dort liegen die Dateien gar nicht.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist ein relativer Pfad?',
      options: [
        {
          label: 'Ein Pfad, der von deinem aktuellen Ordner ausgeht',
          correct: true,
          explain: 'Zum Beispiel `inhalte/text.md`.',
        },
        { label: 'Ein Pfad, der immer gilt', correct: false, explain: 'Das ist der absolute Pfad.' },
        { label: 'Ein Pfad zu einem Ordner eines Verwandten', correct: false, explain: 'Netter Gedanke, aber nein.' },
      ],
    },
    {
      q: 'Warum keine Leerzeichen in Dateinamen?',
      options: [
        { label: 'Weil es unschön aussieht', correct: false, explain: 'Nicht der Grund.' },
        {
          label: 'Weil sie in Befehlen und Pfaden Probleme machen',
          correct: true,
          explain: 'Bindestriche sind die sichere Alternative.',
        },
        { label: 'Weil Claude sie nicht lesen kann', correct: false, explain: 'Lesen kann er sie schon.' },
      ],
    },
    {
      q: 'Was gehört in jeden Projektordner?',
      options: [
        {
          label: 'Eine README.md mit Zweck und Hinweisen',
          correct: true,
          explain: 'Claude Code liest sie zuerst.',
        },
        { label: 'Eine Kopie aller anderen Projekte', correct: false, explain: 'Bitte nicht.' },
        { label: 'Mindestens 10 Unterordner', correct: false, explain: 'Weniger ist mehr.' },
      ],
    },
  ],
  related: ['cc-terminal', 'cc-projekt', 'cc-starten'],
}
