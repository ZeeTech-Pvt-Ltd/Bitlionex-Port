import { LineChart } from './charts.jsx'
import { DRAWDOWN, DRAWDOWN_STATS } from '../data/market.js'

/**
 * RiskVisual - what a bad stretch looks like, drawn.
 *
 * This panel sits inside the dark band and is deliberately unflattering. The
 * series is a sustained fall with a slow, partial recovery, because that is
 * what the asset class has actually done and a chart that only ever goes up
 * would be the single most misleading thing on the site.
 *
 * The line is amber rather than indigo. Amber is the palette's warm pole, and
 * on this dark ground it is the colour that reads as caution without having
 * to borrow the red that means an error.
 */
export default function RiskVisual() {
  const values = DRAWDOWN.map((d) => d.value)

  return (
    <div
      className="panel"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        borderColor: 'rgba(255, 255, 255, 0.14)',
        boxShadow: 'none',
      }}
    >
      <div className="panel__head">
        <div>
          <p className="panel__title" style={{ color: '#fff' }}>
            {DRAWDOWN_STATS[0].label}
          </p>
          <p className="panel__sub" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            A worked example, drawn to scale
          </p>
        </div>
        <span
          className="panel__tag"
          style={{ background: 'rgba(255, 255, 255, 0.12)', color: 'var(--sand-bright)' }}
        >
          Illustrative
        </span>
      </div>

      {/* The chart's own text tokens are tuned for a light surface, so the
          axis and grid are re-pointed here rather than left unreadable on the
          dark ground. */}
      <div style={{ '--grid': 'rgba(255, 255, 255, 0.16)', '--axis-text': 'rgba(255, 255, 255, 0.72)', '--ink': '#fff', '--paper': '#322e80' }}>
        <LineChart
          data={values}
          tone="var(--sand-bright)"
          height={180}
          formatValue={(v) => `${Math.round(v)}`}
          pointLabels={{ low: 'Peak', last: 'Today' }}
          ariaLabel="Illustrative example of a portfolio falling 34 percent from its peak"
        />
      </div>

      <div className="tiles" style={{ marginTop: 20, gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {DRAWDOWN_STATS.map((s) => (
          <div
            className="tile"
            key={s.label}
            style={{ background: 'rgba(255, 255, 255, 0.08)' }}
          >
            <p className="tile__label" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {s.label}
            </p>
            <p className="tile__value" style={{ color: '#fff' }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
