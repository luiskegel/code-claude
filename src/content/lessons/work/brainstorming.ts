import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'brainstorming',
  track: 'work',
  title: 'Brainstorming',
  description:
    'Ideen sammeln, ohne bei den ersten fünf naheliegenden zu landen – mit Mengenvorgabe, Perspektivwechsel und Bewertung.',
  minutes: 5,
  keywords: ['ideen', 'kreativ', 'brainstorming', 'sammeln', 'alternativen', 'varianten'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ideenfindung mit Claude funktioniert nach einem einfachen Prinzip: **erst Menge, dann Auswahl** – und niemals beides in einem Schritt.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Warum die Menge zählt',
          md: 'Die ersten 5 Ideen zu einem Thema sind fast immer die naheliegenden. Interessant wird es ab Idee 12. Verlange deshalb **20 statt 5** – und sortiere danach selbst aus.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'list',
          items: [
            '**Kein leeres Blatt.** 20 Vorschläge auf dem Tisch verändern jede Besprechung.',
            '**Perspektiven, die du nicht hast.** „Wie würde ein Kunde das sehen? Ein Buchhalter? Ein Wettbewerber?"',
            '**Schnelle Gegenprobe.** „Welche dieser Ideen scheitern bei uns garantiert – und warum?"',
            '**Kombinationen.** „Kombiniere Idee 3 und 11 zu einer neuen."',
          ],
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
              title: 'Menge verlangen, Bewertung verbieten',
              md: '„20 Ideen, noch keine Bewertung." Sonst wird schon beim Sammeln gefiltert – und die ungewöhnlichen Ideen fallen weg.',
            },
            {
              title: 'Bandbreite erzwingen',
              md: '„5 naheliegende, 10 ungewöhnliche, 5 verrückte." Ohne diese Vorgabe bleibt alles im sicheren Bereich.',
            },
            {
              title: 'Perspektiven wechseln lassen',
              md: 'Dieselbe Frage aus der Sicht verschiedener Beteiligter bringt völlig andere Ideen.',
            },
            {
              title: 'Erst danach bewerten',
              md: 'In einem zweiten Prompt, mit deinen echten Rahmenbedingungen (Budget, Zeit, Team).',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Ideen sammeln',
          prompt: `Thema: [DEINE FRAGESTELLUNG]
Kontext: [SITUATION, RAHMENBEDINGUNGEN]

Aufgabe:
Gib mir 20 Ideen.
- 5 naheliegende
- 10 ungewöhnliche, die man nicht sofort denkt
- 5 bewusst verrückte (auch wenn sie unrealistisch sind)

Regeln:
- Jede Idee maximal 1 Satz.
- Noch KEINE Bewertung, keine Einordnung, keine Empfehlung.
- Keine Wiederholungen in anderen Worten.
- Nummeriere durch.`,
          note: 'Die „verrückten" fünf sind kein Spaß, sondern Methode: Sie verschieben die Grenze dessen, was danach noch als „ungewöhnlich, aber machbar" gilt.',
        },
        {
          type: 'prompt',
          title: 'Ideen bewerten',
          prompt: `Bewerte jetzt die Ideen aus der Liste.

Unsere Rahmenbedingungen:
- Budget: [X]
- Zeit: [X]
- Team: [X]
- Was auf keinen Fall geht: [X]

Format: Tabelle mit Nr. | Idee | Aufwand (1-5) | Wirkung (1-5) | Größtes Risiko

Danach:
- Die 3 Ideen mit dem besten Verhältnis aus Aufwand und Wirkung.
- Die 1 Idee, die du empfiehlst, obwohl sie riskant ist – mit Begründung.`,
          note: 'Die letzte Zeile bringt oft die interessanteste Antwort, weil sie zu einer echten Position zwingt.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Perspektivwechsel',
          example: {
            task: 'Ihr sucht Ideen, wie ihr Stammkunden stärker bindet.',
            bad: '`Gib mir Ideen zur Kundenbindung.`\n→ Rabatte, Newsletter, Treuekarte. Die Liste, die jeder kennt.',
            good: `\`Thema: Stammkundenbindung für [BETRIEB].

Gib mir Ideen aus 5 verschiedenen Perspektiven, je 4 Stück:
1. Aus Sicht eines Stammkunden, der seit 10 Jahren kommt
2. Aus Sicht eines Kunden, der zur Konkurrenz gewechselt ist
3. Aus Sicht eines Mitarbeiters mit Kundenkontakt
4. Aus Sicht eines Betriebs aus einer ganz anderen Branche
5. Aus Sicht von jemandem, der nur 100 € Budget hat

Noch keine Bewertung. Je Idee 1 Satz.\``,
            why: 'Perspektive 2 (der abgewanderte Kunde) und 5 (das Mini-Budget) bringen fast immer Ideen, auf die man intern nie kommt.',
            result:
              '20 Ideen, von denen typischerweise 3 bis 4 wirklich neu sind – und das ist bei Brainstorming eine gute Quote.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Die Umkehrfrage',
          prompt: `Umgekehrtes Brainstorming.

Frage: Wie würden wir [ZIEL] am zuverlässigsten VERHINDERN?
Kontext: [SITUATION]

Aufgabe:
1. Gib mir 12 Wege, dieses Ziel sicher zu verfehlen.
2. Prüfe dann: Welche davon machen wir heute schon – ganz oder teilweise?
3. Dreh die 5 relevantesten Punkte in konkrete Maßnahmen um.`,
          note: 'Die Umkehrfrage deckt Probleme auf, die bei der normalen Frage niemand anspricht – weil es unangenehm ist, sie direkt zu benennen.',
        },
      ],
    },
  ],
  mistakes: [
    'Zu wenige Ideen verlangen – bei 5 bekommst du nur die naheliegenden.',
    'Sammeln und Bewerten in einem Schritt. Dann wird schon beim Sammeln gefiltert.',
    'Keinen Kontext geben – dann sind die Ideen allgemein und für euch unbrauchbar.',
    'Die erstbeste Idee nehmen, ohne die Aufwand-Wirkung-Bewertung zu machen.',
  ],
  proTip:
    'Wenn eine Ideenliste langweilig wirkt, schreib: *„Diese Ideen kennt jeder. Gib mir 10 neue, die in keiner Standardliste zu diesem Thema stehen."* Das funktioniert erstaunlich zuverlässig.',
  task: {
    md: 'Nimm eine offene Frage aus deinem Alltag. Lass 20 Ideen aus 5 Perspektiven sammeln, ohne Bewertung. Markiere selbst die drei, die du vorher nicht auf dem Schirm hattest.',
    solution:
      'Wenn keine einzige neu ist, lag es meist am Kontext: zu allgemein beschrieben. Ergänze konkrete Rahmenbedingungen (Branche, Größe, Budget, bisherige Versuche) und wiederhole.',
  },
  exercise: {
    scenario: 'Du bittest um 5 Ideen und bekommst die üblichen Verdächtigen.',
    question: 'Was änderst du?',
    options: [
      {
        label: 'Die Frage höflicher stellen',
        correct: false,
        explain: 'Ohne Wirkung auf die Ideenqualität.',
      },
      {
        label: 'Mehr Ideen verlangen und Bandbreite vorgeben (naheliegend / ungewöhnlich / verrückt)',
        correct: true,
        explain:
          'Die Menge zwingt über die naheliegenden hinaus, die Bandbreite verhindert, dass alles im sicheren Bereich bleibt.',
      },
      {
        label: 'Die Frage in einem neuen Chat stellen',
        correct: false,
        explain: 'Gleiche Frage, gleiches Ergebnis.',
      },
    ],
  },
  quiz: [
    {
      q: 'Warum solltest du Sammeln und Bewerten trennen?',
      options: [
        {
          label: 'Weil sonst schon beim Sammeln gefiltert wird',
          correct: true,
          explain: 'Die ungewöhnlichen Ideen fallen dann heraus, bevor du sie siehst.',
        },
        { label: 'Weil es schneller geht', correct: false, explain: 'Es dauert sogar einen Schritt länger.' },
        { label: 'Weil Claude sonst überfordert ist', correct: false, explain: 'Nicht der Grund.' },
      ],
    },
    {
      q: 'Was bringt der Perspektivwechsel?',
      options: [
        { label: 'Kürzere Ideen', correct: false, explain: 'Nein.' },
        {
          label: 'Ideen, auf die man intern nicht kommt',
          correct: true,
          explain: 'Besonders die Sicht des abgewanderten Kunden oder des Mini-Budgets.',
        },
        { label: 'Weniger Arbeit', correct: false, explain: 'Nicht der Zweck.' },
      ],
    },
    {
      q: 'Was ist die Umkehrfrage?',
      options: [
        {
          label: '„Wie würden wir das Ziel sicher verhindern?"',
          correct: true,
          explain: 'Deckt unangenehme Wahrheiten auf, die sonst niemand anspricht.',
        },
        { label: '„Was ist das Gegenteil des Themas?"', correct: false, explain: 'Nicht gemeint.' },
        { label: '„Wer ist dagegen?"', correct: false, explain: 'Andere Frage.' },
      ],
    },
  ],
  related: ['planung', 'rollen-und-aufgaben', 'folgefragen-stellen'],
}
