import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

// Extend the Window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

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
    { title: 'CV', hash: '/#cv', icon: '📄' },
    { title: 'Ateliers', hash: '/#ateliers', icon: '🔧' },
    { title: 'Stages', hash: '/#stages', icon: '🏢' },
    { title: 'Compétences', hash: '/#competences', icon: '💻' },
    { title: 'Productions', hash: '/#productions', icon: '📂' },
    { title: 'Veilles', hash: '/#veilles', icon: '🔍' },
    { title: 'Contact', hash: '/#contact', icon: '📧' },
    { title: 'Démo Thème', hash: '/theme-demo', icon: '🎨' },
  ], []);

  // Handle smooth scrolling to sections
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const targetId = hash.startsWith('/#') ? hash.substring(1) : hash;
    const targetElement = document.getElementById(targetId.replace('#', ''));

    if (targetElement) {
      const headerOffset = 80; // Navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      window.history.pushState({}, '', targetId);
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (mobileMenuRef.current && event.target instanceof Node && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
    };
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Vérifier chaque section
      const sections = ['accueil', 'cv', 'ateliers', 'stages', 'competences', 'productions', 'veilles', 'contact'];
      
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

    window.addEventListener('scroll', handleScroll as EventListener);
    handleScroll(); // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll as EventListener);
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll as EventListener);
    return () => window.removeEventListener('scroll', handleScroll as EventListener);
  }, []);

  return (
    <nav 
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      } dark:border-b dark:border-gray-800`}
      role="navigation" 
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              onClick={(e) => handleSmoothScroll(e, '/')}
            >
              <span className="text-xl font-bold">Portfolio</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.hash}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeSection === item.hash.replace('#', '')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-800/70'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
                onClick={(e) => handleSmoothScroll(e, item.hash)}
              >
                <span className="mr-2" aria-hidden="true">{item.icon}</span>
                {item.title}
              </a>
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
              aria-expanded="false"
              onClick={toggleMobileMenu}
              data-testid="mobile-menu-button"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
        ref={mobileMenuRef}
      >
        <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {menuItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              className={`${
                activeSection === item.hash
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(e, item.hash);
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="mr-2" aria-hidden="true">{item.icon}</span>
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
