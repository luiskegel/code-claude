import type { Finger } from './fingers';

export type KeyboardLayoutId = 'apple-de' | 'standard-de';

export type KeyKind =
  'char' | 'space' | 'enter' | 'backspace' | 'shift' | 'tab' | 'caps' | 'modifier' | 'arrow';

export interface KeyDefinition {
  /** Physischer Tastencode im Stil von KeyboardEvent.code – eindeutig innerhalb eines Layouts. */
  id: string;
  kind: KeyKind;
  /** Reihe von oben (0 = Zahlenreihe) */
  row: number;
  /** Position und Breite in Tasteneinheiten (1 = Buchstabentaste) */
  x: number;
  width: number;
  /** Vertikaler Versatz und Höhe in Tasteneinheiten (für halbhohe Pfeiltasten) */
  yOffset?: number;
  height?: number;
  label: string;
  /** Zweite Beschriftung, z. B. „!“ über der „1“ */
  secondaryLabel?: string;
  /** Zeichen ohne Umschalttaste */
  base?: string;
  /** Zeichen mit Umschalttaste */
  shifted?: string;
  finger?: Finger;
  homeRow?: boolean;
  /** Fühlbare Markierung (F und J) */
  bump?: boolean;
  /** ISO-Enter in L-Form: x/width beschreiben den oberen Teil, lower* den unteren. */
  isoEnter?: { lowerX: number; lowerWidth: number };
  /** Sprechender Name für Hinweise und Screenreader */
  spokenName: string;
}

export interface KeyboardLayout {
  id: KeyboardLayoutId;
  name: string;
  shortName: string;
  description: string;
  /** Gesamtbreite in Tasteneinheiten */
  width: number;
  rows: number;
  keys: readonly KeyDefinition[];
}

type KeySpec = Omit<KeyDefinition, 'row' | 'x' | 'width'> & { width?: number };

/** Legt Tasten einer Reihe lückenlos von links nach rechts an. */
function row(rowIndex: number, specs: KeySpec[]): KeyDefinition[] {
  let x = 0;
  return specs.map((spec) => {
    const width = spec.width ?? 1;
    const key: KeyDefinition = { ...spec, row: rowIndex, x, width };
    x += width;
    return key;
  });
}

function letter(id: string, letterChar: string, finger: Finger, extra: Partial<KeySpec> = {}) {
  const upper = letterChar.toLocaleUpperCase('de-DE');
  return {
    id,
    kind: 'char',
    label: upper,
    base: letterChar,
    shifted: upper,
    finger,
    spokenName: upper,
    ...extra,
  } satisfies KeySpec;
}

function symbol(
  id: string,
  base: string,
  shifted: string,
  finger: Finger,
  spokenName: string,
): KeySpec {
  return {
    id,
    kind: 'char',
    label: base,
    secondaryLabel: shifted,
    base,
    shifted,
    finger,
    spokenName,
  };
}

interface ModifierLabels {
  tab: string;
  caps: string;
  shift: string;
  backspace: string;
  enter: string;
}

