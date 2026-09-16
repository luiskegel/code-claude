import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-aenderungen-pruefen',
  track: 'claude-code',
  title: 'Änderungen kontrollieren',
  description:
    'Wie man einen Diff liest, worauf man achtet – und was man tut, wenn etwas nicht stimmt.',
  minutes: 6,
  keywords: ['prüfen', 'diff', 'kontrolle', 'review', 'rückgängig', 'git diff'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein **Diff** zeigt dir zeilengenau, was sich geändert hat: was hinzugekommen ist und was verschwunden ist.',
        },
        {
          type: 'code',
          lang: 'text',
          caption: 'So liest man einen Diff',
          code: `--- a/inhalte/leistungen.md
+++ b/inhalte/leistungen.md
@@ -3,7 +3,5 @@
 Wir bieten Ihnen ein umfassendes Leistungsspektrum.

-Unsere innovativen und maßgeschneiderten Lösungen setzen
-neue Maßstäbe in der Branche und begeistern Kunden seit
-über 20 Jahren immer wieder aufs Neue.
+Wir arbeiten seit 20 Jahren in diesem Bereich.

 Rufen Sie uns an.`,
        },
        {
          type: 'list',
          items: [
            'Zeilen mit **`-`** wurden **entfernt**.',
            'Zeilen mit **`+`** wurden **hinzugefügt**.',
            'Zeilen ohne Zeichen blieben unverändert – sie stehen nur als Orientierung dabei.',
            '`@@ -3,7 +3,5 @@` sagt, an welcher Stelle der Datei du dich befindest.',
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Der Diff ist das einzige Dokument, das dir sagt, **was tatsächlich passiert ist**. Die Zusammenfassung von Claude sagt dir, was gemeint war. Das ist meistens dasselbe – aber eben nicht immer.',
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Worauf man besonders achtet',
          md: 'Nicht auf das, was hinzugefügt wurde – sondern auf das, was **entfernt** wurde. Verschwundene Zeilen sind die häufigste unangenehme Überraschung.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          caption: 'Prüfen nach einer Änderung',
          code: `# Welche Dateien wurden angefasst?
git status

# Was genau hat sich geändert?
git diff

# Nur eine bestimmte Datei
git diff inhalte/leistungen.md

# Nur die Namen der geänderten Dateien
git diff --name-only`,
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Erst die Dateiliste',
              md: '`git status`. Sind nur die Dateien dabei, die dabei sein sollten? Wenn nein: sofort stoppen.',
            },
            {
              title: 'Dann die entfernten Zeilen',
              md: 'Alle `-`-Zeilen durchgehen. War jede davon wirklich überflüssig?',
            },
            {
              title: 'Dann die hinzugefügten Zeilen',
              md: 'Stimmt der Inhalt? Ist er im richtigen Ton? Wurde nichts erfunden?',
            },
            {
              title: 'Zuletzt ausprobieren',
              md: 'Wenn es etwas Ausführbares ist: starten und ansehen. Bei Texten: einmal lesen.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Prüfung durch Claude unterstützen lassen',
          prompt: `Erkläre mir deine Änderungen, bevor ich sie übernehme.

1. Liste jede geänderte Datei auf.
2. Sag pro Datei in einem Satz, was sich geändert hat.
3. Welche Inhalte wurden ENTFERNT? Liste sie einzeln auf.
4. Gibt es Änderungen, die über meine Aufgabe hinausgehen?
5. Was könnte durch diese Änderungen kaputtgegangen sein?
6. Welche Stelle sollte ich am gründlichsten prüfen?

Sei ehrlich bei Punkt 4. Wenn du mehr geändert hast als beauftragt, sag es.`,
          note: 'Punkt 3 und 4 sind der Kern. Sie ersetzen den Diff nicht – aber sie sagen dir, wo du beim Lesen genauer hinsehen musst.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wenn etwas nicht stimmt',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              caption: 'Änderungen verwerfen',
              code: `# Eine einzelne Datei auf den gesicherten Stand zurücksetzen
git restore inhalte/leistungen.md

# ALLE ungesicherten Änderungen verwerfen
git restore .`,
            },
            {
              type: 'callout',
              variant: 'danger',
              md: '`git restore` löscht deine ungesicherten Änderungen **endgültig**. Das ist der Zweck – aber sei sicher, dass du wirklich alles verwerfen willst. Im Zweifel: vorher `git commit -m "Zwischenstand vor dem Verwerfen"`, dann kannst du es dir noch überlegen.',
            },
            {
              type: 'text',
              md: 'Oft ist Verwerfen aber gar nicht nötig. Besser: gezielt korrigieren lassen.',
            },
            {
              type: 'prompt',
              title: 'Gezielt korrigieren',
              prompt: `In deiner Änderung stimmt etwas nicht.

Datei: [DATEI]
Stelle: [WELCHE ZEILE ODER WELCHER ABSCHNITT]
Problem: [WAS IST FALSCH]

Aufgabe:
1. Korrigiere nur diese Stelle.
2. Lass alle anderen Änderungen unverändert.
3. Zeig mir vorher, was du ändern willst.

Wenn du meine Einschätzung für falsch hältst, sag es und begründe.`,
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
          title: 'Beispiel anzeigen: Die stille Löschung',
          example: {
            task: 'Du hast Texte kürzen lassen. Die Zusammenfassung lautet: „Alle Abschnitte auf maximal 4 Sätze gekürzt."',
            bad: 'Zusammenfassung lesen, zufrieden sein, committen.',
            good: `\`git diff\` lesen – und in den \`-\`-Zeilen entdecken:

\`\`\`diff
-Hinweis: Für Bestandskunden gilt weiterhin der alte Tarif
-bis zum 31.12.
\`\`\`

Dieser Satz war keine Länge, sondern eine wichtige Information. Er fiel dem Kürzen zum Opfer.`,
            why: 'Die Zusammenfassung war korrekt – gekürzt wurde tatsächlich. Sie sagte nur nicht, **was** dabei weggefallen ist.',
            result:
              'Der Hinweis wird wieder eingefügt. Gefunden in 20 Sekunden – weil du die `-`-Zeilen gelesen hast.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Übung im Testordner: Lass eine Datei ändern, lies den Diff und beantworte für dich drei Fragen:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Welche Zeilen sind verschwunden – und war jede davon wirklich entbehrlich?',
            'Enthält eine hinzugefügte Zeile eine Information, die ich nicht geliefert habe?',
            'Wurde eine Datei angefasst, die ich nicht genannt hatte?',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          md: 'Wenn du diese drei Fragen zur Gewohnheit machst, hast du die Kontrolle über alles, was Claude Code in deinem Projekt tut.',
        },
      ],
    },
  ],
  mistakes: [
    'Nur die Zusammenfassung lesen statt den Diff.',
    'Nur auf die hinzugefügten Zeilen achten und die entfernten überfliegen.',
    'Committen, bevor geprüft wurde.',
    'Bei einem kleinen Fehler alles verwerfen, statt gezielt korrigieren zu lassen.',
  ],
  proTip:
    'Lies Diffs immer **von den Minus-Zeilen her**. Was hinzugefügt wurde, siehst du sowieso. Was verschwunden ist, übersieht man – und genau dort sitzen die teuren Fehler.',
  task: {
    md: 'Lass eine Änderung an einer Textdatei durchführen und prüfe den Diff mit den drei Fragen. Notiere, ob dir etwas aufgefallen wäre, wenn du nur die Zusammenfassung gelesen hättest.',
    solution:
      'Bei einfachen Änderungen meist nicht – dort stimmen Zusammenfassung und Diff überein. Der Unterschied zeigt sich bei Kürzungen, Umstrukturierungen und allem, wo etwas wegfällt.',
  },
  exercise: {
    scenario:
      'Im Diff siehst du eine `-`-Zeile mit einem Satz, den du nicht zum Streichen freigegeben hattest.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Alle Änderungen verwerfen',
        correct: false,
        explain:
          'Überreaktion – die anderen 95 % der Änderung waren vielleicht genau richtig.',
      },
      {
        label: 'Gezielt korrigieren lassen: nur diese Stelle, Rest unverändert',
        correct: true,
        explain:
          'Punktgenaue Korrektur erhält alles, was schon stimmt.',
      },
      {
        label: 'Committen und später beheben',
        correct: false,
        explain: 'Dann steht der Fehler im gesicherten Stand – und wird leicht vergessen.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was bedeutet eine Zeile mit `-` im Diff?',
      options: [
        { label: 'Sie wurde entfernt', correct: true, explain: 'Und genau darauf achtest du zuerst.' },
        { label: 'Sie wurde hinzugefügt', correct: false, explain: 'Das ist `+`.' },
        { label: 'Sie ist fehlerhaft', correct: false, explain: 'Nein, nur entfernt.' },
      ],
    },
    {
      q: 'Was prüfst du zuerst?',
      options: [
        {
          label: 'Die Liste der geänderten Dateien',
          correct: true,
          explain: 'Ist eine Datei dabei, die nicht dabei sein sollte, kannst du dir den Rest sparen.',
        },
        { label: 'Die hinzugefügten Zeilen', correct: false, explain: 'Kommt später.' },
        { label: 'Die Dateigröße', correct: false, explain: 'Sagt nichts aus.' },
      ],
    },
    {
      q: 'Was ist bei einem kleinen Fehler in der Änderung sinnvoller als Verwerfen?',
      options: [
        {
          label: 'Gezielte Korrektur der betroffenen Stelle',
          correct: true,
          explain: 'Erhält alles, was schon richtig war.',
        },
        { label: 'Alles neu machen lassen', correct: false, explain: 'Verschwendet die gute Arbeit.' },
        { label: 'Den Fehler ignorieren', correct: false, explain: 'Sicher nicht.' },
      ],
    },
  ],
  related: ['cc-aenderungen', 'cc-projekt', 'cc-fehler-finden'],
}
