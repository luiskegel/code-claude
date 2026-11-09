import type { Module } from '@/types';

export const m05: Module = {
  id: 'm05',
  number: 5,
  title: 'Die wichtigsten Aktienkennzahlen',
  subtitle: 'KGV, KBV, KUV, EPS, EBITDA, EBIT, Renditen, Cashflow und Verschuldung',
  category: 'aktien-analysieren',
  icon: 'Calculator',
  description:
    'Kennzahlen verdichten die Zahlen eines Unternehmens auf wenige, vergleichbare Werte. Für jede Kennzahl lernst du: eine einfache Erklärung, die Formel, ein Rechenbeispiel, die Interpretation, typische Anfängerfehler, wann sie sinnvoll ist – und warum sie allein nie für eine Kaufentscheidung reicht.',
  lessons: [
    {
      id: 'm05-l1',
      title: 'Bewertungskennzahlen: Marktkapitalisierung, EPS, KGV, KBV und KUV',
      minutes: 22,
      intro:
        'Ist eine Aktie teuer oder günstig? Der Kurs allein beantwortet diese Frage nicht. Bewertungskennzahlen setzen den Preis ins Verhältnis zu dem, was du dafür bekommst: Gewinn, Vermögen oder Umsatz.',
      sections: [
        {
          heading: '1. Marktkapitalisierung (Börsenwert)',
          paragraphs: [
            '**Einfach erklärt:** Was würde es kosten, alle Aktien eines Unternehmens zum aktuellen Kurs zu kaufen? Das ist die Marktkapitalisierung – der Preis, den die Börse dem gesamten Eigenkapital gibt.',
            '**Rechenbeispiel:** 310 Mio. Aktien × 42,50 € = 13,2 Mrd. € Marktkapitalisierung.',
            '**Interpretation:** Sie zeigt die Größe eines Unternehmens an der Börse. Man unterscheidet grob Large Caps (sehr groß, z. B. über 10 Mrd. €), Mid Caps und Small Caps. Große Unternehmen sind meist liquider und weniger schwankungsanfällig.',
            '**Sinnvoll für:** Größenvergleiche und die Berechnung anderer Kennzahlen (z. B. KUV). **Anfängerfehler:** Den Aktienkurs mit dem Unternehmenswert zu verwechseln – eine Aktie zu 500 € kann zu einem kleineren Unternehmen gehören als eine Aktie zu 20 €. **Allein nicht genug:** Größe sagt nichts darüber aus, ob der Preis angemessen ist.',
          ],
          formula: 'Marktkapitalisierung = Aktienkurs × Anzahl ausgegebener Aktien',
        },
        {
          heading: '2. EPS – Gewinn je Aktie',
          paragraphs: [
            '**Einfach erklärt:** Wie viel Gewinn entfällt rechnerisch auf eine einzelne Aktie? EPS steht für „Earnings per Share“.',
            '**Rechenbeispiel:** Nettogewinn 744 Mio. €, 310 Mio. Aktien → EPS = 2,40 €.',
            '**Interpretation:** Ein über Jahre steigender EPS ist ein gutes Zeichen. Achtung: Der EPS steigt auch, wenn ein Unternehmen eigene Aktien zurückkauft (weniger Aktien bei gleichem Gewinn) – das ist kein operatives Wachstum.',
            '**Sinnvoll für:** die Entwicklung der Ertragskraft je Aktie und als Basis für das KGV. **Anfängerfehler:** EPS zwischen Unternehmen zu vergleichen – 5 € EPS bei Aktie A sind nicht „besser“ als 2 € bei Aktie B, wenn die Aktien unterschiedlich teuer sind. **Allein nicht genug:** Der EPS sagt nichts über den Preis, den du dafür zahlst.',
          ],
          formula: 'EPS = Nettogewinn / Anzahl der Aktien',
        },
        {
          heading: '3. KGV – Kurs-Gewinn-Verhältnis',
          paragraphs: [
            '**Einfach erklärt:** Wie viele Jahresgewinne zahlst du für eine Aktie? Ein KGV von 15 bedeutet: Du zahlst das 15-Fache des aktuellen Jahresgewinns. Bliebe der Gewinn konstant und würde komplett ausgeschüttet, hättest du deinen Kaufpreis nach 15 Jahren „zurückverdient“.',
            '**Rechenbeispiel:** Kurs 42,50 €, EPS 2,40 € → KGV = 17,7.',
            '**Interpretation:** Ein niedriges KGV kann auf eine günstige Bewertung hindeuten, ein hohes KGV auf hohe Wachstumserwartungen. Viele große Aktienmärkte lagen historisch langfristig grob im Bereich von etwa 12 bis 20. Man unterscheidet das historische KGV (vergangener Gewinn) und das erwartete KGV (geschätzter künftiger Gewinn).',
            '**Sinnvoll für:** profitable, stabile Unternehmen und den Vergleich innerhalb einer Branche. **Anfängerfehler:** Ein niedriges KGV automatisch als Schnäppchen sehen (vielleicht brechen die Gewinne bald ein) oder ein KGV bei Verlusten berechnen (negativ, nicht interpretierbar). Bei Zyklikern ist das KGV am Höhepunkt des Zyklus oft am niedrigsten – kurz bevor die Gewinne fallen. **Allein nicht genug:** Es berücksichtigt weder Schulden noch Wachstum noch Qualität der Gewinne.',
          ],
          formula: 'KGV = Aktienkurs / Gewinn je Aktie (EPS)  =  Marktkapitalisierung / Nettogewinn',
        },
        {
          heading: '4. KBV – Kurs-Buchwert-Verhältnis',
          paragraphs: [
            '**Einfach erklärt:** Wie viel zahlst du im Verhältnis zum Eigenkapital laut Bilanz (Buchwert)? Ein KBV von 1 bedeutet: Der Börsenwert entspricht genau dem bilanziellen Eigenkapital.',
            '**Rechenbeispiel:** Kurs 18,20 €, Buchwert je Aktie 24 € → KBV = 0,76. Die Börse bewertet das Unternehmen unter seinem bilanziellen Eigenkapital.',
            '**Interpretation:** Ein KBV unter 1 kann auf eine Unterbewertung hindeuten – oder darauf, dass der Markt der Bilanz misstraut oder dauerhaft niedrige Renditen erwartet.',
            '**Sinnvoll für:** kapitalintensive Branchen wie Banken, Versicherungen, Immobilien und Industrie. **Anfängerfehler:** Das KBV bei Software- oder Markenunternehmen anzuwenden – deren wichtigste Werte (Marken, Know-how) stehen oft gar nicht in der Bilanz, daher ist ihr KBV naturgemäß hoch. **Allein nicht genug:** Der Buchwert sagt nichts darüber, wie profitabel das Vermögen eingesetzt wird.',
          ],
          formula: 'KBV = Aktienkurs / Buchwert je Aktie  =  Marktkapitalisierung / Eigenkapital',
        },
        {
          heading: '5. KUV – Kurs-Umsatz-Verhältnis',
          paragraphs: [
            '**Einfach erklärt:** Wie viel zahlst du je Euro Umsatz?',
            '**Rechenbeispiel:** Marktkapitalisierung 12,2 Mrd. €, Umsatz 1,33 Mrd. € → KUV ≈ 9,1.',
            '**Interpretation:** Ein hohes KUV bedeutet, dass Anleger hohe künftige Margen und Wachstum erwarten. Bei Handelsunternehmen mit dünnen Margen ist ein KUV unter 1 üblich, bei Softwarefirmen sind deutlich höhere Werte verbreitet.',
            '**Sinnvoll für:** junge Wachstumsunternehmen, die noch keinen Gewinn erzielen, und Unternehmen mit vorübergehend gedrückten Gewinnen. **Anfängerfehler:** Unterschiedliche Branchen mit dem KUV zu vergleichen oder zu vergessen, dass Umsatz noch keinen Gewinn bedeutet. **Allein nicht genug:** Ein niedriges KUV nützt nichts, wenn das Unternehmen mit jedem Umsatz-Euro Verluste macht.',
          ],
          formula: 'KUV = Marktkapitalisierung / Umsatz  =  Aktienkurs / Umsatz je Aktie',
        },
      ],
      examples: [
        {
          title: 'Beispiel: Zwei fiktive Unternehmen im Vergleich',
          text: 'Rheinsoft (Software): Kurs 128 €, EPS 3,20 € → KGV 40; Buchwert je Aktie 19 € → KBV 6,7. Alpenstahl (Stahl): Kurs 18,20 €, EPS 1,90 € → KGV 9,6; KBV 0,76. Alpenstahl wirkt viel „billiger“. Aber: Rheinsoft wächst schnell mit stabilen Abo-Umsätzen, Alpenstahl ist stark zyklisch. Die Kennzahlen spiegeln diese Unterschiede wider – sie sind kein direktes Kaufsignal.',
        },
        {
          title: 'Beispiel: KGV und Wachstum (PEG)',
          text: 'Eine Variante ist das PEG-Verhältnis: KGV / erwartetes jährliches Gewinnwachstum in Prozent. Rheinsoft: KGV 40 / 20 % Wachstum = PEG 2,0. Ein anderes Unternehmen: KGV 15 / 5 % = PEG 3,0. Gemessen am Wachstum ist Rheinsoft dann sogar günstiger. Aber Achtung: Wachstumsprognosen sind unsicher!',
        },
      ],
      practice: [
        'Nutze den Kennzahlen-Rechner unten und berechne KGV, KBV und KUV der fiktiven Unternehmen aus dem virtuellen Depot.',
        'Suche für ein echtes DAX-Unternehmen den aktuellen Kurs, den Gewinn je Aktie aus dem Geschäftsbericht und berechne das KGV selbst.',
      ],
      terms: [
        { term: 'Marktkapitalisierung', definition: 'Börsenwert des Unternehmens: Kurs × Anzahl Aktien.' },
        { term: 'EPS', definition: 'Gewinn je Aktie (Earnings per Share).' },
        { term: 'KGV', definition: 'Kurs-Gewinn-Verhältnis: Kurs / Gewinn je Aktie.' },
        { term: 'KBV', definition: 'Kurs-Buchwert-Verhältnis: Kurs / Buchwert je Aktie.' },
        { term: 'KUV', definition: 'Kurs-Umsatz-Verhältnis: Marktkapitalisierung / Umsatz.' },
        { term: 'PEG', definition: 'KGV geteilt durch erwartetes Gewinnwachstum in Prozent.' },
      ],
      mistakes: [
        'Kennzahlen über Branchen hinweg vergleichen.',
        'Ein niedriges KGV automatisch für günstig halten.',
        'KGV bei Verlusten oder stark schwankenden Gewinnen berechnen.',
        'Historische und erwartete Kennzahlen durcheinanderbringen.',
      ],
      summary: [
        'Die Marktkapitalisierung zeigt den Börsenwert, der EPS den Gewinn je Aktie.',
        'Das KGV setzt den Kurs ins Verhältnis zum Gewinn, das KBV zum Buchwert, das KUV zum Umsatz.',
        'Jede Kennzahl passt zu bestimmten Branchen und Situationen.',
        'Bewertungskennzahlen beantworten nur die Preisfrage, nicht die Qualitätsfrage.',
      ],
      exercise: {
        title: 'Bewertung berechnen',
        task: 'Ein Unternehmen hat 200 Mio. Aktien, Kurs 30 €, Nettogewinn 400 Mio. €, Eigenkapital 3 Mrd. €, Umsatz 5 Mrd. €. Berechne Marktkapitalisierung, EPS, KGV, KBV und KUV.',
        steps: ['Marktkapitalisierung: 200 Mio. × 30 € = 6 Mrd. €', 'EPS: 400 Mio. / 200 Mio. = 2 €', 'KGV: 30 / 2 = 15', 'KBV: 6 Mrd. / 3 Mrd. = 2', 'KUV: 6 Mrd. / 5 Mrd. = 1,2'],
        solution: 'Marktkapitalisierung 6 Mrd. €, EPS 2 €, KGV 15, KBV 2, KUV 1,2. Für eine Einordnung müsstest du diese Werte nun mit Wettbewerbern derselben Branche und der eigenen Historie vergleichen.',
      },
      widget: 'kpi-calculator',
    },
    {
      id: 'm05-l2',
      title: 'Ertrags-, Cashflow- und Bilanzkennzahlen: EBIT, EBITDA, Free Cashflow, Eigenkapitalrendite, Dividendenrendite, Verschuldungsgrad',
      minutes: 24,
      intro:
        'Bewertungskennzahlen sagen, was du zahlst. Diese Kennzahlen sagen, was du bekommst: Wie profitabel ist das Geschäft, wie viel Geld erzeugt es, wie viel davon fließt an dich und wie solide ist es finanziert?',
      sections: [
        {
          heading: '6. EBIT – Ergebnis vor Zinsen und Steuern',
          paragraphs: [
            '**Einfach erklärt:** Der Gewinn aus dem eigentlichen Geschäft, bevor Zinsen und Steuern abgezogen werden. EBIT steht für „Earnings Before Interest and Taxes“.',
            '**Rechenbeispiel:** Umsatz 1.000 Mio. €, alle operativen Kosten 850 Mio. € → EBIT = 150 Mio. €; EBIT-Marge 15 %.',
            '**Interpretation:** Das EBIT macht Unternehmen mit unterschiedlicher Finanzierung und Steuersituation vergleichbarer. Steigt das EBIT schneller als der Umsatz, verbessert sich die operative Profitabilität.',
            '**Sinnvoll für:** den operativen Vergleich mit Wettbewerbern. **Anfängerfehler:** Zu vergessen, dass Zinsen echtes Geld kosten – ein hoch verschuldetes Unternehmen kann ein gutes EBIT haben und trotzdem kaum Gewinn. **Allein nicht genug:** Schulden und Steuern fehlen völlig.',
          ],
          formula: 'EBIT = Umsatz − operative Kosten (inkl. Abschreibungen)  ≈  Nettogewinn + Steuern + Zinsen',
        },
        {
          heading: '7. EBITDA',
          paragraphs: [
            '**Einfach erklärt:** Wie das EBIT, aber zusätzlich vor Abschreibungen („Depreciation and Amortization“). Abschreibungen verteilen die Kosten früherer Investitionen auf mehrere Jahre und sind kein aktueller Geldabfluss.',
            '**Rechenbeispiel:** EBIT 150 Mio. € + Abschreibungen 70 Mio. € = EBITDA 220 Mio. €.',
            '**Interpretation:** Das EBITDA ist eine grobe Annäherung an den operativen Cashflow und wird häufig für Verschuldungskennzahlen (Nettoverschuldung / EBITDA) genutzt.',
            '**Sinnvoll für:** den Vergleich kapitalintensiver Unternehmen und die Beurteilung der Schuldentragfähigkeit. **Anfängerfehler:** EBITDA mit Gewinn zu verwechseln. Maschinen müssen irgendwann ersetzt werden – Abschreibungen sind sehr wohl echte Kosten. Warren Buffetts Partner Charlie Munger bezeichnete EBITDA gern spöttisch als „Bullshit Earnings“. **Allein nicht genug:** Es ignoriert Investitionen, Zinsen und Steuern.',
          ],
          formula: 'EBITDA = EBIT + Abschreibungen',
        },
        {
          heading: '8. Free Cashflow',
          paragraphs: [
            '**Einfach erklärt:** Das Geld, das nach dem laufenden Geschäft und den notwendigen Investitionen wirklich übrig bleibt.',
            '**Rechenbeispiel:** Operativer Cashflow 130 Mio. € − Investitionen 52 Mio. € = Free Cashflow 78 Mio. €. Bei einer Marktkapitalisierung von 1,3 Mrd. € beträgt die **Free-Cashflow-Rendite** 6 %.',
            '**Interpretation:** Ein stabiler, wachsender Free Cashflow ist eines der besten Qualitätsmerkmale. Er finanziert Dividenden, Aktienrückkäufe, Schuldenabbau und Übernahmen.',
            '**Sinnvoll für:** die Prüfung der Gewinnqualität und die Nachhaltigkeit der Dividende. **Anfängerfehler:** Ein einzelnes Jahr zu betrachten – der Free Cashflow schwankt mit großen Investitionen. **Allein nicht genug:** Ein Unternehmen kann kurzfristig den Free Cashflow erhöhen, indem es notwendige Investitionen aufschiebt.',
          ],
          formula: 'Free Cashflow = operativer Cashflow − Investitionen (Capex)',
        },
        {
          heading: '9. Eigenkapitalrendite (ROE)',
          paragraphs: [
            '**Einfach erklärt:** Wie viel Gewinn erwirtschaftet ein Unternehmen mit dem Geld der Aktionäre? ROE steht für „Return on Equity“.',
            '**Rechenbeispiel:** Nettogewinn 91 Mio. €, Eigenkapital 720 Mio. € → ROE = 12,6 %.',
            '**Interpretation:** Werte über 10–15 % gelten oft als gut. Unternehmen mit dauerhaft hoher Eigenkapitalrendite haben häufig einen Wettbewerbsvorteil.',
            '**Sinnvoll für:** die Beurteilung der Kapitaleffizienz, besonders bei Banken und Versicherungen. **Anfängerfehler:** Zu übersehen, dass eine hohe ROE auch durch hohe Schulden entstehen kann (weniger Eigenkapital, gleicher Gewinn). Bei sehr kleinem oder negativem Eigenkapital ist die ROE nicht aussagekräftig. **Allein nicht genug:** Immer zusammen mit dem Verschuldungsgrad betrachten.',
          ],
          formula: 'Eigenkapitalrendite (%) = Nettogewinn / Eigenkapital × 100',
        },
        {
          heading: '10. Dividendenrendite',
          paragraphs: [
            '**Einfach erklärt:** Wie viel Prozent des Aktienkurses bekommst du jährlich als Dividende?',
            '**Rechenbeispiel:** Dividende 11 € je Aktie, Kurs 210 € → Dividendenrendite = 5,2 %.',
            '**Interpretation:** Viele etablierte Unternehmen zahlen zwischen 2 und 5 %. Sehr hohe Renditen (z. B. über 8 %) sind oft ein Warnsignal: Der Kurs ist stark gefallen, weil Anleger mit einer Kürzung der Dividende rechnen.',
            '**Sinnvoll für:** Einkommensorientierte Anleger und die Einschätzung, wie viel Gewinn ausgeschüttet wird (zusammen mit der **Ausschüttungsquote** = Dividende / Gewinn). **Anfängerfehler:** Nur nach der höchsten Rendite auszuwählen. **Allein nicht genug:** Eine hohe Dividende hilft dir nicht, wenn der Kurs gleichzeitig stärker fällt.',
          ],
          formula: 'Dividendenrendite (%) = Dividende je Aktie / Aktienkurs × 100',
        },
        {
          heading: '11. Verschuldungsgrad',
          paragraphs: [
            '**Einfach erklärt:** Wie viele Euro Schulden kommen auf einen Euro Eigenkapital?',
            '**Rechenbeispiel:** Fremdkapital 1.080 Mio. €, Eigenkapital 720 Mio. € → Verschuldungsgrad = 1,5 (150 %).',
            '**Interpretation:** Ein höherer Wert bedeutet mehr finanzielles Risiko, aber auch einen „Hebel“ auf die Eigenkapitalrendite. Je stabiler das Geschäft (z. B. Versorger), desto mehr Schulden kann es tragen. Häufig wird auch die Kennzahl **Nettoverschuldung / EBITDA** verwendet.',
            '**Sinnvoll für:** die Risikoeinschätzung, vor allem in Phasen steigender Zinsen. **Anfängerfehler:** Unterschiedliche Definitionen zu vermischen (Gesamtes Fremdkapital vs. nur Finanzschulden). **Allein nicht genug:** Entscheidend ist, ob der Cashflow die Schulden sicher bedienen kann.',
          ],
          formula: 'Verschuldungsgrad = Fremdkapital / Eigenkapital',
        },
      ],
      examples: [
        {
          title: 'Beispiel: Hohe ROE durch Schulden',
          text: 'Unternehmen A: Gewinn 100, Eigenkapital 1.000 → ROE 10 %, kaum Schulden. Unternehmen B: Gewinn 100, Eigenkapital 400 (der Rest ist mit Krediten finanziert) → ROE 25 %. B sieht besser aus, ist aber deutlich riskanter: Fällt der Gewinn, belasten die Zinsen B viel stärker.',
        },
        {
          title: 'Beispiel: Dividendenfalle',
          text: 'Eine Aktie fällt von 40 € auf 20 €, die letzte Dividende betrug 2 €. Die Dividendenrendite steigt rechnerisch von 5 % auf 10 %. Im Folgejahr streicht das Unternehmen die Dividende wegen Verlusten. Wer nur auf die 10 % geachtet hat, ist in eine Dividendenfalle getappt.',
        },
      ],
      practice: [
        'Berechne für die Beispiel AG aus Modul 4 EBITDA (Abschreibungen 70 Mio. €), Eigenkapitalrendite und Verschuldungsgrad.',
        'Prüfe bei einer Dividendenaktie deiner Wahl die Ausschüttungsquote der letzten 5 Jahre.',
      ],
      terms: [
        { term: 'EBIT', definition: 'Ergebnis vor Zinsen und Steuern.' },
        { term: 'EBITDA', definition: 'Ergebnis vor Zinsen, Steuern und Abschreibungen.' },
        { term: 'Free Cashflow', definition: 'Operativer Cashflow minus Investitionen.' },
        { term: 'Eigenkapitalrendite', definition: 'Gewinn im Verhältnis zum Eigenkapital.' },
        { term: 'Dividendenrendite', definition: 'Dividende im Verhältnis zum Aktienkurs.' },
        { term: 'Ausschüttungsquote', definition: 'Anteil des Gewinns, der als Dividende ausgezahlt wird.' },
        { term: 'Verschuldungsgrad', definition: 'Fremdkapital im Verhältnis zum Eigenkapital.' },
      ],
      mistakes: [
        'EBITDA mit Gewinn verwechseln.',
        'Eine hohe Eigenkapitalrendite ohne Blick auf die Schulden bejubeln.',
        'Aktien nur nach der höchsten Dividendenrendite auswählen.',
        'Kennzahlen nur für ein Jahr betrachten.',
      ],
      summary: [
        'EBIT und EBITDA zeigen die operative Ertragskraft vor Finanzierung und Steuern.',
        'Der Free Cashflow zeigt, wie viel Geld wirklich übrig bleibt.',
        'Die Eigenkapitalrendite misst die Kapitaleffizienz – immer mit dem Verschuldungsgrad lesen.',
        'Eine sehr hohe Dividendenrendite ist oft ein Warnsignal.',
      ],
      exercise: {
        title: 'Kennzahlen-Check',
        task: 'Nettogewinn 120 Mio. €, Steuern 40 Mio. €, Zinsen 20 Mio. €, Abschreibungen 60 Mio. €, Eigenkapital 800 Mio. €, Fremdkapital 1.200 Mio. €, Dividende 2 € je Aktie, Kurs 50 €. Berechne EBIT, EBITDA, ROE, Verschuldungsgrad und Dividendenrendite.',
        solution: 'EBIT = 120 + 40 + 20 = 180 Mio. €. EBITDA = 180 + 60 = 240 Mio. €. ROE = 120 / 800 = 15 %. Verschuldungsgrad = 1.200 / 800 = 1,5. Dividendenrendite = 2 / 50 = 4 %.',
      },
    },
    {
      id: 'm05-l3',
      title: 'Kennzahlen kombinieren: Warum eine einzelne Zahl nie reicht',
      minutes: 15,
      intro:
        'Jede Kennzahl beleuchtet nur einen Ausschnitt. Erst das Zusammenspiel mehrerer Kennzahlen, eingeordnet in Branche, Historie und Geschäftsmodell, ergibt ein brauchbares Bild.',
      sections: [
        {
          heading: 'Das Kennzahlen-Dreieck: Preis, Qualität, Sicherheit',
          paragraphs: [
            'Eine gute Faustregel ist, Kennzahlen aus drei Bereichen zu kombinieren:',
          ],
          bullets: [
            'Preis (Bewertung): KGV, KBV, KUV, Free-Cashflow-Rendite – Was zahle ich?',
            'Qualität (Ertragskraft): Margen, Eigenkapitalrendite, Wachstum von Umsatz, EPS und Free Cashflow – Wie gut ist das Geschäft?',
            'Sicherheit (Finanzierung): Eigenkapitalquote, Verschuldungsgrad, Nettoverschuldung/EBITDA – Übersteht das Unternehmen eine Krise?',
          ],
        },
        {
          heading: 'Vergleiche richtig anstellen',
          paragraphs: [
            'Kennzahlen sind nur im Vergleich aussagekräftig: **mit Wettbewerbern derselben Branche**, **mit der eigenen Historie** des Unternehmens (z. B. Durchschnitts-KGV der letzten 10 Jahre) und **mit dem Gesamtmarkt**. Ein KGV von 25 kann für ein Softwareunternehmen günstig und für einen Stahlhersteller extrem teuer sein.',
          ],
        },
        {
          heading: 'Warum eine einzelne Kennzahl niemals reicht',
          paragraphs: [
            'Kennzahlen beruhen auf vergangenen Zahlen oder unsicheren Prognosen. Sie können durch Sondereffekte, Buchhaltungsregeln oder Aktienrückkäufe verzerrt sein. Und sie erfassen wichtige qualitative Faktoren nicht: Managementqualität, Wettbewerbsvorteile, technologische Umbrüche, Regulierung oder Reputationsrisiken.',
            'Deshalb gilt: **Kennzahlen sind ein Werkzeug zum Fragenstellen, nicht zum Antworten.** Eine auffällige Kennzahl ist der Anlass, genauer hinzusehen – nicht der Grund, sofort zu kaufen oder zu verkaufen.',
          ],
        },
        {
          heading: 'Eine einfache Kennzahlen-Matrix',
          paragraphs: ['So kannst du für jedes Unternehmen eine kurze Übersicht anlegen:'],
          bullets: [
            'Wachstum: Umsatz- und EPS-Wachstum der letzten 5 Jahre (pro Jahr).',
            'Profitabilität: EBIT-Marge, Nettomarge, Eigenkapitalrendite.',
            'Cashflow: Free Cashflow und Verhältnis Free Cashflow zu Nettogewinn.',
            'Bilanz: Eigenkapitalquote, Nettoverschuldung/EBITDA.',
            'Bewertung: KGV (historisch und erwartet), KUV, Dividendenrendite.',
            'Qualitativ: Burggraben, Management, größte Risiken.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Das „billige“ KGV',
          text: 'Bavaria Mobility (fiktiv) hat ein KGV von 6,6 und 6 % Dividendenrendite. Ein Blick auf die anderen Bereiche: Gewinne sinken seit drei Jahren, der Free Cashflow ist wegen massiver Investitionen in E-Autos niedrig, die Nettoverschuldung steigt. Die niedrige Bewertung spiegelt diese Risiken wider. Erst die Kombination zeigt das ganze Bild.',
        },
        {
          title: 'Beispiel: Das „teure“ KGV',
          text: 'Rheinsoft (fiktiv) hat ein KGV von 40. Aber: 20 % jährliches Wachstum, 30 % EBIT-Marge, keine Schulden und Free Cashflow über dem Gewinn. Das hohe KGV kann gerechtfertigt sein – oder auch nicht, wenn das Wachstum nachlässt. Das Risiko liegt hier in den hohen Erwartungen.',
        },
      ],
      practice: [
        'Lege für zwei Unternehmen derselben Branche eine Kennzahlen-Matrix an und vergleiche sie.',
        'Formuliere zu jeder auffälligen Kennzahl eine Frage, die du im Geschäftsbericht klären willst.',
      ],
      terms: [
        { term: 'Peer Group', definition: 'Gruppe vergleichbarer Unternehmen derselben Branche.' },
        { term: 'Historisches KGV', definition: 'KGV auf Basis des Gewinns der Vergangenheit.' },
        { term: 'Erwartetes KGV', definition: 'KGV auf Basis von Gewinnschätzungen für die Zukunft.' },
        { term: 'Sondereffekt', definition: 'Einmaliger Ertrag oder Aufwand, der das Ergebnis verzerrt.' },
      ],
      mistakes: [
        'Auf Basis einer einzigen Kennzahl kaufen oder verkaufen.',
        'Kennzahlen aus verschiedenen Quellen mit unterschiedlichen Definitionen mischen.',
        'Qualitative Faktoren ignorieren, weil sie sich nicht in Zahlen ausdrücken lassen.',
      ],
      summary: [
        'Kombiniere Kennzahlen zu Preis, Qualität und Sicherheit.',
        'Vergleiche mit Branche, Historie und Gesamtmarkt.',
        'Kennzahlen werfen Fragen auf – sie beantworten sie nicht.',
        'Eine einzelne Kennzahl reicht niemals für eine Kaufentscheidung.',
      ],
      exercise: {
        title: 'Welches Bild ergibt sich?',
        task: 'Unternehmen X: KGV 8, Dividendenrendite 9 %, Umsatz −10 % pro Jahr seit 3 Jahren, Nettoverschuldung/EBITDA 4,5. Wie schätzt du die Situation ein?',
        solution: 'Die Bewertung ist niedrig und die Dividende hoch – aber der Umsatz schrumpft und die Verschuldung ist hoch. Das deutet auf ein Unternehmen in Schwierigkeiten hin. Die hohe Dividende könnte bald gekürzt werden. Das Gesamtbild ist eher riskant als „günstig“ – es braucht eine genaue Analyse der Ursachen.',
      },
    },
  ],
  quiz: [
    { id: 'm05-q1', type: 'calc', lesson: 0, question: 'Kurs 60 €, Gewinn je Aktie 4 €. Wie hoch ist das KGV?', options: ['6', '15', '24', '240'], answer: 1, explanation: 'KGV = 60 / 4 = 15.' },
    { id: 'm05-q2', type: 'calc', lesson: 0, question: '500 Mio. Aktien, Kurs 20 €. Wie hoch ist die Marktkapitalisierung?', options: ['1 Mrd. €', '10 Mrd. €', '25 Mrd. €', '100 Mrd. €'], answer: 1, explanation: '500 Mio. × 20 € = 10 Mrd. €.' },
    { id: 'm05-q3', type: 'mc', lesson: 0, question: 'Für welche Branche ist das KBV besonders aussagekräftig?', options: ['Software', 'Banken und Versicherungen', 'Social-Media-Plattformen', 'Biotech ohne Umsatz'], answer: 1, explanation: 'Bei Banken und Versicherungen besteht das Geschäft überwiegend aus bilanzierten Vermögenswerten. Bei Software fehlen die wichtigsten Werte oft in der Bilanz.' },
    { id: 'm05-q4', type: 'case', lesson: 0, question: 'Ein Unternehmen macht Verluste. Welche Bewertungskennzahl ist am ehesten anwendbar?', options: ['KGV', 'KUV', 'Dividendenrendite', 'PEG'], answer: 1, explanation: 'Bei Verlusten ist das KGV negativ und nicht sinnvoll. Das KUV bezieht sich auf den Umsatz.' },
    { id: 'm05-q5', type: 'tf', lesson: 0, question: 'Wenn ein Unternehmen eigene Aktien zurückkauft, kann der Gewinn je Aktie steigen, obwohl der Gesamtgewinn gleich bleibt.', answer: 0, explanation: 'Richtig. Weniger Aktien bei gleichem Gewinn erhöhen den EPS.' },
    { id: 'm05-q6', type: 'calc', lesson: 1, question: 'Nettogewinn 50 Mio. €, Eigenkapital 400 Mio. €. Wie hoch ist die Eigenkapitalrendite?', options: ['8 %', '12,5 %', '20 %', '50 %'], answer: 1, explanation: '50 / 400 = 12,5 %.' },
    { id: 'm05-q7', type: 'calc', lesson: 1, question: 'Dividende 1,50 €, Kurs 50 €. Wie hoch ist die Dividendenrendite?', options: ['1,5 %', '3 %', '5 %', '33 %'], answer: 1, explanation: '1,50 / 50 = 3 %.' },
    { id: 'm05-q8', type: 'mc', lesson: 1, question: 'Was unterscheidet EBITDA von EBIT?', options: ['EBITDA enthält zusätzlich die Steuern', 'EBITDA wird vor Abschreibungen berechnet', 'EBITDA ist immer kleiner als EBIT', 'Es gibt keinen Unterschied'], answer: 1, explanation: 'EBITDA = EBIT + Abschreibungen. Es ist daher meist größer.' },
    { id: 'm05-q9', type: 'case', lesson: 1, question: 'Eine Aktie hat 11 % Dividendenrendite, weil der Kurs halbiert wurde. Wie solltest du das einordnen?', options: ['Als sicheres Einkommen', 'Als mögliches Warnsignal für eine Dividendenkürzung', 'Als garantierten Gewinn', 'Als Zeichen für Wachstum'], answer: 1, explanation: 'Sehr hohe Dividendenrenditen entstehen oft durch fallende Kurse, weil der Markt eine Kürzung erwartet.' },
    { id: 'm05-q10', type: 'calc', lesson: 1, question: 'Operativer Cashflow 300 Mio. €, Investitionen 120 Mio. €. Wie hoch ist der Free Cashflow?', options: ['420 Mio. €', '180 Mio. €', '120 Mio. €', '2,5'], answer: 1, explanation: '300 − 120 = 180 Mio. €.' },
    { id: 'm05-q11', type: 'mc', lesson: 2, question: 'Womit solltest du das KGV eines Unternehmens vergleichen?', options: ['Mit dem KGV eines Unternehmens aus einer völlig anderen Branche', 'Mit Wettbewerbern derselben Branche und der eigenen Historie', 'Mit dem Leitzins', 'Mit dem Aktienkurs'], answer: 1, explanation: 'Branchen haben sehr unterschiedliche typische Bewertungen. Vergleiche innerhalb der Peer Group und über die Zeit.' },
    { id: 'm05-q12', type: 'tf', lesson: 2, question: 'Ein niedriges KGV allein ist ein ausreichender Grund, eine Aktie zu kaufen.', answer: 1, explanation: 'Falsch. Niedrige Bewertungen können berechtigt sein (sinkende Gewinne, hohe Schulden, Strukturwandel).' },
  ],
  sources: [
    { label: 'Börse Frankfurt – Kennzahlen-Lexikon', url: 'https://www.boerse-frankfurt.de/wissen' },
    { label: 'Deutsches Aktieninstitut', url: 'https://www.dai.de' },
    { label: 'Investor-Relations-Seiten der DAX-Unternehmen (über deutsche-boerse.com)', url: 'https://www.deutsche-boerse.com' },
  ],
};
