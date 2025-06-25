import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, BookOpen, Briefcase, GraduationCap, Mail, Home, FileText, Brain, ChevronUp } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    { title: 'Accueil', icon: <Home size={18} />, href: '#accueil' },
    { title: 'CV', icon: <FileText size={18} />, href: '#cv' },
    { title: 'Ateliers Pro', icon: <Code2 size={18} />, href: '#ateliers' },
    { title: 'Stages', icon: <Briefcase size={18} />, href: '#stages' },
    { title: 'Veilles', icon: <BookOpen size={18} />, href: '#veilles' },
    { title: 'Compétences', icon: <Brain size={18} />, href: '#competences' },
    { title: 'Productions', icon: <GraduationCap size={18} />, href: '#productions' },
    { title: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  const handleMenuClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
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
                  onClick={() => handleMenuClick(item.href)}
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
                aria-expanded={isOpen}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleMenuClick(item.href)}
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