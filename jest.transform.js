/* eslint import/no-extraneous-dependencies: 0 */

module.exports = require('babel-jest').createTransformer({
  presets: ['es2015', 'stage-2', 'react', 'react-boilerplate'],
});
