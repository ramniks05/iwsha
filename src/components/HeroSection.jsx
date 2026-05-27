import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { images, trustStats } from '../data/images'
import { organization } from '../data/siteConfig'

const visitorStorageKey = 'scholarship_visitor_count'
const visitorSessionKey = 'scholarship_visitor_session_counted'

const trustBadges = [
  { icon: '✓', label: 'Registered Trust', sub: organization.regNo },
  { icon: '🛡', label: 'Welfare Focused', sub: '100% for students' },
  { icon: '🌍', label: 'Global Reach', sub: '5+ countries' },
]

function HeroSection() {
  const [visitors, setVisitors] = useState(0)

  useEffect(() => {
    const storedCount = Number(localStorage.getItem(visitorStorageKey) || '1820')
    const alreadyCounted = sessionStorage.getItem(visitorSessionKey) === 'yes'
    const nextCount = alreadyCounted ? storedCount : storedCount + 1

    if (!alreadyCounted) {
      localStorage.setItem(visitorStorageKey, String(nextCount))
      sessionStorage.setItem(visitorSessionKey, 'yes')
    }

    setVisitors(nextCount)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-premium" aria-label="Hero">
      <div className="hero-premium-bg" aria-hidden="true">
        <div className="hero-premium-gradient" />
        <div className="hero-premium-mesh" />
        <div className="hero-premium-grid" />
        <span className="hero-orb hero-orb--1" />
        <span className="hero-orb hero-orb--2" />
        <span className="hero-orb hero-orb--3" />
      </div>

      <div className="hero-premium-inner">
        <div className="hero-premium-content">
          <span className="hero-premium-eyebrow">
            <span className="hero-premium-dot" aria-hidden="true" />
            {organization.societyName}
          </span>

          <h1 className="hero-premium-headline">
            Opening doors to
            <span className="hero-premium-gradient-text"> global &amp; Indian </span>
            universities
          </h1>

          <p className="hero-premium-sub">{organization.heroDescription}</p>

          <div className="hero-premium-cta">
            <Link to="/scholarships/apply" className="btn btn-premium btn-premium--primary">
              Apply for Scholarship
            </Link>
            <Link to="/scholarships/donate" className="btn btn-premium btn-premium--secondary">
              Donate Now
            </Link>
          </div>

          <Link to="/programs" className="hero-premium-link">
            Explore Programs
            <span aria-hidden="true">→</span>
          </Link>

          <div className="hero-trust-badges">
            {trustBadges.map((badge) => (
              <div className="hero-trust-badge" key={badge.label}>
                <span className="hero-trust-badge-icon">{badge.icon}</span>
                <div>
                  <strong>{badge.label}</strong>
                  <span>{badge.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-premium-visual">
          <div className="hero-3d-stage">
            <div className="hero-3d-ring hero-3d-ring--outer" aria-hidden="true" />
            <div className="hero-3d-ring hero-3d-ring--inner" aria-hidden="true" />

            <div className="hero-glass-frame">
              <div className="hero-glass-frame-inner">
                <img src={images.hero} alt="Students at international university campus" />
                <div className="hero-glass-shine" aria-hidden="true" />
              </div>
            </div>

            <div className="hero-float hero-float--stats hero-glass-card">
              <span className="hero-float-icon" aria-hidden="true">🎓</span>
              <div>
                <strong>500+</strong>
                <span>Students Guided</span>
              </div>
            </div>

            <div className="hero-float hero-float--countries hero-glass-card">
              <span className="hero-float-icon" aria-hidden="true">🌍</span>
              <div>
                <strong>5+</strong>
                <span>Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats-panel hero-glass-card">
        <div className="hero-stat hero-stat--highlight">
          <strong>{visitors.toLocaleString()}</strong>
          <span>Website Visitors</span>
        </div>
        {trustStats.map((item) => (
          <div className="hero-stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <button type="button" className="hero-scroll-indicator" onClick={scrollToAbout} aria-label="Scroll to content">
        <span className="hero-scroll-mouse">
          <span className="hero-scroll-wheel" />
        </span>
        <span className="hero-scroll-label">Scroll</span>
      </button>
    </section>
  )
}

export default HeroSection
