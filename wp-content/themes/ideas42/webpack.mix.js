let mix = require('laravel-mix');

mix
  .js('assets/js/blocks/blocks.jsx', 'assets/dist/js')
  .react()
  .sass('assets/sass/app.scss', 'assets/dist/css')
  .sass('assets/sass/editor.scss', 'assets/dist/css')
  .sass('assets/sass/fonts.scss', 'assets/dist/css')
  .options({
    processCssUrls: false,
    postCss: [require('tailwindcss')],
  });
