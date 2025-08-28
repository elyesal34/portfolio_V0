import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useLocation } from 'react-router-dom';

import App from './App';
import { registerServiceWorker } from '../utils/serviceWorker';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy initialize Google Analytics only on first interaction (no idle preload)
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
  // Do not schedule on idle to avoid loading GA during Lighthouse run
  onFirstInteractionOnce(load);
}

// Enregistrer le service worker en production (après le 'load' pour éviter la chaîne critique)
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
  initAnalyticsLazily();
}

// Scroll to anchor with offset for fixed header
function AnchorScroller() {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace('#', ''));
      const element = document.getElementById(id);
      
      if (element) {
        // Small delay to ensure the page has rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Focus for keyboard navigation
          element.setAttribute('tabIndex', '-1');
          element.focus({ preventScroll: true });
        }, 100);
        
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [hash]);
  
  return null;
}

// Root component with offline mode and router
function Root() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Check for updates when coming back online
    if ('serviceWorker' in navigator && isOnline) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update().catch(console.error);
      });
    }
  }, [isOnline]);

  return (
    <StrictMode>
      <ErrorBoundary>
        {!isOnline && (
          <div 
            className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
            role="status"
            aria-live="polite"
          >
            Mode hors ligne activé
          </div>
        )}
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}

// Register service worker in production (after 'load' to avoid critical chain)
if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}

// Render the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
} else {
  console.error('Failed to find the root element');
}