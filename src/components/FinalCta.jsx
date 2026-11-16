import Reveal from './Reveal.jsx'
import { FINAL_CTA } from '../data/content.js'

/**
 * FinalCta - the closing block, on a deep indigo ground.
 *
 * Short on purpose. Everything above it has already made the argument, so
 * this only has to repeat the offer and get out of the way. One button, the
 * one the content document names, pointing at the form above it.
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
              {FINAL_CTA.cta}
            </a>
          </div>
          <p className="cta__micro">{FINAL_CTA.micro}</p>
        </Reveal>
      </div>
    </section>
  )
}
