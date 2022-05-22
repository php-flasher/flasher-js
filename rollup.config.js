import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import commonjs from '@rollup/plugin-commonjs';
import clear from 'rollup-plugin-clear';
import cssnano from 'cssnano';

const modules = {
  '@flasher/flasher': { name: 'flasher', output: 'dist/flasher.js' },
  '@flasher/flasher-noty': { name: 'flasher.noty', output: 'dist/flasher-noty.js' },
  '@flasher/flasher-notyf': { name: 'flasher.notyf', output: 'dist/flasher-notyf.js' },
  '@flasher/flasher-pnotify': { name: 'flasher.pnotify', output: 'dist/flasher-pnotify.js' },
  '@flasher/flasher-sweetalert': { name: 'flasher.sweetalert', output: 'dist/flasher-sweetalert.js' },
  '@flasher/flasher-toastr': { name: 'flasher.toastr', output: 'dist/flasher-toastr.js' },
};

const packageName = process.env.LERNA_PACKAGE_NAME;
const module = modules[packageName];

if ('@flasher/flasher' !== packageName) {
  module.globals = { '@flasher/flasher': 'flasher' };
  module.external = ['@flasher/flasher'];

  if (-1 !== ['@flasher/flasher-notyf', '@flasher/flasher-noty'].indexOf(packageName)) {
    module.external.push('jquery');
    module.globals.jquery = 'jQuery';
  }
}

const isProduction = 'production' === process.env.NODE_ENV;

export default {
  input: 'src/index.ts',
  plugins: [
    clear({
      targets: ['dist'],
    }),
    styles({
      plugins: {
        cssnano,
        "postcss-discard-comments": {
          removeAll: true,
        },
      },
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
  ],
  external: module.external || [],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'auto',
      sourcemap: !isProduction,
    },
    {
      file: module.output,
      format: 'umd',
      exports: 'auto',
      sourcemap: !isProduction,
      name: module.name,
      globals: module.globals || {},
    },
    {
      file: module.output.replace('.js', '.min.js'),
      format: 'umd',
      exports: 'auto',
      sourcemap: !isProduction,
      name: module.name,
      globals: module.globals || {},
      plugins: [
        isProduction &&
          terser({
            format: {
              comments: false,
            },
          }),
      ],
    },
  ],
  onwarn(warning, warn) {
    const filename = warning.importer || warning.loc?.file;
    if (filename && /node_modules/.test(filename)) {
      return;
    }
    warn(warning);
  },
};
