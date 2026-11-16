import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { HIGHLIGHTS } from '../data/content.js'
import { CheckCircle } from './icons.jsx'

/**
 * Highlights - the four points from the content document, as cards.
 *
 * The lead phrase is bolded inside the sentence rather than promoted to a
 * heading. "Four markets, one account" is not a section title, and making it
 * one would put four lower-case headings in the document outline.
 */
export default function Highlights() {
  return (
    <section className="section section--surface" id="highlights">
      <div className="wrap">
        <Reveal>
          <SectionHead title={HIGHLIGHTS.h2} center />
        </Reveal>

        <div className="cards">
          {HIGHLIGHTS.items.map((item, i) => (
            <Reveal className="card" key={item.body} style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="card__icon" aria-hidden="true">
                <CheckCircle size={19} />
              </span>
              <p className="card__text">
                {item.lead && <strong>{item.lead} </strong>}
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
