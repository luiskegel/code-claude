import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-was-ist-claude-code',
  track: 'claude-code',
  title: 'Was ist Claude Code?',
  description:
    'Claude, der nicht nur redet, sondern Dateien auf deinem Computer lesen und ändern kann – erklärt ohne Fachchinesisch.',
  minutes: 6,
  keywords: ['claude code', 'cli', 'terminal', 'dateien', 'entwickeln', 'einstieg'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude Code ist Claude, der **auf deinem Computer arbeiten kann**: Dateien öffnen, lesen, ändern, neue anlegen und Programme starten.',
        },
        {
          type: 'table',
          head: ['', 'Claude im Chat', 'Claude Code'],
          rows: [
            ['Wo', 'Browser oder App', 'Im Terminal auf deinem Rechner'],
            ['Sieht', 'Nur was du hochlädst', 'Die Dateien in deinem Projektordner'],
            ['Kann ändern', 'Nichts auf deinem Rechner', 'Dateien – nach deiner Zustimmung'],
            ['Kann ausführen', 'Nichts', 'Befehle und Programme – nach deiner Zustimmung'],
            ['Gut für', 'Texte, Analysen, Lernen', 'Projekte mit vielen Dateien, Programmieren, Websites'],
          ],
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Claude Code ist ein agentisches Kommandozeilenwerkzeug. Es läuft in deiner Shell, hat Werkzeuge zum Lesen, Schreiben und Ausführen im Kontext eines Arbeitsverzeichnisses und arbeitet mehrstufig an einer Aufgabe, bis sie erledigt ist.',
            },
            {
              label: 'Einfach',
              md: 'Ein Programm, das du im Terminal startest. Du beschreibst eine Aufgabe, Claude sieht sich deine Dateien an und schlägt Änderungen vor – ausgeführt wird erst, wenn du zustimmst.',
            },
            {
              label: 'Ganz einfach',
              md: 'Ein Mitarbeiter, der an deinem Schreibtisch sitzt, deine Unterlagen ansehen darf und auf Zuruf etwas darin ändert – aber immer erst fragt.',
            },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Der Unterschied ist größer, als er klingt. Im Chat musst du jede Datei kopieren, das Ergebnis zurückkopieren und selbst einsetzen. Claude Code erledigt genau diesen Teil.',
        },
        {
          type: 'list',
          items: [
            '**Viele Dateien auf einmal:** „Ändere in allen Produkttexten die alte Telefonnummer." – statt 40 Mal Copy-Paste.',
            '**Zusammenhang verstehen:** Claude sieht, wie die Dateien zusammenhängen, nicht nur eine einzelne.',
            '**Ausführen und prüfen:** Er kann ein Programm starten, den Fehler sehen und gleich reparieren.',
            '**Auch ohne Programmierkenntnisse nützlich:** Texte, Tabellen, Notizen, Dokumente – alles Dateien.',
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Und genau deshalb: Vorsicht',
          md: 'Wo etwas geändert werden kann, kann auch etwas kaputtgehen. Deshalb beginnt dieser Lernpfad nicht mit Befehlen, sondern mit Grundlagen und Sicherheit. Die Lektion [Sicher arbeiten mit Claude Code](/lektion/cc-sicher-arbeiten) ist die wichtigste des ganzen Bereichs.',
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
              title: 'Du öffnest das Terminal in deinem Projektordner',
              md: 'Das Terminal ist ein Fenster, in das man Befehle tippt. Was das genau ist, erklärt die nächste Lektion.',
            },
            {
              title: 'Du startest Claude Code',
              md: 'Ein Befehl. Danach schreibst du wie im Chat – in normaler Sprache.',
            },
            {
              title: 'Claude sieht sich um',
              md: 'Er liest die Dateien, die für deine Aufgabe relevant sind, und erklärt, was er vorhat.',
            },
            {
              title: 'Du stimmst zu – oder nicht',
              md: 'Vor Änderungen und vor dem Ausführen von Befehlen fragt Claude Code nach. Du siehst genau, was passieren soll.',
            },
            {
              title: 'Du prüfst das Ergebnis',
              md: 'Dieser Schritt wird nie übersprungen. Dazu gibt es eine eigene Lektion.',
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
          title: 'Beispiel anzeigen: Wofür man es auch ohne Programmieren nutzt',
          example: {
            task: 'Du hast 60 Textdateien mit Produktbeschreibungen. Eine Angabe hat sich geändert.',
            bad: 'Jede Datei einzeln öffnen, suchen, ersetzen, speichern. Eine Stunde Arbeit, drei übersehene Stellen.',
            good: 'In Claude Code: `In allen .txt-Dateien in diesem Ordner steht die alte Garantiezeit "24 Monate". Sie soll "36 Monate" heißen. Zeig mir zuerst, in welchen Dateien und in welchem Zusammenhang die Stelle vorkommt – ändere noch nichts.`',
            why: '„Zeig mir zuerst" ist der entscheidende Zusatz. Du siehst alle Fundstellen, bevor irgendetwas verändert wird – und erkennst Stellen, wo die Ersetzung falsch wäre.',
            result:
              'Eine Liste von 57 Fundstellen. Drei davon stehen in einem Zusammenhang, in dem „24 Monate" richtig bleibt. Du schließt sie aus, dann wird geändert.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Für diese Lektion musst du noch nichts installieren. Wenn du wissen willst, ob sich Claude Code für dich lohnt, stell diese Frage im normalen Chat:',
        },
        {
          type: 'prompt',
          title: 'Lohnt sich Claude Code für mich?',
          prompt: `Ich überlege, Claude Code zu nutzen.

Meine Situation:
- Ich arbeite als: [ROLLE]
- Programmierkenntnisse: [KEINE / WENIGE / GUTE]
- Ich arbeite regelmäßig mit: [DATEIEN AUF MEINEM RECHNER / NUR MIT E-MAILS UND WEB-TOOLS]
- Typische wiederkehrende Aufgabe: [BESCHREIBUNG]

Aufgabe:
1. Lohnt sich Claude Code für mich – oder reicht der normale Chat?
2. Nenne 3 konkrete Aufgaben aus meinem Alltag, bei denen es einen Unterschied machen würde.
3. Was müsste ich vorher lernen?
4. Welche Risiken sollte ich kennen?

Sei ehrlich. Wenn der Chat für mich ausreicht, sag das.`,
        },
      ],
    },
  ],
  mistakes: [
    'Mit Claude Code anfangen, bevor man gute Prompts schreiben kann. Die Grundlagen aus Level 1 und 2 gelten hier genauso.',
    'Änderungen zustimmen, ohne sie gelesen zu haben.',
    'In einem Ordner mit wichtigen Daten arbeiten, von denen es keine Sicherung gibt.',
    'Annehmen, man müsse programmieren können. Für Dateiarbeit braucht man das nicht.',
  ],
  proTip:
    'Sag am Anfang jeder Aufgabe: *"Zeig mir erst, was du vorhast, und ändere noch nichts."* Diese eine Gewohnheit verhindert die allermeisten unangenehmen Überraschungen.',
  task: {
    md: 'Überlege dir drei Aufgaben aus deinem Alltag, bei denen mehrere Dateien gleichzeitig betroffen wären. Notiere für jede, was schiefgehen könnte, wenn eine Änderung falsch läuft.',
    solution:
      'Wenn bei einer Aufgabe „schlimmstenfalls sind die Originale weg" herauskommt, ist das kein Grund, es nicht zu tun – aber ein zwingender Grund, vorher eine Sicherung anzulegen. Wie das geht, steht in der Lektion über sicheres Arbeiten.',
  },
  exercise: {
    scenario: 'Du willst Claude Code zum ersten Mal ausprobieren.',
    question: 'In welchem Ordner startest du?',
    options: [
      {
        label: 'Im Ordner mit deinen wichtigsten Arbeitsdateien',
        correct: false,
        explain: 'Schlechter erster Versuch. Zum Kennenlernen nimmt man nichts Wichtiges.',
      },
      {
        label: 'In einem neuen Testordner mit Kopien unwichtiger Dateien',
        correct: true,
        explain:
          'Genau. Erst die Bedienung kennenlernen, dann an echte Daten – und die auch nur mit Sicherung.',
      },
      {
        label: 'Im obersten Ordner deines Computers',
        correct: false,
        explain:
          'Auf keinen Fall. Je größer der Bereich, desto größer der mögliche Schaden bei einem Missverständnis.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist der wichtigste Unterschied zum normalen Chat?',
      options: [
        {
          label: 'Claude Code kann Dateien auf deinem Rechner lesen und ändern',
          correct: true,
          explain: 'Nach deiner Zustimmung – aber er kann es.',
        },
        { label: 'Es ist ein anderes Modell', correct: false, explain: 'Es ist dieselbe Modellfamilie.' },
        { label: 'Es antwortet schneller', correct: false, explain: 'Nicht der Unterschied.' },
      ],
    },
    {
      q: 'Braucht man Programmierkenntnisse?',
      options: [
        { label: 'Ja, zwingend', correct: false, explain: 'Nein – für Dateiarbeit nicht.' },
        {
          label: 'Nein – für Datei- und Textarbeit reicht normale Sprache',
          correct: true,
          explain: 'Für echte Softwareentwicklung helfen sie natürlich sehr.',
        },
        { label: 'Nur für Websites', correct: false, explain: 'Auch dort kann man ohne starten.' },
      ],
    },
    {
      q: 'Was passiert, bevor Claude Code eine Datei ändert?',
      options: [
        {
          label: 'Er fragt dich und zeigt, was geändert werden soll',
          correct: true,
          explain: 'Du entscheidest – deshalb musst du die Änderung auch lesen.',
        },
        { label: 'Er ändert sofort', correct: false, explain: 'Nein.' },
        { label: 'Er legt automatisch ein Backup an', correct: false, explain: 'Darauf solltest du dich nicht verlassen – Sicherungen legst du selbst an.' },
      ],
    },
  ],
  related: ['cc-terminal', 'cc-sicher-arbeiten', 'wo-nutze-ich-claude'],
}
