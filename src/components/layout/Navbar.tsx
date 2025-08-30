import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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
    { title: 'Accueil', hash: '/#accueil', icon: '🏠' },
    { title: 'À Propos', hash: '/#a-propos', icon: '👤' },
    { title: 'Compétences', hash: '/#competences', icon: '💻' },
    { title: 'Projets', hash: '/#projets', icon: '📂' },
    { title: 'Formation', hash: '/#formation', icon: '🎓' },
    { title: 'Contact', hash: '/#contact', icon: '📧' },
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
      
      menuItems.forEach(({ hash }) => {
        const section = document.getElementById(hash.replace('/#', ''));
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(hash);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll as EventListener);
    return () => window.removeEventListener('scroll', handleScroll as EventListener);
  }, [menuItems]);

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
      className={`fixed w-full z-50 h-16 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent border-b border-transparent'
      }`} 
      role="navigation" 
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a 
              href="/#accueil" 
              className="flex-shrink-0 flex items-center"
              onClick={(e) => handleSmoothScroll(e, '/#accueil')}
            >
              <span className="text-xl font-bold text-gray-900">Portfolio</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.hash}
                href={item.hash}
                className={`${
                  activeSection === item.hash
                    ? 'text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                onClick={(e) => handleSmoothScroll(e, item.hash)}
              >
                <span className="mr-2" aria-hidden="true">{item.icon}</span>
                {item.title}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
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
              onClick={(e) => handleSmoothScroll(e, item.hash)}
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
