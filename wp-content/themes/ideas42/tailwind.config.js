const tailwindToRem = (size) => size * 0.25 + 'rem';
const generateSpacing = (limit = 96) => {
	const data = {};
	for (let i = 0; i <= limit; i++) {
		const key = i.toString();
		data[i] = tailwindToRem(i);
	}
	return data;
};

module.exports = {
  content: [
    './assets/sass/**/*.scss',
    './assets/js/**/*.js',
    './parts/**/*.html',
    './templates/**/*.html',
  ],
  safelist: ['spacer-sm', 'spacer-md', 'spacer-lg'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        'gibson': '"Gibson", sans-serif',
        'permanent-marker': '"Permanent-Marker", sans-serif',
      },
      screens: {
        xxl: '1120px',
      },
      colors: {
        'lime-green': '#BDD63B',
        navy: '#004357',
        'dark-green': '#1C8A70',
        'theme-gray': '#3C3E3E',
      },
      lineHeight: generateSpacing(360),
      maxWidth: generateSpacing(360),
      minHeight: generateSpacing(360),
      spacing: generateSpacing(360),
    },
  },
  plugins: [],
};
