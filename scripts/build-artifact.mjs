/**
 * Baut aus dem Artefakt-Build (`vite build --mode artifact`) eine eigenständige Seite für
 * Claude-Artefakte: Der Host liefert das HTML-Grundgerüst (doctype, head, body) selbst und lädt
 * keine Dateien nach – Stile und Skripte werden deshalb direkt eingebettet.
 *
 * Ergebnis: dist-artifact/typeflow.html
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = 'dist-artifact';
const html = readFileSync(join(OUT_DIR, 'index.html'), 'utf8');

function extract(pattern, label) {
  const match = html.match(pattern);
  if (!match) throw new Error(`index.html: ${label} nicht gefunden`);
  return match[1] ?? match[0];
}

// Der Seitenname ohne Untertitel – im Artefakt-Katalog erscheint nur der Name.
const title = extract(/<title>([^<]*)<\/title>/, 'Titel')
  .split(' – ')[0]
  .trim();
const themeScript = extract(/<script>([\s\S]*?)<\/script>/, 'Theme-Skript').trim();
const noscript = extract(/<noscript>[\s\S]*?<\/noscript>/, 'noscript-Hinweis');
const scriptPath = extract(/<script type="module"[^>]*\ssrc="([^"]+)"/, 'App-Skript');
const stylePath = extract(/<link rel="stylesheet"[^>]*\shref="([^"]+)"/, 'Stylesheet');

const read = (path) => readFileSync(join(OUT_DIR, path), 'utf8');
// Eingebettete Inhalte dürfen ihr Element nicht vorzeitig beenden.
const script = read(scriptPath)
  .replace(/<\/script/gi, '<\\/script')
  .replace(/<!--/g, '<\\!--');
const style = read(stylePath).replace(/<\/style/gi, '<\\/style');

const page = [
  `<title>${title}</title>`,
  `<style>${style}</style>`,
  `<script>${themeScript}</script>`,
  noscript,
  '<div id="root"></div>',
  `<script type="module">${script}</script>`,
  '',
].join('\n');

writeFileSync(join(OUT_DIR, 'typeflow.html'), page);
console.log(`Artefakt-Seite: ${OUT_DIR}/typeflow.html (${Math.round(page.length / 1024)} kB)`);
