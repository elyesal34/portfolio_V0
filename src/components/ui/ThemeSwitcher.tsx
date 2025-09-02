import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  // Vérifie le localStorage OU le thème système au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Détection du thème système
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Applique la classe "dark" sur <html> et sauvegarde le choix
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      aria-label={`Basculer en mode ${darkMode ? 'clair' : 'sombre'}`}
      title={`Basculer en mode ${darkMode ? 'clair' : 'sombre'}`}
    >
      <span className="sr-only">
        {darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
      </span>
      <span aria-hidden="true">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
