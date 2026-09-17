/**
 * Vorlesen über die Sprachausgabe des Browsers (Web Speech API).
 *
 * Kein Dienst von außen, keine Übertragung: Die Stimme kommt vom Gerät.
 * Der Zustand liegt in diesem Modul, damit immer nur ein Abschnitt gleichzeitig
 * gelesen wird und jede Schaltfläche auf der Seite denselben Stand anzeigt.
 */

const RATE_KEY = 'ca:speech-rate'

export interface SpeechState {
  /** Beherrscht der Browser Sprachausgabe? */
  supported: boolean
  speaking: boolean
  paused: boolean
  /** Kennung des gerade gelesenen Abschnitts – für die Anzeige der Schaltflächen. */
  id: string | null
  /** Lesegeschwindigkeit, 0.5 bis 2. */
  rate: number
  /** Klartext-Hinweis, wenn die Sprachausgabe nicht funktioniert hat. */
  error: string | null
  /** Zu welchem Abschnitt der Hinweis gehört. */
  errorId: string | null
}

function readRate(): number {
  try {
    const raw = localStorage.getItem(RATE_KEY)
    const value = raw ? Number(raw) : NaN
    if (Number.isFinite(value) && value >= 0.5 && value <= 2) return value
  } catch {
    /* Speicher nicht verfügbar – dann eben die Vorgabe. */
  }
  return 1
}

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined

let state: SpeechState = {
  supported: Boolean(synth) && typeof SpeechSynthesisUtterance !== 'undefined',
  speaking: false,
  paused: false,
  id: null,
  rate: typeof window === 'undefined' ? 1 : readRate(),
  error: null,
  errorId: null,
}

const listeners = new Set<() => void>()

function set(patch: Partial<SpeechState>) {
  state = { ...state, ...patch }
  listeners.forEach((fn) => fn())
}

export function getSpeechState(): SpeechState {
  return state
}

export function subscribeSpeech(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/* ------------------------------------------------------------- Stimme */

let warmed = false

function germanVoice(): SpeechSynthesisVoice | null {
  if (!synth) return null
  const voices = synth.getVoices()
  return (
    voices.find((v) => v.lang === 'de-DE') ??
    voices.find((v) => v.lang?.toLowerCase().startsWith('de')) ??
    null
  )
}

/** Stimmenliste anfordern – in manchen Browsern kommt sie erst verzögert. */
function warmVoices() {
  if (warmed || !synth) return
  warmed = true
  synth.getVoices()
  if ('onvoiceschanged' in synth) {
    synth.addEventListener?.('voiceschanged', () => synth.getVoices(), { once: true })
  }
}

/* ------------------------------------------------------ Textaufteilung */

/**
 * Lange Texte werden in Häppchen gelesen. Zwei Gründe: Manche Browser brechen
 * eine Äußerung nach etwa 15 Sekunden ab, und kurze Stücke lassen sich
 * zuverlässiger anhalten und fortsetzen.
 */
export function chunkText(text: string, max = 180): string[] {
  const sentences = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?:])\s+/)
    .filter(Boolean)

  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    // Einzelne überlange Sätze hart trennen, damit nichts hängen bleibt.
    if (sentence.length > max) {
      if (current) {
        chunks.push(current)
        current = ''
      }
      for (let i = 0; i < sentence.length; i += max) {
        chunks.push(sentence.slice(i, i + max))
      }
      continue
    }

    if (!current) current = sentence
    else if (current.length + sentence.length + 1 <= max) current += ' ' + sentence
    else {
      chunks.push(current)
      current = sentence
    }
  }

  if (current) chunks.push(current)
  return chunks
}

/* --------------------------------------------------------- Abspielen */

let queue: string[] = []
let position = 0
/** Zählt jede neue Wiedergabe – Rückmeldungen alter Äußerungen werden ignoriert. */
let token = 0
let keepAlive: number | undefined

function stopKeepAlive() {
  if (keepAlive !== undefined) {
    window.clearInterval(keepAlive)
    keepAlive = undefined
  }
}

