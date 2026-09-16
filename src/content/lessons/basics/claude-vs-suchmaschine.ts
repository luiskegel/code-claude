import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'claude-vs-suchmaschine',
  track: 'basics',
  title: 'Claude vs. Suchmaschine',
  description:
    'Google findet Seiten. Claude erledigt Aufgaben. Wann du was benutzt – und warum der Unterschied deine Ergebnisse verändert.',
  minutes: 5,
  keywords: ['google', 'suche', 'unterschied', 'recherche', 'quellen', 'vergleich'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Eine Suchmaschine gibt dir **Links**. Claude gibt dir ein **Ergebnis**.',
        },
        {
          type: 'table',
          head: ['', 'Suchmaschine', 'Claude'],
          rows: [
            ['Du bekommst', 'eine Liste von Seiten', 'eine fertige Antwort oder einen fertigen Text'],
            ['Du gibst ein', 'Stichworte', 'ganze Sätze mit Kontext'],
            ['Gut für', 'aktuelle Fakten, Preise, Öffnungszeiten', 'schreiben, erklären, umformulieren, strukturieren'],
            ['Arbeit danach', 'lesen, auswählen, selbst schreiben', 'prüfen und anpassen'],
            ['Quellen', 'immer sichtbar', 'nur wenn Claude aktiv im Web sucht'],
          ],
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Einfach',
              md: 'Suchmaschine = Bibliothekskatalog. Claude = Kollege, der dir das Ergebnis direkt aufschreibt.',
            },
            {
              label: 'Ganz einfach',
              md: 'Du suchst etwas → Suchmaschine. Du willst etwas fertig haben → Claude.',
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
          md: 'Wer Claude wie eine Suchmaschine benutzt, bekommt enttäuschende Ergebnisse – und umgekehrt genauso.',
        },
        {
          type: 'compare',
          badTitle: 'Claude wie eine Suchmaschine benutzt',
          badMd: '`bestes crm 2026`\n\nDas sind Stichworte. Claude hat keinen Kontext: Für welche Firma? Welches Budget? Wie viele Leute?',
          goodTitle: 'Claude wie einen Kollegen benutzt',
          goodMd:
            '`Wir sind ein 8-Personen-Handwerksbetrieb und suchen ein CRM. Wichtig: einfache Bedienung, Angebote schreiben, Terminplanung. Stell mir 5 Fragen, die ich vor der Auswahl klären sollte, und erkläre, worauf es bei jeder Frage ankommt.`',
          why: 'Der zweite Prompt nutzt genau das, was eine Suchmaschine nicht kann: **auf deine Lage eingehen**.',
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
              title: 'Frag dich: Brauche ich eine Quelle oder ein Ergebnis?',
              md: 'Quelle (Preis, Datum, Gesetzestext, Öffnungszeit) → Suchmaschine oder offizielle Seite. Ergebnis (Text, Erklärung, Struktur, Plan) → Claude.',
            },
            {
              title: 'Bei aktuellen Fakten: Claude im Web suchen lassen',
              md: 'In der Claude-App kannst du die Websuche nutzen. Dann nennt Claude Quellen, die du anklicken kannst. Ohne Websuche antwortet Claude aus dem Trainingswissen – und das hat einen Stichtag.',
            },
            {
              title: 'Beides kombinieren',
              md: 'Suchmaschine für die Fakten, Claude fürs Verstehen und Aufschreiben. Das ist der schnellste Weg: Text hineinkopieren und sagen *"Erkläre mir das in einfacher Sprache"*.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Wichtig zu wissen',
          md: 'Ohne aktive Websuche kennt Claude **keine tagesaktuellen Informationen**. Preise, Nachrichten, Kurse, neue Produktversionen: immer gegenprüfen.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Versicherungsbedingungen verstehen',
          example: {
            task: 'Du willst wissen, ob dein Fahrradschaden abgedeckt ist.',
            bad: 'Bei Google nach "Fahrrad Versicherung Schaden abgedeckt" suchen und 20 Werbeseiten durchklicken.',
            good: 'Die relevante Seite deiner Bedingungen kopieren und Claude geben:\n\n`Hier sind die Bedingungen meiner Hausratversicherung. Frage: Ist ein im Keller gestohlenes Fahrrad abgedeckt? Zitiere die Stellen, auf die du dich stützt, und sag mir klar, wenn die Bedingungen die Frage nicht eindeutig beantworten.`',
            why: 'Du lieferst die **Quelle** selbst. Claude muss nichts erfinden, sondern nur lesen und einordnen – genau seine Stärke.',
            result:
              'Du bekommst eine Antwort mit Zitaten aus deinem eigenen Dokument statt einer allgemeinen Internet-Auskunft.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Text verstehen statt googeln',
          prompt: `Ich füge dir gleich einen Text ein, den ich nicht ganz verstehe.

Aufgabe:
1. Fasse den Kern in 3 Sätzen zusammen.
2. Erkläre die 3 schwierigsten Begriffe in einfacher Sprache.
3. Sag mir, welche Frage der Text NICHT beantwortet.

Text:
[HIER TEXT EINFÜGEN]`,
          note: 'Punkt 3 ist der wertvollste Teil: Er zeigt dir die Lücke, die du noch selbst recherchieren musst.',
        },
      ],
    },
  ],
  mistakes: [
    'Claude Stichworte geben statt ganzer Sätze – dann fehlt genau der Kontext, der ihn stark macht.',
    'Tagesaktuelle Zahlen ohne Websuche abfragen und ungeprüft übernehmen.',
    'Nach Quellen fragen, ohne die Websuche zu aktivieren. Ohne Suche kann Claude Links nur aus dem Gedächtnis nennen – und die können falsch sein.',
    'Claude für etwas nutzen, wofür ein Blick auf die offizielle Seite schneller wäre.',
  ],
  proTip:
    'Wenn du eine Antwort mit Quellen brauchst, sag es explizit: *"Nutze die Websuche und gib mir zu jeder Aussage den Link."* So merkst du sofort, ob eine Aussage belegt ist oder nicht.',
  task: {
    md: 'Nimm eine Frage, die du diese Woche gegoogelt hast. Entscheide: Wäre Claude besser gewesen – oder die Suchmaschine? Schreibe in einem Satz auf, warum.',
    solution:
      'Faustregel zum Abgleichen: Ging es um eine **Tatsache mit Stichtag** (Preis, Termin, Version)? → Suchmaschine. Ging es darum, etwas **zu verstehen, zu formulieren oder zu ordnen**? → Claude.',
  },
  exercise: {
    scenario: 'Du brauchst den aktuellen Mehrwertsteuersatz für eine Rechnung.',
    question: 'Was ist der sichere Weg?',
    options: [
      {
        label: 'Claude fragen und die Zahl direkt in die Rechnung übernehmen',
        correct: false,
        explain:
          'Riskant. Steuersätze können sich ändern, und ohne Websuche antwortet Claude aus dem Trainingswissen.',
      },
      {
        label: 'Auf einer offiziellen Seite nachsehen – und Claude die Rechnung formulieren lassen',
        correct: true,
        explain:
          'Genau die richtige Arbeitsteilung: **Fakt** aus der offiziellen Quelle, **Formulierung** von Claude.',
      },
      {
        label: 'Claude fragen, ob er sich sicher ist',
        correct: false,
        explain:
          'Eine Selbsteinschätzung ist kein Beleg. Bei rechtlich relevanten Zahlen brauchst du eine echte Quelle.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wann ist eine Suchmaschine die bessere Wahl?',
      options: [
        {
          label: 'Wenn du eine tagesaktuelle Tatsache mit Beleg brauchst',
          correct: true,
          explain: 'Richtig – Preise, Termine, Gesetzesstände, Öffnungszeiten.',
        },
        {
          label: 'Wenn du einen Text umformulieren willst',
          correct: false,
          explain: 'Das ist eine klassische Claude-Aufgabe.',
        },
        {
          label: 'Wenn du ein Thema erklärt bekommen willst',
          correct: false,
          explain: 'Claude kann die Erklärung auf dein Vorwissen zuschneiden – eine Suchmaschine nicht.',
        },
      ],
    },
    {
      q: 'Was passiert, wenn du Claude nur Stichworte gibst?',
      options: [
        {
          label: 'Er antwortet genauso gut wie mit ganzen Sätzen',
          correct: false,
          explain: 'Meistens nicht – ihm fehlt der Kontext, um die Antwort auf dich zuzuschneiden.',
        },
        {
          label: 'Er muss raten und liefert eine allgemeine Antwort',
          correct: true,
          explain:
            'Genau. Je weniger du sagst, desto durchschnittlicher wird die Antwort.',
        },
        {
          label: 'Er fragt immer automatisch nach',
          correct: false,
          explain:
            'Manchmal fragt er nach, oft antwortet er aber einfach. Verlass dich nicht darauf – gib den Kontext gleich mit.',
        },
      ],
    },
    {
      q: 'Was ist der sicherste Weg zu einer belegten Aussage?',
      options: [
        {
          label: 'Claude ohne Websuche nach Quellen fragen',
          correct: false,
          explain: 'Aus dem Gedächtnis genannte Links können falsch sein. Immer prüfen.',
        },
        {
          label: 'Die Websuche nutzen oder die Quelle selbst mitgeben',
          correct: true,
          explain:
            'Beides funktioniert: Claude sucht live – oder du fügst das Dokument direkt in den Chat ein.',
        },
        {
          label: 'Mehrfach dieselbe Frage stellen',
          correct: false,
          explain: 'Eine wiederholte Antwort ist keine geprüfte Antwort.',
        },
      ],
    },
  ],
  related: ['was-ist-claude', 'was-kann-claude-nicht', 'recherche'],
}
