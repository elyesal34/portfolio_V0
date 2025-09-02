import { memo } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const scrollWithOffset = (el: HTMLElement) => {
    const yOffset = el.id === 'contact' ? -160 : -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/elyes-allani-034607174/',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/elyesal34',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    }
  ];

  const quickLinks = [
    { name: 'Accueil', hash: '/#accueil' },
    { name: 'À Propos', hash: '/#a-propos' },
    { name: 'Projets', hash: '/#projets' },
    { name: 'Contact', hash: '/#contact' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Informations principales */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Elyes Allani</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4 leading-relaxed">
              Étudiant en BTS SIO SLAM passionné par le développement web et mobile. 
              Toujours à la recherche de nouveaux défis techniques et d'opportunités d'apprentissage.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 dark:text-gray-500">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:allanielyes34@gmail.com" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  allanielyes34@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-400 dark:text-gray-500">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+33652809798" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  06 52 80 97 98
                </a>
              </div>
              <div className="flex items-center text-gray-400 dark:text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Montpellier, France</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <HashLink
                    to={link.hash}
                    scroll={scrollWithOffset}
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                  >
                    {link.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-moi</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 dark:text-gray-500 ${social.color} transition-colors p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/cv-elyes-allani.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                <span>Télécharger mon CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                © {currentYear} Elyes Allani. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="/mentions-legales" 
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                Mentions légales
              </a>
              <a 
                href="/politique-de-confidentialite" 
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;