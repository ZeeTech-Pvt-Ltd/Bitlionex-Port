import { useState } from 'react'
import { ChevronDown } from './icons.jsx'

/**
 * Faq - the accordion.
 *
 * A real button per question, so it is reachable and operable by keyboard and
 * announces its own state. The panel is tied to the button with
 * aria-controls and labelled by it, and the answer region stays in the DOM
 * when closed (hidden), so in-page search still finds the text.
 *
 * The first question opens by default on the full FAQ page. On the homepage
 * teaser everything starts closed, because a section that opens mid-question
 * above the fold pulls the eye away from the form below it.
 *
 * `headingLevel` matters and is not cosmetic. On /faq the accordion sits
 * directly under the page's h1, so its questions have to be h2s - wrapping
 * them in h3 skips a level, which is a real navigation problem for anyone
 * moving through the page by heading. On the homepage the accordion sits under
 * the section's own h2, so h3 is correct there.
 *
 * @param {{ items: Array, limit?: number, defaultOpen?: number,
 *           idPrefix?: string, headingLevel?: 2|3 }} props
 */
export default function Faq({
  items,
  limit,
  defaultOpen = null,
  idPrefix = 'faq',
  headingLevel = 3,
}) {
  const [open, setOpen] = useState(defaultOpen)
  const shown = limit ? items.slice(0, limit) : items
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <div className="faq">
      {shown.map((item, i) => {
        const isOpen = open === i
        const panelId = `${idPrefix}-panel-${i}`
        const buttonId = `${idPrefix}-button-${i}`
        return (
          <div className="faq__item" key={item.q}>
            <Heading style={{ margin: 0, font: 'inherit' }}>
              <button
                type="button"
                id={buttonId}
                className="faq__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <ChevronDown size={19} className="faq__chev" />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq__panel"
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
