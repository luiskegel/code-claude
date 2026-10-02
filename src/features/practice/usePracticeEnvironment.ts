import { useMemo } from 'react';
import { getCharMap } from '../../domain/keyboard/keyMap';
import { getKeyboardLayout, type KeyboardLayout } from '../../domain/keyboard/layouts';
import { computeCharWeights } from '../../domain/progress/statistics';
import { useReducedMotion } from '../../lib/hooks';
import { useProgress, useSettings } from '../../state/hooks';

/** Tasten, die zu den gegebenen Zeichen gehören (inkl. Umschalttasten für Großbuchstaben). */
export function keyIdsForChars(layout: KeyboardLayout, chars: Iterable<string>): Set<string> {
  const charMap = getCharMap(layout);
  const ids = new Set<string>();
  for (const char of chars) {
    const stroke = charMap.get(char);
    if (!stroke) continue;
    ids.add(stroke.key.id);
    if (stroke.shiftKey) ids.add(stroke.shiftKey.id);
  }
  return ids;
}

/** Gemeinsame Grundlagen für Lektionen und „Fehler wiederholen“. */
export function usePracticeEnvironment() {
  const settings = useSettings();
  const progress = useProgress();
  const layout = getKeyboardLayout(settings.keyboardLayout);
  const reducedMotion = useReducedMotion(settings.animationsEnabled);
  const charWeights = useMemo(() => computeCharWeights(progress.history), [progress.history]);
  return { settings, progress, layout, reducedMotion, charWeights };
}
