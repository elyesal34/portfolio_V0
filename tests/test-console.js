// Simple console test
const fs = require('fs');

// Test 1: Basic console output
console.log('=== Test de sortie console ===');

// Test 2: File system access
try {
  const files = fs.readdirSync('.').slice(0, 5);
  console.log('Fichiers trouvés (max 5):', files.join(', '));
} catch (err) {
  console.error('Erreur de lecture du répertoire:', err.message);
}

// Test 3: Environment variables
console.log('\n=== Variables d\'environnement ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'non défini');
console.log('USER:', process.env.USERNAME || process.env.USER || 'inconnu');

// Test 4: Write to a file
try {
  const testFile = 'test-output.txt';
  fs.writeFileSync(testFile, 'Ceci est un test');
  console.log(`\nFichier créé: ${testFile}`);
  
  // Clean up
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
    console.log('Fichier de test supprimé');
  }
} catch (err) {
  console.error('Erreur d\'écriture de fichier:', err.message);
}

console.log('\n=== Fin du test ===');
