import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplications, getMessages, getUniversities } from '../lib/api'

function StatCard({ icon, label, value, to, color, sub }) {
  return (
    <Link to={to} className={`admin-dash-card admin-dash-card--${color}`}>
      <span className="admin-dash-card-icon">{icon}</span>
      <strong>{value}</strong>
      <span>{label}{sub ? ` (${sub})` : ''}</span>
      <span className="admin-dash-card-arrow">→</span>
    </Link>
  )
}

function AdminDashboardPage() {
  const [stats, setStats] = useState({ universities: 0, custom: 0, applications: 0, newApps: 0, messages: 0, newMsgs: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getUniversities(), getApplications(), getMessages()])
      .then(([uniRes, appRes, msgRes]) => {
        const unis = uniRes.data || []
        const apps = appRes.data || []
        const msgs = msgRes.data || []
        setStats({
          universities: unis.length,
          custom: unis.filter((u) => !u.isDefault).length,
          applications: apps.length,
          newApps: apps.filter((a) => (a.status || 'new') === 'new').length,
          messages: msgs.length,
          newMsgs: msgs.filter((m) => (m.status || 'new') === 'new').length,
        })
      })
      .catch((err) => setError(err.message || 'Failed to load data from backend.'))
      .finally(() => setLoading(false))
  }, [])

  const quickLinks = [
    { label: 'Manage Universities', to: '/admin/universities', desc: 'Add or remove university listings visible on the Programs page.' },
    { label: 'View Applications', to: '/admin/applications', desc: 'Review scholarship applications submitted by students.' },
    { label: 'View Messages', to: '/admin/messages', desc: 'Read contact and donation submissions from the public site.' },
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
        {error && (
          <div className="admin-dash-note" style={{ marginBottom: '1rem', background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
            {error}
          </div>
        )}
        <div className="admin-dash-stats">
          <StatCard icon="🎓" label="Universities Listed" value={loading ? '…' : stats.universities} to="/admin/universities" color="blue" />
          <StatCard icon="✏️" label="Custom Universities" value={loading ? '…' : stats.custom} to="/admin/universities" color="orange" />
          <StatCard icon="📩" label="Applications" value={loading ? '…' : stats.applications} sub={loading ? null : `${stats.newApps} new`} to="/admin/applications" color="green" />
          <StatCard icon="💬" label="Messages" value={loading ? '…' : stats.messages} sub={loading ? null : `${stats.newMsgs} new`} to="/admin/messages" color="navy" />
        </div>

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
      </div>
    </div>
  )
}

export default AdminDashboardPage
