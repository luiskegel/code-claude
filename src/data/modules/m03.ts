import type { Module } from '@/types';

export const m03: Module = {
  id: 'm03',
  number: 3,
  title: 'Wie man tatsächlich Aktien kauft',
  subtitle: 'Broker, Depot, Kosten, Handelsplätze und Ordertypen',
  category: 'grundlagen',
  icon: 'ShoppingCart',
  description:
    'Jetzt wird es praktisch: Du lernst, wie du ein Depot eröffnest, welche Kosten anfallen, wann und wo du handeln kannst und mit welchen Ordertypen du deine Käufe und Verkäufe steuerst.',
  lessons: [
    {
      id: 'm03-l1',
      title: 'Broker, Depot und Verrechnungskonto',
      minutes: 13,
      intro:
        'Um Aktien zu kaufen, brauchst du einen Zugang zur Börse. Den bekommst du nicht direkt, sondern über einen Broker. In dieser Lektion lernst du, wie du einen geeigneten Anbieter findest und dein Depot eröffnest.',
      sections: [
        {
          heading: 'Was ist ein Broker?',
          paragraphs: [
            'Ein **Broker** ist ein Vermittler, der deine Kauf- und Verkaufsaufträge an die Börse weiterleitet. Privatanleger dürfen nicht direkt an der Börse handeln – dafür braucht man eine Zulassung. Broker können klassische Filialbanken, Direktbanken (Online-Banken) oder sogenannte Neobroker (App-basierte Anbieter mit sehr niedrigen Gebühren) sein.',
            'Achte bei der Wahl auf: **Regulierung** (Aufsicht durch BaFin oder eine andere EU-Aufsicht), **Einlagensicherung**, **Kosten** (Ordergebühren, Depotgebühren, Fremdspesen), **Handelsplätze** (nur ein Handelsplatz oder auch Xetra und Regionalbörsen), **Angebot** (Aktien, ETFs, Sparpläne), **Bedienung** und **Steuerservice** (deutsche Broker führen die Abgeltungsteuer automatisch ab).',
          ],
        },
        {
          heading: 'Was ist ein Depot?',
          paragraphs: [
            'Ein **Depot** (Wertpapierdepot) ist wie ein Konto für Wertpapiere. Dort werden deine Aktien, ETFs und Anleihen verbucht und verwahrt. Ein Depot hat eine Depotnummer, und du siehst darin jederzeit deine Bestände, Kaufkurse und den aktuellen Wert. Viele Broker bieten Depots heute ohne laufende Depotgebühr an.',
          ],
        },
        {
          heading: 'Das Verrechnungskonto',
          paragraphs: [
            'Zum Depot gehört ein **Verrechnungskonto** (auch Referenz- oder Abrechnungskonto). Von diesem Konto wird das Geld für Käufe abgebucht, und Verkaufserlöse, Dividenden und Zinsen werden dort gutgeschrieben. Manchmal ist es ein separates Konto beim Broker, manchmal dein normales Girokonto bei derselben Bank.',
          ],
        },
        {
          heading: 'Wie eröffnet man ein Wertpapierdepot?',
          paragraphs: ['Der typische Ablauf bei einem Online-Broker:'],
          bullets: [
            '1. Anbieter vergleichen (Kosten, Angebot, Aufsicht) – unabhängige Vergleiche z. B. von Finanztip oder Stiftung Warentest nutzen.',
            '2. Online-Antrag ausfüllen: persönliche Daten, Steuer-Identifikationsnummer, Angaben zu Beruf und Einkommen.',
            '3. Fragen zu Kenntnissen und Erfahrungen beantworten (gesetzlich vorgeschrieben, Angemessenheitsprüfung nach WpHG). Ehrlich antworten – sie schützen dich!',
            '4. Identität bestätigen (Video-Ident, Online-Ausweis oder Post-Ident).',
            '5. Unterlagen und Zugangsdaten erhalten, Zwei-Faktor-Authentifizierung einrichten.',
            '6. Verrechnungskonto mit Geld auffüllen, Freistellungsauftrag einrichten (siehe Steuern).',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Kostenvergleich zweier Broker (fiktive Konditionen)',
          text: 'Broker A: 0 € Depotgebühr, 1 € pro Order, nur ein außerbörslicher Handelsplatz. Broker B: 0 € Depotgebühr, 4,90 € + 0,25 % pro Order, Zugang zu Xetra und allen deutschen Börsen. Wer zwölfmal im Jahr für je 500 € kauft, zahlt bei A 12 €, bei B 12 × (4,90 + 1,25) = 73,80 €. Wer selten große Beträge handelt und Wert auf Xetra legt, kann mit B dennoch zufrieden sein.',
        },
        {
          title: 'Beispiel: Geldfluss beim Kauf',
          text: 'Du überweist 2.000 € vom Girokonto auf das Verrechnungskonto. Du kaufst Aktien für 1.500 € plus 1 € Gebühr. Auf dem Verrechnungskonto bleiben 499 €. Später zahlt das Unternehmen 30 € Dividende – sie landet ebenfalls auf dem Verrechnungskonto.',
        },
      ],
      practice: [
        'Erstelle eine Liste mit drei Brokern und vergleiche Ordergebühren, Depotgebühren, Handelsplätze und Sparplanangebot.',
        'Prüfe in der BaFin-Unternehmensdatenbank, ob ein Anbieter tatsächlich zugelassen ist.',
      ],
      terms: [
        { term: 'Broker', definition: 'Vermittler, der Wertpapieraufträge an die Börse weiterleitet.' },
        { term: 'Neobroker', definition: 'App-basierter Broker mit sehr niedrigen Gebühren und eingeschränkter Auswahl an Handelsplätzen.' },
        { term: 'Depot', definition: 'Konto zur Verwahrung von Wertpapieren.' },
        { term: 'Verrechnungskonto', definition: 'Geldkonto, über das Käufe, Verkäufe und Ausschüttungen abgerechnet werden.' },
        { term: 'Angemessenheitsprüfung', definition: 'Gesetzlich vorgeschriebene Abfrage deiner Kenntnisse vor dem Handel mit bestimmten Produkten.' },
      ],
      mistakes: [
        'Nur auf „0 € Gebühren“ zu achten und Spreads oder eingeschränkte Handelsplätze zu ignorieren.',
        'Einen nicht regulierten Anbieter aus Werbung in sozialen Medien zu wählen.',
        'Bei den Fragen zu Kenntnissen zu übertreiben, um Zugriff auf riskante Produkte zu bekommen.',
        'Keinen Freistellungsauftrag einzurichten und so unnötig Steuern vorab zu zahlen.',
      ],
      summary: [
        'Ein Broker ist dein Zugang zur Börse.',
        'Im Depot liegen deine Wertpapiere, auf dem Verrechnungskonto dein Geld.',
        'Wichtige Auswahlkriterien sind Aufsicht, Kosten, Handelsplätze und Angebot.',
        'Die Depoteröffnung erfolgt meist online mit Identitätsprüfung.',
      ],
      exercise: {
        title: 'Broker-Kosten vergleichen',
        task: 'Du planst 6 Käufe pro Jahr zu je 1.000 €. Broker X verlangt 5 € pauschal, Broker Y 0,5 % des Ordervolumens (mindestens 3 €). Welcher Broker ist günstiger?',
        steps: ['Broker X: 6 × 5 € = 30 €', 'Broker Y: 0,5 % von 1.000 € = 5 € je Order → 6 × 5 € = 30 €'],
        solution: 'Beide kosten gleich viel (30 €). Bei größeren Orders wäre X günstiger, bei kleineren Orders (z. B. 400 € → 3 € Mindestgebühr) wäre Y günstiger.',
      },
    },
    {
      id: 'm03-l2',
      title: 'Kosten, Spread, Handelsvolumen und Handelszeiten',
      minutes: 15,
      intro:
        'Jeder Kauf und Verkauf kostet Geld – manchmal sichtbar, manchmal versteckt. Hier lernst du die wichtigsten Kostenarten kennen und erfährst, wann und wo du am besten handelst.',
      sections: [
        {
          heading: 'Ordergebühren',
          paragraphs: [
            '**Ordergebühren** (Transaktionskosten) fallen bei jedem Kauf und Verkauf an. Sie bestehen oft aus einer Grundgebühr, einer prozentualen Provision vom Ordervolumen und eventuell **Börsenentgelten** oder **Fremdspesen** des Handelsplatzes. Bei kleinen Ordern können pauschale Gebühren einen großen Anteil ausmachen: 4,90 € auf 100 € sind fast 5 %!',
          ],
        },
        {
          heading: 'Der Spread – die versteckten Kosten',
          paragraphs: [
            'Der **Spread** ist die Differenz zwischen Briefkurs (Kaufpreis) und Geldkurs (Verkaufspreis). Wenn du sofort kaufst und sofort wieder verkaufst, verlierst du genau diesen Spread. Bei liquiden DAX-Aktien beträgt er oft nur wenige Hundertstel Prozent, bei kleinen Werten, Penny Stocks oder außerhalb der Haupthandelszeiten kann er mehrere Prozent betragen.',
          ],
          formula: 'Spread (%) = (Briefkurs − Geldkurs) / Briefkurs × 100',
        },
        {
          heading: 'Handelsvolumen',
          paragraphs: [
            'Das **Handelsvolumen** gibt an, wie viele Aktien (oder welcher Euro-Betrag) in einem Zeitraum gehandelt wurden. Ein hohes Volumen bedeutet hohe **Liquidität**: Du kannst problemlos kaufen und verkaufen, ohne den Kurs selbst zu bewegen, und der Spread ist meist klein. Bei geringem Volumen kann schon eine mittelgroße Order den Kurs verschieben.',
          ],
        },
        {
          heading: 'Handelszeiten',
          paragraphs: [
            'Auf **Xetra** wird an Börsentagen von 9:00 bis 17:30 Uhr gehandelt (mit Eröffnungs- und Schlussauktion). Die **Börse Frankfurt** und viele Regionalbörsen bieten längere Zeiten (teils 8:00 bis 22:00 Uhr), außerbörsliche Handelsplätze oft noch länger. US-Börsen (NYSE, Nasdaq) handeln von 9:30 bis 16:00 Uhr New Yorker Zeit, das ist meist 15:30 bis 22:00 Uhr deutscher Zeit (Ausnahmen bei der Zeitumstellung).',
            'Außerhalb der Hauptbörsenzeiten sind die Spreads meist größer, weil weniger gehandelt wird. Faustregel: Handle deutsche Aktien bevorzugt, wenn Xetra geöffnet ist, US-Aktien, wenn die US-Börsen geöffnet sind.',
          ],
        },
        {
          heading: 'Außerbörslicher Handel',
          paragraphs: [
            'Beim **außerbörslichen Handel** (auch Direkthandel oder OTC – „over the counter“) handelst du nicht über eine Börse, sondern direkt mit einem Handelspartner, z. B. einer Bank oder einem Market Maker. Viele Neobroker nutzen Plattformen wie Tradegate, gettex oder LS Exchange – rechtlich teils als multilaterales Handelssystem organisiert.',
            'Vorteile: längere Handelszeiten, oft keine Börsenentgelte. Nachteile: Der Kurs wird vom Market Maker gestellt; in hektischen Phasen können Spreads stark steigen. Viele Broker erhalten für die Weiterleitung von Orders eine Vergütung (**Payment for Order Flow**), die in der EU ab Mitte 2026 grundsätzlich verboten ist.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Spread bei zwei Aktien',
          text: 'Aktie A (DAX-Konzern): Geld 99,98 € / Brief 100,00 € → Spread 0,02 % . Aktie B (Nebenwert): Geld 9,70 € / Brief 10,00 € → Spread 3 %. Kaufst du B für 1.000 € und verkaufst direkt, verlierst du rund 30 € – nur durch den Spread.',
        },
        {
          title: 'Beispiel: Gebühren bei kleinen Beträgen',
          text: 'Eine Order über 200 € kostet 4,90 € (2,45 %) beim Kauf und noch einmal 4,90 € beim Verkauf. Die Aktie muss also fast 5 % steigen, nur damit du keinen Verlust machst. Bei regelmäßigen kleinen Beträgen sind ETF-Sparpläne oft günstiger.',
        },
      ],
      practice: [
        'Spiele mit dem Spread-Rechner unten und finde heraus, wie stark Spread und Gebühren deine Rendite bei unterschiedlich großen Orders belasten.',
        'Vergleiche in deiner Broker-App den Spread einer DAX-Aktie um 10 Uhr und um 21 Uhr.',
      ],
      terms: [
        { term: 'Ordergebühr', definition: 'Kosten, die der Broker für die Ausführung eines Auftrags berechnet.' },
        { term: 'Spread', definition: 'Differenz zwischen Kauf- und Verkaufskurs.' },
        { term: 'Handelsvolumen', definition: 'Menge der gehandelten Aktien in einem Zeitraum.' },
        { term: 'Xetra', definition: 'Elektronisches Handelssystem der Deutschen Börse, 9:00–17:30 Uhr.' },
        { term: 'Außerbörslicher Handel', definition: 'Direkter Handel mit einem Handelspartner statt über eine Börse.' },
      ],
      mistakes: [
        'Spreads bei Nebenwerten oder in der Nacht zu ignorieren.',
        'Mit sehr kleinen Beträgen einzelne Aktien zu kaufen, obwohl die Fixgebühren einen großen Teil auffressen.',
        'Kurz vor Börsenschluss oder bei großen Nachrichten Market Orders zu nutzen.',
      ],
      summary: [
        'Kosten bestehen aus Ordergebühren, Börsenentgelten und dem Spread.',
        'Hohes Handelsvolumen bedeutet meist kleine Spreads.',
        'Die besten Handelszeiten sind die Kernzeiten der Heimatbörse.',
        'Außerbörslicher Handel bietet lange Handelszeiten, aber Kurse stellt ein Market Maker.',
      ],
      exercise: {
        title: 'Break-even nach Kosten',
        task: 'Du kaufst Aktien für 500 € (Briefkurs). Der Spread beträgt 1 %, die Gebühr je Order 2 €. Wie viel Prozent muss der Kurs steigen, damit du beim Verkauf keinen Verlust machst?',
        steps: ['Gesamtkosten: 2 € + 2 € = 4 € Gebühren → 0,8 % von 500 €', 'Spread: 1 % (beim Verkauf bekommst du den niedrigeren Geldkurs)'],
        solution: 'Etwa 1,8 % (genauer: (504 / 0,99) / 500 − 1 ≈ 1,82 %). Kosten wirken also wie eine Hürde, die die Aktie erst überspringen muss.',
      },
      widget: 'spread',
    },
    {
      id: 'm03-l3',
      title: 'Ordertypen: Market, Limit und Stop-Loss',
      minutes: 16,
      intro:
        'Mit dem richtigen Ordertyp bestimmst du, zu welchem Preis gekauft oder verkauft werden soll. Das schützt vor bösen Überraschungen. Diese Lektion erklärt die wichtigsten Ordertypen mit konkreten Beispielen.',
      sections: [
        {
          heading: 'Market Order (Billigst / Bestens)',
          paragraphs: [
            'Bei einer **Market Order** (Kauf „billigst“, Verkauf „bestens“) wird dein Auftrag sofort zum nächsten verfügbaren Preis ausgeführt. Vorteil: Die Ausführung ist fast garantiert. Nachteil: Du weißt nicht genau, zu welchem Preis. Bei illiquiden Aktien oder starken Kursbewegungen kann der Ausführungskurs deutlich vom zuletzt angezeigten Kurs abweichen.',
          ],
        },
        {
          heading: 'Limit Order',
          paragraphs: [
            'Mit einer **Limit Order** legst du einen Höchstpreis (beim Kauf) oder Mindestpreis (beim Verkauf) fest. Ein Kauflimit von 50 € bedeutet: „Kaufe nur, wenn der Preis 50 € oder weniger beträgt.“ Ein Verkaufslimit von 60 € bedeutet: „Verkaufe nur, wenn ich mindestens 60 € bekomme.“',
            'Vorteil: volle Preiskontrolle. Nachteil: Die Order wird eventuell nie ausgeführt, wenn der Kurs das Limit nicht erreicht. Limits haben eine **Gültigkeit** (z. B. bis Tagesende oder bis zu einem Datum).',
          ],
        },
        {
          heading: 'Stop-Loss-Order',
          paragraphs: [
            'Eine **Stop-Loss-Order** ist ein Verkaufsauftrag, der erst aktiv wird, wenn der Kurs auf oder unter einen festgelegten **Stoppkurs** fällt. Dann wird daraus eine Market Order (Verkauf bestens). Damit kannst du Verluste begrenzen, ohne den Kurs ständig zu beobachten.',
            'Wichtig: Der Stoppkurs ist **nicht** der garantierte Verkaufspreis. Bei einer Kurslücke (z. B. nach schlechten Nachrichten über Nacht) kann der Verkauf deutlich darunter erfolgen. Eine Variante ist die **Stop-Limit-Order**: Bei Erreichen des Stopps wird eine Limit-Order platziert – mehr Preiskontrolle, aber das Risiko, gar nicht verkauft zu werden.',
            'Der **Trailing Stop** zieht den Stoppkurs automatisch nach, wenn der Kurs steigt (z. B. immer 10 % unter dem Höchstkurs). So werden Gewinne teilweise abgesichert.',
          ],
        },
        {
          heading: 'Stop-Buy',
          paragraphs: [
            'Eine **Stop-Buy-Order** kauft erst, wenn der Kurs über einen bestimmten Wert steigt. Sie wird von Anlegern genutzt, die erst bei einem Ausbruch über einen Widerstand kaufen wollen (siehe technische Analyse in Modul 6).',
          ],
        },
        {
          heading: 'Welche Order wann?',
          paragraphs: ['Grobe Orientierung für Einsteiger:'],
          bullets: [
            'Liquide Aktie, Handel zur Kernzeit, kleiner Betrag: Market Order ist meist in Ordnung – ein Limit nahe dem aktuellen Kurs ist trotzdem sicherer.',
            'Nebenwerte, große Beträge, außerhalb der Kernzeit: immer mit Limit handeln.',
            'Absicherung bestehender Positionen: Stop-Loss bewusst setzen – nicht zu eng, sonst wirst du durch normale Schwankungen ausgestoppt.',
          ],
        },
      ],
      examples: [
        {
          title: 'Beispiel: Market vs. Limit',
          text: 'Aktie aktuell: Geld 19,80 € / Brief 20,00 €. Market Order Kauf 100 Stück: Ausführung sofort bei ca. 20,00 €, eventuell teils zu 20,05 €, falls auf 20,00 € nur 60 Stück angeboten werden. Limit Kauf 19,90 €: Ausführung nur, wenn ein Verkäufer bereit ist, zu 19,90 € oder weniger abzugeben – vielleicht später am Tag oder gar nicht.',
        },
        {
          title: 'Beispiel: Stop-Loss bei Kurslücke',
          text: 'Du hältst eine Aktie bei 50 € und setzt einen Stop-Loss bei 45 €. Über Nacht meldet das Unternehmen einen Gewinneinbruch. Die Aktie eröffnet am nächsten Morgen bei 38 €. Dein Stop wird ausgelöst und als Market Order zu etwa 38 € ausgeführt – nicht zu 45 €. Der Stop-Loss hat das Risiko begrenzt, aber nicht auf den gewünschten Wert.',
        },
      ],
      practice: [
        'Probiere den Ordertypen-Simulator unten aus: Lege verschiedene Limits und Stopps fest und beobachte, ob und zu welchem Preis sie ausgeführt würden.',
        'Platziere im virtuellen Depot eine erste Kauforder und notiere, zu welchem Preis sie ausgeführt wurde.',
      ],
      terms: [
        { term: 'Market Order', definition: 'Auftrag zur sofortigen Ausführung zum nächsten verfügbaren Preis.' },
        { term: 'Limit Order', definition: 'Auftrag mit Preisgrenze: Höchstpreis beim Kauf, Mindestpreis beim Verkauf.' },
        { term: 'Stop-Loss', definition: 'Verkaufsauftrag, der bei Unterschreiten eines Stoppkurses ausgelöst wird.' },
        { term: 'Stop-Limit', definition: 'Bei Erreichen des Stoppkurses wird eine Limit-Order statt einer Market Order platziert.' },
        { term: 'Trailing Stop', definition: 'Stoppkurs, der steigenden Kursen automatisch in festem Abstand folgt.' },
        { term: 'Kurslücke (Gap)', definition: 'Sprung im Kurs ohne Handel dazwischen, etwa über Nacht.' },
      ],
      mistakes: [
        'Zu glauben, ein Stop-Loss garantiert den Verkauf genau zum Stoppkurs.',
        'Market Orders bei illiquiden Aktien oder außerhalb der Handelszeiten zu nutzen.',
        'Stop-Loss-Marken zu eng zu setzen und durch normale Tagesschwankungen ausgestoppt zu werden.',
        'Die Gültigkeit von Limit-Orders zu vergessen und Tage später überrascht zu werden.',
      ],
      summary: [
        'Market Orders werden sofort ausgeführt, der Preis ist aber nicht garantiert.',
        'Limit Orders garantieren den Preis, aber nicht die Ausführung.',
        'Stop-Loss-Orders begrenzen Verluste, können aber bei Kurslücken schlechter ausgeführt werden.',
        'Bei Nebenwerten und großen Beträgen gilt: immer mit Limit.',
      ],
      exercise: {
        title: 'Welche Order wird ausgeführt?',
        task: 'Aktueller Kurs: 100 €. Du hast drei Orders: (1) Kauf-Limit 95 €, (2) Stop-Loss 90 €, (3) Verkauf-Limit 110 €. Der Kurs fällt im Tagesverlauf auf 93 € und steigt dann auf 104 €. Welche Orders werden ausgeführt?',
        solution: 'Nur (1): Der Kurs fällt unter 95 €, das Kauf-Limit wird zu höchstens 95 € ausgeführt. (2) wird nicht ausgelöst, da 90 € nicht erreicht wurde. (3) wird nicht ausgeführt, da 110 € nicht erreicht wurde.',
      },
      widget: 'order-types',
    },
  ],
  quiz: [
    { id: 'm03-q1', type: 'mc', lesson: 0, question: 'Wofür ist das Verrechnungskonto da?', options: ['Zur Verwahrung der Aktien', 'Zur Abrechnung von Käufen, Verkäufen und Dividenden', 'Für Kreditkartenzahlungen', 'Zur Steuererklärung'], answer: 1, explanation: 'Das Verrechnungskonto ist das Geldkonto zum Depot. Die Aktien selbst liegen im Depot.' },
    { id: 'm03-q2', type: 'tf', lesson: 0, question: 'Privatanleger können ohne Broker direkt an der Börse handeln.', answer: 1, explanation: 'Falsch. Privatanleger benötigen einen zugelassenen Vermittler (Broker/Bank).' },
    { id: 'm03-q3', type: 'mc', lesson: 0, question: 'Welches Kriterium ist bei der Brokerwahl besonders wichtig?', options: ['Die Farbe der App', 'Regulierung durch eine anerkannte Finanzaufsicht', 'Werbung durch Influencer', 'Möglichst viele Push-Nachrichten'], answer: 1, explanation: 'Ein Broker sollte von der BaFin oder einer anderen EU-Aufsicht reguliert sein.' },
    { id: 'm03-q4', type: 'calc', lesson: 1, question: 'Geldkurs 9,80 €, Briefkurs 10,00 €. Wie hoch ist der Spread in Prozent (bezogen auf den Briefkurs)?', options: ['0,2 %', '2 %', '20 %', '0,02 %'], answer: 1, explanation: '(10,00 − 9,80) / 10,00 = 0,02 = 2 %.' },
    { id: 'm03-q5', type: 'mc', lesson: 1, question: 'Wann sind Spreads typischerweise am kleinsten?', options: ['Nachts um 3 Uhr', 'Während der Haupthandelszeit der Heimatbörse', 'An Feiertagen', 'Direkt nach Börsenschluss'], answer: 1, explanation: 'Während der Kernhandelszeit ist das Handelsvolumen am höchsten und der Spread meist am niedrigsten.' },
    { id: 'm03-q6', type: 'calc', lesson: 1, question: 'Du kaufst für 100 € Aktien bei 5 € Ordergebühr. Wie viel Prozent macht die Gebühr aus?', options: ['0,5 %', '5 %', '50 %', '1 %'], answer: 1, explanation: '5 € / 100 € = 5 %. Bei kleinen Beträgen fallen Fixgebühren stark ins Gewicht.' },
    { id: 'm03-q7', type: 'mc', lesson: 2, question: 'Was garantiert eine Limit Order?', options: ['Die sofortige Ausführung', 'Dass der festgelegte Preis nicht überschritten (Kauf) bzw. unterschritten (Verkauf) wird', 'Einen Gewinn', 'Die Ausführung zum Schlusskurs'], answer: 1, explanation: 'Das Limit garantiert den Preis, nicht die Ausführung.' },
    { id: 'm03-q8', type: 'case', lesson: 2, question: 'Dein Stop-Loss liegt bei 45 €. Nach schlechten Nachrichten eröffnet die Aktie bei 39 €. Was passiert?', options: ['Verkauf zu genau 45 €', 'Die Order wird ausgelöst und etwa zu 39 € ausgeführt', 'Nichts, weil 45 € nie gehandelt wurde', 'Der Broker erstattet die Differenz'], answer: 1, explanation: 'Der Stop wird ausgelöst und als Market Order zum nächsten verfügbaren Kurs ausgeführt – bei einer Kurslücke deutlich unter dem Stoppkurs.' },
    { id: 'm03-q9', type: 'mc', lesson: 2, question: 'Welche Order empfiehlt sich bei einem wenig gehandelten Nebenwert?', options: ['Market Order', 'Limit Order', 'Gar keine Order', 'Stop-Buy ohne Limit'], answer: 1, explanation: 'Bei geringer Liquidität schützt ein Limit vor einer Ausführung zu einem ungünstigen Preis.' },
    { id: 'm03-q10', type: 'tf', lesson: 2, question: 'Ein Trailing Stop zieht den Stoppkurs bei steigenden Kursen automatisch nach oben nach.', answer: 0, explanation: 'Richtig. Er folgt dem Kurs in einem festen Abstand nach oben, aber nicht nach unten.' },
    { id: 'm03-q11', type: 'calc', lesson: 2, question: 'Kurs 100 €. Kauf-Limit 96 €. Tagestief 97 €, Tageshoch 103 €. Wird die Order ausgeführt?', options: ['Ja, zu 97 €', 'Ja, zu 96 €', 'Nein', 'Ja, zu 100 €'], answer: 2, explanation: 'Der Kurs muss 96 € oder weniger erreichen. Mit einem Tief von 97 € wird das Kauf-Limit nicht ausgeführt.' },
  ],
  sources: [
    { label: 'BaFin – Unternehmensdatenbank (Zulassung prüfen)', url: 'https://portal.mvp.bafin.de/database/InstInfo/' },
    { label: 'Börse Frankfurt – Ordertypen', url: 'https://www.boerse-frankfurt.de/wissen' },
    { label: 'Xetra – Handelszeiten', url: 'https://www.xetra.com' },
    { label: 'Finanztip – Depotvergleich (unabhängig)', url: 'https://www.finanztip.de/wertpapierdepot/' },
  ],
};
