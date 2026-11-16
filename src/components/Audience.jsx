import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { AUDIENCE } from '../data/content.js'
import { Clock, Compass, User } from './icons.jsx'

const ICONS = [User, Clock, Compass]

/**
 * Audience - the three kinds of trader the content document names.
 *
 * Cards rather than a list, because each line is a different reader seeing
 * themselves in it, and three separate surfaces make that easier than one
 * block of bullets does.
 */
export default function Audience() {
  return (
    <section className="section section--surface" id="who-its-for">
      <div className="wrap">
        <Reveal>
          <SectionHead title={AUDIENCE.h2} center />
        </Reveal>

        <div className="cards cards--three">
          {AUDIENCE.items.map((item, i) => {
            const Icon = ICONS[i] || User
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
