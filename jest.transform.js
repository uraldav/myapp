/* eslint import/no-extraneous-dependencies: 0, import/no-unresolved: 0 */
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [['transform-runtime', { polyfill: false, regenerator: true }]],
});
