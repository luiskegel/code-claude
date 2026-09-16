import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'fehler-korrigieren',
  track: 'prompting',
  title: 'Fehler korrigieren',
  description:
    'Was tun, wenn die Antwort falsch, erfunden oder am Thema vorbei ist? Fünf typische Fehlerbilder und ihre Gegenmittel.',
  minutes: 7,
  keywords: ['fehler', 'falsch', 'korrigieren', 'halluzination', 'abweichung', 'diskussion'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Fast jeder Fehler gehört zu einem von fünf Mustern. Wenn du das Muster erkennst, weißt du sofort, was zu tun ist.',
        },
        {
          type: 'table',
          head: ['Fehlerbild', 'Woran du es erkennst', 'Gegenmittel'],
          rows: [
            [
              '**Erfindung**',
              'Konkrete Zahl, Quelle oder Paragraf ohne Grundlage',
              'Material mitgeben, Belege verlangen, gegenprüfen',
            ],
            [
              '**Themaverfehlung**',
              'Antwort ist gut, aber beantwortet eine andere Frage',
              'Frage in einem Satz neu formulieren, Ziel nennen',
            ],
            [
              '**Ignorierte Vorgabe**',
              'Länge, Format oder Verbot wurde nicht eingehalten',
              'Vorgabe isoliert wiederholen: „Nochmal, exakt 5 Sätze."',
            ],
            [
              '**Abdriften im langen Chat**',
              'Frühere Regeln verschwinden nach vielen Nachrichten',
              'Regeln kurz wiederholen oder neuen Chat mit Zusammenfassung starten',
            ],
            [
              '**Gefälliges Zustimmen**',
              'Claude gibt dir recht, obwohl du falsch liegst',
              'Widerspruch ausdrücklich einfordern',
            ],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Der häufigste Reflex – „Das ist falsch, mach es nochmal" – ist der schwächste. Er sagt Claude nicht, **was** falsch ist und **woran** er es hätte merken sollen.',
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Vorsicht beim Widersprechen',
          md: 'Wenn du behauptest, etwas sei falsch, stimmt Claude oft zu – auch wenn er ursprünglich recht hatte. Formuliere deshalb als **Frage**: *„Bist du sicher? Prüf das nochmal und begründe."* statt *„Das ist falsch."*',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Die Stelle genau benennen',
              md: '„Im dritten Absatz steht X. Das stimmt nicht, weil …" – je genauer, desto besser die Korrektur.',
            },
            {
              title: 'Den richtigen Wert liefern, wenn du ihn kennst',
              md: 'Claude kann deine Zahl nicht kennen. Wenn du sie hast, gib sie mit – dann wird der ganze Text korrekt neu gerechnet.',
            },
            {
              title: 'Nach dem Grund fragen',
              md: '„Woher stammt diese Angabe?" zeigt dir, ob es eine Ableitung aus deinem Material oder eine Erfindung war.',
            },
            {
              title: 'Nur den fehlerhaften Teil korrigieren lassen',
              md: '„Ändere nur Absatz 3, lass den Rest unverändert." Verhindert, dass ein guter Text beim Reparieren zerstört wird.',
            },
          ],
        },
        {
          type: 'prompt',
          title: 'Korrektur mit Begründung',
          prompt: `In deiner Antwort stimmt etwas nicht.

Stelle: [WELCHER ABSATZ / WELCHE AUSSAGE]
Problem: [WAS IST FALSCH ODER FEHLT]
Richtige Information: [FALLS DU SIE KENNST]

Aufgabe:
1. Sag mir, worauf du deine ursprüngliche Aussage gestützt hast.
2. Korrigiere nur diese Stelle. Der Rest bleibt unverändert.
3. Prüfe, ob der Fehler Auswirkungen auf andere Stellen im Text hat.

Wenn du meine Korrektur für falsch hältst, sag es und begründe es.`,
          note: 'Der letzte Satz ist wichtig: Er verhindert, dass Claude dir aus Gefälligkeit zustimmt.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Wann ein Neustart besser ist',
          blocks: [
            {
              type: 'text',
              md: 'Manchmal ist ein Gespräch in eine Sackgasse geraten: Claude wiederholt denselben Fehler, obwohl du dreimal korrigiert hast. Dann ist ein Neustart schneller – aber nicht ohne Vorbereitung.',
            },
            {
              type: 'prompt',
              title: 'Sauberer Neustart',
              prompt: `Bevor wir hier abbrechen:

Fasse in einer Übergabe zusammen:
1. Was war die ursprüngliche Aufgabe?
2. Welche Vorgaben und Regeln gelten?
3. Was hat bisher funktioniert?
4. Was hat nicht funktioniert und warum?
5. Welches Material wird gebraucht?

Format: kompakt, sodass ich es in ein neues Gespräch kopieren kann.`,
              note: 'So nimmst du den nützlichen Teil mit und lässt die verfahrene Diskussion zurück.',
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
          title: 'Beispiel anzeigen: Die falsche Zahl',
          example: {
            task: 'Claude hat in deiner Kalkulation einen Stundensatz von 85 € verwendet, richtig sind 72 €.',
            bad: '`Die Zahl stimmt nicht, mach es nochmal.`\n→ Claude rät eine neue Zahl. Möglicherweise wieder falsch.',
            good: `\`Der Stundensatz ist 72 €, nicht 85 €.

Aufgabe:
1. Woher kam die 85 €?
2. Rechne die gesamte Kalkulation mit 72 € neu.
3. Sag mir, welche anderen Ergebnisse sich dadurch ändern.
4. Zeig den Rechenweg, damit ich nachvollziehen kann.\``,
            why: 'Frage 1 zeigt dir, ob Claude die Zahl aus deinem Material gelesen oder erfunden hat – das ist wichtig für dein Vertrauen in den Rest. Frage 3 findet Folgefehler.',
            result:
              'Eine korrigierte Kalkulation **und** das Wissen, ob auch andere Zahlen geprüft werden müssen.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Ehrliche Selbstprüfung anfordern',
          prompt: `Bevor ich mit deiner Antwort weiterarbeite:

1. Welche Aussage in deiner Antwort ist am unsichersten?
2. Welche Angabe stammt aus meinem Material, welche aus deinem allgemeinen Wissen?
3. Was müsste ich prüfen, bevor ich das verwende?

Antworte knapp, als Liste. Beschönige nichts.`,
          note: 'Dieser Prompt gehört zu den wertvollsten in der ganzen Academy. Nutze ihn bei allem, was du weitergibst.',
        },
      ],
    },
  ],
  mistakes: [
    'Nur "das ist falsch" schreiben, ohne zu sagen, was und warum.',
    'Behaupten, etwas sei falsch, obwohl man selbst unsicher ist – Claude stimmt dann oft zu und verschlimmert es.',
    'Den ganzen Text neu erzeugen lassen, statt nur die fehlerhafte Stelle zu korrigieren.',
    'Nach drei erfolglosen Korrekturrunden weiterdiskutieren, statt mit einer Übergabe neu zu starten.',
  ],
  proTip:
    'Frag nach einer Korrektur immer: *"Hat dieser Fehler Auswirkungen auf andere Stellen?"* Falsche Zahlen und falsche Annahmen stehen selten allein.',
  task: {
    md: 'Lass Claude bewusst etwas zu einem Thema schreiben, in dem du dich gut auskennst. Finde einen Fehler und korrigiere ihn nach dem Vier-Schritte-Muster. Beobachte, ob die Korrektur sauber bleibt oder andere Stellen kaputtmacht.',
    solution:
      'Wenn du „nur diese Stelle, Rest unverändert" schreibst, bleibt der Rest in aller Regel stabil. Ohne diese Einschränkung wird der Text häufig komplett neu formuliert – und du musst alles nochmal prüfen.',
  },
  exercise: {
    scenario:
      'Claude nennt eine Zahl, die dir falsch vorkommt. Du bist dir aber nicht sicher.',
    question: 'Wie formulierst du?',
    options: [
      {
        label: '„Diese Zahl ist falsch."',
        correct: false,
        explain:
          'Riskant: Claude stimmt dir womöglich zu und ersetzt eine richtige Zahl durch eine falsche.',
      },
      {
        label:
          '„Bist du bei dieser Zahl sicher? Woher stammt sie, und was spricht dagegen?"',
        correct: true,
        explain:
          'Als Frage formuliert. Du bekommst die Herkunft und eine echte Prüfung statt reflexhafter Zustimmung.',
      },
      {
        label: 'Die Antwort ignorieren und neu fragen',
        correct: false,
        explain: 'Du verlierst die Information, woher der mögliche Fehler kam.',
      },
    ],
  },
  quiz: [
    {
      q: 'Warum solltest du Korrekturen als Frage formulieren?',
      options: [
        {
          label: 'Weil Claude sonst aus Gefälligkeit zustimmt',
          correct: true,
          explain: 'Ein häufiges Muster: Widerspruch führt zu Zustimmung, auch wenn die Ursprungsantwort stimmte.',
        },
        { label: 'Weil Fragen höflicher sind', correct: false, explain: 'Höflichkeit ist nicht der Grund.' },
        { label: 'Weil Claude Aussagen nicht versteht', correct: false, explain: 'Versteht er sehr wohl.' },
      ],
    },
    {
      q: 'Was fragst du nach jeder Korrektur?',
      options: [
        { label: '„Gefällt dir die neue Fassung?"', correct: false, explain: 'Bringt keine Information.' },
        {
          label: '„Hat dieser Fehler Auswirkungen auf andere Stellen?"',
          correct: true,
          explain: 'Findet Folgefehler, die sonst unbemerkt bleiben.',
        },
        { label: '„Kannst du es nochmal versuchen?"', correct: false, explain: 'Zu unspezifisch.' },
      ],
    },
    {
      q: 'Wann lohnt sich ein Neustart?',
      options: [
        { label: 'Nach jedem Fehler', correct: false, explain: 'Viel zu früh – du verlierst den Kontext.' },
        {
          label: 'Wenn derselbe Fehler trotz mehrerer Korrekturen wiederkehrt',
          correct: true,
          explain: 'Dann mit einer Übergabe-Zusammenfassung in ein neues Gespräch wechseln.',
        },
        { label: 'Nie', correct: false, explain: 'Manchmal ist es die schnellste Lösung.' },
      ],
    },
  ],
  related: ['prompts-verbessern', 'was-kann-claude-nicht', 'folgefragen-stellen'],
}
