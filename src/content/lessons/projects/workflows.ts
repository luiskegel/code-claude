import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'workflows',
  track: 'projects',
  title: 'Workflows bauen',
  description:
    'Wiederkehrende Arbeit in feste Abläufe verwandeln: Prompt-Ketten, Vorlagen und Qualitätsprüfungen.',
  minutes: 7,
  keywords: ['workflow', 'ablauf', 'kette', 'wiederholen', 'prozess', 'standard', 'vorlage'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein Workflow ist eine **feste Abfolge von Prompts**, die du bei einer wiederkehrenden Aufgabe immer gleich durchläufst.',
        },
        {
          type: 'text',
          md: 'Der Unterschied zum einzelnen Prompt: Jeder Schritt hat eine Aufgabe, und das Ergebnis des einen ist der Eingang des nächsten. Dadurch wird die Qualität **reproduzierbar** – nicht von Tagesform und Formulierungsglück abhängig.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'table',
          head: ['Ohne Workflow', 'Mit Workflow'],
          rows: [
            ['Jedes Mal neu überlegen', 'Bekannter Ablauf, vier feste Schritte'],
            ['Qualität schwankt', 'Qualität ist gleichbleibend'],
            ['Nur du kannst es', 'Jede Kollegin kann es genauso'],
            ['Fehler wiederholen sich', 'Prüfschritt fängt sie ab'],
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          md: 'Faustregel: Ab der **dritten Wiederholung** derselben Aufgabe lohnt sich ein Workflow. Der Bau dauert 20 Minuten und spart ab da jedes Mal Zeit.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Fast jeder gute Workflow hat dieselbe Grundform:',
        },
        {
          type: 'steps',
          items: [
            { title: 'Schritt 1 – Sammeln', md: 'Material aufnehmen und ordnen. Noch nichts bewerten.' },
            { title: 'Schritt 2 – Strukturieren', md: 'Das Material in die Zielform bringen.' },
            { title: 'Schritt 3 – Ausarbeiten', md: 'Den eigentlichen Text oder das eigentliche Ergebnis erzeugen.' },
            { title: 'Schritt 4 – Prüfen', md: 'Gegen eine feste Checkliste kontrollieren. Dieser Schritt wird am häufigsten weggelassen – und ist der wertvollste.' },
          ],
        },
        {
          type: 'prompt',
          title: 'Schritt 4 – Qualitätsprüfung (universell)',
          prompt: `Prüfe das folgende Ergebnis gegen diese Checkliste:

1. Sind alle Vorgaben aus dem Auftrag erfüllt? (einzeln durchgehen)
2. Steht etwas darin, das nicht belegt ist?
3. Gibt es Wiederholungen?
4. Ist die Länge eingehalten?
5. Sind verbotene Formulierungen enthalten?
6. Was würde ein kritischer Leser als Erstes angreifen?

Format: Tabelle mit Kriterium | Erfüllt (ja/nein/teilweise) | Fundstelle | Vorschlag

Schreib das Ergebnis NICHT neu. Nenne nur die Befunde.`,
          note: 'Diesen Prüfschritt kannst du an jeden Workflow anhängen – unabhängig davon, worum es geht.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Workflow dokumentieren',
          blocks: [
            {
              type: 'text',
              md: 'Ein Workflow, der nur in deinem Kopf existiert, ist kein Workflow. Schreib ihn auf – am besten in dieser Form:',
            },
            {
              type: 'code',
              lang: 'markdown',
              caption: 'Workflow-Dokumentation',
              code: `# Workflow: Angebot erstellen

## Wann anwenden
Wenn eine Anfrage über 5.000 € hereinkommt.

## Material, das ich brauche
- Anfrage des Kunden
- Preisliste (Projekt: Vertrieb)
- Letztes Angebot an diesen Kunden (falls vorhanden)

## Schritt 1 – Anforderungen extrahieren
Prompt: "Lies die Anfrage. Liste alle Leistungen auf, die der Kunde
verlangt. Markiere, was unklar ist, mit [NACHFRAGEN]."

## Schritt 2 – Struktur
Prompt: "Erstelle die Angebotsstruktur nach unserer Vorlage."

## Schritt 3 – Ausarbeiten
Prompt: "Formuliere die Leistungsbeschreibung. Regeln: ..."

## Schritt 4 – Prüfen
Prompt: Qualitätsprüfung (siehe Standard-Checkliste)

## Was ich selbst prüfe
- Alle Preise gegen die Preisliste
- Termine gegen den Kalender`,
            },
            {
              type: 'callout',
              variant: 'warn',
              md: 'Der Abschnitt „Was ich selbst prüfe" gehört in jeden Workflow. Er hält fest, welche Kontrolle **nicht** delegiert wird.',
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
          title: 'Beispiel anzeigen: Wochenbericht in 4 Schritten',
          example: {
            task: 'Jeden Freitag ein Wochenbericht – bisher 45 Minuten Arbeit.',
            bad: 'Freitags ins leere Dokument starren und alles neu zusammensuchen.',
            good: `**1. Sammeln:** \`Hier sind meine Notizen der Woche. Ordne sie nach: Erledigt | Läuft | Blockiert | Neu aufgetaucht. Nichts hinzufügen.\`

**2. Strukturieren:** \`Bring das in unsere Berichtsvorlage. Fehlende Angaben mit [FEHLT] markieren.\`

**3. Ausarbeiten:** \`Formuliere die Abschnitte aus. Maximal 200 Wörter gesamt, sachlich, keine Floskeln.\`

**4. Prüfen:** \`Prüfe gegen die Checkliste: Sind alle blockierten Punkte mit Grund und Verantwortlichem genannt? Steht bei jedem offenen Punkt ein Termin?\``,
            why: 'Jeder Schritt macht genau eine Sache. Schritt 4 fängt genau den Fehler ab, der in Wochenberichten am häufigsten passiert: blockierte Punkte ohne benannte Ursache.',
            result:
              'Aus 45 Minuten werden etwa 10 – und der Bericht ist vollständiger als vorher.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Workflow entwerfen lassen',
          prompt: `Ich mache folgende Aufgabe regelmäßig: [AUFGABE]

Heute läuft das so: [AKTUELLER ABLAUF]
Das dauert: [ZEIT]
Typische Probleme dabei: [WAS SCHIEFGEHT]

Aufgabe:
1. Entwirf einen Workflow aus maximal 5 Schritten.
2. Schreib für jeden Schritt den konkreten Prompt.
3. Sag zu jedem Schritt, welches Material ich bereithalten muss.
4. Baue einen Prüfschritt ein, der genau meine typischen Probleme abfängt.
5. Nenne, was ich auf keinen Fall an dich delegieren sollte.

Format: als Dokumentation, die ich abspeichern kann.`,
          note: 'Punkt 5 ist die Sicherheitsleine: Er hält fest, welche Kontrolle bei dir bleibt.',
        },
      ],
    },
  ],
  mistakes: [
    'Den Prüfschritt weglassen, weil "es meistens passt".',
    'Einen Workflow bauen, ihn aber nirgends aufschreiben – dann nutzt ihn niemand sonst.',
    'Zu viele Schritte. Mehr als fünf hält man im Alltag nicht durch.',
    'Nicht festhalten, welche Kontrollen beim Menschen bleiben müssen.',
  ],
  proTip:
    'Nimm jeden echten Fehler, der dir durchrutscht, als Anlass, den Prüfschritt zu ergänzen. Nach drei Monaten hast du eine Checkliste, die genau **deine** Fehlerquellen abdeckt – das kann keine allgemeine Vorlage leisten.',
  task: {
    md: 'Wähle eine Aufgabe, die du mindestens wöchentlich machst. Baue einen Workflow aus vier Schritten und dokumentiere ihn. Führe ihn einmal komplett durch und miss die Zeit.',
    solution:
      'Beim ersten Durchlauf dauert es oft genauso lang wie vorher – der Gewinn kommt ab dem zweiten Mal. Wichtig ist, dass der Workflow **aufgeschrieben** ist; ein Workflow im Kopf wird nach zwei Wochen wieder improvisiert.',
  },
  exercise: {
    scenario: 'Dein Workflow liefert gute Ergebnisse, aber gelegentlich rutscht ein Fehler durch.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Den ganzen Workflow neu bauen',
        correct: false,
        explain: 'Überreaktion – der Ablauf funktioniert ja im Großen und Ganzen.',
      },
      {
        label: 'Die Prüf-Checkliste um genau diesen Fehlertyp ergänzen',
        correct: true,
        explain:
          'So wächst die Checkliste mit deiner Erfahrung und deckt mit der Zeit genau deine Fehlerquellen ab.',
      },
      {
        label: 'Künftig ohne Workflow arbeiten',
        correct: false,
        explain: 'Ohne Workflow rutschen mehr Fehler durch, nicht weniger.',
      },
    ],
  },
  quiz: [
    {
      q: 'Ab wann lohnt sich ein Workflow?',
      options: [
        { label: 'Ab der dritten Wiederholung', correct: true, explain: 'Gute Faustregel.' },
        { label: 'Ab der ersten', correct: false, explain: 'Meist zu früh – der Ablauf ist noch unklar.' },
        { label: 'Nie', correct: false, explain: 'Bei wiederkehrender Arbeit fast immer.' },
      ],
    },
    {
      q: 'Welcher Schritt wird am häufigsten weggelassen?',
      options: [
        { label: 'Sammeln', correct: false, explain: 'Passiert ohnehin.' },
        { label: 'Prüfen', correct: true, explain: 'Und genau er bringt den größten Qualitätsgewinn.' },
        { label: 'Ausarbeiten', correct: false, explain: 'Wird nie weggelassen – es ist die sichtbare Arbeit.' },
      ],
    },
    {
      q: 'Was gehört in jede Workflow-Dokumentation?',
      options: [
        {
          label: 'Ein Abschnitt „Was ich selbst prüfe"',
          correct: true,
          explain: 'Hält fest, welche Kontrolle nicht delegiert wird.',
        },
        { label: 'Eine Zeitangabe in Sekunden', correct: false, explain: 'Nicht nötig.' },
        { label: 'Der komplette Gesprächsverlauf', correct: false, explain: 'Unbrauchbar als Dokumentation.' },
      ],
    },
  ],
  related: ['lange-aufgaben', 'automatisierung', 'projekte-wissenskontext'],
}
