// Vérification de la version de Node.js
const requiredVersion = 18;
const currentVersion = process.versions.node.split('.')[0];

console.log(`Node.js version actuelle: v${process.version}`);
console.log(`Version majeure: ${currentVersion}`);

if (parseInt(currentVersion, 10) < requiredVersion) {
  console.error(`\nERREUR: Node.js v${requiredVersion}+ est requis.`);
  console.error('Veuillez mettre à jour Node.js: https://nodejs.org/');
  process.exit(1);
}

console.log('\n✓ Version de Node.js compatible');

// Test minimal
console.log('\nExécution d\'un test minimal...');
const assert = require('assert');
try {
  assert.strictEqual(1 + 1, 2);
  console.log('✓ Test réussi !');
} catch (error) {
  console.error('✗ Test échoué:', error.message);
  process.exit(1);
}
