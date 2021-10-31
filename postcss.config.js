module.exports = {
  filterPlugins: false,
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    tailwindcss: {},
    cssnano: {
      preset: 'default',
    },
    'postcss-discard-comments': {
      removeAll: true,
    },
  },
};
