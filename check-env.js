const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Vérification de l\'environnement ===');

// Vérifier la version de Node.js
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Impossible de vérifier la version de Node.js');
  process.exit(1);
}

// Vérifier si Vitest est installé
try {
  const vitestVersion = execSync('npx vitest --version', { stdio: 'pipe' }).toString().trim();
  console.log(`✅ Vitest version: ${vitestVersion}`);
} catch (error) {
  console.error('❌ Vitest n\'est pas correctement installé');
  console.log('Essayez d\'installer Vitest avec: npm install -D vitest');
  process.exit(1);
}

// Vérifier le fichier de configuration
const configFile = path.join(__dirname, 'vitest.config.mjs');
if (fs.existsSync(configFile)) {
  console.log(`✅ Fichier de configuration trouvé: ${configFile}`);
} else {
  console.error(`❌ Fichier de configuration non trouvé: ${configFile}`);
  process.exit(1);
}

// Vérifier les dépendances
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const requiredDeps = ['vitest', '@vitejs/plugin-react', 'jsdom', '@testing-library/react'];
  
  const missingDeps = requiredDeps.filter(dep => !pkg.devDependencies?.[dep] && !pkg.dependencies?.[dep]);
  
  if (missingDeps.length > 0) {
    console.error('❌ Dépendances manquantes:', missingDeps.join(', '));
    console.log('Installez-les avec: npm install -D ' + missingDeps.join(' '));
    process.exit(1);
  } else {
    console.log('✅ Toutes les dépendances nécessaires sont installées');
  }
} catch (error) {
  console.error('❌ Erreur lors de la vérification des dépendances:', error.message);
  process.exit(1);
}

console.log('\n=== Test de base ===');

try {
  console.log('Exécution d\'un test simple...');
  const result = execSync('npx vitest run simple.test.js', { stdio: 'pipe' });
  console.log('✅ Test exécuté avec succès');
  console.log(result.toString());
} catch (error) {
  console.error('❌ Erreur lors de l\'exécution du test:');
  console.error(error.stderr?.toString() || error.message);
  console.log('\n=== Informations supplémentaires ===');
  console.log('Essayez de réinstaller les dépendances:');
  console.log('1. Supprimez le dossier node_modules et package-lock.json');
  console.log('2. Exécutez: npm install');
  process.exit(1);
}
