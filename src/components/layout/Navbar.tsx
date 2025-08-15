import { useState, useEffect } from 'react';
import { Menu, X, Code2, BookOpen, Briefcase, GraduationCap, Mail, Home, FileText, Brain, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'Accueil', icon: <Home size={18} />, hash: '#accueil' },
    { title: 'CV', icon: <FileText size={18} />, hash: '#cv' },
    { title: 'Ateliers Pro', icon: <Code2 size={18} />, hash: '#ateliers' },
    { title: 'Stages', icon: <Briefcase size={18} />, hash: '#stages' },
    { title: 'Compétences', icon: <Brain size={18} />, hash: '#competences' },
    { title: 'Productions', icon: <GraduationCap size={18} />, hash: '#productions' },
    { title: 'Veilles', icon: <BookOpen size={18} />, hash: '#veilles' },
    { title: 'Contact', icon: <Mail size={18} />, hash: '#contact' },
  ];

  const scrollToElement = (hash: string, attempt = 0) => {
    const element = document.querySelector(hash) as HTMLElement | null;
    if (!element) {
      // Système de retry avec délais croissants
      const retryDelays = [50, 150, 300, 600, 1000];
      if (attempt < retryDelays.length) {
        setTimeout(() => scrollToElement(hash, attempt + 1), retryDelays[attempt]);
      }
      return;
    }
    // Scroll déterministe avec offset pour la navbar fixe
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = 64; // navbar ~16 (pt-16) -> 64px
      const top = Math.max(absoluteTop - offset, 0);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  const handleMenuClick = (hash: string) => {
    setIsOpen(false);
    
    if (hash === '#accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
      return;
    }
    
    // Si déjà sur la page d'accueil, ne pas renaviguer: mettre à jour le hash et scroller
    if (location.pathname === '/') {
      navigate({ pathname: '/', hash });
      return;
    }

    // Sinon, navigation vers la page racine avec ancre explicite
    navigate({ pathname: '/', hash });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 h-16 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-gray-900'
        }`} 
        role="navigation" 
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => handleMenuClick('#accueil')}
                className={`text-xl font-bold transition-colors ${
                  isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-400'
                }`}
              >
                Elyes Allani
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleMenuClick(item.hash)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  aria-label={`Aller à la section ${item.title}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isOpen ? "true" : "false"}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 shadow-lg" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleMenuClick(item.hash)}
                  className="flex items-center space-x-2 px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors w-full text-left"
                  role="menuitem"
                  aria-label={`Aller à la section ${item.title}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
          aria-label="Retour en haut de la page"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default Navbar;
