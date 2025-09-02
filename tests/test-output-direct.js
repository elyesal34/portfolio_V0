// Test d'écriture directe dans stdout et stderr
process.stdout.write('Ceci est un test de sortie standard\n');
process.stderr.write('Ceci est un test de sortie d\'erreur\n');

// Forcer la sortie immédiate
process.stdout.write('Fin du test\n');

// Sortie avec un code de sortie 0 (succès)
process.exit(0);
