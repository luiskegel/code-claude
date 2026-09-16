import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'automatisierung',
  track: 'advanced',
  title: 'Automatisierung',
  description:
    'Wann sich Automatisieren lohnt, welche Stufen es gibt – und welche Kontrolle immer beim Menschen bleiben muss.',
  minutes: 7,
  keywords: ['automatisieren', 'api', 'skript', 'batch', 'stapel', 'wiederholung', 'agent'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Automatisierung heißt nicht „Claude macht alles allein". Es gibt Stufen – und die meisten Menschen bleiben sinnvollerweise auf Stufe 2.',
        },
        {
          type: 'table',
          head: ['Stufe', 'Was passiert', 'Kontrolle'],
          rows: [
            ['**1 – Manuell**', 'Du schreibst jeden Prompt einzeln', 'Vollständig bei dir'],
            ['**2 – Vorlagen**', 'Gespeicherte Prompts, du füllst aus', 'Vollständig bei dir'],
            ['**3 – Projekte**', 'Kontext und Regeln sind hinterlegt', 'Du prüfst jedes Ergebnis'],
            ['**4 – Stapelverarbeitung**', 'Viele gleichartige Aufgaben auf einmal', 'Du prüfst Stichproben'],
            ['**5 – Programmatisch (API)**', 'Software ruft Claude automatisch auf', 'Du baust die Prüfung ein'],
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Die Grundregel',
          md: 'Je höher die Stufe, desto wichtiger die **eingebaute Prüfung**. Auf Stufe 5 gibt es keinen Menschen mehr, der zufällig merkt, dass etwas seltsam aussieht – diese Rolle musst du bewusst einplanen.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Automatisieren lohnt sich, wenn drei Bedingungen zusammenkommen:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Die Aufgabe wiederholt sich** – mindestens wöchentlich.',
            '**Sie ist gleichförmig** – gleiche Eingabeart, gleiche Ergebnisform.',
            '**Fehler sind erkennbar und korrigierbar** – nichts, was unbemerkt Schaden anrichtet.',
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Wann du NICHT automatisieren solltest',
          md: 'Wenn ein Fehler teuer, rechtlich relevant oder schwer erkennbar ist. Beispiele: automatisch versendete Kundenkommunikation ohne Freigabe, Rechnungsdaten, medizinische oder juristische Aussagen, alles mit Außenwirkung ohne Kontrolle.',
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
              title: 'Erst manuell beherrschen',
              md: 'Eine Aufgabe, die du manuell nicht zuverlässig hinbekommst, wird durch Automatisierung nicht besser – nur schneller falsch.',
            },
            {
              title: 'Vorlage bauen (Stufe 2)',
              md: 'Ein Prompt mit Platzhaltern. Für 80 % der Menschen ist hier das sinnvolle Ende.',
            },
            {
              title: 'Kontext auslagern (Stufe 3)',
              md: 'Regeln und Wissen ins Projekt. Der Prompt wird dadurch zum Einzeiler.',
            },
            {
              title: 'Stapel verarbeiten (Stufe 4)',
              md: 'Mehrere gleichartige Fälle in einem Durchgang – mit fester Ergebnisform und Stichprobenprüfung.',
            },
            {
              title: 'Programmatisch (Stufe 5)',
              md: 'Über die API. Braucht Programmierkenntnisse und eine bewusst gebaute Qualitätssicherung.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Stapelverarbeitung mit Prüfung',
          prompt: `Ich gebe dir [ANZAHL] Fälle. Bearbeite jeden nach demselben Muster.

Aufgabe pro Fall:
[WAS SOLL MIT JEDEM FALL PASSIEREN]

Ausgabeformat pro Fall (exakt einhalten):
Nr. | [FELD 1] | [FELD 2] | [FELD 3] | Sicherheit (hoch/mittel/niedrig)

Regeln:
- Bearbeite jeden Fall unabhängig von den anderen.
- Wenn ein Fall unklar ist, setze Sicherheit auf "niedrig" und beschreibe in einem Halbsatz, warum.
- Erfinde keine Angaben. Fehlendes als "fehlt" kennzeichnen.

Nenne am Ende:
- Wie viele Fälle mit Sicherheit "niedrig"?
- Welche Fälle sollte ich von Hand prüfen?

Fälle:
[LISTE]`,
          note: 'Die Sicherheits-Spalte ist der Kern jeder Stapelverarbeitung: Sie sagt dir, welche der 50 Ergebnisse du dir wirklich ansehen musst.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Stufe 5 – über die API',
          blocks: [
            {
              type: 'text',
              md: 'Auf dieser Stufe ruft dein eigenes Programm Claude auf. Das ist die Grundlage für alles, was ohne Chatfenster laufen soll: Auswertungen, Klassifizierungen, Assistenzfunktionen in eigener Software.',
            },
            {
              type: 'list',
              items: [
                'Du brauchst Programmierkenntnisse und einen API-Zugang.',
                'Es fallen Kosten pro verarbeitetem Text an – abhängig vom gewählten Modell.',
                'Du legst die Prüfschritte selbst fest: Plausibilitätsprüfungen, Grenzwerte, Protokollierung.',
                'Für viele gleichartige Aufgaben ohne Zeitdruck gibt es günstigere Stapel-Verfahren.',
              ],
            },
            {
              type: 'text',
              md: 'Die Grundlagen dazu stehen in der Profi-Lektion [API-Grundlagen](/lektion/api-grundlagen).',
            },
            {
              type: 'source',
              md: 'Technische Details, Modellauswahl und Preise: offizielle Anthropic-Dokumentation.',
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
          title: 'Beispiel anzeigen: 200 Supportanfragen kategorisieren',
          example: {
            task: 'Eingehende Anfragen sollen automatisch den richtigen Teams zugeordnet werden.',
            bad: 'Alle 200 auf einmal einwerfen und der Zuordnung vertrauen.',
            good: `**Schritt 1 – Regeln festlegen:** Kategorien definieren und an 20 Beispielen von Hand prüfen, ob die Zuordnung stimmt.

**Schritt 2 – Messen:** Wie viele der 20 wurden richtig zugeordnet? Unter 90 %? Dann erst die Kategorien schärfen.

**Schritt 3 – Stapel mit Sicherheitsangabe:** Alle 200 verarbeiten, jede Zuordnung mit Sicherheit hoch/mittel/niedrig.

**Schritt 4 – Prüfen:** Alle „niedrig" und eine Stichprobe der „hoch" von Hand kontrollieren.`,
            why: 'Schritt 1 und 2 sind unverzichtbar: Ohne Messung an Beispielen weißt du nicht, ob die Automatisierung überhaupt funktioniert.',
            result:
              'Statt 200 Anfragen von Hand prüfst du etwa 30 – und weißt, wie zuverlässig der Rest ist.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Automatisierungs-Check',
          prompt: `Ich überlege, folgende Aufgabe zu automatisieren: [AUFGABE]

Rahmen:
- Häufigkeit: [WIE OFT]
- Aufwand heute: [ZEIT]
- Was passiert bei einem Fehler: [FOLGEN]
- Wer prüft heute das Ergebnis: [WER]

Aufgabe:
1. Welche Automatisierungsstufe (1-5) ist für diesen Fall angemessen?
2. Was spricht dagegen, höher zu gehen?
3. Welche Prüfschritte müsste ich einbauen?
4. Welcher Teil der Aufgabe sollte auf keinen Fall automatisiert werden?
5. Woran würde ich merken, dass die Automatisierung schlechter wird?

Sei konservativ. Empfiehl keine höhere Stufe, als der Fall rechtfertigt.`,
          note: 'Punkt 5 ist der, an den kaum jemand denkt: Automatisierungen verschlechtern sich leise, wenn sich die Eingaben mit der Zeit verändern.',
        },
      ],
    },
  ],
  mistakes: [
    'Automatisieren, bevor die Aufgabe manuell zuverlässig funktioniert.',
    'Keine Stichprobenprüfung einbauen und das Ergebnis blind übernehmen.',
    'Aufgaben mit Außenwirkung ohne menschliche Freigabe automatisieren.',
    'Nicht messen, ob die Automatisierung im Lauf der Zeit schlechter wird.',
  ],
  proTip:
    'Baue in jede Stapelverarbeitung eine **Sicherheitsangabe** ein. Sie verwandelt „ich muss alles prüfen" in „ich muss diese sieben prüfen" – und macht Automatisierung überhaupt erst verantwortbar.',
  task: {
    md: 'Wähle eine wiederkehrende Aufgabe und bestimme mit dem Automatisierungs-Check die passende Stufe. Setze sie eine Stufe **niedriger** um, als der Check vorschlägt, und prüfe, ob das reicht.',
    solution:
      'Meist reicht es. Stufe 2 (Vorlagen) und Stufe 3 (Projekte) decken den allergrößten Teil des Alltagsnutzens ab – mit vollständiger Kontrolle und ohne technischen Aufwand.',
  },
  exercise: {
    scenario:
      'Du willst Kundenantworten automatisch erzeugen und direkt versenden lassen.',
    question: 'Was ist das Problem?',
    options: [
      {
        label: 'Kein Problem, wenn die Qualität stimmt',
        correct: false,
        explain:
          'Die Qualität kann bei 95 % der Fälle stimmen – die restlichen 5 % gehen ungeprüft an echte Kunden.',
      },
      {
        label: 'Außenwirkung ohne menschliche Freigabe – hier fehlt der Prüfschritt',
        correct: true,
        explain:
          'Genau. Erzeugen lassen: ja. Automatisch versenden ohne Freigabe: nein.',
      },
      {
        label: 'Es ist technisch nicht möglich',
        correct: false,
        explain: 'Technisch geht es – die Frage ist, ob man es verantworten kann.',
      },
    ],
  },
  quiz: [
    {
      q: 'Welche Bedingung muss vor dem Automatisieren erfüllt sein?',
      options: [
        {
          label: 'Die Aufgabe funktioniert manuell zuverlässig',
          correct: true,
          explain: 'Sonst automatisierst du einen unzuverlässigen Ablauf.',
        },
        { label: 'Du hast Programmierkenntnisse', correct: false, explain: 'Erst ab Stufe 5 nötig.' },
        { label: 'Die Aufgabe ist kompliziert', correct: false, explain: 'Eher ein Gegenargument.' },
      ],
    },
    {
      q: 'Was ist der Kern einer verantwortbaren Stapelverarbeitung?',
      options: [
        { label: 'Möglichst viele Fälle auf einmal', correct: false, explain: 'Menge ist kein Qualitätsmerkmal.' },
        {
          label: 'Eine Sicherheitsangabe pro Fall, damit du gezielt prüfen kannst',
          correct: true,
          explain: 'Sie macht die Prüfung überhaupt erst machbar.',
        },
        { label: 'Ein besonders kurzes Format', correct: false, explain: 'Nebensache.' },
      ],
    },
    {
      q: 'Worauf musst du bei laufenden Automatisierungen achten?',
      options: [
        { label: 'Auf nichts, sie laufen ja', correct: false, explain: 'Genau das ist die Gefahr.' },
        {
          label: 'Dass sie leise schlechter werden, wenn sich die Eingaben ändern',
          correct: true,
          explain: 'Deshalb regelmäßig Stichproben prüfen.',
        },
        { label: 'Auf die Uhrzeit der Ausführung', correct: false, explain: 'Irrelevant.' },
      ],
    },
  ],
  related: ['workflows', 'api-grundlagen', 'qualitaet-pruefen'],
}
