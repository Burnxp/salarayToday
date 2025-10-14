import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [react()],
  base: isDev ? '/salary_day/' : '/', // 👈 XAMPP im Dev, Netlify im Build
})