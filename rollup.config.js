/* eslint-disable @typescript-eslint/camelcase */
// inspired by https://github.com/reduxjs/redux/blob/master/rollup.config.js

import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default [
  // CommonJS
  {
    input: 'src/index.tsx',
    output: { file: 'lib/rytf.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      typescript(),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },

  // ES
  {
    input: 'src/index.tsx',
    output: { file: 'es/rytf.js', format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      typescript(),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },

  // ES for browsers
  {
    input: 'src/index.tsx',
    output: {
      file: 'es/rytf.mjs',
      format: 'es',
      indent: false,
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
      }),
      typescript({
        exclude: 'node_modules/**',
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': [
            'React',
            'createContext',
            'useState',
            'useRef',
            'useEffect',
          ],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },

  // UMD production
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/rytf.min.js',
      format: 'umd',
      name: 'ReactFixedYouTube',
      indent: false,
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
    },
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
      }),
      typescript({
        exclude: 'node_modules/**',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
];
