// =========================================================
// Legal documents
// =========================================================
// Terms, Privacy and the Risk Disclosure. Three separate documents because
// they answer three different questions, and merging them makes all three
// harder to find.
//
// PLACEHOLDERS. Anything this business has not formally set is written as a
// bracketed [PLACEHOLDER] token. That is deliberate: a legal document with a
// guessed entity name or a made up registration number in it is worse than
// one with a visible gap, because the gap gets fixed and the guess gets
// published. Every token below must be replaced before launch - the build
// prints a count of them so none can slip through.
//
// The last reviewed date is set on each document, not derived from the build
// date, so a deploy does not silently claim the terms were updated.
// =========================================================

export const LEGAL_LAST_REVIEWED = '25 September 2026'

/* -------------------------------------------------------------------------
   Terms and Conditions
   ------------------------------------------------------------------------- */

const terms = {
  id: 'terms',
  eyebrow: 'Terms And Conditions',
  title: 'Terms And Conditions',
  updated: LEGAL_LAST_REVIEWED,
  intro:
    'These terms govern your use of the Bitlionex Port website and research service. By using the site or opening an account, you agree to them. If you do not agree, please do not use the service.',
  sections: [
    {
      id: 'who-we-are',
      heading: '1. Who We Are',
      // The registered entity name, its type, its ACN or ABN and its address
      // were placeholders here and were removed at the operator's request on
      // 2026-09-28, because none of those values are set. What is left does
      // the one job this section has to do - say who "we" is - without
      // pretending to a registration that does not exist yet.
      paras: [
        'Bitlionex Port is a research and portfolio tracking service. Throughout these terms, we and us mean the operator of this website.',
        'You can contact us about anything in these terms at support@bitlionexport-au.com.',
      ],
    },
    {
      id: 'what-this-is',
      heading: '2. What This Service Is',
      paras: [
        'Bitlionex Port is a research and portfolio tracking service. It gathers market data, scores assets against a published set of measures, and presents the result so you can make your own decisions.',
        'We are not a broker, a market maker, an exchange, a custodian, or a licensed financial adviser. We do not execute trades on your behalf and we never take custody of your assets.',
        'Nothing on this site or in the service is personal financial advice. It does not consider your objectives, financial situation or needs. Before acting on anything you read here, consider whether it suits your circumstances, and seek advice from a licensed adviser if you need it.',
      ],
    },
    {
      id: 'eligibility',
      heading: '3. Who Can Use It',
      paras: [
        'You may use this service if you are at least 18 years old and you are not barred from using it under the laws that apply to you.',
        'The service is built for Australian residents. If you use it from somewhere else, you are responsible for making sure you are allowed to, and for any tax or reporting obligations that follow.',
        'If you open an account on behalf of a company or trust, you confirm you are authorised to bind that entity to these terms.',
      ],
    },
    {
      id: 'your-account',
      heading: '4. Your Account',
      paras: [
        'You agree to give accurate information when you register and to keep it up to date.',
        'You are responsible for anything done through your account. Tell us straight away if you think someone else has access to it.',
        'We may suspend or close an account if we reasonably believe it is being used to break these terms, to break the law, or in a way that risks harm to others or to us.',
      ],
      list: [
        'One account per person unless we agree otherwise in writing.',
        'Do not share your login details.',
        'Do not use the service to scrape, resell or redistribute our research.',
      ],
    },
    {
      id: 'fees',
      heading: '5. Fees',
      paras: [
        'Opening an account costs nothing. Where a fee applies to any part of the service, it is shown in full before you are asked to pay it, and you are never charged without being told first.',
        'Any funding level or minimum balance is set by the platform and confirmed to you in writing before anything is transferred.',
      ],
    },
    {
      id: 'research-not-advice',
      heading: '6. Research Is Not Advice',
      paras: [
        'What we publish is general information about market data. It is not personal financial advice, it is not a recommendation, and it does not take account of your objectives, financial situation or needs.',
        'Our scores and commentary describe what the data showed at a point in time. They are not predictions, guarantees or recommendations.',
        'A high score is not a promise that an asset will rise. A low score is not a prediction that it will fall. Scores can be wrong, and data can be incomplete, delayed or inaccurate.',
        'You are responsible for every decision you make about your own money. We do not make any of them for you, and we do not place trades on your behalf.',
      ],
    },
    {
      id: 'third-party-data',
      heading: '7. Third Party Data',
      paras: [
        'We rely on market data from third party sources. We do not control those sources and cannot guarantee that the data is accurate, complete or available at any given moment.',
        'Where data is thin or missing, we aim to show that rather than fill the gap. Even so, you should not treat our figures as the final word on any asset.',
      ],
    },
    {
      id: 'availability',
      heading: '8. Availability',
      paras: [
        'We aim to keep the service running, but we do not promise it will always be available or free of faults. We may change, pause or withdraw any part of it.',
        'We may update these terms. When we do, the change appears on this page and the version you are reading is the current one. Continuing to use the service after a change means you accept the updated terms.',
      ],
    },
    {
      id: 'liability',
      heading: '9. Limits Of Our Liability',
      paras: [
        'Nothing in these terms excludes any right you have under the Australian Consumer Law that cannot lawfully be excluded.',
        'Subject to that, we are not liable for any loss of profit, loss of opportunity, or indirect or consequential loss arising from your use of the service, or from any decision you make after reading our research.',
        'To the extent the law allows, our total liability to you is limited to the amount you have paid us in the twelve months before the claim.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: '10. Our Content',
      paras: [
        'The site, the research, the scoring method and the design are ours or licensed to us. You may read and use them for your own personal purposes.',
        'You may not copy, republish, sell or redistribute our research without our written permission.',
      ],
    },
    {
      id: 'law',
      heading: '11. Which Law Applies',
      paras: [
        'These terms are governed by the laws of [PLACEHOLDER: state or territory], Australia. You and we both submit to the courts of that place.',
        'If any part of these terms turns out to be unenforceable, the rest of them still apply.',
      ],
    },
  ],
}

/* -------------------------------------------------------------------------
   Privacy Policy
   -------------------------------------------------------------------------
   Written against what this site actually does. Three things in the code
   make specific sentences below true, so if any of them changes, this
   document has to change with it:

     1. Fonts, images and scripts are all served from this domain. No font
        CDN, no analytics, no advertising pixels. That is what "no third
        party requests on page load" means.
     2. The country picker reads the browser's own timezone. It never calls an
        IP geolocation service, so no visitor address is handed to anyone for
        a convenience feature.
     3. The registration form posts to our registration partner. That IS a
        third party request, and it happens only when you press the button.
        The policy says so plainly rather than claiming the site never talks
        to anyone.
   ------------------------------------------------------------------------- */

const privacy = {
  id: 'privacy',
  eyebrow: 'Privacy Policy',
  title: 'Privacy Policy',
  updated: LEGAL_LAST_REVIEWED,
  intro:
    'This policy explains what personal information Bitlionex Port collects, why we collect it, who we share it with, and how you can have it corrected or removed. It is written to be read, not skimmed past.',
  sections: [
    {
      id: 'what-we-collect',
      heading: '1. What We Collect',
      paras: ['We collect two kinds of information: what you give us, and what your browser sends us.'],
      list: [
        'What you give us: your first name, last name, email address and phone number, entered in the registration form.',
        'What your browser sends: standard web server records, which include your IP address, the pages you requested and the time you requested them.',
        'What we do not collect: we do not ask for card details, wallet keys, exchange passwords, or any information about what you hold. The tracker never receives your exchange credentials.',
      ],
    },
    {
      id: 'why',
      heading: '2. Why We Collect It',
      paras: [
        'We use your name and contact details to set up your account, to contact you about it, and to answer you when you get in touch.',
        'We use the server records to keep the site running, to spot abuse such as automated form submissions, and to work out which pages are not doing their job.',
        'We do not use your information for automated decision making, and we do not build advertising profiles.',
      ],
    },
    {
      id: 'no-tracking',
      heading: '3. No Tracking, No Advertising Cookies',
      paras: [
        'This site sets no advertising or analytics cookies. It loads no font service, no analytics script, no social plugin and no advertising pixel. Every file a page needs is served from this domain.',
        'That is why the pages load without a cookie banner: there is nothing to consent to.',
        'We do store one small note in your browser session when you submit the form, so the confirmation page can address you by name. It is cleared when you close the tab, it never leaves your device, and refusing it does not stop you registering.',
      ],
    },
    {
      id: 'country-picker',
      heading: '4. The Country Picker',
      paras: [
        'The phone field starts on Australia and may switch to your own country. That guess is made from your browser’s own timezone setting, read locally on your device.',
        'We do not call an IP address lookup service to do this. A convenience feature is not worth handing a third party your address, so we did not build one.',
      ],
    },
    {
      id: 'sharing',
      heading: '5. Who We Share It With',
      paras: [
        'When you submit the registration form, your name, email address and phone number are sent to our registration partner, who handles onboarding for this offer and confirms the terms with you.',
        'That partner adds your IP address to the record on their side and may contact you about your registration. Their handling of your details is governed by their own privacy policy, which we can point you to on request.',
        'Apart from that, we do not sell, rent or trade your personal information. We disclose it to a third party only where the law requires it, or where it is needed to protect someone from harm.',
      ],
    },
    {
      id: 'overseas',
      heading: '6. Sending Information Overseas',
      paras: [
        'Some of the service providers we rely on may store or process data outside Australia. Where that happens, we take reasonable steps to make sure your information is handled consistently with this policy and with the Australian Privacy Principles.',
      ],
    },
    {
      id: 'keeping-it',
      heading: '7. How Long We Keep It',
      paras: [
        'We keep your account details for as long as your account is open, and for a reasonable period afterwards where we need to for record keeping or legal reasons.',
        'Server records are kept for a shorter period and then deleted or aggregated so they no longer identify anyone.',
      ],
    },
    {
      id: 'your-rights',
      heading: '8. Getting Access, Or Getting Removed',
      paras: [
        'You can ask us what personal information we hold about you, ask us to correct it if it is wrong, or ask us to delete your account and the details attached to it.',
        'Write to support@bitlionexport-au.com. We will respond within a reasonable time, and we will tell you if we cannot do what you asked and why.',
        'If you are not satisfied with how we handled it, you can raise the matter with the Office of the Australian Information Commissioner at oaic.gov.au.',
      ],
    },
    {
      id: 'security',
      heading: '9. Keeping It Safe',
      paras: [
        'We use reasonable technical and organisational measures to protect the information we hold, including encryption in transit.',
        'No system is perfectly secure. If a breach ever affects your personal information and we are required to tell you, we will.',
      ],
    },
    {
      id: 'children',
      heading: '10. Age',
      paras: [
        'This service is not intended for anyone under 18. We do not knowingly collect information from children. If you believe a child has given us their details, contact us and we will remove them.',
      ],
    },
    {
      id: 'changes',
      heading: '11. Changes To This Policy',
      paras: [
        'If we change how we handle personal information, we update this page straight away. The version you are reading is the current one.',
        'If the change is significant, we will also tell registered users directly.',
      ],
    },
  ],
}

/* -------------------------------------------------------------------------
   Risk Disclosure
   ------------------------------------------------------------------------- */

const risk = {
  id: 'risk',
  eyebrow: 'Risk Disclosure',
  title: 'Risk Disclosure',
  updated: LEGAL_LAST_REVIEWED,
  intro:
    'Read this before you use Bitlionex Port or act on anything it publishes. It sets out what can go wrong. Crypto carries real risk of loss, and no amount of research removes that.',
  sections: [
    {
      id: 'capital-at-risk',
      heading: '1. You Can Lose Your Money',
      paras: [
        'Crypto assets are volatile. Prices can move sharply in either direction, at any hour, including while you are asleep. You can lose some or all of what you put in.',
        'Only ever commit money you could afford to lose entirely without changing your life. Money you need for rent, bills or the next few years does not belong in this market.',
        'Never borrow to buy crypto, and never use money that is not yours to risk.',
      ],
    },
    {
      id: 'falls-are-normal',
      heading: '2. Large Falls Are Ordinary Here',
      paras: [
        'Falls of 30% to 50% have happened repeatedly in this market. They are not rare events and they are not usually caused by anything you did.',
        'Recoveries are not guaranteed and are not quick. A market that falls can stay down for years. Plan for that possibility before you invest, not after.',
      ],
    },
    {
      id: 'no-advice',
      heading: '3. We Do Not Give Advice',
      paras: [
        'Bitlionex Port publishes general research about market data. We do not know your circumstances, your goals or your other assets, and we cannot tell you what is right for you.',
        'Nothing here is personal financial advice or a recommendation to buy, hold or sell any asset. If you need advice about your own situation, speak to an adviser licensed in Australia.',
      ],
    },
    {
      id: 'scores',
      heading: '4. What Our Scores Mean, And What They Do Not',
      paras: [
        'A score summarises what the data showed at a point in time. It is a description, not a forecast.',
        'A high score is not a guarantee and a low score is not a prediction. Models can be wrong, and they are only as good as their inputs.',
        'Where market data is thin, the picture is less reliable, not more. Our coverage score is designed to make that visible rather than hide it.',
      ],
    },
    {
      id: 'custody',
      heading: '5. Your Assets Are Your Responsibility',
      paras: [
        'We never hold your crypto, your keys or your cash. They stay wherever you keep them.',
        'That means their safety is a matter between you and whichever exchange or wallet you use. If that platform fails, is hacked, freezes withdrawals or becomes insolvent, we cannot recover anything for you.',
        'Keep your own backups. Use a wallet you control for anything you cannot afford to lose.',
      ],
    },
    {
      id: 'platform-risk',
      heading: '6. Platform, Regulatory And Technology Risk',
      paras: [
        'Exchanges can fail. Rules can change. Governments can restrict or ban particular assets or services, sometimes with little warning.',
        'Smart contracts can have bugs. Networks can be congested. Transactions can fail or be reversed by a chain reorganisation.',
        'Crypto markets are largely unregulated compared with Australian equities. That means less protection is available to you if something goes wrong.',
      ],
    },
    {
      id: 'sample-data',
      heading: '7. Illustrative Figures On This Site',
      paras: [
        'Charts and numbers used to demonstrate how the dashboard works are sample data. The panels that show them carry a label saying so, in the corner of the panel.',
        'The market strip near the top of the home page shows representative prices for illustration as well. It is not a live quote feed.',
        'Sample data is not live market pricing, not a forecast, and not a record of anyone’s actual results. Do not read it as any of those things.',
      ],
    },
    {
      id: 'tax',
      heading: '8. Tax Is Your Responsibility',
      paras: [
        'Buying, selling, swapping and even spending crypto can create a tax event in Australia. Record keeping is your responsibility.',
        'We do not provide tax advice and our dashboards are not tax reports. Speak to a registered tax agent about your own situation.',
      ],
    },
    {
      id: 'get-help',
      heading: '9. If Crypto Is Affecting You',
      paras: [
        'If you are betting more than you planned, chasing losses, or losing sleep over your positions, stop and talk to someone. That is a much better outcome than another deposit.',
        'Free and confidential support is available in Australia from Lifeline on 13 11 14, and from the National Debt Helpline on 1800 007 007 for financial stress.',
      ],
    },
  ],
}

export const LEGAL_DOCS = { terms, privacy, risk }

/** The token the build counts, so a placeholder cannot ship unnoticed. */
export const PLACEHOLDER_TOKEN = '[PLACEHOLDER'

/**
 * Counts the placeholders in a document, so the build can print how many
 * unresolved values a page still carries.
 */
export function countPlaceholders(doc) {
  let n = 0
  const walk = (value) => {
    if (typeof value === 'string') {
      if (value.includes(PLACEHOLDER_TOKEN)) n += 1
      return
    }
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    if (value && typeof value === 'object') Object.values(value).forEach(walk)
  }
  walk(doc)
  return n
}
