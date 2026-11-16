import { ArrowRight } from './icons.jsx'

/**
 * HeroVisual - what one signal alert looks like.
 *
 * The old hero showed a portfolio chart. The content document describes a
 * different product (signals with an entry, a stop and a target), so the panel
 * follows that instead: one worked example with the five fields every alert
 * carries, and the written reason underneath.
 *
 * THE NUMBERS ARE SAMPLE DATA. The panel head and the note at the foot both
 * say so, because a reader who only sees the top of the panel should still
 * know the levels are not live. Do not wire this to a feed without changing
 * both labels and the footer risk notice.
 */
export default function HeroVisual() {
  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <p className="panel__title">Sample signal alert</p>
          <p className="panel__sub">Worked example, not a live trade</p>
        </div>
        <span className="panel__tag">Sample alert</span>
      </div>

      <div className="signal">
        <div className="signal__row">
          <span className="signal__k">Market</span>
          <span className="signal__v">BTC/USD</span>
        </div>
        <div className="signal__row">
          <span className="signal__k">Direction</span>
          <span className="signal__v signal__v--buy">
            Buy
            <ArrowRight size={14} style={{ transform: 'rotate(-45deg)' }} />
          </span>
        </div>
        <div className="signal__row">
          <span className="signal__k">Entry</span>
          <span className="signal__v">68,420</span>
        </div>
        <div className="signal__row">
          <span className="signal__k">Stop-loss</span>
          <span className="signal__v">66,900</span>
        </div>
        <div className="signal__row">
          <span className="signal__k">Take-profit</span>
          <span className="signal__v">71,600</span>
        </div>
      </div>

      <div className="signal__why">
        <p className="signal__why-label">Why this idea</p>
        <p>Momentum turned up after a higher low, with volume confirming the move.</p>
      </div>

      <p className="signal__note">
        Illustrative sample. Not a live signal, not a forecast and not financial advice.
      </p>
    </div>
  )
}
