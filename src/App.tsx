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