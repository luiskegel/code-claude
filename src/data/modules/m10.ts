import type { Module } from '@/types';
import { QUIZ_M10 } from '../quizzes/hard2';

export const m10: Module = {
  id: 'm10',
  number: 10,
  title: 'Risikomanagement',
  subtitle: 'Verluste verstehen, begrenzen und aushalten',
  category: 'risiko',
  icon: 'ShieldAlert',
  description:
    'Erfolgreiche Anleger zeichnen sich weniger durch spektakuläre Gewinne aus als durch das Vermeiden großer Verluste. In diesem besonders ausführlichen Modul lernst du, welche Risiken es gibt, wie du sie misst und wie du dein Depot so aufbaust, dass du auch schwere Krisen übersteht.',
  lessons: [
    {
      id: 'm10-l1',
      title: 'Warum man Geld verlieren kann: Totalverlust, Volatilität und Drawdown',
      minutes: 18,
      intro:
        'Aktien bieten Chancen, weil sie Risiken tragen. Ohne Risiko gäbe es keine Rendite über dem Zins eines Sparbuchs. Diese Lektion zeigt dir ehrlich, wie stark Aktienkurse fallen können und wie man Risiken misst.',
      sections: [
        {
          heading: 'Warum kann man mit Aktien Geld verlieren?',
          paragraphs: [
            'Aktienkurse spiegeln Erwartungen über die Zukunft wider. Werden diese Erwartungen enttäuscht, fällt der Kurs. Gründe für Verluste sind:',
          ],
          bullets: [
            'Unternehmensrisiko: schlechtes Management, Produktflops, Skandale, Konkurrenz, Pleite.',
            'Branchenrisiko: technologische Umbrüche, Regulierung, Rohstoffpreise.',
            'Marktrisiko: Rezessionen, Zinserhöhungen, Krisen und Crashs, bei denen fast alle Aktien fallen.',
            'Währungsrisiko: Bei Aktien in Fremdwährung kann ein steigender Euro die Rendite schmälern.',
            'Liquiditätsrisiko: Bei kleinen Werten findest du in Krisen eventuell keinen Käufer zu einem fairen Preis.',
            'Verhaltensrisiko: Du selbst – durch Panikverkäufe, Gier oder Übermut (siehe Modul 11).',
          ],
        },
        {
          heading: 'Was ist ein Totalverlust?',
          paragraphs: [
            'Ein **Totalverlust** bedeutet, dass eine Anlage komplett wertlos wird. Bei Aktien passiert das typischerweise bei einer **Insolvenz**: Zuerst werden Gläubiger bedient, Aktionäre stehen ganz hinten und gehen meist leer aus. Auch bekannte Unternehmen sind schon insolvent gegangen. Bei einer einzelnen Aktie ist ein Totalverlust immer möglich, bei einem breit gestreuten Weltindex mit tausenden Unternehmen dagegen äußerst unwahrscheinlich.',
          ],
        },
        {
          heading: 'Volatilität: Wie stark schwankt eine Anlage?',
          paragraphs: [
            'Die **Volatilität** misst, wie stark der Kurs einer Anlage schwankt. Technisch ist sie meist die annualisierte **Standardabweichung** der Renditen. Eine Volatilität von 15 % bedeutet vereinfacht: In etwa zwei von drei Jahren liegt die Rendite innerhalb von ±15 Prozentpunkten um den Durchschnitt – in jedem dritten Jahr auch außerhalb.',
            'Breite Aktienindizes haben langfristig oft eine Volatilität von etwa 15–20 % pro Jahr, Einzelaktien deutlich mehr (25–60 % und mehr). Tagesgeld hat praktisch keine Kursvolatilität. Volatilität ist nicht dasselbe wie dauerhafter Verlust – aber sie ist der Preis, den man für höhere erwartete Renditen zahlt.',
          ],
        },
        {
          heading: 'Drawdown: Der Absturz vom Hoch',
          paragraphs: [
            'Der **Drawdown** misst den Rückgang vom letzten Höchststand bis zum folgenden Tiefpunkt. Der **maximale Drawdown** ist der größte solche Rückgang in einem Zeitraum. Für Anleger ist er oft greifbarer als die Volatilität, weil er beantwortet: „Wie viel hätte ich im schlimmsten Fall zwischenzeitlich verloren?“',
            'Historische Beispiele für breite Indizes: In der Dotcom-Krise (2000–2003) verlor der DAX rund 70 %, in der Finanzkrise 2007–2009 rund 55 %, im Corona-Crash 2020 innerhalb weniger Wochen fast 40 %. Weltweite Indizes fielen in der Finanzkrise um etwa die Hälfte. Nach jedem dieser Einbrüche haben sich diese breiten Indizes erholt – teils schnell, teils erst nach vielen Jahren. Das ist eine Beobachtung der Vergangenheit, keine Garantie.',
          ],
          formula: 'Drawdown (%) = (Tiefpunkt − vorheriges Hoch) / vorheriges Hoch × 100',
        },
        {
          heading: 'Die Mathematik der Erholung',
          paragraphs: [
            'Verluste und Gewinne sind nicht symmetrisch: Nach −20 % brauchst du +25 %, nach −50 % schon +100 %, nach −80 % sogar +400 %, um wieder auf null zu kommen. Deshalb ist das Vermeiden großer Verluste für den langfristigen Erfolg so wichtig.',
          ],
          formula: 'Benötigter Gewinn = Verlust / (1 − Verlust)',
        },
      ],
      examples: [
        {
          title: 'Beispiel: Drawdown berechnen',
          text: 'Dein Depot steigt von 10.000 € auf 14.000 €, fällt dann auf 9.800 € und erholt sich auf 12.000 €. Der maximale Drawdown beträgt (9.800 − 14.000) / 14.000 = −30 %. Obwohl du am Ende im Plus bist, musstest du zwischenzeitlich 4.200 € Buchverlust aushalten.',
        },
        {
          title: 'Beispiel: Einzelaktie vs. Index in der Krise',
          text: 'In einer Krise fällt ein breiter Index um 35 %. Eine einzelne Bank im Index fällt um 80 % und muss mit Staatshilfe gerettet werden, wobei die Altaktionäre stark verwässert werden. Der Index erholt sich nach drei Jahren, die Bankaktie erreicht ihr altes Niveau nie wieder.',
        },
      ],
      practice: [
        'Nutze den Drawdown-Simulator unten: Wie lange dauert die Erholung nach verschiedenen Einbrüchen bei unterschiedlichen Renditen?',
        'Lies im virtuellen Depot den Kursverlauf der fiktiven Volaris Biotech über ein simuliertes Jahr und bestimme den maximalen Drawdown.',
      ],
      terms: [
        { term: 'Totalverlust', definition: 'Vollständiger Wertverlust einer Anlage.' },
        { term: 'Insolvenz', definition: 'Zahlungsunfähigkeit oder Überschuldung eines Unternehmens.' },
        { term: 'Volatilität', definition: 'Maß für die Schwankungsbreite einer Anlage (meist Standardabweichung).' },
        { term: 'Drawdown', definition: 'Rückgang vom Höchststand bis zum Tiefpunkt.' },
        { term: 'Maximaler Drawdown', definition: 'Größter Rückgang vom Hoch zum Tief in einem Zeitraum.' },
        { term: 'Marktrisiko', definition: 'Risiko, dass der gesamte Markt fällt.' },
      ],
      mistakes: [
        'Zu glauben, bekannte Unternehmen könnten nicht pleitegehen.',
        'Volatilität erst ernst zu nehmen, wenn sie das eigene Depot trifft.',
        'Die Asymmetrie von Verlusten zu unterschätzen.',
        'Mit Geld zu investieren, das man bei einem Drawdown von 40 % nicht verkraften würde.',
      ],
      summary: [
        'Verluste entstehen durch Unternehmens-, Branchen-, Markt-, Währungs- und Verhaltensrisiken.',
        'Bei Einzelaktien ist ein Totalverlust immer möglich.',
        'Volatilität misst Schwankungen, der Drawdown den Absturz vom Hoch.',
        'Große Verluste erfordern überproportionale Gewinne zur Erholung.',
      ],
      exercise: {
        title: 'Erholung nach dem Crash',
        task: 'Dein Depot fällt von 20.000 € auf 12.000 €. Wie hoch ist der Drawdown, und um wie viel Prozent muss das Depot steigen, um wieder 20.000 € zu erreichen? Wie viele Jahre dauert das bei angenommenen 7 % Rendite pro Jahr ungefähr?',
        solution: 'Drawdown: (12.000 − 20.000) / 20.000 = −40 %. Benötigter Anstieg: 8.000 / 12.000 = +66,7 %. Bei 7 % pro Jahr: ln(1,667) / ln(1,07) ≈ 7,6 Jahre (Modellrechnung).',
      },
      widget: 'drawdown',
    },
    {
      id: 'm10-l2',
      title: 'Diversifikation und Klumpenrisiko',
      minutes: 15,
      intro:
        'Klumpenrisiko ist eine der häufigsten Ursachen für hohe Verluste von Privatanlegern. Diese Lektion zeigt, wie Klumpen entstehen und wie du sie erkennst.',
      sections: [
        {
          heading: 'Was ist Diversifikation?',
          paragraphs: [
            '**Diversifikation** bedeutet, das Kapital auf viele Anlagen zu verteilen, deren Wertentwicklung nicht perfekt zusammenhängt. Das Maß für diesen Zusammenhang heißt **Korrelation**: +1 bedeutet, zwei Anlagen bewegen sich immer gleich, 0 bedeutet kein Zusammenhang, −1 bedeutet gegenläufig. Je niedriger die Korrelation, desto stärker wirkt die Streuung.',
            'Man kann auf mehreren Ebenen streuen: **Einzelwerte** (viele Unternehmen), **Branchen**, **Länder und Regionen**, **Währungen**, **Anlageklassen** (Aktien, Anleihen, Tagesgeld, Immobilien) und **Zeit** (gestaffelt über Sparpläne investieren).',
          ],
        },
        {
          heading: 'Was ist Klumpenrisiko?',
          paragraphs: [
            'Ein **Klumpenrisiko** entsteht, wenn ein großer Teil des Vermögens von einem einzigen Faktor abhängt. Typische Klumpen:',
          ],
          bullets: [
            'Eine einzelne Aktie macht mehr als 10–20 % des Depots aus.',
            'Arbeitgeberaktien: Dein Gehalt und dein Vermögen hängen am selben Unternehmen – im Krisenfall droht doppelter Schaden.',
            'Heimatmarkt-Neigung (Home Bias): Deutsche Anleger halten oft überwiegend deutsche Aktien, obwohl Deutschland nur wenige Prozent des Weltmarkts ausmacht.',
            'Branchen-Klumpen: z. B. nur Technologie oder nur Banken.',
            'Unbewusste Doppelungen: Mehrere ETFs, die alle dieselben großen US-Technologieunternehmen enthalten.',
          ],
        },
        {
          heading: 'Wie viel Streuung ist genug?',
          paragraphs: [
            'Studien zeigen, dass das Einzelrisiko schon mit 20–30 Aktien aus unterschiedlichen Branchen deutlich sinkt. Ein breiter Welt-ETF enthält tausende Unternehmen und bietet maximale Streuung innerhalb der Anlageklasse Aktien. Gegen das allgemeine Marktrisiko hilft nur die Aufteilung auf unterschiedliche Anlageklassen – etwa ein sicherer Anteil in Tagesgeld oder hochwertigen Anleihen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Arbeitgeberaktie',
          text: 'Markus arbeitet bei einem Autozulieferer und hat 70 % seines Vermögens in Aktien seines Arbeitgebers. In einer Branchenkrise fällt die Aktie um 60 %, gleichzeitig wird seine Stelle abgebaut. Er verliert Einkommen und Vermögen zur selben Zeit. Eine breite Streuung hätte diesen Doppelschlag abgefedert.',
        },
        {
          title: 'Beispiel: Effektive Anzahl der Positionen',
          text: 'Ein Depot hat 10 Positionen, aber eine davon macht 55 % aus. Rechnerisch (Herfindahl-Index) entspricht das Risiko eher einem Depot mit etwa 3 gleich großen Positionen. Die Zahl der Positionen allein sagt also wenig – die Gewichtung ist entscheidend.',
        },
      ],
      practice: [
        'Gib im Diversifikations-Simulator unten dein eigenes oder ein Beispiel-Depot ein und lies die „effektive Anzahl“ der Positionen ab.',
        'Prüfe, ob in deinem (realen oder geplanten) Depot ein Klumpenrisiko besteht: Land, Branche, Einzelwert, Arbeitgeber.',
      ],
      terms: [
        { term: 'Klumpenrisiko', definition: 'Hohe Abhängigkeit des Vermögens von einem einzelnen Faktor.' },
        { term: 'Korrelation', definition: 'Maß für den Gleichlauf zweier Anlagen zwischen −1 und +1.' },
        { term: 'Home Bias', definition: 'Übergewichtung von Anlagen aus dem eigenen Land.' },
        { term: 'Anlageklasse', definition: 'Gruppe ähnlicher Anlagen, z. B. Aktien, Anleihen, Immobilien, Cash.' },
        { term: 'Herfindahl-Index', definition: 'Kennzahl für Konzentration: Summe der quadrierten Gewichte.' },
      ],
      mistakes: [
        'Viele Positionen mit sehr ungleicher Gewichtung für diversifiziert zu halten.',
        'Große Anteile in Arbeitgeberaktien zu halten.',
        'Nur in den Heimatmarkt zu investieren.',
        'Gewinner unkontrolliert wachsen zu lassen, bis sie das Depot dominieren – ohne das bewusst zu entscheiden.',
      ],
      summary: [
        'Diversifikation streut Risiken über Werte, Branchen, Länder, Anlageklassen und Zeit.',
        'Klumpenrisiken entstehen durch Konzentration auf einen Faktor.',
        'Gewichtungen sind wichtiger als die reine Anzahl der Positionen.',
        'Gegen Marktrisiken helfen nur unterschiedliche Anlageklassen.',
      ],
      exercise: {
        title: 'Klumpen finden',
        task: 'Depot: 40 % S&P-500-ETF, 30 % Nasdaq-100-ETF, 20 % MSCI-World-ETF, 10 % Einzelaktie eines US-Technologiekonzerns. Wo liegt das Klumpenrisiko?',
        solution: 'Fast das gesamte Depot ist in US-Aktien investiert (MSCI World ca. 70 % USA) und stark auf große Technologiekonzerne konzentriert, die in allen drei ETFs mit hohem Gewicht enthalten sind. Die Einzelaktie ist wahrscheinlich zusätzlich in allen ETFs enthalten. Es besteht ein Länder-, Branchen- und Währungsklumpen (US-Dollar).',
      },
      widget: 'diversification',
    },
    {
      id: 'm10-l3',
      title: 'Risikoprofil, Risikotoleranz, Positionsgröße und Stop-Loss',
      minutes: 18,
      intro:
        'Wie viel Risiko solltest du eingehen? Das hängt nicht nur davon ab, was du möchtest, sondern auch davon, was du dir leisten kannst. Diese Lektion hilft dir, dein Risiko bewusst zu steuern.',
      sections: [
        {
          heading: 'Was ist ein Risikoprofil?',
          paragraphs: [
            'Dein **Risikoprofil** beschreibt, wie viel Risiko zu dir passt. Es setzt sich aus drei Teilen zusammen:',
          ],
          bullets: [
            'Risikotragfähigkeit (objektiv): Wie viel Verlust kannst du finanziell verkraften, ohne dass deine Lebensplanung gefährdet ist? Abhängig von Einkommen, Rücklagen, Schulden und Anlagehorizont.',
            'Risikotoleranz bzw. Risikobereitschaft (subjektiv): Wie viel Schwankung hältst du emotional aus, ohne nachts schlecht zu schlafen oder in Panik zu verkaufen?',
            'Anlageziel und Horizont: Wofür und wie lange legst du an? Geld für ein Auto in zwei Jahren gehört nicht in Aktien.',
          ],
        },
        {
          heading: 'Risikotoleranz realistisch einschätzen',
          paragraphs: [
            'Viele Menschen überschätzen ihre Risikotoleranz in guten Zeiten. Eine hilfreiche Frage lautet: „Wenn mein Depot von 20.000 € auf 11.000 € fällt – würde ich weiter investieren, nichts tun oder verkaufen?“ Wer ehrlich „verkaufen“ antwortet, sollte einen geringeren Aktienanteil wählen. Eine einfache Steuerung ist die Aufteilung zwischen einem **risikoarmen Teil** (Tagesgeld, Festgeld, hochwertige kurz laufende Anleihen) und einem **risikoreichen Teil** (Aktien, Aktien-ETFs).',
          ],
        },
        {
          heading: 'Positionsgrößenmanagement',
          paragraphs: [
            'Das **Positionsgrößenmanagement** (Position Sizing) legt fest, wie viel Kapital du in eine einzelne Position steckst. Zwei einfache Methoden:',
          ],
          bullets: [
            'Prozent-Obergrenze: Keine Einzelaktie über z. B. 5 % des Depots, kein spekulativer Wert über 1–2 %.',
            'Risikobudget-Methode (für aktive Anleger): Du riskierst pro Position maximal z. B. 1 % deines Kapitals. Mit Einstiegskurs und Stop-Loss berechnest du die Stückzahl.',
          ],
          formula: 'Stückzahl = (Kapital × Risiko in %) / (Einstiegskurs − Stop-Kurs)',
        },
        {
          heading: 'Was ist ein Stop-Loss?',
          paragraphs: [
            'Ein **Stop-Loss** ist eine vorab festgelegte Verlustgrenze, oft umgesetzt mit einer Stop-Loss-Order (siehe Modul 3). Er schützt vor großen Verlusten, wenn sich ein Investment anders entwickelt als erwartet. Nachteile: Kurslücken können zu schlechteren Ausführungen führen, zu enge Stopps werden durch normale Schwankungen ausgelöst, und bei langfristigen ETF-Anlegern kann ein Stop-Loss dazu führen, dass man genau am Tiefpunkt verkauft.',
            'Für Langfristanleger ist die wichtigste „Verlustbegrenzung“ meist nicht der Stop-Loss, sondern die richtige **Aufteilung zwischen sicheren und riskanten Anlagen** sowie die Streuung.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Positionsgröße nach Risikobudget',
          text: 'Kapital 10.000 €, Risiko pro Position 1 % = 100 €. Einstieg 50 €, Stop-Loss 45 € → Risiko je Aktie 5 €. Stückzahl: 100 / 5 = 20 Aktien (1.000 € Positionsgröße). Wird der Stop ausgelöst, verlierst du rund 100 € (ohne Kurslücke und Gebühren).',
        },
        {
          title: 'Beispiel: Aufteilung sicher / riskant',
          text: 'Du hast 30.000 € und hältst einen zwischenzeitlichen Verlust von höchstens 6.000 € für tragbar. Angenommen, Aktien können in einer schweren Krise um 50 % fallen, dann sollte der Aktienanteil bei etwa 12.000 € liegen (12.000 × 50 % = 6.000 €), der Rest risikoarm. Das ist eine vereinfachte Überlegung – auch stärkere Rückgänge sind möglich.',
        },
      ],
      practice: [
        'Nutze den Risikorechner unten: Gib dein Kapital, dein Risikobudget und Szenarien ein und sieh, wie sich Verluste auf dein Kapital auswirken.',
        'Beantworte für dich: Welcher Verlust in Euro wäre für dich gerade noch akzeptabel?',
      ],
      terms: [
        { term: 'Risikoprofil', definition: 'Zusammenfassung von Risikotragfähigkeit, -bereitschaft und Anlageziel.' },
        { term: 'Risikotragfähigkeit', definition: 'Objektiv verkraftbarer Verlust.' },
        { term: 'Risikotoleranz', definition: 'Subjektive Bereitschaft, Schwankungen und Verluste auszuhalten.' },
        { term: 'Positionsgröße', definition: 'Kapitalanteil, der in eine einzelne Anlage investiert wird.' },
        { term: 'Stop-Loss', definition: 'Festgelegte Verlustgrenze für eine Position.' },
        { term: 'Risikobudget', definition: 'Maximaler Betrag, den man pro Position riskiert.' },
      ],
      mistakes: [
        'Die eigene Risikotoleranz in Boomphasen zu überschätzen.',
        'Einzelne Positionen zu groß werden zu lassen.',
        'Stop-Loss-Marken nach unten zu verschieben, wenn der Kurs sich nähert („Es wird schon wieder“).',
        'Keine schriftlichen Regeln zu haben.',
      ],
      summary: [
        'Das Risikoprofil verbindet finanzielle Tragfähigkeit und emotionale Toleranz.',
        'Die Aufteilung zwischen sicheren und riskanten Anlagen ist der wichtigste Risikohebel.',
        'Positionsgrößen begrenzen den Schaden einzelner Fehlentscheidungen.',
        'Stop-Loss-Orders helfen, haben aber Grenzen.',
      ],
      exercise: {
        title: 'Positionsgröße berechnen',
        task: 'Kapital 25.000 €, maximales Risiko pro Position 2 %. Einstieg 80 €, Stop-Loss 72 €. Wie viele Aktien kaufst du maximal und wie groß ist die Position?',
        solution: 'Risikobudget: 25.000 × 2 % = 500 €. Risiko je Aktie: 80 − 72 = 8 €. Stückzahl: 500 / 8 = 62 Aktien (abgerundet). Positionsgröße: 62 × 80 € = 4.960 € (knapp 20 % des Depots – prüfe zusätzlich deine Prozent-Obergrenze!).',
      },
      widget: 'risk-calculator',
    },
    {
      id: 'm10-l4',
      title: 'Kredite und Hebel: Warum geliehenes Geld so gefährlich ist',
      minutes: 15,
      intro:
        'Mit geliehenem Geld oder Hebelprodukten lassen sich Gewinne vervielfachen – Verluste aber genauso. Diese Lektion zeigt, warum Anfänger davon unbedingt die Finger lassen sollten.',
      riskNote:
        'Hebelprodukte und kreditfinanzierte Anlagen können zu Verlusten führen, die das eingesetzte Kapital übersteigen oder sehr schnell zum Totalverlust führen. Für Anfänger sind sie nicht geeignet.',
      sections: [
        {
          heading: 'Warum sollte man nicht mit geliehenem Geld investieren?',
          paragraphs: [
            'Wer mit Krediten investiert (z. B. mit einem Konsumkredit, Dispokredit oder einem Wertpapierkredit), muss Zinsen zahlen und den Kredit zurückzahlen – egal, wie sich die Aktien entwickeln. Fällt der Markt, entsteht nicht nur ein Verlust, sondern ein Schuldenberg. Zudem musst du die Zinskosten erst einmal verdienen, bevor du überhaupt Gewinn machst.',
            'Besonders gefährlich ist der **Wertpapierkredit** (Lombardkredit, Margin): Fällt der Depotwert, verlangt die Bank zusätzliche Sicherheiten (**Margin Call**). Kannst du nicht nachschießen, verkauft die Bank deine Wertpapiere – oft genau am Tiefpunkt.',
          ],
        },
        {
          heading: 'Warum sind Hebelprodukte besonders riskant?',
          paragraphs: [
            '**Hebelprodukte** wie Optionsscheine, Knock-out-Zertifikate, Faktor-Zertifikate oder CFDs vervielfachen die Kursbewegung eines Basiswerts. Ein Hebel von 5 bedeutet: Steigt der Basiswert um 2 %, steigt das Produkt um ca. 10% – fällt er um 2 %, fällt es um ca. 10 %.',
          ],
          bullets: [
            'Knock-out: Erreicht der Basiswert eine bestimmte Schwelle, verfällt das Produkt sofort (fast) wertlos.',
            'Faktor-Zertifikate: Durch die tägliche Anpassung des Hebels entsteht ein Verlust in Seitwärtsphasen (Volatilitätsverlust), selbst wenn der Basiswert am Ende unverändert ist.',
            'CFDs: Verluste können theoretisch über den Einsatz hinausgehen; für Privatkunden gilt in der EU zwar eine Nachschusspflicht-Begrenzung, der Einsatz kann aber sehr schnell verloren sein. Die Anbieter müssen offenlegen, wie viel Prozent der Kleinanleger mit CFDs Geld verlieren – meist sind es deutlich über 70 %.',
            'Zeitwertverlust: Optionsscheine verlieren mit der Zeit an Wert, wenn sich der Basiswert nicht wie erwartet bewegt.',
          ],
        },
        {
          heading: 'Der Volatilitätsverlust beim Hebel',
          paragraphs: [
            'Ein Beispiel zeigt die Tücke: Ein Basiswert fällt an Tag 1 um 10 % (100 → 90) und steigt an Tag 2 um 11,1 % (90 → 100). Er steht wieder bei 100. Ein Faktor-Zertifikat mit Hebel 5 fällt an Tag 1 um 50 % (100 → 50) und steigt an Tag 2 um 55,6 % (50 → 77,8). Obwohl der Basiswert unverändert ist, hast du 22 % verloren.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Investieren mit Kredit',
          text: 'Du nimmst 10.000 € Kredit zu 8 % Zinsen auf und investierst in Aktien. Nach einem Jahr ist der Markt um 20 % gefallen: Depotwert 8.000 €. Du schuldest 10.000 € plus 800 € Zinsen. Verlust: 2.800 € – und das Geld musst du aus deinem Einkommen bezahlen.',
        },
        {
          title: 'Beispiel: Knock-out-Zertifikat',
          text: 'Du kaufst ein Knock-out-Long-Zertifikat auf den DAX mit Knock-out-Schwelle 5 % unter dem aktuellen Stand. Nach einer schlechten Nachricht fällt der DAX innerhalb eines Tages um 5,5 %. Das Zertifikat wird ausgeknockt – Totalverlust bzw. nur ein minimaler Restwert –, auch wenn der DAX am nächsten Tag wieder steigt.',
        },
      ],
      practice: [
        'Simuliere im Hebel-Simulator unten, wie sich ein Hebel von 2, 5 und 10 auf eine schwankende Kursreihe auswirkt.',
        'Lies auf der Webseite der BaFin die Verbraucherwarnungen zu CFDs und Online-Trading-Plattformen.',
      ],
      terms: [
        { term: 'Hebel', definition: 'Faktor, um den ein Produkt die Kursbewegung des Basiswerts verstärkt.' },
        { term: 'Wertpapierkredit', definition: 'Kredit, der durch das Depot besichert ist (Lombardkredit).' },
        { term: 'Margin Call', definition: 'Aufforderung, zusätzliche Sicherheiten zu hinterlegen.' },
        { term: 'Knock-out', definition: 'Sofortiger Verfall eines Hebelprodukts beim Erreichen einer Schwelle.' },
        { term: 'CFD', definition: 'Contract for Difference – Differenzkontrakt auf Kursbewegungen.' },
        { term: 'Volatilitätsverlust', definition: 'Wertverlust gehebelter Produkte durch Schwankungen.' },
      ],
      mistakes: [
        'Mit Dispo- oder Konsumkrediten Aktien zu kaufen.',
        'Hebelprodukte zu kaufen, ohne ihre Funktionsweise zu verstehen.',
        'Werbeversprechen für „schnelles Geld“ mit Hebelprodukten zu glauben.',
        'Verluste mit noch mehr Hebel „zurückholen“ zu wollen.',
      ],
      summary: [
        'Kredite verwandeln Kursverluste in Schulden.',
        'Hebelprodukte vervielfachen Gewinne und Verluste und können schnell wertlos werden.',
        'Gehebelte Produkte verlieren in Schwankungsphasen auch ohne Kursverlust an Wert.',
        'Anfänger sollten Kredite und Hebel beim Investieren meiden.',
      ],
      exercise: {
        title: 'Hebel durchrechnen',
        task: 'Ein Basiswert bewegt sich an drei Tagen: +5 %, −5 %, +5 %. Berechne den Endwert für den Basiswert (Start 100) und für ein Produkt mit täglichem Hebel 4 (Start 100).',
        steps: ['Basiswert: 100 × 1,05 × 0,95 × 1,05 = 104,74', 'Hebel 4: 100 × 1,20 × 0,80 × 1,20 = 115,20'],
        solution: 'Basiswert +4,7 %, Hebelprodukt +15,2 %. Klingt gut – aber kehrt sich die Reihenfolge der Bewegungen um oder kommen weitere Schwankungen hinzu, verliert das Hebelprodukt schnell überproportional. Mit Hebel 4 reicht ein einzelner Tag mit −25 % für einen Totalverlust.',
      },
      widget: 'leverage',
    },
  ],
  quiz: QUIZ_M10,
  sources: [
    { label: 'BaFin – Verbraucherwarnungen und Risiken von Finanzprodukten', url: 'https://www.bafin.de/DE/Verbraucher/verbraucher_node.html' },
    { label: 'ESMA – Maßnahmen zu CFDs', url: 'https://www.esma.europa.eu' },
    { label: 'Deutsche Bundesbank – Finanzstabilität und Bildung', url: 'https://www.bundesbank.de/de/service/schule-und-bildung' },
    { label: 'Verbraucherzentrale – Risiken der Geldanlage', url: 'https://www.verbraucherzentrale.de/geld-versicherungen' },
  ],
};
