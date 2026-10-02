export const FINGERS = [
  'left-pinky',
  'left-ring',
  'left-middle',
  'left-index',
  'right-index',
  'right-middle',
  'right-ring',
  'right-pinky',
  'thumb',
] as const;

export type Finger = (typeof FINGERS)[number];

/** Fingertyp unabhängig von der Hand – bestimmt die Farbe (links und rechts gleich). */
export type FingerKind = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';

export type Hand = 'left' | 'right' | 'both';

export interface FingerInfo {
  id: Finger;
  hand: Hand;
  kind: FingerKind;
  /** z. B. „Linker Zeigefinger“ */
  label: string;
  /** Dativ für Sätze wie „Drücke die Taste mit dem linken Zeigefinger.“ */
  dative: string;
}

export const FINGER_INFO: Record<Finger, FingerInfo> = {
  'left-pinky': {
    id: 'left-pinky',
    hand: 'left',
    kind: 'pinky',
    label: 'Linker kleiner Finger',
    dative: 'dem linken kleinen Finger',
  },
  'left-ring': {
    id: 'left-ring',
    hand: 'left',
    kind: 'ring',
    label: 'Linker Ringfinger',
    dative: 'dem linken Ringfinger',
  },
  'left-middle': {
    id: 'left-middle',
    hand: 'left',
    kind: 'middle',
    label: 'Linker Mittelfinger',
    dative: 'dem linken Mittelfinger',
  },
  'left-index': {
    id: 'left-index',
    hand: 'left',
    kind: 'index',
    label: 'Linker Zeigefinger',
    dative: 'dem linken Zeigefinger',
  },
  'right-index': {
    id: 'right-index',
    hand: 'right',
    kind: 'index',
    label: 'Rechter Zeigefinger',
    dative: 'dem rechten Zeigefinger',
  },
  'right-middle': {
    id: 'right-middle',
    hand: 'right',
    kind: 'middle',
    label: 'Rechter Mittelfinger',
    dative: 'dem rechten Mittelfinger',
  },
  'right-ring': {
    id: 'right-ring',
    hand: 'right',
    kind: 'ring',
    label: 'Rechter Ringfinger',
    dative: 'dem rechten Ringfinger',
  },
  'right-pinky': {
    id: 'right-pinky',
    hand: 'right',
    kind: 'pinky',
    label: 'Rechter kleiner Finger',
    dative: 'dem rechten kleinen Finger',
  },
  thumb: {
    id: 'thumb',
    hand: 'both',
    kind: 'thumb',
    label: 'Daumen',
    dative: 'einem Daumen',
  },
};

export const FINGER_KIND_LABELS: Record<FingerKind, string> = {
  pinky: 'Kleiner Finger',
  ring: 'Ringfinger',
  middle: 'Mittelfinger',
  index: 'Zeigefinger',
  thumb: 'Daumen',
};

export const FINGER_KINDS: readonly FingerKind[] = ['pinky', 'ring', 'middle', 'index', 'thumb'];

export function getFingerKind(finger: Finger): FingerKind {
  return FINGER_INFO[finger].kind;
}
