import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'tabellen-analysieren',
  track: 'files',
  title: 'Tabellen analysieren',
  description:
    'Excel und CSV auswerten lassen – und die wichtigste Regel: Claude ist kein Taschenrechner, aber ein sehr guter Analytiker.',
  minutes: 7,
  keywords: ['excel', 'csv', 'tabelle', 'zahlen', 'auswertung', 'daten', 'formel', 'rechnen'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Bei Tabellen gilt eine klare Arbeitsteilung: **Claude findet Muster und erklärt Zahlen. Rechnen lässt du besser die Tabelle selbst.**',
        },
        {
          type: 'table',
          head: ['Aufgabe', 'Gut geeignet?', 'Warum'],
          rows: [
            ['Auffälligkeiten finden', '✅ Sehr gut', 'Ausreißer, Muster, Lücken erkennen ist eine Stärke'],
            ['Daten strukturieren', '✅ Sehr gut', 'Kategorien bilden, Spalten vorschlagen, Chaos ordnen'],
            ['Formel bauen', '✅ Sehr gut', 'Du bekommst die Formel und rechnest in Excel exakt'],
            ['Ergebnisse erklären', '✅ Sehr gut', '„Was bedeutet dieser Wert für uns?"'],
            ['Große Summen exakt berechnen', '⚠️ Vorsichtig', 'Rechenfehler möglich – gegenprüfen'],
            ['Hunderte Zeilen exakt zählen', '⚠️ Vorsichtig', 'Besser: Formel bauen lassen und selbst zählen'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'warn',
          title: 'Die Regel, die dir Ärger erspart',
          md: 'Wenn eine Zahl in einem Bericht landet, muss sie aus einer **Formel** oder einer geprüften Quelle stammen – nicht aus einer Chat-Antwort. Claude baut dir die Formel; die Tabelle rechnet.',
        },
        {
          type: 'text',
          md: 'Der eigentliche Wert liegt woanders: Claude sieht in fünf Sekunden, **was an deinen Daten seltsam ist** – doppelte Einträge, unmögliche Werte, fehlende Zeiträume, inkonsistente Schreibweisen. Genau das übersieht man beim eigenen Durchscrollen.',
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
              title: 'Struktur erklären',
              md: 'Was bedeutet welche Spalte? Welcher Zeitraum? Welche Einheit? Ohne das rät Claude bei Spaltennamen wie „Wert2".',
            },
            {
              title: 'Datenqualität zuerst prüfen lassen',
              md: 'Vor jeder Auswertung: Doppelte, Lücken, Ausreißer, uneinheitliche Schreibweisen.',
            },
            {
              title: 'Analyse statt Rechnung verlangen',
              md: '„Was fällt dir auf?" statt „Wie hoch ist die Summe?".',
            },
            {
              title: 'Für Zahlen: Formel anfordern',
              md: '„Gib mir die Excel-Formel dafür." Dann rechnet die Tabelle – exakt und nachvollziehbar.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Datenqualität prüfen',
          prompt: `Ich habe dir eine Tabelle hochgeladen.

Aufbau:
- Spalte A = [BEDEUTUNG]
- Spalte B = [BEDEUTUNG]
- Zeitraum: [ZEITRAUM]

Aufgabe – prüfe zuerst die Datenqualität:
1. Doppelte Einträge?
2. Fehlende Werte – in welchen Spalten, wie viele?
3. Unmögliche oder auffällige Werte (negative Preise, Daten in der Zukunft, Ausreißer)?
4. Uneinheitliche Schreibweisen (z. B. "GmbH" vs. "G.m.b.H.")?
5. Fehlende Zeiträume?

Format: Tabelle mit Problem | Betroffene Zeilen | Vorschlag.
Bewerte noch nichts inhaltlich – nur Datenqualität.`,
          note: 'Dieser Schritt vor der eigentlichen Auswertung verhindert, dass du Schlüsse aus fehlerhaften Daten ziehst.',
        },
        {
          type: 'prompt',
          title: 'Formel statt Ergebnis',
          prompt: `Ich möchte in meiner Tabelle Folgendes berechnen:
[BESCHREIBUNG DER BERECHNUNG]

Aufbau meiner Tabelle:
- [SPALTE A] = [BEDEUTUNG]
- [SPALTE B] = [BEDEUTUNG]
- Daten stehen in den Zeilen [VON] bis [BIS]

Aufgabe:
1. Gib mir die passende Excel-Formel.
2. Erkläre in 2 Sätzen, was sie tut.
3. Nenne 2 typische Fehlerquellen bei dieser Formel.
4. Sag mir, wie ich das Ergebnis mit einer einfachen Stichprobe prüfen kann.`,
          note: 'Punkt 4 ist der beste Teil: Du bekommst nicht nur die Formel, sondern auch eine Methode, ihr zu vertrauen.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Umsatzliste auswerten',
          example: {
            task: 'Du hast eine Verkaufsliste mit 800 Zeilen und sollst sagen, was los ist.',
            bad: '`Wie hoch war der Umsatz im letzten Quartal?`\n→ Eine Zahl, der du nicht trauen kannst.',
            good: `\`Tabelle mit 800 Verkäufen. Spalten: Datum | Produkt | Menge | Einzelpreis | Region.

Aufgabe:
1. Prüfe zuerst die Datenqualität (Doppelte, Lücken, Ausreißer).
2. Welche 3 Muster fallen dir auf, die ich beim Durchscrollen übersehen würde?
3. Welche 2 Zahlen sollte ich berechnen, um die Muster zu belegen? Gib mir die Excel-Formeln dafür.
4. Welche Frage kann diese Tabelle NICHT beantworten?

Berechne selbst keine Gesamtsummen – ich rechne in Excel.\``,
            why: 'Punkt 4 ist der ehrlichste Teil einer Datenauswertung: Er sagt dir, welche Schlussfolgerung du gerade **nicht** ziehen darfst.',
            result:
              'Drei belastbare Beobachtungen, zwei prüfbare Formeln – und die Gewissheit, welche Frage offen bleibt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Was fällt dir auf?',
          prompt: `Hier ist meine Tabelle. Aufbau: [SPALTEN ERKLÄREN].

Aufgabe:
1. Nenne 5 Auffälligkeiten, die ich beim Durchscrollen wahrscheinlich übersehen würde.
2. Sag zu jeder Auffälligkeit: Woran machst du sie fest? (Zeile oder Wert nennen)
3. Ordne ein: "wahrscheinlich Datenfehler" oder "wahrscheinlich echt".
4. Was würdest du als Nächstes prüfen?

Keine Gesamtsummen berechnen.`,
          note: 'Punkt 3 spart viel Zeit: Datenfehler klärst du in der Tabelle, echte Auffälligkeiten sind eine Geschäftsfrage.',
        },
      ],
    },
  ],
  mistakes: [
    'Berechnete Zahlen aus dem Chat direkt in Berichte übernehmen.',
    'Die Bedeutung der Spalten nicht erklären – dann werden Spaltennamen falsch interpretiert.',
    'Auswerten, bevor die Datenqualität geprüft ist.',
    'Personenbezogene Daten in der Tabelle lassen, obwohl eine anonymisierte Fassung gereicht hätte.',
  ],
  proTip:
    'Frag bei jeder Auswertung: *"Welche Frage kann diese Tabelle nicht beantworten?"* Das schützt dich vor der häufigsten Fehlerquelle in Datenauswertungen – Schlussfolgerungen, für die die Daten gar nicht ausgelegt sind.',
  task: {
    md: 'Lass eine eigene Tabelle (anonymisiert) zuerst auf Datenqualität prüfen. Notiere, wie viele Probleme gefunden werden. Lass dir anschließend für eine Kennzahl die Formel geben und rechne selbst nach.',
    solution:
      'In den meisten realen Tabellen findet der Qualitätscheck etwas: uneinheitliche Schreibweisen, leere Zellen oder Duplikate. Genau diese Punkte hätten deine Auswertung sonst still verfälscht.',
  },
  exercise: {
    scenario: 'Du brauchst eine exakte Umsatzsumme für den Quartalsbericht.',
    question: 'Was ist der richtige Weg?',
    options: [
      {
        label: 'Claude die Summe berechnen lassen und übernehmen',
        correct: false,
        explain:
          'Bei langen Zahlenketten sind Fehler möglich – und im Bericht steht dein Name, nicht der von Claude.',
      },
      {
        label: 'Claude die Formel bauen lassen und in der Tabelle rechnen',
        correct: true,
        explain:
          'Exakt, nachvollziehbar, wiederholbar. Genau die Arbeitsteilung aus dieser Lektion.',
      },
      {
        label: 'Beides machen und vergleichen',
        correct: false,
        explain:
          'Nicht falsch, aber unnötig: Die Formel ist ohnehin das Ergebnis, dem du vertraust.',
      },
    ],
  },
  quiz: [
    {
      q: 'Wobei ist Claude bei Tabellen besonders stark?',
      options: [
        {
          label: 'Muster und Auffälligkeiten erkennen',
          correct: true,
          explain: 'Ausreißer, Lücken, Inkonsistenzen – genau das übersieht man selbst.',
        },
        { label: 'Exakte Summen über 800 Zeilen', correct: false, explain: 'Dafür ist die Tabelle zuständig.' },
        { label: 'Zellen formatieren', correct: false, explain: 'Das macht dein Tabellenprogramm.' },
      ],
    },
    {
      q: 'Was solltest du vor jeder Auswertung tun lassen?',
      options: [
        { label: 'Eine Zusammenfassung', correct: false, explain: 'Hilft wenig bei Zahlen.' },
        {
          label: 'Eine Datenqualitätsprüfung',
          correct: true,
          explain: 'Sonst analysierst du fehlerhafte Daten.',
        },
        { label: 'Ein Diagramm', correct: false, explain: 'Erst nach der Prüfung sinnvoll.' },
      ],
    },
    {
      q: 'Welche Frage schützt vor falschen Schlussfolgerungen?',
      options: [
        {
          label: '„Welche Frage kann diese Tabelle nicht beantworten?"',
          correct: true,
          explain: 'Macht die Grenzen der Daten sichtbar.',
        },
        { label: '„Ist das Ergebnis gut?"', correct: false, explain: 'Zu vage.' },
        { label: '„Kannst du das nochmal rechnen?"', correct: false, explain: 'Wiederholung ist keine Prüfung.' },
      ],
    },
  ],
  related: ['dateien-verstehen', 'ergebnisse-strukturieren', 'dokumente-erstellen'],
}
