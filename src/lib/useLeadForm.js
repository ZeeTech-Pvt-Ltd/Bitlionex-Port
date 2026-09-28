import { useEffect, useMemo, useRef, useState } from 'react'
import { submitLead } from './submitLead.js'
import { detectCountry } from './timezoneCountry.js'
import {
  DEFAULT_ISO,
  formatNational,
  getCountry,
  getPhoneFormat,
  hasTrunkPrefix,
  parsePhoneInput,
  toE164,
} from './phoneFormat.js'
import { FORM_STORAGE_KEY, MIN_AGE } from '../data/site.js'

// =========================================================
// The lead form: state, validation and submission
// =========================================================
// Kept out of the component so the homepage section and the contact page
// share one implementation. Two copies of this logic is exactly how the
// sibling projects ended up with forms that behaved differently on the two
// pages that are supposed to be identical.
//
// The relay's own error codes, mapped to the field they belong to. Observed
// against this relay family rather than guessed:
//
//   10001 Enter first name.                           -> firstName
//   10006 First name should be at least 1 characters  -> firstName
//   10002 Enter last name.                            -> lastName
//   10007 Last name should be at least 1 characters   -> lastName
//   10003 Enter email.                                -> email
//   10008 Invalid email address.                      -> email
//   10089 Email already exists.                       -> email
//   10005 Enter phone.                                -> phone
const FIELD_BY_ERROR = {
  10001: 'firstName',
  10006: 'firstName',
  10002: 'lastName',
  10007: 'lastName',
  10003: 'email',
  10008: 'email',
  10089: 'email',
  10005: 'phone',
}

