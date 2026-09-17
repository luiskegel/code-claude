import { useSyncExternalStore } from 'react'
import {
  RATE_OPTIONS,
  getSpeechState,
  setRate,
  stopSpeaking,
  subscribeSpeech,
  toggleSpeak,
  togglePause,
} from '../lib/speech'
import { IconPause, IconPlay, IconSpeaker, IconStop } from './Icons'

function useSpeech() {
  return useSyncExternalStore(subscribeSpeech, getSpeechState, getSpeechState)
}

/**
 * Vorlese-Schaltfläche.
 *
 * `inline` sitzt unter einem Abschnitt, `bar` steuert die ganze Lektion –
 * mit Pause und Geschwindigkeit. Kann der Browser keine Sprachausgabe, wird
 * gar nichts angezeigt statt einer Schaltfläche, die nichts tut.
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

  return (
    <div className="readaloud readaloud--bar">
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

      <label className="readaloud__rate">
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

      {failed && (
        <p className="readaloud__error" role="status">
          {speech.error}
        </p>
      )}
    </div>
  )
}

export { stopSpeaking }
