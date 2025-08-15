// Configuration du Service Worker
const CACHE_NAME = 'portfolio-elyes-v5';
const STATIC_CACHE = 'static-v5';
const DYNAMIC_CACHE = 'dynamic-v5';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/offline.html',
  // Fichiers de base
  '/favicons/android-chrome-192x192.png',
  '/favicons/android-chrome-512x512.png',
  '/favicons/apple-touch-icon.png',
  '/favicons/favicon-16x16.png',
  '/favicons/favicon-32x32.png',
  '/favicons/favicon.ico',
  '/favicons/site.webmanifest',
  // Polices
  '/fonts/inter-v19-latin-700.woff2',
  '/fonts/inter-v19-latin-700italic.woff2',
  '/fonts/inter-v19-latin-italic.woff2',
  '/fonts/inter-v19-latin-regular.woff2'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation en cours...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation terminée');
        return self.skipWaiting();
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation en cours...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => 
            cacheName !== STATIC_CACHE && 
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== CACHE_NAME
          )
          .map((cacheName) => {
            console.log(`[Service Worker] Suppression de l'ancien cache : ${cacheName}`);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => {
      console.log('[Service Worker] Prise de contrôle des clients');
      return self.clients.claim();
    })
    .then(() => {
      console.log('[Service Worker] Prêt à gérer les requêtes');
    })
  );
});

// Gestion des requêtes réseau
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') return;

  // Ignorer les requêtes non-HTTP/HTTPS
  if (!url.protocol.startsWith('http')) return;

  // Gérer les différents types de requêtes
  try {
    // Pour les images, utiliser la stratégie Cache First
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
      event.respondWith(handleImageRequest(request));
    } 
    // Pour les API, utiliser la stratégie Network First
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleApiRequest(request));
    } 
    // Pour les autres requêtes, utiliser la stratégie Network First avec fallback
    else {
      event.respondWith(handlePageRequest(request));
    }
  } catch (error) {
    console.error('[Service Worker] Erreur lors du traitement de la requête :', error);
    // En cas d'erreur, essayer de servir depuis le cache
    event.respondWith(
      caches.match(request).then(response => {
        return response || handleOfflineFallback(request);
      })
    );
  }
});

// Stratégie pour les images (Cache First)
async function handleImageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Si la réponse est en cache, la retourner immédiatement
  if (cachedResponse) {
    // Mettre à jour le cache en arrière-plan
    event.waitUntil(
      fetchAndCache(request, cache)
        .catch(error => console.error('Erreur de mise à jour du cache :', error))
    );
    return cachedResponse;
  }

  // Si pas dans le cache, essayer le réseau
  try {
    const networkResponse = await fetch(request);
    
    // Mettre en cache si la réponse est valide
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // En cas d'erreur, retourner une image de secours
    return caches.match('/images/offline-image.jpg')
      .then(response => response || new Response('Image non disponible hors ligne', { 
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'text/plain' }
      }));
  }
}

// Stratégie pour les requêtes API (Network First)
async function handleApiRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    // Essayer d'abord le réseau
    const networkResponse = await fetch(request);
    
    // Mettre en cache si la réponse est valide
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // En cas d'échec, essayer de récupérer depuis le cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si aucune réponse en cache, retourner une réponse d'erreur
    return new Response(JSON.stringify({
      error: 'Service indisponible',
      message: 'Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.',
      offline: true
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Stratégie pour les pages (Network First avec fallback)
async function handlePageRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  try {
    // Essayer d'abord le réseau
    const networkResponse = await fetch(request);
    
    // Mettre en cache si la réponse est valide
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    // En cas d'échec, essayer de récupérer depuis le cache
    const cachedResponse = await cache.match(request);
    
    // Si pas dans le cache, retourner la page hors connexion
    if (!cachedResponse) {
      if (request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
      return new Response('Aucune connexion Internet', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    return cachedResponse;
  }
}

// Gestion des cas hors ligne
function handleOfflineFallback(request) {
  if (request.mode === 'navigate') {
    return caches.match('/offline.html');
  }
  
  return new Response('Ressource non disponible hors ligne', {
    status: 408,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Fonction utilitaire pour mettre à jour le cache
async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cache :', error);
    throw error;
  }
}

// Gestion des messages (pour la mise à jour du service worker)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Gestion de la synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Événement de synchronisation :', event.tag);
  
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Fonction de synchronisation des formulaires
async function syncForms() {
  // Implémenter la logique de synchronisation ici
  console.log('[Service Worker] Synchronisation des formulaires...');
}

// Gestion des notifications push
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Nouvelle notification',
      icon: '/vite.svg',
      badge: '/vite.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || '1'
      },
      actions: [
        {
          action: 'explore',
          title: 'Voir le portfolio',
          icon: '/vite.svg'
        },
        {
          action: 'close',
          title: 'Fermer',
          icon: '/vite.svg'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Portfolio', options)
    );
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
