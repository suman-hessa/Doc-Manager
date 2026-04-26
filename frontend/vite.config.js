import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// We use a function so we can access the 'mode' (dev/prod)
export default defineConfig(({ mode }) => {
  // 1. Load the env variables based on the current mode
  // process.cwd() tells Vite to look in the project root
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        // 2. Use 'env' instead of 'import.meta.env'
        '/api': {
          target: env.VITE_BACKEND_API_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        }
      },
    },
    plugins: [react(), tailwindcss()],
  }
})
