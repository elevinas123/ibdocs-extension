import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    // Configuration options...
  },
  server: {
    // Configure server options for HMR and local development
    hmr: {
      // You might need to tweak this for your setup
      port: 3000,
      clientPort: 3000
    }
  }
});
