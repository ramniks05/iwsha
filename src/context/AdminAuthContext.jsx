import { createContext, useCallback, useContext, useState } from 'react'

// ── Dummy credentials (swap this function for a real API call later) ──
// PHP integration: replace verifyCredentials with
//   const res = await fetch('/api/admin/login', { method:'POST', body: JSON.stringify({username,password}) })
//   return res.ok
const DUMMY_USERS = [
  { username: 'admin', password: 'iwsha@2024' },
]

function verifyCredentials(username, password) {
  return DUMMY_USERS.some(
    (u) => u.username === username && u.password === password,
  )
}

const AUTH_KEY = 'iwsha_admin_session'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(AUTH_KEY) === 'yes' } catch { return false }
  })

  const login = useCallback((username, password) => {
    if (verifyCredentials(username, password)) {
      sessionStorage.setItem(AUTH_KEY, 'yes')
      setAuthed(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }, [])

  return (
    <AdminAuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
