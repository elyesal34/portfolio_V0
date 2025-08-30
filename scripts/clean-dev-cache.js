// Script pour nettoyer les caches du navigateur en développement
import { existsSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dossier de cache de Vite
const cacheDir = join(__dirname, '..', 'node_modules', '.vite');

// Supprimer le cache Vite
if (existsSync(cacheDir)) {
  console.log('Nettoyage du cache Vite...');
  rmSync(cacheDir, { recursive: true, force: true });
  console.log('Cache Vite nettoyé avec succès');
}

// Désenregistrer les service workers enregistrés
console.log('Désenregistrement des service workers...');

// Ceci est un script qui sera exécuté dans le navigateur
const browserScript = `
// Désenregistrer tous les service workers
async function unregisterServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (let registration of registrations) {
    console.log('Désenregistrement du service worker:', registration.scope);
    await registration.unregister();
  }
  
  // Supprimer tous les caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => {
        console.log('Suppression du cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
  }
  
  console.log('Nettoyage terminé. Rechargez la page pour continuer.');
  return true;
}

unregisterServiceWorkers().then(success => {
  if (success) {
    console.log('Tous les service workers ont été désenregistrés avec succès');
  }
}).catch(error => {
  console.error('Erreur lors du désenregistrement des service workers:', error);
});
`;

console.log('Instructions pour terminer le nettoyage :');
console.log('1. Ouvrez les outils de développement (F12)');
console.log('2. Allez dans l\'onglet "Console"');
console.log('3. Copiez-collez le code suivant :\n');
console.log(browserScript);
console.log('\n4. Appuyez sur Entrée pour exécuter le script');
console.log('5. Rechargez la page (Ctrl+F5) pour terminer le nettoyage');
