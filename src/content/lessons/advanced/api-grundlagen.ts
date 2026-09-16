import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'api-grundlagen',
  track: 'advanced',
  title: 'API-Grundlagen',
  description:
    'Claude in eigene Programme einbauen – was eine API ist, wie ein Aufruf aussieht und was du vorher wissen solltest.',
  minutes: 8,
  keywords: ['api', 'programmieren', 'entwickler', 'schnittstelle', 'integration', 'sdk', 'code'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Eine **API** ist eine Schnittstelle, über die ein Programm mit einem anderen spricht. Statt dass du etwas in ein Chatfenster tippst, schickt deine Software die Anfrage.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Die Messages-API nimmt eine strukturierte Anfrage mit Modellangabe, System-Anweisung und Nachrichtenverlauf entgegen und liefert eine Antwort mit Inhaltsblöcken sowie Nutzungsdaten zurück – über HTTPS, authentifiziert per Schlüssel.',
            },
            {
              label: 'Einfach',
              md: 'Dein Programm schickt Text an Claude und bekommt Text zurück – automatisch, ohne dass ein Mensch beteiligt ist.',
            },
            {
              label: 'Ganz einfach',
              md: 'Claude als Baustein in deiner eigenen Software.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Voraussetzungen ehrlich benannt',
          md: 'Für die API brauchst du **Programmierkenntnisse** und einen kostenpflichtigen Zugang. Wenn du bisher nicht programmiert hast, ist das nicht der nächste Schritt – dann sind Projekte und Workflows die passendere Ebene.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'table',
          head: ['Sinnvoll für', 'Nicht sinnvoll für'],
          rows: [
            ['Claude-Funktionen in eigener Software', 'Aufgaben, die im Chat in zwei Minuten erledigt sind'],
            ['Massenverarbeitung ohne Chatfenster', 'Einmalige Arbeiten'],
            ['Automatische Auswertungen und Klassifikationen', 'Kreative Einzelaufgaben mit viel Rückfragen'],
            ['Eigene Assistenzfunktionen für Nutzer', 'Alles, wofür eine fertige Oberfläche reicht'],
          ],
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'text',
          md: 'Ein API-Aufruf hat immer denselben Aufbau: Modell, maximale Antwortlänge, optionale System-Anweisung und die Nachrichten.',
        },
        {
          type: 'code',
          lang: 'python',
          caption: 'Ein einfacher Aufruf (Python)',
          code: `from anthropic import Anthropic

client = Anthropic()  # liest den Schlüssel aus der Umgebung

antwort = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    system="Du antwortest sachlich und auf Deutsch.",
    messages=[
        {"role": "user", "content": "Fasse diesen Text in 3 Sätzen zusammen: ..."}
    ],
)

print(antwort.content[0].text)`,
        },
        {
          type: 'code',
          lang: 'ts',
          caption: 'Derselbe Aufruf (TypeScript)',
          code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic() // liest den Schlüssel aus der Umgebung

const antwort = await client.messages.create({
  model: 'claude-opus-5',
  max_tokens: 1024,
  system: 'Du antwortest sachlich und auf Deutsch.',
  messages: [
    { role: 'user', content: 'Fasse diesen Text in 3 Sätzen zusammen: ...' },
  ],
})

console.log(antwort.content[0].text)`,
        },
        {
          type: 'list',
          items: [
            '**`model`** – welches Modell verwendet wird.',
            '**`max_tokens`** – wie lang die Antwort höchstens werden darf.',
            '**`system`** – dauerhafte Anweisung, vergleichbar mit den Projekt-Anweisungen im Chat.',
            '**`messages`** – der Gesprächsverlauf. Für ein Folgegespräch hängst du die bisherigen Nachrichten an.',
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Zugangsschlüssel niemals in den Code schreiben',
          md: 'Der API-Schlüssel ist wie ein Passwort – wer ihn hat, verursacht Kosten auf deine Rechnung. Er gehört in eine **Umgebungsvariable** oder eine `.env`-Datei, die von der Versionierung ausgeschlossen ist. Niemals direkt im Quelltext, niemals in ein öffentliches Repository.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Was es sonst noch gibt',
          blocks: [
            {
              type: 'list',
              items: [
                '**Streaming** – die Antwort kommt Stück für Stück, statt am Ende komplett. Wichtig für Chat-Oberflächen und bei langen Antworten.',
                '**Werkzeuge (Tools)** – Claude kann Funktionen deines Programms aufrufen, etwa eine Datenbankabfrage oder eine Berechnung.',
                '**Strukturierte Ausgaben** – die Antwort kommt in einem festgelegten Datenformat, das deine Software direkt weiterverarbeiten kann.',
                '**Stapelverarbeitung** – viele Anfragen auf einmal, günstiger, dafür ohne sofortige Antwort.',
                '**Zwischenspeichern (Caching)** – wiederkehrende Kontexte werden günstiger, wenn sie sich nicht ändern.',
                '**Dateien und Dokumente** – PDFs und Bilder lassen sich direkt mitgeben.',
              ],
            },
            {
              type: 'source',
              md: 'Genaue Parameter, verfügbare Modelle, Preise und die aktuellen Funktionen: offizielle Anthropic-Dokumentation. Diese Angaben ändern sich häufig – prüfe sie dort, bevor du etwas baust.',
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
          title: 'Beispiel anzeigen: Der erste eigene Anwendungsfall',
          example: {
            task: 'Eingehende Support-Mails sollen automatisch eine Kategorie und eine Dringlichkeitsstufe bekommen.',
            bad: 'Direkt eine vollautomatische Verarbeitung bauen, die Ergebnisse ungeprüft ins Ticketsystem schreibt.',
            good: `**Schritt 1:** Die Aufgabe im Chat von Hand lösen, bis der Prompt zuverlässig funktioniert.

**Schritt 2:** 30 echte Fälle sammeln und von Hand korrekt einordnen – das ist dein Maßstab.

**Schritt 3:** Den Prompt über die API auf dieselben 30 Fälle anwenden und die Trefferquote messen.

**Schritt 4:** Eine Sicherheitsangabe pro Fall ausgeben lassen. Unsichere Fälle gehen an einen Menschen.

**Schritt 5:** Erst dann in Betrieb nehmen – mit Protokollierung, damit du die Qualität weiter beobachten kannst.`,
            why: 'Schritt 1 und 2 verhindern den häufigsten Fehler: eine Automatisierung zu bauen, bevor man weiß, ob die zugrundeliegende Aufgabe überhaupt zuverlässig lösbar ist.',
            result:
              'Ein System mit bekannter Trefferquote und einem klaren Weg für die unsicheren Fälle – statt einer Blackbox.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'API-Einstieg planen',
          prompt: `Ich möchte Claude über die API in eine eigene Anwendung einbauen.

Meine Situation:
- Programmiersprache: [SPRACHE]
- Erfahrung: [ANFÄNGER / FORTGESCHRITTEN]
- Was die Anwendung tun soll: [BESCHREIBUNG]
- Erwartete Menge: [ANFRAGEN PRO TAG]

Aufgabe:
1. Ist die API hier überhaupt der richtige Weg – oder reicht etwas Einfacheres?
2. Wie sieht der minimale erste Aufruf in meiner Sprache aus?
3. Wie gehe ich sicher mit dem Zugangsschlüssel um?
4. Welche Fehlerfälle muss ich abfangen?
5. Wie messe ich, ob die Qualität ausreicht?
6. Was würde ich im ersten Entwurf mit Sicherheit vergessen?

Nenne keine Preise als feststehend – verweise dafür auf die offizielle Dokumentation.`,
          note: 'Punkt 6 liefert erfahrungsgemäß die nützlichsten Hinweise: Fehlerbehandlung, Wiederholungen bei Überlastung und Protokollierung.',
        },
      ],
    },
  ],
  mistakes: [
    'Den API-Schlüssel im Quelltext ablegen oder versehentlich veröffentlichen.',
    'Mit der API beginnen, bevor der Prompt im Chat zuverlässig funktioniert.',
    'Keine Fehlerbehandlung einbauen – Netzwerkfehler und Überlastung kommen vor.',
    'Keine Qualitätsmessung einrichten und dadurch nicht merken, wenn Ergebnisse schlechter werden.',
    'Modellnamen und Parameter aus veralteten Anleitungen übernehmen.',
  ],
  proTip:
    'Baue von Anfang an eine **Protokollierung** ein: Eingabe, Ausgabe, Zeitstempel, verwendetes Modell. Ohne diese Daten kannst du später weder Fehler nachvollziehen noch Qualitätsveränderungen erkennen.',
  task: {
    md: 'Löse deinen geplanten Anwendungsfall zuerst vollständig im Chat – bis der Prompt an 10 echten Beispielen zuverlässig funktioniert. Schreib erst danach die erste Zeile Code.',
    solution:
      'Diese Reihenfolge spart typischerweise die Hälfte des Aufwands: Der Prompt ist der eigentliche Kern, der Code drumherum ist vergleichsweise einfach. Wer zuerst programmiert, debuggt am Ende beides gleichzeitig.',
  },
  exercise: {
    scenario: 'Du baust deine erste API-Anwendung.',
    question: 'Wo gehört der Zugangsschlüssel hin?',
    options: [
      {
        label: 'Direkt in den Quelltext – das ist am einfachsten',
        correct: false,
        explain:
          'Damit landet er in jeder Kopie des Codes und möglicherweise in einem öffentlichen Repository. Wer ihn findet, verursacht Kosten auf deine Rechnung.',
      },
      {
        label: 'In eine Umgebungsvariable oder `.env`-Datei, die von der Versionierung ausgeschlossen ist',
        correct: true,
        explain:
          'Der Standardweg. Das SDK liest den Schlüssel dann automatisch aus der Umgebung.',
      },
      {
        label: 'In eine Textdatei im Projektordner',
        correct: false,
        explain:
          'Nur sicher, wenn sie ausdrücklich von der Versionierung ausgeschlossen ist – und selbst dann ist die Umgebungsvariable der bessere Weg.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was entspricht bei der API den Projekt-Anweisungen aus dem Chat?',
      options: [
        { label: 'Das `system`-Feld', correct: true, explain: 'Die dauerhafte Anweisung für das Verhalten.' },
        { label: '`max_tokens`', correct: false, explain: 'Das begrenzt nur die Antwortlänge.' },
        { label: '`model`', correct: false, explain: 'Das wählt nur das Modell.' },
      ],
    },
    {
      q: 'Was solltest du tun, bevor du programmierst?',
      options: [
        {
          label: 'Den Prompt im Chat an echten Beispielen zuverlässig zum Laufen bringen',
          correct: true,
          explain: 'Der Prompt ist der Kern – der Code drumherum ist der einfachere Teil.',
        },
        { label: 'Das teuerste Modell auswählen', correct: false, explain: 'Keine Grundlage für eine Entscheidung.' },
        { label: 'Die komplette Anwendung entwerfen', correct: false, explain: 'Erst prüfen, ob die Aufgabe überhaupt lösbar ist.' },
      ],
    },
    {
      q: 'Warum ist Protokollierung wichtig?',
      options: [
        { label: 'Für die Statistik', correct: false, explain: 'Nicht der Hauptgrund.' },
        {
          label: 'Um Fehler nachvollziehen und Qualitätsveränderungen erkennen zu können',
          correct: true,
          explain: 'Ohne Protokoll merkst du nicht, wenn die Ergebnisse schlechter werden.',
        },
        { label: 'Weil es vorgeschrieben ist', correct: false, explain: 'Hängt vom Einsatzgebiet ab – der praktische Grund zählt hier.' },
      ],
    },
  ],
  related: ['automatisierung', 'modelle-verstehen', 'agenten-und-tools'],
}
