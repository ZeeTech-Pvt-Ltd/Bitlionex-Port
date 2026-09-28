import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import { REGISTER } from '../data/content.js'
import { Check, Clock, MapPin, Shield } from './icons.jsx'

/**
 * Register - the form section, and the page's main conversion point.
 *
 * The copy sits on the left and the form on the right, so a visitor who is
 * not ready to type still has something to read, and the form is the first
 * thing their eye reaches on the right at desktop width.
 *
 * The three icons below the copy are the objections that actually stop people
 * at this exact moment: is my money safe, will I get spammed, can I reach a
 * human. Answering them beside the form is worth more than answering them in
 * the FAQ four screens up.
 */
export default function Register() {
  return (
    <section className="section section--paper" id="register">
      <div className="wrap">
        <div className="register">
          <Reveal>
            <SectionHead eyebrow={REGISTER.eyebrow} title={REGISTER.h2} lede={REGISTER.lede} />

            <ul className="tick-list">
              {REGISTER.ticks.map((t) => (
                <li key={t}>
                  <Check size={18} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: 30,
                paddingTop: 26,
                borderTop: '1px solid var(--border)',
                display: 'grid',
                gap: 18,
              }}
            >
              <p style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem' }}>
                <Shield size={19} style={{ color: 'var(--mint-deep)', flex: 'none', marginTop: 2 }} />
                <span>
                  <strong style={{ fontWeight: 600 }}>Your coins never move.</strong> We do not take
                  custody, hold keys, or connect to your exchange account.
                </span>
              </p>
              <p style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem' }}>
                <Clock size={19} style={{ color: 'var(--mint-deep)', flex: 'none', marginTop: 2 }} />
                <span>
                  <strong style={{ fontWeight: 600 }}>Someone answers.</strong> Support is staffed
                  around the clock, not a form that replies in three days.
                </span>
              </p>
              <p style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem' }}>
                <MapPin size={19} style={{ color: 'var(--mint-deep)', flex: 'none', marginTop: 2 }} />
                <span>
                  <strong style={{ fontWeight: 600 }}>Built for Australia.</strong> Priced in
                  Australian dollars and set up for Australian residents.
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <RegistrationForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
