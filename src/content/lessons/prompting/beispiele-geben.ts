import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'beispiele-geben',
  track: 'prompting',
  title: 'Beispiele geben',
  description:
    'Ein einziges gutes Beispiel wirkt oft stärker als zehn Sätze Erklärung. Wie du deinen Stil übertragbar machst.',
  minutes: 6,
  keywords: ['beispiel', 'few shot', 'muster', 'stil', 'vorlage', 'ton treffen'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Statt zu **beschreiben**, wie das Ergebnis aussehen soll, **zeigst** du es. Claude erkennt das Muster und überträgt es.',
        },
        {
          type: 'simple',
          levels: [
            {
              label: 'Fachlich',
              md: 'Man nennt das *Few-Shot-Prompting*: Man gibt einige Beispielpaare aus Eingabe und gewünschter Ausgabe mit, damit das Modell die Abbildung aus den Beispielen ableitet statt aus einer abstrakten Beschreibung.',
            },
            {
              label: 'Einfach',
              md: 'Du zeigst ein paar Beispiele „so sieht ein gutes Ergebnis bei uns aus" – und Claude macht es genauso weiter.',
            },
            {
              label: 'Ganz einfach',
              md: 'Zeigen statt erklären.',
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
          md: 'Manche Dinge lassen sich fast nicht beschreiben: euer Tonfall, der typische Aufbau eurer Berichte, die Art, wie ihr Kunden ansprecht. Ein Beispiel transportiert das in Sekunden.',
        },
        {
          type: 'compare',
          badTitle: 'Beschreiben',
          badMd:
            '`Schreib im Stil unserer Firma: freundlich, aber nicht anbiedernd, sachlich, aber nicht kalt, kurz, aber vollständig.`\n\n→ Sehr interpretierbar. Jeder versteht darunter etwas anderes.',
          goodTitle: 'Zeigen',
          goodMd:
            '`Hier sind zwei Beispiele für unseren Stil:\n\nBeispiel 1: "Ihre Anfrage ist bei uns. Wir melden uns bis Donnerstag mit einem Termin. Falls es eilig ist, rufen Sie gern durch."\n\nBeispiel 2: "Der Termin am 14. passt bei uns. Wir bringen die Ersatzteile direkt mit, damit wir nicht zweimal kommen müssen."\n\nSchreib im selben Stil eine Antwort auf: [ANFRAGE]`',
          why: 'Aus zwei kurzen Beispielen wird klar: kurze Sätze, keine Floskeln, immer ein konkreter nächster Schritt. Das hätte kein Beschreibungssatz so genau getroffen.',
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
              title: 'Nimm echte Beispiele',
              md: 'Am besten aus deiner eigenen Arbeit. Zwei bis drei reichen fast immer.',
            },
            {
              title: 'Zeig Eingabe und Ausgabe',
              md: 'Wenn möglich beides: „Aus dieser Notiz wird dieser Text." So erkennt Claude die Umwandlung, nicht nur den Stil.',
            },
            {
              title: 'Markiere die Beispiele klar',
              md: '`--- BEISPIEL ---` … `--- ENDE BEISPIEL ---`. Sonst kann Claude sie für die eigentliche Aufgabe halten.',
            },
            {
              title: 'Ergänze, was du NICHT willst',
              md: 'Ein Gegenbeispiel („so bitte nicht") ist oft genauso hilfreich wie ein gutes Beispiel.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Häufige Stolperfalle',
          md: 'Wenn alle deine Beispiele dieselbe Länge oder denselben Aufbau haben, übernimmt Claude auch das – manchmal zu stark. Wähle Beispiele, die die Bandbreite zeigen, nicht nur einen Sonderfall.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Produktbeschreibungen vereinheitlichen',
          example: {
            task: 'Du hast 40 Produkttexte in unterschiedlichen Stilen und willst sie vereinheitlichen.',
            bad: '`Mach die Produkttexte einheitlich und professionell.`',
            good: `\`Hier ist unser Zielstil:

--- GUTES BEISPIEL ---
Eingabe: "Super robuster Akkuschrauber, hält ewig, 18V, viele Extras dabei!"
Ausgabe: "Akkuschrauber, 18 V. Zwei Akkus und Ladegerät im Lieferumfang. Für den täglichen Einsatz auf der Baustelle ausgelegt."
--- ENDE ---

--- SO BITTE NICHT ---
"Der revolutionäre Akkuschrauber für höchste Ansprüche – ein echtes Must-have!"
--- ENDE ---

Wandle jetzt den folgenden Text nach demselben Muster um:
[PRODUKTTEXT]\``,
            why: 'Das Gegenbeispiel schließt genau die Fehlerrichtung aus, die sonst am wahrscheinlichsten gewesen wäre: Werbesprache.',
            result:
              'Alle 40 Texte bekommen denselben nüchternen, informativen Ton – ohne dass du ihn je beschreiben musstest.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Stil übertragen',
          prompt: `Ich möchte, dass du in unserem Stil schreibst.

--- BEISPIEL 1 ---
[EIN ECHTER TEXT VON EUCH]
--- ENDE ---

--- BEISPIEL 2 ---
[NOCH EIN ECHTER TEXT VON EUCH]
--- ENDE ---

Aufgabe:
1. Beschreibe zuerst in 4 Stichpunkten, was diesen Stil ausmacht.
2. Schreib dann im selben Stil: [NEUE AUFGABE]

Wenn dir etwas am Stil unklar ist, frag nach, bevor du schreibst.`,
          note: 'Schritt 1 ist ein Kontrollpunkt: Wenn Claudes Stilbeschreibung nicht zu eurem Stil passt, korrigierst du sie – bevor der Text entsteht.',
        },
      ],
    },
  ],
  mistakes: [
    'Beispiele nicht markieren – Claude hält sie dann für die eigentliche Aufgabe.',
    'Nur ein einziges, untypisches Beispiel geben und sich über einseitige Ergebnisse wundern.',
    'Beispiele geben, die selbst nicht gut sind. Claude kopiert auch Schwächen.',
    'Kein Gegenbeispiel liefern, obwohl klar ist, in welche Richtung es schieflaufen wird.',
  ],
  proTip:
    'Lass Claude aus deinen Beispielen eine **Stil-Regel** formulieren („Beschreibe unseren Stil in 5 Regeln"). Diese Regeln kannst du speichern und künftig direkt mitgeben – dann brauchst du die Beispiele nicht jedes Mal.',
  task: {
    md: 'Such dir zwei Texte, die du selbst gut findest. Lass Claude daraus fünf Stil-Regeln ableiten. Prüfe, ob du diesen Regeln zustimmst – und korrigiere, was nicht passt.',
    solution:
      'Die abgeleiteten Regeln sind deine persönliche Stil-Vorlage. Speichere sie in der Prompt-Bibliothek dieser Academy oder in einem Projekt – dann hast du sie immer griffbereit.',
  },
  exercise: {
    scenario:
      'Du gibst Claude drei Beispiele, alle sind genau 3 Sätze lang. Deine neue Aufgabe bräuchte aber 10 Sätze.',
    question: 'Was passiert wahrscheinlich?',
    options: [
      {
        label: 'Claude schreibt trotzdem 10 Sätze, weil es inhaltlich nötig ist',
        correct: false,
        explain:
          'Möglich, aber unwahrscheinlich. Beispiele wirken stark – auch bei Merkmalen, die du gar nicht übertragen wolltest.',
      },
      {
        label: 'Claude orientiert sich an der Länge der Beispiele und wird zu kurz',
        correct: true,
        explain:
          'Genau. Deshalb: Beispiele wählen, die die Bandbreite zeigen – oder die gewünschte Länge ausdrücklich dazuschreiben.',
      },
      {
        label: 'Die Beispiele haben keinen Einfluss auf die Länge',
        correct: false,
        explain: 'Doch, einen sehr deutlichen.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wie viele Beispiele reichen meistens?',
      options: [
        { label: 'Zwei bis drei', correct: true, explain: 'Mehr bringt selten zusätzlichen Nutzen.' },
        { label: 'Mindestens zehn', correct: false, explain: 'Unnötig viel Aufwand.' },
        { label: 'Eines genügt immer', correct: false, explain: 'Ein einzelnes Beispiel kann untypisch sein.' },
      ],
    },
    {
      q: 'Warum sollte man Beispiele markieren?',
      options: [
        { label: 'Wegen der Optik', correct: false, explain: 'Nicht der Grund.' },
        {
          label: 'Damit Claude sie nicht für die Aufgabe hält',
          correct: true,
          explain: 'Klare Trennung zwischen Beispiel, Material und Auftrag.',
        },
        { label: 'Damit sie kürzer werden', correct: false, explain: 'Hat damit nichts zu tun.' },
      ],
    },
    {
      q: 'Was ist ein Gegenbeispiel?',
      options: [
        {
          label: 'Ein Beispiel dafür, wie es NICHT sein soll',
          correct: true,
          explain: 'Schließt die wahrscheinlichste Fehlerrichtung aus.',
        },
        { label: 'Ein besonders langes Beispiel', correct: false, explain: 'Nein.' },
        { label: 'Ein Beispiel aus einer anderen Branche', correct: false, explain: 'Nein.' },
      ],
    },
  ],
  related: ['rollen-und-aufgaben', 'ergebnisse-strukturieren', 'texte-erstellen'],
}
