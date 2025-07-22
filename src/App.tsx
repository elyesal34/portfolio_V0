import Navbar from './components/Navbar';
import Accueil from './components/sections/Accueil';
import CV from './components/sections/CV';
import AteliersPro from './components/sections/AteliersPro';
import Stages from './components/sections/Stages';
import Veilles from './components/sections/Veilles';
import Competences from './components/sections/Competences';
import Productions from './components/sections/Productions';
import Contact from './components/sections/Contact';
import MentionsLegales from './components/sections/MentionsLegales';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProjectCard from './components/ProjectCard/ProjectCard.tsx';

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    console.log('🔄 ScrollToHash - pathname:', location.pathname, 'hash:', location.hash);
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        console.log('📍 ScrollToHash - Élément trouvé:', element);
        if (element) {
          if (hash === '#contact') {
            // Pour Contact, offset spécial
            const elementPosition = element.offsetTop - 120;
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
    if (lcpText) lcpText.style.display = 'none';
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
                <CV />
                <AteliersPro />
                <Stages />
                <Veilles />
                <Competences />
                <Productions />
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