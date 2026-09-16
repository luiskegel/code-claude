import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'grosse-projekte',
  track: 'advanced',
  title: 'Große Projekte',
  description:
    'Wenn mehrere Menschen, viele Dokumente und Wochen an Arbeit zusammenkommen: Struktur, Gedächtnis und Qualitätssicherung.',
  minutes: 7,
  keywords: ['projekt', 'team', 'groß', 'koordination', 'dokumentation', 'struktur', 'langfristig'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ab einer gewissen Größe ist das Problem nicht mehr die Qualität einzelner Antworten, sondern **Zusammenhalt**: dass alle mit demselben Stand arbeiten.',
        },
        {
          type: 'table',
          head: ['Problem in großen Projekten', 'Lösung'],
          rows: [
            ['Jeder erklärt Claude etwas anderes', 'Gemeinsames Projekt mit festen Anweisungen'],
            ['Der Stand ist über 40 Chats verteilt', 'Ein gepflegtes Standdokument'],
            ['Entscheidungen werden vergessen', 'Entscheidungsprotokoll mit Datum und Begründung'],
            ['Ergebnisse passen nicht zusammen', 'Fester Prüfschritt gegen gemeinsame Vorgaben'],
            ['Neue Leute brauchen Wochen', 'Übergabedokument aus dem Projektwissen'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die typische Entwicklung: In Woche 1 läuft alles gut. In Woche 5 stellt jemand fest, dass zwei Teile des Projekts auf unterschiedlichen Annahmen beruhen – und niemand weiß mehr, wer wann was entschieden hat.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Der Kern',
          md: 'Das wichtigste Dokument in einem großen Projekt ist nicht das Ergebnis, sondern der **aktuelle Stand**: was gilt, was ist entschieden, was ist offen.',
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
              title: 'Gemeinsames Projekt anlegen',
              md: 'Ein Projekt für alle Beteiligten, mit denselben Anweisungen und demselben Wissen. So entstehen keine abweichenden Auslegungen.',
            },
            {
              title: 'Standdokument führen',
              md: 'Eine Datei, die den aktuellen Stand enthält. Wird nach jeder Etappe aktualisiert und liegt im Projektwissen.',
            },
            {
              title: 'Entscheidungen protokollieren',
              md: 'Was, wann, warum, von wem. Der „warum"-Teil ist der wertvollste – er verhindert, dass dieselbe Diskussion dreimal geführt wird.',
            },
            {
              title: 'Regelmäßig auf Widersprüche prüfen',
              md: 'Ein fester Termin: Stand, Entscheidungen und Ergebnisse gegeneinander prüfen lassen.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Standdokument aktualisieren',
          prompt: `Hier ist unser bisheriges Standdokument und die Ergebnisse der letzten Etappe.

Aufgabe:
1. Aktualisiere das Standdokument.
2. Markiere alles, was sich seit der letzten Fassung geändert hat.
3. Nenne Entscheidungen, die jetzt neu getroffen wurden – mit Begründung.
4. Nenne Punkte, die nicht mehr offen sind.
5. Nenne neue offene Punkte.
6. Prüfe auf Widersprüche zu früheren Festlegungen.

Format:
## Gilt aktuell
## Entschieden (mit Datum und Begründung)
## Offen
## Nächste Schritte
## Widersprüche und Klärungsbedarf

Erfinde nichts. Was nicht aus dem Material hervorgeht, gehört unter "Offen".`,
          note: 'Punkt 6 ist der wichtigste – Widersprüche in großen Projekten entstehen leise und fallen erst spät auf.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Übergabe an neue Beteiligte',
          blocks: [
            {
              type: 'prompt',
              title: 'Einarbeitungsdokument erzeugen',
              prompt: `Erstelle aus unserem Projektwissen ein Einarbeitungsdokument für jemanden, der neu dazustößt.

Aufbau:
1. Worum geht es? (5 Sätze)
2. Wo stehen wir? (aktueller Stand)
3. Was ist bereits entschieden – und warum? (die wichtigsten 10)
4. Welche Begriffe verwenden wir wie?
5. Was ist gerade in Arbeit und von wem?
6. Was sollte man auf keinen Fall anfassen, ohne vorher zu fragen?
7. Die 5 Fragen, die Neue typischerweise stellen – mit Antwort.

Zielgruppe: fachlich kompetent, kennt aber unser Projekt nicht.
Was du nicht sicher weißt, markiere mit [KLÄREN].`,
              note: 'Punkt 6 und 7 sind das, was sonst nur mündlich weitergegeben wird – und deshalb bei jeder Übergabe verloren geht.',
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
          title: 'Beispiel anzeigen: Widerspruch früh finden',
          example: {
            task: 'Ein Projekt läuft seit sechs Wochen mit drei Beteiligten.',
            bad: 'Weiterarbeiten und hoffen, dass alles zusammenpasst. In Woche 9 fällt auf, dass Teil A von einem anderen Liefertermin ausgeht als Teil B.',
            good: `Wöchentlich, 5 Minuten:

\`Hier ist unser Standdokument und die Ergebnisse dieser Woche.

Prüfe ausschließlich auf Widersprüche:
1. Widersprechen sich zwei Festlegungen?
2. Geht ein Teil von einer Annahme aus, die woanders anders lautet?
3. Werden dieselben Begriffe unterschiedlich verwendet?
4. Gibt es Termine oder Zahlen, die nicht zueinander passen?

Nenne nur Widersprüche mit Fundstelle. Keine Bewertung, keine Vorschläge.\``,
            why: 'Ein enger Prüfauftrag („nur Widersprüche, mit Fundstelle") liefert eine kurze, konkrete Liste statt einer allgemeinen Einschätzung.',
            result:
              'Widersprüche werden in Woche 6 gefunden statt in Woche 9 – und kosten dann Minuten statt Tage.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Entscheidungsprotokoll',
          prompt: `Erstelle einen Eintrag für unser Entscheidungsprotokoll.

Entscheidung: [WAS WURDE ENTSCHIEDEN]
Datum: [DATUM]
Beteiligte: [WER]

Aufgabe – ergänze aus unserem Gespräch:
1. Welche Alternativen standen zur Wahl?
2. Warum haben wir uns so entschieden?
3. Welche Annahmen liegen der Entscheidung zugrunde?
4. Was müsste eintreten, damit wir sie überdenken?
5. Welche anderen Festlegungen hängen von dieser ab?

Format: kompakt, maximal eine halbe Seite.
Was aus dem Gespräch nicht hervorgeht, markiere mit [KLÄREN].`,
          note: 'Punkt 4 ist der, der Projekte rettet: Er macht sichtbar, wann eine alte Entscheidung ungültig geworden ist.',
        },
      ],
    },
  ],
  mistakes: [
    'Kein gemeinsames Projekt nutzen – dann arbeitet jeder mit eigenen Annahmen.',
    'Entscheidungen ohne Begründung festhalten. Drei Wochen später weiß niemand mehr, warum.',
    'Den Stand nur in Chats haben statt in einem gepflegten Dokument.',
    'Widersprüche erst suchen, wenn etwas schiefgegangen ist.',
  ],
  proTip:
    'Führe für jedes große Projekt genau **eine** Datei „Stand.md". Sie enthält: gilt aktuell / entschieden / offen / nächste Schritte. Sie ist der erste Anhang in jedem neuen Gespräch – und das gesamte Projektgedächtnis.',
  task: {
    md: 'Erstelle für ein laufendes Vorhaben ein Standdokument nach der Vorlage. Lass es anschließend gegen deine bisherigen Unterlagen auf Widersprüche prüfen.',
    solution:
      'Fast immer tauchen zwei bis drei Punkte auf, die „eigentlich klar" waren, aber nirgends festgehalten wurden – und die verschiedene Beteiligte unterschiedlich im Kopf hatten.',
  },
  exercise: {
    scenario: 'Drei Personen arbeiten im selben Projekt mit Claude, jede in eigenen Chats.',
    question: 'Was ist das größte Risiko?',
    options: [
      {
        label: 'Zu hohe Kosten',
        correct: false,
        explain: 'Nicht das Hauptproblem.',
      },
      {
        label: 'Abweichende Annahmen, die erst spät auffallen',
        correct: true,
        explain:
          'Ohne gemeinsames Projektwissen und Standdokument driften die Arbeitsstände auseinander.',
      },
      {
        label: 'Claude wird langsamer',
        correct: false,
        explain: 'Spielt keine Rolle.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist das wichtigste Dokument in einem großen Projekt?',
      options: [
        {
          label: 'Das Standdokument: was gilt, was ist entschieden, was ist offen',
          correct: true,
          explain: 'Es ist das Projektgedächtnis.',
        },
        { label: 'Der Projektplan von Woche 1', correct: false, explain: 'Veraltet meist schnell.' },
        { label: 'Die längste Chat-Historie', correct: false, explain: 'Unbrauchbar als Referenz.' },
      ],
    },
    {
      q: 'Welcher Teil eines Entscheidungsprotokolls ist am wertvollsten?',
      options: [
        { label: 'Das Datum', correct: false, explain: 'Nützlich, aber nicht entscheidend.' },
        {
          label: 'Die Begründung und die zugrunde liegenden Annahmen',
          correct: true,
          explain: 'Sie verhindern Wiederholungsdiskussionen und zeigen, wann die Entscheidung ungültig wird.',
        },
        { label: 'Die Liste der Anwesenden', correct: false, explain: 'Sekundär.' },
      ],
    },
    {
      q: 'Wie findest du Widersprüche rechtzeitig?',
      options: [
        {
          label: 'Mit einem engen, regelmäßigen Prüfauftrag („nur Widersprüche, mit Fundstelle")',
          correct: true,
          explain: 'Kurz, konkret, wöchentlich – das reicht.',
        },
        { label: 'Durch längere Meetings', correct: false, explain: 'Selten wirksam.' },
        { label: 'Gar nicht, das ist unvermeidbar', correct: false, explain: 'Doch – frühzeitig und günstig.' },
      ],
    },
  ],
  related: ['projekte-wissenskontext', 'lange-aufgaben', 'workflows'],
}
