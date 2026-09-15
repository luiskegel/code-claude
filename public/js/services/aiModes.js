/**
 * Gemeinsame Definition der KI-Modi.
 * Diese Datei wird sowohl im Browser als auch vom Node-Server importiert,
 * damit Frontend und Backend exakt dieselben Modi und Regeln verwenden.
 */

export const AI_MODES = [
  {
    id: 'hint',
    name: 'Hinweis',
    description: 'Ein kleiner Anstoss – ohne die Lösung zu verraten.',
    icon: '💡',
  },
  {
    id: 'steps',
    name: 'Schritt für Schritt',
    description: 'Der Lösungsweg, verständlich in einzelnen Schritten.',
    icon: '🪜',
  },
  {
    id: 'explain',
    name: 'Erklärung',
    description: 'Das Thema dahinter einfach erklärt.',
    icon: '📖',
  },
  {
    id: 'check',
    name: 'Lösung überprüfen',
    description: 'Deine eigene Lösung wird nachgerechnet.',
    icon: '✅',
  },
  {
    id: 'solution',
    name: 'Lösung anzeigen',
    description: 'Vollständige Lösung – nur wenn du sie wirklich sehen willst.',
    icon: '🔓',
  },
];

export const MODE_IDS = AI_MODES.map((mode) => mode.id);

export function getMode(id) {
  return AI_MODES.find((mode) => mode.id === id) ?? AI_MODES[0];
}

const BASE_RULES = `Du bist ein geduldiger Lern-Tutor für Schülerinnen und Schüler der Oberstufe (Klasse 10-13).
Sprache: Deutsch, klar und freundlich, kein Fachjargon ohne Erklärung.
Formatiere mit kurzen Absätzen, Listen und **Fettungen**; nutze \`Code\`-Auszeichnung für Formeln.
Rechne immer nachvollziehbar vor und behaupte niemals ohne Begründung, etwas sei richtig oder falsch.
Erfinde keine Quellen und keine Fakten; wenn dir Informationen fehlen, sage das und stelle eine Rückfrage.`;

const MODE_RULES = {
  hint: `Modus "Hinweis": Gib NUR einen Denkanstoss (maximal 3 Sätze plus optional eine Leitfrage).
Nenne auf keinen Fall das Endergebnis und keinen vollständigen Rechenweg.`,
  steps: `Modus "Schritt für Schritt": Erkläre den Lösungsweg in nummerierten Schritten.
Zeige jeden Zwischenschritt mit Rechnung. Das Endergebnis darfst du am Ende nennen und mit einer Probe bestätigen.`,
  explain: `Modus "Erklärung": Erkläre das zugrunde liegende Thema allgemein verständlich.
Nutze ein Beispiel, das nicht identisch mit der Aufgabe ist, und löse die konkrete Aufgabe NICHT vollständig.`,
  check: `Modus "Lösung überprüfen": Rechne die Aufgabe selbst nach, vergleiche mit der eingereichten Lösung.
Sage klar, was richtig ist und wo genau ein Fehler liegt, und erkläre die Ursache des Fehlers.
Zeige deine eigene Rechnung, damit die Bewertung nachvollziehbar ist.`,
  solution: `Modus "Lösung anzeigen": Gib die vollständige Lösung mit Rechenweg, Ergebnis und Probe an.
Schliesse mit einem kurzen Hinweis, worauf man bei ähnlichen Aufgaben achten sollte.`,
};

export function buildSystemPrompt(modeId) {
  return `${BASE_RULES}\n\n${MODE_RULES[modeId] ?? MODE_RULES.hint}`;
}

/** Baut die Nutzernachricht aus Aufgabenkontext, Frage und optionaler eigener Lösung. */
export function buildUserPrompt({ question, subject, taskTitle, userSolution, images = [] }) {
  const parts = [];
  if (subject) parts.push(`Fach: ${subject}`);
  if (taskTitle) parts.push(`Hausaufgabe: ${taskTitle}`);

  if (images.length) {
    parts.push(
      `Oben ${images.length === 1 ? 'siehst du ein Foto' : `siehst du ${images.length} Fotos`} der Aufgabe. ` +
        'Lies die Aufgabenstellung daraus ab. Ist etwas unleserlich, sage das ausdrücklich, statt zu raten.',
    );
  }

  parts.push(`Aufgabe:\n${question || '(siehe Foto)'}`);
  if (userSolution) parts.push(`Meine eigene Lösung:\n${userSolution}`);
  return parts.join('\n\n');
}
