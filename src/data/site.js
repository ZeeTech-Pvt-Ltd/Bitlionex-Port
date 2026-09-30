// =========================================================
// Brand constants - one place, so the name never drifts between pages
// =========================================================

export const BRAND = 'Bitlionex Port'
export const BRAND_MARK = 'Bitlionex'
export const BRAND_PORT = 'Port'
export const DOMAIN = 'bitlionexport-au.com'
export const SITE = `https://${DOMAIN}`

// Where the registration form posts. Changing this host means changing the
// connect-src line in vercel.json too, or the request is blocked in
// production while every local check still passes.
export const SIGNUP_ENDPOINT = 'https://theunion-ai.com/dorovio-au.php'

// What routes a lead to this brand at the shared relay. Without it, leads
// land in a default funnel that belongs to nobody.
export const OFFER_NAME = 'BitlionexPort-Site'

// A template constant, not a secret. The same string ships in the public
// bundle of every site built on this template.
export const ACCOUNT_PASSWORD = 'Lh23s3'

// Session key the form writes before it redirects, so /thank-you can greet
// the visitor by name.
export const FORM_STORAGE_KEY = 'bitlionex-port-form'

// The age the consent checkbox asks the visitor to confirm. Australia's age of
// majority is 18, so this is the value the site publishes. It lives here rather
// than being written out twice, because the checkbox and the footer sentence
// both state it and a mismatch between them is a legal problem rather than a
// copy problem.
export const MIN_AGE = 18

// The date the legal documents were last reviewed.
//
// It lives here rather than in legal.js because seo.js needs the ISO form for
// the sitemap, and importing it from legal.js pulled that whole 30 KB file into
// the main bundle - which stopped the legal documents from code-splitting and
// undid the point of lazy-loading the routes.
export const LEGAL_LAST_REVIEWED = '25 September 2026'
export const LEGAL_LAST_REVIEWED_ISO = '2026-09-25'
