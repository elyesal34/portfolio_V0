import { useState, useEffect, type ComponentType } from 'react';

interface NavbarProps {
  activeSection: string;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const Navbar = ({ 
  activeSection, 
  onAnchorClick, 
  isMobileMenuOpen, 
  onMobileMenuToggle 
}: NavbarProps) => {
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

  type IconName = 'Menu' | 'X' | 'Code2' | 'BookOpen' | 'Briefcase' | 'GraduationCap' | 'Mail' | 'Home' | 'FileText' | 'Brain' | 'ChevronUp';
  type IconsModule = Partial<Record<IconName, ComponentType<{ size?: number; color?: string; className?: string }>>>;
  const [icons, setIcons] = useState<IconsModule | null>(null);

  useEffect(() => {
    // Charger uniquement les icônes nécessaires via un wrapper minimal
    const load = () => import('../../icons/lucideNavbar')
      .then((m) => setIcons(m as unknown as IconsModule))
      .catch(() => {});
    if ('requestIdleCallback' in window) {
      const win = window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      };
      const ric = win.requestIdleCallback;
      if (typeof ric === 'function') {
        ric(load, { timeout: 2000 });
      } else {
        setTimeout(load, 0);
      }
    } else {
      setTimeout(load, 0);
    }
  }, []);

  const menuItems: { title: string; icon: IconName; hash: string }[] = [
    { title: 'Accueil', icon: 'Home', hash: '#accueil' },
    { title: 'CV', icon: 'FileText', hash: '#cv' },
    { title: 'Ateliers Pro', icon: 'Code2', hash: '#ateliers' },
    { title: 'Stages', icon: 'Briefcase', hash: '#stages' },
    { title: 'Compétences', icon: 'Brain', hash: '#competences' },
    { title: 'Productions', icon: 'GraduationCap', hash: '#productions' },
    { title: 'Veilles', icon: 'BookOpen', hash: '#veilles' },
    { title: 'Contact', icon: 'Mail', hash: '#contact' },
  ];

  // Suppression du scrollWithOffset : la logique de scroll centralisée est maintenant dans App.tsx

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onAnchorClick(e, id);
    onMobileMenuToggle();
  };
  
  const handleMobileMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.location.hash = id;
    window.dispatchEvent(new Event('hashchange'));
    onAnchorClick(e, id);
    onMobileMenuToggle();
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
              <a
                href="/#accueil"
                className={`text-xl font-bold transition-colors ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-blue-600 hover:underline underline-offset-4' 
                    : 'text-white hover:text-blue-300 hover:underline underline-offset-4'
                }`}
                onClick={(e) => handleMenuClick(e, 'accueil')}
              >
                Elyes Allani
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = icons?.[item.icon];
                return (
                <a
                  key={item.title}
                  href={item.hash}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-100 hover:text-white hover:bg-gray-800'
                  }`}
                  aria-label={`Aller à la section ${item.title}`}
                  onClick={(e) => handleMenuClick(e, item.hash.substring(1))}
                >
                  {Icon ? <Icon size={18} /> : null}
                  <span>{item.title}</span>
                </a>
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
                {icons ? (
                  isMobileMenuOpen ? (icons.X ? <icons.X size={24} /> : '✕') : (icons.Menu ? <icons.Menu size={24} /> : '≡')
                ) : (
                  isMobileMenuOpen ? '✕' : '≡'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu" 
          className={`md:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav aria-label="Navigation mobile">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = icons?.[item.icon];
                return (
                  <a
                    key={item.title}
                    href={item.hash}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-lg text-base font-medium transition-colors w-full text-left ${
                      activeSection === item.hash.substring(1) 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={(e) => handleMobileMenuClick(e, item.hash.substring(1))}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                  >
                    {Icon ? <Icon size={18} /> : null}
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <a
          href="/#accueil"
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
          aria-label="Retour en haut de la page"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = 'accueil';
            window.dispatchEvent(new Event('hashchange'));
          }}
        >
          {icons?.ChevronUp ? <icons.ChevronUp size={24} /> : <span aria-hidden>↑</span>}
        </a>
      )}
    </>
  );
};

export default Navbar;
