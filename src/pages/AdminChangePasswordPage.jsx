import { useState } from 'react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { changePassword } from '../lib/api'

function AdminChangePasswordPage() {
  const { user } = useAdminAuth()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: '' }))
    setSuccess('')
  }

  const validate = () => {
    const e = {}
    if (!form.currentPassword) e.currentPassword = 'Current password is required'
    if (!form.newPassword) {
      e.newPassword = 'New password is required'
    } else if (form.newPassword.length < 6) {
      e.newPassword = 'Password must be at least 6 characters'
    }
    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your new password'
    } else if (form.newPassword !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match'
    }
    if (form.currentPassword && form.newPassword && form.currentPassword === form.newPassword) {
      e.newPassword = 'New password must be different from current password'
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    setErrors({})
    setSuccess('')

    try {
      const json = await changePassword(
        form.currentPassword,
        form.newPassword,
        form.confirmPassword,
      )
      setSuccess(json.data?.message || 'Password updated successfully.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setErrors({ _form: err.message || 'Failed to update password.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-inner-page">
      <div className="admin-inner-header">
        <div>
          <h1>Change Password</h1>
          <p>
            Update your admin account password
            {user?.username ? ` for ${user.username}` : ''}.
          </p>
        </div>
      </div>

      <div className="admin-body">
        <section className="admin-form-card" style={{ maxWidth: 480 }}>
          <form onSubmit={handleSubmit} className="admin-form" noValidate>
            <div className="admin-field">
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                value={form.currentPassword}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.currentPassword && <span className="admin-error">{errors.currentPassword}</span>}
            </div>

            <div className="admin-field">
              <label htmlFor="newPassword">New Password *</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={form.newPassword}
                onChange={handleChange}
                disabled={submitting}
              />
              <span className="admin-field-hint">Minimum 6 characters</span>
              {errors.newPassword && <span className="admin-error">{errors.newPassword}</span>}
            </div>

            <div className="admin-field">
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.confirmPassword && <span className="admin-error">{errors.confirmPassword}</span>}
            </div>

            {errors._form && (
              <div className="admin-dash-note" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
                {errors._form}
              </div>
            )}

            {success && (
              <div className="admin-dash-note" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
                {success}
              </div>
            )}

            <div className="admin-form-actions">
              <button type="submit" className="admin-submit-btn" disabled={submitting}>
                {submitting ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default AdminChangePasswordPage
