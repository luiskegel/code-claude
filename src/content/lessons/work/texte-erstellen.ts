import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'texte-erstellen',
  track: 'work',
  title: 'Texte erstellen',
  description:
    'E-Mails, Angebote, Aushänge, Social-Posts: Wie du in wenigen Minuten zu einem Text kommst, der wirklich nach dir klingt.',
  minutes: 7,
  keywords: ['schreiben', 'e-mail', 'text', 'formulieren', 'entwurf', 'stil'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude schreibt nicht „für dich" – er schreibt **mit dir**. Der beste Ablauf ist immer derselbe: Rohmaterial rein, Entwurf raus, in zwei Runden anpassen.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Die wichtigste Erkenntnis',
          md: 'Ein Text, den Claude komplett aus dem Nichts erfindet, klingt austauschbar. Ein Text, der auf **deinen Stichworten** basiert, klingt nach dir. Gib also immer dein Rohmaterial mit – auch wenn es nur drei Stichpunkte sind.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'list',
          items: [
            '**Der Anfang fällt weg.** Aus einem leeren Blatt wird ein Entwurf, den du kritisieren kannst – und kritisieren ist viel leichter als schreiben.',
            '**Ton auf Knopfdruck.** Derselbe Inhalt als freundliche, neutrale oder bestimmte Fassung.',
            '**Varianten in Sekunden.** Drei Betreffzeilen statt einer, drei Einstiege zur Auswahl.',
            '**Konsistenz.** Mit einem Stil-Beispiel klingen 20 Texte gleich – auch wenn drei Leute sie in Auftrag geben.',
          ],
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
              title: 'Rohmaterial sammeln (30 Sekunden)',
              md: 'Stichpunkte reichen. Was soll rein? Was ist der Anlass? Was ist das Ziel?',
            },
            {
              title: 'Auftrag formulieren',
              md: 'Aufgabe, Empfänger, Ton, Länge. Immer mit Grenze – „maximal X Sätze".',
            },
            {
              title: 'Entwurf kritisieren',
              md: 'Was stört? Zu lang, zu förmlich, falscher Einstieg? Ein Punkt pro Runde.',
            },
            {
              title: 'Feinschliff und Varianten',
              md: '„Gib mir drei Varianten des ersten Satzes." Den besten wählst du selbst.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Universeller Schreib-Prompt',
          prompt: `Aufgabe:
Schreib [E-MAIL / AUSHANG / ANGEBOTSTEXT / SOCIAL-POST] zum Thema [THEMA].

Das soll rein (mein Rohmaterial):
- [STICHPUNKT 1]
- [STICHPUNKT 2]
- [STICHPUNKT 3]

Empfänger:
[WER LIEST DAS? WIE IST DIE BEZIEHUNG?]

Ton:
[FREUNDLICH / SACHLICH / BESTIMMT / ENTSCHULDIGEND]

Format:
Maximal [ANZAHL] Sätze, [SIE-FORM / DU-FORM].

Nicht verwenden:
- Floskeln wie "gerne", "selbstverständlich", "wir freuen uns"
- Superlative und Werbesprache
- Einleitungssätze, die nichts sagen

Gib mir zusätzlich 3 Varianten für den ersten Satz.`,
          note: 'Der Block „Nicht verwenden" ist der Unterschied zwischen einem KI-Text und einem Text, der nach einem Menschen klingt.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Deinen eigenen Stil dauerhaft verankern',
          blocks: [
            {
              type: 'text',
              md: 'Wenn du regelmäßig schreibst, lohnt sich ein einmaliger Aufwand von zehn Minuten:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Such dir drei eigene Texte, die du gut findest.',
                'Lass Claude daraus eine Stil-Beschreibung in 6 Regeln ableiten.',
                'Korrigiere die Regeln, wo sie nicht stimmen.',
                'Speichere sie – in einem Projekt oder in den Favoriten dieser Academy.',
                'Hänge sie künftig an jeden Schreib-Prompt an.',
              ],
            },
            {
              type: 'text',
              md: 'Ab dann klingen alle Texte nach dir, ohne dass du es jedes Mal erklären musst. Details in der Lektion [Projekte / Wissenskontext](/lektion/projekte-wissenskontext).',
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
          title: 'Beispiel anzeigen: Mahnung, die den Kunden nicht vergrault',
          example: {
            task: 'Eine Rechnung ist seit 3 Wochen offen. Der Kunde ist wichtig.',
            bad: '`Schreib eine Mahnung.`\n→ Ein formelles Standardschreiben mit Fristsetzung. Für einen guten Kunden zu hart.',
            good: `\`Schreib eine freundliche Zahlungserinnerung.

Rohmaterial:
- Rechnung 2024-318 über 2.480 €, fällig seit 21 Tagen
- Kunde seit 6 Jahren, zahlt sonst immer pünktlich
- Vermutlich untergegangen, kein böser Wille

Ton: freundlich, nicht vorwurfsvoll, aber mit klarer Bitte.
Format: maximal 6 Sätze, Sie-Form.
Nicht verwenden: das Wort "Mahnung", keine Fristandrohung, keine Rechtsfolgen.

Gib mir zusätzlich eine zweite, etwas bestimmtere Fassung für den Fall, dass diese hier folgenlos bleibt.\``,
            why: 'Die Einschätzung „vermutlich untergegangen" bestimmt den ganzen Ton. Und die zweite Fassung spart dir in zwei Wochen die nächste Runde.',
            result:
              'Zwei versandfertige Texte: einer für jetzt, einer für den Fall der Fälle.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Stichpunkte zu Text',
          prompt: `Mach aus meinen Stichpunkten einen zusammenhängenden Text.

Regeln:
- Nichts hinzufügen, was nicht in den Stichpunkten steht.
- Wenn eine Information fehlt, markiere die Stelle mit [FEHLT: ...] statt sie zu erfinden.
- Reihenfolge darfst du ändern, wenn es den Text logischer macht.

Ziel des Textes: [WAS SOLL DER LESER DANACH TUN ODER WISSEN?]
Format: [LÄNGE, TON]

Stichpunkte:
- [...]
- [...]`,
          note: 'Die Regel mit `[FEHLT: ...]` ist der Kern: Du siehst sofort, wo du noch Informationen nachliefern musst, statt erfundene Details zu übersehen.',
        },
      ],
    },
  ],
  mistakes: [
    'Claude einen Text komplett erfinden lassen und sich wundern, dass er austauschbar klingt.',
    'Keine Längenbegrenzung setzen – aus drei Sätzen werden dann drei Absätze.',
    'Den ersten Entwurf verwenden, statt eine Runde zu kritisieren.',
    'Vergessen zu sagen, was nicht vorkommen darf. Genau dort sitzen die typischen Floskeln.',
  ],
  proTip:
    'Für wiederkehrende Texte: Lass dir eine **Vorlage mit Platzhaltern** bauen statt eines fertigen Textes. Beim nächsten Mal füllst du nur noch die Platzhalter aus – das dauert 20 Sekunden statt drei Minuten.',
  task: {
    md: 'Schreib eine echte E-Mail, die heute ansteht, mit dem universellen Schreib-Prompt. Nutze den Block „Nicht verwenden" mit mindestens drei Punkten. Vergleiche mit dem, was du selbst geschrieben hättest.',
    solution:
      'Häufigste Beobachtung: Der Inhalt ist ähnlich, aber der Text ist kürzer und klarer – weil du durch das Ausfüllen des Prompts selbst gezwungen warst, Ziel und Empfänger zu klären.',
  },
  exercise: {
    scenario: 'Dein von Claude geschriebener Text klingt „nach KI".',
    question: 'Was hilft am zuverlässigsten?',
    options: [
      {
        label: 'Höflicher bitten, menschlicher zu schreiben',
        correct: false,
        explain: '„Schreib menschlicher" ist zu vage – jeder versteht darunter etwas anderes.',
      },
      {
        label: 'Eigenes Rohmaterial mitgeben und typische Floskeln ausdrücklich verbieten',
        correct: true,
        explain:
          'Beides zusammen wirkt sofort: dein Material sorgt für Inhalt, die Negativliste entfernt die verräterischen Formulierungen.',
      },
      {
        label: 'Den Text mehrfach neu generieren lassen',
        correct: false,
        explain: 'Du bekommst andere Formulierungen mit denselben Mustern.',
      },
    ],
  },
  quiz: [
    {
      q: 'Warum solltest du eigenes Rohmaterial mitgeben?',
      options: [
        {
          label: 'Damit der Text nach dir klingt und nichts erfunden wird',
          correct: true,
          explain: 'Beide Effekte auf einmal.',
        },
        { label: 'Damit es schneller geht', correct: false, explain: 'Nicht der Hauptgrund.' },
        { label: 'Damit der Text länger wird', correct: false, explain: 'Länge ist kein Ziel.' },
      ],
    },
    {
      q: 'Was bewirkt der Block „Nicht verwenden"?',
      options: [
        { label: 'Er kürzt den Text', correct: false, explain: 'Nur als Nebeneffekt.' },
        {
          label: 'Er entfernt typische Floskeln und Werbesprache',
          correct: true,
          explain: 'Die wirkungsvollste Einzelmaßnahme gegen „KI-Klang".',
        },
        { label: 'Er ändert die Sprache', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Was ist bei wiederkehrenden Texten sinnvoller als ein fertiger Text?',
      options: [
        {
          label: 'Eine Vorlage mit Platzhaltern',
          correct: true,
          explain: 'Einmal bauen, immer wieder in Sekunden ausfüllen.',
        },
        { label: 'Ein längerer Prompt', correct: false, explain: 'Hilft nicht bei der Wiederholung.' },
        { label: 'Ein neuer Chat pro Text', correct: false, explain: 'Kostet nur Zeit.' },
      ],
    },
  ],
  related: ['texte-analysieren', 'beispiele-geben', 'dokumente-erstellen'],
}
