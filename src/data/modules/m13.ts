import type { Module } from '@/types';
import { QUIZ_M13 } from '../quizzes/hard2';

export const m13: Module = {
  id: 'm13',
  number: 13,
  title: 'Fundamentalanalyse in der Praxis',
  subtitle: 'Ein vollständiger Analyseprozess in 12 Schritten',
  category: 'aktien-analysieren',
  icon: 'ClipboardCheck',
  description:
    'Jetzt wendest du alles Gelernte an. In zwölf Schritten lernst du, ein Unternehmen selbstständig zu untersuchen – von der Auswahl bis zur eigenen Investmentthese. Eine interaktive Checkliste begleitet dich und speichert deinen Fortschritt.',
  lessons: [
    {
      id: 'm13-l1',
      title: 'Schritte 1–4: Auswahl, Geschäftsmodell, Marktposition und Umsatzentwicklung',
      minutes: 18,
      intro:
        'Eine gute Analyse beginnt mit der richtigen Frage und dem Verständnis des Geschäfts. In den ersten vier Schritten legst du das Fundament.',
      sections: [
        {
          heading: 'Schritt 1: Unternehmen auswählen',
          paragraphs: [
            'Beginne mit Unternehmen, die du verstehst – aus deinem Alltag, deinem Beruf oder Branchen, die dich interessieren. Ideenquellen sind Indizes (z. B. DAX, MDAX, Euro Stoxx 50), Produkte, die du selbst nutzt, oder Zulieferer bekannter Firmen. **Nicht** geeignet als Ideenquelle: Hype-Listen, „Geheimtipps“ aus Chatgruppen oder bezahlte Werbung.',
            'Formuliere eine Ausgangsfrage, z. B.: „Ist dieses Unternehmen in der Lage, seine Gewinne in den nächsten 10 Jahren zu steigern – und ist der heutige Preis dafür angemessen?“',
          ],
        },
        {
          heading: 'Schritt 2: Geschäftsmodell verstehen',
          paragraphs: ['Beantworte schriftlich:'],
          bullets: [
            'Was verkauft das Unternehmen, und an wen (Privatkunden, Unternehmen, Staat)?',
            'Wie verdient es Geld (Einmalverkauf, Abo, Gebühren, Lizenzen, Werbung)?',
            'Welche Sparten und Regionen tragen wie viel zum Umsatz bei (Segmentbericht)?',
            'Wie wiederkehrend und planbar sind die Umsätze?',
            'Wovon hängt das Geschäft ab (Konjunktur, Rohstoffe, Regulierung, wenige Großkunden)?',
          ],
        },
        {
          heading: 'Schritt 3: Marktposition untersuchen',
          paragraphs: [
            'Wie groß ist der Markt, und wächst er? Welchen Marktanteil hat das Unternehmen? Welche Wettbewerbsvorteile (Marke, Wechselkosten, Netzwerkeffekte, Kosten, Patente) hat es? Eine hilfreiche Struktur sind die **fünf Wettbewerbskräfte nach Michael Porter**: Rivalität unter Wettbewerbern, Bedrohung durch neue Anbieter, Bedrohung durch Ersatzprodukte, Verhandlungsmacht der Kunden und Verhandlungsmacht der Lieferanten.',
          ],
        },
        {
          heading: 'Schritt 4: Umsatzentwicklung analysieren',
          paragraphs: [
            'Trage den Umsatz der letzten 5–10 Jahre in eine Tabelle ein und berechne das jährliche Wachstum sowie das durchschnittliche Wachstum (CAGR). Fragen: Ist das Wachstum stetig oder sprunghaft? Organisch oder durch Übernahmen? Wie hat sich der Umsatz in Krisenjahren entwickelt? Wächst das Unternehmen schneller oder langsamer als sein Markt?',
          ],
          formula: 'CAGR = (Endwert / Anfangswert)^(1 / Anzahl Jahre) − 1',
        },
      ],
      examples: [
        {
          title: 'Beispiel: Geschäftsmodell-Steckbrief (fiktive Meridian Food & Life NV)',
          text: 'Produkte: Lebensmittel, Getränke und Haushaltswaren in 120 Ländern. Kunden: Supermärkte und Endverbraucher. Erlöse: Produktverkauf, wiederkehrend durch tägliche Nutzung. Segmente: Lebensmittel 55 %, Haushalt 30 %, Getränke 15 %. Abhängigkeiten: Rohstoffpreise, Handelsketten mit hoher Verhandlungsmacht, Wechselkurse. Wettbewerbsvorteile: bekannte Marken, globaler Vertrieb, Größenvorteile beim Einkauf.',
        },
        {
          title: 'Beispiel: Umsatzwachstum einordnen',
          text: 'Umsatz von 40 Mrd. € auf 46 Mrd. € in 5 Jahren → CAGR ≈ 2,8 %. Im Segmentbericht zeigt sich: 2 Prozentpunkte stammen aus Preiserhöhungen, 0,8 aus höheren Mengen. Das Unternehmen hat Preissetzungsmacht, wächst mengenmäßig aber nur langsam – typisch für ein reifes Konsumgüterunternehmen.',
        },
      ],
      practice: [
        'Starte die interaktive Analyse-Checkliste unten und trage das Unternehmen ein, das du analysieren möchtest.',
        'Fülle für Schritt 2 den Geschäftsmodell-Steckbrief für dein Unternehmen aus.',
      ],
      terms: [
        { term: 'Segmentbericht', definition: 'Aufschlüsselung von Umsatz und Ergebnis nach Geschäftsbereichen.' },
        { term: 'Organisches Wachstum', definition: 'Wachstum aus eigener Kraft, ohne Übernahmen.' },
        { term: 'CAGR', definition: 'Durchschnittliche jährliche Wachstumsrate.' },
        { term: 'Porters fünf Kräfte', definition: 'Modell zur Analyse der Wettbewerbsintensität einer Branche.' },
      ],
      mistakes: [
        'Mit einem Unternehmen zu beginnen, das man nicht versteht.',
        'Nur die Gesamtumsätze statt der Segmente zu betrachten.',
        'Übernahme-Wachstum mit organischem Wachstum zu verwechseln.',
      ],
      summary: [
        'Wähle Unternehmen, die du verstehst, und stelle eine klare Ausgangsfrage.',
        'Beschreibe das Geschäftsmodell schriftlich.',
        'Analysiere Markt, Marktanteil und Wettbewerbskräfte.',
        'Bewerte die Umsatzentwicklung über mehrere Jahre.',
      ],
      exercise: {
        title: 'CAGR berechnen',
        task: 'Ein Unternehmen steigerte seinen Umsatz in 5 Jahren von 2,0 Mrd. € auf 3,2 Mrd. €. Wie hoch ist das durchschnittliche jährliche Wachstum?',
        solution: 'CAGR = (3,2 / 2,0)^(1/5) − 1 = 1,6^0,2 − 1 ≈ 9,9 % pro Jahr.',
      },
      widget: 'analysis-checklist',
    },
    {
      id: 'm13-l2',
      title: 'Schritte 5–9: Gewinn, Verschuldung, Cashflow, Kennzahlen und Konkurrenzvergleich',
      minutes: 20,
      intro:
        'Jetzt prüfst du die finanzielle Gesundheit und Ertragskraft. Die Werkzeuge kennst du bereits aus Modul 4 und 5 – hier fügst du sie zu einem Gesamtbild zusammen.',
      sections: [
        {
          heading: 'Schritt 5: Gewinnentwicklung untersuchen',
          paragraphs: [
            'Erfasse Nettogewinn, EBIT und Gewinn je Aktie über 5–10 Jahre. Berechne die Margen und deren Entwicklung. Prüfe Sondereffekte: Gab es einmalige Gewinne oder Verluste? Wie hat sich die Aktienzahl verändert (Verwässerung durch Kapitalerhöhungen oder Rückkäufe)? Steigende Margen deuten auf Preissetzungsmacht oder Skaleneffekte hin.',
          ],
        },
        {
          heading: 'Schritt 6: Verschuldung überprüfen',
          paragraphs: [
            'Ermittle Finanzschulden, liquide Mittel, Nettoverschuldung, Eigenkapitalquote und Nettoverschuldung/EBITDA. Prüfe die **Fälligkeiten** der Schulden: Muss das Unternehmen in den nächsten zwei Jahren viel refinanzieren – womöglich zu höheren Zinsen? Auch Pensionsverpflichtungen und Leasingverbindlichkeiten gehören dazu.',
          ],
        },
        {
          heading: 'Schritt 7: Cashflow untersuchen',
          paragraphs: [
            'Vergleiche operativen Cashflow und Nettogewinn über mehrere Jahre. Berechne den Free Cashflow und die **Cash Conversion** (Free Cashflow / Nettogewinn). Werte um oder über 80–100 % zeigen eine hohe Gewinnqualität. Prüfe, wofür das Geld verwendet wurde: Investitionen, Übernahmen, Dividenden, Rückkäufe oder Schuldenabbau (Kapitalallokation).',
          ],
          formula: 'Cash Conversion = Free Cashflow / Nettogewinn',
        },
        {
          heading: 'Schritt 8: Kennzahlen berechnen',
          paragraphs: [
            'Erstelle deine Kennzahlen-Matrix (Modul 5): Bewertung (KGV, KUV, KBV, Free-Cashflow-Rendite, Dividendenrendite), Qualität (Margen, Eigenkapitalrendite) und Sicherheit (Eigenkapitalquote, Verschuldung). Notiere auch den historischen Durchschnitt der Bewertungskennzahlen.',
          ],
          formula: 'Free-Cashflow-Rendite = Free Cashflow / Marktkapitalisierung',
        },
        {
          heading: 'Schritt 9: Konkurrenz vergleichen',
          paragraphs: [
            'Wähle 2–4 direkte Wettbewerber (Peer Group) und vergleiche dieselben Kennzahlen. Ist dein Unternehmen profitabler, wächst es schneller, ist es solider finanziert? Rechtfertigen diese Unterschiede eine höhere oder niedrigere Bewertung? Eine Vergleichstabelle macht Stärken und Schwächen sichtbar.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Peer-Vergleich (fiktive Werte)',
          text: 'Meridian Food & Life: Umsatzwachstum 3 %, EBIT-Marge 17 %, ROE 15 %, Nettoverschuldung/EBITDA 2,0, KGV 19. Konkurrent A: Wachstum 2 %, Marge 14 %, ROE 12 %, Verschuldung 3,1, KGV 17. Konkurrent B: Wachstum 5 %, Marge 19 %, ROE 22 %, Verschuldung 1,5, KGV 25. Meridian liegt in allen Qualitätsmerkmalen zwischen A und B – das mittlere KGV erscheint im Vergleich plausibel.',
        },
        {
          title: 'Beispiel: Cash Conversion',
          text: 'Unternehmen X meldet 500 Mio. € Gewinn, aber nur 200 Mio. € Free Cashflow (Cash Conversion 40 %) – und das seit Jahren. Ursachen könnten steigende Forderungen, hohe Investitionen oder aggressive Bilanzierung sein. Das muss geklärt werden, bevor man der Gewinnentwicklung vertraut.',
        },
      ],
      practice: [
        'Trage in der Analyse-Checkliste die Ergebnisse der Schritte 5–9 für dein Unternehmen ein.',
        'Erstelle eine Vergleichstabelle mit zwei Wettbewerbern.',
      ],
      terms: [
        { term: 'Verwässerung', definition: 'Verringerung des Anteils je Aktie durch Ausgabe neuer Aktien.' },
        { term: 'Cash Conversion', definition: 'Verhältnis von Free Cashflow zu Nettogewinn.' },
        { term: 'Kapitalallokation', definition: 'Entscheidung, wofür ein Unternehmen sein Geld verwendet.' },
        { term: 'Free-Cashflow-Rendite', definition: 'Free Cashflow im Verhältnis zur Marktkapitalisierung.' },
        { term: 'Refinanzierung', definition: 'Ablösung fälliger Schulden durch neue Kredite oder Anleihen.' },
      ],
      mistakes: [
        'Nur den Gewinn und nicht den Cashflow zu prüfen.',
        'Schuldenfälligkeiten und Zinsrisiken zu übersehen.',
        'Mit Unternehmen aus anderen Branchen zu vergleichen.',
      ],
      summary: [
        'Gewinne, Margen und EPS über mehrere Jahre zeigen die Ertragskraft.',
        'Verschuldung und Fälligkeiten zeigen die finanzielle Stabilität.',
        'Cash Conversion prüft die Qualität der Gewinne.',
        'Peer-Vergleiche ordnen Kennzahlen ein.',
      ],
      exercise: {
        title: 'Qualität prüfen',
        task: 'Nettogewinn 300 Mio. €, operativer Cashflow 420 Mio. €, Investitionen 150 Mio. €, Marktkapitalisierung 6 Mrd. €. Berechne Free Cashflow, Cash Conversion und Free-Cashflow-Rendite.',
        solution: 'Free Cashflow: 420 − 150 = 270 Mio. €. Cash Conversion: 270 / 300 = 90 % (gute Gewinnqualität). FCF-Rendite: 270 / 6.000 = 4,5 %.',
      },
    },
    {
      id: 'm13-l3',
      title: 'Schritte 10–12: Risiken, Unternehmensbewertung und Investmentthese',
      minutes: 22,
      intro:
        'Zum Abschluss bewertest du die Risiken, schätzt einen fairen Wert und formulierst eine eigene Investmentthese – mit klaren Kriterien, wann du deine Meinung ändern würdest.',
      sections: [
        {
          heading: 'Schritt 10: Risiken erkennen',
          paragraphs: ['Lies den Risikobericht und ergänze eigene Überlegungen. Typische Risikokategorien:'],
          bullets: [
            'Geschäftsrisiken: Wettbewerb, technologischer Wandel, Abhängigkeit von Großkunden oder Lieferanten.',
            'Finanzielle Risiken: Schulden, Zinsen, Währungen, Pensionsverpflichtungen.',
            'Regulatorische und rechtliche Risiken: Gesetze, Klagen, Kartellverfahren.',
            'Management- und Governance-Risiken: Interessenkonflikte, häufige Wechsel, Bilanzierungsfragen.',
            'Nachhaltigkeitsrisiken (ESG): Umweltauflagen, CO₂-Kosten, Reputation.',
            'Bewertungsrisiko: Selbst ein großartiges Unternehmen kann zu teuer sein.',
          ],
        },
        {
          heading: 'Schritt 11: Unternehmensbewertung durchführen',
          paragraphs: [
            'Eine Bewertung schätzt, was ein Unternehmen „wert“ ist. Zwei einfache Ansätze für Einsteiger:',
            '**Multiplikator-Methode:** Erwarteter Gewinn je Aktie × angemessenes KGV. Das „angemessene“ KGV leitest du aus der Historie und dem Peer-Vergleich ab. Rechne immer mehrere Szenarien (pessimistisch, Basis, optimistisch).',
            '**Vereinfachtes Discounted-Cashflow-Modell (DCF):** Der Wert eines Unternehmens entspricht der Summe aller künftigen Free Cashflows, abgezinst auf heute. Je höher der Abzinsungssatz (gewünschte Rendite plus Risiko), desto niedriger der Wert. DCF-Modelle reagieren sehr empfindlich auf Annahmen – kleine Änderungen beim Wachstum oder Zins verändern das Ergebnis stark.',
          ],
          formula: 'Fairer Wert (Multiplikator) = erwarteter EPS × Ziel-KGV   |   Sicherheitsmarge = (fairer Wert − Kurs) / fairer Wert',
        },
        {
          heading: 'Schritt 12: Eigene Investmentthese formulieren',
          paragraphs: [
            'Eine **Investmentthese** fasst in wenigen Sätzen zusammen, warum du investieren würdest – oder nicht. Sie enthält: die wichtigsten Gründe, die erwartete Entwicklung, die größten Risiken und **klare Kriterien, wann die These falsch wäre** („Ich verkaufe bzw. überprüfe, wenn …“). Schreibe die These auf und überprüfe sie regelmäßig – etwa nach jedem Geschäftsbericht.',
            'Wichtig: Diese Akademie gibt keine Kauf- oder Verkaufsempfehlungen. Die Investmentthese ist dein eigenes Denkwerkzeug.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Szenario-Bewertung (fiktive Meridian Food & Life)',
          text: 'Erwarteter EPS in 3 Jahren: pessimistisch 3,40 €, Basis 3,90 €, optimistisch 4,30 €. Angemessenes KGV laut Historie und Peers: 16 / 19 / 21. Faire Werte: 54 € / 74 € / 90 €. Aktueller Kurs: 64 €. Im Basisszenario besteht eine Sicherheitsmarge von ca. 13 %, im pessimistischen Szenario wäre die Aktie überbewertet. Ergebnis: moderate Unterbewertung mit Risiko nach unten.',
        },
        {
          title: 'Beispiel: Investmentthese',
          text: '„Meridian ist ein defensiver Konsumgüterkonzern mit starken Marken und stabiler Cash Conversion von über 90 %. Ich erwarte 3–4 % Umsatz- und 5–6 % Gewinnwachstum pro Jahr. Größte Risiken: Handelsmarken, Rohstoffkosten, Währungen. Die These ist falsch, wenn die EBIT-Marge zwei Jahre in Folge unter 14 % fällt oder die Nettoverschuldung/EBITDA über 3 steigt.“ (Fiktives Lernbeispiel, keine Empfehlung.)',
        },
      ],
      practice: [
        'Vervollständige die Analyse-Checkliste unten bis Schritt 12 und formuliere deine Investmentthese im Notizfeld.',
        'Lege das Unternehmen in deiner Watchlist an und speichere die These mit Datum.',
      ],
      terms: [
        { term: 'Innerer Wert', definition: 'Geschätzter fairer Wert eines Unternehmens.' },
        { term: 'DCF', definition: 'Discounted Cashflow – Bewertung über abgezinste künftige Cashflows.' },
        { term: 'Abzinsungssatz', definition: 'Zinssatz, mit dem künftige Zahlungen auf heute umgerechnet werden.' },
        { term: 'Szenarioanalyse', definition: 'Bewertung unter verschiedenen Annahmen (pessimistisch, Basis, optimistisch).' },
        { term: 'Investmentthese', definition: 'Schriftliche Begründung einer Anlageentscheidung inklusive Ausstiegskriterien.' },
        { term: 'ESG', definition: 'Environment, Social, Governance – Nachhaltigkeitskriterien.' },
      ],
      mistakes: [
        'Nur ein einziges, optimistisches Szenario zu rechnen.',
        'DCF-Ergebnisse für exakt zu halten.',
        'Keine Kriterien festzulegen, wann die These falsch ist.',
        'Die These nach Kursbewegungen statt nach Fakten anzupassen.',
      ],
      summary: [
        'Risiken systematisch nach Kategorien erfassen.',
        'Bewertung mit Multiplikatoren oder DCF in mehreren Szenarien.',
        'Eine Investmentthese enthält Gründe, Risiken und Ausstiegskriterien.',
        'Die These regelmäßig anhand neuer Fakten überprüfen.',
      ],
      exercise: {
        title: 'Fairen Wert schätzen',
        task: 'Erwarteter EPS: 5 €. Historisches Durchschnitts-KGV: 14, Branchen-KGV: 16. Aktueller Kurs: 62 €. Schätze eine faire Wertspanne und die Sicherheitsmarge.',
        solution: 'Fairer Wert: 5 × 14 = 70 € bis 5 × 16 = 80 €. Sicherheitsmarge bei 62 €: (70 − 62) / 70 ≈ 11 % bis (80 − 62) / 80 ≈ 22 %. Die Aktie erscheint moderat unterbewertet – vorausgesetzt, die Gewinnschätzung stimmt.',
      },
      widget: 'analysis-checklist',
    },
  ],
  quiz: QUIZ_M13,
  sources: [
    { label: 'Unternehmensregister – Jahresfinanzberichte', url: 'https://www.unternehmensregister.de' },
    { label: 'BaFin – Ad-hoc-Publizität und Insiderrecht', url: 'https://www.bafin.de/DE/Aufsicht/BoersenMaerkte/boersenmaerkte_node.html' },
    { label: 'Deutsches Aktieninstitut – Aktionärswissen', url: 'https://www.dai.de' },
  ],
};
