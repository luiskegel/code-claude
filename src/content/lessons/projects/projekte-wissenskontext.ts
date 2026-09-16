import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'projekte-wissenskontext',
  track: 'projects',
  title: 'Projekte und Wissenskontext',
  description:
    'Hintergrundwissen einmal hinterlegen statt in jedem Chat neu erklären – so baust du dir einen dauerhaften Arbeitskontext.',
  minutes: 7,
  keywords: ['projekt', 'wissen', 'kontext', 'dauerhaft', 'vorlage', 'anweisungen', 'wissensbasis'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein **Projekt** ist ein Arbeitsbereich, in dem Hintergrundwissen und Regeln dauerhaft hinterlegt sind. Jedes Gespräch darin startet mit diesem Wissen – du musst nichts wiederholen.',
        },
        {
          type: 'table',
          head: ['', 'Normaler Chat', 'Projekt'],
          rows: [
            ['Vorwissen', 'Jedes Mal neu erklären', 'Einmal hinterlegt, immer da'],
            ['Dateien', 'Pro Gespräch hochladen', 'Dauerhaft im Projekt'],
            ['Regeln und Stil', 'In jedem Prompt wiederholen', 'Als Anweisung einmal festgelegt'],
            ['Geeignet für', 'Einmalige Aufgaben', 'Wiederkehrende Arbeit zum selben Thema'],
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          md: 'Die genaue Benennung und der Funktionsumfang können sich je nach Oberfläche und Tarif unterscheiden. Das **Prinzip** – dauerhafter Wissenskontext plus feste Anweisungen – bleibt gleich.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Der Moment, an dem sich ein Projekt lohnt, ist leicht zu erkennen: **Du erklärst zum dritten Mal dasselbe.**',
        },
        {
          type: 'list',
          items: [
            'Du nennst jedes Mal eure Firma, Branche, Zielgruppe und euren Tonfall.',
            'Du lädst dieselbe Preisliste oder dasselbe Handbuch wieder hoch.',
            'Du schreibst in jeden Prompt dieselben fünf Regeln.',
            'Mehrere Personen sollen mit demselben Hintergrundwissen arbeiten.',
          ],
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
              title: 'Projekt anlegen und benennen',
              md: 'Pro Thema oder Arbeitsbereich eines – nicht eines für alles.',
            },
            {
              title: 'Wissen hinterlegen',
              md: 'Die Dokumente, die immer wieder gebraucht werden: Preisliste, Stilregeln, Produktinfos, Prozessbeschreibungen.',
            },
            {
              title: 'Anweisungen festlegen',
              md: 'Das ist der wichtigste Teil: Rolle, Tonfall, feste Regeln, Format, Grenzen.',
            },
            {
              title: 'Im Projekt arbeiten',
              md: 'Deine Prompts werden dadurch kurz: „Schreib eine Antwort auf diese Anfrage" genügt.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Vorlage für Projekt-Anweisungen',
          prompt: `## Wer wir sind
[FIRMA / TEAM, BRANCHE, GRÖSSE]

## Für wen wir arbeiten
[ZIELGRUPPE, TYPISCHE KUNDEN]

## Wie wir schreiben
- Ansprache: [SIE / DU]
- Tonfall: [SACHLICH / WARM / DIREKT]
- Satzlänge: [KURZ / NORMAL]
- Nie verwenden: [FLOSKELN, BEGRIFFE, SUPERLATIVE]
- Immer verwenden: [FESTE BEGRIFFE, SCHREIBWEISEN]

## Wie du antworten sollst
- Frag nach, wenn dir Informationen fehlen, statt zu raten.
- Markiere Unsicherheiten ausdrücklich.
- Keine Einleitungs- und Abschlussfloskeln.
- Bei Zahlen: Quelle nennen oder als Annahme kennzeichnen.

## Was du nicht tun sollst
- [GRENZEN: KEINE RECHTSAUSSAGEN, KEINE PREISZUSAGEN, ...]`,
          note: 'Diese Vorlage einmal ausgefüllt spart dir bei jeder weiteren Aufgabe zehn Zeilen Prompt – und sorgt dafür, dass Ergebnisse einheitlich sind.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Was gehört ins Projektwissen – und was nicht?',
          blocks: [
            {
              type: 'table',
              head: ['Gehört hinein', 'Gehört nicht hinein'],
              rows: [
                ['Stabile Fakten (Produkte, Prozesse, Zielgruppe)', 'Tagesaktuelle Zahlen, die sich ständig ändern'],
                ['Stilregeln und Beispieltexte', 'Einmalige Aufgabenbeschreibungen'],
                ['Wiederkehrend gebrauchte Dokumente', 'Personenbezogene Daten ohne Freigabe'],
                ['Feste Formatvorgaben', 'Zugangsdaten, Passwörter, Schlüssel'],
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              md: 'Projektwissen ist dauerhaft. Prüfe deshalb besonders sorgfältig, was du hinterlegst – und halte es aktuell. Veraltetes Projektwissen wirkt in **jedem** Gespräch weiter.',
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
          title: 'Beispiel anzeigen: Kundenkommunikation',
          example: {
            task: 'Drei Mitarbeitende beantworten Kundenanfragen – mit sehr unterschiedlichem Ton.',
            bad: 'Jeder schreibt eigene Prompts. Ergebnis: drei Schreibstile, unterschiedliche Auskünfte, uneinheitliche Begriffe.',
            good: `Ein gemeinsames Projekt mit:
- **Wissen:** Preisliste, Leistungsbeschreibung, häufige Fragen samt abgestimmter Antworten
- **Anweisungen:** Ansprache, Tonfall, feste Begriffe, Verbot von Preiszusagen ohne Rückfrage
- **Beispiele:** 5 Musterantworten, die alle gut finden

Prompt im Alltag: \`Antworte auf diese Kundenanfrage: [ANFRAGE]\``,
            why: 'Das gesamte Wissen steckt im Projekt, nicht im Kopf oder im Prompt einzelner Personen. Neue Kolleginnen sind sofort auf demselben Stand.',
            result:
              'Einheitliche Antworten, unabhängig davon, wer sie schreibt – und ein Prompt, der aus einem Satz besteht.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Projektwissen aus dem Kopf holen',
          prompt: `Ich möchte ein Projekt für folgenden Arbeitsbereich anlegen: [BEREICH].

Aufgabe:
1. Welche Hintergrundinformationen brauchst du, um in diesem Bereich gute Ergebnisse zu liefern?
2. Welche Regeln und Vorgaben sollte ich festlegen?
3. Welche Dokumente sollte ich hinterlegen?
4. Welche Grenzen sollte ich definieren (was du NICHT tun sollst)?
5. Stell mir die 10 Fragen, deren Antworten ich in die Projekt-Anweisungen schreiben sollte.

Frag mich die 10 Fragen einzeln, eine nach der anderen.`,
          note: 'Am Ende hast du deine Projekt-Anweisungen fast fertig – aus einem Gespräch statt aus einem leeren Formular.',
        },
      ],
    },
  ],
  mistakes: [
    'Ein Projekt für alles anlegen. Dann vermischen sich Kontexte und die Antworten werden unschärfer.',
    'Veraltete Dokumente im Projekt lassen – sie wirken in jedem Gespräch weiter.',
    'Nur Dateien hinterlegen, aber keine Anweisungen. Die Anweisungen bringen den größeren Teil des Nutzens.',
    'Vertrauliche Daten dauerhaft hinterlegen, ohne die Freigabe geklärt zu haben.',
  ],
  proTip:
    'Nimm dir einmal im Quartal fünf Minuten: *"Lies die Projekt-Anweisungen und sag mir, welche Regeln sich widersprechen, welche überflüssig sind und was fehlt."* Projekte veralten leise.',
  task: {
    md: 'Lege ein Projekt für deinen häufigsten Arbeitsbereich an. Fülle die Anweisungs-Vorlage aus und hinterlege maximal drei Dokumente. Teste danach, ob ein Ein-Satz-Prompt ein brauchbares Ergebnis bringt.',
    solution:
      'Wenn der Ein-Satz-Prompt nicht funktioniert, fehlt meist eine von zwei Dingen: konkrete Stil-Beispiele oder eine klare Format-Vorgabe in den Anweisungen. Beides nachtragen – dann klappt es.',
  },
  exercise: {
    scenario:
      'Du hast in einem Projekt eine Preisliste hinterlegt. Vor zwei Monaten haben sich die Preise geändert.',
    question: 'Was passiert?',
    options: [
      {
        label: 'Claude merkt selbst, dass die Liste veraltet ist',
        correct: false,
        explain:
          'Nein. Hinterlegtes Wissen wird als gültig behandelt – ohne Datum und ohne Prüfung.',
      },
      {
        label: 'Alle Gespräche in diesem Projekt arbeiten weiter mit den alten Preisen',
        correct: true,
        explain:
          'Genau deshalb müssen Projekte gepflegt werden. Veraltetes Projektwissen ist gefährlicher als gar keines.',
      },
      {
        label: 'Das Projekt funktioniert nicht mehr',
        correct: false,
        explain: 'Es funktioniert weiter – nur mit falschen Zahlen. Das ist das Problem.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wann lohnt sich ein Projekt?',
      options: [
        {
          label: 'Wenn du zum dritten Mal dasselbe erklärst',
          correct: true,
          explain: 'Der zuverlässigste Indikator.',
        },
        { label: 'Bei jeder einzelnen Frage', correct: false, explain: 'Für Einmaliges ist ein Chat schneller.' },
        { label: 'Nur bei großen Firmen', correct: false, explain: 'Auch für Einzelpersonen sinnvoll.' },
      ],
    },
    {
      q: 'Was bringt den größeren Teil des Nutzens?',
      options: [
        { label: 'Die hinterlegten Dateien', correct: false, explain: 'Wichtig, aber nicht der Hauptteil.' },
        {
          label: 'Die Anweisungen (Rolle, Stil, Regeln, Grenzen)',
          correct: true,
          explain: 'Sie bestimmen, wie jede Antwort aussieht.',
        },
        { label: 'Der Projektname', correct: false, explain: 'Nur zur Orientierung.' },
      ],
    },
    {
      q: 'Was ist die größte Gefahr bei Projekten?',
      options: [
        { label: 'Zu viele Projekte', correct: false, explain: 'Unübersichtlich, aber nicht gefährlich.' },
        {
          label: 'Veraltetes Wissen, das in jedem Gespräch weiterwirkt',
          correct: true,
          explain: 'Deshalb regelmäßig prüfen und aufräumen.',
        },
        { label: 'Zu kurze Anweisungen', correct: false, explain: 'Kann man jederzeit ergänzen.' },
      ],
    },
  ],
  related: ['kontext-geben', 'workflows', 'wo-nutze-ich-claude'],
}
