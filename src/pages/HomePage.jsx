import { Link } from 'react-router-dom'
import AboutSection from '../components/AboutSection'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import WaveDivider from '../components/WaveDivider'
import { images } from '../data/images'
import { overseasDestinations, testimonials } from '../data/siteData'

function HomePage() {
  return (
    <div className="home">
      <HeroSection />

      <AboutSection />

      {/* Study Abroad */}
      <section className="section">
        <div className="section-head">
          <span className="section-label">Study Abroad</span>
          <h2>Countries We Support</h2>
          <p>Overseas education pathways tailored for every student’s ambition.</p>
        </div>
        <div className="country-grid">
          {overseasDestinations.map((country) => (
            <article className="country-card" key={country.name}>
              <img src={country.image} alt={country.name} />
              <div className="country-card-body">
                <span className="country-code">{country.code}</span>
                <h3>{country.name}</h3>
                <p>{country.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ServicesSection />

      <WaveDivider />

      {/* Feature image + universities teaser */}
      <section className="section feature-split feature-split--after-wave">
        <div className="feature-text">
          <span className="section-label">Universities</span>
          <h2>Partner Institutions &amp; Indian Universities</h2>
          <p>
            We connect students with leading global universities and provide
            dedicated assistance for admissions to prestigious Indian institutions.
          </p>
          <ul className="feature-list">
            <li>Admission &amp; scholarship counseling</li>
            <li>Document &amp; visa preparation</li>
            <li>Indian university fee support programs</li>
          </ul>
          <Link to="/programs" className="btn btn-primary">View All Universities</Link>
        </div>
        <div className="feature-images">
          <img src={images.university} alt="Global university campus" className="feature-img-main" />
          <img src={images.library} alt="Students studying in library" className="feature-img-sub" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="section-head">
          <span className="section-label">Success Stories</span>
          <h2>What Our Students Say</h2>
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

      {/* CTA */}
      <section className="cta-section">
        <img src={images.graduation} alt="" className="cta-bg" aria-hidden="true" />
        <div className="cta-overlay" />
        <div className="cta-content">
          <h2>Ready to Start Your Education Journey?</h2>
          <p>Apply for a scholarship or donate to support underserved yet ambitious students.</p>
          <div className="hero-btns">
            <Link to="/scholarships/apply" className="btn btn-primary">Apply Now</Link>
            <Link to="/scholarships/donate" className="btn btn-accent">Donate</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
