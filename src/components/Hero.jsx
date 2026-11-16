import HeroVisual from './HeroVisual.jsx'
import { HERO } from '../data/content.js'

/**
 * Hero.
 *
 * The headline and subheading come straight from the operator's content
 * document. There is one action, not two: the document gives a single call to
 * action, and a second button would be copy nobody asked for.
 *
 * The microcopy under the button comes from the same document and repeats the
 * three things that stop a visitor at this point: time, cost and privacy.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__blob hero__blob--mint" aria-hidden="true" />
      <div className="hero__blob hero__blob--sand" aria-hidden="true" />

      <div className="wrap">
        <div className="hero__grid">
          <div>
            <h1>{HERO.h1}</h1>
            <p className="hero__lede">{HERO.lede}</p>

            <div className="hero__cta">
              <a className="btn btn--primary" href="#register" data-scroll="#register">
                {HERO.primaryCta}
              </a>
            </div>

            <p className="hero__micro">{HERO.micro}</p>
          </div>

          <div className="hero__visual">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
