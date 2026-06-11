import { useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultUniversities, deleteUniversity, getUniversities, saveUniversity } from '../data/universities'

const EMPTY_FORM = {
  name: '', shortName: '', location: '', country: '', countryCode: '',
  image: '', tagline: '', overview: '',
  programs: '', requirements: '', highlights: '',
  fees: '', deadline: '', website: '',
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState(getUniversities)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const customIds = new Set(
    (() => {
      try {
        const stored = localStorage.getItem('iwsha_universities')
        return stored ? JSON.parse(stored).map((u) => u.id) : []
      } catch { return [] }
    })()
  )

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: '' }))
    setSaved(false)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'University name is required'
    if (!form.location.trim()) e.location = 'Location is required'
    if (!form.country.trim()) e.country = 'Country is required'
    if (!form.overview.trim()) e.overview = 'Overview is required'
    if (!form.programs.trim()) e.programs = 'Add at least one program'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const slug = slugify(form.name)
    const newUni = {
      id: `custom-${slug}-${Date.now()}`,
      slug,
      name: form.name.trim(),
      shortName: form.shortName.trim() || form.name.trim(),
      location: form.location.trim(),
      country: form.country.trim(),
      countryCode: form.countryCode.trim().toUpperCase() || '??',
      image: form.image.trim() || '/images/university-global.png',
      tagline: form.tagline.trim(),
      overview: form.overview.trim(),
      programs: form.programs.split('\n').map((p) => p.trim()).filter(Boolean),
      requirements: form.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
      highlights: form.highlights
        ? form.highlights.split('\n').map((h) => {
            const [icon, label, value] = h.split('|').map((s) => s.trim())
            return { icon: icon || '📚', label: label || '', value: value || '' }
          }).filter((h) => h.label)
        : [],
      fees: form.fees.trim(),
      deadline: form.deadline.trim(),
      website: form.website.trim(),
      applyLink: '/scholarships/apply',
    }

    saveUniversity(newUni)
    setUniversities(getUniversities())
    setForm(EMPTY_FORM)
    setSaved(true)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Remove this university?')) return
    deleteUniversity(id)
    setUniversities(getUniversities())
  }

  return (
    <div className="admin-inner-page">
      <div className="admin-inner-header">
        <div>
          <h1>Manage Universities</h1>
          <p>Add, preview and remove university listings. Changes are saved in your browser.</p>
        </div>
        <Link to="/programs" className="admin-back-btn" target="_blank" rel="noreferrer">
          View Programs Page ↗
        </Link>
      </div>

      <div className="admin-body">
        {/* Add form */}
        <section className="admin-form-card">
          <h2 className="admin-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" strokeLinecap="round"/></svg>
            Add New University
          </h2>

          <form onSubmit={handleSubmit} className="admin-form" noValidate>
            <div className="admin-form-grid">
              <div className="admin-field">
                <label htmlFor="name">University Name *</label>
                <input id="name" name="name" placeholder="e.g. Harvard University" value={form.name} onChange={handleChange} />
                {errors.name && <span className="admin-error">{errors.name}</span>}
              </div>
              <div className="admin-field">
                <label htmlFor="shortName">Short Name</label>
                <input id="shortName" name="shortName" placeholder="e.g. Harvard" value={form.shortName} onChange={handleChange} />
              </div>
              <div className="admin-field">
                <label htmlFor="country">Country *</label>
                <input id="country" name="country" placeholder="e.g. United States" value={form.country} onChange={handleChange} />
                {errors.country && <span className="admin-error">{errors.country}</span>}
              </div>
              <div className="admin-field">
                <label htmlFor="countryCode">Country Code</label>
                <input id="countryCode" name="countryCode" placeholder="e.g. US" maxLength={4} value={form.countryCode} onChange={handleChange} />
              </div>
              <div className="admin-field admin-field--full">
                <label htmlFor="location">Location *</label>
                <input id="location" name="location" placeholder="e.g. Cambridge, Massachusetts, USA" value={form.location} onChange={handleChange} />
                {errors.location && <span className="admin-error">{errors.location}</span>}
              </div>
              <div className="admin-field admin-field--full">
                <label htmlFor="tagline">Tagline</label>
                <input id="tagline" name="tagline" placeholder="One-line summary shown on the card" value={form.tagline} onChange={handleChange} />
              </div>
              <div className="admin-field admin-field--full">
                <label htmlFor="image">Image URL</label>
                <input id="image" name="image" placeholder="/images/university-global.png (or full URL)" value={form.image} onChange={handleChange} />
              </div>
            </div>

            <div className="admin-field">
              <label htmlFor="overview">Overview * <span className="admin-field-hint">2–4 sentences about the university</span></label>
              <textarea id="overview" name="overview" rows={4} placeholder="Describe the university and IWSHA's partnership..." value={form.overview} onChange={handleChange} />
              {errors.overview && <span className="admin-error">{errors.overview}</span>}
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label htmlFor="programs">Programs * <span className="admin-field-hint">One per line</span></label>
                <textarea id="programs" name="programs" rows={5} placeholder={"BSc Computer Science\nMSc Data Science\nMBA"} value={form.programs} onChange={handleChange} />
                {errors.programs && <span className="admin-error">{errors.programs}</span>}
              </div>
              <div className="admin-field">
                <label htmlFor="requirements">Requirements <span className="admin-field-hint">One per line</span></label>
                <textarea id="requirements" name="requirements" rows={5} placeholder={"85% in 12th standard\nIELTS 7.0+\nStatement of Purpose"} value={form.requirements} onChange={handleChange} />
              </div>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label htmlFor="fees">Fees &amp; Aid</label>
                <input id="fees" name="fees" placeholder="e.g. USD 14,000/year — IWSHA aid available" value={form.fees} onChange={handleChange} />
              </div>
              <div className="admin-field">
                <label htmlFor="deadline">Application Deadline</label>
                <input id="deadline" name="deadline" placeholder="e.g. January 15" value={form.deadline} onChange={handleChange} />
              </div>
              <div className="admin-field admin-field--full">
                <label htmlFor="website">Website URL</label>
                <input id="website" name="website" placeholder="https://..." value={form.website} onChange={handleChange} />
              </div>
            </div>

            <div className="admin-field">
              <label htmlFor="highlights">
                Highlights <span className="admin-field-hint">One per line — format: emoji | Label | Value</span>
              </label>
              <textarea id="highlights" name="highlights" rows={4} placeholder={"🏆 | World Rank | Top 50\n📚 | Programs | 30+ Tracks\n💰 | IWSHA Aid | Up to ₹5L\n🕐 | Duration | 4 Years"} value={form.highlights} onChange={handleChange} />
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-submit-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Save University
              </button>
              {saved && (
                <span className="admin-saved-msg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  University saved successfully!
                </span>
              )}
            </div>
          </form>
        </section>

        {/* Listing */}
        <section className="admin-list-card">
          <h2 className="admin-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h4" strokeLinecap="round"/></svg>
            All Universities ({universities.length})
          </h2>

          <div className="admin-uni-list">
            {universities.map((uni) => {
              const isCustom = customIds.has(uni.id)
              return (
                <div className="admin-uni-row" key={uni.id}>
                  <img src={uni.image} alt={uni.name} className="admin-uni-thumb" />
                  <div className="admin-uni-info">
                    <div className="admin-uni-name">
                      {uni.name}
                      {isCustom && <span className="admin-custom-tag">Custom</span>}
                    </div>
                    <span className="admin-uni-location">{uni.location}</span>
                  </div>
                  <div className="admin-uni-actions">
                    <Link to={`/universities/${uni.slug}`} className="admin-view-btn" target="_blank" rel="noreferrer">
                      View Page
                    </Link>
                    {isCustom && (
                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={() => handleDelete(uni.id)}
                        aria-label={`Delete ${uni.name}`}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminUniversitiesPage
