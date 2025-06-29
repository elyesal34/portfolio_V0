import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    // Optimizations for better performance - ULTRA OPTIMISÉ
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          email: ['@emailjs/browser'],
          recaptcha: ['react-google-recaptcha'],
          router: ['react-router-dom']
        }
      }
    },
    // Disable source maps for production
    sourcemap: false,
    // Optimize chunk size - Plus agressif
    chunkSizeWarningLimit: 300,
    // Minify for production - Plus agressif
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        unused: true,
        dead_code: true,
        passes: 2,
        reduce_vars: true,
        collapse_vars: true
      },
      mangle: {
        safari10: true,
        toplevel: true
      },
      format: {
        comments: false
      }
    },
    // CSS optimization - Plus agressif
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    // Asset optimization - Plus agressif
    assetsInlineLimit: 1024,
    // Target modern browsers for better optimization
    target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88'],
    // Réduire la taille des modules
    modulePreload: {
      polyfill: false
    }
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // PWA configuration
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  // Optimisations supplémentaires
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none'
  }
});