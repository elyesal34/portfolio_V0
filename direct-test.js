// Test minimal avec Vitest
import { test, expect } from 'vitest';

console.log('Démarrage du test...');

test('test d\'addition', () => {
  console.log('Exécution du test...');
  expect(1 + 1).toBe(2);
});

console.log('Test configuré.');
