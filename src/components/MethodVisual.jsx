import { Sparkline } from './charts.jsx'
import { HERO_SPARK, SIGNALS } from '../data/market.js'

/**
 * MethodVisual - the scorecard, opened up.
 *
 * Two halves. On the left, the five measures every position is scored on, as
 * bars. On the right, the inputs those measures are built from, named.
 *
 * The point of the panel is that a reader can see what went in. A score you
 * cannot interrogate is an opinion with a number on it, so the inputs are
 * listed in full rather than summarised as "market data".
 *
 * One colour for every bar. Shading each bar darker where it is longer would
 * double-encode a length the bar already shows, and would leave the reader
 * with no way to tell a long weak measure from a short strong one.
 */
export default function MethodVisual() {
  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <p className="panel__title">Scorecard, one position</p>
          <p className="panel__sub">Worked example, updated daily</p>
        </div>
        <span className="panel__tag">Sample data</span>
      </div>

      <div className="score">
        {SIGNALS.map((s) => (
          <div className="score__row" key={s.label}>
            <span className="score__label">{s.label}</span>
            <span className="score__track">
              <span
                className="score__fill"
                style={{ width: `${s.score}%` }}
                role="img"
                aria-label={`${s.label}: ${s.score} out of 100`}
              />
            </span>
            <span className="score__value">{s.score}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginTop: 22,
          paddingTop: 18,
          borderTop: '1px solid var(--border)',
        }}
      >
        <div>
          <p style={{ fontSize: '0.82rem', fontWeight: 600 }}>Trend, last 22 sessions</p>
          <p style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>Same measure, plotted</p>
        </div>
        <Sparkline data={HERO_SPARK} tone="var(--series-2)" width={120} height={36} label="Trend measure across 22 sessions" />
      </div>

    </div>
  )
}
