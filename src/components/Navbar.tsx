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

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Portfolio Allani Elyes</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;