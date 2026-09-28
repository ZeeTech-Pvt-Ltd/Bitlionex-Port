// =========================================================
// Per-route SEO metadata
// =========================================================
// One table, read twice: by <Seo/> at runtime and by scripts/build.mjs when it
// bakes each route's HTML. Because both read the same object, a hydrated page
// carries exactly the head the server shipped. If these two ever diverge, the
// client rewrites the head on load and a crawler that ran JS sees something
// different from one that did not.
//
// The canonical for every route is SITE + the route's own path. /thank-you and
// the 404 carry NO canonical and are noindex - a noindex page that also names a
// canonical is sending two contradictory instructions.
// =========================================================

import { BRAND, SITE } from './site.js'

export { SITE }

export const OG_IMAGE = `${SITE}/og-image.png`
export const OG_IMAGE_ALT = `${BRAND}, crypto research and portfolio tracking for Australian investors`

/* The six pages that are meant to be found. Everything else is either a
   utility page or a dead end. */
export const INDEXABLE = ['home', 'about', 'contact', 'faq', 'terms', 'privacy', 'risk-disclosure']

export const seo = {
  home: {
    title: `${BRAND} | AI Crypto Research Australia`,
    // 145 characters. The limit is 155, and it is a limit rather than a
    // target: a description that runs past it gets truncated in the result
    // snippet, usually mid sentence and usually right where the call to
    // action was.
    description:
      'Bitlionex Port turns your crypto holdings into one clear picture, with AI research behind every position. Built for Australia. Open your account.',
    keywords:
      'Bitlionex Port, AI crypto research Australia, crypto portfolio tracker Australia, bitcoin portfolio Australia, crypto research platform',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    canonical: `${SITE}/`,
    structuredData: ['organization', 'website', 'faq'],
  },

  about: {
    title: `About Bitlionex Port | Who We Are And What We Do`,
    description:
      'Bitlionex Port is a research and tracking service for Australian crypto holders. What we do, what we will not do, and how the research is built.',
    keywords: 'about Bitlionex Port, crypto research Australia, who we are',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    canonical: `${SITE}/about`,
    structuredData: ['organization'],
  },

  contact: {
    title: `Contact Bitlionex Port | Open Your Account`,
    description:
      'Questions before you start, or ready to open your account? Leave your details and an Australian support team member will get back to you.',
    keywords: 'contact Bitlionex Port, Bitlionex Port support, open account',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    canonical: `${SITE}/contact`,
    structuredData: ['organization'],
  },

  faq: {
    title: `Bitlionex Port FAQ | Your Questions Answered`,
    description:
      'Bitlionex Port answers what it does, what it costs, where your coins stay, and how the research works. Read the questions people ask first.',
    keywords: 'Bitlionex Port FAQ, is Bitlionex Port legit, crypto research questions',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    canonical: `${SITE}/faq`,
    structuredData: ['faq'],
  },

  terms: {
    title: `Terms And Conditions | Bitlionex Port`,
    description:
      'The terms that govern your use of the Bitlionex Port website and research service, including eligibility, your account, and the limits of our liability.',
    keywords: 'Bitlionex Port terms, terms and conditions',
    robots: 'index, follow',
    canonical: `${SITE}/terms`,
    structuredData: [],
  },

  privacy: {
    title: `Privacy Policy | Bitlionex Port`,
    description:
      'What personal information Bitlionex Port collects, why we collect it, who we share it with, and how to ask us to correct or delete it.',
    keywords: 'Bitlionex Port privacy policy, data handling',
    robots: 'index, follow',
    canonical: `${SITE}/privacy`,
    structuredData: [],
  },

  'risk-disclosure': {
    title: `Risk Disclosure | Bitlionex Port`,
    description:
      'Crypto assets are volatile and you can lose money. Read this before you use the Bitlionex Port research service or act on anything it publishes.',
    keywords: 'Bitlionex Port risk disclosure, crypto risk warning Australia',
    robots: 'index, follow',
    canonical: `${SITE}/risk-disclosure`,
    structuredData: [],
  },

  // Confirmation page. Reached only after a successful sign up, so it has no
  // business in an index and it names no canonical.
  'thank-you': {
    title: `You Are Registered | Bitlionex Port`,
    description: 'Your Bitlionex Port registration went through. Here is what happens next.',
    robots: 'noindex, nofollow',
    canonical: null,
    structuredData: [],
  },

  // Served with a real 404 status, so a crawler that reaches it learns the
  // page does not exist rather than indexing a soft copy of the homepage.
  404: {
    title: `Page Not Found | Bitlionex Port`,
    description: 'That page does not exist on Bitlionex Port. Here are the places worth going instead.',
    robots: 'noindex, nofollow',
    canonical: null,
    structuredData: [],
  },
}

/* -------------------------------------------------------------------------
   Structured data
   ------------------------------------------------------------------------- */

// No rating, no review count, no founding date, no address and no company
// registration number: this site does not have those values, and inventing
// them would put a false claim into a machine readable feed that Google
// republishes.
export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND,
  url: `${SITE}/`,
  logo: `${SITE}/og-image.png`,
  description:
    'Bitlionex Port is a research and portfolio tracking service for Australian crypto holders.',
  areaServed: { '@type': 'Country', name: 'Australia' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['English'],
  },
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND,
  url: `${SITE}/`,
  inLanguage: 'en-AU',
}

/** FAQPage markup, built from whatever questions the page actually renders -
    so the markup can never describe a question that is not on screen. */
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.plain },
    })),
  }
}

/**
 * Turn a route's `structuredData` name list into the actual schema objects.
 *
 * Both <Seo/> and scripts/build.mjs call this, so the JSON-LD in the baked
 * HTML and the JSON-LD written after hydration are the same objects from the
 * same source. Building them separately is how the two end up disagreeing.
 *
 * @param {string} route
 * @param {Array<{q: string, plain: string}>} faqItems the questions the page
 *   actually renders, so the markup can never describe a question that is not
 *   on screen.
 */
export function schemasFor(route, faqItems = []) {
  const conf = seo[route] || seo['404']
  const names = conf.structuredData || []
  const out = []
  for (const name of names) {
    if (name === 'organization') out.push(ORG_SCHEMA)
    else if (name === 'website') out.push(WEBSITE_SCHEMA)
    else if (name === 'faq' && faqItems.length) out.push(faqSchema(faqItems))
  }
  return out
}
