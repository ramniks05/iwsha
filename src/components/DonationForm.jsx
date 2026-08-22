import { useRef, useState } from 'react'
import FormField from './FormField'
import FormIcon from './FormIcon'
import PhoneField from './PhoneField'
import { DEFAULT_PHONE_COUNTRY } from '../data/countryPhoneOptions'
import { paymentDetails, paymentQrImage, registrationFee } from '../data/paymentConfig'
import { validateDonationForm, formatPhoneE164 } from '../utils/formValidation'
import { sendMessage } from '../lib/api'
import '../styles/forms.css'

function RegistrationPaymentCard({ className = '' }) {
  return (
    <aside className={['modern-pay-card', className].filter(Boolean).join(' ')}>
      <div className="modern-pay-card-header">
        <FormIcon name="qr" />
        <h3>Scan & Pay</h3>
      </div>
      <div className="modern-pay-qr">
        <img
          src={paymentQrImage}
          alt="UPI QR code for registration fee"
          width={168}
          height={168}
        />
      </div>
      <p className="modern-pay-amount">₹{registrationFee.toLocaleString('en-IN')}</p>
      <p className="modern-pay-note">Any UPI app · Pay exactly ₹500</p>
      <p className="modern-pay-note modern-pay-note--tid">
        TID: {paymentDetails.terminalId}
      </p>
    </aside>
  )
}

function DonationForm() {
  const successRef = useRef(null)
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY)
  const [phoneNational, setPhoneNational] = useState('')
  const [formValues, setFormValues] = useState({ name: '', email: '', transactionId: '', message: '' })

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validateField = (field, values = formValues) => {
    const nextErrors = validateDonationForm({
      name: values.name,
      email: values.email,
      phoneCountry,
      phoneNational,
      transactionId: values.transactionId,
      message: values.message,
    })

    setErrors((prev) => {
      const next = { ...prev }
      if (nextErrors[field]) next[field] = nextErrors[field]
      else delete next[field]
      return next
    })
  }

  const handleDonationSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateDonationForm({
      name: formValues.name,
      email: formValues.email,
      phoneCountry,
      phoneNational,
      transactionId: formValues.transactionId,
      message: formValues.message,
    })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setDonationSuccess(false)
      const firstErrorField = Object.keys(nextErrors).find((key) => key !== '_form')
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus?.()
      }
      return
    }

    setSubmitting(true)
    setErrors({})

    const trimmedMessage = formValues.message.trim()

    try {
      await sendMessage({
        type: 'donation',
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        phone: formatPhoneE164(phoneCountry, phoneNational),
        amount: String(registrationFee),
        transactionId: formValues.transactionId.trim(),
        message: trimmedMessage || null,
      })
      setDonationSuccess(true)
      setFormValues({ name: '', email: '', transactionId: '', message: '' })
      setPhoneCountry(DEFAULT_PHONE_COUNTRY)
      setPhoneNational('')
      requestAnimationFrame(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    } catch (err) {
      setErrors({ _form: err.message || 'Submission failed. Please try again.' })
      setDonationSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="modern-form-shell modern-form-shell--landing" aria-label="Registration form">
      <RegistrationPaymentCard className="modern-pay-card--mobile" />

      <div className="modern-form-layout modern-form-layout--registration">
        <form onSubmit={handleDonationSubmit} className="modern-form" noValidate>
          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              Candidate Details
            </h3>
            <FormField
              label="Full Name"
              name="name"
              icon="user"
              placeholder="Your full name"
              required
              value={formValues.name}
              autoComplete="name"
              error={errors.name}
              onChange={(event) => {
                const name = event.target.value
                setFormValues((prev) => ({ ...prev, name }))
                clearError('name')
              }}
              onBlur={() => validateField('name')}
            />
            <FormField
              label="Email"
              name="email"
              icon="mail"
              type="email"
              placeholder="you@email.com"
              required
              value={formValues.email}
              autoComplete="email"
              error={errors.email}
              onChange={(event) => {
                const email = event.target.value
                setFormValues((prev) => ({ ...prev, email }))
                clearError('email')
              }}
              onBlur={() => validateField('email')}
            />
            <PhoneField
              id="phone"
              name="phone"
              label="Mobile Number"
              required
              country={phoneCountry}
              national={phoneNational}
              error={errors.phone}
              onCountryChange={(country) => {
                setPhoneCountry(country)
                clearError('phone')
              }}
              onNationalChange={(national) => {
                setPhoneNational(national)
                clearError('phone')
              }}
              onBlur={() => validateField('phone')}
            />
          </div>

          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              Registration Fee
            </h3>
            <div className="registration-fee-badge" aria-label={`Registration fee ${registrationFee} rupees`}>
              ₹{registrationFee.toLocaleString('en-IN')}
            </div>
            <p className="modern-field-hint">One-time fee · pay using the QR code</p>
          </div>

          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              Payment Confirmation
            </h3>
            <FormField
              label="Transaction ID"
              name="transactionId"
              icon="check"
              placeholder="UPI transaction ID"
              required
              value={formValues.transactionId}
              error={errors.transactionId}
              onChange={(event) => {
                const transactionId = event.target.value
                setFormValues((prev) => ({ ...prev, transactionId }))
                clearError('transactionId')
              }}
              onBlur={() => validateField('transactionId')}
            />
            <p className="modern-field-hint">From your UPI app after payment</p>
          </div>

          <FormField
            label="Notes (optional)"
            name="message"
            icon="message"
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows="2"
              placeholder="Course or query (optional)"
              value={formValues.message}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              onChange={(event) => {
                const message = event.target.value
                setFormValues((prev) => ({ ...prev, message }))
                clearError('message')
              }}
              onBlur={() => validateField('message')}
            />
          </FormField>

          <div className="modern-form-actions modern-form-actions--landing">
            <button type="submit" className="modern-form-btn modern-form-btn--orange" disabled={submitting}>
              <FormIcon name="check" />
              {submitting ? 'Submitting…' : 'Complete Registration'}
            </button>
            <p className="modern-form-footnote">
              Our counsellors will contact you within 1–2 working days.
            </p>
          </div>

          {errors._form && (
            <p className="modern-field-error" role="alert">{errors._form}</p>
          )}

          {donationSuccess && (
            <p ref={successRef} className="modern-form-success modern-form-success--landing" role="status">
              <span className="modern-form-success-icon" aria-hidden="true">
                <FormIcon name="check" />
              </span>
              Thank you! Registration received. Our team will contact you within 1–2 working days.
            </p>
          )}
        </form>

        <RegistrationPaymentCard className="modern-pay-card--desktop" />
      </div>
    </section>
  )
}

export default DonationForm
