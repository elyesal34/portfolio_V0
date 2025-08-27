// @ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react({
      // Options spécifiques à React si nécessaire
    })
  ],
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
      overlay: true
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['workbox-*', 'lucide-react']
  },
  // Désactiver les vérifications de type pour les modules Workbox
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true
      }
    }
  }
});
