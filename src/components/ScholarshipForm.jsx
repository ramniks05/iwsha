import { useState } from 'react'
import FormField from './FormField'
import FormIcon from './FormIcon'
import '../styles/forms.css'

const countries = [
  'Switzerland',
  'Italy',
  'Canada',
  'California',
  'Belgium',
  'Indian University',
]

function ScholarshipForm() {
  const [scholarshipSuccess, setScholarshipSuccess] = useState(false)

  const handleScholarshipSubmit = (event) => {
    event.preventDefault()
    setScholarshipSuccess(true)
    event.currentTarget.reset()
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

      <form onSubmit={handleScholarshipSubmit} className="modern-form">
        <div className="modern-form-section">
          <h3 className="modern-form-section-title">
            <FormIcon name="user" />
            Personal Details
          </h3>
          <div className="modern-form-row">
            <FormField label="Student Name" name="studentName" icon="user" placeholder="Full name" required />
            <FormField label="Age" name="age" icon="age" type="number" placeholder="17" required />
          </div>
          <div className="modern-form-row">
            <FormField label="Guardian Name" name="guardian" icon="users" placeholder="Parent / guardian" required />
            <FormField label="Phone" name="phone" icon="phone" type="tel" placeholder="+91 98765 43210" required />
          </div>
          <FormField label="Email" name="email" icon="mail" type="email" placeholder="you@email.com" required />
        </div>

        <div className="modern-form-section">
          <h3 className="modern-form-section-title">
            <FormIcon name="education" />
            Education Details
          </h3>
          <div className="modern-form-row">
            <FormField label="Education Level" name="education" icon="education" required>
              <select id="education" name="education" required defaultValue="">
                <option value="" disabled>Select level</option>
                <option value="10th">10th Standard</option>
                <option value="12th">12th Standard</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Post Graduate</option>
              </select>
            </FormField>
            <FormField label="Preferred Destination" name="destination" icon="globe" required>
              <select id="destination" name="destination" required defaultValue="">
                <option value="" disabled>Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Family Annual Income (INR)" name="income" icon="rupee" type="number" placeholder="250000" required />
        </div>

        <div className="modern-form-section">
          <h3 className="modern-form-section-title">
            <FormIcon name="message" />
            Support Request
          </h3>
          <FormField label="Why do you need support?" name="reason" icon="message" required>
            <textarea
              id="reason"
              name="reason"
              rows="4"
              required
              placeholder="Briefly describe your education goals..."
            />
          </FormField>
        </div>

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

        {scholarshipSuccess && (
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

export default ScholarshipForm
