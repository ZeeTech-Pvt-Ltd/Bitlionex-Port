// =========================================================
// Page copy
// =========================================================
// Every word a visitor reads lives here rather than inside a component, so
// the voice stays consistent across the page and so a copy change never turns
// into a JSX change.
//
// The homepage copy follows the operator's content document (2026-11-16)
// section for section, in the same order. The only additions are the form,
// which the site requires, and the punctuation-level fixes needed to pass the
// copy checks in .arttmp/verify-copy.mjs (the document's one 50-word sentence
// is split in two; no words were changed).
//
// House rules this file follows:
//
//   No em dashes, no en dashes, no spaced hyphen used as a dash.
//   Title Case on every heading.
//   Around 80% "you" and 20% "we". This is written to the reader.
//   Short paragraphs. One to three sentences, then a break.
//   No invented numbers. The two figures in the FAQ were supplied by the
//   operator on 2026-11-16.
// =========================================================

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export const HERO = {
  h1: 'Clear Trade Signals, Smarter Decisions With Bitlionex Port',
  lede:
    'Get trade ideas that come with a plan attached. Built for traders across Australia, Bitlionex Port tells you where to enter, where to exit and why the opportunity is worth a look, all in one easy-to-read alert.',
  primaryCta: 'Start Your Free Account',
  micro: 'Ready in 2 minutes · No hidden costs · Privacy built in',
}

/* -------------------------------------------------------------------------
   What Is Bitlionex Port?
   ------------------------------------------------------------------------- */

export const WHAT_IS = {
  h2: 'What Is Bitlionex Port?',
  // The document carries this as one 50-word sentence. It is split in two at
  // "It sends you", with no words changed, so it passes the sentence-length
  // check in verify-copy.mjs.
  body: [
    'Bitlionex Port is an AI-assisted trading signals platform that monitors the crypto, forex, stock and commodity markets. It sends you precise buy or sell alerts, each with an entry level, a stop-loss, a take-profit target and the reasoning behind it, so you can make your own trading decisions with more confidence.',
    'Most people don’t lose trades because they picked the wrong market. They lose because they had no plan for getting in or getting out. Bitlionex Port fixes that by attaching a full plan to every idea, and by explaining it in words that make sense even if you are brand new to trading.',
  ],
  image: {
    src: '/market-app.webp',
    srcSet: '/market-app-400.webp 400w, /market-app-800.webp 800w, /market-app.webp 1000w',
    alt: 'An illustration of a market app on a phone, with cards representing a currency pair and a market index.',
  },
}

/* -------------------------------------------------------------------------
   How Bitlionex Port signals work
   ------------------------------------------------------------------------- */

