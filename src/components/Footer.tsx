import { memo } from 'react';
import { HashLink } from 'react-router-hash-link';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Elyes Allani. Tous droits réservés.
            </p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="/mentions-legales" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Mentions légales
            </a>
            <a 
              href="/politique-de-confidentialite" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Politique de confidentialité
            </a>
            <HashLink 
              to="/#contact" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </HashLink>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
