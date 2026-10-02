import { useEffect, useRef } from 'react';
import { useResolvedTheme } from '../../lib/hooks';
import { useSettings } from '../../state/hooks';

const THEME_COLOR = { light: '#f5f5f7', dark: '#0f0f11' } as const;

/**
 * Überträgt Theme und Animationseinstellung auf das <html>-Element.
 * „Hell“ und „Dunkel“ setzen data-theme. Bei „System“ fehlt das Attribut und das CSS folgt
 * prefers-color-scheme – oder einem Attribut, das eine einbettende Seite (z. B. ein
 * Claude-Artefakt) selbst gesetzt hat. Deshalb entfernt die App nur, was sie selbst gesetzt hat.
 */
export function DocumentSettings() {
  const { theme, animationsEnabled } = useSettings();
  const resolved = useResolvedTheme(theme);
  const appliedTheme = useRef<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      if (appliedTheme.current !== null && root.dataset.theme === appliedTheme.current) {
        delete root.dataset.theme;
      }
      appliedTheme.current = null;
    } else {
      root.dataset.theme = theme;
      appliedTheme.current = theme;
    }
  }, [theme]);

  useEffect(() => {
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
