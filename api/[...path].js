/**
 * Production proxy: browser → www.iwshatrust.org/api/* → hrntechsolutions.com backend.
 * Strips Domain from Set-Cookie so session cookies are stored on the frontend host.
 */
const BACKEND =
  process.env.BACKEND_API_URL || 'https://hrntechsolutions.com/iwsha-backend/api'

function rewriteSetCookie(value) {
  return value
    .replace(/;\s*domain=[^;]*/gi, '')
    .replace(/;\s*Domain=[^;]*/gi, '')
}

function buildTarget(req) {
  const segments = req.query.path
  const suffix = Array.isArray(segments) ? segments.join('/') : segments || ''
  const requestUrl = req.url || ''
  const queryIndex = requestUrl.indexOf('?')
  const query = queryIndex >= 0 ? requestUrl.slice(queryIndex) : ''
  return `${BACKEND.replace(/\/$/, '')}/${suffix}${query}`
}

function readBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined
  }

  if (typeof req.body === 'string') {
    return req.body
  }

  if (req.body && typeof req.body === 'object') {
    return JSON.stringify(req.body)
  }

  return undefined
}

export default async function handler(req, res) {
  const target = buildTarget(req)

  const headers = {}
  if (req.headers['content-type']) {
    headers['Content-Type'] = req.headers['content-type']
  } else if (req.method !== 'GET' && req.method !== 'HEAD') {
    headers['Content-Type'] = 'application/json'
  }
  if (req.headers.cookie) {
    headers.Cookie = req.headers.cookie
  }
  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization
  }

  let upstream
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body: readBody(req),
    })
  } catch {
    res.status(502).json({ ok: false, error: 'Backend API unreachable.' })
    return
  }

  res.status(upstream.status)

  const setCookies =
    typeof upstream.headers.getSetCookie === 'function'
      ? upstream.headers.getSetCookie()
      : []

  if (setCookies.length > 0) {
    for (const cookie of setCookies) {
      res.appendHeader('Set-Cookie', rewriteSetCookie(cookie))
    }
  } else {
    upstream.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        res.appendHeader('Set-Cookie', rewriteSetCookie(value))
      }
    })
  }

  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase()
    if (lower === 'set-cookie' || lower === 'transfer-encoding' || lower === 'content-encoding') {
      return
    }
    res.setHeader(key, value)
  })

  const text = await upstream.text()
  res.send(text)
}
