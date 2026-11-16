import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { COMPARISON } from '../data/content.js'

/**
 * Comparison - trading without the service against trading with it.
 *
 * A real table rather than two lists side by side, because each row is one
 * claim compared with its opposite and a table keeps that pairing when a
 * screen reader walks the cells. The captions travel with the cells on a
 * phone, so the pairing survives the stacked layout too.
 */
export default function Comparison() {
  return (
    <section className="section section--paper" id="comparison">
      <div className="wrap">
        <Reveal>
          <SectionHead title={COMPARISON.h2} center />
        </Reveal>

        <Reveal>
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">{COMPARISON.withoutLabel}</th>
                <th scope="col">{COMPARISON.withLabel}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.without}>
                  <td data-label={COMPARISON.withoutLabel}>{row.without}</td>
                  <td data-label={COMPARISON.withLabel} className="compare__with">
                    {row.with}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
