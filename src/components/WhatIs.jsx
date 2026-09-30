import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { WHAT_IS } from '../data/content.js'
import { Check } from './icons.jsx'

/**
 * WhatIs - what the service actually is, in plain language.
 *
 * Three short paragraphs rather than one long one, because the third is the
 * only one that says what the product does and a reader skimming has to be
 * able to land on it.
 */
export default function WhatIs() {
  return (
    <section className="section section--paper" id="what-is">
      <div className="wrap">
        {/* split--reverse puts the visual on the LEFT and the copy on the
            right, at the operator's request on 2026-09-28. Note that the
            Method section below already had that arrangement, so both now
            face the same way rather than alternating. */}
        <div className="split split--reverse">
          <Reveal>
            <SectionHead eyebrow={WHAT_IS.eyebrow} title={WHAT_IS.h2} />
            {WHAT_IS.body.map((p, i) => (
              <p key={i} style={{ color: 'var(--muted)', marginBottom: 14, lineHeight: 1.72 }}>
                {p}
              </p>
            ))}
            <ul className="tick-list">
              {WHAT_IS.ticks.map((t) => (
                <li key={t}>
                  <Check size={18} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Supplied illustration, standing in for the allocation panel that
              was here. Converted from the operator's source by hand - see the
              note in the README about regenerating it. */}
          <Reveal className="split__visual">
            <img
              className="section-figure"
              src="/portfolio-app.webp"
              srcSet="/portfolio-app-400.webp 400w, /portfolio-app-800.webp 800w, /portfolio-app.webp 1000w"
              sizes="(max-width: 560px) calc(100vw - 40px), 520px"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              alt="A phone showing a portfolio app, with cards representing markets and holdings."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
