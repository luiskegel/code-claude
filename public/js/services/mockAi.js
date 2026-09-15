/**
 * Offline-Tutor ("Demo-Modus").
 *
 * Wird verwendet, solange kein echter KI-Anbieter konfiguriert ist. Der Code läuft
 * sowohl im Browser als auch im Node-Server und enthält bewusst keine DOM-Zugriffe.
 *
 * Er ist kein Ersatz für ein Sprachmodell, rechnet aber typische Oberstufen-Aufgaben
 * (quadratische Gleichungen, lineare Gleichungen, Ableitungen von Polynomen) wirklich
 * nach – statt Lösungen nur zu behaupten.
 */

/* ---------------- Zahlen- und Term-Hilfen ---------------- */

const round = (value, digits = 6) => Number(value.toFixed(digits));

/** Zahl in deutscher Schreibweise, ohne Rundungsartefakte. */
export function fmt(value) {
  const rounded = round(value, 4);
  if (Number.isInteger(rounded)) return String(rounded);
  return String(rounded).replace('.', ',');
}

/** "x²-5x+6" -> { 2: 1, 1: -5, 0: 6 } */
export function parsePolynomial(input) {
  const normalized = String(input)
    .replace(/\s+/g, '')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/[·⋅×]/g, '*')
    .replace(/−/g, '-')
    .replace(/,(\d)/g, '.$1');

  if (!normalized || !/^[-+0-9.x^*/]+$/i.test(normalized)) return null;

  const terms = normalized.match(/[+-]?[^+-]+/g);
  if (!terms) return null;

  const coefficients = {};

  for (const term of terms) {
    const match = /^([+-]?)(\d*\.?\d*)(\*?)(x(?:\^(\d+))?)?$/i.exec(term);
    if (!match) return null;

    const [, signRaw, numberRaw, , variable, powerRaw] = match;
    const sign = signRaw === '-' ? -1 : 1;

    if (!variable && numberRaw === '') return null;

    const coefficient = numberRaw === '' ? 1 : Number(numberRaw);
    if (!Number.isFinite(coefficient)) return null;

    const degree = variable ? Number(powerRaw ?? 1) : 0;
    coefficients[degree] = (coefficients[degree] ?? 0) + sign * coefficient;
  }

  return coefficients;
}

export function polynomialToString(coefficients) {
  const degrees = Object.keys(coefficients)
    .map(Number)
    .filter((degree) => Math.abs(coefficients[degree]) > 1e-12)
    .sort((a, b) => b - a);

  if (!degrees.length) return '0';

  return degrees
    .map((degree, index) => {
      const value = coefficients[degree];
      const sign = value < 0 ? '-' : index === 0 ? '' : '+';
      const size = Math.abs(value);
      const number = size === 1 && degree > 0 ? '' : fmt(size);
      const variable = degree === 0 ? '' : degree === 1 ? 'x' : `x^${degree}`;
      return `${sign}${number}${variable}`;
    })
    .join('');
}

export function evaluatePolynomial(coefficients, x) {
  return Object.entries(coefficients).reduce(
    (sum, [degree, value]) => sum + value * x ** Number(degree),
    0,
  );
}

export function derivePolynomial(coefficients) {
  const derived = {};
  for (const [degree, value] of Object.entries(coefficients)) {
    const power = Number(degree);
    if (power === 0) continue;
    derived[power - 1] = (derived[power - 1] ?? 0) + value * power;
  }
  return Object.keys(derived).length ? derived : { 0: 0 };
}

/* ---------------- Aufgabenerkennung ---------------- */

