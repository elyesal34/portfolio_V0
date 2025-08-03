import Navbar from './components/Navbar';
import Accueil from './components/sections/Accueil';
import Contact from './components/sections/Contact';
import MentionsLegales from './components/sections/MentionsLegales';
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
            const elementPosition = element.offsetTop - 160;
            console.log('💬 ScrollToHash Contact - Position:', elementPosition + 'px');
            window.scrollTo({
              top: Math.max(0, elementPosition),
              behavior: 'smooth'
            });
          } else {
            // Pour les autres sections
            const navbarHeight = 80;
            const elementPosition = element.offsetTop - navbarHeight;
            console.log('🔧 ScrollToHash Standard - Position:', elementPosition + 'px');
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
                <Suspense fallback={<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement du CV...</p>
                  </div>
                </div>}>
                  <CV />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des ateliers...</p>
                  </div>
                </div>}>
                  <AteliersPro />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des stages...</p>
                  </div>
                </div>}>
                  <Stages />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des veilles...</p>
                  </div>
                </div>}>
                  <Veilles />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des compétences...</p>
                  </div>
                </div>}>
                  <Competences />
                </Suspense>
                <Suspense fallback={<div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des productions...</p>
                  </div>
                </div>}>
                  <Productions />
                </Suspense>
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