function finish() {
  stopKeepAlive()
  queue = []
  position = 0
  set({ speaking: false, paused: false, id: null })
}

/** Übersetzt die technische Fehlerursache in einen Satz, der weiterhilft. */
function messageFor(reason: string): string {
  switch (reason) {
    case 'not-allowed':
      return 'Der Browser hat die Sprachausgabe blockiert. Tippe die Schaltfläche noch einmal an.'
    case 'audio-busy':
      return 'Die Tonausgabe ist gerade belegt. Versuch es in einem Moment noch einmal.'
    case 'language-unavailable':
    case 'voice-unavailable':
      return 'Auf diesem Gerät ist keine deutsche Stimme installiert. Sie lässt sich in den Systemeinstellungen nachrüsten.'
    default:
      return 'Die Sprachausgabe hat auf diesem Gerät keine Stimme gefunden. In den Systemeinstellungen lässt sich eine deutsche Stimme installieren.'
  }
}

function speakNext(mine: number) {
  if (!synth || mine !== token) return

  if (position >= queue.length) {
    finish()
    return
  }

  const utterance = new SpeechSynthesisUtterance(queue[position])
  utterance.lang = 'de-DE'
  utterance.rate = state.rate
  const voice = germanVoice()
  if (voice) utterance.voice = voice

  utterance.onend = () => {
    if (mine !== token) return
    position += 1
    speakNext(mine)
  }

  utterance.onerror = (event) => {
    if (mine !== token) return
    // Abbruch durch uns selbst ist kein Fehler.
    const reason = (event as SpeechSynthesisErrorEvent).error
    if (reason === 'interrupted' || reason === 'canceled') return

    const failedId = state.id
    finish()
    set({ error: messageFor(reason), errorId: failedId })
  }

  synth.speak(utterance)
}

/** Liest den Text vor. Eine laufende Wiedergabe wird dabei abgelöst. */
export function speak(id: string, text: string) {
  if (!synth || !state.supported) return

  const clean = text.trim()
  if (!clean) return

  warmVoices()
  token += 1
  const mine = token

  synth.cancel()
  queue = chunkText(clean)
  position = 0
  set({ speaking: true, paused: false, id, error: null, errorId: null })

  stopKeepAlive()
  // Manche Browser pausieren lange Wiedergaben von selbst.
  keepAlive = window.setInterval(() => {
    if (!synth) return
    if (state.speaking && !state.paused && synth.paused) synth.resume()
  }, 8000)

  // Ein Tick Verzögerung: cancel() wirkt in einigen Browsern erst danach.
  window.setTimeout(() => speakNext(mine), 0)
}

export function stopSpeaking() {
  if (!synth) return
  token += 1
  synth.cancel()
  finish()
}

export function togglePause() {
  if (!synth || !state.speaking) return
  if (state.paused) {
    synth.resume()
    set({ paused: false })
  } else {
    synth.pause()
    set({ paused: true })
  }
}

/** Startet den Abschnitt – oder hält ihn an, wenn er gerade läuft. */
export function toggleSpeak(id: string, text: string) {
  if (state.id === id && state.speaking) stopSpeaking()
  else speak(id, text)
}

export function setRate(rate: number) {
  const value = Math.min(2, Math.max(0.5, rate))
  set({ rate: value })
  try {
    localStorage.setItem(RATE_KEY, String(value))
  } catch {
    /* ohne Speicher gilt die Einstellung nur für diese Sitzung */
  }
  // Damit die neue Geschwindigkeit sofort hörbar ist, ab der aktuellen
  // Stelle neu ansetzen.
  if (state.speaking && synth) {
    const rest = queue.slice(position)
    const id = state.id
    if (id && rest.length > 0) speak(id, rest.join(' '))
  }
}

export const RATE_OPTIONS: { value: number; label: string }[] = [
  { value: 0.8, label: 'Langsam' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: 'Zügig' },
  { value: 1.5, label: 'Schnell' },
]
