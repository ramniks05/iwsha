import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import AdminLayout from './AdminLayout'

function RequireAdmin({ children }) {
  const { authed } = useAdminAuth()
  const location = useLocation()

  if (!authed) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return <AdminLayout>{children}</AdminLayout>
}

export default RequireAdmin
