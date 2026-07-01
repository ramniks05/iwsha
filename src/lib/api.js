const BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

async function request(path, options = {}, { isPublic = false } = {}) {
  const fetchOptions = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  }

  // Session cookie required for admin routes; also needed on login/logout
  fetchOptions.credentials = 'include'

  let res
  try {
    res = await fetch(`${BASE}${path}`, fetchOptions)
  } catch {
    throw new Error(
      'Cannot reach backend API. Start XAMPP and ensure schloarship-backend is running.',
    )
  }

  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(
      'Backend returned an invalid response. Check VITE_API_BASE_URL in .env points to schloarship-backend.',
    )
  }

  if (!json.ok) {
    throw new Error(json.error || 'Request failed')
  }

  return json
}

// Auth — always send cookies for session
export const login = (username, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) })

export const logout = () =>
  request('/auth/logout', { method: 'POST' })

export const getMe = async () => {
  try {
    const res = await fetch(`${BASE}/auth/me`, { credentials: 'include' })
    return res.json()
  } catch {
    return { ok: false, authenticated: false, error: 'Backend unavailable.' }
  }
}

export const changePassword = (currentPassword, newPassword, confirmPassword) =>
  request('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  })

// Public — saved to database via backend
export const getApiInfo = () => request('/', {}, { isPublic: true })

export const getUniversities = () => request('/universities', {}, { isPublic: true })

export const submitApplication = (data) =>
  request('/applications', { method: 'POST', body: JSON.stringify(data) }, { isPublic: true })

export const sendMessage = (data) =>
  request('/messages', { method: 'POST', body: JSON.stringify(data) }, { isPublic: true })

// Admin — read/write database via backend
export const getApplications = () => request('/applications')

export const updateApplication = (id, status) =>
  request(`/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })

export const deleteApplication = (id) =>
  request(`/applications/${id}`, { method: 'DELETE' })

export const getMessages = () => request('/messages')

export const markMessageRead = (id) =>
  request(`/messages/${id}`, { method: 'PATCH' })

export const createUniversity = (data) =>
  request('/universities', { method: 'POST', body: JSON.stringify(data) })

export const deleteUniversity = (id) =>
  request(`/universities/${id}`, { method: 'DELETE' })

export { BASE as API_BASE_URL }
