/* global workbox, __WB_MANIFEST */

// Service Worker configuration
const isProduction = process.env.NODE_ENV === 'production';

// Skip waiting for the service worker to become active
self.addEventListener('install', () => {
  if (!isProduction) {
    // Skip waiting immediately in development
    self.skipWaiting();
  }
});

// Claim control of any open pages
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Only initialize Workbox in production
if (isProduction) {
  // Import Workbox from CDN
  /* global importScripts */
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
  
  // Disable Workbox logs in production
  workbox.setConfig({ debug: false });
  
  // Precaching of static files
  if (typeof __WB_MANIFEST !== 'undefined') {
    workbox.precaching.precacheAndRoute(__WB_MANIFEST);
  }
  
  // Cache strategy for static assets (CSS, JS, images)
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-assets',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        })
      ]
    })
  );

  // Cache strategy for HTML pages
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        })
      ]
    })
  );

  // Clean up old caches on activation
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['pages', 'static-assets'];
    event.waitUntil(
      self.caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !cacheWhitelist.includes(cacheName))
            .map((cacheName) => self.caches.delete(cacheName))
        );
      })
    );
  });
} else {
  // Development mode: bypass caching
  self.addEventListener('fetch', (event) => {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
      return;
    }
    event.respondWith(self.fetch(event.request));
  });
}