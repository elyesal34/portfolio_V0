// Désactive le service worker en développement
if (process.env.NODE_ENV !== 'production') {
  console.log('Service Worker running in development mode');
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', () => self.clients.claim());
  
  // Ne pas mettre en cache en développement
  self.addEventListener('fetch', (event) => {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
      return;
    }
    event.respondWith(fetch(event.request));
  });
} else {
  // Configuration pour la production
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
  
  // Désactive la journalisation en production
  workbox.setConfig({ debug: false });
  
  // Precaching des fichiers statiques
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  
  // Stratégie pour les fichiers statiques (CSS, JS, images)
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-assets',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // Stratégie pour les pages (HTML)
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // Gestion de l'installation
  self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    self.skipWaiting();
  });

  // Gestion de l'activation
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'pages' && cacheName !== 'static-assets') {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    event.waitUntil(clients.claim());
  });
}