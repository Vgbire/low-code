import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/low-code',
  resolve: {
    alias: [
      { find: 'src', replacement: resolve(__dirname, 'src') },
      { find: 'views', replacement: resolve(__dirname, 'src/views') },
      {
        find: '@libs/cmp',
        replacement: resolve(__dirname, '../../libs/cmp/src'),
      },
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
    host: 'localhost',
    hmr: {
      overlay: false,
    },
    proxy: {
      '/apis': {
        target: 'https://home-test.novacloud.net.cn',
        changeOrigin: true,
      },
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
