import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
