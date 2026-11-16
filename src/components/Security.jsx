import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { SECURITY } from '../data/content.js'
import { CheckCircle, Shield, Wallet } from './icons.jsx'

const ICONS = [Shield, Shield, Wallet, CheckCircle]

/**
 * Security - the dark band.
 *
 * The content document puts four security points and the risk notice in the
 * same section, and that ordering is kept: the promises on the left, the
 * warning beside them rather than in small grey text after the form. The
 * registration form is below this section on the page, never above it.
 */
export default function Security() {
  return (
    <section className="section section--deep" id="security">
      <div className="wrap">
        <Reveal>
          <SectionHead title={SECURITY.h2} />
        </Reveal>

        <div className="security__grid">
          <ul className="risk__list security__list">
            {SECURITY.items.map((item, i) => {
              const Icon = ICONS[i] || Shield
              return (
                <li key={item.lead}>
                  <Icon size={19} />
                  <span>
                    <strong>{item.lead}:</strong> {item.body}
                  </span>
                </li>
              )
            })}
          </ul>

          <Reveal className="risk-notice">
            <h3>Risk Notice</h3>
            <p>{SECURITY.riskNotice}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="section-cta">
            <a className="btn btn--on-deep" href="#register" data-scroll="#register">
              {SECURITY.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
