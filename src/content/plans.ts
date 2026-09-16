import type { PlanDay, QuickstartStep } from './types'

/** „Claude in 15 Minuten" – der schnellste Weg zu ersten echten Ergebnissen. */
export const QUICKSTART: QuickstartStep[] = [
  {
    title: 'Was ist Claude?',
    minutes: 2,
    md: 'Claude ist ein KI-Assistent, mit dem du in normaler Sprache sprichst. Du schreibst, was du brauchst – Claude antwortet. Keine Befehle, keine Spezialsprache.\n\n**Merke:** Claude kennt extrem viel, aber nicht **deine** Situation. Die musst du ihm erzählen.',
    lesson: 'was-ist-claude',
    prompt: `Erkläre mir in 5 einfachen Sätzen, was du bist und wobei du mir helfen kannst.
Schreib so, als würdest du es jemandem erklären, der noch nie mit KI gearbeitet hat.
Nenne am Ende 3 konkrete Beispiele aus meinem Bereich: [DEIN BERUF].`,
  },
  {
    title: 'Deinen ersten Prompt schreiben',
    minutes: 2,
    md: 'Die Formel für den Anfang: **Aufgabe + Kontext + Format.**\n\n- **Aufgabe:** Was soll Claude tun? (Beginne mit einem Verb.)\n- **Kontext:** Was muss Claude wissen? (2–3 Sätze.)\n- **Format:** Wie soll das Ergebnis aussehen? (Immer mit Obergrenze.)',
    lesson: 'erster-prompt',
    prompt: `Aufgabe:
[WAS SOLL CLAUDE TUN?]

Kontext:
[WAS MUSS CLAUDE WISSEN? 2-3 SÄTZE]

Format:
[LÄNGE, TON, ZIELGRUPPE]`,
  },
  {
    title: 'Den Prompt verbessern',
    minutes: 2,
    md: 'Die erste Antwort ist nie das Maximum. Schärfe nach – ein Punkt pro Runde:\n\n- Zu lang? → „Kürze auf die Hälfte."\n- Zu allgemein? → „Beziehe dich konkret auf meine Details."\n- Falscher Ton? → „Sachlich, wie eine interne Notiz."\n\nUnd der stärkste Satz für Anfänger: **„Stell mir Fragen, bevor du antwortest."**',
    lesson: 'bessere-antworten',
    prompt: `Das geht in die richtige Richtung. Ändere bitte genau das:
1. Länge: [KÜRZER / LÄNGER – WIE VIEL?]
2. Ton: [SACHLICHER / WÄRMER / BESTIMMTER]
3. Inhalt: [WAS FEHLT ODER STÖRT?]

Lass alles andere so, wie es ist.`,
  },
  {
    title: 'Einen Text verbessern lassen',
    minutes: 2,
    md: 'Die häufigste Alltagsaufgabe überhaupt: eine schnell getippte Nachricht in eine gute Fassung bringen.\n\nEntscheidend ist der Block **„Nicht verwenden"** – er entfernt die typischen Floskeln, an denen man KI-Texte erkennt.',
    lesson: 'texte-erstellen',
    prompt: `Aufgabe:
Formuliere den folgenden Text professioneller, ohne den Inhalt zu verändern.

Kontext:
Der Text geht an [EMPFÄNGER]. Die Beziehung ist [FREUNDLICH / FORMELL / ANGESPANNT].

Format:
Maximal [ANZAHL] Sätze, [SIE-FORM / DU-FORM], sachlicher Ton.

Nicht verwenden:
- Floskeln wie "gerne", "selbstverständlich", "wir freuen uns"
- Superlative und Werbesprache

Text:
[DEIN TEXT]`,
  },
  {
    title: 'Eine Datei analysieren',
    minutes: 3,
    md: 'Lade ein PDF oder eine Tabelle hoch und stelle eine **konkrete** Frage – nicht „Was sagst du dazu?".\n\nDrei Dinge machen die Analyse brauchbar: deine **Rolle**, ein klares **Ziel** und die **Zitatpflicht**.',
    lesson: 'dateien-verstehen',
    prompt: `Ich habe dir ein Dokument hochgeladen.

Meine Rolle: [WER BIN ICH IN DIESER SACHE?]
Mein Ziel: [WAS MUSS ICH ENTSCHEIDEN ODER WISSEN?]

Aufgabe:
1. Gib mir eine Landkarte: Welche Abschnitte gibt es, worum geht es jeweils in einem Satz?
2. Beantworte dann: [DEINE FRAGE]
3. Nenne zu jeder Aussage die Seitenzahl.
4. Sag ausdrücklich, wenn etwas im Dokument nicht beantwortet wird.`,
  },
  {
    title: 'Claude als Lernpartner',
    minutes: 2,
    md: 'Der Unterschied zwischen Lesen und Lernen: **abgefragt werden.**\n\nWichtig sind die beiden Ehrlichkeitsregeln – ohne sie werden halbrichtige Antworten wohlwollend durchgewunken.',
    lesson: 'lernen-mit-claude',
    prompt: `Frag mich zum Thema [THEMA] ab.

Ablauf:
- Stell mir EINE Frage und warte auf meine Antwort.
- Bewerte: richtig / teilweise richtig / falsch.
- Sag mir bei Fehlern genau, was gefehlt hat.
- Nach 10 Fragen: Wo sind meine Lücken?

Wichtig:
- Sei ehrlich. Bewerte nicht wohlwollend.
- Gib mir nicht die Antwort, bevor ich geantwortet habe.`,
  },
  {
    title: 'Und jetzt sicher weiterarbeiten',
    minutes: 2,
    md: 'Zwei Regeln, die ab jetzt immer gelten:\n\n1. **Prüfen, was du weitergibst.** Zahlen, Zitate und Paragrafen können erfunden sein – auch wenn sie überzeugend klingen.\n2. **Nur einfügen, was eingefügt werden darf.** Personenbezogene Daten anonymisieren, Zugangsdaten niemals.\n\nDamit hast du die Grundlagen. Der Lernpfad führt dich weiter.',
    lesson: 'sicher-starten',
    prompt: `Bevor ich mit deiner Antwort weiterarbeite:

1. Welche Aussage in deiner Antwort ist am unsichersten?
2. Welche Angabe stammt aus meinem Material, welche aus deinem allgemeinen Wissen?
3. Was müsste ich prüfen, bevor ich das verwende?

Antworte knapp, als Liste. Beschönige nichts.`,
  },
]

