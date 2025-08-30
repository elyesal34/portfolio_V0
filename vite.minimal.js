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
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
      clientPort: 3000,
      path: '/ws',
      overlay: false
    },
    watch: {
      usePolling: false,
      useFsEvents: true,
      followSymlinks: true
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
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true
      }
    }
  }
});
