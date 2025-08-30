import { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { AriaAttributes, DOMAttributes } from 'react';

// Étendre les propriétés HTML pour inclure l'attribut inert
declare global {
  namespace JSX {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      inert?: '' | 'true' | 'false';
    }
  }
}

import { Menu, X, Code2, BookOpen, Briefcase, GraduationCap, Mail, Home, FileText, Brain, ChevronUp } from '../../icons/lucide';

interface NavbarProps {
  activeSection: string;
  onAnchorClick?: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const Navbar = ({ 
  activeSection, 
  isMobileMenuOpen, 
  onMobileMenuToggle 
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Gérer l'attribut inert et la navigation au clavier
  useEffect(() => {
    const menuElement = mobileMenuRef.current;
    if (!menuElement) return;

    if (!isMobileMenuOpen) {
      menuElement.setAttribute('inert', 'true');
    } else {
      menuElement.removeAttribute('inert');
      
      // Gérer la navigation au clavier
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onMobileMenuToggle();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileMenuOpen, onMobileMenuToggle]);

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
    { title: 'Accueil', icon: 'Home', hash: '#accueil' },
    { title: 'CV', icon: 'FileText', hash: '#cv' },
    { title: 'Ateliers Pro', icon: 'Code2', hash: '#ateliers' },
    { title: 'Stages', icon: 'Briefcase', hash: '#stages' },
    { title: 'Compétences', icon: 'Brain', hash: '#competences' },
    { title: 'Productions', icon: 'GraduationCap', hash: '#productions' },
    { title: 'Veilles', icon: 'BookOpen', hash: '#veilles' },
    { title: 'Contact', icon: 'Mail', hash: '#contact' },
  ];

  const scrollWithOffset = (el: HTMLElement) => {
    const yOffset = el.id === 'contact' ? -160 : -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };


  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home size={18} />;
      case 'FileText': return <FileText size={18} />;
      case 'Code2': return <Code2 size={18} />;
      case 'Briefcase': return <Briefcase size={18} />;
      case 'Brain': return <Brain size={18} />;
      case 'GraduationCap': return <GraduationCap size={18} />;
      case 'BookOpen': return <BookOpen size={18} />;
      case 'Mail': return <Mail size={18} />;
      default: return null;
    }
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 h-16 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-gray-900 border-b border-transparent'
        }`} 
        role="navigation" 
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <HashLink
                to="/#accueil"
                scroll={scrollWithOffset}
                className={`text-xl font-bold transition-colors ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-blue-600 hover:underline underline-offset-4' 
                    : 'text-white hover:text-blue-300 hover:underline underline-offset-4'
                }`}
              >
                Elyes Allani
              </HashLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                return (
                <HashLink
                  key={item.title}
                  to={item.hash}
                  scroll={scrollWithOffset}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-100 hover:text-white hover:bg-gray-800'
                  }`}
                  aria-label={`Aller à la section ${item.title}`}
                >
                  {getIcon(item.icon)}
                  <span>{item.title}</span>
                </HashLink>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={onMobileMenuToggle}
                className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-haspopup="true"
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          id="mobile-menu" 
          className={`md:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'max-h-[85vh] overflow-y-auto' 
              : 'max-h-0 overflow-hidden pointer-events-none'
          }`}
          aria-hidden={!isMobileMenuOpen}
          aria-live="polite"
          data-inert={!isMobileMenuOpen ? 'true' : undefined}
        >
          <nav aria-label="Navigation mobile">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                return (
                  <HashLink
                    key={item.title}
                    to={item.hash}
                    scroll={scrollWithOffset}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-lg text-base font-medium transition-colors w-full text-left ${
                      activeSection === item.hash.substring(1) 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => onMobileMenuToggle()}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                  >
                    {getIcon(item.icon)}
                    <span>{item.title}</span>
                  </HashLink>
                );
              })}
            </div>
          </nav>
        </div>
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <HashLink
          to="/#accueil"
          scroll={scrollWithOffset}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
          aria-label="Retour en haut de la page"
        >
          <ChevronUp size={24} />
        </HashLink>
      )}
    </>
  );
};

export default Navbar;
