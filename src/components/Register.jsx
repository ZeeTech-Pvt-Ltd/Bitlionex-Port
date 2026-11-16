import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import { REGISTER } from '../data/content.js'

/**
 * Register - the form section, and the page's main conversion point.
 *
 * The content document has no register section of its own, so this uses the
 * document's own call to action and microcopy as the heading and lede rather
 * than inventing a new pitch. The form itself is the same single component
 * the contact page renders.
 *
 * It sits after the FAQ and after the security section's risk notice, so a
 * reader meets the downside before being asked for a phone number.
 */
export default function Register() {
  return (
    <section className="section section--surface" id="register">
      <div className="wrap">
        <Reveal>
          <SectionHead title={REGISTER.h2} lede={REGISTER.lede} center />
        </Reveal>

        <Reveal>
          <div className="register-solo">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
