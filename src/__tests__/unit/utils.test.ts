// Exemple de test unitaire pour des fonctions utilitaires
import { describe, it, expect } from 'vitest';

// Fonction utilitaire de test
export function sum(a: number, b: number): number {
  return a + b;
}

describe('Utils - Fonctions utilitaires', () => {
  describe('sum()', () => {
    it('devrait additionner deux nombres correctement', () => {
      expect(sum(1, 2)).toBe(3);
      expect(sum(-1, 1)).toBe(0);
      expect(sum(0, 0)).toBe(0);
    });

    it('devrait gérer les nombres décimaux', () => {
      expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });
});
