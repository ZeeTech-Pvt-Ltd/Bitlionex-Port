import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { FEATURES } from '../data/content.js'
import { CheckCircle, Clock, Compass, PieChart, Shield } from './icons.jsx'

const ICONS = [CheckCircle, Shield, Clock, PieChart, Compass]

/**
 * Features - the five features from the content document, in a bento grid.
 *
 * The first feature is the one the whole product rests on, so it gets the
 * wide card and the deep indigo ground. The other four sit in a row beneath
 * it. This is deliberately not the same card grid the highlights and reasons
 * use: five identical boxes made the section read as filler rather than as
 * the detailed half of the page.
 *
 * The feature name is a bold line rather than a heading. "Signals that explain
 * themselves" is copy from a bullet, not a section title, and five extra
 * headings would flatten the document outline.
 */
export default function Features() {
  return (
    <section className="section section--surface" id="features">
      <div className="wrap">
        <Reveal>
          <SectionHead title={FEATURES.h2} center />
        </Reveal>

        <div className="feature-bento">
          {FEATURES.items.map((item, i) => {
            const Icon = ICONS[i] || CheckCircle
            const lead = i === 0
            return (
              <Reveal
                className={`feature-card${lead ? ' feature-card--lead' : ''}`}
                key={item.lead}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="feature-card__icon" aria-hidden="true">
                  <Icon size={lead ? 24 : 19} />
                </span>
                <p className="feature-card__title">{item.lead}:</p>
                <p className="feature-card__body">{item.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
