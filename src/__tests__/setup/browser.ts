// Configuration pour les tests dans un environnement navigateur
import { expect, vi, beforeEach, afterEach } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

// Déclarer les types globaux manquants
declare global {
  interface Window {
    scrollTo: {
      (options?: ScrollToOptions): void;
      (x: number, y: number): void;
    };
  }
}

// Étendre les assertions de Vitest avec celles de jest-dom
expect.extend(matchers);

// Mocks globaux
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock pour la fonction de défilement de la fenêtre
 * Évite les erreurs lors des appels à window.scrollTo()
 */
window.scrollTo = vi.fn();

// Sauvegarde de la fonction console.error originale
const originalConsoleError = console.error;

// Erreurs connues de JSDOM à ignorer
const IGNORED_ERRORS = [
  'Error: Could not parse CSS stylesheet',
  'Error: The operation is insecure',
];

/**
 * Remplacement de console.error pour ignorer les erreurs spécifiques à JSDOM
 * @param args Arguments passés à console.error
 */
console.error = (...args: unknown[]) => {
  const hasIgnoredError = args.some(arg => 
    typeof arg === 'string' && IGNORED_ERRORS.some(err => arg.includes(err))
  );
  
  if (!hasIgnoredError) {
    originalConsoleError(...args);
  }
};

// Configuration pour les tests de composants React
beforeEach(() => {
  // Réinitialiser les mocks avant chaque test
  vi.clearAllMocks();
});

afterEach(() => {
  // Nettoyer après chaque test
  vi.restoreAllMocks();
});
