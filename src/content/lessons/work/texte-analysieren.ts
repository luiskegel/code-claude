import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'texte-analysieren',
  track: 'work',
  title: 'Texte analysieren',
  description:
    'Verträge, Konzepte, Angebote, Feedback: Wie du aus einem Text genau das herausholst, was du wissen musst.',
  minutes: 7,
  keywords: ['analyse', 'vertrag', 'prüfen', 'bewerten', 'lücken', 'risiken', 'feedback'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Analysieren heißt: eine **konkrete Frage** an einen Text stellen. „Analysiere das" ist keine Frage – und liefert deshalb eine beliebige Antwort.',
        },
        {
          type: 'table',
          head: ['Analysefrage', 'Wofür'],
          rows: [
            ['Was steht drin?', 'Überblick, Zusammenfassung'],
            ['Was fehlt?', 'Lücken in Konzepten, Angeboten, Anträgen'],
            ['Was ist ungewöhnlich?', 'Verträge, Angebote, AGB'],
            ['Was widerspricht sich?', 'Lange Dokumente, mehrere Fassungen'],
            ['Was würde ein Kritiker angreifen?', 'Vor Präsentationen und Entscheidungen'],
            ['Was folgt daraus für mich?', 'Die eigentliche Frage in den meisten Fällen'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die meisten Dokumente liest man mit einem bestimmten Interesse. Wenn du dieses Interesse benennst, wird die Analyse brauchbar.',
        },
        {
          type: 'compare',
          badTitle: 'Ohne Fragestellung',
          badMd: '`Analysiere diesen Vertrag.`\n→ Eine Inhaltsangabe. Nett, aber du wusstest schon, was drinsteht.',
          goodTitle: 'Mit Fragestellung',
          goodMd: `\`Ich bin der Auftragnehmer in diesem Vertrag.

Prüfe gezielt:
1. Welche Pflichten habe ich, die über das Übliche hinausgehen?
2. Welche Fristen gelten für mich, welche für die Gegenseite?
3. Was passiert, wenn ich einen Termin nicht halte?
4. Welche 3 Punkte würde ich nachverhandeln?

Zitiere zu jedem Punkt die Stelle im Vertrag. Wenn etwas nicht geregelt ist, sag das ausdrücklich.\``,
          why: 'Die Perspektive („ich bin Auftragnehmer") und die vier konkreten Fragen machen aus einer Inhaltsangabe eine Entscheidungsgrundlage.',
        },
        {
          type: 'callout',
          variant: 'warn',
          md: 'Bei Verträgen, Bescheiden und allem mit rechtlichen Folgen gilt weiterhin: Claude bereitet dich vor, ersetzt aber keine juristische Prüfung.',
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
              title: 'Perspektive festlegen',
              md: 'Wer bist du in dieser Sache? Käufer, Verkäufer, Prüfer, Betroffener? Das ändert alles.',
            },
            {
              title: 'Drei bis fünf konkrete Fragen stellen',
              md: 'Nummeriert. So bekommst du eine strukturierte Antwort, die du abarbeiten kannst.',
            },
            {
              title: 'Belege verlangen',
              md: '„Zitiere die Stelle." Ohne Zitat weißt du nicht, ob eine Aussage im Text steht oder aus dem Allgemeinwissen stammt.',
            },
            {
              title: 'Lücken markieren lassen',
              md: '„Sag ausdrücklich, wenn etwas nicht geregelt ist." Das Fehlende ist oft wichtiger als das Vorhandene.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Universeller Analyse-Prompt',
          prompt: `Analysiere das folgende Dokument.

Meine Rolle: [KÄUFER / AUFTRAGNEHMER / PRÜFER / BETROFFENER]
Mein Ziel: [WAS MÖCHTE ICH WISSEN ODER ENTSCHEIDEN?]

Achte besonders auf:
1. [PUNKT 1]
2. [PUNKT 2]
3. [PUNKT 3]

Regeln:
- Zitiere zu jeder Aussage die Stelle aus dem Dokument.
- Was nicht im Dokument steht, kennzeichne als "nicht geregelt".
- Trenne klar: Fakten aus dem Text / deine Einschätzung.
- Nenne am Ende die 3 Punkte, die ich als Erstes klären sollte.

Format: [TABELLE / STICHPUNKTE]

--- DOKUMENT ---
[TEXT EINFÜGEN]
--- ENDE ---`,
          note: 'Die Trennung „Fakten / Einschätzung" ist der wichtigste Teil. Sie zeigt dir, worauf du dich verlassen kannst und was interpretiert ist.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: 60 Kundenrückmeldungen',
          example: {
            task: 'Aus Freitext-Feedback soll eine Prioritätenliste werden.',
            bad: '`Was sagen die Kunden?`\n→ Eine wohlwollende Zusammenfassung ohne Handlungsrichtung.',
            good: `\`Hier sind 60 Freitext-Rückmeldungen.

Aufgabe:
1. Gruppiere sie in maximal 6 Themen.
2. Nenne pro Thema die Anzahl der Nennungen.
3. Zitiere pro Thema 1 typische Aussage wörtlich.
4. Ordne jedes Thema ein: "kostet uns Kunden" / "ärgerlich, aber verkraftbar" / "Einzelmeinung".
5. Nenne die 2 Themen mit dem besten Verhältnis aus Aufwand und Wirkung.

Format: Tabelle.
Wichtig: Zähle ehrlich. Wenn ein Thema nur 2 Nennungen hat, schreib 2.\``,
            why: 'Die Einordnung in Schweregrade (Punkt 4) und das Aufwand-Wirkung-Verhältnis (Punkt 5) machen aus einer Auswertung eine Entscheidungsvorlage.',
            result:
              'Eine Tabelle, mit der das Team in 10 Minuten entscheiden kann, woran es als Nächstes arbeitet.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Was fehlt?',
          prompt: `Prüfe das folgende [KONZEPT / ANGEBOT / ANTRAG] auf Lücken.

Aufgabe:
1. Welche Informationen fehlen, die ein [ENTSCHEIDER / KUNDE / PRÜFER] erwarten würde?
2. Welche Aussagen sind unbelegt oder zu vage?
3. Welche 3 Fragen würde die Gegenseite als Erstes stellen?
4. Was ist gut und sollte auf keinen Fall gestrichen werden?

Sei direkt. Punkt 4 nicht vergessen – ich muss wissen, was ich schützen soll.

--- MATERIAL ---
[EINFÜGEN]
--- ENDE ---`,
          note: 'Punkt 4 verhindert, dass du bei der Überarbeitung versehentlich die starken Stellen entfernst.',
        },
      ],
    },
  ],
  mistakes: [
    '"Analysiere das" schreiben, ohne eine Fragestellung zu nennen.',
    'Die eigene Perspektive nicht angeben – dann wird neutral analysiert statt in deinem Interesse.',
    'Keine Zitate verlangen und dadurch nicht unterscheiden können, was im Text steht und was Einschätzung ist.',
    'Nur nach Schwächen fragen und hinterher die starken Stellen mit wegrationalisieren.',
  ],
  proTip:
    'Bei langen Dokumenten: Lass zuerst eine **Landkarte** erstellen („Welche Abschnitte gibt es, worum geht es jeweils in einem Satz?"). Dann analysierst du gezielt nur die Abschnitte, die für dich zählen – das spart Zeit und erhöht die Genauigkeit.',
  task: {
    md: 'Nimm ein Dokument aus deinem Alltag (anonymisiert). Formuliere drei konkrete Analysefragen aus **deiner** Perspektive und verlange Zitate. Prüfe stichprobenartig, ob die Zitate wirklich so im Text stehen.',
    solution:
      'Die Stichprobe ist der eigentliche Lerneffekt: Zitate aus dem mitgelieferten Text stimmen in aller Regel. Aussagen ohne Zitat sind der Teil, den du prüfen musst.',
  },
  exercise: {
    scenario: 'Du willst wissen, ob ein Angebot Fallstricke enthält.',
    question: 'Welche Anweisung ist am wirksamsten?',
    options: [
      {
        label: '„Ist dieses Angebot gut?"',
        correct: false,
        explain: '„Gut" ist nicht definiert – gut für wen, unter welchen Bedingungen?',
      },
      {
        label:
          '„Ich bin der Auftraggeber. Nenne die 5 Stellen, die zu meinen Ungunsten ausgelegt werden könnten, mit Zitat und Begründung."',
        correct: true,
        explain:
          'Perspektive, konkrete Anzahl, Zitatpflicht, Begründung. Genau die vier Zutaten aus dieser Lektion.',
      },
      {
        label: '„Fasse das Angebot zusammen."',
        correct: false,
        explain: 'Gibt dir einen Überblick, aber keine Risikoeinschätzung.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was macht eine Analyse brauchbar?',
      options: [
        {
          label: 'Eine konkrete Fragestellung aus einer klaren Perspektive',
          correct: true,
          explain: 'Ohne beides bekommst du nur eine Inhaltsangabe.',
        },
        { label: 'Ein möglichst langes Dokument', correct: false, explain: 'Länge hilft nicht.' },
        { label: 'Eine höfliche Formulierung', correct: false, explain: 'Ohne Wirkung.' },
      ],
    },
    {
      q: 'Wozu dient die Zitatpflicht?',
      options: [
        { label: 'Zur Optik', correct: false, explain: 'Nein.' },
        {
          label: 'Um zu unterscheiden, was im Text steht und was Einschätzung ist',
          correct: true,
          explain: 'Der wichtigste Schutz gegen erfundene Details.',
        },
        { label: 'Um den Text zu verlängern', correct: false, explain: 'Kein Ziel.' },
      ],
    },
    {
      q: 'Was ist bei sehr langen Dokumenten der beste erste Schritt?',
      options: [
        { label: 'Alles auf einmal analysieren lassen', correct: false, explain: 'Wird ungenau.' },
        {
          label: 'Erst eine Landkarte der Abschnitte erstellen lassen',
          correct: true,
          explain: 'Danach gezielt nur die relevanten Abschnitte analysieren.',
        },
        { label: 'Das Dokument kürzen', correct: false, explain: 'Dabei geht womöglich Wichtiges verloren.' },
      ],
    },
  ],
  related: ['dateien-verstehen', 'zusammenfassungen', 'texte-erstellen'],
}
