import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'planung',
  track: 'work',
  title: 'Planung',
  description:
    'Aus einem vagen Vorhaben einen Plan machen, der Abhängigkeiten, Risiken und Verantwortlichkeiten enthält.',
  minutes: 6,
  keywords: ['plan', 'projekt', 'zeitplan', 'meilenstein', 'aufgaben', 'organisieren'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein brauchbarer Plan beantwortet vier Fragen: **Was**, **in welcher Reihenfolge**, **wer**, **was kann schiefgehen**. Fehlt eine davon, ist es eine Wunschliste.',
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Wichtig zur Ehrlichkeit',
          md: 'Claude kennt eure Kapazitäten nicht. Jede Zeitschätzung ist eine **Annahme**, keine Planung. Lass Annahmen deshalb immer ausdrücklich benennen – dann kannst du sie korrigieren.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'list',
          items: [
            '**Vollständigkeit.** Die vergessenen Schritte („wer informiert eigentlich die Kunden?") fallen sofort auf.',
            '**Reihenfolge.** Abhängigkeiten sichtbar machen ist der halbe Plan.',
            '**Risiken vorab.** „Was ist der wahrscheinlichste Grund, warum das schiefgeht?"',
            '**Format.** Ein Plan als Tabelle ist sofort verwendbar, ein Plan als Fließtext nicht.',
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Projektplan erstellen',
          prompt: `Ich plane: [VORHABEN]

Rahmen:
- Ziel: [WAS SOLL AM ENDE FERTIG SEIN?]
- Zeitraum: [VON – BIS]
- Beteiligte: [WER, MIT WELCHER KAPAZITÄT]
- Budget: [FALLS RELEVANT]
- Was schon feststeht: [VORGABEN]

Aufgabe:
1. Zerlege das Vorhaben in Phasen und Arbeitspakete.
2. Tabelle: Paket | Beschreibung | Wer | Dauer | Hängt ab von
3. Nenne die 3 größten Risiken und je eine Gegenmaßnahme.
4. Nenne die Schritte, die man typischerweise vergisst.
5. Liste alle Annahmen auf, die du getroffen hast.

Wichtig: Wenn du etwas nicht wissen kannst (z. B. unsere Kapazität), schreib es als Annahme auf – nicht als Tatsache.`,
          note: 'Punkt 5 ist der Kern. Die Annahmenliste sagt dir genau, was du selbst festlegen musst, bevor der Plan trägt.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Erst zerlegen, dann schätzen', md: 'Arbeitspakete definieren, bevor über Dauer gesprochen wird.' },
            { title: 'Abhängigkeiten sichtbar machen', md: 'Die Spalte „Hängt ab von" verhindert die meisten Planungsfehler.' },
            { title: 'Annahmen sammeln und korrigieren', md: 'Deine Korrektur macht aus dem Entwurf einen echten Plan.' },
            { title: 'Gegenprobe machen lassen', md: '„Was ist der wahrscheinlichste Grund, warum dieser Plan scheitert?"' },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Die Vorab-Obduktion („Pre-Mortem")',
          blocks: [
            {
              type: 'text',
              md: 'Eine der wirksamsten Planungsmethoden überhaupt – und sie funktioniert mit Claude besonders gut, weil er ohne Rücksicht auf Betriebsfrieden antwortet.',
            },
            {
              type: 'prompt',
              title: 'Pre-Mortem',
              prompt: `Stell dir vor, wir sind 6 Monate weiter und das Projekt ist gescheitert.

Aufgabe:
1. Schreib die 8 wahrscheinlichsten Gründe auf, warum es gescheitert ist.
2. Sortiere nach Wahrscheinlichkeit, nicht nach Dramatik.
3. Nenne zu jedem Grund ein Frühwarnsignal, an dem wir es rechtzeitig merken würden.
4. Nenne zu den 3 wahrscheinlichsten eine Gegenmaßnahme, die wir diese Woche umsetzen könnten.

Sei unbequem. Nenne auch Gründe, die mit uns selbst zu tun haben.`,
              note: 'Die Frühwarnsignale sind das Wertvollste – sie machen aus abstrakten Risiken beobachtbare Dinge.',
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
          title: 'Beispiel anzeigen: Umzug des Büros',
          example: {
            task: 'Ihr zieht in drei Monaten in neue Räume um.',
            bad: '`Erstelle einen Plan für unseren Büroumzug.`\n→ Eine allgemeine Checkliste, wie man sie online findet.',
            good: `\`Wir ziehen um: 14 Personen, von [A] nach [B], Termin ist der [DATUM], der Betrieb darf maximal 1 Tag stillstehen.
Besonderheiten: eigener Serverraum, 3 Personen im Homeoffice, Mietvertrag alt endet 2 Wochen nach Einzug.

Aufgabe:
1. Arbeitspakete mit Abhängigkeiten (Tabelle).
2. Was muss WANN spätestens beauftragt sein, damit der Termin hält? Rückwärts vom Umzugstag gerechnet.
3. Die 3 Risiken, die den "maximal 1 Tag Stillstand" gefährden.
4. Was vergisst man bei Büroumzügen typischerweise?
5. Alle Annahmen, die du getroffen hast.\``,
            why: 'Die Rückwärtsrechnung ab dem Termin (Punkt 2) macht sofort sichtbar, was schon nächste Woche passieren muss. Punkt 4 fängt die typischen Lücken ab – Telefonanlage, Post-Nachsendung, Schließsystem.',
            result:
              'Ein Plan mit konkreten Vorlauffristen statt einer Liste von Aufgaben ohne Zeitbezug.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Rückwärts planen',
          prompt: `Fester Termin: [DATUM]
Was zu diesem Termin fertig sein muss: [ERGEBNIS]

Aufgabe:
Plane rückwärts vom Termin.
1. Was muss in der letzten Woche davor passieren?
2. Was in den 4 Wochen davor?
3. Was muss als Allererstes beauftragt oder entschieden werden – und bis wann spätestens?
4. Wo ist der Plan am engsten? Wo gibt es keinen Puffer?

Format: Tabelle mit Spätester Termin | Was | Wer | Warum kritisch`,
          note: 'Rückwärts planen findet die Engpässe. Vorwärts planen findet nur die Aufgaben.',
        },
      ],
    },
  ],
  mistakes: [
    'Zeitschätzungen übernehmen, ohne die eigene Kapazität einzurechnen.',
    'Abhängigkeiten weglassen – dann steht die Reihenfolge nur scheinbar fest.',
    'Keine Annahmen abfragen und später merken, dass der Plan auf falschen Grundlagen stand.',
    'Nur vorwärts planen und zu spät merken, dass der Termin längst gerissen ist.',
  ],
  proTip:
    'Lass am Ende immer die Frage stellen: *„Welche eine Entscheidung blockiert gerade den ganzen Plan?"* In den meisten Projekten gibt es genau eine – und sie ist oft noch gar nicht getroffen.',
  task: {
    md: 'Plane ein echtes kleines Vorhaben mit dem Projektplan-Prompt. Lies die Annahmenliste durch und korrigiere jede falsche Annahme. Lass den Plan danach noch einmal anpassen.',
    solution:
      'Typisch sind zwei bis vier falsche Annahmen – meist bei Kapazität und Vorlaufzeiten. Nach der Korrektur verschiebt sich der Plan oft deutlich. Genau deshalb ist die Annahmenliste wichtiger als der Plan selbst.',
  },
  exercise: {
    scenario: 'Claude liefert einen Plan mit konkreten Zeitangaben für jedes Arbeitspaket.',
    question: 'Wie gehst du damit um?',
    options: [
      {
        label: 'Übernehmen – die Schätzungen wirken plausibel',
        correct: false,
        explain:
          'Claude kennt eure Kapazitäten, Urlaube und Parallelprojekte nicht. Plausibel heißt hier nicht realistisch.',
      },
      {
        label: 'Als Annahmen behandeln und mit den Beteiligten gegenprüfen',
        correct: true,
        explain:
          'Genau. Die Zerlegung und Reihenfolge sind wertvoll, die Dauern musst du selbst festlegen.',
      },
      {
        label: 'Alle Zeitangaben verdoppeln',
        correct: false,
        explain: 'Eine Faustregel ersetzt keine Prüfung – manche Pakete sind zu lang geschätzt, andere zu kurz.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was macht aus einer Aufgabenliste einen Plan?',
      options: [
        {
          label: 'Reihenfolge, Abhängigkeiten, Verantwortliche und Risiken',
          correct: true,
          explain: 'Ohne diese vier bleibt es eine Wunschliste.',
        },
        { label: 'Mehr Aufgaben', correct: false, explain: 'Menge ist kein Plan.' },
        { label: 'Ein schöneres Format', correct: false, explain: 'Hilft bei der Lesbarkeit, nicht bei der Planung.' },
      ],
    },
    {
      q: 'Warum ist die Annahmenliste so wichtig?',
      options: [
        {
          label: 'Weil sie zeigt, welche Grundlagen du selbst festlegen musst',
          correct: true,
          explain: 'Sie trennt das Wissbare vom Geratenen.',
        },
        { label: 'Weil sie den Plan verlängert', correct: false, explain: 'Kein Zweck.' },
        { label: 'Weil sie das Risiko beseitigt', correct: false, explain: 'Sie macht es sichtbar, nicht weg.' },
      ],
    },
    {
      q: 'Was findet die Rückwärtsplanung, was die Vorwärtsplanung nicht findet?',
      options: [
        { label: 'Mehr Aufgaben', correct: false, explain: 'Die Aufgaben sind dieselben.' },
        {
          label: 'Die Engpässe und spätesten Starttermine',
          correct: true,
          explain: 'Deshalb ist sie bei festen Terminen unverzichtbar.',
        },
        { label: 'Die Verantwortlichen', correct: false, explain: 'Die legst du ohnehin fest.' },
      ],
    },
  ],
  related: ['brainstorming', 'lange-aufgaben', 'workflows'],
}
