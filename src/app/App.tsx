import { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/Footer';
import Accueil from '../components/sections/home/Accueil';
import CV from '../components/sections/about/CV';
import Competences from '../components/sections/about/Competences';
import AteliersPro from '../components/sections/projects/AteliersPro';
import Stages from '../components/sections/projects/Stages';
import Productions from '../components/sections/projects/Productions';
import Veilles from '../components/sections/content/Veilles';
import Contact from '../components/sections/contact/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gérer la section active basée sur le scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'cv', 'ateliers', 'stages', 'competences', 'productions', 'veilles', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={toggleMobileMenu}
        />
        
        <main id="main-content">
          <Accueil />
          <CV />
          <AteliersPro />
          <Stages />
          <Competences />
          <Productions />
          <Veilles />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;