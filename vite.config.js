import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** Multi-page build so Netlify (and any static host) serves all HTML routes from dist/. */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        nbaShowdown: resolve(__dirname, 'nba-showdown.html'),
        splunk: resolve(__dirname, 'splunk.html'),
        velociraptor: resolve(__dirname, 'velociraptor.html'),
        attackLabs: resolve(__dirname, 'attack-labs.html'),
        speedbumps: resolve(__dirname, 'speedbumps.html'),
        encryption: resolve(__dirname, 'encryption.html'),
      },
    },
  },
});
