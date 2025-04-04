import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', 'react-icons'],
          'form-vendor': ['formik', 'yup'],
          'swiper-vendor': ['swiper'],
          'stripe-vendor': ['@stripe/stripe-js'],
          'image-vendor': ['react-lazy-load-image-component'],
          'virtualization': ['react-window'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
  },
  server: {
    open: true,
    host: true,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@headlessui/react',
      'react-icons',
      'swiper',
      'react-lazy-load-image-component',      
      'react-window'
    ],
  },
})