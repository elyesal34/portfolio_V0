import Navbar from './components/Navbar';
import Accueil from './components/sections/Accueil';
import Contact from './components/sections/Contact';
import MentionsLegales from './components/sections/MentionsLegales';
import DataLoader from './components/DataLoader';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

// Lazy loading pour les sections volumineuses
const CV = lazy(() => import('./components/sections/CV'));
const AteliersPro = lazy(() => import('./components/sections/AteliersPro'));
const Stages = lazy(() => import('./components/sections/Stages'));
const Veilles = lazy(() => import('./components/sections/Veilles'));
const Competences = lazy(() => import('./components/sections/Competences'));
const Productions = lazy(() => import('./components/sections/Productions'));

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    console.log('🔄 ScrollToHash - pathname:', location.pathname, 'hash:', location.hash);
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash) as HTMLElement | null;
        console.log('📍 ScrollToHash - Élément trouvé:', element);
        if (element) {
          if (hash === '#contact') {
            // Pour Contact, offset spécial pour compenser le pt-40
            const elementPosition = element.offsetTop - 128;
            console.log('💬 ScrollToHash Contact - Position:', elementPosition + 'px (offset: 128px)');
            window.scrollTo({
              top: Math.max(0, elementPosition),
              behavior: 'smooth'
            });
          } else {
            // Pour les autres sections
            const navbarHeight = 80;
            const elementPosition = element.offsetTop - navbarHeight;
            console.log('🔧 ScrollToHash Standard - Position:', elementPosition + 'px (offset: 80px)');
            window.scrollTo({
              top: Math.max(0, elementPosition),
              behavior: 'smooth'
            });
          }
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
        {/* Skip to main content pour l'accessibilité */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 transition-all duration-200">
          Aller au contenu principal
        </a>
        <Navbar />
        <ScrollToHash />
        <main id="main-content" role="main">
          <Routes>
            <Route path="/" element={
              <>
                <Accueil />
                <DataLoader>
                  <CV />
                </DataLoader>
                <DataLoader>
                  <AteliersPro />
                </DataLoader>
                <DataLoader>
                  <Stages />
                </DataLoader>
                <DataLoader>
                  <Veilles />
                </DataLoader>
                <DataLoader>
                  <Competences />
                </DataLoader>
                <DataLoader>
                  <Productions />
                </DataLoader>
                <Contact />
              </>
            } />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;