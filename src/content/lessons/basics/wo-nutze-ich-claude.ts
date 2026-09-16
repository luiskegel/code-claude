import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'wo-nutze-ich-claude',
  track: 'basics',
  title: 'Wo benutze ich Claude?',
  description:
    'Chat, Desktop, Handy, Claude Code, API: Welche Oberfläche wofür gedacht ist – und womit du als Anfänger startest.',
  minutes: 5,
  keywords: ['app', 'oberfläche', 'web', 'desktop', 'api', 'claude code', 'plattform', 'wo'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude ist dasselbe Modell – aber es gibt verschiedene Wege, damit zu arbeiten. Als Anfänger brauchst du genau einen davon.',
        },
        {
          type: 'table',
          head: ['Weg', 'Für wen', 'Wofür'],
          rows: [
            ['**Claude im Browser / App**', 'Alle. Hier startest du.', 'Chatten, Dateien hochladen, Projekte anlegen'],
            ['**Desktop-App**', 'Alle', 'Dasselbe wie im Browser, nur als eigenes Programm'],
            ['**Handy-App**', 'Unterwegs', 'Schnelle Fragen, Fotos analysieren, diktieren'],
            ['**Claude Code**', 'Wer Dateien und Projekte am Rechner bearbeitet', 'Programmieren, Dateien ändern, Websites bauen'],
            ['**API**', 'Entwickler', 'Claude in eigene Programme einbauen'],
          ],
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Für dich als Anfänger',
          md: 'Fang mit **Claude im Browser** an. Alles in Level 1 bis 3 dieser Academy funktioniert dort. Claude Code und die API brauchst du erst viel später – und wir erklären sie dann von null.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die Wahl der Oberfläche entscheidet darüber, **was Claude anfassen darf**:',
        },
        {
          type: 'list',
          items: [
            'Im **Chat** sieht Claude nur das, was du in das Gespräch schreibst oder hochlädst. Er kann nichts auf deinem Computer verändern.',
            'In **Claude Code** darf Claude Dateien auf deinem Rechner lesen und – wenn du zustimmst – auch ändern. Das ist mächtig und braucht deshalb Sorgfalt.',
            'Über die **API** baust du Claude in eigene Software ein. Dort legst du selbst fest, was erlaubt ist.',
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Sicherheitsunterschied',
          md: 'Im Chat kann nichts kaputtgehen. In Claude Code schon – deshalb gibt es dort einen eigenen Lernpfad mit Sicherheitsregeln, bevor du etwas veränderst.',
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
              title: 'Im Browser starten',
              md: 'Konto anlegen, Gespräch öffnen, Prompt schreiben. Mehr braucht es nicht.',
            },
            {
              title: 'Dateien hochladen, wenn du welche hast',
              md: 'PDFs, Bilder, Tabellen, Textdateien. Claude liest sie und arbeitet damit. Details in Level 3.',
            },
            {
              title: 'Projekte nutzen, sobald sich Dinge wiederholen',
              md: 'Ein Projekt ist ein Ordner mit Dauer-Kontext: Wenn du dieselben Hintergrundinfos immer wieder erklärst, gehören sie ins Projekt.',
            },
            {
              title: 'Erst später: Claude Code',
              md: 'Sobald du mit Ordnern und Dateien auf deinem Rechner arbeiten willst. Der eigene Lernpfad beginnt bei „Was ist ein Terminal?".',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Was ist mit den verschiedenen Modellen?',
          blocks: [
            {
              type: 'text',
              md: 'Claude gibt es in mehreren Modellvarianten. Sie unterscheiden sich vor allem in **Tiefe des Nachdenkens**, **Geschwindigkeit** und **Preis** (bei der API-Nutzung).',
            },
            {
              type: 'list',
              items: [
                '**Opus** – die leistungsstärkste Familie für schwierige Aufgaben und lange, komplexe Arbeit.',
                '**Sonnet** – ausgewogen zwischen Tempo und Leistung, gut für den Alltag.',
                '**Haiku** – besonders schnell und günstig für einfache, häufige Aufgaben.',
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              md: 'Als Anfänger musst du hier **nichts entscheiden**. Die App wählt eine sinnvolle Voreinstellung. Eine eigene Lektion in Level 5 erklärt die Unterschiede genauer.',
            },
            {
              type: 'source',
              md: 'Modellnamen und Verfügbarkeit ändern sich regelmäßig. Maßgeblich ist immer die offizielle Dokumentation von Anthropic.',
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
          title: 'Beispiel anzeigen: dieselbe Aufgabe, drei Wege',
          example: {
            task: 'Du willst 30 Produkttexte für deinen Shop kürzen.',
            bad: 'Alles einzeln im Chat: 30 Mal kopieren, einfügen, Ergebnis zurückkopieren. Funktioniert, dauert aber ewig.',
            good: '**Chat:** Die 5 wichtigsten Texte einzeln – schnell, gut kontrollierbar.\n\n**Projekt:** Stilregeln und Beispieltexte einmal hinterlegen, dann 30 Mal denselben kurzen Prompt nutzen.\n\n**Claude Code:** Wenn die Texte als Dateien auf deinem Rechner liegen, kann Claude Code sie direkt öffnen, ändern und speichern.',
            why: 'Die richtige Oberfläche hängt davon ab, **wo deine Daten liegen** und **wie oft** sich die Aufgabe wiederholt.',
            result:
              'Aus zwei Stunden Copy-Paste werden je nach Weg 20 Minuten – bei gleichbleibender Qualität.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Welcher Weg passt zu dir?',
          prompt: `Ich überlege, wie ich Claude am besten nutze.

Meine Situation:
- Ich arbeite als: [ROLLE]
- Meine Daten liegen: [IN E-MAILS / IN PDFs / IN ORDNERN AUF MEINEM RECHNER / IN EINER SOFTWARE]
- Ich habe Programmierkenntnisse: [KEINE / WENIGE / GUTE]
- Die Aufgabe wiederholt sich: [EINMALIG / WÖCHENTLICH / TÄGLICH]

Aufgabe:
Empfiehl mir, womit ich anfangen soll, und begründe es in 3 Sätzen.
Sag mir auch, was ich NOCH NICHT brauche.`,
          note: 'Der letzte Satz schützt dich davor, zu früh in komplizierte Werkzeuge einzusteigen.',
        },
      ],
    },
  ],
  mistakes: [
    'Zu früh mit Claude Code starten, ohne die Grundlagen des Promptens zu beherrschen.',
    'Die API für etwas nutzen wollen, das im Chat in zwei Minuten erledigt wäre.',
    'Vertrauliche Firmendaten hochladen, ohne die Regeln des Arbeitgebers zu kennen.',
    'Für jede Kleinigkeit ein neues Projekt anlegen, statt einfach zu chatten.',
  ],
  proTip:
    'Die Reihenfolge, die sich bewährt: **Chat → Dateien → Projekte → Claude Code → API**. Jede Stufe baut auf der vorherigen auf. Überspring keine – sonst fehlen dir später genau die Grundlagen, an denen es hakt.',
  task: {
    md: 'Entscheide für drei deiner eigenen Aufgaben, welcher Weg passt: Chat, Projekt oder Claude Code. Begründe jede Entscheidung mit einem Satz.',
    solution: `Faustregeln:

- **Einmalig und im Browser erledigbar** → Chat.
- **Wiederholt sich mit gleichem Hintergrundwissen** → Projekt.
- **Dateien auf deinem Rechner sollen sich ändern** → Claude Code.`,
  },
  exercise: {
    scenario:
      'Du willst jede Woche denselben Wochenbericht schreiben – immer mit denselben Hintergrundinfos zu Team und Kunden.',
    question: 'Was ist der beste Weg?',
    options: [
      {
        label: 'Jede Woche einen neuen Chat und die Infos jedes Mal neu erklären',
        correct: false,
        explain: 'Funktioniert, kostet dich aber jede Woche dieselbe Tipparbeit.',
      },
      {
        label: 'Ein Projekt anlegen und die Hintergrundinfos dort dauerhaft hinterlegen',
        correct: true,
        explain:
          'Genau dafür sind Projekte da: Wissen einmal hinterlegen, in vielen Chats nutzen.',
      },
      {
        label: 'Claude Code installieren',
        correct: false,
        explain:
          'Überdimensioniert. Claude Code lohnt sich, wenn Dateien auf deinem Rechner verändert werden sollen.',
      },
    ],
  },
  quiz: [
    {
      q: 'Womit sollte ein Anfänger starten?',
      options: [
        {
          label: 'Mit Claude im Browser',
          correct: true,
          explain: 'Alles Wesentliche lässt sich dort lernen – ohne Installation und ohne Risiko.',
        },
        {
          label: 'Mit der API',
          correct: false,
          explain: 'Die API setzt Programmierkenntnisse voraus.',
        },
        {
          label: 'Mit Claude Code',
          correct: false,
          explain:
            'Claude Code ist stark, verändert aber Dateien auf deinem Rechner. Erst Grundlagen, dann das.',
        },
      ],
    },
    {
      q: 'Was ist der wichtigste Sicherheitsunterschied zwischen Chat und Claude Code?',
      options: [
        {
          label: 'Im Chat kann Claude nichts auf deinem Rechner verändern',
          correct: true,
          explain:
            'Genau. In Claude Code kann er es – nach deiner Zustimmung. Deshalb gelten dort eigene Regeln.',
        },
        {
          label: 'Claude Code ist ein anderes Modell',
          correct: false,
          explain: 'Es ist dieselbe Modellfamilie, nur eine andere Arbeitsumgebung.',
        },
        {
          label: 'Im Chat gibt es keine Dateien',
          correct: false,
          explain: 'Doch – du kannst Dateien hochladen. Claude verändert sie aber nicht auf deinem Rechner.',
        },
      ],
    },
    {
      q: 'Wann lohnt sich ein Projekt?',
      options: [
        {
          label: 'Bei jeder einzelnen Frage',
          correct: false,
          explain: 'Für einmalige Fragen ist ein normaler Chat schneller.',
        },
        {
          label: 'Wenn sich Aufgaben mit gleichem Hintergrundwissen wiederholen',
          correct: true,
          explain: 'Dann sparst du dir jedes Mal dieselbe Erklärung.',
        },
        {
          label: 'Nur bei Programmierprojekten',
          correct: false,
          explain: 'Projekte funktionieren für jede Art von Arbeit.',
        },
      ],
    },
  ],
  related: ['projekte-wissenskontext', 'cc-was-ist-claude-code', 'modelle-verstehen'],
}
