const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Vérification des dépendances ===');

// Vérifier si node_modules existe
const nodeModulesExist = fs.existsSync(path.join(__dirname, 'node_modules'));
console.log(`node_modules existe: ${nodeModulesExist ? '✓' : '✗'}`);

// Vérifier les dépendances clés
const requiredDeps = ['vitest', '@vitejs/plugin-react', 'jsdom', '@testing-library/react', '@testing-library/jest-dom'];

console.log('\nDépendances installées:');
let allDepsInstalled = true;

requiredDeps.forEach(dep => {
  try {
    const depPath = require.resolve(dep);
    const version = require(path.join(path.dirname(depPath), 'package.json')).version;
    console.log(`✓ ${dep}@${version}`);
  } catch (e) {
    console.log(`✗ ${dep} non installé`);
    allDepsInstalled = false;
  }
});

if (!allDepsInstalled) {
  console.log('\nInstallation des dépendances manquantes...');
  try {
    execSync('npm install --save-dev ' + requiredDeps.join(' '), { stdio: 'inherit' });
    console.log('✓ Dépendances installées avec succès');
  } catch (error) {
    console.error('✗ Erreur lors de l\'installation des dépendances:', error.message);
  }
}

console.log('\n=== Fin de la vérification ===');
