import { Link } from 'react-router-dom'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'
import { overseasDestinations, testimonials, universityPartners } from '../data/siteData'

function ProgramsPage() {
  return (
    <div className="programs-page">
      <section className="page-hero">
        <img src={images.university} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Programs &amp; Universities</h1>
          <p>{organization.programsDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="section-label">Destinations</span>
          <h2>Overseas Education Countries</h2>
        </div>
        <div className="country-grid">
          {overseasDestinations.map((item) => (
            <article className="country-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="country-card-body">
                <span className="country-code">{item.code}</span>
                <h3>{item.name}</h3>
                <p>{item.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="section-head">
          <span className="section-label">Partners</span>
          <h2>University Details</h2>
        </div>
        <div className="uni-grid">
          {universityPartners.map((item) => (
            <article className="uni-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="uni-card-body">
                <span className="uni-location">{item.location}</span>
                <h3>{item.name}</h3>
                <p>{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="section-label">Stories</span>
          <h2>Testimonials of Children</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <blockquote className="testimonial-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <p>"{item.text}"</p>
              <cite>— {item.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section-cta-inline">
        <p>Need scholarship or admission help?</p>
        <Link to="/scholarships/apply" className="btn btn-primary">
          Apply for Scholarship
        </Link>
      </section>
    </div>
  )
}

export default ProgramsPage
