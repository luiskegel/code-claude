import type { Module } from '@/types';

export const m09: Module = {
  id: 'm09',
  number: 9,
  title: 'ETFs verstehen',
  subtitle: 'Indexfonds, MSCI World, FTSE All-World, Kosten und Risiken',
  category: 'aktien-verstehen',
  icon: 'Layers',
  description:
    'ETFs sind für viele Anleger der einfachste Weg, breit gestreut an der Börse zu investieren. Du lernst, wie sie funktionieren, welche Indizes dahinterstecken, welche Varianten es gibt, wie man Kosten vergleicht und welche Risiken bleiben.',
  lessons: [
    {
      id: 'm09-l1',
      title: 'Was ist ein ETF und wie funktioniert er?',
      minutes: 15,
      intro:
        'ETF steht für „Exchange Traded Fund“ – einen börsengehandelten Fonds. Statt einzelne Aktien auszuwählen, kaufst du mit einem ETF einen ganzen Index. Diese Lektion erklärt das Prinzip.',
      sections: [
        {
          heading: 'Was ist ein ETF?',
          paragraphs: [
            'Ein **Fonds** sammelt Geld vieler Anleger und investiert es gemeinsam. Bei klassischen, **aktiv gemanagten Fonds** entscheidet ein Fondsmanager, welche Aktien gekauft werden – dafür fallen oft 1,5–2 % Kosten pro Jahr und zusätzlich ein Ausgabeaufschlag an. Viele aktive Fonds schaffen es nach Kosten langfristig nicht, ihren Vergleichsindex zu schlagen.',
            'Ein **ETF** ist meist ein **passiver Indexfonds**: Er versucht nicht, den Markt zu schlagen, sondern einen Index möglichst genau nachzubilden. Er wird wie eine Aktie an der Börse gehandelt – du kannst ihn während der Handelszeiten jederzeit kaufen und verkaufen.',
          ],
        },
        {
          heading: 'Was ist ein Indexfonds?',
          paragraphs: [
            'Ein **Indexfonds** bildet einen Index nach. Enthält der DAX 40 Aktien, kauft ein DAX-ETF diese 40 Aktien in derselben Gewichtung. Steigt der DAX um 1 %, steigt der ETF ebenfalls um etwa 1 % (vor Kosten). Nicht jeder Indexfonds ist ein ETF (es gibt auch nicht börsengehandelte Indexfonds), aber die meisten ETFs sind Indexfonds.',
          ],
        },
        {
          heading: 'Wie funktioniert ein ETF technisch?',
          paragraphs: ['Es gibt zwei Arten der Nachbildung:'],
          bullets: [
            'Physische Replikation: Der ETF kauft die Aktien des Index tatsächlich – vollständig oder als repräsentative Auswahl (Sampling).',
            'Synthetische Replikation: Der ETF hält einen anderen Wertpapierkorb und tauscht dessen Wertentwicklung über einen Vertrag (Swap) mit einer Bank gegen die Indexentwicklung. Das Kontrahentenrisiko ist in der EU (UCITS-Regeln) auf 10 % begrenzt.',
          ],
        },
        {
          heading: 'Sicherheit: ETFs sind Sondervermögen',
          paragraphs: [
            'Das Geld in einem ETF ist **Sondervermögen** – es gehört den Anlegern und ist von der Fondsgesellschaft getrennt. Geht der Anbieter pleite, bleibt das Vermögen erhalten. Das schützt dich aber nicht vor Kursverlusten: Fällt der Index um 30 %, fällt auch dein ETF um rund 30 %.',
            'In Europa zugelassene ETFs unterliegen der **UCITS-Richtlinie** (deutsch: OGAW), die Regeln zu Streuung, Verwahrung und Transparenz vorschreibt. Jeder ETF hat ein **Basisinformationsblatt** (BIB, früher KID) mit Kosten, Risikoklasse und Anlageziel.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Aktiv vs. passiv (Modellrechnung)',
          text: 'Zwei Anleger investieren je 10.000 € für 30 Jahre. Der Markt erzielt angenommen 7 % pro Jahr. Der ETF kostet 0,2 % (Nettorendite 6,8 %), der aktive Fonds 1,8 % (Nettorendite 5,2 %, falls er den Markt genau trifft). Endwerte: ETF ca. 71.900 €, aktiver Fonds ca. 45.800 €. Die Kosten machen über 26.000 € Unterschied.',
        },
        {
          title: 'Beispiel: ETF-Name lesen',
          text: '„iShares Core MSCI World UCITS ETF USD (Acc)“: iShares = Anbieter, Core = Produktlinie, MSCI World = abgebildeter Index, UCITS = EU-Regeln, USD = Fondswährung, Acc = accumulating (thesaurierend). Die Fondswährung ist nicht dein Währungsrisiko – entscheidend sind die Währungen der enthaltenen Aktien.',
        },
      ],
      practice: [
        'Suche auf justETF oder bei einem Anbieter (z. B. iShares, Xtrackers, Vanguard, Amundi) das Basisinformationsblatt eines Welt-ETFs und finde Kosten, Replikationsmethode und Risikoklasse.',
        'Kaufe im virtuellen Depot einige Anteile des Sim-Welt-ETF und vergleiche seine Schwankungen mit einer Einzelaktie.',
      ],
      terms: [
        { term: 'ETF', definition: 'Exchange Traded Fund – börsengehandelter, meist passiver Indexfonds.' },
        { term: 'Indexfonds', definition: 'Fonds, der einen Index nachbildet.' },
        { term: 'Aktiver Fonds', definition: 'Fonds, bei dem ein Manager die Titel auswählt.' },
        { term: 'Physische Replikation', definition: 'Der Fonds kauft die Indexwerte tatsächlich.' },
        { term: 'Synthetische Replikation', definition: 'Der Fonds bildet den Index über einen Tauschvertrag (Swap) nach.' },
        { term: 'UCITS / OGAW', definition: 'EU-Regelwerk für Investmentfonds mit Anlegerschutzvorschriften.' },
      ],
      mistakes: [
        'Zu glauben, ETFs könnten nicht fallen, weil sie breit gestreut sind.',
        'Die Fondswährung mit dem eigentlichen Währungsrisiko zu verwechseln.',
        'Aktive Fonds mit hohem Ausgabeaufschlag zu kaufen, ohne die Kosten zu vergleichen.',
      ],
      summary: [
        'Ein ETF ist ein börsengehandelter, meist passiver Indexfonds.',
        'Er bildet einen Index physisch oder synthetisch nach.',
        'ETFs sind Sondervermögen, schützen aber nicht vor Kursverlusten.',
        'Niedrige Kosten sind ein wesentlicher Vorteil gegenüber aktiven Fonds.',
      ],
      exercise: {
        title: 'Kosteneffekt berechnen',
        task: 'Du legst 20.000 € für 20 Jahre an. Marktrendite angenommen 6 %. Vergleiche einen ETF mit 0,2 % Kosten und einen Fonds mit 1,5 % Kosten (Modellrechnung).',
        solution: 'ETF: 20.000 × 1,058^20 ≈ 61.770 €. Fonds: 20.000 × 1,045^20 ≈ 48.230 €. Unterschied: rund 13.500 € – nur durch Kosten.',
      },
    },
    {
      id: 'm09-l2',
      title: 'Die wichtigsten Indizes: MSCI World, FTSE All-World und S&P 500',
      minutes: 16,
      intro:
        'Der Index bestimmt, worin ein ETF investiert. Diese Lektion stellt die beliebtesten Indizes für langfristige Anleger vor und zeigt ihre Unterschiede.',
      sections: [
        {
          heading: 'MSCI World',
          paragraphs: [
            'Der **MSCI World** enthält rund 1.400 große und mittelgroße Unternehmen aus 23 Industrieländern. Er deckt etwa 85 % der Marktkapitalisierung dieser Länder ab. **Schwellenländer** wie China, Indien oder Brasilien sind **nicht** enthalten. Der Index ist stark von US-Unternehmen geprägt (der USA-Anteil liegt seit Jahren bei rund 70 %) und von großen Technologiekonzernen.',
          ],
        },
        {
          heading: 'FTSE All-World und MSCI ACWI',
          paragraphs: [
            'Der **FTSE All-World** enthält über 4.000 Unternehmen aus Industrie- **und** Schwellenländern. Ein ähnlicher Index ist der **MSCI ACWI** (All Country World Index). Diese Indizes sind noch breiter gestreut als der MSCI World. Alternativ kombinieren manche Anleger einen MSCI-World-ETF mit einem MSCI-Emerging-Markets-ETF (z. B. im Verhältnis 70/30 oder 90/10).',
          ],
        },
        {
          heading: 'S&P 500 ETF',
          paragraphs: [
            'Ein **S&P-500-ETF** investiert in die rund 500 größten US-Unternehmen. Er ist sehr günstig und liquide, aber auf ein Land konzentriert. Die USA waren in den letzten Jahrzehnten einer der stärksten Aktienmärkte – ob das so bleibt, weiß niemand. Wer nur den S&P 500 bespart, geht ein Länder- und Währungsrisiko (US-Dollar) ein.',
          ],
        },
        {
          heading: 'Konzentration in Weltindizes',
          paragraphs: [
            'Marktgewichtete Indizes geben großen Unternehmen mehr Gewicht. In den letzten Jahren entfielen auf die zehn größten Werte des MSCI World zeitweise über 20 % des Index. Das ist kein Fehler, sondern Folge der Marktgewichtung – aber du solltest es kennen. Alternativen sind gleichgewichtete Indizes (Equal Weight) oder die Beimischung kleinerer Unternehmen (Small Caps).',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Welt-ETF-Varianten',
          text: 'Variante A: 100 % FTSE All-World – ein einziger ETF, Industrie- und Schwellenländer. Variante B: 70 % MSCI World + 30 % MSCI Emerging Markets – ähnlich breit, aber mit Übergewicht der Schwellenländer gegenüber deren Marktgewicht. Variante C: 100 % S&P 500 – nur USA. A und B sind deutlich breiter gestreut als C.',
        },
        {
          title: 'Beispiel: Länderrisiko',
          text: 'Japan war Ende der 1980er-Jahre der wertvollste Aktienmarkt der Welt. Der japanische Index Nikkei 225 erreichte seinen Höchststand von 1989 erst 2024 wieder – nach rund 34 Jahren. Wer nur auf ein Land setzte, musste sehr lange warten. Weltweite Streuung reduziert dieses Risiko.',
        },
      ],
      practice: [
        'Vergleiche die Länder- und Branchenaufteilung von MSCI World und FTSE All-World auf den Webseiten von MSCI und FTSE Russell.',
        'Finde heraus, wie hoch der Anteil der zehn größten Unternehmen in einem Welt-ETF deiner Wahl ist.',
      ],
      terms: [
        { term: 'MSCI World', definition: 'Index mit ca. 1.400 Unternehmen aus 23 Industrieländern.' },
        { term: 'FTSE All-World', definition: 'Index mit über 4.000 Unternehmen aus Industrie- und Schwellenländern.' },
        { term: 'MSCI Emerging Markets', definition: 'Index für Unternehmen aus Schwellenländern.' },
        { term: 'Schwellenländer', definition: 'Länder auf dem Weg zur Industrienation, z. B. China, Indien, Brasilien.' },
        { term: 'Equal Weight', definition: 'Gleichgewichteter Index: Jedes Unternehmen hat dasselbe Gewicht.' },
      ],
      mistakes: [
        'Zu glauben, der MSCI World enthalte die ganze Welt (Schwellenländer fehlen).',
        'Viele ETFs mit ähnlichem Inhalt zu kaufen und dadurch unbewusst Klumpen zu bilden.',
        'Nur auf die Rendite der letzten Jahre zu schauen.',
      ],
      summary: [
        'Der MSCI World deckt Industrieländer ab, der FTSE All-World zusätzlich Schwellenländer.',
        'Ein S&P-500-ETF ist auf die USA konzentriert.',
        'Marktgewichtete Indizes sind auf große Unternehmen konzentriert.',
        'Weltweite Streuung reduziert Länderrisiken.',
      ],
      exercise: {
        title: 'Länderanteile berechnen',
        task: 'Du hast 7.000 € in einem MSCI-World-ETF (70 % USA) und 3.000 € in einem MSCI-EM-ETF (0 % USA). Wie hoch ist der USA-Anteil deines Gesamtdepots?',
        solution: 'USA: 7.000 × 0,7 = 4.900 €. Gesamtdepot: 10.000 €. USA-Anteil = 49 %.',
      },
    },
    {
      id: 'm09-l3',
      title: 'Ausschüttend vs. thesaurierend, TER, Tracking Difference und Risiken',
      minutes: 17,
      intro:
        'Zwei ETFs auf denselben Index können sich in Ertragsverwendung, Kosten und Nachbildungsqualität unterscheiden. Hier lernst du, ETFs fair zu vergleichen – mit einem interaktiven Vergleich fiktiver ETFs.',
      sections: [
        {
          heading: 'Ausschüttender ETF',
          paragraphs: [
            'Ein **ausschüttender ETF** (Distributing, „Dist“) zahlt die Dividenden der enthaltenen Unternehmen regelmäßig (z. B. quartalsweise) an dich aus. Vorteil: Du erhältst laufende Einnahmen und kannst den Sparer-Pauschbetrag direkt nutzen. Nachteil: Du musst die Ausschüttungen selbst wieder anlegen, wenn du den Zinseszinseffekt nutzen willst.',
          ],
        },
        {
          heading: 'Thesaurierender ETF',
          paragraphs: [
            'Ein **thesaurierender ETF** (Accumulating, „Acc“) legt die Dividenden automatisch wieder an. Der Anteilswert steigt entsprechend. Vorteil: Zinseszinseffekt ohne eigenes Zutun. In Deutschland fällt bei thesaurierenden Fonds jährlich die **Vorabpauschale** an (siehe Bereich „Steuern“), die meist gering ist und mit dem Sparer-Pauschbetrag verrechnet werden kann.',
          ],
        },
        {
          heading: 'TER – Gesamtkostenquote',
          paragraphs: [
            'Die **TER** (Total Expense Ratio) gibt die laufenden jährlichen Kosten eines Fonds in Prozent an. Sie wird automatisch aus dem Fondsvermögen entnommen – du siehst sie nicht als Abbuchung. Breite Welt-ETFs kosten oft zwischen 0,1 % und 0,3 % pro Jahr. Nicht enthalten sind z. B. Transaktionskosten innerhalb des Fonds.',
          ],
          formula: 'Jährliche Kosten ≈ Anlagebetrag × TER   (z. B. 10.000 € × 0,2 % = 20 €)',
        },
        {
          heading: 'Tracking Difference',
          paragraphs: [
            'Die **Tracking Difference** ist die tatsächliche Abweichung der ETF-Rendite von der Indexrendite über einen Zeitraum (meist ein Jahr). Sie ist aussagekräftiger als die TER, weil sie alle Effekte enthält: Kosten, Erträge aus Wertpapierleihe, Steueroptimierung und Nachbildungsqualität. Eine Tracking Difference von −0,15 % bedeutet: Der ETF lag 0,15 Prozentpunkte hinter dem Index. Manche ETFs haben sogar eine positive Tracking Difference.',
            'Davon abzugrenzen ist der **Tracking Error**: die Schwankung der Abweichung. Ein niedriger Tracking Error bedeutet eine gleichmäßige Nachbildung.',
          ],
        },
        {
          heading: 'Welche Risiken gibt es bei ETFs?',
          paragraphs: ['Auch ETFs sind nicht risikofrei:'],
          bullets: [
            'Marktrisiko: Fällt der Index, fällt der ETF. Rückgänge von 30–50 % sind in Krisen möglich.',
            'Währungsrisiko: Enthält der ETF US-Aktien, wirkt sich der Euro-Dollar-Kurs auf deine Rendite aus.',
            'Konzentrationsrisiko: Wenige große Unternehmen oder ein Land dominieren den Index.',
            'Kontrahentenrisiko: bei synthetischen ETFs und Wertpapierleihe (begrenzt durch EU-Regeln).',
            'Liquiditätsrisiko: Bei kleinen oder exotischen ETFs können Spreads groß sein.',
            'Schließungsrisiko: Kleine ETFs werden manchmal geschlossen oder zusammengelegt – das kann einen steuerpflichtigen Verkauf auslösen.',
            'Themen-ETFs: Nischen (z. B. eine einzelne Technologie) sind oft wenig gestreut und haben höhere Kosten.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: TER vs. Tracking Difference',
          text: 'ETF A: TER 0,20 %, Tracking Difference −0,10 % (Wertpapierleihe gleicht einen Teil der Kosten aus). ETF B: TER 0,12 %, Tracking Difference −0,30 % (schlechtere Nachbildung). Obwohl B günstiger aussieht, hat A dem Anleger mehr Rendite gebracht.',
        },
        {
          title: 'Beispiel: Ausschüttung vs. Thesaurierung',
          text: 'Beide ETFs erzielen 2 % Dividendenrendite. Beim ausschüttenden ETF erhältst du bei 10.000 € etwa 200 € pro Jahr auf das Verrechnungskonto. Beim thesaurierenden ETF wird dieser Betrag automatisch reinvestiert – du siehst ihn nicht, aber der Anteilswert steigt um diesen Betrag.',
        },
      ],
      practice: [
        'Vergleiche im ETF-Vergleich unten die fiktiven ETFs nach Kosten, Tracking Difference und Endwert.',
        'Prüfe bei einem realen ETF auf einer Vergleichsplattform die Tracking Difference der letzten Jahre.',
      ],
      terms: [
        { term: 'Ausschüttend (Dist)', definition: 'Der ETF zahlt Erträge regelmäßig aus.' },
        { term: 'Thesaurierend (Acc)', definition: 'Der ETF legt Erträge automatisch wieder an.' },
        { term: 'TER', definition: 'Total Expense Ratio – laufende jährliche Fondskosten.' },
        { term: 'Tracking Difference', definition: 'Tatsächliche Renditeabweichung des ETF vom Index.' },
        { term: 'Tracking Error', definition: 'Schwankung der Abweichung zwischen ETF und Index.' },
        { term: 'Wertpapierleihe', definition: 'Verleih von Fondspapieren gegen Gebühr – bringt Zusatzerträge, birgt kleines Risiko.' },
      ],
      mistakes: [
        'ETFs nur nach der TER auszuwählen.',
        'Themen-ETFs als Ersatz für eine breite Basis zu nutzen.',
        'Bei sehr kleinen ETFs (geringes Fondsvolumen) das Schließungsrisiko zu übersehen.',
      ],
      summary: [
        'Ausschüttende ETFs zahlen Dividenden aus, thesaurierende legen sie wieder an.',
        'Die TER zeigt die laufenden Kosten, die Tracking Difference die tatsächliche Abweichung.',
        'ETFs tragen Markt-, Währungs- und Konzentrationsrisiken.',
        'Breite, große ETFs mit langer Historie sind für Einsteiger meist die solideste Basis.',
      ],
      exercise: {
        title: 'Den besseren ETF finden',
        task: 'Beide ETFs bilden denselben Index ab. ETF X: TER 0,07 %, Fondsvolumen 80 Mio. €, Tracking Difference −0,25 %. ETF Y: TER 0,20 %, Fondsvolumen 9 Mrd. €, Tracking Difference −0,12 %. Welchen würdest du bevorzugen und warum?',
        solution: 'ETF Y: Er hat zwar die höhere TER, aber die bessere Tracking Difference (weniger Renditeverlust) und ein deutlich größeres Fondsvolumen (geringeres Schließungsrisiko, meist engere Spreads).',
      },
      widget: 'etf-comparison',
    },
  ],
  quiz: [
    { id: 'm09-q1', type: 'mc', lesson: 0, question: 'Was ist das Ziel eines passiven Index-ETFs?', options: ['Den Markt deutlich zu schlagen', 'Einen Index möglichst genau nachzubilden', 'Nur in Anleihen zu investieren', 'Einen festen Zins zu zahlen'], answer: 1, explanation: 'Ein passiver ETF bildet einen Index nach, statt ihn schlagen zu wollen.' },
    { id: 'm09-q2', type: 'tf', lesson: 0, question: 'ETFs sind Sondervermögen und bleiben bei einer Pleite der Fondsgesellschaft erhalten.', answer: 0, explanation: 'Richtig. Das schützt allerdings nicht vor Kursverlusten des Index.' },
    { id: 'm09-q3', type: 'mc', lesson: 0, question: 'Was bedeutet synthetische Replikation?', options: ['Der ETF kauft alle Aktien des Index', 'Der ETF bildet den Index über einen Tauschvertrag (Swap) nach', 'Der ETF ist eine Fälschung', 'Der ETF investiert in Kunststoff'], answer: 1, explanation: 'Synthetische ETFs tauschen die Rendite eines Wertpapierkorbs über einen Swap gegen die Indexrendite.' },
    { id: 'm09-q4', type: 'mc', lesson: 1, question: 'Welche Länder fehlen im MSCI World?', options: ['Die USA', 'Deutschland', 'Schwellenländer wie China und Indien', 'Japan'], answer: 2, explanation: 'Der MSCI World umfasst nur Industrieländer. Schwellenländer sind im MSCI Emerging Markets enthalten.' },
    { id: 'm09-q5', type: 'mc', lesson: 1, question: 'Welcher Index enthält Industrie- und Schwellenländer?', options: ['S&P 500', 'DAX', 'FTSE All-World', 'Nasdaq-100'], answer: 2, explanation: 'Der FTSE All-World (wie auch der MSCI ACWI) enthält beide Ländergruppen.' },
    { id: 'm09-q6', type: 'calc', lesson: 1, question: 'Du hältst 6.000 € in einem ETF mit 70 % USA-Anteil und 4.000 € in einem Europa-ETF (0 % USA). Wie hoch ist dein USA-Anteil?', options: ['30 %', '42 %', '60 %', '70 %'], answer: 1, explanation: '6.000 × 0,7 = 4.200 € von 10.000 € = 42 %.' },
    { id: 'm09-q7', type: 'mc', lesson: 2, question: 'Was passiert bei einem thesaurierenden ETF mit den Dividenden?', options: ['Sie werden ausgezahlt', 'Sie werden automatisch reinvestiert', 'Sie verfallen', 'Sie gehen an die Fondsgesellschaft'], answer: 1, explanation: 'Thesaurierende ETFs reinvestieren Erträge automatisch.' },
    { id: 'm09-q8', type: 'calc', lesson: 2, question: 'Du hast 15.000 € in einem ETF mit 0,2 % TER. Wie hoch sind die laufenden Kosten pro Jahr ungefähr?', options: ['3 €', '30 €', '300 €', '0,2 €'], answer: 1, explanation: '15.000 € × 0,002 = 30 €.' },
    { id: 'm09-q9', type: 'mc', lesson: 2, question: 'Welche Kennzahl zeigt die tatsächliche Renditeabweichung eines ETFs vom Index?', options: ['TER', 'Tracking Difference', 'KGV', 'Dividendenrendite'], answer: 1, explanation: 'Die Tracking Difference misst die tatsächliche Abweichung und enthält alle Effekte.' },
    { id: 'm09-q10', type: 'tf', lesson: 2, question: 'Ein ETF auf einen breiten Weltindex kann nicht an Wert verlieren.', answer: 1, explanation: 'Falsch. Bei Markteinbrüchen fallen auch breite ETFs deutlich.' },
    { id: 'm09-q11', type: 'case', lesson: 2, question: 'Ein Themen-ETF auf eine einzelne Technologie ist in einem Jahr um 80 % gestiegen. Was ist zu bedenken?', options: ['Er ist risikolos', 'Er ist oft wenig gestreut, teurer und kann stark schwanken', 'Er garantiert weitere 80 %', 'Er ersetzt einen Welt-ETF vollständig'], answer: 1, explanation: 'Themen-ETFs sind Nischeninvestments mit Konzentrations- und Bewertungsrisiko.' },
  ],
  sources: [
    { label: 'BaFin – Investmentfonds und ETFs', url: 'https://www.bafin.de/DE/Verbraucher/GeldanlageWertpapiere/geldanlagewertpapiere_node.html' },
    { label: 'MSCI – Index-Factsheets', url: 'https://www.msci.com/indexes' },
    { label: 'FTSE Russell – FTSE All-World', url: 'https://www.lseg.com/en/ftse-russell/indices' },
    { label: 'Verbraucherzentrale – ETF-Wissen', url: 'https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen' },
  ],
};
