// Configuration du Service Worker
const SW_CONFIG = {
  // Version du cache - incrémenter pour forcer la mise à jour
  CACHE_VERSION: 'v4',
  
  // Préfixe pour les noms de cache
  CACHE_PREFIX: 'portfolio-elyes-',
  
  // Stratégie de mise en cache
  CACHE_STRATEGY: {
    // Stratégie pour les pages (Network First)
    PAGE: 'network-first',
    
    // Stratégie pour les images (Cache First)
    IMAGE: 'cache-first',
    
    // Stratégie pour les API (Network First avec fallback cache)
    API: 'network-first',
    
    // Stratégie pour les autres ressources (Stale While Revalidate)
    OTHER: 'stale-while-revalidate'
  },
  
  // Liste des fichiers à mettre en cache immédiatement
  PRECACHE_ASSETS: [
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
    '/fonts/inter-v19-latin-regular.woff2',
    // Images critiques
    '/images/logo.svg',
    '/images/hero-bg.jpg',
    '/images/profile.jpg'
  ],
  
  // Modèles de fichiers à mettre en cache dynamiquement
  CACHE_PATTERNS: {
    // Images
    IMAGES: /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i,
    
    // Fichiers statiques (CSS, JS, etc.)
    STATIC: /\.(css|js|woff|woff2|ttf|eot)$/i,
    
    // Fichiers de données
    DATA: /\.(json|xml)$/i
  },
  
  // Configuration du cache dynamique
  DYNAMIC_CACHE: {
    // Nombre maximum d'entrées dans le cache
    MAX_ENTRIES: 50,
    
    // Taille maximale du cache en Mo
    MAX_SIZE: 100,
    
    // Durée de vie maximale des entrées en cache (en secondes)
    MAX_AGE: 60 * 60 * 24 * 30 // 30 jours
  },
  
  // Configuration de la synchronisation en arrière-plan
  BACKGROUND_SYNC: {
    ENABLED: true,
    TAGS: ['sync-forms', 'sync-comments']
  },
  
  // Configuration des notifications push
  PUSH_NOTIFICATIONS: {
    ENABLED: true,
    ICON: '/vite.svg',
    BADGE: '/vite.svg',
    VIBRATE: [100, 50, 100]
  },
  
  // Configuration du mode hors ligne
  OFFLINE: {
    ENABLED: true,
    PAGE: '/offline.html',
    IMAGE: '/images/offline-image.jpg',
    MESSAGE: 'Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.'
  },
  
  // Domaines externes autorisés
  ALLOWED_DOMAINS: [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'unpkg.com',
    'cdn.jsdelivr.net'
  ],
  
  // Configuration du debug
  DEBUG: process.env.NODE_ENV === 'development'
};

// Exporter la configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SW_CONFIG;
}
