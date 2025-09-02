// Test basique pour vérifier que Node.js fonctionne
console.log('=== Début du test basique ===');
console.log('Node.js version:', process.version);
console.log('=== Fin du test basique ===');

// Forcer la sortie immédiate
process.stdout.write('');
process.exit(0);
