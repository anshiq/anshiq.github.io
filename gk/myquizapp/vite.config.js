// vite.config.js
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    // Set custom output directory (two levels up)
    outDir: '../',
    // Prevent cleaning the output directory
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    }
  },
  resolve: {
    alias: {
      '@collection': path.resolve(__dirname, './collection')
    }
  }
})