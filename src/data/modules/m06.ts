import type { Module } from '@/types';
import { QUIZ_M06 } from '../quizzes/hard1';

export const m06: Module = {
  id: 'm06',
  number: 6,
  title: 'Aktiencharts und technische Analyse',
  subtitle: 'Kerzen, Trends, Unterstützungen, Indikatoren und Volumen',
  category: 'aktien-analysieren',
  icon: 'CandlestickChart',
  description:
    'Charts zeigen, wie sich ein Kurs in der Vergangenheit entwickelt hat. Die technische Analyse versucht, aus diesen Mustern Rückschlüsse zu ziehen. Du lernst, Charts zu lesen, und erfährst gleichzeitig, wo die Grenzen dieser Methode liegen.',
  lessons: [
    {
      id: 'm06-l1',
      title: 'Charts lesen: Linien, Kerzen und Dochte',
      minutes: 15,
      intro:
        'Ein Chart ist die grafische Darstellung eines Kursverlaufs. Wer Charts lesen kann, versteht auf einen Blick, wie stark eine Aktie geschwankt hat und in welche Richtung sie sich bewegt.',
      sections: [
        {
          heading: 'Was ist ein Aktienchart?',
          paragraphs: [
            'Ein **Aktienchart** zeigt den Kursverlauf über die Zeit: auf der waagerechten Achse die Zeit, auf der senkrechten Achse den Kurs. Der einfachste Chart ist der **Linienchart**, der nur die Schlusskurse verbindet. Er eignet sich gut für langfristige Betrachtungen.',
            'Wichtig ist die **Skalierung**: Bei einer linearen Skala ist jeder Euro gleich groß, bei einer **logarithmischen Skala** ist jede prozentuale Veränderung gleich groß. Für lange Zeiträume ist die logarithmische Darstellung meist fairer: Ein Anstieg von 10 € auf 20 € (+100 %) sieht dann genauso groß aus wie von 100 € auf 200 € (+100 %).',
          ],
        },
        {
          heading: 'Der Candlestick-Chart',
          paragraphs: [
            'Ein **Candlestick-Chart** (Kerzenchart) zeigt pro Zeitraum (z. B. ein Tag) vier Werte: **Eröffnungskurs** (Open), **Höchstkurs** (High), **Tiefstkurs** (Low) und **Schlusskurs** (Close). Diese Darstellung stammt ursprünglich aus dem japanischen Reishandel.',
          ],
        },
        {
          heading: 'Kerzen und Dochte',
          paragraphs: [
            'Jede **Kerze** besteht aus einem **Körper** und **Dochten** (auch Schatten genannt). Der Körper reicht vom Eröffnungs- zum Schlusskurs. Ist der Schlusskurs höher als der Eröffnungskurs, ist die Kerze meist **grün** (oder weiß) – der Kurs ist gestiegen. Ist er niedriger, ist sie **rot** (oder schwarz).',
            'Die **Dochte** zeigen die Extremwerte: Der obere Docht reicht bis zum Tageshoch, der untere bis zum Tagestief. Ein langer unterer Docht bedeutet: Der Kurs ist im Tagesverlauf stark gefallen, Käufer haben ihn aber wieder hochgekauft. Ein langer oberer Docht zeigt, dass Verkäufer höhere Kurse nicht zugelassen haben.',
          ],
          bullets: [
            'Lange grüne Kerze: starker Kaufdruck.',
            'Lange rote Kerze: starker Verkaufsdruck.',
            'Doji (sehr kleiner Körper): Unentschlossenheit – Eröffnung und Schluss fast gleich.',
            'Hammer (kleiner Körper oben, langer unterer Docht): nach einem Abwärtstrend manchmal ein Hinweis auf eine mögliche Erholung.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Eine Tageskerze lesen',
          text: 'Eröffnung 50 €, Hoch 53 €, Tief 48 €, Schluss 52 €. Die Kerze ist grün (Schluss > Eröffnung). Der Körper reicht von 50 bis 52 €, der obere Docht bis 53 €, der untere bis 48 €. Interpretation: Der Kurs fiel zunächst bis 48 €, Käufer übernahmen dann die Kontrolle, am Ende gaben Verkäufer kurz vor Schluss wieder etwas nach.',
        },
        {
          title: 'Beispiel: Linear vs. logarithmisch',
          text: 'Eine Aktie stieg über 20 Jahre von 5 € auf 160 €. Im linearen Chart wirken die ersten 10 Jahre (5 € → 20 €) wie eine flache Linie, obwohl der Kurs sich vervierfacht hat. Im logarithmischen Chart siehst du die Vervierfachung der ersten 10 Jahre (Faktor 4) als deutlichen Anstieg – und erkennst fair, dass die letzten 10 Jahre (20 € → 160 €, Faktor 8) zwar stärker, aber nicht „zwanzigmal so stark“ waren, wie es der lineare Chart suggeriert. Die Log-Skala macht solche Vergleiche erst möglich.',
        },
      ],
      practice: [
        'Erkunde den interaktiven Kerzenchart unten. Fahre mit der Maus (oder dem Finger) über die Kerzen und lies Open, High, Low und Close ab.',
        'Suche im Chart nach einem langen unteren Docht und überlege, was an diesem Tag passiert sein könnte.',
      ],
      terms: [
        { term: 'Chart', definition: 'Grafische Darstellung eines Kursverlaufs.' },
        { term: 'Candlestick', definition: 'Kerze mit Eröffnungs-, Hoch-, Tief- und Schlusskurs eines Zeitraums.' },
        { term: 'Kerzenkörper', definition: 'Bereich zwischen Eröffnungs- und Schlusskurs.' },
        { term: 'Docht (Schatten)', definition: 'Linie über/unter dem Körper bis zum Hoch bzw. Tief.' },
        { term: 'Logarithmische Skala', definition: 'Skala, auf der gleiche prozentuale Veränderungen gleich groß dargestellt werden.' },
      ],
      mistakes: [
        'Langfristige Charts linear statt logarithmisch zu betrachten.',
        'Einzelnen Kerzenmustern zu viel Bedeutung beizumessen.',
        'Den gewählten Zeitraum zu vergessen – auf Tages-, Wochen- und Monatscharts sieht dieselbe Aktie völlig anders aus.',
      ],
      summary: [
        'Charts zeigen den Kursverlauf über die Zeit.',
        'Kerzen enthalten Eröffnung, Hoch, Tief und Schluss.',
        'Grüne Kerzen = gestiegen, rote Kerzen = gefallen; Dochte zeigen Extremwerte.',
        'Für lange Zeiträume ist eine logarithmische Skala aussagekräftiger.',
      ],
      exercise: {
        title: 'Kerzen bestimmen',
        task: 'Kerze A: Open 20, High 21, Low 17, Close 20,8. Kerze B: Open 30, High 30,2, Low 26, Close 26,5. Welche Farbe haben die Kerzen und was sagen sie aus?',
        solution: 'A: grün mit langem unterem Docht – trotz zwischenzeitlichem Einbruch auf 17 haben Käufer den Kurs fast auf das Tageshoch gehoben (Kaufinteresse). B: rot mit großem Körper nahe dem Tief – starker Verkaufsdruck über den ganzen Tag.',
      },
      widget: 'candlestick',
    },
    {
      id: 'm06-l2',
      title: 'Trends, Trendlinien, Unterstützungen und Widerstände',
      minutes: 16,
      intro:
        'Der Grundgedanke der technischen Analyse lautet: „The trend is your friend.“ In dieser Lektion lernst du, Trends zu erkennen und wichtige Kursmarken einzuzeichnen.',
      sections: [
        {
          heading: 'Was sind Trends?',
          paragraphs: [
            'Ein **Trend** ist eine vorherrschende Richtung des Kurses über einen Zeitraum. Man unterscheidet **Aufwärtstrend**, **Abwärtstrend** und **Seitwärtstrend** (Seitwärtsbewegung). Trends gibt es auf allen Zeitebenen: Eine Aktie kann langfristig steigen, aber kurzfristig fallen.',
          ],
        },
        {
          heading: 'Aufwärtstrend und Abwärtstrend',
          paragraphs: [
            'Ein **Aufwärtstrend** liegt vor, wenn der Kurs eine Folge von **höheren Hochs und höheren Tiefs** bildet. Jeder Rücksetzer endet über dem vorherigen Tief.',
            'Ein **Abwärtstrend** ist das Gegenteil: eine Folge von **tieferen Hochs und tieferen Tiefs**. Jede Erholung scheitert unter dem vorherigen Hoch.',
          ],
        },
        {
          heading: 'Trendlinien',
          paragraphs: [
            'Eine **Trendlinie** verbindet im Aufwärtstrend mindestens zwei Tiefpunkte (sie liegt unter dem Kurs), im Abwärtstrend mindestens zwei Hochpunkte (sie liegt über dem Kurs). Je öfter der Kurs eine Linie berührt, ohne sie zu durchbrechen, desto mehr Beachtung findet sie bei Marktteilnehmern. Ein Bruch der Trendlinie gilt als Hinweis auf eine mögliche Trendwende – aber nicht als Gewissheit.',
          ],
        },
        {
          heading: 'Unterstützungen und Widerstände',
          paragraphs: [
            'Eine **Unterstützung** ist ein Kursbereich, in dem der Kurs in der Vergangenheit mehrfach nach unten gestoppt hat – hier traten genug Käufer auf. Ein **Widerstand** ist ein Bereich, an dem der Kurs mehrfach nach oben gestoppt hat – hier traten genug Verkäufer auf.',
            'Psychologisch erklärt man das so: Viele Anleger erinnern sich an diese Kurse („Bei 50 € war die Aktie schon einmal günstig“). Wird ein Widerstand nachhaltig überwunden, wird er oft zur neuen Unterstützung – und umgekehrt. Runde Zahlen (z. B. 100 €) wirken häufig ebenfalls als Marke.',
          ],
        },
        {
          heading: 'Grenzen der technischen Analyse',
          paragraphs: [
            'Die technische Analyse ist umstritten. Wissenschaftliche Studien finden für viele einfache Chartregeln nach Kosten keinen dauerhaften Vorteil. Ein Teil ihrer Wirkung entsteht dadurch, dass viele Marktteilnehmer auf dieselben Marken schauen (**selbsterfüllende Prophezeiung**). Für langfristige Anleger ist sie höchstens eine Ergänzung zur Fundamentalanalyse – etwa für die Wahl des Einstiegszeitpunkts.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Aufwärtstrend erkennen',
          text: 'Tiefs bei 40 €, 44 € und 47 €, Hochs bei 46 €, 50 € und 54 €. Sowohl Hochs als auch Tiefs steigen – ein intakter Aufwärtstrend. Eine Trendlinie durch 40 € und 44 € liegt beim nächsten Rücksetzer etwa bei 47–48 €. Fällt der Kurs deutlich darunter, wäre der Trend in Frage gestellt.',
        },
        {
          title: 'Beispiel: Widerstand wird Unterstützung',
          text: 'Eine Aktie scheiterte dreimal an 100 €. Dann steigt sie mit hohem Volumen auf 108 €. Beim nächsten Rücksetzer stoppt der Kurs bei 101 € – der alte Widerstand wirkt nun als Unterstützung.',
        },
      ],
      practice: [
        'Betrachte im interaktiven Chart unten die eingeblendeten Hochs und Tiefs: Welcher Trend liegt vor?',
        'Notiere bei einer Aktie deiner Wahl eine Unterstützung und einen Widerstand und beobachte einige Wochen, ob sie halten.',
      ],
      terms: [
        { term: 'Trend', definition: 'Vorherrschende Kursrichtung über einen Zeitraum.' },
        { term: 'Aufwärtstrend', definition: 'Folge höherer Hochs und höherer Tiefs.' },
        { term: 'Abwärtstrend', definition: 'Folge tieferer Hochs und tieferer Tiefs.' },
        { term: 'Trendlinie', definition: 'Verbindungslinie von Tief- bzw. Hochpunkten eines Trends.' },
        { term: 'Unterstützung', definition: 'Kursbereich, an dem Kurse wiederholt nach unten gestoppt haben.' },
        { term: 'Widerstand', definition: 'Kursbereich, an dem Kurse wiederholt nach oben gestoppt haben.' },
      ],
      mistakes: [
        'Linien so lange zu verschieben, bis sie zur eigenen Meinung passen.',
        'Ausbrüche ohne Bestätigung (z. B. durch Volumen) als sicheres Signal zu sehen.',
        'Technische Analyse ohne Risikomanagement anzuwenden.',
      ],
      summary: [
        'Trends bestehen aus höheren (bzw. tieferen) Hochs und Tiefs.',
        'Trendlinien verbinden Tief- oder Hochpunkte.',
        'Unterstützungen und Widerstände sind Kursbereiche mit viel Kauf- bzw. Verkaufsinteresse.',
        'Die technische Analyse liefert Wahrscheinlichkeiten, keine Gewissheiten.',
      ],
      exercise: {
        title: 'Trend bestimmen',
        task: 'Hochs: 80, 76, 72 €. Tiefs: 70, 66, 61 €. Welcher Trend liegt vor, und was würde ihn in Frage stellen?',
        solution: 'Abwärtstrend (tiefere Hochs und tiefere Tiefs). Er würde in Frage gestellt, wenn der Kurs ein Hoch über 72 € bildet und das nächste Tief über 61 € bleibt.',
      },
      widget: 'candlestick',
    },
    {
      id: 'm06-l3',
      title: 'Indikatoren: Gleitende Durchschnitte, RSI, MACD und Volumen',
      minutes: 18,
      intro:
        'Indikatoren sind mathematische Berechnungen auf Basis von Kurs und Volumen. Sie sollen Trends glätten, Übertreibungen anzeigen oder Trendwechsel signalisieren. Hier lernst du die vier bekanntesten kennen.',
      sections: [
        {
          heading: 'Gleitende Durchschnitte',
          paragraphs: [
            'Ein **gleitender Durchschnitt** (Moving Average) ist der Durchschnitt der Schlusskurse der letzten n Tage, der täglich neu berechnet wird. Er glättet Schwankungen und macht den Trend sichtbar. Bekannt sind die **38-Tage-Linie** und die **200-Tage-Linie**. Liegt der Kurs über der 200-Tage-Linie, gilt der langfristige Trend als aufwärtsgerichtet.',
            'Schneidet ein kürzerer Durchschnitt einen längeren von unten nach oben, spricht man von einem **Golden Cross** (Kaufsignal), umgekehrt von einem **Death Cross**. Der **exponentielle gleitende Durchschnitt** (EMA) gewichtet jüngere Kurse stärker.',
          ],
          formula: 'SMA(n) = (Kurs₁ + Kurs₂ + … + Kursₙ) / n',
        },
        {
          heading: 'RSI – Relative Strength Index',
          paragraphs: [
            'Der **RSI** misst das Verhältnis von Aufwärts- zu Abwärtsbewegungen der letzten (meist 14) Perioden und liegt immer zwischen 0 und 100. Werte über 70 gelten als **überkauft** (der Kurs ist schnell und stark gestiegen), Werte unter 30 als **überverkauft**.',
            'Wichtig: „Überkauft“ heißt nicht „muss fallen“. In starken Trends kann der RSI lange über 70 bleiben.',
          ],
          formula: 'RSI = 100 − 100 / (1 + durchschnittlicher Gewinn / durchschnittlicher Verlust)',
        },
        {
          heading: 'MACD',
          paragraphs: [
            'Der **MACD** (Moving Average Convergence Divergence) ist die Differenz aus einem schnellen (12 Tage) und einem langsamen (26 Tage) exponentiellen Durchschnitt. Dazu kommt eine **Signallinie** (9-Tage-Durchschnitt des MACD). Kreuzt der MACD die Signallinie von unten nach oben, gilt das als Kaufsignal, umgekehrt als Verkaufssignal. Das **Histogramm** zeigt den Abstand zwischen beiden Linien.',
          ],
          formula: 'MACD = EMA(12) − EMA(26)   |   Signal = EMA(9) des MACD',
        },
        {
          heading: 'Handelsvolumen im Chart',
          paragraphs: [
            'Das **Volumen** wird meist als Balken unter dem Chart dargestellt. Es bestätigt Bewegungen: Ein Ausbruch über einen Widerstand mit hohem Volumen gilt als aussagekräftiger als einer mit geringem Volumen, weil viele Marktteilnehmer beteiligt sind. Steigende Kurse bei sinkendem Volumen können auf nachlassende Kraft hindeuten.',
          ],
        },
        {
          heading: 'Indikatoren richtig einordnen',
          paragraphs: [
            'Alle Indikatoren berechnen sich aus vergangenen Kursen und laufen dem Markt deshalb hinterher. Sie erzeugen oft **Fehlsignale**, besonders in Seitwärtsphasen. Nutze sie nie allein und nie ohne Risikomanagement. Für einen langfristigen Sparplan-Anleger sind sie in der Regel nicht notwendig.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: 200-Tage-Linie',
          text: 'Eine Aktie notiert bei 52 €, ihre 200-Tage-Linie bei 47 €. Der Kurs liegt rund 10 % über dem langfristigen Durchschnitt – der langfristige Trend ist positiv. Fällt der Kurs unter 47 €, deuten Techniker das als Schwächesignal.',
        },
        {
          title: 'Beispiel: RSI-Fehlsignal',
          text: 'Der RSI einer stark wachsenden Aktie steigt auf 78 („überkauft“). Ein Anleger verkauft. Die Aktie steigt in den nächsten drei Monaten trotzdem um weitere 25 %, und der RSI bleibt die meiste Zeit über 65. Überkauft bedeutete hier nur „starker Trend“.',
        },
      ],
      practice: [
        'Schalte im Indikator-Labor unten die gleitenden Durchschnitte, RSI und MACD ein und vergleiche die Signale mit dem Kursverlauf.',
        'Zähle, wie viele Kreuzungen von MACD und Signallinie im Chart zu einem echten Trend führten – und wie viele Fehlsignale waren.',
      ],
      terms: [
        { term: 'Gleitender Durchschnitt', definition: 'Fortlaufend berechneter Durchschnittskurs der letzten n Perioden.' },
        { term: '200-Tage-Linie', definition: 'Gleitender Durchschnitt der letzten 200 Handelstage – Maß für den langfristigen Trend.' },
        { term: 'RSI', definition: 'Indikator zwischen 0 und 100, der überkaufte und überverkaufte Phasen anzeigen soll.' },
        { term: 'MACD', definition: 'Trendfolgeindikator aus der Differenz zweier exponentieller Durchschnitte.' },
        { term: 'Golden Cross', definition: 'Kurzer Durchschnitt kreuzt langen von unten nach oben.' },
        { term: 'Fehlsignal', definition: 'Indikatorsignal, auf das keine entsprechende Kursbewegung folgt.' },
      ],
      mistakes: [
        'Indikatoren als Vorhersage der Zukunft zu verstehen.',
        'Zu viele Indikatoren gleichzeitig zu nutzen, bis man für jede Meinung ein Signal findet.',
        'Auf jedes Signal hin zu handeln und dabei hohe Gebühren und Steuern zu verursachen (Overtrading).',
      ],
      summary: [
        'Gleitende Durchschnitte glätten den Kursverlauf und zeigen Trends.',
        'Der RSI zeigt, ob eine Aktie kurzfristig stark gestiegen oder gefallen ist.',
        'Der MACD signalisiert Trendwechsel über Kreuzungen mit der Signallinie.',
        'Volumen bestätigt Kursbewegungen; alle Indikatoren erzeugen auch Fehlsignale.',
      ],
      exercise: {
        title: 'Gleitenden Durchschnitt berechnen',
        task: 'Schlusskurse der letzten 5 Tage: 20, 21, 22, 21, 23 €. Berechne den 5-Tage-Durchschnitt. Am nächsten Tag schließt die Aktie bei 25 €. Wie lautet der neue 5-Tage-Durchschnitt?',
        solution: 'Erster Wert: (20 + 21 + 22 + 21 + 23) / 5 = 21,4 €. Neuer Wert: (21 + 22 + 21 + 23 + 25) / 5 = 22,4 €. Der älteste Kurs (20) fällt heraus, der neueste (25) kommt hinzu.',
      },
      widget: 'indicators',
    },
  ],
  quiz: QUIZ_M06,
  sources: [
    { label: 'Börse Frankfurt – Wissen: Charttechnik', url: 'https://www.boerse-frankfurt.de/wissen' },
    { label: 'BaFin – Warnung vor Trading-Versprechen', url: 'https://www.bafin.de/DE/Verbraucher/verbraucher_node.html' },
    { label: 'Deutsche Börse – Marktdaten und Charts', url: 'https://www.deutsche-boerse.com' },
  ],
};
