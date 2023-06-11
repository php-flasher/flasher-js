import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import cssnano from 'cssnano';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import styles from 'rollup-plugin-styles';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

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
const isProduction = 'production' === process.env.NODE_ENV;

if ('@flasher/flasher' !== packageName) {
  module.globals = { '@flasher/flasher': 'flasher' };
  module.external = ['@flasher/flasher'];

  if (['@flasher/flasher-notyf', '@flasher/flasher-noty'].includes(packageName)) {
    module.external.push('jquery');
    module.globals.jquery = 'jQuery';
  }
}

export default {
  input: 'src/index.ts',
  plugins: [
    clear({
      targets: ['dist'],
    }),
    styles({
      mode: 'extract',
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
      assetFileNames: '[name][extname]',
    },
    {
      file: module.output,
      format: 'umd',
      exports: 'auto',
      sourcemap: !isProduction,
      assetFileNames: '[name][extname]',
      name: module.name,
      globals: module.globals || {},
    },
    {
      file: module.output.replace('.js', '.min.js'),
      format: 'umd',
      exports: 'auto',
      sourcemap: !isProduction,
      assetFileNames: '[name][extname]',
      name: module.name,
      globals: module.globals || {},
      plugins: [
        isProduction &&
          terser({
            format: {
              comments: false,
            },
          }),
        filesize(),
      ],
    },
  ],
};
