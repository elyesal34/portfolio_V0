import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, BrowserRouter } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/Footer';
import Accueil from '../components/sections/home/Accueil';

// Lazy-loaded components
const CV = lazy(() => import('../components/sections/about/CV.tsx'));
const Competences = lazy(() => import('../components/sections/about/Competences'));
const Contact = lazy(() => import('../components/sections/contact/Contact'));
const AteliersPro = lazy(() => import('../components/sections/projects/AteliersPro'));
const Stages = lazy(() => import('../components/sections/projects/Stages'));
const Productions = lazy(() => import('../components/sections/projects/Productions'));
const Veilles = lazy(() => import('../components/sections/content/Veilles'));

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const location = useLocation();

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar 
        activeSection={activeSection} 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
      />
      
      <main className="flex-grow">
        <section id="accueil" className="min-h-screen pt-16 scroll-mt-16">
          <Accueil />
        </section>

        <section id="cv" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement du CV...</div>}>
            <CV />
          </Suspense>
        </section>

        <section id="ateliers" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des compétences...</div>}>
            <AteliersPro />
          </Suspense>
        </section>

        <section id="stages" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des projets...</div>}>
            <Stages />
          </Suspense>
        </section>

        <section id="competences" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des compétences...</div>}>
            <Competences />
          </Suspense>
        </section>

        <section id="productions" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des productions...</div>}>
            <Productions />
          </Suspense>
        </section>

        <section id="veilles" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des veilles...</div>}>
            <Veilles />
          </Suspense>
        </section>

        <section id="contact" className="min-h-screen pt-16 scroll-mt-16">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement du formulaire de contact...</div>}>
            <Contact />
          </Suspense>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;