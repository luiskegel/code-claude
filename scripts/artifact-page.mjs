// Wandelt den Single-File-Build in eine Claude-Artefakt-Seite um:
// Claude ergänzt <!doctype>, <html>, <head> und <body> selbst – diese Tags werden entfernt,
// <title> steht ganz oben, Schriften kommen von Google Fonts (einzige erlaubte Font-Quelle).
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist-artifact/index.html', 'utf8');
const styles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join('\n');
const scripts = [...html.matchAll(/<script[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]).join('\n');
const page = `<title>MY STOCK ACADEMY</title>
<meta name="description" content="Meine persönliche Aktien-Akademie: Börse von Grund auf lernen.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
${styles}
<style>:root{color-scheme:dark;background:#070b14}body{background:#070b14;color:#e2e8f0}</style>
<div id="root"></div>
${scripts}
`;
writeFileSync('dist-artifact/my-stock-academy.html', page);
console.log(`Artefakt-Seite: dist-artifact/my-stock-academy.html (${(page.length / 1024).toFixed(0)} KB)`);
