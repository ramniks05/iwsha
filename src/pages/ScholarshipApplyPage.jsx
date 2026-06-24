import { Link } from 'react-router-dom'
import ScholarshipForm from '../components/ScholarshipForm'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'

function ScholarshipApplyPage() {
  return (
    <div className="form-page">
      <section className="page-hero page-hero--short">
        <img src={images.graduation} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Apply for Scholarship</h1>
          <p>{organization.heroDescription}</p>
        </div>
      </section>

      <div className="form-page-body">
        <p className="form-page-faq-link">
          Have questions before applying?{' '}
          <Link to="/faq">Read our sponsorship FAQ</Link>
        </p>
        <ScholarshipForm />
      </div>
    </div>
  )
}

export default ScholarshipApplyPage
