import Reveal from './Reveal.jsx'
import { RISK } from '../data/content.js'
import { Alert, Gauge, PieChart, TrendDown, Wallet } from './icons.jsx'

// Each warning gets the icon that matches what it is about, rather than four
// triangles saying "warning" four times over a list that already says it once
// in the heading. The keys match `icon` in RISKS (src/data/market.js).
//
// Alert stays as the fallback: a risk added without an icon gets a warning
// triangle, which is generic but correct, rather than nothing.
const RISK_ICON = {
  falling: TrendDown,
  score: Gauge,
  concentration: PieChart,
  custody: Wallet,
}

/**
 * RiskBand - the dark one.
 *
 * Positioned above the registration form on purpose. A reader should meet the
 * downside before being asked for a phone number, not after. That single
 * ordering choice is why this section exists as its own component rather than
 * as a paragraph bolted onto the footer.
 *
 * The deeper indigo ground is the only dark surface on the page, so the
 * change of tone does the work of saying "this bit is different" without
 * needing a heading that says so.
 */
export default function RiskBand() {
  return (
    <section className="section section--deep" id="risk">
      <div className="wrap">
        <div className="risk__grid">
          <Reveal>
            <p className="eyebrow">{RISK.eyebrow}</p>
            <h2>{RISK.h2}</h2>
            <p className="lede">{RISK.lede}</p>

            <ul className="risk__list">
              {RISK.risks.map((r) => {
                const Icon = RISK_ICON[r.icon] ?? Alert
                return (
                  <li key={r.title}>
                    <Icon size={19} />
                    <span>
                      <strong>{r.title}</strong> {r.body}
                    </span>
                  </li>
                )
              })}
            </ul>

            <p
              style={{
                marginTop: 30,
                paddingTop: 24,
                borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                color: 'rgba(255, 255, 255, 0.86)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}
            >
              {RISK.closing}
            </p>
          </Reveal>

          <Reveal>
            <h3 style={{ marginBottom: 10 }}>{RISK.drawdownHeading}</h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.82)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              {RISK.drawdownBody}
            </p>
            <img
              className="section-figure"
              src="/market-app.webp"
              width="1000"
              height="1000"
              alt="An illustration of a market app on a phone, with cards representing a currency pair and a market index."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
