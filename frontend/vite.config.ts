import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 5173,
    open: true, // Automatically open browser
    proxy: {
      // If you have a backend API
      '/api': {
        target: 'http://localhost:3000', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})