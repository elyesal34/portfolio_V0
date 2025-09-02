// Test minimal avec CommonJS
const test = require('vitest').test;
const expect = require('vitest').expect;

console.log('=== Début du test CommonJS ===');

test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
  console.log('Test réussi !');
});

console.log('=== Fin du test CommonJS ===');
