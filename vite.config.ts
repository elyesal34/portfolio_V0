import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configuration de base
  plugins: [
    react(),
    VitePWA({
      // Do not inject registerSW.js script tag; we register SW manually
      injectRegister: null,
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
    }),
    // Analyse du bundle (activée avec `cross-env ANALYZE=1` ou `--mode analyze`)
    ((mode === 'analyze' || Boolean(process.env.ANALYZE)) && visualizer({
      filename: 'dist/stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      open: true,
    })),
  ],
  // Use Preact in production builds only (drop-in via compat)
  resolve: {
    alias: mode === 'production'
      ? {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
          'react/jsx-runtime': 'preact/jsx-runtime'
        }
      : []
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    // Optimizations pour PageSpeed
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Force special chunks to keep explicit names
          if (id.includes('preact')) return 'react';
          if (id.includes('react-router')) return 'router';
          if (id.includes('react-dom') || /(^|\\|\/)react(\\|\/)/.test(id)) return 'react';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('@emailjs/browser')) return 'email';
          if (id.includes('react-google-recaptcha')) return 'recaptcha';
          // Let Rollup decide for other node_modules to enable better per-route/code-split chunks
          return undefined;
        },
        // Optimiser les noms de fichiers
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Désactiver les source maps en production
    sourcemap: false,
    // Chunk size optimisé (raise threshold since vendor chunks are expected)
    chunkSizeWarningLimit: 800,
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
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    minifyIdentifiers: mode === 'production',
    minifySyntax: mode === 'production',
    minifyWhitespace: mode === 'production',
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
    __DEV__: mode !== 'development'
  }
}));