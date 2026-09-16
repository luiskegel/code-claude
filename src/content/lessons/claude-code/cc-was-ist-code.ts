import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-was-ist-code',
  track: 'claude-code',
  title: 'Was ist Code?',
  description:
    'Code für Menschen, die noch nie programmiert haben – und warum du ihn lesen können solltest, auch wenn du ihn nicht schreibst.',
  minutes: 6,
  keywords: ['code', 'programmieren', 'programmiersprache', 'html', 'skript', 'anfänger'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Code ist eine **Anleitung für den Computer**, geschrieben in einer Sprache mit sehr strengen Regeln.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Einfach',
              md: 'Wie ein Kochrezept: Schritt für Schritt, in fester Reihenfolge, mit exakten Mengenangaben. Nur dass der Computer sich wirklich sklavisch daran hält – auch wenn ein Schritt offensichtlich falsch ist.',
            },
            {
              label: 'Ganz einfach',
              md: 'Text, den der Computer versteht und ausführt.',
            },
          ],
        },
        {
          type: 'code',
          lang: 'python',
          caption: 'Code ist oft lesbarer, als man denkt',
          code: `# Diese Zeile ist ein Kommentar - für Menschen, nicht für den Computer

preis = 100
rabatt = 20

endpreis = preis - rabatt

print("Der Endpreis ist:", endpreis)`,
        },
        {
          type: 'text',
          md: 'Auch ohne Vorkenntnisse errätst du, was hier passiert. Genau das ist der Punkt: **Guten Code kann man lesen, auch ohne ihn schreiben zu können.**',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Warum das für dich zählt, obwohl Claude den Code schreibt:',
        },
        {
          type: 'list',
          items: [
            '**Du sollst zustimmen.** Claude Code fragt dich vor Änderungen. Zustimmen kannst du nur sinnvoll, wenn du grob verstehst, was dort steht.',
            '**Du erkennst Warnzeichen.** Ein Befehl, der etwas löscht, sieht anders aus als einer, der etwas anzeigt.',
            '**Du kannst besser fragen.** „Diese Zeile verstehe ich nicht" ist eine bessere Rückmeldung als „funktioniert nicht".',
            '**Du bleibst verantwortlich.** Was auf deinem Rechner läuft, verantwortest du – nicht das Werkzeug.',
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Fünf Bausteine erklären fast jeden Code. Wenn du die erkennst, kannst du mitlesen:',
        },
        {
          type: 'table',
          head: ['Baustein', 'Was er tut', 'Sieht ungefähr so aus'],
          rows: [
            ['**Variable**', 'Merkt sich einen Wert unter einem Namen', '`preis = 100`'],
            ['**Bedingung**', 'Wenn … dann … sonst …', '`if preis > 50:`'],
            ['**Schleife**', 'Mach das für jedes Element', '`for datei in ordner:`'],
            ['**Funktion**', 'Ein benannter Arbeitsschritt zum Wiederverwenden', '`def berechne_preis():`'],
            ['**Kommentar**', 'Erklärung für Menschen, wird ignoriert', '`# Das hier ist ein Kommentar`'],
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Die Bausteine einer Website',
          blocks: [
            {
              type: 'table',
              head: ['Sprache', 'Zuständig für', 'Vergleich'],
              rows: [
                ['**HTML**', 'Inhalt und Struktur', 'Das Skelett – Überschriften, Absätze, Bilder'],
                ['**CSS**', 'Aussehen', 'Die Kleidung – Farben, Schriften, Abstände'],
                ['**JavaScript**', 'Verhalten', 'Die Muskeln – Klicks, Menüs, Reaktionen'],
              ],
            },
            {
              type: 'code',
              lang: 'text',
              caption: 'HTML in seiner einfachsten Form',
              code: `<h1>Willkommen</h1>
<p>Das ist ein Absatz.</p>
<a href="kontakt.html">Zum Kontakt</a>`,
            },
            {
              type: 'text',
              md: 'Die spitzen Klammern heißen **Tags**. Sie kommen fast immer paarweise: `<h1>` öffnet, `</h1>` schließt. Dazwischen steht der Inhalt. Mehr musst du für den Anfang nicht wissen.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Die wichtigste Fähigkeit',
          md: 'Du musst Code nicht schreiben können – aber du solltest ihn dir **erklären lassen können**. Der Prompt dafür steht gleich unten.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Code erklärt bekommen',
          example: {
            task: 'Claude Code schlägt eine Änderung vor, du verstehst sie nicht.',
            bad: 'Zustimmen und hoffen.',
            good: `\`Bevor ich zustimme: Erkläre mir diese Änderung.

1. Was macht der Code vorher, was macht er nachher?
2. Erkläre es so, als hätte ich noch nie programmiert.
3. Was passiert im schlimmsten Fall, wenn die Änderung falsch ist?
4. Welche anderen Dateien sind davon betroffen?
5. Kann ich das rückgängig machen?\`

Erst nach der Antwort zustimmen.`,
            why: 'Punkt 3 und 5 sind die eigentlich wichtigen Fragen. Sie entscheiden darüber, wie sorgfältig du prüfen musst.',
            result:
              'Du lernst nebenbei mit – nach zwanzig solchen Erklärungen liest du Änderungen deutlich sicherer.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Code-Erklärer für Anfänger',
          prompt: `Erkläre mir diesen Code. Ich habe keine Programmiererfahrung.

Aufgabe:
1. Was macht dieser Code insgesamt? (2 Sätze, ohne Fachbegriffe)
2. Geh Zeile für Zeile durch. Pro Zeile ein Satz auf Deutsch.
3. Welche Zeilen sind harmlos, welche verändern oder löschen etwas?
4. Was würde passieren, wenn ich ihn ausführe?
5. Gibt es etwas daran, das mich vorsichtig machen sollte?

Code:
[CODE EINFÜGEN]`,
          note: 'Punkt 3 ist die Sicherheitsfrage. Sie zeigt dir, ob der Code nur nachsieht oder tatsächlich etwas verändert.',
        },
      ],
    },
  ],
  mistakes: [
    'Code ausführen, ohne zu wissen, was er tut.',
    'Denken, man müsse erst programmieren lernen, bevor man Claude Code nutzen darf.',
    'Änderungen zustimmen, weil sie kompliziert aussehen und man sich nicht blamieren will.',
    'Kommentare im Code ignorieren – sie sind oft die beste Erklärung.',
  ],
  proTip:
    'Lass dir bei jeder Änderung einen Kommentar dazuschreiben: *"Ergänze eine kurze Kommentarzeile, die erklärt, warum diese Änderung nötig war."* In drei Monaten verstehst du deinen eigenen Code dadurch noch.',
  task: {
    md: 'Such dir eine beliebige Code-Datei (auch aus dem Internet) und lass sie dir mit dem Code-Erklärer Zeile für Zeile erklären. Achte besonders auf die Antwort zu Punkt 3.',
    solution:
      'Die meisten Codezeilen sind harmlos: rechnen, anzeigen, vergleichen. Verändernd sind typischerweise Zeilen mit Wörtern wie `write`, `save`, `delete`, `remove`, `rm`, `drop`. Genau die musst du verstehen.',
  },
  exercise: {
    scenario:
      'Claude Code schlägt eine Änderung vor, die du nicht verstehst.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Zustimmen – Claude wird schon wissen, was er tut',
        correct: false,
        explain:
          'Die Verantwortung bleibt bei dir. Und Zustimmen ohne Verstehen bringt dich fachlich nicht weiter.',
      },
      {
        label: 'Erklären lassen – inklusive „was passiert im schlimmsten Fall?"',
        correct: true,
        explain:
          'Kostet 30 Sekunden, du lernst dabei und triffst eine informierte Entscheidung.',
      },
      {
        label: 'Ablehnen und die Aufgabe aufgeben',
        correct: false,
        explain: 'Zu vorsichtig – nachfragen genügt.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist ein Kommentar im Code?',
      options: [
        {
          label: 'Text für Menschen, der beim Ausführen ignoriert wird',
          correct: true,
          explain: 'Oft die beste Erklärung, was der Code tun soll.',
        },
        { label: 'Ein Befehl', correct: false, explain: 'Nein, er wird nicht ausgeführt.' },
        { label: 'Eine Fehlermeldung', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Wofür ist CSS zuständig?',
      options: [
        { label: 'Für den Inhalt', correct: false, explain: 'Das ist HTML.' },
        { label: 'Für das Aussehen', correct: true, explain: 'Farben, Schriften, Abstände, Layout.' },
        { label: 'Für Klicks und Reaktionen', correct: false, explain: 'Das ist JavaScript.' },
      ],
    },
    {
      q: 'Welche Fähigkeit brauchst du wirklich?',
      options: [
        { label: 'Code fehlerfrei schreiben können', correct: false, explain: 'Nicht zum Einstieg.' },
        {
          label: 'Dir Code erklären lassen und erkennen, was verändernd wirkt',
          correct: true,
          explain: 'Das reicht, um verantwortlich zuzustimmen.',
        },
        { label: 'Alle Programmiersprachen kennen', correct: false, explain: 'Braucht niemand.' },
      ],
    },
  ],
  related: ['cc-starten', 'cc-aenderungen-pruefen', 'cc-website-bauen'],
}
