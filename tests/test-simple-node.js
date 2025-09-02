// Test simple de Node.js
console.log('=== Test de Node.js ===');
console.log(`Node.js version: ${process.version}`);
console.log('Plateforme:', process.platform);
console.log('Architecture:', process.arch);

// Tester l'accès au système de fichiers
const fs = require('fs');
try {
  fs.writeFileSync('test-file.txt', 'Ceci est un test');
  console.log('Écriture du fichier réussie');
  
  const content = fs.readFileSync('test-file.txt', 'utf8');
  console.log('Contenu du fichier:', content);
  
  fs.unlinkSync('test-file.txt');
  console.log('Fichier de test supprimé');
} catch (error) {
  console.error('Erreur lors du test du système de fichiers:', error.message);
}

console.log('=== Fin du test ===');
