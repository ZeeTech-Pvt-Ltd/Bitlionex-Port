import { Donut } from './charts.jsx'
import { ALLOCATION } from '../data/market.js'

/**
 * AllocationVisual - where the money sits.
 *
 * The ring answers "how is this spread" at a glance. The list beside it
 * carries the same numbers as text, which is what makes the chart readable
 * without colour vision, on a printout, and to a screen reader. The ring is
 * the summary; the list is the data.
 *
 * Five slices, inside the six where part-to-whole still reads. Unallocated
 * cash is the last slice and the lightest, which is also its weight.
 */
export default function AllocationVisual() {
  const largest = ALLOCATION.reduce((a, b) => (b.weight > a.weight ? b : a))

  return (
    <div className="panel">
      <div className="panel__head">
        <div>
          <p className="panel__title">How your money is spread</p>
          <p className="panel__sub">Sample allocation, by weight</p>
        </div>
        <span className="panel__tag">Sample data</span>
      </div>

      <div className="ring">
        <Donut slices={ALLOCATION} size={190} thickness={26}>
          <span className="ring__center-label">Largest holding</span>
          <span className="ring__center-value">{largest.weight}%</span>
          <span className="ring__center-label">{largest.label}</span>
        </Donut>

        <ul className="ring__list">
          {ALLOCATION.map((slice) => (
            <li className="ring__item" key={slice.label}>
              <span className="ring__dot" style={{ background: slice.tone }} aria-hidden="true" />
              <span>{slice.label}</span>
              <span className="ring__pct">{slice.weight}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
