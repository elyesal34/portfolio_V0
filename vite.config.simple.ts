import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    strictPort: true
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
