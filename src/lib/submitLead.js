// =========================================================
// Lead submission
// =========================================================
// POSTs to the shared lead relay and normalises whatever comes back into one
// shape: { ok, message, errors }.
//
// WIRE FORMAT - application/json. Not a preference, the only thing the script
// reads. Sibling projects verified against this relay family that a
// form-encoded body arrives on the server as six empty strings, forwards
// blanks downstream, and comes back as "Enter first name." no matter what the
// visitor typed. The Content-Type header below is load-bearing.
//
// SIX KEYS GO OUT. `password` and `offerName` are sent from here on purpose:
//
//   password   a template constant, not a secret. The same string ships in
//              the public bundle of every site built on this template, and the
//              relay has its own copy, so it is not a credential.
//   offerName  what routes the lead to this brand. Omitting it sends leads to
//              a shared default funnel instead of to Bitlionex Port.
//
// The visitor's IP is not sent. The relay adds it server side.
//
// The endpoint rate-limits to three attempts per five minutes per IP, which is
// why the test harness intercepts the request rather than letting it through.
//
// If the host below ever changes, vercel.json's connect-src has to change with
// it. A CSP that does not list the endpoint blocks the request in production
// while every local check still passes.
// =========================================================

import { ACCOUNT_PASSWORD, OFFER_NAME, SIGNUP_ENDPOINT } from '../data/site.js'

// 45 seconds, not the 15 this template shipped with.
//
// 15 was inherited from the sibling projects and is fine on a fast connection
// to a nearby host. It is NOT fine here: measured from a browser on 2026-09-29
// the round trip took 17.6 seconds, so the AbortController fired before the
// relay had answered and every submission came back as "we could not reach the
// registration service" - while the relay was working perfectly and had in
// some cases already accepted the lead.
//
// Two round trips, not one: `Content-Type: application/json` is not a CORS
// simple header, so the browser sends an OPTIONS preflight first. The relay's
// own execution time is 0.047s, so the time is network, not the endpoint.
//
// The cost of being wrong in this direction is a visitor waiting longer before
// being told it failed. The cost of being wrong in the other is a visitor told
// their registration failed when it succeeded, who then resubmits and trips
// the relay's three-attempts-per-five-minutes limit.
const TIMEOUT_MS = 45000

const UNREACHABLE =
  'We could not reach the registration service just now. Please try again in a moment.'
const REJECTED = 'Something went wrong. Please check your details and try again.'

// The relay appends a support code to its messages, e.g. "Enter first name.
// (#8plo9)". It is noise to a visitor.
export function stripCode(message) {
  return String(message ?? '')
    .replace(/\s*\(#[A-Za-z0-9]+\)\s*$/, '')
    .trim()
}

/**
 * Pull the field level errors out of the relay's diagnostic block.
 *
 * The block is a JSON encoded string and is only meaningful server side; it is
 * never shown to a visitor. It is read here for the one useful thing in it:
 * which field the relay rejected.
 *
 * @returns {Array<{code: number|string, message: string}>} [] when absent or
 *   unparseable. A missing list is a normal outcome, not an error.
 */
function parseFieldErrors(data) {
  const raw = data?._debug?.affilix_raw
  if (!raw) return []
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (!Array.isArray(parsed?.errors)) return []
    return parsed.errors
      .filter((e) => e && (e.code !== undefined || e.message))
      .map((e) => ({ code: e.code, message: stripCode(e.message) }))
  } catch {
    // Unparseable diagnostic - fall through to the top level message.
    return []
  }
}

/**
 * @param {{firstName: string, lastName: string, email: string, phone: string}} lead
 *   `phone` must already be E.164 (see toE164 in phoneFormat.js).
 * @returns {Promise<{ok: true} | {ok: false, message: string, errors: Array}>}
 */
export async function submitLead({ firstName, lastName, email, phone }) {
  // Built explicitly rather than spread from the caller, so the wire format is
  // readable in one place and a stray form field cannot widen it.
  const body = {
    email: String(email ?? '').trim(),
    firstName: String(firstName ?? '').trim(),
    lastName: String(lastName ?? '').trim(),
    password: ACCOUNT_PASSWORD,
    phone: String(phone ?? '').trim(),
    offerName: OFFER_NAME,
  }

  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)

  let res
  try {
    res = await fetch(SIGNUP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctl.signal,
    })
  } catch {
    // A timeout, a CORS rejection and a dropped connection are
    // indistinguishable here, because fetch() rejects the same way for all
    // three. One honest message rather than a guess that might tell the
    // visitor the lead definitely failed and invite a duplicate submission.
    return { ok: false, message: UNREACHABLE, errors: [] }
  } finally {
    clearTimeout(timer)
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // An HTML error page or an empty body. Treated as a failure below rather
    // than as a success, because an empty body must never reach /thank-you.
    data = null
  }

  const serverMessage = typeof data?.message === 'string' ? stripCode(data.message) : ''
  const errors = parseFieldErrors(data)

  // The HTTP status is checked as well as the envelope. A 500 carrying a well
  // formed success body is still a failure, and reading only `data.status`
  // would report it as a success and walk the visitor to /thank-you for a lead
  // that was never sent.
  //
  // The two failure branches carry different advice on purpose. A non-2xx is
  // the service's problem, so it must not tell the visitor to check details
  // that were fine. A 2xx with status "error" is the relay rejecting what was
  // typed, and there the details are exactly what to check.
  if (!res.ok) {
    return { ok: false, message: serverMessage || UNREACHABLE, errors }
  }

  if (!data || data.status !== 'success') {
    return { ok: false, message: serverMessage || REJECTED, errors }
  }

  return { ok: true }
}
