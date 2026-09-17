/**
 * Browsertest der gebauten Website.
 *
 * Prüft das, was man sonst von Hand durchklicken müsste: Navigation, Suche,
 * Kopier-Schaltflächen, Quiz, Fortschritt, Favoriten, Dark Mode, mobile
 * Darstellung und JavaScript-Fehler in der Konsole.
 *
 * Voraussetzung: `npm run build`, dann `npx vite preview --port 4173`.
 * Ausführen mit:  npm run test:browser
 */
import { existsSync } from 'node:fs'
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:4173'

let passed = 0
const failures = []
const consoleErrors = []

function check(name, condition, detail = '') {
  if (condition) {
    passed++
    console.log(`  ✓ ${name}`)
  } else {
    failures.push(`${name}${detail ? ` – ${detail}` : ''}`)
    console.log(`  ✗ ${name}${detail ? ` – ${detail}` : ''}`)
  }
}

function section(title) {
  console.log(`\n${title}`)
}

// In dieser Umgebung liegt Chromium an einem festen Pfad; sonst nimmt
// Playwright den selbst verwalteten Browser.
const CHROME = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const browser = await chromium.launch(
  existsSync(CHROME) ? { executablePath: CHROME } : {}
)

const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  locale: 'de-DE',
  permissions: ['clipboard-read', 'clipboard-write'],
})

const page = await context.newPage()

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    const text = msg.text()
    // Netzwerkfehler für fehlende Favicons o. Ä. sind für den Test irrelevant.
    if (!text.includes('favicon')) consoleErrors.push(`${page.url()}: ${text}`)
  }
})
page.on('pageerror', (err) => consoleErrors.push(`${page.url()}: ${err.message}`))

async function goto(path) {
  const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
  return res
}

/* ------------------------------------------------------------ Startseite */

section('Startseite')
await goto('/')
check('Titel gesetzt', (await page.title()).includes('Claude Academy'))
check('H1 vorhanden', (await page.locator('h1').first().textContent())?.includes('Claude lernen'))
check(
  'Genau eine H1',
  (await page.locator('h1').count()) === 1,
  `gefunden: ${await page.locator('h1').count()}`
)
check(
  'Meta-Description gesetzt',
  ((await page.locator('meta[name="description"]').getAttribute('content')) ?? '').length > 40
)
check('Anfänger-Schaltfläche vorhanden', await page.getByRole('link', { name: /kompletter Anfänger/i }).isVisible())

/* ------------------------------------------------------------ Navigation */

section('Navigation – jeder Menüpunkt')
const NAV = [
  ['/lernpfad', 'Lernpfad'],
  ['/schnellstart', 'Claude in 15 Minuten'],
  ['/30-tage', '30 Tage Claude lernen'],
  ['/prompts', 'Prompt-Bibliothek'],
  ['/prompt-verbessern', 'Prompt verbessern'],
  ['/uebungen', 'Übungen'],
  ['/glossar', 'Glossar'],
  ['/favoriten', 'Meine Favoriten'],
  ['/fortschritt', 'Dein Fortschritt'],
]

for (const [path, heading] of NAV) {
  await goto(path)
  const h1 = (await page.locator('h1').first().textContent()) ?? ''
  check(`${path} lädt ("${heading}")`, h1.includes(heading), `H1 war: "${h1}"`)
}

section('Themenseiten')
for (const id of ['basics', 'prompting', 'work', 'files', 'projects', 'claude-code', 'advanced']) {
  await goto(`/thema/${id}`)
  check(`/thema/${id} lädt`, (await page.locator('.pathlist li').count()) > 0)
}

/* --------------------------------------------------------- Interne Links */

section('Interne Links (Stichprobe über alle Seiten)')
const seen = new Set()
const broken = []

for (const [path] of [...NAV, ['/'], ['/thema/basics'], ['/lektion/was-ist-claude']]) {
  await goto(path)
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) =>
    els.map((e) => e.getAttribute('href'))
  )
  for (const href of hrefs) {
    if (!href || seen.has(href)) continue
    seen.add(href)
  }
}

