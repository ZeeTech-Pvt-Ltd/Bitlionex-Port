import HeroVisual from './HeroVisual.jsx'
import { HERO } from '../data/content.js'
import { Check } from './icons.jsx'

/**
 * Hero.
 *
 * The headline carries the brand name, because the brand name is the page's
 * primary term and a hero is where it belongs. The two buttons are a primary
 * action and a way to keep reading, in that order: someone who is not ready
 * to sign up should have somewhere to go that is not the back button.
 *
 * The two discs behind the panel are decoration and are marked aria-hidden.
 * They come straight from the reference palette, mint and sand on the cool
 * off white canvas.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__blob hero__blob--mint" aria-hidden="true" />
      <div className="hero__blob hero__blob--sand" aria-hidden="true" />

      <div className="wrap">
        <div className="hero__grid">
          <div>
            <p className="eyebrow">{HERO.eyebrow}</p>
            <h1>{HERO.h1}</h1>
            <p className="hero__lede">{HERO.lede}</p>

            <div className="hero__cta">
              <a className="btn btn--primary" href="#register" data-scroll="#register">
                {HERO.primaryCta}
              </a>
              <a className="btn btn--ghost" href="#how-it-works" data-scroll="#how-it-works">
                {HERO.secondaryCta}
              </a>
            </div>

            <ul className="hero__points">
              {HERO.points.map((p) => (
                <li className="hero__point" key={p}>
                  <Check size={17} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
