import type { Module } from '@/types';

export const m12: Module = {
  id: 'm12',
  number: 12,
  title: 'Wirtschaft und Börsenwissen',
  subtitle: 'Inflation, Zinsen, Zentralbanken, Konjunktur und Nachrichten',
  category: 'boersenwissen',
  icon: 'Globe2',
  description:
    'Aktienkurse hängen nicht nur von Unternehmen ab, sondern auch von der gesamten Wirtschaft. Du lernst die wichtigsten volkswirtschaftlichen Begriffe kennen und verstehst, warum die Börse auf Zinsentscheidungen, Inflationsdaten und Arbeitsmarktzahlen reagiert.',
  lessons: [
    {
      id: 'm12-l1',
      title: 'Inflation, Zinsen, Leitzinsen, EZB und Federal Reserve',
      minutes: 18,
      intro:
        'Inflation und Zinsen gehören zu den wichtigsten Einflussfaktoren für die Börse. Diese Lektion erklärt, was dahintersteckt und welche Rolle die Zentralbanken spielen.',
      sections: [
        {
          heading: 'Inflation',
          paragraphs: [
            '**Inflation** ist der allgemeine Anstieg der Preise für Waren und Dienstleistungen über die Zeit. Steigen die Preise um 3 % pro Jahr, kannst du dir mit 100 € nach einem Jahr nur noch so viel kaufen wie vorher mit etwa 97 €. Man spricht vom Verlust an **Kaufkraft**. In Deutschland wird die Inflation vom Statistischen Bundesamt (Destatis) mit dem Verbraucherpreisindex (VPI) gemessen, für die Eurozone von Eurostat mit dem Harmonisierten Verbraucherpreisindex (HVPI).',
            'Für Anleger ist entscheidend: Geld, das auf einem unverzinsten Konto liegt, verliert real an Wert. Die **Realrendite** ist die Rendite nach Abzug der Inflation. Sachwerte wie Unternehmensanteile können Preissteigerungen über die Zeit teilweise weitergeben – kurzfristig leiden Aktien aber oft unter hoher Inflation, weil die Zinsen steigen.',
          ],
          formula: 'Realrendite ≈ Nominalrendite − Inflationsrate',
        },
        {
          heading: 'Zinsen',
          paragraphs: [
            '**Zinsen** sind der Preis für geliehenes Geld. Wer Geld verleiht, bekommt Zinsen; wer sich Geld leiht, zahlt sie. Zinsen beeinflussen Aktien auf mehreren Wegen: Höhere Zinsen verteuern Kredite für Unternehmen und Verbraucher, machen sichere Anlagen wie Tagesgeld oder Anleihen attraktiver und senken den heutigen Wert künftiger Gewinne. Besonders Wachstumsaktien, deren Gewinne weit in der Zukunft liegen, reagieren empfindlich auf Zinsänderungen.',
          ],
        },
        {
          heading: 'Leitzinsen',
          paragraphs: [
            '**Leitzinsen** sind die Zinssätze, zu denen sich Geschäftsbanken bei der Zentralbank Geld leihen oder dort Geld anlegen können. Sie beeinflussen indirekt alle anderen Zinsen in der Wirtschaft: Kreditzinsen, Tagesgeldzinsen, Hypothekenzinsen. Senkt die Zentralbank die Leitzinsen, wird Geld billiger – das soll die Wirtschaft anregen. Erhöht sie die Leitzinsen, wird Geld teurer – das soll die Inflation dämpfen.',
          ],
        },
        {
          heading: 'Die Europäische Zentralbank (EZB)',
          paragraphs: [
            'Die **EZB** mit Sitz in Frankfurt am Main ist für die Geldpolitik der Eurozone zuständig. Ihr vorrangiges Ziel ist **Preisstabilität**, die sie als Inflationsrate von **2 % mittelfristig** definiert. Der EZB-Rat entscheidet etwa alle sechs Wochen über die Leitzinsen, darunter den **Einlagesatz** (Zins für Einlagen der Banken bei der Zentralbank) und den Hauptrefinanzierungssatz. Die Deutsche Bundesbank ist Teil des Eurosystems.',
          ],
        },
        {
          heading: 'Die Federal Reserve (Fed)',
          paragraphs: [
            'Die **Federal Reserve** ist die Zentralbank der USA. Sie hat ein doppeltes Mandat: **Preisstabilität** (ebenfalls ein Inflationsziel von 2 %) und **maximale Beschäftigung**. Ihr wichtigster Zins ist die **Federal Funds Rate**. Wegen der Größe des US-Marktes und der Rolle des US-Dollars beeinflussen Fed-Entscheidungen die Börsen weltweit. Das Entscheidungsgremium heißt Federal Open Market Committee (FOMC).',
            'Aktuelle Leitzinsen und Inflationsraten findest du immer direkt auf den Seiten der EZB (ecb.europa.eu), der Fed (federalreserve.gov), der Bundesbank und von Destatis. Diese App zeigt bewusst keine aktuellen Werte an, um keine veralteten Daten zu verbreiten.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Kaufkraftverlust',
          text: 'Bei 3 % Inflation pro Jahr sind 10.000 € nach 10 Jahren real nur noch etwa 7.441 € wert, nach 20 Jahren etwa 5.537 €. Wer sein Geld auf einem Girokonto ohne Zinsen hält, verliert also Jahr für Jahr Kaufkraft (Modellrechnung).',
        },
        {
          title: 'Beispiel: Zinsen und Wachstumsaktien',
          text: 'Ein Unternehmen soll in 10 Jahren 100 € Gewinn je Aktie erzielen. Bei einem Diskontzins von 3 % ist dieser Gewinn heute etwa 74 € wert, bei 6 % nur noch etwa 56 €. Steigen die Zinsen, sinkt der heutige Wert ferner Gewinne – deshalb fallen Wachstumsaktien bei Zinserhöhungen oft besonders stark.',
        },
      ],
      practice: [
        'Probiere den Inflationsrechner unten aus: Wie viel Kaufkraft verlieren 10.000 € in 10, 20 und 30 Jahren bei 2 %, 3 % und 5 % Inflation?',
        'Schau auf ecb.europa.eu nach, wann die nächste geldpolitische Sitzung des EZB-Rats stattfindet.',
      ],
      terms: [
        { term: 'Inflation', definition: 'Allgemeiner Anstieg des Preisniveaus.' },
        { term: 'Kaufkraft', definition: 'Menge an Gütern, die man für einen Geldbetrag kaufen kann.' },
        { term: 'Realrendite', definition: 'Rendite nach Abzug der Inflation.' },
        { term: 'Leitzins', definition: 'Zinssatz der Zentralbank für Geschäfte mit Banken.' },
        { term: 'EZB', definition: 'Europäische Zentralbank – zuständig für die Geldpolitik im Euroraum.' },
        { term: 'Federal Reserve', definition: 'Zentralbank der USA.' },
        { term: 'HVPI', definition: 'Harmonisierter Verbraucherpreisindex zur Messung der Inflation in der EU.' },
      ],
      mistakes: [
        'Nominale Renditen ohne Inflation zu betrachten.',
        'Zu glauben, Aktien schützten kurzfristig zuverlässig vor Inflation.',
        'Veraltete Zinssätze aus alten Artikeln zu übernehmen.',
      ],
      summary: [
        'Inflation verringert die Kaufkraft; entscheidend ist die Realrendite.',
        'Zinsen beeinflussen Unternehmensgewinne, Bewertungen und alternative Anlagen.',
        'Leitzinsen steuern indirekt alle Zinsen in der Wirtschaft.',
        'EZB und Fed verfolgen ein Inflationsziel von 2 %; die Fed zusätzlich maximale Beschäftigung.',
      ],
      exercise: {
        title: 'Realrendite berechnen',
        task: 'Dein Tagesgeld bringt 2 % Zinsen, die Inflation beträgt 2,5 %. Dein ETF brachte 7 %. Berechne jeweils die ungefähre Realrendite.',
        solution: 'Tagesgeld: 2 % − 2,5 % ≈ −0,5 % (realer Kaufkraftverlust). ETF: 7 % − 2,5 % ≈ 4,5 %. Beide Werte vor Steuern.',
      },
      widget: 'inflation',
    },
    {
      id: 'm12-l2',
      title: 'BIP, Wirtschaftswachstum, Rezession, Arbeitslosigkeit und Konjunkturzyklen',
      minutes: 16,
      intro:
        'Die Wirtschaft bewegt sich in Wellen. Wer die wichtigsten Konjunkturdaten kennt, versteht besser, warum bestimmte Branchen in bestimmten Phasen stärker oder schwächer sind.',
      sections: [
        {
          heading: 'Bruttoinlandsprodukt (BIP)',
          paragraphs: [
            'Das **Bruttoinlandsprodukt** ist der Gesamtwert aller Waren und Dienstleistungen, die in einem Land innerhalb eines Zeitraums hergestellt werden. Es ist der wichtigste Maßstab für die Größe einer Volkswirtschaft. In Deutschland veröffentlicht Destatis die BIP-Zahlen vierteljährlich.',
          ],
        },
        {
          heading: 'Wirtschaftswachstum',
          paragraphs: [
            '**Wirtschaftswachstum** ist die prozentuale Veränderung des (preisbereinigten) BIP. Wächst die Wirtschaft, steigen meist Unternehmensumsätze und -gewinne. Langfristiges Wachstum entsteht durch mehr Arbeitskräfte, mehr Kapital und vor allem durch höhere Produktivität (technischer Fortschritt).',
          ],
        },
        {
          heading: 'Rezession',
          paragraphs: [
            'Eine **Rezession** ist ein deutlicher, länger anhaltender Rückgang der Wirtschaftsleistung. Eine gängige Faustregel spricht von einer „technischen Rezession“, wenn das BIP zwei Quartale in Folge schrumpft. In einer Rezession sinken häufig Unternehmensgewinne, die Arbeitslosigkeit steigt, und Aktienkurse fallen – oft schon **bevor** die Rezession offiziell festgestellt wird, weil die Börse Entwicklungen vorwegnimmt.',
          ],
        },
        {
          heading: 'Arbeitslosenquote',
          paragraphs: [
            'Die **Arbeitslosenquote** gibt den Anteil der Arbeitslosen an allen Erwerbspersonen an. In Deutschland veröffentlicht die Bundesagentur für Arbeit monatlich Zahlen, in den USA das Bureau of Labor Statistics (der viel beachtete monatliche Arbeitsmarktbericht). Eine sehr niedrige Arbeitslosigkeit kann Löhne und Inflation antreiben, steigende Arbeitslosigkeit deutet auf eine Abschwächung hin.',
          ],
        },
        {
          heading: 'Konjunkturzyklen',
          paragraphs: [
            'Die Wirtschaft durchläuft **Konjunkturzyklen** mit vier Phasen: **Aufschwung** (Expansion), **Hochkonjunktur** (Boom), **Abschwung** (Rezession) und **Tiefphase** (Depression/Talsohle). Verschiedene Branchen reagieren unterschiedlich:',
          ],
          bullets: [
            'Zyklische Branchen (Auto, Industrie, Rohstoffe, Luxusgüter, Banken) profitieren im Aufschwung und leiden im Abschwung stark.',
            'Defensive Branchen (Lebensmittel, Haushaltswaren, Gesundheit, Versorger) sind weniger konjunkturabhängig, weil ihre Produkte immer gebraucht werden.',
            'Die Börse läuft der Wirtschaft oft um 6–12 Monate voraus – sie steigt häufig schon, wenn die Wirtschaftsdaten noch schlecht sind.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Zyklisch vs. defensiv',
          text: 'In einem Abschwung verschieben Unternehmen Investitionen, Verbraucher kaufen weniger Autos. Der fiktive Stahlhersteller Alpenstahl verliert 40 % seines Gewinns. Der fiktive Lebensmittelkonzern Meridian Food & Life verkauft weiterhin Zahnpasta und Nudeln, der Gewinn sinkt nur um 3 %. Entsprechend unterschiedlich entwickeln sich die Aktien.',
        },
        {
          title: 'Beispiel: Die Börse ist schneller',
          text: 'Ein Land rutscht in eine Rezession. Der Aktienindex hat bereits sechs Monate vor der offiziellen Bestätigung 25 % verloren. Als die Rezession offiziell verkündet wird, beginnt der Index bereits wieder zu steigen, weil Anleger die Erholung vorwegnehmen.',
        },
      ],
      practice: [
        'Ordne die fiktiven Unternehmen im virtuellen Depot in zyklisch und defensiv ein.',
        'Suche auf destatis.de die jüngste BIP-Veröffentlichung für Deutschland.',
      ],
      terms: [
        { term: 'BIP', definition: 'Bruttoinlandsprodukt – Gesamtwert der produzierten Waren und Dienstleistungen.' },
        { term: 'Wirtschaftswachstum', definition: 'Prozentuale Veränderung des preisbereinigten BIP.' },
        { term: 'Rezession', definition: 'Deutlicher, anhaltender Rückgang der Wirtschaftsleistung.' },
        { term: 'Arbeitslosenquote', definition: 'Anteil der Arbeitslosen an allen Erwerbspersonen.' },
        { term: 'Konjunkturzyklus', definition: 'Wellenförmige Entwicklung der Wirtschaft mit Auf- und Abschwüngen.' },
        { term: 'Zyklische Aktie', definition: 'Aktie, deren Gewinne stark von der Konjunktur abhängen.' },
        { term: 'Defensive Aktie', definition: 'Aktie mit konjunkturunabhängigeren Gewinnen.' },
      ],
      mistakes: [
        'Erst zu verkaufen, wenn die Rezession offiziell ist – die Börse hat dann oft schon reagiert.',
        'Zyklische Aktien bei niedrigem KGV in der Hochkonjunktur für günstig zu halten.',
        'Wirtschaftsprognosen für sichere Vorhersagen zu halten.',
      ],
      summary: [
        'Das BIP misst die Wirtschaftsleistung, sein Wachstum die Dynamik.',
        'Rezessionen drücken Gewinne und Kurse, die Börse nimmt Entwicklungen vorweg.',
        'Die Arbeitslosenquote zeigt die Lage am Arbeitsmarkt.',
        'Zyklische und defensive Branchen reagieren unterschiedlich auf Konjunkturphasen.',
      ],
      exercise: {
        title: 'Konjunkturphase zuordnen',
        task: 'Welche Phase beschreibt die Situation? Arbeitslosigkeit sehr niedrig, Löhne und Inflation steigen stark, Fabriken voll ausgelastet, Zentralbank erhöht die Zinsen.',
        solution: 'Hochkonjunktur (Boom). Typisch ist, dass die Zentralbank die Zinsen erhöht, um eine Überhitzung zu verhindern – was oft den nächsten Abschwung einleitet.',
      },
    },
    {
      id: 'm12-l3',
      title: 'Geldpolitik und wie Nachrichten Aktien beeinflussen',
      minutes: 15,
      intro:
        'Jeden Tag erscheinen tausende Wirtschaftsnachrichten. Nur wenige davon sind für langfristige Anleger relevant. Hier lernst du, Geldpolitik zu verstehen und Nachrichten richtig einzuordnen.',
      sections: [
        {
          heading: 'Was ist Geldpolitik?',
          paragraphs: [
            '**Geldpolitik** umfasst alle Maßnahmen einer Zentralbank, um Geldmenge und Zinsen zu steuern. Neben den Leitzinsen gibt es weitere Instrumente:',
          ],
          bullets: [
            'Expansive (lockere) Geldpolitik: Zinssenkungen und Anleihekäufe (Quantitative Easing, QE) – Geld wird billiger, die Wirtschaft soll angeregt werden. Oft positiv für Aktien.',
            'Restriktive (straffe) Geldpolitik: Zinserhöhungen und Abbau der Anleihebestände (Quantitative Tightening, QT) – Geld wird teurer, die Inflation soll gedämpft werden. Oft belastend für Aktien.',
            'Forward Guidance: Die Zentralbank kündigt an, wie sie sich künftig verhalten will. Schon Worte können Märkte bewegen.',
          ],
        },
        {
          heading: 'Wie Nachrichten Aktien beeinflussen',
          paragraphs: [
            'Märkte reagieren auf **Überraschungen**, nicht auf bekannte Informationen. Entscheidend ist der Vergleich mit den Erwartungen (Konsens). Wichtige Arten von Nachrichten:',
          ],
          bullets: [
            'Unternehmensnachrichten: Quartalszahlen, Prognosen, Übernahmen, Managementwechsel, Rechtsstreitigkeiten (Ad-hoc-Meldungen).',
            'Makrodaten: Inflation, Arbeitsmarkt, BIP, Einkaufsmanagerindizes, Zinsentscheidungen.',
            'Politische Ereignisse: Wahlen, Zölle, Sanktionen, Regulierung.',
            'Unvorhersehbare Schocks: Pandemien, Kriege, Naturkatastrophen.',
          ],
        },
        {
          heading: 'Nachrichten richtig einordnen',
          paragraphs: [
            'Für langfristige Anleger gilt: Die meisten Nachrichten haben nur kurzfristige Auswirkungen. Hilfreiche Fragen: Verändert die Nachricht die **langfristige Ertragskraft** des Unternehmens? Ist sie wirklich neu oder bereits eingepreist? Stammt sie aus einer seriösen Primärquelle (Ad-hoc-Meldung, Geschäftsbericht, Zentralbank) oder aus Gerüchten?',
            'Vorsicht vor reißerischen Schlagzeilen („Crash-Alarm!“, „Diese Aktie explodiert!“). Medien leben von Aufmerksamkeit. Sachliche Primärquellen sind die bessere Grundlage.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Zinsentscheidung und Erwartung',
          text: 'Alle Analysten erwarten, dass die EZB den Leitzins um 0,25 Prozentpunkte senkt. Die EZB senkt um genau 0,25 Punkte – die Börse reagiert kaum. Kündigt die EZB-Präsidentin aber gleichzeitig an, dass vorerst keine weiteren Senkungen folgen, können die Kurse fallen, obwohl der Zins gesenkt wurde.',
        },
        {
          title: 'Beispiel: Kurzfristige Nachricht',
          text: 'Ein Konsumgüterkonzern meldet einen Rückruf eines Produkts, das 0,5 % des Umsatzes ausmacht. Die Aktie fällt um 6 %. Für die langfristige Ertragskraft ist der Rückruf vermutlich unbedeutend – ein langfristiger Anleger muss nicht reagieren, sollte aber prüfen, ob der Vorfall auf tieferliegende Probleme (z. B. Qualitätskontrolle) hindeutet.',
        },
      ],
      practice: [
        'Lies eine aktuelle Pressemitteilung der EZB zur Geldpolitik und fasse sie in drei Sätzen zusammen.',
        'Wähle eine Schlagzeile und beurteile: Ändert sie die langfristige Ertragskraft? Ist sie neu oder eingepreist?',
      ],
      terms: [
        { term: 'Geldpolitik', definition: 'Steuerung von Zinsen und Geldmenge durch die Zentralbank.' },
        { term: 'Expansive Geldpolitik', definition: 'Lockerung durch Zinssenkungen oder Anleihekäufe.' },
        { term: 'Restriktive Geldpolitik', definition: 'Straffung durch Zinserhöhungen oder Bilanzabbau.' },
        { term: 'Quantitative Easing', definition: 'Ankauf von Anleihen durch die Zentralbank zur Lockerung.' },
        { term: 'Forward Guidance', definition: 'Ankündigungen der Zentralbank zur künftigen Geldpolitik.' },
        { term: 'Konsens', definition: 'Durchschnittliche Erwartung von Analysten.' },
      ],
      mistakes: [
        'Auf jede Schlagzeile mit Käufen oder Verkäufen zu reagieren.',
        'Nachrichten nicht mit den Erwartungen zu vergleichen.',
        'Gerüchte und Social-Media-Beiträge für verlässliche Quellen zu halten.',
      ],
      summary: [
        'Expansive Geldpolitik stützt oft die Börse, restriktive belastet sie oft.',
        'Märkte reagieren auf Überraschungen gegenüber den Erwartungen.',
        'Die meisten Nachrichten sind für Langfristanleger kurzfristiges Rauschen.',
        'Primärquellen sind verlässlicher als Schlagzeilen.',
      ],
      exercise: {
        title: 'Nachricht bewerten',
        task: 'Schlagzeile: „Inflation steigt auf 2,8 % – Märkte im Minus“. Der Konsens hatte 2,4 % erwartet. Erkläre die Marktreaktion.',
        solution: 'Die Inflation lag über den Erwartungen. Anleger rechnen deshalb damit, dass die Zentralbank die Zinsen länger hoch halten oder erhöhen muss – das belastet die Bewertungen von Aktien. Nicht die absolute Zahl, sondern die Überraschung gegenüber dem Konsens bewegt die Kurse.',
      },
    },
  ],
  quiz: [
    { id: 'm12-q1', type: 'calc', lesson: 0, question: 'Dein Depot bringt nominal 6 %, die Inflation beträgt 2 %. Wie hoch ist die Realrendite ungefähr?', options: ['8 %', '4 %', '3 %', '2 %'], answer: 1, explanation: 'Realrendite ≈ 6 % − 2 % = 4 %.' },
    { id: 'm12-q2', type: 'mc', lesson: 0, question: 'Welches Inflationsziel verfolgt die EZB?', options: ['0 %', '2 % mittelfristig', '5 %', 'Kein Ziel'], answer: 1, explanation: 'Die EZB strebt eine Inflation von 2 % auf mittlere Sicht an.' },
    { id: 'm12-q3', type: 'mc', lesson: 0, question: 'Welches zusätzliche Ziel hat die US-Notenbank Fed neben der Preisstabilität?', options: ['Hohe Aktienkurse', 'Maximale Beschäftigung', 'Einen schwachen Dollar', 'Niedrige Steuern'], answer: 1, explanation: 'Die Fed hat ein doppeltes Mandat: Preisstabilität und maximale Beschäftigung.' },
    { id: 'm12-q4', type: 'case', lesson: 0, question: 'Die Zinsen steigen deutlich. Welche Aktien geraten typischerweise besonders unter Druck?', options: ['Wachstumsaktien mit Gewinnen weit in der Zukunft', 'Aktien von Unternehmen ohne Schulden mit sofortigen Gewinnen', 'Keine', 'Nur Penny Stocks'], answer: 0, explanation: 'Steigende Zinsen senken den heutigen Wert ferner Gewinne – Wachstumsaktien leiden besonders.' },
    { id: 'm12-q5', type: 'mc', lesson: 1, question: 'Was ist eine „technische Rezession“ nach gängiger Faustregel?', options: ['Ein Börsenrückgang um 10 %', 'Zwei Quartale in Folge mit schrumpfendem BIP', 'Ein Computerausfall an der Börse', 'Eine steigende Inflation'], answer: 1, explanation: 'Zwei aufeinanderfolgende Quartale mit negativem Wachstum gelten als technische Rezession.' },
    { id: 'm12-q6', type: 'mc', lesson: 1, question: 'Welche Branche gilt als eher defensiv?', options: ['Automobilbau', 'Lebensmittel und Haushaltswaren', 'Stahl', 'Luxusgüter'], answer: 1, explanation: 'Lebensmittel und Haushaltswaren werden auch in Krisen gekauft.' },
    { id: 'm12-q7', type: 'tf', lesson: 1, question: 'Die Börse reagiert oft schon, bevor eine Rezession offiziell festgestellt wird.', answer: 0, explanation: 'Richtig. Die Börse nimmt Entwicklungen vorweg und läuft der Wirtschaft häufig voraus.' },
    { id: 'm12-q8', type: 'mc', lesson: 1, question: 'Was misst das Bruttoinlandsprodukt?', options: ['Die Börsenkapitalisierung eines Landes', 'Den Wert aller in einem Land produzierten Waren und Dienstleistungen', 'Die Staatsschulden', 'Die Inflation'], answer: 1, explanation: 'Das BIP ist der Gesamtwert der Wirtschaftsleistung in einem Zeitraum.' },
    { id: 'm12-q9', type: 'mc', lesson: 2, question: 'Was ist Quantitative Easing (QE)?', options: ['Ein Steuersystem', 'Anleihekäufe der Zentralbank zur Lockerung der Geldpolitik', 'Eine Börsenregel', 'Ein Ordertyp'], answer: 1, explanation: 'Bei QE kauft die Zentralbank Anleihen, um Zinsen zu drücken und die Wirtschaft zu stützen.' },
    { id: 'm12-q10', type: 'case', lesson: 2, question: 'Die Arbeitslosenzahlen sind schlecht, aber genau so schlecht wie erwartet. Wie reagiert der Markt typischerweise?', options: ['Starker Crash', 'Kaum Reaktion, da die Information eingepreist war', 'Starker Anstieg um 20 %', 'Handelsstopp'], answer: 1, explanation: 'Märkte reagieren vor allem auf Überraschungen gegenüber den Erwartungen.' },
    { id: 'm12-q11', type: 'tf', lesson: 2, question: 'Langfristige Anleger sollten auf jede wichtige Schlagzeile mit einem Trade reagieren.', answer: 1, explanation: 'Falsch. Die meisten Nachrichten ändern die langfristige Ertragskraft nicht.' },
  ],
  sources: [
    { label: 'Europäische Zentralbank – Geldpolitik', url: 'https://www.ecb.europa.eu/mopo/html/index.de.html' },
    { label: 'Deutsche Bundesbank – Geldpolitik erklärt', url: 'https://www.bundesbank.de/de/aufgaben/geldpolitik' },
    { label: 'Federal Reserve – Monetary Policy', url: 'https://www.federalreserve.gov/monetarypolicy.htm' },
    { label: 'Destatis – Inflation und BIP', url: 'https://www.destatis.de' },
  ],
};
