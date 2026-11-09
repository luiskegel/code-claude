# MY STOCK ACADEMY – Meine persönliche Aktien-Akademie

Eine interaktive Lernplattform, mit der du das Investieren an der Börse von null an lernen kannst: 15 Module mit 47 ausführlichen Lektionen, Wissenstests, 10 Rechnern, einem Lexikon mit über 180 Begriffen, einem virtuellen Depot mit 10.000 € Spielgeld, einer Watchlist und einem Grundlagenbereich zu Steuern in Deutschland.

> **Wichtig:** MY STOCK ACADEMY ist eine Lernplattform und **keine Anlageberatung**. Die App gibt keine Kauf- oder Verkaufsempfehlungen, führt keine echten Handelsaufträge aus und verspricht keine Gewinne. Alle Kurse im virtuellen Depot sind **simuliert** und gehören zu **fiktiven Unternehmen**.

---

## Inhalt

| Bereich | Was du dort findest |
| --- | --- |
| **Dashboard** | Begrüßung, Lernfortschritt, Punkte, Lernserie, Lernstufe, nächste Lektion, letzte Aktivitäten, Fortschrittsdiagramm, die 5 Lernstufen |
| **Mein Aktienkurs** | Kompletter Lehrplan (15 Module) mit „Weiterlernen, wo du aufgehört hast“ |
| **Grundlagen, Aktien verstehen, Aktien analysieren, Börsenwissen, Investmentstrategien, Risikomanagement** | Die Module thematisch gruppiert |
| **Lektionen** | Erklärung, Beispiele, interaktives Element, praktische Anwendung, Fachbegriffe, Anfängerfehler, Zusammenfassung, Übung mit Lösung, Kurztest, Quellen |
| **Virtuelles Depot** | Paper Trading mit 10.000 €: Kauf/Verkauf, Durchschnittskaufpreis, G/V, Bargeld, Portfolioverlauf, Transaktionen, simulierte Dividenden, Zeitsteuerung |
| **Aktien-Lexikon** | 184 Begriffe mit Kurz- und Langerklärung, Beispiel, Kategorie, Suche und Filter |
| **Wissenstests** | 169 Fragen (11–12 je Modul): Multiple Choice, Richtig/Falsch, Rechenaufgaben, Praxisfälle, sofortige Erklärung, Wiederholung falscher Antworten |
| **Mein Lernfortschritt** | Lektionen, Testergebnisse, Punkte, Lernzeit, Stärken, Schwächen, Wiederholungsbedarf |
| **Aktien-Rechner** | Rendite, Zinseszins, Dividende, Sparplan, KGV, Gewinn je Aktie, Ø-Kaufpreis, Verlust, Break-even, Diversifikation – jeweils mit Diagramm, Erklärung, Beispielwerten, Zurücksetzen |
| **Watchlist & Recherche** | Unternehmen beobachten, Notizen, Investmentthese, Datum der letzten Analyse, gekennzeichnete Datenqualität |
| **Steuern in Deutschland** | Kapitalertragsteuer, Soli, Kirchensteuer, Sparer-Pauschbetrag, Freistellungsauftrag, Verlustverrechnung, Quellensteuer, Vorabpauschale (inkl. Basiszins 2026: 3,20 %), mit Aktualisierungsdatum und Rechner |
| **Einstellungen** | Name, Lernziel, Animationen, Datenanbieter, Sicherung/Wiederherstellung, Zurücksetzen, Datenschutz |

## Voraussetzungen

- **Node.js 20 oder neuer** (getestet mit Node 22) und **npm**

## Installation und Start

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Entwicklungsserver starten
npm run dev
# → http://localhost:5173 im Browser öffnen
```

### Produktions-Build

```bash
npm run build      # Typprüfung + optimierter Build nach dist/
npm run preview    # Build lokal ansehen (http://localhost:4173)
```

Der Inhalt von `dist/` ist eine statische Webseite und kann auf jedem Webserver oder Static-Hosting-Dienst veröffentlicht werden. Da Hash-Routing (`/#/...`) verwendet wird, ist keine Server-Konfiguration für Unterseiten nötig.

### Tests

```bash
npm test           # alle automatisierten Tests einmal ausführen
npm run test:watch # Tests im Beobachtungsmodus
npm run typecheck  # nur TypeScript-Prüfung
```

Getestet werden u. a.:

- **Finanzberechnungen** (`src/lib/calculations.test.ts`): Rendite, CAGR, Zinseszins, Sparplan, Dividendenprojektion, Kennzahlen, Durchschnittspreis, Verlust-Erholung, Break-even, Diversifikation, Positionsgröße, Drawdown, Hebel, SMA/RSI/MACD, Abgeltungsteuer
- **Depotfunktionen** (`src/lib/portfolio.test.ts`): Kauf, Nachkauf, Durchschnittspreis, Verkauf, realisierte Gewinne, Validierung, Dividenden, Simulation
- **Lernstufen und Lernserie** (`src/lib/progress.test.ts`)
- **Vollständigkeit der Inhalte** (`src/data/content.test.ts`): ≥ 15 Module, vollständige Lektionen, ≥ 10 Fragen je Modul mit gültigen Antworten, ≥ 150 eindeutige Lexikonbegriffe

