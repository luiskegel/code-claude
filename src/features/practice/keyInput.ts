/** Was ein Tastendruck im Übungsmodus bedeutet. */
export type KeyAction =
  { type: 'char'; char: string } | { type: 'backspace'; wholeWord: boolean } | { type: 'escape' };

export interface KeyEventLike {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  repeat: boolean;
  isComposing?: boolean;
  keyCode?: number;
}

/** Tastencode, den Browser während einer Texteingabe-Komposition (IME, Bildschirmtastatur) melden. */
const COMPOSITION_KEY_CODE = 229;

/**
 * Übersetzt ein Tastaturereignis in eine Übungsaktion.
 * - Zeichen kommen aus event.key – so funktionieren Umlaute, ß und Großbuchstaben unabhängig vom Gerät.
 * - Kürzel mit cmd/Strg (z. B. Neu laden) werden nicht als Tippfehler gezählt.
 * - AltGr (Strg+Alt unter Windows) und alt/option (macOS) dürfen Zeichen erzeugen.
 * - Gehaltene Tasten (Auto-Repeat) zählen nicht als neue Anschläge.
 */
/**
 * Eingabearten, die kein Tippen sind: Einfügen, Hineinziehen und automatische Ersetzungen
 * (Autokorrektur, Diktat). Werte laut W3C „Input Events“: insertFromPaste, insertFromDrop,
 * insertFromYank, insertFromPasteAsQuotation, insertReplacementText.
 */
export function isForeignInput(inputType: string | undefined): boolean {
  if (!inputType) return false;
  return inputType.startsWith('insertFrom') || inputType === 'insertReplacementText';
}

export function interpretKey(event: KeyEventLike): KeyAction | null {
  if (event.isComposing || event.keyCode === COMPOSITION_KEY_CODE) return null;
  const { key } = event;

  if (key === 'Escape') return { type: 'escape' };
  if (key === 'Backspace') {
    if (event.metaKey) return null;
    return { type: 'backspace', wholeWord: event.altKey || event.ctrlKey };
  }
  if (event.metaKey) return null;
  if (event.ctrlKey && !event.altKey) return null;
  if (event.repeat) return null;
  if (key === 'Enter') return { type: 'char', char: '\n' };
  if (key === 'Tab') return null;
  if (Array.from(key).length === 1) return { type: 'char', char: key };
  return null;
}
