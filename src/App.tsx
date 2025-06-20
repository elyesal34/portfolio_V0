import Navbar from './components/Navbar';
import Accueil from './components/sections/Accueil';
import CV from './components/sections/CV';
import AteliersPro from './components/sections/AteliersPro';
import Stages from './components/sections/Stages';
import Veilles from './components/sections/Veilles';
import Competences from './components/sections/Competences';
import Productions from './components/sections/Productions';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <Accueil />
        <CV />
        <AteliersPro />
        <Stages />
        <Veilles />
        <Competences />
        <Productions />
        <Contact />
      </main>
    </div>
  );
}

export default App;