import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-terminal',
  track: 'claude-code',
  title: 'Was ist ein Terminal?',
  description:
    'Das schwarze Fenster mit dem Textcursor – erklärt für Menschen, die es noch nie geöffnet haben.',
  minutes: 6,
  keywords: ['terminal', 'konsole', 'kommandozeile', 'shell', 'eingabeaufforderung', 'befehle'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein Terminal ist ein Fenster, in dem du deinem Computer Befehle **schreibst**, statt sie zu klicken. Mehr ist es nicht.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Einfach',
              md: 'Statt mit der Maus auf einen Ordner zu doppelklicken, tippst du seinen Namen. Dasselbe Ergebnis, anderer Weg.',
            },
            {
              label: 'Ganz einfach',
              md: 'Ein Chatfenster für deinen Computer. Du schreibst etwas, er macht es.',
            },
          ],
        },
        {
          type: 'table',
          head: ['System', 'Programm', 'So findest du es'],
          rows: [
            ['**Mac**', 'Terminal', 'Cmd + Leertaste → „Terminal" tippen'],
            ['**Windows**', 'Windows Terminal / PowerShell', 'Startmenü → „Terminal" tippen'],
            ['**Linux**', 'Terminal', 'Meist Strg + Alt + T'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Claude Code läuft im Terminal. Du musst dort nicht viel können – aber vier Dinge solltest du verstehen, damit du dich nicht verlierst.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Du bist immer „irgendwo".** Das Terminal steht immer in einem bestimmten Ordner. Alles, was du tippst, bezieht sich auf diesen Ordner.',
            '**Du kannst den Ordner wechseln.** Das ist das Gegenstück zum Doppelklick.',
            '**Befehle sind Wörter mit Zusätzen.** Erst der Befehl, dann worauf er sich bezieht.',
            '**Nichts passiert ohne Enter.** Bis dahin kannst du alles korrigieren.',
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Das sind die einzigen Befehle, die du für den Anfang brauchst. Alle sind **ungefährlich** – sie sehen nur nach, ändern nichts.',
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Die vier harmlosen Grundbefehle',
          code: `# Wo bin ich gerade?  (Mac/Linux)
pwd

# Was liegt in diesem Ordner?
ls          # Mac/Linux
dir         # Windows

# In einen Unterordner wechseln
cd projektordner

# Einen Ordner nach oben
cd ..`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Der Trick, der dir Tipparbeit spart',
          md: 'Tippe die ersten Buchstaben eines Ordnernamens und drück **Tab**. Das Terminal vervollständigt den Namen. Das verhindert gleichzeitig Tippfehler.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Der schnellste Weg zum richtigen Ordner',
          md: 'Du musst dich gar nicht durchhangeln: Tippe `cd ` (mit Leerzeichen) und **zieh den Ordner aus dem Dateimanager in das Terminalfenster**. Der Pfad wird automatisch eingefügt. Dann Enter.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Was bedeuten die Zeichen vor dem Cursor?',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `maria@macbook ~/projekte/website %`,
            },
            {
              type: 'list',
              items: [
                '`maria` – dein Benutzername',
                '`macbook` – der Name des Computers',
                '`~/projekte/website` – **wo du gerade bist**. Die Tilde `~` steht für deinen persönlichen Ordner.',
                '`%` oder `$` – hier beginnt deine Eingabe. Dieses Zeichen tippst du nicht mit.',
              ],
            },
            {
              type: 'text',
              md: 'Wenn du in einer Anleitung `$ ls` siehst, tippst du nur `ls`. Das `$` zeigt nur an, dass es sich um eine Terminaleingabe handelt.',
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
          title: 'Beispiel anzeigen: Zum Projektordner navigieren',
          example: {
            task: 'Du willst ins Verzeichnis `Dokumente/meine-website`.',
            bad: 'Blind `cd meine-website` tippen, ohne zu wissen, wo man gerade steht. Ergebnis: „No such file or directory".',
            good: `\`\`\`
pwd                    # wo bin ich? → /Users/maria
ls                     # was liegt hier? → Dokumente, Bilder, Musik
cd Dokumente           # hinein
ls                     # → meine-website, steuern, fotos
cd meine-website       # hinein
pwd                    # → /Users/maria/Dokumente/meine-website
\`\`\``,
            why: 'Nach jedem Schritt nachsehen, wo man ist und was da liegt. Das ist genau wie Ordner öffnen mit der Maus – nur getippt.',
            result:
              'Du stehst im richtigen Ordner und kannst Claude Code starten.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Öffne dein Terminal und probiere genau diese Reihenfolge aus. Alle Befehle sind ungefährlich:',
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Deine erste Terminal-Übung',
          code: `pwd        # wo bin ich?
ls         # was liegt hier?  (Windows: dir)
cd ..      # ein Ordner nach oben
ls         # was liegt hier?
cd ~       # zurück in meinen persönlichen Ordner
pwd        # Kontrolle`,
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Gefährliche Befehle – niemals ungeprüft ausführen',
          md: 'Es gibt Befehle, die Dateien **sofort und ohne Papierkorb** löschen. Dazu gehören unter anderem `rm`, `rm -rf`, `del /s`, `format` und `> datei` (überschreibt eine Datei).\n\n**Regel für den Anfang:** Führe keinen Befehl aus, den du nicht verstehst – auch nicht, wenn er in einer Anleitung oder von einer KI vorgeschlagen wird. Frag stattdessen: *„Was genau macht dieser Befehl und was passiert im schlimmsten Fall?"*',
        },
      ],
    },
  ],
  mistakes: [
    'Befehle aus dem Internet kopieren und ausführen, ohne sie zu verstehen.',
    'Nicht prüfen, in welchem Ordner man gerade steht – und dann im falschen Ordner arbeiten.',
    'Das Dollarzeichen aus der Anleitung mitkopieren.',
    'Panik bekommen bei einer Fehlermeldung. Fehlermeldungen sind normale Antworten, keine Katastrophen.',
  ],
  proTip:
    'Fehlermeldungen kannst du einfach kopieren und in einen Claude-Chat einfügen: *„Was bedeutet diese Meldung und was mache ich jetzt?"* Das ist schneller als jede Suche und du lernst dabei mehr.',
  task: {
    md: 'Navigiere im Terminal zu einem echten Ordner auf deinem Rechner – ohne den Ziehen-Trick, nur mit `cd` und `ls`. Notiere, wie viele Schritte du gebraucht hast.',
    solution:
      'Meist drei bis fünf Schritte. Wenn du dich verläufst: `cd ~` bringt dich immer zurück in deinen persönlichen Ordner. Von dort geht es neu los – es kann nichts kaputtgehen.',
  },
  exercise: {
    scenario:
      'Eine Anleitung schlägt dir einen Befehl vor, den du nicht kennst.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Ausführen – es steht ja in einer Anleitung',
        correct: false,
        explain:
          'Anleitungen können veraltet oder für ein anderes System gedacht sein. Manche Befehle löschen ohne Nachfrage.',
      },
      {
        label: 'Vorher erklären lassen: „Was macht dieser Befehl und was passiert im schlimmsten Fall?"',
        correct: true,
        explain:
          'Zwei Minuten Nachfragen ersparen im Zweifel Stunden Wiederherstellung.',
      },
      {
        label: 'Ihn abwandeln und schauen, was passiert',
        correct: false,
        explain: 'Noch riskanter – abgewandelte Befehle tun oft etwas anderes als erwartet.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was zeigt `pwd` an?',
      options: [
        { label: 'Den Ordner, in dem du gerade bist', correct: true, explain: '„print working directory".' },
        { label: 'Dein Passwort', correct: false, explain: 'Nein – zum Glück nicht.' },
        { label: 'Alle Dateien', correct: false, explain: 'Das macht `ls` bzw. `dir`.' },
      ],
    },
    {
      q: 'Was macht `cd ..`?',
      options: [
        { label: 'Löscht den Ordner', correct: false, explain: 'Nein, `cd` wechselt nur.' },
        { label: 'Wechselt einen Ordner nach oben', correct: true, explain: 'Die zwei Punkte bedeuten „eine Ebene höher".' },
        { label: 'Öffnet den Dateimanager', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Was solltest du bei unbekannten Befehlen tun?',
      options: [
        {
          label: 'Erst erklären lassen, was sie tun und was schlimmstenfalls passiert',
          correct: true,
          explain: 'Besonders bei allem, was löscht oder überschreibt.',
        },
        { label: 'Einfach ausprobieren', correct: false, explain: 'Manche Befehle löschen ohne Rückfrage und ohne Papierkorb.' },
        { label: 'Zweimal ausführen, dann klappt es', correct: false, explain: 'Sicher nicht.' },
      ],
    },
  ],
  related: ['cc-ordner-und-dateien', 'cc-starten', 'cc-sicher-arbeiten'],
}
