import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    testMatch: ['./**/*.test.{js,ts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
