import { Link, useParams } from 'react-router-dom'
import { useUniversities } from '../hooks/useUniversities'

function UniversityDetailPage() {
  const { slug } = useParams()
  const { universities, loading } = useUniversities()
  const uni = universities.find((u) => u.slug === slug)

  if (loading) {
    return (
      <div className="uni-detail-notfound">
        <div className="uni-detail-notfound-inner">
          <p>Loading university…</p>
        </div>
      </div>
    )
  }

  if (!uni) {
    return (
      <div className="uni-detail-notfound">
        <div className="uni-detail-notfound-inner">
          <span className="uni-detail-notfound-icon">🎓</span>
          <h2>University Not Found</h2>
          <p>The university you are looking for does not exist or has been removed.</p>
          <Link to="/programs" className="btn btn-primary">← Back to Programs</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="uni-detail-page">
      <div className="uni-detail-hero">
        <img src={uni.image} alt={uni.name} className="uni-detail-hero-img" />
        <div className="uni-detail-hero-overlay" />
        <div className="uni-detail-hero-content">
          <Link to="/programs" className="uni-detail-back">
            ← Back to Programs
          </Link>
          <span className="uni-detail-country-badge">{uni.countryCode} · {uni.country}</span>
          <h1>{uni.name}</h1>
          <p className="uni-detail-tagline">{uni.tagline}</p>
        </div>
      </div>

      <div className="uni-detail-body">
        <div className="uni-detail-highlights">
          {uni.highlights.map((h) => (
            <div className="uni-detail-highlight" key={h.label}>
              <span className="uni-detail-highlight-icon">{h.icon}</span>
              <strong>{h.value}</strong>
              <span>{h.label}</span>
            </div>
          ))}
        </div>

        <div className="uni-detail-grid">
          <div className="uni-detail-main">
            <section className="uni-detail-section">
              <h2 className="uni-detail-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2" strokeLinecap="round"/></svg>
                Overview
              </h2>
              <p className="uni-detail-overview">{uni.overview}</p>
            </section>

            <section className="uni-detail-section">
              <h2 className="uni-detail-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 3L2 8l10 5 10-5-10-5z" strokeLinejoin="round"/><path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Available Programs
              </h2>
              <ul className="uni-detail-programs">
                {uni.programs.map((p) => (
                  <li key={p}>
                    <span className="uni-detail-program-dot" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            <section className="uni-detail-section">
              <h2 className="uni-detail-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Admission Requirements
              </h2>
              <ul className="uni-detail-requirements">
                {uni.requirements.map((r) => (
                  <li key={r}>
                    <svg className="uni-detail-req-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="uni-detail-sidebar">
            <div className="uni-detail-info-card">
              <h3>Key Information</h3>

              <div className="uni-detail-info-row">
                <span className="uni-detail-info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  Location
                </span>
                <span>{uni.location}</span>
              </div>

              <div className="uni-detail-info-row">
                <span className="uni-detail-info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Application Deadline
                </span>
                <span>{uni.deadline}</span>
              </div>

              <div className="uni-detail-info-row">
                <span className="uni-detail-info-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Fees &amp; Aid
                </span>
                <span>{uni.fees}</span>
              </div>

              {uni.website && uni.website.startsWith('http') && (
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noreferrer"
                  className="uni-detail-website-btn"
                >
                  Visit Official Website →
                </a>
              )}
            </div>

            <div className="uni-detail-apply-card">
              <span className="uni-detail-apply-icon" aria-hidden="true">🎓</span>
              <h3>Ready to Apply?</h3>
              <p>IWSHA Foundation will guide you through every step — from documents to visa.</p>
              <Link to={uni.applyLink || '/scholarships/apply'} className="uni-detail-apply-btn">
                Apply for Scholarship
              </Link>
              <Link to="/contact" className="uni-detail-contact-btn">
                Talk to a Counselor
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default UniversityDetailPage
