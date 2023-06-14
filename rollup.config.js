import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import cssnano from 'cssnano';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import styles from 'rollup-plugin-styles';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const resolveConfig = (config) => {
  const { name } = config;

  if ('flasher' !== name) {
    config.globals = { ...config.globals, '@flasher/flasher': 'flasher' };
    config.external = [...(config.external || []), '@flasher/flasher'];
  }

  if (['noty', 'notyf'].includes(name)) {
    config.globals = { ...config.globals, jquery: 'jQuery' };
    config.external = [...(config.external || []), 'jquery'];
  }

  config.input = 'src/index.ts';
  config.file = `dist/flasher-${config.name}.js`;

  if ('flasher' === name) {
    config.file = `dist/flasher.js`;
  }

  return config;
};

const outputOptions = (options = {}) => ({
  exports: 'auto',
  sourcemap: !isProduction,
  assetFileNames: '[name][extname]',
  inlineDynamicImports: true,
  ...options,
});

const modules = {
  '@flasher/flasher': { name: 'flasher' },
  '@flasher/flasher-noty': { name: 'noty' },
  '@flasher/flasher-notyf': { name: 'notyf' },
  '@flasher/flasher-pnotify': { name: 'pnotify' },
  '@flasher/flasher-sweetalert': { name: 'sweetalert' },
  '@flasher/flasher-toastr': { name: 'toastr' },
};

const packageName = process.env.LERNA_PACKAGE_NAME;
const packageConfig = modules[packageName];
const isProduction = 'production' === process.env.NODE_ENV;

const plugins = [
  clear({ targets: ['dist'] }),
  styles({
    mode: 'extract',
    plugins: { cssnano, 'postcss-discard-comments': { removeAll: true } },
  }),
  resolve(),
  commonjs(),
  typescript({ tsconfig: 'tsconfig.build.json' }),
];

const config = resolveConfig(packageConfig);

export default defineConfig({
  input: config.input,
  plugins,
  external: config.external || [],
  output: [
    outputOptions({
      file: config.file,
      format: 'umd',
      name: config.name,
      globals: config.globals || {},
    }),
    outputOptions({
      file: config.file.replace('.js', '.min.js'),
      format: 'umd',
      name: config.name,
      globals: config.globals || {},
      plugins: [
        isProduction && terser({ format: { comments: false } }),
        filesize(),
      ].filter(Boolean),
    }),
  ],
});
