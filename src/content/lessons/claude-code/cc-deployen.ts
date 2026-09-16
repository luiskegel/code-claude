import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-deployen',
  track: 'claude-code',
  title: 'Eine Website veröffentlichen',
  description:
    'Von deinem Rechner ins Internet: was „Deployment" bedeutet, welche Wege es gibt und was vorher geprüft sein muss.',
  minutes: 7,
  keywords: ['deploy', 'veröffentlichen', 'hosting', 'online', 'domain', 'live', 'server'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: '**Deployment** heißt: Deine Dateien liegen nicht mehr nur auf deinem Rechner, sondern auf einem Computer, der ständig online ist – damit andere sie aufrufen können.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Einfach',
              md: 'Deine Website-Dateien werden auf einen Server kopiert, der rund um die Uhr im Internet erreichbar ist.',
            },
            {
              label: 'Ganz einfach',
              md: 'Vom eigenen Rechner ins Internet hochladen.',
            },
          ],
        },
        {
          type: 'table',
          head: ['Weg', 'Für wen', 'Aufwand'],
          rows: [
            ['**Statisches Hosting**', 'Einfache Websites ohne Datenbank', 'Gering – Ordner hochladen oder mit Git verbinden'],
            ['**Klassischer Webspace**', 'Wer schon einen Anbieter hat', 'Mittel – Dateien per FTP übertragen'],
            ['**Eigener Server**', 'Fortgeschrittene, Sonderfälle', 'Hoch – Einrichtung und Wartung selbst'],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          md: 'Konkrete Anbieter, Preise und Abläufe ändern sich ständig. Diese Lektion erklärt deshalb das **Prinzip** und die Prüfschritte – die aktuellen Anleitungen stehen beim jeweiligen Anbieter.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'warn',
          title: 'Was sich beim Veröffentlichen ändert',
          md: 'Solange die Seite auf deinem Rechner liegt, sieht sie niemand. Danach ist sie **öffentlich** – für Menschen und für Suchmaschinen. Alles, was in den Dateien steht, ist potenziell einsehbar. Deshalb steht vor jedem Deployment eine Prüfung.',
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
              title: '1. Sicherheitsprüfung',
              md: 'Stehen irgendwo Zugangsdaten, private Adressen, Testinhalte oder interne Notizen in den Dateien?',
            },
            {
              title: '2. Inhaltsprüfung',
              md: 'Die Prüfliste aus der vorigen Lektion vollständig durchgehen.',
            },
            {
              title: '3. Rechtliches',
              md: 'Bei geschäftlichen Seiten: Impressum und Datenschutzerklärung vorhanden und korrekt.',
            },
            {
              title: '4. Hochladen',
              md: 'Je nach Weg: Ordner hochladen, per FTP übertragen oder mit dem Git-Projekt verbinden.',
            },
            {
              title: '5. Live prüfen',
              md: 'Die echte Adresse aufrufen – am Computer und am Handy. Nicht die lokale Datei.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Prüfung vor der Veröffentlichung',
          prompt: `Meine Website soll online gehen. Prüfe sie vorher. Ändere nichts.

1. Stehen irgendwo Zugangsdaten, Passwörter oder API-Schlüssel in den Dateien?
2. Gibt es private Daten, die nicht öffentlich sein sollen (private E-Mails, interne Notizen, Testdaten)?
3. Gibt es Kommentare im Code, die nicht öffentlich sein sollten?
4. Sind Dateien dabei, die gar nicht veröffentlicht werden müssen (Entwürfe, Sicherungen, alte Fassungen)?
5. Verweisen alle Links auf Ziele, die es nach der Veröffentlichung auch gibt?
6. Fehlt etwas, das rechtlich erforderlich ist (Impressum, Datenschutz)?

Format: Liste mit Fund | Datei | Wie kritisch | Was ich tun sollte.
Zeig bei gefundenen Zugangsdaten nicht den Wert selbst an – nur die Fundstelle.`,
          note: 'Punkt 3 wird oft vergessen: Kommentare im Quelltext sind für jeden sichtbar, der sich die Seite ansieht.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Eigene Adresse (Domain)',
          blocks: [
            {
              type: 'list',
              items: [
                'Beim Hosting bekommst du meist zuerst eine technische Adresse wie `meineseite.hostinganbieter.de`.',
                'Eine eigene Adresse (`meine-firma.de`) mietest du jährlich bei einem Anbieter.',
                'Danach musst du die Adresse mit deinem Hosting verbinden. Wie das geht, erklärt dein Anbieter – die Einstellung heißt meist „DNS".',
                'Änderungen an dieser Verbindung brauchen manchmal ein paar Stunden, bis sie überall wirken. Das ist normal.',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              md: 'Achte darauf, dass deine Seite über `https://` erreichbar ist (mit Schloss-Symbol). Die meisten Hosting-Anbieter richten das automatisch ein – prüfen solltest du es trotzdem.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Änderungen nach dem Start',
          blocks: [
            {
              type: 'text',
              md: 'Ab jetzt gilt: Jede Änderung geht an echte Besucher. Deshalb ändert sich der Arbeitsablauf leicht.',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Änderung lokal machen und lokal ansehen.',
                'Prüfliste für den geänderten Bereich durchgehen.',
                'In Git sichern.',
                'Erst dann veröffentlichen.',
                'Live nachprüfen – nicht nur lokal.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              md: 'Ändere nie direkt auf dem Server. Dann weichen deine lokalen Dateien und die veröffentlichte Fassung voneinander ab – und niemand weiß mehr, welche die richtige ist.',
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
          title: 'Beispiel anzeigen: Der peinliche Fund',
          example: {
            task: 'Eine kleine Firmenwebsite soll online gehen.',
            bad: 'Direkt hochladen. Zwei Wochen später fällt auf: Im Quelltext steht ein Kommentar `<!-- TODO: Preise nochmal mit Chef klären, der will eigentlich 20% mehr -->`. Für jeden sichtbar.',
            good: `Vor dem Hochladen die Prüfung laufen lassen. Ergebnis:

- \`index.html\` Zeile 34: interner Kommentar → entfernen
- \`kontakt.html\` Zeile 12: private Handynummer statt Firmennummer → ersetzen
- \`entwurf-alt.html\`: alte Fassung, soll nicht veröffentlicht werden → entfernen
- Impressum fehlt → ergänzen`,
            why: 'Alle vier Funde sind harmlos zu beheben – **vor** der Veröffentlichung. Danach sind sie im Zweifel schon von Suchmaschinen erfasst.',
            result:
              'Fünf Minuten Prüfung sparen eine unangenehme Erklärung.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Veröffentlichungsweg auswählen',
          prompt: `Ich möchte meine Website veröffentlichen.

Meine Situation:
- Art der Website: [NUR HTML/CSS / MIT PROGRAMMLOGIK / MIT DATENBANK]
- Technische Kenntnisse: [KEINE / WENIGE / GUTE]
- Budget: [KOSTENLOS / WENIGE EURO IM MONAT / EGAL]
- Eigene Adresse gewünscht: [JA / NEIN]
- Wie oft ändere ich Inhalte: [SELTEN / MONATLICH / WÖCHENTLICH]

Aufgabe:
1. Welche Art von Hosting brauche ich überhaupt?
2. Worauf sollte ich bei der Auswahl achten?
3. Welche Schritte muss ich durchlaufen – der Reihe nach?
4. Was kann dabei schiefgehen?
5. Was kostet mich das realistisch im Jahr?

Nenne keine konkreten Anbieter-Preise als feststehend – die ändern sich.
Erkläre die Schritte so, dass ich sie ohne Vorkenntnisse nachvollziehen kann.`,
          note: 'Die Einschränkung bei den Preisen ist wichtig: Tarife ändern sich häufig, die Struktur der Entscheidung nicht.',
        },
      ],
    },
  ],
  mistakes: [
    'Veröffentlichen, ohne vorher auf Zugangsdaten und interne Kommentare zu prüfen.',
    'Nach dem Hochladen nicht die echte Adresse aufrufen, sondern weiter die lokale Datei ansehen.',
    'Direkt auf dem Server ändern – danach stimmen lokale und veröffentlichte Fassung nicht mehr überein.',
    'Impressum und Datenschutz vergessen.',
    'Nicht prüfen, ob die Seite über `https://` erreichbar ist.',
  ],
  proTip:
    'Ruf nach jeder Veröffentlichung die Seite in einem **privaten Browserfenster** auf. Dort ist nichts zwischengespeichert – du siehst genau das, was ein neuer Besucher sieht.',
  task: {
    md: 'Lass ein Projekt mit dem Prüf-Prompt auf Veröffentlichungsreife prüfen, auch wenn du noch nicht veröffentlichen willst. Notiere die Funde.',
    solution:
      'Häufigste Funde: interne Kommentare im Quelltext, alte Entwurfsdateien und fehlende Alternativtexte bei Bildern. Alle drei sind vor der Veröffentlichung in Minuten behoben.',
  },
  exercise: {
    scenario: 'Du hast deine Website veröffentlicht und willst eine Änderung machen.',
    question: 'Wie gehst du vor?',
    options: [
      {
        label: 'Direkt auf dem Server ändern – geht am schnellsten',
        correct: false,
        explain:
          'Danach unterscheiden sich lokale und veröffentlichte Fassung. Beim nächsten Hochladen überschreibst du deine eigene Änderung.',
      },
      {
        label: 'Lokal ändern, prüfen, in Git sichern, veröffentlichen, live nachprüfen',
        correct: true,
        explain:
          'Ein Ablauf, eine Wahrheit: Deine lokalen Dateien sind immer der maßgebliche Stand.',
      },
      {
        label: 'Die ganze Website neu hochladen',
        correct: false,
        explain: 'Nicht falsch, aber ohne vorherige Prüfung riskant.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was bedeutet Deployment?',
      options: [
        {
          label: 'Die Dateien auf einen ständig erreichbaren Server bringen',
          correct: true,
          explain: 'Damit andere die Seite aufrufen können.',
        },
        { label: 'Die Website programmieren', correct: false, explain: 'Das ist die Entwicklung.' },
        { label: 'Die Website testen', correct: false, explain: 'Kommt vorher.' },
      ],
    },
    {
      q: 'Was prüfst du unbedingt vor der Veröffentlichung?',
      options: [
        {
          label: 'Zugangsdaten, interne Kommentare und private Daten in den Dateien',
          correct: true,
          explain: 'Nach der Veröffentlichung ist alles davon einsehbar.',
        },
        { label: 'Die Farbwahl', correct: false, explain: 'Geschmackssache, nicht kritisch.' },
        { label: 'Die Dateinamen', correct: false, explain: 'Nur, wenn Links darauf verweisen.' },
      ],
    },
    {
      q: 'Warum nie direkt auf dem Server ändern?',
      options: [
        { label: 'Weil es verboten ist', correct: false, explain: 'Verboten nicht – nur unklug.' },
        {
          label: 'Weil lokale und veröffentlichte Fassung dann auseinanderlaufen',
          correct: true,
          explain: 'Beim nächsten Hochladen überschreibst du deine eigene Änderung.',
        },
        { label: 'Weil es langsamer ist', correct: false, explain: 'Nicht der Grund.' },
      ],
    },
  ],
  related: ['cc-website-testen', 'cc-sicher-arbeiten', 'cc-website-bauen'],
}
