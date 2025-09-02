import { memo } from 'react';
import { HashLink } from 'react-router-hash-link';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Elyes Allani. Tous droits réservés.
            </p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="/mentions-legales" 
              className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            >
              Mentions légales
            </a>
            <a 
              href="/politique-de-confidentialite" 
              className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            >
              Politique de confidentialité
            </a>
            <HashLink 
              to="/#contact" 
              className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
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
