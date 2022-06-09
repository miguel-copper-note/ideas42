module.exports = {
  content: [
    './assets/sass/**/*.scss',
    './template-parts/**/*.php',
    'index.php',
  ],
  safelist: ['spacer-sm', 'spacer-md', 'spacer-lg'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      screens: {
        xxl: '1120px',
      },
      colors: {
        'lime-green': '#BDD63B',
        navy: '#004357',
        'dark-green': '#1C8A70',
      },
    },
  },
  plugins: [],
};
