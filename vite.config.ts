/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => ({
  // `--mode artifact`: alles in eine einzige HTML-Datei bündeln (für Claude-Artefakte)
  plugins: mode === 'artifact' ? [react(), viteSingleFile()] : [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    port: 5173,
    // Optionaler Marktdaten-Proxy (siehe server/README.md). API-Schlüssel bleiben auf dem Server.
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
  build:
    mode === 'artifact'
      ? { outDir: 'dist-artifact', chunkSizeWarningLimit: 3000 }
      : {
          chunkSizeWarningLimit: 900,
          rollupOptions: {
            output: {
              manualChunks: {
                react: ['react', 'react-dom', 'react-router-dom'],
                charts: ['recharts'],
              },
            },
          },
        },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}));
