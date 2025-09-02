import { describe, it, expect } from 'vitest';

describe('Exemple de test unitaire', () => {
  it('devrait additionner deux nombres', () => {
    expect(1 + 1).toBe(2);
  });

  it('devrait concaténer des chaînes', () => {
    expect('Bonjour, ' + 'monde!').toBe('Bonjour, monde!');
  });
});
