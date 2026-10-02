/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { BRAND } from './src/config/brand.ts';
import { STORAGE_KEYS } from './src/config/storageKeys.ts';

/** Ersetzt Platzhalter in index.html, damit Name und Speicherschlüssel nur einmal definiert sind. */
function htmlPlaceholders(): Plugin {
  const replacements: Record<string, string> = {
    '%BRAND_NAME%': BRAND.name,
    '%BRAND_TAGLINE%': BRAND.tagline,
    '%SETTINGS_KEY%': STORAGE_KEYS.settings,
  };
  return {
    name: 'typeflow-html-placeholders',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [placeholder, value]) => result.replaceAll(placeholder, value),
        html,
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  // Modus „artifact“ erzeugt ein einziges Skript mit relativen Pfaden – daraus baut
  // scripts/build-artifact.mjs eine eigenständige Seite für Claude-Artefakte.
  base: mode === 'artifact' ? './' : '/',
  plugins: [react(), tailwindcss(), htmlPlaceholders()],
  build:
    mode === 'artifact'
      ? // Absichtlich ein einziges Skript, da es eingebettet wird – die Größenwarnung entfällt.
        { outDir: 'dist-artifact', modulePreload: false, chunkSizeWarningLimit: 700 }
      : {
          rolldownOptions: {
            output: {
              // Bibliotheken ändern sich selten – eigener Chunk, damit Browser sie länger cachen.
              codeSplitting: {
                groups: [{ name: 'vendor', test: /[\\/]node_modules[\\/]/ }],
              },
            },
          },
        },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
}));
