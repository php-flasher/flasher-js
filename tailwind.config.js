module.exports = {
  purge: {
    enabled: true,
    preserveHtmlElements: false,
    content: ['src/*.scss'],
    options: {
      keyframes: true,
      fontFace: true,
      defaultExtractor: content => content.match(/^fl-/) || [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
