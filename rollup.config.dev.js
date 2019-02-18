/* eslint-disable @typescript-eslint/camelcase */

import serve from 'rollup-plugin-serve';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';

export default [
  // UMD development
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/rfyt.dev.js',
      format: 'umd',
      name: 'ReactFixedYouTube',
      indent: false,
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
    },
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      serve(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
      }),
      typescript({
        exclude: 'node_modules/**',
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['React', 'createContext', 'useState'],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },
];
