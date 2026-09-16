import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { PromptBlock } from '../components/blocks'
import { Md } from '../lib/markdown'
import {
  GOAL_OPTIONS,
  localImprover,
  type Goal,
  type ImproveResult,
} from '../lib/promptImprover'

const BEISPIELE = [
  'Schreib mir einen Text über Autos.',
  'Fass das zusammen.',
  'bewerbung schreiben',
  'Analysiere diesen Vertrag.',
]

export default function PromptImproverPage() {
  const [input, setInput] = useState('')
  const [goal, setGoal] = useState<Goal>('text')
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState('')
  const [withRole, setWithRole] = useState(true)
  const [withGuards, setWithGuards] = useState(true)
  const [result, setResult] = useState<ImproveResult | null>(null)
  const [busy, setBusy] = useState(false)

  async function run() {
    if (!input.trim()) return
    setBusy(true)
    try {
      const res = await localImprover(input, { goal, audience, tone, withRole, withGuards })
      setResult(res)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Layout width="wide">
      <Seo
        title="Prompt verbessern"
        description="Füge deinen eigenen Prompt ein und sieh, was ihm fehlt – mit strukturierter Fassung und einer Begründung zu jeder Änderung."
        path="/prompt-verbessern"
      />

      <div className="prose" style={{ maxWidth: '980px' }}>
        <h1>Prompt verbessern</h1>
        <p className="lesson__desc">
          Füge deinen Prompt ein. Du bekommst eine strukturierte Fassung und – wichtiger – eine
          Erklärung, welche Lücke geschlossen wurde und was sie im Ergebnis bewirkt hätte.
        </p>

        <aside className="callout callout--info">
          <p className="callout__title">
            <span aria-hidden="true">ℹ</span> Wie das hier funktioniert
          </p>
          <p style={{ margin: 0 }}>
            Diese Funktion ruft <strong>kein</strong> Modell auf. Sie arbeitet mit genau den Regeln,
            die in den Lektionen erklärt werden – deshalb kannst du jede Verbesserung nachvollziehen
            und selbst lernen. Die verbesserte Fassung enthält Platzhalter, die du ausfüllst,
            bevor du sie in Claude einfügst.
          </p>
        </aside>

        <div className={result ? 'improver improver--side' : 'improver'}>
          <div>
            <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
              <label className="field__label" htmlFor="prompt-input">
                Mein Prompt
              </label>
              <textarea
                id="prompt-input"
                className="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Zum Beispiel: Schreib mir einen Text über Autos."
              />
              <div className="filterbar" style={{ marginBottom: 0 }}>
                {BEISPIELE.map((b) => (
                  <button key={b} type="button" className="chip" onClick={() => setInput(b)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="field" style={{ marginBottom: 'var(--sp-3)' }}>
              <label className="field__label" htmlFor="goal">
                Was willst du erreichen?
              </label>
              <select
                id="goal"
                className="select"
                value={goal}
                onChange={(e) => setGoal(e.target.value as Goal)}
              >
                {GOAL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 'var(--sp-3)' }}>
              <label className="field__label" htmlFor="audience">
                Zielgruppe <span style={{ fontWeight: 400, color: 'var(--text-subtle)' }}>(optional)</span>
              </label>
              <input
                id="audience"
                className="select"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="z. B. Kunden ohne Vorkenntnisse"
              />
            </div>

            <div className="field" style={{ marginBottom: 'var(--sp-4)' }}>
              <label className="field__label" htmlFor="tone">
                Ton <span style={{ fontWeight: 400, color: 'var(--text-subtle)' }}>(optional)</span>
              </label>
              <input
                id="tone"
                className="select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="z. B. sachlich, freundlich, bestimmt"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)' }}>
              <label className="checkrow">
                <input
                  type="checkbox"
                  checked={withRole}
                  onChange={(e) => setWithRole(e.target.checked)}
                />
                Rolle ergänzen (verändert den fachlichen Blickwinkel)
              </label>
              <label className="checkrow">
                <input
                  type="checkbox"
                  checked={withGuards}
                  onChange={(e) => setWithGuards(e.target.checked)}
                />
                Regeln gegen erfundene Angaben anhängen
              </label>
            </div>

            <button
              type="button"
              className="btn btn--primary btn--lg btn--block"
              onClick={run}
              disabled={!input.trim() || busy}
            >
              {busy ? 'Wird geprüft …' : 'Prompt verbessern'}
            </button>
          </div>

          {result && (
            <div>
              <h2 style={{ fontSize: 'var(--step-1)', marginBottom: 'var(--sp-3)' }}>
                Verbesserte Version
              </h2>
              <PromptBlock
                prompt={result.improved}
                title="Verbesserte Fassung"
                note="Ersetze alle Platzhalter in [ECKIGEN KLAMMERN], bevor du den Prompt verwendest."
              />

              <h2 style={{ fontSize: 'var(--step-1)', margin: 'var(--sp-5) 0 var(--sp-3)' }}>
                Warum ist dieser Prompt besser?
              </h2>

              {result.findings.length === 0 ? (
                <div className="callout callout--success">
                  <p style={{ margin: 0 }}>
                    Dein Prompt war bereits sehr vollständig. Die strukturierte Fassung macht ihn nur
                    noch übersichtlicher.
                  </p>
                </div>
              ) : (
                result.findings.map((f, i) => (
                  <div key={i} className="diffnote">
                    <p className="diffnote__head">
                      {f.title}{' '}
                      <span className={`badge${f.severity === 'hoch' ? ' badge--accent' : ''}`}>
                        {f.severity === 'hoch'
                          ? 'wichtig'
                          : f.severity === 'mittel'
                            ? 'hilfreich'
                            : 'Feinschliff'}
                      </span>
                    </p>
                    <p style={{ margin: '0 0 var(--sp-2)', color: 'var(--text-muted)' }}>
                      <strong>Folge im Ergebnis: </strong>
                      {f.effect}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Ergänzt: </strong>
                      {f.fix}
                    </p>
                    {f.lesson && (
                      <p style={{ margin: 'var(--sp-2) 0 0' }}>
                        <Link to={`/lektion/${f.lesson}`}>Dazu die passende Lektion →</Link>
                      </p>
                    )}
                  </div>
                ))
              )}

              {result.strengths.length > 0 && (
                <div className="callout callout--success" style={{ marginTop: 'var(--sp-4)' }}>
                  <p className="callout__title">
                    <span aria-hidden="true">✓</span> Das war schon gut
                  </p>
                  <ul style={{ marginBottom: 0 }}>
                    {result.strengths.map((s, i) => (
                      <li key={i}>
                        <Md>{s}</Md>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <details className="accordion" style={{ marginTop: 'var(--sp-4)' }}>
                <summary>Mein ursprünglicher Prompt</summary>
                <div className="accordion__body">
                  <pre className="promptblock__pre" style={{ padding: 0 }}>
                    {result.original}
                  </pre>
                </div>
              </details>
            </div>
          )}
        </div>

        <section className="section">
          <h2 className="section__title" style={{ fontSize: 'var(--step-1)' }}>
            Das steckt dahinter
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Die Prüfung sucht nach genau den Lücken, die in{' '}
            <Link to="/lektion/prompts-verbessern">Prompts verbessern</Link> und{' '}
            <Link to="/lektion/gute-prompts">Gute Prompts schreiben</Link> beschrieben sind: fehlendes
            Ziel, fehlender Kontext, fehlendes Format, fehlende Zielgruppe und fehlende
            Negativ-Regeln.
          </p>
        </section>
      </div>
    </Layout>
  )
}
