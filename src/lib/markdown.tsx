import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export { stripMd } from './text'

/**
 * Sehr kleiner Inline-Markdown-Renderer.
 *
 * Unterstützt bewusst nur das, was die Lerninhalte brauchen:
 *   **fett**, *kursiv*, `code`, [Text](/pfad) und Zeilenumbrüche.
 *
 * Erzeugt React-Elemente statt HTML-Strings – kein `dangerouslySetInnerHTML`,
 * damit Inhalte niemals als Markup interpretiert werden können.
 */

type Token =
  | { t: 'text'; v: string }
  | { t: 'bold'; v: string }
  | { t: 'italic'; v: string }
  | { t: 'code'; v: string }
  | { t: 'link'; v: string; href: string }

const PATTERN =
  /(\*\*[^*]+\*\*)|(`[^`]+`)|(\[[^\]]+\]\([^)\s]+\))|(\*[^*\n]+\*)/g

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  let m: RegExpExecArray | null

  PATTERN.lastIndex = 0
  while ((m = PATTERN.exec(input)) !== null) {
    if (m.index > last) tokens.push({ t: 'text', v: input.slice(last, m.index) })
    const raw = m[0]

    if (raw.startsWith('**')) {
      tokens.push({ t: 'bold', v: raw.slice(2, -2) })
    } else if (raw.startsWith('`')) {
      tokens.push({ t: 'code', v: raw.slice(1, -1) })
    } else if (raw.startsWith('[')) {
      const split = raw.indexOf('](')
      tokens.push({
        t: 'link',
        v: raw.slice(1, split),
        href: raw.slice(split + 2, -1),
      })
    } else {
      tokens.push({ t: 'italic', v: raw.slice(1, -1) })
    }
    last = m.index + raw.length
  }

  if (last < input.length) tokens.push({ t: 'text', v: input.slice(last) })
  return tokens
}

function renderTokens(input: string, keyPrefix: string): ReactNode[] {
  return tokenize(input).map((tok, i) => {
    const key = `${keyPrefix}-${i}`
    switch (tok.t) {
      case 'bold':
        return <strong key={key}>{tok.v}</strong>
      case 'italic':
        return <em key={key}>{tok.v}</em>
      case 'code':
        return <code key={key}>{tok.v}</code>
      case 'link': {
        const isInternal = tok.href.startsWith('/')
        if (isInternal) {
          return (
            <Link key={key} to={tok.href}>
              {tok.v}
            </Link>
          )
        }
        return (
          <a key={key} href={tok.href} target="_blank" rel="noreferrer noopener">
            {tok.v}
          </a>
        )
      }
      default:
        return <Fragment key={key}>{tok.v}</Fragment>
    }
  })
}

/** Inline-Markdown ohne umgebenden Block (für Listeneinträge, Tabellenzellen …). */
export function Md({ children }: { children: string }) {
  const lines = children.split('\n')
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {renderTokens(line, `l${i}`)}
        </Fragment>
      ))}
    </>
  )
}

/**
 * Markdown als Absätze. Leerzeilen trennen Absätze; einzelne Umbrüche
 * bleiben als `<br>` erhalten. Zeilen, die mit `- ` beginnen, werden zu
 * einer Liste zusammengefasst.
 */
export function MdBlock({ children, className }: { children: string; className?: string }) {
  const paragraphs = children.trim().split(/\n{2,}/)

  return (
    <div className={className}>
      {paragraphs.map((para, i) => {
        const lines = para.split('\n')
        const isList = lines.every((l) => l.trim().startsWith('- '))

        if (isList) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>
                  <Md>{l.trim().slice(2)}</Md>
                </li>
              ))}
            </ul>
          )
        }

        const isNumbered = lines.every((l) => /^\d+\.\s/.test(l.trim()))
        if (isNumbered) {
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>
                  <Md>{l.trim().replace(/^\d+\.\s/, '')}</Md>
                </li>
              ))}
            </ol>
          )
        }

        const heading = para.match(/^(#{2,4})\s+(.*)$/)
        if (heading && lines.length === 1) {
          const level = heading[1].length
          const text = heading[2]
          if (level === 2) return <h3 key={i}>{<Md>{text}</Md>}</h3>
          if (level === 3) return <h4 key={i}>{<Md>{text}</Md>}</h4>
          return <h5 key={i}>{<Md>{text}</Md>}</h5>
        }

        return (
          <p key={i}>
            <Md>{para}</Md>
          </p>
        )
      })}
    </div>
  )
}
