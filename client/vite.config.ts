import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
<<<<<<< HEAD
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000',
=======
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
        changeOrigin: true,
        secure: false,
      },
    },
  },
});