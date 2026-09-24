import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import mkcert from 'vite-plugin-mkcert'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
const dirname = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    createSvgSpritePlugin({
      exportType: 'react',
      include: '**/assets/icons/**/*.svg',
      svgo: {
        multipass: true,
        floatPrecision: 2,
        js2svg: {
          indent: 2,
          pretty: false,
        },
        plugins: [
          'removeDoctype',
          'removeXMLProcInst',
          'removeComments',
          'removeMetadata',
          'removeEditorsNSData',
          'cleanupAttrs',
          'mergeStyles',
          'inlineStyles',
          'minifyStyles',
          'cleanupIds',
          'removeUselessDefs',
          'cleanupNumericValues',
          'convertColors',
          'removeUnknownsAndDefaults',
          'removeNonInheritableGroupAttrs',
          'removeUselessStrokeAndFill',
          'cleanupEnableBackground',
          'removeHiddenElems',
          'removeEmptyText',
          'convertShapeToPath',
          'convertEllipseToCircle',
          'moveElemsAttrsToGroup',
          'moveGroupAttrsToElems',
          'collapseGroups',
          'convertTransform',
          'removeEmptyAttrs',
          'removeEmptyContainers',
          'removeUnusedNS',
          'mergePaths',
          'sortAttrs',
          'sortDefsChildren',
          'removeDesc',
        ],
      },
    }),
    mkcert({
      savePath: './.tls',
    }),
    checker({
      typescript: true,
      biome: true,
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
})
