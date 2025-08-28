import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
