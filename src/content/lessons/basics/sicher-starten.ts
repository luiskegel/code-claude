import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'sicher-starten',
  track: 'basics',
  title: 'Sicher starten: Daten, Prüfen, Verantwortung',
  description:
    'Welche Daten du besser nicht hineinkopierst, wie du Ergebnisse prüfst und wo deine Verantwortung beginnt.',
  minutes: 6,
  keywords: ['datenschutz', 'sicherheit', 'vertraulich', 'dsgvo', 'prüfen', 'verantwortung', 'risiko'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Zwei Fragen solltest du dir angewöhnen, bevor du etwas in ein Chatfenster kopierst – und eine, bevor du ein Ergebnis weitergibst.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Frage 1: Darf dieser Inhalt hier hinein?',
              md: 'Personenbezogene Daten, Gesundheitsdaten, Zugangsdaten, Geschäftsgeheimnisse, Kundendaten – dafür gelten in Unternehmen meist eigene Regeln. **Kläre sie, bevor du etwas einfügst.**',
            },
            {
              title: 'Frage 2: Brauche ich diesen Teil überhaupt?',
              md: 'Meistens nicht. Ein Vertrag lässt sich auch mit „Firma A" und „Firma B" analysieren. Eine Bewerbung auch ohne Adresse und Geburtsdatum. **Anonymisieren kostet 30 Sekunden.**',
            },
            {
              title: 'Frage 3: Wurde das Ergebnis geprüft?',
              md: 'Vor jeder Weitergabe: Stimmt es? Habe ich die Fakten kontrolliert? Kann ich für diesen Text geradestehen? **Deine Unterschrift bleibt deine Unterschrift.**',
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
          md: 'Es geht hier nicht um Panik, sondern um Berufsalltag. Die drei realistischen Risiken sind:',
        },
        {
          type: 'table',
          head: ['Risiko', 'Was konkret passiert', 'Gegenmittel'],
          rows: [
            [
              'Datenschutz',
              'Kundendaten landen in einem System, für das es keine Freigabe gibt',
              'Vor der Nutzung mit IT/Datenschutz klären; anonymisieren',
            ],
            [
              'Falsche Fakten',
              'Eine erfundene Zahl steht in deinem Bericht',
              'Zahlen, Zitate, Paragrafen immer gegenprüfen',
            ],
            [
              'Falsche Verantwortung',
              '„Das hat die KI geschrieben" gilt nicht als Entschuldigung',
              'Du gibst frei, also prüfst du',
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Keine Rechts-, Medizin- oder Finanzberatung',
          md: 'Claude kann dir helfen, einen Vertrag oder Befund **zu verstehen** und dich auf Fragen vorzubereiten. Er ersetzt keine Anwältin, keinen Arzt und keine Steuerberatung. Bei Folgen für Gesundheit, Recht oder Geld: immer ein Mensch mit Zulassung.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Eine einfache Routine, die sich im Alltag bewährt:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Anonymisieren:** Namen durch Platzhalter ersetzen (`[KUNDE A]`, `[MITARBEITER 1]`). Der Inhalt der Analyse leidet praktisch nie darunter.',
            '**Nur so viel hochladen wie nötig:** Die relevanten drei Seiten statt des ganzen 90-Seiten-Dokuments.',
            '**Zahlen markieren:** Alles, was eine Zahl, ein Datum oder ein Paragraf ist, wird vor der Verwendung geprüft.',
            '**Zwei-Augen-Prinzip bei Wichtigem:** Wenn ein Mensch den Text gegengelesen hätte, gilt das auch jetzt.',
          ],
        },
        {
          type: 'prompt',
          title: 'Sicherheits-Zusatz für sensible Analysen',
          prompt: `Hinweis zu diesem Material:
Es ist anonymisiert. Namen sind durch Platzhalter ersetzt.

Bitte beachte:
- Nutze ausschließlich die Informationen aus dem Material.
- Kennzeichne alles, was du nicht sicher aus dem Text ableiten kannst.
- Gib am Ende eine Liste der Punkte aus, die ein Mensch prüfen sollte, bevor das Ergebnis verwendet wird.`,
          note: 'Die letzte Zeile liefert dir eine fertige Prüfliste – das ist der praktischste Teil.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Kündigung prüfen lassen',
          example: {
            task: 'Ein Mitarbeiter hat gekündigt, du willst die Formulierung des Schreibens einordnen.',
            bad: 'Das komplette Schreiben mit Name, Adresse, Personalnummer und Gehalt einfügen und fragen: `Ist das rechtlich in Ordnung?`',
            good: '`Ich habe ein Kündigungsschreiben eines Mitarbeiters erhalten (anonymisiert).\n\nAufgabe:\n1. Welche formalen Angaben enthält es, welche fehlen?\n2. Welche Fristen werden genannt?\n3. Welche 5 Fragen sollte ich meiner Anwältin stellen?\n\nGib keine Rechtsberatung – bereite mich auf das Gespräch vor.`\n\n(Text mit `[MITARBEITER]`, `[DATUM]`, `[FIRMA]` anonymisiert.)',
            why: 'Der zweite Weg schützt die Daten, nutzt aber die volle Stärke von Claude: Struktur erkennen und Fragen vorbereiten.',
            result:
              'Du gehst mit einer konkreten Fragenliste ins Anwaltsgespräch – ohne personenbezogene Daten weitergegeben zu haben.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Anonymisierungs-Helfer',
          prompt: `Ich möchte den folgenden Text analysieren lassen, aber vorher anonymisieren.

Aufgabe:
1. Liste alle Stellen auf, die personenbezogene oder vertrauliche Daten enthalten.
2. Schlage für jede Stelle einen neutralen Platzhalter vor.
3. Gib mir den anonymisierten Text zurück.

Text:
[DEIN TEXT]`,
          note: 'Achtung: Für diesen Prompt musst du den Originaltext einfügen. Nutze ihn nur, wenn das für dein Material grundsätzlich erlaubt ist – sonst anonymisiere von Hand.',
        },
      ],
    },
  ],
  mistakes: [
    'Komplette Dokumente hochladen, obwohl drei Absätze für die Frage gereicht hätten.',
    'Annehmen, im Unternehmen sei "KI-Nutzung sicher erlaubt", ohne nachzufragen.',
    'Ein überzeugend formuliertes Ergebnis ungeprüft weitergeben.',
    'Passwörter, API-Schlüssel oder Zugangsdaten in ein Gespräch kopieren – auch nicht "nur kurz zum Testen".',
  ],
  proTip:
    'Bau dir eine persönliche Ampel: **Grün** = öffentliche oder selbst verfasste Inhalte, sofort nutzbar. **Gelb** = interne Inhalte, nur anonymisiert. **Rot** = personenbezogene Daten, Zugangsdaten, Geschäftsgeheimnisse – gar nicht, außer es gibt eine ausdrückliche Freigabe.',
  task: {
    md: 'Ordne fünf Inhalte aus deinem Arbeitsalltag in die Ampel ein: Grün, Gelb, Rot. Überlege bei jedem Gelb-Fall, wie du ihn mit einer Anonymisierung nach Grün bringen könntest.',
    solution:
      'Häufiges Ergebnis: Sehr vieles ist **gelb und mit Platzhaltern problemlos nutzbar**. Rot bleiben meist nur Zugangsdaten und echte personenbezogene Datensätze – und die braucht Claude für die Analyse fast nie.',
  },
  exercise: {
    scenario:
      'Du willst eine Kundenbeschwerde analysieren lassen. Die Mail enthält Name, Adresse und Kundennummer.',
    question: 'Wie gehst du vor?',
    options: [
      {
        label: 'Mail komplett einfügen – die Analyse wird dadurch genauer',
        correct: false,
        explain:
          'Die Analyse wird dadurch nicht besser. Für die Frage „Was ist das Anliegen und wie antworte ich?" sind Name und Adresse irrelevant.',
      },
      {
        label: 'Name, Adresse und Kundennummer durch Platzhalter ersetzen und dann analysieren lassen',
        correct: true,
        explain:
          'Richtig. Gleiche Analysequalität, deutlich weniger Risiko – und meist in unter einer Minute erledigt.',
      },
      {
        label: 'Gar nicht analysieren lassen, das ist zu riskant',
        correct: false,
        explain:
          'Zu vorsichtig. Anonymisiert ist das eine völlig normale, nützliche Aufgabe.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist die einfachste wirksame Schutzmaßnahme?',
      options: [
        {
          label: 'Anonymisieren und nur das Nötige hochladen',
          correct: true,
          explain: 'Kostet fast keine Zeit und entfernt den größten Teil des Risikos.',
        },
        {
          label: 'Kürzere Prompts schreiben',
          correct: false,
          explain: 'Hat mit Datenschutz nichts zu tun.',
        },
        {
          label: 'Claude bitten, die Daten zu vergessen',
          correct: false,
          explain: 'Darauf solltest du dich nicht verlassen. Gar nicht erst einfügen ist der sichere Weg.',
        },
      ],
    },
    {
      q: 'Wer ist für ein weitergegebenes Ergebnis verantwortlich?',
      options: [
        {
          label: 'Anthropic',
          correct: false,
          explain: 'Nein. Du entscheidest, was du verwendest.',
        },
        {
          label: 'Du',
          correct: true,
          explain:
            'Claude liefert eine Vorarbeit. Die Freigabe – und damit die Verantwortung – liegt bei dir.',
        },
        {
          label: 'Niemand, es ist ja automatisch entstanden',
          correct: false,
          explain: 'Automatisch entstandene Texte entbinden niemanden von der Sorgfaltspflicht.',
        },
      ],
    },
    {
      q: 'Was gehört auf jeden Fall NICHT in ein Chatfenster?',
      options: [
        {
          label: 'Ein selbst geschriebener Entwurf',
          correct: false,
          explain: 'Der ist unproblematisch – es ist dein eigener Text.',
        },
        {
          label: 'Passwörter und Zugangsdaten',
          correct: true,
          explain: 'Niemals, auch nicht testweise. Dafür gibt es keinen guten Grund.',
        },
        {
          label: 'Eine öffentlich zugängliche Produktbeschreibung',
          correct: false,
          explain: 'Öffentliche Inhalte sind in der Ampel grün.',
        },
      ],
    },
  ],
  related: ['was-kann-claude-nicht', 'cc-sicher-arbeiten', 'sicherheit-profi'],
}
