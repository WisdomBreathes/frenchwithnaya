// @ts-check
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://wisdombreathes.github.io',
  base: '/frenchwithnaya',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      assetsInlineLimit: 8192,
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: '_astro/[name].[hash].js',
          chunkFileNames: '_astro/[name].[hash].js',
          assetFileNames: '_astro/[name].[hash][extname]',
        },
      },
    },
  },
})
