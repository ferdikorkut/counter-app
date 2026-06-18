import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/counter-app/', // GitHub Pages bu projeyi /counter-app/ alt klasöründe yayınlıyor
})
