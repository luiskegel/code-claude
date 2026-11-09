// Allgemeine Bildungsinformationen zur Besteuerung von Kapitalerträgen in Deutschland.
// KEINE Steuerberatung. Steuerliche Regeln können sich ändern.

export const TAX_LAST_UPDATED = '09.11.2026';
export const TAX_LEGAL_STATUS = 'Rechtsstand nach bestem Wissen zum Stand der Aktualisierung (Steuerjahr 2026).';

export interface TaxTopic {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  example?: string;
}

export const TAX_TOPICS: TaxTopic[] = [
  {
    id: 'kapest',
    title: 'Kapitalertragsteuer (Abgeltungsteuer)',
    paragraphs: [
      'Kapitalerträge wie Dividenden, Zinsen, Fondsausschüttungen und realisierte Kursgewinne werden in Deutschland grundsätzlich mit einem pauschalen Steuersatz von **25 %** besteuert. Man spricht von der **Abgeltungsteuer**, weil mit dem Steuerabzug durch die Bank die Steuer in der Regel „abgegolten“ ist.',
      'Deutsche Banken und Broker behalten die Steuer automatisch ein und führen sie an das Finanzamt ab. Bei ausländischen Brokern musst du deine Kapitalerträge selbst in der Steuererklärung (Anlage KAP) angeben.',
      'Liegt dein persönlicher Einkommensteuersatz unter 25 %, kannst du in der Steuererklärung die **Günstigerprüfung** beantragen.',
    ],
    example: 'Du verkaufst Aktien mit 1.500 € Gewinn. Dein Sparer-Pauschbetrag ist bereits ausgeschöpft. Kapitalertragsteuer: 25 % × 1.500 € = 375 €.',
  },
  {
    id: 'soli',
    title: 'Solidaritätszuschlag',
    paragraphs: [
      'Auf die Kapitalertragsteuer wird zusätzlich der **Solidaritätszuschlag** von **5,5 %** der Steuer erhoben. Anders als bei der Lohnsteuer gibt es für Kapitalerträge keine Freigrenze, die den Soli für die meisten Menschen entfallen lässt.',
      'Zusammen ergibt sich ohne Kirchensteuer eine Belastung von **26,375 %** auf den steuerpflichtigen Kapitalertrag.',
    ],
    example: '375 € Kapitalertragsteuer × 5,5 % = 20,63 € Soli. Gesamt: 395,63 € (26,375 % von 1.500 €).',
  },
  {
    id: 'kist',
    title: 'Kirchensteuer',
    paragraphs: [
      'Bist du Mitglied einer steuererhebenden Religionsgemeinschaft, fällt zusätzlich **Kirchensteuer** an: **8 %** in Bayern und Baden-Württemberg, **9 %** in den übrigen Bundesländern – jeweils bezogen auf die Kapitalertragsteuer. Weil die Kirchensteuer als Sonderausgabe wirkt, wird die Kapitalertragsteuer dabei leicht reduziert.',
      'Banken fragen die Religionszugehörigkeit automatisch beim Bundeszentralamt für Steuern (BZSt) ab, sofern du keinen Sperrvermerk eingelegt hast. Die Gesamtbelastung liegt dann bei etwa **27,8 %** (8 %) bzw. **28,0 %** (9 %).',
    ],
    example: 'Bei 1.000 € steuerpflichtigem Gewinn und 9 % Kirchensteuer: Kapitalertragsteuer ≈ 244,50 €, Soli ≈ 13,45 €, Kirchensteuer ≈ 22,00 € → zusammen ≈ 279,95 €.',
  },
  {
    id: 'pauschbetrag',
    title: 'Sparer-Pauschbetrag',
    paragraphs: [
      'Kapitalerträge bis zu einer bestimmten Höhe pro Kalenderjahr sind steuerfrei: Seit 2023 beträgt der **Sparer-Pauschbetrag 1.000 €** für Alleinstehende und **2.000 €** für zusammen veranlagte Ehe- und Lebenspartner.',
      'Tatsächliche Werbungskosten (z. B. Depotgebühren) können nicht zusätzlich abgezogen werden – sie sind mit dem Pauschbetrag abgegolten.',
    ],
    example: 'Du erhältst 600 € Dividenden und realisierst 300 € Kursgewinne. Summe 900 € → mit Freistellungsauftrag vollständig steuerfrei.',
  },
  {
    id: 'freistellung',
    title: 'Freistellungsauftrag',
    paragraphs: [
      'Damit deine Bank den Sparer-Pauschbetrag berücksichtigt, erteilst du ihr einen **Freistellungsauftrag**. Du kannst den Betrag auf mehrere Banken aufteilen, insgesamt aber höchstens bis zur Höhe des Pauschbetrags. Für den Freistellungsauftrag benötigt die Bank deine Steuer-Identifikationsnummer.',
      'Ohne Freistellungsauftrag zieht die Bank Steuern ab, die du dir nur über die Steuererklärung zurückholen kannst. Prüfe die Aufteilung jedes Jahr.',
    ],
    example: 'Tagesgeldbank: 300 € Freistellung, Broker: 700 € Freistellung → zusammen 1.000 €.',
  },
  {
    id: 'verluste',
    title: 'Verlustverrechnung',
    paragraphs: [
      'Realisierte Verluste werden von deiner Bank in **Verlustverrechnungstöpfen** gesammelt und mit späteren Gewinnen verrechnet. Es gibt einen **Aktienverlusttopf** – Verluste aus dem Verkauf von Aktien dürfen nur mit Gewinnen aus Aktienverkäufen verrechnet werden – und einen **allgemeinen Verlusttopf** für andere Kapitalerträge (z. B. Fonds, Anleihen, Zinsen).',
      'Nicht verrechnete Verluste werden ins Folgejahr vorgetragen. Um Verluste bei einer Bank mit Gewinnen bei einer anderen Bank zu verrechnen, kannst du bis zum **15. Dezember** eine **Verlustbescheinigung** beantragen und die Verrechnung über die Steuererklärung vornehmen.',
      'Die frühere Begrenzung der Verrechnung von Verlusten aus Termingeschäften (Derivaten) und Forderungsausfällen auf 20.000 € pro Jahr wurde mit dem Jahressteuergesetz 2024 aufgehoben.',
    ],
    example: 'Aktie A: −400 € Verlust. Später Aktie B: +1.000 € Gewinn. Die Bank verrechnet: steuerpflichtig sind nur 600 € (abzüglich ggf. Pauschbetrag).',
  },
  {
    id: 'quellensteuer',
    title: 'Quellensteuer',
    paragraphs: [
      'Viele Länder behalten auf Dividenden ausländischer Aktien bereits im Herkunftsland eine **Quellensteuer** ein. Durch Doppelbesteuerungsabkommen kann ein Teil davon auf die deutsche Abgeltungsteuer **angerechnet** werden (meist bis zu 15 %).',
      'USA: Mit dem Formular **W-8BEN** (bei den meisten Brokern automatisch) werden 15 % einbehalten, die vollständig anrechenbar sind. Andere Länder (z. B. Schweiz mit 35 %) behalten mehr ein, als angerechnet werden kann – den Rest musst du gegebenenfalls aufwendig im Ausland zurückfordern.',
    ],
    example: 'US-Dividende 100 €: 15 € US-Quellensteuer. In Deutschland fallen nur noch ca. 10 € Kapitalertragsteuer plus Soli an, da die 15 € angerechnet werden.',
  },
  {
    id: 'vorabpauschale',
    title: 'Vorabpauschale bei ETFs',
    paragraphs: [
      'Bei **thesaurierenden** (und gering ausschüttenden) Fonds fällt jährlich die **Vorabpauschale** an. Sie stellt sicher, dass auch nicht ausgeschüttete Erträge laufend besteuert werden. Die Vorabpauschale wird Anfang des Folgejahres von deinem Verrechnungskonto eingezogen und beim späteren Verkauf angerechnet, damit nichts doppelt besteuert wird.',
      'Berechnung: **Fondswert zu Jahresbeginn × Basiszins × 0,7**, abzüglich Ausschüttungen des Jahres, höchstens aber die tatsächliche Wertsteigerung im Jahr. Bei Aktienfonds sind davon **30 % steuerfrei (Teilfreistellung)**. Der Basiszins wird jährlich vom Bundesfinanzministerium veröffentlicht: für 2024 2,29 %, für 2025 2,53 %, für 2026 **3,20 %** (BMF-Schreiben vom 13.01.2026). Die Vorabpauschale für 2026 gilt am 4. Januar 2027 als zugeflossen.',
      'Die Vorabpauschale kann mit dem Sparer-Pauschbetrag verrechnet werden. Liegt der Fondswert am Jahresende unter dem Wert zu Jahresbeginn, fällt keine Vorabpauschale an.',
    ],
    example: 'ETF-Wert am 1.1.2026: 10.000 €, Wertsteigerung im Jahr deutlich über 224 €. Basisertrag: 10.000 € × 3,20 % × 0,7 = 224 €. Nach 30 % Teilfreistellung steuerpflichtig: 156,80 €. Ist der Pauschbetrag ausgeschöpft, fallen ca. 41,36 € Steuern an (26,375 %).',
  },
];

export const TAX_SOURCES = [
  { label: 'Bundesministerium der Finanzen – BMF-Schreiben zum Basiszins', url: 'https://www.bundesfinanzministerium.de' },
  { label: 'Bundeszentralamt für Steuern – Kirchensteuer auf Kapitalerträge', url: 'https://www.bzst.de' },
  { label: 'Einkommensteuergesetz § 20, § 32d, § 43a (gesetze-im-internet.de)', url: 'https://www.gesetze-im-internet.de/estg/' },
  { label: 'Investmentsteuergesetz § 18 (Vorabpauschale)', url: 'https://www.gesetze-im-internet.de/invstg_2018/' },
  { label: 'Verbraucherzentrale – Steuern auf Kapitalerträge', url: 'https://www.verbraucherzentrale.de/geld-versicherungen' },
];
