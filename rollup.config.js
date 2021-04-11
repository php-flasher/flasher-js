import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import notify from 'rollup-plugin-notify';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const moduleName = 'Flasher';
const inputFileName = 'src/index.ts';

export default [
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
      { file: pkg.main.replace('.js', '.cjs.js'), format: 'cjs' },
      { file: pkg.main.replace('.js', '.es.js'), format: 'es' },
    ],
  },
];
