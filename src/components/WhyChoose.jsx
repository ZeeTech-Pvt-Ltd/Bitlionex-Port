import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { WHY } from '../data/content.js'
import { ArrowRight, Check, Clock, User } from './icons.jsx'

// One icon per reason, matched to what the sentence is about. Repeating a
// single tick four times would turn four different points into one texture.
const ICONS = [Check, Clock, ArrowRight, User]

/**
 * WhyChoose - the four reasons from the content document.
 *
 * The lead phrase is bolded inside the sentence, not turned into a heading;
 * "Easy to follow" is a phrase from a bullet, not a section title.
 */
export default function WhyChoose() {
  return (
    <section className="section section--paper" id="why-choose">
      <div className="wrap">
        <Reveal>
          <SectionHead title={WHY.h2} center />
        </Reveal>

        <div className="cards">
          {WHY.items.map((item, i) => {
            const Icon = ICONS[i] || Check
            return (
              <Reveal className="card" key={item.lead} style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="card__icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <p className="card__text">
                  <strong>{item.lead}:</strong> {item.body}
                </p>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="section-cta">
            <a className="btn btn--primary" href="#register" data-scroll="#register">
              {WHY.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
