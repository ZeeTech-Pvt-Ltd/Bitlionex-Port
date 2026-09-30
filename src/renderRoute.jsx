import { Suspense, lazy } from 'react'
import Seo from './components/Seo.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { LegalProvider } from './components/LegalModal.jsx'

import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import TrustStrip from './components/TrustStrip.jsx'
import WhatIs from './components/WhatIs.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Method from './components/Method.jsx'
import Coverage from './components/Coverage.jsx'
import RiskBand from './components/RiskBand.jsx'
import Faq from './components/Faq.jsx'
import SectionHead from './components/SectionHead.jsx'
import Register from './components/Register.jsx'
import FinalCta from './components/FinalCta.jsx'

import { FAQ, FAQ_ITEMS, FAQ_TEASER_COUNT } from './data/content.js'

// =========================================================
// The page tree for each route, as plain React elements
// =========================================================
// This file is the single source of truth for what a route renders. It is
// used twice: by the client, where App.jsx picks the route and renders this,
// and by the build, where scripts/prerender-entry.jsx renders the same tree.
//
// Keeping the two identical is what lets the baked HTML hydrate without a
// mismatch. If they ever diverge, every page load starts by React throwing
// away what the server sent.
//
// Anything that reads the DOM or a browser API during render breaks that
// contract, because the prerender runs in Node. Route dependent state belongs
// in an effect.
//
// WHY THE INNER PAGES ARE lazy()
// ---------------------------------
// They used to be static imports, so the homepage bundle carried the contact
// form, the About page, the FAQ page, the 404, the confirmation page, and the
// whole 30 KB of legal documents - none of which run on the homepage. Its
// coverage report showed a fifth of the bundle never executing, and PageSpeed
// flagged 41 KB of it as unused JavaScript.
//
// The homepage stays eager: it is the entry point for most traffic, and its
// sections are all used there, so splitting it would buy nothing and cost a
// round trip.
//
// Suspense wraps each route's content inside the layout rather than around it,
// so the header, footer and provider stay mounted through a lazy load and only
// the middle of the page is ever waiting.
// =========================================================

const About = lazy(() => import('./components/About.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const FaqPage = lazy(() => import('./components/FaqPage.jsx'))
const LegalPage = lazy(() => import('./components/LegalPage.jsx'))
const ThankYou = lazy(() => import('./components/ThankYou.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

const Layout = ({ routeName, children }) => (
  <LegalProvider>
    <Seo route={routeName} />
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Header route={routeName} />
    <main id="main">
      <Suspense fallback={null}>{children}</Suspense>
    </main>
    <Footer />
  </LegalProvider>
)

const FaqTeaser = () => (
  <section className="section section--surface" id="faq">
    <div className="wrap">
      <SectionHead eyebrow={FAQ.eyebrow} title={FAQ.h2} lede={FAQ.lede} center />
      {/* Centred to sit under the centred heading. It was left-aligned and
          looked broken: .wrap--narrow carries only a max-width, so on its own
          it does not centre, and an inline margin:0 was overriding the auto
          margins that would have done it. */}
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

export function renderRoute(route) {
  if (route === 'about') {
    return (
      <Layout routeName="about">
        <About />
      </Layout>
    )
  }

  if (route === 'contact') {
    return (
      <Layout routeName="contact">
        <Contact />
      </Layout>
    )
  }

  if (route === 'faq') {
    return (
      <Layout routeName="faq">
        <FaqPage />
      </Layout>
    )
  }

  if (route === 'terms') {
    return (
      <Layout routeName="terms">
        <LegalPage docId="terms" />
      </Layout>
    )
  }

  if (route === 'privacy') {
    return (
      <Layout routeName="privacy">
        <LegalPage docId="privacy" />
      </Layout>
    )
  }

  if (route === 'risk-disclosure') {
    return (
      <Layout routeName="risk-disclosure">
        <LegalPage docId="risk" />
      </Layout>
    )
  }

  if (route === 'thank-you') {
    return (
      <Layout routeName="thank-you">
        <ThankYou />
      </Layout>
    )
  }

  if (route === '404') {
    return (
      <Layout routeName="404">
        <NotFound />
      </Layout>
    )
  }

  // Home.
  //
  // The order below is deliberate and is the one thing about this file worth
  // arguing over. Three rules behind it:
  //
  //   The risk band sits BEFORE the form, so a reader meets the downside
  //   before being asked for a phone number rather than after.
  //   The FAQ sits above the form for the same reason. Its questions are the
  //   ones someone has immediately before signing up.
  //   Every section carries a visual. A run of plain text between two data
  //   panels reads as filler and loses the reader's attention at exactly the
  //   point the argument needs it.
  return (
    <Layout routeName="home">
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
    </Layout>
  )
}
