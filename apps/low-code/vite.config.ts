import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/low-code/',
  resolve: {
    alias: [
      { find: 'src', replacement: resolve(__dirname, 'src') },
      { find: 'views', replacement: resolve(__dirname, 'src/views') },
      {
        find: '@libs/ui',
        replacement: resolve(__dirname, '../../libs/ui/src'),
      },
      {
        find: '@libs/icons',
        replacement: resolve(__dirname, '../../libs/icons/src'),
      },
    ],
  },
  server: {
    port: 2200,
    host: '0.0.0.0',
    hmr: {
      overlay: false,
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), svgr(), nxViteTsPaths()],
  define: {
    'import.meta.vitest': undefined,
  },
});
