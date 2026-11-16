import { schemasFor } from '@/data/seo.js'
import { FAQ_ITEMS, GET_STARTED } from '@/data/content.js'

/**
 * Emits a route's structured data straight into the prerendered HTML.
 *
 * Google reads JSON-LD from the document body, so this replaces the runtime
 * injection <Seo/> used to do in the SPA. The schema itself still comes from
 * src/data/seo.js's schemasFor(), so the Organisation, WebSite, Service,
 * HowTo and FAQPage blocks are built once and cannot drift from the pages
 * that display them.
 *
 * The FAQ questions passed in are the ones the route actually renders, so the
 * markup can never describe a question that is not on the page.
 */
export default function JsonLd({ route }) {
  const faqItems = route === 'home' || route === 'faq' ? FAQ_ITEMS : []
  // The HowTo markup describes the sign-up steps, which are the only steps a
  // reader can follow themselves. The four signal stages are an explanation,
  // not a procedure, so they do not belong in HowTo markup.
  const schema = schemasFor(route, faqItems, GET_STARTED.steps)

  return schema.map((data, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ))
}
