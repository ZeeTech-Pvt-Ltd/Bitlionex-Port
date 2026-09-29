import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import MethodVisual from './MethodVisual.jsx'
import { METHOD } from '../data/content.js'

/**
 * Method - how the research is put together, and what it cannot do.
 *
 * The "what a score cannot do" block is part of this section rather than a
 * footnote on the FAQ, because it is the honest half of the same explanation.
 * Splitting them lets a reader take the scores and never meet the limits.
 */
export default function Method() {
  return (
    <section className="section section--paper" id="method">
      <div className="wrap">
        <div className="split split--reverse">
          <Reveal>
            <SectionHead eyebrow={METHOD.eyebrow} title={METHOD.h2} />
            {METHOD.body.map((p, i) => (
              <p key={i} style={{ color: 'var(--muted)', marginBottom: 14, lineHeight: 1.72 }}>
                {p}
              </p>
            ))}

          </Reveal>

          <Reveal className="split__visual">
            <MethodVisual />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
