import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import microLc from './plugins/vite-plugin-micro-lc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    minify: false
  },
  plugins: [
    vue(),
    vueJsx(),
    microLc('vue3'),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
