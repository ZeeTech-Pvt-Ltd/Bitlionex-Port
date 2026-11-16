import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import { FAQ, FAQ_ITEMS } from '@/data/content.js'

import Hero from '@/components/Hero.jsx'
import WhatIs from '@/components/WhatIs.jsx'
import HowItWorks from '@/components/HowItWorks.jsx'
import Comparison from '@/components/Comparison.jsx'
import Highlights from '@/components/Highlights.jsx'
import WhyChoose from '@/components/WhyChoose.jsx'
import GetStarted from '@/components/GetStarted.jsx'
import Markets from '@/components/Markets.jsx'
import Features from '@/components/Features.jsx'
import Learn from '@/components/Learn.jsx'
import Audience from '@/components/Audience.jsx'
import Security from '@/components/Security.jsx'
import Faq from '@/components/Faq.jsx'
import SectionHead from '@/components/SectionHead.jsx'
import Register from '@/components/Register.jsx'
import FinalCta from '@/components/FinalCta.jsx'

export const metadata = pageMetadata('home')

/* The FAQ section. The same array feeds /faq and the FAQPage structured data,
   so the homepage cannot answer a question differently from the FAQ page. */
function FaqSection() {
  return (
    <section className="section section--paper" id="faq">
      <div className="wrap">
        <SectionHead title={FAQ.h2} center />
        <div className="wrap--narrow" style={{ margin: '0 auto' }}>
          <Faq items={FAQ_ITEMS} idPrefix="faqhome" />
        </div>
      </div>
    </section>
  )
}

/**
 * Home. The order follows the operator's content document section for
 * section:
 *
 *   Hero, What Is, How Signals Work, With vs Without, Quick Highlights,
 *   Why Choose Us, How to Get Started, Markets, Features, Learn as You Trade,
 *   Who It's For, Security & Transparency, FAQs, Final CTA.
 *
 * Two deliberate departures:
 *
 *   The Testimonials section is hidden, as the document itself instructs,
 *   until verified reviews exist.
 *   The registration form sits between the FAQ and the final call to action,
 *   because the site needs a form and every call to action on the page points
 *   at it. The risk notice in the security section stays above it.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd route="home" />

      <Hero />
      <WhatIs />
      <HowItWorks />
      <Comparison />
      <Highlights />
      <WhyChoose />
      <GetStarted />
      <Markets />
      <Features />
      <Learn />
      <Audience />
      <Security />
      <FaqSection />
      <Register />
      <FinalCta />
    </>
  )
}
