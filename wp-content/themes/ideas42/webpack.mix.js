const glob = require('glob');
const fs   = require('fs');
const path = require('path');
const mix = require('laravel-mix');

mix
  .js('assets/js/app.js', 'assets/dist/js')
  .js('assets/js/blocks/blocks.jsx', 'assets/dist/js')
  .react()
  .sass('assets/sass/app.scss', 'assets/dist/css')
  .sass('assets/sass/editor.scss', 'assets/dist/css')
  .sass('assets/sass/fonts.scss', 'assets/dist/css')
  .options({
    processCssUrls: false,
    postCss: [require('tailwindcss')],
  });

/**
 * Compile individual block sass files from /assets/sass/blocks/*.scss
 * these are going to be used with wp_enqueue_block_style
 *
 * This glob ignores files that start with an underscore. eg. _spacer.scss
 *
 * Note: these don't auto-refresh webpack when it finds new files, so you need to restart `npm run watch`
 */
const cssFiles = glob.sync(`${__dirname}/assets/sass/blocks/**/[!_]*.scss`);
for (let filePath of cssFiles) {
  const srcPath = filePath.replace(`${__dirname}/`, '');
  const distPath = path.dirname(srcPath.replace('/sass/', '/dist/css/'));
  mix.sass(srcPath, distPath);
}
