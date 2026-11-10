import type { Module } from '@/types';
import { QUIZ_M04 } from '../quizzes/hard1';

export const m04: Module = {
  id: 'm04',
  number: 4,
  title: 'Unternehmen richtig analysieren',
  subtitle: 'Geschäftsmodell, Wettbewerbsvorteile, Bilanz und GuV',
  category: 'aktien-analysieren',
  icon: 'Building2',
  description:
    'Wer eine Aktie kauft, kauft ein Stück eines Unternehmens. Deshalb musst du verstehen, wie dieses Unternehmen Geld verdient, wie stark es im Wettbewerb ist und wie gesund seine Finanzen sind. Dieses Modul ist eines der wichtigsten der gesamten Akademie.',
  lessons: [
    {
      id: 'm04-l1',
      title: 'Geschäftsmodell, Wettbewerbsvorteile und Marktposition',
      minutes: 18,
      intro:
        'Die wichtigste Frage jeder Unternehmensanalyse lautet: Wie verdient dieses Unternehmen Geld – und warum kann es das auch in zehn Jahren noch? Zahlen sind wichtig, aber zuerst musst du das Geschäft verstehen.',
      sections: [
        {
          heading: 'Wie analysiert man ein Unternehmen?',
          paragraphs: [
            'Eine Unternehmensanalyse (**Fundamentalanalyse**) besteht aus einem qualitativen und einem quantitativen Teil. Qualitativ fragst du: Was verkauft das Unternehmen? An wen? Warum kaufen Kunden dort und nicht bei der Konkurrenz? Wie gut ist das Management? Quantitativ prüfst du die Zahlen: Umsatz, Gewinn, Schulden, Cashflow und Kennzahlen.',
            'Ein guter Grundsatz lautet: **Investiere nur in Geschäfte, die du verstehst.** Wenn du in zwei, drei Sätzen nicht erklären kannst, wie ein Unternehmen Geld verdient, ist es zu früh für eine Investition.',
          ],
        },
        {
          heading: 'Was ist ein Geschäftsmodell?',
          paragraphs: [
            'Das **Geschäftsmodell** beschreibt, wie ein Unternehmen Wert für Kunden schafft und daraus Einnahmen erzielt. Typische Erlösmodelle sind:',
          ],
          bullets: [
            'Produktverkauf: Ein Gegenstand wird einmal verkauft (z. B. Autos, Maschinen, Lebensmittel).',
            'Abonnement / Software-as-a-Service: Kunden zahlen regelmäßig (z. B. Unternehmenssoftware, Streaming). Diese wiederkehrenden Umsätze sind gut planbar.',
            'Versicherungsprämien: Kunden zahlen Beiträge, das Unternehmen zahlt im Schadensfall und legt das Geld bis dahin an.',
            'Provisionen und Gebühren: z. B. Zahlungsdienstleister, Börsenbetreiber, Marktplätze.',
            'Lizenzen: Das Unternehmen erhält Gebühren für die Nutzung von Patenten, Marken oder Technologien.',
            'Werbung: Nutzer erhalten den Dienst kostenlos, Werbekunden bezahlen (z. B. Suchmaschinen, soziale Netzwerke).',
          ],
        },
        {
          heading: 'Wettbewerbsvorteile („Burggraben“)',
          paragraphs: [
            'Ein **Wettbewerbsvorteil** schützt ein Unternehmen vor Konkurrenz – Warren Buffett nennt ihn „Economic Moat“ (Burggraben). Je breiter der Burggraben, desto länger kann ein Unternehmen hohe Gewinne erzielen. Typische Wettbewerbsvorteile:',
          ],
          bullets: [
            'Starke Marke: Kunden zahlen mehr, weil sie der Marke vertrauen.',
            'Wechselkosten: Ein Wechsel zu einem anderen Anbieter wäre teuer oder aufwendig (z. B. Unternehmenssoftware, die tief in Prozesse integriert ist).',
            'Netzwerkeffekte: Ein Produkt wird wertvoller, je mehr Menschen es nutzen (z. B. Marktplätze, Zahlungsnetzwerke, Börsen).',
            'Kostenvorteile: Das Unternehmen kann günstiger produzieren als die Konkurrenz, z. B. durch Größe.',
            'Patente, Lizenzen und Regulierung: Rechtliche Hürden halten Konkurrenten fern.',
          ],
        },
        {
          heading: 'Marktposition',
          paragraphs: [
            'Die **Marktposition** beschreibt, wie stark ein Unternehmen in seinem Markt ist: Marktanteil, Anzahl und Stärke der Wettbewerber, Preissetzungsmacht und Wachstum des Gesamtmarktes. Ein Marktführer in einem wachsenden Markt mit wenigen Konkurrenten ist meist besser positioniert als ein kleiner Anbieter in einem schrumpfenden, hart umkämpften Markt.',
            'Hilfreiche Fragen: Kann das Unternehmen Preise erhöhen, ohne Kunden zu verlieren (**Preissetzungsmacht**)? Wächst der Markt? Wie leicht können neue Wettbewerber eintreten? Gibt es Ersatzprodukte?',
          ],
        },
        {
          heading: 'Praxis: Geschäftsmodelle bekannter Unternehmen (qualitativ)',
          paragraphs: [
            'Die folgenden Beschreibungen sind allgemein und vereinfacht, ohne aktuelle Finanzzahlen. Aktuelle Daten findest du immer in den Geschäftsberichten auf den Investor-Relations-Seiten der Unternehmen.',
          ],
          bullets: [
            'SAP (Software, DAX): verkauft Unternehmenssoftware zunehmend als Cloud-Abonnement. Wettbewerbsvorteil: hohe Wechselkosten, da die Software tief in Geschäftsprozesse von Kunden eingebunden ist.',
            'Allianz (Versicherung, DAX): erhält Versicherungsprämien und legt das Kapital bis zur Auszahlung von Schäden an. Vorteile: Größe, Marke, Vertriebsnetz, Diversifikation über Länder und Sparten.',
            'Deutsche Börse (Finanzinfrastruktur, DAX): verdient an Handel, Abwicklung, Verwahrung und Indexlizenzen. Vorteil: Netzwerkeffekte – Liquidität zieht weitere Liquidität an.',
            'Coca-Cola (Getränke, USA): verkauft Getränkekonzentrat an Abfüllpartner und nutzt eine weltweit bekannte Marke. Vorteil: Marke und Vertriebsnetz.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Zwei Bäckereien im Vergleich',
          text: 'Bäckerei A verkauft Brot in einer Großstadt mit 20 Konkurrenten in derselben Straße. Bäckerei B ist die einzige Bäckerei in einem Dorf und beliefert zusätzlich alle Schulen per Jahresvertrag. B hat eine stärkere Marktposition (wenig Konkurrenz) und planbare Einnahmen (Verträge). Selbst wenn A heute mehr Umsatz macht, kann B das solidere Geschäft sein.',
        },
        {
          title: 'Beispiel: Wechselkosten',
          text: 'Ein Unternehmen mit 5.000 Mitarbeitern nutzt seit 15 Jahren eine Buchhaltungssoftware. Ein Wechsel würde Schulungen, Datenmigration und Fehlerrisiken bedeuten – Kosten von mehreren Millionen Euro. Deshalb akzeptiert es auch Preiserhöhungen von 5 %. Genau diese Wechselkosten sind der Burggraben des Softwareanbieters.',
        },
      ],
      practice: [
        'Wähle ein Unternehmen und schreibe in drei Sätzen auf, wie es Geld verdient.',
        'Nenne für dieses Unternehmen mindestens einen Wettbewerbsvorteil und eine Bedrohung.',
        'Starte die interaktive Analyse-Checkliste in Modul 13 mit diesem Unternehmen.',
      ],
      terms: [
        { term: 'Fundamentalanalyse', definition: 'Bewertung eines Unternehmens anhand seines Geschäfts und seiner Finanzzahlen.' },
        { term: 'Geschäftsmodell', definition: 'Wie ein Unternehmen Wert schafft und Einnahmen erzielt.' },
        { term: 'Burggraben (Moat)', definition: 'Dauerhafter Wettbewerbsvorteil, der vor Konkurrenz schützt.' },
        { term: 'Preissetzungsmacht', definition: 'Fähigkeit, Preise zu erhöhen, ohne nennenswert Kunden zu verlieren.' },
        { term: 'Marktanteil', definition: 'Anteil eines Unternehmens am Gesamtumsatz eines Marktes.' },
        { term: 'Wiederkehrende Umsätze', definition: 'Regelmäßige Einnahmen aus Verträgen oder Abonnements.' },
      ],
      mistakes: [
        'In ein Unternehmen zu investieren, dessen Geschäftsmodell man nicht erklären kann.',
        'Gute Produkte mit einer guten Investition zu verwechseln – auch der Preis der Aktie muss stimmen.',
        'Wettbewerbsvorteile für ewig zu halten. Technologie und Konkurrenz können Burggräben zuschütten.',
      ],
      summary: [
        'Zuerst das Geschäft verstehen, dann die Zahlen prüfen.',
        'Das Geschäftsmodell erklärt, wie ein Unternehmen Geld verdient.',
        'Wettbewerbsvorteile wie Marke, Wechselkosten und Netzwerkeffekte schützen Gewinne.',
        'Eine starke Marktposition zeigt sich in Marktanteil und Preissetzungsmacht.',
      ],
      exercise: {
        title: 'Burggraben erkennen',
        task: 'Welcher Wettbewerbsvorteil liegt jeweils vor? (a) Ein Online-Marktplatz, auf dem Käufer sind, weil dort viele Verkäufer sind – und umgekehrt. (b) Ein Pharmaunternehmen mit Patent auf ein Medikament. (c) Ein Luxusmodehaus, dessen Taschen trotz hoher Preise ausverkauft sind.',
        solution: '(a) Netzwerkeffekt. (b) Patent / rechtlicher Schutz – zeitlich begrenzt! (c) Starke Marke mit Preissetzungsmacht.',
      },
    },
    {
      id: 'm04-l2',
      title: 'Umsatz, Gewinn, Marge und Cashflow: Die Gewinn- und Verlustrechnung',
      minutes: 18,
      intro:
        'Die Gewinn- und Verlustrechnung (GuV) zeigt, wie viel ein Unternehmen in einem Zeitraum eingenommen und ausgegeben hat. Zusammen mit dem Cashflow verrät sie dir, ob ein Unternehmen wirklich Geld verdient.',
      sections: [
        {
          heading: 'Umsatz',
          paragraphs: [
            'Der **Umsatz** (englisch Revenue oder Sales) ist die Summe aller Einnahmen aus dem Verkauf von Produkten und Dienstleistungen in einem Zeitraum. Er steht ganz oben in der GuV und wird deshalb auch „Top Line“ genannt. Wachsender Umsatz zeigt, dass ein Unternehmen mehr verkauft oder höhere Preise durchsetzt. Achte darauf, ob das Wachstum **organisch** (aus eigener Kraft) oder durch **Übernahmen** zugekauft ist.',
          ],
        },
        {
          heading: 'Vom Umsatz zum Gewinn',
          paragraphs: ['Die GuV zieht vom Umsatz Schritt für Schritt die Kosten ab:'],
          bullets: [
            'Umsatz − Herstellungskosten = Bruttoergebnis (Rohertrag)',
            'Bruttoergebnis − Vertriebs-, Verwaltungs- und Forschungskosten = operatives Ergebnis (EBIT)',
            'EBIT − Zinsen = Ergebnis vor Steuern (EBT)',
            'EBT − Steuern = Nettogewinn (Jahresüberschuss, „Bottom Line“)',
          ],
        },
        {
          heading: 'Gewinne richtig lesen',
          paragraphs: [
            'Der **Gewinn** ist das, was nach allen Kosten übrig bleibt. Er kann durch Sondereffekte verzerrt sein: z. B. durch den Verkauf einer Sparte (einmaliger Gewinn) oder Abschreibungen auf Übernahmen (einmaliger Verlust). Viele Unternehmen veröffentlichen deshalb ein „bereinigtes“ Ergebnis. Sei vorsichtig: Bereinigungen sind nicht standardisiert, und manche Unternehmen bereinigen auffällig oft „einmalige“ Kosten heraus.',
          ],
        },
        {
          heading: 'Die Gewinnmarge',
          paragraphs: [
            'Die **Gewinnmarge** zeigt, wie viel Prozent vom Umsatz als Gewinn übrig bleiben. Man unterscheidet Bruttomarge, operative Marge (EBIT-Marge) und Nettomarge. Margen unterscheiden sich stark nach Branche: Ein Supermarkt arbeitet mit wenigen Prozent Nettomarge, ein Softwareunternehmen kann 20–30 % erreichen. Vergleiche Margen deshalb immer innerhalb einer Branche und über mehrere Jahre.',
          ],
          formula: 'Nettomarge (%) = Nettogewinn / Umsatz × 100   |   EBIT-Marge (%) = EBIT / Umsatz × 100',
        },
        {
          heading: 'Der Cashflow – Gewinn ist eine Meinung, Cash ist eine Tatsache',
          paragraphs: [
            'Der Gewinn ist eine buchhalterische Größe: Umsätze werden gebucht, wenn eine Rechnung gestellt wird, auch wenn das Geld noch nicht da ist. Der **Cashflow** misst dagegen den tatsächlichen Geldzufluss und -abfluss. Die Kapitalflussrechnung unterscheidet:',
          ],
          bullets: [
            'Operativer Cashflow: Geld aus dem laufenden Geschäft.',
            'Investitions-Cashflow: Geld für Investitionen (Maschinen, Gebäude, Übernahmen) – meist negativ.',
            'Finanzierungs-Cashflow: Kredite, Rückzahlungen, Dividenden, Aktienrückkäufe.',
            'Free Cashflow = operativer Cashflow − Investitionen in Sachanlagen (Capex). Er zeigt, wie viel Geld frei für Dividenden, Schuldenabbau oder Wachstum bleibt.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel-GuV der fiktiven „Beispiel AG“ (Beispieldaten, in Mio. €)',
          text: 'Umsatz 1.000 | Herstellungskosten −600 | Bruttoergebnis 400 | Vertrieb, Verwaltung, Forschung −250 | EBIT 150 | Zinsen −20 | EBT 130 | Steuern −39 | Nettogewinn 91. Bruttomarge 40 %, EBIT-Marge 15 %, Nettomarge 9,1 %.',
        },
        {
          title: 'Beispiel: Gewinn ohne Cash',
          text: 'Ein Unternehmen verkauft Maschinen für 100 Mio. € und bucht einen Gewinn von 20 Mio. €. Die Kunden zahlen aber erst in 12 Monaten. Gleichzeitig muss es Löhne und Material bezahlen. Der operative Cashflow ist negativ. Wenn ein Unternehmen dauerhaft Gewinne meldet, aber kaum Cashflow erzeugt, ist das ein Warnsignal.',
        },
      ],
      practice: [
        'Öffne den Geschäftsbericht eines Unternehmens deiner Wahl und suche die GuV („Konzern-Gewinn-und-Verlustrechnung“). Berechne die EBIT-Marge.',
        'Vergleiche den Nettogewinn mit dem operativen Cashflow derselben Periode. Liegen sie ungefähr auf gleichem Niveau?',
      ],
      terms: [
        { term: 'Umsatz', definition: 'Gesamte Erlöse aus Verkäufen in einem Zeitraum.' },
        { term: 'EBIT', definition: 'Operatives Ergebnis vor Zinsen und Steuern.' },
        { term: 'Nettogewinn', definition: 'Gewinn nach allen Kosten, Zinsen und Steuern.' },
        { term: 'Gewinnmarge', definition: 'Anteil des Gewinns am Umsatz.' },
        { term: 'Operativer Cashflow', definition: 'Tatsächlicher Geldzufluss aus dem laufenden Geschäft.' },
        { term: 'Free Cashflow', definition: 'Operativer Cashflow minus Investitionen.' },
      ],
      mistakes: [
        'Nur auf den Umsatz zu schauen – Wachstum ohne Gewinn kann Geld vernichten.',
        'Bereinigte Gewinne ungeprüft zu übernehmen.',
        'Margen über Branchen hinweg zu vergleichen.',
        'Den Cashflow zu ignorieren.',
      ],
      summary: [
        'Die GuV führt vom Umsatz über EBIT zum Nettogewinn.',
        'Margen zeigen die Profitabilität und sollten innerhalb einer Branche verglichen werden.',
        'Der Cashflow zeigt den echten Geldfluss und ist schwerer zu „gestalten“ als der Gewinn.',
        'Free Cashflow ist das Geld, das für Aktionäre und Schuldenabbau übrig bleibt.',
      ],
      exercise: {
        title: 'Margen berechnen',
        task: 'Ein Unternehmen hat 2.400 Mio. € Umsatz, 360 Mio. € EBIT und 240 Mio. € Nettogewinn. Der operative Cashflow beträgt 400 Mio. €, die Investitionen 150 Mio. €. Berechne EBIT-Marge, Nettomarge und Free Cashflow.',
        solution: 'EBIT-Marge: 360 / 2.400 = 15 %. Nettomarge: 240 / 2.400 = 10 %. Free Cashflow: 400 − 150 = 250 Mio. € – mehr als der Nettogewinn, ein gutes Zeichen für die Qualität der Gewinne.',
      },
    },
    {
      id: 'm04-l3',
      title: 'Die Bilanz lesen: Vermögen, Schulden und Eigenkapital',
      minutes: 17,
      intro:
        'Während die GuV einen Zeitraum beschreibt, ist die Bilanz eine Momentaufnahme: Was besitzt das Unternehmen an einem Stichtag – und wem gehört es? Hier lernst du, Schulden und Eigenkapital einzuschätzen.',
      sections: [
        {
          heading: 'Aufbau der Bilanz',
          paragraphs: [
            'Die **Bilanz** hat zwei Seiten, die immer gleich groß sind. Links (**Aktiva**) steht, was das Unternehmen besitzt (Vermögen). Rechts (**Passiva**) steht, wie dieses Vermögen finanziert ist: mit Eigenkapital (gehört den Aktionären) oder mit Fremdkapital (Schulden).',
          ],
          formula: 'Vermögen (Aktiva) = Eigenkapital + Fremdkapital (Passiva)',
        },
        {
          heading: 'Die Aktivseite',
          paragraphs: ['Das Vermögen teilt sich in:'],
          bullets: [
            'Anlagevermögen: langfristig genutzte Werte wie Gebäude, Maschinen, Patente, Software und Firmenwerte (Goodwill aus Übernahmen).',
            'Umlaufvermögen: kurzfristige Werte wie Vorräte, Forderungen an Kunden und liquide Mittel (Bargeld, Bankguthaben).',
          ],
        },
        {
          heading: 'Schulden (Fremdkapital)',
          paragraphs: [
            '**Schulden** sind alle Verpflichtungen gegenüber Dritten: Bankkredite, Anleihen, Verbindlichkeiten gegenüber Lieferanten, Pensionsrückstellungen und Leasingverbindlichkeiten. Schulden sind nicht grundsätzlich schlecht – sie können Wachstum finanzieren und die Eigenkapitalrendite erhöhen. Problematisch wird es, wenn ein Unternehmen Zinsen und Tilgung nicht mehr aus dem Cashflow bedienen kann, etwa in einer Rezession oder bei steigenden Zinsen.',
            'Eine wichtige Größe ist die **Nettoverschuldung**: Finanzschulden minus liquide Mittel. Ein Unternehmen mit 2 Mrd. € Schulden und 2,5 Mrd. € Bargeld hat eine Nettoliquidität.',
          ],
        },
        {
          heading: 'Eigenkapital und Eigenkapitalquote',
          paragraphs: [
            'Das **Eigenkapital** ist der Teil des Vermögens, der den Aktionären gehört – also das, was übrig bliebe, wenn man alle Schulden zurückzahlen würde. Es besteht aus dem eingezahlten Kapital und den einbehaltenen Gewinnen (Gewinnrücklagen).',
            'Die **Eigenkapitalquote** zeigt den Anteil des Eigenkapitals an der Bilanzsumme. Eine hohe Quote bedeutet ein dickes Polster für schlechte Zeiten. Was „hoch“ ist, hängt stark von der Branche ab: Bei Industrieunternehmen gelten 30–50 % oft als solide, Banken und Versicherungen arbeiten geschäftsbedingt mit deutlich niedrigeren Quoten.',
          ],
          formula: 'Eigenkapitalquote (%) = Eigenkapital / Bilanzsumme × 100',
        },
        {
          heading: 'Warnsignale in der Bilanz',
          paragraphs: ['Achte besonders auf:'],
          bullets: [
            'Stark steigende Schulden, ohne dass Umsatz oder Cashflow entsprechend wachsen.',
            'Hoher Goodwill im Verhältnis zum Eigenkapital – Übernahmen könnten später abgeschrieben werden müssen.',
            'Negatives Eigenkapital (Überschuldung in der Bilanz).',
            'Forderungen, die deutlich schneller wachsen als der Umsatz (Kunden zahlen langsamer).',
            'Kurzfristige Schulden, die das Umlaufvermögen übersteigen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel-Bilanz der fiktiven „Beispiel AG“ (Beispieldaten, in Mio. €)',
          text: 'Aktiva: Anlagevermögen 1.200, Vorräte 200, Forderungen 250, liquide Mittel 150 → Bilanzsumme 1.800. Passiva: Eigenkapital 720, langfristige Schulden 700, kurzfristige Schulden 380 → 1.800. Eigenkapitalquote: 720 / 1.800 = 40 %. Bei Finanzschulden von 600 Mio. € beträgt die Nettoverschuldung 600 − 150 = 450 Mio. €.',
        },
        {
          title: 'Beispiel: Schulden als Risiko',
          text: 'Zwei Firmen verdienen je 100 Mio. € EBIT. Firma A hat 200 Mio. € Schulden, Firma B 1.500 Mio. €. Steigt der Zins von 2 % auf 6 %, steigen die Zinskosten von B von 30 auf 90 Mio. € – fast der gesamte operative Gewinn. Bei A steigen sie von 4 auf 12 Mio. €. In der Krise ist A viel robuster.',
        },
      ],
      practice: [
        'Nutze den interaktiven Bilanz-Baukasten unten: Verändere Vermögen und Schulden und beobachte die Eigenkapitalquote.',
        'Suche in einem echten Geschäftsbericht die „Konzernbilanz“ und berechne die Eigenkapitalquote.',
      ],
      terms: [
        { term: 'Bilanz', definition: 'Gegenüberstellung von Vermögen und Kapital zu einem Stichtag.' },
        { term: 'Aktiva', definition: 'Vermögensseite der Bilanz.' },
        { term: 'Passiva', definition: 'Kapitalseite der Bilanz: Eigenkapital und Fremdkapital.' },
        { term: 'Eigenkapital', definition: 'Vermögen abzüglich aller Schulden – gehört den Aktionären.' },
        { term: 'Eigenkapitalquote', definition: 'Anteil des Eigenkapitals an der Bilanzsumme.' },
        { term: 'Nettoverschuldung', definition: 'Finanzschulden minus liquide Mittel.' },
        { term: 'Goodwill', definition: 'Aufpreis bei Übernahmen über den Buchwert des gekauften Unternehmens.' },
      ],
      mistakes: [
        'Schulden pauschal als schlecht zu bewerten, ohne den Cashflow zu betrachten.',
        'Eigenkapitalquoten von Banken mit denen von Industrieunternehmen zu vergleichen.',
        'Nur auf einen Bilanzstichtag zu schauen statt auf die Entwicklung über mehrere Jahre.',
      ],
      summary: [
        'Die Bilanz zeigt Vermögen (Aktiva) und dessen Finanzierung (Passiva).',
        'Eigenkapital gehört den Aktionären, Fremdkapital sind Schulden.',
        'Die Eigenkapitalquote misst das finanzielle Polster.',
        'Schulden werden gefährlich, wenn der Cashflow nicht reicht, um sie zu bedienen.',
      ],
      exercise: {
        title: 'Eigenkapitalquote und Nettoverschuldung',
        task: 'Bilanzsumme 5.000 Mio. €, Eigenkapital 1.250 Mio. €, Finanzschulden 2.000 Mio. €, liquide Mittel 500 Mio. €, EBITDA 600 Mio. €. Berechne Eigenkapitalquote, Nettoverschuldung und Nettoverschuldung/EBITDA.',
        solution: 'EK-Quote: 1.250 / 5.000 = 25 %. Nettoverschuldung: 2.000 − 500 = 1.500 Mio. €. Nettoverschuldung / EBITDA = 2,5 – das Unternehmen bräuchte rechnerisch 2,5 Jahre operativen Gewinn vor Abschreibungen, um seine Nettoschulden zu tilgen. Werte bis ca. 2–3 gelten in vielen Branchen als vertretbar.',
      },
      widget: 'balance-sheet',
    },
    {
      id: 'm04-l4',
      title: 'Geschäftsberichte lesen: Eine Praxisanalyse Schritt für Schritt',
      minutes: 20,
      intro:
        'Jetzt bringen wir alles zusammen. Du lernst, wo du verlässliche Unternehmensdaten findest, wie ein Geschäftsbericht aufgebaut ist und wie du eine einfache Analyse durchführst – am Beispiel einer fiktiven Firma mit klar gekennzeichneten Beispieldaten.',
      sections: [
        {
          heading: 'Was sind Geschäftsberichte?',
          paragraphs: [
            'Börsennotierte Unternehmen müssen regelmäßig Berichte veröffentlichen: einen **Jahresfinanzbericht** (Geschäftsbericht), **Halbjahresfinanzberichte** und meist **Quartalsmitteilungen**. Du findest sie kostenlos auf der Investor-Relations-Seite des Unternehmens und im **Unternehmensregister** (unternehmensregister.de). Bei US-Unternehmen heißen die Berichte 10-K (Jahr) und 10-Q (Quartal) und sind bei der US-Börsenaufsicht SEC (EDGAR-Datenbank) abrufbar.',
          ],
        },
        {
          heading: 'Aufbau eines Geschäftsberichts',
          paragraphs: ['Ein typischer Geschäftsbericht enthält:'],
          bullets: [
            'Brief an die Aktionäre: Überblick des Vorstands – oft geschönt, aber hilfreich für die Strategie.',
            'Lagebericht: Geschäftsverlauf, Märkte, Risiken und Prognose. Der Risikobericht ist besonders lesenswert!',
            'Konzernabschluss: GuV, Bilanz, Kapitalflussrechnung, Eigenkapitalveränderung.',
            'Anhang: Erläuterungen zu den Zahlen, z. B. zu Schulden, Pensionen und Segmenten.',
            'Bestätigungsvermerk des Wirtschaftsprüfers: Hat der Prüfer Einwände?',
          ],
        },
        {
          heading: 'So gehst du bei einer Analyse vor',
          paragraphs: ['Ein einfacher, wiederholbarer Prozess:'],
          bullets: [
            '1. Geschäftsmodell in eigenen Worten beschreiben.',
            '2. Umsatz und Gewinn der letzten 5 Jahre in eine Tabelle übertragen.',
            '3. Margen und deren Entwicklung berechnen.',
            '4. Schulden, Eigenkapitalquote und Cashflow prüfen.',
            '5. Risikobericht lesen und die drei größten Risiken notieren.',
            '6. Mit zwei Wettbewerbern vergleichen.',
            '7. Bewertung mit Kennzahlen (Modul 5) einschätzen.',
          ],
        },
        {
          heading: 'Praxisanalyse: Beispiel AG (fiktive Beispieldaten!)',
          paragraphs: [
            'Die Beispiel AG stellt Industriepumpen her und verkauft zusätzlich Wartungsverträge. Fünf-Jahres-Daten (Mio. €): Umsatz 820 → 870 → 910 → 960 → 1.000. Nettogewinn 60 → 66 → 70 → 82 → 91. Operativer Cashflow 95 → 100 → 98 → 120 → 130. Investitionen 40 → 45 → 50 → 48 → 52. Finanzschulden 650 → 640 → 620 → 610 → 600.',
            '**Auswertung:** Der Umsatz wächst stetig um etwa 5 % pro Jahr. Die Nettomarge steigt von 7,3 % auf 9,1 % – das Unternehmen wird profitabler. Der Free Cashflow steigt von 55 auf 78 Mio. € und liegt in der Nähe des Gewinns – die Gewinne sind also durch echtes Geld gedeckt. Die Schulden sinken leicht. Wartungsverträge sorgen für wiederkehrende Umsätze. **Risiken:** Abhängigkeit von der Industriekonjunktur, Wettbewerb aus Asien, Rohstoffpreise.',
            'Mit diesen Informationen bist du bereit für den nächsten Schritt: die Bewertung mit Kennzahlen wie KGV oder Free-Cashflow-Rendite (Modul 5).',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Den Risikobericht nutzen',
          text: 'Im Risikobericht der (fiktiven) Bavaria Mobility AG steht: „Ein wesentlicher Teil unserer Batteriezellen stammt von zwei Lieferanten.“ Das ist ein Klumpenrisiko in der Lieferkette – eine Information, die du in keiner Kennzahl findest, die aber für die Investmentthese wichtig ist.',
        },
        {
          title: 'Beispiel: Segmentberichterstattung',
          text: 'Ein Konzern wächst insgesamt um 3 %. In der Segmentberichterstattung siehst du: Sparte A wächst um 15 %, Sparte B schrumpft um 8 %. Das zeigt, wo die Zukunft des Unternehmens liegt und welche Sparte Probleme hat.',
        },
      ],
      practice: [
        'Lade den aktuellen Geschäftsbericht eines DAX-Unternehmens von dessen Investor-Relations-Seite herunter.',
        'Übertrage Umsatz, Nettogewinn und operativen Cashflow der letzten 3 Jahre in eine Tabelle.',
        'Notiere die drei wichtigsten Risiken aus dem Risikobericht.',
      ],
      terms: [
        { term: 'Geschäftsbericht', definition: 'Jährlicher Bericht mit Abschluss, Lagebericht und Erläuterungen.' },
        { term: 'Lagebericht', definition: 'Teil des Geschäftsberichts mit Geschäftsverlauf, Risiken und Prognose.' },
        { term: 'Kapitalflussrechnung', definition: 'Darstellung der Geldflüsse (Cashflows) eines Zeitraums.' },
        { term: 'Investor Relations', definition: 'Abteilung bzw. Webseitenbereich für die Kommunikation mit Anlegern.' },
        { term: 'Segmentbericht', definition: 'Aufschlüsselung von Umsatz und Ergebnis nach Geschäftsbereichen oder Regionen.' },
      ],
      mistakes: [
        'Nur den Aktionärsbrief zu lesen – er ist Werbung, keine neutrale Analyse.',
        'Zahlen aus unbekannten Internetquellen ungeprüft zu übernehmen statt aus dem Originalbericht.',
        'Nur ein Jahr zu betrachten statt einer Entwicklung über mehrere Jahre.',
      ],
      summary: [
        'Geschäftsberichte sind die verlässlichste Quelle für Unternehmenszahlen.',
        'Lagebericht und Risikobericht liefern wichtige qualitative Informationen.',
        'Ein strukturierter Analyseprozess macht Unternehmen vergleichbar.',
        'Entwicklungen über mehrere Jahre sagen mehr als Einzelwerte.',
      ],
      exercise: {
        title: 'Mini-Analyse der Beispiel AG',
        task: 'Nutze die Fünf-Jahres-Daten der Beispiel AG. Berechne das durchschnittliche jährliche Umsatzwachstum (CAGR) über 4 Jahre und die Free-Cashflow-Entwicklung vom ersten zum letzten Jahr.',
        steps: ['CAGR = (1.000 / 820)^(1/4) − 1', 'Free Cashflow Jahr 1: 95 − 40 = 55', 'Free Cashflow Jahr 5: 130 − 52 = 78'],
        solution: 'Umsatz-CAGR ≈ 5,1 % pro Jahr. Der Free Cashflow steigt von 55 auf 78 Mio. € (+42 %). Die Beispiel AG wächst moderat, wird profitabler und erzeugt zunehmend freies Geld – qualitativ ein positives Bild. Ob die Aktie attraktiv ist, hängt aber auch vom Preis ab.',
      },
    },
  ],
  quiz: QUIZ_M04,
  sources: [
    { label: 'Unternehmensregister – Pflichtveröffentlichungen', url: 'https://www.unternehmensregister.de' },
    { label: 'SEC EDGAR – Berichte US-Unternehmen', url: 'https://www.sec.gov/edgar/search/' },
    { label: 'Deutsche Börse – Emittentenpflichten (Transparenz)', url: 'https://www.deutsche-boerse-cash-market.com' },
    { label: 'Deutsches Aktieninstitut – Aktionärswissen', url: 'https://www.dai.de' },
  ],
};
