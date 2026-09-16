import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'recherche',
  track: 'work',
  title: 'Recherche',
  description:
    'Mit Claude recherchieren, ohne auf erfundene Quellen hereinzufallen – und wann du besser selbst suchst.',
  minutes: 6,
  keywords: ['recherche', 'quellen', 'websuche', 'belege', 'vergleichen', 'informationen'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Bei Recherche gibt es zwei völlig verschiedene Modi – und du musst wissen, in welchem du gerade bist.',
        },
        {
          type: 'table',
          head: ['', 'Ohne Websuche', 'Mit Websuche'],
          rows: [
            ['Wissensquelle', 'Trainingswissen mit Stichtag', 'Aktuelle Webseiten'],
            ['Aktualität', 'Nicht tagesaktuell', 'Aktuell'],
            ['Quellenangaben', 'Aus dem Gedächtnis – prüfbedürftig', 'Anklickbare Links'],
            ['Gut für', 'Zusammenhänge, Konzepte, Erklärungen', 'Zahlen, Preise, Neuigkeiten, Produkte'],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Die wichtigste Regel',
          md: 'Ohne aktivierte Websuche darfst du **keine Quellenangabe für bare Münze nehmen**. Titel, Autoren und Links können plausibel klingen und trotzdem nicht existieren.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Trotzdem ist Claude für Recherche extrem nützlich – nur nicht als Ersatz für die Quelle, sondern als **Werkzeug drumherum**:',
        },
        {
          type: 'list',
          items: [
            '**Vorher:** „Welche Fragen sollte ich zu diesem Thema überhaupt stellen?"',
            '**Vorher:** „Welche Suchbegriffe bringen mich weiter?"',
            '**Mittendrin:** „Erkläre mir diesen Fachartikel in einfacher Sprache."',
            '**Danach:** „Ich habe drei Quellen. Wo widersprechen sie sich?"',
            '**Danach:** „Was fehlt in meiner Recherche noch?"',
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
              title: 'Rahmen abstecken lassen',
              md: 'Bevor du suchst: Welche Teilfragen gehören zum Thema? Das verhindert, dass du eine ganze Richtung übersiehst.',
            },
            {
              title: 'Mit Websuche arbeiten, wenn Aktualität zählt',
              md: 'Und dann ausdrücklich Links verlangen, zu jeder Aussage.',
            },
            {
              title: 'Quellen selbst mitgeben, wenn du sie hast',
              md: 'Der sicherste Weg: Du lieferst die Texte, Claude vergleicht und ordnet ein.',
            },
            {
              title: 'Widersprüche gezielt suchen lassen',
              md: 'Genau dort liegt der Erkenntnisgewinn – und genau das übersieht man beim schnellen Lesen.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Recherche vorbereiten',
          prompt: `Ich recherchiere zum Thema: [THEMA].
Ziel meiner Recherche: [WAS MUSS ICH AM ENDE WISSEN ODER ENTSCHEIDEN?]

Aufgabe (noch keine Antworten, nur Vorbereitung):
1. In welche 5 Teilfragen zerfällt dieses Thema?
2. Welche davon kann ich mit allgemeinem Wissen klären, welche brauchen aktuelle Quellen?
3. Welche Suchbegriffe würdest du verwenden?
4. Welche Art von Quelle ist jeweils belastbar (Behörde, Fachverband, Studie, Hersteller)?
5. Welcher Denkfehler passiert bei diesem Thema häufig?`,
          note: 'Punkt 5 ist der unterschätzte: Er warnt dich vor der typischen Fehlinterpretation, bevor du sie machst.',
        },
        {
          type: 'prompt',
          title: 'Quellen vergleichen',
          prompt: `Hier sind [ANZAHL] Quellen zum selben Thema.

Aufgabe:
1. Worin sind sich alle einig?
2. Wo widersprechen sie sich? Zitiere die widersprüchlichen Stellen.
3. Welche Quelle ist bei welchem Punkt am belastbarsten – und warum?
4. Welche Frage bleibt nach allen Quellen offen?

Regeln:
- Nur aus den mitgelieferten Quellen arbeiten.
- Kein Wissen von außen ergänzen.
- Trenne klar: Aussage aus Quelle / deine Einschätzung.`,
          note: 'Das ist der sicherste Recherche-Prompt überhaupt: Du lieferst die Fakten, Claude leistet die Denkarbeit.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Förderprogramm prüfen',
          example: {
            task: 'Du willst wissen, ob euer Vorhaben förderfähig ist.',
            bad: '`Welche Förderprogramme gibt es für unser Vorhaben und wie hoch sind die Sätze?`\n→ Ohne Websuche eine Liste möglicherweise veralteter oder erfundener Programme mit falschen Zahlen.',
            good: `**Schritt 1 (ohne Suche):** \`Welche Arten von Förderprogrammen kommen für ein Vorhaben wie [BESCHREIBUNG] grundsätzlich in Frage? Nenne die Kategorien und die typischen Voraussetzungen – keine konkreten Programmnamen oder Zahlen.\`

**Schritt 2 (du recherchierst):** Auf den offiziellen Seiten die passenden Programme heraussuchen.

**Schritt 3 (mit deinen Quellen):** \`Hier sind die Richtlinien von 3 Programmen. Prüfe für jedes: Erfüllen wir die Voraussetzungen? Zitiere die entscheidenden Stellen. Wo bleibt es unklar?\``,
            why: 'Schritt 1 nutzt die Stärke (Zusammenhänge verstehen), ohne das Risiko (erfundene Zahlen). Schritt 3 arbeitet mit echten Dokumenten.',
            result:
              'Eine belastbare Einschätzung mit Zitaten aus den echten Richtlinien – und eine Liste der Punkte, die du beim Fördergeber nachfragen musst.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Mit Websuche und Belegpflicht',
          prompt: `Recherchiere zu: [THEMA]

Regeln:
- Nutze die Websuche.
- Gib zu jeder Aussage den Link an, aus dem sie stammt.
- Wenn du eine Aussage nicht belegen kannst, nenne sie nicht.
- Sag zu jeder Quelle in einem Halbsatz, wie belastbar sie ist (offizielle Stelle, Fachmedium, Anbieter, Blog).
- Nenne am Ende, welche Teilfrage du NICHT belegen konntest.

Format: Stichpunkte mit Quellenangabe.`,
          note: 'Die letzte Regel ist entscheidend: Sie macht die Lücke sichtbar, statt sie mit plausiblem Text zu füllen.',
        },
      ],
    },
  ],
  mistakes: [
    'Quellenangaben ohne Websuche für echt halten.',
    'Nicht prüfen, ob die Websuche überhaupt aktiv war.',
    'Eine Zahl übernehmen, weil sie dreimal genannt wurde – das ist keine Bestätigung, sondern Wiederholung.',
    'Claude nach Dingen fragen, die auf einer offiziellen Seite in 30 Sekunden stehen.',
  ],
  proTip:
    'Formuliere Recherche-Aufträge so, dass **Nichtwissen erlaubt ist**: „Wenn du es nicht belegen kannst, nenne es nicht." Dieser Satz entfernt einen großen Teil der erfundenen Quellen.',
  task: {
    md: 'Lass dir zu einem Thema, das du gut kennst, fünf Quellen mit Links nennen – einmal mit aktivierter Websuche. Klick alle fünf an. Notiere, wie viele erreichbar und inhaltlich passend waren.',
    solution:
      'Der Lerneffekt sitzt im Klicken. Mit aktiver Websuche sind die Links in der Regel echt. Wiederhole den Test ohne Websuche – und du wirst nie wieder ungeprüfte Quellenangaben übernehmen.',
  },
  exercise: {
    scenario: 'Claude nennt dir ohne aktivierte Websuche drei Studien mit Autor und Jahr.',
    question: 'Wie gehst du damit um?',
    options: [
      {
        label: 'Übernehmen – die Angaben sind sehr konkret',
        correct: false,
        explain:
          'Konkretheit ist kein Beleg. Gerade präzise wirkende Angaben können aus dem Gedächtnis rekonstruiert und falsch sein.',
      },
      {
        label: 'Jede Angabe selbst suchen und erst nach Fund verwenden',
        correct: true,
        explain:
          'Der einzige sichere Weg. Alternativ von vornherein mit Websuche und Belegpflicht arbeiten.',
      },
      {
        label: 'Claude fragen, ob die Studien wirklich existieren',
        correct: false,
        explain: 'Eine Selbstauskunft ist kein Beleg.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wann sind Quellenangaben verlässlich?',
      options: [
        {
          label: 'Wenn sie aus einer aktiven Websuche stammen und du sie angeklickt hast',
          correct: true,
          explain: 'Beides zusammen – Suche allein ersetzt das Prüfen nicht.',
        },
        { label: 'Wenn sie sehr detailliert sind', correct: false, explain: 'Detailtiefe ist kein Beleg.' },
        { label: 'Wenn sie mehrfach genannt werden', correct: false, explain: 'Wiederholung ist keine Bestätigung.' },
      ],
    },
    {
      q: 'Was ist der sicherste Recherche-Ablauf?',
      options: [
        { label: 'Alles von Claude beantworten lassen', correct: false, explain: 'Riskant bei Zahlen und Quellen.' },
        {
          label: 'Quellen selbst beschaffen und von Claude vergleichen und einordnen lassen',
          correct: true,
          explain: 'Fakten von dir, Denkarbeit von Claude.',
        },
        { label: 'Dieselbe Frage mehrfach stellen', correct: false, explain: 'Bringt keine Sicherheit.' },
      ],
    },
    {
      q: 'Welcher Satz reduziert erfundene Quellen am stärksten?',
      options: [
        {
          label: '„Wenn du es nicht belegen kannst, nenne es nicht."',
          correct: true,
          explain: 'Erlaubt Nichtwissen – und genau das verhindert Erfindungen.',
        },
        { label: '„Sei bitte gründlich."', correct: false, explain: 'Zu vage.' },
        { label: '„Nenne möglichst viele Quellen."', correct: false, explain: 'Erhöht das Risiko sogar.' },
      ],
    },
  ],
  related: ['claude-vs-suchmaschine', 'was-kann-claude-nicht', 'texte-analysieren'],
}
