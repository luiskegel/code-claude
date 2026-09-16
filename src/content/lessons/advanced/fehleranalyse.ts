import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'fehleranalyse',
  track: 'advanced',
  title: 'Fehleranalyse',
  description:
    'Systematisch herausfinden, warum ein Ergebnis nicht stimmt – bei Texten, Prozessen und technischen Fehlern.',
  minutes: 7,
  keywords: ['fehler', 'debugging', 'ursache', 'analyse', 'problem', 'fehlersuche', 'systematisch'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Fehleranalyse heißt: von der **Wirkung** zur **Ursache** kommen – und nicht bei der erstbesten plausiblen Erklärung stehen zu bleiben.',
        },
        {
          type: 'steps',
          items: [
            { title: '1. Symptom exakt beschreiben', md: 'Was passiert konkret? Was hättest du erwartet? Wann tritt es auf, wann nicht?' },
            { title: '2. Hypothesen sammeln', md: 'Mehrere mögliche Ursachen – nicht nur die naheliegendste.' },
            { title: '3. Nach Wahrscheinlichkeit sortieren', md: 'Und nach Prüfaufwand. Billige Tests zuerst.' },
            { title: '4. Einzeln prüfen', md: 'Immer nur eine Sache ändern, sonst weißt du nicht, was gewirkt hat.' },
            { title: '5. Ursache belegen', md: 'Erst wenn du den Fehler gezielt auslösen und beheben kannst, kennst du die Ursache.' },
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'callout',
          variant: 'warn',
          title: 'Die häufigste Falle',
          md: 'Die erste plausible Erklärung ist oft falsch. Sie klingt gut, passt zu den Symptomen – und trifft trotzdem nicht zu. Deshalb: **immer mehrere Hypothesen** verlangen und sie einzeln prüfen.',
        },
        {
          type: 'text',
          md: 'Das gilt für alles: Warum funktioniert dieses Skript nicht? Warum kommen keine Anfragen mehr rein? Warum versteht der Kunde das Angebot falsch?',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Systematische Fehlersuche',
          prompt: `Ich habe ein Problem.

Was passiert: [SYMPTOM]
Was ich erwartet hätte: [SOLL]
Wann tritt es auf: [IMMER / MANCHMAL / SEIT WANN]
Wann tritt es NICHT auf: [GEGENPROBE]
Was ich schon versucht habe: [VERSUCHE UND ERGEBNIS]
Was sich zuletzt geändert hat: [ÄNDERUNGEN]

Aufgabe:
1. Nenne 5 mögliche Ursachen – auch unwahrscheinliche.
2. Sortiere nach Wahrscheinlichkeit.
3. Gib zu jeder Ursache den billigsten Test an, mit dem ich sie ausschließen kann.
4. Sag mir, mit welchem Test ich anfangen soll und warum.
5. Welche Information fehlt dir, die den Kreis am stärksten einengen würde?

Rate nicht. Wenn du eine Ursache nicht belegen kannst, sag das.`,
          note: 'Die Zeile „Wann tritt es NICHT auf" ist der wichtigste Teil der Beschreibung. Sie halbiert den Suchraum in vielen Fällen sofort.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Die fünf Warums',
          blocks: [
            {
              type: 'text',
              md: 'Wenn du die unmittelbare Ursache gefunden hast, bist du selten am Ende. Frag fünfmal „warum", um zur eigentlichen Ursache zu kommen:',
            },
            {
              type: 'quote',
              md: 'Die Rechnung war falsch. **Warum?** Der Rabatt wurde doppelt abgezogen. **Warum?** Zwei Personen haben ihn eingetragen. **Warum?** Es war nicht klar, wer zuständig ist. **Warum?** Der Prozess ist nirgends dokumentiert. **Warum?** Wir haben nie festgelegt, wer Prozesse dokumentiert.',
            },
            {
              type: 'text',
              md: 'Der Fehler war nicht die Rechnung. Der Fehler war die fehlende Zuständigkeit. Wer nur die Rechnung korrigiert, bekommt das Problem nächsten Monat wieder.',
            },
          ],
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Fehlermeldung verstehen',
          example: {
            task: 'Ein Programm bricht mit einer kryptischen Meldung ab.',
            bad: '`Warum funktioniert das nicht?` – ohne die Meldung mitzuschicken.',
            good: `\`Ich bekomme folgende Fehlermeldung:

[FEHLERMELDUNG KOMPLETT EINFÜGEN]

Zusammenhang:
- Was ich getan habe: [AKTION]
- Womit: [PROGRAMM / VERSION]
- Was sich zuletzt geändert hat: [ÄNDERUNG]
- Funktioniert es woanders: [JA/NEIN]

Aufgabe:
1. Übersetze die Meldung in verständliches Deutsch.
2. Was bedeutet sie technisch?
3. Nenne 3 mögliche Ursachen, sortiert nach Wahrscheinlichkeit.
4. Gib mir zu jeder den konkreten nächsten Prüfschritt.
5. Welcher Schritt ist am ungefährlichsten? Mit dem fange ich an.

Schlag keine Befehle vor, die Daten löschen oder überschreiben, ohne mich ausdrücklich zu warnen.\``,
            why: 'Die vollständige Fehlermeldung ist entscheidend – sie enthält fast immer die Information, die die Ursache eingrenzt. Die letzte Zeile ist eine Sicherheitsregel.',
            result:
              'Eine verständliche Erklärung plus eine Reihenfolge von Prüfschritten, die mit dem ungefährlichsten beginnt.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Die fünf Warums',
          prompt: `Problem: [BESCHREIBUNG]
Unmittelbare Ursache, die ich gefunden habe: [URSACHE]

Aufgabe:
Frag fünfmal "warum", um zur eigentlichen Ursache zu kommen.
Zeig jede Stufe einzeln.

Danach:
1. Auf welcher Stufe sollte die Gegenmaßnahme ansetzen – und warum?
2. Was passiert, wenn ich nur die oberste Stufe repariere?
3. Was wäre die Maßnahme, die das Problem dauerhaft beseitigt?

Wenn du für eine Stufe keine belastbare Antwort hast, sag es, statt zu spekulieren.`,
          note: 'Besonders wirksam bei Problemen, die immer wiederkehren, obwohl man sie schon dreimal „gelöst" hat.',
        },
      ],
    },
  ],
  mistakes: [
    'Nur das Symptom nennen, ohne Zusammenhang und ohne die Gegenprobe ("wann tritt es nicht auf?").',
    'Die erste plausible Erklärung übernehmen, ohne sie zu prüfen.',
    'Mehrere Dinge gleichzeitig ändern und danach nicht wissen, was gewirkt hat.',
    'Vorgeschlagene Befehle ausführen, ohne zu verstehen, was sie tun.',
  ],
  proTip:
    'Schick bei technischen Problemen **immer die vollständige Fehlermeldung** mit – nicht die Kurzfassung und nicht deine Beschreibung davon. In der Meldung steht fast immer der entscheidende Hinweis.',
  task: {
    md: 'Nimm ein wiederkehrendes Problem aus deinem Alltag. Geh die fünf Warums durch. Notiere, auf welcher Stufe die bisherigen Lösungsversuche angesetzt haben.',
    solution:
      'In den meisten Fällen setzten die bisherigen Versuche auf Stufe 1 oder 2 an – deshalb kam das Problem zurück. Die dauerhafte Lösung liegt fast immer auf Stufe 4 oder 5.',
  },
  exercise: {
    scenario: 'Claude nennt dir eine einzige, sehr plausible Ursache für dein Problem.',
    question: 'Was tust du?',
    options: [
      {
        label: 'Sie beheben – sie klingt schlüssig',
        correct: false,
        explain:
          'Plausibel ist nicht belegt. Wenn du danebenliegst, hast du Zeit verloren und das Problem besteht weiter.',
      },
      {
        label: 'Nach weiteren möglichen Ursachen fragen und mit dem billigsten Test beginnen',
        correct: true,
        explain:
          'Mehrere Hypothesen, günstigste Prüfung zuerst. So findest du die echte Ursache statt der überzeugendsten Erzählung.',
      },
      {
        label: 'Alle vorgeschlagenen Maßnahmen gleichzeitig umsetzen',
        correct: false,
        explain: 'Dann weißt du hinterher nicht, was gewirkt hat – und was vielleicht Schaden angerichtet hat.',
      },
    ],
  },
  quiz: [
    {
      q: 'Welche Angabe engt den Suchraum am stärksten ein?',
      options: [
        {
          label: 'Wann das Problem NICHT auftritt',
          correct: true,
          explain: 'Die Gegenprobe ist oft aufschlussreicher als das Symptom selbst.',
        },
        { label: 'Wie ärgerlich es ist', correct: false, explain: 'Ohne diagnostischen Wert.' },
        { label: 'Wie lange es schon dauert', correct: false, explain: 'Hilfreich, aber weniger.' },
      ],
    },
    {
      q: 'Warum immer nur eine Sache auf einmal ändern?',
      options: [
        {
          label: 'Sonst weißt du nicht, welche Änderung gewirkt hat',
          correct: true,
          explain: 'Grundregel jeder Fehlersuche.',
        },
        { label: 'Um Zeit zu sparen', correct: false, explain: 'Es dauert eher länger – lohnt sich trotzdem.' },
        { label: 'Weil mehr nicht geht', correct: false, explain: 'Geht schon – ist nur nicht aussagekräftig.' },
      ],
    },
    {
      q: 'Wozu dienen die fünf Warums?',
      options: [
        { label: 'Zur Beschleunigung', correct: false, explain: 'Nein.' },
        {
          label: 'Um von der unmittelbaren zur eigentlichen Ursache zu kommen',
          correct: true,
          explain: 'Sonst kehrt das Problem zurück.',
        },
        { label: 'Um Schuldige zu finden', correct: false, explain: 'Ausdrücklich nicht der Zweck.' },
      ],
    },
  ],
  related: ['komplexe-prompts', 'cc-fehler-finden', 'fehler-korrigieren'],
}
