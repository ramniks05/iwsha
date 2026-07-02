import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getMe, login as apiLogin, logout as apiLogout } from '../lib/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const applySession = useCallback((json) => {
    if (json?.ok && json.authenticated) {
      setAuthed(true)
      setUser(json.user)
      return true
    }
    setAuthed(false)
    setUser(null)
    return false
  }, [])

  const checkSession = useCallback(async () => {
    const json = await getMe()
    return applySession(json)
  }, [applySession])

  useEffect(() => {
    checkSession().catch(() => {
      setAuthed(false)
      setUser(null)
    }).finally(() => setLoading(false))
  }, [checkSession])

  const login = useCallback(async (username, password) => {
    await apiLogin(username, password)
    const ok = await checkSession()
    if (!ok) {
      throw new Error(
        'Login succeeded but the session was not saved. Check backend CORS (allow www.iwshatrust.org), session cookies (SameSite=None; Secure), and storage/sessions/ on the server.',
      )
    }
    const json = await getMe()
    return json
  }, [checkSession])

  const logout = useCallback(async () => {
    try {
      await apiLogout()
    } catch {
      // clear local state even if request fails
    }
    setAuthed(false)
    setUser(null)
  }, [])

  return (
    <AdminAuthContext.Provider value={{ authed, user, loading, login, logout, checkSession }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
