/**
 * Baut die Website als Claude-Artefakt.
 *
 * Unterschiede zum normalen Build:
 *   - relative Pfade und Adressen über die Raute (#/lernpfad), damit die
 *     Seite ohne Server-Regeln läuft,
 *   - index.html wird auf den reinen Seiteninhalt reduziert: Die
 *     Artefakt-Umgebung liefert Grundgerüst, Zeichensatz und Viewport selbst.
 *
 * Ausführen mit:  npm run build:artifact
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const outDir = resolve(root, 'dist-artifact')

console.log('Baue Artefakt-Fassung …')
execFileSync('npx', ['vite', 'build', '--mode', 'artifact'], {
  cwd: root,
  stdio: 'inherit',
})

/* ------------------------------------------- index.html auf Inhalt kürzen */

const htmlPath = join(outDir, 'index.html')
const html = readFileSync(htmlPath, 'utf8')

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i)
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i)

if (!headMatch || !bodyMatch) {
  throw new Error('index.html hat nicht die erwartete Form – Build prüfen.')
}

const head = headMatch[1]
  // Zeichensatz und Viewport bringt die Artefakt-Umgebung selbst mit.
  .replace(/<meta\s+charset=[^>]*>\s*/gi, '')
  .replace(/<meta\s+name="viewport"[^>]*>\s*/gi, '')
  // In der Artefakt-Übersicht steht der Name allein, ohne Untertitel –
  // die Erläuterung gehört dort in die Beschreibung.
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Claude Academy</title>')
  .trim()

const body = bodyMatch[1].trim()

const page = `${head}\n\n${body}\n`

if (!/<title>/i.test(page)) throw new Error('Kein <title> im Seiteninhalt.')
if (/<\/?(html|head|body)\b/i.test(page)) {
  throw new Error('Seiteninhalt enthält noch Gerüst-Tags.')
}

writeFileSync(htmlPath, page, 'utf8')

/* ------------------------------------------------ Dateiliste ausgeben */

function walk(dir, base = dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full, base))
    else out.push(relative(base, full).split('\\').join('/'))
  }
  return out
}

const files = walk(outDir).filter((f) => f !== 'index.html')
const bytes = files.reduce((a, f) => a + statSync(join(outDir, f)).size, 0)

writeFileSync(
  join(outDir, 'files.json'),
  JSON.stringify(
    files.filter((f) => f !== 'files.json'),
    null,
    2
  ),
  'utf8'
)

console.log(`\nArtefakt bereit in dist-artifact/`)
console.log(`  Seite:    index.html (${(page.length / 1024).toFixed(1)} kB)`)
console.log(`  Dateien:  ${files.length} (${(bytes / 1024).toFixed(0)} kB)`)
