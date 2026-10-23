import { defineConfig } from 'vite';

// Relative asset paths work both at /repository-name/ on GitHub Pages
// and at / when you connect a custom domain later.
export default defineConfig({
  base: './',
});