for (const href of seen) {
  const res = await goto(href)
  const status = res?.status() ?? 0
  const is404 = await page.locator('.notfound__code').count()
  if (status >= 400 || is404 > 0) broken.push(`${href} (Status ${status})`)
}
check(
  `Alle ${seen.size} internen Links führen zu einer Seite`,
  broken.length === 0,
  broken.join(', ')
)

/* ------------------------------------------------- Alle Lektionen laden */

section('Alle Lektionsseiten')
const { LESSON_META } = await import('../src/content/meta.generated.ts')
const lessonProblems = []

for (const meta of LESSON_META) {
  await goto(`/lektion/${meta.slug}`)
  try {
    await page.waitForSelector('.lesson__section', { timeout: 5000 })
  } catch {
    lessonProblems.push(`${meta.slug}: keine Abschnitte gerendert`)
    continue
  }
  const h1 = (await page.locator('h1').first().textContent()) ?? ''
  const sections = await page.locator('.lesson__section').count()
  const hasQuiz = (await page.locator('#quiz').count()) > 0
  if (!h1.trim()) lessonProblems.push(`${meta.slug}: kein Titel`)
  if (sections < 4) lessonProblems.push(`${meta.slug}: nur ${sections} Abschnitte`)
  if (!hasQuiz) lessonProblems.push(`${meta.slug}: kein Quiz`)
}
check(
  `Alle ${LESSON_META.length} Lektionen rendern vollständig`,
  lessonProblems.length === 0,
  lessonProblems.slice(0, 5).join(' | ')
)

/* ------------------------------------------------------------- Lektion */

section('Lektionsseite')
await goto('/lektion/erster-prompt')
check('Lektionstitel', (await page.locator('h1').textContent())?.includes('ersten Prompt'))
await page.waitForSelector('#quiz', { timeout: 5000 })
check('Abschnitte gerendert', (await page.locator('.lesson__section').count()) >= 5)
check('Schnellnavigation vorhanden', (await page.locator('.toc__link').count()) > 3)
check('Breadcrumb zeigt Lernkontext', (await page.locator('.breadcrumb a').count()) >= 2)
check('Prompt-Block vorhanden', (await page.locator('.promptblock').count()) > 0)
check('Nächstes Thema verlinkt', await page.locator('.navcard--next').isVisible())

section('„Noch einfacher erklären"')
await goto('/lektion/was-ist-claude')
await page.waitForSelector('.simple', { timeout: 5000 })

const firstTabActive = await page.locator('.simple__tab').first().getAttribute('class')
check(
  'Startet bei der ausführlichen Stufe',
  (firstTabActive ?? '').includes('simple__tab--active')
)

const simpleBefore = await page.locator('.simple__body').first().textContent()
await page.locator('.simple .btn', { hasText: 'Noch einfacher erklären' }).first().click()
await page.waitForTimeout(150)
const simpleAfter = await page.locator('.simple__body').first().textContent()
check('„Noch einfacher erklären" wechselt den Text', simpleBefore !== simpleAfter)

await page.locator('.simple__tab').nth(1).click()
await page.waitForTimeout(150)
const viaTab = await page.locator('.simple__body').first().textContent()
check('Stufen lassen sich auch direkt wählen', viaTab !== simpleBefore)

section('„Beispiel anzeigen"')
await goto('/lektion/was-ist-claude')
await page.waitForSelector('.example__toggle', { timeout: 5000 })
check('Beispiel zunächst eingeklappt', (await page.locator('.example__body').count()) === 0)
await page.locator('.example__toggle').first().click()
check('Beispiel klappt auf', (await page.locator('.example__body').count()) > 0)
check(
  'Beispiel zeigt schlechten und besseren Ansatz',
  (await page.locator('.example__content--bad').count()) > 0 &&
    (await page.locator('.example__content--good').count()) > 0
)

/* ------------------------------------------------------ Lern-/Praxismodus */

