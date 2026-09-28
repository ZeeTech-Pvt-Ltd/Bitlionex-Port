import { TICKER, formatChange, formatPrice } from '../data/market.js'

/**
 * Ticker - a thin market strip under the hero.
 *
 * Three things worth knowing about this one:
 *
 *   It is a marquee, so the list is rendered TWICE and the animation travels
 *   exactly 50%. One copy would leave a visible gap at the seam every lap.
 *
 *   The second copy is aria-hidden, so a screen reader reads ten assets
 *   instead of twenty.
 *
 *   THE NUMBERS ARE SAMPLE DATA and the strip no longer carries its own
 *   notice - the operator removed it. What still covers this is the risk
 *   warning in the footer, which every page carries and which states that any
 *   figures used to illustrate the dashboard are sample data, not live prices,
 *   not a forecast. Every other generated visual on the site keeps its own
 *   inline note. If this strip is ever wired to a live feed, that footer
 *   sentence has to change with it, or the site is telling readers something
 *   untrue.
 */
export default function Ticker() {
  const items = [...TICKER, ...TICKER]

  return (
    <div className="ticker">
      <div className="ticker__track" aria-hidden="false">
        {items.map((t, i) => (
          <div className="ticker__item" key={`${t.sym}-${i}`} aria-hidden={i >= TICKER.length}>
            <span className="ticker__sym">{t.sym}</span>
            <span className="ticker__name">{t.name}</span>
            <span className="ticker__val">${formatPrice(t.price)}</span>
            <span className="ticker__delta" data-dir={t.change >= 0 ? 'up' : 'down'}>
              {formatChange(t.change)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
