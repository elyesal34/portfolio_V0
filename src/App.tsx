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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Skip to main content pour l'accessibilité */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 transition-all duration-200">
          Aller au contenu principal
        </a>
        <Navbar />
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