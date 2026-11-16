import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { MARKETS } from '../data/content.js'

/**
 * Markets - the four markets the document names, as rows.
 *
 * Rows rather than cards because the point is the comparison: four markets,
 * one account. The badge is a label, not a logo, and the full sentence sits
 * beside it so the row reads the same way with styles off.
 */
export default function Markets() {
  return (
    <section className="section section--paper" id="markets">
      <div className="wrap">
        <Reveal>
          <SectionHead title={MARKETS.h2} />
        </Reveal>

        <div className="coverage">
          {MARKETS.rows.map((row, i) => (
            <Reveal className="cov-row" key={row.name} style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="cov-row__badge" aria-hidden="true">
                {row.badge}
              </span>
              <span className="cov-row__body">
                <span className="cov-row__name">{row.name}:</span>
                <span className="cov-row__meta" style={{ display: 'block' }}>
                  {row.body}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
