import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import notify from 'rollup-plugin-notify';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import multiInput from 'rollup-plugin-multi-input';
import styles from 'rollup-plugin-styles';
import clear from 'rollup-plugin-clear';

const moduleName = 'Flasher';
const inputFileName = 'src/index.ts';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: ['src/*.scss'],
    output: {
      dir: 'dist',
      assetFileNames: '[name].min.css',
    },
    plugins: [
      clear({
        targets: ['dist'],
      }),
      multiInput(),
      styles({
        minify: isProduction,
        mode: 'extract',
      }),
    ],
  },
  {
    input: inputFileName,
    output: [
      {
        name: moduleName,
        file: pkg.main,
        format: 'umd',
      },
      {
        name: moduleName,
        file: pkg.main.replace('.js', '.min.js'),
        format: 'umd',
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
    ],
    plugins: [
      notify(),
      resolve(),
      commonjs(),
      typescript(),
    ],
  },
  {
    input: inputFileName,
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
    ],
    output: [
      { file: pkg.main.replace('.js', '.cjs.js'), format: 'cjs', exports: 'auto' },
      { file: pkg.main.replace('.js', '.es.js'), format: 'es' },
    ],
  },
];
