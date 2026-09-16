import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'rollen-und-aufgaben',
  track: 'prompting',
  title: 'Rollen und Aufgaben',
  description:
    'Wie eine Rolle den Blickwinkel verändert – und warum eine klare Aufgabe wichtiger ist als jede Rolle.',
  minutes: 6,
  keywords: ['rolle', 'persona', 'perspektive', 'experte', 'aufgabe', 'verb'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Eine **Rolle** sagt Claude, aus welcher Perspektive er auf die Aufgabe schauen soll. Eine **Aufgabe** sagt, was zu tun ist. Beides zusammen ist stark – aber nur eines davon ist unverzichtbar.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Wichtig zuerst',
          md: 'Eine Rolle ist **Würze, kein Hauptgericht**. Ein Prompt ohne Rolle, aber mit klarer Aufgabe funktioniert gut. Ein Prompt mit Rolle, aber unklarer Aufgabe funktioniert nicht.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Eine Rolle verändert vor allem drei Dinge: **worauf geachtet wird**, **welche Begriffe verwendet werden** und **was als wichtig gilt**.',
        },
        {
          type: 'table',
          head: ['Rolle', 'Worauf sie den Blick lenkt'],
          rows: [
            ['„Du bist Lektorin"', 'Sprache, Lesefluss, Wiederholungen, Länge'],
            ['„Du bist Controller"', 'Zahlen, Annahmen, Risiken, Kosten'],
            ['„Du bist skeptischer Kunde"', 'Einwände, unklare Versprechen, Preis-Leistung'],
            ['„Du bist Lehrer für Zehntklässler"', 'Verständlichkeit, Beispiele, Schritt-für-Schritt'],
            ['„Du bist erfahrene Projektleiterin"', 'Reihenfolge, Abhängigkeiten, Puffer, Verantwortlichkeiten'],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Der unterschätzte Trick',
          md: 'Die nützlichste Rolle ist oft nicht „Experte", sondern **die kritische Gegenposition**: „Du bist ein skeptischer Kunde", „Du bist ein Prüfer, der Fehler finden will". Dadurch bekommst du Einwände statt Zustimmung.',
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
              title: 'Aufgabe zuerst festlegen',
              md: 'Beginne mit einem klaren Verb: *prüfe*, *kürze*, *vergleiche*, *erstelle*, *erkläre*, *bewerte*.',
            },
            {
              title: 'Rolle nur ergänzen, wenn sie etwas verändert',
              md: 'Frage dich: Würde eine Fachperson diese Aufgabe **anders** angehen als ein Laie? Wenn ja → Rolle nennen.',
            },
            {
              title: 'Rolle konkret machen',
              md: '„Du bist Experte" ist fast wirkungslos. „Du bist Lektorin für technische Handbücher" ist es nicht.',
            },
            {
              title: 'Mehrere Rollen nacheinander nutzen',
              md: 'Erst schreiben lassen, dann von einer kritischen Rolle prüfen lassen. Das ist einer der stärksten Arbeitsabläufe überhaupt.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Die stärksten Aufgaben-Verben',
          blocks: [
            {
              type: 'table',
              head: ['Verb', 'Was du bekommst'],
              rows: [
                ['**Erkläre**', 'Verständnis, Hintergrund, Zusammenhänge'],
                ['**Fasse zusammen**', 'Kürzung auf das Wesentliche'],
                ['**Vergleiche**', 'Gegenüberstellung, Unterschiede, Empfehlung'],
                ['**Prüfe**', 'Fehler, Lücken, Widersprüche'],
                ['**Strukturiere**', 'Ordnung in unsortiertem Material'],
                ['**Formuliere um**', 'Gleicher Inhalt, anderer Ton'],
                ['**Erstelle**', 'Etwas Neues nach deinen Vorgaben'],
                ['**Bewerte**', 'Einschätzung mit Begründung'],
              ],
            },
            {
              type: 'text',
              md: 'Wenn du unsicher bist, welches Verb passt: Beschreib in einem Satz, was du am Ende **in der Hand halten** willst. Das Verb ergibt sich dann meist von selbst.',
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
          title: 'Beispiel anzeigen: Zwei Rollen nacheinander',
          example: {
            task: 'Du hast ein Angebot für einen Kunden geschrieben und willst wissen, ob es überzeugt.',
            bad: '`Ist mein Angebot gut?`\n\n→ Ergebnis: höfliche Zustimmung mit ein paar allgemeinen Hinweisen.',
            good: `**Runde 1 – kritische Rolle:**
\`Du bist ein skeptischer Einkäufer, der drei Angebote vergleicht und auf den Preis achtet.
Lies mein Angebot und nenne die 5 Stellen, an denen du zögern oder nachfragen würdest.
Sei direkt, keine Höflichkeit.\`

**Runde 2 – konstruktive Rolle:**
\`Jetzt bist du mein Vertriebscoach. Überarbeite das Angebot so, dass die 5 Einwände von eben entkräftet werden. Behalte Struktur und Preise.\``,
            why: 'Die erste Rolle liefert echte Kritik statt Zustimmung. Die zweite arbeitet damit weiter. Das ist besser als jede „Mach mein Angebot besser"-Anfrage.',
            result:
              'Ein Angebot, das die typischen Einwände bereits im Text beantwortet – statt sie dem Kunden zu überlassen.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Kritischer Gegenspieler',
          prompt: `Du bist [SKEPTISCHER KUNDE / STRENGER PRÜFER / ERFAHRENER KOLLEGE, DER SCHON ALLES GESEHEN HAT].

Deine Aufgabe:
Lies das Folgende und finde die Schwachstellen.

Regeln:
- Sei direkt und konkret. Keine Höflichkeitsfloskeln.
- Nenne maximal 5 Punkte, sortiert nach Wichtigkeit.
- Sag zu jedem Punkt, woran du ihn festmachst.
- Stell am Ende die eine Frage, die mich am meisten ins Schwitzen bringen würde.

Material:
[DEIN TEXT / KONZEPT / ANGEBOT]`,
          note: 'Die letzte Zeile ist Gold wert – sie deckt genau die Lücke auf, die du selbst nicht siehst.',
        },
      ],
    },
  ],
  mistakes: [
    'Eine Rolle vergeben, aber die eigentliche Aufgabe unklar lassen.',
    'Vage Rollen wie "Du bist ein Experte" verwenden – das ändert fast nichts.',
    'Eine Rolle nutzen, um Fachwissen zu "erzeugen", das Claude gar nicht hat. Eine Rolle ändert die Perspektive, nicht die Faktenlage.',
    'Immer nur wohlwollende Rollen einsetzen und sich über zu viel Zustimmung wundern.',
  ],
  proTip:
    'Für wichtige Texte: **schreiben lassen → kritisieren lassen → überarbeiten lassen**. Drei Prompts, drei Minuten, deutlich besseres Ergebnis als jeder Einzelversuch.',
  task: {
    md: 'Lass einen deiner eigenen Texte von zwei gegensätzlichen Rollen beurteilen – zum Beispiel „begeisterter Unterstützer" und „skeptischer Prüfer". Vergleiche, welche Rückmeldung dir mehr bringt.',
    solution:
      'Fast immer gewinnt die skeptische Rolle. Wohlwollende Rollen bestätigen, was du schon glaubst; kritische Rollen zeigen dir, was du übersehen hast.',
  },
  exercise: {
    scenario:
      'Du willst prüfen lassen, ob deine Projektplanung realistisch ist.',
    question: 'Welche Rolle bringt dir am meisten?',
    options: [
      {
        label: '„Du bist ein hilfsbereiter Assistent."',
        correct: false,
        explain: 'Das ist die Standardhaltung – die Rolle ändert nichts.',
      },
      {
        label:
          '„Du bist eine erfahrene Projektleiterin, die schon drei ähnliche Projekte scheitern sah. Finde die Stellen, an denen es typischerweise kippt."',
        correct: true,
        explain:
          'Konkret, mit Blickrichtung und kritischer Haltung. Genau so wirkt eine Rolle.',
      },
      {
        label: '„Du bist ein Experte."',
        correct: false,
        explain: 'Zu vage – Experte wofür, mit welchem Blick?',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist wichtiger: Rolle oder klare Aufgabe?',
      options: [
        {
          label: 'Die klare Aufgabe',
          correct: true,
          explain: 'Ohne klare Aufgabe hilft auch die beste Rolle nichts.',
        },
        { label: 'Die Rolle', correct: false, explain: 'Die Rolle ist Würze, nicht Hauptgericht.' },
        { label: 'Beide gleich', correct: false, explain: 'Die Aufgabe ist unverzichtbar, die Rolle optional.' },
      ],
    },
    {
      q: 'Welche Rolle ist am wirkungsvollsten?',
      options: [
        { label: '„Du bist ein Experte."', correct: false, explain: 'Zu vage.' },
        {
          label: 'Eine konkrete Rolle mit kritischem Blickwinkel',
          correct: true,
          explain: '„Skeptischer Einkäufer", „Prüfer, der Fehler finden will" – daraus entsteht echte Kritik.',
        },
        {
          label: '„Du bist mein Freund."',
          correct: false,
          explain: 'Erzeugt vor allem Zustimmung – meist nicht das, was du brauchst.',
        },
      ],
    },
    {
      q: 'Was kann eine Rolle NICHT?',
      options: [
        { label: 'Den Blickwinkel verändern', correct: false, explain: 'Das kann sie sehr gut.' },
        {
          label: 'Fachwissen erzeugen, das nicht vorhanden ist',
          correct: true,
          explain:
            'Eine Rolle ändert die Perspektive, nicht die Faktenlage. Prüfpflicht bleibt.',
        },
        { label: 'Den Sprachstil beeinflussen', correct: false, explain: 'Das tut sie durchaus.' },
      ],
    },
  ],
  related: ['gute-prompts', 'beispiele-geben', 'fehler-korrigieren'],
}
