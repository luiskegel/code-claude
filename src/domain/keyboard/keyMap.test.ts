import { describe, expect, it } from 'vitest';
import { FINGER_INFO } from './fingers';
import { getKeyStroke, keyLabelForChar, printableChar, spokenChar, statKeyForChar } from './keyMap';
import { KEYBOARD_LAYOUTS, KEYBOARD_LAYOUT_IDS } from './layouts';

const apple = KEYBOARD_LAYOUTS['apple-de'];

const EXPECTED_FINGERS: Record<string, string> = {
  q: 'left-pinky',
  a: 'left-pinky',
  y: 'left-pinky',
  w: 'left-ring',
  s: 'left-ring',
  x: 'left-ring',
  e: 'left-middle',
  d: 'left-middle',
  c: 'left-middle',
  r: 'left-index',
  t: 'left-index',
  f: 'left-index',
  g: 'left-index',
  v: 'left-index',
  b: 'left-index',
  z: 'right-index',
  u: 'right-index',
  h: 'right-index',
  j: 'right-index',
  n: 'right-index',
  m: 'right-index',
  i: 'right-middle',
  k: 'right-middle',
  ',': 'right-middle',
  o: 'right-ring',
  l: 'right-ring',
  '.': 'right-ring',
  p: 'right-pinky',
  ü: 'right-pinky',
  ö: 'right-pinky',
  ä: 'right-pinky',
  ß: 'right-pinky',
  '-': 'right-pinky',
  ' ': 'thumb',
  '\n': 'right-pinky',
};

describe('Fingerzuordnung (deutsche QWERTZ-Tastatur)', () => {
  it.each(Object.entries(EXPECTED_FINGERS))('„%s“ gehört zu %s', (char, finger) => {
    for (const id of KEYBOARD_LAYOUT_IDS) {
      expect(getKeyStroke(KEYBOARD_LAYOUTS[id], char)?.finger).toBe(finger);
    }
  });

  it('liegt Z oben und Y unten (QWERTZ statt QWERTY)', () => {
    const z = getKeyStroke(apple, 'z');
    const y = getKeyStroke(apple, 'y');
    expect(z?.key.row).toBe(1);
    expect(y?.key.row).toBe(3);
  });

  it('markiert F und J als fühlbare Orientierungstasten', () => {
    const bumps = apple.keys.filter((key) => key.bump).map((key) => key.label);
    expect(bumps).toEqual(['F', 'J']);
  });

  it('kennzeichnet die Grundreihe A S D F J K L Ö', () => {
    const home = apple.keys.filter((key) => key.homeRow).map((key) => key.label);
    expect(home).toEqual(['A', 'S', 'D', 'F', 'J', 'K', 'L', 'Ö']);
  });
});

describe('Umschalttaste', () => {
  it('nutzt für Großbuchstaben die Umschalttaste der anderen Hand', () => {
    const upperA = getKeyStroke(apple, 'A');
    expect(upperA?.shift).toBe(true);
    expect(upperA?.shiftKey?.id).toBe('ShiftRight');
    expect(upperA?.key.id).toBe('KeyA');

    const upperK = getKeyStroke(apple, 'K');
    expect(upperK?.shiftKey?.id).toBe('ShiftLeft');

    const question = getKeyStroke(apple, '?');
    expect(question?.key.id).toBe('Minus');
    expect(question?.shiftKey?.id).toBe('ShiftLeft');
  });

  it('braucht für Kleinbuchstaben und Leertaste keine Umschalttaste', () => {
    expect(getKeyStroke(apple, 'a')?.shift).toBe(false);
    expect(getKeyStroke(apple, ' ')?.shift).toBe(false);
    expect(getKeyStroke(apple, 'Ü')?.shift).toBe(true);
  });
});

describe('Layouts', () => {
  it.each(KEYBOARD_LAYOUT_IDS)('%s ist in jeder Reihe 15 Einheiten breit', (id) => {
    const layout = KEYBOARD_LAYOUTS[id];
    const enter = layout.keys.find((key) => key.isoEnter);
    for (let row = 0; row < layout.rows; row++) {
      const edges = layout.keys.filter((key) => key.row === row).map((key) => key.x + key.width);
      if (row === 2 && enter?.isoEnter) {
        edges.push(enter.isoEnter.lowerX + enter.isoEnter.lowerWidth);
      }
      expect(Math.max(...edges)).toBeCloseTo(15, 5);
    }
  });

  it.each(KEYBOARD_LAYOUT_IDS)('%s hat keine überlappenden Tasten', (id) => {
    const layout = KEYBOARD_LAYOUTS[id];
    for (let row = 0; row < layout.rows; row++) {
      // Halbhohe Pfeiltasten liegen übereinander und werden getrennt betrachtet.
      const keys = layout.keys
        .filter((key) => key.row === row && (key.yOffset ?? 0) === 0 && key.height === undefined)
        .sort((a, b) => a.x - b.x);
      for (let index = 1; index < keys.length; index++) {
        const previous = keys[index - 1]!;
        expect(previous.x + previous.width).toBeLessThanOrEqual((keys[index]?.x ?? 0) + 1e-9);
      }
    }
  });

  it('hat eindeutige Tasten-IDs', () => {
    for (const id of KEYBOARD_LAYOUT_IDS) {
      const ids = KEYBOARD_LAYOUTS[id].keys.map((key) => key.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('weist jedem Finger einen gültigen Eintrag zu', () => {
    for (const key of apple.keys) {
      if (key.finger) expect(FINGER_INFO[key.finger]).toBeDefined();
    }
  });
});

describe('Beschriftungen', () => {
  it('normalisiert Statistik-Schlüssel auf Kleinbuchstaben', () => {
    expect(statKeyForChar('S')).toBe('s');
    expect(statKeyForChar('Ü')).toBe('ü');
    expect(statKeyForChar('ß')).toBe('ß');
    expect(statKeyForChar('?')).toBe('?');
  });

  it('liefert verständliche Namen', () => {
    expect(keyLabelForChar('a')).toBe('A');
    expect(keyLabelForChar(' ')).toBe('Leertaste');
    expect(keyLabelForChar('\n')).toBe('Enter');
    expect(keyLabelForChar('ß')).toBe('ß');
    expect(printableChar(' ')).toBe('Leerzeichen');
    expect(spokenChar('A')).toBe('großes A');
    expect(spokenChar(',')).toBe('Komma');
  });
});
