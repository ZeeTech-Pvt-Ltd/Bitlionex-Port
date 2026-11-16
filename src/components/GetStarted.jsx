import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { GET_STARTED } from '../data/content.js'

/**
 * GetStarted - the four sign-up steps from the content document.
 *
 * This is the sequence the HowTo structured data describes, and the schema is
 * built from the same array, so the markup cannot claim a step the page does
 * not show.
 */
export default function GetStarted() {
  return (
    <section className="section section--surface" id="get-started">
      <div className="wrap">
        <Reveal>
          <SectionHead title={GET_STARTED.h2} lede={GET_STARTED.sub} center />
        </Reveal>

        <ol className="steps steps--four" style={{ listStyle: 'none' }}>
          {GET_STARTED.steps.map((step, i) => (
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

        <Reveal>
          <div className="section-cta">
            <a className="btn btn--primary" href="#register" data-scroll="#register">
              {GET_STARTED.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
