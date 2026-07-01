import { useState } from 'react'
import FormField from './FormField'
import FormIcon from './FormIcon'
import PhoneField from './PhoneField'
import { DEFAULT_PHONE_COUNTRY } from '../data/countryPhoneOptions'
import { sendMessage } from '../lib/api'
import { formatPhoneE164, validateContactForm } from '../utils/formValidation'
import '../styles/forms.css'

function ContactForm() {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY)
  const [phoneNational, setPhoneNational] = useState('')
  const [formValues, setFormValues] = useState({
    name: '', email: '', subject: '', message: '',
  })

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validateContactForm({
      name: formValues.name,
      email: formValues.email,
      phoneCountry,
      phoneNational,
      subject: formValues.subject,
      message: formValues.message,
    })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccess(false)
      return
    }

    setSubmitting(true)
    setErrors({})

    const phone = formatPhoneE164(phoneCountry, phoneNational)

    try {
      await sendMessage({
        type: 'contact',
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        ...(phone ? { phone } : {}),
        subject: formValues.subject.trim(),
        message: formValues.message.trim(),
      })
      setSuccess(true)
      e.currentTarget.reset()
      setFormValues({ name: '', email: '', subject: '', message: '' })
      setPhoneCountry(DEFAULT_PHONE_COUNTRY)
      setPhoneNational('')
    } catch (err) {
      setErrors({ _form: err.message || 'Submission failed. Please try again.' })
      setSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="modern-form-shell" aria-labelledby="contact-form-title">
      <header className="modern-form-header">
        <div className="modern-form-header-icon">
          <FormIcon name="message" />
        </div>
        <div>
          <h2 id="contact-form-title">Send Us a Message</h2>
          <p>Have a question about scholarships or programs? Write to us and our team will respond soon.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="modern-form" noValidate>
        <FormField
          label="Full Name"
          name="name"
          icon="user"
          placeholder="Your name"
          required
          value={formValues.name}
          error={errors.name}
          onChange={(e) => {
            setFormValues((v) => ({ ...v, name: e.target.value }))
            clearError('name')
          }}
        />
        <FormField
          label="Email"
          name="email"
          icon="mail"
          type="email"
          placeholder="you@email.com"
          required
          value={formValues.email}
          error={errors.email}
          onChange={(e) => {
            setFormValues((v) => ({ ...v, email: e.target.value }))
            clearError('email')
          }}
        />
        <PhoneField
          id="phone"
          name="phone"
          label="Phone (optional)"
          country={phoneCountry}
          national={phoneNational}
          error={errors.phone}
          onCountryChange={setPhoneCountry}
          onNationalChange={(national) => {
            setPhoneNational(national)
            clearError('phone')
          }}
        />
        <FormField
          label="Subject"
          name="subject"
          icon="message"
          placeholder="Scholarship inquiry"
          value={formValues.subject}
          error={errors.subject}
          onChange={(e) => {
            setFormValues((v) => ({ ...v, subject: e.target.value }))
            clearError('subject')
          }}
        />
        <FormField label="Message" name="message" icon="message" required error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="How can we help you?"
            value={formValues.message}
            aria-invalid={errors.message ? 'true' : 'false'}
            onChange={(e) => {
              setFormValues((v) => ({ ...v, message: e.target.value }))
              clearError('message')
            }}
          />
        </FormField>

        <div className="modern-form-actions">
          <button type="submit" className="modern-form-btn modern-form-btn--blue" disabled={submitting}>
            <FormIcon name="send" />
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </div>

        {errors._form && (
          <p className="modern-field-error" role="alert">{errors._form}</p>
        )}

        {success && (
          <p className="modern-form-success" role="status">
            <span className="modern-form-success-icon" aria-hidden="true">
              <FormIcon name="check" />
            </span>
            Message sent successfully. Our team will get back to you soon.
          </p>
        )}
      </form>
    </section>
  )
}

export default ContactForm
