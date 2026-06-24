import { Link } from 'react-router-dom'
import FormIcon from '../components/FormIcon'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'

function ScholarshipsPage() {
  return (
    <div className="scholarships-page">
      <section className="page-hero page-hero--short">
        <img src={images.graduation} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Scholarships &amp; Donations</h1>
          <p>{organization.shortDescription}</p>
        </div>
      </section>

      <div className="scholarships-hub-grid">
        <Link to="/scholarships/apply" className="scholarships-hub-card">
          <span className="scholarships-hub-card-icon" aria-hidden="true">
            <FormIcon name="scholarship" />
          </span>
          <h2>Apply for Scholarship</h2>
          <p>
            Submit your application for financial support to study in India or abroad.
            Our team reviews every request with care.
          </p>
          <span className="scholarships-hub-card-link">Start Application →</span>
        </Link>

        <Link to="/scholarships/donate" className="scholarships-hub-card scholarships-hub-card--donate">
          <span className="scholarships-hub-card-icon" aria-hidden="true">
            <FormIcon name="donate" />
          </span>
          <h2>Make a Donation</h2>
          <p>
            Support underserved students with a secure UPI donation. Every contribution
            helps open doors to education.
          </p>
          <span className="scholarships-hub-card-link">Donate Now →</span>
        </Link>

        <Link to="/faq" className="scholarships-hub-card scholarships-hub-card--faq">
          <span className="scholarships-hub-card-icon" aria-hidden="true">
            <FormIcon name="message" />
          </span>
          <h2>Sponsorship FAQ</h2>
          <p>
            Eligibility, application tips, funding coverage, and what sponsors look for
            in a strong application.
          </p>
          <span className="scholarships-hub-card-link">Read FAQ →</span>
        </Link>
      </div>
    </div>
  )
}

export default ScholarshipsPage
