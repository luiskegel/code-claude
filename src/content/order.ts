/**
 * Die Reihenfolge des Lernpfads – die einzige Stelle, an der sie festgelegt ist.
 *
 * Eine neue Lektion ergänzt man in zwei Schritten:
 *   1. Datei unter `lessons/<track>/<slug>.ts` anlegen (exportiert `lesson`).
 *   2. Den Slug hier an der gewünschten Stelle eintragen.
 *   3. `npm run gen:meta` ausführen.
 *
 * Der Dateiname muss dem Slug entsprechen und im Ordner des jeweiligen Themas
 * liegen – daraus wird der Ladepfad abgeleitet.
 */
export const LESSON_ORDER: string[] = [
  // Level 1 – Grundlagen
  'was-ist-claude',
  'claude-vs-suchmaschine',
  'was-kann-claude',
  'was-kann-claude-nicht',
  'erster-prompt',
  'bessere-antworten',
  'wo-nutze-ich-claude',
  'sicher-starten',

  // Level 2 – Prompting
  'gute-prompts',
  'kontext-geben',
  'rollen-und-aufgaben',
  'beispiele-geben',
  'ergebnisse-strukturieren',
  'prompts-verbessern',
  'fehler-korrigieren',
  'folgefragen-stellen',

  // Level 3 – Arbeiten mit Claude
  'texte-erstellen',
  'texte-analysieren',
  'dateien-verstehen',
  'tabellen-analysieren',
  'dokumente-erstellen',
  'recherche',
  'zusammenfassungen',
  'brainstorming',
  'planung',
  'lernen-mit-claude',

  // Level 4 – Fortgeschritten
  'projekte-wissenskontext',
  'lange-aufgaben',
  'komplexe-prompts',
  'workflows',
  'automatisierung',
  'fehleranalyse',
  'grosse-projekte',

  // Level 4 – Claude Code
  'cc-was-ist-claude-code',
  'cc-terminal',
  'cc-ordner-und-dateien',
  'cc-projekt',
  'cc-was-ist-code',
  'cc-starten',
  'cc-aufgaben-geben',
  'cc-dateien-analysieren',
  'cc-aenderungen',
  'cc-aenderungen-pruefen',
  'cc-fehler-finden',
  'cc-sicher-arbeiten',
  'cc-website-bauen',
  'cc-website-testen',
  'cc-deployen',

  // Level 5 – Profi
  'modelle-verstehen',
  'kontextfenster-und-token',
  'api-grundlagen',
  'agenten-und-tools',
  'qualitaet-pruefen',
  'sicherheit-profi',
]
