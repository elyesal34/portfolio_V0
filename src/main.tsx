import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Optimisation du rendu initial
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Rendu optimisé avec gestion d'erreur
try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  // Fallback simple en cas d'erreur
  rootElement.innerHTML = '<div style="padding: 2rem; text-align: center; font-family: system-ui;">Chargement en cours...</div>';
}