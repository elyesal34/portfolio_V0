const fs = require('fs');
const path = require('path');

// Liste des fichiers à supprimer
const filesToRemove = [
  // Fichiers de débogage
  'debug-simple.js',
  'debug-test.js',
  'diagnose-node.ps1',
  'minimal-test.js',
  'output-test.txt',
  'run-node-script.ps1',
  'run-test.bat',
  'run-vitest-debug.bat',
  'run-vitest-debug.js',
  'run-vitest-debug.ps1',
  'runtime-init.js',
  'simple-node-test.js',
  'simple-test-runner.js',
  'simple-test-vitest.js',
  'simple-test.js',
  'simple-vitest-test.js',
  'temp-test.js',
  'test.html',
  
  // Fichiers de configuration Vitest en double
  'vitest-minimal-test.js',
  'vitest-runner.js',
  'vitest-simple-test.js',
  'vitest-test-simple.js',
  'vitest-test.js',
  'vitest.config.js',
  'vitest.minimal.config.js',
  'vitest.minimal.config.mjs',
  'vitest.minimal.config.ts',
  'vite.minimal.config.js',
  'vite.config.simple.ts',
  
  // Fichiers de vérification
  'vitest-check.js'
];

// Fonction pour supprimer un fichier de manière sécurisée
function removeFile(filePath) {
  try {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✅ Supprimé: ${filePath}`);
      return true;
    }
    console.log(`ℹ️ Non trouvé: ${filePath}`);
    return false;
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression de ${filePath}:`, error.message);
    return false;
  }
}

// Exécution du nettoyage
console.log('🚀 Début du nettoyage...\n');

let removedCount = 0;
filesToRemove.forEach(file => {
  if (removeFile(file)) {
    removedCount++;
  }
});

console.log(`\n✅ Nettoyage terminé ! ${removedCount} fichiers ont été supprimés.`);
