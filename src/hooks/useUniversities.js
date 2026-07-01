import { useCallback, useEffect, useState } from 'react'
import { normalizeUniversity } from '../data/universityUtils'
import { getUniversities as fetchUniversities } from '../lib/api'

export function useUniversities() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await fetchUniversities()
      setUniversities((json.data || []).map(normalizeUniversity))
    } catch (err) {
      setError(err.message || 'Failed to load universities from backend.')
      setUniversities([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { universities, loading, error, refresh }
}
