import { useState } from 'react'
import FormField from './FormField'
import FormIcon from './FormIcon'
import PhoneField from './PhoneField'
import { DEFAULT_PHONE_COUNTRY } from '../data/countryPhoneOptions'
import { paymentDetails, paymentQrImage, registrationFee } from '../data/paymentConfig'
import { validateDonationForm, formatPhoneE164 } from '../utils/formValidation'
import { sendMessage } from '../lib/api'
import '../styles/forms.css'

function DonationForm() {
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
      const firstErrorId = Object.keys(nextErrors)[0]
      document.getElementById(firstErrorId)?.focus?.()
      return
    }

    setSubmitting(true)
    setErrors({})

    try {
      await sendMessage({
        type: 'donation',
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        phone: formatPhoneE164(phoneCountry, phoneNational),
        amount: String(registrationFee),
        transactionId: formValues.transactionId.trim(),
        message: formValues.message.trim(),
      })
      setDonationSuccess(true)
      event.currentTarget.reset()
      setFormValues({ name: '', email: '', transactionId: '', message: '' })
      setPhoneCountry(DEFAULT_PHONE_COUNTRY)
      setPhoneNational('')
    } catch (err) {
      setErrors({ _form: err.message || 'Submission failed. Please try again.' })
      setDonationSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="modern-form-shell" aria-labelledby="registration-form-title">
      <header className="modern-form-header">
        <div className="modern-form-header-icon modern-form-header-icon--donate">
          <FormIcon name="donate" />
        </div>
        <div>
          <h2 id="registration-form-title">Registration Form</h2>
          <p>
            Please fill in your personal details, pay the registration fee of ₹{registrationFee.toLocaleString('en-IN')} via UPI,
            and enter your transaction ID to complete your registration with IWSHA.
          </p>
        </div>
      </header>

      <div className="modern-form-layout">
        <form onSubmit={handleDonationSubmit} className="modern-form" noValidate>
          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              <FormIcon name="user" />
              Candidate Details
            </h3>
            <FormField
              label="Full Name"
              name="name"
              icon="user"
              placeholder="Enter your full name as on official documents"
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
              label="Phone"
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
              <FormIcon name="rupee" />
              Registration Fees
            </h3>
            <FormField
              label="Registration Fee (INR)"
              name="registrationFee"
              icon="rupee"
              type="text"
              value={registrationFee.toLocaleString('en-IN')}
              readOnly
              disabled
            />
            <p className="modern-field-hint">
              A one-time registration fee of ₹{registrationFee.toLocaleString('en-IN')} is required for all candidates. This amount is fixed.
            </p>
          </div>

          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              <FormIcon name="check" />
              Payment Confirmation
            </h3>
            <FormField
              label="Transaction ID"
              name="transactionId"
              icon="check"
              placeholder="UPI / bank transaction reference number"
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
            <p className="modern-field-hint" style={{ marginTop: '-0.5rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
              Scan the QR code on the right to pay via UPI, then enter the transaction ID from your payment app or bank confirmation.
            </p>
          </div>

          <FormField
            label="Additional Information (optional)"
            name="message"
            icon="message"
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Course preference, questions, or anything else you would like us to know"
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

          <div className="modern-form-actions">
            <button type="submit" className="modern-form-btn modern-form-btn--orange" disabled={submitting}>
              <FormIcon name="donate" />
              {submitting ? 'Submitting…' : 'Complete Registration'}
            </button>
          </div>

          {errors._form && (
            <p className="modern-field-error" role="alert">{errors._form}</p>
          )}

          {donationSuccess && (
            <p className="modern-form-success" role="status">
              <span className="modern-form-success-icon" aria-hidden="true">
                <FormIcon name="check" />
              </span>
              Thank you for registering with IWSHA. We have received your details and payment reference. Our team will contact you soon with the next steps.
            </p>
          )}
        </form>

        <aside className="modern-pay-card">
          <div className="modern-pay-card-header">
            <FormIcon name="qr" />
            <h3>Pay Registration Fee</h3>
          </div>
          <div className="modern-pay-qr">
            <img src={paymentQrImage} alt="UPI QR code to pay IWSHA registration fee" width={168} height={168} />
          </div>
          <p className="modern-pay-amount">₹{registrationFee.toLocaleString('en-IN')}</p>
          <p className="modern-pay-upi">
            <strong>{paymentDetails.payeeName}</strong>
          </p>
          <p className="modern-pay-note">
            Scan with any UPI app · TID: {paymentDetails.terminalId}
          </p>
        </aside>
      </div>
    </section>
  )
}

export default DonationForm
