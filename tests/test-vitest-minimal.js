// Test minimal pour Vitest
import { describe, it, expect } from 'vitest';

describe('Test minimal Vitest', () => {
  it('devrait réussir un test simple', () => {
    expect(1 + 1).toBe(2);
  });

  it('devrait gérer les promesses', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });
});
