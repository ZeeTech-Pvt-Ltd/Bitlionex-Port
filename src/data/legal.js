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


/* -------------------------------------------------------------------------
   Terms and Conditions
   ------------------------------------------------------------------------- */

import { LEGAL_LAST_REVIEWED } from './site.js'

const terms = {
  id: 'terms',
  eyebrow: 'Terms And Conditions',
  title: 'Terms And Conditions',
  updated: LEGAL_LAST_REVIEWED,
  intro:
    'These terms govern your use of the Bitlionex Port website and research service. They form a binding agreement between you and the operator of this website. By using the site or opening an account, you agree to them. If you do not agree with any part of them, please stop using the site.',
  sections: [
    {
      id: 'general',
      heading: '1. General',
      paras: [
        'Welcome to Bitlionex Port. You can reach us about anything in these terms at support@bitlionexport-au.com.',
        'These terms, together with our Privacy Policy, set out the whole agreement between you and us. By using the website you confirm you accept both, and you consent to how the Privacy Policy says your information is handled. The Privacy Policy is available on this site and forms part of these terms.',
        'We describe what this service is, and what it is not, in section 2. Please read that section before you rely on anything the site publishes.',
      ],
    },
    {
      id: 'what-this-is',
      heading: '2. What This Service Is',
      paras: [
        'Bitlionex Port is a research and portfolio tracking service. It gathers market data, scores assets against a published set of measures, and presents the result so you can make your own decisions.',
        'The site may also describe or link to third party platforms that provide trading or related services. We do not operate those platforms, we do not place trades on your behalf through them or anywhere else, and we never take custody of your assets.',
        'We are not a broker, a market maker, an exchange, a custodian, or a licensed financial adviser.',
        'Nothing on this site or in the service is personal financial advice. It does not consider your objectives, financial situation or needs. Before acting on anything you read here, consider whether it suits your circumstances, and seek advice from a licensed adviser if you need it.',
      ],
    },
    {
      id: 'eligibility',
      heading: '3. Who Can Use It',
      paras: [
        'You may use this service only if all of the following are true. You are at least 18 years old. You have the legal capacity to enter into these terms and to comply with them. You are not barred from using the site or the service under the laws of the place where you live or from which you are accessing it.',
        'The service is built for Australian residents. If you use it from somewhere else, you are responsible for making sure you are allowed to, and for any tax or reporting obligations that follow.',
        'If you open an account on behalf of a company or trust, you confirm you are authorised to bind that entity to these terms.',
        'We make no promise, express or implied, about whether the site or the service is lawful for you to use where you are, or about how you may use it. We are not liable for any use of the site that breaks your local law.',
      ],
    },
    {
      id: 'restricted-territories',
      heading: '4. Restricted Territories',
      paras: [
        'We may, at our discretion, limit or refuse access to the site or the service, in whole or in part, for anyone in a particular place, and for anyone we reasonably consider may present a legal, regulatory, reputational or commercial risk.',
        'We may also set additional conditions before accepting users who live in or are accessing from certain countries. If you travel to a place where the service is restricted, parts of it may be unavailable to you while you are there.',
      ],
    },
    {
      id: 'your-account',
      heading: '5. Your Account',
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
      heading: '6. Fees',
      paras: [
        'Opening an account costs nothing. Where a fee applies to any part of the service, it is shown in full before you are asked to pay it, and you are never charged without being told first.',
        'Any funding level or minimum balance is set by the platform and confirmed to you in writing before anything is transferred.',
      ],
    },
    {
      id: 'research-not-advice',
      heading: '7. Research Is Not Advice',
      paras: [
        'What we publish is general information about market data. It is not personal financial advice, it is not a recommendation, and it does not take account of your objectives, financial situation or needs.',
        'Our scores and commentary describe what the data showed at a point in time. They are not predictions, guarantees or recommendations.',
        'A high score is not a promise that an asset will rise. A low score is not a prediction that it will fall. Scores can be wrong, and data can be incomplete, delayed or inaccurate.',
        'You are responsible for every decision you make about your own money. We do not make any of them for you, and we do not place trades on your behalf.',
      ],
    },
    {
      id: 'prohibited',
      heading: '8. Prohibited Activities',
      paras: [
        'You agree to use the site and the service lawfully, and not to do any of the following.',
      ],
      list: [
        'Post, upload, publish or send anything that infringes someone else’s rights, including intellectual property or privacy rights.',
        'Post, upload, publish or send anything unlawful, threatening, harmful, offensive, defamatory, racist or otherwise inappropriate.',
        'Introduce viruses or any other software that could damage our systems or anyone else’s, or that interferes with another person’s use of the site.',
        'Post or send advertising of any kind without our written consent.',
        'Remove or alter any legal notice, attribution or proprietary mark on the site.',
        'Reach the service through any interface other than this website.',
        'Interfere with anyone else’s use of the site or the service.',
        'Use bots or automated systems to interact with the site or the service.',
        'Introduce any passive or active information collection mechanism, including web bugs, cookies or similar tracking devices, without our written consent.',
        'Frame, mirror or otherwise reproduce the appearance or functionality of the service.',
        'Break any law, or encourage or help anyone else to, including copyright or trademark infringement, defamation, invasion of privacy, identity theft, hacking, cracking or distributing counterfeit software.',
        'Alter or interfere with the source code of the site, or upload anything that could harm the site or a third party.',
        'Disassemble, decompile or reverse engineer any software or technology in the site or used to provide the service.',
      ],
    },
    {
      id: 'enforcement',
      heading: '9. Monitoring And Enforcement',
      paras: [
        'If we believe your use of the site or the service does not follow these terms or the law, we may monitor that use.',
        'We may also restrict your access, share information about how you have used the site with third parties, and take any other step we consider necessary to protect our rights and those of third parties.',
        'This is in addition to any other rights we have, and does not replace them.',
      ],
    },
    {
      id: 'third-party',
      heading: '10. Third Party Content',
      paras: [
        'While using the service you may encounter content or services from third parties. That includes descriptions of, or links to, platforms that provide trading or related services, along with advertising and reviews.',
        'We do not control that content and we do not endorse it. It may not be accurate or up to date, and the third party may change it without telling us.',
        'Check anything you read before you rely on it. Any decision you make or action you take because of third party content is your responsibility alone.',
      ],
    },
    {
      id: 'links',
      heading: '11. Links',
      paras: [
        'The site may contain links, content, advertisements, promotions, logos and other material pointing to websites or software we do not operate. Those are the Links.',
        'There is a risk in using anything you reach through a Link. Read the terms and policies of the third party before interacting with it, and before you retrieve, use, rely on or buy anything from it.',
        'A Link on this site does not mean we endorse, authorise, sponsor, are affiliated with, or are connected to that site, that software, or whoever runs it.',
        'We have not reviewed everything the Links lead to and we are not responsible for it. You agree not to hold us liable for any loss or damage caused by relying on or using content, goods or services found through a Link.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: '12. Our Content',
      paras: [
        'The whole of this site, including its text, images, video, logos, design, sound and marks, is protected by intellectual property rights owned by us or by third parties. We hold all rights, title and interest in the site and the service.',
        'Using the site or the service does not transfer any intellectual property rights to you. The only right you have is the right to use them as these terms describe, which is personal and non commercial.',
        'You may not modify, decompile, disassemble, reverse engineer, copy, transfer, make derivative works from, rent, sublicense, distribute, reproduce, republish, scrape, download, display, transmit, post, lease or sell any part of the site without our written consent. That includes any use that falls outside these terms.',
      ],
    },
    {
      id: 'availability',
      heading: '13. Availability',
      paras: [
        'We aim to keep the service running, but we do not promise it will always be available or free of faults. We may change, pause or withdraw any part of it.',
        'We may update these terms. When we do, we change the reviewed date at the top of this page and the current version is the one you are reading. Continuing to use the service after a change means you accept the updated terms.',
      ],
    },
    {
      id: 'liability',
      heading: '14. Limits Of Our Liability',
      paras: [
        'You use the site and the service at your own risk. To the extent the law allows, we disclaim every warranty, express or implied, about the site, the service and your use of them. That includes any implied warranty of merchantability, title, fitness for a particular purpose, non infringement, usefulness, authority, accuracy, completeness or timeliness. The service and everything on it is provided as is, as available, and with all faults.',
        'We are not responsible for any error, mistake or inaccuracy in the content on the site.',
        'We are not responsible for any interruption or failure of transmission to or from the site.',
        'We are not responsible for any bug, virus, trojan or similar problem transmitted to or through the site or the service by a third party.',
        'We are not responsible for any fault in telephone or network lines, online systems, servers or providers, hardware or software.',
        'We are not responsible for any failure caused by technical problems or internet congestion.',
        'We are not responsible for any incompatibility between the site or the service and your browser or other equipment. We accept no responsibility or risk for your internet use.',
        'You agree to indemnify us for any loss you or anyone else suffers in connection with the site or the service, and you take full responsibility for any decision you make based on the content of the site or the service.',
        'To the extent the law allows, we are not liable for any special, direct, indirect, incidental, punitive or consequential loss, including loss of profit or data.',
        'That covers loss arising from your use of the site or the service, and from anything accessed or downloaded through them.',
        'It applies whether the claim is based on warranty, contract, tort or any other legal theory, and whether or not we were told the loss was possible.',
        'If a court holds us liable, our total liability will not exceed 100 AUD.',
        'Nothing in these terms excludes any right you have under the Australian Consumer Law that cannot lawfully be excluded. Where our liability cannot be excluded but can be limited, it is limited to the amount you have paid us in the twelve months before the claim, or 100 AUD, whichever is greater.',
      ],
    },
    {
      id: 'miscellaneous',
      heading: '15. General',
      paras: [
        'We may modify, amend or discontinue any part of the service, or add new services, at any time. We are not liable for any loss you suffer because of a change, and you have no claim against us for it.',
        'We may update these terms from time to time. When we do, we publish the current version and change the reviewed date at the top of this page. A change takes effect when it is published, and continuing to use the site after that means you accept it.',
        'Sending information to or from the site does not create any relationship between us beyond what these terms describe.',
        'These terms and the Privacy Policy, as each is updated from time to time, are the whole agreement between us. No other statement, promise, consent or undertaking, whether written or spoken, is binding on either of us.',
        'If we do not enforce a right, power or remedy straight away, that is not a waiver of it. Enforcing one partly does not stop us enforcing it or anything else later.',
        'If a court with proper jurisdiction finds any part of these terms unenforceable, that part is removed. The rest stays valid and enforceable as though it had never been included, and where the law allows the remaining terms are read so as to best reflect what the removed part was intended to achieve.',
        'We may transfer or assign our rights and obligations under these terms to a third party, and the site or any part of the service may be run by third parties. You may not transfer, assign or pledge any of your rights or obligations under these terms.',
      ],
    },
  ],
}

/* -------------------------------------------------------------------------
   Privacy Policy
   -------------------------------------------------------------------------
   Written against what this site actually does. Four things in the code make
   specific sentences below true, so if any of them changes, this document has
   to change with it:

     1. Fonts and images are served from this domain. No font CDN, no social
        plugin, no advertising pixel. That is what "self hosted" means below.
        There WAS a fifth line here claiming no analytics either - that stopped
        being true on 2026-09-29 when Google Analytics was added at the
        operator's request, and section 3 was rewritten to match rather than
        left saying the opposite.
     2. Google Analytics is loaded on every page. It sets two _ga cookies and
        sends data to Google. Section 3 discloses it, and section 5 names
        Google as a recipient.
     3. The country picker reads the browser's own timezone. It never calls an
        IP geolocation service, so no visitor address is handed to anyone for
        a convenience feature.
     4. The registration form posts to our registration partner. That is a
        third party request, and it happens only when you press the button.
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
      id: 'cookies',
      heading: '3. Cookies And Analytics',
      paras: [
        'This site uses Google Analytics to count visits and see which pages get read. It sets two cookies, both beginning with _ga, and the measurements are sent to Google.',
        'We use that to work out which parts of the site are worth keeping. We do not use advertising cookies, we run no advertising or social pixels, and we do not sell or trade what we learn from analytics.',
        'No font service, advertising network or social plugin is loaded. Fonts and images are served from this domain, so those requests do not leave it.',
        'There is no cookie banner, because nothing here needs consent in Australia. Your browser can block or clear the analytics cookies and every part of this site still works.',
        'We also store one small note in your browser session when you submit the form, so the confirmation page can address you by name. It is cleared when you close the tab, it never leaves your device, and refusing it does not stop you registering.',
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
        'Google receives the analytics measurements described in section 3, including an identifier stored in the _ga cookies. Google handles that data under its own privacy policy. We do not send Google your name, email address or phone number.',
        'Apart from those two, we do not sell, rent or trade your personal information, and we do not disclose it to anyone else except where the law requires it or where it is needed to protect someone from harm.',
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
