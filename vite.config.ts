import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    // Optimizations pour PageSpeed
    rollupOptions: {
      output: {
        manualChunks: {
          // Chunks plus petits pour réduire le JavaScript inutilisé
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'icons': ['lucide-react'],
          'email': ['@emailjs/browser'],
          'recaptcha': ['react-google-recaptcha']
        },
        // Optimiser les noms de fichiers
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Désactiver les source maps en production
    sourcemap: false,
    // Chunk size optimisé
    chunkSizeWarningLimit: 500,
    // Minification optimisée
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
        collapse_vars: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        if_return: true,
        join_vars: true,
        side_effects: false,
        sequences: true,
        properties: true,
        keep_fargs: false,
        keep_fnames: false,
        hoist_funs: true,
        hoist_vars: false,
        inline: true
      },
      mangle: {
        safari10: true,
        toplevel: true
      },
      format: {
        comments: false,
        ascii_only: true,
        beautify: false
      }
    },
    // CSS optimisé
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    // Assets optimisés
    assetsInlineLimit: 4096,
    // Target moderne pour meilleure optimisation
    target: ['es2020', 'chrome80', 'firefox78', 'safari14', 'edge88'],
    // Optimisations module
    modulePreload: {
      polyfill: false
    },
    // Optimisations supplémentaires
    reportCompressedSize: false
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // Optimisations esbuild
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true
  },
  // Optimisations CSS
  css: {
    devSourcemap: false
  },
  // Optimisations de performance
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    // Désactiver les dev tools en production
    __DEV__: false
  }
});