section('Lern- und Praxismodus')
await goto('/lektion/texte-erstellen')
await page.waitForSelector('.modebar', { timeout: 5000 })
await page.getByRole('tab', { name: 'Ausprobieren' }).click()
check('Praxismodus zeigt Praxis-Abschnitt', await page.locator('#ausprobieren').isVisible())
await page.getByRole('tab', { name: 'Lernen' }).click()
check('Zurück im Lernmodus', await page.locator('#was').isVisible())

/* --------------------------------------------------------------- Vorlesen */

section('Vorlesen')
await goto('/lektion/erster-prompt')
await page.waitForSelector('.lesson__section', { timeout: 5000 })

const ttsSupported = await page.evaluate(
  () => 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'
)

if (!ttsSupported) {
  check(
    'Ohne Sprachausgabe wird keine Schaltfläche angezeigt',
    (await page.locator('.readaloud').count()) === 0
  )
} else {
  const perSection = await page.locator('.lesson__section .readaloud__btn').count()
  check('Jeder Abschnitt hat eine Vorlese-Schaltfläche', perSection >= 5, `gefunden: ${perSection}`)
  check('Leiste für die ganze Lektion vorhanden', (await page.locator('.readaloud--bar').count()) === 1)
  check(
    'Geschwindigkeit wählbar',
    (await page.locator('.readaloud--bar select').count()) === 1
  )

  // Ob eine Stimme vorhanden ist, hängt vom System ab. Auf einem Rechner ohne
  // installierte Stimme muss die Seite das sagen, statt stumm zu bleiben.
  const hasVoices = await page.evaluate(() => window.speechSynthesis.getVoices().length > 0)

  await page.locator('.lesson__section .readaloud__btn').first().click()
  await page.waitForTimeout(600)

  const active = await page.locator('.readaloud__btn--active').count()
  const hint = await page.locator('.readaloud__error').count()

  check(
    hasVoices
      ? 'Klick startet das Vorlesen'
      : 'Ohne installierte Stimme erscheint ein Hinweis statt Stille',
    hasVoices ? active === 1 : hint === 1,
    `aktiv: ${active}, Hinweis: ${hint}, Stimmen: ${hasVoices}`
  )

  if (hasVoices) {
    check(
      'Pause-Schaltfläche erscheint',
      (await page.getByRole('button', { name: /pausieren/i }).count()) >= 1
    )
    await page.locator('.readaloud__btn--active').first().click()
    await page.waitForTimeout(300)
    check(
      'Erneuter Klick beendet das Vorlesen',
      (await page.locator('.readaloud__btn--active').count()) === 0
    )

    await page.locator('.lesson__section .readaloud__btn').first().click()
    await page.waitForTimeout(300)
    await goto('/glossar')
    await page.waitForTimeout(400)
    check(
      'Seitenwechsel stoppt die Sprachausgabe',
      (await page.evaluate(() => window.speechSynthesis.speaking)) === false
    )
  } else {
    check(
      'Der Hinweis nennt einen Lösungsweg',
      /Stimme/i.test((await page.locator('.readaloud__error').first().textContent()) ?? '')
    )
    await goto('/glossar')
  }

  check(
    'Glossareinträge haben eine Vorlese-Schaltfläche',
    (await page.locator('.glossary__entry .readaloud__btn').count()) > 10
  )
}

/* ------------------------------------------------------------ Copy-Buttons */

section('Kopier-Schaltflächen')
await goto('/lektion/erster-prompt')
await page.waitForSelector('.promptblock', { timeout: 5000 })
const copyButtons = page.locator('.copy-btn')
const copyCount = await copyButtons.count()
check('Mehrere Kopier-Schaltflächen vorhanden', copyCount >= 2, `gefunden: ${copyCount}`)

await copyButtons.first().click()
await page.waitForTimeout(150)
check(
  'Rückmeldung „Kopiert ✓"',
  ((await copyButtons.first().textContent()) ?? '').includes('Kopiert')
)
const clip = await page.evaluate(() => navigator.clipboard.readText())
check('Zwischenablage enthält Text', clip.length > 20, `Länge: ${clip.length}`)

