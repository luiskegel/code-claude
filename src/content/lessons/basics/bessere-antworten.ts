import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'bessere-antworten',
  track: 'basics',
  title: 'Wie bekomme ich bessere Antworten?',
  description:
    'Fünf Stellschrauben, die sofort wirken – und die Erkenntnis, dass das Gespräch wichtiger ist als der perfekte erste Prompt.',
  minutes: 6,
  keywords: ['qualität', 'nachfragen', 'iteration', 'verbessern', 'antwort', 'feedback'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Gute Ergebnisse entstehen selten beim ersten Versuch. Sie entstehen im **Gespräch** – und dafür gibt es fünf verlässliche Stellschrauben.',
        },
        {
          type: 'table',
          head: ['Stellschraube', 'Wirkung', 'Beispielsatz'],
          rows: [
            ['**Zielgruppe nennen**', 'Ton und Tiefe ändern sich sofort', '„Für Kunden ohne Vorkenntnisse."'],
            ['**Länge festlegen**', 'Keine Textwüsten mehr', '„Maximal 5 Sätze."'],
            ['**Beispiel geben**', 'Claude trifft deinen Stil', '„So klingt einer unserer guten Texte: …"'],
            ['**Negativ-Regeln setzen**', 'Entfernt typische KI-Floskeln', '„Keine Einleitungssätze, kein Marketing-Sprech."'],
            ['**Nachschärfen**', 'Bringt den größten Sprung', '„Gut, aber halb so lang und ohne Fachbegriffe."'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Der häufigste Anfängerfehler ist nicht ein schlechter Prompt – sondern **nach der ersten Antwort aufzugeben**.',
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Denk in Runden, nicht in Treffern',
          md: 'Runde 1: grobe Fassung. Runde 2: Länge und Ton korrigieren. Runde 3: Details schärfen. Drei kurze Runden schlagen einen perfekt durchdachten Einzelprompt fast immer – und gehen schneller.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'So sieht das in der Praxis aus. Diese Sätze kannst du wörtlich übernehmen:',
        },
        {
          type: 'list',
          items: [
            '**Zu lang?** → „Kürze auf die Hälfte. Streiche alles, was keine neue Information bringt."',
            '**Zu allgemein?** → „Zu generisch. Beziehe dich konkret auf die Details aus meinem Text."',
            '**Falscher Ton?** → „Zu werblich. Schreib sachlich, wie eine interne Notiz."',
            '**Falscher Fokus?** → „Der wichtigste Punkt ist X. Bau die Antwort darum herum neu auf."',
            '**Unsicher, ob es stimmt?** → „Welche Aussage ist am unsichersten? Woran könnte ich sie prüfen?"',
            '**Du weißt nicht weiter?** → „Stell mir 3 Fragen, deren Antworten dir helfen würden, das besser zu machen."',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Der stärkste Satz für Anfänger',
          md: '**„Stell mir Fragen, bevor du antwortest."** Damit drehst du die Rollen um: Claude sammelt den Kontext ein, den du nicht daran gedacht hättest mitzugeben.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Warum wirken Negativ-Regeln so gut?',
          blocks: [
            {
              type: 'text',
              md: 'Viele typische KI-Eigenheiten sind Gewohnheiten: einleitende Zusammenfassungen („Gerne! Hier ist…"), abschließende Meta-Sätze („Ich hoffe, das hilft!"), Aufzählungen, wo Fließtext besser wäre.',
            },
            {
              type: 'text',
              md: 'Diese Gewohnheiten verschwinden zuverlässig, wenn du sie einmal explizit ausschließt. Ein Satz wie *„Keine Einleitung, keine Zusammenfassung am Ende, direkt zum Inhalt"* spart dir bei jedem Text ein paar Zeilen Aufräumarbeit.',
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
          title: 'Beispiel anzeigen: In drei Runden zum brauchbaren Text',
          example: {
            task: 'Du brauchst einen kurzen Text für die Website über euren neuen Reparaturservice.',
            bad: 'Runde 1: `Schreib einen Text über unseren neuen Reparaturservice.`\n→ Ergebnis: 400 Wörter Marketing mit „innovativ" und „maßgeschneidert".',
            good: 'Runde 2: `Zu werblich. Maximal 80 Wörter, sachlich, keine Superlative. Zielgruppe: Menschen, deren Gerät gerade kaputt ist und die wissen wollen, was es kostet und wie lange es dauert.`\n\nRunde 3: `Fast gut. Nimm den ersten Satz raus und beginne direkt mit dem Nutzen. Ergänze am Ende einen Satz, was der Kunde jetzt tun soll.`',
            why: 'Jede Runde korrigiert genau eine Sache: erst Ton und Länge, dann Aufbau und Handlungsaufforderung.',
            result:
              'Ein 80-Wörter-Text, der konkret sagt, was der Service kostet, wie lange er dauert und was der Kunde als Nächstes tun soll.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Lass Claude zuerst fragen',
          prompt: `Ich brauche Hilfe bei folgender Aufgabe: [AUFGABE].

Bevor du anfängst:
Stell mir die 3 wichtigsten Fragen, deren Antworten du brauchst, um das richtig gut zu machen.
Stell nur Fragen, deren Antwort ich wirklich kenne.
Warte auf meine Antworten, bevor du die Aufgabe löst.`,
          note: 'Besonders wertvoll bei Aufgaben, bei denen du selbst noch nicht genau weißt, was du willst.',
        },
        {
          type: 'prompt',
          title: 'Nachschärfen in einem Satz',
          prompt: `Das geht in die richtige Richtung. Ändere bitte genau das:
1. Länge: [KÜRZER / LÄNGER – WIE VIEL?]
2. Ton: [SACHLICHER / WÄRMER / BESTIMMTER]
3. Inhalt: [WAS FEHLT ODER STÖRT?]

Lass alles andere so, wie es ist.`,
          note: '„Lass alles andere so" verhindert, dass Claude den ganzen Text neu erfindet und dabei die guten Stellen verliert.',
        },
      ],
    },
  ],
  mistakes: [
    'Nach der ersten Antwort aufgeben und denken, "Claude kann das nicht".',
    'Unspezifisches Feedback geben ("gefällt mir nicht") statt zu sagen, was konkret stört.',
    'Bei jeder Korrektur einen komplett neuen Prompt schreiben, statt im Gespräch nachzuschärfen.',
    'Mehrere Änderungswünsche gleichzeitig verlangen und sich wundern, dass einer untergeht.',
  ],
  proTip:
    'Wenn eine Antwort fast passt, sag: *"Behalte Absatz 2 und 3 unverändert. Überarbeite nur Absatz 1."* Punktgenaue Korrekturen schützen die Stellen, die schon gut sind.',
  task: {
    md: 'Nimm ein beliebiges Ergebnis von Claude und verbessere es in **drei aufeinanderfolgenden Runden**. Jede Runde darf nur **eine** Sache ändern. Beobachte, wie sich das Ergebnis entwickelt.',
    solution:
      'Typische gute Reihenfolge: **Runde 1 Umfang** (zu lang/zu kurz), **Runde 2 Ton** (zu werblich/zu steif), **Runde 3 Inhalt** (fehlender Punkt, falsche Gewichtung). Umgekehrt funktioniert es schlechter – Inhaltskorrekturen gehen unter, wenn der Text noch dreimal zu lang ist.',
  },
  exercise: {
    scenario:
      'Claudes Antwort ist inhaltlich richtig, aber viel zu lang und voller Fachbegriffe.',
    question: 'Welche Rückmeldung bringt dich am schnellsten ans Ziel?',
    options: [
      {
        label: '„Das ist schlecht, mach es nochmal."',
        correct: false,
        explain:
          'Claude weiß nicht, was „schlecht" bedeutet, und rät bei der Korrektur genauso wie beim ersten Versuch.',
      },
      {
        label:
          '„Halb so lang, keine Fachbegriffe. Zielgruppe: Kunden ohne Vorkenntnisse. Inhalt und Reihenfolge bleiben."',
        correct: true,
        explain:
          'Perfekt: konkrete Länge, konkretes Sprachniveau, Zielgruppe – und ein klarer Schutz für das, was schon stimmt.',
      },
      {
        label: 'Denselben Prompt nochmal senden',
        correct: false,
        explain:
          'Du bekommst eine andere Formulierung mit demselben Grundproblem.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was bringt den größten Qualitätssprung?',
      options: [
        {
          label: 'Ein sehr langer erster Prompt',
          correct: false,
          explain: 'Länge allein hilft nicht – Präzision und Nachschärfen schon.',
        },
        {
          label: 'Gezieltes Nachschärfen im selben Gespräch',
          correct: true,
          explain: 'Das ist die stärkste Einzelmaßnahme dieser Lektion.',
        },
        {
          label: 'Höflichere Formulierungen',
          correct: false,
          explain: 'Hat keinen messbaren Effekt auf die Qualität.',
        },
      ],
    },
    {
      q: 'Was bewirkt der Satz „Stell mir Fragen, bevor du antwortest"?',
      options: [
        {
          label: 'Claude sammelt fehlenden Kontext ein',
          correct: true,
          explain:
            'Besonders hilfreich, wenn du selbst noch nicht genau weißt, was du brauchst.',
        },
        {
          label: 'Claude antwortet schneller',
          correct: false,
          explain: 'Es dauert eine Runde länger – bringt dafür ein deutlich besseres Ergebnis.',
        },
        {
          label: 'Claude prüft Fakten im Internet',
          correct: false,
          explain: 'Dafür brauchst du die Websuche.',
        },
      ],
    },
    {
      q: 'Wie schützt du gute Stellen bei einer Korrektur?',
      options: [
        {
          label: 'Gar nicht, das geht nicht',
          correct: false,
          explain: 'Doch – du musst es nur sagen.',
        },
        {
          label: '„Lass Absatz 2 und 3 unverändert, überarbeite nur Absatz 1."',
          correct: true,
          explain: 'Punktgenaue Anweisungen verhindern, dass der ganze Text neu erfunden wird.',
        },
        {
          label: 'Den Text in einen neuen Chat kopieren',
          correct: false,
          explain: 'Funktioniert, ist aber umständlicher – und du verlierst den Kontext.',
        },
      ],
    },
  ],
  related: ['erster-prompt', 'prompts-verbessern', 'folgefragen-stellen'],
}
