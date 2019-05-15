/* eslint-disable @typescript-eslint/camelcase */

import serve from 'rollup-plugin-serve';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default [
  // UMD development
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/rytf.dev.js',
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
      postcss(),
    ],
  },
];
