# TypeFlow – Zehn Finger. Ohne Hinsehen.

TypeFlow ist eine moderne Web-App, mit der du das Zehn-Finger-System auf der deutschen
QWERTZ-Tastatur lernst: von der Grundstellung über einzelne Tasten, Wörter und Sätze bis zu
ganzen Texten. Die App läuft komplett im Browser, braucht kein Konto und speichert alle
Lerndaten ausschließlich lokal.

> Der Name ist ein Arbeitstitel und an einer einzigen Stelle austauschbar – siehe
> [Namen ändern](#namen-ändern).

## Inhalt

- [Funktionen](#funktionen)
- [Schnellstart](#schnellstart)
- [Befehle](#befehle)
- [Build und Hosting](#build-und-hosting)
- [Tests](#tests)
- [Technologien](#technologien)
- [Architektur](#architektur)
- [Fachlogik](#fachlogik)
- [Lehrplan](#lehrplan)
- [Datenmodell und Speicherung](#datenmodell-und-speicherung)
- [Design-System](#design-system)
- [Barrierefreiheit](#barrierefreiheit)
- [Anpassen und erweitern](#anpassen-und-erweitern)
- [Bekannte Einschränkungen](#bekannte-einschränkungen)

## Funktionen

- **Einführung** in vier Schritten: Willkommen → Tastatur auswählen → Ziel wählen → Lektion 1.
- **29 Lektionen in 10 Modulen** – von der Grundstellung (F und J) bis zu Briefen mit Absätzen,
  inklusive Umlauten, ß, Großbuchstaben, Satzzeichen und Zeitübungen.
- **Theorie, wo sie hilft:** Haltung, Grundstellung und Ablauf werden vor der ersten Übung kurz
  erklärt (überspringbar, keine medizinischen Versprechen).
- **Realistische virtuelle Tastatur** (Apple Magic Keyboard oder Standard-PC-Tastatur, jeweils
  deutsches ISO-Layout mit L-förmiger Eingabetaste) mit Fingerfarben, Tastbuckeln auf F und J,
  hervorgehobener Zieltaste und passender Umschalttaste der anderen Hand.
- **Handgrafik und Fingerhinweise**, z. B. „Drücke diese Taste mit dem linken Zeigefinger“.
- **Übungsmodus mit echter Tastatur:** Groß-/Kleinschreibung, Umschalttaste, Umlaute, ß,
  Leertaste, Eingabetaste und Rücktaste; sofortiges, sanftes Feedback bei Fehlern.
- **Zwei Fehlermodi:** „Fehler sofort korrigieren“ (es geht erst mit der richtigen Taste weiter)
  oder „Einfach weiterschreiben“ (Korrektur mit der Rücktaste, mit Alt/Strg wortweise).
- **Live-Werte** für Geschwindigkeit, Genauigkeit und Fehler; Pause mit Escape oder beim
  Verlassen des Tabs.
- **Ergebnisse** mit Bestwerten, Freischaltung der nächsten Lektion und den Aktionen
  „Nochmal üben“, „Nächste Lektion“ und „Zum Dashboard“.
- **Fehler wiederholen:** Aus den letzten 20 Übungen entstehen gezielte Übungen mit echten
  Wörtern für die Tasten, bei denen du am häufigsten danebenliegst.
- **Adaptive Übungen:** Fehleranfällige Zeichen kommen in Lektionen häufiger vor, sicher
  beherrschte seltener.
- **Tastenübersicht:** Die Tastatur zeigt pro Taste, ob sie gesperrt, in Arbeit, unsicher oder
  sicher beherrscht ist – mit Details per Klick oder Tastatur.
- **Statistiken:** Kennzahlen, Verlauf von Geschwindigkeit und Genauigkeit (mit Tooltip,
  Tastaturbedienung und Tabellenansicht), häufigste Fehler und letzte Übungen.
- **Lernserie** nach Kalendertagen (mitternachtssicher, lokale Zeitzone).
- **Einstellungen:** Hell/Dunkel/System, Tastaturlayout, Töne, Animationen, Fehlerhinweise,
  Live-WPM, Handgrafik, freie Lektionswahl, Lernziel sowie Zurücksetzen mit Bestätigung.
- **Responsiv** von 1920 × 1080 bis zum Smartphone, **Dark Mode** mit eigenen, geprüften Farben.

## Schnellstart

Voraussetzung: **Node.js 22.12 oder neuer** (mit npm).

```bash
npm install
npm run dev
```

Die App läuft dann unter <http://localhost:5173>. Es gibt keine externen Dienste, Schlüssel oder
Umgebungsvariablen.

## Befehle

| Befehl                   | Zweck                                                                    |
| ------------------------ | ------------------------------------------------------------------------ |
| `npm run dev`            | Entwicklungsserver mit Hot Reload                                        |
| `npm run build`          | Typprüfung und Produktions-Build nach `dist/`                            |
| `npm run preview`        | Produktions-Build lokal ausliefern                                       |
| `npm run typecheck`      | TypeScript-Prüfung (App, Tests, Konfiguration)                           |
| `npm run lint`           | ESLint                                                                   |
| `npm run format`         | Code mit Prettier formatieren (`format:check` prüft nur)                 |
| `npm test`               | Unit- und Komponententests (Vitest)                                      |
| `npm run test:watch`     | Tests im Watch-Modus                                                     |
| `npm run test:e2e`       | Ende-zu-Ende-Tests (Playwright) gegen den Produktions-Build              |
| `npm run check`          | Typprüfung, Lint, Tests und Build in einem Schritt                       |
| `npm run build:artifact` | Eigenständige Seite für Claude-Artefakte (`dist-artifact/typeflow.html`) |

## Build und Hosting

`npm run build` erzeugt eine statische Single-Page-App in `dist/` (App-Code ≈ 61 kB gzip,
Bibliotheken ≈ 99 kB gzip in einem separaten, gut cachebaren Chunk). Sie lässt sich auf jedem
statischen Hosting ausliefern.

Weil die App echte Pfade wie `/lernen/asdf` verwendet, muss der Server unbekannte Pfade auf
`index.html` umleiten:

- **Netlify:** Datei `public/_redirects` mit `/* /index.html 200`
- **Vercel:** `vercel.json` mit `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- **nginx:** `try_files $uri /index.html;`

### Als Claude-Artefakt

`npm run build:artifact` erzeugt `dist-artifact/typeflow.html`: eine einzelne Seite mit
eingebetteten Stilen und Skripten, so wie Claude-Artefakte sie erwarten. Das HTML-Grundgerüst
liefert der Host. Im Vergleich zur normalen Website gibt es drei Unterschiede:

- Die App navigiert im Arbeitsspeicher, weil der Artefakt-Rahmen keine eigenen Pfade erlaubt.
  Nach dem Neuladen startet sie auf der Übersicht.
- Der Fortschritt liegt wie gewohnt im LocalStorage, und zwar getrennt für jede Person, die das
  Artefakt öffnet. Ohne nutzbaren Speicher läuft die App weiter und zeigt einen Hinweis.
- Die Einstellung „System“ folgt dem Farbschema des Betrachters. „Hell“ und „Dunkel“ gelten
  wie gewohnt.

## Tests

```bash
npm test                          # Unit- und Komponententests
npx playwright install chromium   # einmalig, falls noch kein Browser installiert ist
npm run test:e2e                  # Ende-zu-Ende-Tests (Desktop und Smartphone)
```

- **Unit-Tests** (`src/**/*.test.ts`): WPM- und Genauigkeitsberechnung, Tipp-Engine
  (Fehlerzählung, Pausen, Zeitlimits, Rücktaste), Lernserie über Monats- und Jahresgrenzen,
  Tastenzuordnung und Finger-Mapping, Freischaltregeln, Übungsabschluss, Speichern und Laden,
  Validierung und Migration beschädigter Daten, Zurücksetzen, Statistiken, Achsenskalierung und
  die Übungsgeneratoren. Für alle Lektionen und viele Startwerte wird geprüft, dass nur
  freigeschaltete Zeichen vorkommen und Wortübungen aus echten Wörtern bestehen.
- **Komponententests** (`App.test.tsx`, `TypingSession.test.tsx`): komplette Abläufe mit
  Testing Library – Einführung, Lektion abschließen, Sperren, 404, Zurücksetzen mit Bestätigung,
  Farbschema, Speicherhinweise, Einfügen-Schutz.
- **Ende-zu-Ende-Tests** (`e2e/`): Der vollständige QA-Ablauf in 20 Schritten (Öffnen →
  Einführung → Lektion → richtige und falsche Taste → Abschluss → Ergebnis → nächste Lektion →
  Neuladen → Statistik → Einstellungen → Dark Mode → Training → Neuladen → Daten prüfen →
  Zurücksetzen → Kontrolle), dazu Umlaute, Großbuchstaben mit Umschalttaste, Eingabetaste,
  Fehlermodi, Pause, Zeitübungen, Einfügen-Schutz, Fehler wiederholen, Zurück-Button, 404,
  beschädigter und fehlender Speicher, Synchronisierung zwischen zwei Tabs, Theme-Umschalter,
  Skip-Link sowie horizontales Überlaufen auf dem Smartphone. Der QA-Ablauf schlägt auch bei
  Fehlern oder Warnungen in der Browser-Konsole fehl.

`playwright.config.ts` baut die App und startet `vite preview`. Mit
`E2E_BASE_URL=http://localhost:5173 npm run test:e2e` laufen die Tests gegen einen bereits
laufenden Entwicklungsserver.

## Technologien

| Bereich     | Wahl                                                                 |
| ----------- | -------------------------------------------------------------------- |
| UI          | React 19 mit TypeScript (strict, `noUncheckedIndexedAccess`)         |
| Build       | Vite 8                                                               |
| Styling     | Tailwind CSS 4 mit eigenen Design-Tokens                             |
| Routing     | React Router 8 (Data Router)                                         |
| Zustand     | eigener kleiner Store mit `useSyncExternalStore`                     |
| Speicherung | LocalStorage mit Validierung, Migration und In-Memory-Ausweichlösung |
| Tests       | Vitest, Testing Library, jsdom, Playwright                           |
| Qualität    | ESLint (inkl. React-Hooks-Regeln), Prettier                          |

Laufzeitabhängigkeiten sind nur `react`, `react-dom` und `react-router`. Icons, Diagramme,
Tastatur, Handgrafik und Töne (Web Audio) sind selbst gebaut – ohne externe APIs.

## Architektur

```text
src/
├── config/          Name, Untertitel und Speicherschlüssel (an einer Stelle änderbar)
├── domain/          Reine Fachlogik ohne React – vollständig getestet
│   ├── keyboard/    Layouts (Geometrie, Beschriftung), Finger, Zeichen → Taste/Finger
│   ├── lessons/     Module, 29 Lektionen, Katalog, Freischaltregeln
│   ├── exercise/    Wortlisten, Sätze, Texte, Zufall mit Startwert, Übungsgeneratoren
│   ├── typing/      Tipp-Engine (reiner Reducer) und Kennzahlen (WPM, Genauigkeit)
│   ├── progress/    Ergebnisse, Fortschritt, Lernserie, Statistiken, Datumslogik
│   ├── settings/    Einstellungen, Standardwerte, Lernziele
│   └── storage/     Speicherzugriff, Schema-Validierung, Migrationen
├── state/           App-Store, Provider (inkl. Tab-Synchronisierung), Hooks
├── lib/             Formatierung (deutsch), kleine Hooks, Töne
├── components/
│   ├── ui/          Design-System: Button, Card, Switch, Modal, Toast, StatTile …
│   ├── keyboard/    Virtuelle Tastatur (SVG) und Handgrafik
│   └── layout/      App-Rahmen, Navigation, Theme-Umschalter, Speicherhinweis
├── features/        Seiten: Einführung, Dashboard, Lernen, Übung, Wiederholen,
│                    Tasten, Statistiken, Einstellungen, 404
├── app/             Routen und App-Komponente
└── test/            Test-Setup und Hilfsfunktionen
e2e/                 Playwright-Tests
```

Grundprinzipien:

- **Fachlogik ist framework-frei.** Engine, Generatoren, Fortschritt und Statistiken sind reine
  Funktionen. Die UI ruft sie nur auf – das macht sie leicht testbar und austauschbar.
- **Die Tipp-Engine ist ein Reducer.** Jeder Anschlag erzeugt einen neuen Zustand
  (`typeChar`, `deleteBackward`, `pauseSession`, `finishSession`). Ein synchroner Store je Übung
  verarbeitet jeden Anschlag sofort, auch bei sehr schnellem Tippen.
- **Ein Store für App-Daten.** Einstellungen und Fortschritt liegen in einem externen Store, den
  React über `useSyncExternalStore` liest. Schreibvorgänge landen sofort im LocalStorage.
- **Seiten-Komponenten bleiben dünn** und setzen Bausteine des Design-Systems zusammen.

## Fachlogik

### Geschwindigkeit und Genauigkeit

- **WPM** = korrekt getippte Zeichen ÷ 5 ÷ vergangene Minuten.
- **Genauigkeit** = korrekte Eingaben ÷ alle Eingaben × 100. Jeder falsche Anschlag zählt –
  auch wenn er danach korrigiert wird.
- **Pausen verfälschen nichts:** Die Zeit startet mit dem ersten Anschlag. Zwischen zwei
  Anschlägen zählen höchstens 5 Sekunden; bei Pause (Escape, Klick daneben, Tab im Hintergrund)
  steht die Uhr. So entstehen weder unrealistisch niedrige noch hohe Werte.
- **Live-WPM** erscheint erst ab 5 Zeichen und 2 Sekunden – vorher wären die Werte Zufall.
- **Bestwerte** zählen erst ab 50 getippten Zeichen. Werte über 300 WPM (jenseits menschlicher
  Möglichkeiten) setzen keine Bestwerte. Eingefügter, hineingezogener oder automatisch
  ersetzter Text wird gar nicht erst als Eingabe gewertet.
- **Zeitübungen** (60/90/120 Sekunden) messen die echte verstrichene Zeit und enden automatisch.
  Für den Abschluss braucht es zusätzlich mindestens 10 WPM.

### Lektionen und Freischaltung

- Eine Lektion gilt als **abgeschlossen**, wenn die Mindestgenauigkeit erreicht ist (Standard
  90 %, Grundstellung 80 %, „Ähnliche Wörter“ 96 %, „Präzise Sätze“ 97 %).
- Standardmäßig wird die **nächste Lektion** freigeschaltet, sobald die vorherige abgeschlossen
  ist. Mit „Freie Lektionswahl“ sind alle Lektionen sofort geöffnet.
- Ein schlechterer späterer Versuch nimmt einen Abschluss nie wieder weg.
- Jede Lektion erzeugt bei jedem Start eine neue Übung. Es kommen nur bereits eingeführte
  Zeichen vor. Wo Wörter gefragt sind, stehen echte deutsche Wörter statt Buchstabensalat.

### Lernziele aus der Einführung

| Ziel                           | Wirkung                                                   |
| ------------------------------ | --------------------------------------------------------- |
| Ich bin kompletter Anfänger    | Lektionen der Reihe nach, Fehler sofort korrigieren       |
| Ich möchte schneller schreiben | Freie Lektionswahl, „Einfach weiterschreiben“             |
| Ich möchte genauer schreiben   | Freie Lektionswahl, Fehler sofort korrigieren             |
| Ich möchte meine Technik …     | Freie Lektionswahl, Fehler sofort korrigieren, Handgrafik |

Alle Werte lassen sich jederzeit in den Einstellungen ändern.

### Lernserie

Eine Serie zählt Kalendertage (lokale Zeitzone) mit mindestens einer abgeschlossenen Übung.
Sie bleibt bis zum Ende des Folgetags bestehen und reißt erst ab, wenn ein ganzer Tag ohne
Übung vergeht. Datumsvergleiche laufen über Kalendertage statt Millisekunden – Mitternacht und
Zeitumstellung führen nicht zu Fehlern.

### Tastenbeherrschung und adaptive Übungen

- Grundlage sind die Treffer und Fehler je Zeichen aus den letzten 20 Übungen.
- **Sicher:** mindestens 20 Anschläge und mindestens 95 % Trefferquote.
  **Unsicher:** mindestens 10 Anschläge und unter 90 %.
- **Fehler wiederholen** schlägt Zeichen mit mindestens zwei Fehlern vor (bis zu fünf wählbar)
  und baut daraus Übungen aus echten Wörtern – bei Satzzeichen aus Sätzen, bei der Eingabetaste
  aus kurzen Briefen.
- In normalen Lektionen werden fehleranfällige Zeichen stärker gewichtet und sicher
  beherrschte seltener isoliert geübt.

## Lehrplan

| Modul                  | Lektionen                                                         |
| ---------------------- | ----------------------------------------------------------------- |
| Grundlagen             | Grundstellung · F und J · A S D F · J K L Ö · Leertaste · G und H |
| Obere Reihe            | Q W E R T · Z U I O P · Ü und Ä                                   |
| Untere Reihe           | Y X C V · B N M · Komma, Punkt und Bindestrich                    |
| Erste Wörter           | Kurze Wörter · Alltagswörter                                      |
| Buchstaben kombinieren | Häufige Buchstabenpaare · Silben                                  |
| Wörter                 | Großbuchstaben · ß · Längere Wörter                               |
| Sätze                  | Kurze Sätze · Fragen und Kommas · Längere Sätze                   |
| Geschwindigkeit        | 1-Minuten-Sprint · Sätze auf Zeit · 2-Minuten-Ausdauer            |
| Genauigkeit            | Ähnliche Wörter · Präzise Sätze                                   |
| Freies Schreiben       | Texte abschreiben · Briefe mit Absätzen                           |

Übungsarten: einzelne Tasten, Kombinationen, Silben, Wörter, Sätze und Texte.

## Datenmodell und Speicherung

Alle Daten liegen im LocalStorage des Browsers unter zwei Schlüsseln (definiert in
`src/config/storageKeys.ts`, unabhängig vom App-Namen):

| Schlüssel           | Inhalt                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typeflow:settings` | Einstellungen: Einführung abgeschlossen, Farbschema, Layout, Ziel, Töne, Animationen, Fehlerhinweise, Live-WPM, Handgrafik, Fehlermodus, freie Lektionswahl |
| `typeflow:progress` | Fortschritt (siehe unten)                                                                                                                                   |

```ts
interface ProgressState {
  version: 1;
  lessons: Record<string, { attempts; passed; bestWpm; bestAccuracy; lastPracticedAt; passedAt }>;
  history: ExerciseResult[]; // die letzten 300 Übungen, älteste zuerst
  totals: { exercises; practiceMs; keystrokes; correctKeystrokes; wpmSum; accuracySum };
  records: { bestWpm; bestAccuracy };
  streak: { current; longest; lastPracticeDate };
  lastLessonId: string | null;
}

interface ExerciseResult {
  id;
  lessonId;
  origin: 'lesson' | 'review';
  completedAt;
  localDate; // ISO-Zeitpunkt und lokaler Kalendertag (JJJJ-MM-TT)
  durationMs;
  textLength;
  typedChars;
  correctChars;
  keystrokes;
  correctKeystrokes;
  errors;
  wpm;
  accuracy;
  passed;
  timed;
  charStats: Record<string, { hits; misses }>; // je Zeichen, für Fehleranalyse und Adaption
}
```

Robustheit:

- **Validierung beim Laden:** Jedes Feld wird geprüft. Ungültige Einträge werden verworfen oder
  durch sichere Standardwerte ersetzt, statt die App abstürzen zu lassen.
- **Migrationen:** Beide Datensätze tragen eine `version`. Neue Versionen ergänzen eine Funktion
  in `src/domain/storage/schema.ts`; alte Daten werden beim Laden schrittweise hochgezogen.
- **Beschädigte Daten** (z. B. unlesbares JSON) werden unter `<Schlüssel>:backup` gesichert,
  bevor die App mit Standardwerten weiterarbeitet. Die Einstellungen weisen darauf hin.
- **Speicher voll:** Der Verlauf wird schrittweise gekürzt, die Summen bleiben erhalten. Schlägt
  das Speichern trotzdem fehl, erscheint ein Hinweis auf jeder Seite.
- **Kein LocalStorage** (z. B. blockierte Website-Daten): Die App läuft mit flüchtigem Speicher
  weiter und sagt deutlich, dass der Fortschritt beim Schließen verloren geht.
- **Mehrere Tabs** bleiben über das `storage`-Ereignis synchron.
- **Datenschutz:** Es gibt keine Server, keine Tracker und keine externen Anfragen.

## Design-System

- **Tokens statt Einzelwerte:** Farben, Schatten, Radien und Typografie sind als CSS-Variablen in
  `src/index.css` definiert und über Tailwind (`bg-surface`, `text-ink-muted`, `bg-accent` …)
  nutzbar. Hell und Dunkel haben jeweils eigene, auf Kontrast geprüfte Werte.
- **Typografie:** Systemschrift (auf Apple-Geräten SF Pro), Übungstext in Monospace.
- **Fingerfarben:** Je Fingertyp eine Farbe (kleiner Finger, Ringfinger, Mittelfinger,
  Zeigefinger, Daumen), auf hellem und dunklem Hintergrund unterscheidbar. Farbe ist nie der
  einzige Informationsträger – Texte, Symbole und Muster ergänzen sie.
- **Komponenten:** Buttons (primär, sekundär, ghost, danger), Karten, Schalter, Segmented
  Controls, Fortschrittsbalken, Modals (natives `<dialog>`), Toasts, Kennzahlen-Kacheln, Badges.
- **Bewegung:** Dezente Übergänge, abschaltbar in den Einstellungen. `prefers-reduced-motion`
  wird immer respektiert.
- **Farbschema:** „Hell“ und „Dunkel“ setzen `data-theme` am `<html>`-Element. Bei „System“
  fehlt das Attribut und das CSS folgt `prefers-color-scheme` – oder einem `data-theme`, das eine
  einbettende Seite selbst setzt.
- **Kein Aufblitzen:** Ein kleines Skript in `index.html` setzt ein explizit gewähltes
  Farbschema und den Bewegungsmodus, bevor die Seite gezeichnet wird.

## Barrierefreiheit

- Semantisches HTML mit Landmarks, Überschriftenhierarchie und Skip-Link „Zum Inhalt springen“.
- Vollständig per Tastatur bedienbar, sichtbare Fokusrahmen, Fokusführung bei Seitenwechseln.
- Live-Regionen für Fehlerhinweise, Toasts und Speicherhinweise. Nach einer Übung springt der
  Fokus in den beschrifteten Ergebnisbereich auf die wichtigste Aktion.
- Der Übungstext steht Screenreadern als Klartext zur Verfügung. Zieltaste und Finger werden
  ausgeschrieben angesagt.
- Diagramme haben Textzusammenfassungen, Tastaturnavigation und eine Tabellenansicht.
- Kontraste nach WCAG AA in beiden Farbschemata.

## Anpassen und erweitern

### Namen ändern

Name und Untertitel stehen ausschließlich in `src/config/brand.ts`:

```ts
export const BRAND = { name: 'TypeFlow', tagline: 'Zehn Finger. Ohne Hinsehen.' } as const;
```

Seitentitel, Navigation, Einführung und `index.html` übernehmen die Werte automatisch. Das
Logo – ein „T“ auf einer Taste – liegt in `src/components/layout/BrandMark.tsx` und
`public/favicon.svg`. Die Speicherschlüssel sind bewusst vom Namen getrennt, damit eine
Umbenennung keine Lernstände löscht.

### Lektionen und Inhalte

- **Neue Lektion:** Eintrag in `src/domain/lessons/curriculum.ts` mit `newChars`, `focusChars`
  und einer `exercise`-Beschreibung (z. B. `keys`, `words`, `sentences`, `text`). Die Tests
  prüfen automatisch, dass alle Inhalte nur freigeschaltete Zeichen nutzen.
- **Wörter, Sätze, Texte:** `src/domain/exercise/content/`.
- **Neues Tastaturlayout:** `src/domain/keyboard/layouts.ts` – Geometrie, Beschriftung und
  Fingerzuordnung je Taste. Zeichenzuordnung und Fingerhinweise leiten sich daraus ab.
- **Datenformat ändern:** Version erhöhen und eine Migration in
  `src/domain/storage/schema.ts` ergänzen.

## Bekannte Einschränkungen

- **Nur deutsches QWERTZ.** Schweizer, österreichische Sonderbelegungen und andere Sprachen sind
  nicht abgebildet. Zeichen über AltGr bzw. Option (z. B. @, €, Klammern) gehören nicht zum Kurs.
- **Lokal statt Cloud:** Fortschritt wird nicht zwischen Geräten oder Browsern synchronisiert.
  Wer Browserdaten löscht, löscht auch den Lernstand.
- **Für physische Tastaturen gebaut:** Auf Smartphones sind alle Seiten nutzbar und das Üben
  funktioniert technisch. Bildschirmtastaturen liefern Zeichen aber teils wortweise, dann sind
  Zeitmessung und Fingerhinweise ungenauer.
- **Töne** werden per Web Audio erzeugt und starten erst nach der ersten Interaktion
  (Browser-Vorgabe).
- **Hosting** braucht eine Umleitung aller Pfade auf `index.html` (siehe oben).
