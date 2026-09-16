import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'dateien-verstehen',
  track: 'files',
  title: 'Dateien verstehen (PDF, Bild, Text)',
  description:
    'Dateien hochladen und gezielt auswerten: PDFs, Fotos, Screenshots, Textdateien – inklusive der typischen Stolperfallen.',
  minutes: 7,
  keywords: ['pdf', 'datei', 'hochladen', 'bild', 'foto', 'screenshot', 'dokument', 'ocr'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Du kannst Claude Dateien geben, statt Text zu kopieren. Er liest sie und arbeitet damit wie mit jedem anderen Kontext.',
        },
        {
          type: 'table',
          head: ['Dateityp', 'Was gut funktioniert', 'Worauf du achten musst'],
          rows: [
            ['**PDF**', 'Verträge, Berichte, Rechnungen, Handbücher', 'Gescannte PDFs ohne Textebene sind schwerer – Qualität prüfen'],
            ['**Bild / Foto**', 'Screenshots, Fotos von Dokumenten, Diagramme, Whiteboards', 'Scharf fotografieren, gerade halten, gutes Licht'],
            ['**Textdatei**', 'Notizen, Protokolle, Exporte, Code', 'Unproblematisch'],
            ['**Tabelle (CSV/Excel)**', 'Zahlen, Listen, Auswertungen', 'Eigene Lektion – siehe *Tabellen analysieren*'],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          md: 'Welche Dateitypen und -größen genau möglich sind, hängt von der jeweiligen Oberfläche und deinem Tarif ab. Wenn eine Datei zu groß ist, teile sie auf oder lade nur die relevanten Seiten hoch.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'list',
          items: [
            '**Kein Copy-Paste mehr.** Ein 40-seitiges PDF hochzuladen dauert Sekunden.',
            '**Layout bleibt erhalten.** Claude sieht Tabellen und Abschnitte im Zusammenhang.',
            '**Fotos funktionieren.** Ein abfotografierter Brief, ein Screenshot einer Fehlermeldung, ein handschriftlicher Zettel.',
            '**Mehrere Dateien gleichzeitig.** Drei Angebote hochladen und vergleichen lassen.',
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
              title: 'Nur hochladen, was nötig ist',
              md: 'Die relevanten Seiten statt des kompletten Ordners. Weniger Material = genauere Antworten und weniger Datenschutzrisiko.',
            },
            {
              title: 'Die Frage vor oder nach der Datei stellen',
              md: 'Beides geht. Wichtig ist, dass die Frage **konkret** ist – „Was sagst du dazu?" ist keine.',
            },
            {
              title: 'Seitenzahlen und Zitate verlangen',
              md: '„Nenne zu jeder Aussage die Seite." So kannst du im Original nachschlagen.',
            },
            {
              title: 'Bei mehreren Dateien benennen',
              md: '„Datei A ist unser Angebot, Datei B das der Konkurrenz." Sonst weiß Claude nicht, was was ist.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'PDF gezielt auswerten',
          prompt: `Ich habe dir ein PDF hochgeladen.

Meine Rolle: [WER BIN ICH IN DIESER SACHE?]
Mein Ziel: [WAS MUSS ICH ENTSCHEIDEN ODER WISSEN?]

Aufgabe:
1. Gib mir zuerst eine Landkarte: Welche Abschnitte gibt es, worum geht es jeweils in einem Satz?
2. Beantworte dann gezielt: [DEINE FRAGE]
3. Nenne zu jeder Aussage die Seitenzahl.
4. Sag ausdrücklich, wenn etwas im Dokument nicht beantwortet wird.

Format: Stichpunkte, keine Einleitung.`,
          note: 'Die „Landkarte" in Schritt 1 lohnt sich ab etwa 10 Seiten: Du siehst sofort, welcher Teil für dich relevant ist.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wenn ein PDF nur ein Bild ist',
          blocks: [
            {
              type: 'text',
              md: 'Manche PDFs sind eingescannte Papierdokumente – darin steckt kein echter Text, sondern nur ein Bild pro Seite. Claude kann das lesen, aber die Genauigkeit hängt stark von der Scanqualität ab.',
            },
            {
              type: 'list',
              items: [
                'Prüfe, ob du im PDF Text markieren kannst. Geht das nicht, ist es ein Scan.',
                'Bei Scans: **immer Zahlen gegenprüfen.** Eine 3 und eine 8 verwechseln sich leicht.',
                'Besser scannen: gerade, hell, hohe Auflösung. Das bringt mehr als jeder Prompt-Trick.',
                'Als Test: *„Lies mir die Kopfzeile und die erste Tabellenzeile wörtlich vor."* Stimmt das, stimmt meist auch der Rest.',
              ],
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
          title: 'Beispiel anzeigen: Drei Angebote vergleichen',
          example: {
            task: 'Du hast drei PDF-Angebote für dieselbe Leistung und musst entscheiden.',
            bad: 'Alle drei hochladen und fragen: `Welches ist am besten?`',
            good: `\`Ich habe dir 3 Angebote hochgeladen:
- Angebot A: [Firma 1]
- Angebot B: [Firma 2]
- Angebot C: [Firma 3]

Aufgabe:
1. Tabelle mit den Spalten: Anbieter | Gesamtpreis | Enthaltene Leistungen | Nicht enthalten | Lieferzeit | Zahlungsbedingungen
2. Markiere alles, was sich zwischen den Angeboten unterscheidet.
3. Nenne 3 Punkte, die in mindestens einem Angebot unklar bleiben.
4. Empfehlung in 3 Sätzen – und unter welcher Bedingung du anders entscheiden würdest.

Wichtig: Wenn eine Angabe in einem Angebot fehlt, schreib "nicht angegeben" statt zu schätzen.\``,
            why: 'Die Spalte „Nicht enthalten" ist meist entscheidend – dort verstecken sich die Preisunterschiede. Punkt 3 findet die Stellen, bei denen du nachfragen musst.',
            result:
              'Eine Vergleichstabelle, aus der hervorgeht, warum das billigste Angebot am Ende teurer sein könnte.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Foto eines Dokuments auswerten',
          prompt: `Ich habe ein Foto eines Dokuments hochgeladen.

Aufgabe:
1. Gib den Text wieder, den du erkennen kannst.
2. Markiere Stellen, die du nicht sicher lesen kannst, mit [UNSICHER].
3. Beantworte dann: [DEINE FRAGE]

Wichtig: Rate keine Zahlen. Wenn eine Ziffer unklar ist, schreib [UNSICHER] statt einer Vermutung.`,
          note: 'Die `[UNSICHER]`-Markierung ist bei Fotos und Scans unverzichtbar – besonders bei Beträgen, Daten und Kontonummern.',
        },
      ],
    },
  ],
  mistakes: [
    'Ein 300-Seiten-Dokument hochladen, obwohl nur Kapitel 4 relevant ist.',
    'Bei mehreren Dateien nicht sagen, welche welche ist.',
    'Zahlen aus Scans und Fotos ungeprüft übernehmen.',
    'Vertrauliche Dokumente hochladen, ohne vorher zu anonymisieren oder die Regeln zu klären.',
  ],
  proTip:
    'Bei wichtigen Dokumenten: Lass dir am Ende eine **Prüfliste** geben – *„Welche 5 Angaben sollte ich im Original nachschlagen, bevor ich das verwende?"* Das macht die Kontrolle konkret statt diffus.',
  task: {
    md: 'Lade ein mehrseitiges Dokument hoch (anonymisiert) und lass zuerst eine Landkarte erstellen. Wähle dann einen Abschnitt und stelle drei gezielte Fragen mit Zitatpflicht. Prüfe zwei Zitate im Original.',
    solution:
      'Der Zweischritt aus Landkarte und gezielter Frage ist bei allem ab etwa 10 Seiten deutlich schneller und genauer, als das gesamte Dokument in einem Rutsch analysieren zu lassen.',
  },
  exercise: {
    scenario:
      'Du lädst ein eingescanntes PDF hoch, in dem du keinen Text markieren kannst.',
    question: 'Worauf musst du besonders achten?',
    options: [
      {
        label: 'Auf nichts Besonderes – Scans funktionieren genauso gut',
        correct: false,
        explain:
          'Nein. Bei Scans gibt es keine Textebene; die Erkennung hängt an der Bildqualität.',
      },
      {
        label: 'Zahlen und Namen gegenprüfen und unsichere Stellen markieren lassen',
        correct: true,
        explain:
          'Genau. Verwechslungen bei Ziffern sind das typische Risiko – eine `[UNSICHER]`-Markierung macht sie sichtbar.',
      },
      {
        label: 'Das PDF vorher ausdrucken',
        correct: false,
        explain: 'Bringt nichts.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was solltest du bei mehreren hochgeladenen Dateien immer tun?',
      options: [
        {
          label: 'Sie benennen und zuordnen',
          correct: true,
          explain: '„Datei A ist unser Angebot, Datei B das der Konkurrenz."',
        },
        { label: 'Sie nacheinander hochladen', correct: false, explain: 'Nicht nötig.' },
        { label: 'Sie in ein PDF zusammenführen', correct: false, explain: 'Meist unnötiger Aufwand.' },
      ],
    },
    {
      q: 'Was bringt die „Landkarte" bei langen Dokumenten?',
      options: [
        { label: 'Sie verkürzt das Dokument', correct: false, explain: 'Sie strukturiert es nur.' },
        {
          label: 'Du siehst, welcher Abschnitt für deine Frage relevant ist',
          correct: true,
          explain: 'Danach kannst du gezielt und genauer analysieren.',
        },
        { label: 'Sie ersetzt das Lesen komplett', correct: false, explain: 'Bei Wichtigem prüfst du weiterhin selbst.' },
      ],
    },
    {
      q: 'Wie schützt du dich vor falsch gelesenen Zahlen in Scans?',
      options: [
        {
          label: 'Unsichere Stellen markieren lassen und im Original prüfen',
          correct: true,
          explain: 'Die `[UNSICHER]`-Regel macht das Risiko sichtbar.',
        },
        { label: 'Größere Schrift verlangen', correct: false, explain: 'Geht nicht.' },
        { label: 'Mehrfach fragen', correct: false, explain: 'Wiederholung ist keine Prüfung.' },
      ],
    },
  ],
  related: ['tabellen-analysieren', 'texte-analysieren', 'sicher-starten'],
}
