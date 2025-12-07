import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths for assets in build
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        contact: 'contact.html',
        privacy: 'privacy.html',
        book1: 'books/the-creative-flow.html'
      }
    }
  }
});
