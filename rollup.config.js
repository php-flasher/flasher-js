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
const isProduction = 'production' === process.env.NODE_ENV;

const addFlasherExternal = (config) => {
  if (packageName === '@flasher/flasher') {
    return config;
  }

  config.globals = { '@flasher/flasher': 'flasher' };
  config.external = ['@flasher/flasher'];

  return config;
}

const addJQueryExternal = (config) => {
  if (!['@flasher/flasher-notyf', '@flasher/flasher-noty'].includes(packageName)) {
    return config;
  }

  config.external.push('jquery');
  config.globals.jquery = 'jQuery';

  return config;
}

const config = addJQueryExternal(
  addFlasherExternal(modules[packageName])
);

const plugins = [
  clear({
    targets: ['dist'],
  }),
  styles({
    mode: 'extract',
    plugins: {cssnano, "postcss-discard-comments": { removeAll: true } },
  }),
  resolve(),
  commonjs(),
  typescript({ tsconfig: 'tsconfig.build.json' }),
];

const outputOptions = (options = {}) => ({
  exports: 'auto',
  sourcemap: !isProduction,
  assetFileNames: '[name][extname]',
  ...options,
});

export default {
  input: 'src/index.ts',
  plugins: plugins,
  external: config.external || [],
  output: [
    outputOptions({
      file: config.output,
      format: 'umd',
      name: config.name,
      globals: config.globals || {},
    }),
    outputOptions({
      file: config.output.replace('.js', '.min.js'),
      format: 'umd',
      name: config.name,
      globals: config.globals || {},
      plugins: [
        isProduction && terser({ format: { comments: false } }),
        filesize(),
      ],
    }),
  ],
};
