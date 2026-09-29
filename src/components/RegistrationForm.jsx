import { useLeadForm } from '../lib/useLeadForm.js'
import PhoneField from './PhoneField.jsx'
import { useLegal } from './LegalModal.jsx'
import { Alert, Loader, Shield } from './icons.jsx'
import { REGISTER } from '../data/content.js'

/**
 * The registration form.
 *
 * ONE component, rendered in two places: the homepage's #register section and
 * the /contact page. Two copies would drift, and the sibling project that
 * tried it ended up with a form that behaved differently depending on which
 * page you signed up from.
 *
 * FIELD IDS ARE LOAD BEARING. `firstName`, `lastName`, `email`, `phone`,
 * `agree` and `company` are selected on by the verification harness in
 * .arttmp/ and by browser password managers. Renaming one breaks both.
 *
 * The form is noValidate. Browser tooltips fire on their own schedule and
 * produce a second, differently worded message for the same problem; the
 * inline messages here are the only ones a visitor should see. `required`
 * stays on every input regardless, because that is what tells assistive
 * technology the field is mandatory before anything has been submitted.
 *
 * The honeypot is `company` - a field no real person can see or reach. It is
 * checked in useLeadForm, not here, so the check runs on the same path for
 * both pages that render this form.
 */
export default function RegistrationForm() {
  const { openLegal } = useLegal()
  const form = useLeadForm({ variant: 'signup' })

  const {
    values,
    country,
    placeholder,
    errors,
    serverError,
    submitting,
    minAge,
    setField,
    setPhone,
    onCountryChange,
    handleBlur,
    handleSubmit,
  } = form

  const showError = (name) => Boolean(errors[name])

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__head">
        <h3 className="form__title">{REGISTER.formHeading}</h3>
        <span className="form__badge">
          <Shield size={15} />
          No card details needed
        </span>
      </div>
      <p className="form__intro">
        We only need your name and contact details to begin. Fields marked{' '}
        <span aria-hidden="true">*</span>
        <span className="sr-only">asterisk</span> are required.
      </p>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="firstName">
            First Name <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            maxLength={60}
            placeholder="Jordan"
            value={values.firstName}
            onChange={(e) => setField('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            aria-invalid={showError('firstName')}
            aria-describedby={showError('firstName') ? 'firstName-error' : undefined}
          />
          {showError('firstName') && (
            <p className="field__error" id="firstName-error">
              <Alert size={14} />
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="lastName">
            Last Name <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            maxLength={60}
            placeholder="Clarke"
            value={values.lastName}
            onChange={(e) => setField('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            aria-invalid={showError('lastName')}
            aria-describedby={showError('lastName') ? 'lastName-error' : undefined}
          />
          {showError('lastName') && (
            <p className="field__error" id="lastName-error">
              <Alert size={14} />
              {errors.lastName}
            </p>
          )}
        </div>

        <div className="field field--wide">
          <label htmlFor="email">
            Email Address <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={showError('email')}
            aria-describedby={showError('email') ? 'email-error' : undefined}
          />
          {showError('email') && (
            <p className="field__error" id="email-error">
              <Alert size={14} />
              {errors.email}
            </p>
          )}
        </div>

        {/* PhoneField draws its own .field wrapper, so this only carries the
            grid span. Adding .field here would nest two of them. */}
        <div className="field--wide">
          <PhoneField
            country={country}
            phone={values.phone}
            placeholder={placeholder}
            onCountryChange={onCountryChange}
            onPhoneChange={setPhone}
            onBlur={() => handleBlur('phone')}
            error={errors.phone}
            errorId="phone-error"
          />
        </div>
      </div>

      {/* Honeypot. Off screen rather than display:none, because some bots skip
          fields they cannot measure, and out of the tab order so no keyboard
          user can ever land in it. tabIndex of -1 plus aria-hidden means it is
          invisible to assistive technology as well. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => setField('company', e.target.value)}
        />
      </div>

      <div className="consent">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          required
          checked={values.agree}
          onChange={(e) => setField('agree', e.target.checked)}
          onBlur={() => handleBlur('agree')}
          aria-invalid={showError('agree')}
          aria-describedby={showError('agree') ? 'agree-error' : undefined}
        />
        {/* The sentence lives in its own span rather than sitting loose in the
            label. It reads the same, but it means the two links are controls
            inside a block of text - which is what they are, and which is the
            case WCAG exempts from the minimum target size. Loose text nodes in
            a label are also the thing screen readers most often read oddly. */}
        <label htmlFor="agree">
          <span>
            I agree to the{' '}
            <button type="button" onClick={() => openLegal('privacy')}>
              Privacy Policy
            </button>{' '}
            and the{' '}
            <button type="button" onClick={() => openLegal('terms')}>
              Terms And Conditions
            </button>
            , and I confirm I am {minAge} or over.
          </span>
        </label>
      </div>
      {showError('agree') && (
        <p className="field__error" id="agree-error" style={{ marginTop: 8 }}>
          <Alert size={14} />
          {errors.agree}
        </p>
      )}

      {serverError && (
        <div className="form__alert" role="alert">
          <Alert size={17} />
          <span>{serverError}</span>
        </div>
      )}

      <button type="submit" className="btn btn--primary btn--block form__submit" disabled={submitting}>
        {submitting ? (
          <>
            <Loader size={17} className="spin" />
            Setting up your account…
          </>
        ) : (
          'Open Your Account'
        )}
      </button>
    </form>
  )
}
