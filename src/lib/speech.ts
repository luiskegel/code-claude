/**
 * Vorlesen über die Sprachausgabe des Browsers (Web Speech API).
 *
 * Kein Dienst von außen, keine Übertragung: Die Stimme kommt vom Gerät.
 *
 * Der wichtigste Teil ist die Stimmenauswahl. Geräte haben meist mehrere
 * deutsche Stimmen installiert – die erste in der Liste ist fast immer die
 * älteste und blecherne. Deshalb werden die Stimmen bewertet, die beste
 * vorausgewählt, und die Auswahl bleibt beim Nutzer.
 */

const RATE_KEY = 'ca:speech-rate'
const VOICE_KEY = 'ca:speech-voice'

export interface VoiceOption {
  uri: string
  name: string
  lang: string
  /** Je höher, desto natürlicher klingt die Stimme erfahrungsgemäß. */
  score: number
  /** Für die Anzeige: "Neuronale Stimme", "Einfache Stimme" … */
  quality: 'neuronal' | 'hochwertig' | 'standard' | 'einfach'
}

export interface SpeechState {
  supported: boolean
  speaking: boolean
  paused: boolean
  /** Kennung des gerade gelesenen Abschnitts – für die Anzeige der Schaltflächen. */
  id: string | null
  /** Lesegeschwindigkeit, 0.5 bis 2. */
  rate: number
  /** Verfügbare deutsche Stimmen, beste zuerst. */
  voices: VoiceOption[]
  /** Gewählte Stimme. */
  voiceURI: string | null
  /** Klartext-Hinweis, wenn die Sprachausgabe nicht funktioniert hat. */
  error: string | null
  /** Zu welchem Abschnitt der Hinweis gehört. */
  errorId: string | null
}

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ohne Speicher gilt die Einstellung nur für diese Sitzung */
  }
}

function readRate(): number {
  const raw = readStored(RATE_KEY)
  const value = raw ? Number(raw) : NaN
  return Number.isFinite(value) && value >= 0.5 && value <= 2 ? value : 1
}

let state: SpeechState = {
  supported: Boolean(synth) && typeof SpeechSynthesisUtterance !== 'undefined',
  speaking: false,
  paused: false,
  id: null,
  rate: typeof window === 'undefined' ? 1 : readRate(),
  voices: [],
  voiceURI: typeof window === 'undefined' ? null : readStored(VOICE_KEY),
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

/* ------------------------------------------------------ Stimmenauswahl */

/**
 * Bewertet eine Stimme nach Merkmalen, die quer über die Systeme auf Qualität
 * hindeuten. Die Namen sind je nach Gerät unterschiedlich, die Schlüsselwörter
 * aber erstaunlich einheitlich:
 *
 * - Windows/Edge: „Microsoft Katja Online (Natural)" – neuronale Stimmen
 * - macOS/iOS:    „(Premium)" / „(Enhanced)", Siri-Stimmen; „(Kompakt)" ist alt
 * - Android:      „Google Deutsch"
 * - Linux:        eSpeak – die blecherne Notlösung
 */
export function scoreVoice(name: string, uri: string, localService: boolean): number {
  const haystack = `${name} ${uri}`.toLowerCase()
  let score = 0

  if (/natural|neural/.test(haystack)) score += 100
  if (/premium/.test(haystack)) score += 80
  if (/enhanced/.test(haystack)) score += 60
  if (/siri/.test(haystack)) score += 55
  if (/google/.test(haystack)) score += 40
  if (/wavenet|studio|journey/.test(haystack)) score += 70

  // Online-Stimmen sind fast immer die neueren.
  if (!localService) score += 15

  if (/compact|kompakt/.test(haystack)) score -= 70
  if (/espeak|festival|pico|flite/.test(haystack)) score -= 120
  if (/eloquence/.test(haystack)) score -= 90

  return score
}

function qualityOf(score: number): VoiceOption['quality'] {
  if (score >= 90) return 'neuronal'
  if (score >= 50) return 'hochwertig'
  if (score >= 0) return 'standard'
  return 'einfach'
}

function collectVoices(): VoiceOption[] {
  if (!synth) return []
  return synth
    .getVoices()
    .filter((v) => v.lang?.toLowerCase().startsWith('de'))
    .map((v) => {
      const score = scoreVoice(v.name, v.voiceURI, v.localService)
      return {
        uri: v.voiceURI,
        name: v.name,
        lang: v.lang,
        score,
        quality: qualityOf(score),
      }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      // Bei Gleichstand: Hochdeutsch vor Österreich/Schweiz, dann alphabetisch.
      const aDe = a.lang === 'de-DE' ? 0 : 1
      const bDe = b.lang === 'de-DE' ? 0 : 1
      if (aDe !== bDe) return aDe - bDe
      return a.name.localeCompare(b.name, 'de')
    })
}

/** Aktualisiert die Stimmenliste und wählt bei Bedarf die beste aus. */
function refreshVoices() {
  const voices = collectVoices()
  const stored = state.voiceURI
  const stillThere = stored && voices.some((v) => v.uri === stored)
  set({
    voices,
    voiceURI: stillThere ? stored : (voices[0]?.uri ?? null),
  })
}

if (synth) {
  refreshVoices()
  // In vielen Browsern kommt die Liste erst nach kurzer Verzögerung.
  synth.addEventListener?.('voiceschanged', refreshVoices)
}

function currentVoice(): SpeechSynthesisVoice | null {
  if (!synth) return null
  const voices = synth.getVoices()
  return (
    voices.find((v) => v.voiceURI === state.voiceURI) ??
    voices.find((v) => v.lang === 'de-DE') ??
    voices.find((v) => v.lang?.toLowerCase().startsWith('de')) ??
    null
  )
}

export function setVoice(uri: string) {
  set({ voiceURI: uri, error: null, errorId: null })
  writeStored(VOICE_KEY, uri)
  restartFromHere()
}

/* ------------------------------------------------------ Textaufteilung */

export interface SpeechChunk {
  text: string
  /** Kurze Atempause danach, in Millisekunden. */
  pauseAfter: number
}

/**
 * Teilt den Text in Häppchen – immer an Satzgrenzen.
 *
 * Zwei Gründe: Manche Browser brechen eine Äußerung nach etwa 15 Sekunden ab,
 * und zwischen den Sätzen entsteht so eine kurze Atempause. Genau die fehlt
 * der Sprachausgabe sonst, und deshalb klingt sie gehetzt.
 */
export function chunkText(text: string, max = 240): SpeechChunk[] {
  // Nur an echten Satzenden trennen. Doppelpunkte gehören mitten in den Satz –
  // eine Pause danach klingt, als hätte die Stimme den Faden verloren.
  const sentences = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)

  const chunks: SpeechChunk[] = []
  let current = ''

  const push = (value: string, hardSplit = false) => {
    if (!value) return
    // Nach einem erzwungenen Schnitt mitten im Satz darf keine Pause stehen.
    chunks.push({ text: value, pauseAfter: hardSplit ? 0 : 140 })
  }

  for (const sentence of sentences) {
    if (sentence.length > max) {
      push(current)
      current = ''
      for (let i = 0; i < sentence.length; i += max) {
        const part = sentence.slice(i, i + max)
        push(part, i + max < sentence.length)
      }
      continue
    }

    if (!current) current = sentence
    else if (current.length + sentence.length + 1 <= max) current += ' ' + sentence
    else {
      push(current)
      current = sentence
    }
  }

  push(current)
  return chunks
}

