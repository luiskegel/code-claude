import type { Module } from '@/types';
import { QUIZ_M08 } from '../quizzes/hard1';

export const m08: Module = {
  id: 'm08',
  number: 8,
  title: 'Investmentstrategien',
  subtitle: 'Buy and Hold, Value, Growth, Dividenden, Momentum, ETFs und Sparpläne',
  category: 'strategien',
  icon: 'Compass',
  description:
    'Es gibt nicht die eine richtige Strategie – aber es gibt Strategien, die zu dir passen, und solche, die es nicht tun. Du lernst die wichtigsten Ansätze mit ihren Vor- und Nachteilen kennen.',
  lessons: [
    {
      id: 'm08-l1',
      title: 'Buy and Hold, langfristiges Investieren und Diversifikation',
      minutes: 16,
      intro:
        'Die einfachste Strategie ist oft die erfolgreichste: breit gestreut kaufen und lange halten. Diese Lektion erklärt, warum das so ist und wo die Schwierigkeiten liegen.',
      sections: [
        {
          heading: 'Buy and Hold',
          paragraphs: [
            'Bei **Buy and Hold** („Kaufen und Halten“) kaufst du Aktien oder ETFs und hältst sie viele Jahre oder Jahrzehnte – unabhängig von kurzfristigen Schwankungen. Du versuchst nicht, den richtigen Zeitpunkt zu erwischen (**Market Timing**), sondern setzt darauf, dass Unternehmen langfristig wachsen.',
          ],
          bullets: [
            'Vorteile: geringe Kosten (wenige Transaktionen), wenig Zeitaufwand, Steuern fallen erst beim Verkauf an (Steuerstundung), keine Gefahr, die besten Börsentage zu verpassen.',
            'Nachteile: Man muss große Rückgänge (−30 % bis −50 %) aushalten können. Bei Einzelaktien besteht das Risiko, an einem dauerhaft schwachen Unternehmen festzuhalten.',
          ],
        },
        {
          heading: 'Langfristiges Investieren',
          paragraphs: [
            'Historisch haben breit gestreute Aktienmärkte über lange Zeiträume positive Renditen erzielt – über kurze Zeiträume dagegen sehr unterschiedliche, auch stark negative. Je länger der Anlagehorizont, desto geringer war in der Vergangenheit die Wahrscheinlichkeit eines Verlusts. **Wichtig:** Vergangene Entwicklungen sind keine Garantie für die Zukunft. Es gab Märkte (z. B. Japan nach 1989), die jahrzehntelang unter ihrem Höchststand lagen.',
            'Langfristiges Investieren bedeutet auch: nur Geld anzulegen, das du für viele Jahre nicht brauchst. Wer in einer Krise verkaufen muss, weil er das Geld benötigt, kann Verluste nicht aussitzen.',
          ],
        },
        {
          heading: 'Diversifikation',
          paragraphs: [
            '**Diversifikation** heißt Streuung: Du verteilst dein Geld auf viele verschiedene Unternehmen, Branchen, Länder und eventuell Anlageklassen. Fällt ein Wert stark, wird dein Gesamtvermögen nur wenig getroffen. Diversifikation gilt als „einzige kostenlose Mahlzeit“ an der Börse (Harry Markowitz), weil sie das Risiko senkt, ohne die erwartete Rendite im gleichen Maße zu senken.',
          ],
          bullets: [
            'Vorteile: deutlich geringeres Einzelrisiko, ruhigerer Wertverlauf, kein Totalverlust durch eine einzelne Pleite.',
            'Nachteile: Du profitierst von einem einzelnen Gewinner nur anteilig. Gegen einen allgemeinen Marktcrash schützt Diversifikation innerhalb von Aktien nur begrenzt (systematisches Risiko).',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Einzelaktie vs. gestreutes Depot',
          text: 'Anna investiert 10.000 € in eine einzige Aktie, Ben verteilt 10.000 € auf 25 Aktien aus verschiedenen Branchen und Ländern. Eine Aktie verliert durch einen Bilanzskandal 90 %. Bei Anna sind das −9.000 €, bei Ben (wenn er diese Aktie mit 400 € hält) −360 € oder −3,6 % seines Depots.',
        },
        {
          title: 'Beispiel: Die besten Tage verpassen',
          text: 'Untersuchungen zu großen Indizes zeigen regelmäßig: Wer in einem Zeitraum von 20 Jahren nur die 10 besten Börsentage verpasst hat, erzielte eine deutlich niedrigere Rendite. Viele dieser besten Tage lagen mitten in Krisen, kurz nach den schlimmsten Tagen. Wer aus Angst ausgestiegen ist, hat sie oft verpasst.',
        },
      ],
      practice: [
        'Probiere den Diversifikations-Simulator unten aus: Wie wirkt sich der Ausfall einer Aktie auf ein Depot mit 1, 5, 10 oder 30 Positionen aus?',
        'Schreibe auf, welchen maximalen Rückgang deines Depots du aushalten würdest, ohne zu verkaufen.',
      ],
      terms: [
        { term: 'Buy and Hold', definition: 'Strategie: kaufen und langfristig halten.' },
        { term: 'Market Timing', definition: 'Versuch, den besten Zeitpunkt für Kauf und Verkauf zu treffen.' },
        { term: 'Diversifikation', definition: 'Streuung des Kapitals auf viele unterschiedliche Anlagen.' },
        { term: 'Systematisches Risiko', definition: 'Marktrisiko, das sich durch Streuung nicht beseitigen lässt.' },
        { term: 'Unsystematisches Risiko', definition: 'Einzelrisiko eines Unternehmens, das sich durch Streuung reduzieren lässt.' },
      ],
      mistakes: [
        'Buy and Hold mit „nie wieder hinschauen“ zu verwechseln – auch Langfristanleger sollten ihr Depot jährlich prüfen.',
        'Zu glauben, 5 Aktien derselben Branche seien diversifiziert.',
        'Geld anzulegen, das man in den nächsten Jahren benötigt.',
      ],
      summary: [
        'Buy and Hold setzt auf langfristiges Wachstum statt Market Timing.',
        'Lange Anlagehorizonte reduzierten historisch das Verlustrisiko – ohne Garantie.',
        'Diversifikation senkt Einzelrisiken deutlich.',
        'Gegen Marktcrashs schützt Diversifikation innerhalb von Aktien nur begrenzt.',
      ],
      exercise: {
        title: 'Wie diversifiziert ist dieses Depot?',
        task: 'Ein Depot besteht aus 6 Aktien: drei deutsche Autohersteller, zwei deutsche Autozulieferer und ein deutscher Chemiekonzern. Wie bewertest du die Diversifikation?',
        solution: 'Sehr schwach: 5 von 6 Positionen hängen an derselben Branche (Auto) und alle an einem Land. Ein Branchenproblem (z. B. Absatzkrise, Zölle) würde fast das ganze Depot treffen. Besser: Streuung über Branchen (Gesundheit, Konsum, Technologie, Finanzen ...) und Regionen, z. B. über einen weltweiten ETF als Basis.',
      },
      widget: 'diversification',
    },
    {
      id: 'm08-l2',
      title: 'Value, Growth, Dividenden und Momentum',
      minutes: 18,
      intro:
        'Diese vier Strategien unterscheiden sich darin, welche Aktien ausgewählt werden. Jede hat Phasen, in denen sie gut funktioniert – und Phasen, in denen sie jahrelang hinterherhinkt.',
      sections: [
        {
          heading: 'Value Investing',
          paragraphs: [
            '**Value Investing** sucht Aktien, die unter ihrem „inneren Wert“ gehandelt werden. Begründet von Benjamin Graham und bekannt gemacht durch Warren Buffett. Kerngedanke: Kaufe einen Euro für 70 Cent. Die Differenz heißt **Sicherheitsmarge** (Margin of Safety).',
          ],
          bullets: [
            'Vorteile: Fokus auf Substanz und Bewertung, oft solide Unternehmen mit Dividenden, Sicherheitsmarge als Puffer.',
            'Nachteile: Der „innere Wert“ ist eine Schätzung. Gefahr von Value-Fallen. Value-Aktien liefen in manchen Phasen (z. B. in weiten Teilen der 2010er-Jahre) lange schlechter als der Gesamtmarkt.',
          ],
        },
        {
          heading: 'Growth Investing',
          paragraphs: [
            '**Growth Investing** setzt auf Unternehmen mit überdurchschnittlichem Umsatz- und Gewinnwachstum. Man akzeptiert hohe Bewertungen, weil man erwartet, dass das Wachstum sie in einigen Jahren rechtfertigt.',
          ],
          bullets: [
            'Vorteile: Chance auf sehr hohe Renditen, Teilhabe an Innovationen.',
            'Nachteile: hohe Bewertungen machen anfällig für Enttäuschungen und Zinsanstiege; starke Schwankungen; Wachstum ist schwer vorherzusagen.',
          ],
        },
        {
          heading: 'Dividendenstrategie',
          paragraphs: [
            'Die **Dividendenstrategie** (siehe Modul 7) wählt Aktien mit verlässlichen und steigenden Ausschüttungen.',
          ],
          bullets: [
            'Vorteile: regelmäßige Einnahmen, oft stabile Unternehmen, psychologisch angenehm.',
            'Nachteile: Branchenkonzentration (Versorger, Finanzen, Konsum), Dividendenfallen, Steuern auf Ausschüttungen, wachstumsstarke Unternehmen fehlen oft.',
          ],
        },
        {
          heading: 'Momentum Investing',
          paragraphs: [
            '**Momentum Investing** kauft Aktien, die in den letzten Monaten besonders stark gestiegen sind, in der Erwartung, dass sich der Trend fortsetzt. Der Momentum-Effekt ist in der Forschung gut dokumentiert, kann aber abrupt umschlagen (**Momentum-Crash**).',
          ],
          bullets: [
            'Vorteile: regelbasiert, nutzt Trends, historisch belegter Effekt.',
            'Nachteile: häufiges Umschichten (Kosten, Steuern), plötzliche Trendwenden, erfordert Disziplin und Zeit.',
          ],
        },
        {
          heading: 'Welche Strategie passt zu wem?',
          paragraphs: [
            'Wer wenig Zeit hat und keine Freude an der Analyse einzelner Unternehmen, ist mit einer breiten ETF-Strategie meist besser bedient. Wer gerne analysiert, kann einen Teil des Depots (z. B. 10–30 %) für Einzelaktien nach einer der Strategien nutzen. Wichtig ist, eine Strategie zu wählen, die man auch in schlechten Phasen durchhält.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Sicherheitsmarge',
          text: 'Du schätzt den inneren Wert einer Aktie auf 60 €. Sie notiert bei 42 €. Die Sicherheitsmarge beträgt 30 %. Selbst wenn deine Schätzung um 20 % zu optimistisch war (innerer Wert nur 48 €), wärst du noch nicht im Verlust.',
        },
        {
          title: 'Beispiel: Growth-Enttäuschung',
          text: 'Eine Wachstumsaktie hat ein KGV von 60, weil Anleger 30 % Wachstum pro Jahr erwarten. Das Unternehmen wächst „nur“ noch 15 %. Der Markt bewertet es nun mit einem KGV von 30. Selbst wenn der Gewinn gestiegen ist, kann der Kurs sich dadurch fast halbieren.',
        },
      ],
      practice: [
        'Ordne die fiktiven Unternehmen im virtuellen Depot den Strategien Value, Growth und Dividende zu.',
        'Überlege, welche Strategie zu deinem Zeitbudget und deiner Persönlichkeit passt.',
      ],
      terms: [
        { term: 'Value Investing', definition: 'Kauf von Aktien unter ihrem geschätzten inneren Wert.' },
        { term: 'Innerer Wert', definition: 'Geschätzter fairer Wert eines Unternehmens auf Basis künftiger Erträge.' },
        { term: 'Sicherheitsmarge', definition: 'Abstand zwischen innerem Wert und Kaufpreis.' },
        { term: 'Growth Investing', definition: 'Fokus auf schnell wachsende Unternehmen.' },
        { term: 'Momentum', definition: 'Tendenz, dass stark gestiegene Aktien eine Zeit lang weiter steigen.' },
      ],
      mistakes: [
        'Ständig die Strategie zu wechseln, je nachdem, was zuletzt gut lief.',
        'Growth-Aktien ohne Blick auf die Bewertung zu kaufen.',
        'Momentum ohne feste Regeln und Risikomanagement zu betreiben.',
      ],
      summary: [
        'Value sucht günstige Bewertungen mit Sicherheitsmarge.',
        'Growth setzt auf Wachstum und akzeptiert hohe Bewertungen.',
        'Dividendenstrategien zielen auf verlässliche Ausschüttungen.',
        'Momentum folgt Trends – mit Risiko abrupter Umschwünge.',
      ],
      exercise: {
        title: 'Strategie zuordnen',
        task: 'Welche Strategie verfolgt jeweils der Anleger? (a) „Ich kaufe die 20 Aktien mit dem stärksten Kursanstieg der letzten 12 Monate und tausche sie vierteljährlich aus.“ (b) „Ich kaufe nur, wenn das KGV deutlich unter dem Branchenschnitt liegt und die Bilanz solide ist.“ (c) „Mich interessieren Firmen, die ihren Umsatz jedes Jahr um 25 % steigern.“',
        solution: '(a) Momentum Investing. (b) Value Investing. (c) Growth Investing.',
      },
    },
    {
      id: 'm08-l3',
      title: 'ETF-Investing, Sparplan und Cost-Average-Effekt',
      minutes: 16,
      intro:
        'Für die meisten Privatanleger ist ein regelmäßiger Sparplan in breit gestreute ETFs die einfachste und kostengünstigste Strategie. Diese Lektion zeigt, wie sie funktioniert und was sie leisten kann – und was nicht.',
      sections: [
        {
          heading: 'ETF-Investing',
          paragraphs: [
            'Beim **ETF-Investing** kaufst du börsengehandelte Indexfonds, die einen ganzen Markt abbilden (Details in Modul 9). Mit einem einzigen ETF auf einen Weltindex kannst du in über tausend Unternehmen investieren.',
          ],
          bullets: [
            'Vorteile: maximale Diversifikation, sehr niedrige Kosten, kein Analyseaufwand, du erhältst die Marktrendite (abzüglich geringer Kosten).',
            'Nachteile: keine Chance, den Markt zu schlagen; du hältst automatisch auch schwache Unternehmen; Konzentration auf große Länder und Unternehmen bei marktgewichteten Indizes.',
          ],
        },
        {
          heading: 'Sparplanstrategie',
          paragraphs: [
            'Bei einem **Sparplan** investierst du automatisch regelmäßig (meist monatlich) einen festen Betrag, z. B. 100 €. Viele Broker bieten Sparpläne für ETFs und Aktien ab 1 € bis 25 € pro Rate an, oft gebührenfrei oder sehr günstig.',
          ],
          bullets: [
            'Vorteile: Disziplin durch Automatik, kein Market Timing nötig, auch kleine Beträge möglich, Zinseszinseffekt über lange Zeit.',
            'Nachteile: Bei langfristig steigenden Märkten ist eine sofortige Einmalanlage statistisch oft etwas besser; Sparpläne schützen nicht vor Verlusten.',
          ],
        },
        {
          heading: 'Dollar-Cost-Averaging (Cost-Average-Effekt)',
          paragraphs: [
            'Beim **Dollar-Cost-Averaging** (deutsch: **Cost-Average-Effekt** oder Durchschnittskosteneffekt) investierst du regelmäßig denselben Betrag. Ist der Kurs niedrig, bekommst du mehr Anteile, ist er hoch, weniger. Dein durchschnittlicher Kaufpreis liegt dadurch unter dem durchschnittlichen Kurs der Kaufzeitpunkte.',
            'Wichtig: Der Effekt ist mathematisch real, aber **kein Renditeturbo**. Er glättet vor allem das Timing-Risiko und hilft psychologisch, in fallenden Märkten weiterzuinvestieren.',
          ],
        },
        {
          heading: 'Eine einfache Kombination',
          paragraphs: [
            'Ein häufig genutzter Ansatz für Einsteiger: Notgroschen auf dem Tagesgeldkonto, ein monatlicher Sparplan auf einen breit gestreuten Welt-ETF als Kern („Core“) und optional ein kleinerer Teil für Einzelaktien oder Themen („Satellite“). Dieser Ansatz heißt **Core-Satellite-Strategie**. Dies ist eine allgemeine Darstellung und keine individuelle Empfehlung.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Cost-Average-Effekt',
          text: 'Du investierst drei Monate lang je 100 €. Kurse: 10 €, 5 €, 10 €. Du erhältst 10 + 20 + 10 = 40 Anteile für 300 €. Durchschnittlicher Kaufpreis: 300 / 40 = 7,50 €. Der durchschnittliche Kurs der drei Zeitpunkte beträgt aber 8,33 €. Am Ende (Kurs 10 €) ist dein Depot 400 € wert – obwohl der Kurs wieder am Ausgangspunkt steht.',
        },
        {
          title: 'Beispiel: Sparplan über 25 Jahre (Modellrechnung)',
          text: '150 € pro Monat über 25 Jahre = 45.000 € Einzahlungen. Bei angenommenen 6 % Rendite pro Jahr ergibt sich ein Endwert von etwa 101.000 €. Bei 3 % wären es etwa 66.500 €, bei 0 % genau 45.000 €. Die tatsächliche Entwicklung kann deutlich abweichen – auch Verluste sind möglich.',
        },
      ],
      practice: [
        'Spiele mit dem Sparplan-Simulator unten verschiedene Raten, Laufzeiten und Renditeannahmen durch.',
        'Lege im virtuellen Depot einen „manuellen Sparplan“ an: Kaufe jede simulierte Woche für etwa 200 € Anteile des Sim-Welt-ETF und beobachte deinen Durchschnittspreis.',
      ],
      terms: [
        { term: 'ETF', definition: 'Börsengehandelter Indexfonds.' },
        { term: 'Sparplan', definition: 'Automatische, regelmäßige Investition eines festen Betrags.' },
        { term: 'Cost-Average-Effekt', definition: 'Bei festen Raten werden bei niedrigen Kursen mehr Anteile gekauft.' },
        { term: 'Einmalanlage', definition: 'Investition eines größeren Betrags auf einmal.' },
        { term: 'Core-Satellite', definition: 'Breiter Kern (z. B. Welt-ETF) plus kleinere Beimischungen.' },
      ],
      mistakes: [
        'Den Sparplan in Krisen zu stoppen – gerade dann werden günstig Anteile gekauft.',
        'Den Cost-Average-Effekt für eine Renditegarantie zu halten.',
        'Zu viele ETFs mit stark überlappendem Inhalt zu besparen.',
      ],
      summary: [
        'ETFs bieten breite Streuung zu niedrigen Kosten.',
        'Sparpläne automatisieren das Investieren und vermeiden Market Timing.',
        'Der Cost-Average-Effekt senkt den Durchschnittspreis, ist aber kein Renditeturbo.',
        'Die Core-Satellite-Strategie kombiniert einen breiten Kern mit Beimischungen.',
      ],
      exercise: {
        title: 'Durchschnittspreis im Sparplan',
        task: 'Du investierst viermal je 120 €. Kurse: 40 €, 30 €, 24 €, 40 €. Wie viele Anteile hast du, wie hoch ist dein Durchschnittspreis und was ist das Depot bei 40 € wert?',
        steps: ['Anteile: 3 + 4 + 5 + 3 = 15', 'Investiert: 480 €'],
        solution: 'Durchschnittspreis: 480 / 15 = 32 €. Wert bei 40 €: 15 × 40 = 600 € (+25 %), obwohl der Kurs wieder bei seinem Ausgangswert liegt.',
      },
      widget: 'savings-plan',
    },
  ],
  quiz: QUIZ_M08,
  sources: [
    { label: 'BaFin – Geldanlage: Fonds und Sparpläne', url: 'https://www.bafin.de/DE/Verbraucher/GeldanlageWertpapiere/geldanlagewertpapiere_node.html' },
    { label: 'Verbraucherzentrale – ETF-Sparplan', url: 'https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen' },
    { label: 'Deutsche Bundesbank – Geld und Geldpolitik (Bildung)', url: 'https://www.bundesbank.de/de/service/schule-und-bildung' },
  ],
};
