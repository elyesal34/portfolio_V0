import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

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

// Initialize Google Analytics lazily
function initAnalyticsLazily() {
  const load = () => import('../utils/analytics').then(m => m.initGA()).catch(() => {});
  // Do not schedule on idle to avoid loading GA during Lighthouse run
  onFirstInteractionOnce(load);
}

// Initialize Google Analytics after user interaction in production
if (import.meta.env.PROD) {
  initAnalyticsLazily();
  // Only register service worker in production
  import('../utils/serviceWorker').then(({ registerServiceWorker }) => {
    registerServiceWorker();
  });
} else {
  // En mode développement, on désactive complètement le service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
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

// Render the app
const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

// Create root and render the app
const root = createRoot(container);
root.render(<Root />);

// Register service worker in production (after initial render to avoid blocking the main thread)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // Small delay to ensure the app is interactive first
  setTimeout(() => {
    registerServiceWorker().catch(console.error);
  }, 1000);
}