const QUADRATIC_KEYWORDS = /(nullstelle|löse|loese|gleichung|schnittpunkt.*x-achse|faktorisier)/i;
const DERIVATIVE_KEYWORDS = /(ableit|differenzier|f\s*'\s*\(x\)|\bleite\b[^.]*\bab\b|\bbilde\b[^.]*\bableitung\b)/i;

/** Sucht den mathematischen Ausdruck in einem Aufgabentext. */
function extractExpressions(text) {
  const cleaned = String(text).replace(/\s+/g, ' ');
  const matches = cleaned.match(/[-+]?[\d.,]*\s*\*?\s*x(?:\s*[\^²³]\s*\d?)?(?:\s*[-+]\s*[\d.,]*\s*\*?\s*x?(?:\s*[\^²³]\s*\d?)?)*/gi);
  if (!matches) return [];
  return matches.map((entry) => entry.trim()).filter((entry) => entry.length > 1);
}

/**
 * Analysiert die Aufgabe und liefert – wenn möglich – eine echte Rechnung.
 * @returns {{kind: string, [key: string]: any}}
 */
export function analyzeQuestion(text) {
  const question = String(text ?? '');

  // Gleichung mit "=" (z.B. "3x + 5 = 20" oder "x²-5x+6=0")
  const equation = /([^=]+)=([^=]+)/.exec(question.replace(/f\s*\(\s*x\s*\)/gi, 'f(x)'));
  if (equation && !/f\(x\)/i.test(equation[1])) {
    const left = parsePolynomial(stripToExpression(equation[1]));
    const right = parsePolynomial(stripToExpression(equation[2]));
    if (left && right) {
      const combined = { ...left };
      for (const [degree, value] of Object.entries(right)) {
        combined[degree] = (combined[degree] ?? 0) - value;
      }
      const degree = maxDegree(combined);
      if (degree === 2) return { kind: 'quadratic', coefficients: combined, source: question };
      if (degree === 1) return { kind: 'linear', coefficients: combined, source: question };
    }
  }

  const expressions = extractExpressions(question);
  for (const candidate of expressions) {
    const coefficients = parsePolynomial(candidate);
    if (!coefficients) continue;
    const degree = maxDegree(coefficients);

    if (DERIVATIVE_KEYWORDS.test(question) && degree >= 1) {
      return { kind: 'derivative', coefficients, source: candidate };
    }
    if (degree === 2 && QUADRATIC_KEYWORDS.test(question)) {
      return { kind: 'quadratic', coefficients, source: candidate };
    }
    if (degree === 1 && QUADRATIC_KEYWORDS.test(question)) {
      return { kind: 'linear', coefficients, source: candidate };
    }
  }

  return { kind: 'unknown', source: question };
}

function stripToExpression(part) {
  return String(part)
    .replace(/f\s*\(\s*x\s*\)/gi, '')
    .replace(/[^0-9x²³^+\-*.,/]/gi, '');
}

function maxDegree(coefficients) {
  return Object.entries(coefficients)
    .filter(([, value]) => Math.abs(value) > 1e-12)
    .reduce((max, [degree]) => Math.max(max, Number(degree)), 0);
}

/* ---------------- Rechnungen ---------------- */

function solveQuadratic(coefficients) {
  const a = coefficients[2] ?? 0;
  const b = coefficients[1] ?? 0;
  const c = coefficients[0] ?? 0;
  const discriminant = round(b * b - 4 * a * c);

  if (discriminant < 0) return { a, b, c, discriminant, roots: [] };
  if (discriminant === 0) return { a, b, c, discriminant, roots: [round(-b / (2 * a))] };

  const sqrt = Math.sqrt(discriminant);
  return {
    a,
    b,
    c,
    discriminant,
    roots: [round((-b - sqrt) / (2 * a)), round((-b + sqrt) / (2 * a))].sort((x, y) => x - y),
  };
}

function solveLinear(coefficients) {
  const a = coefficients[1] ?? 0;
  const b = coefficients[0] ?? 0;
  if (Math.abs(a) < 1e-12) return { a, b, solution: null };
  return { a, b, solution: round(-b / a) };
}

/* ---------------- Antworttexte ---------------- */

/**
 * Erzeugt die Antwort des Demo-Tutors.
 * @param {{mode:string, question:string, subject?:string, taskTitle?:string, userSolution?:string}} payload
 * @returns {{content: string, provider: 'mock'}}
 */
export function generateMockAnswer(payload) {
  const { mode = 'hint', question = '', userSolution = '', subject = '' } = payload ?? {};
  const analysis = analyzeQuestion(question);

  let content;
  if (analysis.kind === 'quadratic') content = quadraticAnswer(mode, analysis, userSolution);
  else if (analysis.kind === 'linear') content = linearAnswer(mode, analysis, userSolution);
  else if (analysis.kind === 'derivative') content = derivativeAnswer(mode, analysis, userSolution);
  else content = genericAnswer(mode, question, subject, userSolution);

  return { content: `${content.trim()}\n`, provider: 'mock' };
}

function quadraticAnswer(mode, analysis, userSolution) {
  const { coefficients } = analysis;
  const { a, b, c, discriminant, roots } = solveQuadratic(coefficients);
  const term = polynomialToString(coefficients);
  const p = round(b / a);
  const q = round(c / a);

  const rootText = roots.length
    ? roots.map((root, index) => `x${index + 1} = ${fmt(root)}`).join(', ')
    : 'keine reelle Lösung';

  if (mode === 'hint') {
    return `### Hinweis

Du hast eine **quadratische Gleichung** vor dir: \`${term} = 0\`.

- Bringe sie zuerst in die Form \`x² + px + q = 0\` (also durch ${fmt(a)} teilen, falls nötig).
- Danach hilft dir die **p-q-Formel**: \`x = -p/2 ± √((p/2)² - q)\`.
- Frag dich zwischendurch: Was sagt der Ausdruck unter der Wurzel über die Anzahl der Lösungen aus?

Versuch es einmal selbst – wenn du stecken bleibst, wähle "Schritt für Schritt".`;
  }

  if (mode === 'explain') {
    return `### Worum geht es hier?

Eine quadratische Funktion \`f(x) = ax² + bx + c\` beschreibt eine **Parabel**. Die Nullstellen sind die
Stellen, an denen die Parabel die x-Achse schneidet – dort gilt \`f(x) = 0\`.

**Das Werkzeug dafür:** die p-q-Formel für \`x² + px + q = 0\`:
\`x = -p/2 ± √((p/2)² - q)\`

Der Ausdruck unter der Wurzel heisst **Diskriminante**. Sie entscheidet über die Anzahl der Nullstellen:

1. positiv → zwei Nullstellen
2. null → genau eine (die Parabel berührt die x-Achse)
3. negativ → keine reelle Nullstelle

**Beispiel (nicht deine Aufgabe):** \`x² - 7x + 12 = 0\` → \`p = -7\`, \`q = 12\`.
\`x = 3,5 ± √(12,25 - 12) = 3,5 ± 0,5\` → \`x1 = 3\`, \`x2 = 4\`.
Probe: \`3 · 4 = 12 = q\` und \`3 + 4 = 7 = -p\`. Passt.

Damit kannst du deine eigene Aufgabe jetzt selbst angehen.`;
  }

  if (mode === 'check') {
    return checkAgainstValues(userSolution, roots, {
      subjectLine: `Ich habe \`${term} = 0\` selbst nachgerechnet.`,
      calculation: quadraticCalculation({ a, b, c, p, q, discriminant, roots, term }),
      expectedText: roots.length ? `Meine Lösungen: **${rootText}**` : 'Ich finde **keine reelle Lösung**.',
    });
  }

  const steps = quadraticCalculation({ a, b, c, p, q, discriminant, roots, term });

  if (mode === 'solution') {
    return `### Vollständige Lösung

${steps}

**Ergebnis: ${rootText}**

*Merke für ähnliche Aufgaben:* Prüfe immer zuerst, ob du faktorisieren kannst (Satz von Vieta) –
das geht oft schneller als die Formel.`;
  }

  // steps
  return `### Schritt für Schritt

${steps}

**Ergebnis: ${rootText}**

Nächster Schritt für dich: Rechne die Probe noch einmal selbst nach, dann sitzt der Weg.`;
}

function quadraticCalculation({ a, b, c, p, q, discriminant, roots, term }) {
  const lines = [];
  lines.push(`1. **Gleichung ordnen:** \`${term} = 0\` mit \`a = ${fmt(a)}\`, \`b = ${fmt(b)}\`, \`c = ${fmt(c)}\`.`);

  if (a !== 1) {
    lines.push(`2. **Normieren:** durch ${fmt(a)} teilen → \`x² + ${fmt(p)}x + ${fmt(q)} = 0\`, also \`p = ${fmt(p)}\`, \`q = ${fmt(q)}\`.`);
  } else {
    lines.push(`2. **Ablesen:** \`p = ${fmt(p)}\`, \`q = ${fmt(q)}\`.`);
  }

  const half = round(p / 2);
  const radicand = round(half * half - q);
  lines.push(`3. **p-q-Formel ansetzen:** \`x = -(${fmt(p)})/2 ± √((${fmt(p)}/2)² - ${fmt(q)})\``);
  lines.push(`4. **Unter der Wurzel:** \`(${fmt(half)})² - ${fmt(q)} = ${fmt(radicand)}\` (Diskriminante ${fmt(discriminant)}).`);

  if (!roots.length) {
    lines.push('5. **Auswerten:** Der Wert unter der Wurzel ist negativ – es gibt keine reelle Lösung. Die Parabel schneidet die x-Achse nicht.');
    return lines.join('\n');
  }

  const rootOfRadicand = round(Math.sqrt(Math.max(radicand, 0)));
  lines.push(`5. **Wurzel ziehen:** \`√${fmt(radicand)} = ${fmt(rootOfRadicand)}\` → \`x = ${fmt(-half)} ± ${fmt(rootOfRadicand)}\``);
  lines.push(
    `6. **Lösungen:** ${roots.map((root, index) => `\`x${index + 1} = ${fmt(root)}\``).join(' und ')}`,
  );

  const proof = roots
    .map((root) => {
      const value = round(evaluatePolynomial({ 2: a, 1: b, 0: c }, root));
      return `\`f(${fmt(root)}) = ${fmt(value)}\``;
    })
    .join(', ');
  lines.push(`7. **Probe (einsetzen):** ${proof} → ergibt 0, die Lösungen stimmen also.`);

  return lines.join('\n');
}

