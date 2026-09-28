import { Fragment } from 'react'

/**
 * RichText - renders a data string, styling any [PLACEHOLDER: ...] token it
 * contains.
 *
 * The legal documents and a few copy strings carry their placeholder tokens
 * inline, because that keeps the sentence readable in the source. The problem
 * with that is they then render as plain body text, and a bracketed value in
 * the same grey as everything around it is easy to read past.
 *
 * Rather than hand-splitting every string at its call site, this does it once:
 * the token comes out in the loud .ph style, everything else stays ordinary.
 *
 * It deliberately does not interpret any other markup. A data string is text,
 * not HTML, and the one thing this must never become is an injection point.
 */

const TOKEN = /\[PLACEHOLDER:[^\]]*\]/g

export default function RichText({ text, as: Tag = Fragment }) {
  const parts = String(text ?? '').split(TOKEN)
  const tokens = String(text ?? '').match(TOKEN) || []

  if (!tokens.length) return Tag === Fragment ? text : <Tag>{text}</Tag>

  const nodes = []
  parts.forEach((part, i) => {
    if (part) nodes.push(<Fragment key={`t${i}`}>{part}</Fragment>)
    if (tokens[i]) {
      nodes.push(
        <span className="ph" key={`p${i}`}>
          {tokens[i]}
        </span>,
      )
    }
  })

  return Tag === Fragment ? <>{nodes}</> : <Tag>{nodes}</Tag>
}
