/* eslint-disable global-require */
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    cssnano({
      preset: 'default'
    }),
    purgecss({
      content: ['./dist/*.html', './dist/js/app.js'],
      whitelistPatterns: [/sym-\d?\d/g],
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
};
