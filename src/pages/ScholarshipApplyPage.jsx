import ScholarshipForm from '../components/ScholarshipForm'
import { useFaqChat } from '../context/FaqChatContext'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'

function ScholarshipApplyPage() {
  const { openFaqChat } = useFaqChat()

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
          <button type="button" className="form-page-faq-btn" onClick={openFaqChat}>
            Ask our FAQ assistant
          </button>
        </p>
        <ScholarshipForm />
      </div>
    </div>
  )
}

export default ScholarshipApplyPage
