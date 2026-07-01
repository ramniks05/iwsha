import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getMe, login as apiLogin, logout as apiLogout } from '../lib/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then((json) => {
        if (json.ok && json.authenticated) {
          setAuthed(true)
          setUser(json.user)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (username, password) => {
    const json = await apiLogin(username, password)
    setAuthed(true)
    setUser(json.user)
    return json
  }, [])

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
    <AdminAuthContext.Provider value={{ authed, user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
