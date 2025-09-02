// Test de sortie de base
console.log('Test de sortie standard');
console.error('Test d\'erreur standard');

// Test avec redirection de sortie
const fs = require('fs');
fs.writeFileSync('output-test.txt', 'Ceci est un test d\'écriture de fichier');

// Test d'erreur
setTimeout(() => {
  throw new Error('Test d\'erreur asynchrone');
}, 1000);
