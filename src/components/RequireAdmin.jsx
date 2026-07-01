import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import AdminLayout from './AdminLayout'

function RequireAdmin({ children }) {
  const { authed, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card" style={{ textAlign: 'center' }}>
          <span className="admin-login-spinner" aria-hidden="true" />
          <p className="admin-login-sub" style={{ marginTop: '1rem' }}>Checking session…</p>
        </div>
      </div>
    )
  }

  if (!authed) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return <AdminLayout>{children}</AdminLayout>
}

export default RequireAdmin
