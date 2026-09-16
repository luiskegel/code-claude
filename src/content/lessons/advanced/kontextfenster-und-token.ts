import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'kontextfenster-und-token',
  track: 'advanced',
  title: 'Kontextfenster und Token',
  description:
    'Was ein Token ist, wie groß das Kontextfenster ist und welche praktischen Folgen das für deine Arbeit hat.',
  minutes: 6,
  keywords: ['token', 'kontextfenster', 'länge', 'grenze', 'limit', 'kosten', 'speicher'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein **Token** ist ein Textbaustein – etwa ein Wortteil. Das **Kontextfenster** ist die Obergrenze dafür, wie viele Token gleichzeitig berücksichtigt werden können.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Text wird vor der Verarbeitung in Token zerlegt – Einheiten, die zwischen einem Zeichen und einem ganzen Wort liegen. Das Kontextfenster begrenzt die Summe aus Eingabe- und Ausgabe-Token, die ein Modell in einem Durchgang verarbeiten kann.',
            },
            {
              label: 'Einfach',
              md: 'Text wird in kleine Stücke zerlegt. Davon passt nur eine bestimmte Menge gleichzeitig hinein – sehr viel, aber nicht unendlich.',
            },
            {
              label: 'Ganz einfach',
              md: 'Claude kann sehr viel auf einmal lesen – aber nicht beliebig viel.',
            },
          ],
        },
        {
          type: 'table',
          head: ['Faustregel für deutschen Text', 'Ungefähr'],
          rows: [
            ['1 Token', 'etwa 3–4 Zeichen'],
            ['100 Wörter', 'etwa 130–180 Token'],
            ['1 DIN-A4-Seite', 'etwa 500–800 Token'],
            ['Ein 100-Seiten-Dokument', 'etwa 50.000–80.000 Token'],
          ],
          caption:
            'Nur Größenordnungen. Deutsche Umlaute und Fachbegriffe erzeugen mehr Token als einfacher englischer Text.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Für die Arbeit im Chat hat das drei konkrete Folgen:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Sehr lange Gespräche werden unschärfer.** Frühe Vorgaben konkurrieren mit sehr viel späterem Material. Deshalb: verdichten und neu starten.',
            '**Sehr große Dokumente passen nicht immer komplett hinein.** Dann in Abschnitte teilen oder nur die relevanten Teile geben.',
            '**Bei der API kostet jedes Token Geld** – Eingabe und Ausgabe getrennt berechnet.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Zur Einordnung',
          md: 'Aktuelle Claude-Modelle haben sehr große Kontextfenster – Hunderte von Seiten passen problemlos hinein. Für den normalen Arbeitsalltag ist die Grenze **selten das Problem**. Relevanter ist, dass sehr viel Material die Antwort verwässern kann.',
        },
        {
          type: 'source',
          md: 'Die genauen Grenzen unterscheiden sich je Modell und ändern sich. Maßgeblich ist die offizielle Anthropic-Dokumentation.',
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
              title: 'Relevantes statt alles geben',
              md: 'Die drei wichtigen Kapitel statt des ganzen Handbuchs. Das verbessert die Antwortqualität – unabhängig von jeder Grenze.',
            },
            {
              title: 'Lange Gespräche verdichten',
              md: 'Nach jeder Etappe zusammenfassen lassen und mit der Zusammenfassung neu starten.',
            },
            {
              title: 'Große Dokumente in Abschnitte teilen',
              md: 'Erst eine Landkarte erstellen lassen, dann gezielt die relevanten Abschnitte bearbeiten.',
            },
            {
              title: 'Bei der API: Wiederholtes zwischenspeichern',
              md: 'Wenn derselbe Kontext häufig gesendet wird, gibt es technische Verfahren, die das vergünstigen (Prompt-Caching).',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Warum „mehr Kontext" nicht automatisch besser ist',
          blocks: [
            {
              type: 'text',
              md: 'Es liegt nahe, einfach alles mitzugeben – schließlich passt es hinein. In der Praxis ist das oft kontraproduktiv:',
            },
            {
              type: 'list',
              items: [
                '**Verwässerung:** Bei 200 Seiten Material konkurrieren die drei relevanten Absätze mit allem anderen.',
                '**Widersprüche:** Alte und neue Fassungen im selben Kontext führen zu unklaren Antworten.',
                '**Kosten und Wartezeit:** Bei der API zahlst du für jeden Eingabe-Token.',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              md: 'Praktische Regel: **Gib so viel Material wie nötig und so wenig wie möglich.** Wenn du nicht weißt, was relevant ist, lass zuerst eine Landkarte erstellen und wähle dann aus.',
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
          title: 'Beispiel anzeigen: 400 Seiten Handbuch',
          example: {
            task: 'Du hast eine Frage zur Gewährleistung und ein 400-seitiges technisches Handbuch.',
            bad: 'Das ganze Handbuch hochladen und fragen: `Was steht zur Gewährleistung drin?`\n→ Funktioniert oft, ist aber langsam, teuer und die Antwort kann Nebensächliches mit einbeziehen.',
            good: `**Schritt 1:** \`Erstelle eine Übersicht: Welche Kapitel gibt es, worum geht es jeweils in einem Satz? Nenne die Seitenzahlen.\`

**Schritt 2:** Aus der Übersicht die zwei relevanten Kapitel identifizieren.

**Schritt 3:** \`Hier sind Kapitel 7 und 12. Beantworte meine Frage zur Gewährleistung ausschließlich daraus. Zitiere die Stellen. Sag ausdrücklich, wenn die Frage dort nicht beantwortet wird.\``,
            why: 'Schritt 3 arbeitet mit 20 statt 400 Seiten. Die Antwort ist präziser, schneller und überprüfbar.',
            result:
              'Eine belegte Antwort mit Zitaten – statt einer Zusammenfassung, bei der du nicht weißt, woher sie stammt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Material sinnvoll eingrenzen',
          prompt: `Ich habe ein großes Dokument und eine konkrete Frage.

Frage: [DEINE FRAGE]

Schritt 1 – noch nicht beantworten:
1. Erstelle eine Übersicht der Abschnitte mit je einem Satz Inhalt und Seitenzahl.
2. Welche Abschnitte sind für meine Frage relevant?
3. Welche kann ich weglassen?

Ich gebe dir dann nur die relevanten Teile für die eigentliche Antwort.`,
          note: 'Dieses Vorgehen kostet einen zusätzlichen Schritt und liefert regelmäßig präzisere Antworten als das Hochladen des Gesamtdokuments.',
        },
      ],
    },
  ],
  mistakes: [
    'Alles Verfügbare mitgeben, statt auszuwählen.',
    'Alte und neue Fassungen desselben Dokuments gleichzeitig im Kontext haben.',
    'Bei sehr langen Gesprächen nicht verdichten und sich über nachlassende Genauigkeit wundern.',
    'Token-Grenzen und Preise aus Sekundärquellen als aktuell annehmen.',
  ],
  proTip:
    'Wenn in einem langen Gespräch Vorgaben „vergessen" werden, ist das kein Fehler, sondern ein Hinweis: Zeit für einen Speicherstand und einen Neustart. Siehe [Längere Aufgaben bewältigen](/lektion/lange-aufgaben).',
  task: {
    md: 'Nimm ein großes Dokument und beantworte dieselbe Frage zweimal: einmal mit dem Gesamtdokument, einmal nur mit den relevanten Abschnitten. Vergleiche Präzision und Nachvollziehbarkeit der Antworten.',
    solution:
      'Die Antwort aus den ausgewählten Abschnitten ist in aller Regel konkreter und lässt sich leichter überprüfen, weil du genau weißt, worauf sie sich stützt.',
  },
  exercise: {
    scenario: 'Ein Gespräch läuft seit 80 Nachrichten und wird ungenauer.',
    question: 'Was ist die richtige Maßnahme?',
    options: [
      {
        label: 'Ein leistungsfähigeres Modell wählen',
        correct: false,
        explain: 'Löst das Problem nicht – es liegt an der Menge und Struktur des Kontexts.',
      },
      {
        label: 'Zwischenstand zusammenfassen lassen und damit neu starten',
        correct: true,
        explain:
          'Verdichten statt anhäufen: Regeln und Festlegungen bleiben, der Ballast fällt weg.',
      },
      {
        label: 'Alle Vorgaben in jeder Nachricht wiederholen',
        correct: false,
        explain: 'Hilft kurzfristig, vergrößert aber genau das Problem.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist ein Token?',
      options: [
        {
          label: 'Ein Textbaustein, etwa ein Wortteil',
          correct: true,
          explain: 'Bei deutschem Text ungefähr 3–4 Zeichen.',
        },
        { label: 'Ein Zugangsschlüssel', correct: false, explain: 'Das Wort wird auch so verwendet – hier aber nicht.' },
        { label: 'Ein Wort', correct: false, explain: 'Meist kleiner als ein Wort.' },
      ],
    },
    {
      q: 'Ist mehr Kontext immer besser?',
      options: [
        { label: 'Ja', correct: false, explain: 'Nein – zu viel Material verwässert die Antwort.' },
        {
          label: 'Nein – so viel wie nötig, so wenig wie möglich',
          correct: true,
          explain: 'Relevanz schlägt Menge.',
        },
        { label: 'Nur bei der API', correct: false, explain: 'Gilt überall.' },
      ],
    },
    {
      q: 'Wie gehst du mit sehr großen Dokumenten um?',
      options: [
        {
          label: 'Erst eine Landkarte, dann gezielt die relevanten Abschnitte',
          correct: true,
          explain: 'Präziser, schneller und überprüfbar.',
        },
        { label: 'Immer alles hochladen', correct: false, explain: 'Oft unnötig und ungenauer.' },
        { label: 'Das Dokument kürzen', correct: false, explain: 'Dabei kann Wichtiges verlorengehen.' },
      ],
    },
  ],
  related: ['kontext-geben', 'lange-aufgaben', 'modelle-verstehen'],
}
