import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Zwei Bauarten:
 *
 * - Normal (`npm run build`): absolute Pfade, Adressen wie /lernpfad.
 *   Braucht auf dem Server eine Regel, die unbekannte Pfade auf index.html
 *   leitet (siehe public/_redirects und vercel.json).
 *
 * - Artefakt (`npm run build:artifact`): relative Pfade und Adressen über
 *   die Raute (#/lernpfad). Läuft dadurch überall, auch dort, wo man keine
 *   Server-Regeln setzen kann.
 */
export default defineConfig(({ mode }) => {
  const isArtifact = mode === 'artifact'

  return {
    plugins: [react()],
    base: isArtifact ? './' : '/',
    define: {
      __HASH_ROUTER__: JSON.stringify(isArtifact),
    },
    build: {
      target: 'es2020',
      outDir: isArtifact ? 'dist-artifact' : 'dist',
      chunkSizeWarningLimit: 900,
    },
  }
})
