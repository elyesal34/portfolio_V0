import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './globals.css';

// Masquer l'écran de chargement
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.remove(), 300);
  }
};

// Initialiser l'application
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Masquer l'écran de chargement une fois l'app montée
setTimeout(hideLoadingScreen, 100);