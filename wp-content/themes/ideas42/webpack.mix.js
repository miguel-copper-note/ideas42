let mix = require('laravel-mix');

mix.sass('assets/sass/app.scss', 'assets/dist/css').options({
  processCssUrls: false,
  postCss: [require('tailwindcss')],
});
