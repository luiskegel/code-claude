import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'was-kann-claude-nicht',
  track: 'basics',
  title: 'Was kann Claude nicht?',
  description:
    'Grenzen ehrlich erklärt: Halluzinationen, fehlende Aktualität, Rechnen, Gedächtnis. Und wie du dich dagegen absicherst.',
  minutes: 7,
  keywords: ['grenzen', 'halluzination', 'fehler', 'risiken', 'stichtag', 'gedächtnis', 'sicherheit'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude ist stark – aber nicht allwissend. Wer die vier wichtigsten Grenzen kennt, macht kaum noch teure Fehler.',
        },
        {
          type: 'steps',
          items: [
            {
              title: '1. Claude kann sich sicher irren („Halluzination")',
              md: 'Claude kann Dinge erfinden, die plausibel klingen: eine Jahreszahl, ein Zitat, einen Paragrafen, eine Quelle. Das passiert nicht aus Bosheit – das Modell erzeugt die wahrscheinlichste Fortsetzung, und die ist nicht immer die wahre.',
            },
            {
              title: '2. Claude kennt die Gegenwart nicht automatisch',
              md: 'Das Trainingswissen hat einen Stichtag. Ohne aktivierte Websuche weiß Claude nichts über die letzten Tage, Preise, Kurse oder brandneue Produktversionen.',
            },
            {
              title: '3. Claude ist kein Taschenrechner',
              md: 'Lange Zahlenketten, exakte Summen über hunderte Zeilen, komplizierte Prozentrechnungen: Da können Fehler passieren. Besser: Claude die Formel bauen lassen und selbst rechnen lassen – oder Code ausführen lassen, wo das möglich ist.',
            },
            {
              title: '4. Claude vergisst zwischen den Gesprächen',
              md: 'Ein neuer Chat beginnt bei null. Was du gestern erklärt hast, ist nicht automatisch wieder da. (Ausnahme: Projekte und Gedächtnisfunktionen – dazu kommt eine eigene Lektion.)',
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
          md: 'Diese Grenzen sind nicht abstrakt. Sie haben ganz konkrete Folgen:',
        },
        {
          type: 'table',
          head: ['Situation', 'Was schiefgehen kann', 'Deine Absicherung'],
          rows: [
            [
              'Du fragst nach einem Gesetzestext',
              'Paragraf klingt echt, ist aber erfunden',
              'Original nachschlagen oder Text selbst mitgeben',
            ],
            [
              'Du fragst nach aktuellen Preisen',
              'Veraltete Zahl wird als Tatsache präsentiert',
              'Websuche nutzen oder offizielle Seite prüfen',
            ],
            [
              'Du lässt eine Jahresabrechnung summieren',
              'Rechenfehler mitten in der Kette',
              'Tabelle nutzen oder Rechenweg zeigen lassen',
            ],
            [
              'Du fragst nach Studien oder Zitaten',
              'Titel und Autor existieren so nicht',
              'Immer im Original prüfen, bevor du zitierst',
            ],
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Die eine Regel, die du nie brechen solltest',
          md: 'Alles, was **Folgen hat** – rechtlich, medizinisch, finanziell, vertraglich – muss vor der Verwendung von einem Menschen geprüft werden. Claude ist eine Vorarbeit, keine Freigabe.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Du kannst das Risiko drastisch senken, ohne langsamer zu werden. Drei Techniken reichen:',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Material mitgeben statt abfragen',
              md: 'Wenn Claude den Text vor sich hat, muss er nichts erfinden. Das ist die wirksamste Einzelmaßnahme gegen Halluzinationen.',
            },
            {
              title: 'Unsicherheit erlauben',
              md: 'Schreib in den Prompt: *"Wenn du etwas nicht sicher weißt, sag es ausdrücklich, statt zu raten."* Claude hält sich daran deutlich häufiger, als viele erwarten.',
            },
            {
              title: 'Belege verlangen',
              md: '*"Zitiere die Stelle aus dem Dokument, auf die du dich stützt."* Wenn kein Zitat kommt, ist die Aussage nicht belegt.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Anti-Halluzinations-Zusatz (an jeden Prompt anhängbar)',
          prompt: `Wichtig für deine Antwort:
- Stütze dich nur auf das mitgelieferte Material.
- Wenn etwas im Material nicht steht, sag "steht nicht im Dokument" statt zu schätzen.
- Kennzeichne Vermutungen deutlich als Vermutung.
- Nenne zu jeder wichtigen Aussage die Stelle, auf die du dich beziehst.`,
          note: 'Diesen Block kannst du an jeden Analyse-Prompt anhängen. Er kostet dich fünf Sekunden und spart peinliche Fehler.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: die erfundene Quelle',
          example: {
            task: 'Du brauchst für eine Präsentation eine Studie zum Thema Homeoffice-Produktivität.',
            bad: '`Nenne mir 3 Studien zur Produktivität im Homeoffice mit Autor und Jahr.`',
            good: '`Ich brauche Studien zur Produktivität im Homeoffice.\n\nNutze die Websuche und gib mir zu jeder Studie den Link.\nWenn du eine Studie nicht über die Suche belegen kannst, nenne sie nicht.\nSag mir zusätzlich, wie belastbar die jeweilige Quelle ist.`',
            why: 'Der erste Prompt lädt förmlich dazu ein, plausible Titel zu erzeugen. Der zweite bindet jede Aussage an einen überprüfbaren Link.',
            result:
              'Statt drei schön klingender, möglicherweise erfundener Titel bekommst du Quellen, die du anklicken und prüfen kannst.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Diese Übung zeigt dir den Effekt in unter zwei Minuten:',
        },
        {
          type: 'prompt',
          title: 'Mach den Ehrlichkeits-Test',
          prompt: `Ich stelle dir gleich eine Frage zu einem sehr speziellen Thema.

Regeln:
- Antworte nur, wenn du dir wirklich sicher bist.
- Wenn du unsicher bist, sag klar: "Das weiß ich nicht sicher."
- Erkläre am Ende in einem Satz, woran du deine Sicherheit festmachst.

Frage: [DEINE SEHR SPEZIELLE FRAGE]`,
          note: 'Nimm bewusst etwas Nischiges – eine lokale Regelung, ein kleines Produkt, eine interne Zahl. Du wirst sehen, dass Claude die Unsicherheit benennt, wenn du es erlaubst.',
        },
      ],
    },
  ],
  mistakes: [
    'Überzeugende Formulierung mit Richtigkeit verwechseln. Claude klingt auch dann sicher, wenn er falsch liegt.',
    'Zahlen, Paragrafen oder Zitate ungeprüft übernehmen.',
    'Erwarten, dass Claude sich an ein Gespräch von letzter Woche erinnert.',
    'Vertrauliche Daten in ein Gespräch kopieren, ohne die Regeln des eigenen Arbeitgebers zu kennen.',
  ],
  proTip:
    'Bau dir die Gewohnheit ein, bei wichtigen Ergebnissen genau eine Rückfrage zu stellen: *"Welche Aussage in deiner Antwort ist am unsichersten – und warum?"* Das deckt erstaunlich zuverlässig die Stelle auf, die du prüfen musst.',
  task: {
    md: 'Stell Claude eine Frage zu einem Thema, bei dem **du** die richtige Antwort sicher kennst (z. B. etwas aus deinem Fachgebiet). Prüfe die Antwort Satz für Satz. Notiere, was stimmte und was nicht.',
    solution:
      'Die meisten Menschen erleben hier dasselbe: Die Struktur ist gut, die allgemeinen Aussagen stimmen, und ein bis zwei Detailangaben sind ungenau. Genau dieses Muster solltest du im Kopf behalten – **Struktur vertrauen, Details prüfen**.',
  },
  exercise: {
    scenario:
      'Claude nennt dir in einer Antwort einen konkreten Paragrafen samt Gesetz und Absatz.',
    question: 'Was machst du?',
    options: [
      {
        label: 'Übernehmen – so ein Detail würde Claude nicht erfinden',
        correct: false,
        explain:
          'Doch, genau solche Details können erfunden sein. Sie klingen besonders glaubwürdig, weil sie so präzise wirken.',
      },
      {
        label: 'Im Originalgesetz nachschlagen, bevor du es verwendest',
        correct: true,
        explain:
          'Richtig. Präzise Angaben sind kein Beleg für Richtigkeit – sie sind ein Grund, genauer hinzusehen.',
      },
      {
        label: 'Claude fragen, ob der Paragraf stimmt',
        correct: false,
        explain:
          'Die Selbstauskunft kann denselben Fehler wiederholen. Du brauchst eine externe Quelle.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist eine Halluzination?',
      options: [
        {
          label: 'Ein technischer Absturz',
          correct: false,
          explain: 'Nein – die Antwort kommt ganz normal, sie ist nur inhaltlich falsch.',
        },
        {
          label: 'Eine erfundene, aber plausibel klingende Angabe',
          correct: true,
          explain: 'Genau. Deshalb ist "klingt gut" nie ein Qualitätsbeweis.',
        },
        {
          label: 'Eine Antwort, die zu lang ist',
          correct: false,
          explain: 'Länge hat damit nichts zu tun.',
        },
      ],
    },
    {
      q: 'Welche Maßnahme senkt das Halluzinationsrisiko am stärksten?',
      options: [
        {
          label: 'Höflicher fragen',
          correct: false,
          explain: 'Ändert nichts an der Faktenlage.',
        },
        {
          label: 'Das Material selbst mitgeben',
          correct: true,
          explain:
            'Wenn der Text vorliegt, muss Claude nichts aus dem Gedächtnis rekonstruieren.',
        },
        {
          label: 'Die Frage mehrfach stellen',
          correct: false,
          explain: 'Wiederholung erzeugt Bestätigung, keine Wahrheit.',
        },
      ],
    },
    {
      q: 'Erinnert sich Claude in einem neuen Chat an das letzte Gespräch?',
      options: [
        {
          label: 'Ja, immer',
          correct: false,
          explain: 'Nein. Ein neuer Chat startet grundsätzlich ohne die alte Unterhaltung.',
        },
        {
          label: 'Grundsätzlich nein – außer du nutzt Projekte oder Gedächtnisfunktionen',
          correct: true,
          explain:
            'Genau. Deshalb gibt es Projekte: Dort hinterlegst du Wissen einmal und nutzt es in vielen Chats.',
        },
        {
          label: 'Nur bei kurzen Gesprächen',
          correct: false,
          explain: 'Die Länge spielt dafür keine Rolle.',
        },
      ],
    },
  ],
  related: ['was-kann-claude', 'sicher-starten', 'recherche'],
}
