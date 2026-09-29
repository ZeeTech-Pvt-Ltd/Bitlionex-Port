// =========================================================
// Page copy
// =========================================================
// Every word a visitor reads lives here rather than inside a component, so
// the voice stays consistent across eleven sections and two page types, and
// so a copy change never turns into a JSX change.
//
// House rules this file follows, and which any edit here has to keep:
//
//   No em dashes, no en dashes, no decorative hyphens. Full stops, commas
//   and conjunctions do the work instead.
//   Title Case on every heading.
//   Around 80% "you" and 20% "we". This is written to the reader.
//   Short paragraphs. One to three sentences, then a break.
//   No invented numbers. Anything the business has not set yet is a
//   [PLACEHOLDER] token, rendered visibly, so it cannot ship by accident.
// =========================================================

import { RISKS, STEPS } from './market.js'

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: 'Research For Australian Crypto Holders',
  // Kept short enough to wrap onto two lines rather than three, and it
  // carries the brand name, which is the page's primary term.
  h1: 'Bitlionex Port Puts Research Behind Every Coin You Hold',
  lede:
    'Most apps show you a price and stop there. You need the rest of it. What your holdings add up to, how much of your money sits in one place, and what changed since you last looked.',
  points: [
    'No exchange login needed',
    'Your coins stay where they are',
    'Support around the clock',
  ],
  primaryCta: 'Open Your Account',
  secondaryCta: 'See How It Works',
}

/* -------------------------------------------------------------------------
   What this is
   ------------------------------------------------------------------------- */

export const WHAT_IS = {
  eyebrow: 'What This Is',
  h2: 'A Research Desk For Your Crypto, Not Another Price App',
  body: [
    'You already know how to look up what Bitcoin costs. That part takes four seconds and tells you almost nothing about your own situation.',
    'The harder questions are the ones nobody answers for you. Is too much of my money riding on one coin? Has anything I hold quietly changed character? Where would it hurt most if this all fell tomorrow?',
    'Bitlionex Port is built around those. You add what you hold. Our research layer scores every position on the same five measures, then shows you the whole picture in plain English.',
  ],
  ticks: [
    'One dashboard for every coin you hold, across every exchange',
    'The same five measures applied to every position, every time',
    'Concentration shown plainly, including when the answer is uncomfortable',
  ],
}

/* -------------------------------------------------------------------------
   How it works
   ------------------------------------------------------------------------- */

export const HOW = {
  eyebrow: 'How It Works',
  h2: 'Three Steps, And None Of Them Involve Your Wallet Keys',
  lede:
    'You can be looking at your first scored portfolio in about the time it takes to make a coffee.',
  steps: STEPS,
}

/* -------------------------------------------------------------------------
   Method
   ------------------------------------------------------------------------- */

export const METHOD = {
  eyebrow: 'How The Research Is Built',
  h2: 'Five Inputs, Scored The Same Way Every Time',
  body: [
    'A score is only worth reading if you know what went into it. So here is what goes into ours.',
    'Every position is scored on trend, liquidity, volatility, concentration and data coverage. Five measures, each built from the inputs below.',
    'Where the data is thin, the coverage score drops and the panel says so. We would rather show you a gap than fill it with a guess.',
  ],
  inputs: [
    'Spot price feeds',
    'Order book depth',
    'Network activity',
    'Derivatives positioning',
    'Published research',
  ],
  limitsHeading: 'What A Score Cannot Do',
  limits: [
    'A score describes what the data showed today. It is not a prediction.',
    'Thin markets produce thin data. Where coverage is poor, the score says so instead of guessing.',
    'No model has seen the next twelve months. Ours has not either.',
  ],
}

/* -------------------------------------------------------------------------
   Coverage
   ------------------------------------------------------------------------- */

export const COVERAGE_COPY = {
  eyebrow: 'What You Can Track',
  h2: 'Built Around The Assets Australians Actually Hold',
  lede:
    'Concentration and cash count. So the tracker counts what a lot of platforms leave out: the money you have not put in, and the coins you would struggle to sell.',
}

/* -------------------------------------------------------------------------
   Risk band - deliberately placed before the form
   ------------------------------------------------------------------------- */

export const RISK = {
  eyebrow: 'Read This Before You Sign Up',
  h2: 'The Part Most Platforms Put At The Bottom In Small Grey Text',
  lede:
    'Crypto is volatile. You can lose money, including money you put in this week. We would rather you knew that now than found out later.',
  risks: RISKS,
  drawdownHeading: 'What A Fall Actually Looks Like',
  drawdownBody:
    'Below is an illustrative example of a portfolio going through a sustained fall. It is not a forecast and not a record of anyone’s results. It is here so the shape of a bad year is something you have seen once already.',
  closing:
    'If that shape is one you would not sit through, then this is not the right place for your money. That is a genuinely useful thing to know before you type your phone number in.',
}

/* -------------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------------- */

export const FAQ = {
  eyebrow: 'Common Questions',
  h2: 'Straight Answers, Including The Uncomfortable Ones',
  lede: 'If your question is not here, ask us directly. We would rather answer it now than have you guess.',
}

/* Each item carries two versions of the same answer: `a` is rendered as JSX
   and may hold markup, `plain` is the schema-safe string that goes into the
   FAQPage JSON-LD. They have to say the same thing, so edit them together. */
