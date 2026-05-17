import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` differs between web (served from GitHub Pages under /orthodox/) and
// mobile (Capacitor loads files from the device filesystem, so paths must be
// relative). Set MOBILE=1 when building for Capacitor.
const isMobile = process.env.MOBILE === '1';

export default defineConfig({
  base: isMobile ? './' : '/orthodox/',
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
