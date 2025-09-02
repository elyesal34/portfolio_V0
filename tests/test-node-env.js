// Fichier de test pour vérifier l'environnement Node.js
const fs = require('fs');
const path = require('path');

console.log("=== Test d'environnement Node.js ===");

// 1. Informations système
console.log("\n1. Informations système:");
console.log(`- Node.js version: ${process.version}`);
console.log(`- Plateforme: ${process.platform} ${process.arch}`);
console.log(`- Répertoire courant: ${process.cwd()}`);

// 2. Test d'accès au système de fichiers
try {
  const files = fs.readdirSync('.').slice(0, 5);
  console.log("\n2. Fichiers dans le répertoire courant (max 5):");
  files.forEach(file => console.log(`   - ${file}`));
} catch (error) {
  console.error("\nErreur d'accès au système de fichiers:", error.message);
}

// 3. Test de calcul simple
console.log("\n3. Test de calcul simple:");
console.log(`   1 + 1 = ${1 + 1}`);

console.log("\n=== Fin du test ===");
