import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-website-bauen',
  track: 'claude-code',
  title: 'Eine Website bauen',
  description:
    'Von der leeren Seite zur funktionierenden Website – Schritt für Schritt, ohne Vorkenntnisse.',
  minutes: 8,
  keywords: ['website', 'html', 'css', 'bauen', 'seite', 'erstellen', 'webseite'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Eine einfache Website besteht aus Dateien in einem Ordner. Mehr braucht es nicht – kein Server, kein Programm, keine Anmeldung.',
        },
        {
          type: 'code',
          lang: 'text',
          caption: 'Die kleinstmögliche Website',
          code: `meine-seite/
├── index.html      ← die Startseite
├── style.css       ← das Aussehen
└── bilder/`,
        },
        {
          type: 'text',
          md: '`index.html` ist ein fester Name: Wenn jemand deine Seite aufruft, wird automatisch diese Datei angezeigt. Ein Doppelklick darauf öffnet sie im Browser – noch bevor irgendetwas veröffentlicht ist.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Warum mit Claude Code statt mit einem Baukasten?',
          md: 'Ein Baukasten ist für eine Standard-Website oft schneller. Claude Code lohnt sich, wenn du **volle Kontrolle** willst, keine monatlichen Kosten möchtest, etwas Ungewöhnliches brauchst – oder verstehen willst, wie es funktioniert.',
        },
        {
          type: 'text',
          md: 'Und: Du bist nicht an einen Anbieter gebunden. Die Dateien gehören dir und laufen überall.',
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
              title: 'Inhalt zuerst, Aussehen später',
              md: 'Schreib erst auf, was auf der Seite stehen soll. Das ist der Teil, den dir niemand abnimmt.',
            },
            {
              title: 'Struktur festlegen',
              md: 'Welche Seiten? Welche Reihenfolge? Was soll der Besucher tun?',
            },
            {
              title: 'Grundgerüst bauen lassen',
              md: 'Eine Seite, schlicht, funktionierend. Noch nicht schön.',
            },
            {
              title: 'Im Browser ansehen',
              md: 'Doppelklick auf `index.html`. Sofort sichtbar.',
            },
            {
              title: 'Schrittweise verbessern',
              md: 'Eine Änderung, ansehen, nächste Änderung. Nie fünf auf einmal.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Website planen',
          prompt: `Ich möchte eine einfache Website bauen.

Worum es geht: [THEMA / FIRMA / ZWECK]
Zielgruppe: [WER BESUCHT DIE SEITE?]
Was Besucher tun sollen: [ANRUFEN / SCHREIBEN / INFORMIEREN / KAUFEN]
Was ich habe: [TEXTE / BILDER / LOGO / NICHTS]

Aufgabe – noch nichts bauen:
1. Welche Seiten brauche ich wirklich? (so wenige wie möglich)
2. Was gehört auf jede Seite?
3. Welche Informationen musst du von mir haben?
4. Was ist die eine wichtigste Information, die sofort sichtbar sein muss?
5. Was lasse ich besser weg, obwohl es viele Websites haben?

Ich habe keine Programmierkenntnisse. Erkläre alles in einfacher Sprache.`,
          note: 'Punkt 5 ist wertvoll: Die meisten kleinen Websites haben zu viele Seiten, die niemand liest.',
        },
        {
          type: 'prompt',
          title: 'Grundgerüst bauen lassen',
          prompt: `Bau mir eine einfache Website mit folgenden Seiten: [SEITEN]

Anforderungen:
- Nur HTML und CSS, kein Framework, keine externen Bibliotheken
- Funktioniert auf Handy und Computer
- Schlicht und gut lesbar, keine Effekte
- Deutsche Texte
- Gut kommentierter Code, damit ich verstehe, was wo ist

Inhalte:
[DEINE TEXTE ODER PLATZHALTER]

Ablauf:
1. Zeig mir zuerst, welche Dateien du anlegen willst und was darin steht.
2. Warte auf mein OK.
3. Bau dann Seite für Seite, nicht alles auf einmal.
4. Erklär mir nach jeder Datei in 2 Sätzen, was sie macht.`,
          note: '„Kein Framework, keine externen Bibliotheken" ist für den Anfang wichtig: Die Website bleibt dadurch überschaubar, schnell und ohne Abhängigkeiten.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Worauf du bei Websites achten solltest',
          blocks: [
            {
              type: 'list',
              items: [
                '**Mobil zuerst.** Die meisten Besucher kommen vom Handy. Immer in schmaler Fenstergröße prüfen.',
                '**Lesbarkeit vor Design.** Ausreichend Schriftgröße, guter Kontrast, nicht zu lange Zeilen.',
                '**Ladezeit.** Große Bilder sind die häufigste Ursache für langsame Seiten – vorher verkleinern.',
                '**Impressum und Datenschutz.** In Deutschland für geschäftliche Seiten Pflicht. Inhaltlich rechtlich prüfen lassen, nicht von einer KI erfinden lassen.',
                '**Barrierefreiheit.** Alternativtexte für Bilder, echte Überschriften-Struktur, ausreichende Kontraste.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              md: 'Rechtstexte wie Impressum und Datenschutzerklärung darfst du dir erklären lassen – aber nicht von Claude erfinden lassen. Dafür gibt es offizielle Generatoren und im Zweifel eine Rechtsberatung.',
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
          title: 'Beispiel anzeigen: Vom Nichts zur ersten Seite',
          example: {
            task: 'Eine Handwerkerin braucht eine einfache Seite mit Kontakt und Leistungen.',
            bad: '`Bau mir eine schöne Website für meinen Betrieb.`\n→ Eine generische Vorlage mit Platzhaltertexten, die niemand liest.',
            good: `**Schritt 1 – Planung:** \`Malerbetrieb, 4 Mitarbeitende, Region [ORT]. Besucher sollen anrufen. Ich habe: Firmenname, Telefonnummer, Leistungsliste, 6 Fotos.

Welche Seiten brauche ich wirklich? Was lasse ich weg?\`

**Schritt 2 – Nur die Startseite:** \`Bau nur index.html mit: Firmenname, was wir machen (3 Sätze), Telefonnummer groß und klickbar, 3 Leistungen, Anfahrt. Nur HTML und CSS, mobil optimiert. Zeig mir zuerst den Aufbau.\`

**Schritt 3 – Ansehen und nachschärfen:** Datei im Browser öffnen, Fenster schmal ziehen, prüfen. Dann: \`Die Telefonnummer soll auf dem Handy sofort sichtbar sein, ohne zu scrollen.\`

**Schritt 4 – Rest ergänzen.**`,
            why: 'Schritt 2 baut bewusst nur **eine** Seite. Du siehst sofort ein Ergebnis und kannst korrigieren, bevor derselbe Fehler auf fünf Seiten steht.',
            result:
              'Nach 30 Minuten eine funktionierende Startseite, die auf dem Handy gut aussieht – und die du verstehst.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Eine einzelne Seite zum Üben',
          prompt: `Bau mir eine einzelne HTML-Seite als Übung.

Inhalt:
- Überschrift: [DEIN TEXT]
- Ein Absatz: [DEIN TEXT]
- Eine Liste mit 3 Punkten: [DEINE PUNKTE]
- Ein Link zu: [ZIEL]

Anforderungen:
- Eine einzige Datei, HTML und CSS zusammen
- Funktioniert per Doppelklick im Browser
- Gut lesbar auf dem Handy
- Jede Zeile kommentiert, sodass ich verstehe, was sie macht

Erkläre mir danach in 5 Sätzen, wie die Datei aufgebaut ist.`,
          note: 'Eine einzelne Datei ist perfekt zum Lernen: Du siehst Struktur und Aussehen an einem Ort und kannst gefahrlos herumprobieren.',
        },
      ],
    },
  ],
  mistakes: [
    'Mit dem Design anfangen, bevor die Inhalte feststehen.',
    'Alle Seiten auf einmal bauen lassen – Fehler vervielfältigen sich dann.',
    'Nicht auf dem Handy prüfen.',
    'Rechtstexte wie Impressum oder Datenschutz erfinden lassen statt sie korrekt zu erstellen.',
    'Große Bilder unbearbeitet einbinden und sich über lange Ladezeiten wundern.',
  ],
  proTip:
    'Bau die Website in der Reihenfolge, in der Besucher sie erleben: erst die Startseite, erst den oberen Bereich. Was Besucher zuerst sehen, verdient die meiste Sorgfalt – der Rest folgt.',
  task: {
    md: 'Lass eine einzelne HTML-Seite mit deinen echten Inhalten bauen. Öffne sie im Browser und zieh das Fenster ganz schmal. Notiere, was dabei unleserlich wird, und lass genau das verbessern.',
    solution:
      'Typische Probleme in schmaler Ansicht: zu lange Überschriften, Tabellen, die nicht passen, und zu kleine Schaltflächen. Alle drei lassen sich mit einer gezielten Nachfrage beheben – wichtig ist, dass du sie überhaupt siehst.',
  },
  exercise: {
    scenario: 'Du willst eine Website mit 5 Seiten bauen.',
    question: 'Wie gehst du vor?',
    options: [
      {
        label: 'Alle 5 Seiten in einem Auftrag bauen lassen',
        correct: false,
        explain:
          'Ein Fehler im Aufbau steckt dann in allen fünf Seiten – und muss fünfmal korrigiert werden.',
      },
      {
        label: 'Erst eine Seite, prüfen, dann die anderen nach demselben Muster',
        correct: true,
        explain:
          'Korrekturen betreffen eine Datei statt fünf. Danach läuft der Rest schnell.',
      },
      {
        label: 'Erst das Design, dann die Inhalte',
        correct: false,
        explain: 'Design ohne echte Inhalte passt hinterher fast nie.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wie heißt die Startseite einer Website üblicherweise?',
      options: [
        { label: '`index.html`', correct: true, explain: 'Wird beim Aufruf automatisch angezeigt.' },
        { label: '`start.html`', correct: false, explain: 'Funktioniert nicht automatisch.' },
        { label: '`home.html`', correct: false, explain: 'Auch nicht automatisch.' },
      ],
    },
    {
      q: 'Womit beginnst du?',
      options: [
        {
          label: 'Mit den Inhalten',
          correct: true,
          explain: 'Design ohne echte Inhalte passt hinterher selten.',
        },
        { label: 'Mit den Farben', correct: false, explain: 'Viel zu früh.' },
        { label: 'Mit dem Hosting', correct: false, explain: 'Kommt ganz am Ende.' },
      ],
    },
    {
      q: 'Was solltest du nicht von Claude erfinden lassen?',
      options: [
        { label: 'Überschriften', correct: false, explain: 'Unproblematisch.' },
        {
          label: 'Impressum und Datenschutzerklärung',
          correct: true,
          explain: 'Rechtstexte gehören korrekt erstellt, nicht generiert.',
        },
        { label: 'Leistungsbeschreibungen', correct: false, explain: 'Auf Basis deiner Angaben in Ordnung.' },
      ],
    },
  ],
  related: ['cc-website-testen', 'cc-deployen', 'cc-was-ist-code'],
}
