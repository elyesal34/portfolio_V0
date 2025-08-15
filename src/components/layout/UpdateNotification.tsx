import { useEffect, useState } from 'react';
import { Workbox, WorkboxLifecycleWaitingEvent } from 'workbox-window';

interface ExtendedServiceWorkerRegistration extends ServiceWorkerRegistration {
  waiting: ServiceWorker | null;
}

const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ExtendedServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Vérifier si le navigateur supporte les Service Workers et Workbox
      const wb = new Workbox('/sw.js');
      
      const showUpdateBanner = (reg: ServiceWorkerRegistration) => {
        setShowUpdate(true);
        setRegistration(reg as ExtendedServiceWorkerRegistration);
      };

      // Écouter l'événement de mise à jour disponible
      const handleWaiting = (event: WorkboxLifecycleWaitingEvent) => {
        if (event.isUpdate) {
          wb.getSW().then((sw) => {
            if (sw) {
              navigator.serviceWorker.getRegistration().then((reg) => {
                if (reg) {
                  showUpdateBanner(reg);
                }
              });
            }
          });
        }
      };

      wb.addEventListener('waiting', handleWaiting);

      // Vérifier s'il y a déjà une mise à jour en attente
      const checkForUpdates = () => {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg?.waiting) {
            showUpdateBanner(reg);
          }
        });
      };

      // Vérifier les mises à jour immédiatement et périodiquement
      checkForUpdates();
      const updateInterval = setInterval(checkForUpdates, 60000); // Toutes les minutes

      // Démarrer le processus de mise à jour
      wb.register().catch(console.error);

      // Nettoyage
      return () => {
        wb.removeEventListener('waiting', handleWaiting);
        clearInterval(updateInterval);
      };
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Envoyer un message au Service Worker pour déclencher l'update
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Recharger la page une fois la mise à jour appliquée
      const handleStateChange = (e: Event) => {
        const target = e.target as ServiceWorker | null;
        if (target?.state === 'activated') {
          window.location.reload();
        }
      };
      
      registration.waiting.addEventListener('statechange', handleStateChange);
      
      // Nettoyer l'écouteur après 5 secondes pour éviter les fuites de mémoire
      setTimeout(() => {
        registration.waiting?.removeEventListener('statechange', handleStateChange);
      }, 5000);
    }
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 z-50">
      <div>
        <p className="font-medium">Une mise à jour est disponible !</p>
        <p className="text-sm opacity-90">Cliquez pour recharger et profiter des dernières améliorations.</p>
      </div>
      <button
        onClick={handleUpdate}
        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition-colors font-medium"
      >
        Mettre à jour
      </button>
    </div>
  );
};

export default UpdateNotification;
