import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { HOW } from '../data/content.js'

/**
 * HowItWorks - the three steps.
 *
 * The numbering is real sequence, so it earns its place: step two cannot
 * happen before step one, and step three is the payoff. A numbered list where
 * the order does not matter is just a list with decoration.
 */
export default function HowItWorks() {
  return (
    <section className="section section--surface" id="how-it-works">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow={HOW.eyebrow} title={HOW.h2} lede={HOW.lede} center />
        </Reveal>

        <ol className="steps" style={{ listStyle: 'none' }}>
          {HOW.steps.map((step, i) => (
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
