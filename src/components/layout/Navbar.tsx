import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Menu, X } from 'lucide-react';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

interface MenuItem {
  title: string;
  hash: string;
  icon: string;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Menu items with absolute paths for routing
  const menuItems = useMemo<MenuItem[]>(() => [
    { title: 'Accueil', hash: '/#accueil', icon: '🏠' },
    { title: 'À Propos', hash: '/#a-propos', icon: '👤' },
    { title: 'Compétences', hash: '/#competences', icon: '💻' },
    { title: 'Projets', hash: '/#projets', icon: '📂' },
    { title: 'Formation', hash: '/#formation', icon: '🎓' },
    { title: 'Contact', hash: '/#contact', icon: '📧' },
  ], []);

  // Handle smooth scrolling to sections
  const scrollWithOffset = useCallback((el: HTMLElement) => {
    const yOffset = el.id === 'contact' ? -160 : -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && event.target instanceof Node && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = ['accueil', 'a-propos', 'competences', 'projets', 'formation', 'contact'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`/#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll event for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-transparent'
      }`}
      role="navigation" 
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <HashLink
              to="/#accueil"
              scroll={scrollWithOffset}
              className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span className="text-xl font-bold">Portfolio</span>
            </HashLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <HashLink
                key={item.title}
                to={item.hash}
                scroll={scrollWithOffset}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeSection === item.hash
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
                aria-label={`Aller à la section ${item.title}`}
              >
                <span className="mr-2" aria-hidden="true">{item.icon}</span>
                {item.title}
              </HashLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <ThemeSwitcher />

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
          {menuItems.map((item) => (
            <HashLink
              key={item.hash}
              to={item.hash}
              scroll={scrollWithOffset}
              className={`${
                activeSection === item.hash
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                  : 'border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mr-2" aria-hidden="true">{item.icon}</span>
              {item.title}
            </HashLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;