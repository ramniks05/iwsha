import { useEffect, useState } from 'react'
import { getMessages, markMessageRead } from '../lib/api'

function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value.replace(' ', 'T'))
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

function AdminMessagesPage() {
  const [messages, setMessages] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const json = await getMessages()
      setMessages(json.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const displayed = messages.filter((m) => {
    if (filter === 'all') return true
    if (filter === 'new') return (m.status || 'new') === 'new'
    return m.type === filter
  })

  const newCount = messages.filter((m) => (m.status || 'new') === 'new').length

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-inner-page">
      <div className="admin-inner-header">
        <div>
          <h1>Messages</h1>
          <p>Contact and donation submissions in tabular view.</p>
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
            All ({messages.length})
          </button>
          <button type="button" className={`admin-filter-tab${filter === 'new' ? ' admin-filter-tab--active' : ''}`} onClick={() => setFilter('new')}>
            New ({newCount})
          </button>
          <button type="button" className={`admin-filter-tab${filter === 'contact' ? ' admin-filter-tab--active' : ''}`} onClick={() => setFilter('contact')}>
            Contact
          </button>
          <button type="button" className={`admin-filter-tab${filter === 'donation' ? ' admin-filter-tab--active' : ''}`} onClick={() => setFilter('donation')}>
            Donations
          </button>
        </div>

        {loading ? (
          <p>Loading messages…</p>
        ) : displayed.length === 0 ? (
          <div className="admin-table-empty">No messages yet.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitted</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject / Amount</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((msg) => {
                  const isNew = (msg.status || 'new') === 'new'
                  const status = isNew ? 'new' : (msg.status || 'read')
                  return (
                    <tr key={msg.id}>
                      <td className="admin-table-cell--nowrap">{formatDate(msg.submitted_at)}</td>
                      <td>
                        <span className="admin-custom-tag">{msg.type || '—'}</span>
                      </td>
                      <td><strong>{msg.name || '—'}</strong></td>
                      <td>{msg.email || '—'}</td>
                      <td className="admin-table-cell--nowrap">{msg.phone || '—'}</td>
                      <td>
                        {msg.type === 'donation' && msg.amount
                          ? `₹${Number(msg.amount).toLocaleString('en-IN')}`
                          : msg.subject || '—'}
                      </td>
                      <td className="admin-table-cell--reason" title={msg.message || ''}>
                        {msg.message || '—'}
                      </td>
                      <td>
                        <span className={`admin-status-badge admin-status-badge--${status}`}>
                          {status}
                        </span>
                      </td>
                      <td className="admin-table-cell--actions">
                        {isNew ? (
                          <button type="button" className="admin-view-btn" onClick={() => handleMarkRead(msg.id)}>
                            Mark read
                          </button>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminMessagesPage
