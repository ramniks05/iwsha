import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || 'http://localhost/schloarship-backend'

  return {
    plugins: [react()],
    server: {
      // Dev fallback: proxy /api when VITE_API_BASE_URL is not set or uses relative /api
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
