import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OfflineError = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (isOnline) {
    return null; // Ne rien afficher si en ligne
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl text-center">
        <div className="text-6xl mb-4">📶</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Vous êtes actuellement hors ligne
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Certaines fonctionnalités pourraient ne pas être disponibles. 
          Vérifiez votre connexion Internet et réessayez.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Actualiser la page
          </button>
          
          <Link
            to="/"
            className="block w-full text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-2 px-4"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfflineError;
