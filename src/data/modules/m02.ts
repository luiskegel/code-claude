import type { Module } from '@/types';
import { QUIZ_M02 } from '../quizzes/hard1';

export const m02: Module = {
  id: 'm02',
  number: 2,
  title: 'Aktien von Grund auf verstehen',
  subtitle: 'Unternehmensanteile, Gewinne, Verluste und Aktienarten',
  category: 'aktien-verstehen',
  icon: 'PieChart',
  description:
    'Was genau besitzt du, wenn du eine Aktie hast? Wie entsteht ein Gewinn – und wie ein Verlust? In diesem Modul lernst du die Aktie als Wertpapier kennen, verstehst die zwei Ertragsquellen Kursgewinn und Dividende und lernst die wichtigsten Aktienarten zu unterscheiden.',
  lessons: [
    {
      id: 'm02-l1',
      title: 'Was ist eine Aktie und was passiert beim Kauf?',
      minutes: 14,
      intro:
        'Eine Aktie ist mehr als ein Kurs auf dem Bildschirm. Sie macht dich zum Miteigentümer eines echten Unternehmens – mit Rechten und Risiken. Diese Lektion erklärt, was du konkret besitzt und was technisch beim Kauf passiert.',
      sections: [
        {
          heading: 'Die Aktie als Unternehmensanteil',
          paragraphs: [
            'Das Eigenkapital einer Aktiengesellschaft (AG) ist in viele gleich große Stücke aufgeteilt: die **Aktien**. Hat ein Unternehmen 100 Millionen Aktien ausgegeben und du besitzt 100 davon, gehört dir ein Millionstel des Unternehmens – also ein winziger Anteil an allen Fabriken, Marken, Patenten, aber auch an allen Schulden und Problemen.',
            'Diesen Anteil nennt man **Unternehmensanteil**. Er bedeutet nicht, dass du dir einen Bürostuhl aus der Zentrale mitnehmen darfst, aber er gibt dir einen rechtlich gesicherten Anspruch auf einen Teil der Gewinne, die das Unternehmen ausschüttet, und auf einen Teil des Restvermögens, falls es aufgelöst wird.',
          ],
        },
        {
          heading: 'Deine Rechte als Aktionär',
          paragraphs: ['Als Aktionär hast du typischerweise folgende Rechte:'],
          bullets: [
            'Dividendenrecht: Anspruch auf deinen Anteil an ausgeschütteten Gewinnen.',
            'Stimmrecht: Du darfst auf der Hauptversammlung (HV) abstimmen, z. B. über die Gewinnverwendung oder die Entlastung des Vorstands (bei Stammaktien).',
            'Auskunftsrecht: Du darfst auf der Hauptversammlung Fragen an den Vorstand stellen.',
            'Bezugsrecht: Bei Kapitalerhöhungen darfst du meist neue Aktien bevorzugt kaufen, damit dein Anteil nicht verwässert.',
            'Recht am Liquidationserlös: Wird das Unternehmen aufgelöst, erhältst du deinen Anteil am verbleibenden Vermögen – allerdings erst, nachdem alle Gläubiger bedient wurden. Oft bleibt dann nichts übrig.',
          ],
        },
        {
          heading: 'Was technisch beim Aktienkauf passiert',
          paragraphs: [
            'Du gibst über deinen **Broker** (Bank oder Online-Broker) eine Order auf. Der Broker leitet sie an einen Handelsplatz weiter. Dort wird ein passender Verkäufer gefunden. Anschließend erfolgt die **Abwicklung** (Settlement): Das Geld wird von deinem Verrechnungskonto abgebucht, und die Aktie wird in dein **Depot** gebucht. In der EU geschieht das derzeit in der Regel zwei Handelstage nach dem Geschäft (T+2); für den Herbst 2027 ist eine Umstellung auf T+1 geplant.',
            'Du bekommst kein Papier mehr nach Hause. Aktien werden heute fast ausschließlich elektronisch verwahrt, in Deutschland bei der Clearstream Banking AG als Zentralverwahrer. Dein Broker führt für dich ein Depot, in dem deine Anteile verbucht sind.',
            'Wichtig: Wertpapiere im Depot sind **Sondervermögen**. Geht dein Broker pleite, gehören die Aktien weiterhin dir und fallen nicht in die Insolvenzmasse. Bargeld auf dem Verrechnungskonto ist dagegen über die gesetzliche Einlagensicherung (in der EU in der Regel bis 100.000 € je Kunde und Bank) geschützt.',
          ],
        },
        {
          heading: 'Haftung: Wie viel kannst du maximal verlieren?',
          paragraphs: [
            'Als Aktionär einer AG haftest du nur mit dem Geld, das du in die Aktien gesteckt hast. Wenn ein Unternehmen pleitegeht, kann die Aktie wertlos werden (**Totalverlust**), aber niemand kann von dir verlangen, die Schulden des Unternehmens zu bezahlen. Anders sieht es bei Hebelprodukten oder Wertpapierkrediten aus – dort sind höhere Verluste möglich (siehe Modul 14).',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Dein Anteil an einem Unternehmen',
          text: 'Die fiktive Hanse Versicherungsgruppe AG hat 400 Millionen Aktien ausgegeben und erzielt 7,4 Mrd. € Gewinn. Je Aktie sind das 18,50 €. Besitzt du 20 Aktien, entfallen rechnerisch 370 € des Jahresgewinns auf dich. Schüttet das Unternehmen 11 € je Aktie aus, erhältst du 220 € Dividende (vor Steuern); der Rest bleibt im Unternehmen und wird reinvestiert – er gehört aber weiterhin anteilig dir.',
        },
        {
          title: 'Beispiel: Der Weg einer Order',
          text: 'Montag, 10:15 Uhr: Du kaufst über die App 5 Aktien zu 64 €. Die Order geht an Xetra und wird sofort ausgeführt. In deinem Depot siehst du die Position meist sofort, rechtlich abgewickelt wird das Geschäft aber erst am Mittwoch (T+2). 320 € plus Gebühren werden von deinem Verrechnungskonto abgebucht.',
        },
      ],
      practice: [
        'Suche die Investor-Relations-Seite eines DAX-Unternehmens und finde heraus, wie viele Aktien es ausgegeben hat.',
        'Schau nach, wann die nächste Hauptversammlung eines Unternehmens stattfindet, das dich interessiert, und welche Tagesordnungspunkte dort behandelt werden.',
      ],
      terms: [
        { term: 'Aktiengesellschaft (AG)', definition: 'Unternehmensform, deren Eigenkapital in Aktien aufgeteilt ist.' },
        { term: 'Hauptversammlung', definition: 'Jährliche Versammlung der Aktionäre, die über wichtige Fragen abstimmt.' },
        { term: 'Depot', definition: 'Konto zur Verwahrung von Wertpapieren.' },
        { term: 'Sondervermögen', definition: 'Wertpapiere im Depot gehören dem Kunden und sind bei einer Broker-Insolvenz geschützt.' },
        { term: 'Bezugsrecht', definition: 'Recht, bei einer Kapitalerhöhung neue Aktien anteilig zu erwerben.' },
      ],
      mistakes: [
        'Eine Aktie als „Wette“ auf einen Kurs zu sehen und zu vergessen, dass dahinter ein echtes Geschäft steht.',
        'Zu glauben, man müsse bei einer Unternehmenspleite Schulden mittragen (bei normalen Aktien nicht der Fall).',
        'Den Unterschied zwischen Depot (Wertpapiere, Sondervermögen) und Verrechnungskonto (Geld, Einlagensicherung) nicht zu kennen.',
      ],
      summary: [
        'Eine Aktie ist ein Anteil am Eigenkapital eines Unternehmens.',
        'Aktionäre haben Rechte auf Dividende, Stimmrecht, Auskunft und Bezug neuer Aktien.',
        'Aktien werden elektronisch im Depot verwahrt und sind als Sondervermögen geschützt.',
        'Bei normalen Aktien ist der maximale Verlust das eingesetzte Kapital.',
      ],
      exercise: {
        title: 'Dein Anteil am Gewinn',
        task: 'Ein Unternehmen hat 50 Mio. Aktien und erzielt 200 Mio. € Gewinn. Es schüttet 40 % des Gewinns aus. Du besitzt 150 Aktien. Wie hoch ist dein rechnerischer Gewinnanteil und wie hoch deine Dividende?',
        steps: ['Gewinn je Aktie: 200 Mio. € / 50 Mio. = 4 €', 'Dein Gewinnanteil: 150 × 4 € = 600 €', 'Dividende je Aktie: 40 % von 4 € = 1,60 €'],
        solution: 'Rechnerischer Gewinnanteil: 600 €. Dividende: 150 × 1,60 € = 240 € (vor Steuern). Die restlichen 360 € bleiben im Unternehmen und sollen dort weiter Wert schaffen.',
      },
    },
    {
      id: 'm02-l2',
      title: 'Wie man mit Aktien Geld verdient – und verliert',
      minutes: 15,
      intro:
        'Mit Aktien kann man auf zwei Arten Geld verdienen: durch Kursgewinne und durch Dividenden. Ebenso real sind aber Kursverluste. Diese Lektion zeigt dir, wie du Gewinne und Verluste richtig berechnest.',
      sections: [
        {
          heading: 'Kursgewinne',
          paragraphs: [
            'Ein **Kursgewinn** entsteht, wenn du eine Aktie teurer verkaufst, als du sie gekauft hast. Solange du die Aktie noch hältst, spricht man von einem **Buchgewinn** oder **unrealisierten Gewinn** – er existiert nur auf dem Papier. Erst beim Verkauf wird er **realisiert**.',
            'Kursgewinne entstehen langfristig vor allem, wenn ein Unternehmen seine Gewinne steigert und damit wertvoller wird. Kurzfristig können Kurse aber auch ohne fundamentalen Grund schwanken.',
          ],
          formula: 'Kursgewinn = (Verkaufskurs − Kaufkurs) × Stückzahl − Gebühren',
        },
        {
          heading: 'Kursverluste',
          paragraphs: [
            'Ein **Kursverlust** entsteht, wenn der Kurs unter deinen Kaufkurs fällt. Auch hier gilt: Solange du nicht verkaufst, ist der Verlust „nur“ ein Buchverlust. Das klingt beruhigend, ist aber trügerisch – der Wert deines Vermögens ist trotzdem gesunken. Es gibt keine Garantie, dass sich eine Aktie erholt.',
            'Besonders wichtig ist die **Asymmetrie von Verlusten**: Fällt eine Aktie um 50 %, muss sie anschließend um 100 % steigen, nur um wieder auf den Ausgangswert zu kommen. Ein Verlust von 90 % erfordert sogar +900 %. Deshalb ist es so wichtig, große Verluste zu vermeiden.',
          ],
          formula: 'Benötigter Gewinn zur Erholung = 1 / (1 − Verlust) − 1',
        },
        {
          heading: 'Dividenden',
          paragraphs: [
            'Viele Unternehmen schütten einen Teil ihres Gewinns an die Aktionäre aus – die **Dividende**. In Deutschland geschieht das meist einmal im Jahr nach der Hauptversammlung, in den USA oft vierteljährlich. Die Dividende wird auf dein Verrechnungskonto gutgeschrieben (nach Abzug von Steuern, siehe Bereich „Steuern“).',
            'Wichtig: Am Tag nach der Hauptversammlung (Ex-Tag) sinkt der Aktienkurs rechnerisch um die Höhe der Dividende. Die Dividende ist also kein „Geschenk“, sondern eine Auszahlung aus dem Unternehmenswert. Mehr dazu in Modul 7.',
          ],
        },
        {
          heading: 'Die Gesamtrendite',
          paragraphs: [
            'Um eine Investition fair zu beurteilen, betrachtet man die **Gesamtrendite** (Total Return): Kursveränderung plus erhaltene Dividenden, abzüglich Kosten. Eine Aktie, die 3 % im Kurs gestiegen ist und 4 % Dividende gezahlt hat, hat eine Gesamtrendite von rund 7 %.',
          ],
          formula: 'Gesamtrendite (%) = (Endwert − Anfangswert + Dividenden − Kosten) / Anfangswert × 100',
        },
      ],
      examples: [
        {
          title: 'Beispiel: Gewinn mit Dividende',
          text: 'Du kaufst 20 Aktien zu 50 € (1.000 €) plus 1 € Gebühr. Nach einem Jahr erhältst du 1,50 € Dividende je Aktie (30 €) und verkaufst zu 55 € (1.100 €) bei 1 € Gebühr. Gewinn: 1.100 − 1.000 + 30 − 2 = 128 €. Gesamtrendite: 128 / 1.001 ≈ 12,8 % (vor Steuern).',
        },
        {
          title: 'Beispiel: Die Verlustfalle',
          text: 'Deine Aktie fällt von 100 € auf 60 € (−40 %). Um wieder auf 100 € zu kommen, muss sie von 60 € um 40 € steigen – das sind 66,7 %. Viele Anfänger unterschätzen diese Asymmetrie und halten an stark gefallenen Aktien fest, ohne zu prüfen, ob sich das Unternehmen überhaupt erholen kann.',
        },
      ],
      practice: [
        'Nutze den Gewinn-/Verlust-Rechner unten, um verschiedene Kauf- und Verkaufskurse durchzuspielen.',
        'Berechne für eine Aktie deiner Wahl, wie hoch die Gesamtrendite inklusive Dividende im letzten Jahr gewesen wäre.',
      ],
      terms: [
        { term: 'Kursgewinn', definition: 'Differenz zwischen höherem Verkaufs- und niedrigerem Kaufkurs.' },
        { term: 'Buchgewinn / Buchverlust', definition: 'Noch nicht realisierte Wertveränderung einer gehaltenen Position.' },
        { term: 'Realisieren', definition: 'Einen Gewinn oder Verlust durch Verkauf tatsächlich festschreiben.' },
        { term: 'Dividende', definition: 'Ausschüttung eines Teils des Unternehmensgewinns an die Aktionäre.' },
        { term: 'Gesamtrendite', definition: 'Kursveränderung plus Ausschüttungen minus Kosten, bezogen auf den Einsatz.' },
      ],
      mistakes: [
        'Buchverluste zu ignorieren („Ich verliere ja erst, wenn ich verkaufe“).',
        'Gebühren und Steuern bei der Renditeberechnung zu vergessen.',
        'Die Asymmetrie von Verlusten zu unterschätzen.',
        'Nur auf die Dividende zu schauen und die Kursentwicklung zu vernachlässigen.',
      ],
      summary: [
        'Gewinne entstehen durch Kurssteigerungen und Dividenden.',
        'Buchgewinne und -verluste werden erst beim Verkauf realisiert, verändern aber trotzdem dein Vermögen.',
        'Verluste wirken asymmetrisch: −50 % erfordert +100 % zur Erholung.',
        'Die Gesamtrendite berücksichtigt Kurs, Dividenden und Kosten.',
      ],
      exercise: {
        title: 'Gesamtrendite berechnen',
        task: 'Kauf: 40 Aktien zu 25 €, Gebühr 4,90 €. Dividende im Jahr: 0,80 € je Aktie. Verkauf nach einem Jahr zu 24 €, Gebühr 4,90 €. Berechne Gewinn bzw. Verlust und die Gesamtrendite.',
        steps: ['Kaufkosten: 40 × 25 € + 4,90 € = 1.004,90 €', 'Verkaufserlös: 40 × 24 € − 4,90 € = 955,10 €', 'Dividenden: 40 × 0,80 € = 32 €'],
        solution: 'Ergebnis: 955,10 + 32 − 1.004,90 = −17,80 €. Gesamtrendite: −17,80 / 1.004,90 ≈ −1,8 %. Trotz Dividende entsteht ein kleiner Verlust – auch wegen der Gebühren.',
      },
      widget: 'profit-loss',
    },
    {
      id: 'm02-l3',
      title: 'Aktienarten: Stamm, Vorzug, Wachstum, Value, Blue Chips und Penny Stocks',
      minutes: 17,
      intro:
        'Aktie ist nicht gleich Aktie. Es gibt rechtliche Unterschiede (Stamm- und Vorzugsaktien) und Einteilungen nach dem Charakter des Unternehmens (Wachstum, Value, Blue Chip, Penny Stock). Wer diese Kategorien kennt, kann Chancen und Risiken besser einordnen.',
      sections: [
        {
          heading: 'Stammaktien und Vorzugsaktien',
          paragraphs: [
            '**Stammaktien** (Kürzel oft „St“) sind der Normalfall. Sie gewähren alle Aktionärsrechte, insbesondere das **Stimmrecht** auf der Hauptversammlung.',
            '**Vorzugsaktien** (Kürzel „Vz“) haben meist **kein Stimmrecht**, dafür einen Vorteil bei der Gewinnverteilung, oft eine etwas höhere Dividende oder einen Vorrang bei der Ausschüttung. Einige große deutsche Unternehmen haben beide Gattungen an der Börse – die Vorzugsaktie ist dabei häufig liquider und wird teils in Indizes bevorzugt.',
            'Für Privatanleger mit kleinen Beträgen spielt das Stimmrecht praktisch kaum eine Rolle. Der Kursunterschied zwischen beiden Gattungen kann aber erheblich sein und hängt von Angebot, Nachfrage, Indexzugehörigkeit und Dividendenhöhe ab.',
          ],
        },
        {
          heading: 'Wachstumsaktien (Growth)',
          paragraphs: [
            '**Wachstumsaktien** gehören zu Unternehmen, die ihren Umsatz und Gewinn deutlich schneller steigern als der Durchschnitt – oft in jungen Branchen wie Software, Halbleiter oder Biotechnologie. Sie schütten selten Dividenden aus, weil sie das Geld lieber in weiteres Wachstum stecken.',
            'Da Anleger künftiges Wachstum vorwegnehmen, sind Wachstumsaktien meist hoch bewertet (hohes KGV). Das macht sie anfällig: Enttäuscht das Wachstum oder steigen die Zinsen, können die Kurse stark fallen.',
          ],
        },
        {
          heading: 'Value-Aktien (Substanzwerte)',
          paragraphs: [
            '**Value-Aktien** sind Aktien von Unternehmen, die im Verhältnis zu ihren Gewinnen, ihrem Vermögen oder ihren Cashflows günstig bewertet erscheinen. Oft handelt es sich um etablierte Firmen in reifen Branchen (Banken, Versicherungen, Industrie, Energie) mit stabilen Gewinnen und Dividenden.',
            'Achtung: Eine niedrige Bewertung kann auch berechtigt sein, weil das Geschäftsmodell schrumpft. Man spricht dann von einer **Value-Falle** – die Aktie ist billig und wird noch billiger.',
          ],
        },
        {
          heading: 'Blue Chips',
          paragraphs: [
            'Als **Blue Chips** bezeichnet man Aktien großer, etablierter und finanzstarker Unternehmen mit hoher Marktkapitalisierung, die oft in Leitindizes wie DAX, Euro Stoxx 50 oder Dow Jones enthalten sind. Der Name stammt aus dem Casino, wo blaue Jetons traditionell den höchsten Wert hatten.',
            'Blue Chips gelten als vergleichsweise solide und sind sehr liquide. Aber: Auch Blue Chips können massiv an Wert verlieren, wie zahlreiche Beispiele aus Finanzkrisen und Branchenumbrüchen zeigen. „Groß“ bedeutet nicht „sicher“.',
          ],
        },
        {
          heading: 'Penny Stocks',
          paragraphs: [
            '**Penny Stocks** sind Aktien mit sehr niedrigem Kurs (oft unter 1 € oder 1 US-Dollar) und meist sehr kleiner Marktkapitalisierung. Sie werden häufig außerbörslich oder in wenig regulierten Segmenten gehandelt.',
            'Penny Stocks sind **extrem riskant**: geringe Liquidität (große Spreads), wenige verlässliche Informationen, starke Schwankungen und häufige Totalverluste. Sie werden außerdem oft für Betrugsmaschen wie „Pump and Dump“ missbraucht, bei denen Hintermänner über Newsletter oder soziale Medien Kurse hochtreiben und dann verkaufen. Ein niedriger Kurs bedeutet **nicht**, dass eine Aktie „günstig“ ist!',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Stamm vs. Vorzug',
          text: 'Ein fiktiver Autokonzern hat Stammaktien (Kurs 80 €, Dividende 4,50 €) und Vorzugsaktien (Kurs 74 €, Dividende 4,56 €). Die Vorzugsaktie ist günstiger und zahlt etwas mehr Dividende, hat aber kein Stimmrecht. Dividendenrendite Stamm: 5,6 %, Vorzug: 6,2 %. Für einen Kleinanleger kann die Vorzugsaktie attraktiver sein – sofern die Liquidität ausreichend ist.',
        },
        {
          title: 'Beispiel: Der Penny-Stock-Trugschluss',
          text: 'Aktie A kostet 0,50 €, Aktie B 300 €. Viele denken: „Bei A bekomme ich für 1.000 € 2.000 Stück, die können leichter auf 1 € steigen.“ Doch der Kurs allein sagt nichts aus. Entscheidend ist der Unternehmenswert: Hat A 4 Mrd. Aktien, ist das Unternehmen 2 Mrd. € wert – ohne Umsatz vielleicht völlig überbewertet. Eine Verdopplung ist für A nicht wahrscheinlicher als für B.',
        },
      ],
      practice: [
        'Suche ein deutsches Unternehmen, von dem es Stamm- und Vorzugsaktien gibt, und vergleiche Kurs und Dividende.',
        'Ordne fünf bekannte Unternehmen den Kategorien Wachstum, Value oder Blue Chip zu und begründe deine Wahl.',
        'Schau dir im virtuellen Depot die fiktive „Pennyrock Mining“ an und beobachte die Schwankungen über einige simulierte Wochen.',
      ],
      terms: [
        { term: 'Stammaktie', definition: 'Normale Aktie mit Stimmrecht.' },
        { term: 'Vorzugsaktie', definition: 'Aktie meist ohne Stimmrecht, dafür mit Vorteil bei der Dividende.' },
        { term: 'Wachstumsaktie', definition: 'Aktie eines schnell wachsenden Unternehmens, meist hoch bewertet.' },
        { term: 'Value-Aktie', definition: 'Aktie, die im Verhältnis zu Gewinn oder Substanz günstig bewertet ist.' },
        { term: 'Blue Chip', definition: 'Aktie eines großen, etablierten Unternehmens aus einem Leitindex.' },
        { term: 'Penny Stock', definition: 'Aktie mit sehr niedrigem Kurs und meist hohem Risiko.' },
      ],
      mistakes: [
        'Einen niedrigen Aktienkurs mit einer günstigen Bewertung zu verwechseln.',
        'Blue Chips für risikolos zu halten.',
        'Value-Aktien zu kaufen, nur weil das KGV niedrig ist, ohne die Ursache zu verstehen (Value-Falle).',
        'Penny-Stock-Tipps aus Chatgruppen oder E-Mails zu folgen.',
      ],
      summary: [
        'Stammaktien haben Stimmrecht, Vorzugsaktien meist nicht, dafür einen Dividendenvorteil.',
        'Wachstumsaktien bieten Wachstumschancen bei hoher Bewertung und hohen Schwankungen.',
        'Value-Aktien sind günstig bewertet – manchmal aus gutem Grund.',
        'Blue Chips sind groß und liquide, Penny Stocks klein und hochriskant.',
      ],
      exercise: {
        title: 'Aktien richtig einordnen',
        task: 'Ordne die fiktiven Firmen aus dem virtuellen Depot zu: Rheinsoft Systems (Software, KGV 40, kaum Dividende), Hanse Versicherung (KGV 11, hohe Dividende, sehr groß), Pennyrock Mining (Kurs 0,42 €, kein Umsatz).',
        solution: 'Rheinsoft: Wachstumsaktie (hohes KGV, Gewinne werden reinvestiert). Hanse Versicherung: Value-Aktie und Blue Chip (groß, stabil, günstig bewertet, dividendenstark). Pennyrock Mining: Penny Stock (niedriger Kurs, kein Umsatz, hochriskant).',
      },
    },
  ],
  quiz: QUIZ_M02,
  sources: [
    { label: 'BaFin – Aktien: Grundlagen für Verbraucher', url: 'https://www.bafin.de/DE/Verbraucher/GeldanlageWertpapiere/geldanlagewertpapiere_node.html' },
    { label: 'Deutsches Aktieninstitut – Aktienwissen', url: 'https://www.dai.de' },
    { label: 'Börse Frankfurt – Wissen: Aktien', url: 'https://www.boerse-frankfurt.de/wissen/wertpapiere/aktien' },
    { label: 'Verbraucherzentrale – Geldanlage', url: 'https://www.verbraucherzentrale.de/geld-versicherungen' },
  ],
};
