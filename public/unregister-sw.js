// Unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (const registration of registrations) {
      registration.unregister();
      console.log('ServiceWorker unregistered:', registration.scope);
    }
  });

  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        caches.delete(cacheName);
        console.log('Cache deleted:', cacheName);
      });
    });
  }
}

// Remove the script after execution
const script = document.currentScript;
if (script) {
  script.remove();
}
