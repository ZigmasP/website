import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reviews': 'http://127.0.0.1:3000', // Peradresavimas į backend
    },
  },
});