/* --------------------------------------------------------- Abspielen */

let queue: SpeechChunk[] = []
let position = 0
/** Zählt jede neue Wiedergabe – Rückmeldungen alter Äußerungen werden ignoriert. */
let token = 0
let keepAlive: number | undefined
let pauseTimer: number | undefined

function clearTimers() {
  if (keepAlive !== undefined) {
    window.clearInterval(keepAlive)
    keepAlive = undefined
  }
  if (pauseTimer !== undefined) {
    window.clearTimeout(pauseTimer)
    pauseTimer = undefined
  }
}

function finish() {
  clearTimers()
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

  const chunk = queue[position]
  const utterance = new SpeechSynthesisUtterance(chunk.text)
  utterance.lang = 'de-DE'
  utterance.rate = state.rate
  utterance.pitch = 1
  utterance.volume = 1
  const voice = currentVoice()
  if (voice) {
    utterance.voice = voice
    utterance.lang = voice.lang
  }

  utterance.onend = () => {
    if (mine !== token) return
    position += 1
    if (chunk.pauseAfter > 0) {
      pauseTimer = window.setTimeout(() => speakNext(mine), chunk.pauseAfter)
    } else {
      speakNext(mine)
    }
  }

  utterance.onerror = (event) => {
    if (mine !== token) return
    const reason = (event as SpeechSynthesisErrorEvent).error
    if (reason === 'interrupted' || reason === 'canceled') return

    const failedId = state.id
    finish()
    set({ error: messageFor(reason), errorId: failedId })
  }

  synth.speak(utterance)
}

function start(id: string, chunks: SpeechChunk[]) {
  if (!synth || chunks.length === 0) return

  token += 1
  const mine = token

  synth.cancel()
  queue = chunks
  position = 0
  set({ speaking: true, paused: false, id, error: null, errorId: null })

  clearTimers()
  // Manche Browser pausieren lange Wiedergaben von selbst.
  keepAlive = window.setInterval(() => {
    if (!synth) return
    if (state.speaking && !state.paused && synth.paused) synth.resume()
  }, 8000)

  // Ein Tick Verzögerung: cancel() wirkt in einigen Browsern erst danach.
  window.setTimeout(() => speakNext(mine), 0)
}

/** Liest den Text vor. Eine laufende Wiedergabe wird dabei abgelöst. */
export function speak(id: string, text: string) {
  if (!synth || !state.supported) return
  const clean = text.trim()
  if (!clean) return
  start(id, chunkText(clean))
}

/** Setzt ab der aktuellen Stelle neu an – nach Stimm- oder Tempowechsel. */
function restartFromHere() {
  if (!state.speaking || !state.id) return
  const rest = queue.slice(position)
  if (rest.length === 0) return
  start(state.id, rest)
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
  writeStored(RATE_KEY, String(value))
  restartFromHere()
}

/** Kurze Hörprobe – damit man die Stimmen vergleichen kann, ohne zu lesen. */
export const PREVIEW_TEXT =
  'So klingt diese Stimme. Damit lese ich dir die Lektionen vor – in Ruhe, Satz für Satz.'

export function previewVoice() {
  speak('voice-preview', PREVIEW_TEXT)
}

export const RATE_OPTIONS: { value: number; label: string }[] = [
  { value: 0.8, label: 'Langsam' },
  { value: 0.9, label: 'Gemächlich' },
  { value: 1, label: 'Normal' },
  { value: 1.15, label: 'Zügig' },
  { value: 1.35, label: 'Schnell' },
]
