import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// `base` differs between web (served from GitHub Pages under /orthodox/) and
// mobile (Capacitor loads files from the device filesystem, so paths must be
// relative). Set MOBILE=1 when building for Capacitor.
const isMobile = process.env.MOBILE === '1';

export default defineConfig({
  base: isMobile ? './' : '/orthodox/',
  plugins: [
    react(),
    // PWA is web-only. Capacitor already runs the app as a native shell from
    // the device filesystem, where a service worker is unnecessary and the
    // GitHub-Pages scope/start_url would be wrong.
    ...(isMobile
      ? []
      : [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
            manifest: {
              name: 'Orthodox Calendar',
              short_name: 'Orthodox',
              description:
                'Christian Orthodox liturgical calendar with feast days, saints, and fasting indicators.',
              lang: 'en',
              theme_color: '#6e1f2c',
              background_color: '#10080a',
              display: 'standalone',
              orientation: 'portrait',
              start_url: '.',
              scope: '.',
              icons: [
                { src: 'icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: 'icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                {
                  src: 'icons/maskable-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'maskable',
                },
              ],
            },
            workbox: {
              // Precache the app shell. Lives JSON (~2.7 MB across 12 files) is
              // deliberately excluded and cached at runtime on demand instead.
              globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
              cleanupOutdatedCaches: true,
              runtimeCaching: [
                {
                  urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
                  handler: 'StaleWhileRevalidate',
                  options: { cacheName: 'google-fonts-stylesheets' },
                },
                {
                  urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'google-fonts-webfonts',
                    expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
                    cacheableResponse: { statuses: [0, 200] },
                  },
                },
                {
                  // Lives of the Saints prose, loaded lazily per month.
                  urlPattern: ({ url }) =>
                    url.pathname.includes('/lives/') && url.pathname.endsWith('.json'),
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'lives-json',
                    expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 90 },
                    cacheableResponse: { statuses: [0, 200] },
                  },
                },
              ],
            },
          }),
        ]),
  ],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
