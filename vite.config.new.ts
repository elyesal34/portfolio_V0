// Configuration minimale Vite
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: true,
    cors: true,
    hmr: {
      host: 'localhost',
      port: 3000,
      protocol: 'ws',
      overlay: false
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'react-router-hash-link'
    ]
  },
  build: {
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['react-router-hash-link']
        }
      }
    }
  }
});
