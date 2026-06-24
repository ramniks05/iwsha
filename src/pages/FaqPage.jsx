import { Link } from 'react-router-dom'
import FaqSection from '../components/FaqSection'
import { images } from '../data/images'

function FaqPage() {
  return (
    <div className="faq-page">
      <section className="page-hero page-hero--short">
        <img src={images.library} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>
            Everything you need to know about sponsorship eligibility, applications,
            funding coverage, and how to stand out.
          </p>
        </div>
      </section>

      <div className="faq-page-body">
        <FaqSection />

        <section className="faq-page-cta" aria-labelledby="faq-cta-heading">
          <h2 id="faq-cta-heading">Still have questions?</h2>
          <p>
            Our team is happy to guide you through the application process or help you
            understand what sponsorship covers.
          </p>
          <div className="faq-page-cta-btns">
            <Link to="/scholarships/apply" className="btn btn-primary">Apply for Scholarship</Link>
            <Link to="/contact" className="btn btn-accent">Contact Us</Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FaqPage
