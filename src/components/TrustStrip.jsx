import { TRUST } from '../data/market.js'

/**
 * TrustStrip - four plain facts about the service.
 *
 * Deliberately not a row of statistics. Everything here answers a question
 * someone actually has before signing up (where do my coins sit, what does it
 * cost, what is the minimum, when can I get help) rather than trying to
 * impress with a number nobody can verify.
 *
 * Value first, label second, in the markup as well as on screen. Reordering
 * one but not the other with CSS `order` is how a strip ends up reading
 * correctly to a screen reader and backwards to everyone else.
 */
export default function TrustStrip() {
  return (
    <section className="section section--tight" aria-label="Key facts about the service">
      <div className="wrap">
        <ul className="trust">
          {TRUST.map((item) => (
            <li className="trust__item" key={item.label}>
              <span className="trust__value">{item.value}</span>
              <span className="trust__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
