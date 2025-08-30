// Script pour forcer la mise à jour du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.update().then(() => {
        console.log('Service Worker mis à jour avec succès');
        // Forcer l'activation du nouveau service worker
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }).catch(error => {
        console.error('Erreur lors de la mise à jour du Service Worker:', error);
      });
    }
  });
}

// Rafraîchir la page pour activer le nouveau service worker
window.location.reload();
