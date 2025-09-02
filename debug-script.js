console.log('=== Démarrage du script de débogage ===');
console.log('Répertoire de travail:', process.cwd());

try {
  console.log('\n=== Vérification de Node.js ===');
  console.log('Version de Node.js:', process.version);
  
  console.log('\n=== Vérification des variables d\'environnement ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  console.log('\n=== Tentative d\'exécution de Vitest ===');
  const { execSync } = require('child_process');
  
  try {
    console.log('Commande exécutée: npx vitest --version');
    const vitestVersion = execSync('npx vitest --version', { stdio: 'pipe' }).toString().trim();
    console.log('✅ Vitest version:', vitestVersion);
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution de Vitest:');
    console.error('Message d\'erreur:', error.message);
    if (error.stderr) console.error('Sortie d\'erreur:', error.stderr.toString());
    if (error.stdout) console.error('Sortie standard:', error.stdout.toString());
  }
  
  console.log('\n=== Test de base ===');
  const testCode = `
    import { test, expect } from 'vitest';
    test('test de base', () => {
      expect(1 + 1).toBe(2);
    });
  `;
  
  require('fs').writeFileSync('temp-test.js', testCode);
  console.log('Fichier de test temporaire créé: temp-test.js');
  
  try {
    console.log('\nExécution du test...');
    const testResult = execSync('npx vitest run temp-test.js', { stdio: 'pipe' });
    console.log('✅ Test exécuté avec succès');
    console.log(testResult.toString());
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution du test:');
    console.error('Message d\'erreur:', error.message);
    if (error.stderr) console.error('Sortie d\'erreur:', error.stderr.toString());
    if (error.stdout) console.error('Sortie standard:', error.stdout.toString());
  }
  
} catch (error) {
  console.error('❌ Erreur critique dans le script de débogage:', error);
}
