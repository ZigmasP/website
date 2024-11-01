import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/website/', // Nurodoma, kad svetainė yra hostinama šiame URL
  plugins: [react()],
})
