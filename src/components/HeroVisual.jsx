import { LineChart } from './charts.jsx'
import { HERO_SERIES, HERO_TILES, formatAud } from '../data/market.js'
import { ArrowRight } from './icons.jsx'

/**
 * HeroVisual - what the dashboard looks like.
 *
 * One hero figure, one trend line, two supporting tiles. Everything on it is
 * labelled sample data in the panel head as well as in the note at the foot,
 * because a visitor who reads only the top of a panel should still know the
 * numbers are not live.
 *
 * The value is in Australian dollars with the A$ prefix, which is the market
 * this is built for.
 */
export default function HeroVisual() {
  // The series is indexed to 100. Scale it to a portfolio figure so the line
  // and the headline number describe the same thing rather than two.
  const START = 44200
  const scaled = HERO_SERIES.map((v) => (v / 100) * START)
  const latest = scaled[scaled.length - 1]
  const change = ((latest - START) / START) * 100

  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <p className="panel__title">Portfolio overview</p>
          <p className="panel__sub">Sample account, last 44 sessions</p>
        </div>
        <span className="panel__tag">Sample data</span>
      </div>

      <p
        style={{
          fontSize: '0.78rem',
          color: 'var(--muted)',
          marginBottom: 2,
        }}
      >
        Marked value
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 2.6rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: 6,
        }}
      >
        {formatAud(latest)}
      </p>
      <p
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.85rem',
          fontWeight: 600,
          color: change >= 0 ? 'var(--div-pos)' : 'var(--div-neg)',
          marginBottom: 18,
        }}
      >
        <ArrowRight size={15} style={{ transform: change >= 0 ? 'rotate(-45deg)' : 'rotate(45deg)' }} />
        {change >= 0 ? '+' : ''}
        {change.toFixed(1)}% across the period shown
      </p>

      <LineChart
        data={scaled}
        tone="var(--series-1)"
        formatValue={(v) => `A$${Math.round(v / 1000)}k`}
        pointLabels={{ low: 'Start', last: 'Today' }}
        ariaLabel="Illustrative sample portfolio value across 44 sessions"
      />

      <div className="tiles" style={{ marginTop: 18 }}>
        {HERO_TILES.map((t) => (
          <div className="tile" key={t.label}>
            <p className="tile__label">{t.label}</p>
            <p className="tile__value">{t.value}</p>
            {t.delta && (
              <p className="tile__delta" data-dir={t.delta}>
                {t.label === 'Marked this week' ? 'Sample movement' : ''}
              </p>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
