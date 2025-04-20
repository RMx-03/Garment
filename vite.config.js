import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          ['@babel/plugin-transform-runtime', { useESModules: true }]
        ]
      }
    }),
    splitVendorChunkPlugin(),
  ],
  build: {
    target: 'esnext',
    modulePreload: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', 'react-icons'],
          'form-vendor': ['formik', 'yup'],
          'swiper-vendor': ['swiper'],
          'stripe-vendor': ['@stripe/stripe-js'],
          'image-vendor': ['react-lazy-load-image-component'],
          'virtualization': ['react-window', 'react-virtualized-auto-sizer'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    open: true,
    host: true,
    cors: true,
    compression: true,
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
      'react-window',
      'react-virtualized-auto-sizer',
      'clsx',
      '@stripe/stripe-js'
    ],
    exclude: ['react-intersection-observer']
  },
  esbuild: {
    target: 'esnext',
    legalComments: 'none',
    treeShaking: true,
  },
})