import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    }),
    visualizer()
  ],
  server: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true,
    open: true,
    cors: true,
    hmr: {
      host: 'localhost',
      port: 3002,
      protocol: 'ws',
      overlay: false
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'react-router-hash-link',
      '@emotion/react',
      '@emotion/styled',
      'lucide-react'
    ],
    exclude: ['workbox-*']
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['react-router-hash-link']
        }
      }
    }
  }
});