/** Zahlen-, obere, mittlere und untere Reihe sind bei allen deutschen ISO-Tastaturen identisch. */
function alphanumericRows(labels: ModifierLabels): KeyDefinition[] {
  return [
    ...row(0, [
      {
        id: 'Backquote',
        kind: 'char',
        label: '^',
        secondaryLabel: '°',
        finger: 'left-pinky',
        spokenName: 'Zirkumflex',
      },
      symbol('Digit1', '1', '!', 'left-pinky', 'Eins'),
      symbol('Digit2', '2', '"', 'left-ring', 'Zwei'),
      symbol('Digit3', '3', '§', 'left-middle', 'Drei'),
      symbol('Digit4', '4', '$', 'left-index', 'Vier'),
      symbol('Digit5', '5', '%', 'left-index', 'Fünf'),
      symbol('Digit6', '6', '&', 'right-index', 'Sechs'),
      symbol('Digit7', '7', '/', 'right-index', 'Sieben'),
      symbol('Digit8', '8', '(', 'right-middle', 'Acht'),
      symbol('Digit9', '9', ')', 'right-ring', 'Neun'),
      symbol('Digit0', '0', '=', 'right-pinky', 'Null'),
      symbol('Minus', 'ß', '?', 'right-pinky', 'ß'),
      {
        id: 'Equal',
        kind: 'char',
        label: '´',
        secondaryLabel: '`',
        finger: 'right-pinky',
        spokenName: 'Akut',
      },
      {
        id: 'Backspace',
        kind: 'backspace',
        label: labels.backspace,
        width: 2,
        finger: 'right-pinky',
        spokenName: 'Rücktaste',
      },
    ]),
    ...row(1, [
      {
        id: 'Tab',
        kind: 'tab',
        label: labels.tab,
        width: 1.5,
        finger: 'left-pinky',
        spokenName: 'Tabulator',
      },
      letter('KeyQ', 'q', 'left-pinky'),
      letter('KeyW', 'w', 'left-ring'),
      letter('KeyE', 'e', 'left-middle'),
      letter('KeyR', 'r', 'left-index'),
      letter('KeyT', 't', 'left-index'),
      letter('KeyY', 'z', 'right-index'),
      letter('KeyU', 'u', 'right-index'),
      letter('KeyI', 'i', 'right-middle'),
      letter('KeyO', 'o', 'right-ring'),
      letter('KeyP', 'p', 'right-pinky'),
      letter('BracketLeft', 'ü', 'right-pinky'),
      symbol('BracketRight', '+', '*', 'right-pinky', 'Plus'),
      {
        id: 'Enter',
        kind: 'enter',
        label: labels.enter,
        width: 1.5,
        base: '\n',
        finger: 'right-pinky',
        isoEnter: { lowerX: 13.75, lowerWidth: 1.25 },
        spokenName: 'Enter',
      },
    ]),
    ...row(2, [
      {
        id: 'CapsLock',
        kind: 'caps',
        label: labels.caps,
        width: 1.75,
        finger: 'left-pinky',
        spokenName: 'Feststelltaste',
      },
      letter('KeyA', 'a', 'left-pinky', { homeRow: true }),
      letter('KeyS', 's', 'left-ring', { homeRow: true }),
      letter('KeyD', 'd', 'left-middle', { homeRow: true }),
      letter('KeyF', 'f', 'left-index', { homeRow: true, bump: true }),
      letter('KeyG', 'g', 'left-index'),
      letter('KeyH', 'h', 'right-index'),
      letter('KeyJ', 'j', 'right-index', { homeRow: true, bump: true }),
      letter('KeyK', 'k', 'right-middle', { homeRow: true }),
      letter('KeyL', 'l', 'right-ring', { homeRow: true }),
      letter('Semicolon', 'ö', 'right-pinky', { homeRow: true }),
      letter('Quote', 'ä', 'right-pinky'),
      symbol('Backslash', '#', "'", 'right-pinky', 'Raute'),
      // Rest der Reihe belegt der untere Teil der Enter-Taste.
    ]),
    ...row(3, [
      {
        id: 'ShiftLeft',
        kind: 'shift',
        label: labels.shift,
        width: 1.25,
        finger: 'left-pinky',
        spokenName: 'Linke Umschalttaste',
      },
      symbol('IntlBackslash', '<', '>', 'left-pinky', 'Kleiner-als'),
      letter('KeyZ', 'y', 'left-pinky'),
      letter('KeyX', 'x', 'left-ring'),
      letter('KeyC', 'c', 'left-middle'),
      letter('KeyV', 'v', 'left-index'),
      letter('KeyB', 'b', 'left-index'),
      letter('KeyN', 'n', 'right-index'),
      letter('KeyM', 'm', 'right-index'),
      symbol('Comma', ',', ';', 'right-middle', 'Komma'),
      symbol('Period', '.', ':', 'right-ring', 'Punkt'),
      symbol('Slash', '-', '_', 'right-pinky', 'Bindestrich'),
      {
        id: 'ShiftRight',
        kind: 'shift',
        label: labels.shift,
        width: 2.75,
        finger: 'right-pinky',
        spokenName: 'Rechte Umschalttaste',
      },
    ]),
  ];
}

const SPACE_KEY: Omit<KeySpec, 'width'> = {
  id: 'Space',
  kind: 'space',
  label: '',
  base: ' ',
  finger: 'thumb',
  spokenName: 'Leertaste',
};

