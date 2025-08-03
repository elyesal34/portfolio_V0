import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**'
      ]
    },
    // Configuration pour les tests d'intégration
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    // Parallélisation des tests
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4
      }
    },
    // Retry en cas d'échec
    retry: 2,
    // Logs détaillés
    logLevel: 'info',
    // Mock automatique des modules externes
    deps: {
      inline: ['@testing-library/jest-dom']
    }
  }
})