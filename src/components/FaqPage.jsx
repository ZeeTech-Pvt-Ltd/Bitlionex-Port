import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import Faq from './Faq.jsx'
import { FAQ, FAQ_ITEMS } from '../data/content.js'

/**
 * FAQ page.
 *
 * Renders every question from the content document, with the first one
 * already open, so the page does not present as a wall of closed drawers. The
 * same FAQ_ITEMS feed the FAQPage structured data, which is why the markup can
 * never describe a question that is not on screen.
 *
 * No extra closing block: the document's FAQ section is the questions and
 * nothing else.
 */
export default function FaqPage() {
  return (
    <>
      <PageHero title={FAQ.h2} />

      <section className="section">
        <div className="wrap wrap--narrow">
          <Reveal>
            <Faq items={FAQ_ITEMS} defaultOpen={0} idPrefix="faqpage" headingLevel={2} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