// Jede Kopier-Schaltfläche auf der Prompt-Seite anklicken
await goto('/prompts')
await page.waitForSelector('.promptcard', { timeout: 5000 })
const allCopy = page.locator('.copy-btn')
const allCopyCount = await allCopy.count()
let copyOk = 0
for (let i = 0; i < allCopyCount; i++) {
  await allCopy.nth(i).click()
  await page.waitForTimeout(60)
  const text = (await allCopy.nth(i).textContent()) ?? ''
  if (text.includes('Kopiert')) copyOk++
}
check(
  `Alle ${allCopyCount} Kopier-Schaltflächen der Bibliothek funktionieren`,
  copyOk === allCopyCount,
  `erfolgreich: ${copyOk}`
)

/* ----------------------------------------------------------------- Suche */

section('Suche')
await goto('/')
await page.locator('.header__search').click()
await page.waitForSelector('.searchdlg__input', { timeout: 5000 })

const QUERIES = [
  ['PDF analysieren', /Dateien verstehen/i],
  ['Claude Code', /Claude Code/i],
  ['bessere Prompts', /Prompt/i],
  ['Halluzination', /Halluzination|Was kann Claude nicht/i],
  ['Tabelle', /Tabellen/i],
  ['Terminal', /Terminal/i],
]

for (const [query, expected] of QUERIES) {
  await page.fill('.searchdlg__input', '')
  await page.fill('.searchdlg__input', query)
  await page.waitForTimeout(350)
  const first = (await page.locator('.searchres__title').first().textContent()) ?? ''
  check(`Suche „${query}" → "${first}"`, expected.test(first), `erster Treffer: "${first}"`)
}

await page.fill('.searchdlg__input', 'PDF analysieren')
await page.waitForTimeout(250)
await page.keyboard.press('Enter')
await page.waitForTimeout(400)
check('Enter öffnet den Treffer', page.url().includes('/lektion/'))

await page.keyboard.press('/')
await page.waitForTimeout(200)
check('Tastenkürzel „/" öffnet die Suche', (await page.locator('.searchdlg').count()) > 0)
await page.keyboard.press('Escape')
await page.waitForTimeout(200)
check('Escape schließt die Suche', (await page.locator('.searchdlg').count()) === 0)

/* ------------------------------------------------------------------ Quiz */

section('Quiz – alle Antwortmöglichkeiten')
await goto('/lektion/erster-prompt')
await page.waitForSelector('#quiz .choice__option', { timeout: 5000 })

// Falsche Antwort wählen: Erklärung muss erscheinen
await page.locator('#quiz .choice__option').nth(1).click()
await page.waitForTimeout(150)
check('Quiz zeigt Erklärung nach Antwort', (await page.locator('#quiz .choice__explain').count()) > 0)
check(
  'Richtige Antwort wird markiert',
  (await page.locator('#quiz .choice__option--correct').count()) === 1
)

// Quiz vollständig durchspielen
let guard = 0
while ((await page.locator('#quiz .quiz__result').count()) === 0 && guard < 12) {
  const nextBtn = page.locator('#quiz .choice__explain button')
  if (await nextBtn.count()) {
    await nextBtn.first().click()
  } else {
    await page.locator('#quiz .choice__option').first().click()
  }
  await page.waitForTimeout(120)
  guard++
}
check('Quiz erreicht das Ergebnis', (await page.locator('#quiz .quiz__result').count()) > 0)
const score = (await page.locator('#quiz .quiz__score').textContent()) ?? ''
check('Ergebnis zeigt Punktzahl', /\d+\s*\/\s*\d+/.test(score), `Ergebnis: "${score}"`)
await page.locator('#quiz .quiz__result button').click()
await page.waitForTimeout(150)
check('Quiz lässt sich wiederholen', (await page.locator('#quiz .choice__option').count()) > 0)

