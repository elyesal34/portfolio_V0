import { useEffect, useState } from 'react';

export default function ThemeDemo() {
  const [darkMode, setDarkMode] = useState(false);

  // Vérifie localStorage ou thème système
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Applique la classe dark sur <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 text-gray-900 dark:bg-[#121212] dark:text-[#EAEAEA]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <h1 className="text-xl font-bold">🌐 Mon Portfolio</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg transition-all duration-300 bg-black text-white hover:bg-gray-800 dark:bg-[#1E90FF] dark:hover:bg-[#4682B4] transform hover:scale-105 active:scale-95"
        >
          {darkMode ? (
            <span className="flex items-center">
              <span className="mr-2">☀️</span> Mode clair
            </span>
          ) : (
            <span className="flex items-center">
              <span className="mr-2">🌙</span> Mode sombre
            </span>
          )}
        </button>
      </nav>

      {/* Contenu principal */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Bienvenue sur mon portfolio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Carte 1 */}
          <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-[#1E1E1E] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="w-full h-40 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Idées créatives</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Des solutions innovantes pour vos projets les plus ambitieux.
            </p>
            <button className="w-full py-2 rounded-lg transition-colors duration-300 bg-blue-600 text-white hover:bg-blue-700 dark:bg-[#1E90FF] dark:hover:bg-[#4682B4]">
              En savoir plus
            </button>
          </div>

          {/* Carte 2 */}
          <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-[#1E1E1E] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="w-full h-40 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Développement rapide</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Des solutions performantes et optimisées pour un temps de développement réduit.
            </p>
            <button className="w-full py-2 rounded-lg transition-colors duration-300 bg-green-600 text-white hover:bg-green-700 dark:bg-[#10B981] dark:hover:bg-[#059669]">
              Découvrir
            </button>
          </div>

          {/* Carte 3 */}
          <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-[#1E1E1E] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="w-full h-40 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🎨</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Design moderne</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Des interfaces utilisateur élégantes et intuitives pour une expérience utilisateur exceptionnelle.
            </p>
            <button className="w-full py-2 rounded-lg transition-colors duration-300 bg-purple-600 text-white hover:bg-purple-700 dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]">
              Voir les projets
            </button>
          </div>
        </div>

        {/* Section supplémentaire */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white">
          <h3 className="text-2xl font-bold mb-4">Prêt à démarrer votre projet ?</h3>
          <p className="mb-6 text-blue-100 dark:text-blue-50">
            Contactez-moi dès aujourd'hui pour discuter de vos idées et voir comment je peux vous aider à les concrétiser.
          </p>
          <button className="px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105 active:scale-95">
            Me contacter
          </button>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Mon Portfolio. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