// The fallback for a rejection that arrives with a code that is not in the
// table above. The message itself usually names the field, so it is matched
// on last.
const FIELD_BY_PHRASE = [
  [/first name/i, 'firstName'],
  [/last name|surname/i, 'lastName'],
  [/e-?mail/i, 'email'],
  [/phone|mobile|\bnumber\b/i, 'phone'],
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?\d{6,15}$/
const MAX_NAME = 60

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', company: '', agree: false }
const FIELD_ORDER = ['firstName', 'lastName', 'email', 'phone']

// The default country stays on screen for this long before a timezone guess
// may replace it, so the switch reads as a correction rather than a flicker.
const MIN_DEFAULT_VISIBLE_MS = 1600

function validateField(name, value, countryName) {
  const v = String(value ?? '')

  if (name === 'firstName' || name === 'lastName') {
    const which = name === 'firstName' ? 'first' : 'last'
    if (!v.trim()) return `Please enter your ${which} name.`
    if (v.trim().length > MAX_NAME) return 'Name must be under 60 characters.'
    return ''
  }

  if (name === 'email') {
    if (!v.trim()) return 'Please enter your email address.'
    if (!EMAIL_RE.test(v.trim())) return 'Please enter a valid email address, e.g. name@example.com'
    return ''
  }

  if (name === 'phone') {
    if (!v.trim()) return 'Please enter your phone number.'
    // The country code is already selected beside this field, so a local trunk
    // prefix is redundant. Left in, it would build an invalid international
    // number (61 followed by 0412...). Reject it and say why, rather than
    // quietly swallowing a digit the visitor typed on purpose.
    if (hasTrunkPrefix(v)) {
      return 'Enter the number without the leading 0. The country code is already selected.'
    }
    const digits = v.replace(/[^\d+]/g, '')
    if (!PHONE_RE.test(digits)) return `Enter a valid ${countryName} phone number.`
    return ''
  }

  return ''
}

/**
 * @param {{ storageKey?: string, variant?: 'signup'|'contact' }} options
 */
export function useLeadForm({ storageKey = FORM_STORAGE_KEY, variant = 'signup' } = {}) {
  const [values, setValues] = useState(EMPTY)
  const [country, setCountry] = useState(DEFAULT_ISO)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const submittingRef = useRef(false)
  const mountedRef = useRef(true)
  // Once the visitor picks a country themselves, the timezone guess must not
  // overwrite it. It resolves a moment after mount and would otherwise yank
  // the flag back out from under them.
  const pickedCountry = useRef(false)
  const typedPhone = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // Pre-select the country from the visitor's timezone. Runs only in the
  // browser, so the prerendered HTML, which always shows the default, matches
  // the client's first render and hydrates without a mismatch.
  useEffect(() => {
    const iso = detectCountry()
    if (!iso) return
    const timer = setTimeout(() => {
      if (mountedRef.current && !pickedCountry.current && !typedPhone.current) setCountry(iso)
    }, MIN_DEFAULT_VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [])

  const format = useMemo(() => getPhoneFormat(country), [country])

  // Only used inside a validation message ("Enter a valid Australia phone
  // number"), so the picker's own table is the right source. It is the same
  // list the visitor is choosing from, and it needs no Intl support.
  const countryName = useMemo(() => getCountry(country).name, [country])

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (serverError) setServerError('')
    // Live re-validation only after the field has been left once, so errors do
    // not appear while someone is still typing their name.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value, countryName) }))
    }
  }

  /**
   * Phone input. A leading "+" means an international number was pasted or
   * typed in full, so it is parsed rather than masked, which also re-points
   * the flag if the dial code belongs to another country.
   */
  const setPhone = (raw) => {
    typedPhone.current = true
    const trimmed = String(raw).trim()

    if (trimmed === '+') {
      setField('phone', '+')
      return
    }

    if (trimmed.startsWith('+') && /\d/.test(trimmed)) {
      const parsed = parsePhoneInput(trimmed, country)
      if (parsed.iso !== country) {
        pickedCountry.current = true
        setCountry(parsed.iso)
      }
      const nextMask = getPhoneFormat(parsed.iso).mask
      setField('phone', formatNational(parsed.national, nextMask))
      return
    }

    setField('phone', formatNational(trimmed, format.mask))
  }

  const onCountryChange = (iso) => {
    pickedCountry.current = true
    setCountry(iso)
    // Re-group whatever is already typed against the new country's mask.
    setValues((prev) => ({
      ...prev,
      phone: formatNational(prev.phone, getPhoneFormat(iso).mask),
    }))
    setErrors((prev) => ({ ...prev, phone: '' }))
  }

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name], countryName) }))
  }

  const validateAll = () => {
    const next = {}
    for (const name of FIELD_ORDER) {
      const message = validateField(name, values[name], countryName)
      if (message) next[name] = message
    }
    if (!values.agree) {
      next.agree = 'Please agree to the Privacy Policy and Terms and Conditions to continue.'
    }
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Belt and braces on top of the disabled button.
    if (submittingRef.current) return

    setServerError('')

    // Honeypot. A real person cannot see this field, so anything in it came
    // from a bot. Nothing is sent, and the visitor is told something went
    // wrong rather than being left with a form that silently did nothing.
    //
    // The field is cleared afterwards, because a password manager that
    // autofilled "Company" would otherwise block a real person permanently.
    // The relay's own rate limit is the control that actually matters here.
    if (String(values.company ?? '').trim() !== '') {
      setValues((prev) => ({ ...prev, company: '' }))
      setServerError('Something went wrong. Please check your details and try again.')
      return
    }

    const nextErrors = validateAll()
    setErrors(nextErrors)
    setTouched({ firstName: true, lastName: true, email: true, phone: true, agree: true })

    const firstInvalid = [...FIELD_ORDER, 'agree'].find((name) => nextErrors[name])
    if (firstInvalid) {
      // Send focus to the first field that needs attention.
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus('submitting')
    submittingRef.current = true

    const result = await submitLead({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: toE164(country, values.phone),
    })

    // The component can unmount mid-request during a route change, and
    // setState on an unmounted tree is a no-op at best and a warning at worst.
    if (!mountedRef.current) {
      submittingRef.current = false
      return
    }

    if (!result.ok) {
      const fieldErrors = {}
      for (const err of result.errors ?? []) {
        const field = FIELD_BY_ERROR[err.code]
        if (field && err.message) fieldErrors[field] = err.message
      }
      // No code matched. Try the message itself before giving up on per-field
      // placement.
      if (!Object.keys(fieldErrors).length) {
        for (const [re, field] of FIELD_BY_PHRASE) {
          if (re.test(result.message)) {
            fieldErrors[field] = result.message
            break
          }
        }
      }

      if (Object.keys(fieldErrors).length) {
        setErrors((prev) => ({ ...prev, ...fieldErrors }))
        document.getElementById(Object.keys(fieldErrors)[0])?.focus()
      } else {
        setServerError(result.message)
      }
      setStatus('idle')
      submittingRef.current = false
      return
    }

    // Registered. Remember who submitted so /thank-you can greet them, then do
    // a full document load rather than a client side navigation, because the
    // confirmation page ships its own title and its own noindex, and
    // pushState would leave the previous route's head in place.
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          type: variant,
          firstName: values.firstName.trim(),
          email: values.email.trim(),
        }),
      )
    } catch {
      // Storage unavailable, which is the normal case in private mode. The
      // greeting falls back to generic copy, and that is not worth failing a
      // submission over.
    }

    window.location.assign('/thank-you')
  }

  return {
    values,
    country,
    mask: format.mask,
    placeholder: format.example,
    errors,
    status,
    serverError,
    submitting: status === 'submitting',
    minAge: MIN_AGE,
    setField,
    setPhone,
    onCountryChange,
    handleBlur,
    handleSubmit,
  }
}
