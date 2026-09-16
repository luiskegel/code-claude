import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-aenderungen',
  track: 'claude-code',
  title: 'Änderungen durchführen lassen',
  description:
    'Der Schritt, an dem tatsächlich etwas passiert – mit einem Ablauf, der ihn ungefährlich macht.',
  minutes: 6,
  keywords: ['ändern', 'bearbeiten', 'umsetzen', 'schreiben', 'zustimmen', 'genehmigen'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Jetzt wird geschrieben. Der sichere Ablauf hat immer dieselben fünf Schritte – und keiner davon wird übersprungen.',
        },
        {
          type: 'steps',
          items: [
            { title: '1. Sichern', md: '`git commit` oder Ordnerkopie. Vorher, nicht nachher.' },
            { title: '2. Plan anfordern', md: '„Zeig mir, was du ändern willst. Ändere noch nichts."' },
            { title: '3. Plan prüfen', md: 'Sind die richtigen Dateien dabei? Ist der Umfang richtig?' },
            { title: '4. Umsetzen lassen', md: 'Erst nach deinem OK.' },
            { title: '5. Ergebnis prüfen', md: '`git diff` und, wenn möglich, ausprobieren.' },
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
          title: 'Was hier anders ist als im Chat',
          md: 'Im Chat ist ein schlechtes Ergebnis ein Text, den du wegwirfst. Hier ist es eine Datei, die überschrieben wurde. Der Unterschied ist nicht die Wahrscheinlichkeit eines Fehlers – sondern was er kostet.',
        },
        {
          type: 'text',
          md: 'Deshalb: Schritt 1 und 5 sind nicht optional. Sie sind das, was diesen Arbeitsablauf überhaupt verantwortbar macht.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Änderung mit vollem Ablauf',
          prompt: `Aufgabe: [WAS GEÄNDERT WERDEN SOLL]

Umfang:
- Nur: [DATEIEN/ORDNER]
- Nicht anfassen: [TABU]

Ablauf:
1. Zeig mir zuerst einen Plan:
   - Welche Dateien änderst du?
   - Was genau änderst du in jeder Datei?
   - Warum ist das nötig?
2. Warte auf mein OK.
3. Setze dann um.
4. Fasse am Ende zusammen, was du tatsächlich geändert hast.

Regeln:
- Keine Datei löschen. Wenn etwas weg soll: nach alt/ verschieben.
- Keine Änderungen an Dateien, die ich nicht genannt habe.
- Wenn du feststellst, dass mehr Dateien betroffen sind als gedacht: halte an und sag es mir.
- Erkläre jede Änderung in einem Satz auf Deutsch.`,
          note: 'Die vierte Regel ist die wichtigste: Sie fängt genau den Fall ab, in dem eine kleine Aufgabe größer wird als geplant.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Große Änderungen in Etappen',
          blocks: [
            {
              type: 'text',
              md: 'Wenn eine Änderung viele Dateien betrifft, mach sie nicht in einem Zug. Teile sie:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                '**Erst eine Datei als Muster.** Prüfen, ob das Ergebnis genau so aussieht, wie du willst.',
                '**Dann fünf weitere.** Wieder prüfen. Stimmt das Muster auch bei Sonderfällen?',
                '**Dann der Rest.** Jetzt weißt du, dass das Vorgehen trägt.',
                '**Nach jeder Etappe committen.** So bleibt jeder Zwischenstand erreichbar.',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              md: 'Diese Aufteilung kostet drei Minuten mehr und verhindert den Fall „40 Dateien einheitlich falsch geändert".',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Wann du „nein" sagen solltest',
          md: 'Lehne ab, wenn der Plan Dateien enthält, die du nicht genannt hast; wenn etwas gelöscht werden soll; wenn Befehle ausgeführt werden sollen, die du nicht verstehst; oder wenn der Umfang deutlich größer ist als erwartet. **Ablehnen ist kostenlos. Zurückbauen nicht.**',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Wenn der Plan überrascht',
          example: {
            task: 'Du bittest darum, in einer Textdatei die Überschriften zu vereinheitlichen.',
            bad: 'Zustimmen, ohne den Plan zu lesen. Danach stellst du fest, dass auch eine Konfigurationsdatei angefasst wurde, weil dort ebenfalls Überschriften vorkamen.',
            good: `Plan gelesen. Er enthält:
- \`inhalte/leistungen.md\` ✓ erwartet
- \`inhalte/ueber-uns.md\` ✓ erwartet
- \`config/menue.json\` ✗ nicht erwartet

Antwort: \`Stopp. config/menue.json soll nicht geändert werden – das ist keine Inhaltsdatei. Erkläre mir zuerst, warum du sie einbeziehen wolltest. Danach entscheiden wir.\``,
            why: 'Die Erklärung ist wichtiger als das bloße Ablehnen: Vielleicht hängen die Überschriften im Menü tatsächlich mit den Dateien zusammen. Dann ist es eine andere Aufgabe – die du bewusst beauftragst.',
            result:
              'Entweder du schließt die Datei aus, oder du erweiterst die Aufgabe bewusst. In beiden Fällen entscheidest du.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Übe das in einem **Testordner**: Lege drei Textdateien an, sichere den Stand mit Git, und lass eine kleine Änderung in allen dreien durchführen – mit Plan-zuerst-Regel.',
        },
        {
          type: 'prompt',
          title: 'Übungsauftrag',
          prompt: `In diesem Testordner liegen drei Textdateien.

Aufgabe: Ergänze in jeder Datei ganz oben eine Zeile mit dem Dateinamen als Überschrift.

Ablauf:
1. Zeig mir zuerst, wie das in jeder Datei aussehen würde.
2. Warte auf mein OK.
3. Setz es dann um.
4. Fasse zusammen, was du geändert hast.

Ändere sonst nichts an den Dateien.`,
          note: 'Danach `git diff` ansehen. So siehst du die Änderung genau so, wie du sie später bei echten Aufgaben prüfen wirst.',
        },
      ],
    },
  ],
  mistakes: [
    'Ohne vorherige Sicherung ändern lassen.',
    'Den Plan bestätigen, ohne die Dateiliste zu prüfen.',
    'Große Änderungen in einem Zug statt in Etappen.',
    'Nach der Umsetzung nicht prüfen, weil die Zusammenfassung gut klang.',
  ],
  proTip:
    'Wenn eine Änderung viele Dateien betrifft: Lass **eine Datei als Muster** machen und prüfe sie gründlich. Erst wenn das Muster stimmt, lass den Rest laufen. Das ist der wirksamste Schutz vor „alles einheitlich falsch".',
  task: {
    md: 'Führe eine echte, kleine Änderung mit dem vollständigen Fünf-Schritte-Ablauf durch. Halte fest, an welcher Stelle du beinahe einen Schritt übersprungen hättest.',
    solution:
      'Am häufigsten wird Schritt 5 übersprungen – die Prüfung nach der Umsetzung. Die Zusammenfassung von Claude klingt überzeugend, ersetzt aber `git diff` nicht: Sie beschreibt, was gemeint war, nicht zwingend, was passiert ist.',
  },
  exercise: {
    scenario:
      'Der Plan enthält eine Datei, die du gar nicht genannt hattest.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Zustimmen – Claude wird einen Grund haben',
        correct: false,
        explain:
          'Vielleicht. Aber du hast den Umfang festgelegt, und Abweichungen davon gehören besprochen.',
      },
      {
        label: 'Anhalten und nach der Begründung fragen, dann entscheiden',
        correct: true,
        explain:
          'Manchmal ist der Grund gut und du erweiterst die Aufgabe bewusst. Manchmal ist es ein Missverständnis. Beides klärt sich in 30 Sekunden.',
      },
      {
        label: 'Die ganze Aufgabe abbrechen',
        correct: false,
        explain: 'Überreaktion – nachfragen reicht.',
      },
    ],
  },
  quiz: [
    {
      q: 'Welcher Schritt kommt vor allen anderen?',
      options: [
        { label: 'Sichern', correct: true, explain: 'Vorher, nicht nachher – sonst sicherst du den kaputten Stand.' },
        { label: 'Plan anfordern', correct: false, explain: 'Kommt direkt danach.' },
        { label: 'Umsetzen', correct: false, explain: 'Erst an vierter Stelle.' },
      ],
    },
    {
      q: 'Wie gehst du bei Änderungen an vielen Dateien vor?',
      options: [
        {
          label: 'Erst eine Datei als Muster, prüfen, dann der Rest',
          correct: true,
          explain: 'Verhindert „alles einheitlich falsch".',
        },
        { label: 'Alle auf einmal', correct: false, explain: 'Riskant.' },
        { label: 'Eine nach der anderen einzeln beauftragen', correct: false, explain: 'Unnötig mühsam – nach dem Muster geht der Rest im Block.' },
      ],
    },
    {
      q: 'Ersetzt Claudes Zusammenfassung die eigene Prüfung?',
      options: [
        { label: 'Ja, wenn sie detailliert ist', correct: false, explain: 'Nein.' },
        {
          label: 'Nein – sie beschreibt die Absicht, `git diff` zeigt das Ergebnis',
          correct: true,
          explain: 'Deshalb bleibt Schritt 5 Pflicht.',
        },
        { label: 'Nur bei kleinen Änderungen', correct: false, explain: 'Gerade dort ist Prüfen ja billig.' },
      ],
    },
  ],
  related: ['cc-aenderungen-pruefen', 'cc-aufgaben-geben', 'cc-projekt'],
}
