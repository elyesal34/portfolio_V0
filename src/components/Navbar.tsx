import React from 'react';
import { Menu, X, Code2, BookOpen, Briefcase, GraduationCap, Mail, Home, FileText, Brain } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { title: 'Accueil', icon: <Home size={20} />, href: '#accueil' },
    { title: 'CV', icon: <FileText size={20} />, href: '#cv' },
    { title: 'Ateliers Pro', icon: <Code2 size={20} />, href: '#ateliers' },
    { title: 'Stages', icon: <Briefcase size={20} />, href: '#stages' },
    { title: 'Veilles', icon: <BookOpen size={20} />, href: '#veilles' },
    { title: 'Compétences', icon: <Brain size={20} />, href: '#competences' },
    { title: 'Productions', icon: <GraduationCap size={20} />, href: '#productions' },
    { title: 'Contact', icon: <Mail size={20} />, href: '#contact' },
  ];

  const handleMenuClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50" role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Portfolio Allani Elyes</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleMenuClick(item.href)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="md:hidden" role="menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleMenuClick(item.href)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
};

export default Navbar;