function linearAnswer(mode, analysis, userSolution) {
  const { coefficients } = analysis;
  const { a, b, solution } = solveLinear(coefficients);
  const term = polynomialToString(coefficients);

  if (mode === 'hint') {
    return `### Hinweis

Das ist eine **lineare Gleichung**: \`${term} = 0\`.

- Bringe alle Terme mit \`x\` auf eine Seite und die Zahlen auf die andere.
- Teile am Ende durch den Faktor vor dem \`x\`.

Probier es einmal – der Rest ist reines Umformen.`;
  }

  if (mode === 'explain') {
    return `### Worum geht es hier?

Bei einer linearen Gleichung kommt \`x\` nur in der ersten Potenz vor. Du darfst auf beiden Seiten
dasselbe tun (addieren, subtrahieren, mit einer Zahl ≠ 0 multiplizieren oder dividieren) – dabei
bleibt die Lösungsmenge gleich.

**Beispiel (nicht deine Aufgabe):** \`4x - 6 = 10\`
1. \`+6\` auf beiden Seiten → \`4x = 16\`
2. \`:4\` → \`x = 4\`
3. Probe: \`4 · 4 - 6 = 10\` ✓

Genau dieses Schema kannst du auf deine Aufgabe übertragen.`;
  }

  if (solution === null) {
    return `### Hinweis zur Gleichung

In \`${term} = 0\` hebt sich das \`x\` auf. Dann gibt es entweder **keine Lösung** oder **unendlich viele**
– je nachdem, ob die verbleibende Aussage falsch oder wahr ist. Schau dir das Ergebnis der Umformung genau an.`;
  }

  const calculation = `1. **Gleichung ordnen:** alles auf eine Seite bringen → \`${term} = 0\`.
2. **Zahl auf die andere Seite:** \`${fmt(a)}x = ${fmt(-b)}\`
3. **Durch ${fmt(a)} teilen:** \`x = ${fmt(-b)} / ${fmt(a)} = ${fmt(solution)}\`
4. **Probe:** \`${fmt(a)} · ${fmt(solution)} ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))} = ${fmt(round(a * solution + b))}\` → 0 ✓`;

  if (mode === 'check') {
    return checkAgainstValues(userSolution, [solution], {
      subjectLine: `Ich habe \`${term} = 0\` selbst nachgerechnet.`,
      calculation,
      expectedText: `Meine Lösung: **x = ${fmt(solution)}**`,
    });
  }

  if (mode === 'solution') {
    return `### Vollständige Lösung

${calculation}

**Ergebnis: x = ${fmt(solution)}**`;
  }

  return `### Schritt für Schritt

${calculation}

**Ergebnis: x = ${fmt(solution)}**`;
}

