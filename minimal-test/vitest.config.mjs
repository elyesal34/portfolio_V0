import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.js'],
    testTimeout: 10000,
    watch: false,
    reporters: 'verbose',
    logLevel: 'info',
    clearMocks: true,
  },
});
