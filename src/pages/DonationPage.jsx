import DonationForm from '../components/DonationForm'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'

function DonationPage() {
  return (
    <div className="form-page">
      <section className="page-hero page-hero--short">
        <img src={images.welfare} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Donate to IWSHA</h1>
          <p>{organization.footerMission}</p>
        </div>
      </section>

      <div className="form-page-body form-page-body--wide">
        <DonationForm />
      </div>
    </div>
  )
}

export default DonationPage
