import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import Faq from './Faq.jsx'
import { FAQ, FAQ_ITEMS } from '../data/content.js'

/**
 * FAQ page.
 *
 * Renders every question with the first one already open, so the page does
 * not present as a wall of closed drawers. The same FAQ_ITEMS feed the
 * FAQPage structured data, which is why the markup can never describe a
 * question that is not on screen.
 */
export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow={FAQ.eyebrow} title={FAQ.h2} lede={FAQ.lede} />

      <section className="section">
        <div className="wrap wrap--narrow">
          <Reveal>
            <Faq items={FAQ_ITEMS} defaultOpen={0} idPrefix="faqpage" headingLevel={2} />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface section--tight">
        <div className="wrap">
          <Reveal className="centered-page__inner" style={{ maxWidth: 620 }}>
            <h2>Still Wondering About Something?</h2>
            <p className="lede">
              Ask us directly. We would rather spend five minutes answering it now than have you
              sign up unsure.
            </p>
            <div className="centered-page__actions">
              <a className="btn btn--primary" href="/contact">
                Contact Us
              </a>
              <a className="btn btn--ghost" href="/risk-disclosure">
                Read The Risk Disclosure
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