function derivativeAnswer(mode, analysis, userSolution) {
  const { coefficients } = analysis;
  const derived = derivePolynomial(coefficients);
  const term = polynomialToString(coefficients);
  const derivedTerm = polynomialToString(derived);

  if (mode === 'hint') {
    return `### Hinweis

Du sollst \`f(x) = ${term}\` ableiten.

- Wende auf **jeden Summanden einzeln** die Potenzregel an: aus \`x^n\` wird \`n · x^(n-1)\`.
- Eine reine Zahl (ohne \`x\`) fällt beim Ableiten weg.

Damit kommst du direkt zum Ziel.`;
  }

  if (mode === 'explain') {
    return `### Worum geht es hier?

Die **Ableitung** \`f'(x)\` gibt die Steigung der Funktion an jeder Stelle an.

Wichtigste Regeln für Polynome:
1. **Potenzregel:** \`x^n → n · x^(n-1)\`
2. **Faktorregel:** ein Vorfaktor bleibt stehen (\`3x² → 6x\`)
3. **Summenregel:** jeder Summand wird einzeln abgeleitet
4. **Konstante:** \`c → 0\`

**Beispiel (nicht deine Aufgabe):** \`f(x) = 4x³ - 2x + 7\` → \`f'(x) = 12x² - 2\`.

Übertrage das nun auf deine Funktion.`;
  }

  const calculation = Object.keys(coefficients)
    .map(Number)
    .filter((degree) => Math.abs(coefficients[degree]) > 1e-12)
    .sort((x, y) => y - x)
    .map((degree) => {
      const value = coefficients[degree];
      if (degree === 0) return `- \`${fmt(value)}\` ist konstant → \`0\``;
      if (degree === 1) return `- \`${fmt(value)}x\` → \`${fmt(value)}\``;
      return `- \`${fmt(value)}x^${degree}\` → \`${fmt(value * degree)}x^${degree - 1}\``;
    })
    .join('\n');

  const body = `Ableitung Summand für Summand (Potenzregel \`x^n → n·x^(n-1)\`):

${calculation}

Zusammengesetzt: \`f'(x) = ${derivedTerm}\``;

  if (mode === 'check') {
    const clean = String(userSolution ?? '').trim();
    const parsedUser = parsePolynomial(stripToExpression(clean.replace(/f'?\s*\(\s*x\s*\)\s*=/i, '')));
    const correct = parsedUser && polynomialToString(parsedUser) === derivedTerm;

    if (!clean) {
      return `### Noch keine Lösung eingegeben

Schreib deine Ableitung in das Feld "Deine Lösung", dann vergleiche ich sie mit meiner Rechnung.`;
    }

    return `### Überprüfung

${body}

**Vergleich:** Du hast \`${clean}\` angegeben.
${correct ? '- Das stimmt mit meiner Rechnung überein ✓' : `- Meine Rechnung liefert \`${derivedTerm}\`. Vergleiche vor allem die Vorfaktoren und die Exponenten – dort passieren die meisten Fehler.`}`;
  }

  if (mode === 'solution') {
    return `### Vollständige Lösung

${body}

**Ergebnis: f'(x) = ${derivedTerm}**`;
  }

  return `### Schritt für Schritt

${body}

**Ergebnis: f'(x) = ${derivedTerm}**

Tipp: Setze eine Zahl ein und vergleiche mit der Steigung im Graphen – so prüfst du dich selbst.`;
}

/** Zahlen aus der Nutzereingabe mit der eigenen Rechnung vergleichen. */
function checkAgainstValues(userSolution, expectedValues, { subjectLine, calculation, expectedText }) {
  const clean = String(userSolution ?? '').trim();

  if (!clean) {
    return `### Noch keine Lösung eingegeben

Trag deine eigene Lösung in das Feld "Deine Lösung" ein – danach rechne ich nach und sage dir,
wo genau ein möglicher Fehler liegt.`;
  }

  const numbers = (clean.match(/-?\d+(?:[.,]\d+)?/g) ?? []).map((value) => Number(value.replace(',', '.')));
  const matched = expectedValues.filter((expected) =>
    numbers.some((value) => Math.abs(value - expected) < 1e-6),
  );
  const missing = expectedValues.filter((expected) => !matched.includes(expected));
  const extra = numbers.filter((value) => !expectedValues.some((expected) => Math.abs(value - expected) < 1e-6));

  const verdict = [];
  if (expectedValues.length && matched.length === expectedValues.length && !extra.length) {
    verdict.push('- Alle Werte stimmen mit meiner Rechnung überein ✓');
  } else {
    if (matched.length) verdict.push(`- Richtig erkannt: ${matched.map(fmt).join(', ')}`);
    if (missing.length) verdict.push(`- Es fehlt: ${missing.map(fmt).join(', ')}`);
    if (extra.length) {
      verdict.push(`- Diese Werte finde ich nicht: ${extra.map(fmt).join(', ')} – prüfe dort deine Umformung.`);
    }
  }

  return `### Überprüfung

${subjectLine}

${calculation}

${expectedText}

**Deine Eingabe:** \`${clean.slice(0, 200)}\`

${verdict.join('\n')}

*Wichtig:* Ich vergleiche hier die Zahlenwerte. Schau dir zusätzlich an, ob dein **Rechenweg**
mit den Schritten oben übereinstimmt – das zählt in der Klausur genauso.`;
}

function genericAnswer(mode, question, subject, userSolution) {
  const topic = subject ? ` im Fach **${subject}**` : '';
  const quoted = question.trim() ? `„${question.trim().slice(0, 300)}”` : 'deiner Aufgabe';

  const demoNote = `*Demo-Modus:* Diese Aufgabe kann der Offline-Tutor nicht selbst durchrechnen.
Sobald ein KI-Anbieter im Server hinterlegt ist (siehe README), bekommst du hier eine echte,
inhaltliche Antwort. Die folgende Struktur hilft dir trotzdem beim Start.`;

  const strategies = {
    hint: `### Hinweis

Zu ${quoted}${topic}:

- Markiere zuerst alle **gegebenen Grössen** und das **Gesuchte**.
- Überlege, welche Regel, Formel oder Methode aus dem Unterricht genau diese beiden verbindet.
- Formuliere den ersten Schritt in eigenen Worten, bevor du rechnest oder schreibst.

${demoNote}`,

    steps: `### Vorgehen Schritt für Schritt

1. **Verstehen:** Gib ${quoted} in eigenen Worten wieder.
2. **Sammeln:** Was ist gegeben, was ist gesucht, welche Einheiten oder Begriffe kommen vor?
3. **Planen:** Welche Regel/Formel/Methode passt? Notiere sie zuerst allgemein.
4. **Durchführen:** Rechne bzw. schreibe Schritt für Schritt, jede Zeile nachvollziehbar.
5. **Prüfen:** Ergibt das Ergebnis inhaltlich Sinn? Passt die Grössenordnung, die Einheit, die Fragestellung?

${demoNote}`,

    explain: `### Thema einordnen

Um ${quoted}${topic} zu bearbeiten, klär zuerst diese drei Fragen:

1. **Welcher Themenbereich** wird geprüft (z.B. Analysis, Textanalyse, Stoffwechsel)?
2. **Welches Grundprinzip** steckt dahinter – eine Definition, ein Gesetz, ein Verfahren?
3. **Woran erkennst du** ähnliche Aufgaben in Zukunft wieder?

Schlag die passende Stelle im Heft oder Buch nach und schreibe die Kernregel in einem Satz auf.
Wenn du sie in einem Satz erklären kannst, hast du das Thema verstanden.

${demoNote}`,

    check: `### Überprüfung

${userSolution?.trim() ? `**Deine Lösung:** \`${userSolution.trim().slice(0, 300)}\`` : '**Du hast noch keine eigene Lösung eingetragen.**'}

Prüfe deine Lösung anhand dieser Punkte:

1. Beantwortet sie **genau die gestellte Frage**?
2. Ist **jeder Schritt begründet** – oder gibt es Sprünge?
3. Stimmen **Einheiten, Vorzeichen und Grössenordnung**?
4. Hältst du die Probe bzw. die Gegenprobe aus?

${demoNote}`,

    solution: `### Lösung

Der Offline-Tutor kann ${quoted} nicht zuverlässig lösen und rät hier bewusst **nicht**.

Eine erfundene Lösung wäre schlimmer als keine. Zwei verlässliche Wege:

1. Arbeite mit "Schritt für Schritt": Das dortige Schema führt dich durch die Aufgabe.
2. Hinterlege einen KI-Anbieter im Server (siehe README) – dann antwortet hier ein echtes Sprachmodell.

${demoNote}`,
  };

  return strategies[mode] ?? strategies.hint;
}
