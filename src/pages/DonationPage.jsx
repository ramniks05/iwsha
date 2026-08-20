import DonationForm from '../components/DonationForm'
import { images } from '../data/images'
import { registrationFee } from '../data/paymentConfig'
import { contactInfo, organization } from '../data/siteConfig'

const registrationSteps = [
  { title: 'Your details', text: 'Name, email & mobile' },
  { title: 'Pay ₹500', text: 'Scan the UPI QR code' },
  { title: 'Submit', text: 'Add transaction ID' },
]

function DonationPage() {
  return (
    <div className="form-page form-page--landing">
      <section className="page-hero page-hero--short page-hero--landing">
        <img src={images.welfare} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="registration-hero-badge">
            One-time fee · ₹{registrationFee.toLocaleString('en-IN')}
          </span>
          <h1>Register with IWSHA</h1>
          <p className="registration-hero-lead">
            Scholarship and education support — complete registration in 3 steps.
          </p>
          <ul className="registration-trust" aria-label="Trust and contact information">
            <li>{organization.regNo}</li>
            <li>
              <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
          </ul>
        </div>
      </section>

      <ol className="registration-steps" aria-label="Registration steps">
        {registrationSteps.map(({ title, text }, index) => (
          <li key={title} className="registration-step">
            <span className="registration-step-num">{index + 1}</span>
            <strong>{title}</strong>
            <span className="registration-step-text">{text}</span>
          </li>
        ))}
      </ol>

      <div className="form-page-body form-page-body--wide">
        <DonationForm />
      </div>
    </div>
  )
}

export default DonationPage
