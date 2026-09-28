import { useEffect, useState } from 'react'
import { THANK_YOU } from '../data/content.js'
import { CheckCircle, Mail } from './icons.jsx'
import { FORM_STORAGE_KEY } from '../data/site.js'

/**
 * ThankYou - the confirmation page.
 *
 * Reached only after the relay answered with status "success". It carries
 * noindex and no canonical, and it is deliberately thin: it confirms, it sets
 * out what happens next, and it sends the visitor to the risk disclosure
 * rather than trying to sell them anything else.
 *
 * The greeting is read from sessionStorage in an effect, not during render.
 * This page is prerendered to static HTML, so reading storage while rendering
 * would produce different markup on the server and the client and throw away
 * the server's HTML on hydration.
 */
export default function ThankYou() {
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(FORM_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed.firstName === 'string') setFirstName(parsed.firstName)
    } catch {
      // Storage unavailable or unparseable. The generic copy below is a
      // perfectly good outcome, and not worth surfacing an error over.
    }
  }, [])

  const heading = firstName ? `Thanks, ${firstName}. Your Details Are In` : THANK_YOU.h1

  return (
    <section className="centered-page">
      <div className="wrap">
        <div className="centered-page__inner">
          <span className="centered-page__icon" aria-hidden="true">
            <CheckCircle size={34} />
          </span>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>{heading}</h1>
          <p className="lede">{THANK_YOU.lede}</p>

          <h2
            style={{
              fontSize: '1.05rem',
              marginTop: 34,
              marginBottom: -8,
              letterSpacing: '-0.01em',
            }}
          >
            {THANK_YOU.stepsHeading}
          </h2>

          <ol className="next-steps">
            {THANK_YOU.steps.map((step, i) => (
              <li key={step.title}>
                <span
                  aria-hidden="true"
                  style={{
                    flex: 'none',
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'var(--indigo-tint)',
                    color: 'var(--indigo-strong)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  {i === 0 ? <Mail size={15} /> : i + 1}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  {step.body}
                </span>
              </li>
            ))}
          </ol>

          <div className="centered-page__actions">
            <a className="btn btn--primary" href={THANK_YOU.primaryHref}>
              {THANK_YOU.primaryCta}
            </a>
            <a className="btn btn--ghost" href={THANK_YOU.secondaryHref}>
              {THANK_YOU.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
