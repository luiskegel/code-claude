import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'kontext-geben',
  track: 'prompting',
  title: 'Kontext geben',
  description:
    'Kontext ist der Unterschied zwischen einer generischen und einer brauchbaren Antwort. Was genau hineingehört – und was nicht.',
  minutes: 7,
  keywords: ['kontext', 'hintergrund', 'informationen', 'situation', 'details'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Kontext ist alles, was Claude über **deine Situation** wissen muss, um die Aufgabe richtig zu lösen.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Kontext ist die Gesamtheit der Informationen im aktiven Gesprächsfenster: System-Anweisungen, vorherige Nachrichten, angehängte Dateien und Projektwissen. Das Modell konditioniert seine Ausgabe auf diesen gesamten Inhalt.',
            },
            {
              label: 'Einfach',
              md: 'Kontext ist alles, was Claude gerade „vor Augen" hat: dein Gespräch, deine Dateien, dein Projektwissen.',
            },
            {
              label: 'Ganz einfach',
              md: 'Was Claude nicht weiß, kann er nicht berücksichtigen. Erzähl ihm die Lage.',
            },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'compare',
          badTitle: 'Ohne Kontext',
          badMd:
            '`Schreib eine Preiserhöhung an unsere Kunden.`\n\nErgebnis: ein Standardschreiben. Es könnte von jeder Firma der Welt stammen.',
          goodTitle: 'Mit Kontext',
          goodMd:
            '`Schreib eine Preiserhöhung an unsere Kunden.\n\nKontext: Wir sind eine Reinigungsfirma mit 40 Gewerbekunden. Erste Erhöhung seit 4 Jahren, +8 %, Grund sind Lohnkosten. Die meisten Kunden sind seit Jahren dabei, zwei sind sehr preissensibel. Wir wollen keinen Kunden verlieren.`',
          why: 'Die Angaben „erste Erhöhung seit 4 Jahren", „Lohnkosten" und „keinen Kunden verlieren" bestimmen Argumentation und Ton des gesamten Schreibens.',
        },
        {
          type: 'callout',
          variant: 'tip',
          md: 'Merksatz: **Kontext ersetzt Prompt-Tricks.** Wer die Situation gut beschreibt, braucht kaum Formulierungskniffe.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Guter Kontext beantwortet fünf Fragen. Du musst nicht alle beantworten – aber prüf sie kurz durch:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Wer ist beteiligt?', md: 'Firma, Team, Empfänger, Beziehung zueinander.' },
            { title: 'Was ist die Vorgeschichte?', md: 'Was ist passiert, was wurde schon versucht?' },
            { title: 'Was ist das Ziel?', md: 'Was soll nach dem Lesen anders sein?' },
            { title: 'Was sind die Einschränkungen?', md: 'Budget, Zeit, Tonfall, rechtliche Grenzen.' },
            { title: 'Was darf nicht passieren?', md: 'Der am häufigsten vergessene – und oft wichtigste – Punkt.' },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Mehr ist nicht automatisch besser',
          md: 'Kontext, der nichts mit der Aufgabe zu tun hat, verwässert die Antwort. Gib **relevante** Details – nicht deine gesamte Firmengeschichte.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wie viel Kontext passt hinein?',
          blocks: [
            {
              type: 'text',
              md: 'Claude hat ein **Kontextfenster** – eine Obergrenze dafür, wie viel Text gleichzeitig berücksichtigt werden kann. Es ist sehr groß (mehrere hundert Seiten), aber nicht unendlich.',
            },
            {
              type: 'text',
              md: 'Praktische Folgen: In sehr langen Gesprächen kann Frühes an Gewicht verlieren. Wenn eine wichtige Vorgabe schon 50 Nachrichten zurückliegt, wiederhole sie lieber kurz, statt dich darauf zu verlassen.',
            },
            {
              type: 'text',
              md: 'Details dazu in der Profi-Lektion **Kontextfenster und Token**.',
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
          title: 'Beispiel anzeigen: Absage an einen Bewerber',
          example: {
            task: 'Du musst einem Bewerber absagen, der es bis ins letzte Gespräch geschafft hat.',
            bad: '`Schreib eine Absage an einen Bewerber.`',
            good: `\`Schreib eine Absage an einen Bewerber.

Kontext:
- Er war im Finale, zwei Gespräche, sehr sympathisch.
- Wir haben uns für jemanden mit mehr Erfahrung in der Abrechnung entschieden.
- Wir würden ihn in einem Jahr gern wieder einladen.
- Er hat viel Zeit investiert (Probearbeit).

Was nicht passieren darf:
- Keine Floskel wie "leider müssen wir Ihnen mitteilen".
- Kein falsches Hoffnungmachen, aber die Tür soll offen bleiben.

Format: maximal 8 Sätze, Sie-Form, warm aber klar.\``,
            why: 'Die Angabe „er war im Finale" und „viel Zeit investiert" verändert den Ton komplett. Und die Negativ-Regel verhindert die Standardformulierung, die jeder kennt.',
            result:
              'Eine Absage, die der Bewerber als respektvoll empfindet – und nach der er sich tatsächlich wieder bewirbt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Kontext-Checkliste',
          prompt: `Aufgabe:
[DEINE AUFGABE]

Kontext:
- Beteiligte: [WER?]
- Vorgeschichte: [WAS IST BISHER PASSIERT?]
- Ziel: [WAS SOLL DANACH ANDERS SEIN?]
- Einschränkungen: [ZEIT, GELD, TON, REGELN]
- Was nicht passieren darf: [DIE ROTE LINIE]

Format:
[LÄNGE UND FORM]`,
          note: 'Die Zeile „Was nicht passieren darf" ist die, die am häufigsten fehlt – und am meisten bringt.',
        },
        {
          type: 'prompt',
          title: 'Fehlenden Kontext aufdecken lassen',
          prompt: `Ich habe folgende Aufgabe: [AUFGABE].

Bevor du sie löst:
Sag mir, welche 5 Informationen dir fehlen, um ein wirklich passendes Ergebnis zu liefern.
Sortiere sie danach, wie stark sie das Ergebnis verändern würden.`,
          note: 'Sehr nützlich, wenn du merkst, dass Antworten „irgendwie allgemein" bleiben.',
        },
      ],
    },
  ],
  mistakes: [
    'Annehmen, Claude kenne die eigene Firma, Branche oder Vorgeschichte.',
    'Kontext in Stichworten liefern, die nur für Insider verständlich sind ("wie beim Projekt Alpha").',
    'Zu viel Irrelevantes mitgeben und damit das Wesentliche verwässern.',
    'Vergessen zu sagen, was auf keinen Fall passieren darf.',
  ],
  proTip:
    'Wenn du in einem langen Gespräch merkst, dass Claude eine frühere Vorgabe "vergisst", wiederhole sie in einem kurzen Satz: *"Erinnerung: Zielgruppe bleibt Einsteiger, maximal 5 Sätze."* Das ist schneller als jede Diskussion.',
  task: {
    md: 'Nimm einen Prompt, den du diese Woche geschrieben hast, und ergänze die fünf Kontext-Fragen. Vergleiche das alte und das neue Ergebnis.',
    solution:
      'Der Unterschied ist meist am größten bei **Ziel** und **Was darf nicht passieren**. Diese zwei Fragen allein bringen oft 80 % des Effekts.',
  },
  exercise: {
    scenario:
      'Claudes Antworten sind korrekt, wirken aber austauschbar – als wären sie für irgendeine Firma geschrieben.',
    question: 'Was fehlt am wahrscheinlichsten?',
    options: [
      {
        label: 'Eine Rolle',
        correct: false,
        explain:
          'Eine Rolle ändert den Blickwinkel, aber nicht die Austauschbarkeit. Die kommt von fehlenden Details.',
      },
      {
        label: 'Konkreter Kontext über deine Situation',
        correct: true,
        explain:
          'Genau. Austauschbare Antworten sind fast immer ein Kontextproblem, kein Formulierungsproblem.',
      },
      {
        label: 'Ein längerer Prompt',
        correct: false,
        explain: 'Länge allein hilft nicht – relevante Details schon.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was gehört alles zum Kontext?',
      options: [
        {
          label: 'Nur die aktuelle Nachricht',
          correct: false,
          explain: 'Nein – das gesamte Gespräch, Dateien und Projektwissen zählen dazu.',
        },
        {
          label: 'Gespräch, Dateien und Projektwissen',
          correct: true,
          explain: 'Alles, was Claude gerade „vor Augen" hat.',
        },
        {
          label: 'Alles, was du je mit Claude besprochen hast',
          correct: false,
          explain: 'Frühere Chats sind nicht automatisch Teil des aktuellen Kontexts.',
        },
      ],
    },
    {
      q: 'Welche Kontext-Frage wird am häufigsten vergessen?',
      options: [
        { label: 'Wer ist beteiligt?', correct: false, explain: 'Die denken die meisten mit.' },
        {
          label: 'Was darf nicht passieren?',
          correct: true,
          explain: 'Und sie ist oft die wirkungsvollste.',
        },
        { label: 'Was ist das Ziel?', correct: false, explain: 'Wird meist zumindest angedeutet.' },
      ],
    },
    {
      q: 'Ist mehr Kontext immer besser?',
      options: [
        {
          label: 'Ja, je mehr desto besser',
          correct: false,
          explain: 'Irrelevante Details verwässern die Antwort.',
        },
        {
          label: 'Nein – relevanter Kontext ist besser als viel Kontext',
          correct: true,
          explain: 'Qualität schlägt Menge.',
        },
        {
          label: 'Kontext spielt keine Rolle',
          correct: false,
          explain: 'Er ist der wichtigste Hebel überhaupt.',
        },
      ],
    },
  ],
  related: ['gute-prompts', 'projekte-wissenskontext', 'kontextfenster-und-token'],
}
