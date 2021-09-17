import { defineConfig } from 'vite'
import { resolve }      from 'path'

import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
        dirs: ['src/shared/components'],
        extensions: ['vue'],
        deep: true,
    })
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, './src')
    }
  }
})
