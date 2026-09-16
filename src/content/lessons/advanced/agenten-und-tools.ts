import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'agenten-und-tools',
  track: 'advanced',
  title: 'Agenten und Werkzeuge',
  description:
    'Wenn Claude nicht nur antwortet, sondern handelt: Werkzeuge, Agenten und die Frage, wann sich das überhaupt lohnt.',
  minutes: 7,
  keywords: ['agent', 'tools', 'werkzeuge', 'mcp', 'funktionsaufruf', 'autonomie'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein **Werkzeug** ist eine Funktion, die Claude aufrufen kann – eine Datenbankabfrage, eine Berechnung, ein Websuchaufruf. Ein **Agent** ist Claude, der selbstständig mehrere Schritte hintereinander ausführt, bis eine Aufgabe erledigt ist.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Beim Werkzeugaufruf gibt das Modell strukturierte Aufrufparameter aus, die Anwendung führt die Funktion aus und liefert das Ergebnis zurück in den Gesprächsverlauf. Ein Agent durchläuft diese Schleife mehrfach eigenständig, bis ein Abbruchkriterium erreicht ist.',
            },
            {
              label: 'Einfach',
              md: 'Claude darf nicht nur reden, sondern auch etwas nachschlagen oder ausführen – und mit dem Ergebnis weiterarbeiten.',
            },
            {
              label: 'Ganz einfach',
              md: 'Claude bekommt Werkzeuge und darf sie benutzen.',
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
          md: 'Ohne Werkzeuge kann Claude nur mit dem arbeiten, was im Gespräch steht. Mit Werkzeugen kann er sich Informationen holen, die er noch nicht hat – und Dinge tun, die über Text hinausgehen.',
        },
        {
          type: 'table',
          head: ['Werkzeug-Art', 'Beispiel', 'Was es ermöglicht'],
          rows: [
            ['**Nachschlagen**', 'Websuche, Datenbankabfrage', 'Aktuelle oder eigene Daten einbeziehen'],
            ['**Berechnen**', 'Code ausführen', 'Exakte Ergebnisse statt geschätzter'],
            ['**Dateien**', 'Lesen, schreiben', 'Genau das, was Claude Code tut'],
            ['**Handeln**', 'E-Mail senden, Ticket anlegen', 'Etwas in der Welt verändern'],
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Die entscheidende Unterscheidung',
          md: 'Werkzeuge, die **nachschlagen**, sind risikoarm. Werkzeuge, die **handeln** – senden, löschen, bezahlen, veröffentlichen – brauchen eine Freigabe durch Menschen oder sehr enge Grenzen. Diese Unterscheidung ist wichtiger als jede technische Frage.',
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
              title: 'Erst prüfen, ob ein Agent überhaupt nötig ist',
              md: 'Die meisten Aufgaben sind **keine** Agenten-Aufgaben. Ein einzelner Aufruf oder ein fester Ablauf ist günstiger, schneller und besser überprüfbar.',
            },
            {
              title: 'Werkzeuge eng zuschneiden',
              md: 'Ein Werkzeug „lies Kundendaten zu einer Kundennummer" ist besser als „führe beliebige Datenbankabfragen aus".',
            },
            {
              title: 'Handelnde Werkzeuge absichern',
              md: 'Bestätigung durch Menschen, Grenzwerte, Protokollierung. Und eine klare Antwort auf: Was passiert bei einem Fehler?',
            },
            {
              title: 'Abbruchkriterien festlegen',
              md: 'Wann ist die Aufgabe fertig? Wie viele Schritte höchstens? Was passiert, wenn es nicht vorangeht?',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wann lohnt sich ein Agent wirklich?',
          blocks: [
            {
              type: 'text',
              md: 'Vier Fragen – nur wenn alle vier mit Ja beantwortet werden, ist ein Agent die richtige Wahl:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                '**Ist die Aufgabe offen?** Lässt sich der Weg vorher nicht festlegen, weil er vom Zwischenergebnis abhängt?',
                '**Lohnt sich der Aufwand?** Agenten sind langsamer und teurer als einzelne Aufrufe.',
                '**Ist Claude bei dieser Art Aufgabe gut?** Nicht jede Aufgabe eignet sich.',
                '**Sind Fehler erkennbar und korrigierbar?** Gibt es Tests, Prüfungen, eine Rückabwicklung?',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              md: 'Bei einem „Nein" bleibt der einfachere Weg: ein einzelner Aufruf oder ein fest programmierter Ablauf, in dem du die Reihenfolge bestimmst.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: MCP – Werkzeuge anbinden',
          blocks: [
            {
              type: 'text',
              md: 'Es gibt einen offenen Standard, über den sich Datenquellen und Werkzeuge an KI-Anwendungen anbinden lassen: das **Model Context Protocol (MCP)**. Die Idee: Statt für jede Anwendung eigene Anbindungen zu schreiben, stellt ein MCP-Server seine Funktionen einmal bereit – und verschiedene Anwendungen können sie nutzen.',
            },
            {
              type: 'list',
              items: [
                'Typische Anwendungsfälle: Zugriff auf interne Dokumente, Datenbanken, Projektverwaltung, Kalender.',
                'Für dich als Nutzer heißt das: Claude kann mit deinen eigenen Systemen arbeiten, ohne dass alles ins Chatfenster kopiert wird.',
                'Sicherheitsfrage bleibt dieselbe: Welche Werkzeuge dürfen nur lesen, welche dürfen handeln?',
              ],
            },
            {
              type: 'source',
              md: 'Details zur Einrichtung und zu verfügbaren Anbindungen: offizielle Anthropic-Dokumentation.',
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
          title: 'Beispiel anzeigen: Wann ein Agent zu viel ist',
          example: {
            task: 'Eingehende Rechnungen sollen geprüft und bei Auffälligkeiten zur Kontrolle weitergeleitet werden.',
            bad: 'Ein Agent mit Zugriff auf das Buchhaltungssystem, der selbstständig prüft, freigibt und weiterleitet. Hoher Aufwand, schwer überprüfbar, im Fehlerfall teuer.',
            good: `Ein **fester Ablauf** statt eines Agenten:

1. Rechnung wird ausgelesen (fest programmiert).
2. Ein Claude-Aufruf: Prüfe gegen diese sechs Kriterien, gib das Ergebnis strukturiert zurück, mit Sicherheitsangabe.
3. Fest programmierte Regel: Sicherheit hoch und alle Kriterien erfüllt → normaler Weg. Sonst → Mensch.

Claude entscheidet nichts selbstständig. Er liefert eine Einschätzung; die Regel dahinter ist überprüfbar.`,
            why: 'Die Aufgabe ist nicht offen – der Weg steht fest. Damit entfällt der Hauptgrund für einen Agenten, und du gewinnst Nachvollziehbarkeit.',
            result:
              'Ein System, dessen Entscheidungen jederzeit erklärbar sind – und das bei einem Fehler an genau einer Stelle korrigiert wird.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Brauche ich einen Agenten?',
          prompt: `Ich überlege, für folgende Aufgabe einen Agenten zu bauen: [BESCHREIBUNG]

Aufgabe – prüfe kritisch:
1. Ist der Lösungsweg vorher festlegbar, oder hängt er von Zwischenergebnissen ab?
2. Würde ein einzelner Aufruf oder ein fest programmierter Ablauf genügen?
3. Welche Werkzeuge bräuchte ein Agent hier – und welche davon würden HANDELN statt nur nachschlagen?
4. Was passiert im schlimmsten Fall, wenn ein Schritt falsch läuft?
5. Wie würde ich Fehler überhaupt bemerken?
6. Welche Abbruchkriterien bräuchte ich?

Sei skeptisch. Empfiehl die einfachere Lösung, wenn sie ausreicht.`,
          note: 'Frage 5 wird am häufigsten übersehen: Ein Agent, dessen Fehler niemand bemerkt, ist gefährlicher als gar keine Automatisierung.',
        },
      ],
    },
  ],
  mistakes: [
    'Einen Agenten bauen, wo ein einzelner Aufruf gereicht hätte.',
    'Werkzeuge zu weit fassen ("führe beliebige Befehle aus").',
    'Handelnde Werkzeuge ohne menschliche Freigabe einsetzen.',
    'Keine Abbruchkriterien festlegen – der Agent läuft dann im Kreis.',
    'Nicht festlegen, wie Fehler bemerkt werden.',
  ],
  proTip:
    'Trenne Werkzeuge strikt in **lesend** und **handelnd**. Lesende Werkzeuge kannst du großzügig vergeben. Handelnde Werkzeuge brauchen eine Freigabe, einen Grenzwert oder beides – ausnahmslos.',
  task: {
    md: 'Nimm eine Aufgabe, für die du an Automatisierung denkst. Beantworte die vier Agenten-Fragen ehrlich. Entscheide danach, ob ein fester Ablauf genügt.',
    solution:
      'In den meisten Fällen genügt ein fester Ablauf mit einem oder zwei Claude-Aufrufen. Echte Agenten-Aufgaben erkennt man daran, dass sich der nächste Schritt erst aus dem vorherigen Ergebnis ergibt – etwa bei Recherche oder Fehlersuche.',
  },
  exercise: {
    scenario:
      'Du gibst einem System ein Werkzeug, mit dem es E-Mails versenden kann.',
    question: 'Welche Absicherung ist unverzichtbar?',
    options: [
      {
        label: 'Keine – wenn die Qualität stimmt',
        correct: false,
        explain:
          'Versenden ist unumkehrbar. Auch eine hohe Trefferquote bedeutet, dass ein Teil der Nachrichten falsch ist.',
      },
      {
        label: 'Menschliche Freigabe oder sehr enge Grenzen plus Protokollierung',
        correct: true,
        explain:
          'Handelnde Werkzeuge mit Außenwirkung brauchen immer eine der beiden Absicherungen – meist beide.',
      },
      {
        label: 'Ein leistungsfähigeres Modell',
        correct: false,
        explain: 'Verbessert die Quote, macht das Versenden aber nicht umkehrbar.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was ist der Unterschied zwischen einem Werkzeug und einem Agenten?',
      options: [
        {
          label: 'Ein Werkzeug ist eine aufrufbare Funktion, ein Agent führt mehrere Schritte selbstständig aus',
          correct: true,
          explain: 'Der Agent entscheidet dabei selbst über den nächsten Schritt.',
        },
        { label: 'Es ist dasselbe', correct: false, explain: 'Nein.' },
        { label: 'Ein Agent ist ein besseres Modell', correct: false, explain: 'Mit dem Modell hat es nichts zu tun.' },
      ],
    },
    {
      q: 'Wann lohnt sich ein Agent?',
      options: [
        {
          label: 'Wenn der Lösungsweg vorher nicht festlegbar ist und Fehler erkennbar sind',
          correct: true,
          explain: 'Plus: Der Aufwand muss sich lohnen und die Aufgabe muss passen.',
        },
        { label: 'Immer, wenn etwas automatisiert werden soll', correct: false, explain: 'Meist genügt ein fester Ablauf.' },
        { label: 'Bei einfachen, wiederkehrenden Aufgaben', correct: false, explain: 'Dort ist ein Agent klar überdimensioniert.' },
      ],
    },
    {
      q: 'Welche Werkzeuge brauchen besondere Absicherung?',
      options: [
        { label: 'Nachschlagende', correct: false, explain: 'Die sind vergleichsweise risikoarm.' },
        {
          label: 'Handelnde – senden, löschen, bezahlen, veröffentlichen',
          correct: true,
          explain: 'Alles, was sich nicht ohne Weiteres rückgängig machen lässt.',
        },
        { label: 'Rechnende', correct: false, explain: 'Meist unkritisch.' },
      ],
    },
  ],
  related: ['api-grundlagen', 'automatisierung', 'sicherheit-profi'],
}
