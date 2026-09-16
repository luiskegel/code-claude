import { Fragment, type ReactNode } from 'react'
import type { CodeLang } from '../content/types'

/**
 * Kleiner, abhängigkeitsfreier Syntax-Highlighter.
 *
 * Er deckt genau die Sprachen ab, die in den Lektionen vorkommen, und arbeitet
 * zeilenweise mit einer regulären Ausdrucksfolge. Kein externer Highlighter –
 * das hält den Build klein und die Seite schnell.
 */

interface Rule {
  re: RegExp
  cls: string
}

const COMMON_STRING: Rule = { re: /"[^"\n]*"|'[^'\n]*'|`[^`\n]*`/, cls: 'tok-string' }
const COMMON_NUMBER: Rule = { re: /\b\d+(\.\d+)?\b/, cls: 'tok-number' }

const RULES: Record<CodeLang, Rule[]> = {
  bash: [
    { re: /#.*$/, cls: 'tok-comment' },
    COMMON_STRING,
    {
      re: /(^|\s)(cd|ls|dir|pwd|mkdir|echo|cat|git|npm|node|claude|rm|mv|cp|open|curl)\b/,
      cls: 'tok-keyword',
    },
    { re: /\s--?[a-zA-Z][\w-]*/, cls: 'tok-fn' },
  ],
  json: [
    COMMON_STRING,
    COMMON_NUMBER,
    { re: /\b(true|false|null)\b/, cls: 'tok-keyword' },
    { re: /[{}[\],:]/, cls: 'tok-punct' },
  ],
  ts: [
    { re: /\/\/.*$/, cls: 'tok-comment' },
    COMMON_STRING,
    {
      re: /\b(import|from|export|const|let|var|function|return|await|async|new|if|else|for|while|type|interface|class|extends|default)\b/,
      cls: 'tok-keyword',
    },
    { re: /\b[a-zA-Z_$][\w$]*(?=\()/, cls: 'tok-fn' },
    COMMON_NUMBER,
    { re: /[{}[\]();,.:]/, cls: 'tok-punct' },
  ],
  python: [
    { re: /#.*$/, cls: 'tok-comment' },
    COMMON_STRING,
    {
      re: /\b(import|from|def|class|return|if|elif|else|for|while|with|as|try|except|print|True|False|None|and|or|not|in|is)\b/,
      cls: 'tok-keyword',
    },
    { re: /\b[a-zA-Z_][\w]*(?=\()/, cls: 'tok-fn' },
    COMMON_NUMBER,
    { re: /[{}[\]();,.:=]/, cls: 'tok-punct' },
  ],
  markdown: [
    { re: /^#{1,6}\s.*$/, cls: 'tok-head' },
    { re: /\*\*[^*]+\*\*/, cls: 'tok-keyword' },
    { re: /`[^`]+`/, cls: 'tok-string' },
    { re: /^\s*[-*]\s/, cls: 'tok-punct' },
  ],
  text: [
    { re: /^\+.*$/, cls: 'tok-add' },
    { re: /^-(?!--).*$/, cls: 'tok-del' },
    { re: /^@@.*@@/, cls: 'tok-fn' },
    { re: /\[[A-ZÄÖÜ][A-ZÄÖÜ0-9 _/-]*\]/, cls: 'tok-ph' },
    { re: /^(---|===).*$/, cls: 'tok-comment' },
  ],
}

interface Piece {
  text: string
  cls?: string
}

function highlightLine(line: string, rules: Rule[]): Piece[] {
  if (!line) return [{ text: '' }]

  // Eine kombinierte Regex mit benannten Gruppen pro Regel.
  const combined = new RegExp(
    rules.map((r, i) => `(?<g${i}>${r.re.source})`).join('|'),
    'gm'
  )

  const pieces: Piece[] = []
  let last = 0
  let m: RegExpExecArray | null

  while ((m = combined.exec(line)) !== null) {
    if (m[0].length === 0) {
      combined.lastIndex += 1
      continue
    }
    if (m.index > last) pieces.push({ text: line.slice(last, m.index) })

    let cls: string | undefined
    const groups = m.groups ?? {}
    for (let i = 0; i < rules.length; i++) {
      if (groups[`g${i}`] !== undefined) {
        cls = rules[i].cls
        break
      }
    }
    pieces.push({ text: m[0], cls })
    last = m.index + m[0].length
  }

  if (last < line.length) pieces.push({ text: line.slice(last) })
  return pieces
}

/** Hebt Platzhalter wie [ROLLE] in Prompts hervor. */
export function highlightPrompt(code: string): ReactNode {
  const parts = code.split(/(\[[^\]\n]{1,60}\])/g)
  return parts.map((part, i) =>
    /^\[[^\]\n]+\]$/.test(part) ? (
      <span className="tok-ph" key={i}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

export function highlight(code: string, lang: CodeLang): ReactNode {
  const rules = RULES[lang] ?? RULES.text
  const lines = code.split('\n')

  return lines.map((line, li) => (
    <Fragment key={li}>
      {li > 0 && '\n'}
      {highlightLine(line, rules).map((p, pi) =>
        p.cls ? (
          <span className={p.cls} key={pi}>
            {p.text}
          </span>
        ) : (
          <Fragment key={pi}>{p.text}</Fragment>
        )
      )}
    </Fragment>
  ))
}
