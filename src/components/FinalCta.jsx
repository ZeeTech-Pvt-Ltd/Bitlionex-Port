import Reveal from './Reveal.jsx'
import { FINAL_CTA } from '../data/content.js'

/**
 * FinalCta - the closing block, on a deep indigo ground.
 *
 * Short on purpose. Everything above it has already made the argument, so
 * this only has to repeat the offer and get out of the way. The second button
 * goes to the FAQ rather than back to the top of the page, because the people
 * still reading at this point usually have one specific question left.
 */
export default function FinalCta() {
  return (
    <section className="section section--tight">
      <div className="wrap">
        <Reveal className="cta">
          <div className="cta__blob cta__blob--a" aria-hidden="true" />
          <div className="cta__blob cta__blob--b" aria-hidden="true" />
          <h2>{FINAL_CTA.h2}</h2>
          <p>{FINAL_CTA.body}</p>
          <div className="cta__actions">
            <a className="btn btn--on-deep" href="#register" data-scroll="#register">
              {FINAL_CTA.primaryCta}
            </a>
            <a
              className="btn btn--ghost"
              href={FINAL_CTA.secondaryHref}
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.45)' }}
            >
              {FINAL_CTA.secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
