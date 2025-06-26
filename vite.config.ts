import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimizations for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          email: ['@emailjs/browser'],
          recaptcha: ['react-google-recaptcha']
        }
      }
    },
    // Enable source maps for better debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: true,
    // Asset optimization
    assetsInlineLimit: 4096,
    // Target modern browsers for better optimization
    target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88']
  },
  // La propriété 'compress' n'est pas supportée par la configuration du serveur Vite.
  // Pour activer la compression, utilisez un middleware ou un proxy externe.
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // PWA configuration
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  }
});