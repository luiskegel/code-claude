import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'dokumente-erstellen',
  track: 'files',
  title: 'Dokumente erstellen',
  description:
    'Von der Notiz zum fertigen Bericht, Konzept oder Handbuch – mit einer Gliederung, die du vorher freigibst.',
  minutes: 7,
  keywords: ['bericht', 'konzept', 'dokument', 'gliederung', 'handbuch', 'protokoll', 'erstellen'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Lange Dokumente entstehen **nicht** in einem Prompt. Der verlässliche Weg ist: erst Gliederung, dann Abschnitt für Abschnitt.',
        },
        {
          type: 'steps',
          items: [
            { title: '1. Gliederung erzeugen lassen', md: 'Nur Überschriften und je ein Satz, worum es geht.' },
            { title: '2. Gliederung korrigieren', md: 'Hier entscheidest du – das dauert zwei Minuten und spart eine Stunde.' },
            { title: '3. Abschnitte einzeln schreiben lassen', md: 'Pro Abschnitt ein Prompt. Qualität bleibt gleichmäßig hoch.' },
            { title: '4. Am Ende zusammenfügen und glätten', md: 'Übergänge, Wiederholungen, Begriffe vereinheitlichen.' },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Wenn du „Schreib mir ein 10-seitiges Konzept" verlangst, passieren drei Dinge: Der Anfang ist gut, die Mitte wird dünn, und die Struktur ist nicht die, die du gebraucht hättest.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Die Gliederung ist der Hebel',
          md: 'Zwei Minuten in eine korrigierte Gliederung investiert sparen eine Stunde Umbauen. Ein Dokument mit falscher Struktur lässt sich nicht durch bessere Formulierungen retten.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Schritt 1 – Gliederung',
          prompt: `Ich brauche ein [BERICHT / KONZEPT / HANDBUCH] zum Thema [THEMA].

Zweck: [WOFÜR WIRD ES GEBRAUCHT?]
Zielgruppe: [WER LIEST ES, MIT WELCHEM VORWISSEN?]
Umfang: ungefähr [ANZAHL] Seiten.

Aufgabe – nur die Gliederung, noch keinen Text:
1. Vorschlag für die Abschnitte, mit je einem Satz Inhalt.
2. Geschätzter Umfang je Abschnitt.
3. Welche Informationen brauchst du von mir für welchen Abschnitt?
4. Was würdest du weglassen, obwohl man es oft hineinschreibt – und warum?

Frag nach, wenn dir etwas Wesentliches fehlt.`,
          note: 'Punkt 3 ist entscheidend: Du bekommst eine Materialliste, bevor du anfängst, statt mitten im Schreiben zu merken, dass Zahlen fehlen.',
        },
        {
          type: 'prompt',
          title: 'Schritt 3 – Abschnitt schreiben',
          prompt: `Wir schreiben jetzt Abschnitt [NUMMER]: [ÜBERSCHRIFT].

Was in diesen Abschnitt gehört:
[AUS DER GLIEDERUNG]

Mein Material dafür:
[ZAHLEN, FAKTEN, STICHPUNKTE]

Format: ca. [ANZAHL] Wörter, [FLIESSTEXT / STICHPUNKTE].

Regeln:
- Nichts erfinden. Fehlende Angaben als [FEHLT: ...] markieren.
- Keine Wiederholung dessen, was in früheren Abschnitten stand.
- Keine Einleitungs- und Abschlussfloskeln.`,
          note: 'Die Regel „keine Wiederholung" ist bei langen Dokumenten wichtig – sonst steht dieselbe Erklärung viermal drin.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Schritt 4 – das fertige Dokument glätten',
          blocks: [
            {
              type: 'prompt',
              title: 'Endkontrolle',
              prompt: `Hier ist das vollständige Dokument.

Prüfe:
1. Wiederholungen – welche Inhalte stehen mehrfach drin?
2. Begriffe – werden dieselben Dinge überall gleich benannt?
3. Brüche – wo passt der Ton oder die Detailtiefe nicht zum Rest?
4. Lücken – welche Frage stellt sich beim Lesen und wird nicht beantwortet?
5. Übergänge – wo fehlt eine Verbindung zwischen zwei Abschnitten?

Format: Liste mit Fundstelle und konkretem Vorschlag.
Schreib das Dokument NICHT neu – nenne nur die Änderungen.`,
              note: '„Schreib es nicht neu" ist wichtig: Sonst bekommst du eine komplette Neufassung und musst alles erneut prüfen.',
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
          title: 'Beispiel anzeigen: Prozessdokumentation',
          example: {
            task: 'Ein Prozess existiert nur im Kopf einer Kollegin, die in Rente geht. Es soll eine Dokumentation entstehen.',
            bad: '`Schreib eine Dokumentation für unseren Bestellprozess.`\n→ Ein allgemeiner Text über Bestellprozesse. Ohne euer Wissen wertlos.',
            good: `**Schritt 1:** \`Ich muss einen Prozess dokumentieren, den bisher nur eine Person kennt.
Stell mir 12 Fragen, mit denen ich ihr Wissen vollständig abfrage.
Sortiere die Fragen so, dass sie im Gespräch natürlich aufeinander aufbauen.\`

**Schritt 2:** Fragen im Gespräch beantworten lassen, Antworten mitschreiben.

**Schritt 3:** \`Hier sind die Antworten. Erstelle daraus eine Prozessdokumentation.
Format: Ziel | Auslöser | Schritte (nummeriert, je mit Verantwortlichem) | Ausnahmen | Was schiefgehen kann.
Markiere alles, was unklar blieb, mit [NACHFRAGEN].\``,
            why: 'Claude liefert die **Fragen** – das Wissen kommt aus dem Kopf der Kollegin. Genau so herum funktioniert Dokumentation.',
            result:
              'Eine Dokumentation mit echtem Firmenwissen statt allgemeiner Prozesstheorie – plus einer Liste offener Punkte für ein zweites Gespräch.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Wissen abfragen lassen',
          prompt: `Ich muss folgendes dokumentieren: [THEMA].

Aufgabe:
Stell mir [ANZAHL] Fragen, mit denen du alles Nötige von mir erfährst.

Regeln:
- Eine Frage pro Punkt, keine Mehrfachfragen.
- Sortiere so, dass die Fragen aufeinander aufbauen.
- Frag auch nach den Dingen, die man typischerweise vergisst (Ausnahmen, Sonderfälle, Zuständigkeiten).
- Stell keine Fragen, deren Antwort du dir selbst herleiten kannst.

Warte auf meine Antworten, bevor du schreibst.`,
          note: 'Dieser Prompt ist die halbe Miete bei jeder Dokumentation: Er verwandelt „ich muss alles aufschreiben" in ein strukturiertes Interview.',
        },
      ],
    },
  ],
  mistakes: [
    'Ein langes Dokument in einem einzigen Prompt verlangen.',
    'Die Gliederung nicht prüfen und später die Struktur umbauen müssen.',
    'Kein eigenes Material liefern – dann entsteht allgemeingültiger, aber nutzloser Text.',
    'Beim Glätten das ganze Dokument neu schreiben lassen und dadurch geprüfte Stellen wieder unsicher machen.',
  ],
  proTip:
    'Lass am Ende eine **Version für Eilige** erzeugen: eine Seite Zusammenfassung, die dem Dokument vorangestellt wird. Die meisten Leser lesen nur diese – und du hast sie in 30 Sekunden.',
  task: {
    md: 'Plane ein Dokument, das du wirklich brauchst: Lass eine Gliederung erzeugen, streiche und ergänze Abschnitte, und lass dir die Materialliste geben. Schreib noch keinen Text – nur bis hierhin.',
    solution:
      'Wenn du die Materialliste in der Hand hast, ist die eigentliche Arbeit klar geworden: Meist fehlen zwei bis drei konkrete Zahlen oder Festlegungen. Die zu beschaffen ist der echte Engpass – nicht das Formulieren.',
  },
  exercise: {
    scenario: 'Du brauchst ein 15-seitiges Konzept.',
    question: 'Wie gehst du vor?',
    options: [
      {
        label: 'In einem Prompt das komplette Konzept anfordern',
        correct: false,
        explain:
          'Der Anfang wird gut, die Mitte dünn – und die Struktur passt meist nicht zu deinem Zweck.',
      },
      {
        label: 'Erst Gliederung erzeugen und korrigieren, dann Abschnitt für Abschnitt',
        correct: true,
        explain:
          'Gleichmäßige Qualität, du behältst die Kontrolle über die Struktur, und du siehst früh, welches Material fehlt.',
      },
      {
        label: 'Mehrere Konzepte generieren und das beste nehmen',
        correct: false,
        explain: 'Viel Aufwand, und keines passt genau – weil in keinem dein Material steckt.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist der wichtigste Schritt bei langen Dokumenten?',
      options: [
        {
          label: 'Die Gliederung vor dem Schreiben prüfen',
          correct: true,
          explain: 'Falsche Struktur lässt sich später kaum reparieren.',
        },
        { label: 'Ein möglichst langer Prompt', correct: false, explain: 'Hilft nicht.' },
        { label: 'Viele Beispiele', correct: false, explain: 'Nützlich für Stil, nicht für Struktur.' },
      ],
    },
    {
      q: 'Wie verhinderst du erfundene Inhalte im Dokument?',
      options: [
        {
          label: 'Mit der Regel „Fehlendes als [FEHLT: ...] markieren"',
          correct: true,
          explain: 'So siehst du Lücken, statt sie zu übersehen.',
        },
        { label: 'Durch kürzere Abschnitte', correct: false, explain: 'Ändert daran nichts.' },
        { label: 'Gar nicht', correct: false, explain: 'Doch – die Markierungsregel wirkt sehr zuverlässig.' },
      ],
    },
    {
      q: 'Was solltest du beim Glätten vermeiden?',
      options: [
        { label: 'Nach Wiederholungen suchen lassen', correct: false, explain: 'Das ist genau richtig.' },
        {
          label: 'Das ganze Dokument neu schreiben lassen',
          correct: true,
          explain: 'Dann musst du alle geprüften Stellen erneut prüfen.',
        },
        { label: 'Begriffe vereinheitlichen lassen', correct: false, explain: 'Sinnvoll.' },
      ],
    },
  ],
  related: ['texte-erstellen', 'ergebnisse-strukturieren', 'lange-aufgaben'],
}
