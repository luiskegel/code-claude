import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'qualitaet-pruefen',
  track: 'advanced',
  title: 'Qualität messen statt raten',
  description:
    'Wie du feststellst, ob eine Änderung wirklich besser ist – mit einem einfachen Testsatz statt mit Bauchgefühl.',
  minutes: 7,
  keywords: ['qualität', 'messen', 'test', 'eval', 'vergleich', 'verbessern', 'bewerten'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Sobald du eine Aufgabe regelmäßig oder in großer Zahl erledigst, reicht „fühlt sich besser an" nicht mehr. Du brauchst einen **Testsatz**.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Ein Evaluationsset ist eine feste Menge repräsentativer Eingaben mit bekannten Soll-Ergebnissen oder Bewertungskriterien. Änderungen an Prompt, Modell oder Ablauf werden dagegen gemessen, statt anhand von Einzelbeispielen beurteilt.',
            },
            {
              label: 'Einfach',
              md: 'Eine feste Sammlung echter Beispiele, bei denen du weißt, was herauskommen soll. Damit prüfst du jede Änderung.',
            },
            {
              label: 'Ganz einfach',
              md: 'Immer dieselben 20 Testfälle. Wird es besser oder schlechter?',
            },
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
          title: 'Warum Bauchgefühl hier versagt',
          md: 'Du prüfst eine Änderung typischerweise an den zwei Beispielen, die dich gerade gestört haben. Dass die Änderung dafür funktioniert, ist zu erwarten. Ob sie die anderen 50 Fälle **verschlechtert** hat, merkst du so nie.',
        },
        {
          type: 'text',
          md: 'Das ist kein theoretisches Problem: Eine Prompt-Verschärfung, die Fall A repariert, macht Fall B häufig kaputt. Ohne Testsatz drehst du im Kreis.',
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
              title: '1. Echte Beispiele sammeln',
              md: '20 bis 50 Fälle aus deinem tatsächlichen Alltag. Keine ausgedachten – die sind zu sauber.',
            },
            {
              title: '2. Auch die schwierigen aufnehmen',
              md: 'Randfälle, Ausnahmen, mehrdeutige Fälle. Wenn dein Testsatz nur Standardfälle enthält, misst er nichts.',
            },
            {
              title: '3. Soll-Ergebnis festlegen',
              md: 'Entweder eine konkrete richtige Antwort – oder Kriterien, die eine gute Antwort erfüllen muss.',
            },
            {
              title: '4. Vor und nach jeder Änderung durchlaufen',
              md: 'Immer derselbe Satz. Nur so sind die Ergebnisse vergleichbar.',
            },
            {
              title: '5. Ergebnisse festhalten',
              md: 'Datum, was geändert wurde, wie viele Fälle richtig. Sonst weißt du nach drei Runden nicht mehr, welche Fassung die beste war.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Bewertungskriterien entwickeln',
          prompt: `Ich will die Qualität meiner Ergebnisse messbar machen.

Aufgabe: [WAS CLAUDE FÜR MICH TUT]
Was ein gutes Ergebnis ausmacht: [DEINE BESCHREIBUNG]

Aufgabe:
1. Formuliere 5-7 überprüfbare Kriterien, die eine gute Antwort erfüllen muss.
   Jedes Kriterium muss mit ja/nein beantwortbar sein - keine Geschmacksfragen.
2. Welche Kriterien sind Ausschlusskriterien (wenn nicht erfüllt, ist das Ergebnis unbrauchbar)?
3. Welche Arten von Fällen sollte mein Testsatz unbedingt enthalten?
4. Welche typischen Fehler übersieht man bei dieser Art Aufgabe?

Vermeide Kriterien wie "gut geschrieben" - die kann niemand objektiv prüfen.`,
          note: 'Punkt 1 ist der Kern: Ein Kriterium, das man nicht mit ja/nein beantworten kann, taugt nicht zum Messen.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Bewerten lassen – mit Vorsicht',
          blocks: [
            {
              type: 'text',
              md: 'Bei größeren Testsätzen kannst du Claude die Bewertung übernehmen lassen. Das funktioniert gut – unter drei Bedingungen:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                '**Die Kriterien sind eindeutig.** „Enthält eine konkrete Frist" lässt sich bewerten, „ist überzeugend" nicht.',
                '**Die Bewertung wird stichprobenartig geprüft.** Bewerte 10 Fälle selbst und vergleiche mit der automatischen Bewertung.',
                '**Der Bewerter kennt die Herkunft nicht.** Sonst besteht die Gefahr, dass er die eigene Antwort besser bewertet.',
              ],
            },
            {
              type: 'prompt',
              title: 'Antworten nach Kriterien bewerten',
              prompt: `Bewerte die folgenden Antworten gegen diese Kriterien:

Kriterien:
1. [KRITERIUM, JA/NEIN PRÜFBAR]
2. [KRITERIUM]
3. [KRITERIUM]

Regeln:
- Bewerte jedes Kriterium einzeln mit ja/nein.
- Gib zu jedem "nein" die Stelle an, an der es scheitert.
- Bewerte streng. Im Zweifel "nein".
- Keine Gesamtnote, keine Prosa – nur die Tabelle.

Format: Fall-Nr. | K1 | K2 | K3 | Anmerkung

Antworten:
[DIE ZU BEWERTENDEN ANTWORTEN]`,
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
          title: 'Beispiel anzeigen: Die Verschlimmbesserung',
          example: {
            task: 'Dein Prompt für Kundenantworten liefert manchmal zu lange Texte. Du ergänzt: „Maximal 5 Sätze."',
            bad: 'An den zwei zu langen Fällen testen. Beide sind jetzt kurz. Zufrieden sein, Änderung übernehmen.',
            good: `Denselben Testsatz mit 30 echten Fällen vorher und nachher durchlaufen lassen:

| | vorher | nachher |
|---|---|---|
| Länge eingehalten | 22/30 | 30/30 |
| Alle Fragen beantwortet | 29/30 | **21/30** |
| Ton passend | 28/30 | 27/30 |

Die Längenbegrenzung hat dazu geführt, dass bei komplexen Anfragen Fragen unbeantwortet blieben.`,
            why: 'Ohne Testsatz hättest du eine Verschlechterung für die Mehrheit der Fälle eingeführt – und es erst durch Kundenbeschwerden gemerkt.',
            result:
              'Die Regel wird angepasst: „Maximal 5 Sätze, es sei denn, die Anfrage enthält mehrere Fragen – dann pro Frage maximal 2 Sätze."',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Zwei Fassungen vergleichen',
          prompt: `Ich vergleiche zwei Fassungen eines Prompts.

Fassung A:
[PROMPT A]

Fassung B:
[PROMPT B]

Testfälle:
[3-5 ECHTE FÄLLE]

Aufgabe:
1. Bearbeite jeden Testfall mit beiden Fassungen.
2. Bewerte die Ergebnisse gegen diese Kriterien: [DEINE KRITERIEN]
3. Tabelle: Fall | Fassung A erfüllt | Fassung B erfüllt | Unterschied
4. Wo ist B besser, wo schlechter?
5. Gibt es eine Fassung C, die die Stärken beider verbindet?

Sei streng. Wenn kein Unterschied besteht, sag das.`,
          note: 'Punkt 4 ist entscheidend: Fast jede Prompt-Änderung verbessert einen Aspekt und verschlechtert einen anderen. Du musst wissen, welchen.',
        },
      ],
    },
  ],
  mistakes: [
    'Nur an den Fällen testen, die das Problem ausgelöst haben.',
    'Ausgedachte Testfälle verwenden statt echter – sie sind zu sauber und zu eindeutig.',
    'Kriterien formulieren, die man nicht mit ja/nein prüfen kann.',
    'Die Ergebnisse früherer Durchläufe nicht festhalten.',
    'Automatische Bewertungen nicht stichprobenartig gegenprüfen.',
  ],
  proTip:
    'Nimm in deinen Testsatz bewusst **die drei Fälle auf, bei denen es zuletzt schiefging**. Sie sind die wertvollsten – und sie verhindern, dass derselbe Fehler nach der nächsten Änderung zurückkommt.',
  task: {
    md: 'Erstelle für eine wiederkehrende Aufgabe einen Testsatz aus 10 echten Fällen und 5 überprüfbaren Kriterien. Miss deinen aktuellen Prompt daran. Notiere die Trefferquote.',
    solution:
      'Die erste Messung ist fast immer ernüchternd – typischerweise liegt die Quote niedriger als erwartet. Genau das ist der Punkt: Ab jetzt hast du eine Zahl, die du verbessern kannst, statt eines Gefühls.',
  },
  exercise: {
    scenario: 'Du hast deinen Prompt geändert und die drei problematischen Fälle funktionieren jetzt.',
    question: 'Bist du fertig?',
    options: [
      {
        label: 'Ja – das Problem ist behoben',
        correct: false,
        explain:
          'Du weißt nur, dass die drei Fälle jetzt funktionieren. Über die anderen weißt du nichts.',
      },
      {
        label: 'Nein – erst den ganzen Testsatz durchlaufen lassen und vergleichen',
        correct: true,
        explain:
          'Prompt-Änderungen verbessern häufig einen Aspekt und verschlechtern einen anderen. Nur der Testsatz zeigt das.',
      },
      {
        label: 'Nein – erst noch fünf weitere Änderungen machen',
        correct: false,
        explain: 'Dann weißt du am Ende nicht, welche Änderung was bewirkt hat.',
      },
    ],
  },
  quiz: [
    {
      q: 'Woraus besteht ein brauchbarer Testsatz?',
      options: [
        {
          label: 'Echten Fällen, inklusive der schwierigen und der Randfälle',
          correct: true,
          explain: 'Ausgedachte Fälle sind zu eindeutig und messen deshalb nichts.',
        },
        { label: 'Möglichst vielen einfachen Fällen', correct: false, explain: 'Die bestehen alle – aussagelos.' },
        { label: 'Fällen, die Claude vorgeschlagen hat', correct: false, explain: 'Nicht repräsentativ für deine Realität.' },
      ],
    },
    {
      q: 'Wie muss ein Kriterium formuliert sein?',
      options: [
        { label: 'Möglichst allgemein', correct: false, explain: 'Dann kann man es nicht prüfen.' },
        {
          label: 'So, dass es mit ja/nein beantwortbar ist',
          correct: true,
          explain: '„Enthält eine konkrete Frist" – nicht „ist überzeugend".',
        },
        { label: 'Als Note von 1 bis 10', correct: false, explain: 'Zu subjektiv und schlecht vergleichbar.' },
      ],
    },
    {
      q: 'Was ist die Gefahr, wenn du nur an den Problemfällen testest?',
      options: [
        {
          label: 'Du übersiehst Verschlechterungen bei allen anderen Fällen',
          correct: true,
          explain: 'Der häufigste Fehler beim Verbessern von Prompts.',
        },
        { label: 'Es dauert zu lange', correct: false, explain: 'Es geht sogar schneller – nur eben unzuverlässig.' },
        { label: 'Keine – das reicht aus', correct: false, explain: 'Nein.' },
      ],
    },
  ],
  related: ['automatisierung', 'modelle-verstehen', 'prompts-verbessern'],
}
