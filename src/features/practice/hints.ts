import { FINGER_INFO, type Finger, type FingerKind } from '../../domain/keyboard/fingers';
import { getKeyStroke, keyLabelForChar, printableChar } from '../../domain/keyboard/keyMap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import type { TypingError } from '../../domain/typing/engine';

export interface TargetInfo {
  char: string;
  keyId: string;
  keyLabel: string;
  finger: Finger;
  fingerKind: FingerKind;
  fingerLabel: string;
  /** Umschalttaste der anderen Hand, falls nötig */
  shift?: { keyId: string; label: string; finger: Finger; fingerKind: FingerKind };
}

/** Welche Taste und welcher Finger als Nächstes dran sind. */
export function describeTarget(
  layout: KeyboardLayout,
  char: string | undefined,
): TargetInfo | null {
  if (char === undefined) return null;
  const stroke = getKeyStroke(layout, char);
  if (!stroke) return null;
  const info = FINGER_INFO[stroke.finger];
  const target: TargetInfo = {
    char,
    keyId: stroke.key.id,
    keyLabel: keyLabelForChar(char),
    finger: stroke.finger,
    fingerKind: info.kind,
    fingerLabel: info.label,
  };
  if (stroke.shift && stroke.shiftKey?.finger) {
    const shiftFinger = stroke.shiftKey.finger;
    target.shift = {
      keyId: stroke.shiftKey.id,
      label: stroke.shiftKey.id === 'ShiftLeft' ? 'Umschalt links' : 'Umschalt rechts',
      finger: shiftFinger,
      fingerKind: FINGER_INFO[shiftFinger].kind,
    };
  }
  return target;
}

/** Freundlicher, konkreter Hinweis zu einem Tippfehler. */
export function describeError(
  layout: KeyboardLayout,
  error: TypingError,
  capsLockOn: boolean,
): string {
  const { expected, typed } = error;
  const lowerExpected = expected.toLocaleLowerCase('de-DE');
  const lowerTyped = typed.toLocaleLowerCase('de-DE');

  if (capsLockOn && lowerTyped === lowerExpected && typed !== expected) {
    return 'Die Feststelltaste ist aktiv – schalte sie aus, um normal weiterzuschreiben.';
  }
  if (expected === ' ') {
    return 'Hier gehört ein Leerzeichen hin – drücke die Leertaste mit dem Daumen.';
  }
  if (expected === '\n') {
    return 'Hier beginnt eine neue Zeile – drücke Enter mit dem rechten kleinen Finger.';
  }
  const stroke = getKeyStroke(layout, expected);
  if (lowerTyped === lowerExpected && typed !== expected) {
    if (stroke?.shift) {
      const side = stroke.shiftKey?.id === 'ShiftLeft' ? 'linke' : 'rechte';
      return `Großbuchstabe: Halte die ${side} Umschalttaste gedrückt und tippe ${expected}.`;
    }
    return `Hier ist ein kleines ${expected} gefragt – ohne Umschalttaste.`;
  }
  const finger = stroke ? FINGER_INFO[stroke.finger].dative : null;
  const typedLabel = printableChar(typed);
  const expectedLabel = printableChar(expected);
  return finger
    ? `Du hast „${typedLabel}“ getippt. Richtig ist „${expectedLabel}“ – mit ${finger}.`
    : `Du hast „${typedLabel}“ getippt. Richtig ist „${expectedLabel}“.`;
}

/** Tastenfolge für Screenreader, z. B. „Nächstes Zeichen: großes A“. */
export function spokenTarget(target: TargetInfo | null): string {
  if (!target) return '';
  const charName = target.char === ' ' ? 'Leertaste' : target.char === '\n' ? 'Enter' : target.char;
  return `Nächstes Zeichen: ${charName}${target.shift ? ' mit Umschalttaste' : ''}, ${target.fingerLabel}.`;
}
