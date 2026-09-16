import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'folgefragen-stellen',
  track: 'prompting',
  title: 'Folgefragen stellen',
  description:
    'Das Gespräch ist das eigentliche Werkzeug. Sechs Folgefragen, die aus einer okayen Antwort ein gutes Ergebnis machen.',
  minutes: 6,
  keywords: ['nachfragen', 'dialog', 'gespräch', 'vertiefen', 'iteration', 'folgefrage'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Eine Folgefrage ist jede Nachricht nach der ersten. Sie ist billig, schnell – und meistens der Punkt, an dem das Ergebnis wirklich gut wird.',
        },
        {
          type: 'table',
          head: ['Folgefrage', 'Wofür sie gut ist'],
          rows: [
            ['„Was fehlt noch?"', 'Deckt Lücken auf, die du nicht gesehen hast'],
            ['„Was ist der schwächste Punkt?"', 'Findet die Stelle, die Kritik einfangen wird'],
            ['„Zeig mir eine Alternative."', 'Vermeidet, dass du die erste Idee für die beste hältst'],
            ['„Erkläre das einfacher."', 'Wenn du etwas nicht wirklich verstanden hast'],
            ['„Woran machst du das fest?"', 'Prüft, ob eine Aussage belegt oder geraten ist'],
            ['„Was würde ein Kritiker sagen?"', 'Holt die Gegenposition, ohne die Rolle zu wechseln'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die erste Antwort ist immer ein Kompromiss: Claude weiß noch nicht genau, worauf es dir ankommt. Die zweite und dritte Antwort kann das berücksichtigen – wenn du es sagst.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Das Gespräch merkt sich alles',
          md: 'Du musst den Kontext nicht wiederholen. Ein kurzes „Und jetzt dasselbe für Variante B" genügt, weil das ganze bisherige Gespräch mitgelesen wird.',
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
              title: 'Breite vor Tiefe',
              md: 'Erst „Welche Möglichkeiten gibt es?", dann „Vertiefe Möglichkeit 2". So entscheidest du, wo es sich lohnt, in die Tiefe zu gehen.',
            },
            {
              title: 'Eine Frage pro Nachricht',
              md: 'Fünf Fragen auf einmal führen dazu, dass zwei davon oberflächlich beantwortet werden.',
            },
            {
              title: 'Auf Nummern verweisen',
              md: '„Zu Punkt 3: erklär das genauer." Kurz, eindeutig, spart Tipparbeit.',
            },
            {
              title: 'Am Ende zusammenfassen lassen',
              md: 'Nach einem langen Gespräch: „Fasse zusammen, was wir festgelegt haben." Das wird dein Ergebnis – und der Start für das nächste Gespräch.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Der Unterschied zwischen Nachfragen und Nachschärfen',
          blocks: [
            {
              type: 'text',
              md: '**Nachschärfen** verändert das Ergebnis: „kürzer", „sachlicher", „ohne Fachbegriffe".',
            },
            {
              type: 'text',
              md: '**Nachfragen** verändert dein Verständnis: „Warum ist das so?", „Was spricht dagegen?", „Woher weißt du das?".',
            },
            {
              type: 'text',
              md: 'Beides ist nützlich – aber für unterschiedliche Ziele. Wenn du ein Ergebnis brauchst: nachschärfen. Wenn du eine Entscheidung treffen musst: nachfragen.',
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
          title: 'Beispiel anzeigen: Eine Entscheidung vorbereiten',
          example: {
            task: 'Du sollst entscheiden, ob ihr eine Software selbst baut oder kauft.',
            bad: '`Sollen wir die Software selbst bauen oder kaufen?`\n→ Eine ausgewogene, allgemeine Antwort, die dir die Entscheidung nicht abnimmt.',
            good: `**Frage 1:** \`Welche 5 Kriterien entscheiden bei "selbst bauen vs. kaufen" typischerweise? Ohne Bewertung, nur die Kriterien.\`

**Frage 2:** \`Jetzt bewerte unsere Situation anhand dieser Kriterien: [DEINE SITUATION]. Tabelle, pro Kriterium eine Zeile, Einschätzung mit Begründung.\`

**Frage 3:** \`Was spricht am stärksten gegen deine Einschätzung? Welche Annahme müsste falsch sein, damit die andere Option besser wäre?\`

**Frage 4:** \`Fasse zusammen: Empfehlung, die drei wichtigsten Gründe, und was wir prüfen müssen, bevor wir entscheiden.\``,
            why: 'Vier Fragen bauen aufeinander auf: erst der Rahmen, dann die Bewertung, dann die Gegenprobe, dann das Ergebnis.',
            result:
              'Eine Entscheidungsvorlage mit Begründung und Prüfpunkten – statt einer allgemeinen Pro-Contra-Liste.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Die Gegenprobe',
          prompt: `Danke. Jetzt die Gegenprobe:

1. Was spricht am stärksten gegen deine Einschätzung?
2. Welche Annahme müsste falsch sein, damit deine Empfehlung nicht mehr stimmt?
3. Wie könnte ich diese Annahme mit vertretbarem Aufwand prüfen?

Sei ehrlich. Wenn deine Empfehlung auf dünner Grundlage steht, sag es.`,
          note: 'Diese drei Fragen verwandeln jede Empfehlung in eine überprüfbare Entscheidungsgrundlage.',
        },
        {
          type: 'prompt',
          title: 'Gespräch abschließen',
          prompt: `Wir sind hier fertig. Fasse zusammen:

1. Was haben wir festgelegt?
2. Welche Vorgaben und Regeln gelten für die Zukunft?
3. Was ist noch offen?
4. Was ist der nächste konkrete Schritt?

Format: kompakt genug, dass ich es in ein neues Gespräch oder ein Projekt kopieren kann.`,
          note: 'Diese Zusammenfassung ist der beste Startpunkt für das nächste Gespräch zum selben Thema.',
        },
      ],
    },
  ],
  mistakes: [
    'Nach der ersten Antwort aufhören und das Ergebnis für das Maximum halten.',
    'Fünf Fragen in eine Nachricht packen – dann bleiben mehrere oberflächlich.',
    'Den Kontext in jeder Folgefrage wiederholen, obwohl das Gespräch ihn schon kennt.',
    'Kein Abschluss: Nach 30 Nachrichten ist das Ergebnis über den Chat verstreut, statt an einer Stelle zu stehen.',
  ],
  proTip:
    'Gewöhn dir eine feste Schlussfrage an: *"Was habe ich nicht gefragt, das ich hätte fragen sollen?"* Sie deckt erstaunlich oft den Punkt auf, an den du nicht gedacht hast.',
  task: {
    md: 'Führe zu einer echten Frage ein Gespräch mit **mindestens vier Runden**: Breite → Tiefe → Gegenprobe → Zusammenfassung. Vergleiche das Endergebnis mit dem, was du nach der ersten Antwort gehabt hättest.',
    solution:
      'Das typische Ergebnis: Nach der ersten Antwort hättest du eine allgemeine Übersicht gehabt. Nach vier Runden hast du eine begründete Empfehlung mit Prüfpunkten – für ungefähr drei Minuten Mehraufwand.',
  },
  exercise: {
    scenario:
      'Du hast eine Empfehlung von Claude bekommen und willst wissen, wie belastbar sie ist.',
    question: 'Welche Folgefrage bringt am meisten?',
    options: [
      {
        label: '„Bist du sicher?"',
        correct: false,
        explain: 'Führt meist zu einer allgemeinen Bestätigung oder einer reflexhaften Relativierung.',
      },
      {
        label: '„Welche Annahme müsste falsch sein, damit deine Empfehlung nicht mehr stimmt?"',
        correct: true,
        explain:
          'Macht die Grundlage der Empfehlung sichtbar – und zeigt dir genau, was du prüfen musst.',
      },
      {
        label: '„Kannst du das nochmal anders schreiben?"',
        correct: false,
        explain: 'Ändert die Formulierung, nicht die Belastbarkeit.',
      },
    ],
  },
  quiz: [
    {
      q: 'Musst du in Folgefragen den Kontext wiederholen?',
      options: [
        { label: 'Ja, immer', correct: false, explain: 'Nein – das Gespräch wird vollständig mitgelesen.' },
        {
          label: 'Nein – außer bei sehr langen Gesprächen, wo eine kurze Erinnerung hilft',
          correct: true,
          explain: 'Genau die richtige Abwägung.',
        },
        { label: 'Nur bei Dateien', correct: false, explain: 'Auch Dateien bleiben im Kontext.' },
      ],
    },
    {
      q: 'Was ist der Unterschied zwischen Nachschärfen und Nachfragen?',
      options: [
        {
          label: 'Nachschärfen verändert das Ergebnis, Nachfragen dein Verständnis',
          correct: true,
          explain: 'Gute Merkregel für die Wahl der richtigen Folgefrage.',
        },
        { label: 'Es ist dasselbe', correct: false, explain: 'Die Ziele unterscheiden sich deutlich.' },
        { label: 'Nachfragen ist unhöflich', correct: false, explain: 'Im Gegenteil – es ist der wertvollste Teil.' },
      ],
    },
    {
      q: 'Womit solltest du ein langes Gespräch beenden?',
      options: [
        { label: 'Mit einem Dankeschön', correct: false, explain: 'Nett, aber bringt dir nichts.' },
        {
          label: 'Mit einer Zusammenfassung des Festgelegten',
          correct: true,
          explain: 'Sie ist dein Ergebnis und der Startpunkt für das nächste Gespräch.',
        },
        { label: 'Mit einer neuen Frage', correct: false, explain: 'Dann ist es nicht beendet.' },
      ],
    },
  ],
  related: ['bessere-antworten', 'fehler-korrigieren', 'lange-aufgaben'],
}
