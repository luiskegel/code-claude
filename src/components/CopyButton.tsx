import { useEffect, useRef, useState } from 'react'
import { IconCheck, IconCopy } from './Icons'

/**
 * Kopieren in die Zwischenablage mit Rückmeldung "Kopiert ✓".
 * Fällt auf ein verstecktes Textfeld zurück, wenn die Clipboard-API
 * nicht verfügbar ist (ältere Browser, unsicherer Kontext).
 */
export function CopyButton({
  text,
  label = 'Kopieren',
  className = 'copy-btn',
}: {
  text: string
  label?: string
  className?: string
}) {
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        ok = true
      }
    } catch {
      ok = false
    }

    if (!ok) {
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = document.execCommand('copy')
        document.body.removeChild(ta)
      } catch {
        ok = false
      }
    }

    setState(ok ? 'done' : 'error')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      type="button"
      className={`${className}${state === 'done' ? ' copy-btn--done' : ''}`}
      onClick={copy}
      aria-live="polite"
    >
      {state === 'done' ? <IconCheck size={13} /> : <IconCopy size={13} />}
      {state === 'done' ? 'Kopiert ✓' : state === 'error' ? 'Bitte manuell kopieren' : label}
    </button>
  )
}
