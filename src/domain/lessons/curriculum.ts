import type { Lesson } from './types';

/** Standard-Mindestgenauigkeit zum Abschließen einer Lektion. */
export const DEFAULT_PASS_ACCURACY = 90;

const UPPERCASE_LETTERS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'];

/**
 * Der komplette Lehrplan. Die Reihenfolge ist didaktisch begründet:
 * Haltung → Grundstellung → einzelne Tasten → Kombinationen → Silben → Wörter
 * → Sätze → Geschwindigkeit → Genauigkeit → freies Schreiben.
 */
export const LESSONS: readonly Lesson[] = [
  // ── Modul 1: Grundlagen ──────────────────────────────────────────────
  {
    id: 'grundstellung',
    number: 1,
    moduleId: 'grundlagen',
    title: 'Grundstellung',
    summary: 'Die richtige Haltung und die Ausgangsposition deiner Finger.',
    newChars: ['f', 'j', ' '],
    focusChars: ['f', 'j'],
    intro: {
      why: 'Alles beginnt mit der Grundstellung: Von hier aus erreicht jeder Finger seine Tasten auf kürzestem Weg. Nach jedem Anschlag kehren die Finger hierher zurück.',
      tips: [
        'Lege die Zeigefinger auf F und J – dort spürst du kleine Erhebungen.',
        'Die übrigen Finger liegen locker auf A, S, D und K, L, Ö.',
        'Die Daumen ruhen über der Leertaste.',
      ],
      theory: ['posture', 'home-position', 'how-it-works'],
    },
    exercise: { kind: 'fixed', text: 'f j f j fj jf fj jf ff jj fj jf' },
    passAccuracy: 80,
  },
  {
    id: 'f-j',
    number: 2,
    moduleId: 'grundlagen',
    title: 'F und J',
    summary: 'Die Zeigefinger und ihre Orientierungspunkte.',
    newChars: [],
    focusChars: ['f', 'j'],
    intro: {
      why: 'F und J sind deine Anker. Wer sie blind findet, findet auch alle anderen Tasten – denn die Hände richten sich immer an ihnen aus.',
      tips: [
        'Tippe F mit dem linken und J mit dem rechten Zeigefinger.',
        'Schau beim Tippen auf den Bildschirm, nicht auf die Hände.',
        'Die Leertaste drückst du mit dem Daumen.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 60 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'asdf',
    number: 3,
    moduleId: 'grundlagen',
    title: 'A S D F',
    summary: 'Die linke Hand in der Grundreihe.',
    newChars: ['a', 's', 'd'],
    focusChars: ['a', 's', 'd', 'f'],
    intro: {
      why: 'Jeder Finger der linken Hand hat seine eigene Taste in der Grundreihe. So muss sich die Hand kaum bewegen – nur die Finger.',
      tips: [
        'Kleiner Finger auf A, Ringfinger auf S, Mittelfinger auf D, Zeigefinger auf F.',
        'Hebe die Finger nur leicht an und kehre nach jedem Anschlag zurück.',
        'Langsam und gleichmäßig ist besser als schnell und hektisch.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 90 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'jkloe',
    number: 4,
    moduleId: 'grundlagen',
    title: 'J K L Ö',
    summary: 'Die rechte Hand in der Grundreihe.',
    newChars: ['k', 'l', 'ö'],
    focusChars: ['j', 'k', 'l', 'ö'],
    intro: {
      why: 'Die rechte Hand spiegelt die linke: Zeigefinger auf J, dann Mittel-, Ring- und kleiner Finger auf K, L und Ö.',
      tips: [
        'Der rechte kleine Finger liegt auf Ö – auf deutschen Tastaturen eine eigene Taste.',
        'Beide Hände bleiben gleichzeitig in der Grundstellung.',
        'Wenn du unsicher bist: Ertaste die Markierung auf J.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 90 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'leertaste',
    number: 5,
    moduleId: 'grundlagen',
    title: 'Leertaste',
    summary: 'Wörter flüssig mit dem Daumen trennen.',
    newChars: [],
    focusChars: [' '],
    introKeyIds: ['Space'],
    intro: {
      why: 'Zwischen Wörtern steht immer ein Leerzeichen. Mit dem Daumen bleibt der Rhythmus erhalten, ohne dass die anderen Finger die Grundstellung verlassen.',
      tips: [
        'Drücke die Leertaste mit dem Daumen – die meisten nehmen den rechten.',
        'Die übrigen Finger bleiben auf der Grundreihe liegen.',
        'Tippe Wort und Leerzeichen in einem gleichmäßigen Rhythmus.',
      ],
    },
    exercise: { kind: 'words', source: 'common', caseMode: 'lower', targetLength: 100 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'g-h',
    number: 6,
    moduleId: 'grundlagen',
    title: 'G und H',
    summary: 'Die Zeigefinger greifen zur Mitte.',
    newChars: ['g', 'h'],
    focusChars: ['g', 'h'],
    intro: {
      why: 'Die Zeigefinger sind die beweglichsten Finger. Deshalb übernehmen sie zusätzlich die Tasten in der Mitte: G links, H rechts.',
      tips: [
        'Strecke den linken Zeigefinger von F nach rechts zu G.',
        'Strecke den rechten Zeigefinger von J nach links zu H.',
        'Kehre danach sofort auf F beziehungsweise J zurück.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 100 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 2: Obere Reihe ─────────────────────────────────────────────
  {
    id: 'qwert',
    number: 7,
    moduleId: 'obere-reihe',
    title: 'Q W E R T',
    summary: 'Die linke Hand in der oberen Reihe.',
    newChars: ['q', 'w', 'e', 'r', 't'],
    focusChars: ['q', 'w', 'e', 'r', 't'],
    intro: {
      why: 'Jeder Finger bewegt sich nur in seiner eigenen Spalte – leicht schräg nach oben. Der Zeigefinger übernimmt zwei Spalten: R und T.',
      tips: [
        'E liegt über D und gehört zum Mittelfinger.',
        'Für T streckt sich der linke Zeigefinger nach rechts oben.',
        'Q erreichst du mit dem kleinen Finger, ohne die Hand zu verschieben.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 120 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'zuiop',
    number: 8,
    moduleId: 'obere-reihe',
    title: 'Z U I O P',
    summary: 'Die rechte Hand in der oberen Reihe.',
    newChars: ['z', 'u', 'i', 'o', 'p'],
    focusChars: ['z', 'u', 'i', 'o', 'p'],
    intro: {
      why: 'Auf deutschen Tastaturen liegt das Z in der oberen Reihe – es kommt im Deutschen viel häufiger vor als das Y. Der rechte Zeigefinger übernimmt Z und U.',
      tips: [
        'U liegt über J, Z links daneben – beide tippt der rechte Zeigefinger.',
        'I gehört zum Mittelfinger, O zum Ringfinger, P zum kleinen Finger.',
        'Halte das Handgelenk ruhig, nur die Finger bewegen sich.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 120 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'ue-ae',
    number: 9,
    moduleId: 'obere-reihe',
    title: 'Ü und Ä',
    summary: 'Die Umlaute mit dem rechten kleinen Finger.',
    newChars: ['ü', 'ä'],
    focusChars: ['ü', 'ä'],
    intro: {
      why: 'Ü und Ä liegen ganz rechts – neben P und Ö. Beide tippt der rechte kleine Finger, damit die Hand in der Grundstellung bleiben kann.',
      tips: [
        'Ü erreichst du von Ö aus schräg nach rechts oben.',
        'Ä liegt direkt rechts neben Ö.',
        'Strecke nur den kleinen Finger, die übrigen Finger bleiben liegen.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 110 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 3: Untere Reihe ────────────────────────────────────────────
  {
    id: 'yxcv',
    number: 10,
    moduleId: 'untere-reihe',
    title: 'Y X C V',
    summary: 'Die linke Hand in der unteren Reihe.',
    newChars: ['y', 'x', 'c', 'v'],
    focusChars: ['y', 'x', 'c', 'v'],
    intro: {
      why: 'In der unteren Reihe beugen sich die Finger leicht nach unten. Auch hier bleibt jeder Finger in seiner Spalte – V gehört noch zum Zeigefinger.',
      tips: [
        'Y tippt der kleine Finger, X der Ringfinger, C der Mittelfinger.',
        'Mit C und H werden typisch deutsche Laute wie „ch“ möglich.',
        'Beuge die Finger, statt die ganze Hand zu bewegen.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 120 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'bnm',
    number: 11,
    moduleId: 'untere-reihe',
    title: 'B N M',
    summary: 'Die Zeigefinger in der unteren Reihe.',
    newChars: ['b', 'n', 'm'],
    focusChars: ['b', 'n', 'm'],
    intro: {
      why: 'B tippt der linke Zeigefinger, N und M der rechte. Damit kennst du alle Buchstaben des Alphabets.',
      tips: [
        'Für B streckt sich der linke Zeigefinger nach rechts unten.',
        'N und M liegen unter H und J.',
        'Ab jetzt kannst du fast jedes deutsche Wort schreiben.',
      ],
    },
    exercise: { kind: 'keys', targetLength: 130 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'satzzeichen',
    number: 12,
    moduleId: 'untere-reihe',
    title: 'Komma, Punkt und Bindestrich',
    summary: 'Die wichtigsten Satzzeichen.',
    newChars: [',', '.', '-'],
    focusChars: [',', '.', '-'],
    intro: {
      why: 'Komma, Punkt und Bindestrich liegen rechts unten. Sie folgen derselben Logik wie die Buchstaben: Jeder Finger bleibt in seiner Spalte.',
      tips: [
        'Das Komma tippt der rechte Mittelfinger, den Punkt der Ringfinger.',
        'Den Bindestrich erreichst du mit dem rechten kleinen Finger.',
        'Nach Komma und Punkt folgt ein Leerzeichen.',
      ],
    },
    exercise: { kind: 'phrases', targetLength: 120 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 4: Erste Wörter ────────────────────────────────────────────
  {
    id: 'kurze-woerter',
    number: 13,
    moduleId: 'erste-woerter',
    title: 'Kurze Wörter',
    summary: 'Einfache Wörter mit zwei bis vier Buchstaben.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Ab jetzt tippst du echte Wörter. Dein Kopf beginnt, häufige Buchstabenfolgen als Ganzes zu erkennen – das macht dich mit der Zeit schneller.',
      tips: [
        'Lies jedes Wort einmal vollständig, bevor du es tippst.',
        'Behalte einen gleichmäßigen Rhythmus bei.',
        'Fehler sind normal. Atme kurz durch und mach ruhig weiter.',
      ],
    },
    exercise: {
      kind: 'words',
      source: 'first',
      caseMode: 'lower',
      minLength: 2,
      maxLength: 4,
      targetLength: 140,
    },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'alltagswoerter',
    number: 14,
    moduleId: 'erste-woerter',
    title: 'Alltagswörter',
    summary: 'Häufige Wörter wie hallo, mama oder tastatur.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Die häufigsten Wörter machen einen großen Teil jedes Textes aus. Wer sie sicher tippt, schreibt sofort flüssiger.',
      tips: [
        'Konzentriere dich auf saubere Anschläge, nicht auf Tempo.',
        'Doppelte Buchstaben wie in „hallo“ tippst du mit zwei kurzen Anschlägen.',
        'Bleib mit dem Blick auf dem Bildschirm.',
      ],
    },
    exercise: {
      kind: 'words',
      source: 'first',
      caseMode: 'lower',
      minLength: 4,
      maxLength: 9,
      targetLength: 160,
    },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 5: Buchstaben kombinieren ──────────────────────────────────
  {
    id: 'buchstabenpaare',
    number: 15,
    moduleId: 'kombinationen',
    title: 'Häufige Buchstabenpaare',
    summary: 'Kombinationen wie ch, ei, ie und st.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Bestimmte Buchstaben stehen im Deutschen ständig nebeneinander. Wenn deine Finger diese Paare automatisch tippen, wird das Schreiben spürbar flüssiger.',
      tips: [
        'Tippe jedes Paar zuerst langsam und bewusst.',
        'Achte bei „ei“ und „ie“ auf die richtige Reihenfolge.',
        'Danach folgen Wörter, in denen das Paar vorkommt.',
      ],
    },
    exercise: { kind: 'combinations', source: 'bigrams', targetLength: 150 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'silben',
    number: 16,
    moduleId: 'kombinationen',
    title: 'Silben',
    summary: 'Längere Bausteine wie sch, ung und ver.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Viele deutsche Wörter setzen sich aus wiederkehrenden Silben zusammen. Wer Silben als Einheit tippt, braucht weniger Gedanken pro Wort.',
      tips: [
        'Sprich die Silbe in Gedanken mit.',
        'Tippe jede Silbe ohne Pause zwischen den Buchstaben.',
        'Danach folgen Wörter mit derselben Silbe.',
      ],
    },
    exercise: { kind: 'combinations', source: 'syllables', targetLength: 160 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 6: Wörter ──────────────────────────────────────────────────
  {
    id: 'grossbuchstaben',
    number: 17,
    moduleId: 'woerter',
    title: 'Großbuchstaben',
    summary: 'Die Umschalttaste und großgeschriebene Nomen.',
    newChars: UPPERCASE_LETTERS,
    focusChars: [],
    introKeyIds: ['ShiftLeft', 'ShiftRight'],
    intro: {
      why: 'Für Großbuchstaben hältst du die Umschalttaste mit dem kleinen Finger der anderen Hand. So bleibt die tippende Hand in ihrer Position.',
      tips: [
        'Buchstabe links (z. B. A, S, D) → rechte Umschalttaste.',
        'Buchstabe rechts (z. B. J, K, L) → linke Umschalttaste.',
        'Halte die Umschalttaste gedrückt, bis der Buchstabe getippt ist.',
      ],
    },
    exercise: {
      kind: 'words',
      source: 'nouns-with-article',
      caseMode: 'natural',
      targetLength: 160,
    },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'eszett',
    number: 18,
    moduleId: 'woerter',
    title: 'ß',
    summary: 'Das scharfe S mit dem rechten kleinen Finger.',
    newChars: ['ß'],
    focusChars: ['ß'],
    intro: {
      why: 'Das ß liegt rechts in der Zahlenreihe. Der rechte kleine Finger streckt sich dafür weit nach oben – ein Weg, der etwas Übung braucht.',
      tips: [
        'Von Ö aus geht es zwei Reihen nach oben, leicht nach rechts.',
        'Kehre danach direkt auf Ö zurück.',
        'Nach langen Vokalen und Doppellauten steht oft ß, etwa in groß oder heißen.',
      ],
    },
    exercise: { kind: 'words', source: 'eszett', caseMode: 'natural', targetLength: 150 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'lange-woerter',
    number: 19,
    moduleId: 'woerter',
    title: 'Längere Wörter',
    summary: 'Zusammengesetzte Wörter mit acht und mehr Buchstaben.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Im Deutschen werden Wörter gern zusammengesetzt. Lange Wörter trainieren deine Ausdauer und zeigen, wie sicher du die Fingerwege schon beherrschst.',
      tips: [
        'Zerlege lange Wörter gedanklich in ihre Teile.',
        'Bleib gleichmäßig – auch am Ende des Wortes.',
        'Achte auf den Großbuchstaben am Anfang von Nomen.',
      ],
    },
    exercise: {
      kind: 'words',
      source: 'long',
      caseMode: 'natural',
      minLength: 8,
      targetLength: 180,
    },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 7: Sätze ───────────────────────────────────────────────────
  {
    id: 'kurze-saetze',
    number: 20,
    moduleId: 'saetze',
    title: 'Kurze Sätze',
    summary: 'Einfache Sätze mit Großschreibung und Punkt.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'In Sätzen kommt alles zusammen: Groß- und Kleinschreibung, Leerzeichen und Satzzeichen. Genau so schreibst du später im Alltag.',
      tips: [
        'Am Satzanfang steht ein Großbuchstabe, am Ende ein Punkt.',
        'Nach dem Punkt folgt ein Leerzeichen.',
        'Lies den Satz einmal, bevor du beginnst.',
      ],
    },
    exercise: { kind: 'sentences', source: 'short', targetLength: 180 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'fragen',
    number: 21,
    moduleId: 'saetze',
    title: 'Fragen und Kommas',
    summary: 'Das Fragezeichen und Sätze mit Komma.',
    newChars: ['?'],
    focusChars: ['?', ','],
    intro: {
      why: 'Das Fragezeichen liegt auf derselben Taste wie das ß – du brauchst nur zusätzlich die linke Umschalttaste.',
      tips: [
        'Fragezeichen: linke Umschalttaste halten, dann ß mit dem rechten kleinen Finger.',
        'Vor Nebensätzen mit dass, weil oder wenn steht ein Komma.',
        'Nach dem Fragezeichen folgt ein Leerzeichen.',
      ],
    },
    exercise: { kind: 'sentences', source: 'questions', targetLength: 200 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'laengere-saetze',
    number: 22,
    moduleId: 'saetze',
    title: 'Längere Sätze',
    summary: 'Sätze mit mehreren Satzteilen.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Längere Sätze verlangen Konzentration über mehrere Sekunden. Hier zeigt sich, ob dein Rhythmus auch über Satzgrenzen hinweg hält.',
      tips: [
        'Atme ruhig und tippe in gleichmäßigem Tempo.',
        'Wenn du einen Fehler machst, korrigiere ihn ohne Hektik.',
        'Genauigkeit geht weiterhin vor Geschwindigkeit.',
      ],
    },
    exercise: { kind: 'sentences', source: 'long', targetLength: 240 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 8: Geschwindigkeit ─────────────────────────────────────────
  {
    id: 'tempo-sprint',
    number: 23,
    moduleId: 'geschwindigkeit',
    title: '1-Minuten-Sprint',
    summary: 'Häufige Wörter – so viele wie möglich in 60 Sekunden.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Kurze, konzentrierte Sprints sind der beste Weg zu mehr Tempo. Die Zeit startet erst mit deinem ersten Anschlag.',
      tips: [
        'Tippe zügig, aber nicht hektisch.',
        'Ein gleichmäßiger Rhythmus bringt mehr als kurze Spurts.',
        'Die Genauigkeit sollte trotzdem über 90 % bleiben.',
      ],
    },
    exercise: { kind: 'words', source: 'common', caseMode: 'natural', targetLength: 1500 },
    timeLimitSec: 60,
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'tempo-saetze',
    number: 24,
    moduleId: 'geschwindigkeit',
    title: 'Sätze auf Zeit',
    summary: 'Ganze Sätze in 90 Sekunden.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Großbuchstaben und Satzzeichen bremsen am Anfang. Unter leichtem Zeitdruck lernst du, auch diese Stellen flüssig zu tippen.',
      tips: [
        'Bleib bei Satzzeichen im Rhythmus.',
        'Der Blick bleibt beim nächsten Wort, nicht beim letzten.',
        'Die Zeit startet erst mit deinem ersten Anschlag.',
      ],
    },
    exercise: { kind: 'sentences', source: 'mixed', targetLength: 2000 },
    timeLimitSec: 90,
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'tempo-ausdauer',
    number: 25,
    moduleId: 'geschwindigkeit',
    title: '2-Minuten-Ausdauer',
    summary: 'Zusammenhängender Text über zwei Minuten.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Längere Texte trainieren deine Ausdauer. Ziel ist ein Tempo, das du über die ganze Zeit halten kannst.',
      tips: [
        'Finde dein Tempo in den ersten Sekunden und halte es.',
        'Entspanne Schultern und Hände zwischendurch bewusst.',
        'Lieber etwas langsamer und dafür sauber.',
      ],
    },
    exercise: { kind: 'text', source: 'paragraphs', targetLength: 2600 },
    timeLimitSec: 120,
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },

  // ── Modul 9: Genauigkeit ─────────────────────────────────────────────
  {
    id: 'aehnliche-woerter',
    number: 26,
    moduleId: 'genauigkeit',
    title: 'Ähnliche Wörter',
    summary: 'Wortpaare, die sich nur in einem Detail unterscheiden.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Bei Wortpaaren wie das und dass oder seid und seit entscheidet ein einziger Buchstabe. Hier zählt jeder Anschlag.',
      tips: [
        'Lies jedes Wortpaar genau, bevor du tippst.',
        'Ziel: mindestens 96 % Genauigkeit.',
        'Nimm dir Zeit – Tempo spielt hier keine Rolle.',
      ],
    },
    exercise: { kind: 'words', source: 'confusable', caseMode: 'natural', targetLength: 160 },
    passAccuracy: 96,
  },
  {
    id: 'praezise-saetze',
    number: 27,
    moduleId: 'genauigkeit',
    title: 'Präzise Sätze',
    summary: 'Anspruchsvolle Sätze – fast ohne Fehler.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Diese Sätze enthalten viele Großbuchstaben, Umlaute und Satzzeichen. Wer sie fehlerfrei tippt, beherrscht die Tastatur wirklich.',
      tips: [
        'Ziel: mindestens 97 % Genauigkeit.',
        'Achte besonders auf Umschalttaste und Satzzeichen.',
        'Langsam ist hier völlig in Ordnung.',
      ],
    },
    exercise: { kind: 'sentences', source: 'precise', targetLength: 220 },
    passAccuracy: 97,
  },

  // ── Modul 10: Freies Schreiben ───────────────────────────────────────
  {
    id: 'texte',
    number: 28,
    moduleId: 'freies-schreiben',
    title: 'Texte abschreiben',
    summary: 'Ein zusammenhängender Absatz mit mehreren Sätzen.',
    newChars: [],
    focusChars: [],
    intro: {
      why: 'Jetzt schreibst du ganze Absätze – so wie bei E-Mails, Notizen oder Berichten. Bei jedem Durchgang wartet ein anderer Text.',
      tips: [
        'Finde einen ruhigen, gleichmäßigen Rhythmus.',
        'Schau nicht auf die Tastatur – auch nicht bei seltenen Zeichen.',
        'Gönn dir nach dem Text eine kurze Pause.',
      ],
    },
    exercise: { kind: 'text', source: 'paragraphs', targetLength: 300 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
  {
    id: 'briefe',
    number: 29,
    moduleId: 'freies-schreiben',
    title: 'Briefe mit Absätzen',
    summary: 'Kurze Nachrichten mit Zeilenumbrüchen per Enter.',
    newChars: ['\n'],
    focusChars: ['\n'],
    intro: {
      why: 'In Briefen und Nachrichten beginnt nach Anrede und Gruß eine neue Zeile. Die Enter-Taste tippst du mit dem rechten kleinen Finger.',
      tips: [
        'Das Zeichen ↵ zeigt dir, wo du Enter drücken sollst.',
        'Strecke den rechten kleinen Finger von Ö aus nach rechts zur Enter-Taste.',
        'Kehre danach sofort in die Grundstellung zurück.',
      ],
    },
    exercise: { kind: 'text', source: 'letters', targetLength: 260 },
    passAccuracy: DEFAULT_PASS_ACCURACY,
  },
];
