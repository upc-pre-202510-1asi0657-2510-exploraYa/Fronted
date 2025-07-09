import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          primevue: ['primevue/config', 'primevue/toastservice'],
          fontawesome: ['@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome', '@fortawesome/free-solid-svg-icons']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        { from: /^\/sign-in/, to: '/index.html' },
        { from: /^\/sign-up/, to: '/index.html' },
        { from: /^\/admin/, to: '/index.html' },
        { from: /^\/activity/, to: '/index.html' },
        { from: /^\/profile/, to: '/index.html' },
        { from: /^\/statistics/, to: '/index.html' },
        { from: /^\/dashboard/, to: '/index.html' },
        { from: /.*/, to: '/index.html' }
      ]
    }
  },
  preview: {
    port: 3000,
    host: true,
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        { from: /^\/sign-in/, to: '/index.html' },
        { from: /^\/sign-up/, to: '/index.html' },
        { from: /^\/admin/, to: '/index.html' },
        { from: /^\/activity/, to: '/index.html' },
        { from: /^\/profile/, to: '/index.html' },
        { from: /^\/statistics/, to: '/index.html' },
        { from: /^\/dashboard/, to: '/index.html' },
        { from: /.*/, to: '/index.html' }
      ]
    }
  }
})
