import { useState } from 'react'
import FormIcon from './FormIcon'
import { SECTION_OPTIONS, getFormConfig } from '../data/formConfig'
import '../styles/forms.css'

function DynamicField({ field }) {
  const { id, label, type, icon, placeholder, required, options } = field

  const inputEl = type === 'select' ? (
    <select id={id} name={id} required={required} defaultValue="">
      <option value="" disabled>{placeholder || `Select ${label}`}</option>
      {(options || []).map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  ) : type === 'textarea' ? (
    <textarea id={id} name={id} rows={4} required={required} placeholder={placeholder} />
  ) : (
    <input id={id} name={id} type={type} required={required} placeholder={placeholder} />
  )

  return (
    <label className="modern-field" htmlFor={id}>
      <span className="modern-field-label">
        {label}
        {required && <span className="modern-field-required">*</span>}
      </span>
      <div className={`modern-field-control${icon ? ' modern-field-control--icon' : ''}`}>
        {icon && (
          <span className="modern-field-icon" aria-hidden="true">
            <FormIcon name={icon} />
          </span>
        )}
        {inputEl}
      </div>
    </label>
  )
}

function ScholarshipForm() {
  const [success, setSuccess] = useState(false)
  const fields = getFormConfig().filter((f) => f.enabled)

  // Group enabled fields by section, preserving order
  const sections = SECTION_OPTIONS.map((sec) => ({
    ...sec,
    fields: fields
      .filter((f) => f.section === sec.value)
      .sort((a, b) => a.order - b.order),
  })).filter((sec) => sec.fields.length > 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    e.currentTarget.reset()
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

      <form onSubmit={handleSubmit} className="modern-form">
        {sections.map((sec) => (
          <div className="modern-form-section" key={sec.value}>
            <h3 className="modern-form-section-title">
              <FormIcon name={sec.icon} />
              {sec.label}
            </h3>

            {/* Pair up halfWidth fields into rows of 2, full-width fields solo */}
            {groupIntoRows(sec.fields).map((row, ri) => (
              row.length === 2 ? (
                <div className="modern-form-row" key={ri}>
                  {row.map((f) => <DynamicField key={f.id} field={f} />)}
                </div>
              ) : (
                <DynamicField key={row[0].id} field={row[0]} />
              )
            ))}
          </div>
        ))}

        <label className="modern-form-check">
          <span className="modern-form-check-icon" aria-hidden="true">
            <FormIcon name="check" />
          </span>
          <input type="checkbox" required />
          <span>I agree to be contacted by IWSHA FOUNDATION regarding my application.</span>
        </label>

        <div className="modern-form-actions">
          <button type="submit" className="modern-form-btn modern-form-btn--blue">
            <FormIcon name="send" />
            Submit Application
          </button>
        </div>

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

/** Group fields: consecutive halfWidth pairs share a row; others are solo */
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
