import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-fehler-finden',
  track: 'claude-code',
  title: 'Fehler finden und beheben',
  description:
    'Wenn etwas nicht funktioniert: Fehlermeldungen lesen, Ursachen eingrenzen und sicher reparieren.',
  minutes: 6,
  keywords: ['fehler', 'fehlermeldung', 'debugging', 'kaputt', 'reparieren', 'error'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Eine Fehlermeldung ist keine Katastrophe, sondern ein **Hinweis**. Sie sagt dir meist ziemlich genau, was los ist – man muss sie nur lesen.',
        },
        {
          type: 'code',
          lang: 'text',
          caption: 'Eine typische Fehlermeldung, aufgeschlüsselt',
          code: `FileNotFoundError: [Errno 2] No such file or directory: 'daten/preise.csv'
  File "auswertung.py", line 12, in <module>
    tabelle = lies_datei("daten/preise.csv")`,
        },
        {
          type: 'list',
          items: [
            '**Art des Fehlers:** `FileNotFoundError` – eine Datei wurde nicht gefunden.',
            '**Was fehlt:** `daten/preise.csv`',
            '**Wo:** Datei `auswertung.py`, Zeile 12',
            '**Was dort passiert:** eine Datei sollte gelesen werden',
          ],
        },
        {
          type: 'text',
          md: 'Damit ist die Ursache schon fast klar: Die Datei liegt nicht dort, wo das Programm sie sucht – falscher Ordner, Tippfehler im Namen oder die Datei fehlt tatsächlich.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Die wichtigste Regel',
          md: 'Schick **immer die vollständige Fehlermeldung** mit – nicht „es geht nicht", nicht eine Kurzfassung, nicht deine Beschreibung davon. Die letzten Zeilen einer Meldung enthalten fast immer den entscheidenden Hinweis.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Fehler melden – die vollständige Fassung',
          prompt: `Etwas funktioniert nicht.

Fehlermeldung (vollständig):
[MELDUNG EINFÜGEN]

Was ich getan habe:
[DEIN VORGEHEN]

Was ich erwartet hätte:
[SOLL-ZUSTAND]

Was sich zuletzt geändert hat:
[ÄNDERUNGEN, AUCH KLEINE]

Funktioniert es woanders / hat es vorher funktioniert:
[JA/NEIN, SEIT WANN]

Aufgabe:
1. Übersetze die Fehlermeldung in verständliches Deutsch.
2. Nenne 3 mögliche Ursachen, sortiert nach Wahrscheinlichkeit.
3. Gib zu jeder den konkreten Prüfschritt.
4. Fang mit dem ungefährlichsten Schritt an.
5. Ändere noch nichts – erklär mir erst, was du vorhast.

Warne mich ausdrücklich bei allem, was Daten löscht oder überschreibt.`,
          note: 'Die Zeile „was sich zuletzt geändert hat" löst erfahrungsgemäß die meisten Fälle – die Ursache ist fast immer die letzte Änderung.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Meldung vollständig lesen', md: 'Besonders die letzten Zeilen. Dort steht meist das Konkrete.' },
            { title: 'Gegenprobe machen', md: 'Wann tritt der Fehler NICHT auf? Das halbiert oft den Suchraum.' },
            { title: 'Eine Sache ändern', md: 'Nie mehrere gleichzeitig – sonst weißt du nicht, was gewirkt hat.' },
            { title: 'Nach dem Fix prüfen', md: 'Funktioniert es jetzt – und funktioniert alles andere noch?' },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wenn die Änderung von Claude den Fehler verursacht hat',
          blocks: [
            {
              type: 'text',
              md: 'Das kommt vor. Der saubere Weg:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Was wurde geändert?
git diff

# Funktionierte es vor der Änderung? Zurück zum letzten guten Stand:
git restore .`,
            },
            {
              type: 'text',
              md: 'Danach die Aufgabe präziser formulieren. Häufig hilft der Zusatz: *„Diese Änderung hat X kaputtgemacht. Erkläre mir erst, warum, bevor du einen neuen Versuch machst."*',
            },
            {
              type: 'callout',
              variant: 'warn',
              md: 'Genau für diesen Fall gibt es Git. Wer ohne Sicherung arbeitet, muss stattdessen raten, wie die Datei vorher aussah.',
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
          title: 'Beispiel anzeigen: „Es geht nicht mehr"',
          example: {
            task: 'Deine Website zeigt seit einer Änderung eine leere Seite.',
            bad: '`Die Website ist kaputt, reparier sie.`\n→ Claude muss raten, wo er suchen soll.',
            good: `\`Die Website zeigt seit der letzten Änderung eine leere Seite.

Was ich weiß:
- Vorher funktionierte sie.
- Geändert wurden: index.html und style.css (siehe git diff)
- Im Browser steht in der Konsole: [FEHLERMELDUNG]

Aufgabe:
1. Sieh dir die letzten Änderungen an.
2. Welche davon kann eine leere Seite verursachen?
3. Nenne die wahrscheinlichste Ursache mit Begründung.
4. Zeig mir den Fix, bevor du ihn umsetzt.\`

Falls unklar: \`git restore .\` und in kleineren Schritten neu.`,
            why: '„Vorher funktionierte es" plus die Liste der Änderungen grenzt die Ursache auf wenige Zeilen ein. Ohne diese Angaben wird das gesamte Projekt durchsucht.',
            result:
              'Meist eine vergessene schließende Klammer oder ein Tippfehler in einem Tag – in unter einer Minute gefunden.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Fehlermeldung übersetzen lassen',
          prompt: `Erkläre mir diese Fehlermeldung. Ich bin kein Entwickler.

[FEHLERMELDUNG]

1. Was bedeutet sie in einfachem Deutsch?
2. Welcher Teil der Meldung ist der wichtigste?
3. Was sind die 3 häufigsten Ursachen für genau diesen Fehler?
4. Wie prüfe ich, welche davon bei mir vorliegt?
5. Welcher Prüfschritt ist am ungefährlichsten?

Keine Befehle vorschlagen, die Daten löschen oder überschreiben, ohne mich deutlich zu warnen.`,
          note: 'Frage 2 ist lehrreich: Mit der Zeit erkennst du selbst, welcher Teil einer Meldung zählt – meist die letzte Zeile und der Dateiname mit Zeilennummer.',
        },
      ],
    },
  ],
  mistakes: [
    '"Es funktioniert nicht" schreiben, ohne die Fehlermeldung mitzuschicken.',
    'Mehrere Reparaturversuche gleichzeitig machen.',
    'Vorgeschlagene Befehle ausführen, ohne zu verstehen, was sie tun.',
    'Nicht prüfen, ob nach dem Fix noch alles andere funktioniert.',
  ],
  proTip:
    'Wenn etwas plötzlich nicht mehr geht, lautet die erste Frage immer: **Was hat sich zuletzt geändert?** In der überwiegenden Mehrheit der Fälle ist genau das die Ursache.',
  task: {
    md: 'Erzeuge in einem Testprojekt absichtlich einen Fehler (z. B. einen Dateinamen falsch schreiben). Lass dir die Meldung übersetzen und die Ursachen nennen. Prüfe, ob die wahrscheinlichste Ursache die richtige war.',
    solution:
      'Bei einfachen Fehlern trifft die erstgenannte Ursache fast immer zu. Bei komplexeren lohnt sich das Durchgehen aller drei Hypothesen – deshalb lässt man sich mehrere geben, statt sich mit der ersten zufriedenzugeben.',
  },
  exercise: {
    scenario: 'Nach einer Änderung funktioniert etwas nicht mehr.',
    question: 'Was ist der beste erste Schritt?',
    options: [
      {
        label: 'Sofort einen Fix beauftragen',
        correct: false,
        explain:
          'Ohne die Ursache zu kennen, wird auf Verdacht repariert – und oft ein zweites Problem erzeugt.',
      },
      {
        label: '`git diff` ansehen und prüfen, welche Änderung es verursacht haben kann',
        correct: true,
        explain:
          'Die letzte Änderung ist fast immer die Ursache. Der Diff zeigt sie dir sofort.',
      },
      {
        label: 'Das Projekt neu anlegen',
        correct: false,
        explain: 'Aufwendigster und verlustreichster Weg.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was gehört immer in eine Fehlermeldung an Claude?',
      options: [
        {
          label: 'Die vollständige Fehlermeldung',
          correct: true,
          explain: 'Nicht die Kurzfassung und nicht deine Beschreibung davon.',
        },
        { label: 'Eine Entschuldigung', correct: false, explain: 'Unnötig.' },
        { label: 'Der gesamte Projektinhalt', correct: false, explain: 'Meist zu viel.' },
      ],
    },
    {
      q: 'Welche Frage löst die meisten Fälle?',
      options: [
        { label: '„Wie lange dauert die Reparatur?"', correct: false, explain: 'Nicht diagnostisch.' },
        {
          label: '„Was hat sich zuletzt geändert?"',
          correct: true,
          explain: 'Die Ursache ist fast immer die jüngste Änderung.',
        },
        { label: '„Wer war das?"', correct: false, explain: 'Hilft nicht weiter.' },
      ],
    },
    {
      q: 'Warum nur eine Sache auf einmal ändern?',
      options: [
        {
          label: 'Sonst weißt du nicht, welche Änderung gewirkt hat',
          correct: true,
          explain: 'Grundregel jeder Fehlersuche.',
        },
        { label: 'Weil es schneller ist', correct: false, explain: 'Es dauert eher länger.' },
        { label: 'Weil mehr nicht erlaubt ist', correct: false, explain: 'Erlaubt ist es – nur nicht sinnvoll.' },
      ],
    },
  ],
  related: ['fehleranalyse', 'cc-aenderungen-pruefen', 'cc-website-testen'],
}
