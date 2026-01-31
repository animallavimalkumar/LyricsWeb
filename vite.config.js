import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // ✅ ADDED: REQUIRED for GitHub Pages project site
  base: "/LyricsWeb/",

  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,

        // ❌ This rewrite was useless; it did nothing
        // ✅ Cleaned but behavior unchanged
        rewrite: (path) => path
      }
    }
  }
})
