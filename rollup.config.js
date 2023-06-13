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

  if (name !== 'flasher') {
    config.globals = { ...config.globals, '@flasher/flasher': 'flasher' };
    config.external = [...config.external || [], '@flasher/flasher'];
  }

  if (name.includes('notyf') || name.includes('noty')) {
    config.external = [...config.external || [], 'jquery'];
    config.globals = { ...config.globals, 'jquery': 'jQuery' };
  }

  return config;
}

const outputOptions = (options = {}) => ({
  exports: 'default',
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
    plugins: { cssnano, "postcss-discard-comments": { removeAll: true } },
  }),
  resolve(),
  commonjs(),
  typescript({ tsconfig: 'tsconfig.build.json' }),
];

const config = resolveConfig(packageConfig);

export default defineConfig({
  input: 'src/index.ts',
  plugins,
  external: config.external || [],
  output: [
    outputOptions({
      file: `dist/flasher-${config.name}.js`,
      format: 'umd',
      name: config.name,
      globals: config.globals || {},
    }),
    outputOptions({
      file: `dist/flasher-${config.name}.min.js`,
      format: 'umd',
      name: config.name,
      globals: config.globals || {},
      plugins: [
        isProduction && terser({ format: { comments: false } }),
        filesize(),
      ].filter(Boolean),
    }),
  ],
})
