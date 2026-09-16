import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'cc-starten',
  track: 'claude-code',
  title: 'Claude Code starten',
  description:
    'Der erste Start: Was du vorbereitest, was beim ersten Mal passiert und wie du sicher wieder herauskommst.',
  minutes: 6,
  keywords: ['starten', 'installation', 'erste schritte', 'einrichten', 'öffnen', 'beenden'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Claude Code wird im Terminal gestartet – **in dem Ordner, in dem du arbeiten willst**. Dieser Ordner ist danach der Bereich, den Claude sieht.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Vorbereiten',
              md: 'Projektordner wählen, Sicherung anlegen (Git oder Kopie), README schreiben.',
            },
            {
              title: 'Terminal in diesem Ordner öffnen',
              md: 'Mit `cd` hineinwechseln – oder den Ordner ins Terminal ziehen. Mit `pwd` prüfen, dass du richtig stehst.',
            },
            {
              title: 'Claude Code starten',
              md: 'Ein Befehl. Beim ersten Mal wirst du zur Anmeldung geführt.',
            },
            {
              title: 'Aufgabe beschreiben',
              md: 'In normaler Sprache – genau wie im Chat.',
            },
            {
              title: 'Beenden',
              md: 'Mit `/exit` oder Strg + C. Deine Dateien bleiben natürlich, wie sie sind.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Zur Installation',
          md: 'Der genaue Installationsbefehl und die Voraussetzungen ändern sich gelegentlich. Nimm dafür die **offizielle Dokumentation von Anthropic** – nicht eine Anleitung aus einem Forum und auch nicht diese Seite. Alles Weitere in dieser Lektion gilt unabhängig davon.',
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Die Vorbereitung entscheidet über den ganzen Rest. Wer im falschen Ordner ohne Sicherung startet, hat die beiden häufigsten Probleme schon eingebaut.',
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Die Checkliste vor jedem Start',
          md: '1. Stehe ich im richtigen Ordner? (`pwd`)\n2. Ist der Stand gesichert? (`git status` oder Ordnerkopie)\n3. Weiß ich, was ich erreichen will?\n\nDrei Fragen, zwanzig Sekunden.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          caption: 'Ein typischer Start',
          code: `# 1. In den Projektordner wechseln
cd ~/Dokumente/meine-website

# 2. Kontrolle: bin ich richtig?
pwd

# 3. Kontrolle: ist alles gesichert?
git status

# 4. Claude Code starten
claude`,
        },
        {
          type: 'text',
          md: 'Danach bist du in einer Unterhaltung – ähnlich wie im Chat, nur dass Claude deine Dateien sehen kann.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Der erste Prompt sollte harmlos sein',
          blocks: [
            {
              type: 'prompt',
              title: 'Erste Aufgabe: nur ansehen',
              prompt: `Sieh dir diesen Ordner an und erklär mir:

1. Was ist das hier für ein Projekt?
2. Welche Dateien gibt es, wofür sind sie da?
3. Wie hängen sie zusammen?
4. Was fällt dir auf – Unordnung, Doppeltes, Fehlendes?
5. Was würdest du als Erstes verbessern?

Ändere noch nichts. Nur ansehen und berichten.`,
              note: 'Ein reiner Lese-Auftrag als Einstieg: Du lernst die Bedienung kennen, ohne dass irgendetwas passieren kann.',
            },
            {
              type: 'text',
              md: 'Als Nebeneffekt bekommst du eine Bestandsaufnahme deines eigenen Projekts – oft mit Hinweisen, die du selbst übersehen hast.',
            },
          ],
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Dauerhafte Anweisungen im Projekt hinterlegen',
          blocks: [
            {
              type: 'text',
              md: 'Du kannst in deinem Projektordner eine Datei mit Anweisungen anlegen, die Claude Code bei jedem Start liest – vergleichbar mit den Projekt-Anweisungen im Chat. Üblich ist dafür eine Datei namens `CLAUDE.md` im Projektordner.',
            },
            {
              type: 'code',
              lang: 'markdown',
              caption: 'Beispielinhalt einer CLAUDE.md',
              code: `# Projekt: Firmenwebsite

## Was das hier ist
Statische Website mit HTML und CSS, keine Datenbank.

## Regeln
- Deutsche Texte, Sie-Form.
- Keine neuen Abhängigkeiten ohne Rückfrage.
- Vor Änderungen an mehr als 3 Dateien: erst Plan zeigen.
- Dateien im Ordner alt/ niemals ändern.

## Was ich bin
Kein Entwickler. Erkläre Änderungen in einfacher Sprache.`,
            },
            {
              type: 'callout',
              variant: 'tip',
              md: 'Die letzte Zeile ist für Einsteiger Gold wert: Sie sorgt dafür, dass Erklärungen dauerhaft auf deinem Niveau ankommen.',
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
          title: 'Beispiel anzeigen: Eine erste echte Aufgabe',
          example: {
            task: 'In deinem Projektordner liegen Notizen in verschiedenen Formaten. Du willst Ordnung.',
            bad: '`Räum hier auf.`\n→ Viel zu unbestimmt. „Aufräumen" kann Verschieben, Umbenennen oder Löschen heißen.',
            good: `\`Ich möchte Ordnung in diesem Ordner.

Schritt 1 – nur berichten, nichts ändern:
1. Welche Dateien gibt es? Gruppiere sie nach Art.
2. Welche sind vermutlich veraltet? Woran machst du das fest?
3. Welche sind doppelt oder fast identisch?
4. Schlag eine Ordnerstruktur vor.

Schritt 2 kommt erst, wenn ich zugestimmt habe.
Lösche nichts. Verschiebe nichts. Nur ansehen.\``,
            why: 'Die Trennung in „erst berichten, dann handeln" ist der wichtigste Arbeitsablauf in Claude Code – besonders bei allem, was Dateien betrifft.',
            result:
              'Du siehst einen Plan, bevor irgendetwas passiert – und kannst die Stellen korrigieren, an denen die Einschätzung falsch war.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'text',
          md: 'Wenn du Claude Code installiert hast: Lege einen Testordner mit drei unwichtigen Dateien an und starte darin. Nutze als ersten Prompt den reinen Lese-Auftrag von oben.',
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Sicher wieder heraus',
          md: '`/exit` beendet die Sitzung. **Strg + C** bricht eine laufende Aktion ab – gut zu wissen, wenn etwas losläuft, das du nicht wolltest. Deine Dateien bleiben in dem Zustand, in dem sie gerade sind; eine Sitzung zu beenden macht nichts rückgängig.',
        },
      ],
    },
  ],
  mistakes: [
    'Ohne Sicherung starten.',
    'Im falschen Ordner starten – zu groß oder gar nicht der gemeinte.',
    'Als erste Aufgabe gleich etwas Veränderndes verlangen.',
    'Die Installationsanleitung aus einer beliebigen Quelle statt aus der offiziellen Dokumentation nehmen.',
  ],
  proTip:
    'Leg dir eine `CLAUDE.md` mit drei bis fünf Regeln an – darunter unbedingt: *"Vor Änderungen an mehreren Dateien: erst den Plan zeigen."* Diese Datei arbeitet danach in jeder Sitzung für dich.',
  task: {
    md: 'Bereite einen echten Projektordner vor: Sicherung einrichten, README schreiben, `CLAUDE.md` mit drei Regeln anlegen. Starte dann Claude Code und lass dir den Ordner beschreiben.',
    solution:
      'Wenn die Beschreibung deine Regeln berücksichtigt (z. B. einfache Sprache, kein Ändern ohne Plan), funktioniert deine `CLAUDE.md`. Falls nicht: Regeln konkreter formulieren – „erkläre einfach" ist schwächer als „erkläre so, als hätte ich noch nie programmiert".',
  },
  exercise: {
    scenario: 'Du startest Claude Code zum ersten Mal in einem echten Projekt.',
    question: 'Was ist der beste erste Prompt?',
    options: [
      {
        label: '„Verbessere alles, was dir auffällt."',
        correct: false,
        explain:
          'Unbestimmt und verändernd zugleich – die schlechteste Kombination für den ersten Versuch.',
      },
      {
        label: '„Sieh dir den Ordner an und erklär mir, was du siehst. Ändere nichts."',
        correct: true,
        explain:
          'Reiner Lese-Auftrag. Du lernst die Bedienung und bekommst eine Bestandsaufnahme – ohne jedes Risiko.',
      },
      {
        label: '„Lösch alles Überflüssige."',
        correct: false,
        explain: 'Gefährlich. „Überflüssig" ist Auslegungssache, und Löschen ist selten rückgängig zu machen.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was legt fest, welche Dateien Claude Code sehen kann?',
      options: [
        {
          label: 'Der Ordner, in dem du es startest',
          correct: true,
          explain: 'Deshalb: kleinstmöglicher sinnvoller Ordner.',
        },
        { label: 'Dein Benutzerkonto', correct: false, explain: 'Nicht entscheidend.' },
        { label: 'Die Größe der Dateien', correct: false, explain: 'Nein.' },
      ],
    },
    {
      q: 'Was gehört in die Checkliste vor dem Start?',
      options: [
        {
          label: 'Richtiger Ordner, gesicherter Stand, klares Ziel',
          correct: true,
          explain: 'Drei Fragen, zwanzig Sekunden.',
        },
        { label: 'Bildschirm putzen', correct: false, explain: 'Schadet nicht, hilft aber auch nicht.' },
        { label: 'Alle Programme schließen', correct: false, explain: 'Nicht nötig.' },
      ],
    },
    {
      q: 'Wozu dient eine `CLAUDE.md`?',
      options: [
        { label: 'Sie speichert deine Chats', correct: false, explain: 'Nein.' },
        {
          label: 'Sie enthält dauerhafte Regeln für dieses Projekt',
          correct: true,
          explain: 'Claude Code liest sie und hält sich daran.',
        },
        { label: 'Sie ist eine Sicherung', correct: false, explain: 'Dafür ist Git zuständig.' },
      ],
    },
  ],
  related: ['cc-aufgaben-geben', 'cc-projekt', 'cc-sicher-arbeiten'],
}
