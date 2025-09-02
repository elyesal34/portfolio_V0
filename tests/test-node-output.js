// Test simple de sortie Node.js
const fs = require('fs');

console.log('Test de sortie standard');
console.error('Test d\'erreur standard');

// Écrire dans un fichier
fs.writeFileSync('test-node-output.txt', 'Ceci est un test d\'écriture depuis Node.js');

console.log('Fin du test');
