import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'erster-prompt',
  track: 'basics',
  title: 'Wie schreibe ich meinen ersten Prompt?',
  description:
    'Die einfachste Prompt-Formel für Anfänger: Aufgabe + Kontext + Format. In drei Minuten anwendbar.',
  minutes: 6,
  keywords: ['prompt', 'schreiben', 'formel', 'anfang', 'erste schritte', 'aufgabe'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein Prompt ist einfach deine Anweisung. Du brauchst keine Spezialsprache – nur drei Bausteine.',
        },
        {
          type: 'table',
          head: ['Baustein', 'Frage, die er beantwortet', 'Beispiel'],
          rows: [
            ['**Aufgabe**', 'Was soll Claude tun?', '„Formuliere diese E-Mail freundlicher."'],
            ['**Kontext**', 'Was muss Claude dafür wissen?', '„Empfänger ist ein Kunde, der sich beschwert hat."'],
            ['**Format**', 'Wie soll das Ergebnis aussehen?', '„Maximal 8 Sätze, Sie-Form, sachlicher Ton."'],
          ],
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Einfach',
              md: 'Sag, **was** du willst, **worum es geht** und **wie** das Ergebnis aussehen soll.',
            },
            {
              label: 'Ganz einfach',
              md: 'Aufgabe + Kontext + Format. Mehr braucht dein erster Prompt nicht.',
            },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Ohne diese drei Bausteine muss Claude raten – und das Ergebnis ist dann eine Durchschnittsantwort, die auf niemanden richtig passt.',
        },
        {
          type: 'compare',
          badTitle: 'Nur Aufgabe',
          badMd: '`Schreib einen Text über unsere neue Öffnungszeit.`\n\nErgebnis: irgendein Text, irgendeine Länge, irgendein Ton.',
          goodTitle: 'Aufgabe + Kontext + Format',
          goodMd:
            '`Schreib einen kurzen Aushang über unsere neue Öffnungszeit.\n\nKontext: Bäckerei, ab 1. Oktober öffnen wir samstags erst um 8 statt 7 Uhr. Stammkunden sollen nicht verärgert sein.\n\nFormat: maximal 60 Wörter, freundlich, gut lesbar aus 2 Metern Entfernung.`',
          why: 'Der zweite Prompt ist nicht komplizierter – er ist nur vollständiger. Das Ergebnis kannst du direkt ausdrucken.',
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
              title: 'Schreib die Aufgabe als ganzen Satz',
              md: 'Beginne mit einem Verb: *Schreibe…*, *Fasse zusammen…*, *Erkläre…*, *Vergleiche…*, *Prüfe…*.',
            },
            {
              title: 'Ergänze zwei bis drei Sätze Kontext',
              md: 'Wer ist beteiligt? Was ist vorgefallen? Was ist das Ziel? Was darf auf keinen Fall passieren?',
            },
            {
              title: 'Sag, wie das Ergebnis aussehen soll',
              md: 'Länge, Ton, Sprache, Form (Liste, Tabelle, Fließtext, E-Mail).',
            },
            {
              title: 'Senden – und dann nachschärfen',
              md: 'Der erste Prompt muss nicht perfekt sein. Er muss nur gut genug sein, um eine brauchbare erste Fassung zu bekommen.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Merksatz',
          md: 'Schreib deinen Prompt so, wie du eine Aufgabe an einen **neuen Kollegen** übergeben würdest, der fachlich fit ist, aber deine Firma nicht kennt.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Die Terminabsage',
          example: {
            task: 'Du musst einen Termin mit einem wichtigen Kunden kurzfristig absagen.',
            bad: '`Termin absagen Mail`',
            good: '`Schreib eine E-Mail, in der ich einen Termin absage.\n\nKontext: Kunde seit 4 Jahren, Termin ist morgen früh, ich bin krank. Ich möchte diese Woche noch einen Ersatztermin anbieten.\n\nFormat: Sie-Form, maximal 7 Sätze, entschuldigend aber nicht unterwürfig, mit konkretem Ersatzvorschlag.`',
            why: 'Der Kontext („seit 4 Jahren", „morgen früh", „krank") bestimmt Ton und Dringlichkeit. Das Format verhindert einen überlangen Text.',
            result:
              'Eine versandfertige E-Mail. Du musst nur noch Datum und Uhrzeit für den Ersatztermin einsetzen.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Die Grundformel zum Ausfüllen',
          prompt: `Aufgabe:
[WAS SOLL CLAUDE TUN?]

Kontext:
[WAS MUSS CLAUDE WISSEN? 2-3 SÄTZE]

Format:
[LÄNGE, TON, ZIELGRUPPE, FORM]`,
          note: 'Diese Vorlage funktioniert für fast jede Alltagsaufgabe. Kopiere sie und fülle die drei Blöcke aus – mehr braucht es zum Start nicht.',
        },
        {
          type: 'prompt',
          title: 'Sofort einsetzbar: Text professioneller machen',
          prompt: `Aufgabe:
Formuliere den folgenden Text professioneller, ohne den Inhalt zu verändern.

Kontext:
Der Text geht an [EMPFÄNGER]. Die Beziehung ist [FREUNDLICH / FORMELL / ANGESPANNT].

Format:
Maximal [ANZAHL] Sätze, [SIE-FORM / DU-FORM], sachlicher Ton.
Gib mir zusätzlich eine zweite, kürzere Variante.

Text:
[DEIN TEXT]`,
          note: 'Die „zweite, kürzere Variante" ist ein kleiner Trick: Du bekommst zwei Optionen statt einer – und wählst die passende aus.',
        },
      ],
    },
  ],
  mistakes: [
    'Nur ein Stichwort schreiben ("Bewerbung") und eine fertige Bewerbung erwarten.',
    'Das Format vergessen – und dann einen dreiseitigen Text bekommen, obwohl drei Sätze gereicht hätten.',
    'Zu viele Aufgaben in einen Prompt packen. Lieber nacheinander.',
    'Höflichkeitsfloskeln für Qualität halten. "Bitte" macht die Antwort nicht besser – Kontext schon.',
  ],
  proTip:
    'Schreib immer dazu, **was nicht passieren soll**: *"Keine Floskeln", "kein Marketing-Sprech", "nichts erfinden, was nicht im Text steht"*. Negativ-Anweisungen wirken oft stärker als Positiv-Anweisungen.',
  task: {
    md: 'Nimm eine echte Nachricht, die du heute schreiben musst. Baue dafür einen Prompt nach der Formel **Aufgabe + Kontext + Format**. Achte darauf, dass dein Kontext mindestens zwei Sätze hat.',
    solution: `Prüf deinen Prompt an diesen drei Fragen:

1. Steht am Anfang ein **Verb** (schreibe, fasse zusammen, prüfe)?
2. Würde ein fremder Mensch aus deinem Kontext verstehen, worum es geht?
3. Hast du **Länge und Ton** genannt?

Drei Mal ja = guter erster Prompt.`,
  },
  exercise: {
    scenario:
      'Du möchtest, dass Claude eine E-Mail professioneller formuliert.',
    question: 'Was sollte dein Prompt enthalten?',
    options: [
      {
        label: 'Nur: „Schreib diese E-Mail besser."',
        correct: false,
        explain:
          '„Besser" ist nicht definiert. Kürzer? Höflicher? Bestimmter? Claude muss raten – und rät oft in die falsche Richtung.',
      },
      {
        label: 'Ziel + Kontext + gewünschter Ton + den Originaltext',
        correct: true,
        explain:
          'Genau. Das ist die Formel dieser Lektion, ergänzt um das Wichtigste: **den Originaltext**. Ohne ihn kann Claude nichts umformulieren.',
      },
      {
        label: 'Nur den Namen des Empfängers',
        correct: false,
        explain:
          'Der Name allein sagt nichts über Anliegen, Ton oder Beziehung. Kontext heißt: die Situation beschreiben.',
      },
    ],
  },
  quiz: [
    {
      q: 'Aus welchen drei Bausteinen besteht die Grundformel?',
      options: [
        {
          label: 'Aufgabe, Kontext, Format',
          correct: true,
          explain: 'Genau – und in dieser Reihenfolge lässt sie sich am leichtesten schreiben.',
        },
        {
          label: 'Begrüßung, Frage, Dank',
          correct: false,
          explain: 'Höflichkeit ist nett, aber verbessert das Ergebnis nicht.',
        },
        {
          label: 'Thema, Länge, Datum',
          correct: false,
          explain: 'Länge gehört zum Format, aber Kontext fehlt hier komplett.',
        },
      ],
    },
    {
      q: 'Was solltest du tun, wenn die erste Antwort nicht passt?',
      options: [
        {
          label: 'Den Chat schließen und neu starten',
          correct: false,
          explain: 'Dann geht der gesamte aufgebaute Kontext verloren.',
        },
        {
          label: 'Konkret sagen, was fehlt, und nachschärfen',
          correct: true,
          explain:
            'Nachschärfen im selben Chat ist fast immer schneller und besser als ein Neustart.',
        },
        {
          label: 'Den Prompt höflicher formulieren',
          correct: false,
          explain: 'Höflichkeit ändert das Ergebnis nicht. Präzision schon.',
        },
      ],
    },
    {
      q: 'Womit sollte deine Aufgabe idealerweise beginnen?',
      options: [
        {
          label: 'Mit einem Verb',
          correct: true,
          explain: 'Schreibe…, Fasse zusammen…, Prüfe… – das macht die Aufgabe eindeutig.',
        },
        {
          label: 'Mit einer Begrüßung',
          correct: false,
          explain: 'Kostet nur Platz.',
        },
        {
          label: 'Mit deinem Namen',
          correct: false,
          explain: 'Interessiert für die Aufgabe nicht.',
        },
      ],
    },
  ],
  related: ['bessere-antworten', 'gute-prompts', 'kontext-geben'],
}
