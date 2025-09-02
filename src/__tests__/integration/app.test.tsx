// Exemple de test d'intégration
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Composant de test
function App() {
  return (
    <div>
      <h1>Mon Application</h1>
      <nav>
        <a href="/">Accueil</a>
        <a href="/about">À propos</a>
      </nav>
      <main>Contenu principal</main>
    </div>
  );
}

describe('Intégration - Application', () => {
  it('devrait afficher la navigation et le contenu principal', () => {
    // Rendu du composant avec le routeur
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Vérifications
    expect(screen.getByRole('heading', { name: /mon application/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Contenu principal');
    
    // Vérification des liens de navigation
    const homeLink = screen.getByRole('link', { name: /accueil/i });
    const aboutLink = screen.getByRole('link', { name: /à propos/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
