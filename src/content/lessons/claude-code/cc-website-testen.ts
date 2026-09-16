import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-website-testen',
  track: 'claude-code',
  title: 'Eine Website testen',
  description:
    'Bevor etwas online geht: die Prüfliste, die alle typischen Fehler findet – auch ohne technisches Wissen.',
  minutes: 6,
  keywords: ['testen', 'prüfen', 'mobil', 'browser', 'fehler', 'checkliste', 'qualität'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Testen heißt: **selbst benutzen**, bevor es andere tun. Dafür brauchst du keine Werkzeuge – nur eine Reihenfolge.',
        },
        {
          type: 'table',
          head: ['Was du prüfst', 'Wie', 'Typischer Fund'],
          rows: [
            ['Alle Links', 'Jeden einzeln anklicken', 'Tippfehler im Dateinamen'],
            ['Handy-Ansicht', 'Fenster ganz schmal ziehen', 'Text abgeschnitten, Tabelle zu breit'],
            ['Bilder', 'Laden alle? Wie lange dauert es?', 'Fehlendes Bild, riesige Datei'],
            ['Texte', 'Einmal ganz lesen', 'Platzhalter wie „Lorem ipsum" vergessen'],
            ['Kontakt', 'Telefonnummer und E-Mail anklicken', 'Nicht klickbar, falsche Nummer'],
            ['Fehlerkonsole', 'Im Browser öffnen', 'Rote Meldungen = echte Fehler'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'warn',
          title: 'Der Fehler, den fast jeder macht',
          md: 'Die Seite nur am großen Bildschirm ansehen. Die Mehrheit der Besucher kommt vom Handy – und genau dort brechen Layouts. Zwei Minuten Prüfen in schmaler Ansicht ersetzen jede spätere Beschwerde.',
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
              title: 'Schmal ziehen',
              md: 'Browserfenster so schmal wie möglich ziehen. Wenn die Seite dort funktioniert, funktioniert sie auf dem Handy meistens auch.',
            },
            {
              title: 'Jeden Link klicken',
              md: 'Alle. Auch die im Fußbereich. Kaputte Links sind der häufigste Fehler überhaupt.',
            },
            {
              title: 'Konsole öffnen',
              md: 'Rechtsklick → „Untersuchen" → Reiter „Konsole". Rote Meldungen bedeuten echte Fehler.',
            },
            {
              title: 'Einem Menschen zeigen',
              md: 'Jemandem, der die Seite nicht kennt: „Finde die Telefonnummer." Beobachten, nicht helfen.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Website prüfen lassen',
          prompt: `Prüfe meine Website auf Fehler und Schwachstellen. Ändere nichts.

Prüfe:
1. Kaputte Links: Verweisen alle Links auf existierende Dateien?
2. Fehlende Dateien: Werden Bilder oder Stylesheets eingebunden, die es nicht gibt?
3. Mobile Darstellung: Was bricht in schmaler Ansicht?
4. Bilder: Fehlen Alternativtexte? Gibt es sehr große Dateien?
5. Überschriften: Ist die Struktur sinnvoll (h1, h2, h3 in richtiger Reihenfolge)?
6. Vergessene Platzhalter: Steht irgendwo noch Beispieltext?
7. Kontaktangaben: Sind Telefonnummer und E-Mail klickbar?

Format: Tabelle mit Problem | Datei | Zeile | Wie schlimm | Vorschlag
Sortiere nach Wichtigkeit. Behebe noch nichts.`,
          note: 'Punkt 6 klingt banal, ist aber der häufigste peinliche Fehler auf frisch gebauten Websites.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Die Fehlerkonsole verstehen',
          blocks: [
            {
              type: 'text',
              md: 'Jeder Browser hat eine Konsole, die Fehler anzeigt. Öffnen: Rechtsklick auf die Seite → „Untersuchen" (oder F12) → Reiter „Konsole".',
            },
            {
              type: 'list',
              items: [
                '**Rot** = Fehler. Etwas funktioniert nicht. Muss behoben werden.',
                '**Gelb** = Warnung. Meist unkritisch, aber ansehen lohnt sich.',
                '**404** = Eine Datei wurde nicht gefunden. Fast immer ein Tippfehler im Dateinamen oder Pfad.',
              ],
            },
            {
              type: 'prompt',
              title: 'Konsolenmeldung klären',
              prompt: `In der Browser-Konsole meiner Website stehen diese Meldungen:

[MELDUNGEN EINFÜGEN]

Aufgabe:
1. Was bedeutet jede Meldung in einfachem Deutsch?
2. Welche sind echte Fehler, welche kann ich ignorieren?
3. Was ist jeweils die Ursache?
4. Wie behebe ich sie – sortiert nach Wichtigkeit?

Zeig mir die Lösungen, setze sie noch nicht um.`,
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
          title: 'Beispiel anzeigen: Der Test mit einem echten Menschen',
          example: {
            task: 'Die Seite ist fertig und sieht für dich gut aus.',
            bad: 'Selbst durchklicken. Du weißt, wo alles ist – du findest alles.',
            good: `Jemandem die Seite auf dem **Handy** geben und drei Aufgaben stellen:

1. „Finde heraus, was diese Firma macht."
2. „Finde die Telefonnummer und ruf an." (nicht wirklich anrufen)
3. „Finde heraus, wo die Firma ist."

Dabei: **zusehen und schweigen.** Jede Stelle, an der die Person zögert oder scrollt, ist eine Schwachstelle.`,
            why: 'Du kannst deine eigene Seite nicht mit fremden Augen sehen. Du weißt zu viel.',
            result:
              'Meist zwei bis drei konkrete Verbesserungen – und fast immer: Die Telefonnummer ist zu weit unten.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Deine Prüfliste zum Abhaken vor jeder Veröffentlichung:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Alle Links geklickt, alle führen irgendwohin.',
            'Fenster ganz schmal: nichts abgeschnitten, kein seitliches Scrollen.',
            'Alle Bilder laden, keines dauert spürbar lange.',
            'Kein Platzhaltertext mehr vorhanden.',
            'Telefonnummer und E-Mail sind anklickbar.',
            'Konsole zeigt keine roten Meldungen.',
            'Eine fremde Person hat die Seite auf dem Handy bedient.',
            'Impressum und Datenschutz vorhanden (bei geschäftlichen Seiten).',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          md: 'Acht Punkte, etwa zehn Minuten. Diese zehn Minuten sind die wirksamste Qualitätssicherung, die es für kleine Websites gibt.',
        },
      ],
    },
  ],
  mistakes: [
    'Nur am großen Bildschirm testen.',
    'Nicht alle Links anklicken, weil "die werden schon stimmen".',
    'Die Fehlerkonsole ignorieren.',
    'Nur selbst testen und niemanden anderen draufschauen lassen.',
    'Nach einer Korrektur nicht erneut prüfen.',
  ],
  proTip:
    'Teste die Seite auf einem **echten Handy**, nicht nur im schmalen Browserfenster. Schriftgrößen, Klickflächen und Ladezeiten verhalten sich dort anders – besonders im Mobilfunknetz.',
  task: {
    md: 'Geh die achtteilige Prüfliste für eine Website durch (deine eigene oder eine beliebige). Notiere jeden Fund. Lass anschließend prüfen, ob du etwas übersehen hast.',
    solution:
      'Selbst auf professionell gemachten Seiten findet diese Liste meist etwas – häufig fehlende Alternativtexte bei Bildern oder ein Link, der ins Leere führt.',
  },
  exercise: {
    scenario: 'Deine Website sieht am Computer perfekt aus.',
    question: 'Was prüfst du als Nächstes?',
    options: [
      {
        label: 'Nichts – sie ist fertig',
        correct: false,
        explain: 'Die meisten Besucher kommen vom Handy. Dort sieht es womöglich ganz anders aus.',
      },
      {
        label: 'Die schmale Ansicht und danach ein echtes Handy',
        correct: true,
        explain:
          'Der wichtigste Test überhaupt – und der, der am häufigsten vergessen wird.',
      },
      {
        label: 'Die Ladezeit mit einem Messwerkzeug',
        correct: false,
        explain: 'Sinnvoll, aber später. Erst muss die Seite überhaupt benutzbar sein.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was bedeutet eine rote Meldung in der Browser-Konsole?',
      options: [
        { label: 'Einen echten Fehler', correct: true, explain: 'Sollte behoben werden.' },
        { label: 'Eine Warnung', correct: false, explain: 'Warnungen sind gelb.' },
        { label: 'Nichts Wichtiges', correct: false, explain: 'Doch.' },
      ],
    },
    {
      q: 'Wie testest du die Handy-Ansicht schnell?',
      options: [
        {
          label: 'Browserfenster ganz schmal ziehen',
          correct: true,
          explain: 'Ersetzt nicht das echte Handy, findet aber die meisten Probleme sofort.',
        },
        { label: 'Die Schrift vergrößern', correct: false, explain: 'Etwas anderes.' },
        { label: 'Die Seite ausdrucken', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Was ist der aufschlussreichste Test?',
      options: [
        { label: 'Selbst durchklicken', correct: false, explain: 'Du weißt zu viel über deine eigene Seite.' },
        {
          label: 'Eine fremde Person eine konkrete Aufgabe lösen lassen',
          correct: true,
          explain: 'Zusehen und schweigen – jedes Zögern ist eine Schwachstelle.',
        },
        { label: 'Die Dateigröße messen', correct: false, explain: 'Nebensache.' },
      ],
    },
  ],
  related: ['cc-website-bauen', 'cc-deployen', 'cc-fehler-finden'],
}