/** 30-Tage-Lernplan: 5–15 Minuten pro Tag, aufbauend auf den Lektionen. */
export const PLAN_30: PlanDay[] = [
  { day: 1, title: 'Was ist Claude?', minutes: 6, focus: 'Grundverständnis: Wie Claude funktioniert und was ein Prompt ist.', task: 'Schreib deinen ersten Prompt und lass dir dein eigenes Arbeitsgebiet erklären.', lesson: 'was-ist-claude' },
  { day: 2, title: 'Claude vs. Suchmaschine', minutes: 5, focus: 'Wann du was benutzt – Links oder Ergebnisse.', task: 'Nimm eine Frage, die du diese Woche gegoogelt hast, und entscheide: Claude oder Suchmaschine?', lesson: 'claude-vs-suchmaschine' },
  { day: 3, title: 'Was kann Claude?', minutes: 7, focus: 'Die sechs Grundfähigkeiten kennenlernen.', task: 'Ordne drei Aufgaben deiner Woche einer der sechs Fähigkeiten zu.', lesson: 'was-kann-claude' },
  { day: 4, title: 'Was kann Claude nicht?', minutes: 7, focus: 'Halluzinationen, Aktualität, Rechnen, Gedächtnis.', task: 'Stell eine Frage aus deinem Fachgebiet und prüfe die Antwort Satz für Satz.', lesson: 'was-kann-claude-nicht' },
  { day: 5, title: 'Dein erster Prompt', minutes: 6, focus: 'Aufgabe + Kontext + Format.', task: 'Schreib einen Prompt für eine echte Nachricht, die heute ansteht.', lesson: 'erster-prompt' },
  { day: 6, title: 'Bessere Antworten', minutes: 6, focus: 'Nachschärfen statt neu anfangen.', task: 'Verbessere ein Ergebnis in drei Runden – je eine Änderung pro Runde.', lesson: 'bessere-antworten' },
  { day: 7, title: 'Wo benutze ich Claude?', minutes: 5, focus: 'Chat, Projekte, Claude Code, API – und was du wirklich brauchst.', task: 'Entscheide für drei deiner Aufgaben, welcher Weg passt.', lesson: 'wo-nutze-ich-claude' },
  { day: 8, title: 'Sicher starten', minutes: 6, focus: 'Datenschutz, Prüfen, Verantwortung.', task: 'Ordne fünf Inhalte aus deinem Alltag in die Ampel ein: Grün, Gelb, Rot.', lesson: 'sicher-starten' },
  { day: 9, title: 'Gute Prompts schreiben', minutes: 8, focus: 'Die sechs Bausteine – und wann du welche brauchst.', task: 'Schreib einen Prompt mit der Vollstruktur und streiche danach alles Überflüssige.', lesson: 'gute-prompts' },
  { day: 10, title: 'Kontext geben', minutes: 7, focus: 'Die fünf Kontextfragen.', task: 'Ergänze einen alten Prompt um die fünf Fragen und vergleiche die Ergebnisse.', lesson: 'kontext-geben' },
  { day: 11, title: 'Rollen und Aufgaben', minutes: 6, focus: 'Perspektivwechsel und starke Aufgaben-Verben.', task: 'Lass einen eigenen Text von einer skeptischen Rolle beurteilen.', lesson: 'rollen-und-aufgaben' },
  { day: 12, title: 'Beispiele geben', minutes: 6, focus: 'Zeigen statt beschreiben.', task: 'Lass aus zwei eigenen Texten fünf Stil-Regeln ableiten und speichere sie.', lesson: 'beispiele-geben' },
  { day: 13, title: 'Ergebnisse strukturieren', minutes: 6, focus: 'Tabelle, Liste, Vorlage – das richtige Format.', task: 'Bau eine Vorlage für eine Aufgabe, die du bisher immer nachbearbeitet hast.', lesson: 'ergebnisse-strukturieren' },
  { day: 14, title: 'Prompts verbessern', minutes: 7, focus: 'Die vier Lücken und ihre Reparatur.', task: 'Verbessere deinen schlechtesten Prompt in drei einzelnen Schritten.', lesson: 'prompts-verbessern' },
  { day: 15, title: 'Fehler korrigieren', minutes: 7, focus: 'Fünf Fehlerbilder und ihre Gegenmittel.', task: 'Finde in einer Antwort einen Fehler und korrigiere ihn punktgenau.', lesson: 'fehler-korrigieren' },
  { day: 16, title: 'Folgefragen stellen', minutes: 6, focus: 'Das Gespräch als eigentliches Werkzeug.', task: 'Führe ein Gespräch über vier Runden: Breite, Tiefe, Gegenprobe, Zusammenfassung.', lesson: 'folgefragen-stellen' },
  { day: 17, title: 'Texte erstellen', minutes: 7, focus: 'Rohmaterial rein, Entwurf raus, nachschärfen.', task: 'Schreib eine echte E-Mail mit dem universellen Schreib-Prompt.', lesson: 'texte-erstellen' },
  { day: 18, title: 'Texte analysieren', minutes: 7, focus: 'Perspektive, konkrete Fragen, Zitatpflicht.', task: 'Analysiere ein eigenes Dokument mit drei konkreten Fragen.', lesson: 'texte-analysieren' },
  { day: 19, title: 'Dateien verstehen', minutes: 7, focus: 'PDFs, Bilder und Scans richtig auswerten.', task: 'Lade ein mehrseitiges Dokument hoch und lass eine Landkarte erstellen.', lesson: 'dateien-verstehen' },
  { day: 20, title: 'Tabellen analysieren', minutes: 7, focus: 'Muster finden lassen, Formeln bauen lassen.', task: 'Lass eine eigene Tabelle auf Datenqualität prüfen.', lesson: 'tabellen-analysieren' },
  { day: 21, title: 'Dokumente erstellen', minutes: 7, focus: 'Erst Gliederung, dann Abschnitt für Abschnitt.', task: 'Lass eine Gliederung für ein echtes Dokument erstellen und korrigiere sie.', lesson: 'dokumente-erstellen' },
  { day: 22, title: 'Recherche', minutes: 6, focus: 'Mit und ohne Websuche – und die Belegpflicht.', task: 'Lass fünf Quellen mit Links nennen und klick jede an.', lesson: 'recherche' },
  { day: 23, title: 'Zusammenfassungen', minutes: 5, focus: 'Der Zweck bestimmt die Auswahl.', task: 'Fasse dasselbe Dokument zweimal zusammen – mit und ohne Zweckangabe.', lesson: 'zusammenfassungen' },
  { day: 24, title: 'Brainstorming & Planung', minutes: 10, focus: 'Erst Menge, dann Auswahl. Und: rückwärts planen.', task: 'Sammle 20 Ideen aus 5 Perspektiven zu einer offenen Frage.', lesson: 'brainstorming' },
  { day: 25, title: 'Lernen mit Claude', minutes: 6, focus: 'Abfragen statt lesen.', task: 'Lass dich zu einem Thema abfragen, das du „eigentlich" beherrschst.', lesson: 'lernen-mit-claude' },
  { day: 26, title: 'Projekte anlegen', minutes: 7, focus: 'Wissen einmal hinterlegen statt dreimal erklären.', task: 'Lege ein Projekt für deinen häufigsten Arbeitsbereich an.', lesson: 'projekte-wissenskontext' },
  { day: 27, title: 'Längere Aufgaben', minutes: 7, focus: 'Etappen, Abschlusskriterien, Speicherstände.', task: 'Zerlege ein größeres Vorhaben in Etappen und sichere den ersten Stand.', lesson: 'lange-aufgaben' },
  { day: 28, title: 'Workflows bauen', minutes: 7, focus: 'Sammeln, Strukturieren, Ausarbeiten, Prüfen.', task: 'Baue einen Workflow für eine wöchentliche Aufgabe und dokumentiere ihn.', lesson: 'workflows' },
  { day: 29, title: 'Claude Code kennenlernen', minutes: 10, focus: 'Was Claude Code ist – und warum Git dazugehört.', task: 'Lies die ersten beiden Claude-Code-Lektionen und probiere vier Terminal-Befehle aus.', lesson: 'cc-was-ist-claude-code' },
  { day: 30, title: 'Sicher und selbstständig weiterarbeiten', minutes: 8, focus: 'Qualität messen, Risiken kennen, Verantwortung behalten.', task: 'Erstelle einen Testsatz aus 10 echten Fällen für deine häufigste Aufgabe.', lesson: 'qualitaet-pruefen' },
]
