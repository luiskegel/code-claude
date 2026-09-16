import type { Lesson } from '../../types'

export const lesson: Lesson = {
  slug: 'komplexe-prompts',
  track: 'advanced',
  title: 'Komplexe Prompts',
  description:
    'Mehrstufige Aufträge, Denkschritte, Selbstprüfung und Bedingungen – wenn ein einfacher Prompt nicht mehr reicht.',
  minutes: 8,
  keywords: ['komplex', 'mehrstufig', 'denkschritte', 'bedingungen', 'selbstprüfung', 'fortgeschritten'],
  sections: [
    {
      kind: 'what',
      blocks: [
        {
          type: 'lead',
          md: 'Ein komplexer Prompt ist nicht einfach ein langer Prompt. Er enthält **Struktur**: Zwischenschritte, Bedingungen und eine eingebaute Selbstkontrolle.',
        },
        {
          type: 'table',
          head: ['Technik', 'Was sie bewirkt', 'Wann einsetzen'],
          rows: [
            ['**Zwischenschritte**', 'Zwingt zu geordnetem Vorgehen', 'Bei Analysen und Vergleichen'],
            ['**Denken vor Antworten**', 'Bessere Ergebnisse bei Schlussfolgerungen', 'Bei Aufgaben mit Ableitungen'],
            ['**Bedingungen (wenn/dann)**', 'Reagiert auf verschiedene Fälle', 'Bei Material, das variieren kann'],
            ['**Selbstprüfung**', 'Fängt eigene Fehler ab', 'Bei allem, was du weitergibst'],
            ['**Abbruchregel**', 'Verhindert Raten bei fehlendem Material', 'Wenn Vollständigkeit wichtig ist'],
          ],
        },
      ],
    },
    {
      kind: 'why',
      blocks: [
        {
          type: 'text',
          md: 'Bei einfachen Aufgaben bringen diese Techniken wenig. Bei Aufgaben mit mehreren Ableitungsschritten machen sie den Unterschied zwischen einer plausiblen und einer belastbaren Antwort.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Das Grundprinzip',
          md: '**Erst denken lassen, dann antworten lassen.** Wenn die Zwischenschritte sichtbar sind, kannst du außerdem nachvollziehen, an welcher Stelle eine Ableitung schiefgegangen ist.',
        },
      ],
    },
    {
      kind: 'how',
      blocks: [
        {
          type: 'prompt',
          title: 'Mehrstufiger Auftrag mit Selbstprüfung',
          prompt: `Aufgabe: [KOMPLEXE AUFGABE]

Gehe in dieser Reihenfolge vor und zeig mir jeden Schritt:

SCHRITT 1 – Verstehen
Fasse in 3 Sätzen zusammen, was ich von dir willst.
Nenne alles, was in meiner Aufgabe unklar bleibt.

SCHRITT 2 – Material sichten
Welche Informationen hast du? Welche fehlen?
Wenn Wesentliches fehlt: HALT HIER AN und frag nach.

SCHRITT 3 – Vorgehen
Beschreibe in 3-5 Punkten, wie du die Aufgabe lösen wirst.

SCHRITT 4 – Lösung
Führe dein Vorgehen aus.

SCHRITT 5 – Selbstprüfung
- Habe ich alle Vorgaben eingehalten? (einzeln prüfen)
- Welche meiner Aussagen sind unsicher?
- Was würde ein Kritiker als Erstes angreifen?

SCHRITT 6 – Endfassung
Die bereinigte Fassung, ohne die Zwischenschritte.`,
          note: 'Die Abbruchregel in Schritt 2 („HALT HIER AN") ist der wichtigste Teil. Ohne sie wird fehlendes Material durch plausible Annahmen ersetzt – und du merkst es nicht.',
        },
        {
          type: 'accordion',
          title: 'Mehr erfahren: Bedingungen einbauen',
          blocks: [
            {
              type: 'text',
              md: 'Wenn dein Material variieren kann, gib Regeln für die Fälle mit. Das ist besonders nützlich in Workflows, bei denen derselbe Prompt auf unterschiedliche Eingaben trifft.',
            },
            {
              type: 'code',
              lang: 'text',
              caption: 'Bedingungen im Prompt',
              code: `Prüfe zuerst, welcher Fall vorliegt:

WENN der Text eine Beschwerde ist:
  → Entschuldigung, Lösungsvorschlag, konkreter nächster Schritt.
  → Ton: ruhig, keine Rechtfertigung.

WENN der Text eine Anfrage ist:
  → Antwort auf die Frage, Angebot zum weiteren Vorgehen.
  → Ton: sachlich, freundlich.

WENN der Text unklar ist:
  → Nicht antworten. Stattdessen: 3 Rückfragen formulieren.

Sag mir am Anfang deiner Antwort, welcher Fall vorliegt.`,
            },
            {
              type: 'text',
              md: 'Der letzte Satz ist wichtig: Du siehst sofort, ob die Einordnung stimmt – und kannst korrigieren, bevor du die Antwort liest.',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Nicht übertreiben',
          md: 'Ein komplexer Prompt für eine einfache Aufgabe macht die Antwort nicht besser, sondern nur länger. Setze diese Techniken gezielt ein – bei Aufgaben mit echten Ableitungsschritten.',
        },
      ],
    },
    {
      kind: 'example',
      blocks: [
        {
          type: 'example',
          title: 'Beispiel anzeigen: Preiskalkulation prüfen',
          example: {
            task: 'Eine Kalkulation soll auf Schlüssigkeit geprüft werden.',
            bad: '`Prüf meine Kalkulation.`\n→ Ein paar allgemeine Hinweise. Fehler in der Logik werden übersehen.',
            good: `\`Prüfe meine Kalkulation.

SCHRITT 1: Liste alle Annahmen auf, die in der Kalkulation stecken – auch die unausgesprochenen.
SCHRITT 2: Markiere jede Annahme als "belegt" (steht im Material) oder "gesetzt" (nicht belegt).
SCHRITT 3: Prüfe die Rechenlogik: Welche Größe hängt von welcher ab? Wo ist ein Denkfehler möglich?
SCHRITT 4: Welche EINE Annahme hat den größten Einfluss auf das Ergebnis? Was passiert, wenn sie um 20 % danebenliegt?
SCHRITT 5: Nenne die 3 Punkte, die ich vor der Abgabe prüfen muss.

Rechne selbst keine Endsummen – ich prüfe die Zahlen in der Tabelle.\``,
            why: 'Schritt 1 und 2 machen die unausgesprochenen Annahmen sichtbar – dort sitzen fast alle Kalkulationsfehler. Schritt 4 zeigt, wo das Risiko konzentriert ist.',
            result:
              'Eine Prüfung, die die Logik angreift statt nur die Formulierung – und eine konkrete Liste, was vor der Abgabe zu tun ist.',
          },
        },
      ],
    },
    {
      kind: 'try',
      blocks: [
        {
          type: 'prompt',
          title: 'Selbstprüfung nachträglich anhängen',
          prompt: `Prüfe deine eigene letzte Antwort.

1. Geh meine Vorgaben einzeln durch. Welche hast du eingehalten, welche nicht?
2. Welche Aussage in deiner Antwort ist am schwächsten belegt?
3. Welche Information hast du ergänzt, die ich nicht geliefert habe?
4. Was würde ein Fachmann als Erstes kritisieren?
5. Was würdest du anders machen, wenn du nochmal anfangen könntest?

Sei streng mit dir. Beschönige nichts.
Schreib die Antwort noch nicht neu – ich entscheide danach.`,
          note: 'Funktioniert bei jeder Antwort, auch bei einer, die mit einem ganz einfachen Prompt entstanden ist.',
        },
      ],
    },
  ],
  mistakes: [
    'Komplexe Prompt-Strukturen für einfache Aufgaben verwenden.',
    'Die Abbruchregel weglassen – dann werden fehlende Angaben durch plausible Annahmen ersetzt.',
    'Alle Zwischenschritte anzeigen lassen und dann die Endfassung vergessen anzufordern.',
    'So viele Regeln stapeln, dass sich einzelne widersprechen.',
  ],
  proTip:
    'Bau in jeden wichtigen Prompt die Zeile ein: *"Wenn dir Wesentliches fehlt, halte an und frag nach, statt Annahmen zu treffen."* Das ist die wirksamste einzelne Schutzregel gegen stillschweigend erfundene Details.',
  task: {
    md: 'Nimm eine Aufgabe, bei der Claude zuletzt am Ziel vorbei gearbeitet hat. Schreib sie als mehrstufigen Prompt mit Abbruchregel und Selbstprüfung. Vergleiche das Ergebnis.',
    solution:
      'Häufigste Beobachtung: Schritt 1 („Fasse zusammen, was ich will") deckt sofort ein Missverständnis auf. Das allein hätte den Fehlversuch verhindert – noch bevor die eigentliche Arbeit beginnt.',
  },
  exercise: {
    scenario:
      'Claude soll aus unvollständigem Material eine Analyse erstellen.',
    question: 'Welche Regel schützt am besten?',
    options: [
      {
        label: '„Sei gründlich."',
        correct: false,
        explain: 'Zu vage – Gründlichkeit erzeugt eher mehr Text, nicht weniger Erfindung.',
      },
      {
        label: '„Wenn Wesentliches fehlt, halte an und frag nach, statt Annahmen zu treffen."',
        correct: true,
        explain:
          'Die Abbruchregel. Sie macht die Lücke sichtbar, statt sie zu füllen.',
      },
      {
        label: '„Schreib ausführlich."',
        correct: false,
        explain: 'Verschlimmert das Problem eher.',
      },
    ],
  },
  quiz: [
    {
      q: 'Was macht einen Prompt „komplex"?',
      options: [
        { label: 'Seine Länge', correct: false, explain: 'Länge allein ist keine Struktur.' },
        {
          label: 'Struktur: Zwischenschritte, Bedingungen, Selbstprüfung',
          correct: true,
          explain: 'Genau diese drei Elemente.',
        },
        { label: 'Fachbegriffe', correct: false, explain: 'Bringen nichts.' },
      ],
    },
    {
      q: 'Wozu dienen sichtbare Zwischenschritte?',
      options: [
        {
          label: 'Du siehst, an welcher Stelle eine Ableitung schiefging',
          correct: true,
          explain: 'Und kannst gezielt dort korrigieren.',
        },
        { label: 'Die Antwort wird kürzer', correct: false, explain: 'Sie wird länger.' },
        { label: 'Es sieht professioneller aus', correct: false, explain: 'Nicht der Zweck.' },
      ],
    },
    {
      q: 'Wann solltest du diese Techniken NICHT einsetzen?',
      options: [
        { label: 'Bei Analysen', correct: false, explain: 'Dort sind sie besonders nützlich.' },
        {
          label: 'Bei einfachen Aufgaben ohne Ableitungsschritte',
          correct: true,
          explain: 'Dann machen sie die Antwort nur länger, nicht besser.',
        },
        { label: 'Bei Entscheidungen', correct: false, explain: 'Dort helfen sie sehr.' },
      ],
    },
  ],
  related: ['gute-prompts', 'lange-aufgaben', 'fehleranalyse'],
}
