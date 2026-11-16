import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { FEATURES } from '../data/content.js'
import { CheckCircle, Clock, Compass, PieChart, Shield } from './icons.jsx'

const ICONS = [CheckCircle, Shield, Clock, PieChart, Compass]

/**
 * Features - the five features from the content document.
 *
 * Five cards in a grid that fits as many as the screen allows. The fifth does
 * not get a stretched card; it simply starts the next row, which is the honest
 * shape for an odd number.
 */
export default function Features() {
  return (
    <section className="section section--surface" id="features">
      <div className="wrap">
        <Reveal>
          <SectionHead title={FEATURES.h2} center />
        </Reveal>

        <div className="cards">
          {FEATURES.items.map((item, i) => {
            const Icon = ICONS[i] || CheckCircle
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
      </div>
    </section>
  )
}
