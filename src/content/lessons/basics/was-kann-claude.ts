import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'was-kann-claude',
  track: 'basics',
  title: 'Was kann Claude?',
  description:
    'Ein realistischer Überblick über die Stärken von Claude – mit sofort nutzbaren Beispielen für Büro, Schule, Beruf und Code.',
  minutes: 7,
  keywords: ['fähigkeiten', 'stärken', 'anwendungsfälle', 'überblick', 'use cases'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Fast alles, was Claude gut kann, lässt sich auf **sechs Grundfähigkeiten** zurückführen. Wenn du die kennst, kannst du selbst einschätzen, ob eine Aufgabe passt.',
        },
        {
          type: 'table',
          head: ['Fähigkeit', 'Was das heißt', 'Typische Aufgabe'],
          rows: [
            ['**Schreiben**', 'Text erzeugen oder umformulieren', 'E-Mail, Angebot, Stellenanzeige, Social-Post'],
            ['**Erklären**', 'Komplexes verständlich machen', '„Erkläre mir diesen Vertrag in einfacher Sprache"'],
            ['**Zusammenfassen**', 'Viel Text auf das Wesentliche kürzen', '30 Seiten Protokoll → 10 Kernpunkte'],
            ['**Analysieren**', 'Struktur, Lücken, Risiken finden', '„Was fehlt in diesem Konzept?"'],
            ['**Strukturieren**', 'Chaos in Ordnung bringen', 'Stichwortliste → Projektplan mit Phasen'],
            ['**Programmieren**', 'Code schreiben, erklären, reparieren', '„Warum bricht dieses Skript ab?"'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Der praktische Nutzen entsteht dort, wo eine dieser Fähigkeiten dir heute Zeit kostet.',
        },
        {
          type: 'accordion',
          title: 'Beispiele aus dem Büro',
          blocks: [
            {
              type: 'list',
              items: [
                'Eine hastig getippte Nachricht in eine professionelle E-Mail verwandeln.',
                'Aus einem Meeting-Mitschrieb ein Protokoll mit Aufgaben und Verantwortlichen machen.',
                'Drei Angebote nebeneinanderlegen und die Unterschiede herausarbeiten.',
                'Eine Absage schreiben, die höflich bleibt, ohne schwammig zu werden.',
              ],
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Beispiele aus Schule & Studium',
          blocks: [
            {
              type: 'list',
              items: [
                'Ein Thema auf drei Schwierigkeitsstufen erklären lassen, bis es sitzt.',
                'Sich selbst abfragen lassen: *„Stell mir 10 Prüfungsfragen und bewerte meine Antworten."*',
                'Eine eigene Argumentation auf Schwachstellen prüfen lassen.',
                'Fachbegriffe in Alltagssprache übersetzen lassen.',
              ],
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Beispiele aus dem Unternehmen',
          blocks: [
            {
              type: 'list',
              items: [
                'Einen Vertrag auf ungewöhnliche Klauseln durchsehen lassen (als Vorprüfung, nicht als Rechtsberatung).',
                'Aus Kundenfeedback wiederkehrende Themen herausziehen.',
                'Eine Präsentation in eine klare Argumentationslinie bringen.',
                'Einen Prozess dokumentieren, den bisher nur eine Person im Kopf hatte.',
              ],
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Beispiele rund um Code & Website',
          blocks: [
            {
              type: 'list',
              items: [
                'Eine Fehlermeldung in verständliches Deutsch übersetzen.',
                'Ein kleines Skript schreiben, das eine Routinearbeit automatisiert.',
                'Bestehenden Code erklären lassen, den man geerbt hat.',
                'Texte einer Website verständlicher und kürzer machen.',
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Der Weg von „Claude kann das" zu „Claude macht das gut für mich" hat immer dieselbe Form:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Aufgabe benennen', md: 'Was soll am Ende herauskommen? Ein Text? Eine Liste? Eine Entscheidung?' },
            { title: 'Material mitgeben', md: 'Den Originaltext, die Zahlen, das Dokument. Ohne Material rät Claude.' },
            { title: 'Rahmen setzen', md: 'Ton, Länge, Zielgruppe, Format.' },
            { title: 'Ergebnis prüfen und nachschärfen', md: '„Zu lang." „Zu werblich." „Der zweite Punkt stimmt nicht."' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Die 80/20-Regel',
          md: 'Für 80 % der guten Ergebnisse brauchst du nur zwei Dinge: **Material mitgeben** und **Zielgruppe nennen**. Alles andere ist Feinschliff.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Kundenfeedback auswerten',
          example: {
            task: 'Du hast 60 Freitext-Rückmeldungen aus einer Umfrage und sollst dem Team sagen, woran gearbeitet werden muss.',
            bad: '`Werte diese Umfrage aus.`',
            good: '`Hier sind 60 Freitext-Rückmeldungen unserer Kunden.\n\nAufgabe:\n1. Gruppiere sie in maximal 6 Themen.\n2. Nenne pro Thema, wie viele Rückmeldungen dazugehören.\n3. Zitiere pro Thema 1 typische Aussage.\n4. Markiere die 2 Themen, die am ehesten Kunden verlieren lassen.\n\nFormat: Tabelle. Zielgruppe: Teamleitung, die schnell entscheiden muss.`',
            why: 'Der gute Prompt zerlegt „auswerten" in vier überprüfbare Teilaufgaben und legt das Format fest.',
            result:
              'Eine Tabelle, die du direkt ins Teammeeting mitnehmen kannst – statt eines Fließtexts, den du nochmal aufbereiten müsstest.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Finde deinen eigenen Anwendungsfall',
          prompt: `Ich arbeite als [DEIN BERUF/DEINE ROLLE].
Ein typischer Arbeitstag sieht so aus: [KURZ BESCHREIBEN].

Aufgabe:
Nenne mir 7 konkrete Aufgaben aus meinem Alltag, bei denen du mir realistisch Zeit sparen kannst.
Sortiere nach Zeitersparnis.
Schreib zu jeder Aufgabe einen Beispiel-Prompt, den ich sofort verwenden kann.
Sag mir außerdem, bei welchen 2 Aufgaben du mir NICHT gut helfen kannst und warum.`,
          note: 'Der letzte Satz ist wichtig: Er zwingt zu einer ehrlichen Einschätzung statt einer Verkaufsliste.',
        },
      ],
    },
  ],
  mistakes: [
    'Claude als "Alleskönner" sehen und ihn Aufgaben geben, für die ein Taschenrechner oder eine Tabelle besser ist.',
    'Ohne Material arbeiten: „Fasse unser Meeting zusammen" – aber das Protokoll nicht mitschicken.',
    'Eine riesige Aufgabe in einem einzigen Prompt verlangen, statt sie in Schritte zu zerlegen.',
    'Das Ergebnis ungeprüft weitergeben, weil es überzeugend klingt.',
  ],
  proTip:
    'Frag Claude regelmäßig: *"Was fehlt dir, um diese Aufgabe besser zu lösen?"* Die Antwort ist oft eine präzise Liste dessen, was du im nächsten Prompt mitschicken solltest.',
  task: {
    md: 'Schreibe drei Aufgaben aus deiner eigenen Woche auf und ordne jede einer der sechs Grundfähigkeiten zu (Schreiben, Erklären, Zusammenfassen, Analysieren, Strukturieren, Programmieren).',
    solution:
      'Wenn sich eine Aufgabe keiner Fähigkeit zuordnen lässt, ist sie oft **keine gute Claude-Aufgabe** – oder sie ist noch zu grob formuliert. Zerlege sie dann in Teilschritte und ordne die Teile einzeln zu.',
  },
  exercise: {
    scenario: 'Du sollst 40 Seiten Sitzungsprotokolle auf offene Aufgaben durchsehen.',
    question: 'Welche Grundfähigkeit brauchst du hier vor allem?',
    options: [
      {
        label: 'Schreiben',
        correct: false,
        explain: 'Schreiben kommt erst am Ende, wenn du die Ergebnisse formulierst.',
      },
      {
        label: 'Zusammenfassen und Analysieren',
        correct: true,
        explain:
          'Genau: viel Text auf das Wesentliche bringen (Zusammenfassen) und gezielt nach offenen Punkten suchen (Analysieren).',
      },
      {
        label: 'Programmieren',
        correct: false,
        explain: 'Hier ist kein Code im Spiel.',
      },
    ],
  },
  quiz: [
    {
      q: 'Welche zwei Angaben verbessern fast jeden Prompt sofort?',
      options: [
        {
          label: 'Material und Zielgruppe',
          correct: true,
          explain: 'Das ist die 80/20-Regel dieser Lektion.',
        },
        {
          label: 'Höflichkeitsformeln und Emojis',
          correct: false,
          explain: 'Nett, aber wirkungslos für die Qualität.',
        },
        {
          label: 'Die Länge deines Prompts',
          correct: false,
          explain: 'Lang ist nicht gleich gut. Präzise ist gut.',
        },
      ],
    },
    {
      q: 'Wofür ist Claude eher ungeeignet?',
      options: [
        {
          label: 'Einen Vertrag in einfacher Sprache erklären',
          correct: false,
          explain: 'Das ist eine Paradeaufgabe (mit Prüfung durch dich).',
        },
        {
          label: 'Tausende Zeilen exakt aufsummieren',
          correct: true,
          explain:
            'Dafür nimm eine Tabellenkalkulation. Claude kann dir aber die passende Formel schreiben.',
        },
        {
          label: 'Ein Konzept auf Lücken prüfen',
          correct: false,
          explain: 'Analysieren ist eine Kernfähigkeit.',
        },
      ],
    },
    {
      q: 'Was ist der beste nächste Schritt, wenn ein Ergebnis nicht passt?',
      options: [
        {
          label: 'Neu anfangen und hoffen',
          correct: false,
          explain: 'Verschenkt den ganzen Kontext, den du schon aufgebaut hast.',
        },
        {
          label: 'Konkret sagen, was stört, und nachschärfen',
          correct: true,
          explain:
            '„Zu lang", „zu werblich", „Punkt 3 stimmt nicht" – je konkreter, desto besser die nächste Fassung.',
        },
        {
          label: 'Denselben Prompt nochmal senden',
          correct: false,
          explain: 'Du bekommst eine andere Formulierung, aber dasselbe Grundproblem.',
        },
      ],
    },
  ],
  related: ['was-kann-claude-nicht', 'erster-prompt', 'texte-erstellen'],
}
