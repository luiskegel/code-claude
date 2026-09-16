import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-dateien-analysieren',
  track: 'claude-code',
  title: 'Dateien analysieren lassen',
  description:
    'Der risikoloseste und unterschätzteste Teil von Claude Code: verstehen, was in einem Projekt eigentlich passiert.',
  minutes: 5,
  keywords: ['analysieren', 'verstehen', 'lesen', 'überblick', 'projekt verstehen', 'inventur'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Analysieren heißt: Claude Code liest, du erfährst. **Nichts wird verändert** – und deshalb kannst du hier ohne jedes Risiko arbeiten.',
        },
        {
          type: 'list',
          items: [
            '**Bestandsaufnahme:** Was liegt hier, wofür ist es da, wie hängt es zusammen?',
            '**Geerbte Projekte:** Code oder Dateien, die jemand anders hinterlassen hat, verstehen.',
            '**Suchen:** „Wo steht dieser Text? Wo wird diese Funktion verwendet?"',
            '**Vor dem Ändern:** Welche Dateien wären von meiner Änderung betroffen?',
            '**Dokumentieren:** Aus einem gewachsenen Projekt eine Beschreibung machen.',
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'success',
          title: 'Warum das der beste Einstieg ist',
          md: 'Lese-Aufträge können nichts kaputt machen. Du lernst die Bedienung, du lernst dein eigenes Projekt besser kennen – und du merkst, wie gut Claude Zusammenhänge erkennt, bevor du ihm Änderungen anvertraust.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Projekt-Bestandsaufnahme',
          prompt: `Mach eine Bestandsaufnahme dieses Projekts. Ändere nichts.

1. Wofür ist dieses Projekt da? (deine Einschätzung, in 3 Sätzen)
2. Welche Dateien und Ordner gibt es? Gruppiere nach Zweck.
3. Welche Datei ist der Einstiegspunkt?
4. Wie hängen die Teile zusammen?
5. Was fällt dir auf: Doppeltes, Veraltetes, Unfertiges, Ungewöhnliches?
6. Was fehlt, das man in so einem Projekt erwarten würde?

Format: Stichpunkte.
Kennzeichne klar, was du sicher weißt und was du vermutest.`,
          note: 'Die letzte Zeile ist wichtig: Bei fremden Projekten sind viele Aussagen Einschätzungen, keine Fakten.',
        },
        {
          type: 'prompt',
          title: 'Auswirkungen vor einer Änderung prüfen',
          prompt: `Ich überlege, folgende Änderung zu machen: [ÄNDERUNG]

Prüfe, ohne etwas zu ändern:
1. Welche Dateien wären betroffen?
2. Gibt es Stellen, die von dem abhängen, was ich ändern will?
3. Was könnte dadurch kaputtgehen?
4. In welcher Reihenfolge müsste man vorgehen?
5. Gibt es einen weniger riskanten Weg zum selben Ziel?

Sei konservativ in der Einschätzung.`,
          note: 'Diese Analyse vor einer Änderung kostet eine Minute und verhindert regelmäßig unangenehme Überraschungen.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Ein geerbtes Projekt verstehen',
          blocks: [
            {
              type: 'prompt',
              title: 'Einarbeitung in fremden Code',
              prompt: `Ich habe dieses Projekt übernommen und kenne es nicht.

Erklär es mir wie einem neuen Kollegen:
1. Was macht das Programm aus Sicht eines Nutzers?
2. Wie ist es aufgebaut? (grobe Struktur, keine Details)
3. Wo beginnt die Ausführung?
4. Welche 3 Dateien sollte ich zuerst verstehen – und warum genau diese?
5. Welche Stellen sehen fragil aus? Wo wäre ich vorsichtig?
6. Was würdest du als Erstes dokumentieren?

Ich bin kein erfahrener Entwickler. Erkläre in einfacher Sprache.`,
              note: 'Punkt 5 („fragile Stellen") ist bei geerbten Projekten der wertvollste – er sagt dir, wo du nicht als Erstes anfassen solltest.',
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
          title: 'Beispiel anzeigen: Aus der Analyse wird Dokumentation',
          example: {
            task: 'Ein gewachsenes Projekt ohne jede Dokumentation.',
            bad: 'Weiterarbeiten und hoffen, dass man sich an alles erinnert.',
            good: `\`Analysiere dieses Projekt und erstelle daraus einen Vorschlag für eine README.md.

Inhalt:
1. Was ist das? (3 Sätze)
2. Wie startet man es?
3. Wie ist es aufgebaut?
4. Welche Dateien macht man wofür auf?
5. Was muss man wissen, um nichts kaputt zu machen?

Wichtig:
- Was du nicht sicher aus den Dateien ableiten kannst, markiere mit [PRÜFEN].
- Schreib die Datei noch nicht – zeig mir erst den Vorschlag.\``,
            why: 'Die `[PRÜFEN]`-Markierung trennt das, was aus den Dateien hervorgeht, von dem, was Claude vermutet. Nur so ist die Dokumentation vertrauenswürdig.',
            result:
              'Ein README-Entwurf, den du in 10 Minuten korrigierst – statt ihn in zwei Stunden selbst zu schreiben.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Finde die Stelle',
          prompt: `Ich suche etwas in diesem Projekt.

Gesucht: [WAS DU SUCHST – TEXT, FUNKTION, EINSTELLUNG]

Aufgabe:
1. Wo kommt es vor? Datei und Zeile.
2. Zeig mir den Zusammenhang drumherum.
3. Wird es von woanders verwendet? Wenn ja, wo?
4. Wenn ich es ändere: Was wäre noch betroffen?

Ändere nichts.`,
          note: 'Punkt 3 und 4 sind der Unterschied zu einer normalen Textsuche: Du erfährst nicht nur, wo etwas steht, sondern auch, was daran hängt.',
        },
      ],
    },
  ],
  mistakes: [
    'Den Analyse-Schritt überspringen und direkt ändern.',
    'Einschätzungen für Fakten halten – bei fremden Projekten ist vieles Vermutung.',
    'Nur einzelne Dateien betrachten, statt nach Zusammenhängen zu fragen.',
    'Die Ergebnisse nicht festhalten und beim nächsten Mal wieder von vorn anfangen.',
  ],
  proTip:
    'Beginne **jede** neue Arbeitssitzung mit einer kurzen Analyse: *„Was hat sich seit dem letzten Mal geändert und wo stehen wir?"* Das ersetzt das mühsame Wiedereinarbeiten.',
  task: {
    md: 'Lass ein echtes Projekt analysieren und daraus einen README-Vorschlag erstellen. Prüfe alle `[PRÜFEN]`-Markierungen und korrigiere sie. Speichere das Ergebnis.',
    solution:
      'Meist stimmen die strukturellen Aussagen und ein bis zwei Zweckbeschreibungen liegen daneben. Nach deiner Korrektur hast du eine Dokumentation, die du sonst nie geschrieben hättest – und die Claude Code künftig besser arbeiten lässt.',
  },
  exercise: {
    scenario: 'Du hast ein Projekt von einem Kollegen übernommen.',
    question: 'Was ist der beste erste Schritt?',
    options: [
      {
        label: 'Sofort die Fehler beheben, die dir auffallen',
        correct: false,
        explain:
          'Ohne den Zusammenhang zu kennen, macht man aus einem Fehler leicht drei.',
      },
      {
        label: 'Analysieren lassen – inklusive „welche Stellen sehen fragil aus?"',
        correct: true,
        explain:
          'Erst verstehen, dann ändern. Und du erfährst, wo du besser nicht als Erstes anfasst.',
      },
      {
        label: 'Alles neu schreiben lassen',
        correct: false,
        explain: 'Der teuerste und riskanteste Weg.',
      },
    ],
  },
  quiz: [
    {
      q: 'Warum ist Analysieren der beste Einstieg?',
      options: [
        {
          label: 'Es kann nichts kaputt machen',
          correct: true,
          explain: 'Reine Lese-Aufträge sind risikofrei.',
        },
        { label: 'Es geht am schnellsten', correct: false, explain: 'Nicht der Hauptgrund.' },
        { label: 'Es ist am einfachsten zu formulieren', correct: false, explain: 'Auch nicht.' },
      ],
    },
    {
      q: 'Was solltest du bei Analysen von fremden Projekten verlangen?',
      options: [
        {
          label: 'Eine klare Trennung zwischen Gewusstem und Vermutetem',
          correct: true,
          explain: 'Sonst hältst du Einschätzungen für Fakten.',
        },
        { label: 'Möglichst viele Details', correct: false, explain: 'Menge ist nicht das Ziel.' },
        { label: 'Eine Bewertung des Programmierstils', correct: false, explain: 'Selten nützlich.' },
      ],
    },
    {
      q: 'Was fragst du vor einer geplanten Änderung?',
      options: [
        { label: '„Ist das eine gute Idee?"', correct: false, explain: 'Zu vage.' },
        {
          label: '„Welche Dateien wären betroffen und was könnte kaputtgehen?"',
          correct: true,
          explain: 'Konkrete Auswirkungsanalyse statt allgemeiner Einschätzung.',
        },
        { label: '„Wie lange dauert das?"', correct: false, explain: 'Interessant, aber nicht sicherheitsrelevant.' },
      ],
    },
  ],
  related: ['cc-aufgaben-geben', 'cc-aenderungen', 'texte-analysieren'],
}
