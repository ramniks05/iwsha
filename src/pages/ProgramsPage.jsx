import { Link } from 'react-router-dom'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'
import { overseasDestinations, testimonials } from '../data/siteData'
import { useUniversities } from '../hooks/useUniversities'

function ProgramsPage() {
  const { universities, loading, error } = useUniversities()
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
          <p style={{ marginTop: '0.35rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
            Click any card to view full details, programs, and how to apply.
          </p>
        </div>
        <div className="uni-grid">
          {loading ? (
            <p style={{ gridColumn: '1 / -1', color: 'var(--muted)' }}>Loading universities from backend…</p>
          ) : error ? (
            <p style={{ gridColumn: '1 / -1', color: '#b91c1c' }}>
              {error} — ensure XAMPP is running and schloarship-backend is available.
            </p>
          ) : universities.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', color: 'var(--muted)' }}>No universities found in database.</p>
          ) : (
            universities.map((item) => (
              <Link
                to={`/universities/${item.slug}`}
                className="uni-card uni-card--link"
                key={item.id || item.name}
              >
                <img src={item.image} alt={item.name} />
                <div className="uni-card-body">
                  <span className="uni-location">{item.location}</span>
                  <h3>{item.name}</h3>
                  <p>{item.tagline || item.details}</p>
                  <span className="uni-card-cta">View Details →</span>
                </div>
              </Link>
            ))
          )}
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
