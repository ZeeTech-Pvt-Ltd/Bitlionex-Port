import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import { CONTACT } from '../data/content.js'
import { Bell, MapPin, Shield } from './icons.jsx'
import { SITE } from '../data/site.js'

/**
 * Contact page.
 *
 * Carries the SAME form component as the homepage's #register section. Not a
 * copy of it, the same import, so the two can never behave differently.
 *
 * The aside sets out what actually happens after submitting. A contact form
 * with no stated next step is where people abandon, because they cannot tell
 * whether they have just requested a callback or bought something.
 */
export default function Contact() {
  return (
    <>
      <PageHero eyebrow={CONTACT.eyebrow} title={CONTACT.h1} lede={CONTACT.lede} />

      <section className="section">
        <div className="wrap">
          <div className="register">
            <Reveal>
              <h2 style={{ marginBottom: 22 }}>{CONTACT.asideHeading}</h2>

              <ol className="next-steps" style={{ counterReset: 'none' }}>
                {CONTACT.asideSteps.map((step, i) => (
                  <li key={step}>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: 'none',
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'var(--indigo-strong)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div
                style={{
                  marginTop: 26,
                  padding: '18px 20px',
                  background: 'var(--sand-tint)',
                  borderRadius: 'var(--r-lg)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                }}
              >
                <Bell size={18} style={{ color: 'var(--sand-deep)', flex: 'none', marginTop: 2 }} />
                <span>{CONTACT.asideNote}</span>
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingTop: 22,
                  borderTop: '1px solid var(--border)',
                  display: 'grid',
                  gap: 14,
                }}
              >
                <p style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem' }}>
                  <MapPin size={18} style={{ color: 'var(--mint-deep)', flex: 'none', marginTop: 2 }} />
                  <span>
                    <strong style={{ fontWeight: 600 }}>Service area.</strong> Australia. Support
                    runs on Australian hours, with an after hours line for account problems.
                  </span>
                </p>
                <p style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem' }}>
                  <Shield size={18} style={{ color: 'var(--mint-deep)', flex: 'none', marginTop: 2 }} />
                  <span>
                    <strong style={{ fontWeight: 600 }}>Security note.</strong> Nobody from this site
                    will ever ask for your wallet seed phrase, exchange password or card details. If
                    someone does, they are not us.
                  </span>
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                  Written enquiries go to the address published in the Privacy Policy. This site is
                  served from {SITE.replace('https://', '')}.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <RegistrationForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
