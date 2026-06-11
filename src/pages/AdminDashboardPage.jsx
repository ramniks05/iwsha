import { Link } from 'react-router-dom'
import { getFormConfig } from '../data/formConfig'
import { getUniversities } from '../data/universities'

function StatCard({ icon, label, value, to, color }) {
  return (
    <Link to={to} className={`admin-dash-card admin-dash-card--${color}`}>
      <span className="admin-dash-card-icon">{icon}</span>
      <strong>{value}</strong>
      <span>{label}</span>
      <span className="admin-dash-card-arrow">→</span>
    </Link>
  )
}

function AdminDashboardPage() {
  const unis = getUniversities()
  const fields = getFormConfig()
  const customUnis = unis.filter((u) => !u.isDefault && u.id?.startsWith('custom'))
  const activeFields = fields.filter((f) => f.enabled)

  const quickLinks = [
    { label: 'Add University', to: '/admin/universities', desc: 'Add a new university listing visible on the Programs page.' },
    { label: 'Build Scholarship Form', to: '/admin/form-builder', desc: 'Add, remove or reorder fields on the scholarship application form.' },
    { label: 'View Programs Page', to: '/programs', desc: 'See how universities appear to visitors.' },
    { label: 'Preview Scholarship Form', to: '/scholarships/apply', desc: 'Preview the live form as applicants see it.' },
  ]

  return (
    <div className="admin-dash-page">
      <div className="admin-header">
        <div className="admin-header-inner">
          <div>
            <span className="admin-badge">Admin Panel</span>
            <h1>Dashboard</h1>
            <p>Welcome back. Here's a quick overview of your site content.</p>
          </div>
        </div>
      </div>

      <div className="admin-body">
        {/* Stats */}
        <div className="admin-dash-stats">
          <StatCard
            icon="🎓"
            label="Universities Listed"
            value={unis.length}
            to="/admin/universities"
            color="blue"
          />
          <StatCard
            icon="✏️"
            label="Custom Universities"
            value={customUnis.length}
            to="/admin/universities"
            color="orange"
          />
          <StatCard
            icon="📋"
            label="Active Form Fields"
            value={activeFields.length}
            to="/admin/form-builder"
            color="green"
          />
          <StatCard
            icon="🔧"
            label="Total Form Fields"
            value={fields.length}
            to="/admin/form-builder"
            color="navy"
          />
        </div>

        {/* Quick links */}
        <div className="admin-list-card">
          <h2 className="admin-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/>
              <path d="M13 2v7h7" strokeLinecap="round"/>
            </svg>
            Quick Actions
          </h2>
          <div className="admin-dash-links">
            {quickLinks.map((lk) => (
              <Link key={lk.to} to={lk.to} className="admin-dash-link">
                <div>
                  <strong>{lk.label}</strong>
                  <p>{lk.desc}</p>
                </div>
                <span className="admin-dash-link-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="admin-dash-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
          </svg>
          <p>
            All changes are currently saved in your browser (localStorage).
            When your PHP backend is ready, replace the storage calls in{' '}
            <code>src/data/formConfig.js</code> and <code>src/data/universities.js</code>
            {' '}with API endpoints — the admin UI will work without any further changes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
