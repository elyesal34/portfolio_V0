import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

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

if (import.meta.env.PROD) {
  initAnalyticsLazily();
}