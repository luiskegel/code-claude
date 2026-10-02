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

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlPlaceholders()],
  build: {
    rolldownOptions: {
      output: {
        // Bibliotheken ändern sich selten – eigener Chunk, damit Browser sie länger cachen können.
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
});
