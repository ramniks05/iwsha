import { useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import FormField from './FormField'
import FormIcon from './FormIcon'
import PhoneField from './PhoneField'
import { DEFAULT_PHONE_COUNTRY } from '../data/countryPhoneOptions'
import { buildUpiLink, paymentDetails } from '../data/paymentConfig'
import { validateDonationForm, formatPhoneE164 } from '../utils/formValidation'
import { sendMessage } from '../lib/api'
import '../styles/forms.css'

const quickAmounts = [500, 1000, 5000]

function DonationForm() {
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [amount, setAmount] = useState('1000')
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY)
  const [phoneNational, setPhoneNational] = useState('')
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' })
  const upiLink = useMemo(() => buildUpiLink(amount), [amount])

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
      amount,
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
      amount,
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
        amount: String(amount).trim(),
        message: formValues.message.trim(),
      })
      setDonationSuccess(true)
      event.currentTarget.reset()
      setFormValues({ name: '', email: '', message: '' })
      setPhoneCountry(DEFAULT_PHONE_COUNTRY)
      setPhoneNational('')
      setAmount('1000')
    } catch (err) {
      setErrors({ _form: err.message || 'Submission failed. Please try again.' })
      setDonationSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="modern-form-shell" aria-labelledby="donation-form-title">
      <header className="modern-form-header">
        <div className="modern-form-header-icon modern-form-header-icon--donate">
          <FormIcon name="donate" />
        </div>
        <div>
          <h2 id="donation-form-title">Make a Donation</h2>
          <p>
            Your donation helps underserved yet ambitious students pursue advanced education
            and professional opportunities. Pay via UPI and submit your details below.
          </p>
        </div>
      </header>

      <div className="modern-form-layout">
        <form onSubmit={handleDonationSubmit} className="modern-form" noValidate>
          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              <FormIcon name="user" />
              Donor Details
            </h3>
            <FormField
              label="Full Name"
              name="name"
              icon="user"
              placeholder="Your name"
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
              Donation Amount
            </h3>
            <FormField
              label="Amount (INR)"
              name="amount"
              icon="rupee"
              type="number"
              placeholder="1000"
              required
              min={1}
              inputMode="numeric"
              value={amount}
              error={errors.amount}
              onChange={(event) => {
                setAmount(event.target.value)
                clearError('amount')
              }}
              onBlur={() => validateField('amount')}
            />

            <div className="modern-amount-chips">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={Number(amount) === value ? 'active' : ''}
                  onClick={() => {
                    setAmount(String(value))
                    clearError('amount')
                  }}
                >
                  ₹{value.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          <FormField
            label="Message (optional)"
            name="message"
            icon="message"
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Your message of support"
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
              {submitting ? 'Submitting…' : 'Submit Donation'}
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
              Thank you! Please complete payment using the QR code on the right.
            </p>
          )}
        </form>

        <aside className="modern-pay-card">
          <div className="modern-pay-card-header">
            <FormIcon name="qr" />
            <h3>Scan to Pay</h3>
          </div>
          <div className="modern-pay-qr">
            <QRCodeSVG value={upiLink} size={168} level="M" includeMargin />
          </div>
          {Number(amount) > 0 && (
            <p className="modern-pay-amount">₹{Number(amount).toLocaleString('en-IN')}</p>
          )}
          <p className="modern-pay-upi">
            UPI: <strong>{paymentDetails.upiId}</strong>
          </p>
          <p className="modern-pay-note">
            {paymentDetails.bankName} · {paymentDetails.accountNumber} · {paymentDetails.ifsc}
          </p>
        </aside>
      </div>
    </section>
  )
}

export default DonationForm
