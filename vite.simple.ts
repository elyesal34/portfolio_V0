import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    strictPort: true,
    hmr: {
      port: 3001,
      protocol: 'ws',
      host: 'localhost',
    },
  },
  // Niveau de log détaillé
  logLevel: 'info',
  // Désactiver le cache pour le développement
  cacheDir: 'node_modules/.vite',
  // Optimisation pour le développement
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true,
  },
  // Configuration de build
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});