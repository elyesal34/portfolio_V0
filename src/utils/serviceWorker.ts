// Vérifier si l'application s'exécute sur StackBlitz
function isStackBlitz(): boolean {
  return window.location.host.includes('stackblitz.io') || 
         window.location.host.includes('webcontainer') ||
         (window.location.host.includes('localhost') && process.env.NODE_ENV === 'development');
}

// Fonction pour forcer la mise à jour du Service Worker
export async function forceUpdate(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;

    try {
      await registration.update();
      console.log('Mise à jour du Service Worker demandée');
      
      if (registration.waiting) {
        // Demander à l'utilisateur de recharger pour appliquer les mises à jour
        if (confirm('Une mise à jour est disponible. Voulez-vous recharger la page maintenant ?')) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du Service Worker:', err);
    }
  } catch (error) {
    console.error('Error getting service worker registration:', error);
  }
}

// Enregistrement du Service Worker avec Vite PWA
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | void> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser');
    return;
  }

  if (process.env.NODE_ENV !== 'production' || isStackBlitz()) {
    console.log('Service Worker non enregistré en mode développement ou sur StackBlitz');
    return;
  }

  try {
    // Vite PWA handles the actual registration, we just configure it
    const registration = await navigator.serviceWorker.ready;
    
    // Check for updates every 5 minutes
    setInterval(async () => {
      try {
        await registration.update();
      } catch (err) {
        console.log('Error updating service worker:', err);
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    // Handle service worker updates
    let refreshing = false;
    
    // Detect when a new service worker is waiting
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
    
    // Check for waiting service worker on load
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg?.waiting) {
          // Ask user to reload to apply updates
          if (confirm('Une nouvelle version est disponible. Voulez-vous recharger la page pour l\'utiliser ?')) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      } catch (error) {
        console.error('Error checking for waiting service worker:', error);
      }
    });
    
    console.log('Service Worker prêt avec Vite PWA');
    return registration;
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
}

// Set up update checking in production
if (process.env.NODE_ENV === 'production' && !isStackBlitz() && 'serviceWorker' in navigator) {
  // Check for updates every hour
  setInterval(() => {
    navigator.serviceWorker.getRegistration()
      .then(registration => registration?.update())
      .catch(err => console.error('Erreur lors de la vérification des mises à jour:', err));
  }, 60 * 60 * 1000); // 1 heure
  
  // Also check immediately on load
  window.addEventListener('load', () => {
    forceUpdate().catch(console.error);
  });
}
