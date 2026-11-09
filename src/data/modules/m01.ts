import type { Module } from '@/types';

export const m01: Module = {
  id: 'm01',
  number: 1,
  title: 'Die Welt der Börse verstehen',
  subtitle: 'Börse, Aktienmarkt, Kursbildung und Indizes',
  category: 'grundlagen',
  icon: 'Landmark',
  description:
    'Bevor du eine einzige Aktie kaufst, musst du verstehen, wo und warum überhaupt gehandelt wird. In diesem Modul lernst du, was eine Börse ist, warum Unternehmen Aktien ausgeben, wie Preise entstehen und was hinter Namen wie DAX, S&P 500 oder Nasdaq steckt.',
  lessons: [
    {
      id: 'm01-l1',
      title: 'Was ist eine Börse und warum gibt es Aktien?',
      minutes: 14,
      intro:
        'Eine Börse ist im Kern ein gut organisierter Marktplatz. Statt Obst und Gemüse werden dort Wertpapiere gehandelt – zum Beispiel Aktien. In dieser Lektion verstehst du, warum es diesen Marktplatz gibt und welchen Nutzen er für Unternehmen und Anleger hat.',
      sections: [
        {
          heading: 'Die Börse als Marktplatz',
          paragraphs: [
            'Stell dir einen Wochenmarkt vor: Verkäufer bieten Waren an, Käufer suchen Waren, und es entsteht ein Preis, auf den sich beide einigen. Eine **Börse** funktioniert genauso – nur dass dort Wertpapiere wie Aktien, Anleihen oder Fonds gehandelt werden und alles nach strengen Regeln abläuft.',
            'Früher standen Händler tatsächlich auf dem „Parkett“ und riefen sich Preise zu. Heute läuft fast der gesamte Handel elektronisch über Computersysteme. In Deutschland ist das wichtigste System **Xetra**, betrieben von der Deutsche Börse AG in Frankfurt am Main.',
            'Die Börse sorgt für drei entscheidende Dinge: **Transparenz** (Preise und Umsätze werden veröffentlicht), **Liquidität** (es gibt fast immer jemanden, der kauft oder verkauft) und **Sicherheit** (Handelsregeln, Überwachung und eine geregelte Abwicklung). In Deutschland überwachen die Handelsüberwachungsstellen der Börsen und die Bundesanstalt für Finanzdienstleistungsaufsicht (**BaFin**) den Handel.',
          ],
        },
        {
          heading: 'Was ist der Aktienmarkt?',
          paragraphs: [
            'Mit **Aktienmarkt** meint man die Gesamtheit aller Orte und Systeme, an denen Aktien gehandelt werden – also alle Börsen und auch außerbörsliche Handelsplätze. Wenn in den Nachrichten „der Aktienmarkt ist heute gefallen“ gesagt wird, ist meist gemeint, dass die Kurse vieler großer Aktien im Durchschnitt gesunken sind – gemessen an einem Index wie dem DAX.',
            'Man unterscheidet den **Primärmarkt** und den **Sekundärmarkt**. Am Primärmarkt gibt ein Unternehmen neue Aktien aus und bekommt dafür Geld – zum Beispiel beim Börsengang. Am Sekundärmarkt handeln Anleger bereits existierende Aktien untereinander. Wenn du über deine Bank eine Aktie kaufst, kaufst du sie fast immer von einem anderen Anleger – das Unternehmen selbst bekommt von diesem Geschäft nichts.',
          ],
        },
        {
          heading: 'Warum existieren Aktien überhaupt?',
          paragraphs: [
            'Unternehmen brauchen Geld (Kapital), um zu wachsen: für neue Fabriken, Forschung, Mitarbeiter oder die Expansion ins Ausland. Dafür gibt es grundsätzlich zwei Wege: **Fremdkapital** (Kredite, Anleihen – das Geld muss mit Zinsen zurückgezahlt werden) und **Eigenkapital** (neue Miteigentümer geben Geld und werden dafür am Unternehmen beteiligt).',
            'Eine **Aktie** ist ein Stück dieses Eigenkapitals. Wer eine Aktie kauft, wird Miteigentümer – mit allen Chancen (Gewinnbeteiligung, Wertsteigerung) und Risiken (Kursverluste bis zum Totalverlust bei einer Pleite). Das Unternehmen muss das Geld nicht zurückzahlen, teilt aber dafür künftige Gewinne und Mitspracherechte mit den Aktionären.',
          ],
        },
        {
          heading: 'Warum gehen Unternehmen an die Börse?',
          paragraphs: [
            'Der erste Verkauf von Aktien an der Börse heißt **Börsengang** oder **IPO** (Initial Public Offering). Gründe dafür sind:',
          ],
          bullets: [
            'Kapitalbeschaffung: Mit dem Erlös können Investitionen finanziert oder Schulden getilgt werden.',
            'Ausstieg früher Investoren: Gründer oder Risikokapitalgeber können ihre Anteile teilweise verkaufen.',
            'Bekanntheit und Vertrauen: Börsennotierte Firmen müssen regelmäßig berichten, was Kunden und Geschäftspartnern Sicherheit gibt.',
            'Mitarbeiterbeteiligung: Aktien können als Teil der Vergütung genutzt werden.',
            'Übernahmewährung: Eigene Aktien können als „Zahlungsmittel“ beim Kauf anderer Firmen dienen.',
          ],
        },
        {
          heading: 'Pflichten börsennotierter Unternehmen',
          paragraphs: [
            'Ein Börsengang hat auch Nachteile: Das Unternehmen muss Geschäftsberichte veröffentlichen, kursrelevante Informationen sofort melden (**Ad-hoc-Publizität**), Hauptversammlungen abhalten und sich der Kritik der Öffentlichkeit stellen. Diese Pflichten schützen dich als Anleger: Sie sorgen dafür, dass alle Marktteilnehmer möglichst gleichzeitig dieselben Informationen erhalten.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Eine Bäckerei wird zur Aktiengesellschaft',
          text: 'Die (fiktive) Bäckerei Müller möchte 20 neue Filialen eröffnen und braucht dafür 5 Mio. €. Eine Bank würde nur 2 Mio. € leihen. Die Bäckerei wandelt sich in eine Aktiengesellschaft um und verkauft 1 Mio. neue Aktien zu je 3 €. Sie erhält 3 Mio. € Eigenkapital, das sie nie zurückzahlen muss. Die neuen Aktionäre besitzen nun gemeinsam einen Teil der Bäckerei und hoffen auf Gewinnbeteiligung und steigende Aktienkurse.',
        },
        {
          title: 'Beispiel: Primär- und Sekundärmarkt',
          text: 'Beim Börsengang kaufst du 10 Aktien der Bäckerei Müller AG zu 3 € – das Geld (30 €) fließt an das Unternehmen (Primärmarkt). Ein Jahr später verkaufst du die 10 Aktien für 3,50 € an eine andere Anlegerin. Die 35 € zahlt sie an dich, nicht an die Bäckerei (Sekundärmarkt).',
        },
      ],
      practice: [
        'Schau dir die Webseite der Deutschen Börse (deutsche-boerse.com) oder boerse-frankfurt.de an und finde heraus, welche Handelszeiten für Xetra gelten.',
        'Suche dir ein Unternehmen aus deinem Alltag (z. B. einen Sportartikelhersteller) und prüfe, ob es börsennotiert ist. Tipp: Viele Unternehmen haben einen Bereich „Investor Relations“ auf ihrer Webseite.',
        'Überlege, welche Produkte du täglich nutzt und welche Unternehmen dahinterstehen. So entsteht ein Gefühl dafür, wie eng Börse und Alltag zusammenhängen.',
      ],
      terms: [
        { term: 'Börse', definition: 'Geregelter, überwachter Marktplatz für Wertpapiere.' },
        { term: 'Aktie', definition: 'Wertpapier, das einen Anteil am Eigenkapital eines Unternehmens verbrieft.' },
        { term: 'IPO / Börsengang', definition: 'Erstmaliges Angebot von Aktien eines Unternehmens an der Börse.' },
        { term: 'Primärmarkt', definition: 'Markt für neu ausgegebene Wertpapiere – das Geld fließt an den Emittenten.' },
        { term: 'Sekundärmarkt', definition: 'Handel mit bereits ausgegebenen Wertpapieren zwischen Anlegern.' },
        { term: 'Liquidität', definition: 'Wie leicht und schnell sich ein Wertpapier zu einem fairen Preis kaufen oder verkaufen lässt.' },
      ],
      mistakes: [
        'Zu glauben, dass beim Aktienkauf an der Börse das Unternehmen dein Geld bekommt – in der Regel kaufst du von einem anderen Anleger.',
        'Die Börse für ein Glücksspiel-Casino zu halten: Hinter jeder Aktie steht ein echtes Unternehmen mit Umsätzen, Gewinnen und Risiken.',
        'Anzunehmen, dass börsennotierte Unternehmen automatisch sicher sind. Auch große Konzerne können in Schwierigkeiten geraten oder insolvent werden.',
      ],
      summary: [
        'Eine Börse ist ein geregelter Marktplatz für Wertpapiere mit Transparenz, Liquidität und Aufsicht.',
        'Aktien sind Eigenkapital: Aktionäre werden Miteigentümer und tragen Chancen und Risiken.',
        'Unternehmen gehen an die Börse, um Kapital zu beschaffen, bekannter zu werden und Anteile handelbar zu machen.',
        'Beim normalen Aktienkauf handelst du am Sekundärmarkt mit anderen Anlegern.',
      ],
      exercise: {
        title: 'Primär- oder Sekundärmarkt?',
        task: 'Ordne die folgenden Vorgänge dem Primär- oder Sekundärmarkt zu: (a) Ein Start-up verkauft bei seinem Börsengang neue Aktien. (b) Du verkaufst deine Aktien an einen anderen Anleger. (c) Ein DAX-Konzern gibt im Rahmen einer Kapitalerhöhung neue Aktien aus. (d) Ein Fonds kauft an der Börse 10.000 bereits existierende Aktien.',
        solution: '(a) Primärmarkt – das Geld fließt an das Unternehmen. (b) Sekundärmarkt. (c) Primärmarkt – auch eine Kapitalerhöhung bringt dem Unternehmen neues Geld. (d) Sekundärmarkt – der Fonds kauft von anderen Anlegern.',
      },
    },
    {
      id: 'm01-l2',
      title: 'Wie der Aktienhandel funktioniert: Angebot, Nachfrage und Kurse',
      minutes: 16,
      intro:
        'Warum kostet eine Aktie heute 50 € und morgen 48 €? Die Antwort liegt im Zusammenspiel von Angebot und Nachfrage. In dieser Lektion lernst du, wie ein Börsenkurs entsteht und welche Faktoren ihn bewegen.',
      sections: [
        {
          heading: 'Das Orderbuch: Wo Käufer und Verkäufer sich treffen',
          paragraphs: [
            'Jeder, der eine Aktie kaufen oder verkaufen will, gibt eine **Order** (einen Auftrag) auf. Diese Aufträge landen im **Orderbuch** der Börse. Dort stehen auf der einen Seite die Kaufaufträge mit ihren Preisgrenzen (**Geldkurs**, englisch Bid) und auf der anderen Seite die Verkaufsaufträge (**Briefkurs**, englisch Ask).',
            'Der höchste Preis, den ein Käufer zu zahlen bereit ist, und der niedrigste Preis, zu dem ein Verkäufer abgeben würde, liegen meist nah beieinander. Treffen sich beide, kommt ein Geschäft zustande. Der Preis dieses Geschäfts ist der aktuelle **Kurs**.',
          ],
        },
        {
          heading: 'Angebot und Nachfrage',
          paragraphs: [
            'Das wichtigste Prinzip der Börse ist einfach: **Wollen mehr Menschen eine Aktie kaufen als verkaufen, steigt der Preis. Wollen mehr verkaufen als kaufen, fällt er.** Käufer müssen dann mehr bieten, um noch zum Zug zu kommen – oder Verkäufer müssen mit dem Preis heruntergehen.',
            'Der Kurs ist also kein „offiziell festgelegter Wert“ des Unternehmens, sondern der Preis, auf den sich Käufer und Verkäufer gerade einigen. Er spiegelt die gesammelten Erwartungen aller Marktteilnehmer über die Zukunft des Unternehmens wider.',
          ],
        },
        {
          heading: 'Warum steigen und fallen Aktienkurse?',
          paragraphs: ['Die Nachfrage nach einer Aktie hängt von vielen Faktoren ab. Die wichtigsten sind:'],
          bullets: [
            'Unternehmenszahlen: Steigende Gewinne machen eine Aktie attraktiver, Gewinnwarnungen weniger.',
            'Erwartungen: Entscheidend ist oft nicht, ob Zahlen gut sind, sondern ob sie besser oder schlechter als erwartet ausfallen.',
            'Zinsen: Steigen die Zinsen, werden sichere Alternativen wie Tagesgeld oder Anleihen attraktiver – das kann Aktienkurse belasten.',
            'Konjunktur: In einem Wirtschaftsaufschwung verdienen Unternehmen meist mehr, in einer Rezession weniger.',
            'Nachrichten und Ereignisse: Neue Produkte, Rechtsstreitigkeiten, politische Entscheidungen, Kriege oder Naturkatastrophen.',
            'Stimmung (Psychologie): Angst und Gier können Kurse kurzfristig stark übertreiben – nach oben wie nach unten.',
          ],
        },
        {
          heading: 'Kurzfristig Stimmung, langfristig Gewinne',
          paragraphs: [
            'Ein bekanntes Bild des Investors Benjamin Graham beschreibt die Börse kurzfristig als „Abstimmungsmaschine“ (es gewinnt, was gerade beliebt ist) und langfristig als „Waage“ (es zählt, was ein Unternehmen tatsächlich wert ist). Kurzfristige Kursbewegungen sind oft zufällig und schwer vorherzusagen. Über viele Jahre folgen Aktienkurse dagegen meist der Entwicklung der Unternehmensgewinne.',
          ],
        },
        {
          heading: 'Wer handelt an der Börse?',
          paragraphs: [
            'Am Markt treffen sich Privatanleger wie du, institutionelle Anleger (Fonds, Versicherungen, Pensionskassen), Banken und sogenannte **Market Maker** oder **Spezialisten**, die dafür sorgen, dass jederzeit Kauf- und Verkaufspreise gestellt werden. Ein großer Teil des Handels wird heute von Computerprogrammen ausgeführt (algorithmischer Handel).',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Ein Orderbuch',
          text: 'Im Orderbuch der fiktiven Nordwind Energie AG stehen Kaufaufträge zu 49,90 € (500 Stück) und 49,80 € (800 Stück) sowie Verkaufsaufträge zu 50,00 € (300 Stück) und 50,10 € (600 Stück). Der Spread beträgt 0,10 €. Kommt nun ein Käufer, der sofort 600 Stück „bestens“ kaufen will, erhält er 300 Stück zu 50,00 € und 300 Stück zu 50,10 €. Der letzte Kurs springt auf 50,10 € – weil die Nachfrage das Angebot auf der günstigsten Stufe übertroffen hat.',
        },
        {
          title: 'Beispiel: Gute Zahlen, fallender Kurs',
          text: 'Ein Unternehmen meldet 10 % mehr Gewinn. Trotzdem fällt die Aktie um 5 %. Warum? Analysten hatten 15 % Gewinnwachstum erwartet, und dieser Optimismus war bereits im Kurs „eingepreist“. Die Zahlen waren gut, aber schlechter als erwartet – die Nachfrage sinkt.',
        },
      ],
      practice: [
        'Probiere den interaktiven Angebot-Nachfrage-Simulator unten aus: Verändere die Zahl der Käufer und Verkäufer und beobachte, wie sich der Preis anpasst.',
        'Beobachte eine Woche lang, wie der DAX auf Nachrichten reagiert (z. B. Zinsentscheidungen der EZB). Notiere dir, welche Nachricht welche Reaktion auslöste.',
      ],
      terms: [
        { term: 'Kurs', definition: 'Preis, zu dem zuletzt ein Geschäft in einem Wertpapier zustande kam.' },
        { term: 'Orderbuch', definition: 'Liste aller offenen Kauf- und Verkaufsaufträge für ein Wertpapier.' },
        { term: 'Geldkurs (Bid)', definition: 'Preis, zu dem jemand bereit ist zu kaufen – du kannst zu diesem Preis verkaufen.' },
        { term: 'Briefkurs (Ask)', definition: 'Preis, zu dem jemand bereit ist zu verkaufen – du kannst zu diesem Preis kaufen.' },
        { term: 'Eingepreist', definition: 'Erwartete Entwicklungen sind bereits im aktuellen Kurs berücksichtigt.' },
        { term: 'Market Maker', definition: 'Marktteilnehmer, der laufend Kauf- und Verkaufspreise stellt und so Liquidität schafft.' },
      ],
      mistakes: [
        'Zu denken, gute Nachrichten führen immer zu steigenden Kursen – entscheidend ist der Vergleich mit den Erwartungen.',
        'Kurzfristige Kursbewegungen als Beweis für die Qualität eines Unternehmens zu sehen.',
        'Zu glauben, man könne Kursbewegungen zuverlässig vorhersagen. Selbst Profis liegen kurzfristig oft falsch.',
      ],
      summary: [
        'Kurse entstehen durch Angebot und Nachfrage im Orderbuch.',
        'Mehr Kaufinteresse lässt den Kurs steigen, mehr Verkaufsinteresse lässt ihn fallen.',
        'Erwartungen, Zinsen, Konjunktur, Nachrichten und Stimmung beeinflussen die Nachfrage.',
        'Langfristig orientieren sich Kurse meist an der Gewinnentwicklung der Unternehmen.',
      ],
      exercise: {
        title: 'Steigt oder fällt der Kurs?',
        task: 'Schätze die wahrscheinliche kurzfristige Reaktion ein: (a) Die EZB senkt überraschend die Zinsen. (b) Ein Autohersteller muss eine Million Fahrzeuge zurückrufen. (c) Ein Softwareunternehmen meldet genau die Zahlen, die alle erwartet haben.',
        solution: '(a) Tendenziell steigende Kurse: niedrigere Zinsen machen Aktien im Vergleich attraktiver und senken Finanzierungskosten. (b) Tendenziell fallender Kurs: Kosten und Imageschaden. (c) Oft kaum Bewegung – die Zahlen waren bereits eingepreist. Wichtig: Das sind Tendenzen, keine Gesetze. Der Markt kann auch anders reagieren.',
      },
      widget: 'supply-demand',
    },
    {
      id: 'm01-l3',
      title: 'Börsenindizes und Börsenplätze: DAX, S&P 500, Nasdaq & Co.',
      minutes: 18,
      intro:
        'In den Nachrichten hörst du täglich: „Der DAX schloss 0,8 % im Plus.“ Was ist damit gemeint? In dieser Lektion lernst du, was ein Index ist, wie er berechnet wird und welche Börsenplätze und Indizes weltweit besonders wichtig sind.',
      sections: [
        {
          heading: 'Was ist ein Börsenindex?',
          paragraphs: [
            'Ein **Index** ist eine Kennzahl, die die Entwicklung einer Gruppe von Aktien zusammenfasst – ähnlich wie ein Fieberthermometer für einen Markt. Statt 40 einzelne Kurse zu verfolgen, schaut man auf eine einzige Zahl.',
            'Die meisten großen Indizes sind nach der **Marktkapitalisierung** gewichtet (genauer: nach dem Börsenwert der frei handelbaren Aktien, dem sogenannten Streubesitz oder Free Float). Große Unternehmen haben also mehr Einfluss auf den Index als kleine. Steigt ein Schwergewicht um 5 %, bewegt das den Index stärker als ein kleiner Wert mit 5 % Plus.',
            'Man unterscheidet **Kursindizes** (nur Kursveränderungen) und **Performanceindizes** (Dividenden werden rechnerisch reinvestiert). Der DAX ist ein Performanceindex – das ist wichtig, wenn man seine Entwicklung mit anderen Indizes vergleicht, die oft Kursindizes sind.',
          ],
        },
        {
          heading: 'Der DAX – Deutschlands Leitindex',
          paragraphs: [
            'Der **DAX** (Deutscher Aktienindex) enthält seit September 2021 die **40 größten** an der Frankfurter Wertpapierbörse gelisteten Unternehmen (zuvor 30). Er wird von der Deutsche Börse AG berechnet. Daneben gibt es den **MDAX** (50 mittelgroße Werte), den **SDAX** (70 kleinere Werte) und den **TecDAX** (30 Technologiewerte).',
            'Wichtig zu wissen: Viele DAX-Konzerne erwirtschaften den Großteil ihres Umsatzes im Ausland. Der DAX ist also kein reines Abbild der deutschen Wirtschaft, sondern eher großer, international tätiger deutscher Konzerne.',
          ],
        },
        {
          heading: 'US-Indizes: S&P 500, Nasdaq und Dow Jones',
          paragraphs: [
            'Der **S&P 500** umfasst etwa 500 große US-Unternehmen und gilt als wichtigster Gradmesser für den US-Aktienmarkt. Da der US-Markt der größte der Welt ist, beeinflusst er auch die Kurse in Europa stark. Der S&P 500 wird von S&P Dow Jones Indices berechnet und ist ein Kursindex.',
            'Der Begriff **Nasdaq** bezeichnet zweierlei: zum einen eine elektronische Börse in New York, an der besonders viele Technologieunternehmen gelistet sind, zum anderen Indizes wie den **Nasdaq Composite** (alle dort gelisteten Aktien) und den **Nasdaq-100** (die 100 größten Nicht-Finanzunternehmen an der Nasdaq).',
            'Der **Dow Jones Industrial Average** ist der älteste US-Index und enthält nur 30 Werte. Er ist preisgewichtet – eine Aktie mit hohem Kurs hat mehr Gewicht, unabhängig von der Unternehmensgröße. Fachleute betrachten den S&P 500 deshalb als aussagekräftiger.',
          ],
        },
        {
          heading: 'Wichtige Börsenplätze',
          paragraphs: ['Börsenplätze sind die Orte bzw. Systeme, an denen gehandelt wird:'],
          bullets: [
            'New York Stock Exchange (NYSE): größte Börse der Welt nach Börsenwert der gelisteten Unternehmen, an der Wall Street in New York.',
            'Nasdaq: zweitgrößte US-Börse, rein elektronisch, Schwerpunkt Technologie.',
            'Frankfurter Wertpapierbörse (FWB): wichtigster deutscher Börsenplatz. Hier läuft Xetra (vollelektronisch, an Börsentagen ca. 9:00–17:30 Uhr) sowie der Handel an der Börse Frankfurt mit Spezialisten (längere Handelszeiten).',
            'Weitere: Euronext (Paris, Amsterdam, Brüssel u. a.), London Stock Exchange, SIX Swiss Exchange, Tokio, Shanghai, Hongkong sowie Regionalbörsen in Deutschland (Stuttgart, München, Hamburg, Düsseldorf, Berlin) und außerbörsliche Plattformen.',
          ],
        },
        {
          heading: 'Weitere bekannte Indizes',
          paragraphs: [
            'Der **Euro Stoxx 50** enthält 50 große Unternehmen aus der Eurozone, der **MSCI World** rund 1.400 Unternehmen aus 23 Industrieländern (Schwellenländer sind nicht enthalten), der **MSCI Emerging Markets** Unternehmen aus Schwellenländern. Diese Indizes bilden die Grundlage für viele ETFs, die du in Modul 9 kennenlernst.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Gewichtung in einem Mini-Index',
          text: 'Ein Mini-Index besteht aus drei Firmen: A (Börsenwert 60 Mrd. €), B (30 Mrd. €) und C (10 Mrd. €). Gewichte: A 60 %, B 30 %, C 10 %. Steigt C um 20 %, steigt der Index nur um 2 % (0,10 × 20 %). Steigt A um 5 %, steigt der Index um 3 % (0,60 × 5 %). Die große Firma bewegt den Index also deutlich stärker.',
        },
        {
          title: 'Beispiel: Indexvergleich richtig lesen',
          text: 'Der DAX ist in einem Jahr um 8 % gestiegen, der Euro Stoxx 50 (Kursindex) um 6 %. Daraus kann man nicht sofort schließen, dass deutsche Aktien besser waren: Der DAX enthält die Dividenden (Performanceindex), der Euro Stoxx 50 als Kursindex nicht. Bei rund 3 % Dividendenrendite wäre der Euro Stoxx 50 inklusive Dividenden sogar etwas besser gelaufen.',
        },
      ],
      practice: [
        'Spiele mit dem Index-Gewichtungs-Rechner unten: Verändere die Kursentwicklung einzelner Firmen und beobachte die Wirkung auf den Index.',
        'Sieh dir auf boerse-frankfurt.de die aktuelle DAX-Zusammensetzung an. Welche drei Unternehmen haben das größte Gewicht?',
        'Finde heraus, ob der Index, den ein ETF deiner Wahl abbildet, ein Kurs- oder Performanceindex ist.',
      ],
      terms: [
        { term: 'Index', definition: 'Kennzahl, die die Kursentwicklung einer festgelegten Gruppe von Wertpapieren abbildet.' },
        { term: 'DAX', definition: 'Deutscher Leitindex mit den 40 größten Unternehmen der Frankfurter Börse (Performanceindex).' },
        { term: 'S&P 500', definition: 'Index mit rund 500 großen US-Unternehmen; wichtigster US-Marktindikator.' },
        { term: 'Nasdaq', definition: 'Technologielastige US-Börse und Name der zugehörigen Indizes (Composite, Nasdaq-100).' },
        { term: 'Performanceindex', definition: 'Index, in dem Dividenden rechnerisch reinvestiert werden.' },
        { term: 'Streubesitz (Free Float)', definition: 'Anteil der Aktien, der frei an der Börse handelbar ist.' },
      ],
      mistakes: [
        'Performance- und Kursindizes direkt miteinander zu vergleichen.',
        'Den DAX mit „der deutschen Wirtschaft“ gleichzusetzen.',
        'Zu glauben, ein Index sei „breit gestreut“, obwohl wenige Schwergewichte einen großen Teil ausmachen können.',
      ],
      summary: [
        'Ein Index fasst die Entwicklung vieler Aktien zu einer Zahl zusammen.',
        'Der DAX enthält 40 große deutsche Unternehmen und ist ein Performanceindex.',
        'S&P 500, Nasdaq-100 und Dow Jones sind die bekanntesten US-Indizes.',
        'NYSE und Nasdaq (New York) sowie die Frankfurter Wertpapierbörse mit Xetra sind zentrale Börsenplätze.',
      ],
      exercise: {
        title: 'Index-Gewichtung berechnen',
        task: 'Ein Index besteht aus Firma X (Gewicht 50 %), Y (30 %) und Z (20 %). An einem Tag: X +2 %, Y −4 %, Z +5 %. Wie verändert sich der Index?',
        steps: ['X: 0,5 × 2 % = 1,0 %', 'Y: 0,3 × (−4 %) = −1,2 %', 'Z: 0,2 × 5 % = 1,0 %'],
        solution: 'Summe: 1,0 % − 1,2 % + 1,0 % = +0,8 %. Der Index steigt um 0,8 %, obwohl eine Aktie deutlich gefallen ist.',
      },
      widget: 'index-weights',
    },
  ],
  quiz: [
    { id: 'm01-q1', type: 'mc', lesson: 0, question: 'Was erwirbst du, wenn du eine Aktie kaufst?', options: ['Einen Kredit an das Unternehmen', 'Einen Anteil am Eigenkapital des Unternehmens', 'Ein Recht auf feste Zinsen', 'Eine Garantie auf Wertsteigerung'], answer: 1, explanation: 'Eine Aktie verbrieft einen Anteil am Eigenkapital – du wirst Miteigentümer. Feste Zinsen gibt es bei Anleihen, eine Garantie gibt es nicht.' },
    { id: 'm01-q2', type: 'tf', lesson: 0, question: 'Wenn du über deinen Broker eine DAX-Aktie kaufst, fließt dein Geld in der Regel direkt an das Unternehmen.', answer: 1, explanation: 'Falsch. Du kaufst am Sekundärmarkt von einem anderen Anleger. Nur bei Börsengängen oder Kapitalerhöhungen (Primärmarkt) erhält das Unternehmen Geld.' },
    { id: 'm01-q3', type: 'mc', lesson: 0, question: 'Welcher Grund spricht NICHT für einen Börsengang?', options: ['Kapitalbeschaffung', 'Frühe Investoren können Anteile verkaufen', 'Wegfall aller Veröffentlichungspflichten', 'Höhere Bekanntheit'], answer: 2, explanation: 'Das Gegenteil ist der Fall: Börsennotierte Unternehmen haben deutlich mehr Veröffentlichungspflichten (Geschäftsberichte, Ad-hoc-Meldungen).' },
    { id: 'm01-q4', type: 'mc', lesson: 1, question: 'Im Orderbuch wollen deutlich mehr Anleger kaufen als verkaufen. Was passiert tendenziell mit dem Kurs?', options: ['Er steigt', 'Er fällt', 'Er bleibt unverändert', 'Der Handel wird eingestellt'], answer: 0, explanation: 'Übersteigt die Nachfrage das Angebot, müssen Käufer höhere Preise bieten – der Kurs steigt.' },
    { id: 'm01-q5', type: 'case', lesson: 1, question: 'Ein Unternehmen meldet 12 % Gewinnwachstum. Erwartet wurden 20 %. Die Aktie fällt um 6 %. Was ist die wahrscheinlichste Erklärung?', options: ['Der Markt hat einen Fehler gemacht', 'Die Zahlen waren schlechter als erwartet; die höheren Erwartungen waren schon eingepreist', 'Gewinnwachstum ist immer schlecht für Aktien', 'Die Börse war an dem Tag geschlossen'], answer: 1, explanation: 'Kurse spiegeln Erwartungen wider. Wenn Ergebnisse hinter den Erwartungen zurückbleiben, kann eine Aktie trotz Wachstum fallen.' },
    { id: 'm01-q6', type: 'mc', lesson: 1, question: 'Was ist der Briefkurs (Ask)?', options: ['Der Preis, zu dem du sofort verkaufen kannst', 'Der Preis, zu dem du sofort kaufen kannst', 'Der Schlusskurs vom Vortag', 'Der Durchschnittskurs des Jahres'], answer: 1, explanation: 'Der Briefkurs ist der niedrigste Verkaufspreis im Orderbuch – zu diesem Preis kannst du kaufen. Der Geldkurs (Bid) ist der Preis, zu dem du verkaufen kannst.' },
    { id: 'm01-q7', type: 'tf', lesson: 1, question: 'Steigende Leitzinsen können Aktienkurse belasten, weil sichere Anlagen attraktiver werden.', answer: 0, explanation: 'Richtig. Höhere Zinsen erhöhen die Attraktivität von Tagesgeld und Anleihen und verteuern Kredite für Unternehmen.' },
    { id: 'm01-q8', type: 'mc', lesson: 2, question: 'Wie viele Unternehmen enthält der DAX seit September 2021?', options: ['30', '40', '50', '100'], answer: 1, explanation: 'Der DAX wurde 2021 von 30 auf 40 Unternehmen erweitert.' },
    { id: 'm01-q9', type: 'calc', lesson: 2, question: 'Ein Index besteht aus A (Gewicht 70 %) und B (30 %). A steigt um 10 %, B fällt um 10 %. Wie verändert sich der Index?', options: ['0 %', '+4 %', '+7 %', '−3 %'], answer: 1, explanation: '0,7 × 10 % + 0,3 × (−10 %) = 7 % − 3 % = +4 %.' },
    { id: 'm01-q10', type: 'mc', lesson: 2, question: 'Was unterscheidet einen Performanceindex von einem Kursindex?', options: ['Er enthält mehr Unternehmen', 'Dividenden werden rechnerisch reinvestiert', 'Er wird nur einmal im Jahr berechnet', 'Er enthält nur Technologiewerte'], answer: 1, explanation: 'In einem Performanceindex wie dem DAX werden Dividenden reinvestiert. Ein Kursindex wie der S&P 500 zeigt nur die Kursveränderungen.' },
    { id: 'm01-q11', type: 'mc', lesson: 2, question: 'Welcher Index gilt als wichtigster Gradmesser des breiten US-Aktienmarkts?', options: ['Dow Jones (30 Werte)', 'S&P 500', 'TecDAX', 'Euro Stoxx 50'], answer: 1, explanation: 'Der S&P 500 umfasst rund 500 große US-Unternehmen und ist marktkapitalisierungsgewichtet – deutlich repräsentativer als der preisgewichtete Dow Jones mit nur 30 Werten.' },
    { id: 'm01-q12', type: 'tf', lesson: 2, question: 'In einem nach Marktkapitalisierung gewichteten Index haben große Unternehmen mehr Einfluss als kleine.', answer: 0, explanation: 'Richtig. Das Gewicht hängt vom (frei handelbaren) Börsenwert ab.' },
  ],
  sources: [
    { label: 'Deutsche Börse – Wissen & Indizes', url: 'https://www.deutsche-boerse.com' },
    { label: 'Börse Frankfurt – Wissen', url: 'https://www.boerse-frankfurt.de/wissen' },
    { label: 'BaFin – Verbraucherinformationen zu Wertpapieren', url: 'https://www.bafin.de/DE/Verbraucher/verbraucher_node.html' },
    { label: 'S&P Dow Jones Indices – S&P 500', url: 'https://www.spglobal.com/spdji/en/indices/equity/sp-500/' },
  ],
};
