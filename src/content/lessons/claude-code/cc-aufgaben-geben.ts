import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-aufgaben-geben',
  track: 'claude-code',
  title: 'Aufgaben geben',
  description:
    'Wie du Aufträge in Claude Code formulierst: mit Plan-Zuerst-Regel, klarem Umfang und Abbruchbedingung.',
  minutes: 6,
  keywords: ['aufgabe', 'auftrag', 'prompt', 'plan', 'umfang', 'anweisung'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein guter Claude-Code-Auftrag unterscheidet sich vom Chat-Prompt in drei Punkten: **Umfang begrenzen**, **Plan zuerst**, **Abbruchbedingung**.',
        },
        {
          type: 'table',
          head: ['Element', 'Warum es hier wichtiger ist als im Chat'],
          rows: [
            ['**Umfang**', 'Im Chat entsteht Text. Hier werden Dateien verändert.'],
            ['**Plan zuerst**', 'Du willst sehen, was passieren soll, bevor es passiert.'],
            ['**Abbruchbedingung**', 'Bei Unklarheit soll gefragt, nicht geraten werden.'],
            ['**Verbotszone**', 'Ordner und Dateien, die nicht angefasst werden dürfen.'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'compare',
          badTitle: 'Offener Auftrag',
          badMd:
            '`Mach die Website besser.`\n\nClaude muss selbst entscheiden, was „besser" heißt, welche Dateien betroffen sind und wie weit er gehen soll. Das Ergebnis kann alles zwischen einer Tippfehlerkorrektur und einem Komplettumbau sein.',
          goodTitle: 'Begrenzter Auftrag',
          goodMd:
            '`Sieh dir nur die Datei inhalte/leistungen.md an.\n\nAufgabe: Die Texte sind zu lang und zu werblich. Kürze jeden Abschnitt auf maximal 4 Sätze, sachlicher Ton, keine Superlative.\n\nZeig mir zuerst deinen Plan: Welche Abschnitte, welche Kürzung. Ändere noch nichts.\n\nWenn du unsicher bist, ob eine Information wichtig ist: frag nach, statt sie zu streichen.`',
          why: 'Eine Datei, eine klare Änderung, ein Plan vorab, eine Abbruchbedingung. Das Ergebnis ist vorhersehbar.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Standardvorlage für Claude-Code-Aufträge',
          prompt: `Aufgabe:
[WAS SOLL GETAN WERDEN]

Umfang:
- Nur diese Dateien/Ordner: [LISTE]
- Nicht anfassen: [WAS TABU IST]

Vorgehen:
1. Sieh dir zuerst an, was relevant ist.
2. Zeig mir deinen Plan: welche Dateien, welche Änderung, warum.
3. Warte auf mein OK.
4. Erst dann umsetzen.

Regeln:
- Keine Dateien löschen.
- Keine neuen Abhängigkeiten oder Werkzeuge ohne Rückfrage.
- Bei Unklarheit: nachfragen statt annehmen.
- Erkläre Änderungen in einfacher Sprache.

Fertig ist die Aufgabe, wenn:
[ABSCHLUSSKRITERIUM]`,
          note: 'Diese Vorlage wirkt umständlich – bis zum ersten Mal, wo sie eine unerwünschte Änderung an 30 Dateien verhindert.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Klein anfangen',
              md: 'Eine Datei, eine Änderung. Erst wenn das zuverlässig klappt, größer werden.',
            },
            {
              title: 'Plan lesen, nicht überfliegen',
              md: 'Der Plan ist der günstigste Moment für eine Korrektur. Danach wird es teurer.',
            },
            {
              title: 'Nach der Umsetzung prüfen',
              md: '`git diff` ansehen – dazu die nächste Lektion.',
            },
            {
              title: 'Erst dann die nächste Aufgabe',
              md: 'Nicht drei Aufgaben stapeln und am Ende prüfen. Dann weißt du nicht mehr, welche Änderung woher kommt.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Formulierungen, die zuverlässig wirken',
          blocks: [
            {
              type: 'list',
              items: [
                '**„Zeig mir zuerst den Plan, ändere noch nichts."** – die wichtigste Zeile überhaupt.',
                '**„Nur diese eine Datei."** – begrenzt den Wirkungsbereich.',
                '**„Lösche nichts, verschiebe es nach `alt/`."** – macht jede Aktion umkehrbar.',
                '**„Bei Unklarheit nachfragen statt annehmen."** – verhindert stillschweigende Entscheidungen.',
                '**„Erkläre jede Änderung in einem Satz auf Deutsch."** – du verstehst, wozu du zustimmst.',
                '**„Fasse am Ende zusammen, was du geändert hast."** – deine Prüfliste.',
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
          title: 'Beispiel anzeigen: Mehrere Dateien sicher ändern',
          example: {
            task: 'Eine Telefonnummer hat sich geändert und steht in mehreren Dateien.',
            bad: '`Ersetze überall die alte Telefonnummer durch die neue.`\n→ Trifft womöglich auch Archivdateien, Rechnungen oder alte Fassungen, in denen die alte Nummer richtig bleiben muss.',
            good: `\`Aufgabe: Die Telefonnummer 0123-4567 wurde durch 0123-9999 ersetzt.

Schritt 1 – nur suchen, nichts ändern:
Zeig mir jede Fundstelle: Datei, Zeile und den Satz drumherum.

Umfang:
- Nur im Ordner inhalte/
- Ordner alt/ und archiv/ nicht anfassen

Schritt 2 kommt, wenn ich die Liste geprüft habe.\``,
            why: 'Die Fundstellenliste mit Kontext ist entscheidend: Du siehst sofort, an welchen Stellen die Ersetzung falsch wäre.',
            result:
              '23 Fundstellen. Zwei davon stehen in einem historischen Zitat – die schließt du aus. Dann wird ersetzt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Erst suchen, dann ändern',
          prompt: `Ich möchte [ÄNDERUNG] durchführen.

Schritt 1 – nur suchen und berichten:
1. In welchen Dateien kommt [DAS ZU ÄNDERNDE] vor?
2. Zeig mir zu jeder Fundstelle den Satz oder Abschnitt drumherum.
3. Gibt es Stellen, an denen die Änderung NICHT stimmen würde?

Umfang: nur [ORDNER/DATEIEN]
Nicht anfassen: [TABU]

Ändere in diesem Schritt nichts. Ich prüfe die Liste und sage dir dann, was geändert werden soll.`,
          note: 'Punkt 3 ist der wertvollste: Claude findet oft selbst die Stellen, an denen eine pauschale Ersetzung schiefginge.',
        },
      ],
    },
  ],
  mistakes: [
    'Aufträge ohne Umfangsbegrenzung geben.',
    'Den Plan überfliegen statt lesen.',
    'Mehrere Aufgaben hintereinander laufen lassen und erst am Ende prüfen.',
    'Vergessen zu sagen, welche Ordner tabu sind.',
  ],
  proTip:
    'Formuliere Löschungen immer als Verschieben: *"Lösche nichts – verschiebe es nach `alt/`."* Dadurch ist jede Aktion umkehrbar, auch ohne Git.',
  task: {
    md: 'Formuliere einen echten Claude-Code-Auftrag mit der Standardvorlage. Achte darauf, dass Umfang, Tabuzone und Abschlusskriterium ausgefüllt sind. Lass dir den Plan zeigen und prüfe ihn – setze noch nichts um.',
    solution:
      'Wenn der Plan Dateien enthält, die du nicht erwartet hast, war dein Umfang zu weit gefasst. Präzisiere ihn und lass den Plan neu erstellen – das ist der günstigste Zeitpunkt für diese Korrektur.',
  },
  exercise: {
    scenario: 'Du willst eine Änderung in vielen Dateien durchführen.',
    question: 'Was ist der sichere erste Schritt?',
    options: [
      {
        label: 'Die Änderung direkt beauftragen – Claude findet die Stellen schon',
        correct: false,
        explain:
          'Er findet sie – aber auch die, an denen die Änderung falsch wäre. Ohne Prüfung merkst du das nicht.',
      },
      {
        label: 'Erst die Fundstellen mit Kontext auflisten lassen, ohne zu ändern',
        correct: true,
        explain:
          'Du prüfst die Liste, schließt die Ausnahmen aus – und erst dann wird geändert.',
      },
      {
        label: 'Eine Datei nach der anderen manuell durchgehen',
        correct: false,
        explain: 'Funktioniert, verschenkt aber genau den Vorteil von Claude Code.',
      },
    ],
  },
  quiz: [
    {
      q: 'Welche Zeile gehört in fast jeden Claude-Code-Auftrag?',
      options: [
        {
          label: '„Zeig mir zuerst den Plan, ändere noch nichts."',
          correct: true,
          explain: 'Der günstigste Moment für Korrekturen.',
        },
        { label: '„Arbeite schnell."', correct: false, explain: 'Ohne Wirkung.' },
        { label: '„Sei kreativ."', correct: false, explain: 'Bei Dateiänderungen selten erwünscht.' },
      ],
    },
    {
      q: 'Wie machst du Löschungen umkehrbar?',
      options: [
        {
          label: 'Als Verschieben nach `alt/` formulieren',
          correct: true,
          explain: 'Nichts ist weg, alles ist auffindbar.',
        },
        { label: 'Gar nicht', correct: false, explain: 'Doch, sehr einfach sogar.' },
        { label: 'Durch Umbenennen der Dateien', correct: false, explain: 'Unübersichtlich.' },
      ],
    },
    {
      q: 'Warum nicht mehrere Aufgaben hintereinander laufen lassen?',
      options: [
        { label: 'Weil es zu lange dauert', correct: false, explain: 'Nicht der Grund.' },
        {
          label: 'Weil du am Ende nicht mehr weißt, welche Änderung woher kommt',
          correct: true,
          explain: 'Prüfen wird dadurch schwierig bis unmöglich.',
        },
        { label: 'Weil Claude durcheinanderkommt', correct: false, explain: 'Das Problem liegt bei der Prüfbarkeit.' },
      ],
    },
  ],
  related: ['cc-dateien-analysieren', 'cc-aenderungen', 'cc-aenderungen-pruefen'],
}
