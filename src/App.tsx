import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Accueil from './components/sections/Accueil';
import MentionsLegales from './components/sections/MentionsLegales';

// Lazy loading des composants pour optimiser le chargement initial
const Competences = lazy(() => import('./components/sections/Competences'));
const Productions = lazy(() => import('./components/sections/Productions'));
const Veilles = lazy(() => import('./components/sections/Veilles'));
const Contact = lazy(() => import('./components/sections/Contact'));

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash) as HTMLElement | null;
        if (element) {
          const navbarHeight = 80; // Hauteur approx. de la navbar
          const elementPosition = element.offsetTop - navbarHeight;
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);
  return null;
}

function App() {
  useEffect(() => {
    const lcpText = document.getElementById('lcp-text');
    if (lcpText) lcpText.style.visibility = 'hidden';
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 transition-all duration-200">
          Aller au contenu principal
        </a>
        <Navbar />
        <ScrollToHash />
        <main id="main-content" role="main">
          <Suspense fallback={<div className="h-screen w-full flex justify-center items-center"><p>Chargement...</p></div>}>
            <Routes>
              <Route path="/" element={
                <>
                  <Accueil />
                  <Competences />
                  <Productions />
                  <Veilles />
                  <Contact />
                </>
              } />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;