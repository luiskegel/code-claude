import type { Module } from '@/types';

export const m15: Module = {
  id: 'm15',
  number: 15,
  title: 'Mein persönlicher Investmentplan',
  subtitle: 'Ziele, Notgroschen, Risikobereitschaft, Aufteilung und Überprüfung',
  category: 'strategien',
  icon: 'Target',
  description:
    'Zum Abschluss bringst du alles zusammen und erstellst deinen eigenen Lern- und Investmentplan. Die App gibt dir keine Kauf- oder Verkaufsempfehlungen, sondern hilft dir mit Fragen und Rechenhilfen, eigene fundierte Entscheidungen zu treffen.',
  lessons: [
    {
      id: 'm15-l1',
      title: 'Finanzielle Ziele, Anlagehorizont, Budget und Notgroschen',
      minutes: 16,
      intro:
        'Bevor du investierst, brauchst du ein solides Fundament: klare Ziele, einen realistischen Zeitrahmen, ein monatliches Budget und eine Rücklage für Notfälle.',
      sections: [
        {
          heading: 'Finanzielle Ziele',
          paragraphs: [
            'Formuliere deine Ziele möglichst konkret – zum Beispiel nach der **SMART**-Methode (spezifisch, messbar, attraktiv, realistisch, terminiert). Statt „Ich will reich werden“: „Ich möchte bis zu meinem 60. Geburtstag ein Vermögen aufbauen, das meine Rente ergänzt.“ Unterschiedliche Ziele brauchen oft unterschiedliche Anlagen: Ein Urlaub in einem Jahr gehört aufs Tagesgeldkonto, die Altersvorsorge in 30 Jahren kann überwiegend in Aktien liegen.',
          ],
        },
        {
          heading: 'Anlagehorizont',
          paragraphs: [
            'Der **Anlagehorizont** ist die Zeit, bis du das Geld voraussichtlich brauchst. Als Faustregel nennen viele Verbraucherschützer: Geld, das du in den nächsten **5 bis 10 Jahren** benötigst, sollte nicht oder nur zu einem kleinen Teil in Aktien investiert werden, weil Rückgänge sich in kürzeren Zeiträumen nicht sicher wieder ausgleichen.',
          ],
        },
        {
          heading: 'Monatlich verfügbares Budget',
          paragraphs: [
            'Erstelle einen Überblick über Einnahmen und Ausgaben. Was bleibt am Monatsende realistisch übrig? Ein Sparbetrag, den du dauerhaft durchhältst, ist besser als ein ehrgeiziger, den du nach drei Monaten wieder streichst. Ein häufig genannter Richtwert ist, 10–20 % des Nettoeinkommens zu sparen – aber jede Situation ist anders. Hohe, teure Schulden (Dispo, Ratenkredite) sollten in der Regel zuerst abgebaut werden, da ihre Zinsen meist höher sind als die erwartete Rendite von Aktien.',
          ],
        },
        {
          heading: 'Der Notgroschen',
          paragraphs: [
            'Der **Notgroschen** ist eine Rücklage für unerwartete Ausgaben (Autoreparatur, Waschmaschine, Jobverlust). Er sollte jederzeit verfügbar und sicher angelegt sein, z. B. auf einem Tagesgeldkonto. Häufig empfohlen werden **drei bis sechs Monatsausgaben**, bei Selbstständigen oder unsicheren Jobs mehr. Erst wenn der Notgroschen steht, solltest du mit dem Investieren beginnen. Er verhindert, dass du Aktien in einer Krise mit Verlust verkaufen musst.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Budget und Notgroschen',
          text: 'Mia verdient 2.400 € netto, ihre Fixkosten und Lebenshaltung betragen 2.000 €. Sie baut zuerst einen Notgroschen von 3 × 2.000 € = 6.000 € auf. Mit 300 € pro Monat dauert das 20 Monate. Danach investiert sie 250 € monatlich in einen ETF-Sparplan und legt 50 € für größere Anschaffungen zurück.',
        },
        {
          title: 'Beispiel: Ziele nach Horizont',
          text: 'Ziel 1: Neues Auto in 3 Jahren (8.000 €) → Tagesgeld/Festgeld. Ziel 2: Eigenkapital für eine Wohnung in 8 Jahren → Mischung aus sicheren Anlagen und einem kleineren Aktienanteil. Ziel 3: Altersvorsorge in 35 Jahren → überwiegend breit gestreute Aktien-ETFs, je nach Risikobereitschaft.',
        },
      ],
      practice: [
        'Fülle im Investmentplan-Assistenten unten die Abschnitte Ziele, Horizont, Budget und Notgroschen aus.',
        'Erstelle eine Liste deiner monatlichen Fixkosten und berechne deinen Notgroschen.',
      ],
      terms: [
        { term: 'Anlagehorizont', definition: 'Zeitraum, bis das angelegte Geld benötigt wird.' },
        { term: 'Notgroschen', definition: 'Sichere, jederzeit verfügbare Rücklage für Notfälle.' },
        { term: 'Tagesgeld', definition: 'Täglich verfügbares, verzinstes Konto mit Einlagensicherung.' },
        { term: 'SMART-Ziel', definition: 'Spezifisches, messbares, attraktives, realistisches und terminiertes Ziel.' },
        { term: 'Sparquote', definition: 'Anteil des Einkommens, der gespart wird.' },
      ],
      mistakes: [
        'Ohne Notgroschen zu investieren.',
        'Geld für kurzfristige Ziele in Aktien anzulegen.',
        'Mit teuren Schulden zu investieren, statt sie zuerst abzubauen.',
        'Eine zu hohe Sparrate zu wählen, die man nicht durchhält.',
      ],
      summary: [
        'Konkrete Ziele bestimmen die passende Anlage.',
        'Der Anlagehorizont entscheidet über den möglichen Aktienanteil.',
        'Ein realistisches Budget ist wichtiger als eine hohe Sparrate.',
        'Der Notgroschen kommt vor dem Investieren.',
      ],
      exercise: {
        title: 'Notgroschen berechnen',
        task: 'Deine monatlichen Ausgaben: Miete 750 €, Lebensmittel 300 €, Versicherungen 120 €, Mobilität 150 €, Sonstiges 280 €. Berechne den Notgroschen für 3 und 6 Monate.',
        solution: 'Monatsausgaben: 1.600 €. Notgroschen: 3 Monate = 4.800 €, 6 Monate = 9.600 €.',
      },
      widget: 'investment-plan',
    },
    {
      id: 'm15-l2',
      title: 'Risikobereitschaft, Diversifikation und Anlageklassen',
      minutes: 16,
      intro:
        'Jetzt legst du fest, wie dein Vermögen aufgeteilt werden soll. Diese Entscheidung – die Aufteilung auf Anlageklassen – beeinflusst dein Ergebnis mehr als die Auswahl einzelner Aktien.',
      sections: [
        {
          heading: 'Anlageklassen im Überblick',
          paragraphs: ['Die wichtigsten Anlageklassen für Privatanleger:'],
          bullets: [
            'Tagesgeld / Festgeld: sicher (Einlagensicherung bis 100.000 € je Bank und Kunde in der EU), niedrige Rendite, oft unter oder nahe der Inflation.',
            'Anleihen: Kredite an Staaten oder Unternehmen; mittleres Risiko je nach Schuldner und Laufzeit; Kurse fallen, wenn die Zinsen steigen.',
            'Aktien / Aktien-ETFs: höchste langfristige Renditechancen, aber hohe Schwankungen und Verlustrisiken.',
            'Immobilien: eigene Wohnung oder Immobilienfonds; Sachwert, aber oft wenig gestreut und illiquide.',
            'Rohstoffe / Gold: keine laufenden Erträge, teils Krisenschutz, stark schwankend.',
            'Kryptowährungen: extrem spekulativ, sehr hohe Schwankungen, Totalverlustrisiko.',
          ],
        },
        {
          heading: 'Risikobereitschaft in eine Aufteilung übersetzen',
          paragraphs: [
            'Eine einfache Methode ist die Aufteilung in einen **risikoarmen** und einen **risikoreichen** Teil. Je höher deine Risikotragfähigkeit und -bereitschaft und je länger dein Horizont, desto größer kann der risikoreiche Anteil sein. Überlege mit dem maximalen Verlust, den du verkraften würdest: Bei einem angenommenen Rückgang des Aktienteils um 50 % fällt ein 60/40-Depot um etwa 30 %, ein 30/70-Depot um etwa 15 %.',
            'Die alte Faustregel „100 minus Lebensalter = Aktienquote“ ist eine grobe Orientierung, ersetzt aber keine individuelle Betrachtung.',
          ],
        },
        {
          heading: 'Diversifikation im Plan',
          paragraphs: [
            'Innerhalb des Aktienteils sorgen breit gestreute Welt-ETFs für Diversifikation über Länder, Branchen und tausende Unternehmen. Einzelaktien können als Beimischung dienen – mit Obergrenzen pro Position (z. B. max. 5 % je Einzelaktie). Spekulative Anlagen (Krypto, Hebel, Penny Stocks) sollten, wenn überhaupt, nur einen sehr kleinen Anteil ausmachen, dessen Totalverlust du verkraften kannst.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Drei Anlegertypen (Lernbeispiele, keine Empfehlung)',
          text: 'Vorsichtig: 30 % Aktien-ETF, 70 % Tagesgeld/Anleihen – maximaler Rückgang bei −50 % Aktien ca. −15 %. Ausgewogen: 60 % Aktien-ETF, 40 % sicher – ca. −30 %. Wachstumsorientiert: 90 % Aktien-ETF, 10 % sicher – ca. −45 %. Welche Variante passt, hängt von deiner Tragfähigkeit, deinem Horizont und deiner Gelassenheit ab.',
        },
        {
          title: 'Beispiel: Core-Satellite',
          text: 'Ein Anleger investiert 85 % seines Aktienanteils in einen FTSE-All-World-ETF (Core) und 15 % in fünf Einzelaktien, die er selbst analysiert hat (Satellite, je 3 %). So kann er lernen und analysieren, ohne dass ein einzelner Fehler das Gesamtvermögen gefährdet.',
        },
      ],
      practice: [
        'Lege im Investmentplan-Assistenten deine Zielaufteilung fest und lies den maximal erwarteten Rückgang ab.',
        'Nutze den Portfolio-Diversifikationsrechner im Bereich „Rechner“ für deine geplante Aufteilung.',
      ],
      terms: [
        { term: 'Anlageklasse', definition: 'Gruppe ähnlicher Anlagen wie Aktien, Anleihen, Cash, Immobilien.' },
        { term: 'Asset Allocation', definition: 'Aufteilung des Vermögens auf Anlageklassen.' },
        { term: 'Anleihe', definition: 'Verzinsliches Wertpapier – ein Kredit an einen Staat oder ein Unternehmen.' },
        { term: 'Einlagensicherung', definition: 'Gesetzlicher Schutz von Bankguthaben bis 100.000 € pro Kunde und Bank in der EU.' },
        { term: 'Aktienquote', definition: 'Anteil von Aktien am Gesamtvermögen.' },
      ],
      mistakes: [
        'Die Aufteilung nach der jüngsten Marktentwicklung zu ändern.',
        'Spekulative Anlagen zu hoch zu gewichten.',
        'Den sicheren Anteil zu vernachlässigen.',
      ],
      summary: [
        'Die Aufteilung auf Anlageklassen ist die wichtigste Entscheidung.',
        'Der risikoarme Anteil dämpft Verluste, der risikoreiche bringt Renditechancen.',
        'Breite ETFs bilden einen soliden Kern, Einzelaktien eine begrenzte Beimischung.',
        'Spekulation nur mit Geld, dessen Verlust du verkraften kannst.',
      ],
      exercise: {
        title: 'Maximalen Rückgang abschätzen',
        task: 'Du hast 40.000 € mit einer Aufteilung 70 % Aktien-ETF / 30 % Tagesgeld. Wie stark fällt dein Gesamtvermögen, wenn der Aktienteil um 40 % fällt?',
        solution: 'Aktienteil: 28.000 € × 40 % = 11.200 € Verlust. Gesamtvermögen: 40.000 − 11.200 = 28.800 € (−28 %). Prüfe, ob du diesen Rückgang aushalten würdest.',
      },
      widget: 'investment-plan',
    },
    {
      id: 'm15-l3',
      title: 'Langfristige Strategie, regelmäßige Überprüfung und dein Lernplan',
      minutes: 14,
      intro:
        'Ein Plan ist nur so gut wie seine Umsetzung. In dieser letzten Lektion legst du fest, wie du deinen Plan umsetzt, regelmäßig überprüfst und wie du weiterlernst.',
      sections: [
        {
          heading: 'Langfristige Strategie festlegen',
          paragraphs: ['Halte schriftlich fest:'],
          bullets: [
            'Deine Ziele, Horizonte und Sparrate.',
            'Deine Zielaufteilung (z. B. 70/30) und die konkreten Anlagen (Art der ETFs, Kriterien für Einzelaktien).',
            'Deine Regeln: maximale Positionsgröße, keine Hebelprodukte, keine Kredite, Wartezeit vor spontanen Käufen.',
            'Dein Krisen-Notfallplan.',
          ],
        },
        {
          heading: 'Regelmäßige Überprüfung',
          paragraphs: [
            'Überprüfe deinen Plan **einmal im Jahr** und bei großen Lebensereignissen (Jobwechsel, Familie, Erbschaft, Hauskauf). Prüfe: Stimmt die Aufteilung noch (Rebalancing)? Passen Sparrate und Ziele noch? Haben sich Kosten der Anlagen verändert? Sind Investmentthesen von Einzelaktien noch gültig? Ist der Freistellungsauftrag richtig verteilt?',
            'Nicht notwendig ist es, auf Tagesschwankungen oder Schlagzeilen zu reagieren. Ein langweiliges Depot ist oft ein gutes Depot.',
          ],
        },
        {
          heading: 'Dein Lernplan',
          paragraphs: [
            'Lernen hört nicht auf. Ein möglicher Lernplan nach dieser Akademie: Wiederhole Module, in denen deine Testergebnisse schwach waren (siehe „Mein Lernfortschritt“). Übe im virtuellen Depot mindestens drei simulierte Monate mit festen Regeln. Analysiere pro Quartal ein Unternehmen mit der 12-Schritte-Checkliste. Lies regelmäßig Primärquellen (Geschäftsberichte, EZB, BaFin) statt Schlagzeilen.',
          ],
        },
        {
          heading: 'Wichtiger Hinweis',
          paragraphs: [
            'Diese Akademie ist eine Lernplattform und **keine Anlageberatung**. Sie gibt keine individuellen Kauf- oder Verkaufsempfehlungen. Bei komplexen persönlichen Fragen (z. B. Altersvorsorge mit Förderung, Steuern, Erbschaft) kann eine unabhängige Beratung sinnvoll sein – etwa durch Verbraucherzentralen oder Honorarberater, die nicht an Provisionen verdienen.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Jährlicher Check (Januar)',
          text: '1. Depot-Aufteilung prüfen: Aktien 76 % statt Ziel 70 % → Sparraten für 6 Monate ins Tagesgeld lenken. 2. Notgroschen: noch ausreichend? 3. Sparrate: Gehaltserhöhung → Sparrate um 50 € erhöhen. 4. Einzelaktien: Thesen anhand der Geschäftsberichte prüfen. 5. Freistellungsauftrag prüfen. Dauer: etwa eine Stunde pro Jahr.',
        },
        {
          title: 'Beispiel: Lebensereignis',
          text: 'Jonas plant, in drei Jahren eine Wohnung zu kaufen, und braucht 40.000 € Eigenkapital. Dieser Betrag hat nun einen kurzen Horizont. Er schichtet schrittweise den benötigten Teil aus Aktien-ETFs in Tagesgeld und Festgeld um, damit ein Crash seine Pläne nicht gefährdet.',
        },
      ],
      practice: [
        'Schließe den Investmentplan-Assistenten unten ab und drucke ihn aus oder kopiere ihn in dein Notizbuch.',
        'Trage dir einen jährlichen Termin für deinen Depot-Check in den Kalender ein.',
      ],
      terms: [
        { term: 'Rebalancing', definition: 'Wiederherstellen der Zielaufteilung.' },
        { term: 'Honorarberatung', definition: 'Beratung gegen Honorar statt gegen Provision.' },
        { term: 'Lebensereignis', definition: 'Wichtige Veränderung, die eine Überprüfung des Plans erfordert.' },
        { term: 'Anlageregeln', definition: 'Selbst festgelegte Grundsätze für Investmententscheidungen.' },
      ],
      mistakes: [
        'Den Plan aufzuschreiben und nie wieder anzusehen.',
        'Bei jeder Marktbewegung den Plan zu ändern.',
        'Aufzuhören zu lernen, sobald die ersten Gewinne da sind.',
      ],
      summary: [
        'Ein schriftlicher Plan mit Zielen, Aufteilung und Regeln ist die Grundlage.',
        'Jährliche Überprüfung und Anpassung bei Lebensereignissen genügen.',
        'Weiterlernen: schwache Module wiederholen, simulieren, analysieren.',
        'Die Akademie ersetzt keine individuelle Beratung.',
      ],
      exercise: {
        title: 'Deine fünf Anlageregeln',
        task: 'Formuliere fünf persönliche Anlageregeln, die du in jeder Marktphase einhalten willst.',
        solution: 'Beispiel (Lernbeispiel): 1. Ich halte immer 6 Monatsausgaben als Notgroschen. 2. Mein Sparplan läuft unabhängig von Schlagzeilen. 3. Keine Einzelaktie über 5 % des Depots. 4. Keine Kredite und keine Hebelprodukte. 5. Ich prüfe mein Depot einmal im Jahr im Januar und rebalanciere nach Plan.',
      },
      widget: 'investment-plan',
    },
  ],
  quiz: [
    { id: 'm15-q1', type: 'mc', lesson: 0, question: 'Was sollte vor dem ersten Investment vorhanden sein?', options: ['Ein Hebelprodukt', 'Ein Notgroschen', 'Ein Kredit', 'Eine Kryptowährung'], answer: 1, explanation: 'Der Notgroschen verhindert Notverkäufe in Krisen.' },
    { id: 'm15-q2', type: 'calc', lesson: 0, question: 'Deine Monatsausgaben betragen 1.800 €. Wie hoch ist ein Notgroschen von 3 Monatsausgaben?', options: ['1.800 €', '3.600 €', '5.400 €', '10.800 €'], answer: 2, explanation: '3 × 1.800 € = 5.400 €.' },
    { id: 'm15-q3', type: 'case', lesson: 0, question: 'Du möchtest in 2 Jahren 10.000 € für ein Auto haben. Wo ist das Geld nach den Grundsätzen dieses Moduls am besten aufgehoben?', options: ['Einzelaktien', 'Tagesgeld oder Festgeld', 'Hebelprodukte', 'Penny Stocks'], answer: 1, explanation: 'Bei kurzem Horizont ist Sicherheit wichtiger als Rendite.' },
    { id: 'm15-q4', type: 'tf', lesson: 0, question: 'Teure Dispo- oder Ratenkredite sollten in der Regel vor dem Investieren abgebaut werden.', answer: 0, explanation: 'Richtig. Ihre Zinsen sind meist höher als die erwartete Aktienrendite.' },
    { id: 'm15-q5', type: 'calc', lesson: 1, question: 'Depot: 50 % Aktien, 50 % Tagesgeld. Der Aktienteil fällt um 40 %. Wie stark fällt das Gesamtdepot?', options: ['−40 %', '−20 %', '−10 %', '−50 %'], answer: 1, explanation: '0,5 × (−40 %) = −20 %.' },
    { id: 'm15-q6', type: 'mc', lesson: 1, question: 'Welche Anlageklasse ist in der EU bis 100.000 € pro Kunde und Bank gesetzlich gesichert?', options: ['Aktien', 'Bankeinlagen wie Tagesgeld', 'Kryptowährungen', 'Optionsscheine'], answer: 1, explanation: 'Die gesetzliche Einlagensicherung schützt Bankeinlagen bis 100.000 €.' },
    { id: 'm15-q7', type: 'mc', lesson: 1, question: 'Welche Entscheidung beeinflusst das Anlageergebnis laut diesem Modul besonders stark?', options: ['Die Farbe der Broker-App', 'Die Aufteilung auf Anlageklassen', 'Der Wochentag des Kaufs', 'Die Uhrzeit des Logins'], answer: 1, explanation: 'Die Asset Allocation bestimmt Risiko und Rendite maßgeblich.' },
    { id: 'm15-q8', type: 'mc', lesson: 2, question: 'Wie oft sollte ein langfristiger Investmentplan grundsätzlich überprüft werden?', options: ['Täglich', 'Etwa einmal im Jahr und bei Lebensereignissen', 'Nie', 'Bei jeder Schlagzeile'], answer: 1, explanation: 'Ein jährlicher Check plus Anlass-Überprüfungen reichen aus.' },
    { id: 'm15-q9', type: 'tf', lesson: 2, question: 'Diese Akademie gibt dir individuelle Kaufempfehlungen für Aktien.', answer: 1, explanation: 'Falsch. Die Akademie ist eine Lernplattform und keine Anlageberatung.' },
    { id: 'm15-q10', type: 'case', lesson: 2, question: 'Du planst in 3 Jahren einen Wohnungskauf. Wie sollte sich dein Plan verändern?', options: ['Gar nicht', 'Den benötigten Betrag schrittweise in sichere Anlagen umschichten', 'Mehr Hebelprodukte kaufen', 'Alles in eine Einzelaktie investieren'], answer: 1, explanation: 'Geld mit kurzem Horizont sollte vor Kursrückgängen geschützt werden.' },
    { id: 'm15-q11', type: 'mc', lesson: 2, question: 'Was zeichnet eine Honorarberatung aus?', options: ['Sie ist immer kostenlos', 'Der Berater wird vom Kunden bezahlt statt über Provisionen', 'Sie verkauft nur Versicherungen', 'Sie ist verboten'], answer: 1, explanation: 'Honorarberater sind unabhängiger, weil sie nicht an Produktprovisionen verdienen.' },
  ],
  sources: [
    { label: 'Verbraucherzentrale – Geldanlage und Altersvorsorge', url: 'https://www.verbraucherzentrale.de/geld-versicherungen' },
    { label: 'BaFin – Geldanlage: Tipps für Verbraucher', url: 'https://www.bafin.de/DE/Verbraucher/verbraucher_node.html' },
    { label: 'Bundesbank – Einlagensicherung', url: 'https://www.bundesbank.de' },
    { label: 'Geld und Haushalt (Ratgeber der Sparkassen-Finanzgruppe) – Budgetplanung', url: 'https://www.geldundhaushalt.de' },
  ],
};
