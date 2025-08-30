import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    open: true,
    strictPort: true,
    hmr: {
      port: 3003,
      protocol: 'ws',
      host: 'localhost',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  clearScreen: false,
  logLevel: 'info',
});
