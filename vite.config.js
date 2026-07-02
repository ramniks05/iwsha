import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const LOCAL_BACKEND = 'http://localhost/schloarship-backend'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBase = env.VITE_API_BASE_URL || '/api'
  const useProxy = apiBase === '/api' || apiBase.startsWith('/')

  return {
    plugins: [react()],
    server: {
      proxy: useProxy
        ? {
            '/api': {
              target: LOCAL_BACKEND,
              changeOrigin: true,
              secure: false,
              // Host-only cookie (works for localhost and 127.0.0.1)
              cookieDomainRewrite: '',
              cookiePathRewrite: '/',
            },
          }
        : undefined,
    },
  }
})
