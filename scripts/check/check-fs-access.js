// Script pour vérifier les permissions et l'accès au système de fichiers
import { readdirSync, statSync, writeFileSync, readFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('=== Vérification des permissions et accès ===');

// 1. Vérifier le répertoire courant
const currentDir = __dirname;
console.log('\n1. Répertoire courant:');
console.log(`   Chemin: ${currentDir}`);

// 2. Vérifier les permissions en lecture
try {
  const files = readdirSync('.').slice(0, 5);
  console.log('\n2. Lecture du répertoire réussie. Exemples de fichiers:');
  files.forEach(file => {
    const stats = statSync(file);
    console.log(`   - ${file} (${stats.size} octets, ${stats.isDirectory() ? 'dossier' : 'fichier'})`);
  });
} catch (err) {
  console.error('\n2. Erreur de lecture du répertoire:', err.message);
}

// 3. Tester l'écriture
const testFile = join(currentDir, 'test-write.txt');
try {
  writeFileSync(testFile, 'Ceci est un test');
  console.log('\n3. Test d\'écriture réussi');
  
  // Vérifier la lecture du fichier
  const content = readFileSync(testFile, 'utf8');
  console.log(`   Contenu du fichier: "${content}"`);
  
  // Supprimer le fichier de test
  unlinkSync(testFile);
  console.log('   Fichier de test supprimé');
} catch (err) {
  console.error('\n3. Erreur lors du test d\'écriture:', err.message);
}

// 4. Vérifier les variables d'environnement
console.log('\n4. Variables d\'environnement:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'non défini'}`);
console.log(`   USER: ${process.env.USERNAME || process.env.USER || 'inconnu'}`);
console.log(`   TEMP: ${process.env.TEMP || 'non défini'}`);

// 5. Vérifier l'accès à node_modules
const nodeModulesPath = join(currentDir, 'node_modules');
try {
  const hasNodeModules = existsSync(nodeModulesPath);
  console.log('\n5. Vérification de node_modules:');
  console.log(`   node_modules existe: ${hasNodeModules ? 'oui' : 'non'}`);
  
  if (hasNodeModules) {
    const modules = readdirSync(nodeModulesPath).filter(
      item => !item.startsWith('.')
    ).slice(0, 5);
    console.log('   Exemples de modules:', modules.join(', '));
  }
} catch (err) {
  console.error('\n5. Erreur lors de la vérification de node_modules:', err.message);
}

console.log('\n=== Fin de la vérification ===');
