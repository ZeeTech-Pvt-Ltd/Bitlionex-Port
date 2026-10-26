import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import { FAQ, FAQ_ITEMS, FAQ_TEASER_COUNT } from '@/data/content.js'

import Hero from '@/components/Hero.jsx'
import Ticker from '@/components/Ticker.jsx'
import TrustStrip from '@/components/TrustStrip.jsx'
import WhatIs from '@/components/WhatIs.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import Method from '@/components/Method.jsx'
import Coverage from '@/components/Coverage.jsx'
import RiskBand from '@/components/RiskBand.jsx'
import Faq from '@/components/Faq.jsx'
import SectionHead from '@/components/SectionHead.jsx'
import Register from '@/components/Register.jsx'
import FinalCta from '@/components/FinalCta.jsx'

export const metadata = pageMetadata('home')

/* The homepage teaser. The full list lives on /faq; both read the same FAQ
   array, which is also what schemasFor() turns into JSON-LD. */
function FaqTeaser() {
  return (
    <section className="section section--surface" id="faq">
      <div className="wrap">
        <SectionHead eyebrow={FAQ.eyebrow} title={FAQ.h2} lede={FAQ.lede} center />
        {/* Centred to sit under the centred heading. .wrap--narrow carries only
            a max-width, so on its own it does not centre. */}
        <div className="wrap--narrow" style={{ margin: '0 auto' }}>
          <Faq items={FAQ_ITEMS} limit={FAQ_TEASER_COUNT} idPrefix="faqteaser" />
        </div>
        <p style={{ marginTop: 24, textAlign: 'center' }}>
          <a className="link-arrow" href="/faq">
            Read every question
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </p>
      </div>
    </section>
  )
}

/**
 * Home. The order is deliberate:
 *
 *   The risk band sits BEFORE the form, so a reader meets the downside before
 *   being asked for a phone number rather than after.
 *   The FAQ sits above the form for the same reason - its questions are the
 *   ones someone has immediately before signing up.
 *   Every section carries a visual. A run of plain text between two data
 *   panels reads as filler.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd route="home" />

      <Hero />
      <Ticker />
      <TrustStrip />
      <WhatIs />
      <HowItWorks />
      <Method />
      <Coverage />
      <RiskBand />
      <FaqTeaser />
      <Register />
      <FinalCta />
    </>
  )
}
