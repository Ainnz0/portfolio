import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// If you deploy to GitHub Pages at https://<user>.github.io/portfolio/,
// change base to '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
})
