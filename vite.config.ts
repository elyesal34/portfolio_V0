import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicons/favicon.ico', 'favicons/apple-touch-icon.png', 'favicons/site.webmanifest'],
      manifest: {
        name: 'Portfolio Elyes',
        short_name: 'Portfolio',
        description: 'Portfolio professionnel d\'Elyes',
        theme_color: '#3B82F6',
        icons: [
          {
            src: 'favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        sourcemap: true,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
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
  esbuild: mode === 'production' ? {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true
  } : undefined,
  // Optimisations CSS
  css: {
    devSourcemap: false
  },
  // Optimisations de performance
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    // Désactiver les dev tools en production
    __DEV__: mode !== 'development'
  }
}));