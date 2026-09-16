import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'gute-prompts',
  track: 'prompting',
  title: 'Gute Prompts schreiben',
  description:
    'Die erweiterte Prompt-Struktur mit sechs Bausteinen – und wann du welche davon wirklich brauchst.',
  minutes: 8,
  keywords: ['prompt engineering', 'struktur', 'bausteine', 'aufbau', 'vorlage'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'In Level 1 hast du **Aufgabe + Kontext + Format** gelernt. Für anspruchsvollere Aufgaben kommen drei weitere Bausteine dazu.',
        },
        {
          type: 'table',
          head: ['Baustein', 'Beantwortet', 'Brauchst du, wenn …'],
          rows: [
            ['**Rolle**', 'Aus welcher Perspektive?', '… ein fachlicher Blickwinkel wichtig ist'],
            ['**Aufgabe**', 'Was genau tun?', '… immer'],
            ['**Kontext**', 'Was muss Claude wissen?', '… fast immer'],
            ['**Anforderungen**', 'Was muss gelten, was ist verboten?', '… es Qualitätskriterien gibt'],
            ['**Format**', 'Wie soll es aussehen?', '… du das Ergebnis weiterverwendest'],
            ['**Zielgruppe**', 'Für wen ist das?', '… ein Mensch es lesen wird'],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Nicht alle sechs auf einmal',
          md: 'Ein guter Prompt ist nicht der längste. Nimm die Bausteine, die für **deine** Aufgabe einen Unterschied machen. Für „Wie schreibe ich Konjunktiv?" reicht die Aufgabe allein.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Jeder Baustein entfernt eine bestimmte Art von Unschärfe. Was passiert, wenn er fehlt:',
        },
        {
          type: 'list',
          items: [
            'Ohne **Rolle** → allgemeine Antwort statt Fachblick.',
            'Ohne **Kontext** → generische Antwort, die auf jeden und niemanden passt.',
            'Ohne **Anforderungen** → du musst hinterher aufräumen (zu werblich, falsche Begriffe, fehlende Punkte).',
            'Ohne **Format** → Fließtext, wo du eine Tabelle brauchtest.',
            'Ohne **Zielgruppe** → falsches Sprachniveau, zu viel oder zu wenig Vorwissen unterstellt.',
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Die vollständige Struktur',
          prompt: `Du bist [ROLLE].

Deine Aufgabe:
[WAS SOLL GETAN WERDEN?]

Kontext:
[HINTERGRUND, SITUATION, VORGESCHICHTE]

Anforderungen:
- [MUSS-KRITERIUM 1]
- [MUSS-KRITERIUM 2]
- [WAS AUF KEINEN FALL PASSIEREN DARF]

Format:
[LÄNGE, STRUKTUR, SPRACHE]

Zielgruppe:
[WER LIEST DAS UND MIT WELCHEM VORWISSEN?]`,
          note: 'Das ist die Vorlage, auf die fast alle Prompts in der Bibliothek dieser Academy aufbauen. Lösche einfach die Zeilen, die du nicht brauchst.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Reihenfolge ist egal – Klarheit nicht',
          md: 'Ob Rolle oben oder unten steht, ändert wenig. Was stark wirkt: **Überschriften** („Aufgabe:", „Format:"). Sie trennen Anweisung von Material und verhindern, dass Claude deinen Beispieltext für eine Anweisung hält.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Material vom Auftrag trennen',
          blocks: [
            {
              type: 'text',
              md: 'Sobald du längeren Text mitschickst, markiere ihn klar. Sonst kann es passieren, dass Claude Sätze aus deinem Material als Anweisung auffasst.',
            },
            {
              type: 'code',
              lang: 'text',
              caption: 'Klare Trennung',
              code: `Aufgabe:
Fasse den folgenden Text in 5 Stichpunkten zusammen.

--- TEXT ANFANG ---
[dein langer Text]
--- TEXT ENDE ---`,
            },
            {
              type: 'text',
              md: 'Diese einfache Trennung erspart dir überraschend viele merkwürdige Antworten.',
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
          title: 'Beispiel anzeigen: Stellenanzeige',
          example: {
            task: 'Du brauchst eine Stellenanzeige für eine Bürokraft in einem kleinen Betrieb.',
            bad: '`Schreib eine Stellenanzeige für eine Bürokraft.`',
            good: `\`Du bist erfahrene Recruiterin für kleine Handwerksbetriebe.

Deine Aufgabe:
Schreib eine Stellenanzeige für eine Bürokraft in Teilzeit (25 h).

Kontext:
Sanitärbetrieb mit 12 Mitarbeitenden, familiär, keine Großraumbüro-Atmosphäre. Aufgaben: Telefon, Angebote schreiben, Terminplanung. Wir finden seit 6 Monaten niemanden.

Anforderungen:
- Ehrlich, keine Übertreibungen
- Konkrete Aufgaben statt Floskeln
- Gehaltsspanne wird genannt
- KEINE Formulierungen wie "dynamisches Team" oder "spannende Herausforderung"

Format:
Maximal 250 Wörter, mit Zwischenüberschriften.

Zielgruppe:
Menschen mit Bürokenntnissen, die einen ruhigen, verlässlichen Arbeitsplatz suchen.\``,
            why: 'Die Anforderungen („keine Floskeln", „Gehaltsspanne nennen") sind hier der eigentliche Hebel. Sie verhindern genau das, was die meisten Stellenanzeigen unbrauchbar macht.',
            result:
              'Eine Anzeige, die sich von den 20 anderen im Portal unterscheidet – weil sie konkret ist.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Baustein-Check für deinen eigenen Prompt',
          prompt: `Hier ist ein Prompt, den ich geschrieben habe:

---
[DEIN PROMPT]
---

Aufgabe:
1. Prüfe, welche der folgenden Bausteine fehlen: Rolle, Aufgabe, Kontext, Anforderungen, Format, Zielgruppe.
2. Sag mir für jeden fehlenden Baustein, ob er hier überhaupt nötig ist.
3. Schreib eine verbesserte Fassung.
4. Erkläre in 3 Sätzen, warum die neue Fassung besser ist.`,
          note: 'Punkt 2 ist wichtig – er verhindert, dass dein Prompt unnötig aufgebläht wird.',
        },
      ],
    },
  ],
  mistakes: [
    'Alle sechs Bausteine auch dann verwenden, wenn zwei gereicht hätten.',
    'Anforderungen nur positiv formulieren. Das Verbotene ("keine Floskeln") wirkt oft stärker.',
    'Material und Anweisung vermischen, sodass Claude nicht erkennt, was Auftrag und was Inhalt ist.',
    'Die Zielgruppe weglassen – dabei ist sie der Baustein mit dem besten Aufwand-Nutzen-Verhältnis.',
  ],
  proTip:
    'Formuliere Anforderungen als **überprüfbare Kriterien**. Statt „gut lesbar" schreib „keine Sätze über 20 Wörter, keine Fachbegriffe ohne Erklärung". Überprüfbare Kriterien kann Claude einhalten – vage Wünsche nicht.',
  task: {
    md: 'Nimm die vollständige Vorlage und schreibe damit einen Prompt für eine echte Aufgabe aus deinem Alltag. Streiche anschließend jeden Baustein, der nichts beiträgt. Wie viele bleiben übrig?',
    solution:
      'Bei den meisten Alltagsaufgaben bleiben **vier** übrig: Aufgabe, Kontext, Format, Zielgruppe. Rolle und Anforderungen lohnen sich vor allem bei fachlichen oder qualitätskritischen Aufgaben.',
  },
  exercise: {
    scenario: 'Du willst einen Text schreiben lassen, der typische KI-Floskeln vermeidet.',
    question: 'Welcher Baustein ist dafür entscheidend?',
    options: [
      {
        label: 'Rolle',
        correct: false,
        explain:
          'Hilft beim fachlichen Blickwinkel, aber Floskeln verschwinden davon nicht zuverlässig.',
      },
      {
        label: 'Anforderungen – speziell die Negativ-Regeln',
        correct: true,
        explain:
          '„Keine Einleitungsfloskeln, keine Superlative, kein Marketing-Sprech" wirkt direkt und messbar.',
      },
      {
        label: 'Format',
        correct: false,
        explain: 'Das Format regelt die Struktur, nicht den Sprachstil.',
      },
    ],
  },
  quiz: [
    {
      q: 'Welcher Baustein hat das beste Aufwand-Nutzen-Verhältnis?',
      options: [
        {
          label: 'Zielgruppe',
          correct: true,
          explain: 'Drei Wörter, die Ton und Tiefe der gesamten Antwort verändern.',
        },
        { label: 'Rolle', correct: false, explain: 'Hilfreich, aber nicht in jeder Aufgabe nötig.' },
        {
          label: 'Format',
          correct: false,
          explain: 'Wichtig, wenn du das Ergebnis weiterverwendest – aber nicht immer.',
        },
      ],
    },
    {
      q: 'Wie formulierst du Anforderungen am wirksamsten?',
      options: [
        {
          label: 'Als überprüfbare Kriterien',
          correct: true,
          explain: '„Keine Sätze über 20 Wörter" statt „gut lesbar".',
        },
        {
          label: 'So allgemein wie möglich',
          correct: false,
          explain: 'Allgemeine Wünsche kann niemand überprüfen – auch Claude nicht.',
        },
        {
          label: 'Als Frage',
          correct: false,
          explain: 'Anforderungen sind Vorgaben, keine Fragen.',
        },
      ],
    },
    {
      q: 'Warum solltest du Material klar abgrenzen?',
      options: [
        {
          label: 'Damit es schöner aussieht',
          correct: false,
          explain: 'Optik ist nicht der Grund.',
        },
        {
          label: 'Damit Claude Anweisung und Inhalt nicht verwechselt',
          correct: true,
          explain: 'Sonst können Sätze aus deinem Material als Auftrag gelesen werden.',
        },
        {
          label: 'Damit der Prompt kürzer wird',
          correct: false,
          explain: 'Er wird dadurch minimal länger – aber deutlich zuverlässiger.',
        },
      ],
    },
  ],
  related: ['kontext-geben', 'rollen-und-aufgaben', 'ergebnisse-strukturieren'],
}
