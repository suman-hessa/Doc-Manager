import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config } from './src/config/config.js'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': config.backend_api_url,
    }
  },
  plugins: [react(), tailwindcss()],
})
