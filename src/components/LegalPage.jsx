import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import RichText from './RichText.jsx'
import { LEGAL_DOCS } from '../data/legal.js'

/**
 * LegalPage - Terms, Privacy and Risk Disclosure.
 *
 * Three documents, one layout. Each gets a table of contents, because these
 * are the pages people arrive at from a search engine with one specific
 * question and no intention of reading the whole thing.
 *
 * `docId` is 'terms' | 'privacy' | 'risk'. Note that the route for the third
 * is /risk-disclosure while its document id is 'risk', which is why the two
 * are looked up separately below rather than derived from each other.
 */
export default function LegalPage({ docId }) {
  const doc = LEGAL_DOCS[docId]
  if (!doc) return null

  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} lede={doc.intro} />

      <section className="section">
        <div className="wrap">
          <div className="prose">
            <Reveal>
              {doc.sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2>{section.heading}</h2>
                  {section.paras.map((p, i) => (
                    <RichText as="p" text={p} key={i} />
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <RichText as="li" text={item} key={i} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
