import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'lernen-mit-claude',
  track: 'work',
  title: 'Lernen mit Claude',
  description:
    'Claude als geduldiger Lehrer: erklären lassen, abgefragt werden, Verständnislücken finden – ohne sich selbst zu belügen.',
  minutes: 6,
  keywords: ['lernen', 'erklären', 'prüfung', 'abfragen', 'verstehen', 'nachhilfe', 'studium'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Der größte Vorteil beim Lernen: Du kannst **beliebig oft** nachfragen, ohne dich zu blamieren. Und du kannst dir dasselbe auf fünf verschiedene Arten erklären lassen.',
        },
        {
          type: 'table',
          head: ['Lernsituation', 'Was du verlangst'],
          rows: [
            ['Neues Thema', '„Erkläre es, als wüsste ich nichts. Mit einem Alltagsbeispiel."'],
            ['Halb verstanden', '„Ich verstehe X, aber nicht Y. Erkläre nur Y."'],
            ['Testen, ob es sitzt', '„Stell mir 10 Fragen und bewerte meine Antworten."'],
            ['Prüfungsvorbereitung', '„Erstelle Prüfungsfragen wie in einer echten Klausur."'],
            ['Tiefer verstehen', '„Was ist der häufigste Denkfehler bei diesem Thema?"'],
            ['Behalten', '„Erstelle mir 15 Karteikarten: Frage – Antwort."'],
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
          title: 'Die Falle beim Lernen mit KI',
          md: 'Eine gute Erklärung zu **lesen** fühlt sich an wie Verstehen – ist es aber nicht. Der Test ist immer: Kannst du es selbst erklären, ohne nachzusehen? Deshalb ist der Abfrage-Modus wichtiger als der Erklär-Modus.',
        },
        {
          type: 'text',
          md: 'Und: Bei Fachinhalten gilt weiterhin die Prüfregel. Für Schule, Ausbildung und Prüfungen bleibt dein Lehrbuch die maßgebliche Quelle – Claude ist der Erklärer daneben.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Erklären lassen – mit Stufen',
          prompt: `Erkläre mir: [THEMA]

Mein Vorwissen: [KEINES / GRUNDLAGEN / FORTGESCHRITTEN]

Erkläre in drei Stufen:
1. In 3 Sätzen, als wüsste ich gar nichts.
2. Mit einem Alltagsbeispiel, das ich mir merken kann.
3. Fachlich korrekt, mit den richtigen Begriffen.

Nenne am Ende den häufigsten Denkfehler bei diesem Thema.`,
          note: 'Die drei Stufen sind entscheidend: Du merkst sofort, ab welcher Stufe du aussteigst – und genau dort hakst du nach.',
        },
        {
          type: 'prompt',
          title: 'Abfragen lassen (der wichtigste Prompt)',
          prompt: `Frag mich zum Thema [THEMA] ab.

Ablauf:
- Stell mir EINE Frage und warte auf meine Antwort.
- Bewerte meine Antwort: richtig / teilweise richtig / falsch.
- Sag mir bei Fehlern genau, was gefehlt hat.
- Steigere die Schwierigkeit, wenn ich richtig liege. Geh zurück, wenn nicht.
- Nach 10 Fragen: Wo sind meine Lücken?

Wichtig:
- Sei ehrlich. Bewerte nicht wohlwollend.
- Gib mir nicht die Antwort, bevor ich geantwortet habe.`,
          note: 'Die letzten beiden Regeln sind essenziell. Ohne sie bekommst du wohlwollende Bewertungen – und lernst nichts.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Erklären lassen', md: 'In Stufen, bis die passende Tiefe erreicht ist.' },
            { title: 'Selbst wiedergeben', md: 'In eigenen Worten aufschreiben und korrigieren lassen.' },
            { title: 'Abgefragt werden', md: 'Mit ehrlicher Bewertung und steigender Schwierigkeit.' },
            { title: 'Lücken gezielt schließen', md: 'Nur die Punkte nacharbeiten, bei denen es gehakt hat.' },
          ],
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Die Feynman-Methode',
          example: {
            task: 'Du willst wirklich sicher sein, dass du ein Thema verstanden hast.',
            bad: 'Die Erklärung dreimal lesen und denken „ja, klar".',
            good: `\`Ich erkläre dir jetzt [THEMA] in meinen eigenen Worten.

Deine Aufgabe:
1. Finde jede Stelle, an der meine Erklärung ungenau, unvollständig oder falsch ist.
2. Frag bei jeder unklaren Stelle nach, wie ein neugieriger Zehnjähriger.
3. Sag mir am Ende, welchen Teil ich offensichtlich noch nicht verstanden habe.

Sei streng. Lass mir nichts durchgehen.

Meine Erklärung:
[DEINE EIGENE ERKLÄRUNG]\``,
            why: 'Wer etwas nicht erklären kann, hat es nicht verstanden. Diese Methode macht genau das sichtbar – schonungslos, aber ohne dass jemand zusieht.',
            result:
              'Du weißt nach fünf Minuten exakt, welche zwei Stellen du noch nicht verstanden hast – statt es in der Prüfung zu merken.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Karteikarten erstellen',
          prompt: `Erstelle mir [ANZAHL] Karteikarten zum Thema [THEMA].

Format pro Karte:
VORDERSEITE: [Frage – kurz und eindeutig]
RÜCKSEITE: [Antwort – maximal 3 Sätze]

Regeln:
- Jede Karte prüft genau eine Sache.
- Keine Ja/Nein-Fragen.
- Mische: 60 % Grundlagen, 30 % Anwendung, 10 % Sonderfälle.
- Keine Karte darf durch reines Raten lösbar sein.`,
          note: 'Die Mischung ist wichtig: Reine Faktenkarten führen zu Auswendiglernen ohne Verständnis.',
        },
      ],
    },
  ],
  mistakes: [
    'Erklärungen lesen und das Gefühl des Verstehens mit echtem Verstehen verwechseln.',
    'Nicht um ehrliche Bewertung bitten – dann werden auch halbrichtige Antworten als richtig durchgewunken.',
    'Fachinhalte für Prüfungen nicht mit dem Lehrbuch abgleichen.',
    'Immer nur erklären lassen, statt sich abfragen zu lassen.',
  ],
  proTip:
    'Nach jeder Erklärung eine einzige Frage stellen: *"Was ist der häufigste Denkfehler bei diesem Thema?"* Die Antwort ist fast immer genau der Punkt, an dem du später gestolpert wärst.',
  task: {
    md: 'Such dir ein Thema, das du „eigentlich verstanden" hast. Erkläre es in eigenen Worten und lass dich streng korrigieren. Danach 10 Fragen abfragen lassen. Notiere ehrlich, wie viele du wirklich konntest.',
    solution:
      'Die meisten liegen bei 6 bis 8 von 10 – bei einem Thema, das sie für verstanden hielten. Genau diese Lücke ist der Grund, warum der Abfrage-Modus dem Lese-Modus überlegen ist.',
  },
  exercise: {
    scenario: 'Du bereitest dich auf eine Prüfung vor.',
    question: 'Was bringt am meisten?',
    options: [
      {
        label: 'Sich das Thema immer wieder erklären lassen',
        correct: false,
        explain:
          'Lesen erzeugt ein Gefühl von Sicherheit, das in der Prüfung nicht trägt.',
      },
      {
        label: 'Sich abfragen lassen – mit ehrlicher Bewertung und steigender Schwierigkeit',
        correct: true,
        explain:
          'Aktives Abrufen ist die wirksamste Lernmethode. Die Ehrlichkeitsregel ist dabei Pflicht.',
      },
      {
        label: 'Eine Zusammenfassung erstellen lassen und auswendig lernen',
        correct: false,
        explain: 'Hilft beim Überblick, aber nicht beim Verstehen und Anwenden.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist der beste Test für echtes Verstehen?',
      options: [
        {
          label: 'Es selbst erklären können, ohne nachzusehen',
          correct: true,
          explain: 'Die Feynman-Methode aus dieser Lektion.',
        },
        { label: 'Die Erklärung dreimal gelesen zu haben', correct: false, explain: 'Erzeugt nur ein Gefühl.' },
        { label: 'Die Zusammenfassung zu kennen', correct: false, explain: 'Oberflächlich.' },
      ],
    },
    {
      q: 'Welche Regel ist beim Abfragen unverzichtbar?',
      options: [
        {
          label: '„Sei ehrlich, bewerte nicht wohlwollend."',
          correct: true,
          explain: 'Ohne sie werden halbrichtige Antworten durchgewunken.',
        },
        { label: '„Stell nur einfache Fragen."', correct: false, explain: 'Verhindert den Lerneffekt.' },
        { label: '„Gib mir die Antwort vorher."', correct: false, explain: 'Dann ist es kein Test.' },
      ],
    },
    {
      q: 'Was gilt für Prüfungsinhalte weiterhin?',
      options: [
        { label: 'Claude ist die maßgebliche Quelle', correct: false, explain: 'Nein.' },
        {
          label: 'Das Lehrbuch bleibt maßgeblich, Claude ist der Erklärer daneben',
          correct: true,
          explain: 'Genau die richtige Arbeitsteilung.',
        },
        { label: 'Quellen spielen beim Lernen keine Rolle', correct: false, explain: 'Doch, gerade bei Prüfungen.' },
      ],
    },
  ],
  related: ['was-kann-claude-nicht', 'folgefragen-stellen', 'zusammenfassungen'],
}
