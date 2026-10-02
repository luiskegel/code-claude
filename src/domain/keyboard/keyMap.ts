import { FINGER_INFO, type Finger } from './fingers';
import type { KeyDefinition, KeyboardLayout } from './layouts';

/** Wie ein Zeichen auf der Tastatur erzeugt wird. */
export interface KeyStroke {
  char: string;
  key: KeyDefinition;
  finger: Finger;
  /** Ob die Umschalttaste gehalten werden muss */
  shift: boolean;
  /** Die Umschalttaste der jeweils anderen Hand (Zehn-Finger-Regel) */
  shiftKey?: KeyDefinition;
}

const charMapCache = new WeakMap<KeyboardLayout, Map<string, KeyStroke>>();

function buildCharMap(layout: KeyboardLayout): Map<string, KeyStroke> {
  const map = new Map<string, KeyStroke>();
  const shiftLeft = layout.keys.find((key) => key.id === 'ShiftLeft');
  const shiftRight = layout.keys.find((key) => key.id === 'ShiftRight');

  for (const key of layout.keys) {
    if (!key.finger) continue;
    if (key.base !== undefined && !map.has(key.base)) {
      map.set(key.base, { char: key.base, key, finger: key.finger, shift: false });
    }
    if (key.shifted !== undefined && !map.has(key.shifted)) {
      const hand = FINGER_INFO[key.finger].hand;
      // Großbuchstaben links → rechte Umschalttaste, rechts → linke Umschalttaste.
      const shiftKey = hand === 'left' ? shiftRight : shiftLeft;
      map.set(key.shifted, {
        char: key.shifted,
        key,
        finger: key.finger,
        shift: true,
        ...(shiftKey ? { shiftKey } : {}),
      });
    }
  }
  return map;
}

export function getCharMap(layout: KeyboardLayout): Map<string, KeyStroke> {
  let map = charMapCache.get(layout);
  if (!map) {
    map = buildCharMap(layout);
    charMapCache.set(layout, map);
  }
  return map;
}

export function getKeyStroke(layout: KeyboardLayout, char: string): KeyStroke | undefined {
  return getCharMap(layout).get(char);
}

export function findKey(layout: KeyboardLayout, id: string): KeyDefinition | undefined {
  return layout.keys.find((key) => key.id === id);
}

/** Kann dieses Zeichen mit dem Layout direkt (ohne Tottasten) getippt werden? */
export function isTypeable(layout: KeyboardLayout, char: string): boolean {
  return getCharMap(layout).has(char);
}

/**
 * Normalisiert ein Zeichen für Statistiken: Groß- und Kleinbuchstaben zählen
 * zur selben Taste. Satzzeichen bleiben unverändert.
 */
export function statKeyForChar(char: string): string {
  if (char === 'ẞ') return 'ß';
  return char.toLocaleLowerCase('de-DE');
}

const CHAR_NAMES: Record<string, string> = {
  ' ': 'Leertaste',
  '\n': 'Enter',
  ',': 'Komma',
  '.': 'Punkt',
  '-': 'Bindestrich',
  '?': 'Fragezeichen',
  '!': 'Ausrufezeichen',
  ':': 'Doppelpunkt',
  ';': 'Semikolon',
};

/** Beschriftung, wie sie auf der Taste steht – z. B. „A“ für „a“, „Leertaste“ für " ". */
export function keyLabelForChar(char: string): string {
  const named = CHAR_NAMES[char];
  if (named) return named;
  if (char === 'ß') return 'ß';
  return char.toLocaleUpperCase('de-DE');
}

/** Das tatsächliche Zeichen, mit Namen für unsichtbare Zeichen – z. B. „a“, „A“, „Leerzeichen“. */
export function printableChar(char: string): string {
  if (char === ' ') return 'Leerzeichen';
  if (char === '\n') return 'Zeilenumbruch';
  if (char === '\t') return 'Tabulator';
  return char;
}

/** Beschreibung für Screenreader und Hinweise, z. B. „großes A“ oder „Komma“. */
export function spokenChar(char: string): string {
  const named = CHAR_NAMES[char];
  if (named) return named;
  const lower = char.toLocaleLowerCase('de-DE');
  if (lower !== char) return `großes ${char}`;
  return char;
}
