import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '/tmp/vite',
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'services-sdp-dev.mohre.gov.ae',
      'services-sdp-test.mohre.gov.ae',
      'services-sdp-preprod.mohre.gov.ae',
      'services-sdp-uat.mohre.gov.ae',
      'services-sdp-prod.mohre.gov.ae',
      'services-sdp.mohre.local',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/icppanel',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor libraries into a separate chunk
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-oidc-context'],
        },
      },
    },
    chunkSizeWarningLimit: 500, // Lowered from 7000 to 500 KB to identify large chunks
  },
});
