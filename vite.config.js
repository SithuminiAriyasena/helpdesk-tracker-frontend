import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // When the Express backend is ready, uncomment this so /api calls
      // from the frontend are forwarded to it during development.
      // '/api': 'http://localhost:5000',
    },
  },
})
