import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'modelle-verstehen',
  track: 'advanced',
  title: 'Modelle verstehen',
  description:
    'Opus, Sonnet, Haiku – was die Unterschiede bedeuten, wann sie eine Rolle spielen und wann nicht.',
  minutes: 6,
  keywords: ['modell', 'opus', 'sonnet', 'haiku', 'auswahl', 'denkzeit', 'effort', 'kosten'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude gibt es in mehreren Modellvarianten. Sie unterscheiden sich vor allem in **Leistungsfähigkeit**, **Geschwindigkeit** und **Preis** (bei API-Nutzung).',
        },
        {
          type: 'table',
          head: ['Familie', 'Charakter', 'Typischer Einsatz'],
          rows: [
            ['**Opus**', 'Am leistungsfähigsten, denkt am gründlichsten', 'Schwierige Analysen, komplexe Programmierarbeit, lange Aufgaben'],
            ['**Sonnet**', 'Ausgewogen zwischen Leistung und Tempo', 'Der Alltag: schreiben, zusammenfassen, analysieren'],
            ['**Haiku**', 'Am schnellsten und günstigsten', 'Einfache, häufige Aufgaben in großer Menge'],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Für die Arbeit im Chat',
          md: 'Dort ist die Modellwahl meist voreingestellt oder mit einem Klick änderbar. **Du musst dich damit nicht beschäftigen, um gut zu arbeiten.** Relevant wird das Thema vor allem bei der API-Nutzung, wo du pro verarbeitetem Text bezahlst.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die Modellwahl ist eine Abwägung zwischen drei Größen, von denen du nie alle gleichzeitig maximieren kannst:',
        },
        {
          type: 'list',
          items: [
            '**Qualität** – wie gut werden schwierige Aufgaben gelöst?',
            '**Tempo** – wie schnell kommt die Antwort?',
            '**Kosten** – was kostet die Verarbeitung (nur bei API-Nutzung relevant)?',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Die praktische Faustregel',
          md: 'Wähle das Modell nach der **Schwierigkeit der Aufgabe**, nicht nach ihrer Wichtigkeit. Eine wichtige, aber einfache Aufgabe (100 E-Mails nach Betreff sortieren) braucht kein Spitzenmodell. Eine unwichtige, aber knifflige Aufgabe schon.',
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
              title: 'Im Chat: mit der Voreinstellung arbeiten',
              md: 'Wenn eine Antwort zu oberflächlich ist, kannst du auf ein leistungsfähigeres Modell wechseln – aber prüfe zuerst deinen Prompt. In den meisten Fällen liegt es daran.',
            },
            {
              title: 'Bei der API: nach Aufgabentyp entscheiden',
              md: 'Gleichartige Massenaufgaben → schnelleres Modell. Schwierige Einzelfälle → leistungsfähigeres Modell.',
            },
            {
              title: 'Vorher messen, nicht raten',
              md: 'Nimm 20 echte Beispiele, lass sie von zwei Modellen bearbeiten und vergleiche die Ergebnisse. Das dauert eine halbe Stunde und ersetzt jede Vermutung.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Denktiefe und „Thinking"',
          blocks: [
            {
              type: 'text',
              md: 'Aktuelle Claude-Modelle können vor der Antwort **nachdenken** – intern, in mehreren Schritten. Bei schwierigen Aufgaben verbessert das die Qualität deutlich, bei einfachen kostet es nur Zeit.',
            },
            {
              type: 'list',
              items: [
                'In der Chat-Oberfläche wird das weitgehend automatisch gesteuert.',
                'Über die API lässt sich die Denktiefe einstellen – mehr Tiefe bedeutet bessere Ergebnisse bei komplexen Aufgaben, aber höhere Kosten und längere Wartezeit.',
                'Für einfache, hochvolumige Aufgaben ist eine geringe Denktiefe meist die bessere Wahl.',
              ],
            },
            {
              type: 'source',
              md: 'Welche Modelle es aktuell gibt, welche Einstellungen sie unterstützen und was sie kosten: offizielle Anthropic-Dokumentation. Diese Angaben ändern sich regelmäßig – verlass dich für Produktentscheidungen nicht auf Sekundärquellen, auch nicht auf diese Seite.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Der häufigste Denkfehler',
          md: '„Die Antwort war schlecht, ich brauche ein besseres Modell." In den meisten Fällen fehlt nicht Modellleistung, sondern **Kontext, Zielgruppe oder Format** im Prompt. Erst den Prompt verbessern, dann über das Modell nachdenken.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Modellwahl bei einer Massenaufgabe',
          example: {
            task: '5.000 Kundenrückmeldungen sollen in fünf Kategorien einsortiert werden.',
            bad: 'Das leistungsfähigste Modell nehmen, weil die Aufgabe wichtig ist. Ergebnis: höhere Kosten und längere Laufzeit, ohne erkennbaren Qualitätsgewinn.',
            good: `**Schritt 1:** 50 echte Beispiele von Hand korrekt einsortieren (dein Maßstab).

**Schritt 2:** Dieselben 50 von einem schnellen und einem leistungsfähigen Modell einsortieren lassen.

**Schritt 3:** Trefferquote vergleichen. Liegt das schnelle Modell bei 94 % und das große bei 96 %, ist die Entscheidung klar.

**Schritt 4:** Zusätzlich eine Sicherheitsangabe pro Fall verlangen – die unsicheren prüfst du von Hand.`,
            why: 'Die Messung an 50 echten Fällen kostet eine halbe Stunde und ersetzt eine Vermutung, die 5.000 Fälle betrifft.',
            result:
              'Eine belegte Entscheidung statt eines Bauchgefühls – und ein Prüfverfahren für die unsicheren Fälle.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Modellwahl durchdenken',
          prompt: `Ich plane folgende Aufgabe: [BESCHREIBUNG]

Rahmen:
- Menge: [WIE VIELE FÄLLE]
- Schwierigkeit: [EINFACH / MITTEL / KNIFFLIG]
- Wie schlimm ist ein Fehler: [FOLGEN]
- Zeitdruck: [JA / NEIN]

Aufgabe:
1. Ist das eher eine Massenaufgabe oder eine Denkaufgabe?
2. Welche Modell-Eigenschaften sind hier wichtig – Tempo, Tiefe oder Kosten?
3. Wie würde ich die Modellwahl an meinen eigenen Daten messen, statt zu raten?
4. Welche Qualitätskontrolle brauche ich in jedem Fall?
5. Was würde ich zuerst am Prompt verbessern, bevor ich über Modelle nachdenke?

Nenne keine konkreten Preise als feststehend – die ändern sich.`,
          note: 'Punkt 5 steht bewusst am Schluss und ist trotzdem meist der wichtigste.',
        },
      ],
    },
  ],
  mistakes: [
    'Bei schlechten Ergebnissen zuerst das Modell wechseln, statt den Prompt zu verbessern.',
    'Das leistungsfähigste Modell für einfache Massenaufgaben verwenden.',
    'Die Modellwahl raten, statt sie an echten Beispielen zu messen.',
    'Preis- und Modellangaben aus Sekundärquellen als aktuell annehmen.',
  ],
  proTip:
    'Bevor du über Modelle nachdenkst, mach den Prompt-Test: Gib dem aktuellen Modell **denselben Auftrag mit vollständigem Kontext, Zielgruppe und Format**. Wenn das Ergebnis dann gut ist, war es nie ein Modellproblem.',
  task: {
    md: 'Nimm eine Aufgabe, bei der du mit dem Ergebnis unzufrieden warst. Verbessere nur den Prompt (Kontext, Zielgruppe, Format, Anforderungen). Prüfe, ob das Problem damit gelöst ist.',
    solution:
      'In der Mehrzahl der Fälle ist es das. Ein Modellwechsel lohnt sich vor allem bei Aufgaben mit vielen Ableitungsschritten – nicht bei unklar formulierten Aufträgen.',
  },
  exercise: {
    scenario:
      'Du willst 10.000 kurze Texte automatisch klassifizieren.',
    question: 'Welche Modelleigenschaft ist am wichtigsten?',
    options: [
      {
        label: 'Maximale Denktiefe',
        correct: false,
        explain:
          'Bei einfacher Klassifikation bringt sie kaum Qualitätsgewinn, kostet aber viel Zeit und Geld.',
      },
      {
        label: 'Tempo und Kosten – bei ausreichender Qualität, an Beispielen gemessen',
        correct: true,
        explain:
          'Massenaufgabe mit geringer Schwierigkeit: Die Qualität muss reichen, nicht maximal sein.',
      },
      {
        label: 'Das neueste Modell',
        correct: false,
        explain: 'Neu ist kein Auswahlkriterium – passend ist eines.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wonach wählst du ein Modell aus?',
      options: [
        {
          label: 'Nach der Schwierigkeit der Aufgabe',
          correct: true,
          explain: 'Nicht nach ihrer Wichtigkeit.',
        },
        { label: 'Nach der Wichtigkeit der Aufgabe', correct: false, explain: 'Wichtig ≠ schwierig.' },
        { label: 'Immer das größte', correct: false, explain: 'Teuer und oft ohne Zusatznutzen.' },
      ],
    },
    {
      q: 'Was solltest du zuerst prüfen, wenn Ergebnisse schlecht sind?',
      options: [
        {
          label: 'Den eigenen Prompt',
          correct: true,
          explain: 'Kontext, Zielgruppe und Format erklären die meisten schwachen Ergebnisse.',
        },
        { label: 'Das Modell', correct: false, explain: 'Erst danach.' },
        { label: 'Die Internetverbindung', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Wie triffst du eine belastbare Modellentscheidung?',
      options: [
        { label: 'Nach Erfahrungsberichten im Internet', correct: false, explain: 'Andere Aufgaben, andere Daten.' },
        {
          label: 'Durch Messung an echten Beispielen aus dem eigenen Anwendungsfall',
          correct: true,
          explain: '20 bis 50 Fälle reichen meist für ein klares Bild.',
        },
        { label: 'Nach dem Preis', correct: false, explain: 'Nur ein Faktor von dreien.' },
      ],
    },
  ],
  related: ['kontextfenster-und-token', 'api-grundlagen', 'qualitaet-pruefen'],
}
