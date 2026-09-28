import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import MethodVisual from './MethodVisual.jsx'
import { METHOD } from '../data/content.js'
import { Alert } from './icons.jsx'

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

            <div
              style={{
                marginTop: 28,
                padding: '20px 22px',
                background: 'var(--sand-tint)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--border)',
              }}
            >
              <h3
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  fontSize: '1rem',
                  color: 'var(--sand-deep)',
                  marginBottom: 12,
                }}
              >
                <Alert size={19} />
                {METHOD.limitsHeading}
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 10 }}>
                {METHOD.limits.map((l) => (
                  <li key={l} style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6 }}>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="split__visual">
            <MethodVisual />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
