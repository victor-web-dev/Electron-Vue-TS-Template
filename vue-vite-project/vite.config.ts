import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../dist",
  },
  base: "./",
  plugins: [vue()],
  server: {
    port: 3000,
  }
})
