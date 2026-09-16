import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-projekt',
  track: 'claude-code',
  title: 'Was ist ein Projekt? (und was ist Git?)',
  description:
    'Der Projektordner als Arbeitsbereich – und warum Git die beste Sicherheitsleine für Claude Code ist.',
  minutes: 7,
  keywords: ['projekt', 'git', 'versionierung', 'backup', 'sicherung', 'commit', 'repository'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein Projekt ist einfach ein Ordner, in dem alles zu einer Sache liegt. **Git** ist ein Programm, das sich alle Zwischenstände dieses Ordners merkt.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Git ist ein verteiltes Versionskontrollsystem. Es speichert Schnappschüsse des Arbeitsverzeichnisses als Commits mit Verweis auf den Vorgängerzustand und erlaubt es, jederzeit zu einem früheren Stand zurückzukehren oder Unterschiede zu vergleichen.',
            },
            {
              label: 'Einfach',
              md: 'Git ist wie „Speichern unter…" mit unendlich vielen Ständen – nur dass du keine Datei-Kopien anlegst, sondern jederzeit zu jedem alten Stand zurückspringen kannst.',
            },
            {
              label: 'Ganz einfach',
              md: 'Git ist die Rückgängig-Taste für deinen ganzen Projektordner. Auch noch nach drei Wochen.',
            },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'danger',
          title: 'Warum das für Claude Code entscheidend ist',
          md: 'Claude Code kann Dateien ändern. Ohne Sicherung ist eine falsche Änderung schwer rückgängig zu machen. **Mit Git ist sie ein Befehl.** Deshalb ist Git nicht „etwas für Programmierer", sondern deine Sicherheitsleine.',
        },
        {
          type: 'table',
          head: ['Ohne Git', 'Mit Git'],
          rows: [
            ['Änderung falsch → Datei ist weg', 'Änderung falsch → ein Befehl, alles zurück'],
            ['„Was hat sich geändert?" → unklar', '„Was hat sich geändert?" → auf die Zeile genau sichtbar'],
            ['Kopien `datei_final_v3_neu.txt`', 'Ein Stand, alle Versionen dahinter'],
            ['Mut zum Ausprobieren: gering', 'Mut zum Ausprobieren: hoch'],
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Du brauchst für den Anfang genau fünf Befehle. Mehr nicht.',
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Git in fünf Befehlen',
          code: `# Einmalig pro Projekt: Git in diesem Ordner einschalten
git init

# Was hat sich seit dem letzten Stand geändert?
git status

# Alle aktuellen Änderungen für die Sicherung vormerken
git add .

# Stand sichern, mit einer Notiz was du gemacht hast
git commit -m "Produkttexte überarbeitet"

# Alle gesicherten Stände ansehen
git log --oneline`,
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Der Arbeitsablauf mit Claude Code',
          md: '1. `git status` – ist alles gesichert?\n2. `git commit` – falls nicht: erst sichern.\n3. Claude Code arbeiten lassen.\n4. `git diff` – was hat sich geändert?\n5. Passt es? → `git commit`. Passt es nicht? → zurücksetzen.\n\nDieser Ablauf macht aus „hoffentlich geht nichts schief" ein „es kann nichts schiefgehen".',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Änderungen ansehen und verwerfen',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              caption: 'Prüfen und zurücksetzen',
              code: `# Was genau wurde geändert? (zeilenweise)
git diff

# Nur eine bestimmte Datei ansehen
git diff inhalte/ueber-uns.md`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Vorsicht beim Zurücksetzen',
              md: 'Befehle, die Änderungen verwerfen (z. B. `git restore` oder `git checkout --`), löschen deine **ungesicherten** Änderungen unwiderruflich. Das ist genau der Zweck – aber sei sicher, dass du wirklich verwerfen willst.\n\nSicherer Weg für Anfänger: Bevor du etwas verwirfst, sichere den aktuellen Stand mit `git commit`. Dann kannst du später immer noch zurück.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wenn du Git (noch) nicht nutzen willst',
          blocks: [
            {
              type: 'text',
              md: 'Git ist die beste Lösung, aber nicht die einzige. Das absolute Minimum:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Kopiere den gesamten Projektordner, bevor Claude Code darin arbeitet.',
                'Nenne die Kopie mit Datum: `projekt-2026-09-16`.',
                'Arbeite im Original, behalte die Kopie unangetastet.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              md: 'Das ist umständlicher und du siehst nicht, **was** sich geändert hat. Aber es ist unendlich viel besser als gar keine Sicherung.',
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
          title: 'Beispiel anzeigen: Der Moment, in dem Git sich auszahlt',
          example: {
            task: 'Claude Code sollte in 40 Dateien eine Formulierung ändern. Danach stellst du fest: In 12 Dateien war die Änderung falsch.',
            bad: 'Ohne Git: Du musst 12 Dateien von Hand zurückbauen – und weißt nicht mehr genau, wie sie vorher lauteten.',
            good: `Mit Git:

\`\`\`bash
git diff                    # alle Änderungen ansehen
git restore .               # alles zurück auf den letzten gesicherten Stand
\`\`\`

Dann die Aufgabe präziser formulieren und nochmal starten.`,
            why: 'Der gesicherte Stand ist der Sicherheitsanker. Ein missglückter Versuch kostet dann 10 Sekunden statt einer Stunde.',
            result:
              'Du kannst Claude Code mutig arbeiten lassen, weil ein Fehlversuch folgenlos bleibt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Probier es in einem **Testordner** aus, nicht mit echten Daten:',
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Git-Übung in 2 Minuten',
          code: `mkdir git-test           # Testordner anlegen
cd git-test
git init                 # Git einschalten

echo "Hallo" > test.txt  # Datei mit Inhalt anlegen
git status               # Git sieht die neue Datei
git add .
git commit -m "Erste Fassung"

echo "Hallo Welt" > test.txt   # Datei ändern
git diff                 # den Unterschied ansehen
git restore test.txt     # Änderung verwerfen
# test.txt enthält jetzt wieder "Hallo"`,
        },
        {
          type: 'prompt',
          title: 'Git erklärt bekommen',
          prompt: `Ich bin kompletter Anfänger und will Git nur als Sicherheitsnetz für Claude Code nutzen.

Aufgabe:
1. Erkläre mir die 5 Befehle, die ich wirklich brauche – mit einem Alltagsvergleich pro Befehl.
2. Zeig mir den konkreten Ablauf: vor der Arbeit, nach der Arbeit.
3. Welche Git-Befehle sind gefährlich? Warne mich davor.
4. Was mache ich, wenn ich mich verirrt habe und nicht weiß, in welchem Zustand mein Projekt ist?

Keine Fachbegriffe ohne Erklärung. Ich will nicht Git lernen, ich will nur nichts kaputt machen.`,
        },
      ],
    },
  ],
  mistakes: [
    'Claude Code an wichtigen Dateien arbeiten lassen, ohne vorher zu sichern.',
    'Vergessen zu committen und dann nicht mehr wissen, welcher Stand der gute war.',
    'Nichtssagende Commit-Notizen wie "update" schreiben. In drei Wochen ist das wertlos.',
    'Befehle zum Verwerfen ausführen, ohne vorher `git status` und `git diff` angesehen zu haben.',
  ],
  proTip:
    'Mach einen Commit **vor** jeder größeren Claude-Code-Aufgabe, nicht erst danach. Der gesicherte Stand davor ist der, zu dem du zurück willst.',
  task: {
    md: 'Richte Git in einem echten (aber unkritischen) Projektordner ein und mach deinen ersten Commit. Ändere danach etwas und sieh dir `git diff` an.',
    solution:
      'Wenn `git diff` die Änderung zeilenweise anzeigt, hast du alles richtig gemacht. Ab jetzt kannst du jede Änderung vor dem Übernehmen prüfen – genau das brauchst du für die nächsten Lektionen.',
  },
  exercise: {
    scenario:
      'Claude Code hat Änderungen an 20 Dateien gemacht. Du bist unsicher, ob sie richtig sind.',
    question: 'Was tust du zuerst?',
    options: [
      {
        label: 'Alles zurücksetzen, um sicherzugehen',
        correct: false,
        explain: 'Zu früh – vielleicht sind 18 der 20 Änderungen genau richtig.',
      },
      {
        label: '`git diff` ansehen und die Änderungen prüfen',
        correct: true,
        explain:
          'Erst ansehen, dann entscheiden. Genau dafür ist Git da.',
      },
      {
        label: 'Sofort committen, damit nichts verloren geht',
        correct: false,
        explain:
          'Ein Commit ist kein Schaden, aber du solltest wissen, was du sicherst. Erst prüfen, dann committen.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist Git in einem Satz?',
      options: [
        {
          label: 'Die Rückgängig-Taste für deinen ganzen Projektordner',
          correct: true,
          explain: 'Und damit die Sicherheitsleine für Claude Code.',
        },
        { label: 'Ein Cloud-Speicher', correct: false, explain: 'Git funktioniert lokal, ganz ohne Internet.' },
        { label: 'Ein Texteditor', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Wann solltest du committen?',
      options: [
        {
          label: 'Vor jeder größeren Claude-Code-Aufgabe',
          correct: true,
          explain: 'Der Stand davor ist der, zu dem du zurück willst.',
        },
        { label: 'Nur am Ende des Projekts', correct: false, explain: 'Viel zu spät.' },
        { label: 'Einmal im Monat', correct: false, explain: 'Viel zu selten.' },
      ],
    },
    {
      q: 'Was zeigt `git diff`?',
      options: [
        { label: 'Alle Dateien im Ordner', correct: false, explain: 'Das macht `ls`.' },
        {
          label: 'Was sich seit dem letzten gesicherten Stand geändert hat – zeilenweise',
          correct: true,
          explain: 'Dein wichtigstes Prüfwerkzeug.',
        },
        { label: 'Die Größe des Projekts', correct: false, explain: 'Nein.' },
      ],
    },
  ],
  related: ['cc-aenderungen-pruefen', 'cc-sicher-arbeiten', 'cc-ordner-und-dateien'],
}
