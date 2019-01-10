// inspired by https://github.com/reduxjs/redux/blob/master/rollup.config.js

import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json'

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'lib/foo.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'es/foo.js', format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  },

  // ES for browsers
  {
    input: 'src/index.js',
    output: {
      file: 'es/foo.mjs',
      format: 'es',
      indent: false,
      globals: { react: 'React' }
    },
    plugins: [
      nodeResolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': [ 'React' ]
        }
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  // UMD
  {
    input: 'src/index.js',
    output: {
      file: 'dist/foo.min.js',
      format: 'umd',
      name: 'Foo',
      indent: false,
      globals: { react: 'React' }
    },
    external: [
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': [ 'React' ]
        }
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
];
