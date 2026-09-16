import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'zusammenfassungen',
  track: 'work',
  title: 'Zusammenfassungen',
  description:
    'Die häufigste Claude-Aufgabe – und die, bei der die meisten den entscheidenden Zusatz vergessen: wofür du die Zusammenfassung brauchst.',
  minutes: 5,
  keywords: ['zusammenfassen', 'kürzen', 'kernaussagen', 'summary', 'protokoll'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Es gibt keine „richtige" Zusammenfassung. Es gibt nur die richtige **für einen bestimmten Zweck**.',
        },
        {
          type: 'table',
          head: ['Zweck', 'Was in die Zusammenfassung gehört'],
          rows: [
            ['Entscheidung vorbereiten', 'Optionen, Zahlen, Risiken, Empfehlung'],
            ['Kollegin informieren', 'Was sie betrifft, was sie tun muss'],
            ['Selbst später nachlesen', 'Fakten, Quellen, offene Punkte'],
            ['Im Meeting vortragen', 'Wenige Kernaussagen, klare Reihenfolge'],
            ['Prüfen, ob es relevant ist', 'Nur: worum geht es, für wen, wie dringend'],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          md: 'Der Zusatz, der alles verändert: **„Ich brauche das, um …"**. Er kostet sechs Wörter und bestimmt Inhalt, Länge und Reihenfolge der ganzen Antwort.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'compare',
          badTitle: 'Ohne Zweck',
          badMd:
            '`Fasse diesen Bericht zusammen.`\n→ Eine verkleinerte Kopie des Berichts, in derselben Reihenfolge, mit denselben Schwerpunkten. Du musst sie selbst nochmal auswerten.',
          goodTitle: 'Mit Zweck',
          goodMd:
            '`Fasse diesen Bericht zusammen. Ich brauche das, um morgen im Vorstand in 3 Minuten eine Empfehlung zu geben.\n\nFormat:\n- 5 Kernaussagen, je maximal 2 Zeilen\n- 3 Zahlen, die die Entscheidung tragen\n- 2 Risiken\n- 1 Satz Empfehlung`',
          why: 'Der Zweck bestimmt die Auswahl. Ohne ihn wird nach Reihenfolge gekürzt, mit ihm nach Relevanz.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Zweck nennen', md: '„Ich brauche das, um …" – immer.' },
            { title: 'Länge festlegen', md: 'Sonst ist die Zusammenfassung selbst zusammenfassungsbedürftig.' },
            { title: 'Form wählen', md: 'Kernaussagen, Tabelle, Fließtext, Stichpunkte.' },
            {
              title: 'Nichts hinzufügen lassen',
              md: '„Nur was im Dokument steht. Keine Einordnung, keine Ergänzung aus deinem Allgemeinwissen."',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Zusammenfassung mit Zweck',
          prompt: `Fasse das Folgende zusammen.

Ich brauche das, um: [ZWECK]
Zielgruppe: [WER LIEST ES?]

Format:
- [ANZAHL] Kernaussagen, je maximal [X] Zeilen
- [WAS NOCH: ZAHLEN / RISIKEN / AUFGABEN / EMPFEHLUNG]

Regeln:
- Nur Inhalte aus dem Material. Keine Ergänzungen aus deinem Allgemeinwissen.
- Wenn etwas wichtig erscheint, aber unklar bleibt, nenne es unter "Offene Punkte".
- Keine Einleitung, kein Fazit-Absatz.

--- MATERIAL ---
[TEXT]
--- ENDE ---`,
          note: 'Der Abschnitt „Offene Punkte" ist oft der wertvollste – dort steht, was du noch klären musst.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Die Stufen-Zusammenfassung',
          blocks: [
            {
              type: 'text',
              md: 'Bei wichtigen Dokumenten lohnt sich eine Zusammenfassung in drei Tiefen – du wählst dann je nach Situation:',
            },
            {
              type: 'prompt',
              title: 'Drei Tiefen auf einmal',
              prompt: `Fasse das Dokument in drei Stufen zusammen:

1. EIN SATZ – worum geht es im Kern?
2. FÜNF STICHPUNKTE – was muss man wissen?
3. EINE SEITE – was muss man wissen, um mitreden zu können?

Jede Stufe muss für sich allein verständlich sein.`,
              note: 'Stufe 1 für die Betreffzeile, Stufe 2 fürs Meeting, Stufe 3 für die Vorbereitung.',
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
          title: 'Beispiel anzeigen: E-Mail-Verlauf mit 40 Nachrichten',
          example: {
            task: 'Du übernimmst einen Vorgang und musst dich einarbeiten.',
            bad: '`Fasse diesen E-Mail-Verlauf zusammen.`\n→ Eine chronologische Nacherzählung. Fast so lang wie das Original.',
            good: `\`Fasse diesen E-Mail-Verlauf zusammen. Ich übernehme den Vorgang und muss handlungsfähig werden.

Format:
1. Worum geht es? (2 Sätze)
2. Wer ist beteiligt und in welcher Rolle?
3. Was wurde verbindlich zugesagt – von wem, wann?
4. Was ist offen?
5. Was ist der nächste fällige Schritt und bis wann?
6. Wo gab es Konflikte oder Missverständnisse?

Regeln: Chronologie nur, wenn sie für das Verständnis nötig ist. Keine Nacherzählung.\``,
            why: 'Punkt 3 („verbindlich zugesagt") und Punkt 6 („Konflikte") sind die Dinge, die man bei einer Übernahme wirklich braucht – und die in einer Nacherzählung untergehen.',
            result:
              'Eine halbe Seite, nach der du weißt, wo du stehst, wem du was schuldest und wo es hakt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Für Eilige',
          prompt: `Fasse das Folgende so zusammen, dass jemand in 60 Sekunden entscheiden kann, ob er das Original lesen muss.

Format:
- Worum geht es? (1 Satz)
- Für wen ist es relevant? (1 Satz)
- Wie dringend ist es? (1 Satz mit Begründung)
- Wer es lesen sollte, sollte auf diese 2 Stellen achten: ...

Maximal 80 Wörter insgesamt.`,
          note: 'Perfekt für Weiterleitungen: Statt „FYI" schickst du diese vier Zeilen mit.',
        },
      ],
    },
  ],
  mistakes: [
    'Den Zweck nicht nennen – dann wird nach Reihenfolge statt nach Relevanz gekürzt.',
    'Keine Längenvorgabe machen.',
    'Nicht verbieten, dass Allgemeinwissen ergänzt wird. Dann steht in der "Zusammenfassung" etwas, das nie im Dokument stand.',
    'Die Zusammenfassung ungeprüft weiterleiten, obwohl sie Zahlen enthält.',
  ],
  proTip:
    'Bitte immer um einen Abschnitt **„Was ich in dieser Zusammenfassung weggelassen habe"**. Dort siehst du, ob etwas fehlt, das für dich doch wichtig gewesen wäre.',
  task: {
    md: 'Lass ein Dokument zweimal zusammenfassen: einmal ohne Zweckangabe, einmal mit. Vergleiche, welche Informationen jeweils vorne stehen.',
    solution:
      'Ohne Zweck folgt die Zusammenfassung der Struktur des Originals. Mit Zweck steht vorne, was für deine Entscheidung zählt – oft etwas, das im Original auf Seite 7 stand.',
  },
  exercise: {
    scenario: 'Du musst einer Kollegin einen 30-seitigen Bericht weiterleiten.',
    question: 'Was ist die nützlichste Zusammenfassung?',
    options: [
      {
        label: 'Eine gleichmäßige Kurzfassung aller Kapitel',
        correct: false,
        explain: 'Klingt vollständig, hilft aber bei der Frage „betrifft mich das?" nicht weiter.',
      },
      {
        label: 'Worum geht es, für wen ist es relevant, wie dringend – plus die 2 wichtigsten Stellen',
        correct: true,
        explain:
          'Damit kann die Kollegin in 60 Sekunden entscheiden, ob und was sie lesen muss.',
      },
      {
        label: 'Das erste Kapitel als Auszug',
        correct: false,
        explain: 'Zufällige Auswahl – das Wichtige steht selten am Anfang.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist der wichtigste Zusatz bei jeder Zusammenfassung?',
      options: [
        {
          label: 'Der Zweck: „Ich brauche das, um …"',
          correct: true,
          explain: 'Er bestimmt Auswahl, Länge und Reihenfolge.',
        },
        { label: 'Die Uhrzeit', correct: false, explain: 'Irrelevant.' },
        { label: 'Eine höfliche Anrede', correct: false, explain: 'Ohne Wirkung.' },
      ],
    },
    {
      q: 'Warum solltest du Ergänzungen aus dem Allgemeinwissen verbieten?',
      options: [
        {
          label: 'Damit in der Zusammenfassung nichts steht, was nicht im Original war',
          correct: true,
          explain: 'Sonst vermischen sich Dokumentinhalt und allgemeines Wissen unbemerkt.',
        },
        { label: 'Damit sie kürzer wird', correct: false, explain: 'Nur Nebeneffekt.' },
        { label: 'Weil Allgemeinwissen immer falsch ist', correct: false, explain: 'Ist es nicht – es gehört hier nur nicht hinein.' },
      ],
    },
    {
      q: 'Welcher Zusatzabschnitt deckt Lücken auf?',
      options: [
        { label: '„Fazit"', correct: false, explain: 'Wiederholt meist nur.' },
        {
          label: '„Was ich weggelassen habe"',
          correct: true,
          explain: 'Zeigt dir, ob etwas für dich Wichtiges herausgefallen ist.',
        },
        { label: '„Einleitung"', correct: false, explain: 'Kostet nur Platz.' },
      ],
    },
  ],
  related: ['texte-analysieren', 'dateien-verstehen', 'ergebnisse-strukturieren'],
}
