import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { WHAT_IS } from '../data/content.js'

/**
 * WhatIs - the definition from the content document, followed by the reason
 * the product exists.
 *
 * Two paragraphs rather than three: the definition is split at "It sends you"
 * to keep the sentence length inside the house limit. No words were cut.
 */
export default function WhatIs() {
  return (
    <section className="section section--paper" id="what-is">
      <div className="wrap">
        <div className="split">
          <Reveal>
            <SectionHead title={WHAT_IS.h2} />
            {WHAT_IS.body.map((p, i) => (
              <p key={i} style={{ color: 'var(--muted)', marginBottom: 14, lineHeight: 1.72 }}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal className="split__visual">
            <img
              className="section-figure"
              src={WHAT_IS.image.src}
              srcSet={WHAT_IS.image.srcSet}
              sizes="(max-width: 560px) calc(100vw - 40px), 520px"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              alt={WHAT_IS.image.alt}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
