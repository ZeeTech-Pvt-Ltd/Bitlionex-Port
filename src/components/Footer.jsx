import Logo from './Logo.jsx'
import { FOOTER } from '../data/content.js'

/**
 * Footer.
 *
 * The risk warning is not a small grey line at the bottom. It sits above the
 * copyright, in full sentences, at a readable size, because a warning nobody
 * can read is a decoration.
 *
 * The document links are plain hrefs to real pages, not to the modal, so a
 * crawler and a keyboard user both reach them the ordinary way.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__blurb">{FOOTER.blurb}</p>
          </div>

          <div className="footer__col">
            <h3>Company</h3>
            <ul>
              {FOOTER.docs.slice(0, 3).map((d) => (
                <li key={d.href}>
                  <a href={d.href}>{d.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Legal</h3>
            <ul>
              {FOOTER.docs.slice(3).map((d) => (
                <li key={d.href}>
                  <a href={d.href}>{d.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__risk">
          <h3>{FOOTER.riskHeading}</h3>
          {FOOTER.riskParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">{FOOTER.copyright}</p>
          <div className="footer__legal">
            <a href="/terms">Terms And Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/risk-disclosure">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
