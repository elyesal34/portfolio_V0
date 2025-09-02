import { test, expect } from 'vitest';

test('basic test', () => {
  console.log('Running basic test...');
  expect(1 + 1).toBe(2);
});

test('async test', async () => {
  const result = await Promise.resolve('test');
  expect(result).toBe('test');
});
