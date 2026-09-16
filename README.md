# Claude Academy

Eine interaktive Lernplattform, die Claude von null an erklärt – auf Deutsch,
für komplette Anfänger, mit Übungen, Quiz, kopierbaren Prompts und einem
sichtbaren Lernpfad.

54 Lektionen in 5 Leveln · 41 Prompts · 30 Glossarbegriffe · 162 Quizfragen ·
ca. 350 Minuten Lernzeit.

---

## Schnellstart

```bash
npm install
npm run dev        # Entwicklungsserver
npm run build      # Produktions-Build nach dist/
npm run preview    # gebaute Website lokal ansehen
```

## Prüfen und testen

```bash
npm run typecheck     # TypeScript
npm run test:content  # Inhalte: kaputte Links, Verweise, Quiz-Logik
npm run test:browser  # Browsertest gegen die gebaute Website (Playwright)
npm run check         # alles zusammen
```

Für `test:browser` muss die Website gebaut sein und unter
`http://localhost:4173` laufen:

```bash
npm run build && npx vite preview --port 4173 &
npm run test:browser
```

Ein abweichender Server geht über `BASE_URL=… npm run test:browser`.
Playwright braucht einmalig einen Browser (`npx playwright install chromium`),
sofern nicht schon einer vorhanden ist.

---

## Aufbau

```
src/
├── content/              ← alle Lerninhalte (reine Daten)
│   ├── types.ts          ← Datenmodell: Lesson, Block, Quiz, Prompt, …
│   ├── order.ts          ← Reihenfolge des Lernpfads (Slugs)
│   ├── index.ts          ← Themen + Kopfdaten aller Lektionen (leichtgewichtig)
│   ├── loader.ts         ← lädt vollständige Lektionen bei Bedarf nach
│   ├── meta.generated.ts ← erzeugt, nicht von Hand bearbeiten
│   ├── prompts.ts        ← Prompt-Bibliothek
│   ├── glossary.ts       ← Glossar
│   ├── plans.ts          ← Schnellstart + 30-Tage-Plan
│   └── lessons/
│       ├── basics/  prompting/  work/  files/
│       └── projects/  claude-code/  advanced/
├── components/           ← Darstellung (Layout, Blöcke, Quiz, Suche)
├── lib/                  ← Logik (Speicher, Suche, Markdown, Highlighting)
├── pages/                ← eine Datei pro Seite
└── styles/               ← tokens.css (Designsystem), base.css, app.css
```

**Inhalt und Darstellung sind getrennt.** Eine Lektion ist ein Objekt aus
Blöcken (`text`, `callout`, `table`, `prompt`, `code`, `example`, `simple`, …).
Die Komponenten wissen, wie ein Block gerendert wird – der Inhalt weiß nichts
über HTML.

### Neue Lektion anlegen

1. Datei unter `src/content/lessons/<thema>/<slug>.ts` anlegen, die `lesson`
   exportiert. Dateiname = `slug`, Ordner = `track`.
2. Slug in `src/content/order.ts` an die gewünschte Stelle eintragen.
3. `npm run gen:meta` ausführen (läuft auch automatisch vor jedem Build).
4. `npm run test:content` prüft Verweise, Quiz-Logik und Vollständigkeit.

Als Vorlage eignet sich `src/content/lessons/basics/erster-prompt.ts`.

### Aufbau einer Lektion

Jede Lektion folgt demselben Lernprinzip:

| Abschnitt | Inhalt |
|---|---|
| `what` | Was ist das? |
| `why` | Wofür brauche ich das? |
| `how` | So funktioniert es |
| `example` | Beispiel |
| `try` | Direkt ausprobieren (kopierbarer Prompt) |
| `mistakes` | Häufige Fehler |
| `proTip` | Profi-Tipp |
| `task` | Mini-Aufgabe mit Lösung |
| `exercise` | Interaktive Übung |
| `quiz` | Verstanden? |
| `related` | Verwandte Themen |

---

## Technik

- **React 19 + TypeScript + Vite**, `react-router-dom` fürs Routing.
- **Keine UI-Bibliothek, kein CSS-Framework, kein Markdown-Paket, kein
  Syntax-Highlighter von außen.** Das Designsystem liegt als CSS-Variablen in
  `src/styles/tokens.css`; Markdown-Rendering und Syntaxhervorhebung sind
  bewusst klein selbst gebaut (`src/lib/markdown.tsx`, `src/lib/highlight.tsx`).
- **Ladeverhalten:** Beim ersten Aufruf kommen nur Grundgerüst und Kopfdaten
  (~80 kB gzip). Lektionstexte werden einzeln nachgeladen (~4 kB gzip je
  Lektion), der Suchindex beim ersten Öffnen der Suche.
- **Kein Backend, keine Anmeldung.** Fortschritt, Quiz-Ergebnisse, Favoriten
  und Designwahl liegen im `localStorage`; jeder Zugriff ist so gekapselt, dass
  die Seite auch ohne funktionierenden Speicher läuft.
- **Sicherheit:** Inhalte werden nie als HTML eingefügt (kein
  `dangerouslySetInnerHTML`), sondern als React-Elemente gerendert.

### Veröffentlichen

`npm run build` erzeugt `dist/` – statische Dateien, die überall laufen.
Da die Website clientseitiges Routing nutzt, muss der Server unbekannte Pfade
auf `index.html` leiten. Dafür liegen bei: `public/_redirects` (Netlify),
`vercel.json` (Vercel). Für andere Anbieter die entsprechende Rewrite-Regel
setzen.

### Als Claude-Artefakt

```bash
npm run build:artifact    # erzeugt dist-artifact/
```

Diese Fassung läuft ohne jede Server-Regel:

- **relative Pfade** (`./assets/…`) statt absoluter,
- **Adressen über die Raute** (`#/lernpfad` statt `/lernpfad`) – gesteuert über
  `__HASH_ROUTER__` in `vite.config.ts`, umgeschaltet in `src/main.tsx`,
- **`index.html` ohne Gerüst**: Die Artefakt-Umgebung liefert
  `<!doctype>`, `<head>`, Zeichensatz und Viewport selbst, deshalb reduziert
  `scripts/build-artifact.mjs` die Datei auf den reinen Seiteninhalt.

Die Designwahl richtet sich dort nach der Umgebung: eigene Auswahl schlägt
Vorgabe der Umgebung schlägt Systemeinstellung (siehe Skript in `index.html`).

---

## Hinweis zu den Inhalten

Angaben zu Modellen, Funktionen, Grenzen und Preisen ändern sich laufend.
Die Lektionen erklären deshalb **Prinzipien** und verweisen für konkrete
Zahlen, Modellnamen und Verfügbarkeiten auf die offizielle Dokumentation von
Anthropic.