section('Interaktive Übung')
await goto('/lektion/erster-prompt')
await page.waitForSelector('#uebung .choice__option', { timeout: 5000 })
await page.locator('#uebung .choice__option').first().click()
await page.waitForTimeout(150)
check('Übung erklärt die Auswahl', (await page.locator('#uebung .choice__explain').count()) > 0)

/* ------------------------------------------------------------ Fortschritt */

section('Fortschritt speichern und neu laden')
await goto('/lektion/was-ist-claude')
await page.waitForSelector('.toc__actions button', { timeout: 5000 })
await page.getByRole('button', { name: /Als abgeschlossen markieren/ }).first().click()
await page.waitForTimeout(200)
check(
  'Lektion als abgeschlossen markiert',
  (await page.locator('.badge--done').count()) > 0
)

await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(300)
check(
  'Status bleibt nach dem Neuladen erhalten',
  (await page.locator('.badge--done').count()) > 0
)

await goto('/fortschritt')
const statValue = (await page.locator('.stat__value').first().textContent()) ?? ''
check('Fortschrittsseite zeigt Prozentwert', /%/.test(statValue), `Wert: "${statValue}"`)
check(
  'Quiz-Ergebnis wurde gespeichert',
  (await page.getByText('Quiz-Ergebnisse').count()) > 0
)

await goto('/')
check(
  'Startseite zeigt „Weiterlernen"',
  (await page.locator('.continue').count()) > 0
)

/* -------------------------------------------------------------- Favoriten */

section('Favoriten')
await goto('/lektion/kontext-geben')
await page.waitForSelector('.toc__actions button', { timeout: 5000 })
await page.getByRole('button', { name: /Favorit speichern/ }).first().click()
await page.waitForTimeout(200)
await goto('/favoriten')
check('Favorit erscheint in der Liste', (await page.getByText('Kontext geben').count()) > 0)

await page.getByRole('button', { name: /Entfernen/ }).first().click()
await page.waitForTimeout(200)
check(
  'Favorit lässt sich entfernen',
  (await page.getByText('Noch nichts gespeichert').count()) > 0
)

/* -------------------------------------------------------------- Dark Mode */

section('Dark Mode')
await goto('/')
const themeBefore = await page.evaluate(() => document.documentElement.dataset.theme)
await page.getByRole('button', { name: /Design/ }).click()
await page.waitForTimeout(200)
const themeAfter = await page.evaluate(() => document.documentElement.dataset.theme)
check('Design wechselt', themeBefore !== themeAfter, `${themeBefore} → ${themeAfter}`)

await page.reload({ waitUntil: 'networkidle' })
const themeReload = await page.evaluate(() => document.documentElement.dataset.theme)
check('Design bleibt nach dem Neuladen', themeReload === themeAfter)

const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
check('Dunkler Hintergrund aktiv', bg !== 'rgb(251, 250, 248)', `Hintergrund: ${bg}`)

// zurückschalten
await page.getByRole('button', { name: /Design/ }).click()
await page.waitForTimeout(150)

/* ------------------------------------------------- Prompt-Verbesserer */

section('Prompt verbessern')
await goto('/prompt-verbessern')
await page.fill('#prompt-input', 'Schreib mir einen Text über Autos.')
await page.getByRole('button', { name: 'Prompt verbessern' }).click()
await page.waitForTimeout(300)
check('Verbesserte Fassung erscheint', (await page.locator('.promptblock').count()) > 0)
check('Begründungen werden angezeigt', (await page.locator('.diffnote').count()) >= 3)
const improved = (await page.locator('.promptblock__pre').first().textContent()) ?? ''
check('Fassung enthält Aufgabe und Format', improved.includes('Aufgabe:') && improved.includes('Format:'))
check('Platzhalter hervorgehoben', (await page.locator('.tok-ph').count()) > 0)

/* --------------------------------------------------------------- 404 */

