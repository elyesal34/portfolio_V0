import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import ThemeDemo from '../components/demo/ThemeDemo';
import Footer from '../components/Footer';
import Navbar from '../components/layout/Navbar';
import Competences from '../components/sections/about/Competences';
import Formation from '../components/sections/about/Formation';
import APropos from '../components/sections/about/APropos';
import Contact from '../components/sections/contact/Contact';
import Veilles from '../components/sections/content/Veilles';
import Accueil from '../components/sections/home/Accueil';
import AteliersPro from '../components/sections/projects/AteliersPro';
import Projets from '../components/sections/projects/Projets';
import Stages from '../components/sections/projects/Stages';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');

  // Gérer la section active basée sur le scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'a-propos', 'formation', 'ateliers', 'stages', 'competences', 'projets', 'veilles', 'contact'];
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

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Navbar />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/theme-demo" element={<ThemeDemo />} />
            <Route path="/*" element={
              <>
                <Accueil />
                <APropos />
                <Formation />
                <AteliersPro />
                <Stages />
                <Competences />
                <Projets />
                <Veilles />
                <Contact />
              </>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;