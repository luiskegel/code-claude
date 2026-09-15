# Smart Homework Manager

Digitales Hausaufgabenheft für die Oberstufe – mit integriertem KI-Lernassistenten,
der beim Verstehen hilft, statt nur Lösungen auszuspucken.

Die App läuft ohne Build-Schritt und ohne externe Abhängigkeiten: reines HTML, CSS und
JavaScript (ES-Module) im Browser, dazu ein schlanker Node-Server, der die statischen
Dateien ausliefert und die KI-Anfragen weiterreicht.

---

## Schnellstart

```bash
npm start          # startet den Server auf http://localhost:3000
```

Es ist kein `npm install` nötig – das Projekt hat keine Laufzeit-Abhängigkeiten
(Node 18 oder neuer wird vorausgesetzt).

Ohne hinterlegten API-Schlüssel startet die App automatisch im **Demo-Modus**: Ein
lokaler Tutor beantwortet die Anfragen. Er rechnet quadratische Gleichungen, lineare
Gleichungen und Ableitungen von Polynomen tatsächlich nach (inklusive Probe) und sagt bei
allen anderen Aufgaben ehrlich, dass er sie nicht lösen kann, statt etwas zu erfinden.

---

## Funktionen

**Aufgabenverwaltung**

- Aufgaben anlegen, bearbeiten, duplizieren, löschen (mit „Rückgängig" nach dem Löschen)
- Als erledigt markieren; erledigte Aufgaben bleiben im Filter „Erledigt" sichtbar
- Felder: Titel, Fach, Beschreibung, Abgabetermin, Uhrzeit, Priorität, geschätzte Dauer
- Prioritäten: Niedrig, Normal, Hoch, Dringend – farblich am linken Kartenrand erkennbar
- Überfällige Aufgaben werden hervorgehoben

**Übersichten**

- Dashboard mit Statistik (offen, heute fällig, überfällig, erledigt), Fortschrittsbalken
  und den nächsten Aufgaben
- Filter: Heute · Woche · Alle Aufgaben · Erledigt
- Wochenkalender mit Blätterfunktion; Aufgaben ohne Termin stehen separat darunter
- Fächerverwaltung mit eigenen Farben (Umbenennen passt bestehende Aufgaben mit an)

**Fotos anhängen und von der KI lösen lassen**

- Jede Aufgabe kann Fotos (Buchseite, Arbeitsblatt, Tafelbild) oder PDFs tragen –
  bis zu 6 Anhänge, Fotos werden vor dem Speichern auf 1600 px verkleinert
- Die Bilder liegen in IndexedDB (nicht im localStorage, der dafür zu klein ist);
  im Aufgaben-Datensatz stehen nur Name, Typ und Grösse
- In der KI-Ansicht werden die Fotos bei jeder Anfrage mitgeschickt: Der Server reicht
  sie als Bild-Blöcke an die Claude-API weiter, die die Aufgabe daraus liest und löst
- **Ohne hinterlegten API-Schlüssel sagt der Demo-Tutor ausdrücklich, dass er das Foto
  nicht lesen kann** – er rät nicht
- „Lösung bei der Aufgabe speichern" hängt die Antwort an die Hausaufgabe. Sie ist danach
  auf der Aufgabenkarte („Lösung") und im Stundenplan bei der passenden Stunde abrufbar

**Stundenplan mit automatischen Abgabeterminen**

- Wochenplan (Mo–Fr) mit Fach, Kurs, Lehrkraft, Raum und Zeiten; jede Stunde ist
  anklickbar und lässt sich bearbeiten oder löschen
- **Automatik:** Eine neue Aufgabe in einem Fach ist bis zum Beginn der nächsten Stunde
  dieses Fachs fällig — legst du am Dienstagabend eine Mathe-Aufgabe an und die nächste
  Mathestunde ist Donnerstag 08:00, steht genau das als Termin drin
- Der Termin folgt dem Fach nur so lange, bis du das Datum selbst anfasst; danach bleibt
  deine Eingabe stehen
- Abschaltbar über den Schalter „Abgabetermin automatisch aus dem Stundenplan"
- „Nächste Stunden" listet pro Fach den nächsten Termin — mit direktem Knopf zum Anlegen
  einer Aufgabe
- Klick auf eine Stunde öffnet **„Hausaufgaben für diese Stunde"**: alle Aufgaben, die zu
  dieser Stunde fällig sind, mit ihren Fotos und der gespeicherten Lösung zum Aufklappen.
  Eine kleine Zahl an der Stunde zeigt, wie viel dort offen ist
- Der Plan gilt für jede Woche gleich; A/B-Wochen, Ferien und Vertretungen kennt er nicht

Der mitgelieferte Plan stammt aus einem Screenshot des Vertretungsplans (KW 39). Die
Kurskürzel wurden zu Fachnamen ausgeschrieben (`M-GK2` → Mathematik, `DL-LK1` → Deutsch,
`EKL-LK1` → Erdkunde — diese Zuordnung ist geraten). Alles ist in der Ansicht änderbar,
„Plan zurücksetzen" stellt den Ausgangszustand wieder her.

**Schnelleingabe**

Ein Satz genügt – die Erkennung läuft live mit:

```
Mathe: Bis Freitag Aufgaben 3–8 auf Seite 124
→ Fach: Mathematik · Aufgabe: Aufgaben 3–8 auf Seite 124 · Termin: Freitag
```

Erkannt werden Fach (inkl. Kurzformen wie „Mathe", „Bio", „Franz"), Datum („heute",
„morgen", Wochentage, „in 3 Tagen", „12.09.", „12. September"), Uhrzeit, Dauer
(„ca. 45 min", „1 Stunde") und Priorität („dringend", „Klausur").
Vor dem Speichern bestätigt man das Ergebnis im Formular.

**KI-Lernassistent** (fünf Modi)

| Modus | Verhalten |
| --- | --- |
| Hinweis | nur ein Denkanstoss, kein Ergebnis |
| Schritt für Schritt | nachvollziehbarer Lösungsweg mit Zwischenschritten |
| Erklärung | das Thema dahinter, mit einem anderen Beispiel |
| Lösung überprüfen | rechnet selbst nach und vergleicht mit der eigenen Lösung |
| Lösung anzeigen | vollständige Lösung – erst nach ausdrücklicher Bestätigung |

**Bedienung**

- Light- und Dark-Mode (folgt standardmässig dem System, umschaltbar im Kopfbereich)
- Mobile-First: Tab-Leiste unten, Karten untereinander, grosse Tap-Ziele, kein
  horizontales Scrollen
- Tastenkürzel: `n` legt eine neue Aufgabe an

---

## Wo der API-Schlüssel hingehört

**Regel: Der Schlüssel darf niemals in HTML, CSS oder Browser-JavaScript stehen.**
Alles unter `public/` wird unverändert an jeden Besucher ausgeliefert – ein dort
hinterlegter Schlüssel wäre sofort auslesbar (Quelltext, DevTools, Netzwerk-Tab).

In diesem Projekt liest **ausschliesslich der Node-Server** den Schlüssel:

```
Browser  ──POST /api/ai──►  Node-Server  ──x-api-key──►  Claude API
(kennt den Schlüssel nie)   (liest process.env)
```

### Lokal einrichten

1. Vorlage kopieren:

   ```bash
   cp .env.example .env
   ```

2. `.env` ausfüllen:

   ```dotenv
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-…      # dein echter Schlüssel
   AI_MODEL=claude-sonnet-5
   ```

3. Server neu starten – beim Start wird der aktive Anbieter ausgegeben, und in der
   KI-Ansicht wechselt der Hinweis von „Demo-Modus" auf den aktiven Anbieter.

`.env` steht in `.gitignore` und darf **nicht** committet werden. Gerät ein Schlüssel
doch einmal in ein Repository, hilft nur eines: beim Anbieter widerrufen und einen neuen
erzeugen.

### Beim Hosting

Statt einer `.env`-Datei werden dort Umgebungsvariablen gesetzt – der Code bleibt gleich:

| Umgebung | Ort für den Schlüssel |
| --- | --- |
| Eigener Server / Docker | Umgebungsvariable im Service bzw. Docker-Secret |
| Vercel / Netlify / Render | Projekt-Einstellungen → „Environment Variables" |
| GitHub Actions | Repository → Settings → Secrets and variables → Actions |

Wichtig: Nur die statische Auslieferung reicht nicht – `/api/ai` muss serverseitig laufen
(bei Vercel/Netlify z.B. als Function, die dieselbe Logik wie `server/providers/`
verwendet).

### Weitere Anbieter ergänzen

`server/providers/anthropic.js` ist die Vorlage: eine Funktion, die das Payload
entgegennimmt und `{ content }` zurückgibt. Eine neue Datei danebenlegen, in
`server/config.js` bei `resolveProvider` ergänzen und in `server/index.js` einhängen –
mehr ist nicht nötig. Die Modi und Systemprompts liegen zentral in
`public/js/services/aiModes.js` und werden von Frontend und Server gemeinsam genutzt.

---

## Projektstruktur

```
public/                     alles, was der Browser sieht
├── index.html
├── styles/
│   ├── tokens.css          Farben, Abstände, Typografie (Light + Dark)
│   ├── base.css            Reset und Grundlagen
│   ├── layout.css          Kopfbereich, Navigation, Raster, Breakpoints
│   └── components.css      Karten, Buttons, Formulare, Dialoge, Kalender, KI-Panel
└── js/
    ├── app.js              Einstiegspunkt: Routing, Theme, Fehlerbehandlung
    ├── lib/                dom.js · date.js · markdown.js · quickAdd.js · id.js
    ├── data/               model.js (Modell + Validierung) · storage.js (localStorage)
    │                       schedule.js (Stundenplan + nächste Stunde je Fach)
    │                       attachments.js (Fotos in IndexedDB, Verkleinerung)
    ├── state/              store.js (Zustand + Aktionen) · selectors.js (Statistiken)
    ├── components/         header · nav · taskCard · taskForm · quickAdd · dialog · toast
    │                       attachments (Fotos auswählen, anzeigen, entfernen)
    ├── views/              dashboard · tasks · schedule · calendar · ai · subjects
    └── services/           aiModes.js · aiClient.js · mockAi.js

server/
├── index.js                HTTP-Server: statische Dateien + /api/ai
├── config.js               Umgebungsvariablen, .env-Parser
└── providers/anthropic.js  Aufruf der Claude-API (einzige Stelle mit dem Schlüssel)
```

**Aufbau:** Der Zustand liegt komplett in `state/store.js`. Views lesen ihn und lösen
Aktionen aus; jede Aktion speichert in den localStorage und zeichnet die Oberfläche neu.
Komponenten sind Funktionen, die DOM-Knoten zurückgeben – ohne Framework, aber mit klarer
Trennung von Logik (`lib/`, `data/`, `state/`), Darstellung (`components/`, `views/`) und
Styling (`styles/`).

---

## Datenspeicherung

Die Persistenz läuft zweistufig (`data/persistence.js`):

1. **Server-Speicher der Plattform**, wenn die App als Artifact auf claude.ai läuft:
   Aufgaben als je ein Dokument unter `tasks/<id>`, Fächer/Stundenplan/Einstellungen
   unter `meta/app` (`db`-Capability), Fotos über die `assets`-Capability. Diese Daten
   überleben das Schliessen der App und sind auf jedem Gerät verfügbar.
2. **Lokal** als sofort verfügbarer Zwischenspeicher und als Rückfallebene ohne
   Plattform: `localStorage` unter `shm:data:v1`, Anhänge in der IndexedDB-Datenbank
   `shm-attachments`.

Beim Start zeigt die App sofort den lokalen Stand und fragt parallel den Server. Liegt
dort etwas, ersetzt es den lokalen Stand; ist der Server leer, wandert der lokale Stand
hoch. Der Kopfbereich zeigt an, welcher Speicher aktiv ist („☁️ Gespeichert" bzw.
„💾 Dieses Gerät").

Hintergrund: In eingebetteten Ansichten (claude.ai) und auf iOS mit striktem
Tracking-Schutz verwerfen Browser den Speicher einer eingebetteten Seite beim Schliessen –
ohne den Server-Speicher wären die Aufgaben dann weg.

Aufbau der lokalen Ablage:

```jsonc
{
  "version": 1,
  "tasks": [
    {
      "id": "task_…",
      "title": "Aufgaben 3–8 auf Seite 124",
      "subject": "Mathematik",
      "description": "",
      "dueDate": "2026-09-18",     // lokales Datum, "" = kein Termin
      "dueTime": "17:00",          // optional
      "priority": "normal",        // low | normal | high | urgent
      "estimatedMinutes": 45,      // oder null
      "completed": false,
      "completedAt": null,
      "aiRequested": false,
      "dueFromLesson": true,       // Termin kam aus dem Stundenplan
      "lessonId": "les_…",         // zu dieser Stunde gehört die Aufgabe
      "attachments": [             // Dateien selbst liegen in IndexedDB
        { "id": "att_…", "name": "foto.jpg", "type": "image/jpeg", "size": 184320, "isImage": true }
      ],
      "solution": {                // von der KI gespeicherte Lösung
        "content": "### Schritt für Schritt …",
        "mode": "steps",
        "provider": "anthropic",
        "savedAt": "2026-09-15T20:10:00.000Z"
      },
      "createdAt": "2026-09-15T12:00:00.000Z",
      "updatedAt": "2026-09-15T12:00:00.000Z"
    }
  ],
  "subjects": [{ "id": "sub_…", "name": "Mathematik", "color": "#4f46e5" }],
  "schedule": [
    {
      "id": "les_…",
      "day": 4,                    // 1 = Montag … 5 = Freitag
      "start": "08:00",
      "end": "09:30",
      "subject": "Mathematik",
      "course": "M-GK2",
      "teacher": "HÖRN",
      "room": "B305"
    }
  ],
  "settings": { "theme": "system", "autoDueFromSchedule": true }
}
```

Beim Laden wird jeder Datensatz geprüft und repariert (`normalizeTask`); defekte Daten
werden beiseitegelegt statt gelöscht. Ist der Speicher blockiert (privater Modus, volles
Kontingent), läuft die App weiter und zeigt einen deutlichen Hinweis.

Ein Backend für die Aufgaben selbst gibt es bewusst noch nicht – die Datenschicht ist in
`data/storage.js` gekapselt und lässt sich später gegen eine API tauschen.

---

## Fehlerbehandlung

- Pflichtfelder werden geprüft; leere Aufgaben lassen sich nicht speichern
- Ungültige Daten und Uhrzeiten werden am Feld gemeldet
- KI-Fehler (kein Netz, Zeitüberschreitung, abgelehnter Schlüssel, Limit erreicht)
  erscheinen als verständlicher Text – die Eingaben bleiben erhalten
- Ist kein Server erreichbar, übernimmt der Demo-Tutor im Browser
- Globale Handler fangen unerwartete Fehler ab, statt die Oberfläche einfrieren zu lassen
- Der Server begrenzt Anfragegrösse und Anfragen pro Minute

---

## Getestet

Die Abläufe wurden mit Chromium (Playwright) in 1280 × 900 und 375 × 780 geprüft:
Anlegen, Validierung, Schnelleingabe, Persistenz über einen Reload, Erledigen, Filter,
Kalender, alle KI-Modi, Dark Mode, Tap-Ziele ≥ 44 px und kein horizontaler Überlauf.
Die Browser-Konsole bleibt dabei frei von Fehlern und Warnungen.
