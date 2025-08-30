import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Définir le type d'application comme SPA
  appType: 'spa',
  plugins: [
    react(),
    VitePWA({
      // Configuration du service worker
      registerType: 'autoUpdate',
      injectRegister: false,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      scope: '/',
      devOptions: {
        enabled: false,
        type: 'module',
        navigateFallback: 'index.html',
      },
      // Désactiver l'auto-destruction pour un meilleur contrôle
      selfDestroying: false,
      // Inclure les assets statiques
      includeAssets: [
        'favicons/*',
        'fonts/*',
        'images/*',
        '*.{js,css,html,json,ico,png,jpg,jpeg,svg,webp,woff,woff2,ttf,eot}'
      ],
      // Configuration du manifeste
      manifest: {
        name: 'Portfolio Elyes Allani',
        short_name: 'Portfolio',
        description: 'Portfolio professionnel de Elyes Allani - Développeur Full Stack',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        prefer_related_applications: false,
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/favicons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon'
          },
          {
            src: '/favicons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/favicons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          }
        ]
      },
      // Configuration de Workbox
      workbox: {
        // Fichiers à mettre en cache lors de l'installation
        globPatterns: [
          '**/*.{js,css,html,json,woff2,woff,ttf,eot,svg,png,jpg,jpeg,gif,webp,ico}'
        ],
        // Ignorer les fichiers spécifiques
        globIgnores: [
          '**/node_modules/**/*',
          '**/sw.js',
          '**/workbox-*.js',
          '**/workbox-*.js.map',
          '**/workbox-sw.js',
          '**/workbox-sw.js.map',
          '**/sw.js.map'
        ],
        // Stratégies de cache pour les requêtes réseau
        runtimeCaching: [
          // Cache pour les polices Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
                purgeOnQuotaError: true
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache pour les polices gstatic
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 an
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache pour les images
          {
            urlPattern: /\/images\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
                purgeOnQuotaError: true
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache pour les fichiers statiques
          {
            urlPattern: /\.(?:js|css|json)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 semaine
                purgeOnQuotaError: true
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Cache pour les requêtes API (si nécessaire)
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 minutes
                purgeOnQuotaError: true
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        // Nettoyer les caches obsolètes
        cleanupOutdatedCaches: true,
        // Activer le mode debug en développement
        mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
        // Activer le navigateur hors ligne
        navigateFallback: 'index.html',
        // Activer la navigation hors ligne
        navigationPreload: true,
        // Activer le préchargement des liens
        clientsClaim: true,
        skipWaiting: true
      },
      // Configuration du service worker
      injectRegister: false,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      scope: '/',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,json,woff2}'],
        globIgnores: [
          '**/node_modules/**/*', 
          'sw.js', 
          'workbox-*.js', 
          'workbox-*.js.map', 
          'workbox-sw.js', 
          'workbox-sw.js.map', 
          'sw.js.map'
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
      }
    })
  ],
  // Configuration du serveur de développement
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    cors: true,
    hmr: {
      port: 3000,
      protocol: 'ws',
      overlay: false
    },
    // Activer le rechargement à chaud
    watch: {
      usePolling: true,
      interval: 100
    },
    // Compression activée par défaut en production
  },
  // Configuration de la construction
  build: {
    // Générer des sourcemaps en développement
    sourcemap: process.env.NODE_ENV !== 'production',
    // Optimiser la taille des bundles
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          workbox: ['workbox-window']
        }
      }
    },
    // Activer le minification en production
    minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
    // Désactiver le rapport de taille des bundles
    reportCompressedSize: false,
    // Cache de construction activé par défaut
  },
  // Configuration des alias de chemins
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') }
    ]
  },
  // Configuration des variables d'environnement
  define: {
    'process.env': {}
  },
  // Configuration des extensions de fichiers
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});