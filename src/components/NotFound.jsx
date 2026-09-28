import { NOT_FOUND } from '../data/content.js'
import { Compass } from './icons.jsx'

/**
 * NotFound.
 *
 * Served with a real 404 status and noindex, not as an SPA fallback that
 * returns the homepage at HTTP 200. A soft 404 teaches a search engine that
 * every broken URL on the site is valid, which is a slow way to lose the
 * whole index.
 *
 * Four destinations rather than one, because a visitor who lands here
 * mistyped something and would rather be handed the map than the front door.
 */
export default function NotFound() {
  return (
    <section className="centered-page">
      <div className="wrap">
        <div className="centered-page__inner">
          <span className="centered-page__icon centered-page__icon--sand" aria-hidden="true">
            <Compass size={34} />
          </span>

          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Error 404
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>{NOT_FOUND.h1}</h1>
          <p className="lede">{NOT_FOUND.lede}</p>

          <h2
            style={{
              fontSize: '1.05rem',
              marginTop: 34,
              marginBottom: -8,
              letterSpacing: '-0.01em',
            }}
          >
            {NOT_FOUND.linksHeading}
          </h2>

          <ul className="next-steps">
            {NOT_FOUND.links.map((link) => (
              <li key={link.href}>
                <span style={{ flex: 1 }}>
                  <strong>
                    <a href={link.href}>{link.label}</a>
                  </strong>
                  {link.body}
                </span>
              </li>
            ))}
          </ul>

          <div className="centered-page__actions">
            <a className="btn btn--primary" href="/">
              Back To Home
            </a>
            <a className="btn btn--ghost" href="/contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
