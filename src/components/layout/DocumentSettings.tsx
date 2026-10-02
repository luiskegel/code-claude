import { useEffect } from 'react';
import { useResolvedTheme } from '../../lib/hooks';
import { useSettings } from '../../state/hooks';

const THEME_COLOR = { light: '#f5f5f7', dark: '#0f0f11' } as const;

/** Überträgt Theme und Animationseinstellung auf das <html>-Element. */
export function DocumentSettings() {
  const { theme, animationsEnabled } = useSettings();
  const resolved = useResolvedTheme(theme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[resolved]);
  }, [resolved]);

  useEffect(() => {
    const root = document.documentElement;
    if (animationsEnabled) delete root.dataset.motion;
    else root.dataset.motion = 'reduced';
  }, [animationsEnabled]);

  return null;
}
