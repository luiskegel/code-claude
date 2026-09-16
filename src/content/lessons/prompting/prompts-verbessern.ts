import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'prompts-verbessern',
  track: 'prompting',
  title: 'Prompts verbessern',
  description:
    'Ein festes Verfahren, mit dem du jeden schwachen Prompt in drei Schritten verbesserst – plus der interaktive Prompt-Verbesserer dieser Academy.',
  minutes: 7,
  keywords: ['verbessern', 'optimieren', 'überarbeiten', 'schwach', 'stark', 'prompt verbesserer'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Prompts verbessern ist keine Kunst, sondern eine Checkliste. Fast alle schwachen Prompts haben dieselben vier Lücken.',
        },
        {
          type: 'table',
          head: ['Lücke', 'Symptom im Ergebnis', 'Reparatur'],
          rows: [
            ['Kein Ziel', 'Antwort geht am Zweck vorbei', 'Sag, wofür du das Ergebnis brauchst'],
            ['Kein Kontext', 'Antwort ist austauschbar', 'Situation in 2–3 Sätzen beschreiben'],
            ['Kein Format', 'Zu lang, falsche Form', 'Länge und Struktur nennen'],
            ['Keine Zielgruppe', 'Falsches Sprachniveau', 'Sagen, wer es liest'],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Diese Academy hat dafür ein Werkzeug',
          md: 'Unter [Prompt verbessern](/prompt-verbessern) kannst du deinen eigenen Prompt einfügen. Du bekommst eine strukturierte Fassung und eine Erklärung, was verändert wurde und warum.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die meisten Menschen schreiben ihren Prompt einmal, sind unzufrieden und schieben es auf die KI. Dabei liegt der Unterschied fast immer in den vier Lücken oben.',
        },
        {
          type: 'compare',
          badTitle: 'Der typische schwache Prompt',
          badMd: '`Schreib mir einen Text über Autos.`',
          goodTitle: 'Nach der Checkliste',
          goodMd: `\`Aufgabe:
Schreib einen Ratgebertext über den Kauf eines gebrauchten Kleinwagens.

Kontext:
Für den Blog einer Kfz-Werkstatt. Die Leser sind Privatleute, die zum ersten Mal ein gebrauchtes Auto kaufen und Angst haben, übers Ohr gehauen zu werden.

Anforderungen:
- Konkrete Prüfpunkte statt allgemeiner Tipps
- Keine Werbung für bestimmte Marken
- Auch sagen, wann man besser Abstand nimmt

Format:
600 Wörter, Zwischenüberschriften, am Ende eine Checkliste mit 8 Punkten.

Zielgruppe:
Erstkäufer ohne technisches Vorwissen.\``,
          why: 'Aus einem Thema ist ein **Auftrag** geworden: mit Zweck, Publikum, Grenzen und überprüfbarem Ergebnis.',
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
              title: 'Schritt 1 – Symptom benennen',
              md: 'Was genau stört am Ergebnis? Zu lang, zu allgemein, falscher Ton, falscher Inhalt? Ein Symptom pro Runde.',
            },
            {
              title: 'Schritt 2 – Lücke zuordnen',
              md: 'Nutze die Tabelle oben. Zu allgemein → Kontext fehlt. Zu lang → Format fehlt. Falsches Niveau → Zielgruppe fehlt.',
            },
            {
              title: 'Schritt 3 – Gezielt ergänzen',
              md: 'Ergänze nur die fehlende Angabe, statt den Prompt komplett neu zu schreiben. So siehst du, was wirkt.',
            },
            {
              title: 'Schritt 4 – Guten Prompt aufheben',
              md: 'Speichere ihn. Ein funktionierender Prompt ist ein Werkzeug, das du jede Woche wieder benutzt.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Claude kann seine eigenen Prompts verbessern',
          md: 'Das ist einer der nützlichsten Tricks überhaupt: Lass Claude deinen Prompt analysieren, bevor du ihn benutzt.',
        },
        {
          type: 'prompt',
          title: 'Prompt-Doktor',
          prompt: `Hier ist mein Prompt:

---
[DEIN PROMPT]
---

Aufgabe:
1. Nenne die 3 größten Schwächen dieses Prompts.
2. Sag zu jeder Schwäche, welches Problem sie im Ergebnis verursacht.
3. Schreib eine verbesserte Fassung.
4. Markiere, was du ergänzt hast und warum.
5. Nenne 2 Varianten der verbesserten Fassung für unterschiedliche Ziele.

Erfinde keine Inhalte, die ich nicht genannt habe – markiere stattdessen Stellen, die ich ausfüllen muss.`,
          note: 'Punkt 5 ist besonders nützlich: Du siehst, wie sich derselbe Prompt für unterschiedliche Zwecke ändert.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: von 4 Wörtern zum Arbeitsauftrag',
          example: {
            task: 'Du willst eine Zusammenfassung eines langen Berichts.',
            bad: '`Fass den Bericht zusammen.`\n→ 15 Absätze. Nicht kürzer als das Original gefühlt.',
            good: `\`Fasse den Bericht zusammen.

Ziel: Ich muss morgen im Vorstand in 3 Minuten erklären, was drinsteht.

Format:
- 5 Kernaussagen, je maximal 2 Zeilen
- 3 Zahlen, die für die Entscheidung wichtig sind
- 2 Risiken
- 1 Satz Empfehlung

Was nicht passieren darf:
- Keine Wiederholung der Gliederung des Berichts
- Nichts hinzufügen, was nicht im Bericht steht\``,
            why: 'Das Ziel („3 Minuten im Vorstand") bestimmt alles Weitere. Aus „zusammenfassen" wird eine konkrete Ergebnisform.',
            result:
              'Eine halbe Seite, die du direkt vorlesen kannst – statt einer Kurzfassung, die selbst wieder zusammengefasst werden müsste.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Probier es direkt aus: Öffne den [Prompt-Verbesserer](/prompt-verbessern) dieser Academy, füge einen eigenen Prompt ein und sieh dir die strukturierte Fassung an.',
        },
        {
          type: 'prompt',
          title: 'A/B-Test deines Prompts',
          prompt: `Ich teste zwei Fassungen desselben Auftrags.

Fassung A:
[PROMPT A]

Fassung B:
[PROMPT B]

Aufgabe:
1. Beantworte beide Fassungen kurz (je maximal 120 Wörter).
2. Sag mir, welche Fassung das bessere Ergebnis liefert und woran das liegt.
3. Baue eine Fassung C, die die Stärken von beiden vereint.`,
          note: 'So lernst du sehr schnell, welche Prompt-Elemente bei deinen Aufgaben tatsächlich etwas bewirken.',
        },
      ],
    },
  ],
  mistakes: [
    'Bei jeder Korrektur alles gleichzeitig ändern – dann weißt du nie, was gewirkt hat.',
    'Gute Prompts nicht speichern und jedes Mal neu erfinden.',
    'Den Prompt immer länger machen, statt die fehlende Angabe gezielt zu ergänzen.',
    'Vergessen, das Ziel zu nennen ("wofür brauche ich das Ergebnis?") – die wirkungsvollste Einzelangabe.',
  ],
  proTip:
    'Führe eine eigene kleine Prompt-Sammlung – zum Beispiel über die Favoriten-Funktion dieser Academy. Fünf gut funktionierende Prompts decken erfahrungsgemäß den größten Teil des Arbeitsalltags ab.',
  task: {
    md: 'Nimm deinen schlechtesten Prompt der letzten Woche. Verbessere ihn in **drei einzelnen Schritten** – jeweils nur eine Ergänzung. Notiere, welcher Schritt den größten Unterschied gemacht hat.',
    solution:
      'Bei den meisten Menschen ist es der **Zweck** („wofür brauche ich das?") oder die **Zielgruppe**. Beide kosten fünf Wörter und verändern das Ergebnis mehr als jede Formulierungsfeinheit.',
  },
  exercise: {
    scenario: 'Deine Ergebnisse sind regelmäßig doppelt so lang wie gewünscht.',
    question: 'Welche Lücke hat dein Prompt?',
    options: [
      { label: 'Kein Kontext', correct: false, explain: 'Fehlender Kontext macht Antworten allgemein, nicht lang.' },
      {
        label: 'Kein Format – konkret: keine Längenbegrenzung',
        correct: true,
        explain:
          '„Maximal 120 Wörter" oder „höchstens 5 Stichpunkte" löst das sofort.',
      },
      { label: 'Keine Rolle', correct: false, explain: 'Rollen beeinflussen die Perspektive, nicht die Länge.' },
    ],
  },
  quiz: [
    {
      q: 'Was ist die wirkungsvollste einzelne Ergänzung?',
      options: [
        {
          label: 'Der Zweck: wofür brauchst du das Ergebnis?',
          correct: true,
          explain: 'Er bestimmt Form, Länge und Schwerpunkt der ganzen Antwort.',
        },
        { label: 'Eine Höflichkeitsformel', correct: false, explain: 'Ohne Wirkung.' },
        { label: 'Ein längerer Einleitungssatz', correct: false, explain: 'Bringt nichts.' },
      ],
    },
    {
      q: 'Warum sollte man pro Runde nur eine Sache ändern?',
      options: [
        { label: 'Um Zeit zu sparen', correct: false, explain: 'Es dauert sogar minimal länger.' },
        {
          label: 'Um zu erkennen, welche Änderung gewirkt hat',
          correct: true,
          explain: 'So lernst du, was bei deinen Aufgaben wirklich hilft.',
        },
        { label: 'Weil Claude sonst überfordert ist', correct: false, explain: 'Das ist nicht der Grund.' },
      ],
    },
    {
      q: 'Was solltest du mit einem gut funktionierenden Prompt tun?',
      options: [
        { label: 'Löschen', correct: false, explain: 'Dann fängst du nächste Woche wieder von vorn an.' },
        {
          label: 'Speichern und wiederverwenden',
          correct: true,
          explain: 'Ein funktionierender Prompt ist ein Werkzeug, kein Wegwerfartikel.',
        },
        { label: 'Jedes Mal neu schreiben', correct: false, explain: 'Verschwendete Zeit.' },
      ],
    },
  ],
  related: ['bessere-antworten', 'fehler-korrigieren', 'gute-prompts'],
}