section('Fehlerseite')
await goto('/gibt-es-nicht')
check('404-Seite erscheint', (await page.locator('.notfound__code').textContent()) === '404')
check(
  'Zurück zum Lernpfad vorhanden',
  await page.getByRole('link', { name: /Zurück zum Lernpfad/ }).isVisible()
)
await page.getByRole('button', { name: 'Suche öffnen' }).click()
await page.waitForTimeout(200)
check('Suche öffnet sich von der 404-Seite', (await page.locator('.searchdlg').count()) > 0)

await goto('/lektion/gibt-es-nicht')
check('Unbekannte Lektion → 404', (await page.locator('.notfound__code').count()) > 0)

/* ------------------------------------------------------------- Mobil */

section('Mobile Darstellung (390 × 844)')
const mobile = await context.newPage()
mobile.on('pageerror', (err) => consoleErrors.push(`mobil: ${err.message}`))
await mobile.setViewportSize({ width: 390, height: 844 })

for (const path of ['/', '/lernpfad', '/lektion/erster-prompt', '/prompts', '/glossar', '/30-tage']) {
  await mobile.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
  const overflow = await mobile.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  )
  check(`${path}: kein horizontales Scrollen`, overflow <= 1, `Überstand: ${overflow}px`)
}

await mobile.goto(`${BASE}/lektion/erster-prompt`, { waitUntil: 'networkidle' })
check('Seitenleiste mobil eingeklappt', !(await mobile.locator('.sidebar--open').count()))
await mobile.getByRole('button', { name: 'Menü öffnen' }).click()
await mobile.waitForTimeout(250)
check('Menü öffnet sich', (await mobile.locator('.sidebar--open').count()) > 0)
await mobile.locator('.sidebar--open a').first().click()
await mobile.waitForTimeout(350)
check('Menü schließt nach Navigation', (await mobile.locator('.sidebar--open').count()) === 0)

// Bedienelemente (keine Fließtext-Links) sollen mit dem Finger gut treffbar sein.
const CONTROLS = [
  'button',
  '.btn',
  '.chip',
  '.icon-btn',
  '.sidebar__link',
  '.sidebar__sublink',
  '.pathitem',
  'a.card',
  '.startcard',
  '.footer__links a',
  '.breadcrumb a',
  '.toc__link',
  '.alphabar a',
  '.searchres',
].join(', ')

for (const path of ['/', '/lektion/erster-prompt', '/glossar', '/prompts']) {
  await mobile.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
  const tooSmall = await mobile.evaluate((sel) => {
    return [...document.querySelectorAll(sel)]
      .filter((e) => {
        const r = e.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && r.height < 24
      })
      .map((e) => `${e.className || e.tagName}:${(e.textContent || '').trim().slice(0, 20)}`)
  }, CONTROLS)
  check(
    `${path}: Bedienelemente groß genug`,
    tooSmall.length === 0,
    tooSmall.slice(0, 4).join(', ')
  )
}
await mobile.close()

/* ------------------------------------------------- Breite Desktop-Ansicht */

section('Desktop-Breiten')
for (const width of [1440, 1280, 1024, 768]) {
  await page.setViewportSize({ width, height: 900 })
  await goto('/lektion/erster-prompt')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  )
  check(`${width}px: kein horizontales Scrollen`, overflow <= 1, `Überstand: ${overflow}px`)
}
await page.setViewportSize({ width: 1280, height: 900 })

/* ----------------------------------------------------------- Konsole */

section('JavaScript-Konsole')
check('Keine Fehler in der Konsole', consoleErrors.length === 0, consoleErrors.slice(0, 5).join(' | '))

/* ---------------------------------------------------------- Ergebnis */

await browser.close()

console.log(`\n${'─'.repeat(60)}`)
console.log(`Bestanden: ${passed}   Fehlgeschlagen: ${failures.length}`)

if (failures.length > 0) {
  console.log('\nFehlgeschlagen:')
  failures.forEach((f) => console.log(`  ✗ ${f}`))
  process.exit(1)
}

console.log('✓ Alle Browsertests bestanden.')
