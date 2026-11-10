import type { Module } from '@/types';
import { QUIZ_M07 } from '../quizzes/hard1';

export const m07: Module = {
  id: 'm07',
  number: 7,
  title: 'Dividenden und passives Einkommen',
  subtitle: 'Ausschüttungen, wichtige Termine, Strategien und Zinseszins',
  category: 'aktien-verstehen',
  icon: 'Coins',
  description:
    'Dividenden sind für viele Anleger der Traum vom „passiven Einkommen“. Du lernst, wie Dividenden funktionieren, welche Termine wichtig sind, wie eine Dividendenstrategie aussieht – und warum eine hohe Dividendenrendite nicht automatisch gut ist.',
  lessons: [
    {
      id: 'm07-l1',
      title: 'Was ist eine Dividende? Rendite, Ex-Tag und Zahltag',
      minutes: 15,
      intro:
        'Eine Dividende ist dein Anteil am ausgeschütteten Gewinn eines Unternehmens. Diese Lektion erklärt, warum Unternehmen ausschütten, wie du die Rendite berechnest und welche Termine entscheiden, ob du die Dividende bekommst.',
      sections: [
        {
          heading: 'Was ist eine Dividende?',
          paragraphs: [
            'Erzielt eine Aktiengesellschaft einen Gewinn, kann sie ihn behalten (thesaurieren) und reinvestieren oder ganz bzw. teilweise an die Aktionäre ausschütten. Die Ausschüttung je Aktie nennt man **Dividende**. In Deutschland beschließt die Hauptversammlung auf Vorschlag von Vorstand und Aufsichtsrat über die Höhe. Die meisten deutschen Unternehmen zahlen einmal jährlich, US-Unternehmen meist vierteljährlich.',
          ],
        },
        {
          heading: 'Warum schütten Unternehmen Dividenden aus?',
          paragraphs: ['Gründe für Ausschüttungen sind:'],
          bullets: [
            'Reife Unternehmen haben oft mehr Gewinn, als sie sinnvoll reinvestieren können.',
            'Eine verlässliche Dividende signalisiert Stärke und Vertrauen des Managements in die Zukunft.',
            'Viele Anleger (z. B. Versicherungen, Rentner, Stiftungen) wünschen sich regelmäßige Erträge.',
            'Disziplin: Geld, das ausgeschüttet wird, kann nicht für überteuerte Übernahmen verschwendet werden.',
          ],
        },
        {
          heading: 'Die Dividendenrendite',
          paragraphs: [
            'Die **Dividendenrendite** setzt die Dividende ins Verhältnis zum aktuellen Kurs. Ein zweiter Blickwinkel ist die **persönliche Dividendenrendite** (Yield on Cost): Dividende im Verhältnis zu deinem Kaufpreis. Steigt die Dividende über Jahre, kann sie auf den ursprünglichen Kaufpreis bezogen sehr hoch werden.',
          ],
          formula: 'Dividendenrendite (%) = Dividende je Aktie / aktueller Kurs × 100',
        },
        {
          heading: 'Wichtige Termine: Hauptversammlung, Ex-Tag, Record Date, Zahltag',
          paragraphs: [
            'In Deutschland läuft die Dividendenzahlung typischerweise so ab:',
          ],
          bullets: [
            'Hauptversammlung (HV): beschließt die Dividende.',
            'Ex-Dividenden-Tag (Ex-Tag): in der Regel der erste Geschäftstag nach der HV. Ab diesem Tag wird die Aktie „ohne“ Dividendenanspruch gehandelt. Wer die Aktie spätestens am Tag der HV kauft, erhält die Dividende.',
            'Record Date (Stichtag): Tag, an dem festgestellt wird, wer Anspruch hat – meist ein Geschäftstag nach dem Ex-Tag.',
            'Zahltag (Valuta): Tag, an dem das Geld auf dem Verrechnungskonto eingeht – in Deutschland meist der dritte Geschäftstag nach der HV.',
          ],
        },
        {
          heading: 'Der Dividendenabschlag',
          paragraphs: [
            'Am Ex-Tag wird der Aktienkurs rechnerisch um die Dividende gesenkt (**Dividendenabschlag**). Das ist logisch: Das Geld verlässt das Unternehmen und ist danach nicht mehr in seinem Wert enthalten. Wer kurz vor dem Ex-Tag kauft, nur um die Dividende „mitzunehmen“, gewinnt dadurch nichts – im Gegenteil, auf die Dividende fallen Steuern an.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Dividendenrendite und Yield on Cost',
          text: 'Du hast eine Aktie vor 10 Jahren für 40 € gekauft. Heute kostet sie 80 €, die Dividende beträgt 3,20 €. Aktuelle Dividendenrendite: 3,20 / 80 = 4 %. Persönliche Rendite auf deinen Kaufpreis: 3,20 / 40 = 8 %.',
        },
        {
          title: 'Beispiel: Dividendenabschlag',
          text: 'Die Aktie schließt am Tag der HV bei 100 €, die Dividende beträgt 4 €. Am Ex-Tag eröffnet sie rechnerisch bei etwa 96 €. Du hast dann 96 € Aktienwert + 4 € Dividende (vor Steuern) = 100 €. Dein Vermögen hat sich durch die Dividende nicht erhöht – du hast nur einen Teil ausbezahlt bekommen.',
        },
      ],
      practice: [
        'Suche die nächsten HV-Termine von zwei DAX-Unternehmen im Finanzkalender ihrer Investor-Relations-Seite.',
        'Berechne für eine Aktie deiner Wahl die aktuelle Dividendenrendite.',
      ],
      terms: [
        { term: 'Dividende', definition: 'Gewinnausschüttung je Aktie an die Aktionäre.' },
        { term: 'Ex-Tag', definition: 'Erster Handelstag, an dem die Aktie ohne Anspruch auf die Dividende gehandelt wird.' },
        { term: 'Zahltag', definition: 'Tag, an dem die Dividende gutgeschrieben wird.' },
        { term: 'Record Date', definition: 'Stichtag zur Feststellung der dividendenberechtigten Aktionäre.' },
        { term: 'Dividendenabschlag', definition: 'Kursrückgang am Ex-Tag in Höhe der Dividende.' },
        { term: 'Yield on Cost', definition: 'Dividende im Verhältnis zum eigenen Kaufpreis.' },
      ],
      mistakes: [
        'Dividenden als „Geschenk“ oder zusätzliche Rendite zu betrachten – sie sind ein Teil der Gesamtrendite.',
        'Kurz vor dem Ex-Tag zu kaufen, um die Dividende „mitzunehmen“.',
        'Die Steuer auf Dividenden zu vergessen.',
      ],
      summary: [
        'Dividenden sind ausgeschüttete Gewinne – meist einmal jährlich in Deutschland.',
        'Die Dividendenrendite setzt die Dividende ins Verhältnis zum Kurs.',
        'Entscheidend ist der Besitz der Aktie am Ende des HV-Tages (vor dem Ex-Tag).',
        'Am Ex-Tag sinkt der Kurs um die Dividende.',
      ],
      exercise: {
        title: 'Bekomme ich die Dividende?',
        task: 'HV am Dienstag. Anna kauft am Dienstag um 15 Uhr. Ben kauft am Mittwoch um 9 Uhr. Clara verkauft ihre Aktien am Mittwoch um 10 Uhr. Wer erhält die Dividende?',
        solution: 'Anna (gekauft vor dem Ex-Tag) und Clara (sie besaß die Aktien noch am HV-Tag; der Verkauf am Ex-Tag ändert nichts). Ben kaufte am Ex-Tag und erhält keine Dividende – dafür zahlte er einen um die Dividende niedrigeren Kurs.',
      },
    },
    {
      id: 'm07-l2',
      title: 'Dividendenstrategie, Dividendenaristokraten und Dividendenfallen',
      minutes: 17,
      intro:
        'Eine Dividendenstrategie setzt auf Unternehmen, die verlässlich und steigend ausschütten. Diese Lektion zeigt, worauf es ankommt und wie du typische Fallen vermeidest.',
      sections: [
        {
          heading: 'Dividendenaristokraten',
          paragraphs: [
            'Als **Dividendenaristokraten** bezeichnet man Unternehmen, die ihre Dividende über sehr lange Zeit jedes Jahr erhöht haben. Im US-Index „S&P 500 Dividend Aristocrats“ sind es mindestens 25 Jahre in Folge. Für Europa gibt es ähnliche Indizes mit kürzeren Mindestzeiträumen. Solche Unternehmen haben meist stabile Geschäftsmodelle, die auch Krisen überstanden haben.',
            'Aber: Eine lange Historie garantiert nichts für die Zukunft. Auch langjährige Dividendenzahler haben schon Dividenden gekürzt, etwa in der Finanzkrise 2008/2009 oder in der Corona-Krise 2020.',
          ],
        },
        {
          heading: 'Was ist eine Dividendenstrategie?',
          paragraphs: [
            'Bei einer **Dividendenstrategie** stellt man ein Depot aus Aktien zusammen, die regelmäßige und möglichst wachsende Dividenden zahlen. Ziel ist ein steigender Strom von Ausschüttungen. Worauf achten Dividendeninvestoren?',
          ],
          bullets: [
            'Dividendenhistorie: Wurde die Dividende über viele Jahre stabil gehalten oder erhöht?',
            'Ausschüttungsquote: Welcher Anteil des Gewinns (oder Free Cashflows) wird ausgezahlt? Werte deutlich über 80–100 % sind langfristig oft nicht tragfähig.',
            'Dividendenwachstum: Wächst die Dividende schneller als die Inflation?',
            'Free Cashflow und Schulden: Ist die Dividende durch echtes Geld gedeckt?',
            'Diversifikation: Nicht nur Versorger, Banken und Tabakkonzerne – sonst entsteht ein Branchenklumpen.',
          ],
        },
        {
          heading: 'Warum hohe Dividendenrenditen nicht automatisch gut sind',
          paragraphs: [
            'Die Dividendenrendite steigt, wenn der Kurs fällt. Eine ungewöhnlich hohe Rendite ist deshalb oft ein Zeichen, dass der Markt Probleme erwartet. Man spricht von einer **Dividendenfalle**, wenn Anleger eine hohe Rendite kaufen und anschließend Dividende und Kurs fallen.',
            'Außerdem gilt: Ein Unternehmen, das alles ausschüttet, investiert wenig in die Zukunft. Und ausgeschüttete Dividenden werden sofort versteuert, während reinvestierte Gewinne im Unternehmen steuerfrei weiterarbeiten. Für den langfristigen Vermögensaufbau zählt die **Gesamtrendite**, nicht die Dividende allein.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Zwei Dividendenaktien',
          text: 'Aktie A: 3 % Dividendenrendite, Ausschüttungsquote 50 %, Dividende seit 20 Jahren steigend um durchschnittlich 7 % pro Jahr. Aktie B: 9 % Dividendenrendite, Ausschüttungsquote 130 %, Schulden steigen, Kurs halbiert. A ist für eine Dividendenstrategie deutlich solider. B zahlt mehr aus, als sie verdient – eine Kürzung ist wahrscheinlich.',
        },
        {
          title: 'Beispiel: Dividende vs. Gesamtrendite',
          text: 'Aktie X zahlt 6 % Dividende, ihr Kurs fällt im Schnitt um 2 % pro Jahr → Gesamtrendite ca. 4 %. Aktie Y zahlt 1 % Dividende, ihr Kurs steigt im Schnitt um 8 % → ca. 9 %. Obwohl X „mehr Einkommen“ liefert, wächst das Vermögen bei Y schneller.',
        },
      ],
      practice: [
        'Nutze den Dividendenrechner unten: Gib eine Investitionssumme, Kurs, Dividende und Wachstumsrate ein und beobachte die Modellrechnung.',
        'Vergleiche die Ergebnisse mit 0 % und mit 7 % jährlicher Dividendensteigerung.',
      ],
      terms: [
        { term: 'Dividendenaristokrat', definition: 'Unternehmen mit sehr langer Historie jährlicher Dividendenerhöhungen.' },
        { term: 'Dividendenstrategie', definition: 'Anlagestrategie mit Fokus auf verlässliche, steigende Ausschüttungen.' },
        { term: 'Ausschüttungsquote', definition: 'Dividende im Verhältnis zum Gewinn.' },
        { term: 'Dividendenfalle', definition: 'Aktie mit hoher Rendite, bei der Kurs und Dividende anschließend fallen.' },
        { term: 'Dividendenwachstum', definition: 'Jährliche Steigerung der Dividende in Prozent.' },
      ],
      mistakes: [
        'Aktien nur nach der höchsten aktuellen Dividendenrendite auszuwählen.',
        'Die Ausschüttungsquote und den Free Cashflow nicht zu prüfen.',
        'Ein Depot nur aus wenigen Dividendenbranchen aufzubauen.',
        'Dividenden mit garantiertem Einkommen zu verwechseln – sie können jederzeit gekürzt werden.',
      ],
      summary: [
        'Dividendenaristokraten erhöhen ihre Dividende seit vielen Jahren.',
        'Eine gute Dividendenaktie hat eine tragfähige Ausschüttungsquote und Cashflow-Deckung.',
        'Hohe Renditen sind oft ein Warnsignal.',
        'Für den Vermögensaufbau zählt die Gesamtrendite.',
      ],
      exercise: {
        title: 'Dividendenfalle erkennen',
        task: 'Aktie Z: Kurs 12 € (vor einem Jahr 24 €), Dividende 1,50 €, Gewinn je Aktie 1,00 €, Free Cashflow je Aktie 0,60 €. Berechne Dividendenrendite und Ausschüttungsquote. Wie bewertest du das?',
        solution: 'Dividendenrendite: 1,50 / 12 = 12,5 %. Ausschüttungsquote: 1,50 / 1,00 = 150 % des Gewinns, sogar 250 % des Free Cashflows. Das Unternehmen zahlt viel mehr aus, als es erwirtschaftet. Eine Kürzung ist sehr wahrscheinlich – typische Dividendenfalle.',
      },
      widget: 'dividend-calculator',
    },
    {
      id: 'm07-l3',
      title: 'Zinseszinseffekt und Reinvestition von Dividenden',
      minutes: 14,
      intro:
        'Albert Einstein wird (vermutlich fälschlich) der Satz zugeschrieben, der Zinseszins sei das achte Weltwunder. Wahr ist: Wer Erträge reinvestiert, lässt sein Geld exponentiell wachsen – vorausgesetzt, er hat Zeit.',
      sections: [
        {
          heading: 'Wie funktioniert der Zinseszinseffekt?',
          paragraphs: [
            'Beim **Zinseszins** werden Erträge nicht entnommen, sondern wieder angelegt. Im nächsten Jahr bringen dann auch die Erträge selbst Erträge. Das Wachstum beschleunigt sich mit der Zeit. Bei Aktien spricht man allgemeiner vom **Zinseszinseffekt** oder Compounding, weil es um Kursgewinne und Dividenden geht, nicht um feste Zinsen.',
          ],
          formula: 'Endwert = Anfangswert × (1 + Rendite)^Jahre',
        },
        {
          heading: 'Die 72er-Regel',
          paragraphs: [
            'Eine Faustformel: Teile 72 durch die jährliche Rendite in Prozent und du erhältst ungefähr die Anzahl Jahre, in denen sich dein Geld verdoppelt. Bei 6 % sind das etwa 12 Jahre, bei 8 % etwa 9 Jahre. Die Regel zeigt auch, wie stark Kosten wirken: 1 % weniger Rendite verlängert die Verdopplungszeit deutlich.',
          ],
          formula: 'Verdopplungszeit ≈ 72 / Rendite in %',
        },
        {
          heading: 'Wie können Dividenden reinvestiert werden?',
          paragraphs: ['Es gibt mehrere Wege:'],
          bullets: [
            'Manuell: Dividenden sammeln sich auf dem Verrechnungskonto und werden regelmäßig in neue Aktien oder ETFs investiert.',
            'Thesaurierende ETFs: Der Fonds reinvestiert Erträge automatisch (siehe Modul 9).',
            'Dividenden-Reinvestitionspläne (DRIP): Einige Broker bieten automatische Wiederanlage an.',
            'Wahldividende (Scrip Dividend): Manche Unternehmen bieten an, die Dividende in neuen Aktien statt in bar zu erhalten.',
          ],
        },
        {
          heading: 'Zeit ist der wichtigste Faktor',
          paragraphs: [
            'Beim Zinseszins zählt vor allem die Dauer. Wer 10 Jahre früher anfängt, hat am Ende oft deutlich mehr – selbst mit geringeren Beträgen. Gleichzeitig gilt: Die Rendite von Aktien ist nicht konstant. Es gibt Jahre mit hohen Verlusten. Alle Berechnungen mit festen Renditen sind **Modellrechnungen**, keine Prognosen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Mit und ohne Reinvestition (Modellrechnung)',
          text: '10.000 € werden 30 Jahre angelegt, angenommene Rendite 6 % pro Jahr. Werden die Erträge jedes Jahr entnommen, hast du am Ende 10.000 € plus 30 × 600 € = 28.000 € (ohne Steuern). Werden sie reinvestiert: 10.000 × 1,06^30 ≈ 57.435 €. Der Unterschied von fast 30.000 € entsteht allein durch den Zinseszinseffekt.',
        },
        {
          title: 'Beispiel: Früh anfangen',
          text: 'Lena legt ab 25 fünfzehn Jahre lang 200 € im Monat an (insgesamt 36.000 €) und lässt das Geld danach bis 65 liegen. Tom beginnt erst mit 40 und spart 25 Jahre lang 200 € im Monat (insgesamt 60.000 €). Bei angenommenen 6 % pro Jahr hat Lena mit 65 rund 246.000 €, Tom rund 135.000 € – obwohl Lena deutlich weniger eingezahlt hat (Modellrechnung, gerundet, ohne Kosten und Steuern).',
        },
      ],
      practice: [
        'Spiele mit dem Zinseszins-Visualisierer unten: Wie verändert sich das Endvermögen bei 4 %, 6 % und 8 %?',
        'Wende die 72er-Regel an: Wie lange dauert eine Verdopplung bei 3 % und bei 9 %?',
      ],
      terms: [
        { term: 'Zinseszins', definition: 'Erträge auf bereits reinvestierte Erträge.' },
        { term: 'Compounding', definition: 'Englischer Begriff für den Zinseszinseffekt.' },
        { term: '72er-Regel', definition: 'Faustformel für die Verdopplungszeit: 72 / Rendite.' },
        { term: 'Reinvestition', definition: 'Wiederanlage von Erträgen.' },
        { term: 'Thesaurierung', definition: 'Einbehaltung und automatische Wiederanlage von Erträgen.' },
      ],
      mistakes: [
        'Zu spät anzufangen, weil man „erst einmal mehr Geld haben“ will.',
        'Modellrechnungen mit konstanter Rendite für Prognosen zu halten.',
        'Kosten und Steuern zu ignorieren, die den Zinseszinseffekt schmälern.',
      ],
      summary: [
        'Reinvestierte Erträge erzeugen selbst wieder Erträge.',
        'Die 72er-Regel schätzt die Verdopplungszeit.',
        'Zeit ist der stärkste Hebel des Zinseszinses.',
        'Alle Berechnungen mit festen Renditen sind Modellrechnungen.',
      ],
      exercise: {
        title: 'Zinseszins berechnen',
        task: 'Du legst 5.000 € für 20 Jahre an. Angenommene Rendite 7 % pro Jahr, alle Erträge werden reinvestiert. Wie hoch ist der Endwert ungefähr? Wann hat sich das Geld laut 72er-Regel verdoppelt?',
        solution: 'Endwert: 5.000 × 1,07^20 ≈ 5.000 × 3,87 ≈ 19.348 €. Verdopplung nach etwa 72 / 7 ≈ 10,3 Jahren. Modellrechnung ohne Steuern und Kosten.',
      },
      widget: 'compound-interest',
    },
  ],
  quiz: QUIZ_M07,
  sources: [
    { label: 'Deutsches Aktieninstitut – Dividendenstudie', url: 'https://www.dai.de' },
    { label: 'S&P Dow Jones Indices – S&P 500 Dividend Aristocrats', url: 'https://www.spglobal.com/spdji/en/indices/dividends-factors/sp-500-dividend-aristocrats/' },
    { label: 'Börse Frankfurt – Wissen: Dividende', url: 'https://www.boerse-frankfurt.de/wissen' },
  ],
};