export const FAQ_ITEMS = [
  {
    q: 'What does Bitlionex Port actually do?',
    a: 'It is a research and tracking service. You tell it which coins you hold and how much of each. It scores every position on the same five measures, shows you how your money is spread, and flags what changed.',
    plain:
      'It is a research and tracking service. You tell it which coins you hold and how much of each. It scores every position on the same five measures, shows you how your money is spread, and flags what changed.',
  },
  {
    q: 'Do you hold my crypto or trade on my behalf?',
    a: 'No. Your coins stay exactly where they are, in whatever exchange or wallet you already use. We never take custody, never hold your keys, and never place a trade. Nothing moves because you signed up here.',
    plain:
      'No. Your coins stay exactly where they are, in whatever exchange or wallet you already use. We never take custody, never hold your keys, and never place a trade. Nothing moves because you signed up here.',
  },
  {
    q: 'Is Bitlionex Port a broker or a financial adviser?',
    a: 'Neither. We do not execute trades and we do not give personal financial advice. What we publish is general research about market data, put together so you can make your own decisions with better information in front of you.',
    plain:
      'Neither. We do not execute trades and we do not give personal financial advice. What we publish is general research about market data, put together so you can make your own decisions with better information in front of you.',
  },
  {
    q: 'What does it cost to open an account?',
    a: 'Nothing to open one. Any ongoing cost is shown in full before you are asked to pay anything, and there is no point at which you are charged without being told first.',
    plain:
      'Nothing to open one. Any ongoing cost is shown in full before you are asked to pay anything, and there is no point at which you are charged without being told first.',
  },
  {
    q: 'How much do I need to start?',
    a: 'There is a minimum funding level, and the platform sets it rather than us. You get it in writing before anything is transferred, so you are never guessing and never charged by surprise. Nothing about opening the account costs you anything.',
    plain:
      'There is a minimum funding level, and the platform sets it rather than us. You get it in writing before anything is transferred, so you are never guessing and never charged by surprise. Nothing about opening the account costs you anything.',
  },
  {
    q: 'Do you promise any kind of return?',
    a: 'No, and be careful with anyone who does. Crypto markets can fall hard and stay down for a long time. A high score on our dashboard is a summary of what the data showed, not a promise about what happens next.',
    plain:
      'No, and be careful with anyone who does. Crypto markets can fall hard and stay down for a long time. A high score on our dashboard is a summary of what the data showed, not a promise about what happens next.',
  },
  {
    q: 'How does the AI research actually work?',
    a: 'It reads five kinds of input: spot price, order book depth, network activity, derivatives positioning and published research. Each position is scored against those on the same five measures. You can see the whole breakdown on your dashboard, including the parts where the data is thin.',
    plain:
      'It reads five kinds of input: spot price, order book depth, network activity, derivatives positioning and published research. Each position is scored against those on the same five measures. You can see the whole breakdown on your dashboard, including the parts where the data is thin.',
  },
  {
    q: 'What happens to the personal information I give you?',
    a: 'We ask for your name, email and phone number so we can set up your account and contact you about it. We do not sell your details. The Privacy Policy sets out exactly what we collect, why, and how to have it removed.',
    plain:
      'We ask for your name, email and phone number so we can set up your account and contact you about it. We do not sell your details. The Privacy Policy sets out exactly what we collect, why, and how to have it removed.',
  },
  {
    q: 'Can I use this if I live outside Australia?',
    a: 'The service is built for Australian residents and priced in Australian dollars. If you are somewhere else, the rules that apply to you may be different, and it is worth checking your local requirements before you sign up.',
    plain:
      'The service is built for Australian residents and priced in Australian dollars. If you are somewhere else, the rules that apply to you may be different, and it is worth checking your local requirements before you sign up.',
  },
  {
    q: 'What if I decide it is not for me?',
    a: 'Then stop using it. There is nothing to unwind, because we never held your coins in the first place. Ask us to delete your account and the details attached to it, and we will.',
    plain:
      'Then stop using it. There is nothing to unwind, because we never held your coins in the first place. Ask us to delete your account and the details attached to it, and we will.',
  },
]

/* How many questions the homepage teaser shows. The rest live on /faq. */
export const FAQ_TEASER_COUNT = 5

/* -------------------------------------------------------------------------
   Register section
   ------------------------------------------------------------------------- */

export const REGISTER = {
  eyebrow: 'Open Your Account',
  h2: 'Start With Your Name And An Email Address',
  lede:
    'That is genuinely all it takes to get in. No exchange login, no wallet connection, no card details at this step.',
  ticks: [
    'Your coins never move and we never get your keys',
    'You see the full research breakdown, including the weak spots',
    'One phone call or email and a person answers it',
  ],
  formHeading: "Let's Get You Started",
}

/* -------------------------------------------------------------------------
   Closing call to action
   ------------------------------------------------------------------------- */

export const FINAL_CTA = {
  h2: 'Your Portfolio Already Exists. Now You Can See It.',
  body:
    'Add what you hold, read what the research says, and decide for yourself from there. That is the whole offer.',
  primaryCta: 'Open Your Account',
  secondaryCta: 'Read The FAQ',
  secondaryHref: '/faq',
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
  asideNote:
    'We only ask for your name, email and phone number. We never ask for card details, wallet keys or exchange passwords, and you should treat anyone who does as a scam.',
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
    'Bitlionex Port is a research and portfolio tracking service for Australian crypto holders. We do not hold your funds, place trades for you, or give personal financial advice.',
  riskHeading: 'Risk Warning',
  riskParas: [
    'Crypto assets are volatile. Prices can fall quickly and stay down, and you can lose some or all of the money you put in. Never invest money you cannot afford to lose.',
    'Nothing published by Bitlionex Port is personal financial advice or a recommendation to buy or sell any asset. Research describes market data, and past market behaviour does not indicate what will happen next. Consider your own circumstances, and seek licensed advice if you need it.',
  ],
  copyright: `© ${new Date().getFullYear()} Bitlionex Port. All rights reserved.`,
}
