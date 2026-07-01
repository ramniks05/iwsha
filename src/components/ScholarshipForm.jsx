import { useMemo, useState } from 'react'
import FormIcon from './FormIcon'
import PhoneField from './PhoneField'
import { DEFAULT_PHONE_COUNTRY } from '../data/countryPhoneOptions'
import { SECTION_OPTIONS, SCHOLARSHIP_FIELDS } from '../data/formConfig'
import { submitApplication } from '../lib/api'
import { formatPhoneE164, validateDynamicField, validateScholarshipForm } from '../utils/formValidation'
import '../styles/forms.css'

function DynamicField({ field, error, phoneState, onPhoneChange, onBlur }) {
  const { id, label, type, icon, placeholder, required, options } = field
  const controlClass = [
    'modern-field-control',
    icon ? 'modern-field-control--icon' : '',
    error ? 'modern-field-control--invalid' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (type === 'tel') {
    return (
      <PhoneField
        id={id}
        name={id}
        label={label}
        required={required}
        country={phoneState?.country ?? DEFAULT_PHONE_COUNTRY}
        national={phoneState?.national ?? ''}
        error={error}
        onCountryChange={(country) => onPhoneChange(id, { country })}
        onNationalChange={(national) => onPhoneChange(id, { national })}
        onBlur={() => onBlur(id)}
      />
    )
  }

  const inputEl = type === 'select' ? (
    <select
      id={id}
      name={id}
      defaultValue=""
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      onBlur={() => onBlur(id)}
    >
      <option value="" disabled>{placeholder || `Select ${label}`}</option>
      {(options || []).map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  ) : type === 'textarea' ? (
    <textarea
      id={id}
      name={id}
      rows={4}
      placeholder={placeholder}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      onBlur={() => onBlur(id)}
    />
  ) : (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      min={type === 'number' ? (id === 'age' ? 10 : 0) : undefined}
      max={type === 'number' ? (id === 'age' ? 100 : undefined) : undefined}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${id}-error` : undefined}
      onBlur={() => onBlur(id)}
    />
  )

  return (
    <div className={`modern-field${error ? ' modern-field--error' : ''}`}>
      <label className="modern-field-label" htmlFor={id}>
        {label}
        {required && <span className="modern-field-required">*</span>}
      </label>
      <div className={controlClass}>
        {icon && (
          <span className="modern-field-icon" aria-hidden="true">
            <FormIcon name={icon} />
          </span>
        )}
        {inputEl}
      </div>
      {error ? (
        <p className="modern-field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function ScholarshipForm() {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [phoneValues, setPhoneValues] = useState({})
  const fields = useMemo(() => SCHOLARSHIP_FIELDS, [])

  const sections = SECTION_OPTIONS.map((sec) => ({
    ...sec,
    fields: fields
      .filter((f) => f.section === sec.value)
      .sort((a, b) => a.order - b.order),
  })).filter((sec) => sec.fields.length > 0)

  const handlePhoneChange = (fieldId, patch) => {
    setPhoneValues((prev) => ({
      ...prev,
      [fieldId]: {
        country: DEFAULT_PHONE_COUNTRY,
        national: '',
        ...prev[fieldId],
        ...patch,
      },
    }))
    setErrors((prev) => {
      if (!prev[fieldId]) return prev
      const next = { ...prev }
      delete next[fieldId]
      return next
    })
  }

  const validateSingleField = (fieldId, form) => {
    const field = fields.find((item) => item.id === fieldId)
    if (!field) return

    const value = fieldId === 'consent'
      ? form?.querySelector('[name="consent"]')?.checked
      : form?.elements[fieldId]?.value

    const error = fieldId === 'consent'
      ? (value ? '' : 'You must agree to be contacted regarding your application')
      : validateDynamicField(field, value, phoneValues)

    setErrors((prev) => {
      const next = { ...prev }
      if (error) next[fieldId] = error
      else delete next[fieldId]
      return next
    })
  }

  const handleBlur = (fieldId) => {
    const form = document.getElementById('scholarship-application-form')
    validateSingleField(fieldId, form)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const consentChecked = form.elements.consent?.checked ?? false
    const nextErrors = validateScholarshipForm(fields, formData, phoneValues, consentChecked)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccess(false)
      const firstErrorId = Object.keys(nextErrors)[0]
      const firstEl = form.querySelector(`#${firstErrorId}, [name="${firstErrorId}"]`)
      firstEl?.focus?.()
      return
    }

    setSubmitting(true)
    setErrors({})

    const phoneState = phoneValues.phone
    const payload = {
      studentName: String(formData.get('studentName') ?? '').trim(),
      age: String(formData.get('age') ?? '').trim(),
      guardian: String(formData.get('guardian') ?? '').trim(),
      phone: formatPhoneE164(phoneState?.country, phoneState?.national)
        || String(formData.get('phone') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      education: String(formData.get('education') ?? '').trim(),
      destination: String(formData.get('destination') ?? '').trim(),
      income: String(formData.get('income') ?? '').trim(),
      reason: String(formData.get('reason') ?? '').trim(),
    }

    try {
      await submitApplication(payload)
      setSuccess(true)
      form.reset()
      setPhoneValues({})
    } catch (err) {
      setErrors({ _form: err.message || 'Submission failed. Please try again.' })
      setSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="modern-form-shell" aria-labelledby="scholarship-form-title">
      <header className="modern-form-header">
        <div className="modern-form-header-icon">
          <FormIcon name="scholarship" />
        </div>
        <div>
          <h2 id="scholarship-form-title">Scholarship Application</h2>
          <p>
            Apply for a scholarship to pursue education in India or abroad. Our team will
            contact you within 2–3 business days.
          </p>
        </div>
      </header>

      <form
        id="scholarship-application-form"
        onSubmit={handleSubmit}
        className="modern-form"
        noValidate
      >
        {sections.map((sec) => (
          <div className="modern-form-section" key={sec.value}>
            <h3 className="modern-form-section-title">
              <FormIcon name={sec.icon} />
              {sec.label}
            </h3>

            {groupIntoRows(sec.fields).map((row, ri) => (
              row.length === 2 ? (
                <div className="modern-form-row" key={ri}>
                  {row.map((f) => (
                    <DynamicField
                      key={f.id}
                      field={f}
                      error={errors[f.id]}
                      phoneState={phoneValues[f.id]}
                      onPhoneChange={handlePhoneChange}
                      onBlur={handleBlur}
                    />
                  ))}
                </div>
              ) : (
                <DynamicField
                  key={row[0].id}
                  field={row[0]}
                  error={errors[row[0].id]}
                  phoneState={phoneValues[row[0].id]}
                  onPhoneChange={handlePhoneChange}
                  onBlur={handleBlur}
                />
              )
            ))}
          </div>
        ))}

        <div className={`modern-form-check${errors.consent ? ' modern-form-check--error' : ''}`}>
          <span className="modern-form-check-icon" aria-hidden="true">
            <FormIcon name="check" />
          </span>
          <input
            type="checkbox"
            name="consent"
            id="consent"
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            onBlur={() => handleBlur('consent')}
            onChange={() => {
              if (errors.consent) {
                setErrors((prev) => {
                  const next = { ...prev }
                  delete next.consent
                  return next
                })
              }
            }}
          />
          <label htmlFor="consent">
            I agree to be contacted by IWSHA FOUNDATION regarding my application.
          </label>
        </div>
        {errors.consent ? (
          <p className="modern-field-error modern-field-error--check" id="consent-error" role="alert">
            {errors.consent}
          </p>
        ) : null}

        <div className="modern-form-actions">
          <button type="submit" className="modern-form-btn modern-form-btn--blue" disabled={submitting}>
            <FormIcon name="send" />
            {submitting ? 'Submitting…' : 'Submit Application'}
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
            Application submitted successfully. Our team will reach out soon.
          </p>
        )}
      </form>
    </section>
  )
}

function groupIntoRows(fields) {
  const rows = []
  let i = 0
  while (i < fields.length) {
    const cur = fields[i]
    const next = fields[i + 1]
    if (cur.halfWidth && next && next.halfWidth) {
      rows.push([cur, next])
      i += 2
    } else {
      rows.push([cur])
      i += 1
    }
  }
  return rows
}

export default ScholarshipForm
