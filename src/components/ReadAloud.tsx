import { useSyncExternalStore } from 'react'
import {
  RATE_OPTIONS,
  getSpeechState,
  previewVoice,
  setRate,
  setVoice,
  stopSpeaking,
  subscribeSpeech,
  toggleSpeak,
  togglePause,
  type VoiceOption,
} from '../lib/speech'
import { IconPause, IconPlay, IconSpeaker, IconStop } from './Icons'

function useSpeech() {
  return useSyncExternalStore(subscribeSpeech, getSpeechState, getSpeechState)
}

/** „Katja Online (Natural)" → „Katja · neuronale Stimme" */
function voiceLabel(voice: VoiceOption): string {
  const name = voice.name
    // „Microsoft Katja Online (Natural) - German (Germany)" → „Katja"
    .replace(/\s+-\s+.*$/, '')
    .replace(/^(Microsoft|Google)\s+/i, '')
    .replace(/\s*\((Natural|Premium|Enhanced|Kompakt|Compact)\)/gi, '')
    .replace(/\s*Online$/i, '')
    .trim()

  const quality =
    voice.quality === 'neuronal'
      ? 'natürlich'
      : voice.quality === 'hochwertig'
        ? 'hochwertig'
        : voice.quality === 'einfach'
          ? 'einfach'
          : 'standard'

  const region = voice.lang === 'de-AT' ? ' (AT)' : voice.lang === 'de-CH' ? ' (CH)' : ''
  return `${name || voice.name}${region} · ${quality}`
}

/**
 * Vorlese-Schaltfläche.
 *
 * `inline` sitzt unter einem Abschnitt, `bar` steuert die ganze Lektion –
 * mit Pause, Stimme und Geschwindigkeit. Kann der Browser keine
 * Sprachausgabe, wird gar nichts angezeigt statt einer Schaltfläche, die
 * nichts tut.
 */
export function ReadAloud({
  id,
  text,
  variant = 'inline',
  label = 'Vorlesen',
}: {
  id: string
  /** Wird erst beim Klick berechnet, damit lange Texte die Seite nicht bremsen. */
  text: () => string
  variant?: 'inline' | 'bar'
  label?: string
}) {
  const speech = useSpeech()

  if (!speech.supported) return null

  const isActive = speech.id === id && speech.speaking
  const failed = speech.errorId === id && speech.error

  if (variant === 'inline') {
    return (
      <div className="readaloud">
        <button
          type="button"
          className={`readaloud__btn${isActive ? ' readaloud__btn--active' : ''}`}
          onClick={() => toggleSpeak(id, text())}
          aria-label={isActive ? `${label} beenden` : `${label}: Abschnitt vorlesen`}
        >
          {isActive ? <IconStop size={14} /> : <IconSpeaker size={15} />}
          <span>{isActive ? 'Stopp' : label}</span>
        </button>
        {isActive && (
          <button
            type="button"
            className="readaloud__btn"
            onClick={togglePause}
            aria-label={speech.paused ? 'Weiterlesen' : 'Vorlesen pausieren'}
          >
            {speech.paused ? <IconPlay size={13} /> : <IconPause size={13} />}
            <span>{speech.paused ? 'Weiter' : 'Pause'}</span>
          </button>
        )}
        {failed && (
          <p className="readaloud__error" role="status">
            {speech.error}
          </p>
        )}
      </div>
    )
  }

  const chosen = speech.voices.find((v) => v.uri === speech.voiceURI)
  const previewing = speech.id === 'voice-preview' && speech.speaking

  return (
    <div className="readaloud readaloud--bar">
      <div className="readaloud__row">
        <button
          type="button"
          className={`btn${isActive ? ' btn--active' : ''}`}
          onClick={() => toggleSpeak(id, text())}
        >
          {isActive ? <IconStop size={14} /> : <IconSpeaker size={16} />}
          {isActive ? 'Vorlesen beenden' : label}
        </button>

        {isActive && (
          <button type="button" className="btn" onClick={togglePause}>
            {speech.paused ? <IconPlay size={13} /> : <IconPause size={13} />}
            {speech.paused ? 'Weiter' : 'Pause'}
          </button>
        )}

        <label className="readaloud__field">
          <span className="sr-only">Lesegeschwindigkeit</span>
          <select
            className="select"
            value={speech.rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label="Lesegeschwindigkeit"
          >
            {RATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {speech.voices.length > 0 && (
        <div className="readaloud__row readaloud__row--voice">
          <label className="readaloud__field readaloud__field--grow">
            <span className="readaloud__fieldlabel">Stimme</span>
            <select
              className="select"
              value={speech.voiceURI ?? ''}
              onChange={(e) => setVoice(e.target.value)}
              aria-label="Stimme auswählen"
            >
              {speech.voices.map((v) => (
                <option key={v.uri} value={v.uri}>
                  {voiceLabel(v)}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => (previewing ? stopSpeaking() : previewVoice())}
          >
            {previewing ? <IconStop size={13} /> : <IconPlay size={13} />}
            {previewing ? 'Stopp' : 'Anhören'}
          </button>
        </div>
      )}

      {chosen && chosen.quality === 'einfach' && (
        <details className="readaloud__help">
          <summary>Die Stimme klingt blechern – was hilft?</summary>
          <div className="readaloud__helpbody">
            <p>
              Dein Gerät nutzt gerade eine einfache Stimme. Fast alle Systeme bringen bessere
              mit, sie müssen nur einmal geladen werden:
            </p>
            <ul>
              <li>
                <strong>iPhone / iPad:</strong> Einstellungen → Bedienungshilfen → Gesprochene
                Inhalte → Stimmen → Deutsch → eine Stimme mit „Premium" laden.
              </li>
              <li>
                <strong>Mac:</strong> Systemeinstellungen → Bedienungshilfen → Gesprochene Inhalte
                → Systemstimme → Anpassen → deutsche Premium-Stimme laden.
              </li>
              <li>
                <strong>Windows:</strong> In Microsoft Edge stehen die „Natural"-Stimmen (Katja,
                Conrad) ohne Installation bereit.
              </li>
              <li>
                <strong>Android:</strong> Einstellungen → Sprachausgabe → Google
                Sprachausgabe-Engine → Sprachdaten für Deutsch installieren.
              </li>
            </ul>
            <p>
              Danach diese Seite neu laden – die neue Stimme steht dann in der Auswahl.
            </p>
          </div>
        </details>
      )}

      {failed && (
        <p className="readaloud__error" role="status">
          {speech.error}
        </p>
      )}
    </div>
  )
}

export { stopSpeaking }
