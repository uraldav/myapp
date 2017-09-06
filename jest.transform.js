/* eslint import/no-extraneous-dependencies: 0 */

module.exports = require('babel-jest').createTransformer({
  presets: [
    'es2015',
    'stage-0',
    'react',
  ],
  plugins: [['transform-runtime', { polyfill: false, regenerator: true }]],
});
