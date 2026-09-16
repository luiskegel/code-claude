import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'was-ist-claude',
  track: 'basics',
  title: 'Was ist Claude?',
  description:
    'Claude ist ein KI-Assistent, mit dem du in normaler Sprache sprichst. Hier erfährst du in fünf Minuten, was das genau bedeutet.',
  minutes: 6,
  keywords: ['ki', 'assistent', 'anthropic', 'sprachmodell', 'llm', 'einstieg', 'start'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude ist ein KI-Assistent von Anthropic. Du schreibst ihm in ganz normaler Sprache, was du brauchst – und Claude antwortet dir.',
        },
        {
          type: 'text',
          md: 'Du musst dafür **nichts programmieren** und **keine Befehle auswendig lernen**. Wenn du eine E-Mail schreiben kannst, kannst du auch mit Claude arbeiten.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Claude ist ein großes Sprachmodell (engl. *Large Language Model*). Es wurde auf sehr großen Textmengen trainiert und sagt für eine Eingabe Stück für Stück den wahrscheinlichsten nächsten Textbaustein voraus. Daraus entstehen zusammenhängende, kontextbezogene Antworten.',
            },
            {
              label: 'Einfach',
              md: 'Claude hat unglaublich viel Text gelesen und dadurch gelernt, wie Sprache funktioniert. Deshalb versteht er deine Frage und kann sinnvoll darauf antworten – so wie ein sehr belesener Mitarbeiter.',
            },
            {
              label: 'Ganz einfach',
              md: 'Du schreibst etwas. → Claude denkt nach. → Claude antwortet. Fertig.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Ein Bild, das gut passt',
          md: 'Stell dir Claude wie einen **sehr belesenen Kollegen** vor, der sofort Zeit für dich hat. Er kennt extrem viel, aber er kennt **deine Situation nicht** – die musst du ihm erzählen. Genau darum geht es in fast allen Lektionen hier.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Claude nimmt dir vor allem die Arbeit ab, bei der du auf ein leeres Blatt starrst oder dich durch viel Text wühlen musst.',
        },
        {
          type: 'list',
          items: [
            '**Büro:** Eine schnell getippte E-Mail in eine freundliche, professionelle Fassung bringen.',
            '**Schule & Studium:** Ein Thema so lange erklären lassen, bis du es wirklich verstehst.',
            '**Beruf:** Ein 20-seitiges Dokument auf die fünf Punkte zusammenfassen, die dich betreffen.',
            '**Alltag:** Aus einem vagen Vorhaben eine konkrete Schritt-für-Schritt-Planung machen.',
            '**Programmieren:** Eine Fehlermeldung erklären lassen, statt eine Stunde zu suchen.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          md: 'Die ehrlichste Faustregel: Claude ist dann stark, wenn es um **Sprache und Denken** geht – schreiben, erklären, umformulieren, strukturieren, vergleichen, planen.',
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
              title: 'Du schreibst eine Anweisung',
              md: 'Diese Anweisung nennt man **Prompt**. Ein Prompt ist einfach das, was du in das Eingabefeld tippst.',
            },
            {
              title: 'Claude liest alles, was im Gespräch steht',
              md: 'Nicht nur deine letzte Nachricht, sondern das ganze bisherige Gespräch und alle Dateien, die du angehängt hast. Das zusammen heißt **Kontext**.',
            },
            {
              title: 'Claude formuliert eine Antwort',
              md: 'Wort für Wort, passend zu dem, was du geschrieben hast. Deshalb siehst du die Antwort oft tippen, statt sie auf einen Schlag zu bekommen.',
            },
            {
              title: 'Du reagierst darauf',
              md: 'Du sagst, was dir fehlt oder nicht passt – Claude bessert nach. Dieses Hin und Her ist der eigentliche Trick, nicht der perfekte erste Prompt.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Warum antwortet Claude nicht immer gleich?',
          blocks: [
            {
              type: 'text',
              md: 'Claude wählt seine Wörter nicht stur nach einer Tabelle, sondern mit einer gewissen Variation. Dieselbe Frage kann deshalb zweimal leicht unterschiedlich beantwortet werden – inhaltlich meist gleich, sprachlich anders.',
            },
            {
              type: 'text',
              md: 'Für dich heißt das: Wenn dir eine Antwort nicht gefällt, ist "Nochmal, aber kürzer und sachlicher" ein völlig normaler und sehr wirksamer Schritt.',
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
          title: 'Beispiel anzeigen: eine Absage schreiben',
          example: {
            task: 'Du musst einem Anbieter absagen, mit dem du künftig vielleicht noch arbeiten willst.',
            bad: '`Schreib eine Absage.`',
            good: '`Schreib eine kurze, freundliche Absage an einen Anbieter. Wir nehmen ein anderes Angebot, wollen aber die Tür für später offen lassen. Höflich, sachlich, maximal 6 Sätze, Du-Form.`',
            why: 'Der zweite Prompt sagt, **worum es geht**, **welcher Ton** gewünscht ist und **wie lang** die Antwort sein soll. Claude muss nichts mehr raten.',
            result:
              'Statt eines beliebigen Standardtexts bekommst du eine Absage, die du fast unverändert verschicken kannst.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Öffne Claude und kopiere diesen Prompt hinein. Er ist mit Absicht harmlos – es geht nur darum, das erste Mal zu senden.',
        },
        {
          type: 'prompt',
          title: 'Dein allererster Prompt',
          prompt: `Erkläre mir in 5 einfachen Sätzen, was du bist und wobei du mir helfen kannst.
Schreib so, als würdest du es jemandem erklären, der noch nie mit KI gearbeitet hat.
Nenne am Ende 3 konkrete Beispiele aus dem Büroalltag.`,
          note: 'Ändere den letzten Satz auf deinen Bereich: *aus dem Schulalltag*, *aus dem Handwerk*, *aus dem Vertrieb*.',
        },
      ],
    },
  ],
  mistakes: [
    'Zu glauben, man müsse "richtig" mit Claude sprechen. Normale Sätze reichen völlig.',
    'Nach der ersten Antwort aufgeben. Das Nachfassen ist der eigentliche Arbeitsschritt.',
    'Alles auf einmal verlangen ("schreib mir die komplette Website"). Kleine Schritte funktionieren viel besser.',
    'Claude Fragen zu stellen, deren Antwort man selbst nicht überprüfen kann – und das Ergebnis ungeprüft weiterzugeben.',
  ],
  proTip:
    'Sag Claude immer, **für wen** das Ergebnis ist. "Für meinen Chef", "für Kunden ohne Vorkenntnisse", "für mich als Notiz" – dieser eine Zusatz verändert die Antwort mehr als jede andere Einzelmaßnahme.',
  task: {
    md: 'Schreib einen Prompt, der Claude bittet, dir **dein eigenes Arbeitsgebiet** in einfacher Sprache zu erklären – so, als wärst du ein Praktikant am ersten Tag. Achte darauf, dass du die Zielgruppe nennst.',
    solution: `Ein guter Versuch sieht ungefähr so aus:

*"Erkläre mir, was eine Lohnbuchhaltung im Alltag macht. Zielgruppe: Praktikant am ersten Tag, keine Vorkenntnisse. Nutze einfache Sprache, maximal 8 Sätze, und nenne 3 typische Aufgaben."*

Entscheidend sind drei Dinge: **Thema**, **Zielgruppe**, **Umfang**.`,
  },
  exercise: {
    scenario:
      'Du willst, dass Claude dir ein Thema erklärt, von dem du null Ahnung hast.',
    question: 'Welcher Prompt bringt dich am schnellsten weiter?',
    options: [
      {
        label: '„Erkläre mir Buchhaltung."',
        correct: false,
        explain:
          'Nicht falsch, aber Claude weiß nicht, wie viel du schon weißt. Die Antwort wird entweder zu simpel oder zu kompliziert.',
      },
      {
        label:
          '„Erkläre mir Buchhaltung so, als hätte ich noch nie damit zu tun gehabt. Nutze ein Alltagsbeispiel und maximal 10 Sätze."',
        correct: true,
        explain:
          'Genau. Du nennst **Vorwissen**, **Form** (Alltagsbeispiel) und **Umfang**. Claude kann die Antwort dadurch passgenau zuschneiden.',
      },
      {
        label: '„Bist du gut in Buchhaltung?"',
        correct: false,
        explain:
          'Damit bekommst du eine Selbsteinschätzung, aber keine Erklärung. Frag direkt nach dem, was du wirklich brauchst.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist ein Prompt?',
      options: [
        {
          label: 'Ein spezieller Befehlscode, den man auswendig lernen muss',
          correct: false,
          explain: 'Nein – es gibt keine feste Befehlssprache. Du schreibst ganz normal.',
        },
        {
          label: 'Die Anweisung, die du Claude gibst',
          correct: true,
          explain: 'Richtig. Alles, was du in das Eingabefeld schreibst, ist dein Prompt.',
        },
        {
          label: 'Die Antwort von Claude',
          correct: false,
          explain: 'Die Antwort ist das Ergebnis. Der Prompt ist deine Eingabe.',
        },
      ],
    },
    {
      q: 'Was liest Claude, wenn er antwortet?',
      options: [
        {
          label: 'Nur die letzte Nachricht',
          correct: false,
          explain:
            'Nein. Claude sieht das gesamte bisherige Gespräch – deshalb kannst du dich auf vorher Gesagtes beziehen.',
        },
        {
          label: 'Das gesamte Gespräch plus angehängte Dateien',
          correct: true,
          explain: 'Genau das nennt man **Kontext**.',
        },
        {
          label: 'Alles, was auf deinem Computer liegt',
          correct: false,
          explain:
            'Nein. Claude sieht ausschließlich das, was du ihm aktiv gibst. Das ist wichtig für den Datenschutz.',
        },
      ],
    },
    {
      q: 'Wobei ist Claude typischerweise am stärksten?',
      options: [
        {
          label: 'Bei Aufgaben rund um Sprache und Denken',
          correct: true,
          explain:
            'Schreiben, erklären, zusammenfassen, strukturieren, vergleichen, planen – das ist die Kernstärke.',
        },
        {
          label: 'Beim exakten Rechnen mit sehr großen Zahlenmengen',
          correct: false,
          explain:
            'Dafür ist eine Tabellenkalkulation besser. Claude kann dir aber die richtige Formel dafür bauen.',
        },
        {
          label: 'Beim Vorhersagen der Zukunft',
          correct: false,
          explain: 'Claude hat kein Wissen über die Zukunft – und keine Glaskugel.',
        },
      ],
    },
  ],
  related: ['claude-vs-suchmaschine', 'was-kann-claude', 'erster-prompt'],
}
