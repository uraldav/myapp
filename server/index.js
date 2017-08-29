/* eslint no-underscore-dangle: 0 */
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const isDev = process.env.NODE_ENV !== 'production';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = isDev;

if (isDev) {
  if (!require('piping')({ hook: true, ignore: /(\/\.|~$|\.json|\.less$)/i })) {
    return;
  }
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./isomorphic.config'))
  .development(isDev)
  .server(rootDir, () => {
    require('./production');
  });
