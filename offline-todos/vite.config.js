import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Service Worker automatisch aktualisieren
      includeAssets: ['favicon.svg'], // zusätzliche Assets
      manifest: {
        name: 'Offline Todos',
        short_name: 'Todos',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',

      },
    }),
  ],
});