## Technik

- React 18, TypeScript (strict), Vite 6
- Tailwind CSS 3 (eigenes dunkles Designsystem)
- Recharts (Diagramme, inkl. eigenem Kerzenchart), Lucide Icons
- React Router (Hash-Routing, Seiten werden per Lazy Loading geladen)
- Vitest (Tests)
- Speicherung: LocalStorage (versioniert, mit Export/Import als JSON)

### Projektstruktur

```
src/
  types/                 Zentrale TypeScript-Typen
  data/
    modules/m01–m15.ts   Lerninhalte: Lektionen, Übungen, Quizfragen, Quellen
    curriculum.ts        Modulverzeichnis, Kategorien, Navigation zwischen Lektionen
    glossary*.ts         Aktien-Lexikon
    tax.ts               Steuerinhalte mit Aktualisierungsdatum
  lib/
    calculations.ts      Reine Finanzfunktionen (getestet)
    portfolio.ts         Depot-Logik (getestet)
    progress.ts          Punkte, Lernstufen, Lernserie (getestet)
    storage.ts           LocalStorage, Export/Import
    market/
      simulatedMarket.ts Fiktive Unternehmen + deterministischer Kurssimulator
      provider.ts        Austauschbare Datenanbieter-Schnittstelle
  store/AppStore.tsx     Globaler Zustand (useReducer + Context) und Aktionen
  components/
    ui/                  Wiederverwendbare UI-Bausteine (Karten, Felder, Badges …)
    layout/              Seitenleiste, mobile Navigation
    calculators/         Die 10 Rechner
    widgets/             Interaktive Elemente der Lektionen
    quiz/                Quiz-Komponente
  pages/                 Seiten (Dashboard, Kurs, Lektion, Depot, …)
server/
  index.mjs              Optionaler Marktdaten-Proxy (Node, ohne Abhängigkeiten)
```

## Marktdaten: Simulation und optionaler Proxy

Standardmäßig nutzt die App **ausschließlich simulierte Kurse** fiktiver Unternehmen (z. B. „Nordwind Energie AG“, „Sim-Welt-ETF“). Die Kurse werden deterministisch aus einem Zufallsmodell (geometrische Brownsche Bewegung) erzeugt und überall als **„Simuliert“** gekennzeichnet. Es werden **keine erfundenen echten Kurse** angezeigt.

Für reale Unternehmen in der Watchlist gibt es zwei Möglichkeiten:

1. **Manueller Kurs** aus eigener Recherche – gekennzeichnet als „Manuell“ mit Datum.
2. **Eigener Marktdaten-Proxy** (optional). Die Datenanbieter-Schnittstelle (`MarketDataProvider` in `src/lib/market/provider.ts`) ist austauschbar.

### Proxy einrichten (optional)

API-Schlüssel dürfen **nie** im Frontend oder im Repository liegen. Deshalb hält ein kleiner Server den Schlüssel:

```bash
cp server/.env.example server/.env
# server/.env öffnen und ALPHA_VANTAGE_API_KEY=… eintragen (eigener, kostenloser Schlüssel des Anbieters)
npm run server        # startet den Proxy auf http://localhost:8787
npm run dev           # Vite leitet /api automatisch an den Proxy weiter
```

Danach in der App unter **Einstellungen → Marktdaten-Anbieter** „Eigener Marktdaten-Proxy“ wählen (Adresse leer lassen) und „Verbindung testen“. Kurse aus dem Proxy werden als **„Verzögert“** gekennzeichnet. `server/.env` steht in `.gitignore`.

Bitte beachte die Nutzungsbedingungen des jeweiligen Datenanbieters. Einen anderen Anbieter bindest du an, indem du in `server/index.mjs` einen weiteren Adapter mit `quote()` und `history()` ergänzt.

## Datenschutz

- Alle Daten bleiben **lokal im Browser** (LocalStorage). Es gibt kein Konto, kein Tracking und keine Übertragung an Dritte.
- Über **Einstellungen → Datensicherung** kannst du deinen Stand als JSON-Datei sichern und auf einem anderen Gerät wiederherstellen.

## Inhalte und Quellen

Jedes Modul enthält weiterführende Links zu seriösen Quellen (u. a. Deutsche Börse, Börse Frankfurt, BaFin, EZB, Bundesbank, Destatis, Unternehmensregister, SEC EDGAR, Verbraucherzentrale). Zahlenbeispiele sind als **Beispiel-** oder **Modelldaten** gekennzeichnet; reale Unternehmen werden nur qualitativ (Geschäftsmodell) beschrieben. Steuerinhalte: Stand 09.11.2026 – vor Entscheidungen bitte mit offiziellen Quellen (BMF, BZSt) abgleichen.

## Barrierefreiheit

Tastaturbedienung mit sichtbarem Fokus, „Zum Inhalt springen“-Link, ARIA-Rollen für Navigation, Tabs, Quiz und Fortschrittsbalken, Option „Animationen reduzieren“ (und Unterstützung von `prefers-reduced-motion`), responsive Darstellung für Smartphone, Tablet und PC.
