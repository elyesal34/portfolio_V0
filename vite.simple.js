import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Configuration minimale pour Vite
export default defineConfig({
  plugins: [
    react({
      // Configuration minimale pour React
    })
  ],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
      port: 3000
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ['workbox-*', 'lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Désactiver la vérification TypeScript stricte pour les modules tiers
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true
      }
    }
  }
});
