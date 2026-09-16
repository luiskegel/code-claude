import { useState } from 'react'
import type { Block, CodeLang, SimpleLevel, WorkedExample } from '../content/types'
import { Md, MdBlock } from '../lib/markdown'
import { highlight, highlightPrompt } from '../lib/highlight'
import { CopyButton } from './CopyButton'
import { IconChevronRight } from './Icons'

/* ---------------------------------------------------------------- Code */

export function CodeBlock({
  code,
  lang,
  caption,
}: {
  code: string
  lang: CodeLang
  caption?: string
}) {
  return (
    <figure className="codeblock">
      <div className="codeblock__bar">
        <span className="codeblock__lang">{lang}</span>
        {caption && <figcaption className="codeblock__caption">{caption}</figcaption>}
        <CopyButton text={code} label="Code kopieren" />
      </div>
      <pre className="codeblock__pre">
        <code>{highlight(code, lang)}</code>
      </pre>
    </figure>
  )
}

/* -------------------------------------------------------------- Prompt */

export function PromptBlock({
  prompt,
  title,
  note,
}: {
  prompt: string
  title?: string
  note?: string
}) {
  return (
    <section className="promptblock">
      <div className="promptblock__bar">
        <span>{title ?? 'Prompt zum Kopieren'}</span>
        <CopyButton text={prompt} label="Prompt kopieren" />
      </div>
      <pre className="promptblock__pre">{highlightPrompt(prompt)}</pre>
      {note && (
        <div className="promptblock__note">
          <strong>So passt du ihn an: </strong>
          <Md>{note}</Md>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------- Callout */

const CALLOUT_ICON: Record<string, string> = {
  info: 'ℹ',
  tip: '✦',
  warn: '!',
  danger: '⚠',
  success: '✓',
}

export function Callout({
  variant,
  title,
  md,
}: {
  variant: 'info' | 'tip' | 'warn' | 'danger' | 'success'
  title?: string
  md: string
}) {
  return (
    <aside className={`callout callout--${variant}`}>
      {title && (
        <p className="callout__title">
          <span aria-hidden="true">{CALLOUT_ICON[variant]}</span>
          {title}
        </p>
      )}
      <MdBlock>{md}</MdBlock>
    </aside>
  )
}

/* --------------------------------------------- „Noch einfacher erklären" */

export function SimpleLevels({ levels }: { levels: SimpleLevel[] }) {
  // Startet bei der ersten (fachlichsten) Stufe. Wer nicht mitkommt, klickt
  // sich mit „Noch einfacher erklären" schrittweise nach unten.
  const [active, setActive] = useState(0)
  const isSimplest = active >= levels.length - 1

  return (
    <section className="simple">
      <div className="simple__tabs" role="tablist" aria-label="Erklärungsstufe wählen">
        {levels.map((lvl, i) => (
          <button
            key={lvl.label}
            type="button"
            role="tab"
            id={`simple-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`simple-panel-${i}`}
            className={`simple__tab${i === active ? ' simple__tab--active' : ''}`}
            onClick={() => setActive(i)}
          >
            {lvl.label}
          </button>
        ))}
      </div>
      <div
        className="simple__body"
        role="tabpanel"
        id={`simple-panel-${active}`}
        aria-labelledby={`simple-tab-${active}`}
      >
        <MdBlock>{levels[active].md}</MdBlock>
        {isSimplest ? (
          active > 0 && (
            <p className="simple__hint">
              Das war die einfachste Fassung.{' '}
              <button type="button" className="btn btn--ghost" onClick={() => setActive(0)}>
                ← Zurück zur ausführlichen Erklärung
              </button>
            </p>
          )
        ) : (
          <p className="simple__hint">
            Ich verstehe es nicht –{' '}
            <button type="button" className="btn btn--ghost" onClick={() => setActive(active + 1)}>
              Noch einfacher erklären →
            </button>
          </p>
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------- „Beispiel anzeigen" */

export function ExampleBlock({ title, example }: { title?: string; example: WorkedExample }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="example">
      <button
        type="button"
        className="example__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <IconChevronRight
          size={16}
          className={open ? 'accordion__chev' : undefined}
        />
        <span style={open ? undefined : { transform: 'none' }}>
          {open ? 'Beispiel ausblenden' : (title ?? 'Beispiel anzeigen')}
        </span>
      </button>

      {open && (
        <div className="example__body">
          <div className="example__row">
            <p className="example__label example__label--neutral">Aufgabe</p>
            <div className="example__content">
              <MdBlock>{example.task}</MdBlock>
            </div>
          </div>
          <div className="example__row">
            <p className="example__label example__label--bad">
              <span aria-hidden="true">✗</span> Schlechter Ansatz
            </p>
            <div className="example__content example__content--bad">
              <MdBlock>{example.bad}</MdBlock>
            </div>
          </div>
          <div className="example__row">
            <p className="example__label example__label--good">
              <span aria-hidden="true">✓</span> Besserer Ansatz
            </p>
            <div className="example__content example__content--good">
              <MdBlock>{example.good}</MdBlock>
            </div>
          </div>
          <div className="example__row">
            <p className="example__label example__label--neutral">Warum?</p>
            <div className="example__content">
              <MdBlock>{example.why}</MdBlock>
            </div>
          </div>
          <div className="example__row">
            <p className="example__label example__label--neutral">Ergebnis</p>
            <div className="example__content">
              <MdBlock>{example.result}</MdBlock>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ----------------------------------------------------------- Accordion */

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="accordion">
      <summary>
        <IconChevronRight size={15} className="accordion__chev" />
        {title}
      </summary>
      <div className="accordion__body">{children}</div>
    </details>
  )
}

/* ----------------------------------------------------- Blockdarstellung */

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'lead':
      return (
        <div className="lesson__lead">
          <MdBlock>{block.md}</MdBlock>
        </div>
      )

    case 'text':
      return <MdBlock>{block.md}</MdBlock>

    case 'callout':
      return <Callout variant={block.variant} title={block.title} md={block.md} />

    case 'list':
      return block.ordered ? (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>
              <Md>{item}</Md>
            </li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Md>{item}</Md>
            </li>
          ))}
        </ul>
      )

    case 'steps':
      return (
        <ol className="steps">
          {block.items.map((item, i) => (
            <li key={i}>
              <div className="steps__title">
                <Md>{item.title}</Md>
              </div>
              <div className="steps__body">
                <Md>{item.md}</Md>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'table':
      return (
        <div className="tablewrap">
          <table className="table">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">
                    <Md>{h}</Md>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <Md>{cell}</Md>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && <p className="table__caption">{block.caption}</p>}
        </div>
      )

    case 'prompt':
      return <PromptBlock prompt={block.prompt} title={block.title} note={block.note} />

    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} caption={block.caption} />

    case 'compare':
      return (
        <div className="compare">
          <div className="compare__cols">
            <div className="compare__col compare__col--bad">
              <p className="compare__head">{block.badTitle ?? 'Schlechter Ansatz'}</p>
              <MdBlock>{block.badMd}</MdBlock>
            </div>
            <div className="compare__col compare__col--good">
              <p className="compare__head">{block.goodTitle ?? 'Besserer Ansatz'}</p>
              <MdBlock>{block.goodMd}</MdBlock>
            </div>
          </div>
          <div className="compare__why">
            <strong>Warum? </strong>
            <Md>{block.why}</Md>
          </div>
        </div>
      )

    case 'simple':
      return <SimpleLevels levels={block.levels} />

    case 'example':
      return <ExampleBlock title={block.title} example={block.example} />

    case 'accordion':
      return (
        <Accordion title={block.title}>
          {block.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </Accordion>
      )

    case 'quote':
      return (
        <blockquote className="callout callout--info">
          <MdBlock>{block.md}</MdBlock>
          {block.source && <p className="simple__hint">— {block.source}</p>}
        </blockquote>
      )

    case 'source':
      return (
        <p className="simple__hint">
          <Md>{`Quelle: ${block.md}`}</Md>
        </p>
      )

    default:
      return null
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </>
  )
}
