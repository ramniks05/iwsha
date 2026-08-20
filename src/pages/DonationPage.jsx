import DonationForm from '../components/DonationForm'
import { images } from '../data/images'

function DonationPage() {
  return (
    <div className="form-page">
      <section className="page-hero page-hero--short">
        <img src={images.welfare} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>IWSHA Registration</h1>
          <p>
            Register with IWSHA to begin your journey toward scholarships and education
            support. Pay the one-time registration fee and submit your details to complete
            enrollment.
          </p>
        </div>
      </section>

      <div className="form-page-body form-page-body--wide">
        <DonationForm />
      </div>
    </div>
  )
}

export default DonationPage
