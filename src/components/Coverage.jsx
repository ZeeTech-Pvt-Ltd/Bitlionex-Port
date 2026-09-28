import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { COVERAGE } from '../data/market.js'
import { COVERAGE_COPY } from '../data/content.js'

/**
 * Coverage - what the tracker accepts.
 *
 * Laid out as rows rather than cards, because the thing that matters is the
 * comparison between them (this one gets full data, that one gets a review
 * each quarter) and a row makes that comparison easier than five boxes do.
 *
 * The two rows most platforms leave out are the last two: stablecoins, which
 * people hold but rarely count, and the cash they have not deployed. Both
 * belong in a picture of what someone owns.
 */
export default function Coverage() {
  return (
    <section className="section section--surface" id="coverage">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow={COVERAGE_COPY.eyebrow} title={COVERAGE_COPY.h2} lede={COVERAGE_COPY.lede} />
        </Reveal>

        <div className="coverage">
          {COVERAGE.map((row, i) => (
            <Reveal className="cov-row" key={row.name} style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="cov-row__badge" aria-hidden="true">
                {row.badge}
              </span>
              <span className="cov-row__body">
                <span className="cov-row__name">{row.name}</span>
                <span className="cov-row__meta" style={{ display: 'block' }}>
                  {row.meta}
                </span>
              </span>
              <span className="cov-row__weight">{row.weight}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
