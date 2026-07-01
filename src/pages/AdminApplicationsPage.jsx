import { useEffect, useState } from 'react'
import { deleteApplication, getApplications, updateApplication } from '../lib/api'

const STATUSES = ['new', 'reviewed', 'approved', 'rejected']

const COLUMNS = [
  { key: 'submitted_at', label: 'Submitted' },
  { key: 'studentName', label: 'Student Name' },
  { key: 'age', label: 'Age' },
  { key: 'guardian', label: 'Guardian' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'education', label: 'Education' },
  { key: 'destination', label: 'Destination' },
  { key: 'income', label: 'Income (INR)' },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]

function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value.replace(' ', 'T'))
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

function formatIncome(value) {
  if (value === null || value === undefined || value === '') return '—'
  const num = Number(value)
  return Number.isFinite(num) ? `₹${num.toLocaleString('en-IN')}` : value
}

function AdminApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const json = await getApplications()
      setApplications(json.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load applications.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const displayed = applications.filter((a) => filter === 'all' || (a.status || 'new') === filter)
  const newCount = applications.filter((a) => (a.status || 'new') === 'new').length

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplication(id, status)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application permanently?')) return
    try {
      await deleteApplication(id)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-inner-page">
      <div className="admin-inner-header">
        <div>
          <h1>Scholarship Applications</h1>
          <p>All submitted applications in tabular view.</p>
        </div>
      </div>

      <div className="admin-body">
        {error && (
          <div className="admin-dash-note" style={{ marginBottom: '1rem', background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
            {error}
          </div>
        )}

        <div className="admin-filter-tabs">
          <button type="button" className={`admin-filter-tab${filter === 'all' ? ' admin-filter-tab--active' : ''}`} onClick={() => setFilter('all')}>
            All ({applications.length})
          </button>
          <button type="button" className={`admin-filter-tab${filter === 'new' ? ' admin-filter-tab--active' : ''}`} onClick={() => setFilter('new')}>
            New ({newCount})
          </button>
        </div>

        {loading ? (
          <p>Loading applications…</p>
        ) : displayed.length === 0 ? (
          <div className="admin-table-empty">No applications yet.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {COLUMNS.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((app) => (
                  <tr key={app.id}>
                    <td className="admin-table-cell--nowrap">{formatDate(app.submitted_at)}</td>
                    <td><strong>{app.studentName || '—'}</strong></td>
                    <td>{app.age ?? '—'}</td>
                    <td>{app.guardian || '—'}</td>
                    <td className="admin-table-cell--nowrap">{app.phone || '—'}</td>
                    <td>{app.email || '—'}</td>
                    <td>{app.education || '—'}</td>
                    <td>{app.destination || '—'}</td>
                    <td className="admin-table-cell--nowrap">{formatIncome(app.income)}</td>
                    <td className="admin-table-cell--reason" title={app.reason || ''}>
                      {app.reason || '—'}
                    </td>
                    <td>
                      <select
                        className="admin-table-select"
                        value={app.status || 'new'}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        aria-label={`Status for ${app.studentName}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="admin-table-cell--actions">
                      <button type="button" className="admin-delete-btn" onClick={() => handleDelete(app.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminApplicationsPage
