// Simple development service worker that immediately claims clients
// and doesn't cache anything
console.log('[Dev Service Worker] Running in development mode');

// Skip waiting and claim clients immediately
self.addEventListener('install', (event) => {
  console.log('[Dev Service Worker] Installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Dev Service Worker] Activating...');
  // Take control of all clients immediately
  event.waitUntil(clients.claim());
});

// Simple fetch handler that just passes through all requests
self.addEventListener('fetch', (event) => {
  // For development, just fetch from network
  event.respondWith(fetch(event.request));
});
