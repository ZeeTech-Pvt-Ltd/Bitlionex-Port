import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { HOW_SIGNALS } from '../data/content.js'

/**
 * HowItWorks - the four stages of a signal, exactly as the content document
 * sets them out.
 *
 * The numbering is real sequence: tracking happens before filtering, filtering
 * before delivery, and the reader acts last. A numbered list where the order
 * does not matter is just decoration.
 */
export default function HowItWorks() {
  return (
    <section className="section section--surface" id="how-it-works">
      <div className="wrap">
        <Reveal>
          <SectionHead title={HOW_SIGNALS.h2} center />
        </Reveal>

        <ol className="steps steps--four" style={{ listStyle: 'none' }}>
          {HOW_SIGNALS.steps.map((step, i) => (
            <Reveal as="li" className="step" key={step.n} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="step__num" aria-hidden="true">
                {step.n}
              </span>
              <h3>
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
