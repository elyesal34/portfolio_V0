// Initialisation des métriques de performance
const startTime = window.performance.now();

// Fonction pour mesurer le temps de chargement de la page
const measurePageLoadTime = () => {
  const loadTime = window.performance.now() - startTime;
  console.log(`Page Load Time: ${loadTime} ms`);
  
  // Envoyer les métriques à votre système d'analyse si nécessaire
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      'name': 'page_load',
      'value': Math.round(loadTime),
      'event_category': 'Load Time'
    });
  }
};

// Attacher l'événement de chargement de la page
if (document.readyState === 'complete') {
  measurePageLoadTime();
} else {
  window.addEventListener('load', measurePageLoadTime);
}

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
  console.error('Erreur non gérée:', event.error);
  
  // Envoyer l'erreur à votre service de suivi d'erreurs
  if (window.gtag) {
    window.gtag('event', 'exception', {
      'description': event.message,
      'fatal': false
    });
  }
  
  // Empêcher la propagation de l'erreur pour éviter la répétition dans la console
  event.preventDefault();
});

// Initialisation des fonctionnalités PWA si nécessaire
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

// Initialisation des fonctionnalités hors ligne
if ('caches' in window) {
  console.log('Cache API is supported');
}

// Masquer l'écran de chargement une fois que tout est prêt
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
});