const appleKeys: KeyDefinition[] = [
  ...alphanumericRows({ tab: '⇥', caps: '⇪', shift: '⇧', backspace: '⌫', enter: '↩' }),
  ...row(4, [
    { id: 'Fn', kind: 'modifier', label: 'fn', spokenName: 'Funktionstaste' },
    {
      id: 'ControlLeft',
      kind: 'modifier',
      label: '⌃',
      secondaryLabel: 'ctrl',
      spokenName: 'Control',
    },
    { id: 'AltLeft', kind: 'modifier', label: '⌥', secondaryLabel: 'alt', spokenName: 'Option' },
    {
      id: 'MetaLeft',
      kind: 'modifier',
      label: '⌘',
      secondaryLabel: 'cmd',
      width: 1.25,
      spokenName: 'Befehlstaste',
    },
    { ...SPACE_KEY, width: 5.5 },
    {
      id: 'MetaRight',
      kind: 'modifier',
      label: '⌘',
      secondaryLabel: 'cmd',
      width: 1.25,
      spokenName: 'Befehlstaste',
    },
    { id: 'AltRight', kind: 'modifier', label: '⌥', secondaryLabel: 'alt', spokenName: 'Option' },
  ]),
  // Pfeiltasten des Magic Keyboard: halbhoch, ↑ und ↓ übereinander.
  {
    id: 'ArrowLeft',
    kind: 'arrow',
    label: '◀',
    row: 4,
    x: 12,
    width: 1,
    yOffset: 0.5,
    height: 0.5,
    spokenName: 'Pfeil links',
  },
  {
    id: 'ArrowUp',
    kind: 'arrow',
    label: '▲',
    row: 4,
    x: 13,
    width: 1,
    yOffset: 0,
    height: 0.5,
    spokenName: 'Pfeil hoch',
  },
  {
    id: 'ArrowDown',
    kind: 'arrow',
    label: '▼',
    row: 4,
    x: 13,
    width: 1,
    yOffset: 0.5,
    height: 0.5,
    spokenName: 'Pfeil runter',
  },
  {
    id: 'ArrowRight',
    kind: 'arrow',
    label: '▶',
    row: 4,
    x: 14,
    width: 1,
    yOffset: 0.5,
    height: 0.5,
    spokenName: 'Pfeil rechts',
  },
];

const standardKeys: KeyDefinition[] = [
  ...alphanumericRows({ tab: '↹', caps: '⇪', shift: '⇧', backspace: '⟵', enter: '↵' }),
  ...row(4, [
    { id: 'ControlLeft', kind: 'modifier', label: 'Strg', width: 1.25, spokenName: 'Steuerung' },
    { id: 'MetaLeft', kind: 'modifier', label: '⊞', width: 1.25, spokenName: 'Windows-Taste' },
    { id: 'AltLeft', kind: 'modifier', label: 'Alt', width: 1.25, spokenName: 'Alt' },
    { ...SPACE_KEY, width: 6.25 },
    { id: 'AltRight', kind: 'modifier', label: 'Alt Gr', width: 1.25, spokenName: 'Alt Gr' },
    { id: 'MetaRight', kind: 'modifier', label: '⊞', width: 1.25, spokenName: 'Windows-Taste' },
    { id: 'ContextMenu', kind: 'modifier', label: '≣', width: 1.25, spokenName: 'Menü' },
    { id: 'ControlRight', kind: 'modifier', label: 'Strg', width: 1.25, spokenName: 'Steuerung' },
  ]),
];

export const KEYBOARD_LAYOUTS: Record<KeyboardLayoutId, KeyboardLayout> = {
  'apple-de': {
    id: 'apple-de',
    name: 'Apple Magic Keyboard (Deutsch)',
    shortName: 'Apple Magic Keyboard',
    description: 'Deutsche QWERTZ-Belegung mit cmd-, alt- und fn-Taste.',
    width: 15,
    rows: 5,
    keys: appleKeys,
  },
  'standard-de': {
    id: 'standard-de',
    name: 'Standard-Tastatur (Deutsch, QWERTZ)',
    shortName: 'Standard QWERTZ',
    description: 'Klassische deutsche PC-Tastatur mit Strg-, Alt- und Windows-Taste.',
    width: 15,
    rows: 5,
    keys: standardKeys,
  },
};

export const KEYBOARD_LAYOUT_IDS = Object.keys(KEYBOARD_LAYOUTS) as KeyboardLayoutId[];

export function isKeyboardLayoutId(value: unknown): value is KeyboardLayoutId {
  return typeof value === 'string' && value in KEYBOARD_LAYOUTS;
}

export function getKeyboardLayout(id: KeyboardLayoutId): KeyboardLayout {
  return KEYBOARD_LAYOUTS[id];
}