export const HOW_SIGNALS = {
  h2: 'How Bitlionex Port Signals Work',
  steps: [
    {
      n: '01',
      title: 'Market Tracking',
      body:
        'Technology and analysts follow live prices, trend changes and important economic updates.',
    },
    {
      n: '02',
      title: 'Quality Filter',
      body:
        'Weak or unclear setups are dropped. Only ideas with a defined direction and limited risk get through.',
    },
    {
      n: '03',
      title: 'Instant Delivery',
      body:
        'A single alert lands on your device with the market, direction, entry, stop-loss, take-profit and reason.',
    },
    {
      n: '04',
      title: 'Your Move',
      body:
        'Take the trade, change it to match your style or skip it. You are always in charge.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Trading with vs without
   ------------------------------------------------------------------------- */

export const COMPARISON = {
  h2: 'Trading With vs Without Bitlionex Port',
  withoutLabel: 'Without Bitlionex Port',
  withLabel: 'With Bitlionex Port',
  rows: [
    {
      without: 'Long hours reading charts and news',
      with: 'Key findings delivered in one short alert',
    },
    {
      without: 'Unsure where to enter or exit',
      with: 'Clear entry, stop-loss and take-profit levels',
    },
    {
      without: 'Decisions based on emotion',
      with: 'Every idea backed by a written reason',
    },
    {
      without: 'Opportunities lost during a busy day',
      with: 'Alerts that find you wherever you are',
    },
  ],
}

/* -------------------------------------------------------------------------
   Quick highlights
   ------------------------------------------------------------------------- */

export const HIGHLIGHTS = {
  h2: 'Quick Highlights',
  items: [
    {
      lead: 'Four markets, one account:',
      body: 'crypto, forex, stocks and commodities',
    },
    {
      lead: null,
      body: 'Every alert comes with a plain-English explanation',
    },
    {
      lead: null,
      body: 'Works on your phone, tablet and computer',
    },
    {
      lead: null,
      body: 'You decide how much risk to take on each trade',
    },
  ],
}

/* -------------------------------------------------------------------------
   Why choose us
   ------------------------------------------------------------------------- */

export const WHY = {
  h2: 'Why Choose Us',
  items: [
    {
      lead: 'Easy to follow',
      body: 'No complicated terms. Each signal reads like advice from a knowledgeable friend.',
    },
    {
      lead: 'Your time back',
      body: 'We take care of the research, so you spend minutes, not hours, on the markets.',
    },
    {
      lead: 'Right on time',
      body: 'Alerts go out the moment a setup is confirmed, not after the move is over.',
    },
    {
      lead: 'People who care',
      body: 'Our support team answers your questions quickly through live chat and email.',
    },
  ],
  cta: 'Join Bitlionex Port Today',
}

/* -------------------------------------------------------------------------
   How to get started
   ------------------------------------------------------------------------- */

export const GET_STARTED = {
  h2: 'How to Get Started',
  sub: 'Your First Signal in 4 Simple Steps',
  steps: [
    {
      n: '01',
      title: 'Sign Up',
      body: 'Enter your name, email address and phone number.',
    },
    {
      n: '02',
      title: 'Confirm Your ID',
      body: 'A quick identity check keeps your account protected.',
    },
    {
      n: '03',
      title: 'Add Funds',
      body: 'Choose a deposit method that is convenient for you.',
    },
    {
      n: '04',
      title: 'Follow Your First Signal',
      body:
        'Select your markets, set your risk limits and review your first trade idea.',
    },
  ],
  cta: 'Open My Free Account',
}

/* -------------------------------------------------------------------------
   Markets
   ------------------------------------------------------------------------- */

export const MARKETS = {
  h2: 'Markets',
  rows: [
    {
      badge: 'CRYPTO',
      name: 'Crypto',
      body: 'Signals on leading digital coins like Bitcoin and Ethereum.',
    },
    {
      badge: 'FOREX',
      name: 'Forex',
      body: 'Alerts on highly traded currency pairs, including AUD/USD, EUR/USD and GBP/USD.',
    },
    {
      badge: 'STOCKS',
      name: 'Stocks',
      body:
        'Opportunities in leading Australian companies on the ASX, as well as big international brands.',
    },
    {
      badge: 'COMMOD',
      name: 'Commodities',
      body: 'Trade ideas on gold, silver and oil price movements.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Features
   ------------------------------------------------------------------------- */

export const FEATURES = {
  h2: 'Features',
  items: [
    {
      lead: 'Signals that explain themselves',
      body: 'Know what to trade and the logic behind every call.',
    },
    {
      lead: 'Built-in exit plan',
      body: 'Each alert includes its own stop-loss and take-profit levels.',
    },
    {
      lead: 'Personal price alerts',
      body: 'Set any price level and get notified when the market reaches it.',
    },
    {
      lead: 'Clear dashboard',
      body: 'See your balance, open positions and past trades in one place.',
    },
    {
      lead: 'No download needed',
      body: 'Use Bitlionex Port straight from your browser on any device.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Learn as you trade
   ------------------------------------------------------------------------- */

export const LEARN = {
  h2: 'Learn as You Trade',
  body:
    'Every Bitlionex Port alert is also a small lesson. Because each signal explains why it was sent, you gradually learn how trends form, why support and resistance levels matter and how good traders manage risk. Over time, you start spotting setups yourself and trading with more independence.',
  image: {
    src: '/portfolio-app.webp',
    srcSet:
      '/portfolio-app-400.webp 400w, /portfolio-app-800.webp 800w, /portfolio-app.webp 1000w',
    alt: 'An illustration of a phone showing a portfolio app, with cards representing markets and holdings.',
  },
}

/* -------------------------------------------------------------------------
   Who it is for
   ------------------------------------------------------------------------- */

export const AUDIENCE = {
  h2: 'Who It’s For',
  items: [
    {
      lead: 'Complete beginners',
      body: 'Start your trading journey with guidance that explains every step.',
    },
    {
      lead: 'Busy professionals',
      body: 'Fit the markets around a busy Australian workday in just a few minutes.',
    },
    {
      lead: 'Experienced traders',
      body: 'Compare our ideas with your own analysis and explore new markets.',
    },
  ],
}

/* -------------------------------------------------------------------------
   Security and transparency
   ------------------------------------------------------------------------- */

export const SECURITY = {
  h2: 'Security & Transparency',
  items: [
    {
      lead: 'Secure data',
      body: 'Encryption keeps your personal and payment details private.',
    },
    {
      lead: 'Extra login protection',
      body: 'Two-factor authentication blocks anyone else from your account.',
    },
    {
      lead: 'Clear costs',
      body: 'All fees are listed openly before you make any payment.',
    },
    {
      lead: 'You stay in control',
      body: 'Bitlionex Port never places a trade without your permission.',
    },
  ],
  // The document's risk notice, verbatim. It sits in this section, above the
  // FAQ and the registration form, so a reader meets the downside before
  // being asked for a phone number.
  riskNotice:
    'Trading involves a high level of risk, and you could lose some or all of your money. Bitlionex Port signals are guidance only and cannot guarantee profits. Past performance does not predict future results.',
  cta: 'Create a Secure Account',
}

/* -------------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------------- */

export const FAQ = {
  h2: 'FAQs',
}

// One helper so `a` (rendered) and `plain` (the schema-safe string) cannot
// drift apart. FAQ questions are exempt from the Title Case rule because they
// are content rendered in a heading tag, not section titles.
const faq = (q, a) => ({ q, a, plain: a })

export const FAQ_ITEMS = [
  faq(
    'What is Bitlionex Port?',
    'Bitlionex Port is a trading signals platform that researches the markets and sends you alerts with entry, stop-loss and take-profit levels, along with the reason for each trade.',
  ),
  faq(
    'How are Bitlionex Port signals selected?',
    'Each setup is checked against clear entry and risk rules. Only ideas that pass those checks are sent to you.',
  ),
  faq(
    'Is Bitlionex Port good for beginners?',
    'Yes. Every alert is written in simple language, and the explanations help you learn as you go.',
  ),
  faq(
    'Does Bitlionex Port place trades for me?',
    'No. You review each signal and decide for yourself whether to trade it.',
  ),
  faq(
    'What markets does Bitlionex Port cover?',
    'Crypto, forex, stocks and commodities, all in one account.',
  ),
  faq(
    'Can I use Bitlionex Port in Australia?',
    'Yes. Traders anywhere in the country can sign up and receive alerts online, on any device.',
  ),
  faq(
    'Do I need to download anything?',
    'No. Bitlionex Port works in any web browser on your phone, tablet or computer.',
  ),
  // Values supplied by the operator on 2026-11-16. Do not change these without
  // a matching instruction, and never substitute an invented figure.
  faq('What is the minimum deposit?', 'You can begin with $250.'),
  faq('How long do withdrawals take?', 'Withdrawals usually take 1 to 3 days.'),
  faq(
    'Can I lose money using Bitlionex Port?',
    'Yes. All trading carries risk, so only trade with money you can afford to lose.',
  ),
]

/* -------------------------------------------------------------------------
   Testimonials
   -------------------------------------------------------------------------
   Deliberately absent. The content document says to keep this section hidden
   until verified reviews exist, and the house rules forbid invented
   testimonials. Nothing renders it, so there is no placeholder to ship.
   ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
   Register section
   ------------------------------------------------------------------------- */

export const REGISTER = {
  h2: 'Start Your Free Account',
  lede: 'Ready in 2 minutes · No hidden costs · Privacy built in',
  formHeading: 'Open My Free Account',
  submitCta: 'Get Started Free',
}

/* -------------------------------------------------------------------------
   Closing call to action
   ------------------------------------------------------------------------- */

export const FINAL_CTA = {
  h2: 'Make Your Next Trade a Smarter One',
  body:
    'Sign up with Bitlionex Port and receive clear, well-explained trade ideas, while every decision stays firmly in your hands.',
  cta: 'Get Started Free',
  micro: '2-minute sign-up · No joining fee',
}

/* -------------------------------------------------------------------------
   About page
   ------------------------------------------------------------------------- */

export const ABOUT = {
  eyebrow: 'About Us',
  h1: 'We Built The Thing We Wanted To Use',
  lede:
    'Bitlionex Port is a research and tracking service for Australian crypto holders. Here is what we do, what we refuse to do, and how the research gets put together.',
  sections: [
    {
      id: 'why',
      heading: 'Why We Built This',
      // Content on the left, image on the right.
      image: {
        src: '/about-1.webp',
        srcSet:
          '/about-1-400.webp 400w, /about-1-800.webp 800w, /about-1.webp 900w',
        side: 'right',
        alt: 'An illustration of a person at a laptop with an earnings card floating beside them.',
      },
      paras: [
        'Crypto gives you more information than any market in history and almost none of it is about you. Price charts tell you what a coin costs. They do not tell you that a third of your money is now in one asset because it ran while everything else sat still.',
        'We wanted a tool that answered the question a person actually has when they open their phone: what do I own, and how is it doing. Not what is Bitcoin worth right now.',
        'So we built one. It counts what you hold, scores it consistently, and shows you the whole shape of it instead of one corner.',
      ],
    },
    {
      id: 'how-we-work',
      heading: 'How We Work',
      // Image on the left, content on the right.
      image: {
        src: '/about-2.webp',
        srcSet:
          '/about-2-400.webp 400w, /about-2-800.webp 800w, /about-2.webp 900w',
        side: 'left',
        alt: 'An illustration of someone checking markets on a laptop and a phone, with a currency card beside them.',
      },
      paras: [
        'We publish research, not advice. That difference matters and we hold to it.',
        'We do not take custody of anything, we do not place trades, and we do not tell you what to buy. Everything on your dashboard is a description of what the data showed, written so you can make your own call.',
      ],
      list: [
        'We show our inputs, because a score you cannot interrogate is just an opinion with a number on it.',
        'We show the weak spots. Where coverage is thin, the panel says so rather than filling the gap.',
        'We never charge you without telling you first, in writing, before anything moves.',
      ],
    },
    {
      id: 'who-its-for',
      heading: 'Who This Is For',
      // Content on the left, image on the right.
      image: {
        src: '/about-3.webp',
        srcSet:
          '/about-3-400.webp 400w, /about-3-800.webp 800w, /about-3.webp 900w',
        side: 'right',
        alt: 'An illustration of someone weighing up crypto markets, with one panel of ticks and one of crosses beside them.',
      },
      paras: [
        'It suits someone who already holds a few coins, has done so for a while, and has reached the point where the spreadsheet is not cutting it any more.',
        'It does not suit anyone looking for signals to copy, guaranteed returns, or someone else to make the decision. We are not that and we are not pretending to be.',
      ],
    },
    {
      id: 'what-we-are-not',
      heading: 'What We Are Not',
      // Image on the left, content on the right - fourth in the sequence, so
      // it carries the fourth side: right, left, right, left.
      image: {
        src: '/about-4.webp',
        srcSet:
          '/about-4-400.webp 400w, /about-4-800.webp 800w, /about-4.webp 900w',
        side: 'left',
        alt: 'An illustration of someone considering four crossed-out roles: broker, exchange, fund manager and financial advice.',
      },
      paras: [
        'We are not a broker, an exchange, or a fund manager. We are not a licensed financial adviser and nothing we publish is personal financial advice.',
        'That is not a disclaimer we tuck away. It is the actual boundary of what this service is, and it is worth being clear about before you give us your details.',
      ],
    },
  ],
  cta: {
    heading: 'Have A Look Around First',
    body: 'The FAQ covers the questions people ask most. If yours is not there, ask us and a person will answer.',
    primaryCta: 'Read The FAQ',
    primaryHref: '/faq',
    secondaryCta: 'Open Your Account',
    secondaryHref: '/#register',
  },
}

/* -------------------------------------------------------------------------
   Contact page
   ------------------------------------------------------------------------- */

export const CONTACT = {
  eyebrow: 'Contact Us',
  h1: 'Talk To A Person, Not A Chatbot',
  lede:
    'Leave your details and an Australian support team member will get back to you. Ask anything, including whether this is right for your situation.',
  asideHeading: 'What Happens After You Send',
  asideSteps: [
    'Your details reach our registration desk, and we confirm the offer terms in writing.',
    'A support team member calls or emails you, in Australian hours, to answer questions.',
    'You decide whether to go ahead. Nothing is charged and nothing moves without your say so.',
  ],
}

/* -------------------------------------------------------------------------
   Thank you
   ------------------------------------------------------------------------- */

export const THANK_YOU = {
  h1: 'Your Details Are In',
  lede:
    'Thanks for registering. Nothing has been charged and nothing has moved. Your next step is a short call or email from our support team.',
  // A real h2 rather than a styled paragraph. It gives the page a heading
  // structure, which is how someone navigating by heading finds the list.
  stepsHeading: 'What Happens Next',
  steps: [
    {
      title: 'Check your email',
      body: 'A confirmation is on its way. It may land in your spam folder, so have a look there if it has not appeared shortly.',
    },
    {
      title: 'Expect a call',
      body: 'A support team member will reach out during Australian business hours to answer anything you want to ask.',
    },
    {
      title: 'Read the risk disclosure',
      body: 'Ten minutes with the risk page now will save you a surprise later. It is written to be read, not skimmed past.',
    },
  ],
  primaryCta: 'Read The Risk Disclosure',
  primaryHref: '/risk-disclosure',
  secondaryCta: 'Back To Home',
  secondaryHref: '/',
}

/* -------------------------------------------------------------------------
   404
   ------------------------------------------------------------------------- */

export const NOT_FOUND = {
  h1: 'That Page Does Not Exist',
  lede:
    'The link may be old, or it may have a typo in it. Nothing is broken on your end. Here is where to go instead.',
  linksHeading: 'Where To Go Instead',
  links: [
    { label: 'Home', href: '/', body: 'Start at the top and see what Bitlionex Port does.' },
    { label: 'FAQ', href: '/faq', body: 'Answers to the questions people ask before signing up.' },
    { label: 'Contact Us', href: '/contact', body: 'Leave your details and a person will get back to you.' },
    { label: 'Risk Disclosure', href: '/risk-disclosure', body: 'What can go wrong, written plainly.' },
  ],
}

/* -------------------------------------------------------------------------
   Header / footer navigation
   ------------------------------------------------------------------------- */

// The header keeps four items: enough to cover the site, few enough to sit on
// one line beside the logo and the button.
//
// Risk Disclosure was removed from here at the operator's request on
// 2026-09-28. It is still reachable - it is in the footer's Legal column on
// every page, it is linked from the closing call to action, and the contact
// page points at it - so nothing was orphaned, but it is no longer one click
// from the header. Worth knowing, because the header nav is the one place a
// reader is guaranteed to see.
export const NAV = [
  { label: 'Home', href: '/', route: 'home' },
  { label: 'About', href: '/about', route: 'about' },
  { label: 'FAQ', href: '/faq', route: 'faq' },
  { label: 'Contact', href: '/contact', route: 'contact' },
]

export const FOOTER = {
  // Legal pages are stated as the whole list of documents that govern use,
  // which is why Risk Disclosure sits here as well as in the header.
  docs: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Risk Disclosure', href: '/risk-disclosure' },
    { label: 'Terms And Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  blurb:
    'Bitlionex Port is an AI-assisted trading signals platform that monitors the crypto, forex, stock and commodity markets.',
  riskHeading: 'Risk Warning',
  // The document's risk notice, verbatim. This is the sitewide warning that
  // every page carries in the footer.
  riskParas: [
    'Trading involves a high level of risk, and you could lose some or all of your money. Bitlionex Port signals are guidance only and cannot guarantee profits. Past performance does not predict future results.',
  ],
  copyright: `© ${new Date().getFullYear()} Bitlionex Port. All rights reserved.`,
}
