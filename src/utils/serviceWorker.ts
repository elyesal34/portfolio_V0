// Enregistrement du Service Worker
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw-new.js';

      if (process.env.NODE_ENV === 'production') {
        registerValidSW(swUrl);
      } else {
        console.log('Service Worker non enregistré en mode développement');
      }
    });
  }
}

// Enregistrement du Service Worker avec vérification
function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Nouveau contenu disponible
              console.log('Nouveau contenu disponible. Veuillez actualiser.');
              // Vous pouvez ajouter ici une notification à l'utilisateur
            } else {
              // Le contenu est mis en cache pour une utilisation hors ligne
              console.log('Le contenu est mis en cache pour une utilisation hors ligne.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
    });
}

// Vérification des mises à jour
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update().catch((error) => {
        console.error('Erreur lors de la vérification des mises à jour:', error);
      });
    });
  }
}

// Fonction pour forcer la mise à jour du Service Worker
export function forceUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.update().then(() => {
          console.log('Mise à jour du Service Worker forcée');
          // Recharger la page pour appliquer les mises à jour
          window.location.reload();
        });
      }
    });
  }
}

// Écouteur d'événement pour la mise à jour du Service Worker
function listenForWaitingServiceWorker(registration: ServiceWorkerRegistration, callback: () => void) {
  function awaitStateChange() {
    registration.installing?.addEventListener('statechange', function (event) {
      if (event.target instanceof ServiceWorker && event.target.state === 'installed') {
        callback();
      }
    });
  }

  if (registration.waiting) {
    // SW est en attente
    return callback();
  }
  if (registration.installing) {
    return awaitStateChange();
  }
  
  registration.addEventListener('updatefound', awaitStateChange);
}

// Vérifier les mises à jour régulièrement
if (process.env.NODE_ENV === 'production') {
  // Vérifier les mises à jour toutes les heures
  setInterval(checkForUpdates, 60 * 60 * 1000);
}
