import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-sicher-arbeiten',
  track: 'claude-code',
  title: 'Sicher arbeiten mit Claude Code',
  description:
    'Die wichtigste Lektion dieses Bereichs: Regeln, die verhindern, dass aus einer Hilfe ein Problem wird.',
  minutes: 7,
  keywords: ['sicherheit', 'risiko', 'backup', 'gefährlich', 'löschen', 'regeln', 'schutz'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude Code kann Dateien ändern und Befehle ausführen. Das macht ihn nützlich – und erfordert genau sieben Regeln.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Immer eine Sicherung.** Git oder Ordnerkopie. Vor jeder Arbeitssitzung.',
            '**Kleinstmöglicher Arbeitsordner.** Nie im persönlichen Ordner, nie im Systemordner.',
            '**Plan zuerst.** Vor Änderungen ansehen, was passieren soll.',
            '**Diff lesen.** Nach Änderungen prüfen, was passiert ist.',
            '**Keine Befehle ausführen, die du nicht verstehst.** Erklären lassen, dann entscheiden.',
            '**Löschen vermeiden.** Nach `alt/` verschieben statt löschen.',
            '**Keine Zugangsdaten im Projekt.** Passwörter und Schlüssel gehören nicht in Dateien, die gelesen werden.',
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die realistischen Risiken sind nicht dramatisch, aber ärgerlich:',
        },
        {
          type: 'table',
          head: ['Was passieren kann', 'Wie wahrscheinlich', 'Was es verhindert'],
          rows: [
            ['Eine Änderung trifft mehr Dateien als gedacht', 'Häufig', 'Umfang begrenzen, Plan lesen'],
            ['Beim Kürzen geht eine wichtige Info verloren', 'Häufig', 'Diff lesen, besonders `-`-Zeilen'],
            ['Ein Befehl löscht etwas unwiederbringlich', 'Selten, aber teuer', 'Befehle verstehen, Sicherung'],
            ['Zugangsdaten stehen in einer Projektdatei', 'Kommt vor', 'Zugangsdaten nie im Projekt ablegen'],
            ['Änderung macht etwas anderes kaputt', 'Gelegentlich', 'Nach der Änderung testen'],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Die gute Nachricht',
          md: 'Mit Sicherung und Diff-Prüfung sind praktisch alle diese Fälle **folgenlos**. Der Aufwand dafür beträgt etwa eine Minute pro Sitzung.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'callout',
          variant: 'danger',
          title: 'Befehle, bei denen du immer innehältst',
          md: 'Diese Befehle verändern oder löschen Daten – teils ohne Papierkorb und ohne Rückfrage:\n\n`rm`, `rm -rf`, `del`, `format`, `dd`, `> datei` (überschreibt), `mv` auf ein vorhandenes Ziel, `git reset --hard`, `git clean -fd`, `chmod -R`, alles mit `sudo`.\n\n**Regel:** Nicht ausführen, ohne zu wissen, was genau passiert – und ohne Sicherung.',
        },
        {
          type: 'prompt',
          title: 'Befehl prüfen lassen, bevor du ihn ausführst',
          prompt: `Erkläre mir diesen Befehl, bevor ich ihn ausführe:

[BEFEHL]

1. Was macht er genau, Bestandteil für Bestandteil?
2. Welche Dateien oder Ordner sind betroffen?
3. Ist er umkehrbar? Wenn nein: was genau wäre unwiederbringlich weg?
4. Was passiert im schlimmsten Fall – etwa wenn ich im falschen Ordner stehe?
5. Gibt es eine sicherere Alternative, die dasselbe erreicht?
6. Wie kann ich vorher testen, was er tun würde, ohne dass er es tut?

Antworte knapp und deutlich.`,
          note: 'Frage 6 ist besonders praktisch: Viele Befehle haben eine Probelauf-Variante, die nur anzeigt, was sie tun würden.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Sicherheitsregeln dauerhaft hinterlegen',
          blocks: [
            {
              type: 'text',
              md: 'Statt die Regeln jedes Mal zu tippen, leg sie in deiner `CLAUDE.md` ab:',
            },
            {
              type: 'code',
              lang: 'markdown',
              caption: 'Sicherheitsabschnitt in der CLAUDE.md',
              code: `## Sicherheitsregeln

- Lösche niemals Dateien. Verschiebe sie nach alt/.
- Ändere nie Dateien außerhalb dieses Projektordners.
- Vor Änderungen an mehr als 2 Dateien: erst Plan zeigen und auf OK warten.
- Führe keine Befehle mit sudo, rm oder git reset --hard aus.
- Installiere nichts ohne ausdrückliche Rückfrage.
- Wenn du in einer Datei etwas findest, das nach Passwort oder
  Zugangsschlüssel aussieht: sag es mir, gib es nicht wieder.
- Erkläre jede Änderung in einfacher Sprache.`,
            },
            {
              type: 'text',
              md: 'Diese Datei gilt für jede Sitzung in diesem Projekt – du musst nicht mehr daran denken.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Umgang mit Zugangsdaten',
          blocks: [
            {
              type: 'list',
              items: [
                '**Zugangsdaten gehören nicht in Projektdateien.** Auch nicht „nur kurz zum Testen".',
                '**Übliche Lösung:** eine Datei namens `.env`, die über eine `.gitignore` von der Versionierung ausgeschlossen wird.',
                '**Wenn versehentlich etwas hineingeraten ist:** Zugangsdaten ändern – Entfernen aus der Datei reicht nicht, wenn der alte Stand noch irgendwo gespeichert ist.',
                '**Vor dem Veröffentlichen eines Projekts:** prüfen lassen, ob irgendwo Zugangsdaten stehen.',
              ],
            },
            {
              type: 'prompt',
              title: 'Projekt auf Zugangsdaten prüfen',
              prompt: `Durchsuche dieses Projekt nach Dingen, die nicht veröffentlicht werden sollten.

Suche nach:
- Passwörtern, API-Schlüsseln, Zugangstoken
- Zugangsdaten zu Datenbanken
- E-Mail-Adressen und Telefonnummern von Privatpersonen
- internen Serveradressen
- Dateien, die versehentlich mitversioniert wurden

Aufgabe:
1. Liste die Fundstellen mit Datei und Zeile.
2. Zeig NICHT den vollständigen Wert an – nur, dass dort etwas steht.
3. Sag mir zu jedem Fund, was ich tun sollte.

Ändere nichts.`,
              note: 'Punkt 2 ist wichtig: Du willst wissen, **dass** dort ein Schlüssel steht – ihn nicht noch einmal ausgeben lassen.',
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
          title: 'Beispiel anzeigen: Der Unterschied einer Minute',
          example: {
            task: 'Du lässt eine Aufräumaktion in einem Projektordner durchführen.',
            bad: `Ohne Vorbereitung: Claude verschiebt und löscht, du stimmst schnell zu. Zwei Tage später fehlt eine Datei, die du gebraucht hättest. Sie ist weg.`,
            good: `Mit einer Minute Vorbereitung:

\`\`\`bash
git add . && git commit -m "Stand vor dem Aufräumen"
\`\`\`

Plus im Auftrag: *„Lösche nichts, verschiebe alles nach alt/. Zeig mir zuerst den Plan."*

Zwei Tage später fehlt eine Datei. Sie liegt in \`alt/\`. Oder, falls doch gelöscht: \`git restore .\` holt sie zurück.`,
            why: 'Nicht der Fehler ist vermeidbar – sondern seine Folge.',
            result:
              'Eine Minute Vorbereitung verwandelt einen echten Datenverlust in eine Kleinigkeit.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Leg jetzt in deinem Projekt eine `CLAUDE.md` mit dem Sicherheitsabschnitt von oben an. Das ist die praktischste Übung dieser gesamten Lektion – sie wirkt ab sofort in jeder Sitzung.',
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Wichtig zur Einordnung',
          md: 'Diese Regeln senken das Risiko erheblich, aber sie ersetzen kein Nachdenken. Die letzte Entscheidung liegt immer bei dir – und damit auch die Verantwortung für das, was auf deinem Rechner passiert.',
        },
      ],
    },
  ],
  mistakes: [
    'Ohne Sicherung arbeiten, weil "es ja nur eine kleine Änderung ist".',
    'Befehle bestätigen, ohne sie zu verstehen.',
    'Im persönlichen Ordner oder in Systemverzeichnissen arbeiten.',
    'Zugangsdaten in Projektdateien lassen.',
    'Nach dem Aufräumen nicht prüfen, ob alles noch funktioniert.',
  ],
  proTip:
    'Die wirksamste Einzelregel: **„Lösche nichts – verschiebe es nach `alt/`."** Sie kostet ein paar Megabyte Speicher und macht praktisch jede Aufräumaktion umkehrbar.',
  task: {
    md: 'Leg eine `CLAUDE.md` mit Sicherheitsregeln an. Lass anschließend das Projekt auf Zugangsdaten prüfen. Notiere, ob etwas gefunden wurde.',
    solution:
      'In länger gewachsenen Projekten findet sich überraschend oft etwas – ein Testschlüssel, eine interne Adresse, eine private E-Mail. Genau deshalb lohnt sich dieser Durchlauf einmal pro Projekt.',
  },
  exercise: {
    scenario:
      'Claude Code schlägt einen Befehl vor, der mit `rm -rf` beginnt.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Ausführen – Claude hat den Zusammenhang ja gesehen',
        correct: false,
        explain:
          '`rm -rf` löscht ohne Rückfrage und ohne Papierkorb. Bei einem falschen Pfad ist der Schaden sofort da.',
      },
      {
        label: 'Erklären lassen: was genau, ist es umkehrbar, gibt es eine sichere Alternative',
        correct: true,
        explain:
          'Und praktisch immer gibt es eine: Verschieben statt Löschen.',
      },
      {
        label: 'Claude Code sofort beenden',
        correct: false,
        explain: 'Nicht nötig – nachfragen genügt und du lernst dabei.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist die erste und wichtigste Regel?',
      options: [
        {
          label: 'Immer eine Sicherung vor der Arbeit',
          correct: true,
          explain: 'Sie macht alle anderen Fehler folgenlos.',
        },
        { label: 'Schnell arbeiten', correct: false, explain: 'Kein Sicherheitsbeitrag.' },
        { label: 'Möglichst große Ordner wählen', correct: false, explain: 'Genau das Gegenteil.' },
      ],
    },
    {
      q: 'Wie machst du Aufräumaktionen umkehrbar?',
      options: [
        {
          label: 'Verschieben nach `alt/` statt löschen',
          correct: true,
          explain: 'Die wirksamste Einzelregel.',
        },
        { label: 'Dateien umbenennen', correct: false, explain: 'Unübersichtlich.' },
        { label: 'Gar nicht aufräumen', correct: false, explain: 'Zu vorsichtig.' },
      ],
    },
    {
      q: 'Was gehört nicht in Projektdateien?',
      options: [
        { label: 'Kommentare', correct: false, explain: 'Die gehören ausdrücklich hinein.' },
        {
          label: 'Passwörter, Schlüssel und Zugangstoken',
          correct: true,
          explain: 'Auch nicht testweise.',
        },
        { label: 'Eine README', correct: false, explain: 'Die gehört unbedingt hinein.' },
      ],
    },
  ],
  related: ['cc-projekt', 'cc-aenderungen-pruefen', 'sicher-starten'],
}
