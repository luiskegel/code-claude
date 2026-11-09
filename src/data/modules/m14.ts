import type { Module } from '@/types';

export const m14: Module = {
  id: 'm14',
  number: 14,
  title: 'Fortgeschrittene Börsenthemen',
  subtitle: 'Rückkäufe, Insiderregeln, Leerverkäufe, Derivate, Crashs und Zyklen',
  category: 'boersenwissen',
  icon: 'Zap',
  description:
    'In diesem Modul lernst du Themen kennen, die in Nachrichten häufig vorkommen und die du verstehen solltest – auch wenn du viele der Produkte als Anfänger meiden solltest. Besonders riskante Produkte sind deutlich gekennzeichnet.',
  lessons: [
    {
      id: 'm14-l1',
      title: 'Aktienrückkäufe, Insiderhandel und Meldepflichten',
      minutes: 15,
      intro:
        'Wie geben Unternehmen Geld an Aktionäre zurück, außer über Dividenden? Und welche Regeln sorgen dafür, dass Insider ihr Wissen nicht ausnutzen? Diese Lektion erklärt beides.',
      sections: [
        {
          heading: 'Aktienrückkäufe',
          paragraphs: [
            'Bei einem **Aktienrückkauf** kauft ein Unternehmen eigene Aktien an der Börse zurück und zieht sie meist ein. Dadurch sinkt die Zahl der Aktien, und jeder verbleibende Aktionär besitzt einen größeren Anteil am Unternehmen. Der Gewinn je Aktie steigt, auch wenn der Gesamtgewinn gleich bleibt.',
            'Rückkäufe sind sinnvoll, wenn die Aktie günstig bewertet ist und das Unternehmen keine besseren Investitionsmöglichkeiten hat. Sie können aber auch Wert vernichten: wenn zu überhöhten Preisen gekauft wird, wenn sie mit Schulden finanziert werden oder wenn sie nur dazu dienen, den EPS – und damit oft Managementboni – zu erhöhen. Steuerlich sind Rückkäufe für Aktionäre in Deutschland oft günstiger als Dividenden, weil erst beim Verkauf Steuern anfallen.',
          ],
        },
        {
          heading: 'Insiderhandel',
          paragraphs: [
            '**Insiderhandel** bedeutet, Wertpapiere auf Basis nicht öffentlicher, kursrelevanter Informationen zu handeln, etwa vor der Bekanntgabe einer Übernahme. Insiderhandel ist in der EU nach der **Marktmissbrauchsverordnung (MAR)** verboten und wird in Deutschland strafrechtlich verfolgt (Wertpapierhandelsgesetz). Auch die Weitergabe solcher Informationen ist verboten.',
          ],
        },
        {
          heading: 'Meldepflichten: Directors’ Dealings und Stimmrechtsmitteilungen',
          paragraphs: [
            'Führungskräfte börsennotierter Unternehmen (Vorstand, Aufsichtsrat) und ihnen nahestehende Personen müssen eigene Geschäfte mit Aktien ihres Unternehmens melden, sobald ein Schwellenwert im Kalenderjahr überschritten ist – sogenannte **Directors’ Dealings** (Managers’ Transactions). Diese Meldungen sind öffentlich. Viele Anleger beobachten sie: Kaufen mehrere Vorstände mit eigenem Geld größere Pakete, kann das ein Zeichen von Zuversicht sein. Verkäufe haben dagegen oft private Gründe (Steuern, Hauskauf).',
            'Außerdem müssen Anleger melden, wenn sie bestimmte Stimmrechtsschwellen (in Deutschland u. a. 3 %, 5 %, 10 %) an einem Unternehmen über- oder unterschreiten (**Stimmrechtsmitteilungen**). Kursrelevante Informationen muss das Unternehmen unverzüglich per **Ad-hoc-Mitteilung** veröffentlichen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Wirkung eines Rückkaufs',
          text: 'Ein Unternehmen hat 100 Mio. Aktien und 500 Mio. € Gewinn (EPS 5 €). Es kauft 10 Mio. Aktien zurück und zieht sie ein. Bei gleichem Gewinn steigt der EPS auf 500 / 90 = 5,56 € (+11 %). Ob das gut war, hängt vom Preis ab: Hätte das Geld in profitablere Projekte investiert werden können?',
        },
        {
          title: 'Beispiel: Directors’ Dealings richtig lesen',
          text: 'Drei Vorstandsmitglieder kaufen innerhalb einer Woche Aktien für zusammen 2 Mio. € nach einem Kursrückgang. Das kann Zuversicht signalisieren, ist aber kein Beweis – auch Vorstände irren sich. Ein einzelner Verkauf eines Aufsichtsrats nach 15 Jahren sagt meist wenig aus.',
        },
      ],
      practice: [
        'Suche auf der Investor-Relations-Seite eines DAX-Unternehmens nach „Managers’ Transactions“ oder „Directors’ Dealings“.',
        'Prüfe, ob das Unternehmen derzeit ein Aktienrückkaufprogramm hat und wie es begründet wird.',
      ],
      terms: [
        { term: 'Aktienrückkauf', definition: 'Kauf eigener Aktien durch das Unternehmen.' },
        { term: 'Insiderhandel', definition: 'Verbotener Handel auf Basis nicht öffentlicher, kursrelevanter Informationen.' },
        { term: 'MAR', definition: 'EU-Marktmissbrauchsverordnung – regelt Insiderhandel und Marktmanipulation.' },
        { term: 'Directors’ Dealings', definition: 'Meldepflichtige Geschäfte von Führungskräften in eigenen Aktien.' },
        { term: 'Ad-hoc-Mitteilung', definition: 'Pflichtveröffentlichung kursrelevanter Insiderinformationen.' },
        { term: 'Stimmrechtsmitteilung', definition: 'Meldung beim Über- oder Unterschreiten von Beteiligungsschwellen.' },
      ],
      mistakes: [
        'Aktienrückkäufe immer positiv zu sehen.',
        'Einzelne Insiderverkäufe als Verkaufssignal zu interpretieren.',
        'Gerüchte über „Insiderwissen“ in Chats als Anlagegrundlage zu nutzen – das kann sogar strafbar sein.',
      ],
      summary: [
        'Rückkäufe reduzieren die Aktienzahl und erhöhen den Anteil der verbleibenden Aktionäre.',
        'Ihr Nutzen hängt vom Preis und von Alternativen ab.',
        'Insiderhandel ist verboten; Führungskräfte müssen eigene Geschäfte melden.',
        'Ad-hoc-Mitteilungen und Stimmrechtsmitteilungen schaffen Transparenz.',
      ],
      exercise: {
        title: 'Rückkauf durchrechnen',
        task: 'Ein Unternehmen hat 50 Mio. Aktien, Gewinn 200 Mio. €, Kurs 60 €. Es nutzt 300 Mio. € für Rückkäufe zum aktuellen Kurs. Wie verändert sich der EPS bei unverändertem Gewinn?',
        solution: 'Zurückgekaufte Aktien: 300 Mio. / 60 = 5 Mio. Neue Aktienzahl: 45 Mio. EPS vorher: 4 €, nachher: 200 / 45 ≈ 4,44 € (+11 %). Achtung: Die 300 Mio. € fehlen nun in der Kasse (oder wurden geliehen).',
      },
    },
    {
      id: 'm14-l2',
      title: 'Leerverkäufe, Short Squeeze, Optionen, Futures, Hebelprodukte und Margin Trading',
      minutes: 22,
      intro:
        'Derivate und Leerverkäufe ermöglichen es, auf fallende Kurse zu setzen, Risiken abzusichern oder mit Hebel zu spekulieren. Du solltest verstehen, wie sie funktionieren – und warum sie für Anfänger gefährlich sind.',
      riskNote:
        'Die in dieser Lektion beschriebenen Produkte (Leerverkäufe, Optionen, Futures, Hebelprodukte, Margin Trading) sind besonders riskant. Verluste können sehr schnell eintreten, teils das eingesetzte Kapital übersteigen. Anfänger sollten sie zunächst meiden.',
      sections: [
        {
          heading: 'Leerverkäufe',
          paragraphs: [
            'Bei einem **Leerverkauf** (Short Selling) verkauft man Aktien, die man nicht besitzt, sondern geliehen hat – in der Hoffnung, sie später günstiger zurückzukaufen und an den Verleiher zurückzugeben. Die Differenz ist der Gewinn. **Das Risiko ist theoretisch unbegrenzt**: Eine Aktie kann maximal auf 0 fallen (Gewinn maximal 100 %), aber unbegrenzt steigen. Zudem fallen Leihgebühren an.',
            'Leerverkäufer erfüllen auch eine Funktion: Sie decken manchmal Bilanzbetrug auf und tragen zur Preisfindung bei. In der EU müssen größere Netto-Leerverkaufspositionen ab 0,1 % des Aktienkapitals der Aufsicht gemeldet und ab 0,5 % veröffentlicht werden.',
          ],
        },
        {
          heading: 'Short Squeeze',
          paragraphs: [
            'Ein **Short Squeeze** entsteht, wenn eine stark leerverkaufte Aktie plötzlich steigt. Leerverkäufer müssen dann Aktien zurückkaufen, um ihre Verluste zu begrenzen – diese Käufe treiben den Kurs weiter nach oben, was weitere Leerverkäufer zum Eindecken zwingt. Es entstehen extreme Kurssprünge, die nichts mit dem Unternehmenswert zu tun haben. Bekanntes Beispiel: GameStop im Januar 2021. Wer in einen Squeeze hinein kauft, riskiert hohe Verluste, wenn er endet.',
          ],
        },
        {
          heading: 'Optionen',
          paragraphs: [
            'Eine **Option** gibt dem Käufer das **Recht**, aber nicht die Pflicht, einen Basiswert (z. B. eine Aktie) zu einem festgelegten Preis (**Basispreis**) bis zu oder an einem bestimmten Datum zu kaufen (**Call**) oder zu verkaufen (**Put**). Dafür zahlt er eine **Optionsprämie**. Der Verkäufer (Stillhalter) erhält die Prämie und hat die Pflicht, zu liefern oder abzunehmen.',
            'Optionen können zur Absicherung (z. B. Put als „Versicherung“ für ein Depot) oder zur Spekulation genutzt werden. Risiken: Für Käufer droht der Totalverlust der Prämie, wenn die Option wertlos verfällt; Stillhalter können sehr hohe Verluste erleiden. Optionspreise hängen von Kurs, Zeit, Volatilität und Zinsen ab – sie sind komplex.',
          ],
        },
        {
          heading: 'Futures',
          paragraphs: [
            'Ein **Future** ist ein verbindlicher Vertrag, einen Basiswert (Index, Rohstoff, Anleihe, Währung) zu einem festgelegten Preis an einem künftigen Termin zu kaufen oder zu verkaufen. Anders als bei Optionen besteht eine **Pflicht** für beide Seiten. Futures werden mit einer **Sicherheitsleistung (Margin)** gehandelt, was einen hohen Hebel erzeugt. Bei Verlusten müssen Sicherheiten nachgeschossen werden. Futures werden vor allem von Profis zur Absicherung genutzt.',
          ],
        },
        {
          heading: 'Hebelprodukte',
          paragraphs: [
            '**Hebelprodukte** wie Optionsscheine, Knock-out-Zertifikate, Faktor-Zertifikate und CFDs verstärken die Bewegungen des Basiswerts (siehe Modul 10). Sie sind meist Inhaberschuldverschreibungen der ausgebenden Bank – es besteht also zusätzlich ein **Emittentenrisiko**. Viele Produkte haben eine begrenzte Laufzeit und verlieren durch Zeitwertverlust oder Volatilität an Wert.',
          ],
        },
        {
          heading: 'Margin Trading',
          paragraphs: [
            'Beim **Margin Trading** handelst du mit geliehenem Geld des Brokers. Du hinterlegst nur einen Teil des Positionswerts als Sicherheit (Margin). Fällt die Position, sinkt die Sicherheit; unterschreitet sie eine Grenze, kommt ein **Margin Call** – du musst nachschießen, sonst wird die Position zwangsweise geschlossen. Verluste können so ein Vielfaches deines Eigenkapitals betragen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Leerverkauf mit Verlust',
          text: 'Du verkaufst 100 geliehene Aktien zu 20 € (Erlös 2.000 €). Statt zu fallen, steigt die Aktie nach einer Übernahmenachricht auf 45 €. Zum Rückkauf brauchst du 4.500 €. Verlust: 2.500 € plus Leihgebühren – mehr als dein ursprünglicher „Einsatz“.',
        },
        {
          title: 'Beispiel: Call-Option',
          text: 'Aktie bei 100 €. Du kaufst eine Call-Option mit Basispreis 110 € und 3 Monaten Laufzeit für 3 € Prämie. Steht die Aktie bei Fälligkeit bei 120 €, ist die Option 10 € wert (Gewinn 7 € oder +233 %). Steht sie bei 108 €, verfällt die Option wertlos – Totalverlust der 3 €, obwohl die Aktie gestiegen ist.',
        },
      ],
      practice: [
        'Lies die BaFin-Verbraucherinformationen zu Derivaten und Hebelprodukten.',
        'Berechne für die Call-Option aus dem Beispiel, ab welchem Aktienkurs bei Fälligkeit du keinen Verlust machst.',
      ],
      terms: [
        { term: 'Leerverkauf', definition: 'Verkauf geliehener Aktien in Erwartung fallender Kurse.' },
        { term: 'Short Squeeze', definition: 'Kursexplosion durch erzwungene Eindeckungskäufe von Leerverkäufern.' },
        { term: 'Option', definition: 'Recht, einen Basiswert zu einem festen Preis zu kaufen (Call) oder zu verkaufen (Put).' },
        { term: 'Future', definition: 'Verbindlicher Terminkontrakt über Kauf oder Verkauf eines Basiswerts.' },
        { term: 'Margin', definition: 'Sicherheitsleistung bei gehebelten Geschäften.' },
        { term: 'Emittentenrisiko', definition: 'Risiko, dass der Herausgeber eines Zertifikats zahlungsunfähig wird.' },
      ],
      mistakes: [
        'Leerverkäufe ohne Verständnis des unbegrenzten Verlustrisikos einzugehen.',
        'In einen laufenden Short Squeeze hinein zu kaufen.',
        'Optionen als „günstige Aktien“ zu betrachten.',
        'Margin-Konten zu nutzen, ohne einen Margin Call zu verstehen.',
      ],
      summary: [
        'Leerverkäufe setzen auf fallende Kurse – mit theoretisch unbegrenztem Risiko.',
        'Short Squeezes erzeugen extreme, kurzlebige Kurssprünge.',
        'Optionen sind Rechte, Futures Pflichten – beide mit hohem Hebel.',
        'Hebelprodukte und Margin Trading sind für Anfänger ungeeignet.',
      ],
      exercise: {
        title: 'Break-even einer Option',
        task: 'Call-Option: Basispreis 50 €, Prämie 2,50 €. Ab welchem Kurs bei Fälligkeit machst du Gewinn? Wie hoch ist der Gewinn bei 56 €?',
        solution: 'Break-even: 50 + 2,50 = 52,50 €. Bei 56 €: Wert 6 € − Prämie 2,50 € = 3,50 € Gewinn je Option (+140 %). Unter 50 € verfällt die Option wertlos (−100 %).',
      },
    },
    {
      id: 'm14-l3',
      title: 'Volatilitätsindizes, Börsencrashs und Marktzyklen',
      minutes: 16,
      intro:
        'Börsencrashs gehören zur Geschichte der Aktienmärkte. Wer weiß, wie sie ablaufen und wie Marktzyklen funktionieren, bleibt ruhiger, wenn es passiert.',
      riskNote:
        'Produkte, die direkt auf Volatilitätsindizes setzen (z. B. Volatilitäts-Futures oder -ETPs), sind hochspekulativ und können innerhalb kurzer Zeit nahezu ihren gesamten Wert verlieren.',
      sections: [
        {
          heading: 'Volatilitätsindizes',
          paragraphs: [
            '**Volatilitätsindizes** messen die vom Markt erwartete Schwankung der nächsten Wochen, abgeleitet aus Optionspreisen. Der bekannteste ist der **VIX** für den S&P 500, oft „Angstbarometer“ genannt. Für den Euro Stoxx 50 gibt es den **VSTOXX**, für den DAX den VDAX-NEW. Steigt die Angst, steigen die Preise für Absicherungen – und damit der Volatilitätsindex. Hohe Werte treten typischerweise in Crashs auf.',
          ],
        },
        {
          heading: 'Börsencrashs',
          paragraphs: [
            'Ein **Börsencrash** ist ein plötzlicher, sehr starker Kurseinbruch innerhalb kurzer Zeit. Bekannte Beispiele:',
          ],
          bullets: [
            '1929: Beginn der Weltwirtschaftskrise; der Dow Jones verlor bis 1932 fast 90 %.',
            '1987 („Schwarzer Montag“): Der Dow Jones fiel an einem Tag um rund 22 %.',
            '2000–2003: Platzen der Dotcom-Blase; Technologiewerte verloren teils über 90 %.',
            '2007–2009: Finanzkrise nach dem US-Immobilienboom und der Pleite von Lehman Brothers.',
            '2020: Corona-Crash – einer der schnellsten Einbrüche der Geschichte, gefolgt von einer schnellen Erholung.',
          ],
        },
        {
          heading: 'Marktzyklen',
          paragraphs: [
            'Aktienmärkte bewegen sich in **Zyklen** aus Bullenmärkten (steigende Kurse, Optimismus) und Bärenmärkten (fallende Kurse, oft definiert als Rückgang von mehr als 20 % vom Hoch). Eine **Korrektur** ist ein Rückgang von etwa 10–20 %. Korrekturen kommen in vielen Jahren vor, Bärenmärkte seltener. Bullenmärkte dauerten historisch im Durchschnitt deutlich länger als Bärenmärkte.',
            'Niemand kann zuverlässig vorhersagen, wann ein Zyklus endet. Statt Crashs vorherzusagen, ist es sinnvoller, darauf **vorbereitet** zu sein: mit einem Notgroschen, passender Aufteilung, breiter Streuung und einem Plan.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: VIX in der Krise',
          text: 'In ruhigen Marktphasen liegt der VIX oft zwischen 12 und 20. Im März 2020 stieg er zeitweise auf über 80 – ein Zeichen extremer Angst. Wenige Monate später lag er wieder deutlich niedriger, während die Kurse sich erholt hatten.',
        },
        {
          title: 'Beispiel: Vorbereitung statt Vorhersage',
          text: 'Anna hat sechs Monatsausgaben als Notgroschen, 60 % Aktien-ETF und 40 % Tagesgeld. Als der Markt um 35 % fällt, sinkt ihr Gesamtvermögen um 21 %. Sie muss nichts verkaufen und kann per Rebalancing sogar nachkaufen. Ihr Kollege, voll investiert und ohne Rücklagen, muss nach einer Autoreparatur Aktien mit Verlust verkaufen.',
        },
      ],
      practice: [
        'Schau dir einen langfristigen Chart des S&P 500 oder DAX an (logarithmische Skala) und markiere die großen Crashs.',
        'Simuliere im virtuellen Depot mehrere Jahre und beobachte, wie oft Korrekturen auftreten.',
      ],
      terms: [
        { term: 'VIX', definition: 'Volatilitätsindex für den S&P 500, „Angstbarometer“.' },
        { term: 'Börsencrash', definition: 'Plötzlicher, sehr starker Kurseinbruch.' },
        { term: 'Bullenmarkt', definition: 'Längere Phase steigender Kurse.' },
        { term: 'Bärenmarkt', definition: 'Phase fallender Kurse, oft mehr als 20 % unter dem Hoch.' },
        { term: 'Korrektur', definition: 'Rückgang um etwa 10–20 % vom Hoch.' },
      ],
      mistakes: [
        'Crashs vorhersagen zu wollen und deshalb jahrelang nicht zu investieren.',
        'Auf Volatilitätsprodukte zu spekulieren.',
        'Ohne Notgroschen voll in Aktien zu investieren.',
      ],
      summary: [
        'Volatilitätsindizes messen die erwartete Schwankung und steigen in Krisen.',
        'Crashs sind Teil der Börsengeschichte – breite Märkte haben sich bisher erholt, teils nach langer Zeit.',
        'Bullen- und Bärenmärkte wechseln sich ab.',
        'Vorbereitung ist wichtiger als Vorhersage.',
      ],
      exercise: {
        title: 'Korrektur oder Bärenmarkt?',
        task: 'Index-Hoch: 18.000 Punkte. Tief: (a) 16.500, (b) 15.200, (c) 13.900. Ordne zu.',
        solution: '(a) −8,3 %: normaler Rücksetzer. (b) −15,6 %: Korrektur. (c) −22,8 %: Bärenmarkt.',
      },
      widget: 'drawdown',
    },
  ],
  quiz: [
    { id: 'm14-q1', type: 'calc', lesson: 0, question: 'Ein Unternehmen hat 200 Mio. Aktien und 1 Mrd. € Gewinn. Nach einem Rückkauf sind es 180 Mio. Aktien. Wie hoch ist der neue EPS bei gleichem Gewinn?', options: ['5,00 €', '5,56 €', '4,50 €', '6,00 €'], answer: 1, explanation: '1.000 / 180 ≈ 5,56 € (vorher 5,00 €).' },
    { id: 'm14-q2', type: 'tf', lesson: 0, question: 'Insiderhandel ist in der EU erlaubt, solange man den Gewinn versteuert.', answer: 1, explanation: 'Falsch. Insiderhandel ist nach der Marktmissbrauchsverordnung verboten und strafbar.' },
    { id: 'm14-q3', type: 'mc', lesson: 0, question: 'Was sind Directors’ Dealings?', options: ['Geheime Absprachen zwischen Vorständen', 'Meldepflichtige Aktiengeschäfte von Führungskräften in eigenen Aktien', 'Dividendenzahlungen an Vorstände', 'Ein Ordertyp'], answer: 1, explanation: 'Führungskräfte müssen eigene Geschäfte oberhalb einer Schwelle öffentlich melden.' },
    { id: 'm14-q4', type: 'mc', lesson: 1, question: 'Warum ist das Verlustrisiko beim Leerverkauf theoretisch unbegrenzt?', options: ['Weil eine Aktie unbegrenzt steigen kann', 'Weil Aktien nicht unter null fallen können', 'Weil der Staat Verluste übernimmt', 'Es ist begrenzt auf 10 %'], answer: 0, explanation: 'Der Leerverkäufer muss zurückkaufen – und der Kurs hat nach oben keine Grenze.' },
    { id: 'm14-q5', type: 'mc', lesson: 1, question: 'Was unterscheidet eine Option von einem Future?', options: ['Optionen sind ein Recht, Futures eine Pflicht', 'Futures sind immer risikolos', 'Optionen gibt es nur auf Rohstoffe', 'Kein Unterschied'], answer: 0, explanation: 'Der Optionskäufer hat ein Recht, beim Future sind beide Seiten verpflichtet.' },
    { id: 'm14-q6', type: 'calc', lesson: 1, question: 'Call mit Basispreis 80 €, Prämie 4 €. Bei Fälligkeit steht die Aktie bei 82 €. Wie hoch ist der Gewinn/Verlust je Option?', options: ['+2 €', '−2 €', '+6 €', '−4 €'], answer: 1, explanation: 'Wert 2 € − Prämie 4 € = −2 €.' },
    { id: 'm14-q7', type: 'case', lesson: 1, question: 'Eine stark leerverkaufte Aktie steigt an einem Tag um 60 %, Foren rufen zum Kauf auf. Was passiert wahrscheinlich?', options: ['Ein Short Squeeze – mit hohem Risiko für späte Käufer', 'Eine sichere Gewinnchance', 'Eine Dividendenzahlung', 'Ein Börsengang'], answer: 0, explanation: 'Short Squeezes sind kurzlebig; späte Käufer erleiden oft hohe Verluste.' },
    { id: 'm14-q8', type: 'mc', lesson: 1, question: 'Was ist ein Margin Call?', options: ['Ein Anruf des Kundenservice', 'Die Aufforderung, zusätzliche Sicherheiten zu hinterlegen', 'Eine Dividendenankündigung', 'Ein Kaufsignal'], answer: 1, explanation: 'Sinkt die hinterlegte Sicherheit unter eine Grenze, muss nachgeschossen werden.' },
    { id: 'm14-q9', type: 'mc', lesson: 2, question: 'Was misst der VIX?', options: ['Die Dividendenrendite des S&P 500', 'Die vom Markt erwartete Schwankung des S&P 500', 'Die Inflation in den USA', 'Den Umsatz der Börse'], answer: 1, explanation: 'Der VIX wird aus Optionspreisen abgeleitet und misst die erwartete Volatilität.' },
    { id: 'm14-q10', type: 'calc', lesson: 2, question: 'Ein Index fällt von 10.000 auf 7.600 Punkte. Wie wird diese Phase meist bezeichnet?', options: ['Normale Schwankung', 'Korrektur', 'Bärenmarkt', 'Bullenmarkt'], answer: 2, explanation: '−24 % – mehr als 20 % unter dem Hoch gilt häufig als Bärenmarkt.' },
    { id: 'm14-q11', type: 'tf', lesson: 2, question: 'Crashs lassen sich mit ausreichend Erfahrung zuverlässig vorhersagen.', answer: 1, explanation: 'Falsch. Zeitpunkt und Ausmaß von Crashs sind nicht zuverlässig vorhersagbar. Vorbereitung ist wichtiger.' },
  ],
  sources: [
    { label: 'BaFin – Marktmissbrauch und Insiderrecht', url: 'https://www.bafin.de/DE/Aufsicht/BoersenMaerkte/boersenmaerkte_node.html' },
    { label: 'BaFin – Leerverkäufe (Netto-Leerverkaufspositionen)', url: 'https://www.bafin.de' },
    { label: 'ESMA – Short Selling Regulation', url: 'https://www.esma.europa.eu' },
    { label: 'Cboe – VIX Index', url: 'https://www.cboe.com/tradable_products/vix/' },
  ],
};
