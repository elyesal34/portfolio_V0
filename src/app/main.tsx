import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import { registerServiceWorker } from '../utils/serviceWorker';

// Lazy initialize Google Analytics on idle or first interaction
function onFirstInteractionOnce(cb: () => void) {
  const handler = () => {
    window.removeEventListener('pointerdown', handler);
    window.removeEventListener('keydown', handler);
    cb();
  };
  window.addEventListener('pointerdown', handler, { once: true });
  window.addEventListener('keydown', handler, { once: true });
}

function initAnalyticsLazily() {
  const load = () => import('../utils/analytics').then(m => m.initGA()).catch(() => {});
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 1500);
  }
  onFirstInteractionOnce(load);
}

// Enregistrer le service worker en production
if (import.meta.env.PROD) {
  registerServiceWorker();
  initAnalyticsLazily();
}

// Composant racine avec gestion du mode hors ligne
function Root() {
  useEffect(() => {
    // Gestionnaire d'événement pour le mode hors ligne
    const handleOffline = () => {
      console.log('Mode hors ligne activé');
      // Vous pouvez ajouter ici une notification à l'utilisateur
    };

    const handleOnline = () => {
      console.log('Connexion rétablie');
      // Vérifier les mises à jour lors du retour en ligne
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update().catch(console.error);
        });
      }
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Nettoyage
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Rendu de l'application
createRoot(document.getElementById('root')!).render(<Root />);

// L'initialisation de l'analytique est maintenant déplacée dans le composant Root