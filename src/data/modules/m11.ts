import type { Module } from '@/types';
import { QUIZ_M11 } from '../quizzes/hard2';

export const m11: Module = {
  id: 'm11',
  number: 11,
  title: 'Psychologie und Emotionen an der Börse',
  subtitle: 'FOMO, Panik, Gier, Herdentrieb und Denkfehler',
  category: 'risiko',
  icon: 'Brain',
  description:
    'Der größte Feind des Anlegers ist oft der Anleger selbst. Du lernst die wichtigsten emotionalen Fallen und Denkfehler kennen, triffst in interaktiven Situationen eigene Entscheidungen und entwickelst Strategien, um deinem Plan treu zu bleiben.',
  lessons: [
    {
      id: 'm11-l1',
      title: 'Gier, Angst, FOMO und Panikverkäufe',
      minutes: 14,
      intro:
        'An der Börse wechseln sich zwei Gefühle ab: Gier, wenn alles steigt, und Angst, wenn alles fällt. Wer diese Gefühle kennt, kann sie besser kontrollieren.',
      sections: [
        {
          heading: 'Gier',
          paragraphs: [
            '**Gier** zeigt sich, wenn Kurse lange gestiegen sind und Anleger glauben, es könne nur noch aufwärtsgehen. Typische Folgen: zu große Positionen, Kauf überteuerter Aktien, Einsatz von Hebeln oder Krediten, Vernachlässigung von Risiken. In Spekulationsblasen – etwa der Dotcom-Blase um das Jahr 2000 – trieben Gier und Euphorie die Kurse weit über jede vernünftige Bewertung.',
          ],
        },
        {
          heading: 'Angst',
          paragraphs: [
            '**Angst** tritt auf, wenn Kurse stark fallen und Nachrichten nur noch von Krisen berichten. Unser Gehirn reagiert auf Verluste mit ähnlichen Stressmechanismen wie auf echte Gefahren. Die Folge: Wir wollen „nur noch raus“ – oft genau dann, wenn die Kurse besonders niedrig sind.',
          ],
        },
        {
          heading: 'FOMO – die Angst, etwas zu verpassen',
          paragraphs: [
            '**FOMO** („Fear of Missing Out“) beschreibt das Gefühl, eine einmalige Chance zu verpassen, während alle anderen reich werden. Es entsteht oft durch soziale Medien, Gespräche im Freundeskreis oder Schlagzeilen über Kursraketen. FOMO führt dazu, dass Anleger spät in einen Hype einsteigen, ohne zu analysieren – häufig kurz bevor die Kurse wieder fallen.',
          ],
        },
        {
          heading: 'Panikverkäufe',
          paragraphs: [
            'Ein **Panikverkauf** ist ein überstürzter Verkauf aus Angst, meist nach starken Kursrückgängen. Damit wird ein Buchverlust zu einem realen Verlust, und viele verpassen die anschließende Erholung. Historisch folgten auf die schlimmsten Börsentage oft einige der besten Tage. Ein Plan, der vorher festlegt, wie du auf Rückgänge reagierst, ist der beste Schutz gegen Panik.',
          ],
        },
        {
          heading: 'Der Emotionszyklus',
          paragraphs: ['Viele Anleger durchlaufen in einem Marktzyklus typische Gefühlsphasen:'],
          bullets: [
            'Optimismus → Begeisterung → Euphorie (Höhepunkt: „Ich bin ein Börsengenie!“, höchstes Risiko)',
            'Sorge → Verleugnung („Das ist nur eine Korrektur“) → Angst',
            'Verzweiflung → Panik → Kapitulation (Tiefpunkt: „Nie wieder Aktien!“, oft größte Chance)',
            'Hoffnung → Erleichterung → Optimismus',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: FOMO bei einer Hype-Aktie',
          text: 'Eine Aktie steigt in drei Monaten um 300 %. In Foren schreiben alle von „Mondflug“. Sarah kauft auf dem Höhepunkt für 3.000 €, ohne zu wissen, was das Unternehmen macht. Zwei Monate später ist die Aktie um 70 % gefallen. Sarah hat nicht in ein Unternehmen investiert, sondern in eine Stimmung.',
        },
        {
          title: 'Beispiel: Panik im Crash',
          text: 'Im März eines Krisenjahres fällt Toms ETF-Depot in vier Wochen um 35 %. Er verkauft alles, um „Schlimmeres zu verhindern“. Bis Jahresende erholt sich der Markt fast vollständig. Tom hat den Verlust realisiert und die Erholung verpasst. Sein Nachbar mit demselben Depot hat einfach weitergespart.',
        },
      ],
      practice: [
        'Schreibe auf, wie du dich fühlen würdest, wenn dein Depot in einem Monat um 30 % fällt. Was würdest du tun?',
        'Beobachte eine Woche lang Finanzschlagzeilen und notiere, welche Gefühle sie bei dir auslösen.',
      ],
      terms: [
        { term: 'Gier', definition: 'Übertriebener Wunsch nach Gewinnen, oft in Boomphasen.' },
        { term: 'Angst', definition: 'Emotionale Reaktion auf Verluste und Unsicherheit.' },
        { term: 'FOMO', definition: 'Fear of Missing Out – Angst, eine Chance zu verpassen.' },
        { term: 'Panikverkauf', definition: 'Überstürzter Verkauf aus Angst.' },
        { term: 'Spekulationsblase', definition: 'Starker Kursanstieg weit über den fundamentalen Wert hinaus.' },
        { term: 'Kapitulation', definition: 'Phase, in der viele Anleger entnervt verkaufen – oft nahe dem Tiefpunkt.' },
      ],
      mistakes: [
        'Anlageentscheidungen auf Basis von Schlagzeilen oder Social-Media-Hypes zu treffen.',
        'In der Euphorie Positionen zu vergrößern und Risiken zu ignorieren.',
        'Im Crash alles zu verkaufen, ohne einen Plan zu haben.',
      ],
      summary: [
        'Gier treibt Kurse in Blasen, Angst führt zu Panikverkäufen.',
        'FOMO verleitet zum Kauf von Hype-Aktien ohne Analyse.',
        'Panikverkäufe machen Buchverluste real und verpassen Erholungen.',
        'Ein vorher festgelegter Plan schützt vor emotionalen Fehlern.',
      ],
      exercise: {
        title: 'Emotion erkennen',
        task: 'Ordne zu: (a) „Alle meine Kollegen haben mit Krypto Geld verdient – ich muss jetzt auch rein!“ (b) „Der Markt ist 20 % gefallen. Ich verkaufe alles, bevor es noch schlimmer wird.“ (c) „Meine Aktie hat sich verdoppelt – ich nehme einen Kredit auf und kaufe mehr.“',
        solution: '(a) FOMO. (b) Angst / drohender Panikverkauf. (c) Gier (verstärkt durch Selbstüberschätzung) – besonders gefährlich wegen des Kredits.',
      },
    },
    {
      id: 'm11-l2',
      title: 'Denkfehler: Herdenverhalten, Verlustaversion, Confirmation Bias und Overtrading',
      minutes: 17,
      intro:
        'Neben Gefühlen gibt es systematische Denkfehler, die die Verhaltensökonomie (Behavioral Finance) erforscht hat. In dieser Lektion triffst du in Praxissituationen eigene Entscheidungen und erfährst anschließend, welche Denkfehler im Spiel sein könnten.',
      sections: [
        {
          heading: 'Herdenverhalten',
          paragraphs: [
            '**Herdenverhalten** bedeutet, das zu tun, was alle anderen tun – in der Annahme, die Masse wisse es besser. In der Steinzeit war das eine sinnvolle Überlebensstrategie, an der Börse führt es zu Übertreibungen: Alle kaufen, wenn es teuer ist, und alle verkaufen, wenn es billig ist.',
          ],
        },
        {
          heading: 'Verlustaversion',
          paragraphs: [
            'Die Forscher Daniel Kahneman und Amos Tversky zeigten, dass Verluste uns psychologisch etwa doppelt so stark schmerzen, wie gleich große Gewinne uns freuen. Diese **Verlustaversion** führt zu zwei typischen Fehlern: Verlierer zu lange halten (um den Verlust nicht realisieren zu müssen) und Gewinner zu früh verkaufen (um den Gewinn zu „sichern“). Man nennt das den **Dispositionseffekt**.',
          ],
        },
        {
          heading: 'Confirmation Bias (Bestätigungsfehler)',
          paragraphs: [
            'Beim **Confirmation Bias** suchen wir bevorzugt nach Informationen, die unsere Meinung bestätigen, und ignorieren widersprechende. Wer von einer Aktie überzeugt ist, liest nur noch positive Artikel und hält Kritiker für ahnungslos. Gegenmittel: aktiv nach Gegenargumenten suchen („Was müsste passieren, damit ich falsch liege?“).',
          ],
        },
        {
          heading: 'Overtrading',
          paragraphs: [
            '**Overtrading** bedeutet zu häufiges Handeln. Ursachen sind Selbstüberschätzung, Langeweile oder der Wunsch, „etwas zu tun“. Studien mit Daten echter Privatanleger zeigen: Wer am meisten handelt, erzielt im Durchschnitt die schlechtesten Ergebnisse – vor allem wegen Kosten, Steuern und schlechtem Timing.',
          ],
        },
        {
          heading: 'Weitere Denkfehler',
          paragraphs: ['Ebenfalls häufig:'],
          bullets: [
            'Ankereffekt: Man orientiert sich an einem beliebigen Wert, z. B. dem Kaufkurs oder dem Allzeithoch („Die war mal 100 €, jetzt ist sie mit 40 € billig“).',
            'Selbstüberschätzung (Overconfidence): Nach ein paar Gewinnen hält man sich für einen Experten.',
            'Rückschaufehler (Hindsight Bias): „Das war doch klar!“ – im Nachhinein wirkt alles vorhersehbar.',
            'Verfügbarkeitsheuristik: Was oft in den Medien ist, erscheint wichtiger und wahrscheinlicher.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Dispositionseffekt',
          text: 'Lisa besitzt Aktie A (+40 %) und Aktie B (−35 %). Sie braucht Geld und verkauft A, „weil der Gewinn sicher ist“. B behält sie, „weil sie ja wieder steigen muss“. Ob A oder B das bessere Unternehmen ist, hat sie gar nicht geprüft. Die Entscheidung folgt nur dem Wunsch, keinen Verlust realisieren zu müssen.',
        },
        {
          title: 'Beispiel: Ankereffekt',
          text: 'Eine Aktie notierte vor zwei Jahren bei 120 €, heute bei 45 €. Viele denken: „Die ist jetzt billig.“ Der alte Kurs ist aber irrelevant – entscheidend ist, was das Unternehmen heute und in Zukunft verdient. Vielleicht war 120 € völlig überteuert und 45 € ist immer noch zu viel.',
        },
      ],
      practice: [
        'Spiele die Entscheidungssituationen unten durch. Triff jeweils deine Entscheidung und lies dann die Auflösung.',
        'Prüfe deine Transaktionen im virtuellen Depot: Wie oft hast du gehandelt, und was hat dich jeweils dazu bewegt?',
      ],
      terms: [
        { term: 'Behavioral Finance', definition: 'Forschungsgebiet zum Einfluss der Psychologie auf Finanzentscheidungen.' },
        { term: 'Herdenverhalten', definition: 'Nachahmen des Verhaltens der Masse.' },
        { term: 'Verlustaversion', definition: 'Verluste schmerzen stärker, als gleich große Gewinne erfreuen.' },
        { term: 'Dispositionseffekt', definition: 'Gewinner zu früh verkaufen, Verlierer zu lange halten.' },
        { term: 'Confirmation Bias', definition: 'Bevorzugung bestätigender Informationen.' },
        { term: 'Overtrading', definition: 'Übermäßig häufiges Handeln.' },
        { term: 'Ankereffekt', definition: 'Orientierung an einem willkürlichen Referenzwert.' },
      ],
      mistakes: [
        'Den Kaufkurs als Maßstab für Verkaufsentscheidungen zu nehmen.',
        'Nur Informationen zu lesen, die die eigene Meinung stützen.',
        'Nach einigen Gewinnen die Positionsgrößen stark zu erhöhen.',
        'Aus Langeweile zu handeln.',
      ],
      summary: [
        'Herdenverhalten verstärkt Übertreibungen.',
        'Verlustaversion führt zum Dispositionseffekt.',
        'Der Confirmation Bias macht blind für Risiken.',
        'Overtrading kostet Rendite durch Gebühren, Steuern und schlechtes Timing.',
      ],
      exercise: {
        title: 'Denkfehler benennen',
        task: 'Welcher Denkfehler liegt vor? (a) „Ich habe die Aktie bei 80 € gekauft. Ich verkaufe erst, wenn ich wieder bei 80 € bin.“ (b) „Ich lese nur noch das Forum, in dem alle die Aktie lieben.“ (c) „Ich habe diese Woche 14 Trades gemacht, weil der Markt so spannend war.“',
        solution: '(a) Ankereffekt und Verlustaversion. (b) Confirmation Bias. (c) Overtrading.',
      },
      widget: 'psychology-scenarios',
    },
    {
      id: 'm11-l3',
      title: 'Warum emotionale Entscheidungen gefährlich sind – und wie du deinen Plan einhältst',
      minutes: 14,
      intro:
        'Wissen über Denkfehler allein schützt nicht vor ihnen. Du brauchst Regeln und Routinen, die dich davor bewahren, in emotionalen Momenten falsche Entscheidungen zu treffen.',
      sections: [
        {
          heading: 'Warum emotionale Entscheidungen gefährlich sind',
          paragraphs: [
            'Emotionen sind kurzfristig, Investieren ist langfristig. Emotionale Entscheidungen fallen typischerweise in Extremsituationen – auf Höchst- und Tiefstständen – und damit oft zum ungünstigsten Zeitpunkt. Zudem verursachen sie Kosten und Steuern. Untersuchungen zum Anlegerverhalten zeigen immer wieder, dass Privatanleger in Fonds im Durchschnitt schlechtere Renditen erzielen als die Fonds selbst – weil sie zu ungünstigen Zeitpunkten ein- und aussteigen.',
          ],
        },
        {
          heading: 'Wie man einen Investmentplan einhält',
          paragraphs: ['Bewährte Strategien:'],
          bullets: [
            'Schriftlicher Investmentplan: Ziele, Aufteilung, Sparrate, Regeln für Kauf, Verkauf und Krisen – aufgeschrieben in ruhigen Zeiten (Modul 15).',
            'Automatisierung: Sparpläne laufen ohne tägliche Entscheidung.',
            'Seltener ins Depot schauen: Wer täglich schaut, sieht häufiger Verluste und fühlt mehr Stress. Einmal im Monat oder Quartal reicht für Langfristanleger.',
            'Wartezeit-Regel: Vor jeder spontanen Entscheidung 48 Stunden warten.',
            'Checkliste vor jedem Kauf: Warum kaufe ich? Was ist meine These? Wann würde ich verkaufen?',
            'Investment-Tagebuch: Entscheidungen und Gründe notieren – später lernt man daraus.',
            'Rebalancing nach Regeln: Einmal im Jahr zur Zielaufteilung zurückkehren – das zwingt automatisch dazu, teuer zu verkaufen und günstig zu kaufen.',
          ],
        },
        {
          heading: 'Der Krisen-Notfallplan',
          paragraphs: [
            'Lege jetzt fest, was du bei einem Rückgang von 20 %, 30 % und 50 % tun wirst, z. B.: „Ich verkaufe nichts. Mein Sparplan läuft weiter. Ich prüfe, ob sich meine persönliche Situation geändert hat. Wenn nicht, tue ich nichts.“ In der Krise liest du diesen Plan – statt Schlagzeilen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Die 48-Stunden-Regel',
          text: 'Paul sieht abends ein Video über eine „Aktie, die sich verzehnfachen wird“. Er notiert den Namen und wartet 48 Stunden. In der Zeit liest er den Geschäftsbericht: kein Umsatz, hohe Verluste, mehrfache Kapitalerhöhungen. Er entscheidet sich gegen den Kauf. Ohne Wartezeit hätte er aus FOMO gekauft.',
        },
        {
          title: 'Beispiel: Rebalancing',
          text: 'Zielaufteilung: 70 % Aktien-ETF, 30 % Tagesgeld. Nach einem starken Jahr: 78 % / 22 %. Beim jährlichen Rebalancing verkaufst du ETF-Anteile (bzw. leitest neue Sparraten um), bis wieder 70/30 erreicht ist. Nach einem Crash (z. B. 60 / 40) kaufst du Aktien nach. Die Regel entscheidet – nicht die Stimmung.',
        },
      ],
      practice: [
        'Formuliere deinen persönlichen Krisen-Notfallplan in drei Sätzen.',
        'Lege im Bereich „Mein Investmentplan“ (Modul 15) deine Regeln fest.',
      ],
      terms: [
        { term: 'Investmentplan', definition: 'Schriftliche Festlegung von Zielen, Strategie und Regeln.' },
        { term: 'Rebalancing', definition: 'Wiederherstellen der Zielaufteilung eines Depots.' },
        { term: 'Investment-Tagebuch', definition: 'Notizen zu Entscheidungen und ihren Gründen.' },
        { term: 'Notfallplan', definition: 'Vorab festgelegtes Verhalten in Krisen.' },
      ],
      mistakes: [
        'Einen Plan zu haben, aber in der Krise davon abzuweichen.',
        'Den Plan nach jeder Marktphase zu ändern.',
        'Ständig Nachrichten und Kurse zu verfolgen.',
      ],
      summary: [
        'Emotionale Entscheidungen fallen oft zum ungünstigsten Zeitpunkt.',
        'Ein schriftlicher Plan und Automatisierung schützen vor Fehlern.',
        'Wartezeiten, Checklisten und Tagebücher schaffen Abstand.',
        'Regelbasiertes Rebalancing nutzt Übertreibungen, statt ihnen zu erliegen.',
      ],
      exercise: {
        title: 'Rebalancing berechnen',
        task: 'Zielaufteilung 60 % Aktien / 40 % Tagesgeld. Aktuell: 15.000 € Aktien, 7.000 € Tagesgeld. Was ist zu tun?',
        solution: 'Gesamt: 22.000 €. Ziel Aktien: 60 % = 13.200 €. Ziel Tagesgeld: 8.800 €. Es müssen 1.800 € von Aktien in Tagesgeld umgeschichtet werden – oder die nächsten Sparraten fließen bis zum Ausgleich ins Tagesgeld (vermeidet Verkäufe und Steuern).',
      },
    },
  ],
  quiz: QUIZ_M11,
  sources: [
    { label: 'BaFin – Finanzbildung und Anlegerschutz', url: 'https://www.bafin.de/DE/Verbraucher/verbraucher_node.html' },
    { label: 'Deutsche Bundesbank – Ökonomische Bildung', url: 'https://www.bundesbank.de/de/service/schule-und-bildung' },
    { label: 'Nobelpreis 2002 (Kahneman) – Hintergrund', url: 'https://www.nobelprize.org/prizes/economic-sciences/2002/summary/' },
  ],
};
