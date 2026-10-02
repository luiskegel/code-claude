import { FINGER_INFO, getFingerKind, type FingerKind } from '../../domain/keyboard/fingers';
import { findKey, getKeyStroke } from '../../domain/keyboard/keyMap';
import type { KeyboardLayout } from '../../domain/keyboard/layouts';
import type { Lesson } from '../../domain/lessons/types';

export interface KeyBadge {
  id: string;
  /** Kurze Beschriftung für Tastenkappen, z. B. „A", „?" oder „⇧ links" */
  label: string;
  /** Ausgeschriebener Name, z. B. „Linke Umschalttaste" */
  name: string;
  fingerKind?: FingerKind;
  fingerLabel: string;
}

function keyCapLabel(char: string): string {
  if (char === ' ') return 'Leertaste';
  if (char === '\n') return 'Enter';
  return char === 'ß' ? char : char.toLocaleUpperCase('de-DE');
}

/**
 * Was eine Lektion neu einführt – als Tastenkappen mit Finger.
 * Zeigt das tatsächlich gelernte Zeichen (z. B. „?" statt der Taste „ß").
 */
export function getLessonKeyBadges(lesson: Lesson, layout: KeyboardLayout): KeyBadge[] {
  if (lesson.introKeyIds) {
    return lesson.introKeyIds.flatMap((id) => {
      const key = findKey(layout, id);
      if (!key) return [];
      const label =
        key.kind === 'space'
          ? 'Leertaste'
          : key.kind === 'shift'
            ? `⇧ ${id === 'ShiftLeft' ? 'links' : 'rechts'}`
            : key.label;
      return [
        {
          id,
          label,
          name: key.kind === 'shift' || key.kind === 'space' ? key.spokenName : label,
          ...(key.finger ? { fingerKind: getFingerKind(key.finger) } : {}),
          fingerLabel: key.finger ? FINGER_INFO[key.finger].label : '',
        },
      ];
    });
  }

  const chars = lesson.newChars.length > 0 ? lesson.newChars : lesson.focusChars;
  const seen = new Set<string>();
  return chars.flatMap((char) => {
    const stroke = getKeyStroke(layout, char);
    const label = keyCapLabel(char);
    if (!stroke || seen.has(label)) return [];
    seen.add(label);
    return [
      {
        id: `${stroke.key.id}-${char}`,
        label,
        name: label,
        fingerKind: getFingerKind(stroke.finger),
        fingerLabel: FINGER_INFO[stroke.finger].label,
      },
    ];
  });
}
