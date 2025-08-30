import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Accueil from '../components/sections/home/Accueil';

// Composant de chargement pour les imports dynamiques
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Enhanced lazy loading with retry and better error handling

// Composants chargés de manière paresseuse avec gestion d'erreur simplifiée
const withSuspense = (Component: React.ComponentType) => (props: any) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component {...props} />
  </Suspense>
);

// Composants chargés de manière dynamique
const CV = lazy(() => import('../components/sections/about/TestCV'));
const Competences = lazy(() => import('../components/sections/about/Competences'));
const Contact = lazy(() => import('../components/sections/contact/Contact'));
const AteliersPro = lazy(() => import('../components/sections/projects/AteliersPro'));
const Stages = lazy(() => import('../components/sections/projects/Stages'));
const Productions = lazy(() => import('../components/sections/projects/Productions'));
const Projets = lazy(() => import('../components/sections/projects/Projets'));
const Veilles = lazy(() => import('../components/sections/content/Veilles'));

// Composants avec Suspense intégré
const CvWithSuspense = withSuspense(CV);
const CompetencesWithSuspense = withSuspense(Competences);
const ContactWithSuspense = withSuspense(Contact);
const AteliersProWithSuspense = withSuspense(AteliersPro);
const StagesWithSuspense = withSuspense(Stages);
const ProductionsWithSuspense = withSuspense(Productions);
const ProjetsWithSuspense = withSuspense(Projets);
const VeillesWithSuspense = withSuspense(Veilles);

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Gestion du menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Gérer la fermeture du menu mobile lors du changement de route
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen, location.pathname]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Barre de navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">Portfolio</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-1">
                <NavLink to="/cv">CV</NavLink>
                <NavLink to="/competences">Compétences</NavLink>
                <NavLink to="/projets">Projets</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>
            
            {/* Bouton menu mobile */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="outline-none mobile-menu-button"
                aria-label="Menu mobile"
              >
                <svg className="w-6 h-6 text-gray-500 hover:text-blue-500"
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Menu mobile */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/cv" onClick={toggleMobileMenu}>CV</MobileNavLink>
            <MobileNavLink to="/competences" onClick={toggleMobileMenu}>Compétences</MobileNavLink>
            <MobileNavLink to="/projets" onClick={toggleMobileMenu}>Projets</MobileNavLink>
            <MobileNavLink to="/contact" onClick={toggleMobileMenu}>Contact</MobileNavLink>
            <MobileNavLink to="/stages" onClick={toggleMobileMenu}>Stages</MobileNavLink>
            <MobileNavLink to="/ateliers-pro" onClick={toggleMobileMenu}>Ateliers Pro</MobileNavLink>
            <MobileNavLink to="/veilles" onClick={toggleMobileMenu}>Veilles</MobileNavLink>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/cv" element={<CvWithSuspense />} />
            <Route path="/competences" element={<CompetencesWithSuspense />} />
            <Route path="/projets" element={<ProjetsWithSuspense />} />
            <Route path="/contact" element={<ContactWithSuspense />} />
            <Route path="/stages" element={<StagesWithSuspense />} />
            <Route path="/ateliers-pro" element={<AteliersProWithSuspense />} />
            <Route path="/veilles" element={<VeillesWithSuspense />} />
            <Route path="/productions" element={<ProductionsWithSuspense />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

// Composant pour les liens de navigation
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`py-4 px-2 ${
        isActive 
          ? 'text-blue-500 border-b-2 border-blue-500' 
          : 'text-gray-500 hover:text-blue-500'
      } font-medium`}
    >
      {children}
    </Link>
  );
}

// Composant pour les liens du menu mobile
function MobileNavLink({ to, children, onClick }: { 
  to: string; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

// Composant pour la page 404
function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
      <Link 
        to="/" 
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
      >
        Retour à l'accueil
      </Link>
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